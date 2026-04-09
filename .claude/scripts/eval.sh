#!/bin/bash
# Eval Command Wrapper for Unix/Linux/Mac
# Usage: eval [define|check|report|list|clean] [feature-name]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EVAL_DIR="$SCRIPT_DIR/../evals"

show_help() {
    cat << 'EOF'

Eval Command System
===================

Использование:
  eval define <название-функции>   - Создать новую оценку
  eval check  <название-функции>   - Проверить оценку
  eval report <название-функции>   - Сгенерировать отчет
  eval list                         - Список всех оценок
  eval clean                        - Очистить старые логи

Примеры:
  eval define feature-auth
  eval check feature-auth
  eval report feature-auth

EOF
}

# Check if pwsh or powershell is available
if command -v pwsh &> /dev/null; then
    POWERSHELL="pwsh"
elif command -v powershell &> /dev/null; then
    POWERSHELL="powershell"
else
    echo "Error: PowerShell не найден. Установите PowerShell Core."
    exit 1
fi

if [ $# -eq 0 ]; then
    show_help
    exit 0
fi

$POWERSHELL -NoProfile -ExecutionPolicy Bypass -File "$SCRIPT_DIR/eval.ps1" -Command "$@"
