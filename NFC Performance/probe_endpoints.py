import httpx
import json

AUTH_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2SFI4MXZPcE1sX015Ny1LeWhLRkdLX1o1MVRUTEY0b2hvX0k0aEdqM3Z3In0.eyJleHAiOjE3NzgxNjk3OTMsImlhdCI6MTc3ODEzMzc5MywiYXV0aF90aW1lIjoxNzc4MTMzNzkzLCJqdGkiOiI5YjgzYWVmMS01YWEzLTRmZDYtYjQzOC1hNDhhNjY0NGIyZGUiLCJpc3MiOiJodHRwczovL2F1dGgtYWNjb21vZGF0aW9uLmNhbXBuZXVyb24uY29tL3JlYWxtcy9pZGVudGl0eS1zZXJ2ZXIiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNjk3NjYwMDYtZjRkZi00Y2YxLTllYWQtMjIzZWVjNGI1ZGE3IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYXR0ZW5kYW5jZS1tYW5hZ2VtZW50LWRldi11aSIsIm5vbmNlIjoiMzViYzk5NGEtMDI4Yi00YTA2LWIwNmEtYzY3MTBjOTA4ZWFhIiwic2Vzc2lvbl9zdGF0ZSI6IjY1YTI2OTA4LTFkNTgtNDRkYS1iNmZkLTZjNDA0MTI2ZGZhYiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1pZGVudGl0eS1zZXJ2ZXIiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYXR0ZW5kYW5jZS1tYW5hZ2VtZW50LWRldi11aSI6eyJyb2xlcyI6WyJTVVBFUlZJU09SIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiNjVhMjY5MDgtMWQ1OC00NGRhLWI2ZmQtNmM0MDQxMjZkZmFiIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiUml0aHUgViIsInByZWZlcnJlZF91c2VybmFtZSI6InJpdGh1IiwiZ2l2ZW5fbmFtZSI6IlJpdGh1IiwiZmFtaWx5X25hbWUiOiJWIiwiZW1haWwiOiJyaXRodTMyMzRAZ21haWwuY29tIn0.zeHu3ABFo1yQ8SO2385tmenZnM5uG-LboHrEfLjqlkiZE3dTT0-kYci3mJHUER-FJkwduchOPhL68MsjY2oqhas0cZGLprSBDegYHYZNqEWRpmClQIlaGFuJo6LLrV9-wNSrGP929nQEBP822W69bjcpYohMl2Ja1kpCN4DnJM51XVdntojE_QRrK4baFmbaQC1ZA_fWSF9f5M8onqn03cPKEH_sCjbIGHj8ydQ-5lAW0x3lTvwp7yalBFnd20oLgSheW4-D7u_Ft70yiu27AEhn_OKQEQpRjvFtjQipWhKufqywArv95PhfXcMNJVvk8k91yhfhg81agb99VUfnvA"
SITE_ID = "d470b8e8-d5f3-4853-9037-d1d12bb0142a"
BASE_URL = "https://attendance.algosium.com"

endpoints = [
    "/api/v1/app/attendance/log", # Already know this works for POST
    "/api/v1/app/attendance/logs",
    "/api/v1/app/attendance/history",
    "/api/v1/app/attendance/records",
    "/api/v1/app/attendance/list",
]

headers = {
    "Authorization": f"Bearer {AUTH_TOKEN}",
    "X-Site-ID": SITE_ID,
    "accept": "application/json"
}

def probe():
    for path in endpoints:
        url = f"{BASE_URL}{path}"
        try:
            print(f"Probing GET {url}...")
            r = httpx.get(url, headers=headers, timeout=5.0)
            print(f"  Response: {r.status_code}")
            if r.status_code == 200:
                try:
                    data = r.json()
                    print(f"  Data snippet: {str(data)[:200]}...")
                except:
                    print(f"  Response is not JSON")
        except Exception as e:
            print(f"  Error: {str(e)}")

if __name__ == "__main__":
    probe()
