# Eval System Quick Start

Get up and running with eval-driven development in 5 minutes.

---

## Installation

Already included in OpenCode. Just use the scripts directly.

---

## First Eval

### 1. Define an Eval

```bash
# PowerShell
.claude/scripts/eval.ps1 define my-feature

# Or shorthand
eval define my-feature
```

This creates `feature-my-feature.md` in `.claude/evals/`.

### 2. Edit the Eval

Open the created file and define:
- **Goal**: What feature should do
- **Metrics**: How to measure success (pass@1, pass@3, pass^3)
- **Test Cases**: Specific scenarios
- **Acceptance Criteria**: When is it done

### 3. Check the Eval

```bash
.claude/scripts/eval.ps1 check my-feature
```

Shows current status and missing pieces.

---

## Common Commands

### List All Evals
```bash
.claude/scripts/eval.ps1 list
```

### Generate Report
```bash
.claude/scripts/eval.ps1 report my-feature
```

Creates HTML report in `.claude/evals/reports/`.

### Quick Test Loop
```bash
.claude/scripts/eval.ps1 quick my-feature
```

Runs eval + generates report in one command.

### Clean Logs
```bash
.claude/scripts/eval.ps1 clean
```

Removes old log files.

---

## Metrics Explained

| Metric | Meaning | Use When |
|--------|---------|----------|
| **pass@1** | Success on first try | Simple features |
| **pass@3** | Success within 3 tries | Complex features |
| **pass^3** | 100% success rate | Regression tests |

---

## Typical Workflow

```
1. Define eval → 2. Implement → 3. Check → 4. Iterate → 5. Report
```

---

## Files Created

```
.claude/evals/
├── feature-<name>.md       # Eval definition
├── feature-<name>.log      # Test results
├── _registry.md             # All evals
└── reports/
    └── <name>-report.html   # Generated report
```

---

## Example

```bash
# Define eval for user authentication
eval define user-auth

# Check progress
eval check user-auth

# Generate final report
eval report user-auth
```

---

## Next Steps

- Read [GUIDE.md](GUIDE.md) for advanced usage
- Check [README.md](README.md) for full documentation
- See `_registry.md` for examples

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Command not found" | Use full path: `.claude/scripts/eval.ps1` |
| "Permission denied" | Run `chmod +x .claude/scripts/eval.sh` (Unix) |
| Report not generated | Check `.claude/evals/reports/` exists |

---

**That's it!** You're ready for eval-driven development.
