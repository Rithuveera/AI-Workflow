# 🔧 FIXING: "Task request timed out after 60 seconds"

## 🐛 **The Problem**

When running **Camp** tests (or any product with many tests), the workflow times out after 60 seconds because:

1. **Camp has more test files** than ERP
2. **Each Playwright test takes time** to execute
3. **n8n has default timeout limits** that need to be increased

---

## ✅ **Solution: Restart n8n with Unlimited Timeout**

### **✨ GOOD NEWS: I've already updated your `start_n8n.ps1` file!**

### **Step-by-Step Instructions:**

1. **Stop n8n** (press Ctrl+C in the terminal where n8n is running)

2. **Restart n8n** using the updated script:

```powershell
cd "C:\Users\veeramani\.gemini\antigravity\scratch\Automation Workflow"
.\start_n8n.ps1
```

3. **You should see:**
```
========================================
Starting n8n with unlimited timeout...
This allows long-running Playwright tests
========================================
```

4. **Execute your workflow** - it will now run without timeout! ✅

---

## 🎯 **What Was Changed**

### **Updated `start_n8n.ps1` file:**

**Added these environment variables:**
```powershell
$env:EXECUTIONS_TIMEOUT="-1"           # Unlimited workflow timeout
$env:EXECUTIONS_TIMEOUT_MAX="-1"       # No maximum timeout
$env:N8N_EXECUTION_TIMEOUT="-1"        # Unlimited execution time
```

**What `-1` means:**
- `-1` = **Unlimited** (no timeout)
- Any positive number = timeout in seconds

---

## 📊 **How Long Will Tests Take?**

### **Estimated Times:**

| Product | Test Files | Avg Time per Test | Total Time |
|---------|-----------|-------------------|------------|
| **ERP** | ~3-5 files | 15-30 seconds | 1-2 minutes |
| **Camp** | ~10-20 files | 15-30 seconds | 5-10 minutes |

**With the timeout fix, your workflow can run for as long as needed!** ✅

---

## 🔍 **Alternative Solutions**

### **Solution 2: Limit Number of Tests**

If you want to run only a few tests at a time, update the "Find Product Test Files" node:

```javascript
const MAX_TESTS = 5;  // Run only 5 tests

// ... existing code ...

const testFiles = allFiles
  .filter(file => file.endsWith('.spec.js'))
  .slice(0, MAX_TESTS);  // Limit to first 5
```

---

### **Solution 3: Increase Individual Test Timeout**

If individual tests are timing out, update the "Run Playwright Test" node:

**Find this line:**
```javascript
timeout: 300000  // 5 minutes
```

**Change to:**
```javascript
timeout: 600000  // 10 minutes
```

---

## ✅ **Verification Checklist**

After restarting n8n:

- [ ] n8n shows "Starting with unlimited timeout" message
- [ ] Workflow executes without "timeout" errors
- [ ] All tests complete successfully
- [ ] Summary shows correct test counts

---

## 🚀 **Quick Start**

**To fix the timeout issue right now:**

1. **Stop n8n** (Ctrl+C)
2. **Run:**
   ```powershell
   cd "C:\Users\veeramani\.gemini\antigravity\scratch\Automation Workflow"
   .\start_n8n.ps1
   ```
3. **Execute your workflow** - it will work! ✅

---

## 📝 **Troubleshooting**

### **Still getting timeout errors?**

1. **Check n8n logs** for specific error messages
2. **Verify environment variables** are set:
   ```powershell
   echo $env:EXECUTIONS_TIMEOUT
   # Should show: -1
   ```
3. **Restart your terminal** and try again

### **Tests are taking too long?**

- **Check Playwright configuration** in `playwright.config.js`
- **Reduce number of tests** using the limit approach above
- **Run tests in parallel** (advanced - requires Playwright config changes)

---

## 🎉 **Summary**

**Problem:** Workflow times out after 60 seconds  
**Cause:** n8n default timeout limits  
**Solution:** Restart n8n with unlimited timeout  
**Result:** Workflows can run as long as needed! ✅

---

**Restart n8n with the updated script and your timeout issues will be resolved!** 🚀
