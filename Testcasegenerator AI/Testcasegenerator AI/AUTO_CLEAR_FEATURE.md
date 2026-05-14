# Feature Update: Auto-Clear Test Cases

## ✅ Feature Implemented

The application now automatically clears all previous test cases whenever you open or refresh the page. This ensures a fresh start every time.

### 🛠️ Changes Made

#### 1. Frontend (`static/js/app.js`)
- **Updated Page Load Logic**: 
  - Replaced `loadTestCases()` with a call to clear test cases.
  - Added `fetch('/test-cases/clear-all', { method: 'DELETE' })` to the `DOMContentLoaded` event.
  - Initializes the UI with an empty state.

#### 2. Backend (`app.py`)
- **Added New Endpoint**: `/test-cases/clear-all`
- **Method**: `DELETE`
- **Action**: Deletes all records from the `test_cases` table in the database.

### 🚀 How to Test

1. **Generate Test Cases**: Upload a file and generate test cases.
2. **Verify Display**: See the test cases on the screen.
3. **Refresh Page**: Reload the browser page (F5 or Ctrl+R).
4. **Verify Clear**: The test cases should disappear, and the list should be empty.

### 📦 Push to GitHub

To save these changes to your GitHub repository, run:

```bash
git add .
git commit -m "Add feature: Auto-clear test cases on page load"
git push
```
