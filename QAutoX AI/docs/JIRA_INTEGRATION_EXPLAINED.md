# 🔗 JIRA Integration: Feature Explanation & Implementation Plan

## 📌 What is this functionality?
This feature allows users to send the AI-generated test cases directly from your **Case10X** application into **Atlassian JIRA**, which is the industry-standard tool for tracking software issues and tasks.

Instead of downloading an Excel file, opening JIRA, creating a new issue, and copy-pasting the Title, Description, Steps, and Priority manually for *each* test case, the user clicks **one button**, and it happens automatically.

---

## 🛠️ How It Works (The Workflow)

### 1. Configuration (One-time setup)
The user needs to connect your app to their JIRA account.
*   **JIRA URL:** e.g., `https://your-company.atlassian.net`
*   **Email:** The user's JIRA email.
*   **API Token:** A secure password replacement generated in JIRA settings.
*   **Project Key:** The short code for their project (e.g., `PROJ`, `QA`).

### 2. The "Push to JIRA" Action
1.  The user selects one or multiple test cases in your app.
2.  Clicks the **"Push to JIRA"** button.
3.  The app sends this data to the JIRA API.

### 3. The Result in JIRA
For each test case, a new **Issue** is created in JIRA with:
*   **Summary:** Mapped from `Test Case Name`.
*   **Description:** Mapped from `Description`, `Preconditions`, `Test Steps`, and `Expected Result`.
*   **Priority:** Mapped from `Priority` (High -> High, Medium -> Medium).
*   **Labels:** Auto-tagged with `AI-Generated`, `Case10X`.

---

## 🏗️ Technical Implementation Plan

To add this to your current Flask application, we would need the following components:

### 1. Backend (Python/Flask)
We will use the **JIRA REST API**.

**New Endpoint:** `/api/jira/push`
*   **Input:** List of Test Case IDs, JIRA Config (URL, Auth).
*   **Logic:**
    *   Loop through selected test cases.
    *   Format the description (Markdown or JIRA Wiki format).
    *   Send a `POST` request to `https://<site-url>/rest/api/3/issue`.
*   **Output:** Success message with links to the created JIRA tickets.

**Example Python Code Logic:**
```python
import requests
from requests.auth import HTTPBasicAuth

def create_jira_issue(test_case, jira_config):
    url = f"{jira_config['url']}/rest/api/3/issue"
    
    auth = HTTPBasicAuth(jira_config['email'], jira_config['api_token'])
    
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    
    payload = {
        "fields": {
            "project": {"key": jira_config['project_key']},
            "summary": test_case['test_case_name'],
            "description": {
                "type": "doc",
                "version": 1,
                "content": [
                    {
                        "type": "paragraph",
                        "content": [{"type": "text", "text": f"Steps:\n{test_case['test_steps']}\n\nExpected Result:\n{test_case['expected_result']}"}]
                    }
                ]
            },
            "issuetype": {"name": "Bug"}  # or "Task" or "Test"
        }
    }
    
    response = requests.post(url, json=payload, headers=headers, auth=auth)
    return response.json()
```

### 2. Frontend (HTML/JS)
*   **Settings Modal:** A place for the user to enter their JIRA credentials (stored in `localStorage` or session for security).
*   **Selection Checkboxes:** Allow selecting specific rows in the test case table.
*   **Button:** A "Push to JIRA" button that becomes active when items are selected.
*   **Status Indicators:** Show a spinner while pushing, and a checkmark/link when done.

---

## 💎 Value Proposition (Why add this?)

1.  **Speed:** Converts a 5-minute manual task (per ticket) into a 1-second automated task.
2.  **Accuracy:** Eliminates copy-paste errors.
3.  **Traceability:** You can save the JIRA Ticket ID back into your database, linking the AI test case to the real JIRA ticket.
4.  **Professionalism:** Makes your tool "Enterprise Ready." Teams cannot use a tool that doesn't talk to their issue tracker.

---

## 📝 Next Steps if you want to proceed:

1.  **Get a JIRA Account:** You (as the developer) need a free Atlassian account to test the API.
2.  **Add "Settings" Page:** To save API credentials.
3.  **Create the API Route:** Implement the Python logic to call JIRA.
4.  **Update UI:** Add the button and connection forms.

**Shall we start by creating a simple "JIRA Settings" modal in your UI?**
