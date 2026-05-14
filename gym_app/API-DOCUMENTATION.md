# Fit2Fit Gym - API Documentation

## Base URL
- **Production**: `https://fit2fit-gym-api.onrender.com`
- **Development**: `http://localhost:3000`

## Response Format
All API responses follow this standard format:

### Success Response
```json
{
  "message": "success",
  "data": { ... }
}
```

### Error Response
```json
{
  "error": "Error message description"
}
```

---

## API Endpoints

### 1. Members Management

#### Get All Members
```http
GET /api/members
```

**Description**: Retrieves all gym members ordered by join date (newest first)

**Response**:
```json
{
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+919876543210",
      "goal": "Weight Loss",
      "joined_at": "2025-11-20T10:30:00.000Z"
    }
  ]
}
```

**Status Codes**:
- `200 OK` - Success
- `400 Bad Request` - Database error

---

#### Join Gym (Create Member)
```http
POST /api/join
```

**Description**: Registers a new member to the gym

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "goal": "Weight Loss"
}
```

**Response**:
```json
{
  "message": "success",
  "data": {
    "id": 1
  }
}
```

**Status Codes**:
- `200 OK` - Member created successfully
- `400 Bad Request` - Validation error or duplicate email

---

### 2. Transactions & Payments

#### Get All Transactions
```http
GET /api/transactions
```

**Description**: Retrieves all payment transactions ordered by date (newest first)

**Response**:
```json
{
  "message": "success",
  "data": [
    {
      "id": 1,
      "member_id": 1,
      "amount": 5000.00,
      "type": "Monthly Membership",
      "date": "2025-11-20T10:30:00.000Z"
    }
  ]
}
```

**Status Codes**:
- `200 OK` - Success
- `400 Bad Request` - Database error

---

#### Create Payment Transaction
```http
POST /api/pay
```

**Description**: Records a new payment transaction

**Request Body**:
```json
{
  "member_id": 1,
  "amount": 5000.00,
  "type": "Monthly Membership"
}
```

**Response**:
```json
{
  "message": "success",
  "data": {
    "id": 1
  }
}
```

**Status Codes**:
- `200 OK` - Transaction recorded
- `400 Bad Request` - Invalid data

---

### 3. Meal Reminders

#### Subscribe to Meal Reminders
```http
POST /api/subscribe-reminders
```

**Description**: Subscribes a user to automated meal reminders for a specific class type

**Request Body**:
```json
{
  "email": "john@example.com",
  "name": "John Doe",
  "class_type": "HIIT",
  "phone_number": "+919876543210",
  "whatsapp_enabled": true
}
```

**Parameters**:
- `email` (required) - User's email address
- `name` (optional) - User's name
- `class_type` (required) - One of: "HIIT", "Yoga", "Strength"
- `phone_number` (optional) - Phone number for WhatsApp (required if whatsapp_enabled is true)
- `whatsapp_enabled` (optional) - Boolean, default: false

**Response**:
```json
{
  "message": "success",
  "data": {
    "id": 1,
    "subscribed": true
  }
}
```

**Status Codes**:
- `200 OK` - Subscription successful
- `400 Bad Request` - Missing required fields

**Side Effects**:
- Sends confirmation email
- Sends WhatsApp confirmation (if enabled)

---

#### Get Reminder Subscription Status
```http
GET /api/reminder-status/:email/:classType
```

**Description**: Checks if a user is subscribed to reminders for a specific class

**URL Parameters**:
- `email` - User's email address
- `classType` - Class type (HIIT, Yoga, Strength)

**Example**:
```http
GET /api/reminder-status/john@example.com/HIIT
```

**Response**:
```json
{
  "message": "success",
  "data": {
    "subscribed": true,
    "subscription": {
      "id": 1,
      "email": "john@example.com",
      "name": "John Doe",
      "class_type": "HIIT",
      "phone_number": "+919876543210",
      "whatsapp_enabled": true,
      "active": true,
      "created_at": "2025-11-20T10:30:00.000Z"
    }
  }
}
```

**Status Codes**:
- `200 OK` - Success
- `400 Bad Request` - Database error

---

#### Unsubscribe from Meal Reminders
```http
POST /api/unsubscribe-reminders
```

**Description**: Unsubscribes a user from meal reminders

**Request Body**:
```json
{
  "email": "john@example.com",
  "class_type": "HIIT"
}
```

**Response**:
```json
{
  "message": "success",
  "data": {
    "unsubscribed": true
  }
}
```

**Status Codes**:
- `200 OK` - Unsubscribed successfully
- `400 Bad Request` - Missing required fields

---

#### Test Meal Reminder (Manual Trigger)
```http
POST /api/test-meal-reminder
```

**Description**: Manually triggers a test meal reminder for immediate delivery

**Request Body**:
```json
{
  "email": "john@example.com",
  "class_type": "HIIT"
}
```

**Response**:
```json
{
  "message": "success",
  "data": {
    "email_sent": true,
    "email_error": null,
    "whatsapp_sent": true,
    "whatsapp_error": null,
    "meal": {
      "name": "Breakfast",
      "meal": "Poha with peanuts, curry leaves & lemon",
      "time": "7:00 AM"
    }
  }
}
```

**Status Codes**:
- `200 OK` - Test reminder sent
- `404 Not Found` - No active subscription found
- `500 Internal Server Error` - Sending error

---

### 4. Gamification

#### Check-In (Log Workout)
```http
POST /api/checkin
```

**Description**: Records a workout check-in and awards points

**Request Body**:
```json
{
  "user_id": "user123",
  "name": "John Doe",
  "email": "john@example.com",
  "workout_type": "class"
}
```

**Parameters**:
- `user_id` (required) - Unique user identifier
- `name` (required) - User's name
- `email` (optional) - User's email
- `workout_type` (optional) - "class" (15 points) or other (10 points)

**Response**:
```json
{
  "message": "success",
  "data": {
    "points_earned": 15,
    "current_streak": 5,
    "total_workouts": 25,
    "level": 3,
    "new_achievements": ["Week Warrior"]
  }
}
```

**Status Codes**:
- `200 OK` - Check-in successful
- `400 Bad Request` - Missing required fields

**Game Mechanics**:
- Class workout: 15 points
- Other workout: 10 points
- 7-day streak bonus: 50 points
- 30-day streak bonus: 200 points
- Level up: Every 100 points

---

#### Get User Profile
```http
GET /api/profile/:userId
```

**Description**: Retrieves user's gamification profile

**URL Parameters**:
- `userId` - Unique user identifier

**Example**:
```http
GET /api/profile/user123
```

**Response**:
```json
{
  "message": "success",
  "data": {
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
}
```

**Status Codes**:
- `200 OK` - Success (returns null if user not found)
- `400 Bad Request` - Database error

---

#### Get User Achievements
```http
GET /api/achievements/:userId
```

**Description**: Retrieves all achievements and user's unlock status

**URL Parameters**:
- `userId` - Unique user identifier

**Example**:
```http
GET /api/achievements/user123
```

**Response**:
```json
{
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "First Step",
      "description": "Complete your first workout",
      "icon": "🎯",
      "category": "milestone",
      "unlocked": 1,
      "unlocked_at": "2025-11-20T10:30:00.000Z"
    },
    {
      "id": 2,
      "name": "Week Warrior",
      "description": "Maintain a 7-day streak",
      "icon": "🔥",
      "category": "streak",
      "unlocked": 0,
      "unlocked_at": null
    }
  ]
}
```

**Status Codes**:
- `200 OK` - Success
- `400 Bad Request` - Database error

---

#### Get Leaderboard
```http
GET /api/leaderboard
```

**Description**: Retrieves top 10 users by points

**Response**:
```json
{
  "message": "success",
  "data": [
    {
      "user_id": "user123",
      "name": "John Doe",
      "points": 850,
      "level": 9,
      "current_streak": 15,
      "total_workouts": 85
    }
  ]
}
```

**Status Codes**:
- `200 OK` - Success
- `400 Bad Request` - Database error

---

### 5. Analytics

#### Add Body Measurement
```http
POST /api/analytics/measurement
```

**Description**: Records body measurements for tracking progress

**Request Body**:
```json
{
  "user_id": "user123",
  "weight": 75.5,
  "body_fat_percentage": 18.5,
  "muscle_mass": 45.2,
  "measurement_date": "2025-11-28"
}
```

**Parameters**:
- `user_id` (required) - Unique user identifier
- `weight` (optional) - Weight in kg
- `body_fat_percentage` (optional) - Body fat percentage
- `muscle_mass` (optional) - Muscle mass in kg
- `measurement_date` (optional) - Date of measurement (defaults to current date)

**Response**:
```json
{
  "message": "success",
  "data": {
    "id": 1
  }
}
```

**Status Codes**:
- `200 OK` - Measurement recorded
- `400 Bad Request` - Invalid data

---

#### Get User Measurements
```http
GET /api/analytics/measurements/:userId
```

**Description**: Retrieves all body measurements for a user

**URL Parameters**:
- `userId` - Unique user identifier

**Example**:
```http
GET /api/analytics/measurements/user123
```

**Response**:
```json
{
  "message": "success",
  "data": [
    {
      "id": 1,
      "user_id": "user123",
      "weight": 75.5,
      "body_fat_percentage": 18.5,
      "muscle_mass": 45.2,
      "measurement_date": "2025-11-28",
      "created_at": "2025-11-28T10:30:00.000Z"
    }
  ]
}
```

**Status Codes**:
- `200 OK` - Success
- `400 Bad Request` - Database error

---

#### Create Fitness Goal
```http
POST /api/analytics/goal
```

**Description**: Creates a new fitness goal for tracking

**Request Body**:
```json
{
  "user_id": "user123",
  "goal_type": "weight_loss",
  "title": "Lose 10kg",
  "description": "Reduce weight from 85kg to 75kg",
  "target_value": 75,
  "target_date": "2026-03-01"
}
```

**Parameters**:
- `user_id` (required) - Unique user identifier
- `goal_type` (required) - Type of goal (weight_loss, muscle_gain, etc.)
- `title` (required) - Goal title
- `description` (optional) - Detailed description
- `target_value` (optional) - Target numeric value
- `target_date` (optional) - Target completion date

**Response**:
```json
{
  "message": "success",
  "data": {
    "id": 1
  }
}
```

**Status Codes**:
- `200 OK` - Goal created
- `400 Bad Request` - Invalid data

---

#### Get User Goals
```http
GET /api/analytics/goals/:userId
```

**Description**: Retrieves all fitness goals for a user

**URL Parameters**:
- `userId` - Unique user identifier

**Example**:
```http
GET /api/analytics/goals/user123
```

**Response**:
```json
{
  "message": "success",
  "data": [
    {
      "id": 1,
      "user_id": "user123",
      "goal_type": "weight_loss",
      "title": "Lose 10kg",
      "description": "Reduce weight from 85kg to 75kg",
      "target_value": 75,
      "current_value": 80,
      "start_date": "2025-11-01",
      "target_date": "2026-03-01",
      "status": "in_progress",
      "completed_at": null,
      "created_at": "2025-11-01T10:30:00.000Z"
    }
  ]
}
```

**Status Codes**:
- `200 OK` - Success
- `400 Bad Request` - Database error

---

#### Update Fitness Goal
```http
PUT /api/analytics/goal/:goalId
```

**Description**: Updates progress or status of a fitness goal

**URL Parameters**:
- `goalId` - Goal ID

**Request Body**:
```json
{
  "current_value": 78,
  "status": "in_progress"
}
```

**Parameters**:
- `current_value` (optional) - Current progress value
- `status` (optional) - "in_progress", "completed", or "abandoned"

**Response**:
```json
{
  "message": "success",
  "data": {
    "updated": true
  }
}
```

**Status Codes**:
- `200 OK` - Goal updated
- `400 Bad Request` - No updates provided or invalid data

**Note**: Setting status to "completed" automatically sets `completed_at` timestamp

---

#### Delete Fitness Goal
```http
DELETE /api/analytics/goal/:goalId
```

**Description**: Deletes a fitness goal

**URL Parameters**:
- `goalId` - Goal ID

**Example**:
```http
DELETE /api/analytics/goal/1
```

**Response**:
```json
{
  "message": "success",
  "data": {
    "deleted": true
  }
}
```

**Status Codes**:
- `200 OK` - Goal deleted
- `400 Bad Request` - Database error

---

### 6. Health & Monitoring

#### Health Check
```http
GET /api/health
```

**Description**: Simple health check endpoint for monitoring server status

**Response**:
```
OK
```

**Status Codes**:
- `200 OK` - Server is healthy

---

## Automated Scheduled Tasks

### Meal Reminder Scheduler

The application automatically sends meal reminders at scheduled times using `node-cron`. All times are in IST (Asia/Kolkata timezone).

#### HIIT Class Schedule
- **7:00 AM** - Breakfast: Poha with peanuts, curry leaves & lemon
- **10:00 AM** - Mid-Morning: Fruit salad with flax seeds
- **1:00 PM** - Lunch: Brown rice, dal, mixed vegetable sabzi & curd
- **4:30 PM** - Pre-Workout: Banana & peanut butter toast
- **6:30 PM** - Post-Workout: Protein shake or boiled eggs
- **8:30 PM** - Dinner: Grilled chicken/paneer salad with soup

#### Yoga Class Schedule
- **7:30 AM** - Breakfast: Idli with sambar & coconut chutney
- **10:30 AM** - Mid-Morning: Green tea & roasted makhanas
- **1:00 PM** - Lunch: Quinoa khichdi with cucumber raita
- **4:00 PM** - Afternoon: Sprouts salad
- **7:00 PM** - Post-Yoga: Warm turmeric milk with almonds
- **8:30 PM** - Dinner: Moong dal soup with sautéed veggies

#### Strength Class Schedule
- **7:00 AM** - Breakfast: Egg bhurji (4 eggs) with multigrain roti
- **10:00 AM** - Mid-Morning: Greek yogurt with berries
- **12:30 PM** - Lunch: Chicken breast/Tofu curry with sweet potato
- **3:30 PM** - Pre-Workout: Oatmeal with whey protein
- **6:00 PM** - Post-Workout: Whey protein isolate with water
- **8:30 PM** - Dinner: Grilled fish/paneer with steamed broccoli

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input or database error |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Server-side error |

---

## Rate Limiting

Currently, there are no rate limits implemented. For production use, consider implementing rate limiting to prevent abuse.

---

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible. For production use, consider implementing:
- JWT-based authentication
- API keys
- OAuth 2.0

---

## CORS Policy

The API accepts requests from all origins (`*`). In production, configure CORS to accept requests only from trusted domains.

---

## Data Validation

### Email Format
- Must be a valid email address
- Unique constraint in database for members and diet reminders

### Phone Number Format
- Should include country code (e.g., +91 for India)
- Automatically formatted for WhatsApp (adds `whatsapp:` prefix)

### Class Types
Valid class types: `HIIT`, `Yoga`, `Strength`

---

## Pagination

Currently, pagination is not implemented. All list endpoints return complete datasets. Consider implementing pagination for:
- `/api/members`
- `/api/transactions`
- `/api/leaderboard`

---

## Webhooks

No webhooks are currently implemented. Future considerations:
- Payment confirmation webhooks
- Twilio status callbacks for message delivery

---

*Last Updated: November 28, 2025*
*API Version: 1.0.0*
