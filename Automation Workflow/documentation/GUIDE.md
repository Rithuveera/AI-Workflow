# How to Run Playwright Scripts with n8n and Send Slack Notifications

This guide explains how to integrate your Playwright scripts with n8n to automate execution and receive Slack notifications.

## 1. Setup Playwright (Already Done)
I have already set up a sample Playwright project for you in this directory.
- **Tests Location**: `tests/example.spec.js`
- **Configuration**: `playwright.config.js` (default)
- **Dependencies**: Installed (`@playwright/test`)

To verify the tests run locally, open the terminal in this directory and run:
```powershell
npx playwright test
```

## 2. Setup n8n Workflow

I have created a ready-to-import workflow file named `n8n-workflow.json` in this directory.

### Importing the Workflow
1.  Open your n8n dashboard (e.g., http://localhost:5678).
2.  Click on **Workflows** in the sidebar.
3.  Click **Add workflow** -> **Import from File**.
4.  Select the `n8n-workflow.json` file from this folder.

### Configuring the Nodes

#### 1. "Run Playwright Tests" (Execute Command Node)
This node runs the command `npx playwright test`.
- **Working Directory**: It is currently set to:
  `C:/Users/veeramani/.gemini/antigravity/scratch/Automation Workflow`
  
  **Important**: If you move this project folder to another location, you **MUST** update this path in the n8n node settings.

#### 2. "Slack Notification" (Slack Node)
This node sends a message to Slack when the tests pass.
- **Credential**: You need to set up your Slack credentials in n8n.
    1.  Double-click the simple **Slack Notification** node.
    2.  Under **Credential for Slack API**, select or create use a new credential.
    3.  Follow the n8n guide to get your Slack OAuth Token or Webhook URL.
- **Channel**: Change the `channel` parameter to the specific Slack channel you want to notify (e.g., `#alerts` or `general`).

## 3. Running the Workflow
1.  Click **Execute Workflow** at the bottom of the n8n canvas.
2.  n8n will trigger the command.
3.  Wait for the tests to finish (check the n8n execution log).
4.  You should receive a Slack message with the test output!

## Troubleshooting
- **"Command not found" error**: Ensure n8n is running in an environment where `node` and `npm` are accessible, or specify the full path to `npx` (e.g., `C:\Program Files\nodejs\npx.cmd`).
- **Permission errors**: Ensure the n8n process has read/write permissions to the project folder.
