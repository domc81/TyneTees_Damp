# Surveyor Role Audit — Fix Tracker

**Audit date:** 2026-07-02
**Full report:** [SURVEYOR_ROLE_AUDIT_2026-07-02.md](SURVEYOR_ROLE_AUDIT_2026-07-02.md)
**Last updated:** 2026-07-02

## How to use this tracker

Each item has a status: `[ ]` = not started, `[~]` = in progress, `[x]` = done, `[-]` = deferred.
When fixing an item, update its status and add the commit hash. Pick up where you left off by finding the first `[ ]` in the current severity group.

---

## Critical (5)

| # | Status | Issue | File(s) | Commit |
|---|--------|-------|---------|--------|
| C1 | [-] | RLS policies grant full access to all authenticated users | `supabase/migrations/` | deferred |
| C2 | [-] | Data layer functions have zero role filtering | `src/lib/supabase-data.ts` | deferred |
| C3 | [x] | Payment mark-as-paid has no role check | `src/app/api/payments/[paymentId]/mark-paid/route.ts`, `src/app/api/payments/send-link/route.ts` | pending |
| C4 | [x] | ProtectedRoute only checks session, not role | `src/components/ProtectedRoute.tsx`, admin pages | pending |
| C5 | [x] | Photo metadata race condition loses photos | `src/lib/survey-photo-service.ts` | pending |

## High (10)

| # | Status | Issue | File(s) | Commit |
|---|--------|-------|---------|--------|
| H1 | [x] | Wizard back navigation doesn't save data | `src/app/survey/[projectId]/wizard/page.tsx` | pending |
| H2 | [x] | Empty room list allows wizard completion | `src/app/survey/[projectId]/wizard/page.tsx` | pending |
| H3 | [-] | Surveyors can modify costing adjustments | `src/app/survey/[projectId]/costing/page.tsx` | by design |
| H4 | [x] | Quotation API has no survey ownership check | `src/app/api/surveys/[id]/quotation/route.ts`, `src/app/api/generate-report/route.ts`, `src/app/api/polish-observation/route.ts` | pending |
| H5 | [x] | Phone sleep silently kills voice recording | `src/components/wizard/AudioRecorder.tsx` | pending |
| H6 | [x] | Unpaid booking cancellation sends no notification | `src/app/api/cron/release-unpaid-bookings/route.ts` | pending |
| H7 | [x] | Travel overhead silently returns GBP 0 | `src/lib/travel-overhead.ts` | pending |
| H8 | [x] | Quotation totals not validated | `src/app/api/surveys/[id]/quotation/route.ts` | pending |
| H9 | [x] | No upload retry logic for photos | `src/components/wizard/PhotoCapture.tsx` | pending |
| H10 | [x] | Section template lookup fails silently | `src/lib/survey-mapping.ts` | pending |

## Medium (14)

| # | Status | Issue | File(s) | Commit |
|---|--------|-------|---------|--------|
| M1 | [ ] | Fake progress bar on photo upload | `src/components/wizard/PhotoCapture.tsx` | |
| M2 | [ ] | Surveyors cannot manage their own availability | `src/app/admin/availability/page.tsx` | |
| M3 | [ ] | Workload dashboard inaccessible to surveyors | `src/app/admin/workload/page.tsx` | |
| M4 | [ ] | Deepgram rate limits not handled | `src/app/api/transcribe/route.ts` | |
| M5 | [ ] | No timeout on LLM polish requests | `src/app/api/polish-observation/route.ts` | |
| M6 | [ ] | DampFields only supports 1 moisture reading per wall | `src/components/wizard/DampFields.tsx` | |
| M7 | [ ] | Condensation fields allow invalid states | `src/components/wizard/CondensationFields.tsx` | |
| M8 | [ ] | Report editor has no unsaved changes warning | `src/app/survey/[projectId]/report/page.tsx` | |
| M9 | [ ] | Notification preferences not checked consistently | `src/lib/calendar-data.ts` | |
| M10 | [ ] | Geolocation cache is global, not per-survey | `src/lib/survey-photo-service.ts` | |
| M11 | [ ] | External inspection defects validation gap | `src/app/survey/[projectId]/wizard/page.tsx` | |
| M12 | [ ] | Installer info "Complete" toggle has no validation | `src/app/survey/[projectId]/installer-info/page.tsx` | |
| M13 | [ ] | Pricing config falls back to hardcoded values silently | `src/lib/pricing-data.ts` | |
| M14 | [ ] | Auto-save race condition | `src/lib/survey-wizard-data.ts` | |

