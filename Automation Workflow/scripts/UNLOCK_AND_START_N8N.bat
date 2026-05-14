@echo off
TITLE n8n Full Unlocker
echo =========================================================
echo   N8N COMMAND UNLOCKER & STARTER
echo =========================================================
echo.

:: 1. Force kill existing n8n to ensure a clean start
echo [1/3] Closing existing n8n instances...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq n8n*" /T 2>nul
taskkill /F /IM n8n.exe /T 2>nul
timeout /t 2 /nobreak >nul

:: 2. Set the EXACT environment variables n8n needs to show the Execute Command node
echo [2/3] Injecting security bypass variables...
set N8N_COMMAND_EXECUTION_ENABLED=true
set N8N_NODES_EXECUTE_COMMAND_DISABLED=false
set N8N_BLOCK_ENV_ACCESS_IN_EXPRESSIONS=false
set NODE_FUNCTION_ALLOW_BUILTIN=child_process,fs,path
set N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=false
set N8N_FILESYSTEM_ALLOWED_PATHS=C:\

:: 2.5 FIX TIMEOUT & RUNNER ERRORS
:: Force n8n to run everything in the main process (avoids Task Runner timeouts)
set N8N_EXECUTION_PROCESS=main
set N8N_TASKS_RUNNER_ENABLED=false
:: Increase global task timeout to 1 hour
set N8N_RUNNERS_TASK_TIMEOUT=3600
set N8N_RUNNERS_TASK_REQUEST_TIMEOUT=3600
set N8N_DEFAULT_EXECUTION_TIMEOUT=3600

:: 3. Start n8n
echo [3/3] Starting n8n... 
echo.
echo =========================================================
echo   SUCCESS: Once the "Editor is now available" message 
echo   appears below, refresh your browser.
echo =========================================================
echo.
n8n start
pause
