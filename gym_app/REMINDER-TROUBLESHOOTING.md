# 🔧 Reminder System Troubleshooting Guide

## Issue: Not Receiving Reminders for Last Two Days

### Current Status (as of 2025-12-01)
- ✅ Server is running on Render
- ✅ Scheduler code is properly configured
- ✅ Keep-alive mechanism is active
- ❓ Need to verify: Active subscriptions and scheduler logs

---

## 🔍 Diagnostic Steps

### Step 1: Check Render Logs

Go to your Render Dashboard and check the logs for these key messages:

#### **On Server Startup (should see these):**
```
Server running on port 3000
Starting Fit2Fit Server with PostgreSQL...
Initializing Database...
Database initialized successfully.
Initializing Meal Reminder Scheduler (IST Timezone)...
✅ All meal reminders scheduled successfully.
Starting Keep-Alive ping to https://fit2fit-gym-api.onrender.com every 14 minutes...
Keep-Alive ping successful: [timestamp]
```

#### **Every 14 minutes (keep-alive):**
```
Keep-Alive ping successful: [timestamp]
```

#### **At scheduled times (when reminders should be sent):**
```
Checking reminders for HIIT - Breakfast
Found X subscribers for HIIT
Email sent to user@example.com
WhatsApp sent to +1234567890
```

---

### Step 2: Check for Common Issues

#### ❌ **Issue 1: No Active Subscriptions**
**Symptoms:** Logs show "No active subscribers for [CLASS]"

**Solution:**
1. Re-subscribe to meal reminders:
   - Go to https://fit2fit-gym-api.onrender.com
   - Scroll to Classes section
   - Click "Get Meal Reminders"
   - Fill in your details and subscribe

2. Verify subscription by testing:
   ```bash
   curl -X POST https://fit2fit-gym-api.onrender.com/api/test-meal-reminder \
     -H "Content-Type: application/json" \
     -d "{\"email\":\"YOUR_EMAIL\",\"class_type\":\"HIIT\"}"
   ```

#### ❌ **Issue 2: Server Was Restarted**
**Symptoms:** Logs show recent "Server running on port 3000" message

**Cause:** Render may have restarted your server (deployment, crash, or manual restart)

**Solution:** 
- The scheduler reinitializes on restart, so it should work now
- Wait for the next scheduled time to verify

#### ❌ **Issue 3: Email Service Not Configured**
**Symptoms:** Logs show "Failed to send email" errors

**Solution:** Check Render environment variables:
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - Your Gmail app password (not regular password)

#### ❌ **Issue 4: WhatsApp Service Not Configured**
**Symptoms:** Logs show "Failed to send WhatsApp" errors

**Solution:** Check Render environment variables:
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_WHATSAPP_NUMBER`

Also ensure you've joined the Twilio Sandbox:
- Send "join [sandbox-name]" to the Twilio WhatsApp number

#### ❌ **Issue 5: Database Connection Issues**
**Symptoms:** Logs show "Error fetching subscribers" or database connection errors

**Solution:** Check Render environment variable:
- `DATABASE_URL` - Should be set to your PostgreSQL connection string

---

### Step 3: Test Reminder Manually

Run this command to test if reminders work right now:

```bash
curl -X POST https://fit2fit-gym-api.onrender.com/api/test-meal-reminder \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"YOUR_EMAIL_HERE\",\"class_type\":\"HIIT\"}"
```

**Expected Response:**
```json
{
  "message": "success",
  "data": {
    "email_sent": true,
    "whatsapp_sent": true,
    "meal": {
      "name": "Breakfast",
      "meal": "Poha with peanuts, curry leaves & lemon",
      "time": "7:00 AM"
    }
  }
}
```

If this works, the system is functional and scheduled reminders should work too.

---

### Step 4: Verify Scheduled Times

Reminders are sent at these times (IST):

#### HIIT Class:
- 7:00 AM - Breakfast
- 10:00 AM - Mid-Morning
- 1:00 PM - Lunch
- 4:30 PM - Pre-Workout
- 6:30 PM - Post-Workout
- 8:30 PM - Dinner

#### Yoga Class:
- 7:30 AM - Breakfast
- 10:30 AM - Mid-Morning
- 1:00 PM - Lunch
- 4:00 PM - Afternoon
- 7:00 PM - Post-Yoga
- 8:30 PM - Dinner

#### Strength Training:
- 7:00 AM - Breakfast
- 10:00 AM - Mid-Morning
- 12:30 PM - Lunch
- 3:30 PM - Pre-Workout
- 6:00 PM - Post-Workout
- 8:30 PM - Dinner

**Current Time:** 2025-12-01 09:26 AM IST

**Next Upcoming Reminders:**
- 10:00 AM - HIIT/Strength Mid-Morning (in ~34 minutes)
- 10:30 AM - Yoga Mid-Morning (in ~1 hour)
- 12:30 PM - Strength Lunch (in ~3 hours)

---

## 🛠️ Quick Fixes

### Fix 1: Restart the Scheduler
If the server is running but scheduler seems stuck:

1. Go to Render Dashboard
2. Click "Manual Deploy" → "Clear build cache & deploy"
3. Wait for deployment to complete
4. Check logs for scheduler initialization messages

### Fix 2: Re-subscribe to Reminders
Your subscription might have been deactivated:

1. Visit: https://fit2fit-gym-api.onrender.com
2. Subscribe again to your preferred class
3. Test immediately using the curl command above

### Fix 3: Check Email Spam Folder
Sometimes emails go to spam:

1. Check your spam/junk folder
2. Mark emails from your gym app as "Not Spam"
3. Add the sender to your contacts

---

## 📊 Expected Behavior

### What Should Happen:
1. **At scheduled time:** Cron job triggers
2. **Scheduler checks:** Queries database for active subscribers
3. **For each subscriber:**
   - Sends email reminder
   - Sends WhatsApp reminder (if enabled)
4. **Logs show:** "Email sent to..." and "WhatsApp sent to..."

### What You Should Receive:
- **Email:** Subject: "Time for your [Meal] - [Class] Diet Plan"
- **WhatsApp:** Message with meal details (if enabled)

---

## 🔄 Next Steps

1. **Check Render Logs** - Look for the messages mentioned in Step 1
2. **Test Manually** - Use the curl command to verify system works
3. **Wait for Next Scheduled Time** - If manual test works, scheduled should too
4. **Re-subscribe if Needed** - If no active subscription found

---

## 📞 Need More Help?

If you've tried all the above and still not receiving reminders:

1. Share your Render logs (last 100 lines)
2. Confirm your subscription status
3. Verify environment variables are set correctly

The most common issue is that the subscription was deactivated or the server was restarted and needs time to initialize.
