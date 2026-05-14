import asyncio
import time
import httpx
from datetime import datetime, UTC, timedelta

# --- CONFIGURATION (Multi-Employee Multi-Site Scenario) ---
BASE_URL = "https://attendance.algosium.com"
PATH_TEMPLATE = "/api/v1/app/attendance/log"


# AUTH TOKEN (Keep this updated)
AUTH_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2SFI4MXZPcE1sX015Ny1LeWhLRkdLX1o1MVRUTEY0b2hvX0k0aEdqM3Z3In0.eyJleHAiOjE3NzgxNjk3OTMsImlhdCI6MTc3ODEzMzc5MywiYXV0aF90aW1lIjoxNzc4MTMzNzkzLCJqdGkiOiI5YjgzYWVmMS01YWEzLTRmZDYtYjQzOC1hNDhhNjY0NGIyZGUiLCJpc3MiOiJodHRwczovL2F1dGgtYWNjb21vZGF0aW9uLmNhbXBuZXVyb24uY29tL3JlYWxtcy9pZGVudGl0eS1zZXJ2ZXIiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNjk3NjYwMDYtZjRkZi00Y2YxLTllYWQtMjIzZWVjNGI1ZGE3IiwidHlwIjoxNzc4MTMzNzkzLCJqdGkiOiI5YjgzYWVmMS01YWEzLTRmZDYtYjQzOC1hNDhhNjY0NGIyZGUiLCJpc3MiOiJodHRwczovL2F1dGgtYWNjb21vZGF0aW9uLmNhbXBuZXVyb24uY29tL3JlYWxtcy9pZGVudGl0eS1zZXJ2ZXIiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNjk3NjYwMDYtZjRkZi00Y2YxLTllYWQtMjIzZWVjNGI1ZGE3IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYXR0ZW5kYW5jZS1tYW5hZ2VtZW50LWRldi11aSIsIm5vbmNlIjoiMzViYzk5NGEtMDI4Yi00YTA2LWIwNmEtYzY3MTBjOTA4ZWFhIiwic2Vzc2lvbl9zdGF0ZSI6IjY1YTI2OTA4LTFkNTgtNDRkYS1iNmZkLTZjNDA0MTI2ZGZhYiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1pZGVudGl0eS1zZXJ2ZXIiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYXR0ZW5kYW5jZS1tYW5hZ2VtZW50LWRldi11aSI6eyJyb2xlcyI6WyJTVVBFUlZJU09SIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiNjVhMjY5MDgtMWQ1OC00NGRhLWI2ZmQtNmM0MDQxMjZkZmFiIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiUml0aHUgViIsInByZWZlcnJlZF91c2VybmFtZSI6InJpdGh1IiwiZ2l2ZW5fbmFtZSI6IlJpdGh1IiwiZmFtaWx5X25hbWUiOiJWIiwiZW1haWwiOiJyaXRodTMyMzRAZ21haWwuY29tIn0.zeHu3ABFo1yQ8SO2385tmenZnM5uG-LboHrEfLjqlkiZE3dTT0-kYci3mJHUER-FJkwduchOPhL68MsjY2oqhas0cZGLprSBDegYHYZNqEWRpmClQIlaGFuJo6LLrV9-wNSrGP929nQEBP822W69bjcpYohMl2Ja1kpCN4DnJM51XVdntojE_QRrK4baFmbaQC1ZA_fWSF9f5M8onqn03cPKEH_sCjbIGHj8ydQ-5lAW0x3lTvwp7yalBFnd20oLgSheW4-D7u_Ft70yiu27AEhn_OKQEQpRjvFtjQipWhKufqywArv95PhfXcMNJVvk8k91yhfhg81agb99VUfnvA"

