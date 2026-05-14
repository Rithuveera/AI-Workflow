# ============================================
# Open Documentation Files in Microsoft Word
# PowerShell Script
# ============================================

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Fit2Fit Gym - Documentation Viewer" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Define documentation files
$docs = @{
    "1" = @{ Name = "Technology Stack"; File = "TECHNOLOGY-STACK.md" }
    "2" = @{ Name = "API Documentation"; File = "API-DOCUMENTATION.md" }
    "3" = @{ Name = "Architecture"; File = "ARCHITECTURE.md" }
    "4" = @{ Name = "Database Schema"; File = "DATABASE-SCHEMA.md" }
    "5" = @{ Name = "Features"; File = "FEATURES.md" }
    "6" = @{ Name = "Integrations"; File = "INTEGRATIONS.md" }
    "7" = @{ Name = "Development Setup"; File = "DEVELOPMENT-SETUP.md" }
    "8" = @{ Name = "Documentation Index"; File = "DOCUMENTATION-INDEX.md" }
    "9" = @{ Name = "Documentation Summary"; File = "DOCUMENTATION-SUMMARY.md" }
}

# Display menu
Write-Host "Select which documentation to open:" -ForegroundColor Yellow
Write-Host ""
foreach ($key in $docs.Keys | Sort-Object) {
    Write-Host "$key. $($docs[$key].Name)" -ForegroundColor White
}
Write-Host "10. Open ALL documentation files" -ForegroundColor Green
Write-Host "0. Exit" -ForegroundColor Red
Write-Host ""

# Get user choice
$choice = Read-Host "Enter your choice (0-10)"

# Process choice
if ($choice -eq "0") {
    Write-Host "Exiting..." -ForegroundColor Yellow
    exit
}
elseif ($choice -eq "10") {
    Write-Host ""
    Write-Host "Opening all documentation files in Word..." -ForegroundColor Green
    foreach ($key in $docs.Keys | Sort-Object) {
        $file = $docs[$key].File
        if (Test-Path $file) {
            Write-Host "Opening: $($docs[$key].Name)..." -ForegroundColor Cyan
            Start-Process "winword.exe" -ArgumentList "`"$file`""
            Start-Sleep -Seconds 2
        }
        else {
            Write-Host "File not found: $file" -ForegroundColor Red
        }
    }
}
elseif ($docs.ContainsKey($choice)) {
    $file = $docs[$choice].File
    if (Test-Path $file) {
        Write-Host ""
        Write-Host "Opening: $($docs[$choice].Name)..." -ForegroundColor Green
        Start-Process "winword.exe" -ArgumentList "`"$file`""
    }
    else {
        Write-Host "File not found: $file" -ForegroundColor Red
    }
}
else {
    Write-Host "Invalid choice!" -ForegroundColor Red
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to exit"
