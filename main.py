"""
PRAVAH: Dynamic Disaster Reachability Engine
Production-ready FastAPI Backend
Author: Senior Full-Stack GIS Developer
"""

import os
import base64
from typing import Optional, List, Dict, Any
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, UploadFile, File, Form, HTTPException, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse, JSONResponse

from app.engine.models import (
    GroundReportRequest, GroundReportAnalysis,
    RouteRequest, RouteResponse,
    IsolatedZonesResponse,
    CapAlertRequest, CapAlertResponse,
    WaterSimulationRequest, SystemHealthResponse
)
from app.engine.graph import ReachabilityGraphEngine
from app.engine.gemini_service import GeminiDisasterEngine
from app.engine.sample_data import SAMPLE_CITIZEN_REPORTS

# Global engine singletons
graph_engine = ReachabilityGraphEngine()
gemini_engine = GeminiDisasterEngine()

# In-memory storage for submitted citizen reports during current session
citizen_reports_db: List[Dict[str, Any]] = list(SAMPLE_CITIZEN_REPORTS)


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("=" * 60)
    print("🌊 PRAVAH: Dynamic Disaster Reachability Engine Initialized")
    print(f"📍 Loaded Graph: {graph_engine.graph.number_of_nodes()} Nodes, {graph_engine.graph.number_of_edges()} Edges")
    print(f"🤖 Gemini 3.7 Flash Status: {'LIVE API KEY ACTIVE' if gemini_engine.is_live() else 'RESILIENT HEURISTICS ACTIVE'}")
    print("=" * 60)
    yield


