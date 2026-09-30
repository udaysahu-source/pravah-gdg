"""
PRAVAH: Dynamic Disaster Reachability Engine
Google Gemini Integration Service using the new google-genai SDK
Model: gemini-3.7-flash
Strict Pydantic JSON response schemas for Ground Report Analysis & Multilingual CAP Alert Generation
"""

import os
import re
import json
import base64
import uuid
from datetime import datetime, timezone
from typing import Optional, Dict, Any, List

from pydantic import BaseModel, Field

from app.engine.models import (
    GroundReportAnalysis, CapAlertResponse
)

# Pydantic schema for CAP Alert draft used with GenAI
class CapAlertDraftSchema(BaseModel):
    headline: str = Field(description="High-priority emergency headline")
    urgency: str = Field(description="CAP Urgency (Immediate, Expected, Future)")
    severity: str = Field(description="CAP Severity (Extreme, Severe, Moderate)")
    certainty: str = Field(description="CAP Certainty (Observed, Likely, Possible)")
    description: str = Field(description="Detailed situational overview in English")
    instruction: str = Field(description="Actionable public survival and evacuation guidance")
    cap_xml: str = Field(description="Full OASIS Common Alerting Protocol v1.2 XML string")
    hindi_sms: str = Field(description="Emergency SMS in clean Hindi script under 160 characters")
    chhattisgarhi_sms: str = Field(description="Emergency SMS in authentic Chhattisgarhi regional dialect under 160 characters")
    broadcast_channels: List[str] = Field(description="List of delivery mechanisms like Cell Broadcast, SMS, Siren")


