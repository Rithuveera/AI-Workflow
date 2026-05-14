# Quota Exceeded - Solutions Guide

## ⚠️ Error Message
```
Error: All AI models failed. Last error: Quota exceeded for gemini-2.5-flash. Please try again later.
```

## 📊 What Happened?

You've hit the **Google Gemini API rate limit** for the free tier.

### Free Tier Limits:
- **15 requests per minute** (RPM)
- **1,500 requests per day** (RPD)
- **1 million tokens per minute** (TPM)

When you upload a requirement document and generate test cases, each generation counts as 1 request.

---

## ✅ Immediate Solutions

### Solution 1: Wait 1-2 Minutes ⏰
**Easiest & Free**

The rate limit resets every minute. Simply:
1. Wait for **60-120 seconds**
2. Try uploading your document again
3. The quota will have reset

**Best for:** Quick fixes, occasional use

---

### Solution 2: Use Multiple API Keys 🔑
**Free & Effective**

Create additional API keys to increase your quota:

1. Go to: https://aistudio.google.com/app/apikey
2. Click **"Create API Key"**
3. Copy the new key
4. Update your `.env` file:
   ```bash
   GEMINI_API_KEY=your_new_api_key_here
   ```
5. Restart the server: `python app.py`

**Best for:** Development, testing multiple documents

---

### Solution 3: Upgrade to Paid Tier 💳
**Unlimited Usage**

Google AI Studio offers a paid tier with much higher limits:

**Paid Tier Limits:**
- **1,000 requests per minute** (RPM)
- **Unlimited daily requests**
- **4 million tokens per minute** (TPM)

**Pricing:** Pay-as-you-go (very affordable)
- Visit: https://ai.google.dev/pricing
- Enable billing in Google Cloud Console

**Best for:** Production use, heavy usage

---

### Solution 4: Optimize Your Usage 🎯
**Reduce API Calls**

Tips to stay within limits:
1. **Batch your documents** - Upload fewer, larger documents
2. **Use smaller documents** - Split large docs into sections
3. **Cache results** - Don't regenerate the same document
4. **Wait between uploads** - Space out your requests

**Best for:** Long-term free tier usage

---

## 🔧 What We Fixed

### Enhanced Fallback System

The application now automatically tries multiple models when quota is exceeded:

1. **Primary:** `gemini-2.5-flash` (your selected model)
2. **Fallback 1:** `gemini-1.5-flash` (older, stable)
3. **Fallback 2:** `gemini-1.5-pro` (more powerful)
4. **Fallback 3:** `gemini-1.5-flash-001` (specific version)

**Benefits:**
- ✅ Automatic failover to alternative models
- ✅ Better error messages with actionable solutions
- ✅ Tracks which models hit quota limits
- ✅ Provides helpful guidance to users

---

## 📈 Check Your Quota Status

### Method 1: Run Quota Checker
```bash
python check_quota.py
```

This will show:
- Current API key status
- Rate limit information
- Usage statistics (if available)

### Method 2: Google AI Studio Dashboard
1. Visit: https://aistudio.google.com/app/apikey
2. Click on your API key
3. View usage statistics

---

## 🎯 Recommended Workflow

### For Development (Free Tier):
```
1. Upload document
2. Generate test cases
3. Wait 60 seconds
4. Upload next document
5. Repeat
```

### For Production (Paid Tier):
```
1. Upgrade to paid tier
2. Upload documents as needed
3. No waiting required
4. Unlimited daily usage
```

---

## 🚨 Error Messages Explained

### "Quota exceeded for gemini-2.5-flash"
- **Cause:** Hit the 15 requests/minute limit
- **Solution:** Wait 1-2 minutes

### "All AI models failed"
- **Cause:** All fallback models also hit quota
- **Solution:** Wait longer (2-3 minutes) or use new API key

### "Resource exhausted"
- **Cause:** Daily quota (1,500 requests) exceeded
- **Solution:** Wait until next day or upgrade to paid tier

---

## 📊 Quota Usage Examples

### Free Tier (15 RPM):
- ✅ **1 document every 4 seconds** = OK
- ✅ **15 documents per minute** = OK
- ❌ **20 documents per minute** = QUOTA EXCEEDED

### Paid Tier (1,000 RPM):
- ✅ **1,000 documents per minute** = OK
- ✅ **Unlimited daily** = OK

---

## 🔍 Monitoring Your Usage

### Server Logs
Watch the console output for quota messages:
```
✅ Successfully parsed 25 test cases using gemini-2.5-flash
⚠️ Quota exceeded for gemini-2.5-flash. Trying next model...
✅ Successfully parsed 30 test cases using gemini-1.5-flash
```

### Application Logs
Check `app.log` for detailed error information:
```bash
tail -f app.log
```

---

## 💡 Pro Tips

1. **Space out uploads** - Wait 5-10 seconds between documents
2. **Use smaller files** - Break large PDFs into sections
3. **Test with small docs first** - Verify before bulk processing
4. **Monitor your usage** - Keep track of requests
5. **Consider upgrading** - If using heavily, paid tier is worth it

---

## 🆘 Still Having Issues?

### Check These:
1. ✅ API key is valid
2. ✅ Internet connection is stable
3. ✅ Server is running (`python app.py`)
4. ✅ `.env` file has correct API key
5. ✅ Waited at least 60 seconds

### Get Help:
- Google AI Studio: https://aistudio.google.com/
- Pricing Info: https://ai.google.dev/pricing
- Documentation: https://ai.google.dev/docs

---

## 📝 Summary

**Quick Fix:** Wait 1-2 minutes and try again

**Long-term Solutions:**
1. Use multiple API keys (free)
2. Upgrade to paid tier (recommended for production)
3. Optimize usage patterns

**What Changed:**
- ✅ Better fallback system
- ✅ Clearer error messages
- ✅ Automatic model switching
- ✅ Helpful solutions in errors

---

**Last Updated:** December 23, 2025
**Status:** Quota management improved
