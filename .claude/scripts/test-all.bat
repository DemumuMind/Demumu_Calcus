@echo off
:: Integration Test Suite for OpenCode Command Systems
:: Runs all tests and outputs results

echo.
echo ═══════════════════════════════════════════════════════
echo  OpenCode Command System Integration Tests
echo ═══════════════════════════════════════════════════════
echo.

:: Check if PowerShell is available
powershell -Command "Get-Host" >nul 2>&1
if errorlevel 1 (
    echo ERROR: PowerShell is required but not available.
    exit /b 1
)

:: Run the PowerShell test suite
powershell -ExecutionPolicy Bypass -File "%~dp0test-all.ps1" %*

:: Exit with the same code
exit /b %ERRORLEVEL%
