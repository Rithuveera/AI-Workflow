# 📖 Guide: Running All Scripts vs. Partial Scripts in n8n

Follow this guide to switch between running your full test suite (all 21 scripts) or just a specific set of scripts for faster testing.

---

## 🚀 Option 1: Run ALL Scripts (Full Suite)
Use this when you want to execute every `.spec.js` file found in your product folder (ERP or Camp).

### 🛠️ How to configure:
Open the **"Find Product Test Files"** node and ensure the code looks like this:

```javascript
const fs = require('fs');
const items = $input.all();
const folder = items[0].json.folder;
const basePath = 'C:/Users/veeramani/desktop/playwright-mcp/tests';
const fullPath = `${basePath}/${folder}`;

// ✅ Correct: This finds every file in the folder
const testFiles = fs.readdirSync(fullPath).filter(file => file.endsWith('.spec.js'));

return testFiles.map(file => ({ 
  json: { ...items[0].json, filename: file, testPath: `tests/${folder}/${file}` } 
}));
```

---

## 🧪 Option 2: Run Partial Scripts (Short Run)
Use this for quick debugging or if you only want to test the first few scripts (e.g., first 5).

### 🛠️ How to configure:
Open the **"Find Product Test Files"** node and add the `.slice()` command:

```javascript
const fs = require('fs');
const items = $input.all();
const folder = items[0].json.folder;
const basePath = 'C:/Users/veeramani/desktop/playwright-mcp/tests';
const fullPath = `${basePath}/${folder}`;

const allFiles = fs.readdirSync(fullPath).filter(file => file.endsWith('.spec.js'));

// ⚠️ Change the number (5) to however many scripts you want to run
const testFiles = allFiles.slice(0, 5); 

return testFiles.map(file => ({ 
  json: { ...items[0].json, filename: file, testPath: `tests/${folder}/${file}` } 
}));
```

---

## 🎯 Option 3: Run ONE Specific File
Use this when you are working on a single script (e.g., `Itemmaster.spec.js`) and don't want to run anything else.

### 🛠️ How to configure:
Open the **"Select Product"** node (the node *before* Find Test Files) and replace its code with this:

```javascript
return [{ 
  json: { 
    product: 'ERP', 
    folder: 'ERP',
    filename: 'Itemmaster.spec.js',
    testPath: 'tests/ERP/Itemmaster.spec.js' 
  } 
}];
```
*Note: If you do this, you should **connect "Select Product" directly to "Test Loop"**, skipping the "Find Product Test Files" node entirely.*

---

## 📝 Summary of Key Differences

| Mode | Node to Edit | Key Code Change |
| :--- | :--- | :--- |
| **All Scripts** | Find Product Test Files | Use the full `readdirSync` list |
| **First 5 only** | Find Product Test Files | Add `.slice(0, 5)` |
| **One File only** | Select Product | Manually type the `testPath` |
| **Individual Failures** | New Workflow | Use `n8n-individual-case-failures.json` |

---

## 📧 Option 4: Individual Test Case Reporting
Use this when you have a file with **many test cases** and you want a **separate email for each failure**, rather than just one email for the whole file.

### 🛠️ How to use:
1. Import and use the `n8n-individual-case-failures.json` workflow.
2. In the **"Select Test File"** node, specify your file (e.g., `closing.spec.js`).
3. When executed:
   - If 10 tests run and 5 fail, you will receive **5 separate emails**.
   - Each email will contain the specific **Test Case Title**, the specific **Error**, and the **Screenshot** for that failure.

---
*Maintained by the Automation Team*
