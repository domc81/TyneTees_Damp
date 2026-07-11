# Phase 1 Plan — Immediate Customer & Live-Site Fixes

**Source:** `docs/DOM_Survey_Report_and_Costing_Platform_Technical_Review.pdf` (Steven Robinson, 11 July 2026), Section 8 "Proposed Implementation Sequence", Phase 1.
**Status:** PLANNED — approved scope, **not yet scheduled for implementation**. The costing-engine parity work (review Phase 2, points 4/6/11/14/14A/16) is being tackled first. Nothing in this document may be implemented until Dom gives the go signal.
**Scope:** Review points **8, 2, 3, 1, 10, 12, 13** (all HIGH) plus point **9** (MEDIUM) bundled in because it shares the same central-company-settings surface as point 8.
**Author:** Claude (grounded in codebase + TTDP database investigation, 11 July 2026).

---

## 0. Ground rules for this phase

1. **Costing-freeze compliance.** Steven has requested a freeze on costing changes until golden-master parity is proven. Every item in this phase is display, data, or plumbing only. **No file in the calculation path may be touched:** `lib/pricing-engine.ts`, `lib/survey-mapping.ts`, `costing_line_templates`, `pricing_config`, or any stored total. Items 4 and 7 touch costing *presentation* only and must not alter a single stored or computed number.
2. **Acceptance tests are Steven's numbered tests.** Each item lists the review's test numbers; those are the sign-off criteria, tested on the live deployment (logged out where relevant), not just in code review.
3. **Verification policy per project standard:** `npm run build` + `npm run lint` from `survey-system/`, push to `main`, Coolify deploys, verify against https://ttdp.dc81.io. No dev servers. Browser-matrix checks via Steel Browser; the Edge failure must additionally be confirmed fixed on Steven's actual Windows laptop.
4. **Deposit wording is out of scope here.** The "Deposit required (30%)" label and staged-payment restructure is review point 16 — Phase 2 (costing/payment). Item 7 below keeps the existing row text verbatim.

---

## 1. Verified current state (investigation summary)

Facts established from the TTDP database and code on 11 July 2026 that shape this plan:

