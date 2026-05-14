# 🚀 n8n Playwright Automation Hub

## Overview
This project implements a fully automated testing pipeline using **n8n** and **Playwright**. It allows for the execution of multiple test suites (ERP, Camp Accommodation) with automated reporting via **Slack** and **Gmail**.

## 🏗️ Architecture
The workflow follows a 6-step consolidated process:
1.  **Schedule/Trigger**: Runs automatically every day at 9:00 AM (or manually).
2.  **Suite Selection**: Defines which products to test (e.g., ERP, Accommodation).
3.  **Discovery (Finder)**: Scans the `tests/` directory for `.spec.js` files.
4.  **Looping**: Iterates through each test file sequentially.
5.  **Execution (Async)**: Runs Playwright tests in the background (headless) to prevent timeouts.
6.  **Reporting**:
    *   **Slack**: Sends a real-time status update (Pass/Fail) for *every* test.
    *   **Gmail**: Sends a high-priority HTML alert only for *failed* tests.

---

## 🛠️ Setup Instructions

### 1. Prerequisites
*   Node.js & npm installed.
*   n8n installed (`npm install n8n -g`).
*   Playwright installed in the project folder.

### 2. Environment Configuration
Due to security restrictions in standard n8n, you **must** start n8n using the provided bypass script:

1.  Navigate to the project folder.
2.  Run **`START_N8N_BYPASS.bat`**.
    *   *This script enables `child_process` execution and increases the heartbeat timeout to 10 minutes.*

### 3. Importing the Workflow
1.  Open n8n at `http://localhost:5678`.
2.  Go to **Workflows > Import from File**.
3.  Select **`N8N_ASYNC_RUNNER.json`**.

### 4. Credentials
*   **Gmail**: Authenticate using OAuth2 or App Password (SMTP).
*   **Slack**: Authenticate using a Bot Token.

---

## 🔍 Troubleshooting

| Issue | Solution |
| :--- | :--- |
| **"Runner Unresponsive"** | Ensure you started n8n with the `.bat` file (increases timeout to 600s). |
| **"Unknown node type"** | n8n is blocking the Command node. This workflow uses "Code" nodes to bypass this. |
| **"JSON property not found"** | The logic is strictly typed. Do not modify the `return { json: ... }` wrappers. |
| **Email Variable Empty** | Use `{{ $json.file }}` instead of looking back at previous nodes. |

---

## 📂 Key Files
*   `N8N_ASYNC_RUNNER.json`: The main workflow file.
*   `START_N8N_BYPASS.bat`: The mandatory startup script.
*   `playwright.config.js`: Global test configuration (Headless: true).

---
*Maintained by QA Automation Team*