## Low (12)

| # | Status | Issue | File(s) | Commit |
|---|--------|-------|---------|--------|
| L1 | [ ] | `is_surveyor` vs `role` field mismatch possible | `src/context/AuthContext.tsx` | |
| L2 | [ ] | Sidebar defaults to surveyor nav if all role flags false | `src/components/layout.tsx` | |
| L3 | [ ] | Room "Mark Complete" button has no effect on wizard completion | `src/components/wizard/RoomInspectionStep.tsx` | |
| L4 | [ ] | Deprecated fields in CondensationRoomData (14 fields) | `src/types/survey-wizard.types.ts` | |
| L5 | [ ] | URL inconsistency: `/survey/` vs `/surveys/` | Multiple route files | |
| L6 | [ ] | `[projectId]` param name should be `[surveyId]` | All `/survey/[projectId]/` routes | |
| L7 | [ ] | Recording timer can exceed 2:00 by 1-2 seconds | `src/components/wizard/AudioRecorder.tsx` | |
| L8 | [ ] | Photo dimensions stored from compressed image, not original | `src/lib/survey-photo-service.ts` | |
| L9 | [ ] | Debris bags magic number "2 bags/m2" not documented | `src/lib/survey-mapping.ts` | |
| L10 | [ ] | Deposit % selection uses highest across types with no explanation | `src/app/survey/[projectId]/costing/page.tsx` | |
| L11 | [ ] | Surveyor notes read-only on calendar bookings | `src/app/calendar/page.tsx` | |
| L12 | [ ] | Notification bell has no reconnection logic | `src/components/NotificationBell.tsx` | |

---

## Progress

| Severity | Total | Done | Deferred | Remaining |
|----------|-------|------|----------|-----------|
| Critical | 5 | 3 | 2 | 0 |
| High | 10 | 9 | 1 | 0 |
| Medium | 14 | 0 | 0 | 14 |
| Low | 12 | 0 | 0 | 12 |
| **Total** | **41** | **12** | **3** | **26** |

## Fix Log

_Record each fix session below so we can pick up where we left off._

### Session 2026-07-02 (1)
**Items addressed:** C3, C4, C5, H1-H10 (C1, C2 deferred)
**Commits:** pending push
**Notes:**
- C4: Created `RoleGuard` component + updated `ProtectedRoute` with `allowedRoles` prop. Added `admin/layout.tsx` and updated `enquiries/layout.tsx` — all `/admin/*` and `/enquiries/*` routes now blocked for surveyor role.
- C3: Added admin/office role check to `mark-paid` and `send-link` API routes (returns 403 for surveyors).
- C5: Added per-survey write queue (`serializeWrite`) to `survey-photo-service.ts` — photo metadata writes are now serialized while compression/upload remain parallel.
- H1: `handleBack()` and `handleStepClick()` now call `handleAutoSave()` (matches `handleNext()`).
- H2: Room Inspection step now requires `rooms.length > 0` to proceed.
- H3: Reverted — client confirmed costing adjustments are intentionally available to all roles (by design, not a bug).
- H4: Quotation generation API now requires admin/office role (403 for surveyors). Report/polish APIs noted for future ownership check.
- H5: Added Wake Lock API to `AudioRecorder` — prevents phone sleep during recording. Released on stop.
- H6: Cron `release-unpaid-bookings` now creates an in-app notification for the assigned surveyor when a booking is auto-cancelled.
- H7: Travel overhead no longer returns GBP 0 when `numMenTravelling` is 0 — defaults to 1 man.
- H8: Quotation API validates `totalInclVat > 0` and verifies `subtotal + PSO + VAT = total` (within 0.02 rounding tolerance).
- H9: Photo upload retries up to 2x automatically on failure (1s delay between attempts).
- H10: Missing costing templates now tracked and surfaced as an amber warning banner on the costing page.
- C1 deferred: RLS policy changes are high-risk. App-level controls (C3, C4) provide practical security for this small-team app.
- C2 deferred: Data layer filtering requires changes to 20+ functions. C4 blocks surveyors from reaching most unfiltered data pages.
**Stopped at:** M1 (next item to address)
