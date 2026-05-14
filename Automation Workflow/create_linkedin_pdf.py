from PIL import Image
import os

# Define paths
base_path = r'C:\Users\veeramani\.gemini\antigravity\brain\dea86cf9-8c9e-457b-bfdd-685d5d48859f'
output_path = os.path.join(base_path, 'Playwright_AI_Automation_Portfolio.pdf')

# Slide images in order
images = [
    os.path.join(base_path, 'ai_automation_hero_1778045993131.png'),
    os.path.join(base_path, 'media__1778045652206.png'), # n8n Workflow
    os.path.join(base_path, 'media__1778045680061.png'), # Google Chat
    os.path.join(base_path, 'media__1778045720010.png'), # Gmail Failure RCA
    os.path.join(base_path, 'media__1778045735927.png')  # Meta Dashboard
]

# Convert and save
image_list = []
for img_path in images:
    if os.path.exists(img_path):
        img = Image.open(img_path)
        if img.mode == 'RGBA':
            img = img.convert('RGB')
        image_list.append(img)

if image_list:
    image_list[0].save(output_path, "PDF", resolution=100.0, save_all=True, append_images=image_list[1:])
    print(f"Successfully created PDF at {output_path}")
else:
    print("No images found to create PDF.")
