# 🛠️ Manual Workflow Creation Guide (from Scratch)

This document provides step-by-step instructions on how to manually recreate the **Playwright Gmail & Google Chat Automation** workflow in n8n without using the "Import from File" option.

---

## **Phase 1: Initial Setup & Triggers**

1.  **Create New Workflow**: Click on "Workflows" > "Add Workflow" in n8n.
2.  **Manual Trigger**: Click the **+** button, search for `Manual Trigger`, and add it. This allows you to run the automation with one click.

---

## **Phase 2: Configuration & Logic Nodes**

You will need to add **Code** nodes to handle the logic. For each code node, click **+**, search for `Code`, and set the mode to `Run Once for Each Item`.

### **1. Select Product**
*   **Name**: `Select Product`
*   **JavaScript**:
```javascript
const fs = require('fs');
const path = require('path');

// OPTIONS: 'ERP' or 'Camp'
const SELECTED_PRODUCT = 'ERP';

// CLEANUP PREVIOUS RESULTS
const resultsDir = 'C:/Users/veeramani/.gemini/antigravity/scratch/Automation Workflow/temp_results';
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

const products = {
  'ERP': { product: 'ERP', folder: 'ERP', description: 'Run all ERP test scripts' },
  'Camp': { product: 'Camp', folder: 'CampAccomodation', description: 'Run all Camp Accommodation test scripts' }
};

return [{ json: products[SELECTED_PRODUCT] }];
```

### **2. Find Product Test Files**
*   **Name**: `Find Product Test Files`
*   **JavaScript**:
```javascript
const fs = require('fs');
const items = $input.all();
const product = items[0].json.product;
const folder = items[0].json.folder;
const basePath = 'C:/Users/veeramani/desktop/playwright-mcp/tests';
const fullPath = `${basePath}/${folder}`;

const testFiles = fs.readdirSync(fullPath).filter(file => file.endsWith('.spec.js'));
return testFiles.map(file => ({
  json: {
    product,
    folder,
    filename: file,
    testPath: `tests/${folder}/${file}`
  }
}));
```

---

## **Phase 3: The Execution Loop (Split In Batches)**

The "Loop" in n8n is not a code node; it is a dedicated node called **Split In Batches**.

1.  **Add Split In Batches**:
    *   Search for `Split In Batches`.
    *   **Batch Size**: Set to `1` (This ensures it processes one test script at a time).
    *   **Outputs**: This node has two separate output dots:
        *   **Top Output (Loop)**: Goes to the next node you want to repeat (e.g., `Run Playwright Test`).
        *   **Bottom Output (Done)**: Goes to the node you want to run *after* all items are finished (e.g., `Generate Summary Report`).
2.  **Closing the Loop**: 
    *   **CRITICAL STEP**: To make it actually "loop", you must connect the very last node in your chain (like `Gmail Alert` or an `IF` node) **BACK** to the input of the `Split In Batches` node.

3.  **Run Playwright Test (Code Node)**:
    *   **Name**: `Run Playwright Test`
    *   **JavaScript**:
```javascript
const { execSync } = require('child_process');
const item = $input.item.json;
const cmd = `npx playwright test "${item.testPath}"`;
const cwd = 'C:/Users/veeramani/desktop/playwright-mcp';

try {
  const stdout = execSync(cmd, { cwd, stdio: 'pipe', timeout: 300000 }).toString();
  return { json: { ...item, exitCode: 0, status: 'passed', duration: 'Check Log' } };
} catch (e) {
  return { json: { ...item, exitCode: e.status || 1, status: 'failed', stderr: e.stderr.toString() } };
}
```

---

## **Phase 4: Notifications (External Integrations)**

### **1. Google Chat Notification**
*   **Node Type**: `HTTP Request`
*   **Method**: `POST`
*   **URL**: `[PASTE_YOUR_GOOGLE_CHAT_WEBHOOK_URL_HERE]`
*   **Body Parameters**:
    *   Name: `text`
    *   Value (Expression): `={{ '🎯 *Product:* ' + $json.product + '\n' + '🧪 *Test:* ' + $json.filename + '\n' + 'Status: ' + $json.status }}`

### **2. Gmail Alert (Only on Failure)**
*   **Node Type**: `Gmail`
*   **Operation**: `Send Message`
*   **Recipient**: `veeramani.b@algosium.com`
*   **Subject**: `={{ "🚨 " + $json.product + " Test Failed: " + $json.filename }}`
*   **Body**: HTML content with `$json.stderr`.

---

## **Phase 5: Connecting the Dots**

Connect the nodes in this specific order:

1.  **Manual Trigger** ➔ **Select Product**
2.  **Select Product** ➔ **Find Product Test Files**
3.  **Find Product Test Files** ➔ **Test Loop**
4.  **Test Loop (Output 1)** ➔ **Run Playwright Test**
5.  **Run Playwright Test** ➔ **Google Chat Notification**
6.  **Google Chat Notification** ➔ **If Node** (Check if `status` is `failed`)
7.  **If Node (True)** ➔ **Gmail Alert**
8.  **If Node (False) / Gmail Alert** ➔ **Test Loop (Input)**
9.  **Test Loop (Output 2 - Done)** ➔ **Generate Summary Report**.

---

## **✅ Final Steps**
1.  **Save** the workflow (Ctrl+S).
2.  **Execute** to test the first loop.
3.  **Activate** if you want it to run on a schedule (Add a `Schedule` trigger instead of `Manual`).
