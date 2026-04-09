# Backend Orchestrator System

## Overview

Система оркестрации backend-разработки с multi-model коллаборацией.

## Workflow

```
[Prepare] → [Research] → [Ideation] → [Plan] → [Execute] → [Optimize] → [Review]
```

## Models

- **Codex** — Backend authority (доверенный), логика, алгоритмы
- **Gemini** — Frontend perspective (reference only для backend)
- **Claude (self)** — Оркестрация, планирование, выполнение

## Structure

```
.claude/
├── backend/
│   ├── README.md              # Документация
│   ├── GUIDE.md               # Руководство
│   ├── plans/                 # Сохраненные планы
│   │   └── *.md
│   ├── sessions/              # Сессии Codex
│   │   └── *.json
│   ├── prompts/               # Role prompts
│   │   ├── codex/
│   │   │   ├── analyzer.md
│   │   │   ├── architect.md
│   │   │   └── reviewer.md
│   │   └── gemini/
│   │       └── reference.md
│   └── templates/
│       ├── plan.md
│       └── analysis.md
├── scripts/
│   ├── backend.ps1
│   ├── backend.bat
│   └── backend.sh
└── .ccg/
    └── bin/
        └── codeagent-wrapper    # Codex wrapper (external)
```

## Usage

```bash
backend <описание backend-задачи>
backend "API для управления пользователями"
backend "Оптимизация запросов к БД"
backend "Реализация алгоритма кластеризации"
```

## Phases

### Phase 0: Prepare
- Улучшение промпта через ace-tool MCP (если доступен)

### Phase 1: Research
- Сбор контекста: код, API, модели данных
- Оценка полноты требований (0-10)

### Phase 2: Ideation (Codex-led)
- Технический анализ
- Предложение решений (минимум 2)
- Оценка рисков

### Phase 3: Plan (Codex-led)
- Архитектура
- Структура файлов
- Зависимости

### Phase 4: Execute
- Реализация по плану
- Стандарты проекта
- Обработка ошибок, безопасность

### Phase 5: Optimize (Codex-led)
- Ревью кода
- Производительность
- Безопасность

### Phase 6: Review
- Финальная проверка
- Тесты
- Отчет

## Key Rules

1. Codex backend opinions = trustworthy
2. Gemini backend opinions = reference only
3. External models = zero filesystem write
4. Claude = все файловые операции

---

## Troubleshooting

### "backend command not found"

**Problem:** Running `backend` shows command not found.

**Solution:**
```bash
# Use full path
.claude/scripts/backend.ps1

# Or add to PATH
$env:PATH += ";C:\path\to\.claude\scripts"
```

### "Session not found" Error

**Problem:** Trying to resume a session that doesn't exist.

**Solution:**
```bash
# List available sessions
.claude/scripts/backend.ps1 --sessions

# Then resume with correct ID
.claude/scripts/backend.ps1 --resume <correct-id>
```

### "Permission denied" (Unix/Mac)

**Problem:** Cannot execute the shell script.

**Solution:**
```bash
chmod +x .claude/scripts/backend.sh
```

### Codex Wrapper Not Found

**Problem:** Error about missing `codeagent-wrapper`.

**Solution:**
- Ensure `.ccg/bin/codeagent-wrapper` is installed
- Or install from: https://github.com/xxx/ccg

### Slow Execution

**Problem:** Commands take too long.

**Solution:**
- Check internet connection to model APIs
- Use `--quick` flag for faster execution
- Resume sessions instead of starting new
