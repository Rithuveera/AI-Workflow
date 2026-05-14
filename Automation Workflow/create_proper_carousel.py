from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

# Configuration
base_path = r'C:\Users\veeramani\.gemini\antigravity\brain\dea86cf9-8c9e-457b-bfdd-685d5d48859f'
output_path = os.path.join(base_path, 'QAutoX_Premium_AI_Carousel.pdf')
font_bold = r"C:\Windows\Fonts\arialbd.ttf"
font_reg = r"C:\Windows\Fonts\arial.ttf"

# Rich Content Data
slides_data = [
    {
        "image": 'ai_automation_hero_1778045993131.png',
        "title": "The Self-Explaining Automation Hub",
        "subtitle": "Next-Gen Playwright + n8n + Gemini AI Workflow",
        "bullets": [
            "100% Autonomous Failure Triage",
            "Linear Stable Orchestration",
            "Executive-Level Reporting"
        ]
    },
    {
        "image": 'media__1778045652206.png',
        "title": "1. Intelligent Orchestration",
        "subtitle": "The n8n Master Engine",
        "bullets": [
            "Linear architecture eliminates execution timeouts.",
            "Automated discovery of product test scripts.",
            "Self-healing logic for binary screenshot data."
        ]
    },
    {
        "image": 'media__1778045680061.png',
        "title": "2. Real-Time Feedback Loop",
        "subtitle": "Google Chat Workspace Integration",
        "bullets": [
            "Instant notifications for per-test pass/fail status.",
            "Visual cues (✅/❌) for rapid status scanning.",
            "Keeps the entire engineering squad in sync."
        ]
    },
    {
        "image": 'media__1778045720010.png',
        "title": "3. AI Root Cause Analysis (RCA)",
        "subtitle": "Powered by Gemini 1.5 Flash",
        "bullets": [
            "AI analyzes logs and screenshots in real-time.",
            "Pinpoints the 'Why' behind every UI regression.",
            "Automated triage reports delivered via Gmail."
        ]
    },
    {
        "image": 'media__1778045735927.png',
        "title": "4. Executive Meta-Dashboard",
        "subtitle": "High-Fidelity Product Health Metrics",
        "bullets": [
            "Unified health view across all ERP modules.",
            "Beautifully formatted HTML reports in Gmail.",
            "Actionable metrics for stakeholders and management."
        ]
    }
]

def create_slide(data, index):
    W, H = 1080, 1080
    # Background: Dark Professional Slate
    canvas = Image.new('RGB', (W, H), color='#0f172a')
    draw = ImageDraw.Draw(canvas)
    
    # Load fonts
    try:
        f_title = ImageFont.truetype(font_bold, 54)
        f_sub = ImageFont.truetype(font_reg, 34)
        f_bullet = ImageFont.truetype(font_reg, 28)
    except:
        f_title = f_sub = f_bullet = ImageFont.load_default()

    # Brand Header Strip
    draw.rectangle([0, 0, W, 10], fill="#3b82f6") # Blue accent line
    
    # Draw Title & Subtitle
    draw.text((60, 80), data['title'], fill="#f8fafc", font=f_title)
    draw.text((60, 150), data['subtitle'], fill="#3b82f6", font=f_sub)
    
    # Place Screenshot with a Frame/Shadow effect
    img_path = os.path.join(base_path, data['image'])
    if os.path.exists(img_path):
        screenshot = Image.open(img_path)
        # Size to fit a specific area
        max_w, max_h = 800, 500
        screenshot.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
        
        # Draw a subtle border for the image
        sw, sh = screenshot.size
        border_rect = [140-2, 250-2, 140+sw+2, 250+sh+2]
        draw.rectangle(border_rect, outline="#475569", width=2)
        
        canvas.paste(screenshot, (140, 250))

    # Draw Bullets
    y_start = 800
    for bullet in data['bullets']:
        draw.text((100, y_start), f"• {bullet}", fill="#cbd5e1", font=f_bullet)
        y_start += 50

    # Footer
    draw.text((W-60, H-60), f"Page {index+1}", fill="#475569", font=f_bullet, anchor="rm")
    draw.text((60, H-60), "QAutoX | Enterprise Automation Hub", fill="#64748b", font=f_bullet)
    
    return canvas

# Processing
final_slides = []
for i, d in enumerate(slides_data):
    final_slides.append(create_slide(d, i))

if final_slides:
    final_slides[0].save(output_path, "PDF", save_all=True, append_images=final_slides[1:])
    print(f"Successfully created Proper Carousel PDF at {output_path}")
else:
    print("Error during slide generation.")
