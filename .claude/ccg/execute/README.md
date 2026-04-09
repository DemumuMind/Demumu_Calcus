# CCG Execute System

## Overview

Multi-model collaborative execution system.

**Flow**: Plan → Prototype → Implement → Audit → Deliver

## Workflow

```
[Prepare] → [Retrieval] → [Prototype] → [Implement] → [Audit] → [Deliver]
   ↓           ↓            ↓            ↓           ↓          ↓
Read Plan  Gather    Codex/Gemini   Claude    Multi-model   Final
           Context   Prototype     refactors    Audit      Report
```

## Core Principles

1. **Code Sovereignty** — External models have **zero filesystem write access**
2. **Dirty Prototype Refactoring** — Codex/Gemini output = draft, Claude refactors to production
3. **Trust Rules**:
   - Backend logic → **Codex** (authority)
   - Frontend/UI → **Gemini** (authority)
4. **Stop-Loss** — Validate each phase before proceeding
5. **Minimal Changes** — Only modify what's necessary

## Task Routing

| Task Type | Route | Authority |
|-----------|-------|-----------|
| Frontend (UI, components, styles) | Gemini | Gemini |
| Backend (API, logic, algorithms) | Codex | Codex |
| Fullstack | Codex ∥ Gemini (parallel) | Split by domain |

## Multi-Model Calls

### Prototype Call
```bash
~/.claude/bin/codeagent-wrapper --backend <codex|gemini> resume <SESSION> - "$PWD" <<'EOF'
ROLE_FILE: ~/.claude/.ccg/prompts/<model>/<role>.md
<TASK>
Requirement: <task>
Context: <plan + files>
</TASK>
OUTPUT: Unified Diff Patch ONLY
EOF
```

### Audit Call
```bash
~/.claude/bin/codeagent-wrapper --backend <codex|gemini> resume <SESSION> - "$PWD" <<'EOF'
ROLE_FILE: ~/.claude/.ccg/prompts/<model>/reviewer.md
<TASK>
Scope: Audit the final code changes.
Inputs: Applied patch, touched files
Constraints: Do NOT modify files. Do NOT output tool commands.
</TASK>
OUTPUT: 1) Prioritized issues list, 2) Concrete fixes as Unified Diff
EOF
```

## Phase Details

### Phase 0: Prepare
- Read plan file
- Extract SESSION_ID, task type, key files
- Confirm with user if needed

### Phase 1: Retrieval
- Gather context from key files
- Use ace-tool MCP or built-in tools (Glob, Grep, Read)

### Phase 2: Prototype (Parallel if Fullstack)
- **Frontend** → Gemini (frontend.md)
- **Backend** → Codex (architect.md)
- **Output**: Unified Diff only
- **Background**: `run_in_background: true`
- **Wait**: `TaskOutput` with 10min timeout

### Phase 3: Implement (Claude)
1. Read Diff
2. Mental sandbox (check consistency)
3. Refactor dirty prototype → production code
4. Apply minimal changes (Edit/Write)
5. Self-verify (lint, typecheck, tests)

### Phase 4: Audit (Parallel)
- **Codex** → Security, performance, logic
- **Gemini** → Accessibility, design, UX
- **Output**: Issues list + fix diffs
- **Wait**: `TaskOutput` with 10min timeout

### Phase 5: Fix & Deliver
1. Integrate review feedback
2. Apply fixes (weighted by trust rules)
3. Repeat audit if needed
4. Report: Summary, audit results, recommendations

## Structure

```
.claude/
├── ccg/
│   ├── execute/
│   │   ├── README.md
│   │   ├── GUIDE.md
│   │   ├── prompts/
│   │   │   ├── codex/
│   │   │   │   ├── architect.md
│   │   │   │   └── reviewer.md
│   │   │   └── gemini/
│   │   │       ├── frontend.md
│   │   │       └── reviewer.md
│   │   └── templates/
│   │       ├── diff-report.md
│   │       └── audit-report.md
│   └── sessions/
│       └── *.json
└── scripts/
    ├── ccg-execute.ps1
    ├── ccg-execute.bat
    └── ccg-execute.sh
```

## Usage

```bash
# Execute from plan file
ccg-execute .claude/plan/feature-name.md

# Execute with task description
ccg-execute "implement user auth"

# Lite mode
ccg-execute feature.md --lite
```

## Key Rules

1. ✅ External models output **Unified Diff only**
2. ✅ Claude **refactors** dirty prototype
3. ✅ Claude **executes** all file changes
4. ✅ **Parallel calls** for fullstack (Codex + Gemini)
5. ✅ **Wait** for background tasks (10min timeout)
6. ✅ **Audit** after every change
7. ✅ **No side effects** — minimal scope

---

## Troubleshooting

### "ccg-execute: command not found"

**Problem:** Running `ccg-execute` shows command not found.

**Solution:**
```bash
# Use full path
.claude/scripts/ccg-execute.ps1

# Or create alias
Set-Alias ccg-execute ".claude/scripts/ccg-execute.ps1"
```

### "Session not found" Error

**Problem:** Resuming a session that doesn't exist or was cleaned up.

**Solution:**
```bash
# List all sessions
.claude/scripts/ccg-execute.ps1 --sessions

# Then resume with valid ID
.claude/scripts/ccg-execute.ps1 --resume <session-id>
```

### "Codex/Gemini not responding"

**Problem:** Model calls timeout or fail.

**Solution:**
- Check internet connection
- Verify API keys are set
- Try again later (rate limits)
- Use single-model mode instead of parallel

### "Audit failed" Error

**Problem:** Multi-model audit finds critical issues.

**Solution:**
- Review audit report
- Fix issues before proceeding
- Use `--skip-audit` only in emergencies

### "Permission denied" (Unix/Mac)

**Problem:** Cannot execute ccg-execute.sh.

**Solution:**
```bash
chmod +x .claude/scripts/ccg-execute.sh
```

### Cleanup Old Sessions

**Problem:** Too many session files accumulating.

**Solution:**
```bash
# Clean old sessions
.claude/scripts/ccg-execute.ps1 --cleanup
```

---

## See Also

- [QUICKSTART.md](QUICKSTART.md) — Quick start guide
- `prompts/` directory — Model prompts
- `templates/` directory — Task templates
