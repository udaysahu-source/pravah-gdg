"""
PRAVAH: Dynamic Disaster Reachability Engine
Sample Data: Raipur / Mahanadi-Kharun River Basin
Realistic 24-Node Road Network Graph & Inundation Polygons
"""

# 24 Key Nodes across Raipur & Kharun River Basin
MOCK_NODES = {
    "AIIMS_RAIPUR": {
        "name": "AIIMS Raipur (Level-1 Trauma & Apex Hospital)",
        "lat": 21.2592,
        "lon": 81.5794,
        "type": "HOSPITAL",
        "elevation_m": 298.0,
        "population": 12000,
        "hospitals": 5,
        "at_risk_count": 850,
        "is_safe_core": True,
        "description": "Critical emergency receiving hospital with elevated heli-pad"
    },
    "MEKAHARA_HOSPITAL": {
        "name": "Dr. B.R. Ambedkar Memorial (Mekahara) Hospital",
        "lat": 21.2467,
        "lon": 81.6521,
        "type": "HOSPITAL",
        "elevation_m": 289.0,
        "population": 15000,
        "hospitals": 6,
        "at_risk_count": 1100,
        "is_safe_core": True,
        "description": "Largest state hospital complex and ICU center"
    },
    "EOC_COLLECTORATE": {
        "name": "District Emergency Operations Center (Collectorate)",
        "lat": 21.2415,
        "lon": 81.6380,
        "type": "COMMAND_CENTER",
        "elevation_m": 287.0,
        "population": 6000,
        "hospitals": 1,
        "at_risk_count": 120,
        "is_safe_core": True,
        "description": "Central Command & SDRF coordination hub"
    },
    "JAISTAMBH_CHOWK": {
        "name": "Jaistambh Chowk (Central Commerce Hub)",
        "lat": 21.2440,
        "lon": 81.6335,
        "type": "TRANSIT_HUB",
        "elevation_m": 286.0,
        "population": 28000,
        "hospitals": 1,
        "at_risk_count": 1400,
        "is_safe_core": True,
        "description": "Central urban junction connecting North and South sectors"
    },
    "TATIBANDH_CHOWK": {
        "name": "Tatibandh Chowk (NH-53 Transport Corridor)",
        "lat": 21.2618,
        "lon": 81.5645,
        "type": "LOGISTICS_HUB",
        "elevation_m": 295.0,
        "population": 22000,
        "hospitals": 2,
        "at_risk_count": 980,
        "is_safe_core": True,
        "description": "Heavy rescue vehicle and relief supply staging zone"
    },
    "SARONA_JUNCTION": {
        "name": "Sarona Junction & Residential Sector",
        "lat": 21.2480,
        "lon": 81.5830,
        "type": "RESIDENTIAL_BASIN",
        "elevation_m": 279.0,
        "population": 26000,
        "hospitals": 1,
        "at_risk_count": 1750,
        "is_safe_core": False,
        "description": "Low-lying residential catchment subject to urban backflow"
    },
    "KHARUN_BRIDGE_MAHADEV": {
        "name": "Mahadev Ghat Causeway (Kharun River)",
        "lat": 21.2355,
        "lon": 81.5982,
        "type": "RIVER_CROSSING",
        "elevation_m": 272.5,
        "population": 8500,
        "hospitals": 0,
        "at_risk_count": 720,
        "is_safe_core": False,
        "description": "Historic low-level river bridge; critical flash point during dam discharges"
    },
    "KHARUN_WEST_SETTLEMENT": {
        "name": "Kharun West Bank Settlement (Kumhari Flank)",
        "lat": 21.2320,
        "lon": 81.5860,
        "type": "VULNERABLE_ZONE",
        "elevation_m": 271.8,
        "population": 19500,
        "hospitals": 1,
        "at_risk_count": 2100,
        "is_safe_core": False,
        "description": "Dense informal settlements on floodplains, first to lose road links"
    },
    "CHHATAUNA_VILLAGE": {
        "name": "Chhatauna Riverbend Enclave",
        "lat": 21.2220,
        "lon": 81.5710,
        "type": "RURAL_SETTLEMENT",
        "elevation_m": 270.5,
        "population": 14200,
        "hospitals": 0,
        "at_risk_count": 1650,
        "is_safe_core": False,
        "description": "Farming community encircled on three sides by Kharun meanders"
    },
    "KATHADIH_CROSSING": {
        "name": "Kathadih Low-Level River Causeway",
        "lat": 21.2050,
        "lon": 81.5890,
        "type": "RIVER_CROSSING",
        "elevation_m": 272.0,
        "population": 7800,
        "hospitals": 0,
        "at_risk_count": 590,
        "is_safe_core": False,
        "description": "Secondary rural bridge connecting southern riparian belts"
    },
    "BHATAGAON_ISBT": {
        "name": "Bhatagaon Inter-State Bus Terminal (ISBT)",
        "lat": 21.2180,
        "lon": 81.6250,
        "type": "EVACUATION_CAMP",
        "elevation_m": 284.0,
        "population": 18000,
        "hospitals": 1,
        "at_risk_count": 890,
        "is_safe_core": True,
        "description": "High-capacity transit terminal repurposed for civilian shelter"
    },
    "SUNDER_NAGAR": {
        "name": "Sunder Nagar Ward",
        "lat": 21.2370,
        "lon": 81.6150,
        "type": "RESIDENTIAL_SECTOR",
        "elevation_m": 282.0,
        "population": 31000,
        "hospitals": 2,
        "at_risk_count": 1950,
        "is_safe_core": False,
        "description": "Dense middle-income neighborhood with moderate storm drainage"
    },
    "PURANI_BASTI": {
        "name": "Purani Basti Historic Core",
        "lat": 21.2310,
        "lon": 81.6300,
        "type": "DENSE_URBAN",
        "elevation_m": 283.0,
        "population": 34000,
        "hospitals": 1,
        "at_risk_count": 2400,
        "is_safe_core": False,
        "description": "Narrow alleyways, elderly population, high structural vulnerability"
    },
    "KALI_BADI": {
        "name": "Kali Badi Urban Clinic & Shelter",
        "lat": 21.2380,
        "lon": 81.6420,
        "type": "HOSPITAL",
        "elevation_m": 285.0,
        "population": 16000,
        "hospitals": 2,
        "at_risk_count": 850,
        "is_safe_core": True,
        "description": "Municipal maternal clinic and high-ground emergency post"
    },
    "TELIBANDHA_TALAB": {
        "name": "Telibandha Marine Drive Catchment",
        "lat": 21.2340,
        "lon": 81.6660,
        "type": "LAKE_BASIN",
        "elevation_m": 280.5,
        "population": 29000,
        "hospitals": 1,
        "at_risk_count": 1300,
        "is_safe_core": False,
        "description": "Promenade and low-lying commercial zone flanking Telibandha water body"
    },
    "SHANKAR_NAGAR": {
        "name": "Shankar Nagar Administrative Sector",
        "lat": 21.2490,
        "lon": 81.6700,
        "type": "SECURE_ZONE",
        "elevation_m": 292.0,
        "population": 21000,
        "hospitals": 2,
        "at_risk_count": 620,
        "is_safe_core": True,
        "description": "High ridge zone containing key ministerial and telecom installations"
    },
    "RAIPUR_RLY_STATION": {
        "name": "Raipur Junction Railway Station",
        "lat": 21.2580,
        "lon": 81.6310,
        "type": "TRANSIT_HUB",
        "elevation_m": 289.0,
        "population": 24000,
        "hospitals": 2,
        "at_risk_count": 950,
        "is_safe_core": True,
        "description": "Major inter-city rail corridor and medical train siding"
    },
    "PANDRI_EXPRESSWAY": {
        "name": "Pandri North Expressway",
        "lat": 21.2640,
        "lon": 81.6580,
        "type": "ARTERIAL_ROAD",
        "elevation_m": 291.0,
        "population": 23000,
        "hospitals": 1,
        "at_risk_count": 780,
        "is_safe_core": True,
        "description": "Multi-lane arterial connecting civil airport with northern ring"
    },
    "KOTA_STADIUM_ZONE": {
        "name": "Kota Indoor Stadium & Field Evac Center",
        "lat": 21.2720,
        "lon": 81.6050,
        "type": "EVACUATION_CAMP",
        "elevation_m": 294.0,
        "population": 14000,
        "hospitals": 1,
        "at_risk_count": 450,
        "is_safe_core": True,
        "description": "Massive covered stadium for 5,000 displaced citizens"
    },
    "RAMNAGAR_INDUSTRIAL": {
        "name": "Ramnagar Heavy Logistics Yard",
        "lat": 21.2690,
        "lon": 81.5880,
        "type": "LOGISTICS_HUB",
        "elevation_m": 293.0,
        "population": 11000,
        "hospitals": 0,
        "at_risk_count": 320,
        "is_safe_core": True,
        "description": "Heavy cranes, earthmovers, and generator staging grounds"
    },
    "VIP_ROAD_AIRPORT": {
        "name": "VIP Airport Arterial Junction",
        "lat": 21.2150,
        "lon": 81.6850,
        "type": "AIR_LINK",
        "elevation_m": 297.0,
        "population": 15000,
        "hospitals": 1,
        "at_risk_count": 410,
        "is_safe_core": True,
        "description": "Gateway to Swami Vivekananda Domestic Airport & IAF flood relief"
    },
    "NAYA_RAIPUR_LINK": {
        "name": "Naya Raipur Expressway Interchange",
        "lat": 21.1850,
        "lon": 81.7200,
        "type": "ARTERIAL_ROAD",
        "elevation_m": 305.0,
        "population": 17000,
        "hospitals": 2,
        "at_risk_count": 390,
        "is_safe_core": True,
        "description": "Elevated modern highway corridor to smart city back-up facilities"
    },
    "BORIA_KALAN": {
        "name": "Boria Kalan Lowland Basin",
        "lat": 21.1980,
        "lon": 81.6600,
        "type": "VULNERABLE_ZONE",
        "elevation_m": 277.0,
        "population": 22500,
        "hospitals": 1,
        "at_risk_count": 1820,
        "is_safe_core": False,
        "description": "Southern runoff catchment with blocked stormwater canals"
    },
    "SEJBAHAR_HUB": {
        "name": "Sejbahar Technical Campus Enclave",
        "lat": 21.1750,
        "lon": 81.6450,
        "type": "RESIDENTIAL_BASIN",
        "elevation_m": 278.5,
        "population": 16500,
        "hospitals": 0,
        "at_risk_count": 680,
        "is_safe_core": False,
        "description": "Southern institutional district; 8,000 university students"
    }
}

