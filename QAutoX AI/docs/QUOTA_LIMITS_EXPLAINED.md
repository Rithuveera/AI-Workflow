# Understanding Gemini API Quota Limits

## 🚨 Important Discovery

The Gemini API has **DIFFERENT quota limits for DIFFERENT features**!

---

## 📊 Actual Free Tier Limits (Discovered)

### 1. **Test Case Generation** (Upload Document Feature)
```
Limit: Unknown (likely 15-20 per day)
Endpoint: POST /upload
Model: gemini-2.5-flash
```

### 2. **Automation Script Generation** (🤖 Icon)
```
Limit: 20 requests per day  ← YOU HIT THIS!
Endpoint: POST /generate-automation
Model: gemini-2.5-flash
Quota Metric: generativelanguage.googleapis.com/generate_content_free_tier_requests
```

### 3. **Chat with AI**
```
Limit: Unknown (separate quota)
Endpoint: POST /chat
Model: gemini-2.5-flash
```

### 4. **Defect Report Generation**
```
Limit: Unknown (separate quota)
Endpoint: POST /generate-defect
Model: gemini-2.5-flash
```

---

## ⚠️ Your Current Error

```
Error: 429 You exceeded your current quota
Quota exceeded for metric: generate_content_free_tier_requests
Limit: 20
Model: gemini-2.5-flash
Retry in: 55 seconds
```

**What this means:**
- You've used **20 automation script generations** today
- You must wait **55 seconds** before trying again
- This is **ONLY for the automation feature** (🤖 icon)
- **Other features still work!** (test case generation, chat, etc.)

---

## ✅ What I Fixed

### 1. **Better Error Handling in Backend** (`app.py`)
```python
# Now extracts:
- Retry delay (55 seconds)
- Quota limit (20 requests)
- Provides user-friendly message
```

**Error message now shows:**
```
⚠️ API Quota Exceeded for Automation Feature

FREE TIER LIMIT: 20 automation requests per day
RETRY IN: 55 seconds (0 min 55 sec)

SOLUTIONS:
1. ⏰ Wait 55 seconds and try again
2. 🔑 Create a new API key
3. 💳 Upgrade to paid tier

NOTE: Automation feature has separate quota from test case generation.
You can still generate test cases while waiting for automation quota to reset.
```

### 2. **Better Error Display in Frontend** (`automation.js`)
```javascript
// Shows alert with formatted message
// Doesn't throw generic error
// Tells user other features still work
```

---

## 🎯 Solutions for You RIGHT NOW

### **Option 1: Wait 55 Seconds** ⏰
The error message says "retry in 55 seconds"

```bash
# Wait 1 minute, then click 🤖 again
```

**Best for:** Quick retry

---

### **Option 2: Create New API Key** 🔑 (RECOMMENDED)
Fresh key = fresh quota

1. Visit: https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
4. Update `.env`:
   ```
   GEMINI_API_KEY=your_new_key_here
   ```
5. Restart server (Ctrl+C, then `python app.py`)

**Best for:** Immediate solution

---

### **Option 3: Upgrade to Paid Tier** 💳
No more quota headaches

- **1,000 requests per minute**
- **Unlimited daily requests**
- Visit: https://ai.google.dev/pricing

**Best for:** Production use

---

## 📈 Understanding the Quota System

### Free Tier Structure:
```
┌─────────────────────────────────────────┐
│  Feature                  │  Daily Limit │
├─────────────────────────────────────────┤
│  Automation Generation    │  20 requests │  ← YOU'RE HERE
│  Test Case Generation     │  ~15-20 req  │
│  Chat with AI             │  Unknown     │
│  Defect Report Gen        │  Unknown     │
└─────────────────────────────────────────┘

PLUS: 15 requests per minute rate limit
```

### Paid Tier:
```
┌─────────────────────────────────────────┐
│  All Features             │  Unlimited   │
│  Rate Limit               │  1,000 RPM   │
└─────────────────────────────────────────┘
```

---

