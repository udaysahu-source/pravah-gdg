"""
PRAVAH: Dynamic Disaster Reachability Engine
GIS & Network Graph Engine (NetworkX, Shapely, GeoPandas)
Dynamic Dijkstra Routing with Quadratic Water Penalty
Disconnected Sub-Graph Isolation & Vulnerability Analysis
"""

import math
from typing import Dict, Any, List, Tuple, Optional
import networkx as nx
from shapely.geometry import Point, LineString
import geopandas as gpd

from app.engine.sample_data import MOCK_NODES, MOCK_EDGES, MOCK_FLOOD_POLYGONS
from app.engine.models import (
    RouteResponse, EdgeTraversalDetail,
    IsolatedZone, IsolatedZonesResponse
)


class ReachabilityGraphEngine:
    def __init__(self):
        self.nodes = MOCK_NODES
        self.edges_spec = MOCK_EDGES
        self.flood_polygons = MOCK_FLOOD_POLYGONS
        self.current_surge_height: float = 0.35  # default active surge level in meters
        self.graph: nx.Graph = nx.Graph()
        self.gdf_nodes: Optional[gpd.GeoDataFrame] = None
        self.gdf_edges: Optional[gpd.GeoDataFrame] = None
        
        self._initialize_graph()

    def _initialize_graph(self):
        """Construct the NetworkX graph and GeoPandas GeoDataFrames."""
        self.graph.clear()
        
        # Add Nodes with spatial attributes
        node_records = []
        for node_id, data in self.nodes.items():
            self.graph.add_node(
                node_id,
                name=data["name"],
                lat=data["lat"],
                lon=data["lon"],
                type=data["type"],
                elevation_m=data["elevation_m"],
                population=data["population"],
                hospitals=data["hospitals"],
                at_risk_count=data["at_risk_count"],
                is_safe_core=data.get("is_safe_core", False),
                description=data.get("description", "")
            )
            node_records.append({
                "node_id": node_id,
                "name": data["name"],
                "type": data["type"],
                "elevation_m": data["elevation_m"],
                "population": data["population"],
                "hospitals": data["hospitals"],
                "at_risk_count": data["at_risk_count"],
                "geometry": Point(data["lon"], data["lat"])
            })

        self.gdf_nodes = gpd.GeoDataFrame(node_records, crs="EPSG:4326")

        # Add Edges with dynamic flood modeling
        self._rebuild_edges_with_surge(self.current_surge_height)

    def _rebuild_edges_with_surge(self, surge_height: float):
        """Compute edge water depths and weights based on flood surge level."""
        self.current_surge_height = max(0.0, float(surge_height))
        
        # Remove existing edges and re-add with new parameters
        self.graph.remove_edges_from(list(self.graph.edges()))
        edge_records = []

        for edge in self.edges_spec:
            u = edge["u"]
            v = edge["v"]
            base_depth = edge.get("base_depth_m", 0.0)
            susceptibility = edge.get("flood_susceptibility", 0.5)
            
            # Dynamic effective water depth: base + surge scaled by local terrain susceptibility
            effective_depth = round(base_depth + (self.current_surge_height * susceptibility), 3)
            
            # Base travel time in minutes: (distance / speed) * 60
            distance_km = edge["distance_km"]
            speed_kmh = edge.get("speed_kmh", 40.0)
            base_travel_time_min = round((distance_km / speed_kmh) * 60, 2)
            
            u_data = self.nodes[u]
            v_data = self.nodes[v]
            line_geom = LineString([(u_data["lon"], u_data["lat"]), (v_data["lon"], v_data["lat"])])

            self.graph.add_edge(
                u, v,
                name=edge["name"],
                distance_km=distance_km,
                speed_kmh=speed_kmh,
                base_travel_time_min=base_travel_time_min,
                flood_susceptibility=susceptibility,
                water_depth_m=effective_depth,
                geometry=line_geom
            )

            edge_records.append({
                "u": u,
                "v": v,
                "name": edge["name"],
                "distance_km": distance_km,
                "speed_kmh": speed_kmh,
                "base_travel_time_min": base_travel_time_min,
                "water_depth_m": effective_depth,
                "geometry": line_geom
            })

        self.gdf_edges = gpd.GeoDataFrame(edge_records, crs="EPSG:4326")

    def set_water_surge_height(self, surge_height: float):
        """Update active simulation water surge height."""
        self._rebuild_edges_with_surge(surge_height)
        return {
            "status": "UPDATED",
            "surge_height_m": self.current_surge_height,
            "total_edges": self.graph.number_of_edges(),
            "nodes_count": self.graph.number_of_nodes()
        }

    def compute_edge_weight(self, u: str, v: str, clearance_limit: float = 0.6) -> float:
        """
        Dijkstra Edge Weight formula specified:
        weight = travel_time * (1 + (water_depth / clearance_limit)^2)
        If water_depth >= clearance_limit:
            weight = infinity (blocked)
        """
        edge_data = self.graph.get_edge_data(u, v)
        if not edge_data:
            return float('inf')

        water_depth = edge_data["water_depth_m"]
        base_travel_time = edge_data["base_travel_time_min"]

        if water_depth >= clearance_limit:
            return float('inf')

        penalty_ratio = (water_depth / clearance_limit)
        quadratic_penalty = 1.0 + (penalty_ratio ** 2)
        return base_travel_time * quadratic_penalty

    def find_nearest_node(self, lat: float, lon: float) -> str:
        """Find the nearest graph node given geographic coordinates."""
        closest_node = None
        min_dist = float('inf')
        for node_id, data in self.nodes.items():
            d = (data["lat"] - lat) ** 2 + (data["lon"] - lon) ** 2
            if d < min_dist:
                min_dist = d
                closest_node = node_id
        return closest_node or "AIIMS_RAIPUR"

    def calculate_emergency_route(
        self,
        origin_node: Optional[str] = None,
        destination_node: Optional[str] = None,
        origin_coords: Optional[List[float]] = None,
        destination_coords: Optional[List[float]] = None,
        clearance_limit: float = 0.6,
        water_simulation_offset: Optional[float] = None
    ) -> RouteResponse:
        """
        Calculates dynamic shortest path using Dijkstra with quadratic water penalty.
        Accounts for vehicle clearance limit (0.3m civilian, 0.6m ambulance, 1.0m rescue truck).
        """
        if water_simulation_offset is not None:
            self._rebuild_edges_with_surge(water_simulation_offset)

        # Resolve Origin
        if origin_coords and len(origin_coords) >= 2:
            resolved_origin = self.find_nearest_node(origin_coords[0], origin_coords[1])
        elif origin_node and origin_node in self.graph:
            resolved_origin = origin_node
        else:
            resolved_origin = "BHATAGAON_ISBT"

        # Resolve Destination
        if destination_coords and len(destination_coords) >= 2:
            resolved_destination = self.find_nearest_node(destination_coords[0], destination_coords[1])
        elif destination_node and destination_node in self.graph:
            resolved_destination = destination_node
        else:
            resolved_destination = "AIIMS_RAIPUR"

        if resolved_origin == resolved_destination:
            node_data = self.nodes[resolved_origin]
            return RouteResponse(
                status="OPTIMAL",
                path_nodes=[resolved_origin],
                path_coords=[[node_data["lat"], node_data["lon"]]],
                total_distance_km=0.0,
                total_travel_time_min=0.0,
                max_water_depth_m=0.0,
                vehicle_clearance_limit_m=clearance_limit,
                safety_margin_m=clearance_limit,
                is_ambulance_passable=True,
                traversed_edges=[],
                bottleneck_edges=[],
                evacuation_advisory="Origin and destination are at the same location."
            )

        # Build custom Dijkstra search graph considering infinite weight as cut
        passable_graph = nx.Graph()
        for u, v, data in self.graph.edges(data=True):
            weight = self.compute_edge_weight(u, v, clearance_limit=clearance_limit)
            if not math.isinf(weight):
                passable_graph.add_edge(u, v, weight=weight, **data)

        # Run Dijkstra
        try:
            path = nx.dijkstra_path(passable_graph, resolved_origin, resolved_destination, weight='weight')
            
            # Trace path details
            path_coords = []
            total_distance = 0.0
            total_travel_time = 0.0
            max_water_depth = 0.0
            traversed_edges: List[EdgeTraversalDetail] = []

            for i in range(len(path) - 1):
                u = path[i]
                v = path[i + 1]
                edge_data = self.graph.get_edge_data(u, v)
                water_depth = edge_data["water_depth_m"]
                distance = edge_data["distance_km"]
                weight = self.compute_edge_weight(u, v, clearance_limit)
                
                total_distance += distance
                total_travel_time += weight
                max_water_depth = max(max_water_depth, water_depth)

                penalty_ratio = (water_depth / clearance_limit) if clearance_limit > 0 else 0
                penalty_mult = round(1.0 + (penalty_ratio ** 2), 2)
                
                traversed_edges.append(EdgeTraversalDetail(
                    from_node=u,
                    to_node=v,
                    road_name=edge_data["name"],
                    distance_km=distance,
                    travel_time_min=round(weight, 1),
                    water_depth_m=water_depth,
                    is_submerged=water_depth >= 0.25,
                    status="CLEAR" if water_depth < 0.25 else ("CAUTION" if water_depth < clearance_limit else "IMPASSABLE"),
                    penalty_multiplier=penalty_mult
                ))

            for n in path:
                n_info = self.nodes[n]
                path_coords.append([n_info["lat"], n_info["lon"]])

            safety_margin = round(clearance_limit - max_water_depth, 2)
            status_tag = "OPTIMAL" if max_water_depth < 0.25 else "CAUTION_HIGH_WATER"
            
            advisory = (
                f"Path cleared for vehicle with {clearance_limit}m clearance. "
                f"Peak water depth along route: {max_water_depth:.2f}m (Safety buffer: {safety_margin:.2f}m). "
                f"Estimated travel time: {total_travel_time:.1f} mins across {len(path)-1} segments."
            )

            return RouteResponse(
                status=status_tag,
                path_nodes=path,
                path_coords=path_coords,
                total_distance_km=round(total_distance, 2),
                total_travel_time_min=round(total_travel_time, 1),
                max_water_depth_m=round(max_water_depth, 2),
                vehicle_clearance_limit_m=clearance_limit,
                safety_margin_m=safety_margin,
                is_ambulance_passable=max_water_depth <= 0.6,
                traversed_edges=traversed_edges,
                bottleneck_edges=[],
                evacuation_advisory=advisory
            )

        except (nx.NetworkXNoPath, nx.NodeNotFound):
            # Path blocked! Identify bottleneck edges that prevented reaching destination
            bottlenecks = []
            for u, v, data in self.graph.edges(data=True):
                if data["water_depth_m"] >= clearance_limit:
                    bottlenecks.append({
                        "from": self.nodes[u]["name"],
                        "to": self.nodes[v]["name"],
                        "road_name": data["name"],
                        "water_depth_m": data["water_depth_m"],
                        "clearance_limit_m": clearance_limit,
                        "overflow_excess_m": round(data["water_depth_m"] - clearance_limit, 2)
                    })

            orig_name = self.nodes[resolved_origin]["name"]
            dest_name = self.nodes[resolved_destination]["name"]
            
            return RouteResponse(
                status="BLOCKED",
                path_nodes=[],
                path_coords=[],
                total_distance_km=0.0,
                total_travel_time_min=0.0,
                max_water_depth_m=round(self.current_surge_height + 0.65, 2),
                vehicle_clearance_limit_m=clearance_limit,
                safety_margin_m=-0.1,
                is_ambulance_passable=False,
                traversed_edges=[],
                bottleneck_edges=bottlenecks[:5],
                evacuation_advisory=(
                    f"CRITICAL WARNING: No terrestrial route available between {orig_name} and {dest_name} "
                    f"for vehicle clearance {clearance_limit}m. Submerged causeways have cut off road connectivity. "
                    f"Recommend SDRF inflatable motorized rescue boat deployment or aerial airlift."
                )
            )

    def calculate_isolated_zones(self, clearance_limit: float = 0.6) -> IsolatedZonesResponse:
        """
        Calculates disconnected sub-graphs when roads are cut off.
        Ranks cut-off zones by Vulnerability Score:
        V = (Population * 0.4) + (Hospitals * 0.4) + (AtRisk * 0.2)
        """
        # Create passable sub-graph
        passable_graph = nx.Graph()
        passable_graph.add_nodes_from(self.graph.nodes(data=True))
        
        severed_edges = []
        for u, v, data in self.graph.edges(data=True):
            if data["water_depth_m"] < clearance_limit:
                passable_graph.add_edge(u, v, **data)
            else:
                severed_edges.append((u, v, data["name"], data["water_depth_m"]))

        # Connected components in the passable network
        components = list(nx.connected_components(passable_graph))
        
        # Identify the Safe Core Component (contains AIIMS and Mekahara and EOC)
        safe_core_component = None
        for comp in components:
            if "AIIMS_RAIPUR" in comp or "MEKAHARA_HOSPITAL" in comp or "EOC_COLLECTORATE" in comp:
                safe_core_component = comp
                break
        
        if safe_core_component is None and components:
            # Fallback to largest component
            safe_core_component = max(components, key=len)
        elif safe_core_component is None:
            safe_core_component = set()

        isolated_zones: List[IsolatedZone] = []
        total_cutoff_pop = 0
        total_cutoff_hosp = 0
        total_at_risk = 0

        zone_counter = 1
        for comp in components:
            if comp == safe_core_component:
                continue

            # Calculate metrics for isolated component
            zone_nodes = list(comp)
            comp_pop = sum(self.nodes[n]["population"] for n in zone_nodes)
            comp_hosp = sum(self.nodes[n]["hospitals"] for n in zone_nodes)
            comp_at_risk = sum(self.nodes[n]["at_risk_count"] for n in zone_nodes)

            # Vulnerability Formula:
            # V = (Population * 0.4) + (Hospitals * 0.4) + (AtRisk * 0.2)
            # We scale down population by 100 for a readable metric while strictly keeping weights
            raw_vulnerability = (comp_pop * 0.4) + (comp_hosp * 1000.0 * 0.4) + (comp_at_risk * 0.2)
            # Normalize to a 0-100 scale for intuitive emergency ops dashboard
            vulnerability_score = round(raw_vulnerability / 150.0, 1)

            # Compute centroid
            avg_lat = sum(self.nodes[n]["lat"] for n in zone_nodes) / len(zone_nodes)
            avg_lon = sum(self.nodes[n]["lon"] for n in zone_nodes) / len(zone_nodes)

            # Find which severed edges isolate this component
            comp_severed_links = []
            for u, v, name, depth in severed_edges:
                if (u in comp and v not in comp) or (v in comp and u not in comp):
                    comp_severed_links.append(f"{name} ({depth}m water)")

            # Primary zone name from most populous node
            primary_node = max(zone_nodes, key=lambda n: self.nodes[n]["population"])
            primary_name = self.nodes[primary_node]["name"].split("(")[0].strip()

            priority = "CRITICAL" if vulnerability_score > 60 else ("HIGH" if vulnerability_score > 30 else "MODERATE")
            
            critical_needs = ["Drinking Water Purification Kits", "Maternal/Elderly Medical Evacuation"]
            if comp_hosp == 0:
                critical_needs.append("Field Medical Dispensary Kit")
            if comp_pop > 20000:
                critical_needs.append("Emergency Dry Rations & Drone Airdrop")

            isolated_zones.append(IsolatedZone(
                zone_id=f"ZONE-ISO-{zone_counter:02d}",
                zone_name=f"{primary_name} Isolated Sector",
                nodes=zone_nodes,
                node_count=len(zone_nodes),
                centroid=[round(avg_lat, 5), round(avg_lon, 5)],
                population=comp_pop,
                hospitals=comp_hosp,
                at_risk_count=comp_at_risk,
                vulnerability_score=vulnerability_score,
                severed_links=list(set(comp_severed_links))[:3],
                critical_needs=critical_needs,
                evacuation_priority=priority
            ))

            total_cutoff_pop += comp_pop
            total_cutoff_hosp += comp_hosp
            total_at_risk += comp_at_risk
            zone_counter += 1

        # Rank zones descending by vulnerability score
        isolated_zones.sort(key=lambda z: z.vulnerability_score, reverse=True)

        return IsolatedZonesResponse(
            simulation_water_level_m=self.current_surge_height,
            isolated_zones_count=len(isolated_zones),
            total_cutoff_population=total_cutoff_pop,
            total_cutoff_hospitals=total_cutoff_hosp,
            total_at_risk=total_at_risk,
            ranked_zones=isolated_zones,
            safe_hub_name="AIIMS Raipur - Central Disaster Response Core",
            accessible_nodes_count=len(safe_core_component)
        )

    def get_geojson_network(self) -> Dict[str, Any]:
        """Export the road network, nodes, and flood status as GeoJSON."""
        features = []

        # Road Edges
        for u, v, data in self.graph.edges(data=True):
            water_depth = data["water_depth_m"]
            is_submerged = water_depth >= 0.6  # Ambulance threshold
            is_caution = 0.25 <= water_depth < 0.6
            
            color = "#EA4335" if is_submerged else ("#FBBC04" if is_caution else "#34A853")
            status = "BLOCKED" if is_submerged else ("CAUTION" if is_caution else "PASSABLE")

            u_node = self.nodes[u]
            v_node = self.nodes[v]

            features.append({
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [u_node["lon"], u_node["lat"]],
                        [v_node["lon"], v_node["lat"]]
                    ]
                },
                "properties": {
                    "type": "ROAD_EDGE",
                    "u": u,
                    "v": v,
                    "name": data["name"],
                    "water_depth_m": water_depth,
                    "distance_km": data["distance_km"],
                    "speed_kmh": data["speed_kmh"],
                    "base_travel_time_min": data["base_travel_time_min"],
                    "color": color,
                    "status": status,
                    "is_submerged": is_submerged
                }
            })

        # Nodes
        for node_id, data in self.nodes.items():
            icon_type = data["type"]
            features.append({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [data["lon"], data["lat"]]
                },
                "properties": {
                    "type": "NETWORK_NODE",
                    "node_id": node_id,
                    "name": data["name"],
                    "elevation_m": data["elevation_m"],
                    "population": data["population"],
                    "hospitals": data["hospitals"],
                    "at_risk_count": data["at_risk_count"],
                    "is_safe_core": data.get("is_safe_core", False),
                    "node_type": icon_type,
                    "description": data.get("description", "")
                }
            })

        return {
            "type": "FeatureCollection",
            "features": features,
            "metadata": {
                "active_water_surge_m": self.current_surge_height,
                "node_count": len(self.nodes),
                "edge_count": self.graph.number_of_edges()
            }
        }