# MATRIX: SITES AND THEIR ASSIGNED EMPLOYEES
TEST_MATRIX = [
    {
        "site_id": "c994390b-05a4-4974-97a5-ba0b809d79a5",
        "label": "Minning",
        "employees": [
            {
                "id": "Se0001", 
                "tag_id": "1DBEC9C7111080", 
                "signature": "1be7a0e4dd5013de01929cf94b06ed6d2728373f51cbef0d0233585a32151568"
            },
            {
                "id": "EMP20020", 
                "tag_id": "5399784B740001", 
                "signature": "faa8d80c152596a9139c224c0ed413eec29130b196ac3731a27462d477585c77"
            },
            {
                "id": "EMP1020", 
                "tag_id": "1DC9C9C7111080", 
                "signature": "d2f4c8748f0e8c6690ae0cb3e134e9b1d40cf615c4addaf5600c54f1d3da7439"
            }
        ]
    },
    {
        "site_id": "d470b8e8-d5f3-4853-9037-d1d12bb0142a",
        "label": "Technopark Software Project Phase1 - Trivendrum So",
        "employees": [
            {
                "id": "Se0001", 
                "tag_id": "1DBEC9C7111080", 
                "signature": "1be7a0e4dd5013de01929cf94b06ed6d2728373f51cbef0d0233585a32151568",
            },
            {
                "id": "EMP20020", 
                "tag_id": "5399784B740001", 
                "signature": "faa8d80c152596a9139c224c0ed413eec29130b196ac3731a27462d477585c77",
            },
            {
                
                "id": "EMP1020", 
                "tag_id": "1DC9C9C7111080", 
                "signature": "d2f4c8748f0e8c6690ae0cb3e134e9b1d40cf615c4addaf5600c54f1d3da7439",
            }
        ]
    },
    {
        "site_id": "cd50c341-64dc-42bd-b8e6-21cf4c327cc4",
        "label": "Habshan",
        "employees": [
            {
                "id": "Se0001", 
                "tag_id": "1DBEC9C7111080", 
                "signature": "1be7a0e4dd5013de01929cf94b06ed6d2728373f51cbef0d0233585a32151568",
            },
            {
                "id": "EMP20020", 
                "tag_id": "5399784B740001", 
                "signature": "faa8d80c152596a9139c224c0ed413eec29130b196ac3731a27462d477585c77",
            },
            {
                
                "id": "EMP1020", 
                "tag_id": "1DC9C9C7111080", 
                "signature": "d2f4c8748f0e8c6690ae0cb3e134e9b1d40cf615c4addaf5600c54f1d3da7439",
            }
        ]
    }
]
# --- LOAD SETTINGS ---
REQUESTS_PER_EMPLOYEE = 10  # How many logs each employee sends
REQUEST_INTERVAL = 30      # Delay between each request (30 seconds)
# ----------------------------

