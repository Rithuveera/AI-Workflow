# File-Specific Test Case Display - Fix Summary

## Problem Fixed

**Issue**: When uploading the same file multiple times, test cases were accumulating in the database, causing the count to include both old and new test cases.

**Example of the problem:**
1. Upload `sample_requirements.txt` → Generates 25 test cases
2. Upload `sample_requirements.txt` again → Shows 50 test cases (25 old + 25 new)
3. Upload `sample_requirements.txt` again → Shows 75 test cases (50 old + 25 new)

## Solution Implemented

### ✅ 1. Auto-Delete Previous Test Cases for Same File

When you upload a file, the system now:
1. **Deletes all previous test cases** for that specific filename
2. **Generates new test cases** from the uploaded document
3. **Saves only the new test cases** to the database

**Code Changes (app.py):**
```python
# DELETE PREVIOUS TEST CASES FOR THIS FILE
cursor.execute('DELETE FROM test_cases WHERE requirement_file = ?', (filename,))
deleted_count = cursor.rowcount

if deleted_count > 0:
    print(f"Deleted {deleted_count} previous test cases for file: {filename}")
```

### ✅ 2. File-Specific Display

After uploading a file, the system now:
- **Shows only test cases for that specific file**
- **Displays a notification** indicating which file's test cases are shown
- **Tracks the current filename** in the UI

**Code Changes (app.py):**
```python
return jsonify({
    'message': f'Successfully generated {len(saved_test_cases)} test cases for {filename}',
    'filename': filename,
    'test_cases': saved_test_cases,
    'replaced': deleted_count > 0  # Indicates if previous test cases were replaced
}), 200
```

### ✅ 3. Filename Filtering Support

Added optional filename parameter to the API:
- **`GET /test-cases`** - Returns all test cases
- **`GET /test-cases?filename=sample_requirements.txt`** - Returns test cases for specific file only

**Code Changes (app.py):**
```python
@app.route('/test-cases', methods=['GET'])
def get_test_cases():
    """Get all test cases or filter by filename"""
    filename = request.args.get('filename', None)
    
    if filename:
        cursor.execute('SELECT * FROM test_cases WHERE requirement_file = ? ORDER BY created_at DESC', (filename,))
    else:
        cursor.execute('SELECT * FROM test_cases ORDER BY created_at DESC')
```

### ✅ 4. Enhanced User Notifications

The UI now shows clear messages:
- **First upload**: "Successfully generated 25 test cases for 'sample_requirements.txt'"
- **Re-upload**: "Replaced previous test cases. Generated 30 test cases for 'sample_requirements.txt'"

**Code Changes (app.js):**
```javascript
const message = data.replaced 
    ? `Replaced previous test cases. Generated ${data.test_cases.length} new test cases for "${data.filename}"`
    : `Successfully generated ${data.test_cases.length} test cases for "${data.filename}"`;
showToast(message);
```

## How It Works Now

### Scenario 1: Upload New File
```
1. Upload "login_requirements.pdf"
   → Generates 30 test cases
   → Displays: "Successfully generated 30 test cases for 'login_requirements.pdf'"
   → Shows: 30 test cases (only for login_requirements.pdf)
```

### Scenario 2: Upload Different File
```
1. Upload "payment_requirements.pdf"
   → Generates 25 test cases
   → Displays: "Successfully generated 25 test cases for 'payment_requirements.pdf'"
   → Shows: 25 test cases (only for payment_requirements.pdf)
   
Note: The 30 test cases from login_requirements.pdf are still in the database,
but NOT displayed because we're filtering by filename.
```

### Scenario 3: Re-upload Same File
```
1. Upload "login_requirements.pdf" again
   → Deletes previous 30 test cases for this file
   → Generates 32 new test cases
   → Displays: "Replaced previous test cases. Generated 32 test cases for 'login_requirements.pdf'"
   → Shows: 32 test cases (only the new ones)
```

### Scenario 4: View All Test Cases
```
Currently, the UI shows test cases for the most recently uploaded file.

To view ALL test cases from ALL files:
- Click "Clear All" to reset
- Or manually call: GET /test-cases (without filename parameter)
```

## Benefits

✅ **No Duplicate Accumulation**: Same file can be uploaded multiple times without accumulating test cases

✅ **Clear File Tracking**: You always know which file's test cases you're viewing

✅ **Automatic Cleanup**: Old test cases are automatically removed when re-uploading

✅ **File-Specific View**: Only see test cases relevant to the current file

✅ **Database Efficiency**: No unnecessary duplicate data in the database

## Testing the Fix

### Test 1: Upload Same File Twice
1. Upload `sample_requirements.txt`
2. Note the count (e.g., 28 test cases)
3. Upload `sample_requirements.txt` again
4. **Expected**: Still ~28 test cases (not 56)
5. **Message**: "Replaced previous test cases. Generated 28 test cases for 'sample_requirements.txt'"

### Test 2: Upload Different Files
1. Upload `sample_requirements.txt` → Shows ~28 test cases
2. Upload a different file (e.g., `login.pdf`) → Shows only test cases for login.pdf
3. **Expected**: Count changes to reflect only the new file's test cases

### Test 3: Clear All
1. Upload any file
2. Click "Clear All" button
3. **Expected**: All test cases deleted, count shows 0

## API Endpoints

### Upload File
```
POST /upload
Body: FormData with 'file'
Response: {
    "message": "Successfully generated 25 test cases for sample_requirements.txt",
    "filename": "sample_requirements.txt",
    "test_cases": [...],
    "replaced": true/false
}
```

### Get Test Cases (All)
```
GET /test-cases
Response: [all test cases from all files]
```

### Get Test Cases (Filtered)
```
GET /test-cases?filename=sample_requirements.txt
Response: [test cases only for sample_requirements.txt]
```

## Files Modified

1. **`app.py`**:
   - Added auto-delete logic before inserting new test cases
   - Added filename parameter support to GET /test-cases
   - Enhanced response to include filename and replaced flag

2. **`static/js/app.js`**:
   - Added currentFilename tracking
   - Updated loadTestCases() to support filename filtering
   - Enhanced success messages to show filename and replacement status

## Summary

The fix ensures that:
- ✅ Each file upload shows **only that file's test cases**
- ✅ Re-uploading a file **replaces** old test cases instead of adding to them
- ✅ Users get **clear feedback** about which file they're viewing
- ✅ No more **duplicate accumulation** in the database

Your AI Test Case Generator now handles file uploads correctly! 🎉
