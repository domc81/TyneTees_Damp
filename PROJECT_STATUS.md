# PROJECT STATUS — Tyne Tees Damp Proofing Platform

**Last updated:** 4 March 2026
**Maintainers:** Dominic (product owner) + architectural translator
**Source audit:** `survey-system/docs/SYSTEM_AUDIT_04_03_2026.md`

> This is the single source of truth for the platform's current state,
> architecture, and roadmap. Update after every significant change.
> All development prompts reference this document.

---

## 1. Platform Overview

Survey management platform for a damp proofing company. Handles the full lifecycle: customer enquiry → survey scheduling → on-site wizard assessment → automated costing → quotation generation → customer delivery → AI report generation. Built for office staff and surveyors with role-based access. White-label ready via company profile system.

### Stack & Infrastructure

| Component | Detail |
|-----------|--------|
| Framework | Next.js 14.2.35, App Router, `output: 'standalone'` |
| Database | Supabase (self-hosted PostgreSQL 15) — 42 tables, RLS enabled |
| Auth | Supabase Auth, client-side ProtectedRoute, middleware does JWT refresh only |
| Storage | Supabase Storage (`survey-photos`, `company-assets` buckets) |
| Email | Resend (transactional: quotations, reports, on-hold notifications) |
| LLM | OpenRouter / x-ai/grok-4.1-fast (report generation, field note polishing) |
| STT | Deepgram Nova-3 (voice-to-text in wizard) |
| Calendar | FullCalendar 6.x (surveyor booking calendar) |
| Deployment | Docker via Coolify on Hetzner, auto-deploy on push to `main` |
| App URL | `https://ttdp.dc81.io` |
| Supabase URL | `https://api.ttdp.dc81.io:8000` (Kong gateway) |
| Repo | `github.com/domc81/TyneTees_Damp` — working dir: `survey-system/` |

### Roles

| Role | Access |
|------|--------|
| Admin | Full access, team management, settings, rate configuration |
| Office | Enquiry pipeline, survey creation, quotations, reports, bookings |
| Surveyor | Assigned surveys, wizard, calendar (own schedule) |

Role enforcement is UI-level only — RLS policies are broad (see Known Issues).

---

## 2. Feature Status

### 2.1 Enquiry Pipeline — WORKING

Full CRM pipeline from phone call to decision.

| Capability | Status | Key Files |
|------------|--------|-----------|
| New enquiry form (3-step wizard) | Working | `enquiries/new/page.tsx` |
| Kanban board (7 columns, drag-drop) | Working | `enquiries/page.tsx` |
| Board filters (search, assignee, type) | Working | `enquiries/page.tsx` |
| Mobile list view with accordions | Working | `enquiries/page.tsx` |
| Enquiry drawer (3 tabs: Details, Activity, Linked) | Working | `EnquiryDrawer.tsx` |
| Inline editable fields (all enquiry data) | Working | `EnquiryDrawer.tsx` |
| Convert & Book flow (4-step: review → surveyor → slot → confirm) | Working | `EnquiryDrawer.tsx` |
| Card quick actions (phone, email, follow-up, convert & book) | Working | `enquiries/page.tsx` |
| Auto-transitions (new→assigned, surveyed, quoted, accepted, declined) | Working | `supabase-data.ts`, `wizard/page.tsx`, `quotation/route.ts`, `q/[token]/respond` |
| SLA traffic lights (per-status thresholds) | Working | `enquiries/page.tsx`, `EnquiryDrawer.tsx` |
| Column urgency counts (red badge) | Working | `enquiries/page.tsx` |
| On-hold email notification (templated) | Working | `/api/enquiries/[id]/notify-on-hold` |
| Dashboard pipeline widget | Working | `page.tsx` (PipelineWidget) |
| Dashboard recent activity feed | Working | `page.tsx` (RecentActivityFeed) |

**Known gaps:**
- Wizard auto-transition passes `null` as userId (logs "System" not surveyor name)
- SLA thresholds duplicated in two files (`enquiries/page.tsx` and `EnquiryDrawer.tsx`)

### 2.2 Survey System — WORKING