## 💡 Pro Tips

### 1. **Separate Quotas = Strategic Usage**
```
✅ Used all automation quota? → Still can generate test cases!
✅ Used all test case quota? → Still can generate automation!
✅ Each feature has its own bucket
```

### 2. **Multiple API Keys Strategy**
```
Key 1: For test case generation
Key 2: For automation scripts
Key 3: For chat/defect reports
```

### 3. **Monitor Your Usage**
- Track how many times you click 🤖
- Count test case generations
- Space out your requests

### 4. **Optimize Automation Usage**
```
❌ Don't: Generate automation for every test case
✅ Do: Generate only for critical test cases
✅ Do: Reuse generated scripts
✅ Do: Manual testing for simple cases
```

---

## 🔍 How to Check Your Quota

### Method 1: Error Messages
The API now tells you:
- Current limit
- How many you've used
- When you can retry

### Method 2: Google AI Studio
1. Visit: https://ai.dev/usage?tab=rate-limit
2. View your usage statistics
3. See quota consumption

---

## 📝 Quota Reset Schedule

### Rate Limits (Per Minute):
```
Resets: Every 60 seconds
Example: Hit limit at 10:25:00 → Reset at 10:26:00
```

### Daily Limits:
```
Resets: Every 24 hours (midnight UTC)
Example: Hit limit at 10:25 IST → Reset at 05:30 IST next day
```

### Retry Delays:
```
Specified in error: "retry in 55 seconds"
Wait that long, then try again
```

---

## 🛠️ Testing the Fix

### 1. **Refresh Browser**
```bash
Ctrl + F5  (or Cmd + Shift + R on Mac)
```

### 2. **Wait 1 Minute**
The error said 55 seconds, so wait 60 to be safe

### 3. **Click 🤖 Icon Again**
Try generating automation for a test case

### 4. **Check the Error Message**
Should now see:
```
⚠️ API Quota Exceeded for Automation Feature

FREE TIER LIMIT: 20 automation requests per day
RETRY IN: XX seconds

SOLUTIONS:
1. ⏰ Wait XX seconds and try again
2. 🔑 Create a new API key
3. 💳 Upgrade to paid tier
```

---

## 📊 Quota Comparison

### What You Thought:
```
❌ 1,500 requests per day (total)
❌ 15 requests per minute (total)
❌ All features share same quota
```

### Reality:
```
✅ 20 automation requests per day
✅ ~15-20 test case generations per day
✅ Each feature has separate quota
✅ Plus 15 RPM rate limit across all
```

---

## 🎯 Recommended Workflow

### For Free Tier:
```
Morning:
- Generate test cases (use up to 15)
- Wait 1 hour

Afternoon:
- Generate automation scripts (use up to 20)
- Space them out (1 every 5 minutes)

Evening:
- Use chat feature
- Generate defect reports
```

### For Paid Tier:
```
Anytime:
- Generate unlimited test cases
- Generate unlimited automation
- No waiting required
- 1,000 requests per minute
```

---

## 📞 Support Links

- **Quota Info:** https://ai.google.dev/gemini-api/docs/rate-limits
- **Usage Monitor:** https://ai.dev/usage?tab=rate-limit
- **API Keys:** https://aistudio.google.com/app/apikey
- **Pricing:** https://ai.google.dev/pricing

---

## ✅ Summary

**Problem:** Hit 20-request daily limit for automation feature

**Fixed:**
1. ✅ Better error messages with retry time
2. ✅ Extracts quota limit from error
3. ✅ Shows user-friendly alerts
4. ✅ Explains other features still work

**Your Action:**
1. Wait 1 minute (55 seconds + buffer)
2. OR create new API key
3. OR upgrade to paid tier

**Key Learning:**
- Different features have different quotas
- Automation: 20/day
- Test cases: ~15-20/day
- Each resets independently

---

**Last Updated:** December 23, 2025 10:26 IST
**Status:** ✅ Error handling improved
**Next:** Wait 1 minute or create new API key
