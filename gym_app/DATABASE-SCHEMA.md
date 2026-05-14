# Fit2Fit Gym - Database Schema Documentation

## Overview
The Fit2Fit Gym application uses **PostgreSQL** as its primary database in production and supports **SQLite3** for local development. The database schema is designed to support member management, transactions, meal reminders, gamification, and analytics features.

---

## Database Configuration

### Connection Setup

**Production (PostgreSQL)**:
```javascript
const connectionConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
};
```

**Development (PostgreSQL/SQLite)**:
```javascript
const connectionConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: false
};
```

### Connection Pooling
```javascript
const pool = new Pool(connectionConfig);
```

---

## Database Tables

### 1. Members Table

**Purpose**: Stores gym member information

```sql
CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    goal VARCHAR(255),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing member ID |
| name | VARCHAR(255) | NOT NULL | Member's full name |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Member's email address |
| phone | VARCHAR(50) | - | Member's phone number |
| goal | VARCHAR(255) | - | Member's fitness goal |
| joined_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Registration timestamp |

**Indexes**:
- Primary key index on `id`
- Unique index on `email`

**Sample Data**:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "goal": "Weight Loss",
  "joined_at": "2025-11-20T10:30:00.000Z"
}
```

---

### 2. Transactions Table

**Purpose**: Records all payment transactions