| Capability | Status | Key Files |
|------------|--------|-----------|
| Survey creation form | Working | `survey/new/page.tsx` |
| Survey type dropdown (7 types) | Working | `survey/new/page.tsx` |
| Survey detail page (hub) | Working | `surveys/[surveyId]/page.tsx` |
| Survey list with filters | Working | `surveys/page.tsx` |
| 5-step wizard (property → external → rooms → additional → summary) | Working | `survey/[projectId]/wizard/page.tsx` |
| Wizard auto-save | Working | `survey-wizard-data.ts` |
| Voice-to-text in wizard | Working | `/api/transcribe` |
| Field note polishing | Working | `/api/polish-observation` |
| Survey completion (sets status + progress) | Working | `survey-wizard-data.ts` |

**Known gaps:**
- Wizard validation bypassed: `canProceed()` returns `true` unconditionally for room and additional works steps
- `structural`, `comprehensive` survey types have no wizard steps, mapping, or report templates — selecting them creates a dead-end survey
- `site_preparation` has costing data but no UI creation path
- Dashboard "Active Surveys" and "Pending Review" always show 0 (those status values never set)

### 2.3 Costing — WORKING

| Capability | Status | Key Files |
|------------|--------|-----------|
| Auto-calculated from wizard data | Working | `pricing-engine.ts`, `survey-mapping.ts` |
| 11 formula types | Working | `pricing-engine.ts` |
| Travel overhead | Working | `travel-overhead.ts` |
| Section adjustments (include/exclude, %) | Working | `costing/page.tsx` |
| CF CSV export | Working | `cf-csv-export.ts`, `cf-export-config.ts` |

**Known gaps:**
- CF CSV uses hardcoded £35/hr hourly rate instead of reading from `pricing_config`
- Section adjustment saves are fire-and-forget with no error handling

### 2.4 Quotations — WORKING

| Capability | Status | Key Files |
|------------|--------|-----------|
| Generation from costing page | Working | `/api/surveys/[id]/quotation` |
| Internal quotation view | Working | `quotation/[quotationId]/page.tsx` |
| PDF download | Working | `/api/quotation-pdf/[quotationId]` |
| Send to customer (email with share link) | Working | `/api/quotations/[id]/send` |
| Public customer page (`/q/[token]`) | Working | `q/[token]/page.tsx` (Server Component) |
| Customer accept/decline | Working | `/api/q/[token]/respond` |
| View tracking | Working | `/api/q/[token]/view` |
| Versioned quotations | Working | Auto-increments per survey |

### 2.5 Reports — WORKING (no PDF)

| Capability | Status | Key Files |
|------------|--------|-----------|
| AI report generation (LLM) | Working | `report-generator.ts`, `/api/generate-report` |
| Report editor (section editing) | Working | `report/page.tsx` |
| Publish with share token | Working | `report-publish.ts` |
| Send to customer (email) | Working | `/api/reports/[id]/send` |
| Public report page | Working | `report/[reportId]/page.tsx` (Server Component) |
| View tracking | Working | `/api/report/[reportId]/view` |

**Known gaps:**
- Report PDF generation does not exist (CLAUDE.md incorrectly claims it does; `@react-pdf/renderer` is installed but the renderer file was deleted)
- Report generator crashes on missing company profile (non-null assertion on nullable value)
- 5 TODO comments in report-generator.ts for missing wizard data fields

### 2.6 Customer Management — WORKING

| Capability | Status | Key Files |
|------------|--------|-----------|
| Customer list with search | Working | `customers/page.tsx` |
| Customer create form | Working | `customers/new/page.tsx` |
| Customer detail/edit | Working | `customers/[customerId]/page.tsx` |
| Customer ↔ survey links | Working | `customers/[customerId]/page.tsx` |
| Customer ↔ quotation link | **Broken** | Link uses wrong route format → 404 |
| Auto-create from enquiry | Working | `findOrCreateCustomerFromEnquiry()` |

