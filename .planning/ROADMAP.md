# Command System Infrastructure - Roadmap

**Milestone:** v1.0 - Command System Infrastructure  
**Status:** In Progress  
**Started:** 2026-04-09  
**Goal:** Build four comprehensive command systems for OpenCode: `/eval`, `/evolve`, `/backend`, `/ccg:execute`

---

## Phase Overview

| Phase | Name | Status | Goal |
|-------|------|--------|------|
| 1 | Eval System Foundation | ✅ Complete | Create `/eval` command for eval-driven development |
| 2 | Evolve System Foundation | ✅ Complete | Create `/evolve` command for instinct evolution |
| 3 | Backend Orchestrator Foundation | ✅ Complete | Create `/backend` multi-model orchestrator |
| 4 | CCG Execute System Foundation | ✅ Complete | Create `/ccg:execute` multi-model execution |
| 5 | Integration & Testing | 🔄 Not Started | Integrate all systems, test workflows |
| 6 | Documentation & Polish | 🔄 Not Started | Complete documentation, final review |
| 7 | Milestone Completion | 🔄 Not Started | Audit, archive, cleanup |

---

## Phase 1: Eval System Foundation ✅

**Goal:** Create comprehensive eval-driven development system with `/eval` command

**Requirements:**
- PowerShell script with batch/shell wrappers
- Eval registry and management
- Test result tracking
- HTML report generation
- Quick loop commands

**Success Criteria:**
- [x] `/eval` command works in PowerShell
- [x] Registry tracks all evals
- [x] HTML reports generated
- [x] Quick commands: quick, loop, analyze
- [x] Documentation complete

**Disk Status:** Complete

---

## Phase 2: Evolve System Foundation ✅

**Goal:** Create instinct evolution system that turns patterns into commands/skills/agents

**Requirements:**
- `/evolve` command with analysis workflow
- Templates for commands, skills, agents
- Evolution registry
- GUIDE.md with workflows

**Success Criteria:**
- [x] `/evolve` command works
- [x] Templates for all output types
- [x] Registry tracks evolved items
- [x] Multi-agent analysis support

**Disk Status:** Complete

---

## Phase 3: Backend Orchestrator Foundation ✅

**Goal:** Create multi-model backend orchestrator with Codex-led workflow

**Requirements:**
- `/backend` command for task delegation
- Multi-model integration (Codex, Gemini, etc.)
- Session management
- Prompt templates for each model role

**Success Criteria:**
- [x] `/backend` command works
- [x] Model routing functional
- [x] Session tracking
- [x] Plan/execute workflow

**Disk Status:** Complete

---

## Phase 4: CCG Execute System Foundation ✅

**Goal:** Create multi-model collaborative execution system

**Requirements:**
- `/ccg:execute` command
- Parallel agent execution
- Result synthesis
- Git integration

**Success Criteria:**
- [x] `/ccg:execute` command works
- [x] Multiple agents can run in parallel
- [x] Results synthesized
- [x] Git workflow supported

**Disk Status:** Complete

---

## Phase 5: Integration & Testing 🔄

**Goal:** Integrate all four systems and verify they work together

**Requirements:**
- Cross-system compatibility
- Shared configuration
- Unified documentation
- End-to-end testing

**Success Criteria:**
- [ ] All commands work from `.claude/scripts/`
- [ ] No conflicts between systems
- [ ] Integration tests pass
- [ ] Performance acceptable

**Dependencies:** Phases 1-4

---

## Phase 6: Documentation & Polish 🔄

**Goal:** Complete all documentation and final polish

**Requirements:**
- README.md for each system
- QUICKSTART.md guides
- Architecture documentation
- Troubleshooting guides

**Success Criteria:**
- [ ] All READMEs complete
- [ ] QUICKSTART guides tested
- [ ] Architecture documented
- [ ] All cross-references valid

**Dependencies:** Phase 5

---

## Phase 7: Milestone Completion 🔄

**Goal:** Finalize milestone with audit, completion, and cleanup

**Requirements:**
- Milestone audit
- Archive creation
- Cleanup of temp files
- Final verification

**Success Criteria:**
- [ ] Audit passed
- [ ] Milestone archived
- [ ] Cleanup complete
- [ ] Ready for v1.0 release

**Dependencies:** Phase 6

---

## Architecture

```
.claude/
├── evals/           # /eval system
├── evolve/          # /evolve system  
├── backend/         # /backend system
├── ccg/             # /ccg:execute system
└── scripts/         # All command entry points
```

## Decisions

### Implementation Decisions

**Shell Support:**
- PowerShell primary (Windows)
- Batch wrappers for convenience
- Shell scripts for cross-platform

**Documentation:**
- Markdown for all docs
- GUIDE.md for detailed workflows
- QUICKSTART.md for quick start

**Registry:**
- Markdown-based registries
- Human-readable and machine-parseable

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Cross-platform issues | Medium | Batch + shell wrappers |
| Documentation drift | Low | Centralized docs |
| Command conflicts | Low | Namespaced commands |

## Notes

- All four base systems are created
- Need integration testing
- Autonomous workflow will handle remaining phases
