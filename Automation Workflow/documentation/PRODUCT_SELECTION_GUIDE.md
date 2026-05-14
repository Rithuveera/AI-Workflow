# 🎯 How to Select a Product in n8n Workflow

## 📋 **Quick Reference**

You have **3 workflow options** to choose from:

| Workflow File | Selection Method | Best For |
|--------------|------------------|----------|
| `n8n-product-wise-workflow.json` | Edit code variable | Quick edits, automation |
| `n8n-product-selector-workflow.json` | Use Set node UI | Visual selection |
| `n8n-automation-hub.json` | Runs all products | Full test suite |

---

## 🔧 **Method 1: Edit Code Variable** (Current Workflow)

### File: `n8n-product-wise-workflow.json`

**Steps:**

1. **Open n8n** in your browser (usually `http://localhost:5678`)

2. **Import the workflow** if not already done:
   - Click **"Import from File"**
   - Select `n8n-product-wise-workflow.json`

3. **Click on the "Select Product" node**

4. **Find this line in the JavaScript code:**
   ```javascript
   const selectedProduct = 'ERP';
   ```

5. **Change the value:**
   - For **ERP** tests: `const selectedProduct = 'ERP';`
   - For **Camp** tests: `const selectedProduct = 'Camp';`

6. **Click "Save"** (or Ctrl+S)

7. **Execute the workflow** by clicking "Execute Workflow"

---

## 🎨 **Method 2: Use Set Node** (New Workflow - Easier!)

### File: `n8n-product-selector-workflow.json`

**Steps:**

1. **Import** `n8n-product-selector-workflow.json` into n8n

2. **Click on the "Set Product Info" node**

3. **In the Parameters panel**, you'll see a field called "product"

4. **Change the value:**
   - Type `ERP` for ERP tests
   - Type `Camp` for Camp tests

5. **Save and Execute**

> ✅ **This method is easier** because you don't need to edit code!

---

## 🚀 **Method 3: Create a Webhook Trigger** (Advanced)

If you want to select the product **dynamically** when triggering the workflow:

### Steps:

1. **Replace "Manual Trigger"** with a **"Webhook" node**

2. **Configure the webhook** to accept a parameter:
   ```
   Method: POST
   Path: /run-tests
   ```

3. **Send a request** with the product name:
   ```bash
   curl -X POST http://localhost:5678/webhook/run-tests \
     -H "Content-Type: application/json" \
     -d '{"product": "ERP"}'
   ```

4. **Update the "Select Product" node** to use the webhook data:
   ```javascript
   const selectedProduct = $input.first().json.product || 'ERP';
   ```

---

## 📊 **Product Configuration Reference**

### Available Products:

| Product Name | Folder Name | Description |
|-------------|-------------|-------------|
| `ERP` | `ERP` | Enterprise Resource Planning tests |
| `Camp` | `CampAccomodation` | Camp Accommodation tests |

### File Paths:

```
C:/Users/veeramani/desktop/playwright-mcp/tests/
├── ERP/
│   ├── test1.spec.js
│   ├── test2.spec.js
│   └── ...
└── CampAccomodation/
    ├── test1.spec.js
    ├── test2.spec.js
    └── ...
```

---

## 🎯 **Quick Start Guide**

### For Beginners (Recommended):

1. Use **`n8n-product-selector-workflow.json`**
2. Click "Set Product Info" node
3. Change the product value in the UI
4. Execute!

### For Advanced Users:

1. Use **`n8n-product-wise-workflow.json`**
2. Edit the code directly
3. Or set up webhook triggers for API-based execution

---

## 🔍 **Troubleshooting**

### Issue: "A 'json' property isn't an object"
**Solution:** Make sure you're using the **updated** workflow file with `runOnceForAllItems` mode

### Issue: "No test files found"
**Solution:** Check that the folder path is correct:
```javascript
const basePath = 'C:/Users/veeramani/desktop/playwright-mcp/tests';
```

### Issue: Product not changing
**Solution:** Make sure you **saved** the node after editing and **re-execute** the workflow

---

## 📝 **Example: Switching Products**

### To run ERP tests:
```javascript
// In "Select Product" node
const selectedProduct = 'ERP';
```

### To run Camp tests:
```javascript
// In "Select Product" node
const selectedProduct = 'Camp';
```

### To add a new product:
```javascript
const products = {
  'ERP': { product: 'ERP', folder: 'ERP', description: 'Run all ERP test scripts' },
  'Camp': { product: 'Camp', folder: 'CampAccomodation', description: 'Run all Camp Accommodation test scripts' },
  'NewProduct': { product: 'NewProduct', folder: 'NewProductFolder', description: 'New product tests' }
};
```

---

## 🎉 **Summary**

**Easiest Method:** Use `n8n-product-selector-workflow.json` and change the value in the "Set Product Info" node UI

**Most Flexible:** Edit the code in `n8n-product-wise-workflow.json`

**Run Everything:** Use `n8n-automation-hub.json` to run all products at once

---

**Need help?** Check the n8n documentation or ask for assistance! 🚀
