# PRAVAH: Dynamic Disaster Reachability Engine
### Hydrodynamic Routing & AI Reachability Platform for Flood Response
**Location Scope:** Raipur & Mahanadi / Kharun River Basin, Chhattisgarh, India  
**Target Model:** Google Gemini 3.7 Flash via the official `google-genai` SDK  

---

## 🌊 Overview
During extreme monsoonal surges and dam sluice discharges in the Mahanadi basin, low-level causeways (such as Mahadev Ghat and Kathadih) submerge rapidly, isolating densely populated settlements and cutting off emergency access to critical tertiary trauma centers like **AIIMS Raipur** and **Mekahara Hospital**.

**PRAVAH** is a production-ready emergency reachability engine that continuously models:
1. **Dynamic Dijkstra Routing with Quadratic Water Penalty**:
   $$\text{weight} = \text{travel\_time} \times \left(1 + \left(\frac{\text{water\_depth}}{\text{clearance\_limit}}\right)^2\right)$$
   When $\text{water\_depth} \ge \text{clearance\_limit}$, $\text{weight} = \infty$ (severed road edge).
2. **Citizen Ground Intake Analysis via Gemini 3.7 Flash**:
   Uses the updated `google-genai` SDK with strict Pydantic JSON schemas to parse observable physical reference cues (e.g., *"knee-deep"*, *"car wheel submerged"*, *"tractor exhaust line"*), estimate exact water depth in meters, determine ambulance passability ($\le 0.60\text{m}$), and assign an unverified citizen confidence score ($0.4$).
3. **Cut-off Community Detection & Vulnerability Ranking**:
   Identifies disconnected sub-graphs when roads are severed and ranks isolated zones using the hackathon formula:
   $$V = (\text{Population} \times 0.4) + (\text{Hospitals} \times 0.4) + (\text{AtRisk} \times 0.2)$$
4. **Multilingual Common Alerting Protocol (CAP) Alert Engine**:
   Auto-drafts OASIS CAP v1.2 XML alongside localized **Hindi** and **authentic Chhattisgarhi** SMS broadcasts ($< 160$ characters). Enforces a **Human Officer Approval Gate** before transitioning alerts from `PENDING_APPROVAL` to `DISPATCHED`.

---

## 🎙️ 30-Second Winning Pitch (Hackathon Presentation Guide)

When presenting to judges, follow this exact structure:

1. **The Hook (10s):**
   > *"When Mahanadi floods, standard maps show blue polygons. But an ambulance driver needs to know: Can my vehicle cross the Mahadev Ghat causeway right now?"*
2. **The Tech (10s):**
   > *"PRAVAH dynamically recalculates road edge weights using vehicle intake clearance rules. When water rises to 0.72 meters, standard personal cars and light ambulances are blocked, and our engine automatically identifies isolated villages and reroutes emergency traffic."*
3. **The Live Demo (10s):**
   > *"Watch this live: as I move the Water Height Simulation Slider from 0.35m to 0.75m, the graph severs around low causeways, the active route dynamically recalculates with high ground safety buffers, and with one click, Gemini 3.7 Flash auto-drafts a multilingual CAP alert in Hindi and authentic Chhattisgarhi for first responders."*

*(Tip: In the web dashboard, click the red **`30s Pitch Script`** badge in the header to open the interactive teleprompter at any moment!)*

---

## 🚀 Quickstart & Launch

### 1. Start the Server
```bash
# Activate virtual environment
source .venv/bin/activate

# Launch the FastAPI application
uvicorn main:app --reload
```

### 2. Access the Control Room
Open your browser at:
```
http://127.0.0.1:8000
```

### 3. (Optional) Set Google Gemini API Key
To run with live Gemini 3.7 Flash calls:
```bash
export GEMINI_API_KEY="your-api-key"
uvicorn main:app --reload
```
*Note: If no API key is set, PRAVAH automatically activates its built-in offline hydrological heuristics engine, allowing judges and evaluators to test 100% of all features completely offline without internet or API keys.*

---

## 📡 API Endpoints Specification

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/health` | Returns system status, loaded graph node count (24) and edge count (40). |
| `POST` | `/api/v1/analyze-ground-report` | Extracts flood cues, water depth in meters, ambulance clearance check, and confidence score. |
| `POST` | `/api/v1/route` | Dynamic Dijkstra shortest path with quadratic water penalty and vehicle clearance limits. |
| `GET` | `/api/v1/isolated-zones` | Disconnected sub-graphs calculation with vulnerability score ranking. |
| `POST` | `/api/v1/generate-cap-alert` | Auto-drafts OASIS CAP v1.2 XML and bilingual SMS alerts with human approval gate. |
| `GET` | `/api/v1/network` | Returns road graph, nodes, and flood inundation polygons as GeoJSON. |
| `POST` | `/api/v1/simulate-water-level` | Dynamically updates water surge level ($0.0\text{m} - 1.5\text{m}$) and updates edge inundation. |

---

## 🎨 Design System & Palette
- **Deep Slate Navy (`#0F172A`)**: Primary operations center background
- **Google Blue (`#4285F4`)**: Action items, header highlights, and active route polyline
- **Alert Red (`#EA4335`)**: Submerged roads, critical isolation status, and siren alerts
- **Green (`#34A853`)**: Clear passable arteries and online system telemetry
- **Amber (`#FBBC04`)**: Cautionary water levels ($0.25\text{m} - 0.60\text{m}$)