- **`company_profile.email_primary` = `dominicclauzel@gmail.com`** (confirmed by direct DB query). This is the root cause of point 8 — no code hardcodes the address; nothing derives it from the logged-in user (the public report page fetches surveyor data and explicitly discards it, `app/report/[reportId]/page.tsx` ~535).
- **Quotations snapshot company contact at generation** — `quotations.company_name/company_phone/company_email` are frozen from the profile when the quotation is created (`app/api/surveys/[id]/quotation/route.ts` ~239-241) and are what the PDF header renders. Fixing the profile row does **not** fix already-issued quotations → backfill required.
- **Email Reply-To = `company_profile.email_primary`** (`lib/email-config.ts` ~111, ~129) → customer replies currently go to the developer Gmail. From-address comes from `platform_settings` (`platform_from_email` / `custom_from_email`), editable at `/settings/notifications`.
- **Quotation line items live in a normalised child table `quotation_sections`** (`quotation_id, survey_type, section_key, display_name, display_order, material_total, labour_total, section_total, is_optional, is_included`). Per-section customer prices already exist in data — point 1 is purely a rendering change.
- **The customer /q page deliberately omits mandatory per-item prices** (`app/q/[token]/page.tsx` ~464-483: names only, then a single "Works subtotal" = mandatory + PSO folded in). Optional works **do** show per-item prices (~493-503). The PDF mirrors this (`lib/quotation-pdf-renderer.tsx` ~557-570).
- **The internal "Customer Preview" panel lies:** `app/survey/[projectId]/quotation/[quotationId]/page.tsx` ~543-688 is labelled "This is what the customer sees at their link" but shows per-item prices and a separate PSO line — neither of which the customer page shows. This mismatch is itself part of why the discrepancy went unnoticed.
- **A combined report+quotation email already exists:** `POST /api/surveys/[id]/approve-and-send` (triggered from the pipeline EnquiryDrawer "Approve & Send") sends ONE email with both links via the `reportAndQuotationEmail()` template, flips quotation → sent, stamps the report, transitions the enquiry to `sent`, and logs `communication_log` + `enquiry_activity`. The problem is the two *other* paths: per-page Send buttons on the quotation and report pages send **separate** emails, and **no path has a duplicate-send guard**.
- **`sendEmail()` cannot attach files** — `SendEmailOptions` has no attachments field (`lib/email-service.ts` ~19-32). A server-side quotation PDF renderer already exists (`renderToBuffer` in `app/api/q/[token]/pdf/route.ts` and `app/api/quotation-pdf/[quotationId]/route.ts`). **No report PDF exists anywhere** — the report is web-only HTML.
- **The report footer is hardcoded** in `components/report/ReportFooter.tsx`: registered office text, "Company No. 09747364", all four regional phone numbers (~40-59), and the towns line "South Shields · Blyth · Corbridge · Whitley Bay · North Shields · Sunderland · Durham" (~105). Only name/email/website come from the profile; the profile phone is passed in but never rendered. Editing `/settings/company` today does not change the footer. `/pay` also hardcodes a company-name fallback (`app/pay/[token]/page.tsx` ~114).
- **The wizard has no context header** — `app/survey/[projectId]/wizard/page.tsx` ~497-525 shows only Back, "Survey Wizard", the TT project number, sync pill, Save. Client name, site address, booking date/time, surveyor and notes appear on the `/surveys/[id]` hub but **the hub is online-only and offline taps bypass it straight to the wizard** (per the offline architecture), so on site the surveyor may never see them.
- **Booking notes (`survey_bookings.notes`) surface only in the calendar** (`app/calendar/page.tsx` ~1014-1019). The hub's Notes card shows `surveys.notes` — a different column.
- **Address data already exists for point 10:** `surveys.site_address*` (site), `customers.address_line1/2 + city/county/postcode` (correspondence), `enquiries.site_address_1/2`; the quotation snapshot already distinguishes `customer_address` vs `site_address`. No schema change needed to *display* both.
- **External-inspection photos require a preset defect:** the `PhotoCapture` renders only inside a selected preset (`components/wizard/ExternalInspectionStep.tsx` ~199-219), photos are matched back by `description === defect.label`, and the observations block has voice/text but no photo control. 18 presets defined at `types/survey-wizard.types.ts` ~657-676. Confirms Steven's point 12 exactly.
- **The Job Cost Summary is a `sticky bottom-4` card with up to 9 rows and no collapse** (`app/survey/[projectId]/costing/page.tsx` ~902-996). On tablet/phone it overlays the scrolling line-item tables until its own end scrolls into view. Confirms point 13.
- **Job ID:** `surveys.project_number` (`TT-YYYY-NNNN`) is already threaded through report/costing/wizard surfaces and is the right "job ID" for point 10. Quotation numbers (`QT-…`) come from a DB trigger; enquiry numbers (`CF-…`) from `createEnquiry`.

---

## 2. Work items

### Item 1 — Remove developer email; correct company contact chain (Point 8, HIGH)

**Required behaviour:** No customer document or email carries `dominicclauzel@gmail.com`; replies go to `info@tyneteesdampproofing.co.uk`; company contact details are maintained once, centrally.

**Changes:**
1. **Profile row (data fix):** set `company_profile.email_primary = 'info@tyneteesdampproofing.co.uk'` — via the existing `/settings/company` UI (preferred, exercises the real path) or one-off SQL through `docker exec`. Confirm `phone_primary` (0191 8141613) and `company_registration_number` while in there.
2. **Backfill quotation snapshots:** `UPDATE quotations SET company_email = 'info@tyneteesdampproofing.co.uk' WHERE company_email = 'dominicclauzel@gmail.com';` — all rows, including accepted ones (the contact address is not part of the contractual scope; any re-downloaded PDF must show the office address). Record row count in the work log.
3. **Reply-To verification:** no code change needed (`email-config.ts` already uses `email_primary`) — verify after step 1 that outbound emails carry the office Reply-To.
4. **From-address check:** inspect `platform_settings` (`platform_from_email` / mode). If the send domain is not a TTDP-controlled domain, flag to Dom: moving `from` to a verified `tyneteesdampproofing.co.uk` sender in Resend needs DNS records — **decision D4**, can trail the rest of this item.
5. **Sweep:** re-grep customer-facing surfaces (q, pay, report, PDF, email templates, decline notice) for any remaining personal-address fallback; the investigation found none in code, so this is a confirmation pass on the live site.