app = FastAPI(
    title="PRAVAH: Dynamic Disaster Reachability Engine",
    description="Emergency GIS & AI-powered Disaster Reachability Engine for Hackathons",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Static Assets
app.mount("/static", StaticFiles(directory="static"), name="static")


# ---------------------------------------------------------------------------
# 1. System Health Endpoint
# ---------------------------------------------------------------------------
@app.get("/api/v1/health", response_model=SystemHealthResponse)
async def get_system_health():
    """
    GET /api/v1/health
    Returns system status and loaded road graph node count.
    """
    return SystemHealthResponse(
        system="PRAVAH: Dynamic Disaster Reachability Engine",
        version="1.0.0",
        status="ONLINE",
        nodes_loaded=graph_engine.graph.number_of_nodes(),
        edges_loaded=graph_engine.graph.number_of_edges(),
        target_basin="Mahanadi / Kharun River Basin (Raipur, Chhattisgarh)",
        gemini_ai_status="CONNECTED" if gemini_engine.is_live() else "FALLBACK_STANDBY (Offline Resilient)",
        gemini_model="gemini-3.7-flash"
    )


# ---------------------------------------------------------------------------
# 2. Citizen Ground Report Intake & Analysis (Gemini 3.7 Flash)
@app.post("/api/v1/analyze-ground-report", response_model=GroundReportAnalysis)
async def analyze_ground_report(request: Request):
    """
    POST /api/v1/analyze-ground-report
    Accepts an image byte payload or text description (via JSON or multipart/form-data).
    Uses Gemini 3.7 Flash to extract observable flood depth reference cues (e.g. 'knee-deep', 'car wheel submerged'),
    estimates water depth in meters, flags ambulance passability (threshold > 0.6m = False),
    and assigns a baseline confidence score of 0.4 ('Unverified Citizen Hint').
    """
    rep_text = None
    rep_loc = None
    img_b64 = None

    content_type = request.headers.get("content-type", "")
    if "application/json" in content_type:
        try:
            body = await request.json()
            rep_text = body.get("text")
            rep_loc = body.get("location_name")
            img_b64 = body.get("image_base64")
        except Exception:
            pass
    elif "multipart/form-data" in content_type or "application/x-www-form-urlencoded" in content_type:
        try:
            form = await request.form()
            rep_text = form.get("text")
            rep_loc = form.get("location_name")
            file_item = form.get("image")
            if file_item and hasattr(file_item, "read"):
                contents = await file_item.read()
                img_b64 = base64.b64encode(contents).decode("utf-8")
        except Exception:
            pass
    else:
        try:
            body = await request.json()
            rep_text = body.get("text")
            rep_loc = body.get("location_name")
            img_b64 = body.get("image_base64")
        except Exception:
            pass

    if not rep_text and not img_b64:
        rep_text = "Water is rising quickly near the bridge. Multiple vehicles stranded."

    # Call Gemini Engine with Pydantic JSON Schema
    analysis = await gemini_engine.analyze_ground_report(
        text=rep_text,
        image_base64=img_b64,
        location_name=rep_loc or "Kharun Riparian Sector, Raipur"
    )

    # Store in session reports DB
    report_entry = {
        "id": f"REP_{len(citizen_reports_db) + 1:03d}",
        "location_name": rep_loc or "Raipur Sector",
        "text": rep_text,
        "observable_cues": analysis.observable_cues,
        "estimated_water_depth_m": analysis.estimated_water_depth_m,
        "reference_object": analysis.reference_object,
        "ambulance_passable": analysis.ambulance_passable,
        "vehicle_impact_assessment": analysis.vehicle_impact_assessment,
        "confidence_score": analysis.confidence_score,
        "hazard_flags": analysis.hazard_flags,
        "recommended_action": analysis.recommended_action
    }
    citizen_reports_db.insert(0, report_entry)

    return analysis


# ---------------------------------------------------------------------------
# 3. Dynamic Dijkstra Route Calculation
# ---------------------------------------------------------------------------
@app.post("/api/v1/route", response_model=RouteResponse)
async def calculate_route(request: RouteRequest):
    """
    POST /api/v1/route
    Accepts origin/destination coordinates and target vehicle clearance (0.3m for light cars, 0.6m for ambulances).
    Calculates dynamic shortest path using Dijkstra's algorithm where:
    road edge weight = travel_time * (1 + (water_depth / clearance_limit)^2)
    If water_depth >= clearance_limit, set weight = infinity (blocked).
    """
    return graph_engine.calculate_emergency_route(
        origin_node=request.origin_node,
        destination_node=request.destination_node,
        origin_coords=request.origin_coords,
        destination_coords=request.destination_coords,
        clearance_limit=request.vehicle_clearance,
        water_simulation_offset=request.water_simulation_offset
    )


# ---------------------------------------------------------------------------
# 4. Disconnected Sub-graphs & Vulnerability Ranking
# ---------------------------------------------------------------------------
@app.get("/api/v1/isolated-zones", response_model=IsolatedZonesResponse)
async def get_isolated_zones(
    clearance_limit: float = Query(0.6, description="Clearance threshold to define passable roads in meters")
):
    """
    GET /api/v1/isolated-zones
    Calculates disconnected sub-graphs and ranks cut-off zones by a Vulnerability Score:
    V = (Population * 0.4) + (Hospitals * 0.4) + (AtRisk * 0.2)
    """
    return graph_engine.calculate_isolated_zones(clearance_limit=clearance_limit)


# ---------------------------------------------------------------------------
# 5. Multilingual CAP Broadcast Alert (Gemini 3.7 Flash)
# ---------------------------------------------------------------------------
@app.post("/api/v1/generate-cap-alert", response_model=CapAlertResponse)
async def generate_cap_alert(request: CapAlertRequest):
    """
    POST /api/v1/generate-cap-alert
    Uses Gemini 3.7 Flash to auto-draft a Common Alerting Protocol (CAP) XML payload
    and localized Hindi/Chhattisgarhi SMS alert messages for a selected isolated zone,
    requiring a human approval boolean before returning a 'Dispatched' status.
    """
    return await gemini_engine.generate_cap_alert(
        zone_id=request.zone_id,
        zone_name=request.zone_name,
        population=request.population,
        vulnerability_score=request.vulnerability_score,
        water_depth_m=request.water_depth_m,
        approved_by_officer=request.approved_by_officer,
        approver_notes=request.approver_notes
    )


# ---------------------------------------------------------------------------
# 6. Auxiliary Endpoints for Control Room UI
# ---------------------------------------------------------------------------
@app.get("/api/v1/network")
async def get_network():
    """
    GET /api/v1/network
    Returns GeoJSON representation of nodes, road edges, flood depths, and flood polygons.
    """
    geojson = graph_engine.get_geojson_network()
    geojson["flood_polygons"] = graph_engine.flood_polygons
    return geojson


@app.post("/api/v1/simulate-water-level")
async def simulate_water_level(request: WaterSimulationRequest):
    """
    POST /api/v1/simulate-water-level
    Dynamically adjusts water surge level from 0.0m to 1.5m and updates road inundation.
    """
    result = graph_engine.set_water_surge_height(request.water_height_m)
    return result


@app.get("/api/v1/reports")
async def get_reports():
    """Returns list of recent citizen ground intake reports."""
    return {"reports": citizen_reports_db}


@app.post("/api/v1/config/gemini-key")
async def set_gemini_key(body: Dict[str, str]):
    """Update Gemini API Key dynamically at runtime from dashboard."""
    key = body.get("api_key", "")
    return gemini_engine.set_api_key(key)


# ---------------------------------------------------------------------------
# Frontend Dashboard Route
# ---------------------------------------------------------------------------
@app.get("/", response_class=HTMLResponse)
async def serve_dashboard():
    """Serves the Single-Page Control Room Emergency Dashboard."""
    return FileResponse("static/index.html")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
