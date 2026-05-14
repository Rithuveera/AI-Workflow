# 📊 Database Operations Guide

Complete guide for viewing, updating, and deleting data in your TestFlow database.

---

## 🔍 **1. VIEW DATABASE**

### View All Data
```bash
cd server
node view-db.js
```

This displays:
- ✅ All Requirements
- ✅ All Test Cases
- ✅ All Executions
- ✅ All Users
- ✅ Statistics

**Output is saved to:** `server/database-contents.txt`

### View Specific Table
```bash
node update-db.js "SELECT * FROM requirements"
node update-db.js "SELECT * FROM test_cases"
node update-db.js "SELECT * FROM executions"
node update-db.js "SELECT * FROM users"
```

### View with Filters
```bash
# View high priority test cases
node update-db.js "SELECT * FROM test_cases WHERE priority = 'High'"

# View passed executions
node update-db.js "SELECT * FROM executions WHERE status = 'Passed'"

# View specific requirement
node update-db.js "SELECT * FROM requirements WHERE id = 'req-1764559082178'"
```

---

## ✏️ **2. UPDATE DATABASE**

### Update Requirements
```bash
# Update title
node update-db.js "UPDATE requirements SET title = 'New Title' WHERE id = 'req-1764559082178'"

# Update description
node update-db.js "UPDATE requirements SET description = 'New description' WHERE id = 'req-1764559082178'"

# Update both
node update-db.js "UPDATE requirements SET title = 'New Title', description = 'New desc' WHERE id = 'req-1764559082178'"
```

### Update Test Cases
```bash
# Update priority
node update-db.js "UPDATE test_cases SET priority = 'High' WHERE id = 'TC_MA_001'"

# Update title
node update-db.js "UPDATE test_cases SET title = 'New Test Title' WHERE id = 'TC_MA_001'"

# Update steps
node update-db.js "UPDATE test_cases SET steps = '1. Step one\n2. Step two' WHERE id = 'TC_MA_001'"

# Update expected result
node update-db.js "UPDATE test_cases SET expected_result = 'Should work correctly' WHERE id = 'TC_MA_001'"

# Update actual result
node update-db.js "UPDATE test_cases SET actual_result = 'Worked as expected' WHERE id = 'TC_MA_001'"

# Update multiple fields
node update-db.js "UPDATE test_cases SET priority = 'High', steps = 'New steps' WHERE id = 'TC_MA_001'"
```

### Update Executions
```bash
# Update status
node update-db.js "UPDATE executions SET status = 'Passed' WHERE id = 'exec-1764560119311'"

# Update notes
node update-db.js "UPDATE executions SET notes = 'Test completed successfully' WHERE id = 'exec-1764560119311'"

# Update executed_by
node update-db.js "UPDATE executions SET executed_by = 'John Doe' WHERE id = 'exec-1764560119311'"
```

### Update Multiple Records
```bash
# Update all Medium priority to High
node update-db.js "UPDATE test_cases SET priority = 'High' WHERE priority = 'Medium'"

# Update all executions by a user
node update-db.js "UPDATE executions SET executed_by = 'New Name' WHERE executed_by = 'User'"
```

---

## 🗑️ **3. DELETE FROM DATABASE**

### Delete Single Record
```bash
# Delete a requirement (also deletes related test cases and executions)
node update-db.js "DELETE FROM requirements WHERE id = 'req-1764559082178'"

# Delete a test case (also deletes related executions)
node update-db.js "DELETE FROM test_cases WHERE id = 'TC_MA_001'"

# Delete an execution
node update-db.js "DELETE FROM executions WHERE id = 'exec-1764560119311'"

# Delete a user
node update-db.js "DELETE FROM users WHERE username = 'testuser'"
```

### Delete Multiple Records
```bash
# Delete all Low priority test cases
node update-db.js "DELETE FROM test_cases WHERE priority = 'Low'"

# Delete all Failed executions
node update-db.js "DELETE FROM executions WHERE status = 'Failed'"

# Delete all users (except keep one)
node update-db.js "DELETE FROM users WHERE username != 'admin'"
```

### Delete All Data from a Table
```bash
# Delete all requirements
node update-db.js "DELETE FROM requirements"

# Delete all test cases
node update-db.js "DELETE FROM test_cases"

# Delete all executions
node update-db.js "DELETE FROM executions"

# Delete all users
node update-db.js "DELETE FROM users"
```

### Clear Entire Database
```bash
# Use the clear-db script (clears ALL tables)
node clear-db.js
```

---

## 🔧 **4. ADVANCED OPERATIONS**

