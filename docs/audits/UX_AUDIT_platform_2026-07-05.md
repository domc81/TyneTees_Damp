# UX Audit — Platform (internal users) — 2026-07-05

- **Project:** TyneTees Damp Proofing Survey System — https://ttdp.dc81.io
- **Skill:** `ux-audit-platform` (method: `app-dc81/docs/UX_AUDIT_STANDARD.md`)
- **Date:** 2026-07-05
- **Viewports:** desktop 1440×900 (journeys 5, 7, 8); mobile 390×844 (journey 6 — wizard is used on-site)
- **Journeys:** 5 (enquiry→booked) ✅ · 6 (survey wizard) ✅ · 7 (costing→quotation ✅, report→approve&send ❌ blocked by P0-1) · 8 (pipeline triage) ✅
- **Steel session:** isolated (`495a050d…`), created 14:03 UTC, deleted after the run
- **Accounts:** UX Audit Office (office role), UX Audit Surveyor (surveyor role) — all actions on the `UX-AUDIT Test Customer` enquiry CF-DAMP-2026-0005 / survey TT-2026-0026 only
- **Evidence screenshots:** `/home/dominic/app-dc81/logs/ux-audits/ttdp-2026-07-05/` (never committed)

## Executive summary

The happy path is genuinely good: the drawer's NEXT panel tells staff what to do at every stage, statuses auto-advance, notifications fire, and the wizard's room-first flow is well-structured on a phone. But the audit found **two flow-breaking P0s**: report generation never starts (the report page spins forever, which also blocks Approve & Send — the office cannot send anything to a customer), and the wizard's Polish button calls an API route that doesn't exist. Both fail **silently**, which is the recurring theme: Approve & Send's helpful server error is shown as an empty toast, and stage jumps in the Kanban happen with no confirmation or feedback. A third structural gap: the customer is never emailed the £150 payment link at booking and the office has no way to see, copy, or send it — "Awaiting Payment" waits for a payment the customer doesn't know about.

**Counts:** 2× P0 · 6× P1 · 8× P2 · 3× P3.
**Single most important fix:** make report generation actually fire (P0-1) — everything customer-facing is downstream of it.

**Fixes applied during/after the audit run** (commits alongside this report): both P0 root causes (deprecated OpenRouter model → `google/gemini-2.5-flash`; report-generation fetch pointed at `localhost:3000` → relative URL) and the P1-2 email constraint (migration `20260705000002`). All other findings are recommendations only.

## Findings table

