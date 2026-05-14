# Case10X AI - Complete API Documentation

## Table of Contents
1. [Overview](#overview)
2. [Base URL](#base-url)
3. [Authentication](#authentication)
4. [API Endpoints](#api-endpoints)
   - [File Upload & Test Case Generation](#1-file-upload--test-case-generation)
   - [Chat with AI](#2-chat-with-ai)
   - [Test Cases Management](#3-test-cases-management)
   - [Test Execution](#4-test-execution)
   - [Reports & Analytics](#5-reports--analytics)
   - [Defects Management](#6-defects-management)
   - [Automation Scripts](#7-automation-scripts)
   - [Export Functionality](#8-export-functionality)
   - [Utility Endpoints](#9-utility-endpoints)

---

## Overview

Case10X AI is an intelligent test case generation and management platform that uses Google's Gemini AI to automatically generate comprehensive test cases from requirement documents. This API documentation covers all available endpoints and their usage.

**Technology Stack:**
- Backend: Flask (Python)
- AI Model: Google Gemini AI (gemini-2.5-flash)
- Database: SQLite
- File Processing: PyPDF2, python-docx

---

## Base URL

```
http://localhost:5000
```

For network access:
```
http://<your-ip-address>:5000
```

---

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

**Note:** The application requires a valid `GEMINI_API_KEY` environment variable to be set for AI-powered features.

---

## API Endpoints

### 1. File Upload & Test Case Generation

#### **POST** `/upload`

Upload a requirement document and automatically generate test cases using AI.

**Request Type:** `multipart/form-data`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| file | File | Yes | Requirement document (PDF, DOCX, or TXT) |
| test_suite | String | No | Name of the test suite/module |
| model | String | No | AI model to use (default: 'gemini-2.5-flash') |

**Supported File Types:**
- PDF (.pdf)
- Word Document (.docx)
- Text File (.txt)

**Maximum File Size:** 16MB

**Example Request (cURL):**
```bash
curl -X POST http://localhost:5000/upload \
  -F "file=@requirements.pdf" \
  -F "test_suite=Login Module" \
  -F "model=gemini-2.5-flash"
```

**Example Request (JavaScript):**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('test_suite', 'Login Module');
formData.append('model', 'gemini-2.5-flash');

fetch('http://localhost:5000/upload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

**Success Response (200):**
```json
{
  "message": "Successfully generated 15 test cases for requirements.pdf",
  "filename": "requirements.pdf",
  "test_cases": [
    {
      "id": 1,
      "requirement_file": "requirements.pdf",
      "requirement_id": "REQ-001",
      "requirement_description": "User login functionality",
      "test_case_name": "Verify successful user login",
      "description": "Test that users can successfully log in",
      "preconditions": "User account exists\nUser is not logged in",
      "test_steps": "1. Navigate to login page\n2. Enter valid email\n3. Enter valid password\n4. Click Login",
      "expected_result": "User is successfully authenticated",
      "priority": "High",
      "test_type": "Functional",
      "status": "Not Executed"
    }
  ],
  "replaced": false
}
```

**Error Responses:**
- `400`: No file provided, invalid file type
- `500`: File processing error, AI generation error

**Features:**
- Automatically deletes previous test cases for the same file
- Extracts text from PDF, DOCX, and TXT files
- Uses AI to generate comprehensive test cases
- Supports model fallback if quota is exceeded
- Stores generated test cases in database

---

### 2. Chat with AI

#### **POST** `/chat`

Chat with AI about the uploaded requirement document.

**Request Type:** `application/json`

**Request Body:**
```json
{
  "message": "What are the main features in this document?"
}
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| message | String | Yes | Your question about the requirements |

**Example Request (cURL):**
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the security requirements?"}'
```

**Success Response (200):**
```json
{
  "reply": "Based on the requirement document, the main security requirements are: 1. User authentication with email and password, 2. Password encryption, 3. Session management..."
}
```

**Error Responses:**
- `400`: No message provided
- `500`: AI processing error

**Note:** Requires a document to be uploaded first via `/upload` endpoint.

---

### 3. Test Cases Management

#### **GET** `/test-cases`

Retrieve all test cases or filter by filename.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| filename | String | No | Filter by requirement file name |

**Example Requests:**
```bash
# Get all test cases
curl http://localhost:5000/test-cases

# Get test cases for specific file
curl http://localhost:5000/test-cases?filename=requirements.pdf
```

**Success Response (200):**
```json
[
  {
    "id": 1,
    "requirement_file": "requirements.pdf",
    "requirement_id": "REQ-001",
    "requirement_description": "User login functionality",
    "test_case_name": "Verify successful user login",
    "description": "Test that users can successfully log in",
    "preconditions": "User account exists\nUser is not logged in",
    "test_steps": "1. Navigate to login page\n2. Enter valid email\n3. Enter valid password\n4. Click Login",
    "expected_result": "User is successfully authenticated",
    "priority": "High",
    "test_type": "Functional",
    "status": "Not Executed",
    "test_suite": "Login Module",
    "created_at": "2025-12-23 08:30:00"
  }
]
```

---

#### **PUT** `/test-cases/<test_case_id>`

Update an existing test case.

**Request Type:** `application/json`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| test_case_id | Integer | Yes | ID of the test case to update |

**Request Body:**
```json
{
  "test_case_name": "Updated test case name",
  "description": "Updated description",
  "preconditions": "Updated preconditions",
  "test_steps": "1. Step 1\n2. Step 2",
  "expected_result": "Updated expected result",
  "priority": "High",
  "test_type": "Functional",
  "requirement_description": "Updated requirement description",
  "status": "Passed"
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:5000/test-cases/1 \
  -H "Content-Type: application/json" \
  -d '{
    "test_case_name": "Verify login with valid credentials",
    "description": "Updated description",
    "priority": "Critical"
  }'
```

**Success Response (200):**
```json
{
  "message": "Test case updated successfully"
}
```

---

#### **DELETE** `/test-cases/<test_case_id>`

Delete a specific test case.

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| test_case_id | Integer | Yes | ID of the test case to delete |

**Example Request:**
```bash
curl -X DELETE http://localhost:5000/test-cases/1
```

**Success Response (200):**
```json
{
  "message": "Test case deleted successfully"
}
```

---

#### **DELETE** `/test-cases/clear-all`

Delete all test cases from the database.

**Example Request:**
```bash
curl -X DELETE http://localhost:5000/test-cases/clear-all
```

**Success Response (200):**
```json
{
  "message": "Successfully deleted 25 test cases"
}
```

**Warning:** This action is irreversible!

---

### 4. Test Execution

#### **POST** `/execute`

Record a test case execution with results.

**Request Type:** `multipart/form-data` or `application/json`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| test_case_id | Integer | Yes | ID of the test case being executed |
| status | String | Yes | Execution status (Passed/Failed/Blocked) |
| version | String | No | Version/Release being tested (default: 'Unspecified') |
| comments | String | No | Execution comments or notes |
| defect_id | String | No | Associated defect/bug ID |
| evidence | File | No | Screenshot or evidence file |

**Example Request (with file):**
```bash
curl -X POST http://localhost:5000/execute \
  -F "test_case_id=1" \
  -F "status=Failed" \
  -F "version=Release 1.0" \
  -F "comments=Login button not responding" \
  -F "defect_id=BUG-123" \
  -F "evidence=@screenshot.png"
```

**Example Request (JSON only):**
```bash
curl -X POST http://localhost:5000/execute \
  -H "Content-Type: application/json" \
  -d '{
    "test_case_id": 1,
    "status": "Passed",
    "version": "Release 1.0",
    "comments": "All steps executed successfully"
  }'
```

**Success Response (200):**
```json
{
  "message": "Execution recorded successfully",
  "evidence": "evidence_1_20251223_083000_screenshot.png"
}
```

**Features:**
- Records execution in history (test_executions table)
- Updates master test case status
- Supports evidence file upload
- Tracks version/release information

---

### 5. Reports & Analytics

#### **GET** `/reports`

Get aggregated execution statistics grouped by version and status.

**Example Request:**
```bash
curl http://localhost:5000/reports
```

**Success Response (200):**
```json
{
  "Release 1.0": {
    "Passed": 15,
    "Failed": 3,
    "Blocked": 1,
    "Total": 19
  },
  "Release 2.0": {
    "Passed": 20,
    "Failed": 2,
    "Blocked": 0,
    "Total": 22
  }
}
```

**Use Cases:**
- Dashboard analytics
- Version comparison
- Test execution trends
- Pass/fail rate calculation

---

### 6. Defects Management

#### **GET** `/defects`

Retrieve all failed test executions (defects).

**Example Request:**
```bash
curl http://localhost:5000/defects
```

**Success Response (200):**
```json
[
  {
    "id": 1,
    "test_case_id": 5,
    "test_case_name": "Verify login with invalid password",
    "version": "Release 1.0",
    "status": "Failed",
    "executed_at": "2025-12-23 08:45:00",
    "comments": "Login button not responding after entering credentials",
    "defect_id": "BUG-123",
    "priority": "High",
    "test_suite": "Login Module"
  }
]
```

**Features:**
- Automatically filters for failed executions
- Includes test case details
- Sorted by execution date (newest first)

---

#### **POST** `/generate-defect`

Generate a professional bug report using AI based on test failure.

**Request Type:** `application/json`

**Request Body:**
```json
{
  "test_case": {
    "test_case_name": "Verify login with valid credentials",
    "test_steps": "1. Navigate to login page\n2. Enter email\n3. Enter password\n4. Click login",
    "expected_result": "User should be logged in successfully"
  },
  "failure_reason": "Login button is not clickable after entering credentials"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:5000/generate-defect \
  -H "Content-Type: application/json" \
  -d '{
    "test_case": {
      "test_case_name": "Verify login",
      "test_steps": "1. Open app\n2. Enter credentials\n3. Click login",
      "expected_result": "User logged in"
    },
    "failure_reason": "Button not responding"
  }'
```

**Success Response (200):**
```json
{
  "report": "**Summary:** Login button unresponsive after credential entry\n\n**Description:**\nThe user was executing the test \"Verify login\" and encountered an issue where the login button did not respond to clicks.\n\n**Steps to Reproduce:**\n1. Open the application\n2. Enter valid credentials in the email and password fields\n3. Attempt to click the Login button\n\n**Actual Result:**\nThe login button does not respond to user clicks. No visual feedback or action occurs.\n\n**Expected Result:**\nUser logged in\n\n**Severity:** High\n**Environment:** Please specify browser, OS, and application version"
}
```

**Features:**
- AI-generated professional bug reports
- Structured format (Summary, Description, Steps, Results, Severity)
- Based on test case context and failure observation

---

### 7. Automation Scripts

#### **POST** `/generate-automation`

Generate a Playwright automation script for a test case using AI.

**Request Type:** `multipart/form-data`

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| test_case | JSON String | Yes | Test case object (stringified JSON) |
| target_url | String | No | URL to test |
| target_username | String | No | Login username (if applicable) |
| target_password | String | No | Login password (if applicable) |
| screenshot | File | No | Screenshot for visual context |

**Example Request:**
```bash
curl -X POST http://localhost:5000/generate-automation \
  -F 'test_case={"test_case_name":"Verify login","description":"Test login","test_steps":"1. Open page\n2. Enter credentials\n3. Click login","expected_result":"User logged in"}' \
  -F "target_url=https://example.com/login" \
  -F "target_username=testuser@example.com" \
  -F "target_password=Test@123" \
  -F "screenshot=@page_screenshot.png"
```

**Success Response (200):**
```json
{
  "script": "const { test, expect } = require('@playwright/test');\n\ntest('Verify login', async ({ page }) => {\n  // Navigate to login page\n  await page.goto('https://example.com/login');\n  \n  // Enter username\n  await page.getByLabel('Email').fill('testuser@example.com');\n  \n  // Enter password\n  await page.getByLabel('Password').fill('Test@123');\n  \n  // Click login button\n  await page.getByRole('button', { name: 'Login' }).click();\n  \n  // Verify successful login\n  await expect(page).toHaveURL(/dashboard/);\n});"
}
```

**Features:**
- AI-generated Playwright scripts
- Uses screenshot for accurate locator detection
- Supports login credentials
- User-facing locators (getByRole, getByLabel, etc.)
- Includes assertions based on expected results

---

#### **POST** `/run-automation-script`

Execute an automation script on the server.

**Request Type:** `application/json`

**Request Body:**
```json
{
  "script": "const { test, expect } = require('@playwright/test');\n\ntest('sample test', async ({ page }) => {\n  await page.goto('https://example.com');\n});",
  "test_case_id": 1
}
```

**Example Request:**
```bash
curl -X POST http://localhost:5000/run-automation-script \
  -H "Content-Type: application/json" \
  -d '{
    "script": "console.log(\"Hello World\");",
    "test_case_id": 1
  }'
```

**Success Response (200):**
```json
{
  "status": "success",
  "output": "Hello World\n"
}
```

**Failure Response (200):**
```json
{
  "status": "failure",
  "error": "Script execution failed",
  "output": "Error: Module not found..."
}
```

**Features:**
- Executes JavaScript or Python scripts
- 30-second timeout
- Captures stdout and stderr
- Auto-detects language (JS/Python)

**Security Warning:** This endpoint executes arbitrary code. Use with caution!

---

### 8. Export Functionality

#### **GET** `/export`

Export all test cases to an Excel file with traceability matrix.

**Example Request:**
```bash
curl -O http://localhost:5000/export
```

**JavaScript Example:**
```javascript
fetch('http://localhost:5000/export')
  .then(response => response.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test_cases_export.xlsx';
    a.click();
  });
```

**Success Response (200):**
- Returns an Excel file (.xlsx)
- Filename format: `test_cases_export_YYYYMMDD_HHMMSS.xlsx`

**Excel File Structure:**

**Sheet 1: Test Cases**
| Column | Description |
|--------|-------------|
| ID | Test case ID |
| Test Suite / Module | Test suite name |
| Test Case Name | Name of the test case |
| Description | Test case description |
| Preconditions | Prerequisites |
| Test Steps | Step-by-step instructions |
| Expected Result | Expected outcome |
| Priority | High/Medium/Low |
| Test Type | Functional/Security/Performance/etc. |
| Status | Not Executed/Passed/Failed/Blocked |
| Requirement File | Source document |
| Created At | Creation timestamp |

**Sheet 2: Traceability Matrix**
| Column | Description |
|--------|-------------|
| Requirement ID | Requirement identifier |
| Requirement Description | Requirement details |
| Test Case ID | Associated test case ID |
| Test Suite | Test suite name |
| Test Case Name | Test case name |
| Status | Execution status |

**Features:**
- Professional Excel formatting
- Color-coded headers
- Frozen header rows
- Auto-adjusted column widths
- Text wrapping for long content
- Requirements traceability matrix
- Merged cells for grouped requirements

**Error Responses:**
- `400`: No test cases to export
- `500`: Export processing error

---

### 9. Utility Endpoints

#### **GET** `/`

Serve the main application HTML page.

**Example Request:**
```bash
curl http://localhost:5000/
```

**Response:** HTML page (index.html)

---

#### **GET** `/test-ai`

Test the AI connection and API key validity.

**Example Request:**
```bash
curl http://localhost:5000/test-ai
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "API IS WORKING"
}
```

**Error Response (500):**
```json
{
  "status": "error",
  "error": "API key not valid. Please pass a valid API key.",
  "traceback": "Traceback details..."
}
```

**Use Cases:**
- Verify Gemini API configuration
- Debug API key issues
- Health check for AI services

---

## Data Models

### Test Case Object
```json
{
  "id": 1,
  "requirement_file": "requirements.pdf",
  "requirement_id": "REQ-001",
  "requirement_description": "User authentication feature",
  "test_case_name": "Verify successful login",
  "description": "Test that users can log in with valid credentials",
  "preconditions": "User account exists\nUser is not logged in",
  "test_steps": "1. Navigate to login page\n2. Enter valid email\n3. Enter valid password\n4. Click Login button",
  "expected_result": "User is successfully authenticated and redirected to dashboard",
  "priority": "High",
  "test_type": "Functional",
  "status": "Not Executed",
  "test_suite": "Login Module",
  "created_at": "2025-12-23 08:30:00"
}
```

### Test Execution Object
```json
{
  "id": 1,
  "test_case_id": 1,
  "version": "Release 1.0",
  "status": "Passed",
  "executed_at": "2025-12-23 09:15:00",
  "comments": "All steps executed successfully",
  "defect_id": "",
  "evidence_file": "evidence_1_20251223_091500_screenshot.png"
}
```

---

## Status Values

### Test Execution Status
- `Not Executed` - Default status for new test cases
- `Passed` - Test executed successfully
- `Failed` - Test failed, defect found
- `Blocked` - Test cannot be executed due to blocker

### Priority Levels
- `High` - Critical functionality
- `Medium` - Important but not critical
- `Low` - Nice to have

### Test Types
- `Functional` - Feature functionality testing
- `Security` - Security vulnerability testing
- `Performance` - Performance and load testing
- `Usability` - User experience testing
- `Integration` - System integration testing
- `Regression` - Regression testing

---

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "error": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes
- `200` - Success
- `400` - Bad Request (missing parameters, invalid input)
- `500` - Internal Server Error (processing errors, AI errors)

---

## AI Models Used

### Primary Model
- **gemini-2.5-flash** - Main model for all AI operations
  - Test case generation
  - Chat functionality
  - Automation script generation
  - Defect report generation

### Fallback Strategy
The application implements automatic fallback:
1. Try requested model
2. If quota exceeded (429 error), fallback to gemini-2.5-flash
3. If all models fail, return error message

---

## Environment Variables

Required environment variables:

```bash
GEMINI_API_KEY=your_google_gemini_api_key_here
```

Set in `.env` file in the project root directory.

---

## Database Schema

### Table: test_cases
```sql
CREATE TABLE test_cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    requirement_file TEXT NOT NULL,
    requirement_id TEXT,
    requirement_description TEXT,
    test_case_name TEXT NOT NULL,
    description TEXT,
    preconditions TEXT,
    test_steps TEXT,
    expected_result TEXT,
    priority TEXT,
    test_type TEXT,
    status TEXT DEFAULT "Not Executed",
    test_suite TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table: test_executions
```sql
CREATE TABLE test_executions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_case_id INTEGER,
    version TEXT,
    status TEXT,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comments TEXT,
    defect_id TEXT,
    evidence_file TEXT,
    FOREIGN KEY (test_case_id) REFERENCES test_cases (id)
);
```

---

## Rate Limits

### Gemini AI API
- Subject to Google's Gemini API rate limits
- Free tier: 15 requests per minute
- Quota exceeded errors trigger automatic fallback

### File Upload
- Maximum file size: 16MB
- Supported formats: PDF, DOCX, TXT

---

## Best Practices

### 1. File Upload
- Use descriptive filenames
- Keep requirement documents under 10MB for faster processing
- Ensure documents are well-structured for better AI comprehension

### 2. Test Case Management
- Always specify test_suite for better organization
- Use consistent naming conventions
- Regularly export test cases for backup

### 3. Test Execution
- Always provide version information
- Add detailed comments for failures
- Upload evidence files for failed tests

### 4. Automation
- Provide screenshots for better locator accuracy
- Include target URL and credentials when applicable
- Test generated scripts before production use

---

## Troubleshooting

### Common Issues

**1. "Failed to generate test cases"**
- Check GEMINI_API_KEY is set correctly
- Verify internet connectivity
- Check API quota limits

**2. "No file provided" error**
- Ensure file is attached in form-data
- Verify file size is under 16MB
- Check file extension is supported

**3. "Quota exceeded" error**
- Wait for quota reset (usually 1 minute)
- System automatically tries fallback models
- Consider upgrading Gemini API plan

**4. Export returns empty file**
- Ensure test cases exist in database
- Check database connection
- Verify openpyxl is installed

---

## Examples

### Complete Workflow Example (JavaScript)

```javascript
// 1. Upload requirement document
async function uploadRequirements() {
  const formData = new FormData();
  formData.append('file', document.getElementById('fileInput').files[0]);
  formData.append('test_suite', 'User Management');
  formData.append('model', 'gemini-2.5-flash');
  
  const response = await fetch('http://localhost:5000/upload', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  console.log(`Generated ${data.test_cases.length} test cases`);
  return data.test_cases;
}

// 2. Get all test cases
async function getTestCases() {
  const response = await fetch('http://localhost:5000/test-cases');
  const testCases = await response.json();
  return testCases;
}

// 3. Execute a test case
async function executeTest(testCaseId) {
  const response = await fetch('http://localhost:5000/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      test_case_id: testCaseId,
      status: 'Passed',
      version: 'Release 1.0',
      comments: 'Test executed successfully'
    })
  });
  
  const result = await response.json();
  console.log(result.message);
}

// 4. Generate automation script
async function generateAutomation(testCase) {
  const formData = new FormData();
  formData.append('test_case', JSON.stringify(testCase));
  formData.append('target_url', 'https://example.com');
  
  const response = await fetch('http://localhost:5000/generate-automation', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  console.log('Generated script:', data.script);
  return data.script;
}

// 5. Export test cases
async function exportTestCases() {
  const response = await fetch('http://localhost:5000/export');
  const blob = await response.blob();
  
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'test_cases.xlsx';
  a.click();
}

// 6. Get execution reports
async function getReports() {
  const response = await fetch('http://localhost:5000/reports');
  const reports = await response.json();
  console.log('Execution statistics:', reports);
  return reports;
}
```

---

## Support & Contact

For issues, questions, or feature requests:
- Check the application logs: `app.log`
- Review database: `database.db`
- Verify environment variables in `.env`

---

## Version History

**Current Version:** 1.0
- Initial release with full API functionality
- AI-powered test case generation
- Test execution tracking
- Automation script generation
- Excel export with traceability matrix

---

## License

This API documentation is part of the Case10X AI project.

---

**Last Updated:** December 23, 2025
