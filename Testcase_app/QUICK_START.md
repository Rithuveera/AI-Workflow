# 🚀 Quick Start Guide - TestFlow Database

## ✅ Current Status

**Database:** ✅ Created and initialized  
**Server:** ✅ Running on http://localhost:3001  
**Sample Data:** ✅ Loaded (2 requirements, 2 test cases, 2 executions)

---

## 📋 Quick Commands

### Start the Server
```bash
cd server
npm start
```

### Stop the Server
Press `Ctrl+C` in the terminal where server is running

### Test the API
```powershell
# Health check
Invoke-RestMethod http://localhost:3001/api/health

# Get all requirements
Invoke-RestMethod http://localhost:3001/api/requirements

# Get statistics
Invoke-RestMethod http://localhost:3001/api/executions/stats
```

---

## 📊 What You Have Now

### Database Tables
1. **requirements** - Stores project requirements
2. **test_cases** - Test cases linked to requirements  
3. **executions** - Test execution results with status tracking

### API Endpoints
- `GET /api/requirements` - List all requirements
- `POST /api/requirements` - Create new requirement
- `GET /api/test-cases` - List all test cases
- `POST /api/test-cases` - Create new test case
- `GET /api/executions` - List all executions
- `POST /api/executions` - Create new execution
- `GET /api/executions/stats` - Get execution statistics

### Sample Data Loaded
```
✅ User Authentication (Requirement)
   └── ✅ Login with valid credentials (Test Case)
       └── ✅ Passed (Execution)

✅ Dashboard Display (Requirement)
   └── ✅ View dashboard statistics (Test Case)
       └── ✅ Passed (Execution)
```

---

## 🎯 Next Steps

### Option 1: Explore the Database
1. Download **DB Browser for SQLite** from https://sqlitebrowser.org/
2. Open `server/database/testflow.db`
3. Browse the tables and data

### Option 2: Test the API
```powershell
# Create a new requirement
$body = @{
    title = "Password Reset"
    description = "Users should be able to reset their password"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/requirements" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

### Option 3: Integrate with Frontend
The frontend currently uses localStorage. To connect it to the database:

1. Create API service layer in `src/services/api.js`
2. Update components to use API instead of localStorage
3. Add loading states and error handling

**Would you like me to help integrate the frontend with the database?**

---

## 📚 Documentation

- **DATABASE.md** - Complete database schema and SQL queries
- **API_REFERENCE.md** - All API endpoints with examples
- **server/README.md** - Server setup and configuration
- **DATABASE_SETUP_COMPLETE.md** - Full setup summary

---

## 🔧 Useful Commands

### View Database Content
```bash
# Open SQLite CLI
sqlite3 server/database/testflow.db

# List all tables
.tables

# View requirements
SELECT * FROM requirements;

# View test cases with requirement names
SELECT tc.*, r.title as req_title 
FROM test_cases tc 
JOIN requirements r ON tc.requirement_id = r.id;

# Exit
.exit
```

### Backup Database
```bash
copy server\database\testflow.db server\database\backup_testflow.db
```

### Reset Database
```bash
del server\database\testflow.db
cd server
npm run init-db
```

---

## 💡 Tips

1. **Keep server running** while testing the API
2. **Use PowerShell** for quick API testing
3. **Check server logs** to see incoming requests
4. **Backup database** before making major changes
5. **Read API_REFERENCE.md** for detailed endpoint documentation

---

## 🆘 Troubleshooting

### Server won't start
```bash
# Check if port 3001 is in use
netstat -ano | findstr :3001

# Change port in server/.env if needed
PORT=3002
```

### Database locked error
- Close any SQLite browser applications
- Restart the server

### Can't connect to API
- Verify server is running: http://localhost:3001/api/health
- Check firewall settings
- Ensure correct port in API calls

---

## 🎉 Success!

Your TestFlow application now has:
- ✅ Professional SQLite database
- ✅ RESTful API server
- ✅ Complete CRUD operations
- ✅ Sample data for testing
- ✅ Comprehensive documentation

**The database is ready to use!** 🚀

---

## 📞 Need Help?

Check the documentation files:
- Database questions → `DATABASE.md`
- API usage → `API_REFERENCE.md`
- Server setup → `server/README.md`

Or ask me to help integrate the frontend with the database! 😊
