from PIL import Image, ImageDraw, ImageFont
import os

# Configuration
base_path = r'C:\Users\veeramani\.gemini\antigravity\brain\dea86cf9-8c9e-457b-bfdd-685d5d48859f'
output_path = os.path.join(base_path, 'Ultimate_AI_Automation_Carousel.pdf')
font_path = r"C:\Windows\Fonts\arialbd.ttf" # Bold font for headers
font_path_reg = r"C:\Windows\Fonts\arial.ttf" # Regular font for captions

# Slides content
slides_data = [
    {
        "image": 'ai_automation_hero_1778045993131.png',
        "title": "Autonomous AI Root Cause Analysis",
        "caption": "The Future of Self-Debugging Automation Pipelines"
    },
    {
        "image": 'media__1778045652206.png',
        "title": "1. The Orchestration Engine",
        "caption": "A stable linear n8n workflow designed to handle bulk Playwright test suites."
    },
    {
        "image": 'media__1778045680061.png',
        "title": "2. Omnichannel Communication",
        "caption": "Real-time Google Chat alerts keep the team updated on every test status."
    },
    {
        "image": 'media__1778045720010.png',
        "title": "3. AI-Driven Root Cause Analysis",
        "caption": "Gemini 1.5 Flash analyzes logs and screenshots to generate instant triage reports."
    },
    {
        "image": 'media__1778045735927.png',
        "title": "4. Executive Visibility",
        "caption": "High-fidelity HTML dashboards in Gmail summarizing overall product health."
    }
]

def create_slide(data):
    # Create 1080x1080 canvas (LinkedIn Square Format)
    canvas_size = (1080, 1080)
    canvas = Image.new('RGB', canvas_size, color='#0F172A') # Deep dark slate background
    draw = ImageDraw.Draw(canvas)
    
    # Load fonts
    try:
        title_font = ImageFont.truetype(font_path, 60)
        content_font = ImageFont.truetype(font_path_reg, 32)
    except:
        title_font = ImageFont.load_default()
        content_font = ImageFont.load_default()

    # Draw Title
    title_text = data['title']
    draw.text((540, 80), title_text, fill="white", font=title_font, anchor="mm")
    
    # Place Image
    img_path = os.path.join(base_path, data['image'])
    if os.path.exists(img_path):
        slide_img = Image.open(img_path)
        # Calculate resize to fit middle area (offset from top and bottom)
        max_w, max_h = 900, 700
        slide_img.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
        
        # Center horizontally and vertically in the available area
        img_w, img_h = slide_img.size
        img_pos = ( (1080 - img_w)//2, (1080 - img_h)//2 )
        canvas.paste(slide_img, img_pos)

    # Draw Caption at bottom
    caption_text = data['caption']
    draw.text((540, 980), caption_text, fill="#94A3B8", font=content_font, anchor="mm")
    
    return canvas

# Generate slides
final_slides = []
for slide_data in slides_data:
    final_slides.append(create_slide(slide_data))

# Save as PDF
if final_slides:
    final_slides[0].save(output_path, "PDF", save_all=True, append_images=final_slides[1:])
    print(f"Successfully created enhanced PDF at {output_path}")
else:
    print("Failed to create slides.")
