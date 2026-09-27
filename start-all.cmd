@echo off
setlocal
cd /d "%~dp0"

echo ====================================================================
echo            BatchSync - Academic Operating System Startup
echo ====================================================================
echo.

:: 1. Clean existing processes on port 5080 and 5173
for %%P in (5080 5173) do (
  for /f "tokens=5" %%I in ('netstat -ano ^| findstr /R /C:":%%P .*LISTENING"') do (
    taskkill /PID %%I /F >nul 2>&1
  )
)

:: 2. Start Backend Server
echo [1/3] Launching Express Backend Server (Port 5080)...
start "BatchSync Backend (Port 5080)" "%~dp0start-backend.cmd"

:: 3. Start Frontend Server
echo [2/3] Launching Vite React Frontend (Port 5173)...
start "BatchSync Frontend (Port 5173)" "%~dp0start-frontend.cmd"

:: 4. Wait until Frontend is completely ready before opening browser
echo [3/3] Waiting for servers to initialize...
powershell.exe -NoProfile -Command "for ($i=0; $i -lt 30; $i++) { try { $res = Invoke-WebRequest 'http://127.0.0.1:5173' -UseBasicParsing -TimeoutSec 1; if ($res.StatusCode -eq 200) { exit 0 } } catch {}; Start-Sleep -Milliseconds 500 }; exit 0"

start "" "http://localhost:5173"

echo.
echo ====================================================================
echo   BatchSync is successfully running!
echo.
echo   - Frontend UI:  http://localhost:5173  (Opened in browser)
echo   - Backend API:  http://127.0.0.1:5080
echo.
echo   To STOP all services, run: stop-all.cmd
echo ====================================================================
