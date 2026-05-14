# 🔍 n8n Workflow Process: Node-by-Node Explanation (ERP Example)

This document explains exactly what happens inside each node during a real execution of your ERP automation.

---

### **1. Manual Trigger**
*   **What it does:** Starts the engine.
*   **Real-time Example:** You click "Execute Workflow". It sends a start signal to the next node.
*   **Data Passing:** `{ "timestamp": "2026-02-16..." }`

---

### **2. Select Product (Code Node)**
*   **What it does:** Sets the target. It defines which folder we are going to look into.
*   **Real-time Example:** You have the code set to `SELECTED_PRODUCT = 'ERP'`. 
*   **Output Data:**
    ```json
    {
      "product": "ERP",
      "folder": "ERP"
    }
    ```

---

### **3. Find Product Test Files (Code Node)**
*   **What it does:** Scans your hard drive. It looks inside `C:/.../tests/ERP` and lists every `.spec.js` file.
*   **Real-time Example:** It finds `RelatedEnquiry.spec.js` and `Cloning.spec.js`.
*   **Output Data (Array of items):**
    ```json
    [
      { "filename": "RelatedEnquiry.spec.js", "testPath": "tests/ERP/RelatedEnquiry.spec.js" },
      { "filename": "Cloning.spec.js", "testPath": "tests/ERP/Cloning.spec.js" }
    ]
    ```

---

### **4. Loop Over Items (Split In Batches)**
*   **What it does:** The Traffic Controller. It takes the list of files and lets them through **one by one**.
*   **Real-time Example:** 
    *   **Iteration 1:** It picks `RelatedEnquiry.spec.js` and sends it to the "loop" output.
    *   **Iteration 2:** It waits for the loop to finish, then picks `Cloning.spec.js`.
*   **Status:** "Looping" until the list is empty.

---

### **5. Run Playwright Test (Code Node)**
*   **What it does:** The Heavy Lifter. It opens a hidden terminal and runs the command: `npx playwright test "tests/ERP/RelatedEnquiry.spec.js"`.
*   **Real-time Example:** 
    *   It waits for the test to finish (passed or failed).
    *   If it passes, it sets `exitCode: 0`.
    *   If it fails, it captures the error message from the terminal.
*   **Output Data:**
    ```json
    {
      "filename": "RelatedEnquiry.spec.js",
      "status": "passed",
      "exitCode": 0
    }
    ```

---

### **6. Google Chat Notification (HTTP Request)**
*   **What it does:** The Messenger. It takes the result from the previous node and sends a POST request to your Google Chat Webhook.
*   **Real-time Example:** You see a message in your Google Chat Space:
    > 🎯 **Product:** ERP  
    > 🧪 **Test:** RelatedEnquiry.spec.js  
    > ✅ **Status:** PASSED

---

### **7. If Failed (IF Node)**
*   **What it does:** The Decision Maker. It checks if `exitCode != 0`.
*   **Real-time Example:**
    *   If `RelatedEnquiry` passed ➔ Exit via **False** (goes straight back to Loop).
    *   If `RelatedEnquiry` failed ➔ Exit via **True** (goes to Gmail Alert).

---

### **8. Gmail Alert (Gmail Node)**
*   **What it does:** Emergency Notification. Only runs if a test fails.
*   **Real-time Example:** Sends an email to `veeramani.b@algosium.com` with the subject: `🚨 ERP Test Failed: RelatedEnquiry.spec.js`.

---

### **9. Generate Summary (Code Node)**
*   **What it does:** The Accountant. It only runs *after* the loop is completely **Done**. It gathers all results (how many passed, how many failed).
*   **Real-time Example:**
    ```json
    {
      "total": 2,
      "passed": 2,
      "failed": 0,
      "successRate": "100%"
    }
    ```

---

### **10. Google Chat Summary (HTTP Request)**
*   **What it does:** Final Report. Sends one final message to the group.
*   **Real-time Example:** 
    > 📊 **ERP Test Suite Summary**  
    > ✅ Passed: 2  
    > ❌ Failed: 0  
    > 🎯 Success Rate: 100%
