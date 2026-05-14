import base64
import os

def get_base64_image(image_path):
    if not os.path.exists(image_path):
        return ""
    with open(image_path, "rb") as image_file:
        return "data:image/jpeg;base64," + base64.b64encode(image_file.read()).decode('utf-8')

# Paths
base_dir = r"c:\Users\veeramani\.gemini\antigravity\scratch\Automation Workflow"
images_dir = os.path.join(base_dir, "sharing", "Images")
output_html = os.path.join(base_dir, "sharing", "PREMIUM_WORKFLOW_CAROUSEL.html")

# Get Images (Verified paths)
img_ui = get_base64_image(os.path.join(images_dir, "playwright_n8n_slack_final.png"))
img_workflow = get_base64_image(os.path.join(images_dir, "workflow.png"))
img_error = get_base64_image(os.path.join(images_dir, "error-screenshot.png"))
img_alerts = get_base64_image(os.path.join(images_dir, "slack_result_mockup.png"))

html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QAutoX V4 Master Orchestration</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=JetBrains+Mono&display=swap" rel="stylesheet">
    <style>
        :root {{
            --bg-dark: #0f172a;
            --primary: #8b5cf6;
            --secondary: #0ea5e9;
            --text-main: #f8fafc;
            --text-dim: #94a3b8;
            --card-bg: #1e293b;
            --border: rgba(255, 255, 255, 0.1);
        }}

        * {{ margin: 0; padding: 0; box-sizing: border-box; background: transparent; }}
        body {{ font-family: 'Outfit', sans-serif; background: var(--bg-dark); color: var(--text-main); width: 1080px; }}

        .slide {{
            width: 1080px; height: 1080px;
            padding: 80px;
            background: radial-gradient(circle at 0% 0%, #1e1b4b 0%, #0f172a 100%);
            display: flex; flex-direction: column; justify-content: space-between;
            position: relative; overflow: hidden;
            page-break-after: always;
        }}

        .slide::before {{
            content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: url('https://www.transparenttextures.com/patterns/carbon-fibre.png');
            opacity: 0.05; pointer-events: none;
        }}

        .header {{ display: flex; justify-content: space-between; align-items: center; z-index: 10; }}
        .brand {{ font-weight: 800; font-size: 32px; letter-spacing: -1px; }}
        .badge {{ background: var(--primary); color: white; padding: 6px 16px; border-radius: 99px; font-size: 14px; font-weight: 700; }}

        .content {{ z-index: 10; flex-grow: 1; display: flex; flex-direction: column; justify-content: center; }}
        .step-label {{ font-family: 'JetBrains Mono'; color: var(--secondary); font-size: 18px; margin-bottom: 20px; }}
        h1 {{ font-size: 80px; font-weight: 800; line-height: 1; margin-bottom: 30px; letter-spacing: -2px; }}
        h1 span {{ color: var(--primary); }}
        .desc {{ font-size: 28px; color: var(--text-dim); line-height: 1.4; max-width: 800px; }}

        .visual {{ margin-top: 40px; border-radius: 24px; border: 1px solid var(--border); overflow: hidden; background: var(--card-bg); box-shadow: 0 40px 100px rgba(0,0,0,0.5); }}
        .visual img {{ width: 100%; height: auto; display: block; }}

        .footer {{ display: flex; justify-content: space-between; padding-top: 40px; border-top: 1px solid var(--border); z-index: 10; }}
        .footer-text {{ color: var(--text-dim); font-size: 18px; }}

        /* Specific Layouts */
        .feature-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 40px; }}
        .feature-card {{ background: var(--card-bg); padding: 30px; border-radius: 20px; border: 1px solid var(--border); }}
        .feature-card h3 {{ font-size: 28px; margin-bottom: 10px; color: var(--secondary); }}
        .feature-card p {{ color: var(--text-dim); font-size: 20px; }}
    </style>
