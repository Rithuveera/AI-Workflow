# TestFlow - Test Case Management System

A comprehensive test case management application with product-based organization, built with React and Node.js.

## Features

- **Product-Based Organization**: Manage test cases for multiple products (BSSTech ERP, BSSTech HRMS, Camp Accommodation Management, Camp Nueron)
- **Requirements Management**: Create and track requirements with file attachments
- **Test Case Management**: Create, update, and organize test cases linked to requirements
- **Test Execution**: Execute test cases and track results (Passed, Failed, Blocked, NA)
- **Reports & Analytics**: Visual dashboards and comprehensive reporting
- **User Authentication**: Secure login and registration system

## Tech Stack

### Frontend
- React 18
- React Router
- Lucide React (Icons)
- Vite (Build tool)

### Backend
- Node.js
- Express.js
- Better-SQLite3 (Database)
- Multer (File uploads)
- bcryptjs (Password hashing)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Testcase_app
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
```

4. Set up environment variables:
```bash
cd server
cp .env.example .env
# Edit .env with your configuration
```

5. Initialize the database:
```bash
cd server
node database/init.js
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend (in a new terminal):
```bash
npm run dev
```

3. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Network Access

The application is configured to be accessible on your local network.

#### On Your Computer (URLs never change):
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

#### From Other Computers on Your Network:

Since your IP address may change daily, use the helper script to find current URLs:

**Option 1: Double-click the batch file**
```
show-urls.bat
```

**Option 2: Run PowerShell script**
```powershell
.\show-urls.ps1
```

**Option 3: Manual IP lookup**
```powershell
ipconfig | findstr IPv4
```
Then use: `http://YOUR_IP:5173`

**Note:** The backend server displays the current network URL when it starts.

## Project Structure

```
Testcase_app/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── context/           # React context providers
│   ├── services/          # API services
│   └── styles/            # CSS styles
├── server/                # Backend source code
│   ├── config/            # Configuration files
│   ├── database/          # Database setup and migrations
│   ├── routes/            # API routes
│   └── uploads/           # File upload storage
└── public/                # Static assets
```

## Usage

### First Time Setup

1. Register a new account at `/register`
2. Login with your credentials
3. Select a product to work with
4. Start creating requirements and test cases

### Creating Requirements

1. Navigate to "Requirements"
2. Click "New Requirement"
3. Fill in title, description, and optionally attach files
4. Save the requirement

### Creating Test Cases

1. Navigate to "Test Cases"
2. Click "New Test Case"
3. Link to a requirement
4. Define test steps, expected results, and priority
5. Save the test case

### Executing Tests

1. Navigate to "Execution"
2. Select a test case
3. Record the execution status and notes
4. View results in the Reports section

## Database

The application uses SQLite for data storage. The database file is located at `server/database/testflow.db`.

### Database Schema

- **users**: User authentication
- **requirements**: Project requirements with attachments
- **test_cases**: Test case definitions
- **executions**: Test execution records

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Requirements
- `GET /api/requirements?product=<product>` - Get all requirements
- `POST /api/requirements` - Create requirement
- `PUT /api/requirements/:id` - Update requirement
- `DELETE /api/requirements/:id` - Delete requirement

### Test Cases
- `GET /api/test-cases?product=<product>` - Get all test cases
- `POST /api/test-cases` - Create test case
- `PUT /api/test-cases/:id` - Update test case
- `DELETE /api/test-cases/:id` - Delete test case

### Executions
- `GET /api/executions?product=<product>` - Get all executions
- `POST /api/executions` - Create execution
- `GET /api/executions/stats?product=<product>` - Get statistics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please create an issue in the repository.
