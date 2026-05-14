# Fit2Fit Gym - Third-Party Integration Documentation

## Table of Contents
1. [Email Integration (Nodemailer + Mailtrap)](#email-integration)
2. [WhatsApp Integration (Twilio)](#whatsapp-integration)
3. [Database Integration (PostgreSQL)](#database-integration)
4. [Deployment Integration (Render.com)](#deployment-integration)
5. [Development Tools](#development-tools)

---

## Email Integration

### Overview
Email notifications are powered by **Nodemailer** with **Mailtrap** as the SMTP provider for development and testing.

### Technology Stack
- **Nodemailer** (v7.0.10) - Email sending library
- **Mailtrap** - SMTP testing service

---

### Configuration

#### Environment Variables
```env
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
```

#### Transporter Setup
```javascript
// emailService.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // TLS
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});
```

---

### Email Types

#### 1. Meal Reminder Email

**Purpose**: Automated meal time reminders for subscribed users

**Trigger**: Cron schedule based on class type and meal time

**Template Features**:
- HTML responsive design
- Branded header with Fit2Fit colors
- Meal card with details
- Class badge
- Nutrition tips
- Call-to-action button
- Unsubscribe information

**Function Signature**:
```javascript
sendMealReminder(userEmail, userName, mealName, mealDetails, mealTime, className)
```

**Example Usage**:
```javascript
await sendMealReminder(
  'john@example.com',
  'John Doe',
  'Breakfast',
  'Poha with peanuts, curry leaves & lemon',
  '7:00 AM',
  'HIIT'
);
```

**Email Structure**:
```html
Subject: 🍽️ Meal Reminder: Breakfast - 7:00 AM
From: "Fit2Fit Gym" <noreply@fit2fit.com>
To: john@example.com

<HTML Email with:>
- Header (black background, neon green text)
- Personalized greeting
- Meal card (meal name, time, details, class badge)
- Quick tip section
- CTA button (View Full Diet Plan)
- Footer (branding, unsubscribe info)
```

**Response Handling**:
```javascript
{
  success: true,
  messageId: "unique-message-id"
}
// OR
{
  success: false,
  error: "Error message"
}
```

---

#### 2. Subscription Confirmation Email

**Purpose**: Confirms successful subscription to meal reminders

**Trigger**: Immediately after user subscribes via `/api/subscribe-reminders`

**Template Features**:
- Success icon (✅)
- Confirmation message
- Class type display
- Welcome message

**Function Signature**:
```javascript
sendSubscriptionConfirmation(userEmail, userName, className)
```

**Example Usage**:
```javascript
await sendSubscriptionConfirmation(
  'john@example.com',
  'John Doe',
  'HIIT'
);
```

**Email Structure**:
```html
Subject: ✅ Subscribed to Diet Plan Reminders
From: "Fit2Fit Gym" <noreply@fit2fit.com>
To: john@example.com

<HTML Email with:>
- Header
- Success icon (large ✅)
- Confirmation heading
- Personalized message
- Class type information
- Motivational message
```

---

### Email Styling

**Color Scheme**:
- **Primary Background**: Black (#000000)
- **Accent Color**: Neon Green (#39ff14)
- **Text**: White (#FFFFFF) on dark, Black (#000000) on light
- **Card Background**: Light gray (#f8f9fa)

**Typography**:
- Font Family: Arial, sans-serif
- Heading: 28px, bold
- Body: 16px, regular
- Small text: 12px

**Responsive Design**:
- Max width: 600px
- Mobile-friendly layout
- Readable on all devices

---

### Error Handling

```javascript
try {
  const result = await sendMealReminder(...);
  if (result.success) {
    console.log('✅ Email sent successfully');
  }
} catch (error) {
  console.error('❌ Email sending failed:', error.message);
  // Continue execution (don't block other operations)
}
```

---

### Testing

#### Mailtrap Inbox
1. Log in to Mailtrap dashboard
2. Navigate to inbox
3. View sent emails
4. Test email rendering
5. Check spam score
6. Validate HTML/CSS

#### Manual Test Endpoint
```javascript
POST /api/test-meal-reminder
{
  "email": "test@example.com",
  "class_type": "HIIT"
}
```

---

### Production Considerations

#### Switch to Production SMTP
```env
# Production SMTP (e.g., SendGrid, AWS SES, Gmail)
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=your_sendgrid_api_key
```

#### Best Practices
1. **SPF/DKIM Records**: Configure for better deliverability
2. **Rate Limiting**: Implement to avoid being flagged as spam
3. **Unsubscribe Link**: Functional unsubscribe mechanism
4. **Bounce Handling**: Handle bounced emails
5. **Email Verification**: Verify email addresses before sending

---

## WhatsApp Integration

### Overview
WhatsApp notifications are powered by **Twilio** WhatsApp Business API.

### Technology Stack
- **Twilio SDK** (v5.10.6) - Messaging API client
- **Twilio WhatsApp Sandbox** - Development/testing
- **Twilio WhatsApp Business** - Production

---

### Configuration

#### Environment Variables
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886  # Sandbox number
```

#### Client Initialization
```javascript
// whatsappService.js
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;

const client = twilio(accountSid, authToken);
```

---

### Phone Number Formatting

**Function**:
```javascript
const formatWhatsAppNumber = (phoneNumber) => {
  // Remove spaces, dashes, parentheses
  let cleaned = phoneNumber.replace(/[\s\-\(\)]/g, '');
  
  // Add + if not present
  if (!cleaned.startsWith('+')) {
    cleaned = '+' + cleaned;
  }
  
  // Add whatsapp: prefix
  return `whatsapp:${cleaned}`;
};
```

**Examples**:
```javascript
formatWhatsAppNumber('9876543210')        → 'whatsapp:+9876543210'
formatWhatsAppNumber('+91 98765 43210')   → 'whatsapp:+919876543210'
formatWhatsAppNumber('(987) 654-3210')    → 'whatsapp:+9876543210'
```

---

### Message Types

#### 1. Meal Reminder WhatsApp

**Purpose**: Send meal reminders via WhatsApp

**Function Signature**:
```javascript
sendMealReminderWhatsApp(phoneNumber, userName, mealName, mealDetails, mealTime, className)
```

**Example Usage**:
```javascript
await sendMealReminderWhatsApp(
  '+919876543210',
  'John Doe',
  'Breakfast',
  'Poha with peanuts, curry leaves & lemon',
  '7:00 AM',
  'HIIT'
);
```

**Message Format**:
```
🍽️ *Meal Time Reminder - Fit2Fit Gym*

Hi John Doe! ⏰

It's time for your *Breakfast*!

⏰ *Time:* 7:00 AM
📋 *Details:* Poha with peanuts, curry leaves & lemon
🏋️ *Plan:* HIIT Diet Plan

💡 *Quick Tip:* Stay consistent with your meal timing for best results. Proper nutrition is 70% of your fitness journey!

Visit your diet plan: https://fit2fit-gym-api.onrender.com/

---
Fit2Fit Gym - Building Better Bodies, One Meal at a Time 💪
```

**Formatting**:
- `*text*` - Bold text
- Emojis for visual appeal
- Line breaks for readability

---

#### 2. Subscription Confirmation WhatsApp

**Purpose**: Confirm meal reminder subscription

**Function Signature**:
```javascript
sendSubscriptionConfirmationWhatsApp(phoneNumber, userName, className)
```

**Example Usage**:
```javascript
await sendSubscriptionConfirmationWhatsApp(
  '+919876543210',
  'John Doe',
  'HIIT'
);
```

**Message Format**:
```
✅ *Subscription Confirmed - Fit2Fit Gym*

Hi John Doe! 🎉

You've successfully subscribed to meal reminders for the *HIIT* diet plan.

You'll receive timely WhatsApp reminders for each meal throughout the day to help you stay on track with your nutrition goals.

Stay committed, stay healthy! 💪

---
Fit2Fit Gym
```

---

### Sending Messages

**Core Function**:
```javascript
const sendWhatsAppMessage = async (phoneNumber, message) => {
  if (!client) {
    return { success: false, error: 'Twilio not configured' };
  }

  try {
    const formattedNumber = formatWhatsAppNumber(phoneNumber);
    
    const messageResponse = await client.messages.create({
      body: message,
      from: whatsappNumber,
      to: formattedNumber
    });

    console.log(`✅ WhatsApp sent: ${messageResponse.sid}`);
    return { success: true, messageId: messageResponse.sid };
  } catch (error) {
    console.error(`❌ WhatsApp error: ${error.message}`);
    return { success: false, error: error.message };
  }
};
```

---

### Twilio Sandbox Setup

#### Step 1: Join Sandbox
1. Send WhatsApp message to: `+1 415 523 8886`
2. Message content: `join <your-sandbox-code>`
3. Receive confirmation message

#### Step 2: Verify Subscription
```javascript
// Test endpoint
POST /api/test-meal-reminder
{
  "email": "user@example.com",
  "class_type": "HIIT"
}
```

#### Step 3: Check Delivery
- Open WhatsApp
- Check for message from Twilio Sandbox
- Verify formatting and content

---

### Error Handling

**Common Errors**:

1. **Not Subscribed to Sandbox**:
```
Error: User has not joined the sandbox
Solution: Send "join <code>" to Twilio number
```

2. **Invalid Phone Number**:
```
Error: Invalid phone number format
Solution: Ensure number includes country code (+91 for India)
```

3. **Twilio Credentials Missing**:
```
Error: Twilio not configured
Solution: Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN
```

**Error Response**:
```javascript
{
  success: false,
  error: "Error message description"
}
```

---

### Production Setup

#### Step 1: Get Twilio WhatsApp Business Number
1. Apply for WhatsApp Business API access
2. Get approved WhatsApp number
3. Update environment variable

#### Step 2: Update Configuration
```env
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155551234  # Your business number
```

#### Step 3: Message Templates
- Create pre-approved message templates
- Submit for WhatsApp approval
- Use template IDs in messages

---

### Testing

#### Test Connection
```javascript
export const testWhatsAppConnection = async (phoneNumber) => {
  const testMessage = `🧪 *Test Message - Fit2Fit Gym*
  
This is a test message to verify your WhatsApp connection is working correctly.

If you received this, you're all set! 🎉`;

  return await sendWhatsAppMessage(phoneNumber, testMessage);
};
```

#### Manual Testing
```javascript
// In server console or test script
import { testWhatsAppConnection } from './whatsappService.js';

await testWhatsAppConnection('+919876543210');
```

---

### Best Practices

1. **Opt-In Required**: Only send to users who explicitly opted in
2. **Unsubscribe Option**: Provide clear unsubscribe mechanism
3. **Rate Limiting**: Respect Twilio rate limits
4. **Error Logging**: Log all failures for debugging
5. **Fallback**: Always have email as fallback if WhatsApp fails
6. **Timezone Awareness**: Send at appropriate local times
7. **Message Length**: Keep messages concise (under 1600 characters)

---

## Database Integration

### Overview
PostgreSQL database hosted on **Render.com** for production, with optional SQLite3 for local development.

### Technology Stack
- **PostgreSQL** - Production database
- **node-postgres (pg)** (v8.16.3) - PostgreSQL client
- **SQLite3** (v5.1.7) - Local development option

---

### Configuration

#### Environment Variable
```env
DATABASE_URL=postgresql://user:password@host:port/database
```

#### Connection Setup
```javascript
// db.js
import pg from 'pg';
const { Pool } = pg;

const isProduction = process.env.NODE_ENV === 'production';

const connectionConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : false
};

const pool = new Pool(connectionConfig);
```

---

### Connection Pooling

**Benefits**:
- Reuses database connections
- Reduces connection overhead
- Improves performance
- Handles concurrent requests

**Configuration**:
```javascript
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,                    // Maximum pool size
  idleTimeoutMillis: 30000,   // Close idle clients after 30s
  connectionTimeoutMillis: 2000, // Return error after 2s
});
```

---

### Query Interface

**Basic Query**:
```javascript
export const query = (text, params) => pool.query(text, params);

// Usage
const result = await db.query('SELECT * FROM members WHERE id = $1', [memberId]);
```

**Transaction Support**:
```javascript
export const getClient = () => pool.connect();

// Usage
const client = await db.getClient();
try {
  await client.query('BEGIN');
  await client.query('INSERT INTO members ...');
  await client.query('INSERT INTO transactions ...');
  await client.query('COMMIT');
} catch (e) {
  await client.query('ROLLBACK');
  throw e;
} finally {
  client.release();
}
```

---

### Render PostgreSQL Setup

#### Step 1: Create Database
1. Log in to Render dashboard
2. Click "New +" → "PostgreSQL"
3. Configure database:
   - Name: `fit2fit-gym-db`
   - Region: Choose closest to users
   - Plan: Free or Starter

#### Step 2: Get Connection String
1. Navigate to database dashboard
2. Copy "Internal Database URL"
3. Add to environment variables

#### Step 3: Connect Application
```env
DATABASE_URL=postgresql://user:password@host/database
```

---

### Database Initialization

**Automatic Schema Creation**:
```javascript
async function initDb() {
  // Create tables if not exist
  await db.query('CREATE TABLE IF NOT EXISTS members ...');
  await db.query('CREATE TABLE IF NOT EXISTS transactions ...');
  // ... all tables
  
  // Seed initial data
  const count = await db.query('SELECT COUNT(*) FROM achievements');
  if (count.rows[0].count === '0') {
    // Insert default achievements
  }
}

// Called on server start
app.listen(PORT, () => {
  initDb();
});
```

---

### Error Handling

```javascript
try {
  const result = await db.query('SELECT * FROM members');
  res.json({ message: 'success', data: result.rows });
} catch (err) {
  console.error('Database error:', err);
  res.status(400).json({ error: err.message });
}
```

---

## Deployment Integration

### Overview
Application deployed on **Render.com** with automatic builds and deployments.

### Technology Stack
- **Render.com** - Cloud platform
- **GitHub** - Source code repository
- **Render PostgreSQL** - Managed database

---

### Deployment Configuration

#### render.yaml
```yaml
services:
  - type: web
    name: fit2fit-gym-api
    env: node
    plan: free
    buildCommand: npm run render-build
    startCommand: node server.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000
    healthCheckPath: /api/members
```

---

### Build Process

**Build Command**:
```bash
npm run render-build
```

**Executes**:
```json
{
  "scripts": {
    "render-build": "npm install && npm run build"
  }
}
```

**Steps**:
1. Install dependencies (`npm install`)
2. Build frontend (`vite build`)
3. Output to `/dist` directory

---

### Environment Variables

**Required Variables**:
```env
# Database
DATABASE_URL=<Render PostgreSQL URL>

# Email
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=<username>
MAIL_PASSWORD=<password>

# WhatsApp
TWILIO_ACCOUNT_SID=<sid>
TWILIO_AUTH_TOKEN=<token>
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# Application
NODE_ENV=production
PORT=3000
RENDER_EXTERNAL_URL=https://fit2fit-gym-api.onrender.com
```

---

### Deployment Workflow

```
1. Push code to GitHub main branch
   ↓
2. Render webhook triggered
   ↓
3. Clone repository
   ↓
4. Run build command (npm run render-build)
   ↓
5. Start server (node server.js)
   ↓
6. Health check (/api/members)
   ↓
7. Deployment complete
```

---

### Keep-Alive Mechanism

**Purpose**: Prevent Render free tier from sleeping after 15 minutes of inactivity

**Implementation**:
```javascript
function startKeepAlive() {
  const url = process.env.RENDER_EXTERNAL_URL || 'https://fit2fit-gym-api.onrender.com';
  const interval = 14 * 60 * 1000; // 14 minutes

  const ping = async () => {
    try {
      await axios.get(`${url}/api/health`);
      console.log(`Keep-Alive ping successful: ${new Date().toISOString()}`);
    } catch (err) {
      console.error(`Keep-Alive ping failed: ${err.message}`);
    }
  };

  ping(); // Initial ping
  setInterval(ping, interval);
}

// Start on server initialization
app.listen(PORT, () => {
  startKeepAlive();
});
```

---

## Development Tools

### ngrok Integration

**Purpose**: Expose local server publicly for testing

**Installation**:
```bash
npm install ngrok --save-dev
```

**Usage**:
```javascript
// start-ngrok.js
import ngrok from 'ngrok';

const url = await ngrok.connect(3000);
console.log(`Public URL: ${url}`);
```

**Manual**:
```bash
ngrok http 3000
```

---

### Concurrently

**Purpose**: Run multiple commands simultaneously

**Usage**:
```json
{
  "scripts": {
    "dev:full": "concurrently \"npm run dev\" \"npm run server\""
  }
}
```

---

*Last Updated: November 28, 2025*
*Integration Documentation Version: 1.0.0*
