# Phase 5: Integration & Testing

## Overview

**Phase:** 05-integration-testing  
**Milestone:** Command System Infrastructure  
**Goal:** Integrate all four command systems and verify they work together  
**Dependencies:** Phases 1-4 (all four base systems complete)

### Context

We have created four comprehensive command systems:
- **/eval** — Eval-driven development system (Phase 1)
- **/evolve** — Instinct evolution system (Phase 2)  
- **/backend** — Multi-model backend orchestrator (Phase 3)
- **/ccg:execute** — Multi-model collaborative execution (Phase 4)

Each system has:
- PowerShell scripts in `.claude/scripts/`
- Batch/shell wrappers for cross-platform support
- Individual README.md documentation
- Some have QUICKSTART.md guides

### Current State

✅ All four base systems created and functional  
⚠️  Missing unified documentation index  
⚠️  Not all systems have QUICKSTART.md  
⚠️  Cross-system compatibility untested  
⚠️  No integration test suite exists

### Target State

- Unified index at `.claude/README.md` linking all systems
- Every system has a QUICKSTART.md guide
- All commands execute without errors
- Cross-system workflows validated
- Smoke tests verify basic functionality
- Integration test suite created

---

## Goals & Success Criteria

### Primary Goals

| Goal | Description | Success Criteria |
|------|-------------|------------------|
| **G1: Unified Documentation** | Create `.claude/README.md` as central index | Index exists, links to all systems, includes quick reference |
| **G2: Complete Quickstarts** | Ensure every system has QUICKSTART.md | 4 QUICKSTART.md files exist and are tested |
| **G3: Smoke Tests** | Verify all commands run without errors | All 4 main commands execute successfully |
| **G4: Cross-System Validation** | Test that systems can work together | At least 2 cross-system workflows documented and tested |
| **G5: Integration Test Suite** | Create automated tests | Test script exists and passes for all systems |

### Success Metrics

- **Coverage:** 100% of command systems documented and tested
- **Reliability:** All smoke tests pass (0 failures)
- **Completeness:** All 4 systems have both README.md and QUICKSTART.md
- **Integration:** At least 2 cross-system workflows validated

---

## Tasks

### Task 1: Create Unified Documentation Index

**Objective:** Create `.claude/README.md` as the central entry point for all command systems.

**Deliverables:**
- `.claude/README.md` — Master index with:
  - Overview of the command system infrastructure
  - Quick reference table of all commands
  - Links to each system's README.md
  - Links to each system's QUICKSTART.md
  - Common usage patterns
  - Architecture overview
  - Getting started guide

**Dependencies:** None (can be done in parallel with other tasks)

**Verification:**
- [ ] File exists at `.claude/README.md`
- [ ] Contains links to all 4 system READMEs
- [ ] Contains links to all 4 QUICKSTARTs
- [ ] Includes command quick reference table
- [ ] Markdown renders correctly

---

### Task 2: Create Missing QUICKSTART.md Files

**Objective:** Ensure every system has a concise QUICKSTART.md guide.

**Current Status:**
- ✅ `.claude/evals/README.md` — exists
- ❌ `.claude/evals/QUICKSTART.md` — MISSING
- ✅ `.claude/evolve/README.md` — exists
- ❌ `.claude/evolve/QUICKSTART.md` — MISSING  
- ✅ `.claude/backend/README.md` — exists
- ✅ `.claude/backend/QUICKSTART.md` — exists
- ✅ `.claude/ccg/execute/README.md` — exists
- ❌ `.claude/ccg/execute/QUICKSTART.md` — MISSING

**Deliverables:**
1. `.claude/evals/QUICKSTART.md` — Quick start for /eval system
2. `.claude/evolve/QUICKSTART.md` — Quick start for /evolve system
3. `.claude/ccg/execute/QUICKSTART.md` — Quick start for /ccg:execute system

**Each QUICKSTART.md must include:**
- One-line description of what the system does
- Prerequisites (if any)
- 3-5 most common commands with examples
- Expected output for each command
- Next steps (link to full README.md)

