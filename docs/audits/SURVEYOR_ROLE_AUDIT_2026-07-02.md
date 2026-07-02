# Surveyor Role Audit — 2026-07-02

## Scope

Every code path a surveyor touches: login, dashboard, survey wizard, voice/photo tools, costing, quotations, reports, calendar, installer info, notifications, settings, and all supporting API routes and data layer functions. Audit performed by impersonating a human surveyor and tracing all workflows end-to-end.

---

## Critical — Must Fix Before Next Surveyor Use

### C1. RLS Policies Grant Full Access to All Authenticated Users

**Files:** `supabase/migrations/00000000000000_initial_schema.sql`

All core tables (`customers`, `surveys`, `enquiries`, `quotations`, `survey_bookings`) use `USING (true) WITH CHECK (true)` — meaning any authenticated user can read, update, and delete everything. A surveyor can query all customers, all enquiries, all other surveyors' surveys. The entire RLS layer provides zero data isolation.

### C2. Data Layer Functions Have Zero Role Filtering

**File:** `src/lib/supabase-data.ts`

`getSurveys()`, `getCustomers()`, `getEnquiries()`, `getEnquiryPipelineStats()` — all return unfiltered data. Combined with C1, a surveyor sees everything in the system. No function checks the caller's role or filters by ownership.

### C3. Payment Mark-as-Paid Has No Role Check

**File:** `src/app/api/payments/[paymentId]/mark-paid/route.ts`

Any authenticated user can call this endpoint and mark any payment as paid. A surveyor can confirm survey fee payments and trigger booking confirmations. Only checks `auth.getUser()`, never checks role. Same issue on `/api/payments/send-link`.

### C4. ProtectedRoute Only Checks Session, Not Role

**File:** `src/components/ProtectedRoute.tsx`

The route guard only verifies a session exists. A surveyor who types `/admin/materials`, `/enquiries`, or `/customers` directly gets the full page. Individual pages have inconsistent guards — some check `isAdmin`, some don't. `/admin/page.tsx` itself has no guard at all.

### C5. Photo Metadata Race Condition Loses Photos

**File:** `src/lib/survey-photo-service.ts` (lines 247-276)

Read-modify-write on `survey_data.photos` array. Two concurrent uploads both read the old array, push their photo, and write back — the second write overwrites the first. Surveyor takes 5 photos rapidly, only 3 appear. The other 2 are orphaned in storage with no metadata.

---

## High — Significant Bugs or Security Gaps

### H1. Wizard Back Navigation Doesn't Save Data

**File:** `src/app/survey/[projectId]/wizard/page.tsx` (line 207-210)

`handleNext()` calls `handleAutoSave()` but `handleBack()` does not. If the surveyor edits Step 3, clicks Back, then Forward, Step 3 changes are lost if the 2-second debounce hasn't fired.

### H2. Empty Room List Allows Wizard Completion

**File:** `src/app/survey/[projectId]/wizard/page.tsx` (line 182-183)

`canProceedToNextStep()` returns `true` for Room Inspection with a TODO comment. A surveyor can complete a survey with zero rooms, pushing empty data to costing and reports.

### H3. Surveyors Can Modify Costing Adjustments

**File:** `src/app/survey/[projectId]/costing/page.tsx` (lines 403-416)

`handleAdjustmentChange` and `handleInclusionToggle` have no role check. A surveyor can adjust section costs by any percentage and toggle optional sections, then generate a quotation with manipulated prices.

### H4. Quotation API Has No Survey Ownership Check

**File:** `src/app/api/surveys/[id]/quotation/route.ts`

Any authenticated user can create quotations for any survey. Never verifies the user owns or is assigned to the survey. Same gap in `/api/generate-report` and `/api/polish-observation`.

### H5. Phone Sleep Silently Kills Voice Recording

**File:** `src/components/wizard/AudioRecorder.tsx`

No Wake Lock API usage. When the surveyor's phone screen locks mid-recording, MediaRecorder silently stops. The timer keeps counting. Surveyor returns to see "2:00" but only captured 30 seconds of audio. No indication of the problem.

### H6. Unpaid Booking Cancellation Sends No Notification

**File:** `src/app/api/cron/release-unpaid-bookings/route.ts`

When the cron job cancels expired provisional bookings, it does not notify the surveyor. The booking vanishes from their calendar with no explanation — no notification, no reason stored, no audit trail.

