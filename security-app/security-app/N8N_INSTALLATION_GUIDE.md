# How to Install and Run n8n

n8n is a workflow automation tool that you can run locally on your machine. Here are the two best ways to run it on Windows.

## Option 1: Using NPX (Fastest & Recommended for Testing)
This method requires **Node.js** (which you already have installed). It runs n8n directly without needing a full installation process.

**Command:**
```powershell
npx n8n
```

1.  Run the command in your terminal.
2.  Type `y` if asked to install the `n8n` package.
3.  Once started, open your browser to `http://localhost:5678`.
4.  Press `Ctrl+C` in the terminal to stop it.

## Option 2: Install via NPM (Global Installation)
If you want to have n8n available as a command permanently:

**Install:**
```powershell
npm install n8n -g
```

**Run:**
```powershell
n8n
```

## Option 3: Docker (Recommended for Long-running Background Tasks)
If you have Docker Desktop installed:

```powershell
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n n8n/io:latest
```

---

### What happens next?
1.  **Sign up/in**: On the first run, n8n will ask you to set up an owner account (locally stored).
2.  **Start Automating**: You can now create workflows, connect nodes (like generic Webhooks, GitHub, Google Sheets, etc.), and integrate them with your Security App.

### Integration Idea:
You could use n8n to listen for "New Security Report" webhooks from your Next.js app and automatically:
*   Email the report to the dev team.
*   Create a Jira ticket if Risk Score > 80.
*   Post to Slack.
