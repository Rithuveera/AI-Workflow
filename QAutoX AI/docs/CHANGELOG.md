# Changelog

## 2025-12-03 - Bug Fixes and Excel Export

### Fixed Issues

#### 1. File Selection Bug
**Problem**: File selection dialog required double-click on first attempt.

**Solution**: Added `e.stopPropagation()` to the upload area click handler to prevent event bubbling that was causing the file input to be triggered twice.

**Files Modified**:
- `static/js/app.js` - Line 37-40

#### 2. Gemini API Model Error
**Problem**: Application was using deprecated `gemini-pro` model which returned 404 error.

**Solution**: 
- Updated to `gemini-2.0-flash` model
- Upgraded `google-generativeai` library to version >=0.8.0
- Added JSON mode configuration for reliable response format

**Files Modified**:
- `requirements.txt` - Updated google-generativeai version
- `app.py` - Updated model name and added generation_config

#### 3. SQLite List Type Error
**Problem**: Error "type 'list' is not supported" when Gemini returned test_steps or preconditions as arrays.

**Solution**: Added type checking and conversion to join list items into newline-separated strings before database insertion.

**Files Modified**:
- `app.py` - Lines 204-211

### New Features

#### Excel Export
**Feature**: Export test cases to formatted Excel (.xlsx) files instead of JSON.

**Implementation**:
- Added `openpyxl` library for Excel file generation
- Created formatted spreadsheet with:
  - Professional header styling (blue background, white text)
  - Proper column widths for readability
  - Text wrapping for long content
  - Frozen header row
  - All test case fields included

**Files Modified**:
- `requirements.txt` - Added openpyxl==3.1.2
- `app.py` - Replaced export_test_cases() function
- `templates/index.html` - Updated button text to "Export to Excel"
- `static/js/app.js` - Updated export message

#### Clear All Test Cases
**Feature**: Added "Clear All" button to delete all test cases at once.

**Implementation**:
- Replaced "Refresh" button with "Clear All" functionality
- Added confirmation dialog to prevent accidental deletion
- New backend endpoint `/test-cases/clear-all` (DELETE)
- Clears display and resets statistics after deletion
- Hides test cases section when empty

**Files Modified**:
- `app.py` - Added clear_all_test_cases() endpoint
- `templates/index.html` - Changed button from "Refresh" to "Clear All"
- `static/js/app.js` - Updated button handler with confirmation
- `README.md` - Added new API endpoint documentation

### Technical Details

**Excel Export Format**:
- Columns: ID, Test Case Name, Description, Preconditions, Test Steps, Expected Result, Priority, Test Type, Requirement File, Created At
- Header: Blue background (#4472C4), white bold text
- Column widths optimized for content
- Text wrapping enabled for long fields
- File naming: `test_cases_export_YYYYMMDD_HHMMSS.xlsx`

**API Key Configuration**:
- Successfully configured Gemini API key: `AIzaSyBVgZgnkMo05mVanZEoG7XyNQ3hH0WVtXI`
- Stored in `.env` file for security

### Installation

To apply these changes, run:
```bash
pip install -r requirements.txt
python app.py
```

### Testing Performed
- ✅ File selection works on first click
- ✅ Test case generation with Gemini 2.0 Flash
- ✅ Handling of list-type responses from AI
- ✅ Excel export with proper formatting
- ✅ Application starts without errors
