# OpenCode Cross-System Workflows

This document describes common workflows that combine multiple OpenCode command systems.

---

## Workflow 1: Development Cycle

**Systems:** evolve → backend → eval

**Use Case:** Building a new feature with pattern detection and quality validation.

### Steps

1. **Analyze for Patterns** (`evolve`)
   ```bash
   .claude/scripts/evolve.ps1
   ```
   - Detects if similar features exist in codebase
   - Identifies reusable patterns
   - Suggests templates

2. **Implement Feature** (`backend`)
   ```bash
   .claude/scripts/backend.ps1
   ```
   - Codex designs backend logic
   - Gemini contributes frontend if needed
   - Claude integrates and polishes

3. **Define Eval** (`eval`)
   ```bash
   .claude/scripts/eval.ps1 define <feature-name>
   ```
   - Create quality criteria
   - Set success metrics (pass@1, pass@3)

4. **Test & Iterate**
   ```bash
   .claude/scripts/eval.ps1 check <feature-name>
   # Fix issues
   .claude/scripts/eval.ps1 quick <feature-name>
   ```

### Example

Building a user profile page:
1. `evolve` detects existing form patterns
2. `backend` creates API + components
3. `eval` defines "form validation works" criteria
4. Test → fix → deliver

---

## Workflow 2: Multi-Model Task

**Systems:** ccg:execute → backend → eval

**Use Case:** Complex task requiring parallel model collaboration.

### Steps

1. **Parallel Execution** (`ccg:execute`)
   ```bash
   .claude/scripts/ccg-execute.ps1 --type fullstack
   ```
   - Gemini builds frontend
   - Codex builds backend
   - Both run in parallel
   - Claude reviews and integrates

2. **Integration** (`backend`)
   ```bash
   .claude/scripts/backend.ps1 --resume <session>
   ```
   - Connect frontend and backend
   - Handle edge cases
   - Add error handling

3. **Validation** (`eval`)
   ```bash
   .claude/scripts/eval.ps1 define integration-tests
   .claude/scripts/eval.ps1 check integration-tests
   ```
   - End-to-end tests
   - Integration validation

### Example

Building a dashboard with real-time updates:
1. `ccg:execute` — Gemini builds UI, Codex builds WebSocket server
2. `backend` — Integrate and add reconnection logic
3. `eval` — Test real-time sync accuracy

---

## Workflow 3: Feature Evolution

**Systems:** eval → backend → evolve

**Use Case:** Build → validate → capture pattern for reuse.

### Steps

1. **Define Quality Gates** (`eval`)
   ```bash
   .claude/scripts/eval.ps1 define <feature>
   ```
   - Set acceptance criteria
   - Define test cases

2. **Build Feature** (`backend`)
   ```bash
   .claude/scripts/backend.ps1
   ```
   - Multi-model development
   - Iterate until eval passes

3. **Capture Pattern** (`evolve`)
   ```bash
   .claude/scripts/evolve.ps1 --generate
   ```
   - Detect new patterns from this feature
   - Generate reusable templates
   - Register for future use

### Example

Building authentication system:
1. `eval` — "Login must succeed in 3 tries, handle 5 error cases"
2. `backend` — Implement JWT logic, session management
3. `evolve` — Capture "JWT auth pattern" for reuse

---

## Workflow 4: Rapid Prototyping

**Systems:** ccg:execute → evolve

**Use Case:** Quick prototype without deep validation.

### Steps

1. **Fast Prototype** (`ccg:execute`)
   ```bash
   .claude/scripts/ccg-execute.ps1 --type frontend
   ```
   - Generate working prototype
   - Dirty but functional code
   - Review and approve

2. **Capture Pattern** (`evolve`)
   ```bash
   .claude/scripts/evolve.ps1
   ```
   - Analyze prototype patterns
   - Generate clean templates
   - Save for future

### Example

Proof-of-concept for new UI component:
1. `ccg:execute` — Quick working version
2. `evolve` — Extract pattern into reusable component template

---

## Workflow 5: Quality Assurance Cycle

**Systems:** eval → ccg:execute → eval

**Use Case:** Fixing quality issues with multi-model help.

### Steps

1. **Check Quality** (`eval`)
   ```bash
   .claude/scripts/eval.ps1 check <feature>
   # Shows failures
   ```

2. **Parallel Fix** (`ccg:execute`)
   ```bash
   .claude/scripts/ccg-execute.ps1
   # Task: "Fix these 3 failing tests"
   ```
   - Multiple models suggest fixes
   - Claude selects best approach

3. **Validate Fix** (`eval`)
   ```bash
   .claude/scripts/eval.ps1 quick <feature>
   # Should now pass
   ```

### Example

Security audit findings:
1. `eval` — Security tests fail
2. `ccg:execute` — Codex fixes auth, Gemini fixes XSS
3. `eval` — Security tests pass

---

## System Interaction Map

```
                    ┌─────────────┐
                    │   evolve    │
                    │  (patterns) │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │    eval     │ │   backend   │ │ ccg:execute │
    │  (quality)  │ │(orchestrate)│ │  (parallel) │
    └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
           │               │               │
           └───────────────┼───────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Deliver   │
                    └─────────────┘
```

**Arrows show data flow:**
- `evolve` → all: Provides patterns/templates
- `eval` → others: Sets quality gates
- `backend` → eval: For testing
- `ccg:execute` → eval: For validation

---

## Choosing the Right Workflow

| Goal | Primary System | Secondary Systems |
|------|---------------|-------------------|
| Build + validate quality | `backend` | `eval` |
| Parallel complex task | `ccg:execute` | `backend`, `eval` |
| Detect patterns | `evolve` | any |
| Quality gates | `eval` | any |
| Quick prototype | `ccg:execute` | `evolve` |
| Fix quality issues | `eval` → `ccg:execute` | `eval` |

---

## Tips

1. **Start Simple**: Use single system first, add complexity only when needed
2. **Chain Strategically**: Don't use all 4 systems for every task
3. **Let evolve Watch**: Run `evolve` periodically to capture patterns
4. **eval Is Safety Net**: Define evals for critical features
5. **backend For Complexity**: Use when task needs orchestration
6. **ccg:execute For Speed**: Use when parallel work helps

---

## Common Mistakes

❌ **Over-engineering**: Using all 4 systems for a simple task  
✅ Use 1-2 systems, add more only if needed

❌ **Missing eval**: Building without quality criteria  
✅ Always define evals for production features

❌ **Not evolving**: Doing same work repeatedly  
✅ Run `evolve` weekly to capture patterns

❌ **Ignoring results**: Running commands but not acting on output  
✅ Review and implement suggestions

---

## Version

**Document:** v1.0  
**Updated:** 2026-04-09  
**Systems:** /eval v1.0, /evolve v1.0, /backend v1.0, /ccg:execute v1.0
