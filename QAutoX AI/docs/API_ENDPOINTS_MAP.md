# Case10X AI - API Endpoints Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Case10X AI API                              │
│                    http://localhost:5000                            │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  📤 FILE UPLOAD & TEST GENERATION                                   │
├─────────────────────────────────────────────────────────────────────┤
│  POST   /upload                                                     │
│         ├─ Upload requirement document (PDF/DOCX/TXT)              │
│         ├─ AI generates comprehensive test cases                   │
│         └─ Returns: Generated test cases with IDs                  │
│                                                                     │
│  POST   /chat                                                       │
│         ├─ Chat with AI about uploaded requirements                │
│         └─ Returns: AI response based on document context          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  📋 TEST CASE MANAGEMENT                                            │
├─────────────────────────────────────────────────────────────────────┤
│  GET    /test-cases                                                 │
│         ├─ Retrieve all test cases                                 │
│         ├─ Optional: Filter by filename (?filename=...)            │
│         └─ Returns: Array of test case objects                     │
│                                                                     │
│  GET    /test-cases?filename=requirements.pdf                       │
│         └─ Get test cases for specific requirement file            │
│                                                                     │
│  PUT    /test-cases/<id>                                            │
│         ├─ Update specific test case                               │
│         └─ Returns: Success message                                │
│                                                                     │
│  DELETE /test-cases/<id>                                            │
│         ├─ Delete specific test case                               │
│         └─ Returns: Success message                                │
│                                                                     │
│  DELETE /test-cases/clear-all                                       │
│         ├─ Delete ALL test cases (⚠️ Irreversible!)                │
│         └─ Returns: Count of deleted test cases                    │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  ▶️  TEST EXECUTION                                                 │
├─────────────────────────────────────────────────────────────────────┤
│  POST   /execute                                                    │
│         ├─ Record test execution result                            │
│         ├─ Supports: Status, Version, Comments, Defect ID          │
│         ├─ Optional: Evidence file upload                          │
│         ├─ Updates: Execution history + Master status              │
│         └─ Returns: Success message + evidence filename            │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  📊 REPORTS & ANALYTICS                                             │
├─────────────────────────────────────────────────────────────────────┤
│  GET    /reports                                                    │
│         ├─ Get aggregated execution statistics                     │
│         ├─ Grouped by: Version & Status                            │
│         └─ Returns: { "Version": { "Passed": X, "Failed": Y } }    │
│                                                                     │
│  GET    /defects                                                    │
│         ├─ Get all failed test executions                          │
│         ├─ Includes: Test case details, comments, defect IDs       │
│         └─ Returns: Array of defect objects (sorted by date)       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  🤖 AI-POWERED FEATURES                                             │
├─────────────────────────────────────────────────────────────────────┤
│  POST   /generate-automation                                        │
│         ├─ Generate Playwright automation script                   │
│         ├─ Input: Test case + Optional screenshot                  │
│         ├─ Supports: Target URL, login credentials                 │
│         └─ Returns: JavaScript Playwright test script              │
│                                                                     │
│  POST   /run-automation-script                                      │
│         ├─ Execute automation script on server                     │
│         ├─ Timeout: 30 seconds                                     │
│         └─ Returns: Execution status + output                      │
│                                                                     │
│  POST   /generate-defect                                            │
│         ├─ Generate professional bug report using AI               │
│         ├─ Input: Test case + Failure reason                       │
│         └─ Returns: Structured bug report (Markdown)               │
│                                                                     │
│  GET    /test-ai                                                    │
│         ├─ Test Gemini AI connection                               │
│         └─ Returns: API status + test message                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  📥 EXPORT & DOWNLOAD                                               │
├─────────────────────────────────────────────────────────────────────┤
│  GET    /export                                                     │
│         ├─ Export all test cases to Excel (.xlsx)                  │
│         ├─ Sheet 1: Detailed test cases                            │
│         ├─ Sheet 2: Requirements Traceability Matrix               │
│         └─ Returns: Excel file download                            │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  🏠 UTILITY                                                         │
├─────────────────────────────────────────────────────────────────────┤
│  GET    /                                                           │
│         └─ Serve main application HTML page                        │
└─────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════
                            DATA FLOW
═══════════════════════════════════════════════════════════════════════

1. UPLOAD WORKFLOW
   ┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
   │  Upload  │ ───▶ │ Extract  │ ───▶ │ Gemini   │ ───▶ │  Save to │
   │   File   │      │   Text   │      │    AI    │      │ Database │
   └──────────┘      └──────────┘      └──────────┘      └──────────┘

