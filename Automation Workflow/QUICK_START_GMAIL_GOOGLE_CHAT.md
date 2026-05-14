# 📧 QUICK GUIDE: Gmail & Google Chat Automation Workflow

## ✅ **New Workflow Created!**

This workflow replaces Slack notifications with **Google Chat** and **Gmail**.

---

## 📥 **How to Use It**

### **Step 1: Open n8n**
1.  Go to `http://localhost:5678` in your browser.
2.  Import the new file: `workflows/n8n-gmail-googlechat-workflow.json`.

### **Step 2: Configure Google Chat**
You need to set up a Webhook URL for your Google Chat space.

1.  Open **Google Chat**.
2.  Go to the Space where you want notifications.
3.  Click the arrow next to the Space name → **Apps & integrations**.
4.  Click **Manage webhooks**.
5.  Name it (e.g., "n8n Automation") and click **Save**.
6.  Copy the **Webhook URL**.

### **Step 3: Update the Workflow**
1.  Find the node named **Google Chat Notification**.
2.  Double-click it.
3.  Paste your Webhook URL into the **URL** field (replacing `YOUR_GOOGLE_CHAT_WEBHOOK_URL`).
4.  Find the node named **Google Chat Summary**.
5.  Double-click it.
6.  Paste the same Webhook URL into the **URL** field.
7.  **Save** the workflow.

### **Step 4: Configure Gmail**
1.  The Gmail nodes are preset to send to `veeramani.b@algosium.com`.
2.  If you need to change the recipient, double-click **Gmail Alert** and **Gmail Summary** nodes and update the "To Email" field.
3.  Ensure your Gmail credentials are authenticated in n8n (click "Credential for Gmail" in the node if needed).

---

## 🔄 **What This Workflow Does**

1.  **Product Selection**: Choose between 'ERP' or 'Camp' (just like the previous workflow).
2.  **Runs Tests**: Executes Playwright scripts.
3.  **Google Chat Updates**: Sends a message to Google Chat for **each test** status (Pass/Fail).
4.  **Failure Alerts**: Sends an **Email** immediately if a test fails.
5.  **Final Summary**:
    *   Sends a full summary report to **Google Chat**.
    *   Sends a full summary report to **Gmail**.

---

## 📊 **Notification Channels**

| Event | Channel | Content |
|-------|---------|---------|
| **Test Finished** | Google Chat | Test Name, Status (✅/❌), Duration |
| **Test Failed** | Gmail | detailed error logs & output |
| **Workflow Done** | Google Chat | Summary counts (Pass/Fail/Total) & Rate |
| **Workflow Done** | Gmail | HTML Summary Report |

---

## 🚀 **Quick Test**

1.  Set the product (default is 'ERP') in the "Select Product" node.
2.  Click **Execute Workflow**.
3.  Watch your Google Chat for updates!
