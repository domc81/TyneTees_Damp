# Routing & Navigation Audit Report

**Date:** 2026-03-03
**Scope:** All routes, links, navigation, and API endpoints in `survey-system/src/`
**Status:** Audit only — no fixes applied

---

## 1. Route Map

### Page Routes (33 pages)

| # | URL Pattern | File | Component Type | Status | Notes |
|---|---|---|---|---|---|
| 1 | `/` | `app/page.tsx` | Client | Working | Dashboard |
| 2 | `/login` | `app/login/page.tsx` | Client | Working | |
| 3 | `/forgot-password` | `app/forgot-password/page.tsx` | Client | Working | |
| 4 | `/update-password` | `app/update-password/page.tsx` | Client | Working | Supabase auth callback target |
| 5 | `/change-password` | `app/change-password/page.tsx` | Client | Working | Forced on first login |
| 6 | `/surveys` | `app/surveys/page.tsx` | Client | Working | |
| 7 | `/surveys/[surveyId]` | `app/surveys/[surveyId]/page.tsx` | Client | Working | Survey detail hub |
| 8 | `/survey/new` | `app/survey/new/page.tsx` | Client | Working | |
| 9 | `/survey/[projectId]/wizard` | `app/survey/[projectId]/wizard/page.tsx` | Client | Working | |
| 10 | `/survey/[projectId]/costing` | `app/survey/[projectId]/costing/page.tsx` | Client | Working | |
| 11 | `/survey/[projectId]/quotation/[quotationId]` | `app/survey/[projectId]/quotation/[quotationId]/page.tsx` | Client | Working | |
| 12 | `/survey/[projectId]/report` | `app/survey/[projectId]/report/page.tsx` | Client | Working | |
| 13 | `/survey/[projectId]/installer-info` | `app/survey/[projectId]/installer-info/page.tsx` | Client | Working | |
| 14 | `/customers` | `app/customers/page.tsx` | Client | Working | |
| 15 | `/customers/new` | `app/customers/new/page.tsx` | Client | Working | |
| 16 | `/customers/[customerId]` | `app/customers/[customerId]/page.tsx` | Client | Working | |
| 17 | `/enquiries` | `app/enquiries/page.tsx` | Client | **Stub** | Hardcoded sample data, not connected to DB |
| 18 | `/enquiries/new` | `app/enquiries/new/page.tsx` | Client | Working | Writes to DB, fires notifications |
| 19 | `/calendar` | `app/calendar/page.tsx` | Client | Working | |
| 20 | `/materials` | `app/materials/page.tsx` | Client | Working | Read-only materials catalog |
| 21 | `/admin` | `app/admin/page.tsx` | Client | Working | Admin hub |
| 22 | `/admin/materials` | `app/admin/materials/page.tsx` | Client | Working | |
| 23 | `/admin/rates` | `app/admin/rates/page.tsx` | Client | Working | |
| 24 | `/admin/team` | `app/admin/team/page.tsx` | Client | Working | |
| 25 | `/admin/availability` | `app/admin/availability/page.tsx` | Client | Working | |
| 26 | `/settings` | `app/settings/page.tsx` | Client | Working | |
| 27 | `/settings/company` | `app/settings/company/page.tsx` | Client | Working | |
| 28 | `/settings/notifications` | `app/settings/notifications/page.tsx` | Client | Working | |
| 29 | `/q/[token]` | `app/q/[token]/page.tsx` | **Server** | Working | Public quotation page |
| 30 | `/report/[reportId]` | `app/report/[reportId]/page.tsx` | **Server** | Working | Public report page |
| 31 | `/team/surveyors` | `app/team/surveyors/page.tsx` | Server | **Redirect stub** | `redirect('/admin/team')` |
| 32 | `/team/surveyors/[id]` | `app/team/surveyors/[id]/page.tsx` | Server | **Redirect stub** | `redirect('/admin/team')` |
| 33 | `/team/surveyors/new` | `app/team/surveyors/new/page.tsx` | Server | **Redirect stub** | `redirect('/admin/team')` |

