from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

# Configuration
base_path = r'C:\Users\veeramani\.gemini\antigravity\brain\dea86cf9-8c9e-457b-bfdd-685d5d48859f'
output_path = os.path.join(base_path, 'QAutoX_Ultimate_Professional_Carousel.pdf')

# Try for cleaner modern fonts
fonts_to_try = [
    r"C:\Windows\Fonts\segoeuib.ttf", # Segoe UI Bold
    r"C:\Windows\Fonts\dubaib.ttf",   # Dubai Bold
    r"C:\Windows\Fonts\arialbd.ttf"  # Fallback
]
reg_fonts_to_try = [
    r"C:\Windows\Fonts\segoeui.ttf",
    r"C:\Windows\Fonts\dubai.ttf",
    r"C:\Windows\Fonts\arial.ttf"
]

def get_font(paths, size):
    for p in paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

# Premium Content
slides_data = [
    {
        "image": 'ai_automation_hero_1778045993131.png',
        "title": "THE SELF-EXPLAINING HUB",
        "subtitle": "Next-Gen AI Test Automation",
        "bullets": ["Autonomous Triage", "Stable Linear Engine", "Executive Dashboards"]
    },
    {
        "image": 'media__1778045652206.png',
        "title": "1. ORCHESTRATION",
        "subtitle": "The n8n Master Engine",
        "bullets": ["Zero Timeouts Architecture", "Bulk Test Discovery", "Self-Healing Binary Logic"]
    },
    {
        "image": 'media__1778045680061.png',
        "title": "2. CONNECTIVITY",
        "subtitle": "Google Chat Integration",
        "bullets": ["Real-time Status Updates", "Workflow Workspace Sync", "Visual Success Indicators"]
    },
    {
        "image": 'media__1778045720010.png',
        "title": "3. AI INTELLIGENCE",
        "subtitle": "Gemini 1.5 Flash Analysis",
        "bullets": ["Automated Root Cause Analysis", "Screenshot Log Triangulation", "Instant Triage Reports"]
    },
    {
        "image": 'media__1778045735927.png',
        "title": "4. VISIBILITY",
        "subtitle": "ERP Meta-Dashboards",
        "bullets": ["Unified Health Metrics", "Rich HTML Email Reports", "Stakeholder Ready Data"]
    }
]

def create_gradient_background(W, H):
    base = Image.new('RGB', (W, H), color='#0f172a')
    draw = ImageDraw.Draw(base)
    # Simple top-down dark gradient mask simulation
    for y in range(H):
        color_val = int(15 + (y/H)*20) # Slightly lighten towards bottom
        draw.line([(0, y), (W, y)], fill=(color_val, color_val + 10, color_val + 20))
    return base

def draw_browser_frame(canvas, x, y, w, h):
    draw = ImageDraw.Draw(canvas)
    # Frame background
    draw.rectangle([x, y-30, x+w, y+h], fill="#1e293b", outline="#334155", width=2)
    # Header buttons
    draw.ellipse([x+10, y-22, x+22, y-10], fill="#ff5f56") # Red
    draw.ellipse([x+28, y-22, x+40, y-10], fill="#ffbd2e") # Yellow
    draw.ellipse([x+46, y-22, x+58, y-10], fill="#27c93f") # Green

def create_slide(data, index):
    W, H = 1080, 1080
    slide = create_gradient_background(W, H)
    draw = ImageDraw.Draw(slide)
    
    # Fonts
    f_title = get_font(fonts_to_try, 52)
    f_sub = get_font(reg_fonts_to_try, 32)
    f_bullet = get_font(reg_fonts_to_try, 28)

    # Margins and Grid
    margin = 80
    
    # Header Text (Left Aligned for modern look)
    draw.text((margin, 100), data['title'], fill="#f8fafc", font=f_title)
    draw.rectangle([margin, 175, margin+100, 180], fill="#3b82f6") # Blue accent line
    draw.text((margin, 200), data['subtitle'], fill="#94a3b8", font=f_sub)
    
    # Image Area
    img_path = os.path.join(base_path, data['image'])
    if os.path.exists(img_path):
        screenshot = Image.open(img_path)
        # Size optimization
        max_w, max_h = 920, 500
        screenshot.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
        
        sw, sh = screenshot.size
        # Center horizontally, place in middle vertically
        ix, iy = (W - sw) // 2, 320
        
        # Frame
        draw_browser_frame(slide, ix, iy, sw, sh)
        slide.paste(screenshot, (ix, iy))

    # Bullets (Horizontal Flex Layout at bottom)
    bx = margin
    by = 880
    draw.text((margin, 840), "KEY HIGHLIGHTS", fill="#3b82f6", font=get_font(fonts_to_try, 20))
    
    column_w = (W - 2*margin) // 3
    for i, bullet in enumerate(data['bullets']):
        # Split into columns or wrap
        draw.text((margin + (i*column_w), by), f"• {bullet}", fill="#cbd5e1", font=f_bullet)

    # Footer Branding
    draw.line([(margin, H-80), (W-margin, H-80)], fill="#334155", width=1)
    draw.text((margin, H-60), "QAutoX | Enterprise AI Infrastructure", fill="#64748b", font=get_font(reg_fonts_to_try, 22))
    draw.text((W-margin, H-60), f"PAGE {index+1} / 5", fill="#64748b", font=get_font(fonts_to_try, 22), anchor="rm")
    
    return slide

# Execution
final_slides = []
for i, d in enumerate(slides_data):
    final_slides.append(create_slide(d, i))

if final_slides:
    final_slides[0].save(output_path, "PDF", save_all=True, append_images=final_slides[1:])
    print(f"Successfully created Final Professional Carousel PDF at {output_path}")
else:
    print("Error during slide generation.")
