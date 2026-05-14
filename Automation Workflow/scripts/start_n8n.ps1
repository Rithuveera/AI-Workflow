# ========================================
# N8N Configuration for Playwright Tests
# ========================================

# Allow required Node.js modules
$env:NODE_FUNCTION_ALLOW_BUILTIN="child_process,fs,path"
$env:N8N_BLOCK_SVC_JS_IMPORT_BUILTIN="false"
$env:N8N_COMMAND_EXECUTION_ENABLED="true"
$env:N8N_BLOCK_EXECUTIONS_IN_MAIN_PROCESS="false"
$env:N8N_TASK_RUNNERS_ENABLED="false"

# ========================================
# TIMEOUT SETTINGS (IMPORTANT!)
# ========================================
# Set to -1 for unlimited timeout
# This allows long-running Playwright tests to complete
$env:EXECUTIONS_TIMEOUT="-1"
$env:EXECUTIONS_TIMEOUT_MAX="-1"
$env:N8N_EXECUTION_TIMEOUT="-1"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting n8n with unlimited timeout..." -ForegroundColor Cyan
Write-Host "This allows long-running Playwright tests" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

n8n start
