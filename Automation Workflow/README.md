# 🎭 Playwright + n8n Automation Hub

This repository contains a full-stack QA automation pipeline that integrates **Playwright** for end-to-end testing, **n8n** for workflow orchestration, and **Slack** for real-time reporting.

## 🚀 Overview
We have automated the **Internal Enquiry** and **Mail Acknowledgement** flows. Instead of manual verification, our system:
1. Triggers tests via n8n (Manual or Scheduled).
2. Executes Playwright scripts in headless mode.
3. Downloads and parses PDF exports to verify data accuracy.
4. Notifies the team on Slack with detailed logs and success/failure status.

## 📁 Project Structure
- `tests/`: JavaScript Playwright test scripts.
- `n8n-final-fix.json`: The production-ready n8n workflow for import.
- `COMPLETE_DOCUMENTATION.md`: Full technical guide and "How-To".
- `LINKEDIN_CAROUSEL.pdf`: A visual presentation of this project for social sharing.
- `Images/`: High-resolution graphics and mockups used in documentation.

## 🛠️ Quick Start
1. **Install Dependencies**:
   ```bash
   npm install
   npx playwright install
   ```
2. **Start n8n**: Run `.\start_n8n.ps1` in PowerShell.
3. **Import Workflow**: Import `n8n-final-fix.json` into your local n8n instance (http://localhost:5678).
4. **Run**: Trigger the workflow to see Playwright and Slack in action!

## 📸 Media & Presentation
We have prepared a professional "Showcase" kit for this project:
- **Branding**: `Images/playwright_n8n_slack_clean.png`
- **Workflow**: `Images/n8n_workflow_clean.png`
- **Results**: `Images/slack_result_mockup.png`

---
*Built with precision for the modern QA Team.*