### API Routes (20 endpoints)

| # | URL Pattern | Methods | Auth | Status | Called By |
|---|---|---|---|---|---|
| 1 | `/api/transcribe` | POST | None | Working | `wizard/AudioRecorder.tsx` |
| 2 | `/api/polish-observation` | POST | None | Working | `wizard/RoomInspectionStep.tsx`, `wizard/ExternalInspectionStep.tsx` |
| 3 | `/api/generate-report` | POST | None | Working | `lib/report-generator.ts` |
| 4 | `/api/notifications/trigger` | POST | Session | Working | `enquiries/new`, `survey/new`, `survey/report`, `survey/wizard` |
| 5 | `/api/bookings/notify` | POST | Session | Working | `calendar/page.tsx`, `survey/new` |
| 6 | `/api/cron/booking-reminders` | POST | CRON_SECRET | Working | External (Coolify cron) |
| 7 | `/api/admin/team` | POST, PATCH | Admin | Working | `admin/team/page.tsx` |
| 8 | `/api/settings/company` | GET, PATCH | Session | Working | `settings/company/page.tsx` |
| 9 | `/api/settings/company/logo` | POST | Session | Working | `settings/company/page.tsx` |
| 10 | `/api/settings/notifications` | GET, POST | Admin | Working | `settings/notifications/page.tsx` |
| 11 | `/api/settings/notifications/test-email` | POST | Admin | Working | `settings/notifications/page.tsx` |
| 12 | `/api/surveys/[id]/quotation` | POST | Session | Working | `survey/[projectId]/costing/page.tsx` |
| 13 | `/api/quotation-pdf/[quotationId]` | GET | Session | Working | `survey/[projectId]/quotation/[quotationId]/page.tsx` |
| 14 | `/api/quotations/[id]/send` | POST | Admin/Office | Working | `survey/[projectId]/quotation/[quotationId]/page.tsx` |
| 15 | `/api/q/[token]/view` | POST | Public | Working | `q/[token]/client.tsx` |
| 16 | `/api/q/[token]/pdf` | GET | Public | Working | `q/[token]/client.tsx` |
| 17 | `/api/q/[token]/respond` | POST | Public | Working | `q/[token]/client.tsx` |
| 18 | `/api/report/[reportId]` | GET | Token | Working | `report/[reportId]/client.tsx` |
| 19 | `/api/report/[reportId]/view` | POST | Public | Working | `report/[reportId]/client.tsx` |
| 20 | `/api/reports/[id]/send` | POST | Admin/Office | Working | `survey/[projectId]/report/page.tsx` |

---

## 2. Dead Links

Links in the codebase that navigate to routes that **do not exist** as pages.

### CRITICAL

| # | Source File | Link Target | Issue |
|---|---|---|---|
| DL-1 | `lib/notifications-server.ts:104` | `/projects/${survey.id}` | Route `/projects/[id]` was renamed to `/surveys/[surveyId]` but notification link_url was never updated. Affects **survey_created** notifications. |
| DL-2 | `lib/notifications-server.ts:123` | `/projects/${survey.id}` | Same — affects **survey_assigned** notifications. |
| DL-3 | `lib/notifications-server.ts:142` | `/projects/${survey.id}` | Same — affects **survey_completed** notifications. |
| DL-4 | `customers/[customerId]/page.tsx:625` | `/surveys/${q.survey_id}/quotation` | Route `/surveys/[id]/quotation` does not exist. Actual quotation page is `/survey/[projectId]/quotation/[quotationId]` (requires quotation ID, not just survey ID). Clicking "View Quotation" button on customer detail page will 404. |

### HIGH

