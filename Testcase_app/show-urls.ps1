# TestFlow - Show Access URLs
# Run this script to see the current access URLs for your application

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   TestFlow - Access URLs" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get current IP address using ipconfig
$ipconfig = ipconfig | Select-String "IPv4"
$ipAddress = "Not detected"

if ($ipconfig) {
    # Get the first non-loopback IPv4 address
    foreach ($line in $ipconfig) {
        $ip = ($line -split ':')[1].Trim()
        if ($ip -notlike "127.*" -and $ip -notlike "169.254.*") {
            $ipAddress = $ip
            break
        }
    }
}

$currentDate = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
Write-Host "Date: $currentDate" -ForegroundColor Yellow
Write-Host ""

Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host "  ON YOUR COMPUTER (Always the same):" -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host "  Frontend:  http://localhost:5173" -ForegroundColor Cyan
Write-Host "  Backend:   http://localhost:3001" -ForegroundColor Cyan

Write-Host ""
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host "  FROM OTHER COMPUTERS (Changes daily):" -ForegroundColor Magenta
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host "  Current IP: $ipAddress" -ForegroundColor Yellow
Write-Host "  Frontend:   http://${ipAddress}:5173" -ForegroundColor Cyan
Write-Host "  Backend:    http://${ipAddress}:3001" -ForegroundColor Cyan

Write-Host ""
Write-Host "========================================" -ForegroundColor Gray
Write-Host "  SHARE THIS URL WITH YOUR TEAM:" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Gray
Write-Host ""
Write-Host "  http://${ipAddress}:5173" -ForegroundColor Green -BackgroundColor DarkGreen
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Tip: Run this script daily to get updated URLs!" -ForegroundColor Yellow
Write-Host ""