```sql
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    member_id INTEGER REFERENCES members(id),
    amount DECIMAL(10, 2) NOT NULL,
    type VARCHAR(50) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing transaction ID |
| member_id | INTEGER | FOREIGN KEY → members(id) | Reference to member |
| amount | DECIMAL(10, 2) | NOT NULL | Transaction amount |
| type | VARCHAR(50) | NOT NULL | Transaction type/description |
| date | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Transaction timestamp |

**Relationships**:
- `member_id` → `members.id` (Many-to-One)

**Sample Data**:
```json
{
  "id": 1,
  "member_id": 1,
  "amount": 5000.00,
  "type": "Monthly Membership",
  "date": "2025-11-20T10:30:00.000Z"
}
```

---

### 3. Diet Reminders Table

**Purpose**: Manages meal reminder subscriptions

```sql
CREATE TABLE IF NOT EXISTS diet_reminders (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    class_type VARCHAR(50) NOT NULL,
    phone_number VARCHAR(50),
    whatsapp_enabled BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(email, class_type)
);
```

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing reminder ID |
| email | VARCHAR(255) | NOT NULL | Subscriber's email |
| name | VARCHAR(255) | - | Subscriber's name |
| class_type | VARCHAR(50) | NOT NULL | Class type (HIIT, Yoga, Strength) |
| phone_number | VARCHAR(50) | - | Phone number for WhatsApp |
| whatsapp_enabled | BOOLEAN | DEFAULT FALSE | WhatsApp notification preference |
| active | BOOLEAN | DEFAULT TRUE | Subscription status |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Subscription timestamp |

**Constraints**:
- `UNIQUE(email, class_type)` - One subscription per email per class type

**Valid Class Types**:
- `HIIT`
- `Yoga`
- `Strength`

**Sample Data**:
```json
{
  "id": 1,
  "email": "john@example.com",
  "name": "John Doe",
  "class_type": "HIIT",
  "phone_number": "+919876543210",
  "whatsapp_enabled": true,
  "active": true,
  "created_at": "2025-11-20T10:30:00.000Z"
}
```

---

### 4. User Profiles Table (Gamification)

**Purpose**: Stores user gamification data

```sql
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    points INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    total_workouts INTEGER DEFAULT 0,
    last_checkin DATE
);
```

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| user_id | VARCHAR(255) | PRIMARY KEY | Unique user identifier |
| name | VARCHAR(255) | - | User's name |
| email | VARCHAR(255) | - | User's email |
| points | INTEGER | DEFAULT 0 | Total points earned |
| level | INTEGER | DEFAULT 1 | Current level (points ÷ 100 + 1) |
| current_streak | INTEGER | DEFAULT 0 | Current consecutive check-in days |
| longest_streak | INTEGER | DEFAULT 0 | Longest streak ever achieved |
| total_workouts | INTEGER | DEFAULT 0 | Total workouts completed |
| last_checkin | DATE | - | Last check-in date |

**Business Logic**:
- **Level Calculation**: `level = floor(points / 100) + 1`
- **Streak Calculation**: 
  - Consecutive daily check-ins increase streak
  - Missing a day resets streak to 1
- **Points**:
  - Class workout: 15 points
  - Other workout: 10 points
  - 7-day streak bonus: 50 points
  - 30-day streak bonus: 200 points

**Sample Data**:
```json
{
  "user_id": "user123",
  "name": "John Doe",
  "email": "john@example.com",
  "points": 350,
  "level": 4,
  "current_streak": 7,
  "longest_streak": 15,
  "total_workouts": 35,
  "last_checkin": "2025-11-28"
}
```

---

### 5. Workout Logs Table

**Purpose**: Records individual workout check-ins

```sql
CREATE TABLE IF NOT EXISTS workout_logs (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES user_profiles(user_id),
    workout_type VARCHAR(50),
    points_earned INTEGER,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing log ID |
| user_id | VARCHAR(255) | FOREIGN KEY → user_profiles(user_id) | User reference |
| workout_type | VARCHAR(50) | - | Type of workout |
| points_earned | INTEGER | - | Points earned for this workout |
| logged_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Workout timestamp |

**Relationships**:
- `user_id` → `user_profiles.user_id` (Many-to-One)

**Sample Data**:
```json
{
  "id": 1,
  "user_id": "user123",
  "workout_type": "class",
  "points_earned": 15,
  "logged_at": "2025-11-28T10:30:00.000Z"
}
```

---

### 6. Achievements Table

**Purpose**: Defines available achievements

```sql
CREATE TABLE IF NOT EXISTS achievements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    category VARCHAR(50)
);
```

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing achievement ID |
| name | VARCHAR(255) | NOT NULL | Achievement name |
| description | TEXT | - | Achievement description |
| icon | VARCHAR(50) | - | Emoji or icon representation |
| category | VARCHAR(50) | - | Achievement category |

**Seeded Achievements**:
```javascript
[
  { name: 'First Step', description: 'Complete your first workout', icon: '🎯', category: 'milestone' },
  { name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', category: 'streak' },
  { name: 'Month Master', description: 'Maintain a 30-day streak', icon: '👑', category: 'streak' },
  { name: 'Class Champion', description: 'Complete 50 workouts', icon: '💪', category: 'milestone' },
  { name: 'Century Club', description: 'Complete 100 workouts', icon: '💯', category: 'milestone' }
]
```

**Categories**:
- `milestone` - Workout count milestones
- `streak` - Consecutive day achievements

---

### 7. User Achievements Table

**Purpose**: Tracks which achievements users have unlocked

```sql
CREATE TABLE IF NOT EXISTS user_achievements (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES user_profiles(user_id),
    achievement_id INTEGER REFERENCES achievements(id),
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, achievement_id)
);
```

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing record ID |
| user_id | VARCHAR(255) | FOREIGN KEY → user_profiles(user_id) | User reference |
| achievement_id | INTEGER | FOREIGN KEY → achievements(id) | Achievement reference |
| unlocked_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Unlock timestamp |

**Constraints**:
- `UNIQUE(user_id, achievement_id)` - Each achievement unlocked once per user

**Relationships**:
- `user_id` → `user_profiles.user_id` (Many-to-One)
- `achievement_id` → `achievements.id` (Many-to-One)

**Sample Data**:
```json
{
  "id": 1,
  "user_id": "user123",
  "achievement_id": 1,
  "unlocked_at": "2025-11-20T10:30:00.000Z"
}
```

---

### 8. Body Measurements Table

**Purpose**: Tracks user body measurements over time

```sql
CREATE TABLE IF NOT EXISTS body_measurements (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    weight DECIMAL(5,2),
    body_fat_percentage DECIMAL(4,1),
    muscle_mass DECIMAL(5,2),
    measurement_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing measurement ID |
| user_id | VARCHAR(255) | NOT NULL | User identifier |
| weight | DECIMAL(5,2) | - | Weight in kg (e.g., 75.50) |
| body_fat_percentage | DECIMAL(4,1) | - | Body fat % (e.g., 18.5) |
| muscle_mass | DECIMAL(5,2) | - | Muscle mass in kg |
| measurement_date | DATE | DEFAULT CURRENT_DATE | Date of measurement |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |

**Sample Data**:
```json
{
  "id": 1,
  "user_id": "user123",
  "weight": 75.50,
  "body_fat_percentage": 18.5,
  "muscle_mass": 45.20,
  "measurement_date": "2025-11-28",
  "created_at": "2025-11-28T10:30:00.000Z"
}
```

---

### 9. Fitness Goals Table

**Purpose**: Manages user fitness goals and progress

```sql
CREATE TABLE IF NOT EXISTS fitness_goals (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    goal_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    target_value DECIMAL(10,2),
    current_value DECIMAL(10,2) DEFAULT 0,
    start_date DATE DEFAULT CURRENT_DATE,
    target_date DATE,
    status VARCHAR(20) DEFAULT 'in_progress',
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing goal ID |
| user_id | VARCHAR(255) | NOT NULL | User identifier |
| goal_type | VARCHAR(50) | NOT NULL | Type of goal |
| title | VARCHAR(255) | NOT NULL | Goal title |
| description | TEXT | - | Detailed description |
| target_value | DECIMAL(10,2) | - | Target numeric value |
| current_value | DECIMAL(10,2) | DEFAULT 0 | Current progress value |
| start_date | DATE | DEFAULT CURRENT_DATE | Goal start date |
| target_date | DATE | - | Target completion date |
| status | VARCHAR(20) | DEFAULT 'in_progress' | Goal status |
| completed_at | TIMESTAMP | - | Completion timestamp |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

**Valid Statuses**:
- `in_progress` - Goal is active
- `completed` - Goal achieved
- `abandoned` - Goal discontinued

**Sample Data**:
```json
{
  "id": 1,
  "user_id": "user123",
  "goal_type": "weight_loss",
  "title": "Lose 10kg",
  "description": "Reduce weight from 85kg to 75kg",
  "target_value": 75.00,
  "current_value": 80.00,
  "start_date": "2025-11-01",
  "target_date": "2026-03-01",
  "status": "in_progress",
  "completed_at": null,
  "created_at": "2025-11-01T10:30:00.000Z"
}
```

---

### 10. Workout Sessions Table

**Purpose**: Records detailed workout session data

```sql
CREATE TABLE IF NOT EXISTS workout_sessions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    exercise VARCHAR(255) NOT NULL,
    duration INTEGER,
    calories INTEGER,
    workout_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing session ID |
| user_id | VARCHAR(255) | NOT NULL | User identifier |
| exercise | VARCHAR(255) | NOT NULL | Exercise name |
| duration | INTEGER | - | Duration in minutes |
| calories | INTEGER | - | Calories burned |
| workout_date | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Workout timestamp |

**Sample Data**:
```json
{
  "id": 1,
  "user_id": "user123",
  "exercise": "Running",
  "duration": 30,
  "calories": 250,
  "workout_date": "2025-11-28T10:30:00.000Z"
}
```

---

## Entity Relationships

### Relationship Summary

```
members (1) ──────< (N) transactions
user_profiles (1) ──────< (N) workout_logs
user_profiles (1) ──────< (N) user_achievements
achievements (1) ──────< (N) user_achievements
```

**Independent Tables** (no foreign key relationships):
- `diet_reminders`
- `body_measurements`
- `fitness_goals`
- `workout_sessions`

---

## Indexes

### Existing Indexes
1. **Primary Keys**: Automatic indexes on all `id` and `user_id` primary keys
2. **Unique Constraints**: 
   - `members.email`
   - `diet_reminders(email, class_type)`
   - `user_achievements(user_id, achievement_id)`

### Recommended Additional Indexes

```sql
-- For faster member lookups
CREATE INDEX idx_members_email ON members(email);

-- For faster transaction queries
CREATE INDEX idx_transactions_member_id ON transactions(member_id);
CREATE INDEX idx_transactions_date ON transactions(date DESC);

-- For reminder queries
CREATE INDEX idx_diet_reminders_class_active ON diet_reminders(class_type, active);

-- For gamification queries
CREATE INDEX idx_workout_logs_user_id ON workout_logs(user_id);
CREATE INDEX idx_user_profiles_points ON user_profiles(points DESC);

-- For analytics queries
CREATE INDEX idx_body_measurements_user_date ON body_measurements(user_id, measurement_date DESC);
CREATE INDEX idx_fitness_goals_user_status ON fitness_goals(user_id, status);
CREATE INDEX idx_workout_sessions_user_date ON workout_sessions(user_id, workout_date DESC);
```

---

## Database Initialization

### Initialization Process

The database is automatically initialized when the server starts:

```javascript
async function initDb() {
    // 1. Create all tables
    await db.query('CREATE TABLE IF NOT EXISTS members ...');
    await db.query('CREATE TABLE IF NOT EXISTS transactions ...');
    // ... (all other tables)
    
    // 2. Seed achievements if empty
    const achievementsCount = await db.query('SELECT COUNT(*) FROM achievements');
    if (parseInt(achievementsCount.rows[0].count) === 0) {
        // Insert default achievements
    }
}

// Called on server start
app.listen(PORT, () => {
    initDb();
    // ...
});
```

**Benefits**:
- Idempotent (safe to run multiple times)
- Automatic schema creation
- Seeded with default data

---

## Data Integrity

### Constraints

1. **NOT NULL Constraints**:
   - Essential fields like `name`, `email`, `amount`, `class_type`

2. **UNIQUE Constraints**:
   - `members.email` - Prevent duplicate registrations
   - `diet_reminders(email, class_type)` - One subscription per class per user
   - `user_achievements(user_id, achievement_id)` - Unlock achievement once

3. **FOREIGN KEY Constraints**:
   - `transactions.member_id` → `members.id`
   - `workout_logs.user_id` → `user_profiles.user_id`
   - `user_achievements.user_id` → `user_profiles.user_id`
   - `user_achievements.achievement_id` → `achievements.id`

4. **DEFAULT Values**:
   - Timestamps default to `CURRENT_TIMESTAMP`
   - Boolean flags default to appropriate values
   - Numeric counters default to 0

---

## Backup & Recovery

### Recommended Backup Strategy

1. **Automated Daily Backups**
   - Render.com provides automatic backups for PostgreSQL

2. **Manual Backup Command**:
```bash
pg_dump -h <host> -U <user> -d <database> > backup.sql
```

3. **Restore Command**:
```bash
psql -h <host> -U <user> -d <database> < backup.sql
```

---

## Migration Strategy

### Current Approach
- Schema created via `CREATE TABLE IF NOT EXISTS`
- No formal migration system

### Recommended Migration Tools
- **node-pg-migrate** - PostgreSQL migration tool
- **Knex.js** - Query builder with migrations
- **Sequelize** - ORM with migration support

---

## Performance Optimization

### Query Optimization Tips

1. **Use Parameterized Queries**:
```javascript
// Good
await db.query('SELECT * FROM members WHERE id = $1', [id]);

// Bad (SQL injection risk)
await db.query(`SELECT * FROM members WHERE id = ${id}`);
```

2. **Limit Result Sets**:
```javascript
await db.query('SELECT * FROM members ORDER BY joined_at DESC LIMIT 100');
```

3. **Use Indexes** on frequently queried columns

4. **Connection Pooling** (already implemented):
```javascript
const pool = new Pool(connectionConfig);
```

---

## Data Privacy & Compliance

### Sensitive Data
- **Email addresses**: Used for reminders and identification
- **Phone numbers**: Used for WhatsApp notifications
- **Personal information**: Names, fitness goals

### Recommendations
1. **Encryption at Rest**: Enable database encryption
2. **Encryption in Transit**: Use SSL/TLS (already enabled in production)
3. **GDPR Compliance**: Implement data deletion endpoints
4. **Data Retention Policy**: Define how long to keep inactive user data

---

*Last Updated: November 28, 2025*
*Schema Version: 1.0.0*
