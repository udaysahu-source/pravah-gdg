/**
 * PRAVAH: Dynamic Disaster Reachability Engine
 * Operations Center Dashboard Frontend Engine
 * Leaflet GIS, Dynamic Dijkstra Routing, Gemini 3.7 Flash Intake, CAP Broadcast
 */

// Global State
let map = null;
let networkData = null;
let edgeLayerGroup = null;
let nodeLayerGroup = null;
let floodPolygonLayerGroup = null;
let activeRouteLayer = null;

let selectedClearance = 0.6; // default ambulance clearance in meters
let activeSurgeHeight = 0.35;
let currentActiveZoneForCap = null;
let mapClickMode = null; // 'origin' or 'destination' or null
let currentRouteOrigin = "BHATAGAON_ISBT";
let currentRouteDestination = "AIIMS_RAIPUR";
let currentImageBase64 = null;

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initLiveClock();
  initLeafletMap();
  loadSystemHealth();
  loadNetworkAndGraph();
  loadIsolatedZones();
  loadRecentReports();
  setupEventListeners();
});

// ---------------------------------------------------------------------------
// 0. Segmented Dock Tab Navigation
// ---------------------------------------------------------------------------
function switchDockTab(tabKey, btnEl) {
  // Update button active state
  document.querySelectorAll(".dock-segmented-tabs .dock-tab-btn").forEach(b => b.classList.remove("active"));
  if (btnEl) {
    btnEl.classList.add("active");
  } else {
    const btn = document.getElementById(`btn-tab-${tabKey}`);
    if (btn) btn.classList.add("active");
  }

  // Update pane active state
  document.querySelectorAll(".dock-pane").forEach(p => p.classList.remove("active"));
  const targetPane = document.getElementById(`pane-dock-${tabKey}`);
  if (targetPane) targetPane.classList.add("active");

  // Invalidate Leaflet map size to prevent any rendering seams
  if (map) {
    setTimeout(() => { map.invalidateSize(); }, 50);
  }
}

// ---------------------------------------------------------------------------
// 1. Clock & System Telemetry
// ---------------------------------------------------------------------------
function initLiveClock() {
  const clockEl = document.getElementById("live-clock");
  const update = () => {
    const now = new Date();
    clockEl.innerText = now.toLocaleTimeString("en-IN", { hour12: false }) + " IST";
  };
  update();
  setInterval(update, 1000);
}

async function loadSystemHealth() {
  try {
    const res = await fetch("/api/v1/health");
    if (!res.ok) return;
    const data = await res.json();
    
    document.getElementById("txt-sys-status").innerText = 
      `SYS: ${data.status} (${data.nodes_loaded}N / ${data.edges_loaded}E)`;

    const geminiTxt = document.getElementById("txt-gemini-status");
    if (data.gemini_ai_status.includes("CONNECTED")) {
      geminiTxt.innerHTML = `<span style="color: #34a853;">●</span> Gemini 3.7 Live`;
    } else {
      geminiTxt.innerHTML = `<span style="color: #fbbc04;">●</span> Gemini 3.7 (Heuristics)`;
    }
  } catch (err) {
    console.error("Health check error:", err);
  }
}

// ---------------------------------------------------------------------------
// 2. Leaflet GIS Map Initialization
// ---------------------------------------------------------------------------
let currentBasemapType = 'dark'; // 'dark' or 'osm'
let baseTileLayer = null;

function initLeafletMap() {
  // Scoped to Raipur & Kharun River Basin
  map = L.map("leaflet-map", {
    center: [21.238, 81.628],
    zoom: 13,
    zoomControl: true,
    attributionControl: false
  });

  // Dedicated Route Pane with highest zIndex (650) to always render route above roads & flood zones
  const routePane = map.createPane('routePane');
  routePane.style.zIndex = 650;

  // Key-free Dark Matter Basemap with proper open attribution
  baseTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    subdomains: 'abcd',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(map);

  // Layer groups for clean updates
  floodPolygonLayerGroup = L.layerGroup().addTo(map);
  edgeLayerGroup = L.layerGroup().addTo(map);
  nodeLayerGroup = L.layerGroup().addTo(map);
  activeRouteLayer = L.layerGroup().addTo(map);

  map.on("click", (e) => {
    if (!mapClickMode) return;
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    
    // Find nearest node
    if (networkData && networkData.features) {
      let nearest = null;
      let minDist = Infinity;
      networkData.features.forEach(f => {
        if (f.properties.type === "NETWORK_NODE") {
          const coords = f.geometry.coordinates;
          const d = Math.hypot(coords[1] - lat, coords[0] - lng);
          if (d < minDist) {
            minDist = d;
            nearest = f.properties;
          }
        }
      });

      if (nearest) {
        if (mapClickMode === "origin") {
          document.getElementById("select-origin").value = nearest.node_id;
          currentRouteOrigin = nearest.node_id;
          logTacticalEvent(`Set route Origin to: ${nearest.name}`);
        } else if (mapClickMode === "destination") {
          document.getElementById("select-destination").value = nearest.node_id;
          currentRouteDestination = nearest.node_id;
          logTacticalEvent(`Set route Destination to: ${nearest.name}`);
        }
        toggleMapClickMode(null);
        triggerCalculateRoute();
      }
    }
  });
}

