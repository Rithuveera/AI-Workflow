# 🕵️ Manual Security Pentesting Checklist
*A companion guide for SecValid AI*

This checklist outlines the manual steps a security engineer takes to verify vulnerabilities. Use these alongside **SecValid AI** for a complete "Defense in Depth" strategy.

---

## 1. SQL Injection (SQLi)
**Goal:** Manipulate the database query via input fields.

- [ ] **Single Quote Test**: Add a `'` to the end of any ID or search term in the URL (e.g., `?id=1'`).
    - *Look for*: Database error messages like "You have an error in your SQL syntax".
- [ ] **Logic Bypass**: Enter `' OR 1=1 --` in the username field of a login page.
    - *Look for*: Logging into an account without knowing the password.
- [ ] **Boolean Testing**: Compare `?id=1 AND 1=1` with `?id=1 AND 1=2`.
    - *Look for*: If the page content changes based on the math, the site is executing your SQL.

---

## 2. Cross-Site Scripting (XSS)
**Goal:** Run malicious JavaScript in another user's browser.

- [ ] **Basic Alert**: Type `<script>alert('XSS')</script>` in every comment box or profile field.
    - *Look for*: A popup box appearing.
- [ ] **Image Error**: Use an image tag with a broken source: `<img src=x onerror=alert(1)>`.
    - *Look for*: If the browser tries to load the bad image, it will trigger the JavaScript.
- [ ] **URL Reflection**: Look for your search term in the URL: `search?q=mytext`. Change it to `search?q=<marquee>Hacked</marquee>`.
    - *Look for*: If the text on the page starts scrolling/moving, the input isn't sanitized.

---

## 3. Insecure Direct Object Reference (IDOR)
**Goal:** Access data belonging to other users by changing an ID.

- [ ] **ID Swapping**: Log in as User A. Find a URL like `/api/user/105/profile`.
- [ ] **The "Increment" Test**: Change the `105` to `106` or `104`.
    - *Look for*: If you can see the private profile details of a different user, this is a **Critical** IDOR bug.
- [ ] **Method Guessing**: If a route is `GET /orders/1`, try sending a `DELETE /orders/1` request using DevTools.

---

## 4. Broken Authentication & Session Management
**Goal:** Steal or bypass user sessions.

- [ ] **Cookie Security**: Press **F12** -> **Application** -> **Cookies**.
    - *Look for*: Are the `HttpOnly` and `Secure` flags checked? If "HttpOnly" is missing, JavaScript can steal your session!
- [ ] **Session Timeout**: Log in, wait 30 minutes, and see if you are still logged in.
    - *Look for*: Sessions that never expire are a major risk for shared computers.
- [ ] **Weak Password Reset**: Request a password reset. Check if the token in the URL is short or predictable (e.g., `?token=123`).

---

## 5. Sensitive Data Exposure
**Goal:** Find "forgotten" secrets in the public code.

- [ ] **View Source (Ctrl + U)**: Search for strings like `password`, `key`, `secret`, `AIza` (Google Key), or `sk_live` (Stripe).
- [ ] **JS Bundle Audit**: Open DevTools -> **Sources**. Look through the JavaScript files.
    - *Look for*: Hardcoded API keys used for development that were accidentally pushed to production.
- [ ] **Robots.txt Probe**: Visit `domain.com/robots.txt`.
    - *Look for*: Folders that are "Disallowed" (e.g., `/admin_v2_backup`). These are hidden treasures for hackers.

---

## 6. Business Logic Flaws
**Goal:** Trick the application's unique features.

- [ ] **Negative Quantities**: In a shopping cart, try changing the item quantity to `-1`.
    - *Look for*: Does the total price become negative or zero?
- [ ] **Workflow Skip**: Try navigating directly to `/checkout/success` without paying.
- [ ] **Role Escalation**: If you see a cookie like `is_admin=false`, try changing it to `true` in your browser.

---

## 🛡️ How to use this with SecValid AI
1. **Run the AI Scan first**: Let the AI find the "obvious" leaks and configuration errors.
2. **Follow the AI's "Context"**: If the AI says *"Warning: High number of reflected inputs,"* use the **XSS Checklist** above on those specific fields.
3. **Verify the "Fixes"**: After applying the AI-generated `fixCode`, re-run the manual test to ensure the vulnerability is truly gone.

---
*Stay Secure. Stay Valid. 🚀*
