# How to Run Different Playwright Scripts in n8n

I have created a new flexible workflow file: `n8n-flexible-workflow.json`.

## 1. Import the New Workflow
1.  Open n8n.
2.  Import `n8n-flexible-workflow.json` from this folder.

## 2. Choose Your Script
This workflow has a specific node designed to let you easily switch which script runs.

1.  Locate the node named **"Set Script to Run"**.
2.  Double-click it to open the settings.
3.  Find the **Value** field for **ScriptPath**.
4.  Enter the relative path to the script you want to run.
    *   **Default**: `tests/Mailack.spec.js` (Run your new mail script)
    *   **Alternative**: `tests/example.spec.js` (Run the original sample)
    *   **Run All**: `.` (Enter a dot to run all tests in the folder)

## 3. Run It
Click **Execute Workflow**.

- It will run the command: `npx playwright test "tests/Mailack.spec.js"` (or whatever you set).
- The Slack notification will include the name of the script that was run.

## Notes
- I have also installed `pdf-parse` in this folder to ensure your `Mailack.spec.js` runs correctly within the n8n environment if it wasn't already fully set up.