**Verification:**
- [ ] All 3 missing QUICKSTART.md files created
- [ ] Each file has prerequisites section
- [ ] Each file has 3-5 command examples
- [ ] Commands can be copy-pasted and run
- [ ] All markdown renders correctly

---

### Task 3: Create Integration Test Suite

**Objective:** Create a comprehensive test script that verifies all systems work correctly.

**Deliverables:**
- `.claude/scripts/test-all.ps1` — Main test runner (PowerShell)
- `.claude/scripts/test-all.sh` — Unix wrapper
- `.claude/scripts/test-all.bat` — Windows batch wrapper

**Test Categories:**

1. **Individual System Tests:**
   - Test /eval: `eval list` executes without error
   - Test /evolve: `evolve` executes without error  
   - Test /backend: `backend --help` executes without error
   - Test /ccg:execute: `ccg-execute --help` executes without error

2. **Cross-Platform Tests:**
   - Verify PowerShell scripts work
   - Verify Batch wrappers work  
   - Verify Shell scripts work (Unix)

3. **Documentation Tests:**
   - Verify all README.md files exist
   - Verify all QUICKSTART.md files exist
   - Verify all scripts exist

4. **Smoke Tests:**
   - Each command executes without throwing errors
   - Each command produces expected output format
   - No conflicting dependencies between systems

