# 🐞 ERP Test Failure Log

This file contains all test failures for the ERP product.

---

## ❌ Test Failure Report
**Timestamp:** 2/5/2026, 10:59:42 AM
**Product:** ERP
**Test Script:** `Cloning.spec.js`
**Exit Code:** 1
**Duration:** 62.45s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('label:text("Received Date")').locator('..').locator('input.sc-hvigdm.jWisRg')[22m

[MCP] ❌ Error calling /end: Error

```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 1 test using 1 worker

Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Step 5: Opening Enquiry submenu...
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
Step 7: Click Enquiry List
Enquiry list  tab loaded
Step 8: Click first pending enquiry dynamically
Clicking first pending enquiry: 2026-02-04
Opened first pending enquiry
Step 9: Clicking Clone  button...
Step 10: Confirming Clone...
Step 11: Selecting Scope - "Adjusting TR output (for ICCP systems)
Scope selected: "Instant-off" potential measurement
Step 12: Select the received Date  - "24-oct-2025"
  x  1 tests\ERP\Cloning.spec.js:2:3 › Cloning (1.0m)
🧹 Global Teardown: Ending MCP session...


  1) tests\ERP\Cloning.spec.js:2:3 › Cloning ───────────────────────────────────────────────────────

    [31mTest timeout 
```

---

## ❌ Test Failure Report
**Timestamp:** 2/5/2026, 11:12:21 AM
**Product:** ERP
**Test Script:** `Cloning.spec.js`
**Exit Code:** 1
**Duration:** 62.82s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('label:text("Received Date")').locator('..').locator('input.sc-hvigdm.jWisRg')[22m

[MCP] ❌ Error calling /end: Error

```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 1 test using 1 worker

Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Step 5: Opening Enquiry submenu...
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
Step 7: Click Enquiry List
Enquiry list  tab loaded
Step 8: Click first pending enquiry dynamically
Clicking first pending enquiry: 2026-02-04
Opened first pending enquiry
Step 9: Clicking Clone  button...
Step 10: Confirming Clone...
Step 11: Selecting Scope - "Adjusting TR output (for ICCP systems)
Scope selected: "Instant-off" potential measurement
Step 12: Select the received Date  - "24-oct-2025"
  x  1 tests\ERP\Cloning.spec.js:2:3 › Cloning (1.0m)
🧹 Global Teardown: Ending MCP session...


  1) tests\ERP\Cloning.spec.js:2:3 › Cloning ───────────────────────────────────────────────────────

    [31mTest timeout 
```

---

## ❌ Test Failure Report
**Timestamp:** 2/11/2026, 12:19:20 PM
**Product:** ERP
**Test Script:** `Clientmaster.spec.js`
**Exit Code:** 1
**Duration:** 86.03s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByRole('button', { name: 'Add New' })[22m

    at [90mC:\Users\veeramani\Desktop\playwright-mcp\[39mtests\ERP\Clientmaster.spec.js:108:57 {
  [[32mSymbol(step)[39m]: {
    location: {
      file: [32m'C:\\Users\\veeramani\\Desktop\\playwright-mcp\\tests\\ERP\\Clientmaster.spec.js'[39m,
      line: [33m108[39m,
      column: [33m57[39m
    },
    category: [32m'pw:api'[39m,
    title: [32m"Click getByRole('button', { name: 'Add New' })"[39m,
    apiName: [32m'locator.click'[39m,
    params: {
      selector: [32m'internal:role=button[name="Add New"i]'[39m,
      strict: [33mtrue[39m,
      timeout: [33m0[39m
    },
    group: [90mundefined[39m,
    stepId: [32m'pw:api@44'[39m,
    boxedStack: [90mundefined[39m,
    steps: [],
    attachmentIndices: [],
    info: TestStepInfoImpl {
      annotations: [],
      _testInfo: [36m[TestInfoI
```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 3 tests using 1 worker

Step 1: Navigating to login page...
Step 2: Logging in...
Step 3: Navigating to User page...
Step 2: Expanding Enquiry menu...
Sidebar clicked and opened successfully
Master Menu clicked successfully
Client  Master Menu clicked successfully 
Row 1: 10059 | Tracy | Active | Veeramani | 2026-02-11 | 
Row 2: 10058 | Felicita | Active | Veeramani | 2026-02-09 | 
Row 3: 10057 | Irving | Active | Veeramani | 2026-02-09 | 
Row 4: 10055 | Gas Equipment & Contracting Company (GECE) | Active | Veeramani | 2026-01-14 | 
Row 5: 10054 | Seplat Energy Producing Nigeria Unlimited (SEPNU) | Active | Veeramani | 2026-01-14 | 
Row 6: 10052 | Amit Bansal | Active | Veeramani | 2025-12-31 | 
Row 7: 10051 | Sample Clientqw | Active | Admin | 2025-12-24 | 
Row 8: 10050 | testclient | Active | Veeramani | 2025-12-13 | 
Row 9: 10049 | Sample Client | Active | Veeramani | 2025-12-12 | 
Row 10: 10048 | Sample Client | Active | Veeramani |
```

---

## ❌ Test Failure Report
**Timestamp:** 2/11/2026, 12:22:27 PM
**Product:** ERP
**Test Script:** `Cloning.spec.js`
**Exit Code:** 1
**Duration:** 184.83s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('div.css-10z88nd-control').filter({ hasText: 'A - Awarded' })[22m

Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('div.css-10z88nd-control').filter({ hasText: 'A - Awarded' })[22m

Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('div.css-10z88nd-control').filter({ hasText: 'A - Awarded' })[22m

[MCP] ❌ Error calling /end: Error

```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 3 tests using 1 worker

Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Step 5: Opening Enquiry submenu...
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
Step 7: Click Enquiry List
Enquiry list  tab loaded
Step 8: Click first pending enquiry dynamically
Clicking first pending enquiry: 2026-02-10
Opened first pending enquiry
Step 9: Clicking Clone  button...
Step 10: Confirming Clone...
  x  1 tests\ERP\Cloning.spec.js:2:3 › Cloning (1.0m)
Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Step 5: Opening Enquiry submenu...
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
Step 7: Click Enquiry List
Enquiry li
```

---

## ❌ Test Failure Report
**Timestamp:** 2/11/2026, 12:26:27 PM
**Product:** ERP
**Test Script:** `Enqcre.spec.js`
**Exit Code:** 1
**Duration:** 63.22s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
[MCP] ❌ Error calling /end: Error

```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 1 test using 1 worker

Already logged in, on dashboard page
Step 2: Expanding Enquiry menu...
Step 3: Opening Enquiry submenu...
Step 4: Clicking on Internal Enquiry...
Internal Enquiry page loaded
Step 5: Clicking New Enquiry button...
New Enquiry form opened
Step 6:Select the Enquiry type
Enquiry Type selected: Project
Step 7: Selecting Log Category - CI - Cathodic Installations...
test
Log Category selected: CI - CI - Corrosion Inhibitors
Step 8: Selecting Priority - B - Potential...
Priority selected: B - Potential
Customer selected: Amit Agarwal 3755
Step 10: Entering Customer Reference - CR123...
Customer Reference entered: CR123
Customer selected: Amit Agarwal 3755
✅ Customer contact : customer selected successfully
✅ Customer contact "sela con" selected successfully
Select as Mark as completed 
Mark as defalut selected as successfully
Step 17: Entering Project Title - Automation Enquiry Project 1770792926801
Project Title entere
```

---

## ❌ Test Failure Report
**Timestamp:** 2/11/2026, 3:17:58 PM
**Product:** ERP
**Test Script:** `Clientmaster.spec.js`
**Exit Code:** 1
**Duration:** 90.36s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByRole('button', { name: 'Add New' })[22m

    at [90mC:\Users\veeramani\Desktop\playwright-mcp\[39mtests\ERP\Clientmaster.spec.js:108:57 {
  [[32mSymbol(step)[39m]: {
    location: {
      file: [32m'C:\\Users\\veeramani\\Desktop\\playwright-mcp\\tests\\ERP\\Clientmaster.spec.js'[39m,
      line: [33m108[39m,
      column: [33m57[39m
    },
    category: [32m'pw:api'[39m,
    title: [32m"Click getByRole('button', { name: 'Add New' })"[39m,
    apiName: [32m'locator.click'[39m,
    params: {
      selector: [32m'internal:role=button[name="Add New"i]'[39m,
      strict: [33mtrue[39m,
      timeout: [33m0[39m
    },
    group: [90mundefined[39m,
    stepId: [32m'pw:api@44'[39m,
    boxedStack: [90mundefined[39m,
    steps: [],
    attachmentIndices: [],
    info: TestStepInfoImpl {
      annotations: [],
      _testInfo: [36m[TestInfoI
```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 3 tests using 1 worker

Step 1: Navigating to login page...
Step 2: Logging in...
Step 3: Navigating to User page...
Step 2: Expanding Enquiry menu...
Sidebar clicked and opened successfully
Master Menu clicked successfully
Client  Master Menu clicked successfully 
Row 1: 10060 | Jerrold | Active | Veeramani | 2026-02-11 | 
Row 2: 10059 | Tracy | Active | Veeramani | 2026-02-11 | 
Row 3: 10058 | Felicita | Active | Veeramani | 2026-02-09 | 
Row 4: 10057 | Irving | Active | Veeramani | 2026-02-09 | 
Row 5: 10055 | Gas Equipment & Contracting Company (GECE) | Active | Veeramani | 2026-01-14 | 
Row 6: 10054 | Seplat Energy Producing Nigeria Unlimited (SEPNU) | Active | Veeramani | 2026-01-14 | 
Row 7: 10052 | Amit Bansal | Active | Veeramani | 2025-12-31 | 
Row 8: 10051 | Sample Clientqw | Active | Admin | 2025-12-24 | 
Row 9: 10050 | testclient | Active | Veeramani | 2025-12-13 | 
Row 10: 10049 | Sample Client | Active | Veeramani | 2025-
```

---

## ❌ Test Failure Report
**Timestamp:** 2/11/2026, 3:50:00 PM
**Product:** ERP
**Test Script:** `Cloning.spec.js`
**Exit Code:** 1
**Duration:** 187.22s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('div.css-10z88nd-control').filter({ hasText: 'A - Awarded' })[22m

Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('div.css-10z88nd-control').filter({ hasText: 'A - Awarded' })[22m

Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('div.css-10z88nd-control').filter({ hasText: 'A - Awarded' })[22m

[MCP] ❌ Error calling /end: Error

```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 3 tests using 1 worker

Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Step 5: Opening Enquiry submenu...
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
Step 7: Click Enquiry List
Enquiry list  tab loaded
Step 8: Click first pending enquiry dynamically
Clicking first pending enquiry: 2026-02-11
Opened first pending enquiry
Step 9: Clicking Clone  button...
Step 10: Confirming Clone...
  x  1 tests\ERP\Cloning.spec.js:2:3 › Cloning (1.0m)
Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Step 5: Opening Enquiry submenu...
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
Step 7: Click Enquiry List
Enquiry li
```

---

## ❌ Test Failure Report
**Timestamp:** 2/11/2026, 4:04:50 PM
**Product:** ERP
**Test Script:** `Cloning.spec.js`
**Exit Code:** 1
**Duration:** 186.75s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('div.css-10z88nd-control').filter({ hasText: 'A - Awarded' })[22m

Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('div.css-10z88nd-control').filter({ hasText: 'A - Awarded' })[22m

Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('div.css-10z88nd-control').filter({ hasText: 'A - Awarded' })[22m

[MCP] ❌ Error calling /end: Error

```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 3 tests using 1 worker

Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Step 5: Opening Enquiry submenu...
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
Step 7: Click Enquiry List
Enquiry list  tab loaded
Step 8: Click first pending enquiry dynamically
Clicking first pending enquiry: 2026-02-11
Opened first pending enquiry
Step 9: Clicking Clone  button...
Step 10: Confirming Clone...
  x  1 tests\ERP\Cloning.spec.js:2:3 › Cloning (1.0m)
Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Step 5: Opening Enquiry submenu...
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
Step 7: Click Enquiry List
Enquiry li
```

---

## ❌ Test Failure Report
**Timestamp:** 2/11/2026, 4:30:43 PM
**Product:** ERP
**Test Script:** `Cloning.spec.js`
**Exit Code:** 1
**Duration:** 147.20s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: locator.scrollIntoViewIfNeeded: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('div[class*="control"]').filter({ hasText: /Awarded/i }).first()[22m

Error occurred: locator.scrollIntoViewIfNeeded: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('div[class*="control"]').filter({ hasText: /Awarded/i }).first()[22m

[MCP] ❌ Error calling /end: Error

```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 3 tests using 1 worker

Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Step 5: Opening Enquiry submenu...
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
Step 7: Click Enquiry List
Enquiry list  tab loaded
Step 8: Click first pending enquiry dynamically
Clicking first pending enquiry: 2026-02-11
Opened first pending enquiry
Step 9: Clicking Clone  button...
Step 10: Confirming Clone...
  x  1 tests\ERP\Cloning.spec.js:2:1 › Cloning (1.0m)
Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Step 5: Opening Enquiry submenu...
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
Step 7: Click Enquiry List
Enquiry li
```

---

## ❌ Test Failure Report
**Timestamp:** 2/11/2026, 4:35:45 PM
**Product:** ERP
**Test Script:** `Closingstatus.spec.js`
**Exit Code:** 1
**Duration:** 300.02s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByRole('button', { name: 'Closing' })[22m

Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByRole('button', { name: 'Closing' })[22m

Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByRole('button', { name: 'Closing' })[22m

Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByRole('button', { name: 'Closing' })[22m


```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 10 tests using 1 worker

Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
Opened In Process enquiry
[ [32m'3'[39m ]
Enquiry Message: Enquiry closed successfully
  ok  1 tests\ERP\Closingstatus.spec.js:2:3 › Closing - Awarded  (14.2s)
Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
  x   2 tests\ERP\Closingstatus.spec.js:127:1 ›
```

---

## ❌ Test Failure Report
**Timestamp:** 2/11/2026, 4:37:53 PM
**Product:** ERP
**Test Script:** `Enquirystatus.spec.js`
**Exit Code:** 1
**Duration:** 62.51s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: page.waitForURL: Test timeout of 60000ms exceeded.
=========================== logs ===========================
waiting for navigation to "**/enquiry/view/**" until "load"
============================================================
[MCP] ❌ Error calling /end: Error

```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 1 test using 1 worker

Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Step 2: Expanding Enquiry menu...
Step 3: Opening Enquiry submenu...
  x  1 tests\ERP\Enquirystatus.spec.js:2:3 › Enquiry status - Awarded  (1.0m)
🧹 Global Teardown: Ending MCP session...


  1) tests\ERP\Enquirystatus.spec.js:2:3 › Enquiry status - Awarded  ───────────────────────────────

    [31mTest timeout of 60000ms exceeded.[39m

    Error: page.screenshot: Target page, context or browser has been closed

      119 |     console.error('Error occurred:', error.message);
      120 |     // Take a screenshot on error
    > 121 |     await page.screenshot({ path: 'error-screenshot.png' });
          |                ^
      122 |     console.log('Screenshot saved as error-screenshot.png');
      123 |   } 
      124 |   });
        at C:\Users\veeramani\Desktop\playwright-mcp\tests\ERP
```

---

## ❌ Test Failure Report
**Timestamp:** 2/11/2026, 5:22:02 PM
**Product:** ERP
**Test Script:** `Followup.spec.js`
**Exit Code:** 1
**Duration:** 2604.26s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByText('Follow-up', { exact: true })[22m

    at [90mC:\Users\veeramani\Desktop\playwright-mcp\[39mtests\ERP\Followup.spec.js:61:56 {
  [[32mSymbol(step)[39m]: {
    location: {
      file: [32m'C:\\Users\\veeramani\\Desktop\\playwright-mcp\\tests\\ERP\\Followup.spec.js'[39m,
      line: [33m61[39m,
      column: [33m56[39m
    },
    category: [32m'pw:api'[39m,
    title: [32m"Click getByText('Follow-up', { exact: true })"[39m,
    apiName: [32m'locator.click'[39m,
    params: {
      selector: [32m'internal:text="Follow-up"s'[39m,
      strict: [33mtrue[39m,
      timeout: [33m0[39m
    },
    group: [90mundefined[39m,
    stepId: [32m'pw:api@56'[39m,
    boxedStack: [90mundefined[39m,
    steps: [],
    attachmentIndices: [],
    info: TestStepInfoImpl {
      annotations: [],
      _testInfo: [36m[TestInfoImpl][39m,
   
```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 6 tests using 1 worker

Navigated to login page
Entered credentials
Logged in successfully
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
  x  1 tests\ERP\Followup.spec.js:3:1 › Follow-up Creation  (1.0m)
Navigated to login page
Entered credentials
Logged in successfully
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
Opened In Process enquiry
  x  2 tests\ERP\Followup.spec.js:123:1 ›  Verify datas in followup under the Enquiry list    (1.0m)
Navigated to login page
Entered credentials
Logged in successfully
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
  x  3 tests
```

---

## ❌ Test Failure Report
**Timestamp:** 2/11/2026, 5:27:03 PM
**Product:** ERP
**Test Script:** `Mailacknowledge.spec.js`
**Exit Code:** 1
**Duration:** 123.73s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByRole('cell', { name: 'Pending' }).first()[22m

Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByRole('cell', { name: 'Pending' }).first()[22m

[MCP] ❌ Error calling /end: Error

```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 2 tests using 1 worker

Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
  x  1 tests\ERP\Mailacknowledge.spec.js:5:3 › Mail Acknowledgement - Preview   (1.0m)
Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
  x  2 tests\ERP\Mailacknowledge.spec.js:107:1 › Mail Acknowledgement - Send/Resend   (1.0m)
🧹 Global Teardown: Ending MCP
```

---

## ❌ Test Failure Report
**Timestamp:** 2/11/2026, 5:28:27 PM
**Product:** ERP
**Test Script:** `Projectdashboard.spec.js`
**Exit Code:** 1
**Duration:** 62.57s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByRole('cell', { name: 'Pending' }).first()[22m

    at [90mC:\Users\veeramani\Desktop\playwright-mcp\[39mtests\ERP\Projectdashboard.spec.js:42:63 {
  [[32mSymbol(step)[39m]: {
    location: {
      file: [32m'C:\\Users\\veeramani\\Desktop\\playwright-mcp\\tests\\ERP\\Projectdashboard.spec.js'[39m,
      line: [33m42[39m,
      column: [33m63[39m
    },
    category: [32m'pw:api'[39m,
    title: [32m"Click getByRole('cell', { name: 'Pending' }).first()"[39m,
    apiName: [32m'locator.click'[39m,
    params: {
      selector: [32m'internal:role=cell[name="Pending"i] >> nth=0'[39m,
      strict: [33mtrue[39m,
      timeout: [33m0[39m
    },
    group: [90mundefined[39m,
    stepId: [32m'pw:api@51'[39m,
    boxedStack: [90mundefined[39m,
    steps: [],
    attachmentIndices: [],
    info: TestStepInfoImpl {
      annotations: []
```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 1 test using 1 worker

Navigated to login page
Entered credentials
Logged in successfully
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
  x  1 tests\ERP\Projectdashboard.spec.js:2:1 › Project Dashboard  (1.0m)
🧹 Global Teardown: Ending MCP session...


  1) tests\ERP\Projectdashboard.spec.js:2:1 › Project Dashboard  ───────────────────────────────────

    [31mTest timeout of 60000ms exceeded.[39m

    Error Context: test-results\ERP-Projectdashboard-Project-Dashboard-\error-context.md

  1 failed
    tests\ERP\Projectdashboard.spec.js:2:1 › Project Dashboard  ────────────────────────────────────

To open last HTML report run:
[36m[39m
[36m  npx playwright show-report my-html-report[39m
[36m[39m

```

---

## ❌ Test Failure Report
**Timestamp:** 2/11/2026, 5:29:59 PM
**Product:** ERP
**Test Script:** `Relatedenquiry.spec.js`
**Exit Code:** 1
**Duration:** 62.67s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByRole('cell', { name: 'Pending' }).first()[22m

    at [90mC:\Users\veeramani\Desktop\playwright-mcp\[39mtests\ERP\Relatedenquiry.spec.js:42:63 {
  [[32mSymbol(step)[39m]: {
    location: {
      file: [32m'C:\\Users\\veeramani\\Desktop\\playwright-mcp\\tests\\ERP\\Relatedenquiry.spec.js'[39m,
      line: [33m42[39m,
      column: [33m63[39m
    },
    category: [32m'pw:api'[39m,
    title: [32m"Click getByRole('cell', { name: 'Pending' }).first()"[39m,
    apiName: [32m'locator.click'[39m,
    params: {
      selector: [32m'internal:role=cell[name="Pending"i] >> nth=0'[39m,
      strict: [33mtrue[39m,
      timeout: [33m0[39m
    },
    group: [90mundefined[39m,
    stepId: [32m'pw:api@51'[39m,
    boxedStack: [90mundefined[39m,
    steps: [],
    attachmentIndices: [],
    info: TestStepInfoImpl {
      annotations: [],
  
```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 1 test using 1 worker

Navigated to login page
Entered credentials
Logged in successfully
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
  x  1 tests\ERP\Relatedenquiry.spec.js:2:1 › Related Enquiry  (1.0m)
🧹 Global Teardown: Ending MCP session...


  1) tests\ERP\Relatedenquiry.spec.js:2:1 › Related Enquiry  ───────────────────────────────────────

    [31mTest timeout of 60000ms exceeded.[39m

    Error Context: test-results\ERP-Relatedenquiry-Related-Enquiry-\error-context.md

  1 failed
    tests\ERP\Relatedenquiry.spec.js:2:1 › Related Enquiry  ────────────────────────────────────────

To open last HTML report run:
[36m[39m
[36m  npx playwright show-report my-html-report[39m
[36m[39m

```

---

## ❌ Test Failure Report
**Timestamp:** 2/11/2026, 5:31:39 PM
**Product:** ERP
**Test Script:** `Setup.spec.js`
**Exit Code:** 1
**Duration:** 98.23s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: page.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('button.action-button-menu')[22m

[MCP] ❌ Error calling /end: Error

```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 4 tests using 1 worker

Step 1: Navigating to login page...
Step 2: Logging in...
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
Entered code is  : C15
Entered Category name is: PO Revi
Entered scope is: Review of design drawings, techn 
Confirmation message: The name has already been taken for this branch., The code has already been taken for this branch.
  ok 1 tests\ERP\Setup.spec.js:3:1 › Setup-Log Category Creation  (11.8s)
Step 1: Navigating to login page...
Step 2: Logging in...
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
Total Entries: [33m30[39m


Entry 1:
  S.No:       1
  Code:       ABC
  Name:       SAA
  Created At: 2025-12-24

Entry 2:
  S.No:       2
  Code:       AD
  Name:       Automation Division
  Created At: 2024-08-21

Entry 3:
  S.No:       3
  Code: 
```

---

## ❌ Test Failure Report
**Timestamp:** 2/11/2026, 5:32:54 PM
**Product:** ERP
**Test Script:** `Vendor.spec.js`
**Exit Code:** 1
**Duration:** 72.04s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error: page.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('#react-select-10-input')[22m

    at [90mC:\Users\veeramani\Desktop\playwright-mcp\[39mtests\ERP\Vendor.spec.js:104:17 {
  [[32mSymbol(step)[39m]: {
    location: {
      file: [32m'C:\\Users\\veeramani\\Desktop\\playwright-mcp\\tests\\ERP\\Vendor.spec.js'[39m,
      line: [33m104[39m,
      column: [33m17[39m
    },
    category: [32m'pw:api'[39m,
    title: [32m"Click locator('#react-select-10-input')"[39m,
    apiName: [32m'page.click'[39m,
    params: { selector: [32m'#react-select-10-input'[39m, timeout: [33m0[39m },
    group: [90mundefined[39m,
    stepId: [32m'pw:api@47'[39m,
    boxedStack: [90mundefined[39m,
    steps: [],
    attachmentIndices: [],
    info: TestStepInfoImpl {
      annotations: [],
      _testInfo: [36m[TestInfoImpl][39m,
      _stepId: [32m'pw:api@47'[39m,
      _title: [32m"Click locator('#react-se
```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 2 tests using 1 worker

Step 1: Navigating to login page...
Step 2: Logging in...
Step 3: Navigating to User page...
Step 2: Expanding Enquiry menu...
Sidebar clicked and opened successfully
Master Menu clicked successfully
Vendor Menu clicked successfully 
Row 1: VEN0014 | Darsh VV |  | Vendor | 2025-09-04 | Active | 
Row 2: SUB0003 | Darsh001 | Dubai | Sub Contractor | 2025-01-15 | Active | 
Row 3: 9 | aa | aa | Vendor | 2024-10-12 | Active | 
Row 4: VEN0003 | samsung 2 | 2b , tower 1, street 3210 | Vendor | 2025-01-02 | Active | 
Row 5: VEN0002 | aa | aa | Vendor | 2024-10-12 | Active | 
Row 6: 6 | Samsung | 4,test street,test | Vendor | 2024-12-30 | Active | 
Row 7: SUB0002 | Test Vendor | fhggj | Sub Contractor | 2024-12-30 | Active | 
  ok 1 tests\ERP\Vendor.spec.js:2:1 › Vendor  (9.4s)
Step 1: Navigating to login page...
Step 2: Logging in...
Step 3: Navigating to User page...
Step 2: Expanding Enquiry menu...
Sidebar clicked and
```

---

## ❌ Test Failure Report
**Timestamp:** 2/12/2026, 3:18:50 PM
**Product:** ERP
**Test Script:** `Cloning.spec.js`
**Exit Code:** 1
**Duration:** 148.54s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: locator.scrollIntoViewIfNeeded: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('div[class*="control"]').filter({ hasText: /Awarded/i }).first()[22m

Error occurred: locator.scrollIntoViewIfNeeded: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('div[class*="control"]').filter({ hasText: /Awarded/i }).first()[22m

[MCP] ❌ Error calling /end: Error

```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 3 tests using 1 worker

Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Step 5: Opening Enquiry submenu...
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
Step 7: Click Enquiry List
Enquiry list  tab loaded
Step 8: Click first pending enquiry dynamically
Clicking first pending enquiry: 2026-02-12
Opened first pending enquiry
Step 9: Clicking Clone  button...
Step 10: Confirming Clone...
  x  1 tests\ERP\Cloning.spec.js:2:1 › Cloning (1.0m)
Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Step 5: Opening Enquiry submenu...
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
Step 7: Click Enquiry List
Enquiry li
```

---

## ❌ Test Failure Report
**Timestamp:** 2/16/2026, 10:47:50 AM
**Product:** ERP
**Test Script:** `Closingstatus.spec.js`
**Exit Code:** 1
**Duration:** 300.00s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByRole('button', { name: 'Closing' })[22m

Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByRole('button', { name: 'Closing' })[22m

Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByRole('button', { name: 'Closing' })[22m

Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByRole('button', { name: 'Closing' })[22m


```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 10 tests using 1 worker

Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
Opened In Process enquiry
[ [32m'3'[39m ]
Enquiry Message: Enquiry closed successfully
  ok  1 tests\ERP\Closingstatus.spec.js:2:3 › Closing - Awarded  (13.2s)
Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
[ [32m'4'[39m ]
Selected status is closed 
En
```

---

## ❌ Test Failure Report
**Timestamp:** 2/16/2026, 10:56:30 AM
**Product:** ERP
**Test Script:** `Mailacknowledge.spec.js`
**Exit Code:** 1
**Duration:** 123.65s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByRole('cell', { name: 'Pending' }).first()[22m

Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByRole('cell', { name: 'Pending' }).first()[22m

[MCP] ❌ Error calling /end: Error

```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 2 tests using 1 worker

Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
  x  1 tests\ERP\Mailacknowledge.spec.js:5:3 › Mail Acknowledgement - Preview   (1.0m)
Step 1: Navigating to login page...
Step 2: Entering login credentials...
Step 3: Clicking login button...
Login successful!
Already logged in, on dashboard page
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
  x  2 tests\ERP\Mailacknowledge.spec.js:107:1 › Mail Acknowledgement - Send/Resend   (1.0m)
🧹 Global Teardown: Ending MCP
```

---

## ❌ Test Failure Report
**Timestamp:** 2/16/2026, 10:57:55 AM
**Product:** ERP
**Test Script:** `Projectdashboard.spec.js`
**Exit Code:** 1
**Duration:** 62.70s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: locator.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for getByRole('cell', { name: 'Pending' }).first()[22m

    at [90mC:\Users\veeramani\Desktop\playwright-mcp\[39mtests\ERP\Projectdashboard.spec.js:42:63 {
  [[32mSymbol(step)[39m]: {
    location: {
      file: [32m'C:\\Users\\veeramani\\Desktop\\playwright-mcp\\tests\\ERP\\Projectdashboard.spec.js'[39m,
      line: [33m42[39m,
      column: [33m63[39m
    },
    category: [32m'pw:api'[39m,
    title: [32m"Click getByRole('cell', { name: 'Pending' }).first()"[39m,
    apiName: [32m'locator.click'[39m,
    params: {
      selector: [32m'internal:role=cell[name="Pending"i] >> nth=0'[39m,
      strict: [33mtrue[39m,
      timeout: [33m0[39m
    },
    group: [90mundefined[39m,
    stepId: [32m'pw:api@51'[39m,
    boxedStack: [90mundefined[39m,
    steps: [],
    attachmentIndices: [],
    info: TestStepInfoImpl {
      annotations: []
```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 1 test using 1 worker

Navigated to login page
Entered credentials
Logged in successfully
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
Step 6: Clicking on Internal Enquiry...
Internal Enquiry page loaded
  x  1 tests\ERP\Projectdashboard.spec.js:2:1 › Project Dashboard  (1.0m)
🧹 Global Teardown: Ending MCP session...


  1) tests\ERP\Projectdashboard.spec.js:2:1 › Project Dashboard  ───────────────────────────────────

    [31mTest timeout of 60000ms exceeded.[39m

    Error Context: test-results\ERP-Projectdashboard-Project-Dashboard-\error-context.md

  1 failed
    tests\ERP\Projectdashboard.spec.js:2:1 › Project Dashboard  ────────────────────────────────────

To open last HTML report run:
[36m[39m
[36m  npx playwright show-report my-html-report[39m
[36m[39m

```

---

## ❌ Test Failure Report
**Timestamp:** 2/16/2026, 11:00:21 AM
**Product:** ERP
**Test Script:** `Setup.spec.js`
**Exit Code:** 1
**Duration:** 97.55s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error occurred: page.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('button.action-button-menu')[22m

[MCP] ❌ Error calling /end: Error

```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 4 tests using 1 worker

Step 1: Navigating to login page...
Step 2: Logging in...
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
Entered code is  : C15
Entered Category name is: PO Revi
Entered scope is: Review of design drawings, techn 
Confirmation message: The name has already been taken for this branch., The code has already been taken for this branch.
  ok 1 tests\ERP\Setup.spec.js:3:1 › Setup-Log Category Creation  (11.3s)
Step 1: Navigating to login page...
Step 2: Logging in...
Step 4: Expanding Enquiry menu...
Expanding Enquiry menu 
Step 5: Opening Enquiry submenu...
Enquiry menu clicked successfully
Total Entries: [33m30[39m


Entry 1:
  S.No:       1
  Code:       ABC
  Name:       SAA
  Created At: 2025-12-24

Entry 2:
  S.No:       2
  Code:       AD
  Name:       Automation Division
  Created At: 2024-08-21

Entry 3:
  S.No:       3
  Code: 
```

---

## ❌ Test Failure Report
**Timestamp:** 2/16/2026, 11:01:36 AM
**Product:** ERP
**Test Script:** `Vendor.spec.js`
**Exit Code:** 1
**Duration:** 71.85s

### Error Output:
```
[MCP] ❌ Error calling /start: Error
Error: page.click: Test timeout of 60000ms exceeded.
Call log:
[2m  - waiting for locator('#react-select-10-input')[22m

    at [90mC:\Users\veeramani\Desktop\playwright-mcp\[39mtests\ERP\Vendor.spec.js:104:17 {
  [[32mSymbol(step)[39m]: {
    location: {
      file: [32m'C:\\Users\\veeramani\\Desktop\\playwright-mcp\\tests\\ERP\\Vendor.spec.js'[39m,
      line: [33m104[39m,
      column: [33m17[39m
    },
    category: [32m'pw:api'[39m,
    title: [32m"Click locator('#react-select-10-input')"[39m,
    apiName: [32m'page.click'[39m,
    params: { selector: [32m'#react-select-10-input'[39m, timeout: [33m0[39m },
    group: [90mundefined[39m,
    stepId: [32m'pw:api@47'[39m,
    boxedStack: [90mundefined[39m,
    steps: [],
    attachmentIndices: [],
    info: TestStepInfoImpl {
      annotations: [],
      _testInfo: [36m[TestInfoImpl][39m,
      _stepId: [32m'pw:api@47'[39m,
      _title: [32m"Click locator('#react-se
```

### Standard Output:
```
🔄 Global Setup: Starting MCP session...

Running 2 tests using 1 worker

Step 1: Navigating to login page...
Step 2: Logging in...
Step 3: Navigating to User page...
Step 2: Expanding Enquiry menu...
Sidebar clicked and opened successfully
Master Menu clicked successfully
Vendor Menu clicked successfully 
Row 1: VEN0014 | Darsh VV |  | Vendor | 2025-09-04 | Active | 
Row 2: SUB0003 | Darsh001 | Dubai | Sub Contractor | 2025-01-15 | Active | 
Row 3: 9 | aa | aa | Vendor | 2024-10-12 | Active | 
Row 4: VEN0003 | samsung 2 | 2b , tower 1, street 3210 | Vendor | 2025-01-02 | Active | 
Row 5: VEN0002 | aa | aa | Vendor | 2024-10-12 | Active | 
Row 6: 6 | Samsung | 4,test street,test | Vendor | 2024-12-30 | Active | 
Row 7: SUB0002 | Test Vendor | fhggj | Sub Contractor | 2024-12-30 | Active | 
  ok 1 tests\ERP\Vendor.spec.js:2:1 › Vendor  (9.3s)
Step 1: Navigating to login page...
Step 2: Logging in...
Step 3: Navigating to User page...
Step 2: Expanding Enquiry menu...
Sidebar clicked and
```

---
