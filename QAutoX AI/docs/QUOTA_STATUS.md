# Understanding Gemini API Quota & Models

## 🕒 When Does Quota Reset?
Your daily quota resets at **Midnight Pacific Time (PT)**.
In India (IST), this corresponds to:
👉 **1:30 PM IST (Every Day)**

## 📊 Current Status (As of 5:10 PM IST)

We ran a comprehensive test of all models on your account.

### ❌ Exhausted Models (Do Not Use)
These models have hit their daily limit or are unavailable:
- `gemini-2.0-flash`
- `gemini-2.0-flash-exp`
- `gemini-2.5-pro`

### ✅ Working Models (Safe to Use)
These models have available quota **RIGHT NOW**:
- **`gemini-flash-latest`** (We switched to this one!) 🏆
- `gemini-2.5-flash`
- `gemini-1.5-flash`

## 🛠️ What We Fixed
1.  **Identified the Issue:** The app was trying to use `gemini-2.0-flash`, which was exhausted.
2.  **The Solution:** We updated `app.py` to use `gemini-flash-latest`.
3.  **The Result:** The app is now connected to a working model with fresh quota.

## 🚀 What You Can Do Now
You **do not** need to wait for the reset tomorrow.
You can use the application **immediately**.

1.  **Refresh** your browser.
2.  **Upload** your files or screenshots.
3.  **Generate** test cases and scripts.

## 💡 Tips to Save Quota
- **Don't click "Generate" multiple times** for the same file.
- **Save your results** (Export to Excel) so you don't need to regenerate them.
- **Use "Generate Code" only when needed.**

---
**Status:** ✅ SYSTEM RESTORED & WORKING
