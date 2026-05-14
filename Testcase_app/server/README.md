# TestFlow API Server

Backend API server for TestFlow Test Case Management Application.

## Features

- RESTful API for managing requirements, test cases, and executions
- SQLite database for data persistence
- CORS enabled for frontend integration
- Comprehensive error handling

## Database Schema

### Requirements
- `id`: Unique identifier
- `title`: Requirement title
- `description`: Detailed description
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Test Cases
- `id`: Unique identifier
- `requirement_id`: Foreign key to requirements
- `title`: Test case title
- `description`: Test case description
- `steps`: Test steps
- `expected_result`: Expected outcome
- `priority`: Priority level (High/Medium/Low)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Executions
- `id`: Unique identifier
- `test_case_id`: Foreign key to test cases
- `status`: Execution status (Passed/Failed/Blocked/Not Applicable)
- `notes`: Execution notes
- `executed_by`: Name of executor
- `execution_date`: Date of execution
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Initialize Database**
   ```bash
   npm run init-db
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env if needed
   ```

4. **Start Server**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Requirements
- `GET /api/requirements` - Get all requirements
- `GET /api/requirements/:id` - Get single requirement
- `POST /api/requirements` - Create requirement
- `PUT /api/requirements/:id` - Update requirement
- `DELETE /api/requirements/:id` - Delete requirement

### Test Cases
- `GET /api/test-cases` - Get all test cases
- `GET /api/test-cases/:id` - Get single test case
- `GET /api/test-cases/requirement/:requirementId` - Get test cases by requirement
- `POST /api/test-cases` - Create test case
- `PUT /api/test-cases/:id` - Update test case
- `DELETE /api/test-cases/:id` - Delete test case

### Executions
- `GET /api/executions` - Get all executions
- `GET /api/executions/:id` - Get single execution
- `GET /api/executions/testcase/:testCaseId` - Get executions by test case
- `GET /api/executions/stats` - Get execution statistics
- `POST /api/executions` - Create execution
- `PUT /api/executions/:id` - Update execution
- `DELETE /api/executions/:id` - Delete execution

### Health Check
- `GET /api/health` - Server health status

## Example API Calls

### Create a Requirement
```bash
curl -X POST http://localhost:3001/api/requirements \
  -H "Content-Type: application/json" \
  -d '{
    "title": "User Authentication",
    "description": "Users should be able to login securely"
  }'
```

### Create a Test Case
```bash
curl -X POST http://localhost:3001/api/test-cases \
  -H "Content-Type: application/json" \
  -d '{
    "requirement_id": "req-1234567890",
    "title": "Login with valid credentials",
    "description": "Verify user can login",
    "steps": "1. Open login page\n2. Enter credentials\n3. Click login",
    "expected_result": "User is logged in",
    "priority": "High"
  }'
```

### Create an Execution
```bash
curl -X POST http://localhost:3001/api/executions \
  -H "Content-Type: application/json" \
  -d '{
    "test_case_id": "tc-1234567890",
    "status": "Passed",
    "notes": "All tests passed successfully",
    "executed_by": "Test Engineer"
  }'
```

## Technology Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **better-sqlite3** - SQLite database driver
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## Development

The server uses Node.js built-in `--watch` flag for auto-reloading during development. Any changes to the source files will automatically restart the server.

## Database Location

The SQLite database file is located at:
```
server/database/testflow.db
```

## Troubleshooting

### Database Issues
If you encounter database issues, you can reinitialize it:
```bash
rm database/testflow.db
npm run init-db
```

### Port Already in Use
If port 3001 is already in use, change the PORT in `.env` file:
```
PORT=3002
```

## License

MIT
