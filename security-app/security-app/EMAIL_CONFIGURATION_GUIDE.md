# Email Alerts & Weekly Summary Configuration Guide

## Overview

SecValid AI now supports **Email Alerts** and **Weekly Security Summaries** to keep you informed about security vulnerabilities and trends. This guide explains how to configure these features.

---

## ✅ What's Been Fixed

### Settings Page Issues Resolved:
1. ✅ **Form submission now works properly** - Settings are correctly saved to `data/settings.json`
2. ✅ **Success notification** - Visual feedback when settings are saved
3. ✅ **Email configuration** - New email address field added
4. ✅ **Better UI/UX** - Improved descriptions and layout

---

## 📧 How to Configure Email Alerts

### Step 1: Navigate to Settings
1. Open your browser and go to `http://localhost:3000/settings`
2. You'll see the Settings page with two main sections:
   - **AI Configuration**
   - **Notifications & Alerts**

### Step 2: Enter Your Email Address
1. In the **Notifications & Alerts** section, find the **Email Address** field
2. Enter your email address (e.g., `your.email@example.com`)
3. This email will be used for both alerts and weekly summaries

### Step 3: Enable Email Alerts
1. Check the box for **"Email Alerts for Critical Vulnerabilities"**
   - This sends instant notifications when critical or high-severity vulnerabilities are detected
2. Check the box for **"Weekly Security Summary"**
   - This sends a comprehensive weekly report with all scans, trends, and security insights

### Step 4: Save Your Settings
1. Click the **"Save Changes"** button at the bottom
2. You'll see a green success message: **"Settings saved successfully!"**
3. The page will reload with your updated settings

---

## 🔔 Notification Types

### 1. Email Alerts for Critical Vulnerabilities
**When it triggers:**
- Whenever a scan detects a **Critical** or **High** severity vulnerability

**What you receive:**
- Immediate email notification
- Vulnerability details
- Severity level
- Affected code/URL
- Recommended fixes

**Example:**
```
Subject: 🚨 Critical Vulnerability Detected - SCAN-123456

A critical security vulnerability has been detected in your recent scan.

Severity: Critical
Target: login.js
Issue: SQL Injection vulnerability detected
Recommendation: Use parameterized queries to prevent SQL injection

View full report: http://localhost:3000/reports/SCAN-123456
```

### 2. Weekly Security Summary
**When it triggers:**
- Every Monday at 9:00 AM (configurable)

**What you receive:**
- Total scans performed this week
- Vulnerability breakdown by severity
- Trends compared to previous week
- Top security issues
- Actionable recommendations

**Example:**
```
Subject: 📊 Weekly Security Summary - Week of Dec 8, 2025

Security Overview:
- Total Scans: 15
- Critical Issues: 2
- High Issues: 5
- Medium Issues: 8
- Low Issues: 3

Trends:
↑ 20% increase in scans
↓ 15% decrease in critical issues

Top Issues:
1. SQL Injection (3 occurrences)
2. XSS Vulnerabilities (2 occurrences)
3. Insecure Authentication (2 occurrences)

View full dashboard: http://localhost:3000
```

---

## 🛠️ Current Implementation Status

### ✅ Completed:
- Settings page UI with email configuration
- Form validation and saving
- Success notifications
- Settings persistence in `data/settings.json`

### 🚧 To Be Implemented:
The actual email sending functionality requires:

1. **Email Service Integration**
   - Choose an email provider (SendGrid, AWS SES, Nodemailer with SMTP)
   - Add email service credentials to `.env.local`

2. **Email Templates**
   - HTML email templates for alerts
   - HTML email templates for weekly summaries

3. **Trigger Logic**
   - Hook into the security scan results
   - Send email when critical/high severity is detected

4. **Scheduler**
   - Set up a cron job or scheduled task for weekly summaries
   - Use `node-cron` or similar library

---

## 📝 Next Steps to Enable Email Functionality

### Option 1: Using SendGrid (Recommended)

1. **Install SendGrid:**
   ```bash
   npm install @sendgrid/mail
   ```

2. **Add to `.env.local`:**
   ```
   SENDGRID_API_KEY=your_sendgrid_api_key
   ```

3. **Create email service:**
   ```typescript
   // src/lib/email.ts
   import sgMail from '@sendgrid/mail';
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
   
   export async function sendCriticalAlert(to: string, report: any) {
     const msg = {
       to,
       from: 'security@yourapp.com',
       subject: `🚨 Critical Vulnerability Detected - ${report.id}`,
       html: `<strong>Severity:</strong> ${report.status}<br>...`,
     };
     await sgMail.send(msg);
   }
   ```

### Option 2: Using Nodemailer (SMTP)

1. **Install Nodemailer:**
   ```bash
   npm install nodemailer
   ```

2. **Add to `.env.local`:**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your.email@gmail.com
   SMTP_PASS=your_app_password
   ```

3. **Create email service:**
   ```typescript
   // src/lib/email.ts
   import nodemailer from 'nodemailer';
   
   const transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: parseInt(process.env.SMTP_PORT!),
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASS,
     },
   });
   
   export async function sendCriticalAlert(to: string, report: any) {
     await transporter.sendMail({
       from: process.env.SMTP_USER,
       to,
       subject: `🚨 Critical Vulnerability Detected - ${report.id}`,
       html: `<strong>Severity:</strong> ${report.status}<br>...`,
     });
   }
   ```

---

## 🔍 Testing Your Configuration

### Test Email Alerts:
1. Go to `http://localhost:3000/chat`
2. Enter a code snippet with a known vulnerability (e.g., SQL injection)
3. Submit for analysis
4. If the severity is Critical/High, an email should be sent

### Test Weekly Summary:
1. Set up a test cron job to run immediately
2. Or manually trigger the weekly summary function
3. Check your email inbox

---

## 📊 Current Settings File

Your settings are stored in `data/settings.json`:

```json
{
  "aiProvider": "gemini",
  "sensitivity": "standard",
  "emailAlerts": true,
  "weeklyReports": false,
  "emailAddress": "test@example.com"
}
```

---

## 🎯 Summary

✅ **Settings page is now fully functional**
✅ **You can configure email alerts and weekly summaries**
✅ **Settings are properly saved and persisted**
✅ **Success notifications provide clear feedback**

🚧 **Next step:** Implement the actual email sending functionality using SendGrid or Nodemailer

---

## 💡 Tips

1. **Use a dedicated email address** for security alerts
2. **Set up email filters** to organize security notifications
3. **Test with a personal email first** before using a team email
4. **Monitor your email quota** if using a free tier service
5. **Consider using email templates** for professional-looking notifications

---

## 🆘 Troubleshooting

### Settings not saving?
- Check browser console for errors
- Verify `data/settings.json` exists and is writable
- Check terminal logs for server errors

### Success message not showing?
- Ensure the URL has `?saved=true` parameter after save
- Clear browser cache and reload

### Email field not visible?
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Check that you're on the latest version

---

**Need help?** Check the terminal logs or browser console for detailed error messages.
