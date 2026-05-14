# 📱 Subscribe to Multiple Classes - All Reminders

## What This Does

The new script **`subscribe-all-classes.js`** will subscribe you to **ALL THREE** class types at once:
- 🔥 HIIT
- 🧘 Yoga  
- 💪 Strength

You'll receive meal reminders for all three programs!

---

## 🚀 How to Use

### Run the script:
```bash
node subscribe-all-classes.js
```

### Enter your details (one time):
1. **Name:** Your name
2. **Email:** Your email address
3. **Phone:** Your WhatsApp number (format: **+919876543210**)

The script will automatically subscribe you to all three classes!

---

## ⏰ What Reminders You'll Get

### 🔥 HIIT Reminders:
- 7:00 AM - Breakfast
- 10:00 AM - Mid-Morning
- 1:00 PM - Lunch
- 4:30 PM - Pre-Workout
- 6:30 PM - Post-Workout
- 8:30 PM - Dinner

### 🧘 Yoga Reminders:
- 7:30 AM - Breakfast
- 10:30 AM - Mid-Morning
- 1:00 PM - Lunch
- 4:00 PM - Afternoon
- 7:00 PM - Post-Yoga
- 8:30 PM - Dinner

### 💪 Strength Reminders:
- 7:00 AM - Breakfast
- 10:00 AM - Mid-Morning
- 12:30 PM - Lunch
- 3:30 PM - Pre-Workout
- 6:00 PM - Post-Workout
- 8:30 PM - Dinner

---

## 📊 Combined Schedule (All Classes)

When subscribed to all three, you'll get reminders at:

| Time | HIIT | Yoga | Strength |
|------|------|------|----------|
| 7:00 AM | ✅ Breakfast | | ✅ Breakfast |
| 7:30 AM | | ✅ Breakfast | |
| 10:00 AM | ✅ Mid-Morning | | ✅ Mid-Morning |
| 10:30 AM | | ✅ Mid-Morning | |
| 12:30 PM | | | ✅ Lunch |
| 1:00 PM | ✅ Lunch | ✅ Lunch | |
| 3:30 PM | | | ✅ Pre-Workout |
| 4:00 PM | | ✅ Afternoon | |
| 4:30 PM | ✅ Pre-Workout | | |
| 6:00 PM | | | ✅ Post-Workout |
| 6:30 PM | ✅ Post-Workout | | |
| 7:00 PM | | ✅ Post-Yoga | |
| 8:30 PM | ✅ Dinner | ✅ Dinner | ✅ Dinner |

**Total: ~18 WhatsApp reminders per day** (some times overlap)

---

## 📝 Important Notes

### Multiple Reminders at Same Time
- At **8:30 PM**, you'll get **3 dinner reminders** (one for each class)
- At **1:00 PM**, you'll get **2 lunch reminders** (HIIT + Yoga)
- This is normal - each class has its own meal plan

### WhatsApp Only
- ✅ All reminders sent via WhatsApp
- ❌ No email reminders (as you requested)

### Database Structure
- Each class subscription is stored separately
- You can unsubscribe from individual classes if needed
- Email + Class Type combination is unique

---

## 🔧 Alternative: Subscribe to Specific Classes

If you want to subscribe to specific classes only, use:

```bash
node subscribe-now.js
```

Then enter the class type you want (HIIT, Yoga, or Strength).

Run it multiple times for multiple classes.

---

## 🧪 Test After Subscribing

After subscription, test immediately:

```bash
node quick-test.js
```

This will send a test reminder for HIIT class.

---

## ⏰ Current Time & Next Reminders

**Current Time:** December 1, 2025, 2:24 PM IST

**Next reminders today (after you subscribe):**

- **3:30 PM** (in ~1 hour) - Strength Pre-Workout
- **4:00 PM** (in ~1.5 hours) - Yoga Afternoon
- **4:30 PM** (in ~2 hours) - HIIT Pre-Workout
- **6:00 PM** (in ~3.5 hours) - Strength Post-Workout
- **6:30 PM** (in ~4 hours) - HIIT Post-Workout
- **7:00 PM** (in ~4.5 hours) - Yoga Post-Yoga
- **8:30 PM** (in ~6 hours) - All Classes Dinner (3 messages!)

---

## ✅ Success Indicators

You'll know it worked when:
1. Script shows "✅ HIIT - SUCCESS!"
2. Script shows "✅ Yoga - SUCCESS!"
3. Script shows "✅ Strength - SUCCESS!"
4. You receive **3 WhatsApp confirmation messages**
5. You start receiving scheduled reminders

---

## 🛑 How to Unsubscribe from a Class

If you want to stop reminders for a specific class later:

```javascript
// Example: Unsubscribe from Yoga
curl -X POST https://fit2fit-gym-api.onrender.com/api/unsubscribe-reminders \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","class_type":"Yoga"}'
```

---

**Ready? The script is waiting for your input!** 

Enter your name, email, and phone number to subscribe to all classes. 🚀
