# Fit2Fit Gym - System Architecture Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [System Components](#system-components)
3. [Design Patterns](#design-patterns)
4. [Data Flow](#data-flow)
5. [Database Architecture](#database-architecture)
6. [Frontend Architecture](#frontend-architecture)
7. [Backend Architecture](#backend-architecture)
8. [Integration Architecture](#integration-architecture)
9. [Deployment Architecture](#deployment-architecture)
10. [Security Architecture](#security-architecture)

---

## Architecture Overview

Fit2Fit Gym follows a **modern full-stack web application architecture** with clear separation between frontend and backend, utilizing a **monolithic deployment** strategy where both frontend and backend are served from a single Express server.

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   React SPA (Vite Build)                             │   │
│  │   - Components                                        │   │
│  │   - React Router                                      │   │
│  │   - Context API (Theme)                               │   │
│  │   - Axios HTTP Client                                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   Express.js Server                                   │   │
│  │   ├── API Routes (/api/*)                            │   │
│  │   ├── Static File Serving (/dist)                    │   │
│  │   ├── Middleware (CORS, Body Parser)                 │   │
│  │   └── Error Handling                                  │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   Business Logic Layer                                │   │
│  │   ├── Email Service (Nodemailer)                     │   │
│  │   ├── WhatsApp Service (Twilio)                      │   │
│  │   ├── Reminder Scheduler (node-cron)                 │   │
│  │   └── Gamification Logic                             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ SQL Queries
┌─────────────────────────────────────────────────────────────┐
│                        DATA LAYER                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   PostgreSQL Database                                 │   │
│  │   ├── Members                                         │   │
│  │   ├── Transactions                                    │   │
│  │   ├── Diet Reminders                                  │   │
│  │   ├── Gamification (Profiles, Achievements, Logs)    │   │
│  │   └── Analytics (Measurements, Goals, Workouts)      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ API Calls
┌─────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES LAYER                    │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │   Mailtrap   │  │    Twilio    │  │  Render.com     │   │
│  │   (Email)    │  │  (WhatsApp)  │  │  (Hosting)      │   │
│  └──────────────┘  └──────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## System Components

### 1. Frontend Components
- **React Application**: Single Page Application (SPA)
- **UI Components**: Reusable React components
- **3D Graphics Engine**: Three.js with React Three Fiber
- **Animation System**: Framer Motion
- **Routing**: React Router DOM
- **State Management**: React Context API + Component State
- **HTTP Client**: Axios

### 2. Backend Components
- **Web Server**: Express.js
- **API Layer**: RESTful endpoints
- **Database Client**: node-postgres (pg)
- **Scheduler**: node-cron for automated tasks
- **Email Service**: Nodemailer with SMTP
- **Messaging Service**: Twilio SDK

### 3. Data Storage
- **Primary Database**: PostgreSQL (Production)
- **Development Database**: SQLite3 or PostgreSQL
- **Connection Pooling**: pg Pool

### 4. External Services
- **Email Provider**: Mailtrap (SMTP)
- **Messaging Provider**: Twilio (WhatsApp)
- **Hosting Platform**: Render.com
- **Database Hosting**: Render PostgreSQL

---

## Design Patterns

### 1. **Monolithic Architecture**
- Single codebase for frontend and backend
- Frontend built and served as static files from backend
- Simplified deployment and maintenance

**Advantages**:
- Simple deployment process
- Reduced infrastructure complexity
- Easy local development
- Single point of deployment

**Trade-offs**:
- Scaling requires scaling entire application
- Frontend and backend coupled in deployment

---

### 2. **MVC Pattern (Modified)**

```
┌──────────────┐
│    Routes    │  ← API endpoint definitions
└──────┬───────┘
       ↓
┌──────────────┐
│ Controllers  │  ← Request handling & validation
└──────┬───────┘
       ↓
┌──────────────┐
│   Services   │  ← Business logic (email, WhatsApp, gamification)
└──────┬───────┘
       ↓
┌──────────────┐
│    Models    │  ← Database queries & data access
└──────────────┘
```

**Implementation**:
- **Routes**: Defined in `server.js` (e.g., `app.post('/api/join', ...)`)
- **Controllers**: Inline in route handlers
- **Services**: Separate modules (`emailService.js`, `whatsappService.js`)
- **Models**: Database abstraction in `db.js`

---

### 3. **Repository Pattern**
Abstraction layer for database access:

```javascript
// db.js - Repository
export const query = (text, params) => pool.query(text, params);
export const getClient = () => pool.connect();

// Usage in routes
const result = await db.query('SELECT * FROM members');
```

**Benefits**:
- Decouples business logic from database implementation
- Easy to switch databases
- Centralized connection management

---

### 4. **Service Layer Pattern**
Business logic separated into dedicated service modules:

```javascript
// emailService.js
export const sendMealReminder = async (email, name, meal, ...) => {
  // Email sending logic
};

// whatsappService.js
export const sendMealReminderWhatsApp = async (phone, name, meal, ...) => {
  // WhatsApp sending logic
};
```

**Benefits**:
- Reusable business logic
- Testable in isolation
- Clear separation of concerns

---

### 5. **Scheduler Pattern**
Automated task execution with cron jobs:

```javascript
// reminderScheduler.js
cron.schedule('0 7 * * *', () => {
  checkAndSendReminders('HIIT', 'Breakfast', ...);
}, { timezone: "Asia/Kolkata" });
```

**Benefits**:
- Automated recurring tasks
- Timezone-aware scheduling
- Decoupled from request/response cycle

---

### 6. **Middleware Chain Pattern**
Request processing pipeline:

```javascript
app.use(cors());              // 1. Enable CORS
app.use(express.json());      // 2. Parse JSON bodies
app.use(express.static(...)); // 3. Serve static files
// Route handlers              // 4. Process requests
```

---

### 7. **Component-Based Architecture (Frontend)**
React components organized by feature:

```
src/components/
├── Hero3D.jsx          ← 3D hero section
├── Classes.jsx         ← Class listings
├── Membership.jsx      ← Membership plans
├── GamificationDashboard.jsx
├── AnalyticsDashboard.jsx
└── ...
```

**Benefits**:
- Reusable UI components
- Modular development
- Easy maintenance

---

### 8. **Context API Pattern (Frontend)**
Global state management for theme:

```javascript
// ThemeContext
const ThemeContext = createContext();

// Usage
const { theme, toggleTheme } = useContext(ThemeContext);
```

---

### 9. **Keep-Alive Pattern**
Self-ping mechanism to prevent server sleep:

```javascript
function startKeepAlive() {
  setInterval(async () => {
    await axios.get(`${url}/api/health`);
  }, 14 * 60 * 1000); // Every 14 minutes
}
```

**Purpose**: Keeps Render.com free tier service active

---

## Data Flow

### 1. User Registration Flow

```
User → Frontend Form → POST /api/join → Express Route Handler
                                              ↓
                                    Validate Input
                                              ↓
                                    db.query(INSERT INTO members)
                                              ↓
                                    PostgreSQL Database
                                              ↓
                                    Return Member ID
                                              ↓
                                    Response to Frontend
                                              ↓
                                    Update UI
```

---

### 2. Meal Reminder Subscription Flow

```
User → Subscribe Form → POST /api/subscribe-reminders
                                    ↓
                        Validate Email & Class Type
                                    ↓
                        db.query(INSERT/UPDATE diet_reminders)
                                    ↓
                        ┌───────────┴───────────┐
                        ↓                       ↓
            sendSubscriptionConfirmation   sendSubscriptionConfirmationWhatsApp
                        ↓                       ↓
                   Nodemailer              Twilio API
                        ↓                       ↓
                    Mailtrap               WhatsApp
                        ↓                       ↓
                    User Email            User Phone
```

---

### 3. Automated Meal Reminder Flow

```
Cron Schedule Trigger (e.g., 7:00 AM IST)
                ↓
    checkAndSendReminders('HIIT', 'Breakfast', ...)
                ↓
    db.query(SELECT * FROM diet_reminders WHERE class_type='HIIT')
                ↓
    For each subscriber:
        ├── sendMealReminder(email, ...) → Nodemailer → Mailtrap → Email
        └── sendMealReminderWhatsApp(phone, ...) → Twilio → WhatsApp
```

---

### 4. Gamification Check-In Flow

```
User → Check-In Button → POST /api/checkin
                                ↓
                    Get User Profile from DB
                                ↓
                    Calculate Points & Streak
                                ↓
                    Check for Achievements
                                ↓
                    Update user_profiles
                                ↓
                    Insert workout_logs
                                ↓
                    Insert user_achievements (if new)
                                ↓
                    Return updated stats
                                ↓
                    Update Frontend UI
```

---

### 5. Analytics Data Flow

```
User → Add Measurement → POST /api/analytics/measurement
                                    ↓
                        Insert into body_measurements
                                    ↓
                        Return success
                                    ↓
User → View Dashboard → GET /api/analytics/measurements/:userId
                                    ↓
                        Fetch all measurements
                                    ↓
                        Return data array
                                    ↓
                        Recharts renders charts
```

---

## Database Architecture

### Entity-Relationship Diagram

```
┌─────────────────┐
│    members      │
│─────────────────│
│ id (PK)         │
│ name            │
│ email (UNIQUE)  │
│ phone           │
│ goal            │
│ joined_at       │
└────────┬────────┘
         │ 1
         │
         │ N
┌────────┴────────┐
│  transactions   │
│─────────────────│
│ id (PK)         │
│ member_id (FK)  │
│ amount          │
│ type            │
│ date            │
└─────────────────┘

┌──────────────────────┐
│   diet_reminders     │
│──────────────────────│
│ id (PK)              │
│ email                │
│ name                 │
│ class_type           │
│ phone_number         │
│ whatsapp_enabled     │
│ active               │
│ created_at           │
│ UNIQUE(email, class) │
└──────────────────────┘

┌─────────────────┐
│ user_profiles   │
│─────────────────│
│ user_id (PK)    │
│ name            │
│ email           │
│ points          │
│ level           │
│ current_streak  │
│ longest_streak  │
│ total_workouts  │
│ last_checkin    │
└────────┬────────┘
         │ 1
         │
    ┌────┴────┬──────────────┐
    │ N       │ N            │
┌───┴──────┐ ┌┴──────────┐  │
│ workout_ │ │user_achie-│  │
│ logs     │ │vements    │  │
│──────────│ │───────────│  │
│ id (PK)  │ │ id (PK)   │  │
│ user_id  │ │ user_id   │  │
│ workout_ │ │ achieve_  │  │
│ type     │ │ ment_id   │  │
│ points_  │ │ unlocked_ │  │
│ earned   │ │ at        │  │
│ logged_at│ └───────┬───┘  │
└──────────┘         │ N    │
                     │      │
                     │ 1    │
              ┌──────┴──────┴──┐
              │  achievements  │
              │────────────────│
              │ id (PK)        │
              │ name           │
              │ description    │
              │ icon           │
              │ category       │
              └────────────────┘

┌─────────────────────┐
│ body_measurements   │
│─────────────────────│
│ id (PK)             │
│ user_id             │
│ weight              │
│ body_fat_percentage │
│ muscle_mass         │
│ measurement_date    │
│ created_at          │
└─────────────────────┘

┌─────────────────┐
│ fitness_goals   │
│─────────────────│
│ id (PK)         │
│ user_id         │
│ goal_type       │
│ title           │
│ description     │
│ target_value    │
│ current_value   │
│ start_date      │
│ target_date     │
│ status          │
│ completed_at    │
│ created_at      │
└─────────────────┘

┌──────────────────┐
│ workout_sessions │
│──────────────────│
│ id (PK)          │
│ user_id          │
│ exercise         │
│ duration         │
│ calories         │
│ workout_date     │
└──────────────────┘
```

### Database Initialization Strategy

```javascript
async function initDb() {
  // 1. Create tables if not exist
  await db.query('CREATE TABLE IF NOT EXISTS members ...');
  await db.query('CREATE TABLE IF NOT EXISTS transactions ...');
  // ... other tables
  
  // 2. Seed initial data (achievements)
  const count = await db.query('SELECT COUNT(*) FROM achievements');
  if (count === 0) {
    // Insert default achievements
  }
}
```

**Benefits**:
- Idempotent initialization
- Safe for repeated deployments
- Automatic schema creation

---

## Frontend Architecture

### Component Hierarchy

```
App.jsx
├── Router
│   ├── ScrollProgress
│   └── Layout
│       ├── Navbar
│       │   ├── Logo
│       │   └── ThemeToggle
│       ├── Routes
│       │   ├── Home
│       │   │   ├── Hero3D
│       │   │   ├── Classes
│       │   │   ├── Membership
│       │   │   └── About
│       │   ├── Classes (Detailed)
│       │   │   ├── ClassDetailsModal
│       │   │   └── DietReminderSubscription
│       │   ├── Membership
│       │   │   └── PaymentModal
│       │   ├── GamificationDashboard
│       │   │   ├── StatsCards
│       │   │   ├── WorkoutHeatmap
│       │   │   └── Achievements
│       │   ├── AnalyticsDashboard
│       │   │   ├── BodyMeasurements
│       │   │   ├── GoalTracker
│       │   │   ├── ProgressCharts
│       │   │   └── StatsCards
│       │   ├── MealReminders
│       │   │   └── DietChart
│       │   ├── WorkoutLogger
│       │   └── AdminDashboard
│       └── Footer
```

### State Management Strategy

**1. Local Component State**
```javascript
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({});
```
Used for: UI state, form inputs, modal visibility

**2. Context API (Global State)**
```javascript
const ThemeContext = createContext();
```
Used for: Theme (dark/light mode)

**3. Server State (via Axios)**
```javascript
const [data, setData] = useState([]);
useEffect(() => {
  axios.get('/api/members').then(res => setData(res.data.data));
}, []);
```
Used for: API data fetching and caching

### Routing Strategy

**Client-Side Routing**:
```javascript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/classes" element={<Classes />} />
  <Route path="/gamification" element={<GamificationDashboard />} />
  // ...
</Routes>
```

**Server-Side Catch-All**:
```javascript
app.get(/(.*)/, (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});
```

**Benefits**:
- SPA navigation without page reloads
- Deep linking support
- SEO-friendly with proper meta tags

---

## Backend Architecture

### Layered Architecture

```
┌─────────────────────────────────────┐
│        Presentation Layer           │
│  (Express Routes & Middleware)      │
└─────────────┬───────────────────────┘
              ↓
┌─────────────────────────────────────┐
│        Business Logic Layer         │
│  (Services: Email, WhatsApp, Cron)  │
└─────────────┬───────────────────────┘
              ↓
┌─────────────────────────────────────┐
│        Data Access Layer            │
│  (Database Queries via db.js)       │
└─────────────┬───────────────────────┘
              ↓
┌─────────────────────────────────────┐
│        Data Storage Layer           │
│  (PostgreSQL Database)              │
└─────────────────────────────────────┘
```

### Request Processing Pipeline

```
Incoming Request
      ↓
CORS Middleware (Allow all origins)
      ↓
Body Parser Middleware (Parse JSON)
      ↓
Route Matching
      ↓
Route Handler
      ├── Validate Input
      ├── Business Logic
      ├── Database Operations
      ├── External Service Calls
      └── Response Formation
      ↓
Send Response
```

### Error Handling Strategy

```javascript
try {
  // Database operation
  const result = await db.query(...);
  res.json({ message: 'success', data: result.rows });
} catch (err) {
  res.status(400).json({ error: err.message });
}
```

**Improvements Needed**:
- Centralized error handling middleware
- Error logging service
- Different error types (validation, database, external service)

---

## Integration Architecture

### Email Integration (Nodemailer + Mailtrap)

```
Application
    ↓
emailService.js
    ↓
Nodemailer Transporter
    ↓
SMTP Connection (Mailtrap)
    ↓
Email Delivery
```

**Configuration**:
- Host: `process.env.MAIL_HOST`
- Port: `process.env.MAIL_PORT`
- Auth: Username & Password from env

---

### WhatsApp Integration (Twilio)

```
Application
    ↓
whatsappService.js
    ↓
Twilio Client SDK
    ↓
Twilio API
    ↓
WhatsApp Business API
    ↓
User's WhatsApp
```

**Configuration**:
- Account SID: `process.env.TWILIO_ACCOUNT_SID`
- Auth Token: `process.env.TWILIO_AUTH_TOKEN`
- WhatsApp Number: `process.env.TWILIO_WHATSAPP_NUMBER`

**Phone Number Formatting**:
```javascript
const formatWhatsAppNumber = (phoneNumber) => {
  let cleaned = phoneNumber.replace(/[\s\-\(\)]/g, '');
  if (!cleaned.startsWith('+')) cleaned = '+' + cleaned;
  return `whatsapp:${cleaned}`;
};
```

---

## Deployment Architecture

### Render.com Deployment

```
GitHub Repository
      ↓
Push to main branch
      ↓
Render Webhook Trigger
      ↓
Build Process:
  1. npm install
  2. npm run build (Vite build)
      ↓
Start Process:
  node server.js
      ↓
Express Server Running
  ├── Serves static files from /dist
  ├── Exposes API endpoints
  ├── Initializes database
  ├── Starts cron scheduler
  └── Starts keep-alive ping
      ↓
Application Live
```

### Environment Configuration

**Development**:
```
DATABASE_URL=postgresql://localhost/gym_dev
NODE_ENV=development
PORT=3000
```

**Production (Render)**:
```
DATABASE_URL=<Render PostgreSQL URL>
NODE_ENV=production
PORT=3000
RENDER_EXTERNAL_URL=https://fit2fit-gym-api.onrender.com
```

---

## Security Architecture

### Current Security Measures

1. **SQL Injection Prevention**
   - Parameterized queries: `db.query('SELECT * FROM members WHERE id = $1', [id])`

2. **CORS Configuration**
   - Currently allows all origins (needs restriction in production)

3. **Environment Variables**
   - Sensitive data in `.env` file
   - Not committed to version control

4. **Database Connection**
   - SSL/TLS for production PostgreSQL
   - Connection pooling for efficiency

5. **Input Validation**
   - Basic validation in route handlers
   - Database constraints (UNIQUE, NOT NULL)

### Security Improvements Needed

1. **Authentication & Authorization**
   - Implement JWT-based authentication
   - Role-based access control (admin, user)

2. **Rate Limiting**
   - Prevent API abuse
   - DDoS protection

3. **Input Sanitization**
   - Validate and sanitize all user inputs
   - Use validation libraries (e.g., Joi, express-validator)

4. **HTTPS Only**
   - Enforce HTTPS in production
   - HSTS headers

5. **API Key Management**
   - Rotate Twilio and email credentials regularly
   - Use secret management service

6. **CORS Restriction**
   - Whitelist specific domains in production

7. **Logging & Monitoring**
   - Centralized logging (e.g., Winston)
   - Error tracking (e.g., Sentry)
   - Performance monitoring

---

## Scalability Considerations

### Current Limitations
- Single server instance
- No caching layer
- No load balancing
- Synchronous request processing

### Future Scalability Improvements

1. **Horizontal Scaling**
   - Multiple server instances behind load balancer
   - Stateless server design

2. **Caching Layer**
   - Redis for session storage
   - Cache frequently accessed data (leaderboard, achievements)

3. **Database Optimization**
   - Read replicas for analytics queries
   - Database indexing on frequently queried fields
   - Connection pooling optimization

4. **Asynchronous Processing**
   - Message queue (e.g., RabbitMQ, Redis Queue)
   - Background job processing for emails/WhatsApp

5. **CDN for Static Assets**
   - Serve frontend assets from CDN
   - Reduce server load

6. **Microservices Architecture**
   - Separate services for:
     - User management
     - Gamification
     - Analytics
     - Notifications (email/WhatsApp)

---

## Monitoring & Observability

### Current Monitoring
- Console logging
- Render dashboard metrics
- Health check endpoint (`/api/health`)

### Recommended Monitoring Stack

1. **Application Performance Monitoring (APM)**
   - New Relic, Datadog, or AppDynamics

2. **Error Tracking**
   - Sentry for error reporting

3. **Logging**
   - Winston for structured logging
   - Log aggregation (e.g., ELK stack, Datadog)

4. **Metrics**
   - Prometheus for metrics collection
   - Grafana for visualization

5. **Uptime Monitoring**
   - UptimeRobot or Pingdom
   - Alert on downtime

---

*Last Updated: November 28, 2025*
*Architecture Version: 1.0.0*
