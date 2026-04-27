# TyneTees Damp — Project State

**Last updated:** 2026-04-27
**Last commit:** 6e66082 — docs: add CLAUDE.md import chain and required headings
**Current phase:** MVP feature-complete — accuracy verification and polish

## Current focus

All core features are built and working: enquiry pipeline, survey wizard (4 issue types), automated costing engine (8 formula types, 227 line templates), quotation generation with PDF and e-signature, AI report generation, calendar/booking, and notifications. The next concrete deliverables are verifying that all 227 costing line template calculations match the original Excel workbooks, adding costing manual overrides for surveyors, and completing woodworm wizard fields to full workbook parity.

## Open threads

- **Workbook formula accuracy pass:** all 227 line template calculations need verification against the original Excel workbooks (Damp v48, Condensation v37, Timber v33, Woodworm v26). Deviations cause real business impact.
- **Costing manual overrides:** surveyors need to adjust individual line items on the costing page. Not yet built.
- **Woodworm wizard fields:** not at full parity with the workbook. Some fields missing.
- **Survey type refactor:** `survey_type` enum includes `structural`, `comprehensive`, `site_preparation` which have no wizard steps, mapping, or report templates — selecting them creates dead-end surveys. Plan exists at `docs/plans/2026-03-02-survey-type-display-migration.md`.
- **Materials admin write operations:** add/edit/delete are stubs (`alert('demo mode')`). CRUD needed.
- **Realtime notifications broken:** `notifications` table not in Supabase Realtime publication, and filter uses wrong ID column. Bell requires page refresh.
- **Role-based RLS tightening:** most tables grant full access to all authenticated users. Acceptable for MVP but must fix before team growth.
- **7 API routes with no role checks:** includes LLM/transcription endpoints (API credit exposure) and company profile writes.

## Known issues

- **CF CSV hardcoded hourly rate:** `cf-csv-export.ts` uses hardcoded £35/hr instead of reading from `pricing_config`. Workaround: manual rate in exports.
- **Report generator crashes on missing company profile:** non-null assertion on nullable value in `report-generator.ts`. Workaround: ensure company profile exists before generating reports.
- **Wizard auto-save writes stale step number:** race condition in `wizard/page.tsx`. Low impact — step is cosmetic.
- **Dashboard "Active Surveys" and "Pending Review" always show 0:** those status values are never set by the current workflow.
- **3 notification link_urls use dead `/projects/` prefix:** should be `/surveys/`. Notifications link to 404.
- **Customer detail "View Quotation" links to wrong route:** uses `/surveys/${q.survey_id}/quotation` which 404s (needs quotation ID).
- **13 empty survey-type extension tables:** schema provisioned but wizard uses JSONB instead. Candidates for removal.
- **No `.dockerignore`:** full source tree copied into build context, slowing builds.

## Recently shipped

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
