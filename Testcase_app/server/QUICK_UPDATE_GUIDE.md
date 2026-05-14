# 🎯 Quick Start: Update Your Database

## ✅ You now have a database update tool!

### 📁 Files Created:
1. **`update-db.js`** - The update tool
2. **`DATABASE_UPDATE_GUIDE.md`** - Complete guide with examples

---

## 🚀 How to Use

### Step 1: Navigate to server folder
```bash
cd server
```

### Step 2: Run your SQL query
```bash
node update-db.js "YOUR SQL QUERY HERE"
```

---

## 📝 Common Examples

### Example 1: Update a Requirement Title
```bash
node update-db.js "UPDATE requirements SET title = 'New Title' WHERE id = 'req-1764559082178'"
```

### Example 2: Update Test Case Priority
```bash
node update-db.js "UPDATE test_cases SET priority = 'High' WHERE id = 'tc-1764559775993'"
```

### Example 3: View All Requirements
```bash
node update-db.js "SELECT * FROM requirements"
```

### Example 4: View All Test Cases
```bash
node update-db.js "SELECT * FROM test_cases"
```

### Example 5: Update Execution Status
```bash
node update-db.js "UPDATE executions SET status = 'Passed' WHERE id = 'exec-1764560119311'"
```

---

## 🔍 Your Current Database IDs

Based on your current data:

### Requirements:
- `req-1764559082178` - Data warehouse
- `req-1764561187415` - Material allocation

### Test Cases:
- `tc-1764559775993` - Sample Test Case
- `tc-1764560114762` - Sample test case

### Executions:
- `exec-1764560119311` - Blocked execution
- `exec-1764559934891` - Passed execution

---

## 💡 Pro Tips

1. **Always check IDs first:**
   ```bash
   node view-db.js
   ```

2. **Use single quotes for strings:**
   ```bash
   node update-db.js "UPDATE requirements SET title = 'My Title' WHERE id = 'req-123'"
   ```

3. **View help anytime:**
   ```bash
   node update-db.js
   ```

4. **See all examples:**
   Open `DATABASE_UPDATE_GUIDE.md` for comprehensive examples

---

## ✨ Example: I Just Fixed a Typo!

I updated "Metarial allocation" to "Material allocation":

```bash
node update-db.js "UPDATE requirements SET title = 'Material allocation' WHERE id = 'req-1764561187415'"
```

Result: ✅ Successfully updated!

---

## 📚 Full Documentation

See **`DATABASE_UPDATE_GUIDE.md`** for:
- Complete SQL query examples
- All table structures
- Field names and types
- Common scenarios
- Best practices

---

## 🛠️ Available Tools

1. **`view-db.js`** - View all database contents
2. **`update-db.js`** - Update database with SQL queries
3. **`clear-db.js`** - Clear all data (use with caution!)

---

## ⚠️ Important

- Always backup before major changes
- Use `node view-db.js` to verify changes
- The web app at http://localhost:5173 will show updated data automatically
