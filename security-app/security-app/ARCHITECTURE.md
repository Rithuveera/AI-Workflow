# SecValid AI: Security Validated by Intelligence - System Architecture & User Guide

SecValid AI is an advanced security validation assistant that combines **Google's Gemini 2.0 AI** with **Static Analysis (Regex)** to provide comprehensive security assessments. It features a robust **AI Fallback System** to ensure reliability and a **Hybrid Analysis Engine** for maximum accuracy.

## 🏗️ System Architecture

### High-Level Data Flow

![SecValid AI Architecture](https://placeholder-for-image-path.png)

The system follows a modular flow:
1. **User Input**: Accepts URLs for live site scanning or raw code snippets.
2. **Frontend (Next.js 15)**: Provides a premium glassmorphic interface for real-time interaction and data visualization.
3. **AI Orchestration (Multi-Model Fallback)**: The core engine that routes requests to the best available AI model (Gemini 2.0 Flash, 1.5 Pro). If one model hits a rate limit or fails, it automatically falls back.
4. **Hybrid Analysis Engine**: (13 Comprehensive Categories)
   - **Gemini 2.0 Flash**: Handles logic analysis, real-time threat detection, and **AI-generated code fixes**.
   - **Static Analysis (Regex Engine)**: Instantly identifies exposed secrets, PII, and known compliance patterns.
   - **External Probe**: Checks for `robots.txt` and `ads.txt` to verify infrastructure hygiene.
5. **Consolidated Security Report**: Aggregates all findings into a structured, actionable report with risk scoring, recommendations, and **ready-to-use fix snippets**.

---

## 🛡️ Hybrid Analysis Modules

We use a "Best Tool for the Job" approach across **13 security categories**:

### 1. API Security Module (`api-security.ts`)
- **Technology**: Static Analysis & Header Inspection
- **Detection**: Exposed Secrets, API Endpoints, CORS Misconfigurations, Rate Limiting.

### 2. Privacy & Data Protection (`privacy-analyzer.ts`)
- **Technology**: Hybrid (Regex + AI Enrichment)
- **Detection**: Trackers, PII Collection, Encryption Standards, **AI Quality Audit of Privacy Terms**.

### 3. Compliance & Legal (`compliance-checker.ts`)
- **Technology**: Hybrid (Logic & Pattern Matching + AI)
- **Detection**: GDPR, PCI-DSS, HIPAA, Accessibility, **Deceptive Consent & Dark Pattern Detection**.

### 4. Vulnerability Scanning (Core AI)
- **Technology**: Generative AI (Gemini)
- **Detection**:
  - **Injection Attacks**: SQLi, Command Injection, NoSQL Injection.
  - **Cross-Site Scripting (XSS)**: Reflected, Stored, DOM, React Patterns.
  - **Broken Authentication**: Session flaws, weak policies.
  - **Business Logic Security**: Client-side validation skips, state tampering.
  - **Deceptive Design (Phishing)**: Deceptive UI, urgent messaging, domain spoofing.
  - **Supply Chain Risk**: Outdated libraries, Subresource Integrity (SRI) missing.
  - **OWASP Top 10**: Insecure Deserialization, XXE, SSRF.

---

## 🔧 Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS (Purple Cyber Security Theme)
- **State**: React 18 Server Components

### Backend / Core
- **Runtime**: Node.js
- **AI Provider**: Google Generative AI SDK
- **Caching**: In-Memory Map (LRU-style with TTL)
- **Storage**: JSON File System (local)

---

## 📖 User Guide

### How to Run a Scan
1.  Navigate to the **Security Coach** page.
2.  **URL Scan**:
    *   Enter a full URL (e.g., `https://example.com`).
    *   Select **Comprehensive Scan**.
    *   Click **Analyze**.
3.  **Code Scan**:
    *   Paste a code snippet (Python, JS, etc.).
    *   Select **Quick Scan**.
    *   Click **Analyze**.

### Interpreting Results
- **Pass**: No issues found.
- **Warning**: Potential risk or best practice missing (e.g., missing headers).
- **Fail**: Confirmed vulnerability or compliance violation.

### 📊 Security Score Calculation
The Dashboard's **Security Score** is an aggregate health metric based on your **complete scanning history**:

1.  **Base Score**: Starts at **100%**.
2.  **Deductions**: **-10 points** for every report marked as **Critical** or **High** in your history.
3.  **Calculation Range**: Minimum **0%**, Maximum **100%**.

**Note**: To improve your score after resolving vulnerabilities, you should **delete the historical Critical/High reports** from the "Recent Analysis" list using the trash icon.

### troubleshooting
- **"Quota Exceeded"**: The system will automatically retry with a different model. Just wait a few seconds.
- **Cache**: Recent scans are cached for 1 hour. To force a fresh scan, wait 1 hour or clear the server cache.

