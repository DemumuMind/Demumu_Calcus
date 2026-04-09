# CCG Execute System Quick Start

Execute tasks with multi-model collaboration in 5 minutes.

---

## Installation

Already included in OpenCode. Just use the scripts directly.

---

## First Execution

### 1. Start Execution

```bash
# PowerShell
.claude/scripts/ccg-execute.ps1

# Or shorthand  
ccg:execute
```

### 2. Select Task Type

Choose from:
- **frontend** — UI, components, styling (Gemini authority)
- **backend** — API, logic, algorithms (Codex authority)
- **fullstack** — Both frontend and backend (parallel)

### 3. Provide Task Description

Enter what you want to build:
```
Create a user authentication form with email validation
```

### 4. Review Prototype

System will:
- Generate prototype with appropriate models
- Show you the draft
- Ask for approval to refactor

### 5. Deliver

Final code is refactored and delivered to your workspace.

---

## Common Commands

### Execute with Type
```bash
.ccg:execute --type frontend
.ccg:execute --type backend
.ccg:execute --type fullstack
```

### Resume Session
```bash
.ccg:execute --resume <session-id>
```

Continue interrupted work.

### Show Sessions
```bash
.ccg:execute --sessions
```

List active and recent sessions.

### Audit Mode
```bash
.ccg:execute --audit
```

Run multi-model audit on existing code.

---

## Core Principles

### 1. Code Sovereignty
**External models have zero filesystem write access.**

Only Claude (you) can write files. Models generate patches that you review and apply.

### 2. Dirty Prototype Refactoring
**Models create drafts → Claude refactors to production.**

Don't expect perfect code from models. Expect good structure that gets polished.

### 3. Trust Rules
| Domain | Authority |
|--------|-----------|
| Frontend/UI | Gemini |
| Backend/Logic | Codex |
| Integration | Claude (you) |

### 4. Stop-Loss
**Validate each phase before proceeding.**

If a prototype is off-track, stop and redirect. Don't let errors cascade.

---

## Workflow

```
[Prepare] → [Retrieval] → [Prototype] → [Implement] → [Audit] → [Deliver]
    ↓           ↓            ↓            ↓           ↓          ↓
 Read Plan  Gather      Codex/Gemini   Claude     Multi-model   Final
            Context     Prototype     refactors    Audit       Report
```

---

## Example Session

```bash
# Start fullstack task
.ccg:execute --type fullstack

# Describe task
> Create a todo list app with React frontend and Node.js backend

# Review prototype plan
# [Shows task breakdown: Frontend (Gemini) + Backend (Codex)]

# Approve prototype
# [Gemini creates React components]
# [Codex creates API endpoints]

# Review refactored code
# [Claude integrates and polishes]

# Deliver
# Files written to workspace
```

---

## Session Management

### Active Sessions
Sessions are saved in `.claude/ccg/sessions/`:
```
<timestamp>--<type>--<slug>.json
```

### Resume Anytime
```bash
.ccg:execute --resume
# Shows list of resumable sessions
```

### Clean Old Sessions
```bash
.ccg:execute --cleanup
# Removes completed sessions
```

---

## Model Prompts

Prompts used for each model are in `.claude/ccg/execute/prompts/`:
- `codex/architect.md` — Backend design
- `codex/reviewer.md` — Code review
- `gemini/frontend.md` — Frontend implementation
- `gemini/reviewer.md` — UI review

---

## File Structure

```
.claude/ccg/
├── execute/
│   ├── README.md
│   ├── QUICKSTART.md
│   ├── prompts/
│   │   ├── codex/
│   │   │   ├── architect.md
│   │   │   └── reviewer.md
│   │   └── gemini/
│   │       ├── frontend.md
│   │       └── reviewer.md
│   └── templates/
│       ├── prototype.md
│       ├── audit.md
│       └── delivery.md
└── sessions/
    └── *.json
```

---

## Best Practices

1. **Be specific** — "Create login form" vs "Create a login form with email validation and error messages"

2. **Start simple** — First task should be achievable in 30 minutes

3. **Review prototypes** — Don't auto-approve; check direction is correct

4. **Use sessions** — Long tasks? Resume later instead of starting over

5. **Audit before delivery** — Catch issues before they reach your codebase

---

## Next Steps

- Read full [README.md](README.md) for detailed documentation
- Check example prompts in `prompts/` directory
- Review templates in `templates/` directory

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Session not found" | Use `.ccg:execute --sessions` to list |
| "Model unavailable" | Check internet connection |
| "Permission denied" | Run `chmod +x .claude/scripts/ccg-execute.sh` (Unix) |
| "Task too large" | Break into smaller subtasks |

---

**That's it!** You're ready for multi-model collaborative execution.
