# 🛠️ Master Guide: n8n QA Automation Workflow for Playwright

This guide provides a comprehensive overview of implementing and maintaining a professional QA automation pipeline using **n8n**, **Playwright**, and **Slack**.

---

## 📊 Structured Flow Diagram

This diagram represents the logical progression of the automation from trigger to reporting.

```mermaid
graph TD
    %% Trigger Phase
    Trigger[<b>1. Trigger</b><br/>Manual or Scheduled] --> Config[<b>2. Configuration</b><br/>Set ScriptPath Variable]
    
    %% Execution Phase
    Config --> Playwright[<b>3. Playwright Execution</b><br/>npx playwright test]
    Playwright --> CaptStdout[Capture Standard Output]
    Playwright --> CaptStderr[Capture Error Output]
    
    %% Processing Phase
    CaptStdout --> LogicNode[<b>4. Logic Node (Code)</b><br/>Cleanup & Truncate logs]
    CaptStderr --> LogicNode
    
    %% Reporting Phase
    LogicNode --> Slack[<b>5. Slack Notification</b><br/>Formatted Message]
    Slack --> Channel[#automation-results]

    %% Styling
    style Trigger fill:#f9f,stroke:#333,stroke-width:2px
    style Config fill:#bbf,stroke:#333,stroke-width:2px
    style Playwright fill:#dfd,stroke:#333,stroke-width:2px
    style LogicNode fill:#ffd,stroke:#333,stroke-width:2px
    style Slack fill:#fb9,stroke:#333,stroke-width:2px
```

---

## 🧩 n8n Workflow Breakdown

### 1. **Manual Trigger**
- **Type**: `Manual Trigger`
- **Purpose**: Allows you to start the test suite by clicking "Execute Workflow" in the n8n UI.

### 2. **Set Script Path**
- **Type**: `Set` node (Manual Mapping mode)
- **Key**: `ScriptPath`
- **Value Options**:
    - `tests/` (Run ALL tests)
    - `tests/Mailack.spec.js` (Run specific test)
- **Design Intent**: This allows you to change what runs without modifying the execution code.

### 3. **Run Playwright Test**
- **Type**: `Execute Command`
- **Command**: `npx playwright test "{{ $json.ScriptPath }}"`
- **Working Directory**: Provide the absolute path to your project folder.
- **Role**: This node interacts with the local OS to trigger the headless browser tests.

### 4. **Code in JavaScript**
- **Type**: `Code` node
- **Purpose**: This acts as a "Data Cleaner". It captures the messy terminal output and prepares it for Slack.
- **Logic**:
    ```javascript
    return {
      output: item.stdout || item.stderr || "No output",
      status: item.exitCode === 0 ? "Success" : "Failed"
    };
    ```

### 5. **Slack Notification**
- **Type**: `Slack` node
- **Expression**:
    ```javascript
    ={{ '✅ *Playwright Test Results* \n\n' + '```' + ($json.output || "No data").substring(0, 3800) + '```' }}
    ```
- **Design Intent**: Uses Markdown code blocks (backticks) to make the logs readable and prevents Slack error 404/400 by truncating long logs.

---

## ⚙️ Core QA Automation Concepts in n8n

### 🔄 **The "Single Line" Rule (Crucial)**
In n8n, a node runs once for **every** connection coming into it. 
- **The Error**: Connecting both the "Trigger" and "Set" nodes to Slack causes two messages (one empty).
- **The Fix**: Always connect nodes in a **single linear chain**. Data should flow from left to right through every middle step.

### ⏰ **Scheduling**
To turn this into a truly automated pipeline:
1.  Add a **Schedule** node.
2.  Set it to run at specific intervals (e.g., 8:00 AM daily).
3.  Connect the Schedule node to the **Set Script Path** node.

### 📁 **Folder Strategy**
- Keep your scripts in a dedicated `tests/` directory.
- Use a naming convention like `*.spec.js`.
- This allows n8n to execute `npx playwright test tests/` to pick up everything automatically.

---

## 🛠️ Troubleshooting & Maintenance

| Scenario | Solution |
| :--- | :--- |
| **Double Notifications** | Find and delete any "bypass" connections. Ensure a single path to the Slack node. |
| **Timed Out Error** | Update `playwright.config.js` to increase the `timeout` value (current: 60s). |
| **`[undefined]` in Slack** | Ensure the expressions use `$json.output` (from the Code node) and not an old field name. |
| **Wrong Directory** | If you move the project, you **must** update the "Working Directory" in the Execute Command node. |

---

## 📁 System Files Reference

- **`n8n-flexible-workflow.json`**: The core workflow file for importing.
- **`playwright.config.js`**: Controls browser behavior (headless mode, timeouts).
- **`tests/`**: Directory containing your logic (`Mailack`, `ProjectDashboard`, `NewScript`).

---
*Generated for the Automation Workflow Project.*