| ID | Sev | Surface | Summary |
|---|---|---|---|
| P0-1 | P0 | Report page | "Generating report…" spins forever; no generation request is ever issued — office cannot produce a report, which also blocks Approve & Send |
| P0-2 | P0 | Wizard (Polish) | Polish button calls `/api/polish-observation` → 404; feature is dead in production and fails silently |
| P1-1 | P1 | Booking / payments | Customer is never emailed the survey-fee payment link at booking; no UI affordance to send/copy it — "Awaiting Payment" stalls silently |
| P1-2 | P1 | Convert & Book | `customers.valid_email` constraint rejected `+`-addressed emails and >4-char TLDs that the enquiry form accepts; booking dead-ends with a raw Postgres error (**fixed during audit**, migration `20260705000002`) |
| P1-3 | P1 | Enquiry drawer | Approve & Send failure leaves no durable feedback — the server's actionable message ("Report must be published…") was never captured on screen |
| P1-4 | P1 | Kanban board | "Move to…" allows any stage jump; Survey Complete → Won applies with no confirmation, no toast, and `won_at` stays NULL — silent bad data (Lost, by contrast, is properly guarded with a reason dialog) |
| P1-5 | P1 | Wizard photos | Defect photo visibility defaults to "Customer Report"; after upload there is no tier badge, no way to view/change/delete a photo — a mis-tiered technician photo is invisible and unfixable on site |
| P1-6 | P1 | Booking wizard | Surveyor list offers users who are inactive and/or not surveyors (e.g. profile with `is_active=false`, `is_surveyor=false`); office can book jobs against someone who never logs in |
| P2-1 | P2 | Booking wizard | "Set up availability" escape hatch navigates away in the same tab (wizard progress lost) to a page that is **view-only for office** ("admin access required to edit") — office can't book a new surveyor's first job without an admin |
| P2-2 | P2 | Booking wizard | Confirm step and success screen show an **empty Surveyor row** (the one field worth double-checking); DB saves it correctly |
| P2-3 | P2 | App shell | Sidebar user card always reads "Tyne Tees Damp Proofing / Admin" regardless of who is logged in — staff can't tell which account or role they're using |
| P2-4 | P2 | Enquiry drawer | Records tab showed "No linked customer record" immediately after Convert & Book created and linked the customer (stale until reopened) |
| P2-5 | P2 | Wizard Review | Inspection date renders US-format "7/6/2026" (reads as 7 June to UK staff); rest of the app uses UK format |
| P2-6 | P2 | Booking wizard | Schedule step always opens on the current week — by late week nearly every visible day is "Past"; user must page forward every time |
| P2-7 | P2 | New Lead form | Validation reveals one error at a time at the bottom of the form (submit → "Site address is required" → fix → submit → next error) |
| P2-8 | P2 | Wizard (mobile) | After Complete Survey the surveyor is dropped onto the desktop-oriented Costing page (full pricing) with no "survey submitted" confirmation |
| P3-1 | P3 | Dashboard/Timeline | Raw status slugs in user-facing activity feeds: "Status changed from awaiting_payment to booked" |
| P3-2 | P3 | Wizard header | Header shows "Project #fff3204b" (UUID fragment) instead of TT-2026-0026 |
| P3-3 | P3 | Terminology | The same object is "Pipeline" (nav), "Enquiry Pipeline" (title), "Lead" (New Lead / Create Lead), "enquiry" (counters); booking status is "Booked" (column), "Confirmed" (drawer), "Scheduled" (survey page) |

## Finding detail

