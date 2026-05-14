import httpx
import sys

def check_server():
    # We check the specific API endpoint because the root might return 404
    base_url = "https://attendance.algosium.com"
    api_path = "/api/v1/app/attendance/log"
    site_id = "d470b8e8-d5f3-4853-9037-d1d12bb0142a"
    url = f"{base_url}{api_path}"
    
    print(f"Checking health of API: {url}")
    
    headers = {
        "User-Agent": "NFC-Load-Test-Health-Check/1.0",
        "accept": "application/json",
        "X-Site-ID": site_id
    }
    
    try:
        # We use POST with empty body (it should return 400 or 401 if it exists)
        # If it returns 404, the path is definitely wrong.
        response = httpx.post(url, headers=headers, json={}, timeout=10.0)
        
        if response.status_code in [200, 201, 204, 400, 401, 422]:
            print(f"[UP] Server is reachable (Status {response.status_code})")
        elif response.status_code == 404:
            print(f"[ALERT] 404 Not Found. The endpoint {api_path} is currently not found on this server.")
        else:
            print(f"[DOWN] Server returned Status {response.status_code} ({response.reason_phrase})")
            
    except httpx.ConnectTimeout:
        print("[ERROR] Connection Timeout: The server is not responding at all.")
    except Exception as e:
        print(f"[ERROR] Connection Error: {type(e).__name__}: {str(e)}")

if __name__ == "__main__":
    check_server()
