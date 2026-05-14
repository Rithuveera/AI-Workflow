# TestFlow API Quick Reference

## Base URL
```
http://localhost:3001/api
```

## Requirements API

### Get All Requirements
```http
GET /api/requirements
```

**Response:**
```json
[
  {
    "id": "req-1732776364000",
    "title": "User Authentication",
    "description": "Users should be able to login and logout securely",
    "created_at": "2025-11-28T05:36:04.000Z",
    "updated_at": "2025-11-28T05:36:04.000Z"
  }
]
```

### Get Single Requirement
```http
GET /api/requirements/:id
```

### Create Requirement
```http
POST /api/requirements
Content-Type: application/json

{
  "title": "User Authentication",
  "description": "Users should be able to login and logout securely"
}
```

### Update Requirement
```http
PUT /api/requirements/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

### Delete Requirement
```http
DELETE /api/requirements/:id
```

---

## Test Cases API

### Get All Test Cases
```http
GET /api/test-cases
```

**Response:**
```json
[
  {
    "id": "tc-1732776364001",
    "requirement_id": "req-1732776364000",
    "title": "Login with valid credentials",
    "description": "Verify user can login",
    "steps": "1. Navigate to login\n2. Enter credentials\n3. Click login",
    "expected_result": "User redirected to dashboard",
    "priority": "High",
    "requirement_title": "User Authentication",
    "created_at": "2025-11-28T05:36:04.000Z",
    "updated_at": "2025-11-28T05:36:04.000Z"
  }
]
```

### Get Test Cases by Requirement
```http
GET /api/test-cases/requirement/:requirementId
```

### Get Single Test Case
```http
GET /api/test-cases/:id
```

### Create Test Case
```http
POST /api/test-cases
Content-Type: application/json

{
  "requirement_id": "req-1732776364000",
  "title": "Login with valid credentials",
  "description": "Verify user can login with correct username and password",
  "steps": "1. Navigate to login page\n2. Enter valid username\n3. Enter valid password\n4. Click login button",
  "expected_result": "User should be redirected to dashboard",
  "priority": "High"
}
```

**Priority Options:** `High`, `Medium`, `Low`

### Update Test Case
```http
PUT /api/test-cases/:id
Content-Type: application/json

{
  "requirement_id": "req-1732776364000",
  "title": "Updated title",
  "description": "Updated description",
  "steps": "Updated steps",
  "expected_result": "Updated expected result",
  "priority": "Medium"
}
```

### Delete Test Case
```http
DELETE /api/test-cases/:id
```

---

## Executions API

### Get All Executions
```http
GET /api/executions
```

**Response:**
```json
[
  {
    "id": "exec-1732776364002",
    "test_case_id": "tc-1732776364001",
    "status": "Passed",
    "notes": "Login functionality working as expected",
    "executed_by": "Test Engineer",
    "execution_date": "2025-11-28T05:36:04.000Z",
    "test_case_title": "Login with valid credentials",
    "requirement_title": "User Authentication",
    "created_at": "2025-11-28T05:36:04.000Z",
    "updated_at": "2025-11-28T05:36:04.000Z"
  }
]
```

### Get Executions by Test Case
```http
GET /api/executions/testcase/:testCaseId
```

### Get Execution Statistics
```http
GET /api/executions/stats
```

**Response:**
```json
{
  "total": 10,
  "passed": 7,
  "failed": 2,
  "blocked": 1,
  "not_applicable": 0
}
```

### Get Single Execution
```http
GET /api/executions/:id
```

### Create Execution
```http
POST /api/executions
Content-Type: application/json

{
  "test_case_id": "tc-1732776364001",
  "status": "Passed",
  "notes": "All tests passed successfully",
  "executed_by": "Test Engineer"
}
```

**Status Options:** `Passed`, `Failed`, `Blocked`, `Not Applicable`

### Update Execution
```http
PUT /api/executions/:id
Content-Type: application/json

{
  "status": "Failed",
  "notes": "Updated notes",
  "executed_by": "Another Engineer"
}
```

### Delete Execution
```http
DELETE /api/executions/:id
```

---

## Testing with cURL

### Create a Requirement
```bash
curl -X POST http://localhost:3001/api/requirements \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"User Registration\",\"description\":\"Users should be able to register\"}"
```

### Create a Test Case
```bash
curl -X POST http://localhost:3001/api/test-cases \
  -H "Content-Type: application/json" \
  -d "{\"requirement_id\":\"req-1732776364000\",\"title\":\"Register new user\",\"description\":\"Test user registration\",\"steps\":\"1. Fill form\n2. Submit\",\"expected_result\":\"User created\",\"priority\":\"High\"}"
```

### Create an Execution
```bash
curl -X POST http://localhost:3001/api/executions \
  -H "Content-Type: application/json" \
  -d "{\"test_case_id\":\"tc-1732776364001\",\"status\":\"Passed\",\"notes\":\"Test passed\",\"executed_by\":\"Tester\"}"
```

### Get Statistics
```bash
curl http://localhost:3001/api/executions/stats
```

---

## Testing with PowerShell

### Create a Requirement
```powershell
$body = @{
    title = "User Registration"
    description = "Users should be able to register"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/requirements" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

### Get All Requirements
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/requirements" -Method Get
```

### Get Statistics
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/executions/stats" -Method Get
```

---

## Error Responses

### 404 Not Found
```json
{
  "error": "Requirement not found"
}
```

### 400 Bad Request
```json
{
  "error": "Invalid status value"
}
```

### 500 Internal Server Error
```json
{
  "error": "Database error message"
}
```

---

## Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "TestFlow API is running"
}
```

---

## CORS

CORS is enabled for all origins. In production, you should restrict this to your frontend domain.

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding it for production use.

---

## Authentication

Currently no authentication is implemented. For production, add JWT or session-based authentication.
