# 🔧 Database Update Guide

## How to Update Your TestFlow Database

### Quick Start

Run queries using the update tool:
```bash
node update-db.js "YOUR SQL QUERY HERE"
```

---

## 📝 UPDATE Queries

### Update a Requirement
```sql
-- Update requirement title
node update-db.js "UPDATE requirements SET title = 'Updated Title' WHERE id = 'req-1764559082178'"

-- Update requirement description
node update-db.js "UPDATE requirements SET description = 'New description here' WHERE id = 'req-1764559082178'"

-- Update both title and description
node update-db.js "UPDATE requirements SET title = 'New Title', description = 'New Description' WHERE id = 'req-1764559082178'"
```

### Update a Test Case
```sql
-- Update test case title
node update-db.js "UPDATE test_cases SET title = 'Updated Test Case' WHERE id = 'tc-1764559775993'"

-- Update test case priority
node update-db.js "UPDATE test_cases SET priority = 'High' WHERE id = 'tc-1764559775993'"

-- Update test case steps
node update-db.js "UPDATE test_cases SET steps = '1. Step one\n2. Step two\n3. Step three' WHERE id = 'tc-1764559775993'"

-- Update expected result
node update-db.js "UPDATE test_cases SET expected_result = 'New expected result' WHERE id = 'tc-1764559775993'"

-- Update multiple fields
node update-db.js "UPDATE test_cases SET title = 'New Title', priority = 'High', steps = 'New steps' WHERE id = 'tc-1764559775993'"
```

### Update an Execution
```sql
-- Update execution status
node update-db.js "UPDATE executions SET status = 'Passed' WHERE id = 'exec-1764560119311'"

-- Update execution notes
node update-db.js "UPDATE executions SET notes = 'Test passed successfully' WHERE id = 'exec-1764560119311'"

-- Update who executed it
node update-db.js "UPDATE executions SET executed_by = 'John Doe' WHERE id = 'exec-1764560119311'"
```

---

## ➕ INSERT Queries (Add New Data)

### Add a New Requirement
```sql
node update-db.js "INSERT INTO requirements (id, title, description) VALUES ('req-' || strftime('%s', 'now') || substr(strftime('%f', 'now'), 4), 'New Requirement', 'Description here')"
```

### Add a New Test Case
```sql
node update-db.js "INSERT INTO test_cases (id, requirement_id, title, description, steps, expected_result, priority) VALUES ('tc-' || strftime('%s', 'now') || substr(strftime('%f', 'now'), 4), 'req-1764559082178', 'New Test Case', 'Description', 'Test steps', 'Expected result', 'Medium')"
```

### Add a New Execution
```sql
node update-db.js "INSERT INTO executions (id, test_case_id, status, notes, executed_by) VALUES ('exec-' || strftime('%s', 'now') || substr(strftime('%f', 'now'), 4), 'tc-1764559775993', 'Passed', 'Test notes', 'User')"
```

---

## 🗑️ DELETE Queries

### Delete a Requirement
```sql
node update-db.js "DELETE FROM requirements WHERE id = 'req-1764559082178'"
```

### Delete a Test Case
```sql
node update-db.js "DELETE FROM test_cases WHERE id = 'tc-1764559775993'"
```

### Delete an Execution
```sql
node update-db.js "DELETE FROM executions WHERE id = 'exec-1764560119311'"
```

### Delete All Executions for a Test Case
```sql
node update-db.js "DELETE FROM executions WHERE test_case_id = 'tc-1764559775993'"
```

---

## 🔍 SELECT Queries (View Data)

### View All Data
```sql
node update-db.js "SELECT * FROM requirements"
node update-db.js "SELECT * FROM test_cases"
node update-db.js "SELECT * FROM executions"
```

### View Specific Data
```sql
-- Find requirements by title
node update-db.js "SELECT * FROM requirements WHERE title LIKE '%warehouse%'"

-- Find high priority test cases
node update-db.js "SELECT * FROM test_cases WHERE priority = 'High'"

-- Find failed executions
node update-db.js "SELECT * FROM executions WHERE status = 'Failed'"

-- Find test cases for a specific requirement
node update-db.js "SELECT * FROM test_cases WHERE requirement_id = 'req-1764559082178'"
```

### View with Joins
```sql
-- View test cases with requirement names
node update-db.js "SELECT tc.id, tc.title, tc.priority, r.title as requirement FROM test_cases tc LEFT JOIN requirements r ON tc.requirement_id = r.id"

-- View executions with test case names
node update-db.js "SELECT e.id, e.status, e.execution_date, tc.title as test_case FROM executions e LEFT JOIN test_cases tc ON e.test_case_id = tc.id"
```

---

## 📊 Common Update Scenarios

### Scenario 1: Fix a Typo in Requirement Title
```sql
node update-db.js "UPDATE requirements SET title = 'Material allocation' WHERE id = 'req-1764561187415'"
```

### Scenario 2: Change Test Case Priority
```sql
node update-db.js "UPDATE test_cases SET priority = 'High' WHERE id = 'tc-1764559775993'"
```

### Scenario 3: Update Execution Status
```sql
node update-db.js "UPDATE executions SET status = 'Passed' WHERE id = 'exec-1764560119311'"
```

### Scenario 4: Add Notes to Execution
```sql
node update-db.js "UPDATE executions SET notes = 'Test completed successfully with no issues' WHERE id = 'exec-1764560119311'"
```

---

## 🛡️ Important Notes

1. **Always backup your database before making changes!**
   ```bash
   copy database\testflow.db database\testflow_backup.db
   ```

2. **Use single quotes for strings in SQL**
   - Correct: `'My String'`
   - Wrong: `"My String"`

3. **Escape single quotes in strings**
   - Use two single quotes: `'It''s working'`

4. **Check your changes**
   ```bash
   node view-db.js
   ```

5. **Valid Status Values for Executions:**
   - `Passed`
   - `Failed`
   - `Blocked`
   - `NA`

6. **Valid Priority Values for Test Cases:**
   - `High`
   - `Medium`
   - `Low`

---

## 🔄 Quick Reference

### Database Tables
- `requirements` - Project requirements
- `test_cases` - Test cases
- `executions` - Test execution records

### Common Fields
**Requirements:**
- `id`, `title`, `description`, `created_at`, `updated_at`

**Test Cases:**
- `id`, `requirement_id`, `title`, `description`, `steps`, `expected_result`, `priority`, `created_at`, `updated_at`

**Executions:**
- `id`, `test_case_id`, `status`, `notes`, `executed_by`, `execution_date`

---

## 📞 Need Help?

Run the update tool without arguments to see examples:
```bash
node update-db.js
```

View current database contents:
```bash
node view-db.js
```
