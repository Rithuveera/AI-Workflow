---
description: Run the Google Chat and Gmail n8n workflow
---

# Run Google Chat & Gmail Workflow

This workflow executes Playwright tests and sends notifications to Google Chat and Gmail instead of Slack.

## Prerequisites

- **n8n** installed and running (`http://localhost:5678`).
- **Google Chat Webhook URL** created.
- **Gmail Credentials** configured in n8n.

## steps

1.  **Import the workflow**:
    -   Open n8n.
    -   Import `workflows/n8n-gmail-googlechat-workflow.json`.

2.  **Configure Google Chat**:
    -   Localize the "Google Chat Notification" node.
    -   Replace `YOUR_GOOGLE_CHAT_WEBHOOK_URL` with your actual webhook URL.
    -   Do the same for the "Google Chat Summary" node.

3.  **Run the workflow**:
    -   Open the workflow.
    -   Click **Execute Workflow**.

## Validation

- check Google Chat for messages.
- check Gmail for summary emails.
