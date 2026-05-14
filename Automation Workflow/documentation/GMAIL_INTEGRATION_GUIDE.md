# 📧 Gmail Integration Guide for n8n

Follow these step-by-step instructions to connect your Gmail account to n8n for automated test reporting.

## Phase 1: Google Cloud Console Setup

1.  **Create a New Project**:
    *   Go to the [Google Cloud Console](https://console.cloud.google.com/).
    *   Click the project dropdown in the top left and select **"New Project"**.
    *   Name it `n8n Automation` and click **Create**.

2.  **Enable Gmail API**:
    *   In the sidebar, go to **APIs & Services > Library**.
    *   Search for **"Gmail API"**.
    *   Click on it and select **Enable**.

3.  **Configure OAuth Consent Screen**:
    *   Go to **APIs & Services > OAuth consent screen**.
    *   Select **External** and click **Create**.
    *   Fill in required fields:
        *   **App name**: `n8n Report Bot`
        *   **User support email**: Your email address.
        *   **Developer contact info**: Your email address.
    *   Click **Save and Continue** until you reach the dashboard.
    *   **Crucial Step**: Under "Test users", click **Add Users** and add your Gmail address.

4.  **Create Credentials**:
    *   Go to **APIs & Services > Credentials**.
    *   Click **+ Create Credentials** > **OAuth client ID**.
    *   **Application type**: Web application.
    *   **Name**: `n8n Client`.
    *   **Authorized redirect URIs**: 
        *   If using n8n Desktop: `http://localhost:5678/rest/oauth2-callback`
        *   If using hosted n8n: `https://<your-n8n-url>/rest/oauth2-callback`
    *   Click **Create**.
    *   **Copy your Client ID and Client Secret**.

---

## Phase 2: n8n Configuration

1.  **Open n8n Credentials**:
    *   In n8n, go to **Credentials** in the left sidebar.
    *   Click **Add Credential** and search for **"Gmail OAuth2 API"**.

2.  **Enter Credentials**:
    *   **Authentication**: OAuth2.
    *   **Client ID**: Paste from Google Cloud.
    *   **Client Secret**: Paste from Google Cloud.
    *   **Scopes**: Ensure `https://www.googleapis.com/auth/gmail.send` is included (or select "Compose and Send").

3.  **Connect Account**:
    *   Click **Sign in with Google**.
    *   A popup will appear. Select your Gmail account.
    *   *Note: Since the app is "Unverified", you may need to click "Advanced" and "Go to n8n (unsafe)".*
    *   Click **Allow**.

---

## Phase 3: Updating the Workflow

1.  **Configure Gmail Node**:
    *   Open your workflow (e.g., `n8n-test-short-run.json`).
    *   Click on the **Gmail Summary** or **Gmail Alert** node.
    *   Select your newly created `Gmail OAuth2 API` credentials.
    *   Set **Resource** to `Message` and **Operation** to `Send`.

2.  **Test Run**:
    *   Click **Execute Node** to verify that an email is sent successfully.

---

## 💡 Troubleshooting Tips

*   **Error: "403 Access Not Configured"**: Ensure you enabled the Gmail API in Phase 1, Step 2.
*   **Error: "Invalid Redirect URI"**: Double-check that the URI in Google Cloud matches exactly what is shown in the n8n credential setup window.
*   **Token Expired**: If emails stop sending, go to the n8n Credentials menu and click **Reconnect**.