function resetMapView() {
  if (map) {
    map.setView([21.238, 81.628], 13);
  }
}

function toggleBasemapTiles() {
  if (!map) return;
  if (baseTileLayer) {
    map.removeLayer(baseTileLayer);
  }

  const lbl = document.getElementById("txt-basemap-name");
  if (currentBasemapType === 'dark') {
    // Switch to standard OpenStreetMap (100% key-free, crisp emergency cartography)
    baseTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    currentBasemapType = 'osm';
    if (lbl) lbl.innerText = "Basemap: OpenStreetMap";
    logTacticalEvent("Switched basemap to Standard OpenStreetMap");
  } else {
    // Switch back to Dark Matter
    baseTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(map);
    currentBasemapType = 'dark';
    if (lbl) lbl.innerText = "Basemap: Dark Matter";
    logTacticalEvent("Switched basemap to Public Dark Matter");
  }

  // Ensure route and edges remain on top
  if (edgeLayerGroup) edgeLayerGroup.bringToBack();
  if (activeRouteLayer) activeRouteLayer.bringToFront();
}

function toggleMapClickMode() {
  const btn = document.getElementById("txt-click-mode");
  if (!mapClickMode) {
    mapClickMode = "origin";
    btn.innerText = "Click Map: Set Origin";
    btn.parentElement.style.borderColor = "var(--color-google-blue)";
  } else if (mapClickMode === "origin") {
    mapClickMode = "destination";
    btn.innerText = "Click Map: Set Dest";
    btn.parentElement.style.borderColor = "var(--color-alert-red)";
  } else {
    mapClickMode = null;
    btn.innerText = "Set Points via Map: OFF";
    btn.parentElement.style.borderColor = "var(--border-subtle)";
  }
}

// ---------------------------------------------------------------------------
// 3. Network & Road Graph Rendering
// ---------------------------------------------------------------------------
async function loadNetworkAndGraph() {
  try {
    const res = await fetch("/api/v1/network");
    if (!res.ok) return;
    networkData = await res.json();

    // Render Flood Inundation Polygons
    renderFloodPolygons(networkData.flood_polygons);

    // Render Edges
    renderEdges(networkData.features.filter(f => f.properties.type === "ROAD_EDGE"));

    // Render Nodes & Populate Dropdowns
    const nodeFeatures = networkData.features.filter(f => f.properties.type === "NETWORK_NODE");
    renderNodes(nodeFeatures);
    populateSelectDropdowns(nodeFeatures);

  } catch (err) {
    console.error("Failed to load network:", err);
  }
}

function renderFloodPolygons(polygonsGeoJSON) {
  floodPolygonLayerGroup.clearLayers();
  if (!polygonsGeoJSON || !polygonsGeoJSON.features) return;

  L.geoJSON(polygonsGeoJSON, {
    style: (feature) => {
      const color = feature.properties.fill_color || "#EA4335";
      return {
        color: color,
        weight: 1.5,
        dashArray: "4, 6",
        fillColor: color,
        fillOpacity: 0.22
      };
    },
    onEachFeature: (feature, layer) => {
      layer.bindTooltip(`
        <strong>${feature.properties.name}</strong><br>
        Severity: <span style="color:#ef4444; font-weight:700;">${feature.properties.severity}</span><br>
        Current Water Level: ${feature.properties.current_depth_m}m<br>
        Flow Velocity: ${feature.properties.flow_velocity_ms} m/s
      `, { sticky: true });
    }
  }).addTo(floodPolygonLayerGroup);
}