</head>
<body>
    <!-- Slide 1: Welcome -->
    <section class="slide">
        <div class="header"><div class="brand">QAutoX <span>V4</span></div><div class="badge">LATEST MASTER</div></div>
        <div class="content">
            <span class="step-label">// INTELLIGENT ORCHESTRATION</span>
            <h1>The <span>Ultimate</span> Feedback Loop</h1>
            <p class="desc">Witness the power of QAutoX V4: Real-time status, deep error tracing, and consolidated summaries.</p>
            <div class="visual"><img src="{img_ui}"></div>
        </div>
        <div class="footer"><div class="footer-text">Scale & Precision</div><div class="footer-text">qautox.io</div></div>
    </section>

    <!-- Slide 2: Selection -->
    <section class="slide">
        <div class="header"><div class="brand">QAutoX</div><div class="badge">STEP 01</div></div>
        <div class="content">
            <span class="step-label">// PRODUCT SEGMENTATION</span>
            <h1>Dynamic <span>Suite</span> Selection</h1>
            <p class="desc">Effortlessly toggle between ERP, Camp Management, or custom test suites with automated detection.</p>
            <div class="feature-grid">
                <div class="feature-card"><h3>ERP Core</h3><p>21+ High-impact scripts mapping complex workflows.</p></div>
                <div class="feature-card"><h3>Camp Suite</h3><p>Accomodation & Hospitality specialized testing.</p></div>
            </div>
        </div>
        <div class="footer"><div class="footer-text">Targeted Execution</div><div class="footer-text">Master Config</div></div>
    </section>

    <!-- Slide 3: Immediate Alerts -->
    <section class="slide">
        <div class="header"><div class="brand">QAutoX</div><div class="badge">STEP 02</div></div>
        <div class="content">
            <span class="step-label">// CHAT OPS INTEGRATION</span>
            <h1>Real-Time <span>Chat</span> Alerts</h1>
            <p class="desc">After every script run, an instant status notification hits Google Chat. No more waiting for full suite results.</p>
            <div class="visual"><img src="{img_alerts}"></div>
        </div>
        <div class="footer"><div class="footer-text">Instant Feedback</div><div class="footer-text">Google Chat</div></div>
    </section>

    <!-- Slide 4: Deep Gmail Traces -->
    <section class="slide">
        <div class="header"><div class="brand">QAutoX</div><div class="badge">STEP 03</div></div>
        <div class="content">
            <span class="step-label">// FAILURE ANALYSIS</span>
            <h1>Deep <span>Gmail</span> Trace</h1>
            <p class="desc">For failed cases, QAutoX sends a forensic report to Gmail including stack traces and visual evidence.</p>
            <div class="visual"><img src="{img_error}"></div>
        </div>
        <div class="footer"><div class="footer-text">Error Precision</div><div class="footer-text">Zero Guesswork</div></div>
    </section>

    <!-- Slide 5: Final Summary -->
    <section class="slide">
        <div class="header"><div class="brand">QAutoX</div><div class="badge">STEP 04</div></div>
        <div class="content">
            <span class="step-label">// EXECUTIVE OVERVIEW</span>
            <h1>Consolidated <span>Summary</span></h1>
            <p class="desc">Upon completion, a unified dashboard is pushed to both Chat & Gmail. A single source of truth for the entire run.</p>
            <div class="visual" style="height: 400px; display: flex; align-items: center; justify-content: center; background: #020617;">
                <h2 style="font-size: 40px; text-align: center; color: var(--secondary);">📊 ERP Suite Final Summary<br><span style="color:white; font-size: 24px;">Total: 21 | Passed: 19 | Failed: 2</span></h2>
            </div>
        </div>
        <div class="footer"><div class="footer-text">End-to-End Visibility</div><div class="footer-text">Reporting</div></div>
    </section>

    <!-- Slide 6: The Engine -->
    <section class="slide">
        <div class="header"><div class="brand">QAutoX</div><div class="badge">ARCHITECTURE</div></div>
        <div class="content">
            <span class="step-label">// LOW-CODE POWER</span>
            <h1>The <span>Master</span> Workflow</h1>
            <p class="desc">An elegant n8n orchestration managing dependencies, loops, and multi-channel notifications flawlessly.</p>
            <div class="visual"><img src="{img_workflow}"></div>
        </div>
        <div class="footer"><div class="footer-text">n8n + Playwright</div><div class="footer-text">Modern QA Stack</div></div>
    </section>
    
    <!-- Slide 7: Why QAutoX? -->
    <section class="slide">
        <div class="header"><div class="brand">QAutoX</div></div>
        <div class="content">
            <h1>Why <span>Elite</span> QA Teams Choose V4?</h1>
            <div class="feature-grid">
                <div class="feature-card"><h3>Faster Fixes</h3><p>Instant alerts mean zero time lost.</p></div>
                <div class="feature-card"><h3>No Noise</h3><p>Gmail alerts only trigger on failures.</p></div>
                <div class="feature-card"><h3>Transparency</h3><p>Stakeholders see results in Chat instantly.</p></div>
                <div class="feature-card"><h3>Infinite Scale</h3><p>Add 1000 tests with zero logic changes.</p></div>
            </div>
        </div>
        <div class="footer"><div class="footer-text">Built for Tomorrow</div></div>
    </section>

    <!-- Slide 8: CTA -->
    <section class="slide" style="background: var(--primary);">
        <div class="header"><div class="brand" style="color: white;">QAutoX</div></div>
        <div class="content" style="align-items: center; text-align: center;">
            <h1 style="color: white; font-size: 100px;">Get The <span>Blueprint</span></h1>
            <p class="desc" style="color: white; opacity: 0.9;">Ready to transform your QA from a bottleneck to a superpower?</p>
            <div style="margin-top: 50px; background: white; color: var(--primary); padding: 25px 50px; border-radius: 99px; font-weight: 800; font-size: 32px;">DM "V4 MASTER"</div>
        </div>
        <div class="footer" style="border-top: 1px solid rgba(255,255,255,0.2);"><div class="footer-text" style="color:white;">Hit the 🔔 for more.</div></div>
    </section>
</body>
</html>'''

with open(output_html, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Successfully generated LATEST V4 MASTER HTML: {{output_html}}")
