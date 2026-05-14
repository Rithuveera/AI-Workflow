# 📂 Project Structure: Automation Workflow Hub

This project is organized into modular directories to maintain clarity between our technical code, n8n workflows, and sharing assets.

## 📁 Directory Overview

### 🤖 `workflows/`
Contains all n8n workflow export files (`.json`).
- **Primary:** `n8n-product-wise-workflow.json` (Latest stable automated hub)
- **Enhanced Errors:** `n8n-premium-v4-enhanced-errors.json` (Full suite with detailed error tracking)
- **Partial Execution:** `n8n-premium-v4-partial-execution.json` (Select specific tests to run)
- **Archive:** Historical versions and experimental runners.

### 📄 `documentation/`
All markdown-based guides and technical deep-dives.
- `QUICK_START_PRODUCT_SELECTION.md`: How to switch between Product 1 and Product 2.
- `PROJECT_STRUCTURE.md`: This guide.
- `AUTOMATION_ISSUES_LOG.md`: Tracking and resolution of technical bugs.

### 🎨 `sharing/`
Assets for LinkedIn, stakeholders, and external documentation.
- **HTML:** Clean source templates for carousels.
- **PDF:** Final generated carousels (e.g., `LATEST_PRODUCT_WORKFLOW_CAROUSEL_REFINED.pdf`).
- **Images:** Screenshots, branding, and workflow canvas graphics.

### 📜 `scripts/`
Automation utilities and helper scripts.
- `generate_pdf.js`: The Playwright-based engine that converts HTML layouts into premium PDFs.
- `*.bat` / `*.ps1`: Startup and bypass scripts for the n8n environment.

### ⚙️ `config/`
Global configuration files.
- `playwright.config.js`: Browser execution settings (Root).
- `unlocked_config.json`: Environment-specific n8n unlocks.

### 🧪 `tests/`
The core Playwright test suite (JavaScript specs).

---

## 🚀 Common Commands

### Generate Latest PDFs
```bash
node scripts/generate_pdf.js
```

### Run Tests
```bash
npx playwright test
```

---
*Maintained by the QA Automation Team*