# 46 Network Road Edges connecting Raipur nodes
# flood_susceptibility: 0.0 (high elevation highway) to 1.0 (low-lying riverbed bridge)
MOCK_EDGES = [
    # AIIMS and West Cluster
    {"u": "AIIMS_RAIPUR", "v": "TATIBANDH_CHOWK", "name": "GE Road West Corridor", "distance_km": 1.7, "speed_kmh": 50, "flood_susceptibility": 0.05, "base_depth_m": 0.0},
    {"u": "AIIMS_RAIPUR", "v": "RAMNAGAR_INDUSTRIAL", "name": "AIIMS-Ramnagar Ring Link", "distance_km": 1.4, "speed_kmh": 45, "flood_susceptibility": 0.08, "base_depth_m": 0.0},
    {"u": "AIIMS_RAIPUR", "v": "SARONA_JUNCTION", "name": "Sarona Hospital Link Road", "distance_km": 1.3, "speed_kmh": 40, "flood_susceptibility": 0.35, "base_depth_m": 0.05},
    {"u": "TATIBANDH_CHOWK", "v": "RAMNAGAR_INDUSTRIAL", "name": "NH-53 Heavy Bypass", "distance_km": 2.5, "speed_kmh": 55, "flood_susceptibility": 0.05, "base_depth_m": 0.0},
    {"u": "TATIBANDH_CHOWK", "v": "KHARUN_WEST_SETTLEMENT", "name": "Kumhari Embankment Approach", "distance_km": 3.8, "speed_kmh": 35, "flood_susceptibility": 0.85, "base_depth_m": 0.35},
    
    # Kharun River Riparian Hotspots (Vulnerable bridges)
    {"u": "SARONA_JUNCTION", "v": "KHARUN_BRIDGE_MAHADEV", "name": "Mahadev Ghat North Access", "distance_km": 2.1, "speed_kmh": 30, "flood_susceptibility": 0.88, "base_depth_m": 0.40},
    {"u": "KHARUN_BRIDGE_MAHADEV", "v": "KHARUN_WEST_SETTLEMENT", "name": "Mahadev Ghat Low-Level Causeway", "distance_km": 1.3, "speed_kmh": 25, "flood_susceptibility": 0.98, "base_depth_m": 0.65},
    {"u": "KHARUN_WEST_SETTLEMENT", "v": "CHHATAUNA_VILLAGE", "name": "Chhatauna Riverbank Dirt Road", "distance_km": 2.0, "speed_kmh": 20, "flood_susceptibility": 0.95, "base_depth_m": 0.55},
    {"u": "CHHATAUNA_VILLAGE", "v": "KATHADIH_CROSSING", "name": "South Kharun Meander Path", "distance_km": 2.6, "speed_kmh": 25, "flood_susceptibility": 0.92, "base_depth_m": 0.50},
    {"u": "KATHADIH_CROSSING", "v": "BHATAGAON_ISBT", "name": "Kathadih-Bhatagaon Rural Connector", "distance_km": 4.1, "speed_kmh": 35, "flood_susceptibility": 0.75, "base_depth_m": 0.30},

    # Central Core & Sunder Nagar
    {"u": "SARONA_JUNCTION", "v": "SUNDER_NAGAR", "name": "Sunder Nagar West Arterial", "distance_km": 3.4, "speed_kmh": 40, "flood_susceptibility": 0.40, "base_depth_m": 0.10},
    {"u": "KHARUN_BRIDGE_MAHADEV", "v": "SUNDER_NAGAR", "name": "Ashram Road East Arterial", "distance_km": 1.8, "speed_kmh": 35, "flood_susceptibility": 0.65, "base_depth_m": 0.20},
    {"u": "SUNDER_NAGAR", "v": "PURANI_BASTI", "name": "Budhapara Lake Approach", "distance_km": 1.6, "speed_kmh": 30, "flood_susceptibility": 0.45, "base_depth_m": 0.15},
    {"u": "SUNDER_NAGAR", "v": "BHATAGAON_ISBT", "name": "Ring Road 1 South Connection", "distance_km": 2.3, "speed_kmh": 45, "flood_susceptibility": 0.20, "base_depth_m": 0.0},
    {"u": "PURANI_BASTI", "v": "JAISTAMBH_CHOWK", "name": "Sadar Bazaar Central Thoroughfare", "distance_km": 1.5, "speed_kmh": 30, "flood_susceptibility": 0.15, "base_depth_m": 0.0},
    {"u": "PURANI_BASTI", "v": "KALI_BADI", "name": "Old Basti-Kali Badi Cross Street", "distance_km": 1.4, "speed_kmh": 30, "flood_susceptibility": 0.20, "base_depth_m": 0.0},

    # Command Center & Central Arteries
    {"u": "JAISTAMBH_CHOWK", "v": "EOC_COLLECTORATE", "name": "Civil Lines VIP Avenue", "distance_km": 0.6, "speed_kmh": 40, "flood_susceptibility": 0.05, "base_depth_m": 0.0},
    {"u": "EOC_COLLECTORATE", "v": "KALI_BADI", "name": "Collectorate Relief Lane", "distance_km": 0.7, "speed_kmh": 35, "flood_susceptibility": 0.05, "base_depth_m": 0.0},
    {"u": "JAISTAMBH_CHOWK", "v": "RAIPUR_RLY_STATION", "name": "Station Road Elevated Flyover", "distance_km": 1.6, "speed_kmh": 40, "flood_susceptibility": 0.08, "base_depth_m": 0.0},
    {"u": "JAISTAMBH_CHOWK", "v": "SARONA_JUNCTION", "name": "GE Road Central Stretch", "distance_km": 5.2, "speed_kmh": 45, "flood_susceptibility": 0.22, "base_depth_m": 0.05},

    # Northern Hub & Hospitals
    {"u": "RAIPUR_RLY_STATION", "v": "KOTA_STADIUM_ZONE", "name": "Kota Stadium Link Expressway", "distance_km": 3.1, "speed_kmh": 45, "flood_susceptibility": 0.12, "base_depth_m": 0.0},
    {"u": "RAMNAGAR_INDUSTRIAL", "v": "KOTA_STADIUM_ZONE", "name": "North Ring Industrial Avenue", "distance_km": 1.8, "speed_kmh": 45, "flood_susceptibility": 0.10, "base_depth_m": 0.0},
    {"u": "RAIPUR_RLY_STATION", "v": "PANDRI_EXPRESSWAY", "name": "Devendra Nagar Bypass", "distance_km": 2.8, "speed_kmh": 45, "flood_susceptibility": 0.10, "base_depth_m": 0.0},
    {"u": "PANDRI_EXPRESSWAY", "v": "MEKAHARA_HOSPITAL", "name": "Mekahara Trauma Corridor", "distance_km": 2.0, "speed_kmh": 45, "flood_susceptibility": 0.08, "base_depth_m": 0.0},
    {"u": "PANDRI_EXPRESSWAY", "v": "SHANKAR_NAGAR", "name": "VIP Raj Bhavan Road", "distance_km": 2.1, "speed_kmh": 50, "flood_susceptibility": 0.05, "base_depth_m": 0.0},

    # East Sector & Telibandha Marine Drive
    {"u": "MEKAHARA_HOSPITAL", "v": "SHANKAR_NAGAR", "name": "Shankar Nagar Hospital Transit", "distance_km": 1.9, "speed_kmh": 45, "flood_susceptibility": 0.06, "base_depth_m": 0.0},
    {"u": "MEKAHARA_HOSPITAL", "v": "KALI_BADI", "name": "Tagore Nagar Arterial", "distance_km": 1.4, "speed_kmh": 35, "flood_susceptibility": 0.12, "base_depth_m": 0.0},
    {"u": "KALI_BADI", "v": "TELIBANDHA_TALAB", "name": "Telibandha Main Approach", "distance_km": 2.5, "speed_kmh": 40, "flood_susceptibility": 0.55, "base_depth_m": 0.20},
    {"u": "SHANKAR_NAGAR", "v": "TELIBANDHA_TALAB", "name": "Marine Drive North Link", "distance_km": 1.7, "speed_kmh": 40, "flood_susceptibility": 0.60, "base_depth_m": 0.25},
    {"u": "TELIBANDHA_TALAB", "v": "VIP_ROAD_AIRPORT", "name": "Airport Expressway South", "distance_km": 2.8, "speed_kmh": 55, "flood_susceptibility": 0.30, "base_depth_m": 0.10},

    # Southern Belts & Naya Raipur Link
    {"u": "BHATAGAON_ISBT", "v": "PURANI_BASTI", "name": "Mathpurena Access Road", "distance_km": 1.5, "speed_kmh": 35, "flood_susceptibility": 0.25, "base_depth_m": 0.05},
    {"u": "BHATAGAON_ISBT", "v": "BORIA_KALAN", "name": "Santoshi Nagar-Boria Link", "distance_km": 4.2, "speed_kmh": 40, "flood_susceptibility": 0.70, "base_depth_m": 0.30},
    {"u": "BORIA_KALAN", "v": "SEJBAHAR_HUB", "name": "Dhamtari Road Southern Artery", "distance_km": 3.0, "speed_kmh": 40, "flood_susceptibility": 0.72, "base_depth_m": 0.35},
    {"u": "BORIA_KALAN", "v": "VIP_ROAD_AIRPORT", "name": "Mana Camp Military Bypass", "distance_km": 3.2, "speed_kmh": 45, "flood_susceptibility": 0.35, "base_depth_m": 0.10},
    {"u": "VIP_ROAD_AIRPORT", "v": "NAYA_RAIPUR_LINK", "name": "Atal Nagar Elevated Freeway", "distance_km": 4.9, "speed_kmh": 65, "flood_susceptibility": 0.02, "base_depth_m": 0.0},
    {"u": "SEJBAHAR_HUB", "v": "NAYA_RAIPUR_LINK", "name": "Kandarka Canal Corridor", "distance_km": 7.8, "speed_kmh": 45, "flood_susceptibility": 0.50, "base_depth_m": 0.15},

    # Redundant Cross-city Emergency Links
    {"u": "AIIMS_RAIPUR", "v": "KOTA_STADIUM_ZONE", "name": "Saraswati Nagar Overpass", "distance_km": 2.9, "speed_kmh": 45, "flood_susceptibility": 0.10, "base_depth_m": 0.0},
    {"u": "SARONA_JUNCTION", "v": "RAIPUR_RLY_STATION", "name": "Gudhiyari Industrial Artery", "distance_km": 5.0, "speed_kmh": 40, "flood_susceptibility": 0.18, "base_depth_m": 0.0},
    {"u": "MEKAHARA_HOSPITAL", "v": "EOC_COLLECTORATE", "name": "Medical College Civil Connector", "distance_km": 1.6, "speed_kmh": 35, "flood_susceptibility": 0.08, "base_depth_m": 0.0},
    {"u": "BHATAGAON_ISBT", "v": "TELIBANDHA_TALAB", "name": "Ring Road 1 East Connector", "distance_km": 4.5, "speed_kmh": 50, "flood_susceptibility": 0.28, "base_depth_m": 0.05}
]