### H7. Travel Overhead Silently Returns GBP 0

**File:** `src/lib/travel-overhead.ts` (lines 73-81)

If `numMenTravelling` is 0 or missing, all overhead costs return 0 silently. A 50-mile job with 3 crew members gets quoted with zero travel cost. No error, no warning.

### H8. Quotation Totals Not Validated

**File:** `src/app/api/surveys/[id]/quotation/route.ts`

The API accepts totals from the request body without verification. Can send `totalInclVat: 0` or negative values. No check that subtotal + VAT = total.

### H9. No Upload Retry Logic for Photos

**File:** `src/components/wizard/PhotoCapture.tsx`

On upload failure (poor field network), no automatic retry, no queue. Error shown, surveyor must manually retry. Each retry recompresses the image (quality loss). No offline queue or localStorage persistence.

### H10. Section Template Lookup Fails Silently

**File:** `src/lib/survey-mapping.ts` (lines 125-129)

`createLineInput()` returns `null` if a template is missing from the database. That costing item silently disappears from the quotation. If someone deletes the `dpc_injection_traditional` template, DPC cost vanishes from all quotes — no error, no audit trail.

---

## Medium — UX, Workflow, and Data Integrity Issues

### M1. Fake Progress Bar on Photo Upload

**File:** `src/components/wizard/PhotoCapture.tsx` (lines 54-56)

Progress bar increments by 10% every 200ms to 90%, then hangs until actual upload completes. On slow networks, bar sits at 90% for 30+ seconds. Surveyor thinks upload is nearly done, moves on. Upload actually fails.

### M2. Surveyors Cannot Manage Their Own Availability

**File:** `src/app/admin/availability/page.tsx`

Under `/admin/` with admin/office guard. Surveyors have no way to set their working hours, request annual leave, or log sickness. Must ask admin for every absence.

### M3. Workload Dashboard Inaccessible to Surveyors

**File:** `src/app/admin/workload/page.tsx`

Surveyors cannot see their own capacity stats, booking counts, or utilisation. The data exists but the page is admin-only.

### M4. Deepgram Rate Limits Not Handled

**File:** `src/app/api/transcribe/route.ts`

No retry logic for 429 or 503 responses. If multiple surveyors transcribe simultaneously and hit rate limits, each gets a generic error with no retry guidance. Recording effort wasted.

### M5. No Timeout on LLM Polish Requests

**File:** `src/app/api/polish-observation/route.ts`

No `AbortController` or timeout on the OpenRouter fetch. If OpenRouter hangs, the surveyor's browser waits 60-120 seconds before timing out. Multiple clicks queue multiple orphaned requests, wasting API credits.

### M6. DampFields Only Supports 1 Moisture Reading Per Wall

**File:** `src/components/wizard/DampFields.tsx` (line 273)

Type defines `moisture_readings: MoistureReading[]` (array), but UI only writes to `[0]`. Surveyors can't record multiple readings per wall (top, middle, bottom of damp patch). Incomplete data for costing accuracy.

### M7. Condensation Fields Allow Invalid States

**File:** `src/components/wizard/CondensationFields.tsx`

Active extraction requires fan units but only shows a warning, doesn't block progression. Passive extraction allows count=0. Incomplete specs flow to quotation.

### M8. Report Editor Has No Unsaved Changes Warning

**File:** `src/app/survey/[projectId]/report/page.tsx`

No auto-save, no `beforeunload` warning. Surveyor edits a report section, closes the tab — edits are lost. No "You have unsaved changes" prompt.

### M9. Notification Preferences Not Checked Consistently

**File:** `src/lib/calendar-data.ts`

`notifyBookingCreated()`, `notifyBookingUpdated()`, `notifyBookingCancelled()` don't check `notification_preferences` before creating notifications. The cron booking reminder does check. Inconsistent behaviour.

### M10. Geolocation Cache is Global, Not Per-Survey

**File:** `src/lib/survey-photo-service.ts` (lines 12-17)

5-minute cache on coordinates. If surveyor finishes one property and starts another within 5 minutes, photos at the new property are geotagged with the old property's coordinates.

### M11. External Inspection Defects Validation Gap

**File:** `src/app/survey/[projectId]/wizard/page.tsx` (lines 177-181)

If surveyor toggles "Building Defects Found = true" but selects zero defects, wizard allows progression. Defect urgency selector only appears when defects are selected, creating an incoherent state.