| # | Source File | Link Target | Issue |
|---|---|---|---|
| DL-5 | `enquiries/page.tsx:184` | `/enquiries/${enquiry.id}` | No `/enquiries/[id]` page exists. Clicking any enquiry row links to a 404. |
| DL-6 | `enquiries/page.tsx:223` | `/enquiries/${enquiry.id}/costing` | No `/enquiries/[id]/costing` page exists. "Costing" button on surveyed enquiries is a dead link. |
| DL-7 | `enquiries/page.tsx:233` | `/enquiries/${enquiry.id}/report` | No `/enquiries/[id]/report` page exists. "View Quote" button on quoted enquiries is a dead link. |

**Impact:** DL-1 through DL-3 affect every user who clicks a survey-related notification — 3 of the most common notification types lead to 404 pages. DL-4 breaks the customer → quotation navigation flow. DL-5 through DL-7 are lower impact since the enquiries page itself uses hardcoded sample data.

---

## 3. Orphaned Pages

Pages that exist in the filesystem but **nothing links to them**.

| Page | Route | Status | Recommendation |
|---|---|---|---|
| `team/surveyors/page.tsx` | `/team/surveyors` | Redirect stub to `/admin/team` | **Remove** — nothing links here anymore |
| `team/surveyors/[id]/page.tsx` | `/team/surveyors/[id]` | Redirect stub to `/admin/team` | **Remove** — nothing links here anymore |
| `team/surveyors/new/page.tsx` | `/team/surveyors/new` | Redirect stub to `/admin/team` | **Remove** — nothing links here anymore |

These three pages only exist to redirect from old URLs. No internal link points to them. They can be safely deleted unless external bookmarks are a concern.

---

## 4. Orphaned API Routes

All 20 API routes have at least one frontend caller. **No orphaned API routes found.**

---

## 5. Navigation Issues

### Sidebar Navigation

The sidebar (defined in `components/layout.tsx`) contains 7 items:

| Label | Route | Has Working Page |
|---|---|---|
| Dashboard | `/` | Yes |
| Surveys | `/surveys` | Yes |
| Customers | `/customers` | Yes |
| Materials | `/materials` | Yes |
| Team | `/admin/team` | Yes |
| Calendar | `/calendar` | Yes |
| Settings | `/settings` | Yes |

**Issues:**

| # | Issue | Severity |
|---|---|---|
| NAV-1 | **Enquiries not in sidebar** — The `/enquiries` page exists and `/enquiries/new` is functional, but there is no sidebar link to reach the enquiries section. Users can only reach it by directly typing the URL. | Medium |
| NAV-2 | **No role-based nav visibility** — All 7 sidebar items are shown to all authenticated users (admin, office, surveyor). The admin page has an "Admin Only" warning banner but is still visible and accessible to all roles. | Low |

### Notification link_url Patterns

| Notification Type | link_url | Target Exists? | Issue |
|---|---|---|---|
| `survey_created` | `/projects/${id}` | **NO** | Should be `/surveys/${id}` |
| `survey_assigned` | `/projects/${id}` | **NO** | Should be `/surveys/${id}` |
| `survey_completed` | `/projects/${id}` | **NO** | Should be `/surveys/${id}` |
| `quotation_generated` | `/survey/${id}/costing` | Yes | OK |
| `quotation_sent` | `/survey/${id}/costing` | Yes | OK |
| `quotation_viewed` | `/survey/${id}/costing` | Yes | OK |
| `quotation_accepted` | `/survey/${id}/costing` | Yes | OK |
| `quotation_declined` | `/survey/${id}/costing` | Yes | OK |
| `report_published` | `/survey/${id}/report` | Yes | OK |
| `report_sent` | `/survey/${id}/report` | Yes | OK |
| `report_viewed` | `/survey/${id}/report` | Yes | OK |
| `enquiry_created` | `/enquiries` | Yes | OK (links to list, not detail) |
| `booking_reminder` | `/calendar` | Yes | OK |

### User Flow Traces

