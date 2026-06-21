# TyneTees Damp — Project State

**Last updated:** 2026-06-21
**Last commit:** cea71d9 — docs: doc-standard retrofit complete
**Current phase:** MVP feature-complete — accuracy verification and polish

## Current focus

All core features are built and working: enquiry pipeline, survey wizard (4 issue types), automated costing engine (11 formula types, 220 line templates), quotation generation with PDF and e-signature, AI report generation, calendar/booking, and notifications. The costing admin pages (line templates, materials catalogue, pricing rates) are fully operational. The next concrete deliverables are verifying that all 220 costing line template calculations match the original Excel workbooks, adding costing manual overrides for surveyors, and completing woodworm wizard fields to full workbook parity.

## Open threads

- **Workbook formula accuracy pass:** all 220 line template calculations need verification against the original Excel workbooks (Damp v48, Condensation v37, Timber v33, Woodworm v26). Deviations cause real business impact.
- **Costing manual overrides:** surveyors need to adjust individual line items on the costing page. Not yet built.
- **Woodworm wizard fields:** not at full parity with the workbook. Some fields missing.
- **Survey type refactor:** `survey_type` enum includes `structural`, `comprehensive`, `site_preparation` — `site_preparation` has 3 costing sections but no wizard steps or report templates; the other two have nothing. Selecting them creates dead-end surveys. Plan exists at `docs/plans/2026-03-02-survey-type-display-migration.md`.
- **Role-based RLS tightening:** most tables grant full access to all authenticated users. Acceptable for MVP but must fix before team growth.
- **7 API routes with no role checks:** includes LLM/transcription endpoints (API credit exposure) and company profile writes.

## Known issues

- **CF CSV hardcoded hourly rate:** `cf-csv-export.ts` uses hardcoded £30.63/hr instead of reading from `pricing_config`. Should read from DB.
- **Report generator crashes on missing company profile:** non-null assertion (`profile!`) on nullable value in `report-generator.ts`. Workaround: ensure company profile exists before generating reports.
- **Wizard auto-save writes stale step number:** race condition in `wizard/page.tsx`. Low impact — step is cosmetic.
- **Dashboard "Active Surveys" and "Pending Review" always show 0:** filters by `in_progress` and `pending_review` statuses which are never set — surveys go from `draft` to `completed`.
- **7 survey-type extension tables unused:** schema provisioned but wizard uses JSONB instead. Candidates for removal.

## Recently shipped

- 2026-06-21 — Deep documentation audit: fixed all table names, counts, formula types, pipeline statuses, migration counts across all docs
- 2026-04-27 — Doc-standard retrofit: AGENTS.md, README.md, ARCHITECTURE.md, DEPLOYMENT.md, CLAUDE.md import chain
- 2026-04-27 — Consolidated all documentation into `docs/` directory
- 2026-04-26 — Portal-based tooltips using Floating UI for costing templates admin
- 2026-04-26 — Contextual help tooltips on costing templates admin page
- 2026-04-25 — Removed misleading wastage display from labour-only costing templates
- 2026-04-25 — Materials catalogue admin CRUD (working add/edit/delete)
- 2026-04-24 — Costing line templates admin with full pricing control
- 2026-04-24 — Materials catalogue wired to coverage-adjusted templates (dynamic CPCU)
- 2026-04-23 — Moved hardcoded pricing constants to database (formula_params and pricing_config)
- 2026-04-14 — Fixed additional works duplication for multi-issue surveys