function renderEdges(edgeFeatures) {
  edgeLayerGroup.clearLayers();

  edgeFeatures.forEach(edge => {
    const coords = edge.geometry.coordinates.map(c => [c[1], c[0]]); // GeoJSON [lng, lat] to Leaflet [lat, lng]
    const props = edge.properties;
    
    const polyline = L.polyline(coords, {
      color: props.color,
      weight: props.is_submerged ? 5 : 3.5,
      opacity: props.is_submerged ? 0.95 : 0.8,
      dashArray: props.is_submerged ? "6, 6" : null
    });

    polyline.bindTooltip(`
      <strong>${props.name}</strong><br>
      Status: <span style="color:${props.color}; font-weight:bold;">${props.status}</span><br>
      Water Depth: <strong>${props.water_depth_m}m</strong><br>
      Distance: ${props.distance_km} km • Est. Time: ${props.base_travel_time_min} min
    `, { sticky: true });

    polyline.addTo(edgeLayerGroup);
  });
}

function renderNodes(nodeFeatures) {
  nodeLayerGroup.clearLayers();

  nodeFeatures.forEach(node => {
    const coords = [node.geometry.coordinates[1], node.geometry.coordinates[0]];
    const props = node.properties;

    // Node Styling based on Type
    let markerColor = "#4285f4";
    let iconHtml = '<i class="fa-solid fa-circle" style="font-size:10px;"></i>';

    if (props.is_safe_core) {
      markerColor = "#34a853"; // Safe core green
      iconHtml = '<i class="fa-solid fa-shield" style="font-size:11px; color:#ffffff;"></i>';
    } else if (props.node_type === "HOSPITAL") {
      markerColor = "#ea4335";
      iconHtml = '<i class="fa-solid fa-hospital" style="font-size:11px; color:#ffffff;"></i>';
    } else if (props.node_type === "RIVER_CROSSING") {
      markerColor = "#fbbc04";
      iconHtml = '<i class="fa-solid fa-water" style="font-size:11px; color:#ffffff;"></i>';
    } else if (props.node_type === "VULNERABLE_ZONE" || props.node_type === "RURAL_SETTLEMENT") {
      markerColor = "#a855f7";
      iconHtml = '<i class="fa-solid fa-triangle-exclamation" style="font-size:11px; color:#ffffff;"></i>';
    }

    const customIcon = L.divIcon({
      className: "custom-gis-node",
      html: `<div style="
        background: ${markerColor};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 10px ${markerColor};
        border: 2px solid #ffffff;
      ">${iconHtml}</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const marker = L.marker(coords, { icon: customIcon });

    marker.bindPopup(`
      <div style="font-family: var(--font-sans); color: #0f172a; min-width: 180px;">
        <h4 style="margin: 0 0 4px 0; font-size: 0.88rem; color: #1e293b;">${props.name}</h4>
        <div style="font-size: 0.72rem; color: #64748b; margin-bottom: 6px;">
          Type: <strong>${props.node_type}</strong> | Elev: <strong>${props.elevation_m}m</strong>
        </div>
        <div style="font-size: 0.72rem; margin-bottom: 6px;">
          Pop: <strong>${props.population.toLocaleString()}</strong> | At-Risk: <strong>${props.at_risk_count}</strong><br>
          Hospitals/Clinics: <strong>${props.hospitals}</strong>
        </div>
        <div style="display: flex; gap: 4px; margin-top: 6px;">
          <button style="flex:1; background:#4285f4; color:white; border:none; padding:4px 6px; border-radius:4px; font-size:0.7rem; cursor:pointer;" onclick="setAsOrigin('${props.node_id}')">Set Origin</button>
          <button style="flex:1; background:#ea4335; color:white; border:none; padding:4px 6px; border-radius:4px; font-size:0.7rem; cursor:pointer;" onclick="setAsDestination('${props.node_id}')">Set Dest</button>
        </div>
      </div>
    `);

    marker.addTo(nodeLayerGroup);
  });
}

function populateSelectDropdowns(nodeFeatures) {
  const originSel = document.getElementById("select-origin");
  const destSel = document.getElementById("select-destination");
  
  originSel.innerHTML = "";
  destSel.innerHTML = "";

  nodeFeatures.sort((a, b) => a.properties.name.localeCompare(b.properties.name));

  nodeFeatures.forEach(n => {
    const p = n.properties;
    const optOrig = document.createElement("option");
    optOrig.value = p.node_id;
    optOrig.innerText = `${p.name} (${p.node_type})`;
    if (p.node_id === currentRouteOrigin) optOrig.selected = true;
    originSel.appendChild(optOrig);

    const optDest = document.createElement("option");
    optDest.value = p.node_id;
    optDest.innerText = `${p.name} (${p.node_type})`;
    if (p.node_id === currentRouteDestination) optDest.selected = true;
    destSel.appendChild(optDest);
  });

  originSel.addEventListener("change", (e) => {
    currentRouteOrigin = e.target.value;
  });
  destSel.addEventListener("change", (e) => {
    currentRouteDestination = e.target.value;
  });
}

function setAsOrigin(nodeId) {
  document.getElementById("select-origin").value = nodeId;
  currentRouteOrigin = nodeId;
  map.closePopup();
  logTacticalEvent(`Set route Origin to: ${nodeId}`);
  triggerCalculateRoute();
}

function setAsDestination(nodeId) {
  document.getElementById("select-destination").value = nodeId;
  currentRouteDestination = nodeId;
  map.closePopup();
  logTacticalEvent(`Set route Destination to: ${nodeId}`);
  triggerCalculateRoute();
}

// ---------------------------------------------------------------------------
// 4. Water Simulation Slider Handling
// ---------------------------------------------------------------------------
function setupEventListeners() {
  const slider = document.getElementById("slider-water-height");
  slider.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    onSurgeSliderChanged(val);
  });
}

let sliderDebounceTimer = null;
function onSurgeSliderChanged(val) {
  activeSurgeHeight = val;
  document.getElementById("val-slider-display").innerHTML = `${val.toFixed(2)} <small>meters</small>`;
  document.getElementById("txt-active-surge").innerText = `${val.toFixed(2)}m`;

  const sevEl = document.getElementById("lbl-surge-severity");
  if (val <= 0.2) {
    sevEl.innerText = "Baseline / Clear";
    sevEl.style.background = "rgba(52, 168, 83, 0.15)";
    sevEl.style.color = "var(--color-safe-green)";
  } else if (val <= 0.6) {
    sevEl.innerText = "Moderate Inflow";
    sevEl.style.background = "rgba(251, 188, 4, 0.15)";
    sevEl.style.color = "var(--color-caution-amber)";
  } else {
    sevEl.innerText = "CRITICAL DAM BREACH";
    sevEl.style.background = "rgba(234, 67, 53, 0.2)";
    sevEl.style.color = "var(--color-alert-red)";
  }

  clearTimeout(sliderDebounceTimer);
  sliderDebounceTimer = setTimeout(async () => {
    await applyWaterSimulation(val);
  }, 200);
}

function setSurgePreset(val, btnEl) {
  document.querySelectorAll(".slider-presets .btn-preset").forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  
  const slider = document.getElementById("slider-water-height");
  slider.value = val;
  onSurgeSliderChanged(val);
}

async function applyWaterSimulation(surgeM) {
  try {
    const res = await fetch("/api/v1/simulate-water-level", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ water_height_m: surgeM })
    });
    if (!res.ok) return;

    // Refresh network rendering and isolated zones
    await loadNetworkAndGraph();
    await loadIsolatedZones();

    // Re-calculate route if previously displayed
    const routeCard = document.getElementById("card-route-outcome");
    if (routeCard.style.display !== "none") {
      triggerCalculateRoute(false);
    }

    logTacticalEvent(`Hydrodynamic surge updated to ${surgeM.toFixed(2)}m`);
  } catch (err) {
    console.error("Failed to simulate water level:", err);
  }
}

// ---------------------------------------------------------------------------
// 5. Dynamic Dijkstra Route Calculation
// ---------------------------------------------------------------------------
function selectVehicle(clearance, btn) {
  document.querySelectorAll(".vehicle-selector .vehicle-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  selectedClearance = clearance;
  triggerCalculateRoute();
}

async function triggerCalculateRoute(logEvent = true) {
  const origin = document.getElementById("select-origin").value || currentRouteOrigin;
  const destination = document.getElementById("select-destination").value || currentRouteDestination;

  const btn = document.getElementById("btn-calc-route");
  btn.innerHTML = `<span class="spinner"></span> Routing Dijkstra...`;

  try {
    const res = await fetch("/api/v1/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origin_node: origin,
        destination_node: destination,
        vehicle_clearance: selectedClearance,
        water_simulation_offset: activeSurgeHeight
      })
    });

    btn.innerHTML = `<i class="fa-solid fa-location-crosshairs"></i> Calculate Emergency Route`;

    if (!res.ok) {
      alert("Failed to compute route");
      return;
    }

    const routeData = await res.json();
    renderRouteOutcome(routeData);

    if (logEvent) {
      logTacticalEvent(`Route calculated: ${origin} → ${destination} (${routeData.status})`);
    }

  } catch (err) {
    btn.innerHTML = `<i class="fa-solid fa-location-crosshairs"></i> Calculate Emergency Route`;
    console.error("Route calculation error:", err);
  }
}

function renderRouteOutcome(data) {
  const card = document.getElementById("card-route-outcome");
  card.style.display = "block";

  const statusTag = document.getElementById("tag-route-status");
  statusTag.innerText = data.status;
  statusTag.className = "status-tag";

  if (data.status === "OPTIMAL") {
    statusTag.classList.add("optimal");
  } else if (data.status.includes("CAUTION")) {
    statusTag.classList.add("caution");
  } else {
    statusTag.classList.add("blocked");
  }

  document.getElementById("metric-route-dist").innerText = `${data.total_distance_km} km`;
  document.getElementById("metric-route-time").innerText = `${data.total_travel_time_min} min`;
  document.getElementById("metric-route-depth").innerText = `${data.max_water_depth_m} m`;
  document.getElementById("metric-route-buffer").innerText = `${data.safety_margin_m > 0 ? '+' : ''}${data.safety_margin_m} m`;
  document.getElementById("txt-route-legs").innerText = `${data.traversed_edges.length} Segments`;
  document.getElementById("txt-route-advisory").innerText = data.evacuation_advisory;

  // Draw on Map with Glowing Neon Polytrend on dedicated routePane
  activeRouteLayer.clearLayers();

  if (data.path_coords && data.path_coords.length > 1) {
    // Layer 1: Outer Glowing Neon Halo (#4285F4 with 12px stroke)
    const haloLine = L.polyline(data.path_coords, {
      color: "#4285F4",
      weight: 12,
      opacity: 0.65,
      lineCap: "round",
      lineJoin: "round",
      className: "neon-route-halo",
      pane: "routePane"
    }).addTo(activeRouteLayer);

    // Layer 2: High-Visibility Neon Cyan Core Beam (#38BDF8 with 6px stroke & dynamic dash)
    const coreLine = L.polyline(data.path_coords, {
      color: "#38BDF8",
      weight: 6,
      opacity: 1.0,
      dashArray: "10, 8",
      lineCap: "round",
      lineJoin: "round",
      className: "neon-route-core",
      pane: "routePane"
    }).addTo(activeRouteLayer);

    // Waypoint Markers at Origin and Destination
    const startCoord = data.path_coords[0];
    const endCoord = data.path_coords[data.path_coords.length - 1];

    const originWaypoint = L.circleMarker(startCoord, {
      radius: 9,
      color: "#ffffff",
      fillColor: "#34A853",
      fillOpacity: 1.0,
      weight: 3,
      pane: "routePane"
    }).bindTooltip(`<strong>Origin:</strong> ${data.path_nodes[0]}`, { permanent: false });

    const destWaypoint = L.circleMarker(endCoord, {
      radius: 10,
      color: "#ffffff",
      fillColor: "#EA4335",
      fillOpacity: 1.0,
      weight: 3,
      pane: "routePane"
    }).bindTooltip(`<strong>Destination Trauma Center:</strong> ${data.path_nodes[data.path_nodes.length - 1]}`, { permanent: false });

    originWaypoint.addTo(activeRouteLayer);
    destWaypoint.addTo(activeRouteLayer);

    // Bring entire route to front
    haloLine.bringToFront();
    coreLine.bringToFront();

    map.fitBounds(coreLine.getBounds(), { padding: [60, 60] });
  }
}

// ---------------------------------------------------------------------------
// 6. Citizen Ground Intake & Gemini 3.7 Flash Analysis
// ---------------------------------------------------------------------------
const INTAKE_PRESETS = [
  {
    location: "Mahadev Ghat Causeway, Kharun River",
    text: "Water is rushing fast over the Mahadev Ghat bridge. It is already above knee-deep (almost 0.75m). Two auto-rickshaws were abandoned. Regular cars and ambulances cannot cross at all!"
  },
  {
    location: "Telibandha Marine Drive South Lane",
    text: "Lake overflowed onto the promenade road. Water reaches ankle-to-shin level, roughly up to the tire rims of cars (about 0.28m). Traffic is moving slowly."
  },
  {
    location: "Chhatauna Riverbend Enclave",
    text: "Entire village access road is cut off. Water reached waist height (1.1m) on the culvert. A tractor is stuck with water touching its exhaust pipe. 14,000 villagers are stranded with pregnant women needing care."
  }
];

function loadIntakePreset(index) {
  const p = INTAKE_PRESETS[index];
  document.getElementById("intake-location").value = p.location;
  document.getElementById("intake-text").value = p.text;
}

function handleImageSelected(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    currentImageBase64 = e.target.result;
    const thumb = document.getElementById("upload-thumb");
    thumb.src = currentImageBase64;
    thumb.style.display = "block";
  };
  reader.readAsDataURL(file);
}

async function loadGeneratedSamplePhoto() {
  try {
    const res = await fetch("/static/sample_flood_report.jpg");
    const blob = await res.blob();
    const reader = new FileReader();
    reader.onload = (e) => {
      currentImageBase64 = e.target.result;
      const thumb = document.getElementById("upload-thumb");
      thumb.src = currentImageBase64;
      thumb.style.display = "block";
      logTacticalEvent("Loaded realistic ground flood reference photo.");
    };
    reader.readAsDataURL(blob);
  } catch (err) {
    console.error("Failed to load sample image:", err);
  }
}

function clearUploadedPhoto() {
  currentImageBase64 = null;
  const thumb = document.getElementById("upload-thumb");
  thumb.src = "";
  thumb.style.display = "none";
  document.getElementById("intake-file").value = "";
}

async function triggerAnalyzeReport() {
  const text = document.getElementById("intake-text").value.trim();
  const location = document.getElementById("intake-location").value.trim();

  const btn = document.getElementById("btn-analyze-report");
  btn.innerHTML = `<span class="spinner"></span> Processing with Gemini 3.7 Flash...`;

  try {
    const payload = {
      text: text,
      location_name: location,
      image_base64: currentImageBase64
    };

    const res = await fetch("/api/v1/analyze-ground-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    btn.innerHTML = `<i class="fa-solid fa-microchip"></i> Analyze via Gemini 3.7 Flash`;

    if (!res.ok) {
      alert("Error analyzing report.");
      return;
    }

    const analysis = await res.json();
    renderAiAnalysisCard(analysis);

    logTacticalEvent(`Citizen Report analyzed: ${analysis.estimated_water_depth_m}m depth (${analysis.ambulance_passable ? 'PASSABLE' : 'IMPASSABLE'})`);
    loadRecentReports();

  } catch (err) {
    btn.innerHTML = `<i class="fa-solid fa-microchip"></i> Analyze via Gemini 3.7 Flash`;
    console.error("AI Analysis error:", err);
  }
}

function renderAiAnalysisCard(data) {
  const card = document.getElementById("card-ai-analysis");
  card.style.display = "block";

  document.getElementById("pill-ai-depth").innerText = `${data.estimated_water_depth_m}m Water Depth`;

  const passPill = document.getElementById("pill-ai-passable");
  if (data.ambulance_passable) {
    passPill.className = "ai-pill passable-true";
    passPill.innerText = "Ambulance PASSABLE (≤0.6m)";
  } else {
    passPill.className = "ai-pill passable-false";
    passPill.innerText = "Ambulance IMPASSABLE (>0.6m)";
  }

  document.getElementById("pill-ai-conf").innerText = `Conf: ${data.confidence_score.toFixed(2)} (${data.verification_status})`;
  document.getElementById("txt-ai-cues").innerHTML = `<strong>Cues Identified:</strong> ${data.observable_cues.join(", ") || "Visual water level markers"}<br><strong>Scale Ref:</strong> ${data.reference_object}`;
  document.getElementById("txt-ai-impact").innerText = data.vehicle_impact_assessment;
  document.getElementById("txt-ai-action").innerHTML = `<strong>Action Required:</strong> ${data.recommended_action}`;
}

// ---------------------------------------------------------------------------
// 7. Disconnected Sub-graphs & Priority Queue
// ---------------------------------------------------------------------------
async function loadIsolatedZones() {
  try {
    const res = await fetch(`/api/v1/isolated-zones?clearance_limit=${selectedClearance}`);
    if (!res.ok) return;
    const data = await res.json();

    const badgeIso = document.getElementById("badge-tab-isolated-count");
    if (badgeIso) badgeIso.innerText = data.isolated_zones_count;

    const summaryIso = document.getElementById("txt-isolated-summary");
    if (summaryIso) {
      summaryIso.innerText = `CUT-OFF: ${(data.total_cutoff_population / 1000).toFixed(1)}K (${data.isolated_zones_count})`;
    }

    const container = document.getElementById("container-isolated-zones");
    container.innerHTML = "";

    if (!data.ranked_zones || data.ranked_zones.length === 0) {
      container.innerHTML = `
        <div style="background: rgba(52, 168, 83, 0.1); border: 1px solid var(--color-safe-green); border-radius: var(--radius-md); padding: 12px; text-align: center; color: #a7f3d0; font-size: 0.75rem;">
          <i class="fa-solid fa-circle-check" style="font-size: 1.2rem; color: var(--color-safe-green); display: block; margin-bottom: 6px;"></i>
          <strong>No Isolated Zones Detected</strong><br>All 24 nodes remain connected to Trauma Apex (AIIMS Raipur).
        </div>
      `;
      return;
    }

    data.ranked_zones.forEach(zone => {
      const card = document.createElement("div");
      const priorityClass = zone.evacuation_priority.toLowerCase();
      card.className = `iso-zone-card ${priorityClass}`;

      card.innerHTML = `
        <div class="iso-header">
          <div class="iso-name">${zone.zone_name}</div>
          <span class="iso-score-badge">V: ${zone.vulnerability_score}</span>
        </div>
        <div class="iso-stats-grid">
          <span>Pop: <strong>${zone.population.toLocaleString()}</strong></span>
          <span>Hospitals: <strong>${zone.hospitals}</strong></span>
          <span>At-Risk: <strong>${zone.at_risk_count.toLocaleString()}</strong></span>
          <span>Nodes: <strong>${zone.node_count}</strong></span>
        </div>
        ${zone.severed_links && zone.severed_links.length > 0 ? `
          <div class="iso-severed-links">
            <i class="fa-solid fa-ban"></i> Severed: ${zone.severed_links.join(", ")}
          </div>
        ` : ''}
        <button class="btn-draft-cap" onclick="openCapModalForZone('${zone.zone_id}', '${zone.zone_name}', ${zone.population}, ${zone.vulnerability_score})">
          <i class="fa-solid fa-bullhorn"></i> Draft Multilingual CAP Alert
        </button>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Failed to load isolated zones:", err);
  }
}

// ---------------------------------------------------------------------------
// 8. Multilingual CAP Broadcast Modal & Approval Workflow
// ---------------------------------------------------------------------------
async function openCapModalForZone(zoneId, zoneName, population, vulnScore) {
  currentActiveZoneForCap = {
    zone_id: zoneId,
    zone_name: zoneName,
    population: population,
    vulnerability_score: vulnScore
  };

  document.getElementById("cap-target-zone-title").innerText = `Target: ${zoneName}`;
  document.getElementById("cap-target-meta").innerText = `Affected: ${population.toLocaleString()} Citizens • Vulnerability: ${vulnScore}`;
  document.getElementById("badge-cap-modal-status").className = "badge pulse-amber";
  document.getElementById("badge-cap-modal-status").innerText = "PENDING OFFICER APPROVAL";
  document.getElementById("box-approval-gate").style.display = "flex";
  document.getElementById("dispatch-success-banner").style.display = "none";
  document.getElementById("btn-approve-dispatch").disabled = false;
  document.getElementById("btn-approve-dispatch").innerHTML = `<i class="fa-solid fa-paper-plane"></i> Approve & Dispatch Broadcast`;

  document.getElementById("modal-cap-broadcast").style.display = "flex";

  // Request auto-draft from backend
  document.getElementById("cap-code-xml").innerText = "Auto-drafting OASIS Common Alerting Protocol XML...";
  document.getElementById("cap-hindi-text").innerText = "Generating localized Hindi broadcast...";
  document.getElementById("cap-chhattisgarhi-text").innerText = "Generating authentic Chhattisgarhi dialect alert...";

  try {
    const res = await fetch("/api/v1/generate-cap-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        zone_id: zoneId,
        zone_name: zoneName,
        population: population,
        vulnerability_score: vulnScore,
        water_depth_m: activeSurgeHeight + 0.5,
        approved_by_officer: false
      })
    });

    if (!res.ok) throw new Error("Draft generation failed");
    const alertData = await res.json();

    document.getElementById("cap-code-xml").innerText = alertData.cap_xml;
    document.getElementById("cap-hindi-text").innerText = alertData.hindi_sms;
    document.getElementById("cap-hindi-counter").innerText = `${alertData.hindi_sms.length} / 160 Characters`;
    document.getElementById("cap-chhattisgarhi-text").innerText = alertData.chhattisgarhi_sms;
    document.getElementById("cap-cg-counter").innerText = `${alertData.chhattisgarhi_sms.length} / 160 Characters`;

  } catch (err) {
    console.error("CAP draft error:", err);
  }
}

