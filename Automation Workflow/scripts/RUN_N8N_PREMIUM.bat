@echo off
TITLE n8n Playwright Automation Hub - STABLE MODE
echo ---------------------------------------------------------
echo   CONFIGURING STABLE RUNNER FOR LONG TESTS...
echo ---------------------------------------------------------

:: 1. ENABLE COMMANDS & MODULES
set N8N_COMMAND_EXECUTION_ENABLED=true
set N8N_NODES_EXECUTE_COMMAND_DISABLED=false
set NODE_FUNCTION_ALLOW_BUILTIN=child_process,fs,path
set N8N_BLOCK_ENV_ACCESS_IN_EXPRESSIONS=false
set N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=false
set N8N_FILESYSTEM_ALLOWED_PATHS=C:\

:: 2. INCREASE THE HEARTBEAT (Fixes the "Unresponsive" crash)
:: This tells n8n to wait up to 5 minutes for the process to report back
set N8N_RUNNERS_HEARTBEAT_INTERVAL=300000

:: 3. FORCE MAIN PROCESS
set N8N_EXECUTION_PROCESS=main
set N8N_TASKS_RUNNER_ENABLED=false
set N8N_BLOCK_EXECUTIONS_IN_MAIN_PROCESS=false

:: 4. PATHS
set PROJECT_ROOT=C:\Users\veeramani\.gemini\antigravity\scratch\Automation Workflow

echo   STARTING N8N...
echo ---------------------------------------------------------
n8n start
pause
