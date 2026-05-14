# TestFlow User Guide

## Overview
TestFlow is a comprehensive test case management application designed to streamline your testing workflow from requirements to execution and reporting.

## Workflow

### 1. Dashboard
The Dashboard provides an at-a-glance view of your testing progress:
- **Total Requirements**: Number of requirements created
- **Total Test Cases**: Number of test cases defined
- **Executions Run**: Total number of test executions
- **Failed Tests**: Count of failed test cases
- **Recent Activity**: Latest test executions with their status

### 2. Requirements Management

**Creating a Requirement:**
1. Navigate to the **Requirements** page
2. Click **"New Requirement"** button
3. Fill in:
   - **Title**: Brief name for the requirement (e.g., "User Login")
   - **Description**: Detailed description of what needs to be implemented
4. Click **"Save Requirement"**

**Viewing Requirements:**
- All requirements are displayed in a table with ID, Title, Description, and Creation Date
- Each requirement gets a unique ID for tracking

### 3. Test Cases

**Creating a Test Case:**
1. Navigate to the **Test Cases** page
2. Click **"New Test Case"** button
3. Fill in:
   - **Requirement**: Select the requirement this test case validates
   - **Title**: Name of the test case (e.g., "Verify valid login")
   - **Steps**: Detailed steps to execute the test
   - **Expected Result**: What should happen when the test passes
4. Click **"Save Test Case"**

**Best Practices:**
- Link each test case to a requirement for traceability
- Write clear, step-by-step instructions
- Define specific expected results

### 4. Test Execution

**Executing Tests:**
1. Navigate to the **Execution** page
2. Review the test case details (Steps and Expected Result)
3. Execute the test manually
4. Click the appropriate status button:
   - ✅ **Pass** (Green): Test passed successfully
   - ❌ **Fail** (Red): Test failed
   - ⚠️ **Blocked** (Orange): Test is blocked by external factors
   - ⊖ **NA** (Gray): Test is not applicable

**Status Meanings:**
- **Passed**: Test executed successfully, actual result matches expected
- **Failed**: Test did not produce the expected result
- **Blocked**: Cannot execute due to dependencies or environment issues
- **NA**: Test is not applicable in current context

### 5. Reports

The Reports page provides visual analytics:

**Execution Summary:**
- Progress bars showing distribution of test statuses
- Percentage breakdown of Passed, Failed, Blocked, NA, and Pending tests

**Overall Health:**
- Donut chart visualization of test distribution
- Pass Rate percentage displayed in the center
- Color-coded segments for quick status identification

**Interpreting Results:**
- **Green (Passed)**: Tests working as expected
- **Red (Failed)**: Issues that need attention
- **Orange (Blocked)**: Dependencies to resolve
- **Gray (NA)**: Tests skipped or not applicable
- **Transparent (Pending)**: Tests not yet executed

## Data Persistence

All data is automatically saved to your browser's localStorage:
- Requirements persist across sessions
- Test cases are retained
- Execution history is maintained
- No server required - works completely offline

## Tips for Success

1. **Start with Requirements**: Always define requirements before creating test cases
2. **Be Specific**: Write detailed steps and expected results
3. **Regular Execution**: Execute tests frequently to track progress
4. **Review Reports**: Use the Reports page to identify problem areas
5. **Track History**: The Dashboard shows recent activity for quick reference

## Keyboard Shortcuts

- Navigate between pages using the sidebar
- Use Tab to move between form fields
- Press Enter to submit forms
- Press Escape to cancel form entry (close the form)

## Troubleshooting

**Data not saving?**
- Ensure browser localStorage is enabled
- Check browser privacy settings
- Try a different browser if issues persist

**Application not loading?**
- Verify the dev server is running (`npm run dev`)
- Check console for errors (F12 in most browsers)
- Clear browser cache and reload

## Future Enhancements

Potential features for future versions:
- Export reports to PDF
- Import/Export test cases
- Test case versioning
- Attachment support
- Team collaboration features
- Integration with CI/CD pipelines

---

**Need Help?** Check the README.md for technical setup instructions.