**Known gaps:**
- Customer detail "View Quotation" button links to `/surveys/${q.survey_id}/quotation` which 404s (needs quotation ID in route)
- Customer title not saved when creating via standalone form
- `alert(JSON.stringify(error))` on survey creation from customer page exposes raw Supabase errors

### 2.7 Calendar & Booking — WORKING

| Capability | Status | Key Files |
|------------|--------|-----------|
| Monthly/weekly/day calendar view | Working | `calendar/page.tsx` (FullCalendar) |
| Booking creation (from survey form + Convert & Book) | Working | `calendar-data.ts` |
| SlotPicker component (reusable) | Working | Embedded in survey/new + EnquiryDrawer |
| Surveyor availability management | Working | `admin/availability/page.tsx` |
| Availability blocks (time-off) | Working | `availability_blocks` table |
| Booking notifications (in-app) | Working | `notifyBookingCreated()` |
| Booking reminder cron | Working | `/api/cron/booking-reminders` |

### 2.8 Team & Auth — WORKING

| Capability | Status | Key Files |
|------------|--------|-----------|
| Login/logout | Working | `login/page.tsx`, `AuthContext.tsx` |
| Password reset flow | Working | `forgot-password/page.tsx`, `update-password/page.tsx` |
| Forced password change (first login) | Working | `change-password/page.tsx` |
| Team management (admin) | Working | `admin/team/page.tsx` |
| Role assignment | Working | `admin/team/page.tsx` |
| Surveyor flag (`is_surveyor`) | Working | `user_profiles.is_surveyor` |

### 2.9 Notifications — WORKING (with issues)

| Capability | Status | Key Files |
|------------|--------|-----------|
| In-app notification bell | Working | `NotificationBell.tsx` |
| Notification preferences (per-event toggle) | Working | `settings/notifications/page.tsx` |
| Email notifications (booking, quotation, report) | Working | Various API routes via Resend |
| Realtime updates | **Not working** | `notifications` table not in Supabase Realtime publication — bell requires page refresh |

**Known gaps:**
- 3 notification types use dead `/projects/${id}` link URLs (should be `/surveys/${id}`)
- Realtime subscription filter uses `auth.uid()` but `notifications.user_id` stores `user_profiles.id` — double-broken even if publication is fixed
- Surveyor actions cannot create notifications (RLS blocks surveyor INSERT)

### 2.10 Settings — PARTIALLY WORKING

| Capability | Status |
|------------|--------|
| Company profile (name, address, contact, terms, guarantee) | Working |
| Logo upload | Working |
| Notification preferences | Working |
| Security settings | Not built ("Coming Soon") |
| Appearance settings | Not built ("Coming Soon") |

### 2.11 Materials & Rates — PARTIALLY WORKING

| Capability | Status |
|------------|--------|
| Materials catalogue (read-only browse) | Working |
| Materials admin (add/edit/delete) | **Stubs only** — alert('demo mode') |
| Rate management (14 pricing config values) | Working |

### 2.12 Dashboard — WORKING

| Capability | Status |
|------------|--------|
| Pipeline widget (bar + metrics) | Working |
| Recent activity feed (5 latest) | Working |
| Quick stats (survey counts) | Partially — "Active Surveys" and "Pending Review" always show 0 |
| Recent projects list | Working |

---

## 3. Known Bugs (Verified Current)

Severity: Critical = blocks core workflow, High = broken visible feature, Medium = broken secondary feature, Low = cosmetic/edge case.

| # | Bug | Severity | Location |
|---|-----|----------|----------|
| 1 | EnquiryDrawer inline edits fail silently — 8 catch blocks swallow errors with no user feedback | High | `EnquiryDrawer.tsx` |
| ~~2~~ | ~~Fixed~~ | — | — |
| 3 | Wizard auto-save writes stale step number | Medium | `wizard/page.tsx` |
| 4 | CF CSV hardcoded £35/hr hourly rate | Medium | `cf-csv-export.ts` |
| 5 | Report generator crashes on missing company profile | Medium | `report-generator.ts:1033` |
| 6 | Costing section saves fire-and-forget, no error handling | Medium | `costing/page.tsx:387` |
| 7 | Realtime notifications not working (table not in publication + filter mismatch) | Medium | `NotificationBell.tsx` |
| 8 | `enquiries.source` casing mismatch between creation form (lowercase) and drawer edit (Title Case) | Low | `enquiries/new/page.tsx` vs `EnquiryDrawer.tsx` |
| 10 | 16 `alert()` calls in production (should be toasts) | Low | 7 files |

