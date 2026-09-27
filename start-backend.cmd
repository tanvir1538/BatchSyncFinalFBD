@echo off
setlocal
cd /d "%~dp0"

powershell.exe -NoProfile -Command "try { $health = Invoke-RestMethod 'http://127.0.0.1:5080/api/health' -TimeoutSec 2; if ($health.success -eq $true -or $health.status -eq 'ok') { exit 0 } } catch {}; exit 1"
if not errorlevel 1 (
  echo BatchSync API is already running at http://127.0.0.1:5080
  exit /b 0
)

for /f "tokens=5" %%I in ('netstat -ano ^| findstr /R /C:":5080 .*LISTENING"') do (
  taskkill /PID %%I /F >nul 2>&1
)

if not exist "backend\node_modules" (
  echo Installing backend dependencies...
  call npm install --prefix "backend"
  if errorlevel 1 exit /b %errorlevel%
)

echo Starting BatchSync Express Backend Server on port 5080...
node "%~dp0backend\src\server.js"
