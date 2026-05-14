# 🛡️ Hybrid Analysis Modules - Detailed Documentation

This document provides a comprehensive verification of the security modules used in our application. We utilize a **"Best Tool for the Job"** approach, combining precise static analysis (Regex) with advanced Generative AI (Gemini) to ensure robust security coverage.

---

## 1. API Security Module
**File**: `src/lib/api-security.ts`  
**Technology**: Static Analysis (Regular Expressions)

This module scans source code and HTML content to identify unsecured API patterns and secrets. It operates without AI to ensure 100% deterministic detection of known patterns.

### 🔍 What is Tested?

#### **A. API Endpoint Detection**
- **What it looks for**: specific URL patterns that indicate an API is being used.
- **Patterns**:
  - URLs containing `/api/v1`, `/api/v2`, etc.
  - Subdomains like `api.domain.com`.
  - GraphQL endpoints (`/graphql`).
  - REST paths (`/rest/`).
- **Goal**: To map out the attack surface by listing all visible API routes.

#### **B. Exposed Secrets (High Criticality)**
- **What it looks for**: Accidental inclusion of sensitive keys in client-side code.
- **Specific Checks**:
  - **AWS Access Keys**: matches `AKIA...` (20 chars).
  - **Google API Keys**: matches `AIza...` (35+ chars).
  - **GitHub Tokens**: matches `ghp_...`.
  - **Stripe Keys**: matches `sk_live_...`.
  - **Generic API Keys**: matches patterns like `api_key = "..."`.
  - **JWT/Bearer Tokens**: matches `Authorization: Bearer ...` patterns.
- **Why it matters**: Exposed keys can allow attackers to steal data or incur costs on your cloud accounts.

#### **C. CORS & Configuration**
- **What it looks for**: Insecure Cross-Origin Resource Sharing (CORS) settings.
- **Specific Checks**:
  - `Access-Control-Allow-Origin: *` (Wildcard access - risky).
  - `Access-Control-Allow-Credentials: true` combined with Wildcards (Critical security flaw).

#### **D. GraphQL Security**
- **What it looks for**:
  - **Introspection**: Checks if `__schema` or `__type` queries are allowed (reveals the entire database structure).
  - **Playgrounds**: Checks if developer tools like `GraphiQL` or `Apollo Sandbox` are enabled in production.

---

## 2. Privacy & Data Protection Module
**File**: `src/lib/privacy-analyzer.ts`  
**Technology**: Static Analysis (Pattern Matching)

This module focuses on user privacy, ensuring that the application respects data protection laws and best practices regarding user tracking and data collection.

### 🔍 What is Tested?

#### **A. Third-Party Trackers**
- **What it looks for**: Scripts and domains associated with user tracking.
- **Specific Detectors**:
  - **Google**: Google Analytics (`gtag`), Tag Manager, Google Ads.
  - **Social**: Facebook Pixel (`fbq`), Connect.
  - **Analytics**: Hotjar, Mixpanel, Segment, Amplitude, FullStory, Heap.
- **Goal**: To inform you (and the user) exactly who is tracking their behavior.

#### **B. Data Collection Forms**
- **What it looks for**: HTML forms asking for sensitive info.
- **Specific Checks**:
  - **Email Inputs**: Checks if an email field exists without a nearby "Privacy Policy" link or "Unsubscribe" notice.
  - **Password Strength**: Checks if the UI enforces complexity (e.g., "uppercase", "special character" requirements).
  - **PII (Personal Identifiable Information)**: Detects fields for SSN, Date of Birth, Phone Number, or Credit Cards.

#### **C. Encryption Standards**
- **What it looks for**:
  - **HTTPS Usage**: Verifies the site is served over `https://`.
  - **Mixed Content**: Checks if a secure page loads insecure images or scripts (`http://`).
  - **Encryption Mentions**: Scans for terms like "AES-256", "RSA", or "End-to-End Encryption" to verify security claims.

#### **D. Privacy Policy Quality**
- **What it looks for**: Not just a link, but the *content* of the policy (if visible).
- **Checks for key clauses**:
  - "What data we collect"
  - "How we use your data"
  - "Third-party sharing"
  - "User rights" (delete/opt-out)

---

## 3. Compliance & Legal Module
**File**: `src/lib/compliance-checker.ts`  
**Technology**: Logic & Keyword Matching

This module safeguards your business by checking against major legal frameworks (GDPR, PCI-DSS, HIPAA).

### 🔍 What is Tested?

