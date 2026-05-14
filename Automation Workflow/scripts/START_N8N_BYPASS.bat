@echo off
:: Kill any existing n8n processes nicely
taskkill /f /im node.exe >nul 2>&1

:: --- SECURITY & PERMISSIONS ---
set N8N_USER_MANAGEMENT_DISABLED=true
set N8N_basic_auth_active=false
set N8N_HOST=localhost
set N8N_PORT=5678
set NODE_FUNCTION_ALLOW_BUILTIN=child_process,fs,path,os

:: --- BYPASSING RESTRICTIONS ---
:: Force Enable Execute Command Node (Critical)
set N8N_NODES_EXECUTE_COMMAND_DISABLED=false
set N8N_COMMAND_EXECUTION_ENABLED=true
set N8N_BLOCK_ENV_ACCESS_IN_EXPRESSIONS=false
set N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=false
set N8N_FILESYSTEM_ALLOWED_PATHS=C:\Users\veeramani\Desktop,C:\Users\veeramani\.n8n-files,C:\

:: --- CRITICAL TIMEOUT SETTINGS ---
:: Set workflow execution timeout to 24 HOURS (86400 seconds) to allow infinite Playwright tests
set N8N_DEFAULT_EXECUTION_TIMEOUT=86400

:: Set Runner heartbeat to prevent "unresponsive" errors (keep alive every 1 hour)
set N8N_RUNNERS_HEARTBEAT_INTERVAL=3600
set N8N_RUNNERS_MAX_HEARTBEAT_TIMEOUT=3600
set N8N_RUNNERS_TASK_TIMEOUT=3600
set N8N_RUNNERS_TASK_REQUEST_TIMEOUT=3600

:: --- FORCE STABLE EXECUTION (FIXES TIMEOUT ERRORS) ---
:: Run workflows in the main process to avoid Task Runner communication issues
set N8N_EXECUTION_PROCESS=main
set N8N_TASKS_RUNNER_ENABLED=false

:: Give n8n more RAM (4GB) to prevent crashes
set NODE_OPTIONS="--max-old-space-size=4096"

echo ===================================================
echo   Starting n8n with EXTENDED TIMEOUTS
echo ===================================================
echo   Timeout Limit: 24 HOURS (Global Default)
echo   Heartbeat:     ACTIVE
echo   Memory:        4GB
echo ===================================================
echo.
echo Please wait for "Editor is now accessible..."
echo.

npx n8n start