# Flood Inundation Polygons (GeoJSON MultiPolygon / FeatureCollection)
# Scoped along Kharun River Basin, Telibandha Lake overflow, and Sarona Canal lowlands
MOCK_FLOOD_POLYGONS = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "id": "FLOOD_ZONE_KHARUN_BASIN",
                "name": "Kharun River Primary Spillway & Floodplain",
                "severity": "CRITICAL",
                "base_depth_m": 0.85,
                "current_depth_m": 0.85,
                "flow_velocity_ms": 2.4,
                "fill_color": "#EA4335"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [81.5620, 21.2650],
                    [81.5750, 21.2450],
                    [81.5900, 21.2380],
                    [81.6020, 21.2320],
                    [81.5950, 21.2150],
                    [81.5800, 21.2000],
                    [81.5650, 21.2150],
                    [81.5700, 21.2400],
                    [81.5620, 21.2650]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "FLOOD_ZONE_TELIBANDHA",
                "name": "Telibandha Lake Backwater Basin",
                "severity": "HIGH",
                "base_depth_m": 0.50,
                "current_depth_m": 0.50,
                "flow_velocity_ms": 0.8,
                "fill_color": "#FBBC04"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [81.6580, 21.2420],
                    [81.6750, 21.2400],
                    [81.6780, 21.2280],
                    [81.6600, 21.2270],
                    [81.6580, 21.2420]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "FLOOD_ZONE_BORIA_RUNOFF",
                "name": "Boria Kalan Southern Storm Runoff Canal",
                "severity": "MODERATE",
                "base_depth_m": 0.45,
                "current_depth_m": 0.45,
                "flow_velocity_ms": 1.1,
                "fill_color": "#FBBC04"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [81.6450, 21.2050],
                    [81.6700, 21.2050],
                    [81.6680, 21.1900],
                    [81.6480, 21.1900],
                    [81.6450, 21.2050]
                ]]
            }
        }
    ]
}

