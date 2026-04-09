#!/bin/bash
# Evolve Command Wrapper for Unix/Linux/Mac
# Usage: evolve [analyze|generate] [--generate]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if pwsh or powershell is available
if command -v pwsh &> /dev/null; then
    POWERSHELL="pwsh"
elif command -v powershell &> /dev/null; then
    POWERSHELL="powershell"
else
    echo "Error: PowerShell not found. Install PowerShell Core."
    exit 1
fi

$POWERSHELL -NoProfile -ExecutionPolicy Bypass -File "$SCRIPT_DIR/evolve.ps1" "$@"
