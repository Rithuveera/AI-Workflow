# Quick Start Guide - AI Test Case Generator

## Step 1: Get Your Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

## Step 2: Configure Environment

1. Create a `.env` file in the project root
2. Add your API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

## Step 3: Install Dependencies

Run the following command:
```bash
pip install -r requirements.txt
```

## Step 4: Run the Application

```bash
python app.py
```

## Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:5000
```

## Testing the Application

1. Use the provided `sample_requirements.txt` file to test
2. Upload it through the web interface
3. Wait for AI to generate test cases (10-30 seconds)
4. Review, edit, and export the generated test cases

## Features

✅ Upload PDF, DOCX, or TXT requirement documents
✅ AI-powered test case generation using Gemini
✅ Automatic generation of:
   - Test case names
   - Descriptions
   - Preconditions
   - Test steps
   - Expected results
   - Priority levels
   - Test types
✅ Edit and delete test cases
✅ Export test cases as JSON
✅ Beautiful, modern UI with dark theme

## Troubleshooting

**Issue: "GEMINI_API_KEY not found"**
- Make sure you created a `.env` file (not `.env.example`)
- Ensure the API key is correctly set in the `.env` file

**Issue: "Failed to generate test cases"**
- Check your internet connection
- Verify your API key is valid
- Check if you've exceeded API quota

**Issue: "Module not found"**
- Run `pip install -r requirements.txt` again
- Make sure you're using Python 3.8 or higher

## API Quota

- Gemini API has a free tier with generous limits
- For production use, consider upgrading to a paid plan
- Monitor your usage at: https://makersuite.google.com/

## Next Steps

- Integrate with your existing test management tools
- Add more document format support
- Implement test case execution tracking
- Add team collaboration features