class GeminiDisasterEngine:
    def __init__(self):
        self.api_key = os.environ.get("GEMINI_API_KEY", "")
        self.client = None
        self.model_name = "gemini-3.7-flash"
        self._init_client()

    def _init_client(self):
        """Initialize the Google GenAI client if API key is present."""
        if self.api_key:
            try:
                from google import genai
                self.client = genai.Client(api_key=self.api_key)
            except Exception as e:
                print(f"[GeminiEngine] Warning: Client initialization failed ({e}). Running in resilient fallback mode.")
                self.client = None
        else:
            self.client = None

    def set_api_key(self, api_key: str):
        """Update API key at runtime."""
        self.api_key = api_key.strip()
        self._init_client()
        return {"status": "SUCCESS", "has_key": bool(self.client), "model": self.model_name}

    def is_live(self) -> bool:
        return self.client is not None

    async def analyze_ground_report(
        self,
        text: Optional[str] = None,
        image_base64: Optional[str] = None,
        location_name: Optional[str] = None
    ) -> GroundReportAnalysis:
        """
        POST /api/v1/analyze-ground-report
        Uses Gemini 3.7 Flash to extract observable flood depth reference cues,
        estimates water depth in meters, flags ambulance passability (threshold > 0.6m = False),
        and assigns a baseline confidence score of 0.4 ("Unverified Citizen Hint").
        """
        prompt_text = text or "Flooding observed on roadway."
        loc_str = location_name or "Mahanadi/Kharun Basin, Raipur"

        # 1. Attempt Live Gemini Call if client available
        if self.client:
            try:
                from google.genai import types

                system_instruction = (
                    "You are an expert flood hydrology and disaster reachability analyst for PRAVAH Emergency Engine. "
                    "Analyze the provided image and/or citizen ground report text. "
                    "Extract observable flood depth reference cues (e.g. 'knee-deep', 'car wheel submerged', 'curb overflow'). "
                    "Estimate the exact flood water depth in meters. "
                    "Strict Rule: Ambulance passability threshold is 0.6 meters. If water depth > 0.6m, ambulance_passable MUST be False. "
                    "Always assign baseline confidence_score = 0.4 with verification_status = 'Unverified Citizen Hint'."
                )

                contents = []
                if image_base64:
                    # Clean base64 header if present
                    if "," in image_base64:
                        image_base64 = image_base64.split(",", 1)[1]
                    image_bytes = base64.b64decode(image_base64)
                    contents.append(
                        types.Part.from_bytes(
                            data=image_bytes,
                            mime_type="image/jpeg"
                        )
                    )

                contents.append(
                    f"Citizen Report Location: {loc_str}\n"
                    f"Report Content: {prompt_text}\n"
                    f"Extract observable cues, reference objects, estimated water depth in meters, "
                    f"and operational ambulance passability."
                )

                config = types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    response_mime_type="application/json",
                    response_schema=GroundReportAnalysis,
                    temperature=0.2
                )

                response = self.client.models.generate_content(
                    model=self.model_name,
                    contents=contents,
                    config=config
                )

                if response.text:
                    parsed = json.loads(response.text)
                    # Enforce strict hackathon rules
                    depth = float(parsed.get("estimated_water_depth_m", 0.5))
                    parsed["ambulance_passable"] = depth <= 0.6
                    parsed["confidence_score"] = 0.4
                    parsed["verification_status"] = "Unverified Citizen Hint"
                    parsed["timestamp"] = datetime.now(timezone.utc).isoformat()
                    parsed["reported_location"] = loc_str
                    return GroundReportAnalysis(**parsed)

            except Exception as e:
                print(f"[GeminiEngine] Live Gemini call encountered error: {e}. Falling back to semantic heuristics.")

        # 2. Resilient Offline Heuristics Engine (Runs smoothly without API key)
        return self._offline_ground_analysis(prompt_text, loc_str)

    def _offline_ground_analysis(self, text: str, location_name: str) -> GroundReportAnalysis:
        """
        High-fidelity semantic heuristics engine parsing anatomical and vehicular flood cues.
        """
        lower = text.lower()
        observable_cues = []
        depth_m = 0.45
        ref_obj = "general road surface"
        hazards = ["Slick road surface", "Low visibility"]

        if any(w in lower for w in ["waist", "stomach", "chest", "rooftop", "roof"]):
            depth_m = 1.15
            ref_obj = "adult pedestrian waistline (1.1m)"
            observable_cues.extend(["waist-deep inundation", "structural water entry", "severe road blockage"])
            hazards.extend(["Submerged electrical equipment", "Lethal water velocity", "Stranded occupants"])
        elif any(w in lower for w in ["knee", "thigh", "half wheel", "truck tire", "auto-rickshaw"]):
            depth_m = 0.72
            ref_obj = "adult pedestrian knees (~0.6-0.75m)"
            observable_cues.extend(["knee-deep rushing water", "wheel hubs submerged", "curb submerged"])
            hazards.extend(["Concealed open manholes", "Hydrostatic engine damage"])
        elif any(w in lower for w in ["wheel", "tire", "car wheel"]):
            depth_m = 0.55
            ref_obj = "passenger car tire rim (~0.55m)"
            observable_cues.extend(["water covering wheel rims", "exhaust pipe at risk"])
            hazards.extend(["Vehicle stalling risk", "Moderate backflow"])
        elif any(w in lower for w in ["ankle", "shin", "foot", "splashing", "puddle"]):
            depth_m = 0.25
            ref_obj = "adult ankle / curb height (~0.2-0.3m)"
            observable_cues.extend(["ankle-level water", "standing road water", "gutter overflow"])
            hazards.extend(["Reduced braking grip", "Slowed traffic"])
        else:
            # Look for numbers with meters or cm
            match = re.search(r"(\d+(\.\d+)?)\s*(m|meter|cm|feet|ft)", lower)
            if match:
                val = float(match.group(1))
                unit = match.group(3)
                if "cm" in unit:
                    depth_m = val / 100.0
                elif "ft" in unit or "feet" in unit:
                    depth_m = val * 0.3048
                else:
                    depth_m = val
                observable_cues.append(f"Reported depth metric: {depth_m:.2f}m")
                ref_obj = f"Citizen physical measurement ({depth_m:.2f}m)"
            else:
                depth_m = 0.50
                ref_obj = "estimated average road depth"
                observable_cues.append("Standing floodwater on roadway")

        # Threshold check: clearance > 0.6m = False
        ambulance_passable = depth_m <= 0.6

        if not ambulance_passable:
            impact = (
                f"IMPASSABLE FOR AMBULANCES: Estimated depth of {depth_m:.2f}m exceeds the 0.60m "
                f"critical clearance threshold. Air intake and tailpipe submersion risk. Terrestrial emergency access halted."
            )
            action = (
                "Reroute emergency response around this node. Deploy SDRF motorized inflatable rescue boats "
                "or dispatch tracked disaster vehicles. Notify EOC to update dynamic graph weights to infinity."
            )
        else:
            impact = (
                f"PASSABLE WITH CAUTION: Estimated depth of {depth_m:.2f}m is within the 0.60m ambulance "
                f"clearance limit (Safety margin: {(0.60 - depth_m):.2f}m). Heavy vehicles and ambulances can traverse at low speeds (<15 km/h)."
            )
            action = (
                "Maintain access for ambulances with escort. Post hazard signage for low-ground-clearance civilian vehicles. "
                "Monitor Kharun basin water gauge for further rise."
            )

        return GroundReportAnalysis(
            observable_cues=observable_cues,
            estimated_water_depth_m=round(depth_m, 2),
            reference_object=ref_obj,
            ambulance_passable=ambulance_passable,
            vehicle_impact_assessment=impact,
            confidence_score=0.4,
            verification_status="Unverified Citizen Hint",
            hazard_flags=hazards,
            recommended_action=action,
            timestamp=datetime.now(timezone.utc).isoformat(),
            reported_location=location_name
        )

    async def generate_cap_alert(
        self,
        zone_id: str,
        zone_name: Optional[str] = None,
        population: Optional[int] = None,
        vulnerability_score: Optional[float] = None,
        water_depth_m: Optional[float] = None,
        approved_by_officer: bool = False,
        approver_notes: Optional[str] = None
    ) -> CapAlertResponse:
        """
        POST /api/v1/generate-cap-alert
        Uses Gemini 3.7 Flash to auto-draft a Common Alerting Protocol (CAP) XML payload
        and localized Hindi / Chhattisgarhi SMS alert messages for a selected isolated zone.
        Requires a human approval boolean before returning a "Dispatched" status.
        """
        alert_id = f"PRAVAH-CAP-{uuid.uuid4().hex[:8].upper()}"
        iso_zone = zone_name or f"Zone {zone_id}"
        pop = population or 15000
        vuln = vulnerability_score or 75.0
        depth = water_depth_m or 0.85
        now_iso = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+05:30")

        # 1. Attempt Live Gemini Call if client available
        draft_content = None
        if self.client:
            try:
                from google.genai import types

                prompt = (
                    f"Draft a formal disaster emergency alert for an isolated, cut-off urban zone in Chhattisgarh.\n"
                    f"Zone ID: {zone_id}\n"
                    f"Zone Name: {iso_zone}\n"
                    f"Affected Population: {pop:,}\n"
                    f"Vulnerability Score: {vuln}/100\n"
                    f"Estimated Water Surge: {depth}m\n"
                    f"Region: Raipur, Mahanadi / Kharun River Basin, Chhattisgarh, India.\n\n"
                    f"Requirements:\n"
                    f"1. Valid OASIS CAP v1.2 XML string for <alert>.\n"
                    f"2. Urgent Hindi SMS broadcast in Devanagari script, imperative, under 160 characters.\n"
                    f"3. Urgent Chhattisgarhi SMS broadcast in authentic Chhattisgarhi dialect (e.g., using words like 'बाढ़गे हे', 'झियान मत करा', 'चल देव', 'तीर म', 'मदद बर'), under 160 characters.\n"
                    f"4. Realistic urgency ('Immediate'), severity ('Extreme' or 'Severe'), and operational instructions."
                )

                config = types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=CapAlertDraftSchema,
                    temperature=0.3
                )

                response = self.client.models.generate_content(
                    model=self.model_name,
                    contents=prompt,
                    config=config
                )

                if response.text:
                    draft_content = json.loads(response.text)

            except Exception as e:
                print(f"[GeminiEngine] Gemini CAP drafting fallback triggered: {e}")

        # 2. Resilient Authentic Template Generator
        if not draft_content:
            draft_content = self._build_deterministic_cap_alert(
                alert_id=alert_id,
                zone_name=iso_zone,
                population=pop,
                depth_m=depth,
                timestamp=now_iso
            )

        # Enforce Human Approval Gate
        status = "DISPATCHED" if approved_by_officer else "PENDING_APPROVAL"
        dispatch_time = now_iso if approved_by_officer else None
        dispatched_by = "EOC Officer on Duty (ID: CG-EOC-904)" if approved_by_officer else None

        return CapAlertResponse(
            alert_id=alert_id,
            zone_id=zone_id,
            status=status,
            cap_xml=draft_content["cap_xml"],
            hindi_sms=draft_content["hindi_sms"],
            chhattisgarhi_sms=draft_content["chhattisgarhi_sms"],
            urgency=draft_content.get("urgency", "Immediate"),
            severity=draft_content.get("severity", "Extreme"),
            certainty=draft_content.get("certainty", "Observed"),
            headline=draft_content.get("headline", f"Flash Flood Alert: {iso_zone} Cut Off"),
            description=draft_content.get("description", f"Road access to {iso_zone} is severed by flood waters exceeding {depth}m."),
            instruction=draft_content.get("instruction", "Move to upper floors. Do not attempt crossing bridges. Dial 112 for boat evacuation."),
            broadcast_channels=draft_content.get("broadcast_channels", ["Cell Broadcast (CB-4370)", "Govt SMS Gateway", "NDMA Siren Grid", "VHF Channel 16"]),
            requires_human_approval=True,
            dispatch_timestamp=dispatch_time,
            dispatched_by=dispatched_by
        )

    def _build_deterministic_cap_alert(
        self,
        alert_id: str,
        zone_name: str,
        population: int,
        depth_m: float,
        timestamp: str
    ) -> Dict[str, Any]:
        """Generate authentic OASIS CAP v1.2 XML and bilingual emergency SMS alerts."""
        cap_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<alert xmlns="urn:oasis:names:tc:emergency:cap:1.2">
  <identifier>{alert_id}</identifier>
  <sender>cg-eoc-raipur@ndma.gov.in</sender>
  <sent>{timestamp}</sent>
  <status>Actual</status>
  <msgType>Alert</msgType>
  <scope>Public</scope>
  <info>
    <category>Geo</category>
    <category>Safety</category>
    <event>Flash Flood Riverbank Inundation</event>
    <urgency>Immediate</urgency>
    <severity>Extreme</severity>
    <certainty>Observed</certainty>
    <eventCode>
      <valueName>SAME</valueName>
      <value>FFW</value>
    </eventCode>
    <headline>EMERGENCY: {zone_name} Cut Off by Kharun River Spillover</headline>
    <description>Road causeways to {zone_name} are submerged by {depth_m:.2f}m of turbulent water. Population of {population:,} is isolated. Terrestrial vehicular access is blocked.</description>
    <instruction>Evacuate to concrete 2nd storeys or high ground shelters immediately. Do NOT enter moving waters. SDRF rescue boats deployed. For emergency pickup dial 112 or wave high-visibility cloth.</instruction>
    <area>
      <areaDesc>{zone_name}, Raipur District, Chhattisgarh</areaDesc>
      <circle>21.2355,81.5982,3.0</circle>
    </area>
  </info>