#### A. Survey Lifecycle
```
Dashboard → /survey/new → /surveys/${id}         ✅
  → /survey/${id}/wizard → /survey/${id}/costing  ✅
  → /survey/${id}/quotation/${qid}                ✅
```
**Status:** Working. All transitions have valid target pages.

#### B. Report Lifecycle
```
/surveys/${id} → /survey/${id}/report → Generate → Publish → Send
```
**Status:** Working. Report editor, generation, publish, and email send all function correctly.

#### C. Calendar Flow
```
Sidebar → /calendar → Click booking → Modal → "View Survey" → /surveys/${booking.survey_id}
```
**Status:** Working.

#### D. Customer Flow
```
Sidebar → /customers → /customers/${id}
  → Click survey in history → /surveys/${s.id}    ✅
  → Click quotation → /surveys/${q.survey_id}/quotation  ❌ 404 (DL-4)
  → Click "Book Survey" → /calendar               ✅
```
**Status:** Partially broken. Quotation link from customer detail page leads to 404.

#### E. Enquiry Flow
```
Sidebar → ❌ No sidebar link to /enquiries (NAV-1)
/enquiries → Click enquiry → /enquiries/${id}     ❌ 404 (DL-5)
/enquiries → Click "Costing" → /enquiries/${id}/costing  ❌ 404 (DL-6)
/enquiries → Click "View Quote" → /enquiries/${id}/report  ❌ 404 (DL-7)
/enquiries/new → Submit → /enquiries              ✅
```
**Status:** Largely broken. No sidebar link. Enquiry list uses hardcoded data. All row links and action buttons 404.

#### F. Settings Flow
```
Sidebar → /settings → /settings/company           ✅
  → /settings/notifications                        ✅
  → /settings/security                             ⚠️ Disabled ("Coming Soon", href="#")
  → /settings/appearance                           ⚠️ Disabled ("Coming Soon", href="#")
  → /admin (Database Admin)                        ✅
```
**Status:** Working. Coming Soon items are correctly disabled with `preventDefault()`.

#### G. Admin Flow
```
Sidebar → /admin/team → /admin/availability        ✅
/admin → /admin/materials                           ✅
/admin → /admin/rates                               ✅
```
**Status:** Working.

#### H. Public Pages
```
/q/[token] — Public quotation acceptance           ✅ Server component, no auth required
/report/[reportId]?token=... — Public report       ✅ Server component, token-gated
```
**Status:** Working. Both correctly render without authentication.

#### I. Notification Click-Through
```
survey_created → /projects/${id}                   ❌ 404
survey_assigned → /projects/${id}                  ❌ 404
survey_completed → /projects/${id}                 ❌ 404
All other notification types                       ✅ Valid targets
```
**Status:** 3 of 13 notification types link to dead routes.

---

## 6. Legacy / Stub Pages

| Page | Route | Issue |
|---|---|---|
| `enquiries/page.tsx` | `/enquiries` | Uses hardcoded `sampleEnquiries` array — not connected to the `enquiries` database table. Cannot show real enquiry data. |
| `team/surveyors/page.tsx` | `/team/surveyors` | Redirect stub — `redirect('/admin/team')` |
| `team/surveyors/[id]/page.tsx` | `/team/surveyors/[id]` | Redirect stub — `redirect('/admin/team')` |
| `team/surveyors/new/page.tsx` | `/team/surveyors/new` | Redirect stub — `redirect('/admin/team')` |

---

## 7. Missing Error Handling

| Category | Finding |
|---|---|
| `error.tsx` | **None anywhere** — no error boundaries at any route level. Unhandled errors will show the default Next.js error page. |
| `loading.tsx` | **None anywhere** — no loading skeletons at any route level. Page transitions have no loading indicators (each page manages its own `useState` loading state). |
| `not-found.tsx` | **None anywhere** — no custom 404 page. Dead links and mistyped URLs show the default Next.js 404. |
| `middleware.ts` | **Does not exist** — no middleware for session refresh, auth checks, or route protection. All auth is handled client-side by `ProtectedRoute` component. This means: (1) protected pages flash briefly before redirect, (2) session tokens are not refreshed on navigation, (3) expired sessions are only detected when a page mounts, not at the routing layer. |