async def test_log_entry(client, site_id, employee_data, task_id, label):
    """
    employee_data contains: id, tag_id, signature, token (optional)
    """
    url = f"{BASE_URL}{PATH_TEMPLATE}"
    emp_id = employee_data["id"]
    tag_id = employee_data["tag_id"]
    signature = employee_data["signature"]
    
    full_label = f"{label} | Emp: {emp_id} (Req {task_id})"
    
    # Payload includes unique log_time to prevent collision
    payload = {
        "tag_id": tag_id,
        "signature": signature,
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
            print(f"[PASS] {full_label:45} | {response.status_code} | {latency:.2f}ms")
            return {"site": label, "emp": emp_id, "success": True, "latency": latency, "status": response.status_code}
        else:
            print(f"[FAIL] {full_label:45} | {response.status_code} | {response.text[:50]}...")
            return {"site": label, "emp": emp_id, "success": False, "latency": latency, "status": response.status_code, "error": response.text[:100]}
    except Exception as e:
        print(f"[ERR ] {full_label:45} | {type(e).__name__}")
        return {"site": label, "emp": emp_id, "success": False, "latency": 0, "status": "ERR", "error": str(e)}

async def main():
    total_scenarios = sum(len(site["employees"]) * REQUESTS_PER_EMPLOYEE for site in TEST_MATRIX)
    print("=" * 100)
    print(f"STARTING MULTI-EMPLOYEE MULTI-SITE MATRIX TEST")
    print(f"Total Unique Combinations to Run: {total_scenarios}")
    print("=" * 100)
    
    start_all = time.perf_counter()
    async with httpx.AsyncClient(timeout=20.0) as client:
        all_tasks = []
        global_task_counter = 0
        
        for i in range(REQUESTS_PER_EMPLOYEE):
            for site in TEST_MATRIX:
                site_id = site["site_id"]
                label = site["label"]
                
                for emp_data in site["employees"]:
                    global_task_counter += 1
                    # Spawn task for this specific Emp/Site combo
                    task = asyncio.create_task(
                        test_log_entry(client, site_id, emp_data, i+1, label)
                    )
                    all_tasks.append(task)
                    
                    # Stagger requests to avoid backend flagging
                    if REQUEST_INTERVAL > 0:
                        await asyncio.sleep(REQUEST_INTERVAL)
        
        results = await asyncio.gather(*all_tasks)
    
    end_all = time.perf_counter()
    duration = end_all - start_all
    
    # --- REPORT GENERATION ---
    successes = [r for r in results if r["success"]]
    latencies = sorted([r["latency"] for r in results if r["success"]])
    
    avg_latency = sum(latencies)/len(latencies) if latencies else 0
    throughput = len(results) / duration if duration > 0 else 0

    # Group by site for breakdown
    site_stats = {}
    for r in results:
        site = r["site"]
        if site not in site_stats:
            site_stats[site] = {"total": 0, "passed": 0, "latencies": []}
        site_stats[site]["total"] += 1
        if r["success"]:
            site_stats[site]["passed"] += 1
            site_stats[site]["latencies"].append(r["latency"])

    report_content = f"""# NFC Performance Test Report
Generated on: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}

## 📊 Overall Summary
| Metric | Value |
| :--- | :--- |
| **Total Requests** | {len(results)} |
| **Passed Requests** | {len(successes)} |
| **Success Rate** | {(len(successes)/len(results))*100:.1f}% |
| **Total Duration** | {duration:.2f}s |
| **Throughput** | {throughput:.2f} req/sec |
| **Avg Latency** | {avg_latency:.2f}ms |

## 🏢 Site Breakdown
| Site Label | Total | Passed | Success Rate | Avg Latency |
| :--- | :--- | :--- | :--- | :--- |
"""
    for site, stats in site_stats.items():
        s_rate = (stats["passed"]/stats["total"])*100
        s_avg = sum(stats["latencies"])/len(stats["latencies"]) if stats["latencies"] else 0
        report_content += f"| {site} | {stats['total']} | {stats['passed']} | {s_rate:.1f}% | {s_avg:.2f}ms |\n"

    failures = [r for r in results if not r["success"]]
    if failures:
        report_content += "\n## ❌ Failure Details\n| Site | Employee | Status | Error |\n| :--- | :--- | :--- | :--- |\n"
        for f in failures[:20]: # Limit to first 20 errors
            report_content += f"| {f['site']} | {f['emp']} | {f['status']} | {f.get('error', 'N/A')} |\n"

    report_filename = "nfc_performance_report.md"
    with open(report_filename, "w", encoding="utf-8") as f:
        f.write(report_content)

    # --- HTML DASHBOARD GENERATION ---
    site_labels = list(site_stats.keys())
    site_success_rates = [(stats["passed"]/stats["total"])*100 for stats in site_stats.values()]
    site_latencies = [sum(stats["latencies"])/len(stats["latencies"]) if stats["latencies"] else 0 for stats in site_stats.values()]
    dashboard_filename = "nfc_dashboard.html"
    colors = ['#38bdf8', '#22c55e', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899']
    site_colors = colors[:len(site_labels)]
    
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NFC Performance Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {{
            --bg: #0f172a;
            --card: #1e293b;
            --text: #f8fafc;
            --primary: #38bdf8;
            --success: #22c55e;
            --danger: #ef4444;
        }}
        body {{ font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }}
        .header {{ display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }}
        .grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }}
        .card {{ background: var(--card); padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }}
        .card h3 {{ margin: 0; font-size: 14px; opacity: 0.7; }}
        .card .value {{ font-size: 28px; font-weight: bold; margin-top: 10px; color: var(--primary); }}
        .chart-container {{ background: var(--card); padding: 20px; border-radius: 12px; margin-bottom: 30px; height: 350px; }}
        table {{ width: 100%; border-collapse: collapse; background: var(--card); border-radius: 12px; overflow: hidden; }}
        th, td {{ padding: 15px; text-align: left; border-bottom: 1px solid #334155; }}
        th {{ background: #334155; color: var(--primary); }}
        .status-pass {{ color: var(--success); font-weight: bold; }}
        .status-fail {{ color: var(--danger); font-weight: bold; }}
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 NFC Performance Dashboard</h1>
        <div>Generated: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}</div>
    </div>

    <div class="grid">
        <div class="card"><h3>Total Requests</h3><div class="value">{len(results)}</div></div>
        <div class="card"><h3>Success Rate</h3><div class="value" style="color: var(--success)">{(len(successes)/len(results))*100:.1f}%</div></div>
        <div class="card"><h3>Avg Latency</h3><div class="value">{avg_latency:.2f}ms</div></div>
        <div class="card"><h3>Throughput</h3><div class="value">{throughput:.2f} r/s</div></div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
        <div class="chart-container"><canvas id="latencyChart"></canvas></div>
        <div class="chart-container"><canvas id="successChart"></canvas></div>
    </div>

    <div class="card">
        <h3>Site Detail Breakdown</h3>
        <table style="margin-top: 15px;">
            <thead>
                <tr>
                    <th>Site Label</th>
                    <th>Total</th>
                    <th>Passed</th>
                    <th>Success Rate</th>
                    <th>Avg Latency</th>
                </tr>
            </thead>
            <tbody>
"""
    for site, stats in site_stats.items():
        s_rate = (stats["passed"]/stats["total"])*100
        s_avg = sum(stats["latencies"])/len(stats["latencies"]) if stats["latencies"] else 0
        html_content += f"""
                <tr>
                    <td>{site}</td>
                    <td>{stats['total']}</td>
                    <td>{stats['passed']}</td>
                    <td class="{'status-pass' if s_rate > 90 else 'status-fail'}">{s_rate:.1f}%</td>
                    <td>{s_avg:.2f}ms</td>
                </tr>"""

    html_content += f"""
            </tbody>
        </table>
    </div>

    <script>
        const ctxL = document.getElementById('latencyChart').getContext('2d');
        new Chart(ctxL, {{
            type: 'bar',
            data: {{
                labels: {site_labels},
                datasets: [{{
                    label: 'Avg Latency (ms)',
                    data: {site_latencies},
                    backgroundColor: {site_colors},
                    borderRadius: 6
                }}]
            }},
            options: {{ responsive: true, maintainAspectRatio: false, plugins: {{ legend: {{ display: false }}, title: {{ display: true, text: 'Site Latency (ms)', color: '#fff' }} }}, scales: {{ y: {{ grid: {{ color: '#334155' }} }} }} }}
        }});

        const ctxS = document.getElementById('successChart').getContext('2d');
        new Chart(ctxS, {{
            type: 'doughnut',
            data: {{
                labels: {site_labels},
                datasets: [{{
                    data: {site_success_rates},
                    backgroundColor: {site_colors}
                }}]
            }},
            options: {{ responsive: true, maintainAspectRatio: false, plugins: {{ title: {{ display: true, text: 'Success Rates (%)', color: '#fff' }} }} }}
        }});
    </script>
</body>
</html>"""

    with open(dashboard_filename, "w", encoding="utf-8") as f:
        f.write(html_content)

    print("-" * 100)
    print(f"REPORT GENERATED: {report_filename}")
    print(f"DASHBOARD GENERATED: {dashboard_filename}")
    print(f"Success Rate:      {(len(successes)/len(results))*100:.1f}%")
    print(f"Avg Latency:       {avg_latency:.2f}ms")
    print("=" * 100)

if __name__ == "__main__":
    asyncio.run(main())