---

## 4. Dead Code & Cleanup Targets

| What | Location | Lines | Impact |
|------|----------|-------|--------|
| Legacy survey/room/photo functions | `supabase-data.ts` | ~540 | Superseded by `survey-wizard-data.ts` and `survey-photo-service.ts` |
| Legacy type aliases (Project = Survey, etc.) | `supabase-data.ts`, `database.types.ts` | ~130 | Confuses future agents; all consumers use Survey directly now |
| Orphaned API route | `/api/report/[reportId]/route.ts` | 222 | Replaced by Server Component |
| Redirect stubs | `/team/surveyors/*` (3 files) | ~30 | No inbound links |
| 13 empty survey-type extension tables | Database | 0 rows, no FK refs | Schema provisioned but wizard uses JSONB instead |
| Duplicate progress columns on surveys | `is_complete`/`completion_pct` vs `survey_completed`/`survey_progress` | — | Both pairs exist, only one pair used |
| 3 never-populated columns on surveys | `office_notes`, `submitted_at`, `reported_problem_override` | — | Dead schema surface area |

---

## 5. Technical Debt (Prioritised)

### Must Address

| Item | Risk | Detail |
|------|------|--------|
| **7 API routes with no role checks** | Security | Includes LLM/transcription endpoints (API credit exposure) and company profile writes. |
| **RLS policies too broad** | Security | Most tables grant full access to all authenticated users. Surveyors can read/write everything via dev tools. Acceptable for now, must fix before team growth or external access. |
| **Broken RLS join in quotation_acceptances** | Security | Policy references a join path that doesn't resolve correctly. |

### Should Address

| Item | Risk | Detail |
|------|------|--------|
| All client components (no SSR) | Performance | Every authenticated page fetches data client-side. No streaming, no server rendering. Causes flash-of-spinner on every navigation. |
| No `loading.tsx` anywhere | UX | 22+ independent loading spinner implementations. |
| No nested `error.tsx` boundaries | Resilience | Any page error bubbles to root boundary with no route-specific recovery. |
| 4 different service-role client patterns | Maintenance | API routes construct Supabase service clients inconsistently. |
| SLA thresholds duplicated in 2 files | Maintenance | Change requires editing both `enquiries/page.tsx` and `EnquiryDrawer.tsx`. |
| Project number generation in 3 places | Maintenance | Algorithm divergence risk. Should use shared `generateProjectNumber()`. |
| No `.dockerignore` | Build performance | Full source tree (including node_modules, .git) copied into build context. |

### Can Defer

| Item | Note |
|------|------|
| `as any` casts on JSONB (35 instances) | Risk is runtime-only; manageable for now |
| `typescript.ignoreBuildErrors: true` | Allows type errors to ship; acceptable for development speed |
| Overlapping env vars (`APP_URL` vs `SITE_URL`) | Works fine, just confusing |
| Sequential room saves in wizard | Performance hit on 6+ room surveys, but acceptable for typical survey sizes |

---

## 6. Architecture Reference

### Database — Key Relationships

```
enquiries ←── surveys ──→ customers
    │              │
enquiry_activity   ├── survey_rooms (room_data JSONB)
on_hold_templates  ├── survey_bookings ──→ user_profiles (surveyor)
                   ├── quotations ──→ quotation_sections
                   │                  quotation_views
                   │                  quotation_acceptances
                   ├── survey_reports ──→ report_views
                   ├── photos
                   └── costing_section_adjustments

costing_sections ──→ costing_line_templates (220 items)
pricing_config (14 values)
materials_catalog (30 products)
```

`surveys` is the gravitational centre — 22 other tables FK into it.

### Key Enums

