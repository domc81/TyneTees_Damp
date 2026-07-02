# TyneTees Damp — Project State

**Last updated:** 2026-07-02
**Last commit:** ab708af — docs: add role-based training documentation with live platform screenshots
**Current phase:** Post-audit — both Office and Surveyor role audits complete, training docs shipped

## Current focus

**Both role audits complete. Training documentation shipped.** Office audit (38 items) and Surveyor audit (41 items) are fully resolved. Tracker: `docs/audits/SURVEYOR_AUDIT_TRACKER.md` — 24 fixed, 17 deferred/by-design. Role-based training guides with live screenshots now at `docs/training/`. The system is ready for the next feature sprint. Priority candidates: workbook formula accuracy pass, costing manual overrides, Stripe integration.

## Open threads

- **Workbook formula accuracy pass:** all 220 line template calculations need verification against the original Excel workbooks (Damp v48, Condensation v37, Timber v33, Woodworm v26). Deviations cause real business impact.
- **Costing manual overrides:** surveyors need to adjust individual line items on the costing page. Not yet built.
- **Woodworm wizard fields:** not at full parity with the workbook. Some fields missing. Report now includes beetle reference image, equipment photos, and loft insulation note — but wizard field coverage still incomplete.
- **Survey type refactor:** `survey_type` enum includes `structural`, `comprehensive`, `site_preparation` — `site_preparation` has 3 costing sections but no wizard steps or report templates; the other two have nothing. Selecting them creates dead-end surveys. Plan exists at `docs/plans/2026-03-02-survey-type-display-migration.md`.
- **Role-based RLS tightening:** most tables grant full access to all authenticated users. App-level route guards (RoleGuard, ProtectedRoute allowedRoles) and API role checks now block surveyors from admin/office pages and sensitive endpoints. RLS policy migration deferred — acceptable for small team but must fix before team growth.
- **API route role checks:** payment mark-paid/send-link, quotation generation, company profile, and logo endpoints now require admin/office role (fixed in both audits). LLM/transcription endpoints remain open to all authenticated users (acceptable — no PII exposure, API credit risk is low with single-user team).
- **Stripe integration:** payment provider not yet chosen. Architecture is Stripe-ready (fields in payments table). Manual payment recording (office marks paid) is operational now, including from the calendar booking modal.
- **Release-unpaid-bookings cron:** `/api/cron/release-unpaid-bookings` needs a Coolify scheduled task (daily, e.g. 09:00) calling `POST` with `Authorization: Bearer $CRON_SECRET`.

## Known issues

- **CF CSV hardcoded hourly rate:** `cf-csv-export.ts` uses hardcoded £30.63/hr instead of reading from `pricing_config`. Should read from DB.
- **13 survey-type extension tables unused:** schema provisioned but wizard uses JSONB instead. Candidates for removal.
- **RLS policies still grant full access:** `USING (true) WITH CHECK (true)` on core tables. App-level guards mitigate risk but DB-level isolation needs a dedicated migration session.

## Recently shipped

- 2026-07-02 — Role-based training documentation: 4 guides (Getting Started, Office Staff, Surveyor, Admin) with 35 live platform screenshots captured via Steel Browser. Covers all 3 roles with step-by-step workflows — login/onboarding, enquiry pipeline, customer management, survey wizard (all 5 steps with every field), calendar, quotations, reports, payments, team management, pricing configuration, materials, availability, workload, company settings, and notifications. Written in plain English for non-technical staff onboarding. Location: `docs/training/`.
- 2026-07-02 — Surveyor role audit complete (41 items): 24 fixed across 3 commits (434f12b, ca33b8f, e240199), 17 deferred/by-design. Security: RoleGuard + ProtectedRoute allowedRoles for route protection, API role checks on payments/quotations. Data integrity: per-survey write queue for photo + wizard race conditions, photo upload retries. Surveyor workflow: wizard back-nav saves, room validation, Wake Lock for recording, booking cancellation notifications. API resilience: Deepgram retry with backoff, LLM timeout, quotation total validation. Report editor unsaved-changes warning. NotificationBell reconnection. Full report: `docs/audits/SURVEYOR_ROLE_AUDIT_2026-07-02.md`, tracker: `docs/audits/SURVEYOR_AUDIT_TRACKER.md`.
- 2026-07-02 — Office role audit complete (38 items): 27 bug fixes in first pass (crashes, security, workflow dead ends), then 8 deferred items resolved — booking status state machine with transition enforcement, calendar confirm/mark-as-paid for provisional bookings, calendar reschedule with SlotPicker and confirmation dialog, communication log manual entries (phone/WhatsApp/SMS/in-person with channel icons), confirmation dialogs on all destructive calendar actions, cancellation email error surfacing, slot duration default fix (90min), notification preferences cache invalidation on save. DB migration for expanded communication_log channels.
- 2026-07-01 — Lead-to-customer lifecycle: payments table, provisional bookings (awaiting payment), survey fee payment flow (`/pay/[token]`), deposit collection on quotation acceptance, full pipeline lifecycle with `completed` and `won` states (`won_at`, `cf_exported_at` on enquiries), CF export tracking from costing page, dashboard stats fix (Active Surveys, Completed, Won This Month), workload dashboard (`/admin/workload`), survey fee config in admin rates, auto-release cron for expired provisional bookings, survey fee + booking confirmed email templates
- 2026-06-30 — Guarantee wording update per client feedback: 25-year company guarantees on rising damp/dry rot/woodworm, 7-year warranty on mould, removed Westminster Protected Guarantee (ceased trading), insurance-backed guarantees now through generic Protected Guarantee scheme. Updated report-generator.ts, company_profile (about_us_text + guarantee_scheme_name), and all 18 existing report sections in DB.
- 2026-06-21 — Client feedback implementation: removed all measurements from customer-facing reports (m², joist sizes, areas), updated cavity drain membrane methodology wording (3 steps changed), removed skirting reinstatement from scope items, added customer reinstatement responsibility disclaimer, updated woodworm methodology (2 steps removed), added beetle reference image + 3 treatment equipment photos + loft insulation note to woodworm reports, created WoodwormTreatmentSection component, regenerated all 18 existing reports
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