function closeCapModal() {
  document.getElementById("modal-cap-broadcast").style.display = "none";
}

function switchCapTab(tabName, btn) {
  document.querySelectorAll(".modal-tabs .tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
  document.getElementById(`pane-tab-${tabName}`).classList.add("active");
}

function copyCapXml() {
  const code = document.getElementById("cap-code-xml").innerText;
  navigator.clipboard.writeText(code);
  alert("OASIS CAP v1.2 XML copied to clipboard!");
}

async function triggerApproveAndDispatch() {
  if (!currentActiveZoneForCap) return;
  const officerId = document.getElementById("officer-id-input").value.trim() || "EOC Officer on Duty (ID: CG-EOC-904)";

  const btn = document.getElementById("btn-approve-dispatch");
  btn.innerHTML = `<span class="spinner"></span> Authenticating & Transmitting...`;
  btn.disabled = true;

  try {
    const res = await fetch("/api/v1/generate-cap-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        zone_id: currentActiveZoneForCap.zone_id,
        zone_name: currentActiveZoneForCap.zone_name,
        population: currentActiveZoneForCap.population,
        vulnerability_score: currentActiveZoneForCap.vulnerability_score,
        water_depth_m: activeSurgeHeight + 0.5,
        approved_by_officer: true,
        approver_notes: `Authorized by ${officerId}`
      })
    });

    if (!res.ok) throw new Error("Dispatch failed");
    const dispatchedAlert = await res.json();

    document.getElementById("badge-cap-modal-status").className = "badge pulse-green";
    document.getElementById("badge-cap-modal-status").innerText = "STATUS: DISPATCHED";
    document.getElementById("box-approval-gate").style.display = "none";
    document.getElementById("dispatch-success-banner").style.display = "block";
    document.getElementById("dispatch-success-banner").innerHTML = `
      <i class="fa-solid fa-circle-check" style="color: var(--color-safe-green); margin-right: 6px;"></i>
      <strong>ALERT DISPATCHED:</strong> Alert Token: <code>${dispatchedAlert.alert_id}</code><br>
      Approved by: <strong>${dispatchedAlert.dispatched_by}</strong> at ${dispatchedAlert.dispatch_timestamp}<br>
      Transmitted via: ${dispatchedAlert.broadcast_channels.join(", ")}
    `;

    btn.innerHTML = `<i class="fa-solid fa-check-double"></i> Broadcast Dispatched`;

    logTacticalEvent(`🚨 CAP EMERGENCY BROADCAST DISPATCHED for ${currentActiveZoneForCap.zone_name}`);

  } catch (err) {
    btn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Approve & Dispatch Broadcast`;
    btn.disabled = false;
    alert("Dispatch error occurred.");
    console.error(err);
  }
}

// ---------------------------------------------------------------------------
// 9. Incident Ticker & Feed
// ---------------------------------------------------------------------------
async function loadRecentReports() {
  try {
    const res = await fetch("/api/v1/reports");
    if (!res.ok) return;
    const data = await res.json();
    
    const feed = document.getElementById("incident-feed-list");
    feed.innerHTML = "";

    data.reports.slice(0, 3).forEach(rep => {
      const item = document.createElement("div");
      item.className = "stream-item";
      const isPass = rep.ambulance_passable;
      item.innerHTML = `
        <span class="time">${rep.location_name.split(",")[0]}:</span> 
        <span style="color:${isPass ? 'var(--color-safe-green)' : 'var(--color-alert-red)'}; font-weight:600;">
          ${isPass ? 'Passable' : 'Impassable'} (${rep.estimated_water_depth_m}m)
        </span>
      `;
      feed.appendChild(item);
    });

  } catch (err) {
    console.error("Failed to load reports:", err);
  }
}

function logTacticalEvent(msg) {
  const feed = document.getElementById("incident-feed-list");
  if (!feed) return;
  const time = new Date().toLocaleTimeString("en-IN", { hour12: false });
  const item = document.createElement("div");
  item.className = "stream-item";
  item.innerHTML = `<span class="time">[${time}]</span> <span>${msg}</span>`;
  feed.insertBefore(item, feed.firstChild);
  while (feed.children.length > 4) {
    feed.removeChild(feed.lastChild);
  }
}

// ---------------------------------------------------------------------------
// 10. Gemini API Key Modal
// ---------------------------------------------------------------------------
function openKeyModal() {
  document.getElementById("modal-gemini-key").style.display = "flex";
}

function closeKeyModal() {
  document.getElementById("modal-gemini-key").style.display = "none";
}

async function saveGeminiKey() {
  const key = document.getElementById("input-gemini-key").value.trim();
  if (!key) {
    alert("Please enter a valid key.");
    return;
  }
  try {
    const res = await fetch("/api/v1/config/gemini-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: key })
    });
    if (res.ok) {
      alert("Gemini API Key updated successfully! Testing model gemini-3.7-flash.");
      closeKeyModal();
      loadSystemHealth();
    }
  } catch (err) {
    console.error("Failed to save key:", err);
  }
}

// ---------------------------------------------------------------------------
// 11. 30-Second Winning Pitch Teleprompter
// ---------------------------------------------------------------------------
function openPitchModal() {
  const modal = document.getElementById("modal-pitch-script");
  if (modal) modal.style.display = "flex";
}

function closePitchModal() {
  const modal = document.getElementById("modal-pitch-script");
  if (modal) modal.style.display = "none";
}

