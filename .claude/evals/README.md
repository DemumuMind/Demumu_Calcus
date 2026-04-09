# Eval Command System

## Overview
Система управления разработкой на основе оценок (eval-driven development).

## Структура
```
.claude/
├── evals/
│   ├── feature-name.md      # Определение оценок
│   ├── feature-name.log     # Логи проверок
│   └── _registry.md         # Реестр всех оценок
```

## Использование

### 1. Создание оценки
```
/eval define <название-функции>
```

### 2. Проверка оценок
```
/eval check <название-функции>
```

### 3. Отчет
```
/eval report <название-функции>
```

### 4. Список всех оценок
```
/eval list
```

### 5. Очистка логов
```
/eval clean
```

## Метрики

- **pass@1**: Успех с первой попытки
- **pass@3**: Успех с 3 попыток (для сложных задач)
- **pass^3**: 100% прохождение (для регрессии)

## Статусы

- **NOT STARTED** — не начато
- **IN PROGRESS** — в работе
- **READY** — готово к отправке
- **BLOCKED** — заблокировано

---

## Troubleshooting

### "eval.ps1 cannot be loaded"

**Problem:** PowerShell execution policy prevents running scripts.

**Solution:**
```powershell
# Run with bypass (one time)
powershell -ExecutionPolicy Bypass -File .claude/scripts/eval.ps1

# Or set policy for current user
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Report Not Generated

**Problem:** `eval report` command runs but no HTML file appears.

**Solution:**
- Check `.claude/evals/reports/` directory exists
- Check PowerShell has write permissions
- Check disk space

### Metrics Not Updating

**Problem:** Eval runs but metrics don't change.

**Solution:**
- Check that `.log` files are being created
- Verify test cases are properly defined
- Check `eval check` shows current status

### "Permission denied" (Unix/Mac)

**Problem:** Cannot run eval.sh.

**Solution:**
```bash
chmod +x .claude/scripts/eval.sh
```

---

## See Also

- [QUICKSTART.md](QUICKSTART.md) — Quick start guide
- [GUIDE.md](GUIDE.md) — Detailed workflow guide