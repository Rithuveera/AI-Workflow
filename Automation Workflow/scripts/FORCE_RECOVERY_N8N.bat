@echo off
TITLE N8N RECOVERY SCRIPT
echo ---------------------------------------------------------
echo   STEP 1: KILLING ALL EXISTING N8N PROCESSES...
echo ---------------------------------------------------------
taskkill /F /IM n8n.exe /T 2>nul
taskkill /F /IM node.exe /FI "WINDOWTITLE eq n8n*" /T 2>nul
timeout /t 2 /nobreak >nul

echo ---------------------------------------------------------
echo   STEP 2: ENABLING COMMAND EXECUTION PERMANENTLY...
echo ---------------------------------------------------------
setx N8N_COMMAND_EXECUTION_ENABLED "true"
setx NODE_FUNCTION_ALLOW_BUILTIN "child_process,fs,path"
setx N8N_BLOCK_EXECUTIONS_IN_MAIN_PROCESS "false"
setx N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS "false"
setx N8N_FILESYSTEM_ALLOWED_PATHS "C:\"

echo ---------------------------------------------------------
echo   STEP 3: UPDATING CONFIG FILES...
echo ---------------------------------------------------------
echo { "nodes": { "command": { "executionEnabled": true } } } > "%USERPROFILE%\.n8n\config.json"

echo ---------------------------------------------------------
echo   STEP 4: STARTING N8N WITH DIRECT FLAGS...
echo ---------------------------------------------------------
echo n8n is starting... Please wait for "Editor is now available" message.
echo.
n8n start --command-execution-enabled
pause
