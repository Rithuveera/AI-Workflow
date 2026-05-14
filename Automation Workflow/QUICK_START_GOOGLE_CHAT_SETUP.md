# 🔗 How to Get & Set Your Google Chat Webhook URL

This guide will help you get the **Webhook URL** from Google Chat and paste it into n8n.

---

## **Part 1: Get the Webhook URL from Google Chat**

1.  **Open Google Chat** in your browser (chat.google.com).
2.  Go to the **Space** (group chat) where you want to receive notifications.
3.  Click the **Arrow ▾** next to the Space name at the top.
4.  Select **Apps & integrations**.
    *   *(If you don't see this, click "Manage webhooks" directly if available, or ask your admin).*
5.  Click the **Manage webhooks** button.
6.  A popup will appear. Fill in:
    *   **Name**: `n8n Automation` (or any name you like).
    *   **Avatar URL**: (Optional) You can leave this blank.
7.  Click **Save**.
8.  ✅ You will see a `Copy` icon next to the new webhook. **Click it to copy the URL**.

> **Note:** The URL will look like this:
> `https://chat.googleapis.com/v1/spaces/AAAA.../messages?key=AIza...`

---     

## **Part 2: Paste the URL into n8n**

1.  **Open your n8n workflow**.
2.  Find the node named **Google Chat Notification**.
3.  **Double-click** the node to open its settings.
4.  Look for the field labeled **URL**.
5.  **Delete** the placeholder text: `YOUR_GOOGLE_CHAT_WEBHOOK_URL`.
6.  **Paste** your copied URL (Ctrl+V).
7.  Click the **X** or **Back to canvas** (changes are auto-saved in the node view).

---

## **Part 3: Repeat for the Summary Node**

1.  Find the **other** node named **Google Chat Summary**.
    *   *(It's usually at the end of the workflow, on the right side).*
2.  **Double-click** it.
3.  Paste the **same URL** into the **URL** field there too.
4.  **Save the whole workflow** (Ctrl+S or click "Save" at the top right).

---

## ✅ **All Done!**

Now, when you run the workflow, n8n will send messages to that Google Chat Space.
