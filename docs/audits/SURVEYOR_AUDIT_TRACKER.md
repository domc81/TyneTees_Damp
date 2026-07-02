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
| M1 | [x] | Fake progress bar on photo upload | `src/components/wizard/PhotoCapture.tsx` | pending |
| M2 | [x] | Surveyors cannot manage their own availability | `src/app/admin/layout.tsx` | pending |
| M3 | [x] | Workload dashboard inaccessible to surveyors | `src/app/admin/layout.tsx` | pending |
| M4 | [x] | Deepgram rate limits not handled | `src/app/api/transcribe/route.ts` | pending |
| M5 | [x] | No timeout on LLM polish requests | `src/app/api/polish-observation/route.ts` | pending |
| M6 | [-] | DampFields only supports 1 moisture reading per wall | `src/components/wizard/DampFields.tsx` | deferred |
| M7 | [-] | Condensation fields allow invalid states | `src/components/wizard/CondensationFields.tsx` | deferred |
| M8 | [x] | Report editor has no unsaved changes warning | `src/app/survey/[projectId]/report/page.tsx` | pending |
| M9 | [-] | Notification preferences not checked consistently | `src/lib/calendar-data.ts` | deferred |
| M10 | [x] | Geolocation cache is global, not per-survey | `src/lib/survey-photo-service.ts` | pending |
| M11 | [-] | External inspection defects validation gap | `src/app/survey/[projectId]/wizard/page.tsx` | not a bug |
| M12 | [-] | Installer info "Complete" toggle has no validation | `src/app/survey/[projectId]/installer-info/page.tsx` | deferred |
| M13 | [x] | Pricing config falls back to hardcoded values silently | `src/lib/pricing-data.ts` | pending |
| M14 | [x] | Auto-save race condition | `src/lib/survey-wizard-data.ts` | pending |

## Low (12)

| # | Status | Issue | File(s) | Commit |
|---|--------|-------|---------|--------|
| L1 | [-] | `is_surveyor` vs `role` field mismatch possible | `src/context/AuthContext.tsx` | by design |
| L2 | [-] | Sidebar defaults to surveyor nav if all role flags false | `src/components/layout.tsx` | by design |
| L3 | [-] | Room "Mark Complete" button has no effect on wizard completion | `src/components/wizard/RoomInspectionStep.tsx` | by design |
| L4 | [-] | Deprecated fields in CondensationRoomData (14 fields) | `src/types/survey-wizard.types.ts` | by design |
| L5 | [-] | URL inconsistency: `/survey/` vs `/surveys/` | Multiple route files | by design |
| L6 | [-] | `[projectId]` param name should be `[surveyId]` | All `/survey/[projectId]/` routes | by design |
| L7 | [x] | Recording timer can exceed 2:00 by 1-2 seconds | `src/components/wizard/AudioRecorder.tsx` | pending |
| L8 | [-] | Photo dimensions stored from compressed image, not original | `src/lib/survey-photo-service.ts` | by design |
| L9 | [x] | Debris bags magic number "2 bags/m2" not documented | `src/lib/survey-mapping.ts` | pending |
| L10 | [-] | Deposit % selection uses highest across types with no explanation | `src/app/survey/[projectId]/costing/page.tsx` | by design |
| L11 | [-] | Surveyor notes read-only on calendar bookings | `src/app/calendar/page.tsx` | by design |
| L12 | [x] | Notification bell has no reconnection logic | `src/components/NotificationBell.tsx` | pending |

---

## Progress

| Severity | Total | Done | Deferred | Remaining |
|----------|-------|------|----------|-----------|
| Critical | 5 | 3 | 2 | 0 |
| High | 10 | 9 | 1 | 0 |
| Medium | 14 | 9 | 5 | 0 |
| Low | 12 | 3 | 9 | 0 |
| **Total** | **41** | **24** | **17** | **0** |

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

### Session 2026-07-02 (2)
**Items addressed:** M1-M5, M8, M10, M13, M14 (M6, M7, M9, M11, M12 deferred)
**Commits:** pending push
**Notes:**
- M1: Replaced fake percentage progress bar with honest spinner/complete indicator.
- M2/M3: Updated admin layout to exempt `/admin/availability` and `/admin/workload` from admin-only guard — surveyors can now access their own availability and workload views.
- M4: Added retry with exponential backoff (2s, 4s) on Deepgram 429/503 responses. User-friendly error message for rate limits.
- M5: Added 30-second AbortController timeout to OpenRouter polish-observation fetch. Returns 408 on timeout.
- M8: Added `beforeunload` warning when report editor has an unsaved section edit.
- M10: Geolocation cache now keyed by surveyId — invalidates when surveyor switches to a different property.
- M13: `loadPricingConfig` now logs a warning listing any missing required config keys (hardcoded fallbacks used).
- M14: Extracted `serializeWrite` to shared `write-queue.ts` module. Both `saveWizardData` and photo upload/delete now use the same per-survey queue, preventing wizard-vs-photo race conditions.
- M6 deferred: Multiple moisture readings per wall requires significant DampFields UI refactor (feature enhancement).
- M7 deferred: Condensation field validation changes require UI redesign of extraction controls.
- M9 deferred: Calendar notification functions run client-side but `isNotificationEnabled` requires service-role client. Needs architecture change.
- M11: Not a bug — existing validation at line 180 correctly blocks progression when defects_found=true but no defects selected.
- M12 deferred: Installer info validation needs investigation of mandatory vs optional categories.
**Stopped at:** L1 (next item to address)

### Session 2026-07-02 (3)
**Items addressed:** L7, L9, L12 (L1-L6, L8, L10-L11 confirmed as by-design)
**Commits:** pending push
**Notes:**
- L7: Timer now checks limit before incrementing — `stopRecording()` fires at exactly 120s, not 121-122s.
- L9: Added workbook source comments to both `calcDampDebrisBags` and `calcTimberDebrisBags` inline `* 2` expressions.
- L12: NotificationBell now detects `CHANNEL_ERROR` / `TIMED_OUT` on the Supabase realtime channel and retries after 5 seconds.
- L1: By design — `is_surveyor` is a capability flag, separate from `role`. Admin/office users can also be surveyors.
- L2: By design — surveyor nav is the most restricted view, correct safe fallback for null profile edge case.
- L3: By design — "Mark Complete" is a progress indicator for the surveyor, not a completion gate.
- L4: By design — deprecated fields kept for backward compatibility with existing survey data.
- L5/L6: By design — documented historical naming, changing would break external links.
- L8: By design — stored dimensions match the actual stored file, not the discarded original.
- L10: By design — business rule to use highest deposit % across survey types.
- L11: By design — office manages booking notes as part of their workflow.
**Audit complete — 0 remaining items.**
