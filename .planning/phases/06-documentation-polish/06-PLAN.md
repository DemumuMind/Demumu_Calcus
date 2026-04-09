# Phase 6: Documentation & Polish - Plan

**Phase:** 06-documentation-polish  
**Goal:** Final documentation improvements and quality polish  
**Created:** 2026-04-09  
**Tasks:** 4 sequential tasks

---

## Overview

This phase adds final polish to documentation: troubleshooting sections, cross-reference validation, consistency checks, and final quality pass. No new features — only documentation improvements.

---

## Task 1: Add Troubleshooting Sections

**Objective:** Add troubleshooting sections to all main system READMEs
**Files:** 4

**Current State:**
- `.claude/evals/README.md` — Has minimal troubleshooting
- `.claude/evolve/README.md` — Has minimal troubleshooting
- `.claude/backend/README.md` — No troubleshooting section
- `.claude/ccg/execute/README.md` — Has minimal troubleshooting

**Deliverables:**
Expand troubleshooting sections with:
- Common issues and solutions (3-5 per system)
- Permission/setup issues
- Command not found solutions
- Script execution problems

**Success Criteria:**
- Each main README has comprehensive troubleshooting
- Issues are realistic and helpful
- Solutions are actionable

---

## Task 2: Cross-Reference Validation

**Objective:** Validate all internal links and cross-references
**Files:** All markdown files (check, not modify)

**Validation Checklist:**
- [ ] All links to other docs are valid
- [ ] All relative paths are correct
- [ ] No broken references
- [ ] Consistent naming conventions

**Files to Check:**
- `.claude/README.md` — Master index links
- `.claude/WORKFLOWS.md` — Workflow cross-references
- All system README.md files
- All QUICKSTART.md files

**Success Criteria:**
- All internal links work
- No broken references found
- Or: issues documented if found

---

## Task 3: Consistency Check

**Objective:** Ensure consistent formatting across all docs
**Files:** All markdown files

**Consistency Checks:**
- [ ] Header levels consistent (H1→H2→H3)
- [ ] Code block languages specified
- [ ] Tables formatted consistently
- [ ] Bullet points use consistent style
- [ ] Emojis used consistently (or not at all)

**Success Criteria:**
- No formatting inconsistencies
- Professional appearance
- Easy to read and scan

---

## Task 4: Final Polish Pass

**Objective:** Final proofreading and quality improvements
**Files:** Key documentation files

**Focus Files:**
1. `.claude/README.md` — Most important (entry point)
2. `.claude/WORKFLOWS.md` — User workflows
3. `.claude/test-all.ps1` header — Test suite
4. `.planning/ROADMAP.md` — Project status
5. `.planning/STATE.md` — Current state

**Polish Tasks:**
- [ ] Typos and grammar
- [ ] Clarity improvements
- [ ] Professional tone
- [ ] Final formatting

**Success Criteria:**
- No obvious errors
- Professional quality
- Ready for release

---

## File Deliverables

```
.claude/
├── evals/README.md              ← UPDATE (troubleshooting)
├── evolve/README.md             ← UPDATE (troubleshooting)
├── backend/README.md            ← UPDATE (troubleshooting)
├── ccg/execute/README.md        ← UPDATE (troubleshooting)
├── README.md                    ← POLISH
├── WORKFLOWS.md                 ← POLISH
└── scripts/
    └── test-all.ps1            ← POLISH header

.planning/
├── ROADMAP.md                   ← POLISH
└── STATE.md                     ← POLISH
```

---

## Success Criteria

- [ ] All 4 system READMEs have troubleshooting sections
- [ ] All internal links validated
- [ ] Consistent formatting across docs
- [ ] Final polish pass complete
- [ ] No critical errors remaining

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Changes break tests | Run test-all.ps1 after changes |
| Over-polishing | Limit to 4 hours max |
| Scope creep | Only docs, no code changes |

---

## Notes

- Focus on high-impact improvements
- Don't rewrite from scratch — enhance existing
- Run tests after any changes
- Keep changes minimal and safe
