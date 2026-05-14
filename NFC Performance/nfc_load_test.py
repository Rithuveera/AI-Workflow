import asyncio
import time
import httpx
import uuid
from datetime import datetime, UTC

# --- CONFIGURATION ---
BASE_URL = "https://attendance.algosium.com" 
# BASE_URL = "http://localhost:8000" 
PATH_TEMPLATE = "/api/v1/app/attendance/log"
SPECIFIC_EMPLOYEE_ID = "Se0001"
SITE_ID = "d470b8e8-d5f3-4853-9037-d1d12bb0142a"

# --- PASTE YOUR TOKEN HERE ---
AUTH_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2SFI4MXZPcE1sX015Ny1LeWhLRkdLX1o1MVRUTEY0b2hvX0k0aEdqM3Z3In0.eyJleHAiOjE3NzgxNjk3OTMsImlhdCI6MTc3ODEzMzc5MywiYXV0aF90aW1lIjoxNzc4MTMzNzkzLCJqdGkiOiI5YjgzYWVmMS01YWEzLTRmZDYtYjQzOC1hNDhhNjY0NGIyZGUiLCJpc3MiOiJodHRwczovL2F1dGgtYWNjb21vZGF0aW9uLmNhbXBuZXVyb24uY29tL3JlYWxtcy9pZGVudGl0eS1zZXJ2ZXIiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNjk3NjYwMDYtZjRkZi00Y2YxLTllYWQtMjIzZWVjNGI1ZGE3IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYXR0ZW5kYW5jZS1tYW5hZ2VtZW50LWRldi11aSIsIm5vbmNlIjoiMzViYzk5NGEtMDI4Yi00YTA2LWIwNmEtYzY3MTBjOTA4ZWFhIiwic2Vzc2lvbl9zdGF0ZSI6IjY1YTI2OTA4LTFkNTgtNDRkYS1iNmZkLTZjNDA0MTI2ZGZhYiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1pZGVudGl0eS1zZXJ2ZXIiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYXR0ZW5kYW5jZS1tYW5hZ2VtZW50LWRldi11aSI6eyJyb2xlcyI6WyJTVVBFUlZJU09SIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiNjVhMjY5MDgtMWQ1OC00NGRhLWI2ZmQtNmM0MDQxMjZkZmFiIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiUml0aHUgViIsInByZWZlcnJlZF91c2VybmFtZSI6InJpdGh1IiwiZ2l2ZW5fbmFtZSI6IlJpdGh1IiwiZmFtaWx5X25hbWUiOiJWIiwiZW1haWwiOiJyaXRodTMyMzRAZ21haWwuY29tIn0.zeHu3ABFo1yQ8SO2385tmenZnM5uG-LboHrEfLjqlkiZE3dTT0-kYci3mJHUER-FJkwduchOPhL68MsjY2oqhas0cZGLprSBDegYHYZNqEWRpmClQIlaGFuJo6LLrV9-wNSrGP929nQEBP822W69bjcpYohMl2Ja1kpCN4DnJM51XVdntojE_QRrK4baFmbaQC1ZA_fWSF9f5M8onqn03cPKEH_sCjbIGHj8ydQ-5lAW0x3lTvwp7yalBFnd20oLgSheW4-D7u_Ft70yiu27AEhn_OKQEQpRjvFtjQipWhKufqywArv95PhfXcMNJVvk8k91yhfhg81agb99VUfnvA"
HEX_SIGNATURE = "84804514c3236ae6c6729642f179badc35d88cdff394f6ddd87a03aaf08aa6fe"

NUM_TEST_RUNS = 5
CONCURRENT_USERS = 1
ITERATION_DELAY = 2.0  # 1 second for quick performance verification

# --- PROXY SETTINGS ---
# Set these if you are behind a corporate proxy or using Charles/Fiddler
USE_PROXY = False # Change to True to use the proxy below
PROXY_URL = "http://127.0.0.1:8888" 
VERIFY_SSL = True # Set to False if you get "SSL: CERTIFICATE_VERIFY_FAILED"
# ---------------------

async def simulate_scan(client, employee_id):
    url = f"{BASE_URL}{PATH_TEMPLATE}"
    # Final Valid Payload with POST method
    payload = {
        "tag_id": "1DBEC9C7111080",
        "signature": HEX_SIGNATURE,
        "employee_id": employee_id,
        "log_time": datetime.now(UTC).strftime("%Y-%m-%dT%H:%M:%SZ") # Dynamic timestamp in user's format
    }
    
    start_time = time.perf_counter()
    try:
        # Headers from your curl command
        headers = {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": f"Bearer {AUTH_TOKEN}",
            "X-Site-ID": SITE_ID
        }
        
        # Using POST method as per final requirement
        response = await client.post(url, json=payload, headers=headers)
        end_time = time.perf_counter()
        latency = (end_time - start_time) * 1000
        
        # Check for 200 OK, 201 Queued, or 204 No Content
        # Note: 201 is now treated as Success since it means "queued"
        if response.status_code in [200, 201, 204]:
            print(f"Success {response.status_code} for {employee_id}: {response.text}")
            return True, latency
        else:
            print(f"Error {response.status_code} for {employee_id}: {response.text}")
            return False, latency
    except Exception as e:
        end_time = time.perf_counter()
        print(f"Connection Error for {employee_id}: {type(e).__name__}: {str(e)}")
        return False, (end_time - start_time) * 1000

async def run_load_test():
    print(f"Starting Real NFC Sync Load Test")
    print(f"Target Template: {BASE_URL}{PATH_TEMPLATE}")
    print(f"Testing Employee ID: {SPECIFIC_EMPLOYEE_ID}")
    print(f"Simulating {NUM_TEST_RUNS} sync attempts with {CONCURRENT_USERS} concurrency")
    print("-" * 50)

    proxy_config = PROXY_URL if USE_PROXY else None
    
    async with httpx.AsyncClient(
        timeout=30.0, 
        proxy=proxy_config, 
        verify=VERIFY_SSL
    ) as client:
        start_test = time.perf_counter()
        
        all_tasks = []
        REQUEST_INTERVAL = 0.5  # Stagger requests to avoid "Duplicate" errors
        
        print(f"Executing {NUM_TEST_RUNS} runs with {REQUEST_INTERVAL}s interval...")
        
        for i in range(NUM_TEST_RUNS):
            task = asyncio.create_task(simulate_scan(client, SPECIFIC_EMPLOYEE_ID))
            all_tasks.append(task)
            
            if REQUEST_INTERVAL > 0 and i < NUM_TEST_RUNS - 1:
                await asyncio.sleep(REQUEST_INTERVAL)
        
        results = await asyncio.gather(*all_tasks)
        end_test = time.perf_counter()

    # Success/Failure analysis
    successes = [r for r in results if r[0]]
    failures = [r for r in results if not r[0]]
    latencies = [r[1] for r in results]

    avg_latency = sum(latencies) / len(latencies) if latencies else 0
    max_latency = max(latencies) if latencies else 0
    min_latency = min(latencies) if latencies else 0

    print("-" * 50)
    print(f"Completed in: {end_test - start_test:.2f}s")
    print(f"Total Scans: {len(results)}")
    print(f"Success Rate: {(len(successes)/len(results))*100:.1f}%")
    print(f"Avg Latency: {avg_latency:.2f}ms")
    print(f"Min Latency: {min_latency:.2f}ms")
    print(f"Max Latency: {max_latency:.2f}ms")
    print("-" * 50)

if __name__ == "__main__":
    asyncio.run(run_load_test())