# Pre-seeded Citizen Ground Reports for Testing / Demos
SAMPLE_CITIZEN_REPORTS = [
    {
        "id": "REP_001",
        "location_name": "Mahadev Ghat Causeway, Kharun River",
        "lat": 21.2355,
        "lon": 81.5982,
        "text": "Water is rushing fast over the Mahadev Ghat bridge. It is already above knee-deep (almost 0.75m). Two auto-rickshaws were abandoned. Regular cars and ambulances cannot cross at all!",
        "observable_cues": ["knee-deep rushing water", "auto-rickshaws partially submerged above floorboard", "bridge guardrail half underwater"],
        "estimated_water_depth_m": 0.75,
        "reference_object": "adult knees and auto-rickshaw wheel arches",
        "ambulance_passable": False,
        "vehicle_impact_assessment": "Complete road impassable for all standard emergency vehicles and ambulances. Only NDRF inflatable motorized rescue boats can navigate.",
        "confidence_score": 0.4,
        "hazard_flags": ["Strong river cross-current", "Dam gate discharge expected", "Submerged guardrails"],
        "recommended_action": "Erect police barricades at Sarona and Kumhari approach roads. Reroute AIIMS trauma ambulances via Ring Road Overpass."
    },
    {
        "id": "REP_002",
        "location_name": "Telibandha Marine Drive South Lane",
        "lat": 21.2340,
        "lon": 81.6660,
        "text": "Lake overflowed onto the promenade road. Water reaches ankle-to-shin level, roughly up to the tire rims of cars (about 0.28m). Traffic is moving slowly.",
        "observable_cues": ["ankle-to-shin level water", "water up to sedan wheel rims", "curb submerged"],
        "estimated_water_depth_m": 0.28,
        "reference_object": "passenger sedan wheel rim / sidewalk curb",
        "ambulance_passable": True,
        "vehicle_impact_assessment": "Passable for ambulances and heavy trucks with caution (speed limit 20km/h). Small low-clearance hatchbacks experiencing engine stall risks.",
        "confidence_score": 0.4,
        "hazard_flags": ["Open storm drains concealed under muddy water", "Floating plastic debris"],
        "recommended_action": "Deploy municipal suction pumps at Marine Drive outlet. Station traffic marshals to guide emergency vehicles to center lane."
    },
    {
        "id": "REP_003",
        "location_name": "Chhatauna Riverbend Enclave",
        "lat": 21.2220,
        "lon": 81.5710,
        "text": "Entire village access road is cut off. Water reached waist height (1.1m) on the culvert. A tractor is stuck with water touching its exhaust pipe. 14,000 villagers are stranded with pregnant women needing care.",
        "observable_cues": ["waist-height water", "tractor exhaust pipe reached", "culvert submerged by over 1 meter"],
        "estimated_water_depth_m": 1.10,
        "reference_object": "adult waistline and tractor exhaust manifold",
        "ambulance_passable": False,
        "vehicle_impact_assessment": "Lethal for all terrestrial vehicles. Ground clearance exceeded by 100%. Severe stalling and hydrostatic engine lock.",
        "confidence_score": 0.4,
        "hazard_flags": ["14,000 isolated villagers", "Submerged electrical sub-station", "Dialysis and maternal patients cut off"],
        "recommended_action": "Declare Zone Critical Isolation. Dispatch SDRF zodiac boats and trigger CAP emergency broadcast in Hindi & Chhattisgarhi."
    }
]
