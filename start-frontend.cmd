@echo off
setlocal
cd /d "%~dp0"

powershell.exe -NoProfile -Command "try { $response = Invoke-WebRequest 'http://127.0.0.1:5173' -UseBasicParsing -TimeoutSec 2; if ($response.StatusCode -eq 200) { exit 0 } } catch {}; exit 1"
if not errorlevel 1 (
  echo BatchSync frontend is already running at http://127.0.0.1:5173
  exit /b 0
)

for /f "tokens=5" %%I in ('netstat -ano ^| findstr /R /C:":5173 .*LISTENING"') do (
  taskkill /PID %%I /F >nul 2>&1
)

if not exist "frontend\node_modules" (
  echo Installing frontend dependencies...
  call npm install --prefix "frontend"
  if errorlevel 1 exit /b %errorlevel%
)

echo Starting BatchSync Frontend on port 5173...
cd /d "%~dp0frontend"
call npx vite --host 0.0.0.0 --port 5173
