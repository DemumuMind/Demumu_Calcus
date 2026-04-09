# Phase 5: Integration & Testing - Plan

**Phase:** 05-integration-testing  
**Goal:** Integrate all four command systems and verify they work together  
**Created:** 2026-04-09  
**Tasks:** 5 organized into 3 waves

---

## Overview

This phase integrates the four command systems (/eval, /evolve, /backend, /ccg:execute) that were built in phases 1-4. We need to:

1. Create unified documentation
2. Test all commands work
3. Document cross-system workflows
4. Verify no conflicts

---

## Wave 1: Documentation (Parallel)

### Task 1: Create Unified Documentation Index
**Objective:** Create `.claude/README.md` as master index
**Files:** 1

**Deliverables:**
- `.claude/README.md` — Master index linking all 4 systems
- Command reference table
- Quick navigation links
- System relationship diagram

**Success Criteria:**
- All 4 systems listed with descriptions
- All commands documented with usage examples
- Clear navigation structure

---

### Task 2: Create Missing QUICKSTART.md Files  
**Objective:** Create QUICKSTART.md for systems that need them
**Files:** 3

**Systems needing QUICKSTART:**
- `/eval` — needs QUICKSTART.md
- `/evolve` — needs QUICKSTART.md  
- `/ccg:execute` — needs QUICKSTART.md

**Deliverables:**
- Three QUICKSTART.md files following template
- Installation steps
- First usage examples
- Common commands

**Success Criteria:**
- Each QUICKSTART tested (can follow steps)
- Examples are copy-paste ready
- Covers 80% of common use cases

---

## Wave 2: Testing Infrastructure

### Task 3: Create Integration Test Suite
**Objective:** Build test runner that validates all commands
**Files:** 3
**Depends:** Wave 1

**Deliverables:**
- `.claude/scripts/test-all.ps1` — Main test suite
- `.claude/scripts/test-all.bat` — Windows wrapper
- `.claude/scripts/test-all.sh` — Unix wrapper

**Test Coverage:**
- [ ] eval: Test registry read, help output
- [ ] evolve: Test templates exist, help output
- [ ] backend: Test prompts exist, help output
- [ ] ccg:execute: Test templates exist, help output
- [ ] All scripts executable permissions correct
- [ ] All documentation files exist

**Success Criteria:**
- `test-all.ps1` runs without errors
- All 4 systems pass basic checks
- Test results logged

---

## Wave 3: Validation

### Task 4: Document Cross-System Workflows
**Objective:** Create WORKFLOWS.md showing how systems interact
**Files:** 1
**Depends:** Wave 2

**Deliverables:**
- `.claude/WORKFLOWS.md`
- 3 documented workflows:
  1. **Development Cycle**: evolve → backend → ccg:execute
  2. **Testing Cycle**: evolve → eval → fix loop
  3. **Multi-Model Task**: backend → ccg:execute → eval

**Success Criteria:**
- Each workflow has clear steps
- Shows which commands to run
- Documents expected outcomes

---

### Task 5: Run Smoke Tests & Fix Issues
**Objective:** Execute tests and fix any issues found
**Files:** 0 (fixes to existing)
**Depends:** Wave 2-3

**Deliverables:**
- Test execution report
- Fix any failing tests
- Update STATE.md with results

**Test Execution:**
```powershell
.claude/scripts/test-all.ps1
```

**Success Criteria:**
- 100% of smoke tests pass
- No critical issues
- All documentation verified

---

## File Structure

```
.claude/
├── README.md                    ← NEW (Task 1)
├── WORKFLOWS.md                 ← NEW (Task 4)
├── evals/
│   ├── README.md
│   └── QUICKSTART.md           ← NEW (Task 2)
├── evolve/
│   ├── README.md
│   ├── GUIDE.md
│   └── QUICKSTART.md           ← NEW (Task 2)
├── backend/
│   ├── README.md
│   ├── GUIDE.md
│   └── QUICKSTART.md           ← EXISTS
├── ccg/
│   └── execute/
│       ├── README.md
│       ├── QUICKSTART.md       ← NEW (Task 2)
│       └── templates/
└── scripts/
    ├── eval.ps1
    ├── evolve.ps1
    ├── backend.ps1
    ├── ccg-execute.ps1
    ├── test-all.ps1            ← NEW (Task 3)
    ├── test-all.bat            ← NEW (Task 3)
    └── test-all.sh             ← NEW (Task 3)
```

---

## Dependencies

```
Task 1 ──┐
         ├──→ Task 3 ──→ Task 4 ──→ Task 5
Task 2 ──┘
```

---

## Success Criteria

- [ ] `.claude/README.md` exists and documents all systems
- [ ] All 4 systems have QUICKSTART.md
- [ ] `test-all.ps1` runs successfully
- [ ] All smoke tests pass
- [ ] `.claude/WORKFLOWS.md` documents 3 cross-system workflows
- [ ] No command conflicts detected
- [ ] STATE.md updated with test results

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Tests fail | Fix issues in Task 5 |
| Missing docs | Create minimal versions |
| Command conflicts | Document workarounds |

---

## Notes

- Keep changes minimal — this is integration, not enhancement
- Focus on smoke tests, not full test coverage
- Document what exists, don't add features
