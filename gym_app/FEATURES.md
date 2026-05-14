# Fit2Fit Gym - Feature Documentation

## Table of Contents
1. [Member Management](#member-management)
2. [Class Management](#class-management)
3. [Membership Plans](#membership-plans)
4. [Meal Reminders System](#meal-reminders-system)
5. [Gamification System](#gamification-system)
6. [Analytics Dashboard](#analytics-dashboard)
7. [Admin Dashboard](#admin-dashboard)
8. [3D Animations & UI](#3d-animations--ui)
9. [Theme System](#theme-system)

---

## Member Management

### Overview
Complete member registration and management system for tracking gym members.

### Features

#### 1. Member Registration (Join Now)
**Location**: Home page, Navbar

**Functionality**:
- Modal-based registration form
- Captures member information:
  - Full Name
  - Email Address
  - Phone Number
  - Fitness Goal
- Email validation
- Duplicate email prevention
- Automatic timestamp recording

**User Flow**:
```
User clicks "Join Now" → Modal opens → Fill form → Submit
→ API call to /api/join → Success message → Modal closes
```

**Technical Implementation**:
```javascript
// Frontend: JoinModal.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await axios.post('/api/join', formData);
  // Handle success/error
};

// Backend: server.js
app.post('/api/join', async (req, res) => {
  const { name, email, phone, goal } = req.body;
  await db.query('INSERT INTO members ...');
});
```

#### 2. Member Listing
**Location**: Admin Dashboard

**Functionality**:
- View all registered members
- Sorted by join date (newest first)
- Display member details:
  - Name, Email, Phone
  - Fitness Goal
  - Join Date

**Technical Implementation**:
```javascript
// API: GET /api/members
const result = await db.query('SELECT * FROM members ORDER BY joined_at DESC');
```

---

## Class Management

### Overview
Showcases gym classes with detailed information and diet plans.

### Available Classes

#### 1. HIIT (High-Intensity Interval Training)
**Description**: High-energy workouts for maximum calorie burn

**Schedule**:
- Monday, Wednesday, Friday
- 6:00 AM - 7:00 AM
- 6:00 PM - 7:00 PM

**Features**:
- Class details modal
- Diet plan specific to HIIT
- Meal reminder subscription

#### 2. Yoga
**Description**: Mind-body wellness and flexibility

**Schedule**:
- Tuesday, Thursday, Saturday
- 7:00 AM - 8:00 AM
- 5:00 PM - 6:00 PM

**Features**:
- Class details modal
- Yoga-specific diet plan
- Meal reminder subscription

#### 3. Strength Training
**Description**: Build muscle and increase strength

**Schedule**:
- Monday, Wednesday, Friday
- 5:00 PM - 6:00 PM
- 7:00 PM - 8:00 PM

**Features**:
- Class details modal
- Strength-specific diet plan
- Meal reminder subscription

### Class Features

#### Class Details Modal
**Functionality**:
- Detailed class information
- Schedule display
- Benefits list
- "Subscribe to Reminders" button

**Technical Implementation**:
```javascript
// ClassDetailsModal.jsx
<Modal>
  <ClassInfo />
  <Schedule />
  <Benefits />
  <SubscribeButton onClick={openDietReminder} />
</Modal>
```

#### Diet Plan Display
**Location**: Classes page, individual class sections

**Functionality**:
- Class-specific meal plans
- 6 meals per day
- Meal timing
- Detailed meal descriptions
- Indian cuisine focus

**Example (HIIT)**:
```javascript
{
  'Breakfast': { meal: 'Poha with peanuts, curry leaves & lemon', time: '7:00 AM' },
  'Mid-Morning': { meal: 'Fruit salad with flax seeds', time: '10:00 AM' },
  'Lunch': { meal: 'Brown rice, dal, mixed vegetable sabzi & curd', time: '1:00 PM' },
  'Pre-Workout': { meal: 'Banana & peanut butter toast', time: '4:30 PM' },
  'Post-Workout': { meal: 'Protein shake or boiled eggs', time: '6:30 PM' },
  'Dinner': { meal: 'Grilled chicken/paneer salad with soup', time: '8:30 PM' }
}
```

---

## Membership Plans

### Overview
Flexible membership options with payment tracking.

### Available Plans

#### 1. Monthly Plan
- **Price**: ₹5,000/month
- **Features**:
  - Access to all classes
  - Personal trainer consultation
  - Diet plan access
  - Locker facility

#### 2. Quarterly Plan
- **Price**: ₹13,500 (₹4,500/month)
- **Savings**: ₹1,500
- **Features**:
  - All Monthly features
  - 1 free personal training session
  - Progress tracking

#### 3. Annual Plan
- **Price**: ₹48,000 (₹4,000/month)
- **Savings**: ₹12,000
- **Features**:
  - All Quarterly features
  - 4 free personal training sessions
  - Priority class booking
  - Free gym merchandise

### Payment System

**Functionality**:
- Payment modal with member selection
- Amount and type specification
- Transaction recording
- Transaction history

**User Flow**:
```
Select Plan → Click "Choose Plan" → Payment Modal
→ Select Member → Confirm Payment → Record Transaction
```

**Technical Implementation**:
```javascript
// Frontend: PaymentModal.jsx
const handlePayment = async () => {
  await axios.post('/api/pay', {
    member_id: selectedMember,
    amount: planAmount,
    type: planType
  });
};

// Backend: server.js
app.post('/api/pay', async (req, res) => {
  const { member_id, amount, type } = req.body;
  await db.query('INSERT INTO transactions ...');
});
```

---

## Meal Reminders System

### Overview
Automated meal reminder system via Email and WhatsApp.

### Features

#### 1. Subscription Management

**Functionality**:
- Subscribe to class-specific meal reminders
- Email notifications (always enabled)
- Optional WhatsApp notifications
- Subscription status tracking
- Unsubscribe option

**Subscription Form**:
```javascript
{
  email: "user@example.com",
  name: "John Doe",
  class_type: "HIIT", // or "Yoga", "Strength"
  phone_number: "+919876543210", // optional
  whatsapp_enabled: true // optional
}
```

**User Flow**:
```
View Class → Click "Subscribe to Reminders" → Fill Form
→ Choose Email/WhatsApp → Submit → Confirmation Sent
→ Receive Scheduled Reminders
```

#### 2. Automated Scheduling

**Functionality**:
- Cron-based scheduling
- Timezone-aware (IST - Asia/Kolkata)
- Class-specific meal times
- Automatic delivery at scheduled times

**Schedule Example (HIIT)**:
```javascript
cron.schedule('0 7 * * *', () => sendBreakfastReminder(), { timezone: "Asia/Kolkata" });
cron.schedule('0 10 * * *', () => sendMidMorningReminder(), { timezone: "Asia/Kolkata" });
// ... more schedules
```

**Reminder Times**:
- **HIIT**: 7:00 AM, 10:00 AM, 1:00 PM, 4:30 PM, 6:30 PM, 8:30 PM
- **Yoga**: 7:30 AM, 10:30 AM, 1:00 PM, 4:00 PM, 7:00 PM, 8:30 PM
- **Strength**: 7:00 AM, 10:00 AM, 12:30 PM, 3:30 PM, 6:00 PM, 8:30 PM

#### 3. Email Reminders

**Features**:
- HTML email templates
- Responsive design
- Branded styling (Fit2Fit colors)
- Meal details with timing
- Quick tips
- Unsubscribe information

**Email Content**:
- Subject: "🍽️ Meal Reminder: [Meal Name] - [Time]"
- Personalized greeting
- Meal card with details
- Class badge
- Nutrition tips
- Link to full diet plan

#### 4. WhatsApp Reminders

**Features**:
- Text-based messages
- Emoji formatting
- Meal details
- Class-specific content
- Twilio integration

**Message Format**:
```
🍽️ *Meal Time Reminder - Fit2Fit Gym*

Hi John! ⏰

It's time for your *Breakfast*!

⏰ *Time:* 7:00 AM
📋 *Details:* Poha with peanuts, curry leaves & lemon
🏋️ *Plan:* HIIT Diet Plan

💡 *Quick Tip:* Stay consistent with your meal timing for best results.
```

#### 5. Manual Test Trigger

**Functionality**:
- Test reminders immediately
- Verify email/WhatsApp delivery
- Debug subscription issues

**API Endpoint**:
```javascript
POST /api/test-meal-reminder
{
  "email": "user@example.com",
  "class_type": "HIIT"
}
```

#### 6. Subscription Status Check

**Functionality**:
- Check if user is subscribed
- View subscription details
- Display in UI

**API Endpoint**:
```javascript
GET /api/reminder-status/:email/:classType
```

---

## Gamification System

### Overview
Comprehensive gamification system to motivate users with points, levels, streaks, and achievements.

### Features

#### 1. Points System

**Point Awards**:
- **Class Workout**: 15 points
- **Other Workout**: 10 points
- **7-Day Streak Bonus**: 50 points
- **30-Day Streak Bonus**: 200 points

**Level Calculation**:
```javascript
level = Math.floor(points / 100) + 1
```

**Examples**:
- 0-99 points → Level 1
- 100-199 points → Level 2
- 200-299 points → Level 3

#### 2. Streak System

**Functionality**:
- Tracks consecutive daily check-ins
- Resets if a day is missed
- Records longest streak ever achieved
- Bonus points for milestones

**Streak Logic**:
```javascript
if (daysSinceLastCheckin === 1) {
  newStreak = currentStreak + 1;
  if (newStreak === 7) bonusPoints = 50;
  if (newStreak === 30) bonusPoints = 200;
} else if (daysSinceLastCheckin > 1) {
  newStreak = 1; // Reset
}
```

#### 3. Achievements System

**Available Achievements**:

| Achievement | Description | Icon | Unlock Condition |
|-------------|-------------|------|------------------|
| First Step | Complete your first workout | 🎯 | 1st workout |
| Week Warrior | Maintain a 7-day streak | 🔥 | 7-day streak |
| Month Master | Maintain a 30-day streak | 👑 | 30-day streak |
| Class Champion | Complete 50 workouts | 💪 | 50 workouts |
| Century Club | Complete 100 workouts | 💯 | 100 workouts |

**Achievement Display**:
- Unlocked achievements shown in color
- Locked achievements shown in grayscale
- Unlock timestamp displayed
- Achievement categories (milestone, streak)

#### 4. Leaderboard

**Functionality**:
- Top 10 users by points
- Real-time ranking
- Display user stats:
  - Name
  - Points
  - Level
  - Current Streak
  - Total Workouts

**API Endpoint**:
```javascript
GET /api/leaderboard
// Returns top 10 users ordered by points DESC
```

#### 5. User Profile

**Displayed Information**:
- User name and email
- Total points
- Current level
- Current streak (with fire emoji if active)
- Longest streak ever
- Total workouts completed
- Last check-in date

#### 6. Workout Heatmap

**Functionality**:
- Calendar heatmap visualization
- Shows workout frequency
- Color intensity based on activity
- Powered by `react-calendar-heatmap`

**Data Source**:
```javascript
GET /api/profile/:userId
// Returns workout_logs for heatmap
```

#### 7. Check-In System

**User Flow**:
```
User → Gamification Dashboard → Click "Check In"
→ Enter User ID → Submit → Points Awarded
→ Streak Updated → Achievements Unlocked → UI Updated
```

**Technical Implementation**:
```javascript
POST /api/checkin
{
  "user_id": "user123",
  "name": "John Doe",
  "email": "john@example.com",
  "workout_type": "class"
}
```

---

## Analytics Dashboard

### Overview
Comprehensive fitness tracking and goal management system.

### Features

#### 1. Body Measurements Tracking

**Tracked Metrics**:
- Weight (kg)
- Body Fat Percentage (%)
- Muscle Mass (kg)
- Measurement Date

**Functionality**:
- Add new measurements
- View measurement history
- Progress charts (line graphs)
- Trend analysis

**User Flow**:
```
Analytics Dashboard → Body Measurements Tab
→ Add Measurement → Fill Form → Submit
→ View in Chart/Table
```

**Charts**:
- Weight over time (line chart)
- Body fat percentage trend
- Muscle mass progression

#### 2. Goal Tracking

**Goal Types**:
- Weight Loss
- Muscle Gain
- Body Fat Reduction
- Endurance Improvement
- Custom Goals

**Goal Properties**:
- Title and description
- Target value
- Current progress
- Start date
- Target date
- Status (in_progress, completed, abandoned)

**Functionality**:
- Create new goals
- Update progress
- Mark as completed
- Delete goals
- View all goals

**User Flow**:
```
Analytics Dashboard → Goals Tab → Create Goal
→ Fill Details → Set Target → Track Progress
→ Update Regularly → Complete Goal
```

**Progress Visualization**:
- Progress bars
- Percentage completion
- Days remaining
- Status badges

#### 3. Progress Charts

**Available Charts**:
- **Weight Trend**: Line chart showing weight over time
- **Body Composition**: Stacked area chart (fat vs muscle)
- **Goal Progress**: Bar chart of all active goals
- **Workout Frequency**: Bar chart of workouts per week

**Chart Library**: Recharts

**Features**:
- Interactive tooltips
- Responsive design
- Color-coded data
- Customizable time ranges

#### 4. Stats Cards

**Displayed Statistics**:
- Current Weight
- Body Fat Percentage
- Muscle Mass
- Active Goals Count
- Completed Goals Count
- Total Measurements Recorded

**Visual Design**:
- Card-based layout
- Icons for each metric
- Color-coded indicators
- Trend arrows (up/down)

#### 5. Workout Logger

**Functionality**:
- Log individual workout sessions
- Record exercise details:
  - Exercise name
  - Duration (minutes)
  - Calories burned
  - Date/time
- View workout history
- Filter by date range

**User Flow**:
```
Workout Logger → Select Exercise → Enter Duration
→ Enter Calories → Submit → View in History
```

---

## Admin Dashboard

### Overview
Administrative interface for managing members and viewing transactions.

### Features

#### 1. Member Management

**Functionality**:
- View all registered members
- Search/filter members
- View member details
- Member statistics

**Displayed Information**:
- Total members count
- Recent registrations
- Member list with details

#### 2. Transaction Management

**Functionality**:
- View all payment transactions
- Filter by date/type
- Transaction statistics
- Revenue tracking

**Displayed Information**:
- Total revenue
- Recent transactions
- Transaction history
- Payment types breakdown

#### 3. Dashboard Statistics

**Key Metrics**:
- Total Members
- Total Revenue
- Active Subscriptions (meal reminders)
- Recent Activity

---

## 3D Animations & UI

### Overview
Modern, interactive 3D graphics and smooth animations throughout the application.

### Features

#### 1. 3D Hero Section

**Technology**: Three.js + React Three Fiber

**Features**:
- Rotating 3D neon gyroscope
- Multiple rotating rings
- Particle effects
- Responsive to screen size
- Auto-rotation animation

**Implementation**:
```javascript
// Hero3D.jsx
<Canvas>
  <ambientLight />
  <pointLight />
  <RotatingRings />
  <ParticleField />
</Canvas>
```

#### 2. Scroll Animations

**Technology**: Framer Motion

**Features**:
- Fade-in on scroll
- Slide-up animations
- Stagger effects for lists
- Smooth transitions

**Implementation**:
```javascript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <Content />
</motion.div>
```

#### 3. Card Hover Effects

**Features**:
- 3D tilt on hover
- Scale transformations
- Shadow effects
- Smooth transitions

**Implementation**:
```javascript
<motion.div
  whileHover={{ scale: 1.05, rotateY: 5 }}
  transition={{ type: "spring" }}
>
  <Card />
</motion.div>
```

#### 4. Scroll Progress Indicator

**Functionality**:
- Top-of-page progress bar
- Shows scroll percentage
- Smooth animation
- Neon green color

---

## Theme System

### Overview
Dark/Light mode toggle with persistent preferences.

### Features

#### 1. Theme Toggle

**Functionality**:
- Toggle between dark and light modes
- Persistent across sessions (localStorage)
- Smooth transitions
- Icon changes (sun/moon)

**Implementation**:
```javascript
// ThemeContext
const [theme, setTheme] = useState(
  localStorage.getItem('theme') || 'dark'
);

const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
};
```

#### 2. Theme Styling

**Dark Mode**:
- Background: Black (#000000)
- Text: White (#FFFFFF)
- Accent: Neon Green (#39ff14)
- Cards: Dark gray (#1a1a1a)

**Light Mode**:
- Background: White (#FFFFFF)
- Text: Black (#000000)
- Accent: Dark Green (#2d8a0f)
- Cards: Light gray (#f8f9fa)

**Tailwind Implementation**:
```javascript
<div className="bg-white dark:bg-black text-black dark:text-white">
  <Content />
</div>
```

#### 3. Component Adaptation

**Features**:
- All components support both themes
- Automatic color adjustments
- Readable contrast in both modes
- Consistent branding

---

## Additional Features

### 1. Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interactions
- Optimized for all screen sizes

### 2. Loading States
- Skeleton loaders
- Spinner animations
- Progress indicators
- Smooth transitions

### 3. Error Handling
- User-friendly error messages
- Form validation
- API error handling
- Fallback UI

### 4. Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

---

*Last Updated: November 28, 2025*
*Feature Documentation Version: 1.0.0*