</alert>"""

        # Localized Hindi SMS under 160 chars
        hindi_sms = (
            f"आपात चेतावनी: खारून नदी उफान से {zone_name} का संपर्क टूटा ({depth_m:.1f}m पानी)। "
            f"ऊंचे पक्के स्थान पर जाएं। पुल पार न करें। बचाव नाव हेतु 112 डायल करें। -EOC रायपुर"
        )
        if len(hindi_sms) > 160:
            hindi_sms = hindi_sms[:157] + "..."

        # Authentic Chhattisgarhi Regional SMS under 160 chars
        chhattisgarhi_sms = (
            f"सतर्कता सूचना: खारून तीर म पानी बाढ़गे हे, {zone_name} रद्दा बंद हे! "
            f"सबो झन ऊंच जगा म चल देव। पानी म झन घुसो। मदद बर 112 म फोन करा। -रायपुर ईओसी"
        )
        if len(chhattisgarhi_sms) > 160:
            chhattisgarhi_sms = chhattisgarhi_sms[:157] + "..."

        return {
            "headline": f"CRITICAL: {zone_name} Isolated by Flood Inundation",
            "urgency": "Immediate",
            "severity": "Extreme",
            "certainty": "Observed",
            "description": f"Road causeways to {zone_name} are submerged by {depth_m:.2f}m of turbulent water. Terrestrial vehicular access is blocked.",
            "instruction": "Evacuate to concrete high-ground shelters. Do NOT enter moving waters. SDRF boats enroute. Dial 112.",
            "cap_xml": cap_xml,
            "hindi_sms": hindi_sms,
            "chhattisgarhi_sms": chhattisgarhi_sms,
            "broadcast_channels": ["Cell Broadcast (CB-4370)", "Govt SMS Gateway", "NDMA Siren Grid", "VHF Emergency 160.2 MHz"]
        }
