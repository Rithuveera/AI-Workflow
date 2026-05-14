# TestFlow Database Documentation

## Overview

The TestFlow application uses **SQLite** as its database system. SQLite is a lightweight, serverless database that stores all data in a single file (`testflow.db`), making it perfect for local development and small to medium-sized applications.

## Database Location

```
server/database/testflow.db
```

## Database Schema

### Entity Relationship Diagram

```
┌─────────────────┐
│  Requirements   │
├─────────────────┤
│ id (PK)         │
│ title           │
│ description     │
│ created_at      │
│ updated_at      │
└────────┬────────┘
         │
         │ 1:N
         │
         ▼
┌─────────────────┐
│   Test Cases    │
├─────────────────┤
│ id (PK)         │
│ requirement_id  │◄─── Foreign Key
│ title           │
│ description     │
│ steps           │
│ expected_result │
│ priority        │
│ created_at      │
│ updated_at      │
└────────┬────────┘
         │
         │ 1:N
         │
         ▼
┌─────────────────┐
│   Executions    │
├─────────────────┤
│ id (PK)         │
│ test_case_id    │◄─── Foreign Key
│ status          │
│ notes           │
│ executed_by     │
│ execution_date  │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

## Table Details

### 1. Requirements Table

Stores project requirements that serve as the foundation for test cases.

| Column       | Type     | Constraints | Description                    |
|--------------|----------|-------------|--------------------------------|
| id           | TEXT     | PRIMARY KEY | Unique identifier (req-xxxxx)  |
| title        | TEXT     | NOT NULL    | Requirement title              |
| description  | TEXT     | -           | Detailed description           |
| created_at   | DATETIME | DEFAULT NOW | Creation timestamp             |
| updated_at   | DATETIME | DEFAULT NOW | Last update timestamp          |

**Example Data:**
```json
{
  "id": "req-1732776364000",
  "title": "User Authentication",
  "description": "Users should be able to login and logout securely",
  "created_at": "2025-11-28T05:36:04.000Z",
  "updated_at": "2025-11-28T05:36:04.000Z"
}
```

### 2. Test Cases Table

Contains test cases linked to specific requirements.

| Column          | Type     | Constraints                    | Description                        |
|-----------------|----------|--------------------------------|------------------------------------|
| id              | TEXT     | PRIMARY KEY                    | Unique identifier (tc-xxxxx)       |
| requirement_id  | TEXT     | NOT NULL, FOREIGN KEY          | Links to requirements table        |
| title           | TEXT     | NOT NULL                       | Test case title                    |
| description     | TEXT     | -                              | Test case description              |
| steps           | TEXT     | -                              | Step-by-step test instructions     |
| expected_result | TEXT     | -                              | Expected outcome                   |
| priority        | TEXT     | DEFAULT 'Medium'               | Priority (High/Medium/Low)         |
| created_at      | DATETIME | DEFAULT NOW                    | Creation timestamp                 |
| updated_at      | DATETIME | DEFAULT NOW                    | Last update timestamp              |

**Relationships:**
- `requirement_id` → `requirements.id` (ON DELETE CASCADE)

**Example Data:**
```json
{
  "id": "tc-1732776364001",
  "requirement_id": "req-1732776364000",
  "title": "Login with valid credentials",
  "description": "Verify user can login with correct username and password",
  "steps": "1. Navigate to login page\n2. Enter valid username\n3. Enter valid password\n4. Click login button",
  "expected_result": "User should be redirected to dashboard",
  "priority": "High",
  "created_at": "2025-11-28T05:36:04.000Z",
  "updated_at": "2025-11-28T05:36:04.000Z"
}
```

### 3. Executions Table

Records test execution results with status tracking.

| Column         | Type     | Constraints                                      | Description                        |
|----------------|----------|--------------------------------------------------|------------------------------------|
| id             | TEXT     | PRIMARY KEY                                      | Unique identifier (exec-xxxxx)     |
| test_case_id   | TEXT     | NOT NULL, FOREIGN KEY                            | Links to test_cases table          |
| status         | TEXT     | NOT NULL, CHECK (Passed/Failed/Blocked/NA)       | Execution status                   |
| notes          | TEXT     | -                                                | Execution notes/comments           |
| executed_by    | TEXT     | -                                                | Name of person who executed        |
| execution_date | DATETIME | DEFAULT NOW                                      | When the test was executed         |
| created_at     | DATETIME | DEFAULT NOW                                      | Creation timestamp                 |
| updated_at     | DATETIME | DEFAULT NOW                                      | Last update timestamp              |

**Relationships:**
- `test_case_id` → `test_cases.id` (ON DELETE CASCADE)

**Valid Status Values:**
- `Passed` - Test passed successfully
- `Failed` - Test failed
- `Blocked` - Test blocked by external factors
- `Not Applicable` - Test not applicable in current context

**Example Data:**
```json
{
  "id": "exec-1732776364002",
  "test_case_id": "tc-1732776364001",
  "status": "Passed",
  "notes": "Login functionality working as expected",
  "executed_by": "Test Engineer",
  "execution_date": "2025-11-28T05:36:04.000Z",
  "created_at": "2025-11-28T05:36:04.000Z",
  "updated_at": "2025-11-28T05:36:04.000Z"
}
```

### 4. Users Table

Stores user credentials for authentication.

| Column      | Type     | Constraints           | Description                    |
|-------------|----------|-----------------------|--------------------------------|
| id          | TEXT     | PRIMARY KEY           | Unique identifier (user-xxxxx) |
| username    | TEXT     | UNIQUE, NOT NULL      | User's login username          |
| password    | TEXT     | NOT NULL              | Hashed password                |
| created_at  | DATETIME | DEFAULT NOW           | Creation timestamp             |

**Example Data:**
```json
{
  "id": "user-1732776364003",
  "username": "admin",
  "password": "$2a$10$...",
  "created_at": "2025-11-28T05:36:04.000Z"
}
```

## Database Features

### 1. Foreign Key Constraints

Foreign keys are enabled with CASCADE deletion:
- Deleting a requirement automatically deletes all associated test cases
- Deleting a test case automatically deletes all associated executions

### 2. Indexes

Performance indexes are created on:
- `test_cases.requirement_id` - Fast lookup of test cases by requirement
- `executions.test_case_id` - Fast lookup of executions by test case
- `executions.status` - Fast filtering by status
- `executions.execution_date` - Fast sorting by date

### 3. Automatic Timestamps

Triggers automatically update the `updated_at` field whenever a record is modified.

### 4. WAL Mode

Write-Ahead Logging (WAL) mode is enabled for better concurrent access and performance.

## Common Queries

### Get all test cases with requirement details
```sql
SELECT tc.*, r.title as requirement_title 
FROM test_cases tc
LEFT JOIN requirements r ON tc.requirement_id = r.id
ORDER BY tc.created_at DESC;
```

### Get execution statistics
```sql
SELECT 
    COUNT(*) as total,
    SUM(CASE WHEN status = 'Passed' THEN 1 ELSE 0 END) as passed,
    SUM(CASE WHEN status = 'Failed' THEN 1 ELSE 0 END) as failed,
    SUM(CASE WHEN status = 'Blocked' THEN 1 ELSE 0 END) as blocked,
    SUM(CASE WHEN status = 'Not Applicable' THEN 1 ELSE 0 END) as not_applicable
