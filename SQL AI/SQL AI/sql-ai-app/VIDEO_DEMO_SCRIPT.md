# SQL AI Architect - Video Demo Script

## Video Specifications
- **Duration**: 60-90 seconds (LinkedIn/Twitter) or 2-3 minutes (YouTube)
- **Resolution**: 1920x1080 (1080p)
- **Format**: MP4
- **Aspect Ratio**: 16:9 (landscape) or 9:16 (vertical for mobile)

---

## Recording Tools

### Option 1: OBS Studio (Free, Professional)
- Download: https://obsproject.com/
- Best for: High-quality recordings with custom overlays
- Settings: 1920x1080, 30fps, MP4 format

### Option 2: Screen Recording (Built-in)
**Windows**:
- Press `Windows + G` to open Game Bar
- Click "Capture" → "Record"

**Alternative Tools**:
- Loom (https://loom.com) - Easy, cloud-based
- Camtasia - Professional editing
- ShareX - Free, lightweight

---

## Video Structure

### Opening (5 seconds)
**Visual**: Title screen or logo
**Text Overlay**: "SQL AI Architect - AI-Powered Query Generation"
**Voiceover/Text**: "Turn natural language into SQL queries instantly"

---

### Scene 1: Problem Introduction (10 seconds)
**Visual**: Show a complex SQL query or confused developer meme
**Text Overlay**: "Writing SQL queries can be time-consuming..."
**Voiceover**: "Struggling with complex SQL queries? Let AI help."

---

### Scene 2: Application Overview (5 seconds)
**Visual**: Full screen of the application (localhost:3000)
**Action**: 
- Show the clean UI
- Highlight the two-panel layout
**Text Overlay**: "Meet SQL AI Architect"

---

### Scene 3: Demo - Entering Schema (10 seconds)
**Visual**: Left panel (Schema Definition)
**Action**:
1. Click into the schema textarea
2. Paste this schema:
```sql
CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    created_at TIMESTAMP
);

CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2),
    order_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
```
**Text Overlay**: "Step 1: Add your database schema"

---

### Scene 4: Demo - Natural Language Query (15 seconds)
**Visual**: Right panel (Query input)
**Action**:
1. Click into the prompt textarea
2. Type: "Show me all users who placed orders over $100"
3. Click "Generate" button
4. Show loading animation
**Text Overlay**: "Step 2: Ask in plain English"

---

### Scene 5: Demo - Generated Result (15 seconds)
**Visual**: Result panel with SQL and explanation
**Action**:
1. Highlight the generated SQL:
```sql
SELECT DISTINCT u.user_id, u.username, u.email
FROM Users u
JOIN Orders o ON u.user_id = o.user_id
WHERE o.total_amount > 100;
```
2. Scroll to show the AI explanation
3. Click "Copy SQL" button
4. Show "Copied!" confirmation
**Text Overlay**: "Get optimized SQL + AI explanation"

---

### Scene 6: Demo - Auto-Generate Feature (20 seconds)
**Visual**: Full application
**Action**:
1. Click "Auto-Generate Examples" button
2. Show loading
3. Display list of 5-7 diverse queries:
   - SELECT query
   - JOIN query
   - UPDATE query
   - DELETE query
   - Aggregate query
4. Scroll through the list
5. Hover over a card to show the hover effect
**Text Overlay**: "Or auto-generate diverse query examples"

---

### Scene 7: Feature Highlights (10 seconds)
**Visual**: Quick cuts or split screen
**Show**:
- Copy button in action
- Smooth animations
- Responsive design
- Premium Titanium theme
**Text Overlay**: 
"✓ One-click copy
✓ Schema-aware
✓ Multiple query types
✓ Modern UI"

---

### Scene 8: Tech Stack (5 seconds)
**Visual**: Tech logos or text overlay
**Text**:
```
Built with:
• TypeScript + Next.js 15
• Google Gemini AI
• Tailwind CSS v4
• Framer Motion
```

---

### Closing (5 seconds)
**Visual**: Application logo or your name
**Text Overlay**: 
```
SQL AI Architect
[Your Name/GitHub/LinkedIn]
```
**Call-to-Action**: "Try it yourself!" or "Star on GitHub"

---

## Recording Checklist

### Before Recording
- [ ] Clear browser cache and cookies
- [ ] Close unnecessary tabs and applications
- [ ] Set browser zoom to 100%
- [ ] Disable browser extensions (or use incognito)
- [ ] Prepare sample schema and queries
- [ ] Test the application flow
- [ ] Set up recording software
- [ ] Check audio (if adding voiceover)

### During Recording
- [ ] Use smooth, deliberate mouse movements
- [ ] Pause 2-3 seconds between actions
- [ ] Type at a readable pace (or speed up in editing)
- [ ] Show loading states
- [ ] Highlight key features with mouse hover

### After Recording
- [ ] Trim unnecessary parts
- [ ] Add text overlays
- [ ] Add background music (royalty-free)
- [ ] Add voiceover (optional)
- [ ] Export in 1080p MP4

---

## Sample Queries for Demo

### Simple Queries
1. "Show me all users created in 2024"
2. "Count the total number of orders"
3. "Find users with Gmail addresses"

### Complex Queries
1. "Show me users who placed orders over $100"
2. "Calculate average order value by user"
3. "Find users who haven't placed any orders"
4. "Show top 5 customers by total spending"

### For Auto-Generate
- Just click the button with the default schema

---

## Video Editing Tips

### Free Editing Software
- **DaVinci Resolve** (Professional, free)
- **Shotcut** (Simple, open-source)
- **Clipchamp** (Browser-based, Microsoft)

### Editing Steps
1. **Trim**: Remove dead time, mistakes
2. **Speed Up**: Typing scenes (1.5-2x speed)
3. **Add Text**: Overlay key points
4. **Add Music**: Subtle background track
5. **Add Transitions**: Smooth cuts between scenes
6. **Color Grade**: Enhance contrast/brightness

### Recommended Music (Royalty-Free)
- YouTube Audio Library
- Epidemic Sound
- Artlist
- Uppbeat

---

## Export Settings

### For LinkedIn
- Format: MP4
- Resolution: 1920x1080 or 1080x1920 (vertical)
- Max Duration: 10 minutes
- Max Size: 5GB
- Recommended: 60-90 seconds

### For Twitter/X
- Format: MP4
- Resolution: 1920x1080
- Max Duration: 2:20 minutes
- Max Size: 512MB
- Recommended: 30-60 seconds

### For YouTube
- Format: MP4
- Resolution: 1920x1080 or 4K
- No duration limit
- Recommended: 2-5 minutes

---

## Advanced: Add Annotations

### Using OBS Studio
1. Add "Text (GDI+)" source for overlays
2. Add "Image" source for logos
3. Use "Scene Transitions" for smooth cuts

### Callout Effects
- Circle/highlight important buttons
- Arrow pointing to features
- Zoom in on specific areas

---

## Quick 30-Second Version

For social media shorts:

1. **0-5s**: Show app + title
2. **5-10s**: Paste schema (sped up)
3. **10-15s**: Type query
4. **15-20s**: Show generated SQL
5. **20-25s**: Click auto-generate
6. **25-30s**: Show results + CTA

---

## Voiceover Script (Optional)

```
[0-5s] "Introducing SQL AI Architect - your intelligent SQL assistant."

[5-15s] "Simply paste your database schema and ask questions in plain English."

[15-25s] "Get instant, optimized SQL queries with detailed explanations."

[25-35s] "Or auto-generate diverse query examples with one click."

[35-40s] "Built with TypeScript, Next.js, and Google's Gemini AI."

[40-45s] "Try it today and transform how you write SQL."
```

---

## Need Help Recording?

I can guide you through:
1. Setting up OBS Studio
2. Recording your screen
3. Basic video editing
4. Adding text overlays
5. Exporting for different platforms

Just let me know what you need!
