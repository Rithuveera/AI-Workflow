# Gemini API Quota & Model Guide

## 🚨 Understanding Quotas

If you see a `429 Too Many Requests` error, you have hit the free tier limits for your current model.

---

## 🤖 Available Models for Your Key

Based on your API key permissions, these are the best models available to you:

### 🏆 1. Gemini 2.5 Flash (`gemini-2.5-flash`)
**Current Active Model**
- **Best For:** Real-time chat, quick security scans, high responsiveness.
- **Why:** Latest "Flash" model, optimized for speed and cost-efficiency.
- **Quota:** Separate from the 2.0 quota you exhausted.

### 🥈 2. Gemini 2.5 Pro (`gemini-2.5-pro`)
- **Best For:** Deep, complex analysis and generating detailed reports.
- **Why:** Stronger reasoning capabilities but slower than Flash.
- **Use Case:** Switch to this if you need deeper audit capabilities.

### 🥉 3. Gemini 2.0 Flash Exp (`gemini-2.0-flash-exp`)
- **Best For:** Fallback option.
- **Why:** Experimental version, good for testing new features.

---

## 🔧 How to Switch Models

I've already set your app to use **Gemini 2.5 Flash**. 

If you ever need to change it manually, edit `src/actions/analyze.ts`:

```typescript
const model = genAI.getGenerativeModel({
    // Options: "gemini-2.5-flash", "gemini-2.5-pro", "gemini-2.0-flash-exp"
    model: "gemini-2.5-flash", 
    systemInstruction: ...
});
```

---

## 📈 Managing Quotas

### Free Tier Limits (Typical)
- **Requests per Minute (RPM):** ~15
- **Requests per Day (RPD):** ~1,500

### Tips to Avoid Errors
1. **Wait 5 seconds** between chat messages.
2. **Don't spam** the "Analyze" button.
3. **If you hit a limit:**
   - Wait 60 seconds.
   - Or switch to `gemini-2.5-pro` temporarily in the code.

---

## 🔍 Troubleshooting

**Error: "Model not found"**
- Ensure you are using one of the valid model names listed above.
- `gemini-1.5-flash` is **NOT** available for your specific API key.

**Error: "Quota exceeded"**
- You have used up your free requests for that specific model.
- Solution: Switch to a different model (e.g., from Flash to Pro) or wait for the quota to reset (usually daily).
