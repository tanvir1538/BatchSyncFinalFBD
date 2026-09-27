@echo off
setlocal

echo Stopping BatchSync services...
for %%P in (5080 5173) do (
  for /f "tokens=5" %%I in ('netstat -ano ^| findstr /R /C:":%%P .*LISTENING"') do (
    echo Terminating process %%I listening on port %%P...
    taskkill /PID %%I /F >nul 2>&1
  )
)

echo.
echo BatchSync backend (port 5080) and frontend (port 5173) have been stopped.
