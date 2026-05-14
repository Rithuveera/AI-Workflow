# Fit2Fit Gym - Development Setup Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup](#database-setup)
5. [Running the Application](#running-the-application)
6. [Development Workflow](#development-workflow)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

#### 1. Node.js
- **Version**: 18.x or higher (LTS recommended)
- **Download**: https://nodejs.org/

**Verify Installation**:
```bash
node --version
# Should output: v18.x.x or higher

npm --version
# Should output: 9.x.x or higher
```

#### 2. Git
- **Version**: Latest stable
- **Download**: https://git-scm.com/

**Verify Installation**:
```bash
git --version
# Should output: git version 2.x.x
```

#### 3. PostgreSQL (Optional for local development)
- **Version**: 14.x or higher
- **Download**: https://www.postgresql.org/download/

**Alternative**: Use SQLite3 (included in dependencies) or connect to Render PostgreSQL

**Verify Installation**:
```bash
psql --version
# Should output: psql (PostgreSQL) 14.x
```

#### 4. Code Editor
**Recommended**: Visual Studio Code
- **Download**: https://code.visualstudio.com/

**Recommended Extensions**:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

---

## Initial Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-username/gym_app.git

# Navigate to project directory
cd gym_app
```

### Step 2: Install Dependencies

```bash
# Install all dependencies (frontend + backend)
npm install
```

**This will install**:
- React and related libraries
- Express and backend dependencies
- Development tools (Vite, ESLint, etc.)
- All third-party integrations

**Expected Output**:
```
added 500+ packages in 30s
```

### Step 3: Verify Installation

```bash
# Check if node_modules exists
ls node_modules

# Verify package.json scripts
npm run
```

---

## Environment Configuration

### Step 1: Create Environment File

```bash
# Copy example environment file
cp .env.example .env
```

### Step 2: Configure Environment Variables

Edit `.env` file with your credentials:

```env
# ===================================
# DATABASE CONFIGURATION
# ===================================

# PostgreSQL (Production or Local)
DATABASE_URL=postgresql://username:password@localhost:5432/gym_app

# OR SQLite (Local Development Only)
# DATABASE_URL=sqlite:./gym.db

# ===================================
# EMAIL CONFIGURATION (Mailtrap)
# ===================================

MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password

# Get credentials from: https://mailtrap.io/

# ===================================
# WHATSAPP CONFIGURATION (Twilio)
# ===================================

TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# Get credentials from: https://www.twilio.com/console

# ===================================
# APPLICATION CONFIGURATION
# ===================================

NODE_ENV=development
PORT=3000

# ===================================
# OPTIONAL: NGROK (for public access)
# ===================================

# NGROK_AUTH_TOKEN=your_ngrok_token
```

---

## Database Setup

### Option 1: PostgreSQL (Recommended)

#### Step 1: Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE gym_app;

# Create user (optional)
CREATE USER gym_user WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE gym_app TO gym_user;

# Exit
\q
```

#### Step 2: Update DATABASE_URL

```env
DATABASE_URL=postgresql://gym_user:your_password@localhost:5432/gym_app
```

#### Step 3: Initialize Database

The database will be automatically initialized when you start the server. Tables will be created and achievements will be seeded.

---

### Option 2: SQLite (Simpler for Development)

#### Step 1: Update DATABASE_URL

```env
DATABASE_URL=sqlite:./gym.db
```

#### Step 2: Start Server

The SQLite database file will be created automatically when you start the server.

**Note**: SQLite is great for development but not recommended for production.

---

### Option 3: Render PostgreSQL (Cloud)

#### Step 1: Create Render Database

1. Go to https://render.com/
2. Click "New +" → "PostgreSQL"
3. Configure and create database

#### Step 2: Copy Connection String

1. Navigate to database dashboard
2. Copy "Internal Database URL"
3. Paste into `.env`

```env
DATABASE_URL=postgresql://user:pass@host/database
```

---

## Running the Application

### Development Mode (Recommended)

#### Option 1: Run Frontend and Backend Separately

**Terminal 1 - Backend Server**:
```bash
npm run server
```

**Expected Output**:
```
Server running on port 3000
Starting Fit2Fit Server with PostgreSQL...
Initializing Database...
Database initialized successfully.
Initializing Meal Reminder Scheduler (IST Timezone)...
✅ All meal reminders scheduled successfully.
Starting Keep-Alive ping...
```

**Terminal 2 - Frontend Dev Server**:
```bash
npm run dev
```

**Expected Output**:
```
VITE v7.2.2  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h to show help
```

**Access Application**:
- Frontend: http://localhost:5173/
- Backend API: http://localhost:3000/api/

---

#### Option 2: Run Concurrently (Single Command)

**Install concurrently** (if not already installed):
```bash
npm install concurrently --save-dev
```

**Add script to package.json**:
```json
{
  "scripts": {
    "dev:full": "concurrently \"npm run dev\" \"npm run server\""
  }
}
```

**Run**:
```bash
npm run dev:full
```

---

### Production Mode (Testing)

#### Step 1: Build Frontend

```bash
npm run build
```

**Expected Output**:
```
vite v7.2.2 building for production...
✓ 150 modules transformed.
dist/index.html                   0.61 kB
dist/assets/index-abc123.css     15.23 kB
dist/assets/index-xyz789.js     250.45 kB
✓ built in 5.23s
```

#### Step 2: Start Server

```bash
npm start
```

**Expected Output**:
```
Server running on port 3000
Starting Fit2Fit Server with PostgreSQL...
```

**Access Application**:
- Application: http://localhost:3000/
- API: http://localhost:3000/api/

**Note**: In production mode, the Express server serves both the built frontend and API.

---

## Development Workflow

### Project Structure

```
gym_app/
├── src/                      # Frontend source code
│   ├── components/           # React components
│   │   ├── Hero3D.jsx
│   │   ├── Classes.jsx
│   │   ├── Membership.jsx
│   │   ├── GamificationDashboard.jsx
│   │   ├── AnalyticsDashboardNew.jsx
│   │   └── ...
│   ├── context/              # React Context (Theme)
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── dist/                     # Build output (generated)
├── server.js                 # Express server
├── db.js                     # Database configuration
├── emailService.js           # Email integration
├── whatsappService.js        # WhatsApp integration
├── reminderScheduler.js      # Cron scheduler
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
└── .env                      # Environment variables
```

---

### Making Changes

#### Frontend Changes

1. **Edit React Components**:
   ```bash
   # Components are in src/components/
   code src/components/Classes.jsx
   ```

2. **Hot Reload**:
   - Vite automatically reloads on file changes
   - No need to restart dev server

3. **Add New Routes**:
   ```javascript
   // src/App.jsx
   <Route path="/new-page" element={<NewPage />} />
   ```

4. **Styling**:
   - Use Tailwind CSS classes
   - Global styles in `src/index.css`
   - Component-specific styles inline

---

#### Backend Changes

1. **Edit Server Code**:
   ```bash
   code server.js
   ```

2. **Restart Server**:
   - Manual restart required (Ctrl+C, then `npm run server`)
   - Or use nodemon for auto-restart:
   ```bash
   npm install nodemon --save-dev
   # Update package.json script:
   "server": "nodemon server.js"
   ```

3. **Add New API Endpoints**:
   ```javascript
   // server.js
   app.get('/api/new-endpoint', async (req, res) => {
     // Handler logic
   });
   ```

4. **Database Changes**:
   ```javascript
   // Add new table in initDb()
   await db.query('CREATE TABLE IF NOT EXISTS new_table ...');
   ```

---

### Code Quality

#### Linting

```bash
# Run ESLint
npm run lint

# Auto-fix issues
npm run lint -- --fix
```

#### Code Formatting

**Install Prettier** (optional):
```bash
npm install prettier --save-dev
```

**Format code**:
```bash
npx prettier --write "src/**/*.{js,jsx}"
```

---

## Testing

### Manual Testing

#### 1. Test Member Registration

1. Navigate to home page
2. Click "Join Now"
3. Fill form with test data
4. Submit and verify success message
5. Check database:
   ```sql
   SELECT * FROM members ORDER BY joined_at DESC LIMIT 5;
   ```

#### 2. Test Meal Reminders

**Subscribe**:
1. Go to Classes page
2. Click on a class
3. Click "Subscribe to Reminders"
4. Fill form and submit

**Test Immediate Delivery**:
```bash
# Use API testing tool (Postman, curl, etc.)
curl -X POST http://localhost:3000/api/test-meal-reminder \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","class_type":"HIIT"}'
```

**Check Email**:
- Log in to Mailtrap inbox
- Verify email received

**Check WhatsApp**:
- Ensure you've joined Twilio sandbox
- Check WhatsApp for message

#### 3. Test Gamification

1. Go to Gamification Dashboard
2. Click "Check In"
3. Enter user ID (e.g., "test123")
4. Submit and verify:
   - Points awarded
   - Streak updated
   - Achievements unlocked

#### 4. Test Analytics

1. Go to Analytics Dashboard
2. Add body measurement
3. Create fitness goal
4. Verify charts update

---

### API Testing

**Using curl**:

```bash
# Get all members
curl http://localhost:3000/api/members

# Create member
curl -X POST http://localhost:3000/api/join \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"+919876543210","goal":"Weight Loss"}'

# Check-in
curl -X POST http://localhost:3000/api/checkin \
  -H "Content-Type: application/json" \
  -d '{"user_id":"test123","name":"Test User","workout_type":"class"}'
```

**Using Postman**:
1. Import API endpoints
2. Set base URL: `http://localhost:3000`
3. Test each endpoint

---

### Database Testing

**PostgreSQL**:
```bash
# Connect to database
psql -U gym_user -d gym_app

# View tables
\dt

# Query members
SELECT * FROM members;

# Query diet reminders
SELECT * FROM diet_reminders WHERE active = true;

# Exit
\q
```

**SQLite**:
```bash
# Open database
sqlite3 gym.db

# View tables
.tables

# Query members
SELECT * FROM members;

# Exit
.quit
```

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error**:
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution**:
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (Windows)
taskkill /PID <process_id> /F

# Or change port in .env
PORT=3001
```

---

#### 2. Database Connection Error

**Error**:
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution**:
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env`
- Ensure database exists
- Check credentials

```bash
# Start PostgreSQL (Windows)
net start postgresql-x64-14

# Start PostgreSQL (Mac)
brew services start postgresql

# Start PostgreSQL (Linux)
sudo systemctl start postgresql
```

---

#### 3. Module Not Found

**Error**:
```
Error: Cannot find module 'express'
```

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

#### 4. Vite Build Fails

**Error**:
```
Error: Build failed with errors
```

**Solution**:
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Rebuild
npm run build
```

---

#### 5. Email Not Sending

**Error**:
```
Error: Invalid login: 535 Authentication failed
```

**Solution**:
- Verify Mailtrap credentials in `.env`
- Check MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD
- Log in to Mailtrap to verify account is active

---

#### 6. WhatsApp Not Sending

**Error**:
```
Error: User has not joined the sandbox
```

**Solution**:
1. Send WhatsApp message to: `+1 415 523 8886`
2. Message content: `join <your-sandbox-code>`
3. Wait for confirmation
4. Retry sending

---

#### 7. Cron Jobs Not Running

**Issue**: Meal reminders not being sent at scheduled times

**Solution**:
- Verify server is running continuously
- Check console for scheduler initialization message
- Verify timezone setting in `reminderScheduler.js`
- Test with manual trigger endpoint

---

### Debug Mode

**Enable Verbose Logging**:

```javascript
// server.js - Add at top
console.log('Environment:', process.env.NODE_ENV);
console.log('Database URL:', process.env.DATABASE_URL?.substring(0, 20) + '...');
console.log('Port:', process.env.PORT);

// Add logging to routes
app.post('/api/join', async (req, res) => {
  console.log('Join request:', req.body);
  // ... rest of handler
});
```

---

### Getting Help

#### 1. Check Documentation
- README.md
- API-DOCUMENTATION.md
- ARCHITECTURE.md
- FEATURES.md

#### 2. Check Logs
- Server console output
- Browser console (F12)
- Database logs

#### 3. Search Issues
- Check existing GitHub issues
- Search Stack Overflow
- Check library documentation

#### 4. Create Issue
- Provide error message
- Include steps to reproduce
- Share relevant code snippets
- Mention environment (OS, Node version, etc.)

---

## Next Steps

### After Setup

1. **Explore the Application**:
   - Browse all pages
   - Test all features
   - Understand data flow

2. **Read Documentation**:
   - API Documentation
   - Architecture Documentation
   - Feature Documentation

3. **Make Your First Change**:
   - Update a component
   - Add a new feature
   - Fix a bug

4. **Deploy to Production**:
   - Follow DEPLOY-TO-RENDER.md
   - Set up environment variables
   - Test production build

---

## Development Best Practices

### 1. Version Control
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature
```

### 2. Environment Variables
- Never commit `.env` file
- Use `.env.example` as template
- Document all required variables

### 3. Code Organization
- Keep components small and focused
- Use meaningful variable names
- Add comments for complex logic
- Follow existing code style

### 4. Testing
- Test locally before pushing
- Test all affected features
- Verify database changes
- Check API responses

### 5. Documentation
- Update README for new features
- Document API changes
- Add inline comments
- Update architecture docs

---

*Last Updated: November 28, 2025*
*Development Guide Version: 1.0.0*