### P0-1 — Report generation never starts; report page hangs forever
- **Where:** `/survey/fff3204b…/report` (journey 7, step "Review Report" from the drawer, and again via the Costing page's "Generate Report" button)
- **Expected:** landing on the report page for a completed survey generates the LLM report (or shows an actionable error).
- **Actual:** "Generating report…" spinner indefinitely (waited 2×90–120 s, reloaded, retried from both entry points). Network capture shows the page reads `survey_reports` (406 = no row), `surveys`, `survey_rooms`, `report_templates` — then **issues no further request**. No console error. No generation POST is ever sent. Because no report can be created, Approve & Send always 400s → the office cannot send anything to the customer.
- **Evidence:** `j7-04-report-tab.png`, `j7-05-report-generated.png` (still spinning after 120 s), `j7-08-report-wait2.png`; network log in audit transcript: after `report_templates?select=*&survey_type=eq.damp&is_default=eq.true` (200) no `/api/` call follows.
- **Root cause (post-run):** two stacked defects.
  1. `src/lib/report-generator.ts:1095-1097` (and again at `:2113-2115`) built the generation URL from `NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'`. That env var is **not set in the Coolify build**, and `NEXT_PUBLIC_*` is inlined into client bundles at build time — verified by grepping the deployed chunk (`page-ffe9bb2f….js` contains the literal `http://localhost:3000`). Production browsers were POSTing the report-generation request to **the user's own machine**; it never reached the app. (On a typical office PC this fails fast and the code would fall back to a placeholder executive summary — i.e. the LLM summary has likely never worked in production; in the audit browser the localhost request never settled, hence the eternal spinner.)
  2. Even when the request does reach the server, `src/app/api/generate-report/route.ts:204` used OpenRouter model `x-ai/grok-4.1-fast`, which OpenRouter now rejects with 404 "Grok 4.1 Fast is deprecated" (verified by direct API call).
- **Fix applied during audit:** both fetches switched to relative `/api/generate-report`; model switched to `google/gemini-2.5-flash` (verified working against the account's OpenRouter data policy — all grok models are currently blocked by it). Residual recommendations: surface generation failures on the page (the error state exists but a never-settling fetch bypasses it — add an AbortController timeout like the polish route has), and set `NEXT_PUBLIC_APP_URL` in the Coolify env (also used by handover-pack and payment-link emails, which currently fall back to `''`).

### P0-2 — Polish button is dead: `/api/polish-observation` 404, silent
- **Where:** wizard step 2 (External Inspection) and step 3 (Room Observations), "✨ Polish" button
- **Expected:** observation text is rewritten by the LLM, or a visible error appears.
- **Actual:** `POST /api/polish-observation` → **404**. Text unchanged, no spinner state, no toast — clicking Polish does nothing perceptible. A surveyor would click repeatedly and give up.
- **Evidence:** `j6-10-polish-clicked.png` vs `j6-11-polished.png` (identical); network capture `(404, '/api/polish-observation')`.
- **Root cause (post-run):** the route exists and requires auth (curl gives 401) — the 404 is `src/app/api/polish-observation/route.ts:171` passing through **OpenRouter's 404 for the deprecated `x-ai/grok-4.1-fast` model**. Confirmed by direct OpenRouter call: `{"error":{"message":"Grok 4.1 Fast is deprecated…","code":404}}`.
- **Fix applied during audit:** model switched to `google/gemini-2.5-flash` (route.ts:139). Residual recommendation: the wizard's Polish click handlers (`components/wizard/ExternalInspectionStep.tsx:71`, `RoomInspectionStep.tsx:115`) must show an error toast on non-OK responses — the silent no-op is what turned an API failure into a dead-feeling button.

### P1-1 — Customer never receives the survey-fee payment link
- **Where:** Convert & Book completion → enquiry in "Awaiting Payment" (journey 5)
- **Expected:** per the surface map, the customer gets a Resend email with their `/pay/[token]` link at booking; office can see that it was sent and resend/copy it.
- **Actual:** booking created the £150 `survey_fee` payment row (`payments`, status pending, token generated) but `communication_log` has **zero rows** for this enquiry — no email was sent at any point in the lifecycle. The drawer's NEXT panel only offers "Mark as Paid"; there is no "send payment link", no copy-link, and nothing indicates whether the customer was ever asked to pay. The quotation page (contrast) has explicit Copy Link / Send to Customer buttons.
- **Evidence:** `j5-24-after-continue.png`, `j5-26-records.png`; DB: `payments` row created 14:19 UTC, `communication_log` empty for the enquiry.
- **Suggested fix:** the email route **already exists** — `src/app/api/payments/send-link/route.ts` builds a proper survey-fee email with the `/pay/[token]` link — but nothing in the UI calls it (zero callers outside `app/api/`). Wire it into booking completion and add Send/Copy Link buttons to the drawer's payment section. Caution: its `appUrl` falls back to `''` when `NEXT_PUBLIC_APP_URL`/`NEXT_PUBLIC_SITE_URL` are unset (route.ts:110) — the emailed link would be a broken relative path; set the env var in Coolify first.

### P1-2 — `valid_email` constraint rejects valid emails at the conversion step (fixed)
- **Where:** Convert & Book wizard, "Confirm & Book" (journey 5)
- **Expected:** an email the enquiry form accepted can be booked.
- **Actual:** `Failed to create customer: new row for relation "customers" violates check constraint "valid_email"` shown verbatim in the wizard. The constraint regex `^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$` rejected `+` in the local part and TLDs >4 chars. The enquiries table has no such check → office enters the email once, it fails 4 steps later at the final confirm, with DBA-speak for an error message.
- **Evidence:** `j5-22-after-book.png` (error banner); constraint definition captured from `pg_constraint`.
- **Fix applied during audit:** constraint relaxed to `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$` on the live DB + migration `supabase/migrations/20260705000002_relax_customers_valid_email.sql`. Residual suggestion: surface customer-creation errors in plain language.

### P1-3 — Approve & Send failure gives no durable feedback
- **Where:** enquiry drawer, Survey Complete state, "Approve & Send" (journey 7)
- **Expected:** if sending is blocked, the user learns why ("Report must be published before sending. Generate and publish the report first." — the API already returns exactly this).
- **Actual:** HTTP 400 with that JSON error; in two attempts, **no visible error was captured** — screenshots taken 5–6 s after the click show nothing, and the toast probe found only an empty-text toast element. The source handler (`components/EnquiryDrawer.tsx:1352-1353`) does call `toast.error(data.error…)`, so the message may render as a ~4 s toast that both probes missed — marked **PLAUSIBLE** rather than confirmed on the "empty toast" specific. What is confirmed: nothing in the drawer tells the user the send failed or what to do next, and the NEXT panel's own instruction ("Review the report") leads to the P0-1 hang.
- **Evidence:** `j7-10-approve-send.png`, `j7-11-approve-send-retry.png`; captured response body `{"error":"Report must be published before sending. Generate and publish the report first."}` vs captured toast content `['']`.
- **Suggested fix:** persist the blocking reason inside the workflow panel (e.g. inline warning under the button), not only in a transient toast — it is an actionable precondition, not a fleeting event.

### P1-4 — Unguarded stage jumps; manual "Won" leaves `won_at` NULL
- **Where:** Kanban card "Move to…" select (journey 8)
- **Expected:** business-critical transitions (→ Won, → Closed, backwards moves) confirm intent; Won sets the fields reporting relies on; some feedback on success.
- **Actual:** Survey Complete → Won applied instantly: no confirmation, no toast; DB after the move: `status='won'`, `won_at=NULL`, no deposit exists. Backwards move (Won → Survey Complete) equally silent. One mis-tap on a dropdown silently fabricates or destroys a "won job". Credit where due: **Lost is guarded** — it opens a "Mark Enquiry as Lost" dialog with an optional reason (`j8-09-lost-dialog.png`); Won deserves at least the same guard, plus setting `won_at`.
- **Evidence:** `j8-03-move-to-won.png` (instant Won), `j8-09-lost-dialog.png` (contrast); DB query before/after captured in transcript.
- **Suggested fix:** `app/enquiries/page.tsx` — `moveCard` (≈1448-1472) calls `updateEnquiryStatus` unconditionally; add a confirm step for `won`/`closed` (reuse the Lost dialog pattern) and call `markEnquiryWon` (`lib/supabase-data.ts:815`) instead of the bare status update so `won_at` is set; show a success toast for any move.

### P1-5 — Photo visibility: customer-visible by default, invisible and immutable after upload
- **Where:** wizard step 3, defect-evidence photo upload (journey 6). Manifest flags this check explicitly: *customer must never see technician photos.*
- **Expected:** the tier of every photo is visible at a glance and correctable; the risky direction (photo reaching the customer) should be the deliberate choice.
- **Actual:** upload dialog defaults Visibility to **"Customer Report"** — zero clicks put any photo in front of the customer; marking "Technician Only" is the extra step. After upload, thumbnails carry **no tier badge**, and tapping a thumbnail does nothing — there is no way to view, re-tier, or delete a photo from the wizard. A mis-tiered moisture-meter shot is undetectable and unfixable on site. (DB stores tiers correctly: `visibility: "customer"` / `"technician"` both persisted.)
- **Evidence:** `j6-22-defect-photo.png` (dialog, default selected), `j6-25-two-photos.png` (badge-less thumbnails), `survey_data.photos[]` JSONB captured in transcript. Also note the dialog is semi-transparent — page text bleeds through it (readability, same screenshot).
- **Suggested fix:** `components/wizard/PhotoCapture.tsx` — render a tier badge on each thumbnail (visibility is already on the photo object), make tapping a thumbnail open a detail view with editable description/visibility + delete (the existing Delete button at :245-250 is hover-only, unusable on touch), and consider defaulting defect-evidence uploads to a neutral choice that forces a decision, or at least a visible per-photo "customer-visible" indicator at capture time (default set at :44).

### P1-6 — Inactive non-surveyors offered in the surveyor list
- **Where:** Convert & Book wizard, Surveyor step (journey 5)
- **Expected:** only active, surveyor-flagged profiles are bookable.
- **Actual:** the list offered a profile with `is_active=false` and `is_surveyor=false` (an admin who was deactivated). Booking against them would create appointments no one will attend.
- **Evidence:** `j5-09-surveyor-step.png` (list shows the profile); `user_profiles` flags captured in transcript.
- **Suggested fix:** filter the surveyor dropdown's `user_profiles` query on `is_active = true AND is_surveyor = true` (booking wizard surveyor step + SlotPicker's selector).

### P2-1 — Availability escape hatch loses the wizard and lands office on a read-only page
- **Where:** Convert & Book → Schedule step → "No working hours configured for this surveyor" → "Set up availability" (journey 5)
- **Expected:** office can resolve the block, or at least not lose their progress finding out they can't.
- **Actual:** the link navigates the same tab to `/admin/availability`, abandoning the wizard (selection lost, must restart). That page's weekly-hours editor is **"View-only — admin access required to edit"** for the office role — the wizard sent the office user to a dead end. A new surveyor cannot take their first booking until an admin intervenes.
- **Evidence:** `j5-10-schedule-step.png`, `j5-11-availability-page.png` (view-only banner).
- **Suggested fix:** `components/calendar/SlotPicker.tsx:354-359` — add `target="_blank"` to the Link at minimum; and decide whether office should edit working hours (they own booking): `app/admin/availability/page.tsx:283` gates editing with `canEdit={isAdmin}` — either extend to `isAdmin || isOffice`, or change the wizard copy to "ask an admin to set up availability".

### P2-2 — Surveyor row empty on Confirm and success screens
- **Where:** Convert & Book, steps 4 and the "Survey Booked" screen (journey 5)
- **Expected:** the Confirm step exists to double-check; Surveyor is the field most worth checking.
- **Actual:** "Surveyor" label renders with an empty value on both screens even though the selection was made and saved correctly (booking row has the right `surveyor_id`).
- **Evidence:** `j5-21-confirm-step.png`, `j5-23-after-book-2.png`; DB booking row in transcript.
- **Suggested fix:** `components/EnquiryDrawer.tsx:2274-2275` and `:2062-2063` render `flowSlot.surveyorName`, which `SlotPicker` only fills when the surveyor is re-picked *inside* it (its internal name state starts `''` and `defaultSurveyorId` doesn't set it) — render the wizard's own `flowSurveyorName` (set at :2199) instead.

### P2-3 — Sidebar user card shows the company + "Admin" for every user
- **Where:** app shell, all pages, both roles (journeys 5–8)
- **Expected:** the card shows the logged-in user's name and role.
- **Actual:** office account and surveyor account both show "Tyne Tees Damp Proofing / Admin". With shared devices/multiple accounts, staff cannot tell who is signed in; a surveyor is told they're an "Admin".
- **Evidence:** `j5-11-availability-page.png` (office), `j6-02-surveyor-home.png` + DOM text capture (surveyor): sidebar reads `TT | Tyne Tees Damp Proofing | Admin`.
- **Suggested fix:** `components/layout.tsx:114-122` — lines 117/120 render `companyProfile.trading_name || name` and line 121 is a hardcoded `Admin` literal; render the auth profile's `display_name` and actual role (already available from `useAuth()` in the same component).

### P2-4 — Records tab claims "No linked customer record" right after conversion
- **Where:** enquiry drawer → Records tab, immediately after Convert & Book (journey 5)
- **Expected:** conversion just created and linked the customer; Records should show it.
- **Actual:** "No linked customer record" while `enquiries.customer_id` was already set. Correct after closing/reopening the drawer later. Staff seeing this could re-create the customer.
- **Evidence:** `j5-26-records.png`; DB `customer_id` capture at the same timestamp.
- **Suggested fix:** `components/EnquiryDrawer.tsx` — the Records tab gates on the `enquiry.customer_id` **prop** from the board (:2789, :2800) and `loadLinked` (:907-939) never re-fetches the enquiry row (its `linkedLoaded` guard is also a stale closure when the success screen calls `setLinkedLoaded(false); loadLinked()` back-to-back at :2079-2080). Re-fetch the enquiry row inside `loadLinked`.

### P2-5 — US date format on wizard Review
- **Where:** wizard step 5, Site Details summary (journey 6)
- **Actual:** "7/6/2026" for 6 July 2026 — a UK reader parses this as 7 June. Booking screens elsewhere use "06/07/2026" / "Mon, 6 Jul 2026".
- **Evidence:** `j6-34-review.png`.
- **Suggested fix:** `components/wizard/ReviewStep.tsx:171` — `.toLocaleDateString()` has no locale argument (falls back to the runtime default, US); pass `'en-GB'` like the rest of the app.

### P2-6 — Schedule step opens on the (mostly past) current week
- **Where:** Convert & Book, Schedule step (journey 5)
- **Actual:** on a Sunday, all 7 visible days were "Past"/"No hours"; every booking starts with a click on the next-week arrow. Default to the first week containing a bookable slot.
- **Evidence:** `j5-18-schedule.png`.

### P2-7 — One-error-at-a-time validation at the bottom of New Lead
- **Where:** New Lead modal (journey 5)
- **Actual:** submit with several gaps → single message "Site address is required" at the bottom; fix it, submit again → next error. Fields are starred but not individually highlighted on error.
- **Evidence:** `j5-06-after-create.png` (first error state).
- **Suggested fix:** validate all fields per submit and mark each offending field inline.

### P2-8 — Post-submit, surveyor lands on the pricing screen with no confirmation
- **Where:** wizard step 5 "Complete Survey" (journey 6, mobile)
- **Actual:** no "survey submitted" acknowledgement; immediate redirect to the Costing page — a dense desktop table of material/labour prices on a phone. The surveyor's job is done but the UI doesn't say so, and it hands them office work (and full pricing visibility) instead.
- **Evidence:** `j6-36-completed.png`.
- **Suggested fix:** show a completion confirmation with "what happens next"; consider where the surveyor role should land (survey overview rather than costing).

### P3-1 — Raw status slugs in activity feeds
"Status changed from awaiting_payment to booked" on the dashboard Recent Activity and drawer Timeline. Use the display labels. Evidence: dashboard text capture, `j5-25-timeline.png`.

### P3-2 — Wizard header "Project #fff3204b"
UUID fragment where TT-2026-0026 exists and is shown everywhere else. Evidence: `j6-04-wizard-step1.png`. Fix: `app/survey/[projectId]/wizard/page.tsx:429` renders `Project #{projectId.slice(0, 8)}` (same pattern at `costing/page.tsx:711` and `report/page.tsx:512`) — render the survey's reference number instead.

### P3-3 — Terminology drift
Lead vs enquiry (New Lead button creates an "enquiry" in the "Enquiry Pipeline"); Booked/Confirmed/Scheduled for the same booking state on three surfaces. Pick one word per concept. Evidence: `j5-03-pipeline.png`, `j5-28-after-paid.png`, `j6-03-survey-page.png`.

## Journey logs

### Journey 5 — New enquiry → booked (office, desktop 1440×900)
Clean-path click count **13 clicks + 10 fields** (assuming surveyor availability exists): Pipeline (1) → New Lead (2) → 8 text fields + 2 selects → Create Lead (3) → [drawer auto-opens with NEXT: "Book a survey for this lead" — good] → Book Survey (4) → Next (5) → surveyor select → Next (6) → next-week arrow (7, always needed: P2-6) → slot (8) → Next (9) → Confirm & Book (10) → Continue (11) → Mark as Paid (12) → Confirm Paid (13). Toasts: "Lead created", "Survey fee marked as paid"; Confirm & Book success is a full-screen "Survey Booked" panel (good) with an empty Surveyor row (P2-2).
Hesitation/blocking points: staged validation (P2-7); zero surveyors with hours configured → availability dead end (P2-1); first Confirm & Book failed on the email constraint (P1-2 — clean-path count excludes this); no sign the customer was asked to pay (P1-1).
Auto-transitions New → Awaiting Payment → Booked worked and were visible on the board.

### Journey 6 — Survey wizard (surveyor, mobile 390×844)
Login → dashboard ("Welcome back, UX Audit Surveyor"; the test survey is top of Recent Projects) → survey page → Start Survey. Step 1: photo upload with progress + "Upload complete" (good); inspection date NOT prefilled (extra typing every survey); property fields fine. Step 2: defects toggle reveals a 17-item checklist (good); status chips Advisory/Recommended/Urgent have a one-line legend (good); Polish dead (P0-2); voice recording fails visibly when no mic ("Failed to start recording…" — graceful). Step 3: Add Room with Quick Select chips (good); Damp issue reveals treatment fields; wall measurements auto-compute area (10.08 m² — good live feedback); membrane section asks for wall lengths again after Affected Walls captured them (re-typing); defect photo dialog defaults to customer visibility, no post-upload management (P1-5), dialog transparency issue. Step 4: distance-from-office and men-travelling required; distance must be known by the surveyor (system knows both addresses). Step 5 Review: clear summary; US date (P2-5); proposal items and limitations checklists efficient. Complete Survey → lands on Costing with no confirmation (P2-8). Autosave indicator ("Saved 5:26:14 PM") visible throughout — good.
Mobile layout held up throughout; no horizontal scrolling; hamburger nav.

### Journey 7 — Costing → quotation → report → approve & send (office, desktop)
Costing page was already generated from wizard data (£385.22 inc VAT, itemised, travel overhead calculated from the 3 miles / 2 men entered on site — impressive). Generate Quotation: one click → QT-2026-0036 draft with customer preview, Copy Link / Send to Customer / Download PDF (good).
Report: drawer NEXT → "Review Report" (opens new tab) → spinner forever (P0-1), reproduced from the Costing page's Generate Report button. Approve & Send: 400 + empty toast (P1-3). **Journey blocked** — report editor, publish flow, and the send email could not be audited (see Untested).
Notifications fired for Survey Completed and Quotation Generated (bell badge + panel — good).

### Journey 8 — Pipeline triage (office, desktop)
"What needs my attention?": drawer NEXT panels answer it per-card; notifications answer it globally; column counts visible. Search filters live with a "Clear filters" affordance (good). Stage moves via card dropdown are unguarded and silent (P1-4). Stage names mostly clear; "Sent" is the vaguest (sent what?) and booking-state wording varies across surfaces (P3-3).

## Untested

| Item | Reason |
|---|---|
| Report editor, publish flow, section editing, sketch upload | Blocked by P0-1 — no report can be generated |
| Approve & Send success path + resulting customer email (and tokens for customer journeys 1–4) | Blocked by P0-1 (requires published report) |
| Voice note → Deepgram transcription | No microphone in the Steel browser; UI error path verified instead |
| Quotation "Send to Customer" | Deliberately not clicked standalone — the audited path is Approve & Send (blocked); avoiding a quote-only email that contradicts the combined flow |
| Kanban drag-and-drop | dnd-kit drag not reliably scriptable over CDP; stage moves exercised via the card dropdown instead |
| Payment page /pay/[token] | Customer surface — belongs to `ux-audit-customer` run |
| Calendar booking management (confirm/reschedule/no-show), CF handover export, /admin/rates & /admin/costing edits | Rates/costing read-only per manifest; calendar + handover exports on real records only — no safe test path this run (handover export allowed on test enquiry but requires the blocked report/quote send to be meaningful) |
| Concurrent edit behaviour | Not declared testable in the manifest |

## Audit-run notes (not app findings)

- Both audit accounts existed in `auth.users` but had **no `user_profiles` rows** — login failed with "No user profile found" until rows were provisioned directly in the DB. If accounts are provisioned again, create the profile row too (`~/.credentials/.ux-audit-credentials` unchanged).
- UX Audit Surveyor was given Mon–Sat 08:00–17:00 working hours in `surveyor_availability` (required to complete journey 5).
- `customers.valid_email` constraint fix applied live + committed as migration `20260705000002` (P1-2).
- The test enquiry CF-DAMP-2026-0005 (customer 9677901f…, survey TT-2026-0026, quotation QT-2026-0036) was **retained** (moved to Lost at audit end per manifest) — but note journeys 1–4 of the customer audit need a fresh Approve & Send cycle after P0-1 is fixed.