**Test Script Requirements:**
- Display test name and status (PASS/FAIL/SKIP)
- Continue on failure (don't stop at first error)
- Summary report at end (total passed/failed/skipped)
- Exit code 0 if all pass, non-zero if any fail
- Colored output (green=pass, red=fail, yellow=skip)

**Verification:**
- [ ] test-all.ps1 exists and is executable
- [ ] All 4 individual system tests pass
- [ ] Documentation tests pass (all files exist)
- [ ] Script produces clear PASS/FAIL output
- [ ] Exit code reflects test results

---

### Task 4: Validate Cross-System Workflows

**Objective:** Document and test scenarios where multiple systems work together.

**Cross-System Workflows to Document:**

**Workflow 1: Eval → Backend → Evolve**
1. Use `/eval` to test a feature
2. If tests fail, use `/backend` to fix the issue
3. Record the fix pattern in `/evolve` as an instinct
4. Evolve the instinct into a skill/command

**Workflow 2: CCG Execute → Eval**
1. Use `/ccg:execute` to implement a feature with multi-model collaboration
2. Use `/eval check` to verify the implementation meets criteria
3. Generate eval report with `/eval report`

**Workflow 3: Backend → CCG Execute**
1. Use `/backend` to plan a complex backend task
2. Use `/ccg:execute` to implement the plan with multi-model collaboration
3. Use `/eval` to verify the result

**Deliverables:**
- `.claude/WORKFLOWS.md` — Document describing 3 cross-system workflows
- Each workflow includes:
  - Description of when to use it
  - Step-by-step instructions
  - Example commands for each step
  - Expected outcomes

**Verification:**
- [ ] WORKFLOWS.md exists with 3 documented workflows
- [ ] Each workflow has clear step-by-step instructions
- [ ] Commands in workflows are copy-paste ready
- [ ] At least one workflow has been manually tested

---

### Task 5: Run Smoke Tests & Fix Issues

**Objective:** Execute all commands in a clean environment and fix any issues found.

**Smoke Test Checklist:**

| System | Command | Expected Result |
|--------|---------|-----------------|
| /eval | `eval list` | Shows eval list or "No evals" message |
| /eval | `eval define test` | Creates test.md eval definition |
| /eval | `eval clean` | Cleans old logs without error |
| /evolve | `evolve` | Shows instinct analysis |
| /evolve | `evolve --generate` | Generates evolved files |
| /backend | `backend --help` | Shows help/usage info |
| /backend | `backend "test task"` | Runs backend workflow |
| /ccg:execute | `ccg-execute --help` | Shows help/usage info |

**Process:**
1. Run each command in the checklist
2. Document any errors or unexpected behavior
3. Fix issues found (file bugs if needed)
4. Re-run until all pass

**Deliverables:**
- Smoke test results document
- List of issues found and fixed
- Verification that all commands work

**Verification:**
- [ ] All commands in checklist execute without error
- [ ] No critical issues remain unfixed
- [ ] All systems can run independently
- [ ] No conflicts between systems

---

## File Structure

### Existing Structure

```
.claude/
├── evals/
│   ├── README.md              ✅
│   └── _registry.md           ✅
├── evolve/
│   ├── README.md              ✅
│   └── templates/             ✅
├── backend/
│   ├── README.md              ✅
│   └── QUICKSTART.md          ✅
├── ccg/
│   └── execute/
│       ├── README.md          ✅
│       └── QUICKSTART.md      ❌ MISSING
└── scripts/
    ├── eval.ps1               ✅
    ├── eval.bat               ✅
    ├── eval.sh                ✅
    ├── evolve.ps1             ✅
    ├── evolve.bat             ✅
    ├── evolve.sh              ✅
    ├── backend.ps1            ✅
    ├── backend.bat            ✅
    ├── backend.sh             ✅
    ├── ccg-execute.ps1        ✅
    ├── ccg-execute.bat        ✅
    └── ccg-execute.sh         ✅
```

### Target Structure

```
.claude/
├── README.md                  ❌ TO CREATE (unified index)
├── WORKFLOWS.md               ❌ TO CREATE (cross-system workflows)
├── evals/
│   ├── README.md              ✅
│   ├── QUICKSTART.md          ❌ TO CREATE
│   └── _registry.md           ✅
├── evolve/
│   ├── README.md              ✅
│   ├── QUICKSTART.md          ❌ TO CREATE
│   └── templates/             ✅
├── backend/
│   ├── README.md              ✅
│   └── QUICKSTART.md          ✅
├── ccg/
│   └── execute/
│       ├── README.md          ✅
│       └── QUICKSTART.md      ❌ TO CREATE
└── scripts/
    ├── eval.ps1               ✅
    ├── eval.bat               ✅
    ├── eval.sh                ✅
    ├── evolve.ps1             ✅
    ├── evolve.bat             ✅
    ├── evolve.sh              ✅
    ├── backend.ps1            ✅
    ├── backend.bat            ✅
    ├── backend.sh             ✅
    ├── ccg-execute.ps1        ✅
    ├── ccg-execute.bat        ✅
    ├── ccg-execute.sh         ✅
    ├── test-all.ps1           ❌ TO CREATE
    ├── test-all.bat           ❌ TO CREATE
    └── test-all.sh            ❌ TO CREATE
```

---

## Testing Approach

### Test Pyramid

```
┌─────────────────────────────────────┐
│  Integration Tests (Cross-system)   │  ← Task 4: Workflows
│  - Test 3 cross-system workflows    │
├─────────────────────────────────────┤
│  System Tests (Individual)          │  ← Task 3: Test Suite
│  - Each command runs without error  │
│  - All scripts exist                │
│  - All docs exist                   │
├─────────────────────────────────────┤
│  Smoke Tests (Quick checks)         │  ← Task 5
│  - Commands execute                 │
│  - No errors on basic usage         │
└─────────────────────────────────────┘
```

### Test Execution Order

1. **Task 3: Create Test Suite** — Build the testing infrastructure
2. **Task 5: Run Smoke Tests** — Quick validation of all commands
3. **Task 4: Validate Workflows** — Test cross-system scenarios
4. **Task 3: Full Test Run** — Execute complete test suite

### Test Environments

- **Primary:** Windows PowerShell 5.1+
- **Secondary:** Windows Command Prompt (Batch)
- **Tertiary:** Unix/Linux/macOS (Bash)

---

## Execution Plan

### Wave 1: Documentation (Parallel tasks)

**Tasks:**
- Task 1: Create `.claude/README.md` (unified index)
- Task 2: Create 3 missing QUICKSTART.md files

**Parallel:** Yes, these tasks don't depend on each other

### Wave 2: Testing Infrastructure

**Tasks:**
- Task 3: Create integration test suite (test-all.ps1, .sh, .bat)

**Dependencies:** Wave 1 (docs should be complete to test doc existence)

### Wave 3: Validation & Fixes

**Tasks:**
- Task 5: Run smoke tests and fix issues
- Task 4: Create and validate cross-system workflows

**Dependencies:** Wave 2 (need tests to run validation)

---

## Success Criteria Checklist

### Phase Complete When:

- [ ] **Documentation Complete**
  - [ ] `.claude/README.md` exists with unified index
  - [ ] All 4 systems have README.md
  - [ ] All 4 systems have QUICKSTART.md
  - [ ] `.claude/WORKFLOWS.md` exists with 3 workflows

- [ ] **Tests Pass**
  - [ ] `test-all.ps1` exists and runs
  - [ ] All individual system tests pass
  - [ ] All documentation tests pass
  - [ ] Smoke tests pass for all commands

- [ ] **Integration Validated**
  - [ ] At least 2 cross-system workflows documented
  - [ ] At least 1 workflow manually tested
  - [ ] No blocking issues between systems

- [ ] **Quality Gates**
  - [ ] All scripts execute without errors
  - [ ] No conflicts between systems
  - [ ] Documentation is accurate and tested

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Cross-platform script issues | Medium | Medium | Test on both Windows and Unix |
| Missing dependencies in scripts | Low | High | Run smoke tests to catch early |
| Documentation drift | Low | Medium | Automated doc existence tests |
| Command name conflicts | Low | High | Namespaced commands (/eval, /evolve, etc.) |
| Test environment differences | Medium | Low | Document expected environment |

---

## Post-Phase Deliverables

### Files Created

1. `.claude/README.md` — Unified documentation index
2. `.claude/WORKFLOWS.md` — Cross-system workflow documentation
3. `.claude/evals/QUICKSTART.md` — Quick start guide
4. `.claude/evolve/QUICKSTART.md` — Quick start guide
5. `.claude/ccg/execute/QUICKSTART.md` — Quick start guide
6. `.claude/scripts/test-all.ps1` — Integration test suite
7. `.claude/scripts/test-all.bat` — Windows test wrapper
8. `.claude/scripts/test-all.sh` — Unix test wrapper

### Artifacts

- Test results report
- Issue log (if any found and fixed)
- Validation checklist completed

### State Update

- Update `.planning/ROADMAP.md` Phase 5 status to "✅ Complete"
- Create `05-integration-testing-SUMMARY.md` with results

---

## Notes

### Assumptions

- All Phase 1-4 systems are functionally complete
- Scripts in `.claude/scripts/` are the canonical entry points
- PowerShell is the primary execution environment
- Batch/shell wrappers are for cross-platform convenience

### Constraints

- Keep individual system READMEs and QUICKSTARTs in their directories
- Don't modify the four base systems (this phase is integration only)
- Tests should be non-destructive (use test data, clean up after)
- Documentation should be accurate and tested

### Future Enhancements (Out of Scope)

- CI/CD integration for automated testing
- Performance benchmarking
- More complex cross-system workflows
- Additional platform support (e.g., macOS-specific)
- Interactive test mode

---

## Appendix: Command Quick Reference

| Command | System | Description |
|---------|--------|-------------|
| `eval define <name>` | /eval | Create new eval definition |
| `eval check <name>` | /eval | Run eval checks interactively |
| `eval list` | /eval | List all evals |
| `evolve` | /evolve | Analyze instincts |
| `evolve --generate` | /evolve | Generate evolved files |
| `backend "task"` | /backend | Run backend orchestration |
| `ccg-execute "task"` | /ccg | Multi-model execution |

---

*Phase 5: Integration & Testing — Plan Version 1.0*