---

## 8. Additional Observations

### Route Naming Inconsistency
The codebase uses two different URL prefixes for survey-related pages:
- `/surveys` (plural) — for the list and detail hub (`/surveys`, `/surveys/[surveyId]`)
- `/survey` (singular) — for all action sub-pages (`/survey/new`, `/survey/[projectId]/wizard`, `/survey/[projectId]/costing`, etc.)

This is deliberate and functional, but can be confusing. The param name also differs: `[surveyId]` vs `[projectId]`.

### CLAUDE.md References Stale Page
CLAUDE.md references `/admin/pricing-test` as a working page, but this directory no longer exists in the filesystem. The page was apparently removed. This is a documentation issue only — no code references it.

### Auth Gaps on AI API Routes
Three API routes have **no authentication check**:
- `/api/transcribe` (POST) — calls external Deepgram API
- `/api/polish-observation` (POST) — calls external OpenRouter API
- `/api/generate-report` (POST) — calls external OpenRouter API

These are not routing issues, but worth noting: anyone with the URL could invoke these endpoints and consume API credits.

---

## 9. Recommended Fixes (Prioritised)

### Critical (will cause visible 404 errors for real users)

| # | Fix | Files | Effort |
|---|---|---|---|
| FIX-1 | Update notification `link_url` from `/projects/${id}` to `/surveys/${id}` for `survey_created`, `survey_assigned`, `survey_completed` | `src/lib/notifications-server.ts` (lines 104, 123, 142) | 5 min |
| FIX-2 | Fix customer detail quotation link — either change to `/survey/${surveyId}/quotation/${quotationId}` (requires passing quotation ID) or link to `/survey/${surveyId}/costing` as the costing page shows quotation links | `src/app/customers/[customerId]/page.tsx:625` | 15 min |

### High (broken user-facing features)

| # | Fix | Files | Effort |
|---|---|---|---|
| FIX-3 | Either build `/enquiries/[id]` detail page or remove the dead links from the enquiry list. If enquiries are not in MVP scope, remove the enquiry list links and leave the "New Enquiry" form as a standalone. | `src/app/enquiries/page.tsx` | 30 min (to remove links) or 2-4 hours (to build detail page) |
| FIX-4 | Connect enquiry list page to the database `enquiries` table instead of hardcoded sample data | `src/app/enquiries/page.tsx` | 1-2 hours |
| FIX-5 | Add a custom `not-found.tsx` at the root level so dead links show a branded 404 page instead of the default Next.js one | `src/app/not-found.tsx` | 30 min |

### Medium (usability improvements)

| # | Fix | Files | Effort |
|---|---|---|---|
| FIX-6 | Add "Enquiries" to sidebar navigation | `src/components/layout.tsx` | 5 min |
| FIX-7 | Add `middleware.ts` for Supabase session refresh. This prevents session expiry during active use and avoids the auth flash on protected pages. | `src/middleware.ts` | 1-2 hours |
| FIX-8 | Add root-level `error.tsx` for graceful error handling | `src/app/error.tsx` | 30 min |

### Low (cleanup)

| # | Fix | Files | Effort |
|---|---|---|---|
| FIX-9 | Delete orphaned redirect stubs at `/team/surveyors/*` | 3 files in `src/app/team/` | 5 min |
| FIX-10 | Update CLAUDE.md to remove reference to `/admin/pricing-test` | `CLAUDE.md` | 2 min |
| FIX-11 | Add auth checks to `/api/transcribe`, `/api/polish-observation`, `/api/generate-report` | 3 API route files | 30 min |
| FIX-12 | Consider adding `loading.tsx` at key route levels for better UX during navigation | Multiple files | 1-2 hours |

---

*Generated by routing audit — 2026-03-03*