#### **A. GDPR (Europe / Global)**
- **Cookie Consent**: Checks for banners containing "cookie consent", "accept", or "manage preferences".
- **Privacy Policy**: Ensures a link exists.
- **User Rights**: Scans for mentions of "Right to Erasure", "Right to Access", or "Portability".

#### **B. PCI-DSS (Payment Security)**
- **Payment Forms**: Detects credit card fields (`cc-number`, `cvv`).
- **Direct Input Violation**: Flags if you are using raw `<input>` fields for credit cards (unsafe).
- **Processor Validation**: Verifies usage of secure providers like Stripe, PayPal, or Braintree (safe).
- **HTTPS Enforcement**: strict check for SSL on payment pages.

#### **C. HIPAA (Healthcare)**
- **Context Detection**: First checks if the page is healthcare-related (keywords: "patient", "medical", "PHI").
- **Requirements**:
  - Checks for "Notice of Privacy Practices".
  - Verifies data encryption notices.
  - Checks for "Patient Rights" information.

#### **D. Accessibility (WCAG)**
- **Images**: Checks if `<img>` tags have `alt` text descriptions.
- **ARIA**: specific checks for accessibility attributes like `aria-label`.

---

## 4. Vulnerability Scanning (Core System)
**File**: `src/actions/checklist-scanner.ts`  
**Technology**: **Generative AI (Gemini 2.0 Flash)**

This is the "Brain" of the security scanner. While the modules above use strict rules, this module uses AI to "understand" code logic and context, finding complex vulnerabilities that Regex cannot see.

### 🔍 What is Tested?

#### **A. Injection Attacks**
- **SQL Injection**: The AI analyzes form handlers to see if user input is directly concatenated into database queries.
- **Command Injection**: Checks if user input can execute system commands.
- **NoSQL / LDAP Injection**: Checks for specific injection patterns in modern databases.

#### **B. Cross-Site Scripting (XSS)**
- **Reflected XSS**: Can URL parameters be tricked into running JavaScript?
- **Stored XSS**: Is user content (like comments) saved and then displayed without sanitization?
- **DOM XSS**: Unsafe manipulation of the browser's Document Object Model.
- **React/Modern Frameworks**: Checks for dangerous patterns like `dangerouslySetInnerHTML`.

#### **C. Broken Authentication**
- **Hardcoded Credentials**: Finds passwords hidden in variables.
- **Weak Logic**: Identifies logic flaws like checking passwords on the client-side.
- **Session Management**: Checks if tokens are stored insecurely (e.g., in `localStorage` instead of `HttpOnly` cookies).

#### **D. Sensitive Data Exposure**
- **PII Leaks**: Checks if personal data is rendered in comments or hidden fields.
- **Weak Hashing**: identifies usage of MD5 or SHA1.
- **Logging**: Checks if sensitive data (passwords, tokens) is printed to `console.log`.

#### **E. Advanced OWASP Checks**
- **CSRF**: Verifies if forms have Anti-CSRF tokens.
- **Insecure Deserialization**: Checks if the app accepts serialized objects from untrusted sources.
- **Vulnerable Dependencies**: Identifies outdated or known-vulnerable libraries in `<script>` tags.
- **Server-Side Request Forgery (SSRF)**: Checks if the server can be tricked into making requests to internal resources.

---

### 🚀 Summary of the "Best Tool for the Job" Approach
 
 | Module | Best For... | Technology |
 | :--- | :--- | :--- |
 | **API Security** | Finding exposed keys (AWS/Stripe), CORS flaws, and rate-limiting. | **Hybrid (Regex + AI)** |
 | **Privacy** | Detecting tracker scripts (Google/FB), PII fields, and Privacy by Design. | **Hybrid (Regex + AI)** |
 | **Compliance** | Verifying GDPR/HIPAA/PCI-DSS legal compliance and UI deception. | **Hybrid (Regex + AI)** |
 | **Core Scanner** | Finding **Logic Flaws**, **SQL Injection**, and **Contextual Vulnerabilities**. | **Generative AI** |
 | **Business Logic** | Detecting client-side validation skips and state tampering. | **Generative AI** |
 | **Deceptive Design** | Identifying phishing markers and dark patterns. | **Generative AI** |
 | **Supply Chain** | Checking library versions and Subresource Integrity (SRI). | **AI + Regex** |
 | **Infra Probe** | Verifying `robots.txt` and `ads.txt` presence. | **HTTP Probe** |
 
 ---
 
- *Note: All AI-driven categories now include **AI Code Remediation**, providing instant fix snippets for identified vulnerabilities. SecValid AI 2.0 now covers 13 unique security dimensions.*