2. EXECUTION WORKFLOW
   ┌──────────┐      ┌──────────┐      ┌──────────┐
   │ Execute  │ ───▶ │  Record  │ ───▶ │  Update  │
   │   Test   │      │ History  │      │  Status  │
   └──────────┘      └──────────┘      └──────────┘

3. AUTOMATION WORKFLOW
   ┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
   │   Test   │ ───▶ │ Gemini   │ ───▶ │Generate  │ ───▶ │  Execute │
   │   Case   │      │    AI    │      │  Script  │      │  Script  │
   └──────────┘      └──────────┘      └──────────┘      └──────────┘

4. EXPORT WORKFLOW
   ┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
   │  Fetch   │ ───▶ │  Format  │ ───▶ │  Create  │ ───▶ │ Download │
   │   Data   │      │   Excel  │      │   RTM    │      │   File   │
   └──────────┘      └──────────┘      └──────────┘      └──────────┘


═══════════════════════════════════════════════════════════════════════
                        REQUEST/RESPONSE TYPES
═══════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│  Content-Type: multipart/form-data                                  │
├─────────────────────────────────────────────────────────────────────┤
│  • POST /upload                                                     │
│  • POST /execute (with evidence file)                              │
│  • POST /generate-automation (with screenshot)                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  Content-Type: application/json                                     │
├─────────────────────────────────────────────────────────────────────┤
│  • POST /chat                                                       │
│  • POST /execute (without file)                                    │
│  • PUT  /test-cases/<id>                                           │
│  • POST /run-automation-script                                     │
│  • POST /generate-defect                                           │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  Response: application/json                                         │
├─────────────────────────────────────────────────────────────────────┤
│  • All endpoints except / and /export                              │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  Response: application/vnd.openxmlformats-...                       │
├─────────────────────────────────────────────────────────────────────┤
│  • GET /export (Excel file)                                        │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  Response: text/html                                                │
├─────────────────────────────────────────────────────────────────────┤
│  • GET /                                                           │
└─────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════
                          DATABASE SCHEMA
═══════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│  TABLE: test_cases                                                  │
├─────────────────────────────────────────────────────────────────────┤
│  • id (PK)                    • priority                            │
│  • requirement_file           • test_type                           │
│  • requirement_id             • status                              │
│  • requirement_description    • test_suite                          │
│  • test_case_name             • created_at                          │
│  • description                                                      │
│  • preconditions                                                    │
│  • test_steps                                                       │
│  • expected_result                                                  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  TABLE: test_executions                                             │
├─────────────────────────────────────────────────────────────────────┤
│  • id (PK)                    • comments                            │
│  • test_case_id (FK)          • defect_id                           │
│  • version                    • evidence_file                       │
│  • status                     • executed_at                         │
└─────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════
                        AI MODEL USAGE
═══════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│  Model: gemini-2.5-flash                                            │
├─────────────────────────────────────────────────────────────────────┤
│  Used in:                                                           │
│  ✓ Test case generation (/upload)                                  │
│  ✓ Chat functionality (/chat)                                      │
│  ✓ Automation script generation (/generate-automation)             │
│  ✓ Defect report generation (/generate-defect)                     │
│  ✓ AI connection test (/test-ai uses gemini-1.5-flash)            │
│                                                                     │
│  Features:                                                          │
│  • Automatic fallback on quota exceeded                            │
│  • JSON response formatting                                        │
│  • Vision capabilities (screenshot analysis)                       │
└─────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════
                      AUTHENTICATION & SECURITY
═══════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│  • No API authentication required (local use)                      │
│  • GEMINI_API_KEY required in environment variables                │
│  • File upload size limit: 16MB                                    │
│  • Allowed file types: PDF, DOCX, TXT                              │
│  • Script execution timeout: 30 seconds                            │
│  • ⚠️  /run-automation-script executes arbitrary code              │
└─────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════
                        ERROR HANDLING
═══════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│  HTTP 200 - Success                                                 │
│  HTTP 400 - Bad Request (missing/invalid parameters)                │
│  HTTP 500 - Internal Server Error (processing/AI errors)            │
│                                                                     │
│  Error Response Format:                                             │
│  {                                                                  │
│    "error": "Error message description"                            │
│  }                                                                  │
└─────────────────────────────────────────────────────────────────────┘
```
