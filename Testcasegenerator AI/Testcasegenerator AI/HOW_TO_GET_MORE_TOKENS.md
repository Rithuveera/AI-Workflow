# How to Get More Gemini API Tokens/Quota

## 🎯 Quick Summary

You have **5 options** to get more tokens:

1. ✅ **Wait for Reset** (FREE - Easiest)
2. ✅ **Create New API Keys** (FREE - Quick)
3. ✅ **Use Different Models** (FREE - Already doing this!)
4. 💰 **Upgrade to Paid Tier** (Paid - Best for production)
5. 🔧 **Optimize Usage** (FREE - Reduce consumption)

---

## Option 1: Wait for Daily Reset ⏰ (FREE)

### **How It Works:**
- Quota resets **every day at midnight Pacific Time (PT)**
- For you (IST timezone): **1:30 PM every day**

### **Current Status:**
```
Today's Reset: December 8, 2025 at 1:30 PM IST
Time Now:      8:37 AM IST
Wait Time:     ~5 hours
```

### **After Reset You Get:**
- ✅ 1,500 requests per day (gemini-2.0-flash)
- ✅ 1,500 requests per day (gemini-2.5-flash)
- ✅ 15 requests per minute
- ✅ 1-4 million tokens per minute

### **Best For:**
- Development and testing
- Small projects
- Learning and experimentation

---

## Option 2: Create Multiple API Keys 🔑 (FREE)

### **How It Works:**
Each API key has its **own separate quota**!

### **Steps to Create New API Key:**

1. **Visit Google AI Studio:**
   ```
   https://aistudio.google.com/app/apikey
   ```

2. **Click "Create API Key"**

3. **Select or Create a Google Cloud Project**
   - You can create multiple projects
   - Each project can have multiple API keys

4. **Copy the New API Key**

5. **Update Your .env File:**
   ```env
   # Old key (quota exhausted)
   # GEMINI_API_KEY=AIzaSyAHEkmFFfpvt9HoJyCERX74wUJ_C8CJQ9M
   
   # New key (fresh quota)
   GEMINI_API_KEY=YOUR_NEW_API_KEY_HERE
   ```

6. **Restart Your Application**

### **Pro Tip: Organize Multiple Keys**
```env
# Development key (for testing)
GEMINI_API_KEY_DEV=key_1_here

# Production key (for actual use)
GEMINI_API_KEY_PROD=key_2_here

# Backup key (in case of quota issues)
GEMINI_API_KEY_BACKUP=key_3_here

# Active key
GEMINI_API_KEY=key_1_here
```

### **Limits:**
- Free tier: Limited number of API keys per account
- Each key still has the same daily limits
- But you can switch between keys when one runs out

### **Best For:**
- Separating dev/test/prod environments
- Having backup keys
- Multiple projects

---

## Option 3: Use Different Models 🔄 (FREE - Already Doing!)

### **How It Works:**
Different models have **separate quotas**!

### **Available Models:**
```
✅ gemini-2.5-flash (Currently using - Working!)
✅ gemini-2.0-flash (Quota exhausted)
✅ Other models available (check list_models.py)
```

### **You're Already Using This Solution!**
We switched from `gemini-2.0-flash` to `gemini-2.5-flash` to get fresh quota.

### **Best For:**
- Quick workaround when one model's quota is exhausted
- Testing different model capabilities

---

## Option 4: Upgrade to Paid Tier 💰 (RECOMMENDED for Production)

### **How It Works:**
Pay for usage and get **MUCH higher limits**

### **Pricing (as of 2025):**

#### **Free Tier (Current):**
```
Requests per day:    1,500
Requests per minute: 15
Cost:                $0
```

#### **Pay-as-you-go Tier:**
```
Requests per day:    Unlimited
Requests per minute: 1,000+
Cost:                ~$0.00025 per 1K characters (input)
                     ~$0.0005 per 1K characters (output)
```

### **Example Cost Calculation:**

For your test case generation:
```
Average document:     2,000 characters (input)
Average response:     30,000 characters (output)
Cost per generation:  ~$0.0005 + ~$0.015 = ~$0.0155 per file

100 files per month:  ~$1.55
1000 files per month: ~$15.50
```

### **Steps to Upgrade:**

1. **Visit Google AI Studio:**
   ```
   https://aistudio.google.com/app/apikey
   ```

2. **Click "Upgrade to Pay-as-you-go"** or **"Enable Billing"**

3. **Link a Google Cloud Billing Account:**
   - Go to: https://console.cloud.google.com/billing
   - Create a billing account
   - Add payment method (credit/debit card)

4. **Enable Gemini API with Billing:**
   - Select your project
   - Enable billing for Gemini API
   - Set budget alerts (recommended)

