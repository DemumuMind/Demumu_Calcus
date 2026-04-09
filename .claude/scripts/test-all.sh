#!/bin/bash
#
# Integration Test Suite for OpenCode Command Systems
# Runs all tests and outputs results
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════${NC}"
echo -e "${CYAN} OpenCode Command System Integration Tests${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════${NC}"
echo ""

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if pwsh is available
if command -v pwsh &> /dev/null; then
    POWERSHELL="pwsh"
elif command -v powershell &> /dev/null; then
    POWERSHELL="powershell"
else
    echo -e "${RED}ERROR: PowerShell is required but not available.${NC}"
    echo "Please install PowerShell: https://github.com/PowerShell/Powershell"
    exit 1
fi

# Run the PowerShell test suite
echo "Running tests with $POWERSHELL..."
echo ""

$POWERSHELL -ExecutionPolicy Bypass -File "$SCRIPT_DIR/test-all.ps1" "$@"

# Exit with the same code
exit $?
