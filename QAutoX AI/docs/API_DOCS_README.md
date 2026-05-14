# 📚 Case10X AI - API Documentation Suite

Welcome to the complete API documentation for **Case10X AI**, an intelligent test case generation and management platform powered by Google's Gemini AI.

---

## 📖 Documentation Files

This documentation suite includes the following files:

### 1. **API_DOCUMENTATION.md** 📘
**Complete, detailed API reference**
- Full endpoint descriptions
- Request/response examples (cURL, JavaScript)
- Data models and schemas
- Error handling
- Best practices
- Troubleshooting guide

👉 **Use this for:** In-depth understanding of each API endpoint

---

### 2. **API_QUICK_REFERENCE.md** ⚡
**Quick lookup guide**
- Condensed API list
- Common usage examples
- Quick troubleshooting
- Status codes and values
- JavaScript snippets

👉 **Use this for:** Fast reference during development

---

### 3. **API_ENDPOINTS_MAP.md** 🗺️
**Visual API structure**
- ASCII diagrams of endpoints
- Data flow visualizations
- Database schema overview
- Request/response type mapping
- Authentication & security info

👉 **Use this for:** Understanding the overall API architecture

---

### 4. **Case10X_AI_Postman_Collection.json** 🚀
**Postman collection file**
- Pre-configured API requests
- Example request bodies
- Environment variables
- Ready to import and test

👉 **Use this for:** Testing APIs with Postman

---

## 🚀 Quick Start

### 1. Import Postman Collection
```bash
# Open Postman → Import → Select Case10X_AI_Postman_Collection.json
```

### 2. Set Base URL
The collection uses a variable `{{base_url}}` set to `http://localhost:5000`

### 3. Start Testing!
All endpoints are pre-configured with example data. Just click "Send"!

---

## 📋 API Summary

### Total Endpoints: **15**

| Category | Endpoints | Description |
|----------|-----------|-------------|
| **File Upload & Generation** | 2 | Upload docs, generate test cases, chat with AI |
| **Test Case Management** | 5 | CRUD operations on test cases |
| **Test Execution** | 1 | Record test executions with evidence |
| **Reports & Analytics** | 2 | Execution stats and defects |
| **AI Automation** | 3 | Generate & run automation scripts, bug reports |
| **Export & Utility** | 3 | Excel export, AI test, main page |

---

## 🔑 Key Features

### ✨ AI-Powered
- **Gemini 2.5 Flash** for intelligent test generation
- Automatic fallback on quota exceeded
- Vision capabilities for screenshot analysis

### 📊 Comprehensive Testing
- Positive, negative, and edge case coverage
- Requirements traceability matrix
- Execution history tracking

### 🤖 Automation Ready
- Playwright script generation
- Screenshot-based locator detection
- Server-side script execution

### 📥 Export Capabilities
- Professional Excel reports
- Traceability matrix
- Formatted, ready-to-share

---

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| Backend | Flask (Python) |
| AI Model | Google Gemini AI |
| Database | SQLite |
| File Processing | PyPDF2, python-docx |
| Excel Export | openpyxl |
| Automation | Playwright |

---

## 📊 Database Tables

### `test_cases`
Stores all generated test cases with requirement mapping

### `test_executions`
Tracks execution history, versions, and evidence

---

## 🌐 Base URL

**Local:**
```
http://localhost:5000
```

**Network:**
```
http://<your-ip-address>:5000
```

---

## 🔐 Environment Setup

Create a `.env` file in the project root:

```bash
GEMINI_API_KEY=your_google_gemini_api_key_here
```

---

## 📝 Common Workflows

### 1. Generate Test Cases
```bash
POST /upload
  ├─ Upload requirement document
  └─ Returns: AI-generated test cases
```

### 2. Execute Tests
```bash
POST /execute
  ├─ Record execution results
  └─ Updates: History + Master status
```

### 3. Generate Automation
```bash
POST /generate-automation
  ├─ Provide test case + screenshot
  └─ Returns: Playwright script
```

### 4. Export Results
```bash
GET /export
  └─ Downloads: Excel with test cases + RTM
```

---

## 🎯 Status Values

### Execution Status
- `Not Executed` (default)
- `Passed`
- `Failed`
- `Blocked`

### Priority
- `High`
- `Medium`
- `Low`

### Test Types
- `Functional`
- `Security`
- `Performance`
- `Usability`
- `Integration`
- `Regression`

---

## 🐛 Troubleshooting

### Issue: "Failed to generate test cases"
**Solution:** Check GEMINI_API_KEY, internet connection, API quota

### Issue: "No file provided"
**Solution:** Verify file attachment, size < 16MB, valid extension

### Issue: "Quota exceeded"
**Solution:** Wait 1 minute, system auto-fallbacks to working model

### Issue: Empty export
**Solution:** Ensure test cases exist in database

---

## 📞 Support Files

- **Logs:** `app.log`
- **Database:** `database.db`
- **Uploads:** `uploads/` directory
- **Evidence:** Stored in `uploads/` with prefix `evidence_`

---

## 🎓 Learning Path

**Beginner:**
1. Start with `API_QUICK_REFERENCE.md`
2. Import Postman collection
3. Test basic endpoints (GET /test-cases)

**Intermediate:**
1. Read `API_DOCUMENTATION.md`
2. Test file upload and generation
3. Explore execution tracking

**Advanced:**
1. Study `API_ENDPOINTS_MAP.md`
2. Implement automation workflows
3. Build custom integrations

---

## 📚 Documentation Structure

```
Case10x AI/
├── API_DOCUMENTATION.md           # Complete reference
├── API_QUICK_REFERENCE.md         # Quick lookup
├── API_ENDPOINTS_MAP.md           # Visual diagrams
├── Case10X_AI_Postman_Collection.json  # Postman tests
├── API_DOCS_README.md             # This file
├── app.py                         # Main application
├── database.db                    # SQLite database
├── .env                           # Environment variables
└── uploads/                       # Uploaded files & evidence
```

---

## 🔄 Version History

**v1.0** (Current)
- Complete API documentation
- Postman collection
- Visual endpoint maps
- Quick reference guide

---

## 🚦 Getting Started Checklist

- [ ] Set `GEMINI_API_KEY` in `.env`
- [ ] Start Flask server: `python app.py`
- [ ] Import Postman collection
- [ ] Test AI connection: `GET /test-ai`
- [ ] Upload sample document: `POST /upload`
- [ ] View generated test cases: `GET /test-cases`
- [ ] Export to Excel: `GET /export`

---

## 💡 Pro Tips

1. **Always specify test_suite** for better organization
2. **Use screenshots** in automation generation for accurate locators
3. **Provide version info** when executing tests
4. **Export regularly** for backup
5. **Monitor app.log** for debugging

---

## 🎉 You're Ready!

Choose the documentation file that best suits your needs:
- **Learning?** → Start with `API_QUICK_REFERENCE.md`
- **Developing?** → Use `API_DOCUMENTATION.md`
- **Testing?** → Import `Case10X_AI_Postman_Collection.json`
- **Architecting?** → Study `API_ENDPOINTS_MAP.md`

---

**Happy Testing! 🚀**

*Case10X AI - Intelligent Test Case Generation*
