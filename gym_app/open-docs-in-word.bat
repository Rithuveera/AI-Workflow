@echo off
REM ============================================
REM Open Documentation Files in Microsoft Word
REM ============================================

echo.
echo ============================================
echo Fit2Fit Gym - Documentation Viewer
echo ============================================
echo.
echo Select which documentation to open in Word:
echo.
echo 1. Technology Stack
echo 2. API Documentation
echo 3. Architecture
echo 4. Database Schema
echo 5. Features
echo 6. Integrations
echo 7. Development Setup
echo 8. Documentation Index
echo 9. Documentation Summary
echo 10. Open ALL documentation files
echo 0. Exit
echo.

set /p choice="Enter your choice (0-10): "

if "%choice%"=="1" start winword "TECHNOLOGY-STACK.md"
if "%choice%"=="2" start winword "API-DOCUMENTATION.md"
if "%choice%"=="3" start winword "ARCHITECTURE.md"
if "%choice%"=="4" start winword "DATABASE-SCHEMA.md"
if "%choice%"=="5" start winword "FEATURES.md"
if "%choice%"=="6" start winword "INTEGRATIONS.md"
if "%choice%"=="7" start winword "DEVELOPMENT-SETUP.md"
if "%choice%"=="8" start winword "DOCUMENTATION-INDEX.md"
if "%choice%"=="9" start winword "DOCUMENTATION-SUMMARY.md"

if "%choice%"=="10" (
    echo.
    echo Opening all documentation files...
    start winword "TECHNOLOGY-STACK.md"
    timeout /t 2 /nobreak >nul
    start winword "API-DOCUMENTATION.md"
    timeout /t 2 /nobreak >nul
    start winword "ARCHITECTURE.md"
    timeout /t 2 /nobreak >nul
    start winword "DATABASE-SCHEMA.md"
    timeout /t 2 /nobreak >nul
    start winword "FEATURES.md"
    timeout /t 2 /nobreak >nul
    start winword "INTEGRATIONS.md"
    timeout /t 2 /nobreak >nul
    start winword "DEVELOPMENT-SETUP.md"
    timeout /t 2 /nobreak >nul
    start winword "DOCUMENTATION-INDEX.md"
    timeout /t 2 /nobreak >nul
    start winword "DOCUMENTATION-SUMMARY.md"
)

if "%choice%"=="0" exit

echo.
echo Done! Word should now be opening your selected file(s).
echo.
pause
