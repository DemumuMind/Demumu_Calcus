# OpenCode Command Systems

**Complete suite of AI-powered development commands**

This directory contains four integrated command systems for OpenCode that enable eval-driven development, instinct evolution, multi-model orchestration, and collaborative execution.

---

## Quick Reference

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/eval` | Eval-driven development | Testing features, tracking metrics |
| `/evolve` | Instinct evolution | Converting patterns to commands/skills |
| `/backend` | Backend orchestrator | Multi-model backend development |
| `/ccg:execute` | Collaborative execution | Parallel multi-model coding |

---

## Systems Overview

### `/eval` — Eval-Driven Development

**Purpose:** Manage feature development through eval-based testing

**Key Features:**
- Define evals with metrics (pass@1, pass@3, pass^3)
- Check eval compliance
- Generate HTML reports
- Quick test loops

**Quick Start:**
```bash
# Define a new eval
./claude/scripts/eval.ps1 define my-feature

# Run eval check
./claude/scripts/eval.ps1 check my-feature

# View report
./claude/scripts/eval.ps1 report my-feature
```

**Documentation:** [evals/README.md](evals/README.md) | [QUICKSTART.md](evals/QUICKSTART.md)

---

### `/evolve` — Instinct Evolution

**Purpose:** Analyze development patterns and evolve them into reusable commands, skills, and agents

**Key Features:**
- Pattern analysis across codebase
- Auto-generation of command templates
- Registry of evolved items
- Multi-model analysis support

**Quick Start:**
```bash
# Analyze instincts
./claude/scripts/evolve.ps1

# Generate evolved files
./claude/scripts/evolve.ps1 --generate

# Show registry
./claude/scripts/evolve.ps1 --registry
```

**Documentation:** [evolve/README.md](evolve/README.md) | [QUICKSTART.md](evolve/QUICKSTART.md)

---

### `/backend` — Backend Orchestrator

**Purpose:** Orchestrate backend development with multi-model collaboration

**Key Features:**
- Codex-led backend development
- Research and ideation phases
- Plan/execute workflow
- Session management

**Quick Start:**
```bash
# Start backend workflow
./claude/scripts/backend.ps1

# With research context
./claude/scripts/backend.ps1 --research

# Load saved plan
./claude/scripts/backend.ps1 --resume plan-name
```

**Documentation:** [backend/README.md](backend/README.md) | [QUICKSTART.md](backend/QUICKSTART.md)

---

### `/ccg:execute` — Collaborative Execution

**Purpose:** Execute tasks with multiple AI models working in parallel

**Key Features:**
- Multi-model parallel execution
- Code sovereignty (external models have no write access)
- Dirty prototype refactoring
- Stop-loss validation

**Quick Start:**
```bash
# Execute with multi-model collaboration
./claude/scripts/ccg-execute.ps1

# Specify task type
./claude/scripts/ccg-execute.ps1 --type fullstack

# Resume session
./claude/scripts/ccg-execute.ps1 --resume session-id
```

**Documentation:** [ccg/execute/README.md](ccg/execute/README.md) | [ccg/execute/QUICKSTART.md](ccg/execute/QUICKSTART.md)

---

## Cross-System Workflows

See [WORKFLOWS.md](WORKFLOWS.md) for detailed workflows combining multiple systems.

### Common Patterns

1. **Development Cycle**
   ```
   evolve (detect pattern) → backend (implement) → eval (test)
   ```

2. **Multi-Model Task**
   ```
   ccg:execute (parallel) → backend (integrate) → eval (validate)
   ```

3. **Feature Evolution**
   ```
   eval (define) → backend (build) → evolve (capture pattern)
   ```

---

## Installation

All commands are already installed in `.claude/scripts/`. Just use them directly:

```bash
# PowerShell (Windows)
.claude/scripts/<command>.ps1 [options]

# Batch (Windows CMD)
.claude/scripts/<command>.bat [options]

# Shell (Unix/Mac)
.claude/scripts/<command>.sh [options]
```

---

## Testing

Run the integration test suite:

```bash
.claude/scripts/test-all.ps1
```

This validates:
- All commands are executable
- All documentation exists
- No conflicts between systems

---

## Architecture

```
.claude/
├── README.md              # This file
├── WORKFLOWS.md           # Cross-system workflows
├── evals/                 # /eval system
├── evolve/                # /evolve system
├── backend/               # /backend system
├── ccg/                   # /ccg:execute system
│   └── execute/
└── scripts/               # All command entry points
    ├── eval.ps1
    ├── evolve.ps1
    ├── backend.ps1
    ├── ccg-execute.ps1
    └── test-all.ps1       # Test suite
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Command not found | Check `.claude/scripts/` exists and is in PATH |
| Permission denied | Run `chmod +x` on `.sh` files (Unix) |
| Script won't run (Windows) | Use PowerShell 5.0+ or use `.bat` versions |
| Missing dependencies | Check system requirements in each README |

---

## Contributing

When adding new commands:
1. Create system directory under `.claude/`
2. Add README.md and QUICKSTART.md
3. Create PowerShell script in `.claude/scripts/`
4. Add batch/shell wrappers if needed
5. Update this README.md
6. Add to test suite

---

## Version

**Milestone:** v1.0 — Command System Infrastructure  
**Status:** 🔄 In Progress (Phase 6: Documentation & Polish)  
**Last Updated:** 2026-04-09

---

## License

MIT — See project root for details