**Acceptance (Steven 46-48):** no customer document contains the developer address; replies go to the office inbox; changing the central company email updates every output (spot-check /q header+footer, /pay contact block, /report contact block, fresh quotation PDF, email Reply-To).
**Effort:** S. **Risk:** low — data + verification. **Files:** none (data), unless the from-address decision lands.

### Item 2 — /q reliability on Edge + PDF fallback + error logging (Point 2, HIGH)

**Required behaviour:** the emailed link works on current and reasonably recent Edge/Chrome/Safari/Firefox; a PDF fallback is always available; failures show a clear message and log enough to support the customer.

**Changes:**
1. **Diagnose first (on Steven's laptop or matching UA via Steel Browser):** fetch the exact emailed URL logged-out; capture status code, whether server HTML arrives, console/CSP errors, Cloudflare challenge behaviour for older Edge UAs, middleware redirects on public routes. The page is server-rendered and `force-dynamic`, so total failure suggests network/CDN/security-header or JS-crash-on-hydrate — the diagnosis picks the fix.
2. **No-JS resilience:** convert the customer "Download PDF" action from JS `fetch`+blob (`app/q/[token]/client.tsx` ~61-81) to a plain `<a href="/api/q/[token]/pdf">` (keep JS enhancement if wanted); verify the server-rendered body displays meaningfully before hydration; add `<noscript>` guidance.
3. **Error boundary + fallback message:** wrap /q (and /pay, /report) client components in an error boundary rendering "We couldn't display this page in your browser — download the PDF or call {office phone}" with the PDF link — never an unformatted page.
4. **Client-error logging:** small `POST /api/client-error` (rate-limited, no auth) capturing UA, URL path (no token echo in logs beyond a hash), and error message from the error boundary — satisfies "log a useful browser/device error for support".
5. **Browser matrix run:** Edge + Chrome (Windows laptop), Safari (iPhone/iPad), Chrome (Android tablet), Firefox — logged out, via the real emailed link format.

**Acceptance (Steven 40-42):** same link works in Edge and Chrome on laptop and tablet; full document remains available as PDF if the page cannot load; download and print work consistently.
**Effort:** M (diagnosis-dependent). **Files:** `app/q/[token]/client.tsx`, new `app/api/client-error/route.ts`, error-boundary components, possibly middleware/headers config.

### Item 3 — One customer email: report + quotation together, duplicates impossible (Point 3, HIGH)

**Required behaviour:** the customer gets ONE email only when both approved documents are ready — combined PDF preferred or two clearly named attachments — with one online link + PDF fallback, one CRM record, and no duplicate quotation email.

**Changes:**
1. **Canonical path = pipeline "Approve & Send"** (already combined). Strengthen its preflight (block if either document missing — partially exists in `EnquiryDrawer.tsx` ~1055-1074) and make it the only routine way office sends customer documents.
2. **Attachments support:** add `attachments?: {filename, content}[]` to `SendEmailOptions`/`sendEmail()` (Resend supports this natively) and attach the quotation PDF via the existing `renderToBuffer` path. Filename: `Quotation {QT-number} - Tyne Tees Damp Proofing.pdf`. Guard PDF render failure: send with links anyway rather than blocking (log the miss).
3. **Report PDF:** none exists and `@react-pdf` was already judged unsuitable for reports (prior decision). Phase 1 ships: combined email = report link + quotation link + quotation PDF attached. **Decision D2** for Steven: accept report-as-link for now (with the print-friendly page), or commission a report-PDF build (headless-print service) as a follow-up. The review explicitly allows "two clearly named attachments" as the alternative to one combined PDF — we can meet the *spirit* now and the full letter once a report PDF exists.
4. **Duplicate-send guard:** before any send (combined or per-page), query `communication_log` for a prior successful send of the same `quotation_id`/report; if found, require an explicit typed confirm in the UI ("Sent {date} — resend?") and mark the email subject "(resent)". The approve-and-send route itself gets an idempotency check so a double-click or a second automation cannot fire twice.
5. **Demote per-page Send buttons** on the quotation and report pages to clearly-labelled "Resend" utilities (office fallback), both passing through the same guard.
6. **CRM:** verify the combined send writes one `communication_log` row carrying quotation_id + survey_id + customer_id (template `report_and_quotation`) and one `enquiry_activity` entry — extend if any ID is missing.

**Acceptance (Steven 43-45):** one email contains both documents; no duplicate separate quotation email; the CRM records one complete customer-document package.
**Effort:** M. **Files:** `lib/email-service.ts`, `lib/email-templates.ts`, `app/api/surveys/[id]/approve-and-send/route.ts`, `app/api/quotations/[id]/send/route.ts`, `app/api/reports/[id]/send/route.ts`, `components/EnquiryDrawer.tsx`, quotation/report page send buttons.

### Item 4 — Customer quotation itemisation (Point 1, HIGH)

**Required behaviour:** the customer sees each work item with its individual price (optional works clearly separate; subtotal, VAT, total), identically on web, PDF and print — with no margin, raw overhead or subcontractor internals exposed.

**Changes:**
1. **Show mandatory per-item prices on /q:** render `formatCurrency(section.section_total)` beside each mandatory item (`app/q/[token]/page.tsx` ~464-471), exactly as optional items already do.
2. **PSO presentation — decision D1.** Today PSO is folded into the single works subtotal. Steven's wording leaves the commercial call open: (A) pro-rata PSO across the displayed section prices (needs largest-remainder rounding so lines sum to the penny), or (B) keep PSO as its own customer-worded line, e.g. "Site setup, access & project management". **Recommendation: B** — zero rounding risk, keeps each section's customer price identical to the internal figure, and matches the internal layout so views reconcile line-for-line. Default to B unless Steven prefers A at the working session.
3. **Single presentation source:** extract a shared display-model builder (e.g. `lib/quotation-presentation.ts`) consumed by all three renderers — /q page, `quotation-pdf-renderer.tsx` (~557-570), and the internal "Customer Preview" panel (`quotation/[quotationId]/page.tsx` ~543-688) — so the preview can never drift from reality again. This directly fixes the discovered preview/actual mismatch.
4. **Reconciliation assertion:** the builder asserts rendered lines sum exactly to `subtotal_combined + pso_total` (and optional lines to `subtotal_optional`); log/throw in dev if not — this is presentation-side protection, not a calc change.
5. **Exclusions preserved:** no material/labour split, margins, subcontractor figures on any customer surface.

**Acceptance (Steven 37-39):** customer sees each selected work item and price; PDF and print match the online quotation; internal-only commercial information remains hidden.
**Effort:** M. **Guardrail:** stored values untouched; `quotation_sections` already holds every figure needed.
**Files:** `app/q/[token]/page.tsx`, `lib/quotation-pdf-renderer.tsx`, `app/survey/[projectId]/quotation/[quotationId]/page.tsx`, new `lib/quotation-presentation.ts`.

### Item 5 — Survey opening header: job ID, both addresses, admin notes (Point 10, HIGH)

**Required behaviour:** on opening a job the surveyor immediately sees job/reference ID, client name, site address, separate correspondence address where different, survey date/time, attending surveyor, and admin survey notes — offline included; admin notes never auto-flow into the customer report.

**Changes:**
1. **New `SurveyContextHeader` component** at the top of the wizard (above Step 1, collapsible to a slim strip on later steps): `project_number`, client name, **site address**, **correspondence address only when different** (labelled), booking date/time + attending surveyor, admin notes (`survey_bookings.notes`) + reported problem. Also render it on the hub for consistency.
2. **Offline plumbing:** extend the wizard mirror payload (`lib/offline/local-data.ts` snapshot) with booking (date/time/surveyor/notes) and customer correspondence address, stored *alongside* — **not inside** — `survey_data` (keeps the RMW merge and write-queue untouched). This data is read-only context; it rides the existing prefetch.
3. **"Customer address same as site address":** in the New Lead / Convert & Book forms, a checkbox that copies site → customer address (or marks them identical) so admin never types an address twice; the header then shows a single address with "correspondence: same as site".
4. **Internal-notes boundary:** booking notes live outside `survey_data`, and `report-generator.ts` reads only `survey_data` — so notes are structurally excluded from reports. State this in code comment; add no pathway.

**Acceptance (Steven 55-57):** admin enters two different addresses for a landlord/agent case; the surveyor opens the job and immediately sees the correct site and notes (test offline too); internal notes do not appear in the customer report.
**Effort:** M. **Files:** new `components/wizard/SurveyContextHeader.tsx`, `app/survey/[projectId]/wizard/page.tsx`, `lib/offline/local-data.ts` + prefetch, `app/surveys/[surveyId]/page.tsx`, New Lead / Convert & Book forms.

### Item 6 — Custom external defects with photos (Point 12, HIGH)

**Required behaviour:** keep the 18 quick presets; add unlimited "Other / Add Custom Defect" entries — custom title, dictated description, elevation/location, urgency, action, one or more photos — each stored as its own record and placed in the correct report section.

**Changes:**
1. **Type:** add `custom_defects?: CustomDefect[]` to `ExternalInspection` (`types/survey-wizard.types.ts`): `{ id, title, description, raw_description?, location?, urgency?, action? }`. Photos link by **stable id** (photo `description` = `custom:{id}` or a metadata field) — deliberately *not* the existing brittle label-matching.
2. **Wizard UI (`ExternalInspectionStep.tsx`):** "+ Add custom defect" beneath the preset checklist; per-defect card with title, description + `AudioRecorder` dictation/polish (reuse existing pattern), elevation/location select (front/rear/left/right/offshoot/other), urgency, action, `PhotoCapture` (cap 3, same as presets), remove button; multiple cards allowed. Custom defects count toward "defects noted".
3. **Report generator (`report-generator.ts`):** merge custom defects into the External Inspection section — urgency tiering alongside presets, photos attached with captions from the custom title, title+description added to LLM context (subject to the existing no-measurements guards).
4. **Offline:** photos flow through the existing deterministic offline photo path unchanged (step-keyed paths already cover this).

**Acceptance (Steven 58-60):** a non-listed defect is added, dictated and photographed; more than one custom defect can be added; each photo remains linked to the correct defect in the final report.
**Effort:** M. **Files:** `types/survey-wizard.types.ts`, `components/wizard/ExternalInspectionStep.tsx`, `lib/report-generator.ts`, photo service metadata only (no storage-path changes).

### Item 7 — Collapsible Job Cost Summary (Point 13, HIGH)

**Required behaviour:** on phones/tablets the summary defaults to a narrow collapsed bar showing only the current total; expands/collapses instantly; on desktop a side placement that never covers the costing table; no input, quantity, line price or button hidden behind a fixed footer; no zoom/rotation needed.

**Changes:**
1. **< lg viewports:** replace the `sticky bottom-4` 9-row card (`costing/page.tsx` ~902-996) with a slim fixed bottom bar — "Grand Total (inc VAT) £X · ▲" — expanding to a bottom sheet containing the full 9 rows (internal scroll, max-height capped), collapse on tap/scrim. Default collapsed; remember state in `sessionStorage`. Add matching bottom padding to the content so the bar can never cover the last table row or the action buttons.
2. **≥ xl viewports:** two-column layout with the summary as a sticky *side* panel beside the section tables (they are `overflow-x-auto`, so confirm comfortable table width at xl; if not, keep the collapsed-bar pattern at all widths — the review allows a side panel "only where it does not cover the costing table").
3. **Text unchanged:** all row labels, including "Deposit required", stay verbatim (point 16 owns that wording, Phase 2).
4. Site-prep and per-type subtotal cards are not sticky and stay as they are.

**Acceptance (Steven 16-19):** all costing lines readable and editable on Steven's tablet; summary opens and closes easily; the page is practical on a phone; no controls obscured at the bottom of the page.
**Effort:** S-M. **Files:** `app/survey/[projectId]/costing/page.tsx` (possibly extract `JobCostSummary` component).

### Item 8 — Central Company Locations record + data-driven footer (Point 9, MEDIUM — bundled)

**Rationale for bundling:** shares the central-company-settings surface with Item 1, and the hardcoded `ReportFooter` should be opened only once.

**Changes:**
1. **Schema + seed migration:** `company_locations` table — `id, label, type ('registered'|'regional_office'|'service_area'), address_line1, address_line2, city, county, postcode, phone, display_order, is_active`. Seed with Steven's approved list:
   - Registered: The Town Hall Conference & Business Centre, High Street East, Wallsend, Tyne & Wear, NE28 7AT
   - South Shields: South Shields Business Works, Henry Robson Way, South Shields, NE33 1RF
   - Blyth: Blyth Community Enterprise Centre, Ridley Street, Quayside, Blyth, NE24 3AG
   - Corbridge: Tinklers Yard, Corbridge Business Centre, Corbridge, NE45 5SB
   - Sunderland: Liberty Way, North Sands Business Centre, Sunderland, SR6 0QA
   - Service areas (no postal address): Whitley Bay, North Shields, Durham
   - Contact numbers: Tyneside 0191 814 1613; Wearside 0191 500 1097; Northumberland 01434 303 725; Durham 0191 300 3625 (attach to the appropriate location rows or a dedicated numbers group)
2. **`ReportFooter.tsx` reads data:** registered-office block, regional offices (only `regional_office` rows render as offices; `service_area` rows render as towns-only), contact numbers, and company number from `company_profile.company_registration_number` — delete the literals (~40-59, ~105).
3. **Consistency pass:** the same central data feeds the /q footer, /pay contact block and quotation PDF footer where addresses/numbers appear; remove the `/pay` hardcoded name fallback.
4. **Settings UI:** locations management section on `/settings/company` (add/edit/deactivate/reorder).

**Acceptance (Steven 49-51):** approved registered office and regional details appear consistently on reports, quotations, PDFs and guarantees; service areas are not presented as postal offices; admin can update a location once, centrally.
**Effort:** M. **Files:** new migration, `components/report/ReportFooter.tsx`, `app/pay/[token]/page.tsx`, `app/q/[token]/page.tsx`, `lib/quotation-pdf-renderer.tsx`, `app/settings/company/page.tsx` + API route.

---

## 3. Sequencing and estimates

| Order | Item | Point | Effort | Depends on |
|---|---|---|---|---|
| 1 | Item 1 — developer email (data fix + backfill) | 8 | S | — (can ship the moment the phase opens) |
| 2a | Item 4 — customer itemisation | 1 | M | D1 (PSO presentation) |
| 2b | Item 7 — collapsible cost summary | 13 | S-M | — |
| 2c | Item 2 — Edge/PDF fallback + error logging | 2 | M | diagnosis session |
| 3 | Item 3 — combined email + attachments + dup guard | 3 | M | Item 4 (PDF itemisation should land before PDFs are attached), D2 |
| 4 | Item 5 — survey context header (incl. offline mirror) | 10 | M | — |
| 5 | Item 6 — custom external defects | 12 | M | — |
| 6 | Item 8 — company locations + footer | 9 | M | address list confirmed (supplied in review) |

2a/2b/2c are independent and parallelisable. Items 5 and 6 both touch the wizard — sequence within one work stream to avoid conflicts with the offline layer. Every push runs build + lint; each item is verified against its acceptance tests on the live site before the next starts.

## 4. Decisions needed before/at the working session

| # | Decision | Options | Recommendation |
|---|---|---|---|
| D1 | PSO on the customer quotation | (A) pro-rata into item prices with penny-exact rounding · (B) separate customer-worded line | **B** — exact reconciliation, no distortion of per-item prices |
| D2 | Report PDF fallback | (a) report stays online-link + print-friendly page for now · (b) build a report-PDF pipeline (headless print) as follow-up | **(a) now, (b) as scheduled follow-up** — review accepts two named attachments; quotation PDF attaches immediately |
| D3 | Quotation snapshot backfill scope | open quotations only · all historical rows | **All rows** — contact details aren't contractual scope |
| D4 | Email from-address domain | keep current platform sender · verified `tyneteesdampproofing.co.uk` sender in Resend (needs DNS) | **Verified domain** — improves deliverability and branding; needs Cloudflare DNS records |

## 5. Acceptance-test traceability

| Item | Steven's tests |
|---|---|
| 1 (email) | 46, 47, 48 |
| 2 (browser/PDF) | 40, 41, 42 |
| 3 (one email) | 43, 44, 45 |
| 4 (itemisation) | 37, 38, 39 |
| 5 (survey header) | 55, 56, 57 |
| 6 (custom defects) | 58, 59, 60 |
| 7 (cost summary) | 16, 17, 18, 19 |
| 8 (locations) | 49, 50, 51 |

## 6. Explicitly out of Phase 1

- **All costing calculations** — Warmline DC (pt 4), DPC measurement (pt 6), core holes (pt 11), benchmark parity + regression harness (pt 14), floor-resin components (pt 14A), payment staging/wording (pt 16): Phase 2, being tackled first as the costing-engine forensic effort.
- Internal operational outputs — subcontractor pay/hours, materials, time-on-site views + operative work instructions (pt 15): Phase 3.
- Airbricks-by-elevation survey record (pt 5) and admin-mileage/crew-size ownership (pt 7): scheduled with the survey-capture and costing work respectively.
- Operative/workmen permission tier: with Phase 3.
