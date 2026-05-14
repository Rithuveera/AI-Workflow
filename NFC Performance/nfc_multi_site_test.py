import asyncio
import time
import httpx
from datetime import datetime, UTC, timedelta

# --- CONFIGURATION (Multi-Site Scenario) ---
BASE_URL = "https://attendance.algosium.com"
PATH_TEMPLATE = "/api/v1/app/attendance/log"

# PASTE YOUR AUTH TOKEN HERE
AUTH_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2SFI4MXZPcE1sX015Ny1LeWhLRkdLX1o1MVRUTEY0b2hvX0k0aEdqM3Z3In0.eyJleHAiOjE3NzgxNjk3OTMsImlhdCI6MTc3ODEzMzc5MywiYXV0aF90aW1lIjoxNzc4MTMzNzkzLCJqdGkiOiI5YjgzYWVmMS01YWEzLTRmZDYtYjQzOC1hNDhhNjY0NGIyZGUiLCJpc3MiOiJodHRwczovL2F1dGgtYWNjb21vZGF0aW9uLmNhbXBuZXVyb24uY29tL3JlYWxtcy9pZGVudGl0eS1zZXJ2ZXIiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNjk3NjYwMDYtZjRkZi00Y2YxLTllYWQtMjIzZWVjNGI1ZGE3IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYXR0ZW5kYW5jZS1tYW5hZ2VtZW50LWRldi11aSIsIm5vbmNlIjoiMzViYzk5NGEtMDI4Yi00YTA2LWIwNmEtYzY3MTBjOTA4ZWFhIiwic2Vzc2lvbl9zdGF0ZSI6IjY1YTI2OTA4LTFkNTgtNDRkYS1iNmZkLTZjNDA0MTI2ZGZhYiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1pZGVudGl0eS1zZXJ2ZXIiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYXR0ZW5kYW5jZS1tYW5hZ2VtZW50LWRldi11aSI6eyJyb2xlcyI6WyJTVVBFUlZJU09SIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiNjVhMjY5MDgtMWQ1OC00NGRhLWI2ZmQtNmM0MDQxMjZkZmFiIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiUml0aHUgViIsInByZWZlcnJlZF91c2VybmFtZSI6InJpdGh1IiwiZ2l2ZW5fbmFtZSI6IlJpdGh1IiwiZmFtaWx5X25hbWUiOiJWIiwiZW1haWwiOiJyaXRodTMyMzRAZ21haWwuY29tIn0.zeHu3ABFo1yQ8SO2385tmenZnM5uG-LboHrEfLjqlkiZE3dTT0-kYci3mJHUER-FJkwduchOPhL68MsjY2oqhas0cZGLprSBDegYHYZNqEWRpmClQIlaGFuJo6LLrV9-wNSrGP929nQEBP822W69bjcpYohMl2Ja1kpCN4DnJM51XVdntojE_QRrK4baFmbaQC1ZA_fWSF9f5M8onqn03cPKEH_sCjbIGHj8ydQ-5lAW0x3lTvwp7yalBFnd20oLgSheW4-D7u_Ft70yiu27AEhn_OKQEQpRjvFtjQipWhKufqywArv95PhfXcMNJVvk8k91yhfhg81agb99VUfnvA"
HEX_SIGNATURE = "1be7a0e4dd5013de01929cf94b06ed6d2728373f51cbef0d0233585a32151568"

# LIST OF SITES AND THEIR VALID EMPLOYEES
# Add as many as you want here!
SITES_TO_TEST = [
    {"site_id": "c994390b-05a4-4974-97a5-ba0b809d79a5", "employee_id": "Se0001", "label": "Site c99..."},
    {"site_id": "cd50c341-64dc-42bd-b8e6-21cf4c327cc4", "employee_id": "Se0001", "label": "Site cd5..."},
    {"site_id": "d470b8e8-d5f3-4853-9037-d1d12bb0142a", "employee_id": "Se0001", "label": "Site d47..."},
]

# --- CONCURRENCY SETTINGS ---
# --- CONCURRENCY SETTINGS ---
CONCURRENCY_PER_SITE = 1000  # Increased load
REQUEST_INTERVAL = 30      # Delay between each request (30 seconds)
# ----------------------------

async def test_site_log(client, scenario, task_id=0):
    url = f"{BASE_URL}{PATH_TEMPLATE}"
    site_id = scenario["site_id"]
    emp_id = scenario["employee_id"]
    label = f"{scenario['label']} (Req {task_id})"
    
    payload = {
        "tag_id": "1DBEC9C7111080",
        "signature": HEX_SIGNATURE,
        "employee_id": emp_id,
        "log_time": (datetime.now(UTC) - timedelta(seconds=task_id)).strftime("%Y-%m-%dT%H:%M:%SZ")
    }
    
    headers = {
        "accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {AUTH_TOKEN}",
        "X-Site-ID": site_id
    }
    
    start = time.perf_counter()
    try:
        response = await client.post(url, json=payload, headers=headers)
        latency = (time.perf_counter() - start) * 1000
        
        if response.status_code in [200, 201, 204]:
            # Reduced printing to avoid terminal lag during high load
            if task_id % 10 == 0:
                print(f"[PASS] {label:25} | Status: {response.status_code} | Latency: {latency:.2f}ms")
            return True, latency
        else:
            print(f"[FAIL] {label:25} | Status: {response.status_code} | Msg: {response.text[:100]}...")
            return False, latency
    except Exception as e:
        print(f"[ERR ] {label:25} | Error: {type(e).__name__}")
        return False, 0

async def main():
    print("=" * 80)
    print(f"RUNNING HIGH-LOAD MULTI-SITE TEST ({CONCURRENCY_PER_SITE} reqs/site)")
    print(f"Interval: {REQUEST_INTERVAL}s | Total Expected: {CONCURRENCY_PER_SITE * len(SITES_TO_TEST)}")
    print("=" * 80)
    
    start_all = time.perf_counter()
    async with httpx.AsyncClient(timeout=20.0) as client:
        all_tasks = []
        for i in range(CONCURRENCY_PER_SITE):
            for scenario in SITES_TO_TEST:
                task = asyncio.create_task(test_site_log(client, scenario, i+1))
                all_tasks.append(task)
                if REQUEST_INTERVAL > 0:
                    await asyncio.sleep(REQUEST_INTERVAL)
        
        results = await asyncio.gather(*all_tasks)
    
    end_all = time.perf_counter()
    duration = end_all - start_all
    
    successes = [r for r in results if r[0]]
    latencies = sorted([r[1] for r in results if r[0]])
    
    avg_latency = sum(latencies)/len(latencies) if latencies else 0
    min_latency = latencies[0] if latencies else 0
    max_latency = latencies[-1] if latencies else 0
    p95_latency = latencies[int(len(latencies) * 0.95)] if latencies else 0
    throughput = len(results) / duration if duration > 0 else 0

    print("-" * 80)
    print(f"SUMMARY REPORT")
    print(f"Total Requests:      {len(results)}")
    print(f"Passed Requests:     {len(successes)}")
    print(f"Success Rate:        {(len(successes)/len(results))*100:.1f}%")
    print(f"Total Duration:      {duration:.2f}s")
    print(f"Throughput:          {throughput:.2f} req/sec")
    if successes:
        print(f"Min Latency:         {min_latency:.2f}ms")
        print(f"Avg Latency:         {avg_latency:.2f}ms")
        print(f"Max Latency:         {max_latency:.2f}ms")
        print(f"P95 Latency:         {p95_latency:.2f}ms")
    print("=" * 80)

if __name__ == "__main__":
    asyncio.run(main())
