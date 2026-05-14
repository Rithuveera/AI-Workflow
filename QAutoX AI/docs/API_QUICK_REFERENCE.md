# Case10X AI - API Quick Reference

## Base URL
```
http://localhost:5000
```

---

## 📋 Quick API List

### 1. Test Case Generation & Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload` | Upload document & generate test cases |
| GET | `/test-cases` | Get all test cases (optional: ?filename=...) |
| PUT | `/test-cases/<id>` | Update a test case |
| DELETE | `/test-cases/<id>` | Delete a test case |
| DELETE | `/test-cases/clear-all` | Delete all test cases |
| GET | `/export` | Export test cases to Excel |

### 2. AI Features

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/chat` | Chat with AI about requirements |
| POST | `/generate-automation` | Generate Playwright automation script |
| POST | `/generate-defect` | Generate AI bug report |
| GET | `/test-ai` | Test AI connection |

### 3. Test Execution

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/execute` | Record test execution |
| GET | `/reports` | Get execution statistics |
| GET | `/defects` | Get all failed tests (defects) |

### 4. Automation

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/run-automation-script` | Execute automation script |

### 5. Utility

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Main application page |

---

## 🚀 Common Usage Examples

### Upload & Generate Test Cases
```bash
curl -X POST http://localhost:5000/upload \
  -F "file=@requirements.pdf" \
  -F "test_suite=Login Module"
```

### Get All Test Cases
```bash
curl http://localhost:5000/test-cases
```

### Execute a Test
```bash
curl -X POST http://localhost:5000/execute \
  -H "Content-Type: application/json" \
  -d '{
    "test_case_id": 1,
    "status": "Passed",
    "version": "Release 1.0"
  }'
```

### Chat with AI
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the main features?"}'
```

### Export to Excel
```bash
curl -O http://localhost:5000/export
```

### Generate Automation Script
```bash
curl -X POST http://localhost:5000/generate-automation \
  -F 'test_case={"test_case_name":"Login Test","test_steps":"1. Open page\n2. Login"}' \
  -F "target_url=https://example.com"
```

### Get Execution Reports
```bash
curl http://localhost:5000/reports
```

### Get Defects
```bash
curl http://localhost:5000/defects
```

---

## 📊 Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request (missing/invalid parameters) |
| 500 | Server Error (processing/AI errors) |

---

## 🔑 Required Environment Variable

```bash
GEMINI_API_KEY=your_api_key_here
```

---

## 📁 Supported File Types

- PDF (.pdf)
- Word Document (.docx)
- Text File (.txt)
- Max size: 16MB

---

## 🎯 Test Status Values

- `Not Executed` - Default
- `Passed` - Success
- `Failed` - Failure/Defect
- `Blocked` - Cannot execute

---

## ⚡ Priority Levels

- `High` - Critical
- `Medium` - Important
- `Low` - Nice to have

---

## 🧪 Test Types

- `Functional`
- `Security`
- `Performance`
- `Usability`
- `Integration`
- `Regression`

---

## 🤖 AI Models

**Primary:** `gemini-2.5-flash`
- Test case generation
- Chat functionality
- Automation scripts
- Defect reports

---

## 💡 JavaScript Examples

### Upload File
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('test_suite', 'Login Module');

fetch('http://localhost:5000/upload', {
  method: 'POST',
  body: formData
})
.then(res => res.json())
.then(data => console.log(data));
```

### Get Test Cases
```javascript
fetch('http://localhost:5000/test-cases')
  .then(res => res.json())
  .then(testCases => console.log(testCases));
```

### Execute Test
```javascript
fetch('http://localhost:5000/execute', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    test_case_id: 1,
    status: 'Passed',
    version: 'Release 1.0',
    comments: 'Test passed successfully'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### Export Excel
```javascript
fetch('http://localhost:5000/export')
  .then(res => res.blob())
  .then(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test_cases.xlsx';
    a.click();
  });
```

---

## 🗄️ Database Tables

### test_cases
- Stores all generated test cases
- Includes requirement mapping
- Tracks execution status

### test_executions
- Execution history
- Version tracking
- Evidence files
- Defect linking

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Failed to generate test cases" | Check GEMINI_API_KEY, internet connection |
| "No file provided" | Verify file is attached, size < 16MB |
| "Quota exceeded" | Wait 1 minute, system auto-fallbacks |
| Empty export | Ensure test cases exist in database |

---

## 📝 Notes

- All endpoints return JSON (except `/` and `/export`)
- File uploads use `multipart/form-data`
- Other requests use `application/json`
- No authentication required (local use)
- Database: SQLite (`database.db`)
- Logs: `app.log`

---

**For detailed documentation, see:** `API_DOCUMENTATION.md`