FROM executions;
```

### Get test cases by requirement
```sql
SELECT * FROM test_cases 
WHERE requirement_id = 'req-1732776364000'
ORDER BY priority DESC;
```

### Get execution history for a test case
```sql
SELECT * FROM executions 
WHERE test_case_id = 'tc-1732776364001'
ORDER BY execution_date DESC;
```

## Database Management

### Viewing the Database

You can use any SQLite browser to view the database:
- **DB Browser for SQLite** (Recommended) - https://sqlitebrowser.org/
- **SQLite Viewer** (VS Code Extension)
- **Command Line**: `sqlite3 database/testflow.db`

### Backup the Database

```bash
# Create a backup
cp database/testflow.db database/testflow_backup.db

# Or export to SQL
sqlite3 database/testflow.db .dump > backup.sql
```

### Reset the Database

```bash
# Delete the database file
rm database/testflow.db

# Reinitialize
npm run init-db
```

### Query the Database Directly

```bash
# Open SQLite CLI
sqlite3 database/testflow.db

# Run queries
sqlite> SELECT * FROM requirements;
sqlite> .tables
sqlite> .schema requirements
sqlite> .exit
```

## Migration Strategy

For future schema changes, consider:

1. **Version Control**: Track schema changes in version control
2. **Migration Scripts**: Create numbered migration files (e.g., `001_add_column.sql`)
3. **Backup First**: Always backup before running migrations
4. **Test Migrations**: Test on a copy of production data first

## Security Considerations

1. **SQL Injection**: The API uses prepared statements to prevent SQL injection
2. **Input Validation**: Validate all inputs before database operations
3. **Access Control**: Implement authentication/authorization at the API level
4. **Backup Strategy**: Regular automated backups recommended for production

## Performance Tips

1. **Indexes**: Already optimized with indexes on foreign keys and frequently queried fields
2. **Batch Operations**: Use transactions for multiple inserts/updates
3. **Connection Pooling**: SQLite uses a single connection, managed by better-sqlite3
4. **Query Optimization**: Use EXPLAIN QUERY PLAN to analyze slow queries

## Sample Data

The database is initialized with 2 sample requirements, 2 test cases, and 2 executions. You can:
- Keep this data for testing
- Delete it and start fresh
- Modify the `database/init.js` file to customize sample data

## Troubleshooting

### Database Locked Error
- SQLite allows only one writer at a time
- WAL mode helps with this
- Ensure no other processes are accessing the database

### Corrupted Database
```bash
# Check integrity
sqlite3 database/testflow.db "PRAGMA integrity_check;"

# If corrupted, restore from backup
cp database/testflow_backup.db database/testflow.db
```

### Missing Tables
```bash
# Reinitialize the database
npm run init-db
```

## Next Steps

To integrate this database with your frontend:

1. Update the frontend to use API calls instead of localStorage
2. Create API service functions in the frontend
3. Update React components to fetch/post data via API
4. Add error handling for network requests
5. Consider adding loading states for async operations

Would you like help with any of these integration steps?
