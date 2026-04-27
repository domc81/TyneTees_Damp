# Doc Standard Retrofit — TyneTees_Damp

**Date:** 2026-04-27
**Source:** `/root/app-dc81/logs/project-shape-audit-2026-04-26.json`
**Standard:** `/root/app-dc81/docs/PROJECT_DOC_STANDARD.md`

## Audit Findings (14 failures)

### Missing files
1. `AGENTS.md` does not exist
2. `README.md` does not exist
3. `docs/ARCHITECTURE.md` does not exist
4. `docs/DEPLOYMENT.md` does not exist

### CLAUDE.md issues
5. Missing heading `## Claude-specific policy`
6. Missing heading `## References`
7. Missing import `@./AGENTS.md`
8. Missing server-wide import `@../CLAUDE.md`

### PROJECT_STATE.md issues
9. Missing heading `## Current focus`
10. Missing heading `## Open threads`
11. Missing heading `## Known issues`
12. Missing heading `## Recently shipped`

### Anti-pattern violations
13. `docs/COMPLETE_DOCUMENTATION.md` — legacy overlapping state file
14. `docs/PROJECT_STATUS.md` — legacy overlapping state file

## Fix Plan

| Commit | Category | Action |
|--------|----------|--------|
| 1 | Plan | This file (committed first) |
| 2 | Legacy cleanup | Move `docs/COMPLETE_DOCUMENTATION.md` → `docs/audits/2026-04-27-complete-documentation-snapshot.md`; move `docs/PROJECT_STATUS.md` → `docs/audits/2026-04-27-project-status-snapshot.md` |
| 3 | Missing files | Create `AGENTS.md`, `README.md`, `docs/ARCHITECTURE.md`, `docs/DEPLOYMENT.md` with real content |
| 4 | CLAUDE.md fix | Add `@./AGENTS.md` + `@../CLAUDE.md` imports; add `## Claude-specific policy` and `## References` headings |
| 5 | PROJECT_STATE.md fix | Restructure with required headings: `## Current focus`, `## Open threads`, `## Known issues`, `## Recently shipped`; set `Last updated: 2026-04-27` |
| 6 | Cleanup | Delete this plan file; verify audit PASS |
