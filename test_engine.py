"""
PRAVAH: Dynamic Disaster Reachability Engine
Automated Verification & Diagnostics Suite
"""
import sys
import json
import requests

BASE_URL = "http://127.0.0.1:8000"

def test_pravah():
    print("=" * 65)
    print("🌊 PRAVAH END-TO-END VERIFICATION RUNNER")
    print("=" * 65)

    # 1. Health
    try:
        r1 = requests.get(f"{BASE_URL}/api/v1/health")
        assert r1.status_code == 200, f"Health failed with {r1.status_code}"
        data1 = r1.json()
        print(f"✅ 1. System Health: {data1['status']} | Nodes: {data1['nodes_loaded']} | Edges: {data1['edges_loaded']}")
        print(f"     Target Basin: {data1['target_basin']}")
        print(f"     AI Status: {data1['gemini_ai_status']} ({data1['gemini_model']})")
    except Exception as e:
        print(f"❌ 1. Health Failed: {e}")
        sys.exit(1)

    # 2. Analyze Ground Report
    try:
        r2 = requests.post(f"{BASE_URL}/api/v1/analyze-ground-report", json={
            "text": "Water is rushing over Mahadev Ghat causeway, knee-deep around 0.72m. Ambulances cannot pass.",
            "location_name": "Mahadev Ghat Causeway"
        })
        assert r2.status_code == 200
        data2 = r2.json()
        print(f"✅ 2. Gemini Ground Intake Analysis:")
        print(f"     Estimated Depth: {data2['estimated_water_depth_m']}m")
        print(f"     Ambulance Passable: {data2['ambulance_passable']} (Clearance Threshold: 0.60m)")
        print(f"     Cues Detected: {data2['observable_cues']}")
        print(f"     Confidence Score: {data2['confidence_score']} ({data2['verification_status']})")
    except Exception as e:
        print(f"❌ 2. Ground Intake Failed: {e}")
        sys.exit(1)

    # 3. Dynamic Dijkstra Route
    try:
        r3 = requests.post(f"{BASE_URL}/api/v1/route", json={
            "origin_node": "BHATAGAON_ISBT",
            "destination_node": "AIIMS_RAIPUR",
            "vehicle_clearance": 0.6,
            "water_simulation_offset": 0.35
        })
        assert r3.status_code == 200
        data3 = r3.json()
        print(f"✅ 3. Dynamic Dijkstra Routing:")
        print(f"     Status: {data3['status']} | Path Nodes: {' -> '.join(data3['path_nodes'])}")
        print(f"     Distance: {data3['total_distance_km']} km | Travel Time: {data3['total_travel_time_min']} mins")
        print(f"     Max Water Depth: {data3['max_water_depth_m']}m | Safety Buffer: {data3['safety_margin_m']}m")
    except Exception as e:
        print(f"❌ 3. Routing Failed: {e}")
        sys.exit(1)

    # 4. Isolated Zones
    try:
        r4 = requests.get(f"{BASE_URL}/api/v1/isolated-zones?clearance_limit=0.6")
        assert r4.status_code == 200
        data4 = r4.json()
        print(f"✅ 4. Disconnected Sub-graphs & Vulnerability Ranking:")
        print(f"     Total Cut-off Population: {data4['total_cutoff_population']:,}")
        print(f"     Isolated Zones Found: {data4['isolated_zones_count']}")
        for i, z in enumerate(data4['ranked_zones'][:2], 1):
            print(f"     Zone #{i}: {z['zone_name']} | Vuln Score V: {z['vulnerability_score']} | Pop: {z['population']:,}")
    except Exception as e:
        print(f"❌ 4. Isolated Zones Failed: {e}")
        sys.exit(1)

    # 5. Multilingual CAP Alert Generation & Human Approval Gate
    try:
        r5_draft = requests.post(f"{BASE_URL}/api/v1/generate-cap-alert", json={
            "zone_id": "ZONE-ISO-01",
            "zone_name": "Chhatauna Riverbend Enclave",
            "population": 14200,
            "vulnerability_score": 82.5,
            "water_depth_m": 1.1,
            "approved_by_officer": False
        })
        assert r5_draft.status_code == 200
        draft = r5_draft.json()
        print(f"✅ 5a. CAP Alert Auto-Drafting:")
        print(f"     Status: {draft['status']} (Awaiting Human Officer)")
        print(f"     Hindi SMS ({len(draft['hindi_sms'])}c): {draft['hindi_sms']}")
        print(f"     Chhattisgarhi SMS ({len(draft['chhattisgarhi_sms'])}c): {draft['chhattisgarhi_sms']}")

        r5_disp = requests.post(f"{BASE_URL}/api/v1/generate-cap-alert", json={
            "zone_id": "ZONE-ISO-01",
            "zone_name": "Chhatauna Riverbend Enclave",
            "population": 14200,
            "vulnerability_score": 82.5,
            "water_depth_m": 1.1,
            "approved_by_officer": True,
            "approver_notes": "Authorized by EOC Chief Controller"
        })
        assert r5_disp.status_code == 200
        disp = r5_disp.json()
        print(f"✅ 5b. Human Officer Approval & Dispatch Gate:")
        print(f"     Status: {disp['status']} | Dispatched By: {disp['dispatched_by']}")
        print(f"     Timestamp: {disp['dispatch_timestamp']}")
        print(f"     Channels: {', '.join(disp['broadcast_channels'])}")
    except Exception as e:
        print(f"❌ 5. CAP Alert Failed: {e}")
        sys.exit(1)

    # 6. Frontend Assets
    try:
        r6 = requests.get(f"{BASE_URL}/")
        assert r6.status_code == 200
        print(f"✅ 6. Frontend Dashboard Serving: HTTP 200 OK (Single-Page Control Room Active)")
    except Exception as e:
        print(f"❌ 6. Frontend Serving Failed: {e}")
        sys.exit(1)

    print("=" * 65)
    print("🎉 ALL SYSTEMS ARE OPERATIONAL AND READY FOR THE HACKATHON!")
    print("👉 Open your browser at: http://127.0.0.1:8000")
    print("=" * 65)

if __name__ == "__main__":
    test_pravah()