5. **Your API Key Automatically Gets Higher Limits!**

### **Benefits:**
- ✅ Unlimited daily requests
- ✅ Much higher rate limits
- ✅ Priority support
- ✅ Better for production use
- ✅ No more quota exhaustion issues

### **Cost Control:**
Set up budget alerts:
```
https://console.cloud.google.com/billing/budgets
```

Example alerts:
- Alert at $5 spent
- Alert at $10 spent
- Hard limit at $20 (optional)

### **Best For:**
- Production applications
- High-volume usage
- Business/commercial use
- When reliability is critical

---

## Option 5: Optimize Your Usage 🔧 (FREE)

### **How It Works:**
Reduce the number of API calls you make

### **Current Usage Pattern:**
Each file upload = 1 API request

### **Optimization Strategies:**

#### **1. Cache Results**
Save generated test cases and reuse them:
```python
# Check if test cases already exist for this file
existing_cases = get_test_cases_from_db(filename)
if existing_cases:
    return existing_cases  # Don't call API again
else:
    # Generate new test cases
    test_cases = generate_test_cases_with_gemini(text)
```

#### **2. Batch Processing**
Process multiple files in one request (if applicable)

#### **3. Reduce Prompt Size**
Optimize your prompt to use fewer tokens:
- Remove unnecessary examples
- Make instructions more concise
- Use shorter prompts

#### **4. Use Smaller Models**
Some models use fewer tokens (but may be less capable)

#### **5. Implement Rate Limiting**
Prevent accidental overuse:
```python
import time

last_request_time = 0
MIN_REQUEST_INTERVAL = 4  # seconds (15 requests/min = 4 sec/request)

def rate_limited_generate(text):
    global last_request_time
    time_since_last = time.time() - last_request_time
    if time_since_last < MIN_REQUEST_INTERVAL:
        time.sleep(MIN_REQUEST_INTERVAL - time_since_last)
    
    result = generate_test_cases_with_gemini(text)
    last_request_time = time.time()
    return result
```

### **Best For:**
- Reducing costs
- Staying within free tier
- Development optimization

---

## 🎯 Recommended Solution for You

Based on your use case, here's what I recommend:

### **For Now (Development/Testing):**
1. ✅ **Continue using gemini-2.5-flash** (working!)
2. ✅ **Create 1-2 backup API keys** (free, takes 2 minutes)
3. ✅ **Wait for daily reset** if needed (1:30 PM IST)

### **For Production (When Ready):**
1. 💰 **Upgrade to paid tier** (~$1-5/month for moderate use)
2. 🔧 **Implement caching** to avoid regenerating same files
3. 📊 **Set up monitoring** to track usage

---

## 📋 Step-by-Step: Create a New API Key Now

Let me create a script to help you:

```bash
# 1. Open this URL in your browser:
https://aistudio.google.com/app/apikey

# 2. Click "Create API Key"

# 3. Copy the new key

# 4. Update your .env file:
# Replace the old key with the new one

# 5. Restart your application:
# Stop the current server (Ctrl+C)
# Run: python app.py
```

---

## 💡 Quick Decision Guide

**Choose based on your needs:**

| Situation | Best Option | Cost | Time |
|-----------|-------------|------|------|
| Need quota NOW | Create new API key | Free | 2 min |
| Can wait 5 hours | Wait for reset | Free | 5 hrs |
| Production app | Upgrade to paid | ~$1-10/mo | 10 min |
| High volume | Paid + optimization | Variable | 1 hour |
| Learning/testing | Use current setup | Free | 0 min |

---

## 🔗 Useful Links

1. **Create API Keys:**
   https://aistudio.google.com/app/apikey

2. **Pricing Information:**
   https://ai.google.dev/pricing

3. **Quota Limits:**
   https://ai.google.dev/gemini-api/docs/rate-limits

4. **Google Cloud Console:**
   https://console.cloud.google.com/

5. **Enable Billing:**
   https://console.cloud.google.com/billing

---

## ❓ FAQ

**Q: How many API keys can I create?**
A: Multiple keys per project, multiple projects per account (reasonable limits apply)

**Q: Will creating a new key cost money?**
A: No, creating API keys is free. You only pay if you upgrade to paid tier.

**Q: Can I use multiple keys in the same application?**
A: Yes! You can implement key rotation or fallback logic.

**Q: What happens when I upgrade to paid?**
A: You get higher limits immediately, and you're charged based on actual usage.

**Q: Is there a free trial for paid tier?**
A: Google Cloud often offers $300 credit for new users (check current offers)

---

**Need help creating a new API key? Let me know and I can guide you through it!**