### M12. Installer Info "Complete" Toggle Has No Validation

**File:** `src/app/survey/[projectId]/installer-info/page.tsx`

Can mark as complete with zero fields filled in applicable categories. No validation that mandatory categories contain data.

### M13. Pricing Config Falls Back to Hardcoded Values Silently

**File:** `src/lib/pricing-data.ts` (lines 94-123)

If `pricing_config` table is empty or corrupted, engine uses hardcoded fallback rates (30.63/hr, 30% markup, etc.) without any warning. Costing page shows no indication of which values are defaults vs. configured.

### M14. Auto-Save Race Condition

**File:** `src/lib/survey-wizard-data.ts` (lines 119-142)

`saveWizardData()` reads existing `survey_data`, merges, and writes back. Two concurrent saves (slow network, rapid edits) can overwrite each other's changes. No optimistic locking.

---

## Low — Polish and Minor Issues

### L1. `is_surveyor` vs `role` Field Mismatch Possible

**File:** `src/context/AuthContext.tsx`

AuthContext checks `is_surveyor` boolean, layout uses `role` string. If they diverge (e.g. `role='surveyor'` but `is_surveyor=false`), behaviour is inconsistent.

### L2. Sidebar Defaults to 'surveyor' Nav if All Role Flags False

**File:** `src/components/layout.tsx`

If `isAdmin=false`, `isOffice=false`, `isSurveyor=false` (null profile edge case), sidebar shows surveyor navigation items.

### L3. Room "Mark Complete" Button Has No Effect on Wizard Completion

**File:** `src/components/wizard/RoomInspectionStep.tsx`

Surveyors can mark rooms as "complete" but this flag is never checked by wizard completion logic. Cosmetic only — creates confusion about whether it's required.

### L4. Deprecated Fields in CondensationRoomData (14 fields)

**File:** `src/types/survey-wizard.types.ts` (lines 276-291)

14 deprecated fields remain in the type definition. Old surveys may have them; new surveys won't populate them. Maintenance debt.

### L5. URL Inconsistency: `/survey/` (singular) vs `/surveys/` (plural)

**Files:** Multiple route files

Survey list at `/surveys`, detail at `/surveys/[id]`, wizard at `/survey/[projectId]/wizard`. Confusing navigation pattern.

### L6. `[projectId]` Param Name Should Be `[surveyId]`

**Files:** All `/survey/[projectId]/` routes

Historical naming — the param is actually a survey ID. Causes confusion when reading code.

### L7. Recording Timer Can Exceed 2:00 by 1-2 Seconds

**File:** `src/components/wizard/AudioRecorder.tsx`

`recordingTimeRef` updates after state function completes. Multiple setInterval ticks during heavy UI work can cause the timer to exceed `MAX_RECORDING_SECONDS` slightly.

### L8. Photo Dimensions Stored from Compressed Image, Not Original

**File:** `src/lib/survey-photo-service.ts`

If original is 4000x3000 and compressed to 1920x1440, stored metadata shows 1920x1440. Original resolution lost.

### L9. Debris Bags Magic Number "2 bags/m2" Not Documented

**File:** `src/lib/survey-mapping.ts`

Hardcoded `totalStripOutArea * 2` with no source comment referencing the workbook origin.

### L10. Deposit % Selection Uses Highest Across Types With No Explanation

**File:** `src/app/survey/[projectId]/costing/page.tsx`

If damp = 30% and condensation = 50%, deposit shows 50% with no explanation of why.

### L11. Surveyor Notes Read-Only on Calendar Bookings

**File:** `src/app/calendar/page.tsx`

Surveyors can't add notes to their bookings. Must contact office.

### L12. Notification Bell Has No Reconnection Logic

**File:** `src/components/NotificationBell.tsx`

If Supabase realtime subscription drops, no automatic reconnection. Surveyor misses notifications until page refresh.

---

## Statistics

| Severity | Count |
|----------|-------|
| Critical | 5 |
| High | 10 |
| Medium | 14 |
| Low | 12 |
| **Total** | **41** |

**Systemic themes:**
1. **Authorization is cosmetic** — sidebar hides links but nothing prevents direct URL access or API calls, and RLS is effectively disabled
2. **Field reliability** — voice recording, photo upload, and auto-save all have failure modes that lose surveyor work silently on real mobile devices with poor connectivity
