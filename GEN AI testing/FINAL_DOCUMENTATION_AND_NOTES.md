# Master Documentation: Agentic AI Test Automation Pipeline

## 1. Overview
This pipeline uses a Multi-Agent LangGraph architecture to automate the end-to-end software testing lifecycle. It integrates Jira requirements with Playwright (JavaScript) execution, leveraging existing Page Object Models (POMs) for high-fidelity selector selection.

## 2. Architecture
The pipeline consists of 5 specialized AI agents:
1. **Jira Fetcher**: Retrieves ticket title and description using the Jira REST API.
2. **POM Reader**: Scans the local `/pages` directory to provide the AI with existing UI selectors.
3. **QA Analyst**: Translates requirements into BDD (Given/When/Then) scenarios.
4. **Automation Developer**: Writes executable Playwright JavaScript code (`.spec.js`).
5. **Test Runner**: Executes the test via `npx playwright test` and captures logs.

## 3. How to Run the Pipeline
Open your terminal in the project directory and run:

```powershell
# Syntax: python langgraph_qa_pipeline.py <JIRA_TICKET_ID>
python langgraph_qa_pipeline.py ER-628
```

## 4. Configuration & Environment Variables
The following environment variables must be set for the pipeline to function:
- `JIRA_URL`: Your Jira instance URL.
- `JIRA_EMAIL`: Your Jira account email.
- `JIRA_API_TOKEN`: Your Jira API token.
- `GEMINI_API_KEY`: Your Google Gemini API key.
- `APP_USER`: Application login username (e.g., Veera).
- `APP_PASSWORD`: Application login password (e.g., Rithu@11).
- `APP_BASE_URL`: The base URL of your application (e.g., https://datnext-qa.algosium.com/login).

## 5. Deployment Features
- **POM Ingestion**: The AI automatically reads `pages/*.js` to use your team's standard selectors.
- **Auto-Login**: Guaranteed login logic is injected into every generated test.
- **Reporting**: Full execution logs are displayed in the terminal after every run.

## 6. Troubleshooting
- **429 Resource Exhausted**: This occurs if the Gemini Free Tier limit (20 requests/day) is reached. Wait 60 seconds and retry.
- **Selector Failures**: If the dashboard or internal pages change, update the selectors in the `Automation Developer` prompt within `langgraph_qa_pipeline.py`.

---
*Created by Antigravity AI for the Agentic Test Automation Pipeline project.*