| Enum | Values |
|------|--------|
| `enquiry_status` | new, assigned, surveyed, quoted, accepted, declined, on_hold, completed |
| `survey_type` | damp, timber, woodworm, condensation, structural, comprehensive, site_preparation |
| `project_status` (survey status) | draft, in_progress, pending_review, completed, archived |
| `user_role` | admin, office, surveyor |

### Page Routes (30 pages, 21 API routes)

All routes documented in `docs/SYSTEM_AUDIT_04_03_2026.md` Section 2.

Sidebar: Dashboard, Surveys, Customers, Enquiries (admin/office only), Materials, Team, Calendar, Settings.

Active state issues: Surveys doesn't highlight on `/survey/...` sub-pages (`/surveys` prefix ≠ `/survey/`). Team doesn't highlight on `/admin/*` sub-routes.

### Environment Variables Required

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Kong gateway URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side Supabase (bypasses RLS) |
| `NEXT_PUBLIC_APP_URL` | Public app URL (used in email links) |
| `OPENROUTER_API_KEY` | LLM API (report generation) |
| `DEEPGRAM_API_KEY` | STT API (wizard voice input) |
| `RESEND_API_KEY` | Email delivery |
| `CRON_SECRET` | Cron endpoint auth |

---

## 7. Design Decisions Log

Decisions that future prompts must not relitigate.

| Decision | Why | Date |
|----------|-----|------|
| Excel workbooks are the pricing source of truth | All pricing, calculation, and report logic must align with the original XLSM workbooks. Deviations cause real business impact. | Ongoing |
| Wizard stores data in `survey_rooms.room_data` JSONB, not normalised type-specific tables | 13 extension tables were provisioned but JSONB approach is simpler and working. Extension tables are candidates for removal. | Feb 2026 |
| `@react-pdf/renderer` is obsolete | Dropped due to structural/output issues. Web-based report with shareable URL is the primary delivery. If PDF needed, use headless browser print of web report. | Feb 2026 |
| Company profile is a singleton table | `is_singleton` unique constraint enforces one row. White-label ready — quotations snapshot company data at generation time. | Mar 2026 |
| Legacy `surveyors` table dropped | `is_surveyor` boolean on `user_profiles` separates role (permissions) from bookability. ~763 lines removed. | Mar 2026 |
| Coolify auto-deploy on git push | No local dev server. Prompts must end with "Commit and push", not "Run npm run build". | Ongoing |
| `public/` directory must never be empty | Dockerfile COPY requires it. Keep `.gitkeep` if needed. | Ongoing |
| Forward-only enquiry status transitions | `shouldAutoTransition()` enforces ordering: new → assigned → surveyed → quoted → accepted/declined. Terminal statuses never overwritten. on_hold allows transitions through. | Mar 2026 |
| Single-file Kanban board (no premature extraction) | `enquiries/page.tsx` is large but keeping it as one file avoids premature abstraction before the feature stabilised. Can extract later if needed. | Mar 2026 |

---

## 8. Roadmap

### Immediate Fixes (pre-roadmap cleanup)

Verified bugs from the audit that should be fixed before building new features:

1. Fix 4 dead links in EnquiryDrawer (`/projects/` → `/surveys/` and `/survey/`)
2. Fix 3 notification link_urls (`/projects/` → `/surveys/`)
3. Fix customer detail quotation link (needs quotation ID in route)
4. ~~Add quotation accepted → enquiry `accepted` auto-transition~~ (done — prompt 17)
5. ~~Upgrade Next.js 14.2.0 → 14.2.35 (critical security patch)~~ (done — prompt 18)
6. ~~Remove 25+ debug console.logs from production~~
7. Replace 16 alert() calls with toast notifications
8. Fix `enquiries.source` casing mismatch (standardise on one format)
9. Fix EnquiryDrawer inline edit error handling (surface errors to user)
10. Add Realtime publication for notifications table + fix filter mismatch

### Near-Term Features

- **"Unable to Contact" pipeline status** — auto-retry follow-up automation with eventual auto-decline after X failed attempts
- **Survey creation form: auto-populate address from selected customer** — when customer is selected, pre-fill site address with toggle for "different site address"
- **Materials admin write operations** — replace alert('demo mode') stubs with actual CRUD
- **Report PDF generation** — headless browser print of web report (not @react-pdf/renderer)

