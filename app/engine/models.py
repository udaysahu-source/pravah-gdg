"""
PRAVAH: Dynamic Disaster Reachability Engine
Data Models & Schemas
"""
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class GroundReportRequest(BaseModel):
    text: Optional[str] = Field(None, description="Citizen text description of flood situation")
    image_base64: Optional[str] = Field(None, description="Optional Base64 encoded image string")
    location_name: Optional[str] = Field(None, description="Landmark or street name")
    latitude: Optional[float] = Field(None, description="Latitude of report")
    longitude: Optional[float] = Field(None, description="Longitude of report")


class GroundReportAnalysis(BaseModel):
    observable_cues: List[str] = Field(
        default_factory=list,
        description="Observable flood depth reference cues like 'knee-deep', 'car wheel submerged', 'curb overflow'"
    )
    estimated_water_depth_m: float = Field(
        ...,
        description="Estimated water depth in meters"
    )
    reference_object: str = Field(
        ...,
        description="Key physical reference object identified for scale (e.g., car wheel hub, adult knees, divider wall)"
    )
    ambulance_passable: bool = Field(
        ...,
        description="True if estimated_water_depth <= 0.6m, False if > 0.6m (standard emergency ambulance clearance)"
    )
    vehicle_impact_assessment: str = Field(
        ...,
        description="Operational impact on civilian cars, ambulances, and NDRF motorized rescue boats"
    )
    confidence_score: float = Field(
        default=0.4,
        description="Baseline confidence score (0.4 for Unverified Citizen Hint per protocol)"
    )
    verification_status: str = Field(
        default="Unverified Citizen Hint",
        description="Verification classification tag"
    )
    hazard_flags: List[str] = Field(
        default_factory=list,
        description="Visible or probable secondary hazards like open drains, live transformers, fast river currents"
    )
    recommended_action: str = Field(
        ...,
        description="Immediate tactical action recommended for Emergency Operations Center"
    )
    timestamp: Optional[str] = None
    reported_location: Optional[str] = None


class RouteRequest(BaseModel):
    origin_node: Optional[str] = Field(None, description="ID of origin junction/node")
    destination_node: Optional[str] = Field(None, description="ID of destination hospital/node")
    origin_coords: Optional[List[float]] = Field(None, description="[lat, lng] if clicking on map directly")
    destination_coords: Optional[List[float]] = Field(None, description="[lat, lng] if clicking on map directly")
    vehicle_clearance: float = Field(
        default=0.6,
        description="Target vehicle clearance limit in meters (0.3m for civilian car, 0.6m for ambulance, 1.0m for heavy rescue truck)"
    )
    water_simulation_offset: Optional[float] = Field(
        default=None,
        description="Optional active flood surge level in meters (0.0m - 1.5m)"
    )


class EdgeTraversalDetail(BaseModel):
    from_node: str
    to_node: str
    road_name: str
    distance_km: float
    travel_time_min: float
    water_depth_m: float
    is_submerged: bool
    status: str
    penalty_multiplier: float


class RouteResponse(BaseModel):
    status: str = Field(..., description="'OPTIMAL', 'CAUTION_HIGH_WATER', or 'BLOCKED'")
    path_nodes: List[str] = Field(default_factory=list)
    path_coords: List[List[float]] = Field(default_factory=list, description="[[lat, lng], ...]")
    total_distance_km: float
    total_travel_time_min: float
    max_water_depth_m: float
    vehicle_clearance_limit_m: float
    safety_margin_m: float
    is_ambulance_passable: bool
    traversed_edges: List[EdgeTraversalDetail] = Field(default_factory=list)
    bottleneck_edges: List[Dict[str, Any]] = Field(default_factory=list)
    evacuation_advisory: str


class IsolatedZone(BaseModel):
    zone_id: str
    zone_name: str
    nodes: List[str]
    node_count: int
    centroid: List[float] = Field(description="[lat, lng]")
    population: int
    hospitals: int
    at_risk_count: int
    vulnerability_score: float = Field(
        description="V = (Population * 0.4) + (Hospitals * 0.4) + (AtRisk * 0.2)"
    )
    severed_links: List[str] = Field(default_factory=list)
    critical_needs: List[str] = Field(default_factory=list)
    evacuation_priority: str = Field(description="'CRITICAL', 'HIGH', or 'MODERATE'")


class IsolatedZonesResponse(BaseModel):
    simulation_water_level_m: float
    isolated_zones_count: int
    total_cutoff_population: int
    total_cutoff_hospitals: int
    total_at_risk: int
    ranked_zones: List[IsolatedZone]
    safe_hub_name: str
    accessible_nodes_count: int


class CapAlertRequest(BaseModel):
    zone_id: str
    zone_name: Optional[str] = None
    population: Optional[int] = None
    vulnerability_score: Optional[float] = None
    water_depth_m: Optional[float] = None
    approved_by_officer: bool = Field(
        default=False,
        description="Human approval boolean required before alert can achieve 'Dispatched' status"
    )
    approver_notes: Optional[str] = Field(
        default=None,
        description="Officer notes, signature, or dispatch authorization code"
    )


class CapAlertResponse(BaseModel):
    alert_id: str
    zone_id: str
    status: str = Field(..., description="'PENDING_APPROVAL' or 'DISPATCHED'")
    cap_xml: str = Field(..., description="Full OASIS Common Alerting Protocol v1.2 XML string")
    hindi_sms: str = Field(..., description="Localized Hindi SMS broadcast under 160 characters")
    chhattisgarhi_sms: str = Field(..., description="Authentic Chhattisgarhi regional dialect SMS broadcast under 160 characters")
    urgency: str
    severity: str
    certainty: str
    headline: str
    description: str
    instruction: str
    broadcast_channels: List[str]
    requires_human_approval: bool
    dispatch_timestamp: Optional[str] = None
    dispatched_by: Optional[str] = None


class WaterSimulationRequest(BaseModel):
    water_height_m: float = Field(..., ge=0.0, le=2.5, description="Flood surge level in meters (0.0 - 2.5)")


class SystemHealthResponse(BaseModel):
    system: str = "PRAVAH: Dynamic Disaster Reachability Engine"
    version: str = "1.0.0"
    status: str = "ONLINE"
    nodes_loaded: int
    edges_loaded: int
    target_basin: str = "Mahanadi / Kharun River Basin (Raipur, Chhattisgarh)"
    gemini_ai_status: str
    gemini_model: str
