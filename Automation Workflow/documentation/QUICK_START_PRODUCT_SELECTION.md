# 🎯 QUICK GUIDE: How to Select a Product

## ✅ **FIXED! The workflow is now ready to use.**

---

## 📝 **How to Select Which Product to Run**

### **Step 1: Open the Workflow in n8n**
1. Go to `http://localhost:5678` in your browser
2. Import or open: `n8n-product-wise-workflow.json`

### **Step 2: Click on "Select Product" Node**
- This is the second node in the workflow (after "Manual Trigger")

### **Step 3: Find This Line in the Code**
Look for:
```javascript
const SELECTED_PRODUCT = 'ERP';
```

### **Step 4: Change the Product**

**To run ERP tests:**
```javascript
const SELECTED_PRODUCT = 'ERP';
```

**To run Camp tests:**
```javascript
const SELECTED_PRODUCT = 'Camp';
```

### **Step 5: Save and Execute**
1. Click **Save** (or press Ctrl+S)
2. Click **Execute Workflow**
3. Done! ✅

---

## 🎨 **Visual Reference**

```
┌─────────────────────────────────────────────────┐
│  Select Product Node                            │
├─────────────────────────────────────────────────┤
│                                                 │
│  // ====================================        │
│  // SELECT WHICH PRODUCT TO RUN                │
│  // ====================================        │
│                                                 │
│  const SELECTED_PRODUCT = 'ERP';  ← CHANGE THIS │
│                                     ↑           │
│                                     │           │
│                          Change to 'Camp' for   │
│                          Camp Accommodation     │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🔄 **What Happens After You Select**

1. **Select Product** → Chooses ERP or Camp
2. **Find Product Test Files** → Scans the folder for .spec.js files
3. **Test Loop** → Runs each test one by one
4. **Notifications** → Sends Slack messages and emails
5. **Summary** → Shows final results

---

## 📊 **Product Paths**

| Product | Folder Path |
|---------|-------------|
| **ERP** | `C:/Users/veeramani/desktop/playwright-mcp/tests/ERP/` |
| **Camp** | `C:/Users/veeramani/desktop/playwright-mcp/tests/CampAccomodation/` |

---

## ✅ **What Was Fixed**

### Before (Broken):
- Returned both products at once
- Data structure mismatch
- "json property isn't an object" error

### After (Fixed):
- ✅ Returns only ONE selected product
- ✅ Proper JSON object structure
- ✅ Better error handling
- ✅ Clear comments for easy switching

---

## 🚀 **Quick Test**

1. Set `const SELECTED_PRODUCT = 'ERP';`
2. Save the node
3. Execute the workflow
4. Check Slack for test results
5. To switch to Camp, change to `'Camp'` and repeat

---

## 🆘 **Troubleshooting**

### Error: "Directory not found"
**Fix:** Check that the path exists:
```
C:/Users/veeramani/desktop/playwright-mcp/tests/ERP/
```

### Error: "No .spec.js test files found"
**Fix:** Make sure you have test files in the folder

### Error: "Invalid product"
**Fix:** Use exactly `'ERP'` or `'Camp'` (case-sensitive)

---

## 📌 **Remember**

- **Only change this line:** `const SELECTED_PRODUCT = 'ERP';`
- **Valid options:** `'ERP'` or `'Camp'`
- **Always save** after making changes
- **Re-execute** the workflow to see changes

---

**That's it! You're ready to run product-specific tests!** 🎉
