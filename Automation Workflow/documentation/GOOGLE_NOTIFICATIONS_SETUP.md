# 📧 Google Notifications Configuration Guide (Gmail & Chat)

This guide provides step-by-step instructions to connect your n8n workflow to **Google Chat** and **Gmail**.

---

## **Part 1: Google Chat Webhook (Super Easy)**
This allows the workflow to send "Live" updates to your Google Chat Space.

1.  **Open Google Chat**: Go to [chat.google.com](https://chat.google.com).
2.  **Select a Space**: Open the Space (group chat) where you want notifications.
3.  **App & Integrations**: 
    *   Click the **Arrow ▾** next to the Space name.
    *   Select **Apps & integrations**.
    *   Click **Manage webhooks**.
4.  **Create Webhook**:
    *   **Name**: `ERP Automation Bot`
    *   Click **Save**.
5.  **Copy URL**: Click the **Copy icon** next to the URL.
6.  **In n8n**:
    *   Open your workflow.
    *   Double-click the **Google Chat Notification** (or Summary) node.
    *   Paste the URL into the **URL** field.

---

## **Part 2: Gmail API Configuration (Secure Method)**
This allows n8n to send rich HTML summary emails and failure alerts.

### **Phase A: Create a Google Cloud Project**
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  **New Project**: Click the project dropdown (top left) > **New Project** > Name it `n8n-Alerts`.
3.  **Enable API**: Search for "Gmail API" and click **Enable**.

### **Phase B: Configure OAuth Consent**
1.  Go to **APIs & Services > OAuth consent screen**.
2.  User Type: **External** > Click **Create**.
3.  Fill in:
    *   **App Name**: `n8n Automation`
    *   **Support Email**: `veeramani.b@algosium.com`
    *   **Developer Contact**: `veeramani.b@algosium.com`
4.  **Scopes**: Add `https://www.googleapis.com/auth/gmail.send`.

### **Phase C: Generate Credentials**
1.  Go to **APIs & Services > Credentials**.
2.  Click **Create Credentials > OAuth client ID**.
3.  **Application type**: Web application.
4.  **Authorized Redirect URI**: 
    *   In n8n, open a Gmail node and click **Create New Credential**. 
    *   Copy the **OAuth Redirect URL** shown there (e.g., `http://localhost:5678/rest/oauth2-callback`).
    *   Paste it into the Google Cloud "Authorized Redirect URIs" field.
5.  Click **Create**. **Copy your Client ID and Client Secret.**

### **Phase D: Link to n8n**
1.  In n8n (Gmail node settings), paste the **Client ID** and **Client Secret**.
2.  Click **Connect my account**.
3.  Log in to your Google account and click **Allow** (even if you see a "Google hasn't verified this app" warning—click "Advanced" to proceed).

---

## **Part 3: Alternate Gmail Method (App Password)**
*If Part 2 is too complex, use this simpler method with the **SMTP node**.*

1.  Go to your [Google Account Security](https://myaccount.google.com/security).
2.  Enable **2-Step Verification**.
3.  Search for **App passwords**.
4.  Select **App: Mail** and **Device: Windows Computer**.
5.  **Copy the 16-character code**.
6.  **In n8n**: Add an **SMTP node** instead of Gmail.
    *   **Host**: `smtp.gmail.com`
    *   **Port**: `465` (Secure)
    *   **User**: `veeramani.b@algosium.com`
    *   **Password**: Paste the 16-character code.

---

## **✅ Summary Checklist**
*   [ ] Google Chat Webhook URL pasted in HTTP nodes.
*   [ ] Gmail API Client ID/Secret or App Password connected.
*   [ ] All nodes displaying a green "Connected" status.
