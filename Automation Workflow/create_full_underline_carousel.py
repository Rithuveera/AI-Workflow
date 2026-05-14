from PIL import Image, ImageDraw, ImageFont
import os

# Configuration
base_path = r'C:\Users\veeramani\.gemini\antigravity\brain\dea86cf9-8c9e-457b-bfdd-685d5d48859f'
output_path = os.path.join(base_path, 'QAutoX_Full_Underline_Carousel.pdf')

# Fonts
font_bold = r"C:\Windows\Fonts\segoeuib.ttf" if os.path.exists(r"C:\Windows\Fonts\segoeuib.ttf") else r"C:\Windows\Fonts\arialbd.ttf"
font_reg = r"C:\Windows\Fonts\segoeui.ttf" if os.path.exists(r"C:\Windows\Fonts\segoeui.ttf") else r"C:\Windows\Fonts\arial.ttf"

def get_f(fpath, size):
    return ImageFont.truetype(fpath, size) if os.path.exists(fpath) else ImageFont.load_default()

# Data
slides_data = [
    {
        "image": 'ai_automation_hero_1778045993131.png',
        "title": "THE SELF-EXPLAINING HUB",
        "subtitle": "Autonomous AI Test Automation Pipeline",
        "bullets": ["Zero manual failure triage required.", "Stable linear orchestration for bulk runs.", "Executive-level visibility into product health."]
    },
    {
        "image": 'media__1778045652206.png',
        "title": "1. SMART ORCHESTRATION",
        "subtitle": "The n8n Master Engine",
        "bullets": ["Linear architecture prevents n8n timeouts.", "Auto-discovery of product test scenarios.", "Self-healing binary data management."]
    },
    {
        "image": 'media__1778045680061.png',
        "title": "2. TEAM CONNECTIVITY",
        "subtitle": "Google Chat Workspace Sync",
        "bullets": ["Instant status alerts for every test case.", "Deep workspace integration via Webhooks.", "Consistent team-wide visibility on regressions."]
    },
    {
        "image": 'media__1778045720010.png',
        "title": "3. AI INVESTIGATION",
        "subtitle": "Gemini 1.5 Flash Reasoning",
        "bullets": ["AI analyzes logs and screenshots instantly.", "Automatically determines specific root cause.", "Smart triage reports sent directly to developers."]
    },
    {
        "image": 'media__1778045735927.png',
        "title": "4. EXECUTIVE METRICS",
        "subtitle": "ERP Product Health Dashboard",
        "bullets": ["Unified metrics across multiple modules.", "Beautiful HTML summary reports in Gmail.", "Data-driven insights for project stakeholders."]
    }
]

def create_slide(data, idx):
    W, H = 1080, 1080
    slide = Image.new('RGB', (W, H), color='#0f172a')
    draw = ImageDraw.Draw(slide)
    
    margin = 80
    f_title = get_f(font_bold, 48)
    f_sub = get_f(font_reg, 32)
    f_bullet = get_f(font_reg, 26)
    
    # Header
    draw.text((margin, 70), data['title'], fill="#f8fafc", font=f_title)
    
    # DYNAMIC UNDERLINE WIDTH
    try:
        # Get width of title text to match underline
        text_w = draw.textlength(data['title'], font=f_title)
    except:
        # Fallback for older Pillow
        text_w = f_title.getlength(data['title']) if hasattr(f_title, 'getlength') else 400
        
    draw.rectangle([margin, 140, margin + text_w, 145], fill="#3b82f6") # Match underline to text width
    
    draw.text((margin, 170), data['subtitle'], fill="#3b82f6", font=f_sub)
    
    # Image
    img_path = os.path.join(base_path, data['image'])
    if os.path.exists(img_path):
        screen = Image.open(img_path)
        max_w, max_h = 920, 470
        screen.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
        sw, sh = screen.size
        sx, sy = (W - sw) // 2, 280
        draw.rectangle([sx-2, sy-32, sx+sw+2, sy+sh+2], fill="#1e293b", outline="#334155", width=2)
        draw.ellipse([sx+10, sy-22, sx+20, sy-12], fill="#ff5f56")
        draw.ellipse([sx+25, sy-22, sx+35, sy-12], fill="#ffbd2e")
        draw.ellipse([sx+40, sy-22, sx+50, sy-12], fill="#27c93f")
        slide.paste(screen, (sx, sy))

    # Bullets
    draw.text((margin, 810), "KEY CAPABILITIES:", fill="#94a3b8", font=get_f(font_bold, 20))
    by = 850
    for bullet in data['bullets']:
        draw.text((margin + 20, by), f"• {bullet}", fill="#cbd5e1", font=f_bullet)
        by += 45

    # Footer line (Full width footer line)
    draw.line([(margin, H-90), (W-margin, H-90)], fill="#334155", width=1)
    draw.text((margin, H-60), "QAutoX | Enterprise AI Solution", fill="#64748b", font=get_f(font_reg, 22))
    draw.text((W-margin, H-60), f"{idx+1} / 5", fill="#64748b", font=get_f(font_bold, 22), anchor="rm")
    
    return slide

# Build
slides = [create_slide(d, i) for i, d in enumerate(slides_data)]
slides[0].save(output_path, "PDF", save_all=True, append_images=slides[1:])
print(f"Created full underline PDF at {output_path}")
