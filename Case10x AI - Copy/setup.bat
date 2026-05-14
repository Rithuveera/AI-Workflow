@echo off
echo ========================================
echo AI Test Case Generator - Setup Script
echo ========================================
echo.

REM Check if .env file exists
if exist .env (
    echo [OK] .env file already exists
) else (
    echo [SETUP] Creating .env file...
    echo GEMINI_API_KEY=your_gemini_api_key_here > .env
    echo [DONE] .env file created
    echo.
    echo IMPORTANT: Please edit the .env file and add your Gemini API key
    echo Get your API key from: https://makersuite.google.com/app/apikey
    echo.
)

REM Create uploads directory
if not exist uploads mkdir uploads
echo [OK] Uploads directory ready

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Edit .env file and add your Gemini API key
echo 2. Run: python app.py
echo 3. Open: http://localhost:5000
echo.
pause