### Medium-Term

- **Survey type refactor** — decouple hardcoded `survey_type`. Types become auto-populated tags from wizard findings.
- **Role-based RLS tightening** — surveyors should only access their own data
- **API route auth standardisation** — add role checks to all 7 unprotected endpoints
- **Dead code cleanup** — ~920 lines of removable code, orphaned routes, redirect stubs
- **Loading/error boundaries** — root and nested `loading.tsx`, `error.tsx`, `not-found.tsx`

### Future

- **Server-side rendering migration** — convert key pages from client to Server Components
- **Reporting dashboard** — leverage survey finding tags for business analytics
- **Customer portal** — authenticated access for customers to view their surveys/quotations

---

## 9. Prompt History

Sequential log of prompts executed against the codebase.

| # | Date | Commit Message | What Changed |
|---|------|---------------|--------------|
| 1-7 | Pre-Mar 2026 | Various | Phases 1-7 of COMPREHENSIVE_WORK_PLAN: pricing bugs, report gaps, legacy cleanup, site prep type, quotation feature, company profile |
| — | 3 Mar 2026 | Enquiry pipeline schema migration | Database tables: enquiries (extended), enquiry_activity, on_hold_message_templates |
| — | 3 Mar 2026 | Enquiry data layer | supabase-data.ts: CRUD, status management, activity logging, on-hold templates |
| — | 3 Mar 2026 | Enquiry form fixes | enquiries/new form wired to database |
| 3A | 3 Mar 2026 | Core Kanban board | 7-column board with drag-drop, cards, modals |
| 3B | 3 Mar 2026 | Board controls + mobile | Filters, search, mobile accordion, loading skeleton |
| 4 | 3 Mar 2026 | Detail drawer | 3-tab drawer with activity timeline |
| 5 | 3 Mar 2026 | Investigation: survey/quotation flow | SURVEY_&_QUOTATION_FLOW_MAPPING.md |
| 6 | 3 Mar 2026 | Convert enquiry to survey | findOrCreateCustomerFromEnquiry, createSurveyFromEnquiry, survey type dropdown |
| 7 | 3 Mar 2026 | Auto-transitions | Forward-only guard, survey→surveyed, quotation→quoted |
| 8 | 4 Mar 2026 | SLA traffic lights | Card dots, follow-up indicators, column urgency counts, drawer timing |
| 9 | 4 Mar 2026 | On-hold customer email | API route, template, modal wiring, graceful no-email handling |
| 10 | 4 Mar 2026 | Dashboard pipeline widget + polish | Pipeline bar, activity feed, enquiry_number on cards, page title |
| 11 | 4 Mar 2026 | Editable drawer details | Inline edit for all fields, customer record link note |
| 12 | 4 Mar 2026 | Convert & Book flow | 4-step guided flow in drawer with SlotPicker |
| 13 | 4 Mar 2026 | Card quick actions | Phone, email, follow-up picker, Convert & Book trigger |
| 14 | 4 Mar 2026 | Notification bell overlap fix | Layout right padding |
| 15 | 4 Mar 2026 | System audit (6 prompts) | docs/SYSTEM_AUDIT_04_03_2026.md |
| 16 | 4 Mar 2026 | fix: dead route links in drawer, notifications, customer page | Fixed 4 `/projects/` links in EnquiryDrawer, 3 in notifications-server, 1 wrong quotation route in customer detail |
| 17 | 4 Mar 2026 | feat: quotation accept/decline auto-transitions enquiry status | Public respond endpoint now transitions linked enquiry to accepted/declined with activity logging |
| 18 | 4 Mar 2026 | chore: upgrade Next.js 14.2.0 → 14.2.35 (security patch) | Patch-level upgrade to fix CVE-2025-29927 cache poisoning vulnerability |
| 19 | 4 Mar 2026 | chore: remove debug console.logs from production | Removed 28 debug console.log statements across 9 files |

---

*End of document. Update after every significant change.*
