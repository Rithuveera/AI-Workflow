import asyncio
import time
import httpx
from datetime import datetime, UTC, timedelta

# --- CONFIGURATION (Syncing 50 Offline Records) ---
BASE_URL = "https://attendance.algosium.com" 
# BASE_URL = "http://localhost:8000" 
PATH_TEMPLATE = "/api/v1/app/attendance/log"
SPECIFIC_EMPLOYEE_ID = "Se0001"
SITE_ID = "d470b8e8-d5f3-4853-9037-d1d12bb0142a"

# --- AUTH & SIGNATURE (Carried from nfc_load_test.py) ---
AUTH_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2SFI4MXZPcE1sX015Ny1LeWhLRkdLX1o1MVRUTEY0b2hvX0k0aEdqM3Z3In0.eyJleHAiOjE3NzgxNjk3OTMsImlhdCI6MTc3ODEzMzc5MywiYXV0aF90aW1lIjoxNzc4MTMzNzkzLCJqdGkiOiI5YjgzYWVmMS01YWEzLTRmZDYtYjQzOC1hNDhhNjY0NGIyZGUiLCJpc3MiOiJodHRwczovL2F1dGgtYWNjb21vZGF0aW9uLmNhbXBuZXVyb24uY29tL3JlYWxtcy9pZGVudGl0eS1zZXJ2ZXIiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNjk3NjYwMDYtZjRkZi00Y2YxLTllYWQtMjIzZWVjNGI1ZGE3IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYXR0ZW5kYW5jZS1tYW5hZ2VtZW50LWRldi11aSIsIm5vbmNlIjoiMzViYzk5NGEtMDI4Yi00YTA2LWIwNmEtYzY3MTBjOTA4ZWFhIiwic2Vzc2lvbl9zdGF0ZSI6IjY1YTI2OTA4LTFkNTgtNDRkYS1iNmZkLTZjNDA0MTI2ZGZhYiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1pZGVudGl0eS1zZXJ2ZXIiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYXR0ZW5kYW5jZS1tYW5hZ2VtZW50LWRldi11aSI6eyJyb2xlcyI6WyJTVVBFUlZJU09SIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiNjVhMjY5MDgtMWQ1OC00NGRhLWI2ZmQtNmM0MDQxMjZkZmFiIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiUml0aHUgViIsInByZWZlcnJlZF91c2VybmFtZSI6InJpdGh1IiwiZ2l2ZW5fbmFtZSI6IlJpdGh1IiwiZmFtaWx5X25hbWUiOiJWIiwiZW1haWwiOiJyaXRodTMyMzRAZ21haWwuY29tIn0.zeHu3ABFo1yQ8SO2385tmenZnM5uG-LboHrEfLjqlkiZE3dTT0-kYci3mJHUER-FJkwduchOPhL68MsjY2oqhas0cZGLprSBDegYHYZNqEWRpmClQIlaGFuJo6LLrV9-wNSrGP929nQEBP822W69bjcpYohMl2Ja1kpCN4DnJM51XVdntojE_QRrK4baFmbaQC1ZA_fWSF9f5M8onqn03cPKEH_sCjbIGHj8ydQ-5lAW0x3lTvwp7yalBFnd20oLgSheW4-D7u_Ft70yiu27AEhn_OKQEQpRjvFtjQipWhKufqywArv95PhfXcMNJVvk8k91yhfhg81agb99VUfnvA"
HEX_SIGNATURE = "84804514c3236ae6c6729642f179badc35d88cdff394f6ddd87a03aaf08aa6fe"

NUM_OFFLINE_RECORDS = 10
SYNC_CONCURRENCY = 5  # Simulate app's connection pool size
SYNC_INTERVAL = 0.5   # Seconds to wait between starting each request (to avoid duplicate detection)
# ---------------------

async def sync_record(client, payload, index):
    url = f"{BASE_URL}{PATH_TEMPLATE}"
    start_time = time.perf_counter()
    headers = {
        "accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {AUTH_TOKEN}",
        "X-Site-ID": SITE_ID
    }
    
    try:
        response = await client.post(url, json=payload, headers=headers)
        latency = (time.perf_counter() - start_time) * 1000
        
        if response.status_code in [200, 201, 204]:
            print(f"[{index+1:02}] Sync Success ({response.status_code}) - Log Time: {payload['log_time']}")
            return True, latency
        else:
            print(f"[{index+1:02}] Sync Error ({response.status_code}) - {response.text}")
            return False, latency
    except Exception as e:
        latency = (time.perf_counter() - start_time) * 1000
        print(f"[{index+1:02}] Connection Error: {type(e).__name__}")
        return False, latency

async def run_offline_sync():
    print("=" * 60)
    print("[STARTED] OFFLINE SYNC PERFORMANCE TEST")
    print(f"Scenario: Syncing {NUM_OFFLINE_RECORDS} queued records in bursts of {SYNC_CONCURRENCY}")
    print("=" * 60)
    
    # 1. PREPARE HISTORICAL DATA (Scans that 'happened' over the last few hours)
    payloads = []
    # Start the timeline 2 hours ago
    base_time = datetime.now(UTC) - timedelta(hours=2)
    
    for i in range(NUM_OFFLINE_RECORDS):
        # Each scan happened 2 minutes apart in history
        historical_time = base_time + timedelta(minutes=i*2)
        payloads.append({
            "tag_id": "1DBEC9C7111080",
            "signature": HEX_SIGNATURE,
            "employee_id": SPECIFIC_EMPLOYEE_ID,
            "log_time": historical_time.strftime("%Y-%m-%dT%H:%M:%SZ")
        })

    # 2. PERFORM SYNC BURST
    async with httpx.AsyncClient(timeout=30.0, verify=True) as client:
        start_sync_total = time.perf_counter()
        all_tasks = []
        
        print(f"Staggering {NUM_OFFLINE_RECORDS} requests with {SYNC_INTERVAL}s interval...")
        
        for i, payload in enumerate(payloads):
            # Create task to start the request
            task = asyncio.create_task(sync_record(client, payload, i))
            all_tasks.append(task)
            
            # Wait for interval if specified
            if SYNC_INTERVAL > 0:
                await asyncio.sleep(SYNC_INTERVAL)
        
        results = await asyncio.gather(*all_tasks)
        
        end_sync_total = time.perf_counter()

    # 3. RESULTS ANALYSIS
    successes = [r for r in results if r[0]]
    latencies = [r[1] for r in results]
    total_time = end_sync_total - start_sync_total

    print("-" * 60)
    print(f"SYNC PERFORMANCE SUMMARY")
    print("-" * 60)
    print(f"Total Records Synced: {len(results)}")
    print(f"Success Rate:         {(len(successes)/len(results))*100:.1f}%")
    print(f"Total Sync Duration:  {total_time:.2f} seconds")
    print(f"Avg Rec. Latency:     {sum(latencies)/len(latencies):.2f} ms")
    print(f"Max Rec. Latency:     {max(latencies):.2f} ms")
    
    if total_time < 5.0 and len(successes) == NUM_OFFLINE_RECORDS:
        print("\nRESULT: SUCCESS (Highly efficient burst sync)")
    elif len(successes) == NUM_OFFLINE_RECORDS:
        print("\nRESULT: WARNING (Sync completed but slow latency detected)")
    else:
        print("\nRESULT: FAILED (Server errors during burst sync)")
    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(run_offline_sync())