### Insert New Records
```bash
# Insert a requirement
node update-db.js "INSERT INTO requirements (id, title, description) VALUES ('req-new', 'New Requirement', 'Description here')"

# Insert a test case
node update-db.js "INSERT INTO test_cases (id, requirement_id, title, steps, expected_result, priority) VALUES ('TC_NE_001', 'req-new', 'Test Title', 'Steps here', 'Expected result', 'High')"

# Insert an execution
node update-db.js "INSERT INTO executions (id, test_case_id, status, notes, executed_by) VALUES ('exec-new', 'TC_NE_001', 'Passed', 'Notes here', 'Tester Name')"
```

### Complex Queries
```bash
# Count test cases by priority
node update-db.js "SELECT priority, COUNT(*) as count FROM test_cases GROUP BY priority"

# Get test cases with requirement names
node update-db.js "SELECT tc.id, tc.title, r.title as requirement FROM test_cases tc LEFT JOIN requirements r ON tc.requirement_id = r.id"

# Get execution statistics
node update-db.js "SELECT status, COUNT(*) as count FROM executions GROUP BY status"
```

---

## 📋 **5. TABLE STRUCTURES**

### Requirements Table
- `id` - TEXT (Primary Key)
- `title` - TEXT
- `description` - TEXT
- `created_at` - DATETIME
- `updated_at` - DATETIME

### Test Cases Table
- `id` - TEXT (Primary Key)
- `requirement_id` - TEXT (Foreign Key)
- `title` - TEXT
- `description` - TEXT
- `steps` - TEXT
- `expected_result` - TEXT
- `actual_result` - TEXT
- `priority` - TEXT (High/Medium/Low)
- `created_at` - DATETIME
- `updated_at` - DATETIME

### Executions Table
- `id` - TEXT (Primary Key)
- `test_case_id` - TEXT (Foreign Key)
- `status` - TEXT (Passed/Failed/Blocked/NA)
- `notes` - TEXT
- `executed_by` - TEXT
- `execution_date` - DATETIME
- `created_at` - DATETIME
- `updated_at` - DATETIME

### Users Table
- `id` - TEXT (Primary Key)
- `username` - TEXT (Unique)
- `password` - TEXT (Hashed)
- `created_at` - DATETIME

---

## ⚠️ **IMPORTANT NOTES**

### Cascade Deletions
- Deleting a **requirement** automatically deletes all its **test cases** and **executions**
- Deleting a **test case** automatically deletes all its **executions**

### Backup Before Major Changes
```bash
# Create a backup
cp server/database/testflow.db server/database/testflow_backup.db
```

### Restore from Backup
```bash
# Restore from backup
cp server/database/testflow_backup.db server/database/testflow.db
```

---

## 💡 **QUICK REFERENCE**

| Operation | Command |
|-----------|---------|
| View all data | `node view-db.js` |
| View table | `node update-db.js "SELECT * FROM table_name"` |
| Update record | `node update-db.js "UPDATE table SET field = 'value' WHERE id = 'id'"` |
| Delete record | `node update-db.js "DELETE FROM table WHERE id = 'id'"` |
| Clear all data | `node clear-db.js` |

---

## 🎯 **COMMON SCENARIOS**

### Scenario 1: Fix a Typo in Requirement
```bash
# 1. Find the requirement ID
node view-db.js

# 2. Update the title
node update-db.js "UPDATE requirements SET title = 'Correct Title' WHERE id = 'req-123'"

# 3. Verify the change
node view-db.js
```

### Scenario 2: Change Test Case Priority
```bash
# Update priority
node update-db.js "UPDATE test_cases SET priority = 'High' WHERE id = 'TC_MA_001'"
```

### Scenario 3: Delete Old Test Data
```bash
# Delete all executions older than a date
node update-db.js "DELETE FROM executions WHERE execution_date < '2025-11-01'"
```

### Scenario 4: Reset User Passwords (Manual)
```bash
# Delete user and re-register through the app
node update-db.js "DELETE FROM users WHERE username = 'testuser'"
# Then register again through the web interface
```

---

## 🚀 **WORKFLOW**

1. **View** → Check current data
   ```bash
   node view-db.js
   ```

2. **Update/Delete** → Make changes
   ```bash
   node update-db.js "YOUR SQL QUERY"
   ```

3. **Verify** → Check the changes
   ```bash
   node view-db.js
   ```

4. **Refresh App** → See changes in browser
   - The web app automatically reflects database changes

---

## 📞 **NEED HELP?**

Run any command without arguments to see help:
```bash
node update-db.js
```

This will show all available examples and usage instructions.
