# System Architecture

```mermaid
graph TD
    User[User] -->|Uploads Document| Frontend[Frontend UI]
    Frontend -->|POST /upload| Backend[Flask Backend]
    
    subgraph "Backend Processing"
        Backend -->|Extract Text| Parser[Document Parser]
        Parser -->|PDF/DOCX/TXT| Text[Raw Text]
        Text -->|Prompt Engineering| AI_Agent[AI Agent]
        AI_Agent -->|API Call| Gemini[Google Gemini API]
        Gemini -->|JSON Response| AI_Agent
        AI_Agent -->|Store| DB[(SQLite Database)]
    end
    
    Backend -->|Return JSON| Frontend
    Frontend -->|Display| Grid[Test Case Grid]
    
    subgraph "Data Flow"
        DB <-->|CRUD Operations| Backend
        Backend <-->|Export| File[JSON File]
    end
```

## Component Breakdown

### 1. Frontend (Client-Side)
- **HTML5/CSS3**: Modern, responsive interface with dark mode.
- **JavaScript (Vanilla)**: Handles file uploads, API communication, and dynamic DOM updates.
- **Features**: Drag-and-drop upload, real-time status updates, modal editing.

### 2. Backend (Server-Side)
- **Flask**: Lightweight Python web framework.
- **Document Parsers**:
  - `PyPDF2`: Extracts text from PDF files.
  - `python-docx`: Extracts text from Word documents.
- **Database**: SQLite for local storage of generated test cases.

### 3. AI Integration
- **Google Gemini Pro**: The core intelligence engine.
- **Prompt Engineering**: Custom system prompts to ensure structured JSON output.
- **Context Window**: Handles large requirement documents.

### 4. Data Structure
Each test case contains:
- `id`: Unique identifier
- `test_case_name`: Summary of the test
- `description`: Detailed explanation
- `preconditions`: Setup requirements
- `test_steps`: Step-by-step execution guide
- `expected_result`: Validation criteria
- `priority`: High/Medium/Low
- `test_type`: Functional/Integration/etc.
