# 🚀 QUICK GUIDE: Create a New Gemini API Key (2 Minutes)

## Why Create a New API Key?
- ✅ Get fresh quota immediately (1,500 requests/day)
- ✅ Completely FREE
- ✅ Takes only 2 minutes
- ✅ No credit card needed

---

## Step-by-Step Instructions

### Step 1: Open Google AI Studio
Click this link or copy-paste in your browser:
```
https://aistudio.google.com/app/apikey
```

### Step 2: Sign In
- Use your Google account
- Same account you used for the current API key

### Step 3: Create API Key
1. Look for the **"Create API Key"** button (usually blue)
2. Click it

### Step 4: Select Project
You'll see options:
- **Option A:** "Create API key in new project" ← Choose this for fresh quota
- **Option B:** "Create API key in existing project" ← Also works

**Recommendation:** Choose "Create API key in new project"

### Step 5: Copy Your New API Key
- A new API key will be generated
- It looks like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
- Click the **Copy** button
- **IMPORTANT:** Save it somewhere safe!

### Step 6: Update Your .env File

1. Open your `.env` file in the project folder
2. Find this line:
   ```env
   GEMINI_API_KEY=[REDACTED_GEMINI_KEY]
   ```

3. Replace with your new key:
   ```env
   GEMINI_API_KEY=YOUR_NEW_KEY_HERE
   ```

4. Save the file

### Step 7: Restart Your Application

1. Stop the current server:
   - Go to the terminal running `python app.py`
   - Press `Ctrl + C`

2. Start it again:
   ```bash
   python app.py
   ```

3. Done! You now have fresh quota! 🎉

---

## Visual Guide

```
Browser
  ↓
https://aistudio.google.com/app/apikey
  ↓
Click "Create API Key"
  ↓
Choose "Create in new project"
  ↓
Copy the new key (AIzaSy...)
  ↓
Open .env file
  ↓
Replace old key with new key
  ↓
Save file
  ↓
Restart: Ctrl+C, then python app.py
  ↓
✅ Fresh quota available!
```

---

## After Creating the New Key

You'll have:
- ✅ 1,500 new requests for today
- ✅ Resets daily at 1:30 PM IST
- ✅ Same features as before
- ✅ No cost

---

## Pro Tips

### Keep Both Keys
Don't delete your old key! Keep it in .env as backup:

```env
# Backup key (old)
# GEMINI_API_KEY_OLD=[REDACTED_GEMINI_KEY]

# Active key (new)
GEMINI_API_KEY=YOUR_NEW_KEY_HERE
```

### Create Multiple Keys
You can create 2-3 keys for different purposes:
```env
GEMINI_API_KEY_DEV=key_for_development
GEMINI_API_KEY_PROD=key_for_production
GEMINI_API_KEY_BACKUP=key_for_emergencies

# Use this one:
GEMINI_API_KEY=${GEMINI_API_KEY_DEV}
```

---

## Troubleshooting

### "I don't see Create API Key button"
- Make sure you're signed in to Google
- Try refreshing the page
- Try a different browser

### "API key not working"
- Make sure you copied the entire key
- Check for extra spaces in .env file
- Restart the application
- Wait 1-2 minutes for the key to activate

### "Still getting quota error"
- Make sure you created the key in a NEW project
- Check that you updated the .env file correctly
- Verify the server restarted with the new key

---

## Need Help?

If you get stuck, let me know at which step and I'll help you!

---

**Estimated Time:** 2-5 minutes
**Cost:** FREE
**Difficulty:** Easy
**Result:** Fresh 1,500 requests/day quota
