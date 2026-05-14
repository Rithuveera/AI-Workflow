# Case10X 🚀

Case10X is an intelligent test case generation system powered by Google Gemini AI that automatically creates comprehensive test cases 10x faster from requirement documents.

## Features

- 📄 **Document Upload**: Support for PDF, DOCX, and TXT files
- 🤖 **AI-Powered Generation**: Uses Google Gemini AI for intelligent test case creation
- ✨ **Comprehensive Test Cases**: Generates test case name, description, steps, expected results, priority, and type
- 📊 **Test Case Management**: View, edit, and export generated test cases
- 🎨 **Modern UI**: Beautiful, responsive interface with dark mode support
- 💾 **Data Persistence**: SQLite database for storing test cases

## Technology Stack

### Frontend
- HTML5, CSS3, JavaScript
- Modern responsive design
- Fetch API for backend communication

### Backend
- Python 3.8+
- Flask (Web framework)
- Google Generative AI (Gemini API)
- PyPDF2 (PDF parsing)
- python-docx (DOCX parsing)
- SQLite (Database)

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))

### Installation

1. **Install Python dependencies**:
```bash
pip install -r requirements.txt
```

2. **Set up your Gemini API key**:
   - Create a `.env` file in the root directory
   - Add your API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Run the application**:
```bash
python app.py
```

4. **Open your browser**:
   - Navigate to `http://localhost:5000`

## Usage

1. **Upload a requirement document** (PDF, DOCX, or TXT)
2. **Wait for AI processing** - Gemini AI analyzes the requirements
3. **Review generated test cases** - View all automatically created test cases
4. **Edit if needed** - Modify any test case details
5. **Export** - Download test cases in various formats

## Project Structure

```
Testcasegenerator AI/
├── app.py                 # Flask backend server
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (API key)
├── database.db           # SQLite database (auto-created)
├── uploads/              # Uploaded documents (auto-created)
├── static/
│   ├── css/
│   │   └── style.css     # Styling
│   └── js/
│       └── app.js        # Frontend logic
└── templates/
    └── index.html        # Main UI
```

## API Endpoints

- `POST /upload` - Upload requirement document
- `GET /test-cases` - Get all test cases
- `PUT /test-cases/<id>` - Update a test case
- `DELETE /test-cases/<id>` - Delete a test case
- `GET /export` - Export test cases to Excel
- `DELETE /test-cases/clear-all` - Delete all test cases

## License

MIT License
