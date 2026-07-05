# UX Audit — Customer Surfaces — TyneTees Damp Proofing

- **Project:** TyneTees_Damp (https://ttdp.dc81.io)
- **Skill:** ux-audit-customer · **Standard:** `app-dc81/docs/UX_AUDIT_STANDARD.md`
- **Date:** 2026-07-05
- **Viewports:** mobile 390×844 and desktop 1440×900, fresh isolated Steel session per run
- **Journeys:** 1 (pay), 2 (report), 3 (quote accept + decline probe), 4 (cross-doc coherence — pages only, emails untested)
- **Test records:** UX-AUDIT Test Customer / CF-DAMP-2026-0005 / TT-2026-0026 / QT-2026-0036 (tokens minted by completing journey 7's publish + Approve & Send as office earlier the same day)
- **Evidence:** `/home/dominic/app-dc81/logs/ux-audits/ttdp-customer-2026-07-05/` (34 files, never committed)
- **Auditor caveat:** the auditor had same-day platform-code exposure from the P2/P3 fix sprint. The customer-page code (`/pay`, `/q`, `/report` public views) had not been read before or during journeys; source was consulted only post-run for fix pointers, per the blind-run rule.

## Executive summary

The customer surfaces are fundamentally strong: sub-second loads, a clear £-breakdown on the quote, a genuinely excellent acceptance flow (consumer-rights checkboxes, cooling-off explanation, disabled-until-valid signing button that personalises to "Accept as <name>"), correct hiding of measurements, and DOM-verified filtering of technician photos. The audit found **no P0**. The most important fix is **C1: the tokenized pages are served from a stale server-side cache** — after the customer accepts, re-opening the emailed link still shows Accept/Decline (and `/pay` still says "Awaiting Payment" after payment) — the server data is correct and double-accept is safely rejected (409), but the page lies until a redeploy. Second priority is **C2**: `/pay` tells the customer to "reach us using the details below" and then renders an empty contact block — a dead end on the one page whose only job is getting paid. The flagship report also contradicts itself on ground levels (C3) and shows raw dictation-style surveyor notes verbatim (C4).

**Counts:** 0× P0 · 3× P1 · 5× P2 · 4× P3 (+3 platform-side addenda found while minting tokens).

## Findings table

| ID | Sev | Surface | Summary |
|---|---|---|---|
| C1 | P1 | /q/[token], /pay/[token] | Tokenized pages serve stale cached state — accepted quote still shows Accept/Decline; paid fee still shows "Awaiting Payment" |
| C2 | P1 | /pay/[token] | Page promises contact details ("reach us using the details below") then renders "Questions? Contact us:" with nothing — zero actionable elements |
| C3 | P1 | /report (public) | Report contradicts itself: narrative says elevated ground levels against the DPC; "External Ground Levels" section says "no apparent ground level issues" |
| C4 | P2 | /report (public) | Raw dictation-style surveyor notes rendered verbatim ("pointing on front elevation is perished in places rainwater goods leaking at rear downpipe…") |
| C5 | P2 | /report (public) | "22% WME" vs "22% W/W" for the same reading; abbreviations key defines W/W but not WME |
| C6 | P2 | /q/[token] | Line items are bare section names ("Wall Membrane £226.52") — no room/location, no description of what's included |
| C7 | P2 | /q/[token] | Internal costing vocabulary on the customer quote: "Mandatory Works", "Project Specific Overheads" |
| C8 | P2 | /report (public) | "REPORTED DEFECT — As instructed by client." — circular fallback that tells the customer nothing |
| C9 | P3 | /pay/[token] | Appointment time rendered with seconds: "09:30:00 – 11:00:00" |
| C10 | P3 | /report (public) | Footer "Reference: 237EFF11" (report-UUID fragment); three different reference schemes across the customer's documents |
| C11 | P3 | report vs quote | Payment-terms drift: report says balance "within 7 days of completion"; quote T&C says "upon satisfactory completion" |
| C12 | P3 | /q/[token] | Double-respond rejection says "You have already responded…" without saying what the response was (accepted vs declined) |

Platform addenda (found while completing journey 7's tail as office; not customer findings):

| ID | Sev | Where | Summary |
|---|---|---|---|
| A1 | P2 | report editor | "Finalise Report" uses a native `window.confirm()` — against app conventions (sonner), and the action silently no-ops when the dialog is dismissed/suppressed |
| A2 | P2 | report editor | "Publish Report" is enabled at Reviewed status but fails with a console-only error ("Report must be finalised before publishing") — no user-visible feedback at all |
| A3 | P2 | accept seam | Public quote acceptance transitions the enquiry to Won but never stamps `enquiries.won_at` — the manual-move path stamps it; won-date reporting is wrong for customer-accepted jobs |

## Finding detail

### C1 — Tokenized pages serve stale state after status changes (P1)
- **Where:** `/q/[token]` (journey 3, revisit step) and `/pay/[token]`.
- **Expected:** re-opening the emailed link after accepting shows the accepted state ("This quotation was accepted"); re-opening the payment link after payment shows it as paid.
- **Actual:** fresh sessions after acceptance still render the full respondable quote — Accept/Decline buttons, no banner (`j3-mobile-08-revisit-accepted.png`). The customer's natural reaction ("did it go through?") is to accept again: the whole modal flow runs, and only at final submit does a 409 reveal "You have already responded to this quotation on 5 July 2026" (`j3-mobile-09-double-accept.png`). Same class of failure on `/pay`: after the fee was marked paid, the page still shows "Awaiting Payment".
- **Evidence (DOM/structural):** SSR HTML fetched via curl after acceptance embeds `"status":"sent","isRespondable":true,"isAccepted":false` in the RSC payload while `quotations.status='accepted'` in the DB (verified same minute); a cache-busting query param changes nothing; `cache-control: private, no-cache, no-store` proves it is not CDN — the staleness is Next.js caching the server component's data fetch. Server-side protection confirmed intact: second accept → HTTP 409, no duplicate deposit row, original signature untouched.
- **Suggested fix:** the render logic is already correct (`app/q/[token]/page.tsx:288-290` derives `isAccepted` and `client.tsx:219` shows the banner; buttons gated on `isRespondable`). The pages just need their data fetch made dynamic — `export const dynamic = 'force-dynamic'` (or `noStore()`) on `app/q/[token]/page.tsx` and `app/pay/[token]/page.tsx`, and check `app/report/[reportId]` for the same pattern.

### C2 — /pay promises contact details it doesn't render (P1)
- **Where:** `/pay/[token]`, journey 1, both viewports.
- **Expected:** the persona's goal is "how much, how to pay, what happens next". Payment is manual by design, so the page's only actionable path is contacting the office — the copy says "you can reach us using the details below".
- **Actual:** "Questions? Contact us:" is the last text on the page, followed by nothing. There are zero links or buttons anywhere on the page (no tel:, no mailto:) — on a phone the customer cannot tap anything. (`j1-mobile-01-cold.png`, `j1-desktop-01-cold.png`; DOM: actionable-element scan returned an empty list.)
- **Suggested fix:** `app/pay/[token]/page.tsx:253-261` gates phone/email on `company_profile.phone` / `.email`, which are null (the live contact numbers exist as the four regional numbers used by the report footer). Fall back to the regional numbers (as `tel:` links) + email, or populate the singleton's `phone`/`email`. Also reconcile the "details below" copy at `:228-229` with whatever actually renders.

### C3 — Report contradicts itself on ground levels (P1)
- **Where:** public report, journey 2. Executive summary: "elevated ground levels against the damp proof course on the left side of the property"; external-inspection notes: "ground levels high against dpc on left side". Then the "External Ground Levels" subsection states: **"There were no apparent ground level issues."**
- **Expected:** a homeowner (or their solicitor) can trust the flagship document to agree with itself.
- **Actual:** direct factual contradiction on the same page (`j2-mobile-fulltext.txt` lines 81, 102, 117; `j2-*-01/02` screenshots).
- **Suggested fix:** `lib/report-generator.ts:1306-1327` — the "no apparent ground level issues" literal is emitted whenever `aco_drain_length`/`french_drain_length` are 0, i.e. the conditional keys off *drainage works quantities*, not any ground-level assessment. Derive the statement from an actual ground-levels field (or the external-defects checklist), or omit the subsection when no explicit assessment exists.

### C4 — Raw dictation-style notes verbatim on the customer report (P2)
- **Where:** public report — EXTERNAL INSPECTION body and room narrative: "pointing on front elevation is perished in places rainwater goods leaking at rear downpipe ground levels high against dpc on left side"; "living room front wall shows rising damp staining to about 1m moisture readings 22 percent wme at skirting level wallpaper lifting in corner".
- **Expected:** the polished, branded document the rest of the report's design promises.
- **Actual:** unpunctuated voice-note text, lowercase "dpc"/"wme", run-on sentences — reads as unfinished on a paid professional report.
- **Evidence:** `j2-mobile-fulltext.txt` lines 102, 133.
- **Suggested fix:** LLM polish currently touches only the executive summary (`report-generator.ts:1072-1132`); room narratives (`:816-817`) and external notes (`:1330-1332`) pass through raw. Run those fields through the existing polish route at generation time (measurement-guard prompts already exist), or at minimum surface them prominently in the editor's completeness check so office rewrites them before publishing.

### C5 — WME vs W/W inconsistency; WME undefined (P2)
Summary says "22% WME", the affected-areas table says "22% W/W", and the abbreviations key (`report-generator.ts:77`) defines W/W but not WME. A homeowner cannot tell these are the same reading. Fix: pick one abbreviation (readings render as W/W at `:862`), add it to the key, and align the summary prompt. Evidence: `j2-mobile-fulltext.txt` lines 70, 81, 142.

### C6 — Quote line items have no location or description (P2)
"Preparatory Work £79.24 / Wall Membrane £226.52" is the entire scope description on the document the customer signs. The report carries the detail, but the quote should stand alone: which room, roughly what's included. Fix pointer: public grouping renders costing `display_name` only (`app/q/[token]/page.tsx:449-468`; names originate at `api/surveys/[id]/quotation/route.ts:260`). Evidence: `j3-mobile-fulltext.txt`, `j3-desktop-01-top.png`.

### C7 — Internal costing vocabulary on the quote (P2)
"Mandatory Works" (says who?) and "Project Specific Overheads" (reads as padding; it is the travel overhead) are internal terms. Rename for customers (e.g. "Works subtotal", fold overheads into it or label "Site setup & travel"). Evidence: `j3-mobile-fulltext.txt` lines 35-43.

### C8 — "REPORTED DEFECT — As instructed by client." (P2)
The section header promises "the following reported problem:" and then delivers a circular fallback. Fires when the reported-defect field is empty (`report-generator.ts:63`, `components/report/SurveyContextSection.tsx:70`). Fix: populate from the enquiry's `reported_problem` (captured at New Lead), and flag emptiness in the completeness check. Evidence: `j2-mobile-fulltext.txt` lines 54-56.

### C9 — Seconds in appointment time on /pay (P3)
"Time: 09:30:00 – 11:00:00" — `app/pay/[token]/page.tsx:185-186` prints `start_time`/`end_time` verbatim; slice to HH:MM. Evidence: `j1-mobile-01-cold.png`.

### C10 — Reference scheme chaos on customer documents (P3)
The customer's paperwork shows TT-2026-0026 (survey), QT-2026-0036 (quote) and "Reference: 237EFF11" (report footer = report-UUID fragment, `components/report/ReportFooter.tsx:66-68`). Render the project number on the report footer. Evidence: `j2-mobile-fulltext.txt` line 283.

### C11 — Payment-terms wording drift (P3)
Report: "remaining balance is due within 7 days of completion". Quote T&C: "balance is due upon satisfactory completion of all works". Same commitment, two versions — align the copy (journey 4 coherence check). Evidence: `j2-mobile-fulltext.txt` line 250 vs `j3-mobile-fulltext.txt` line 56.

### C12 — 409 message omits what the previous response was (P3)
"You have already responded to this quotation on 5 July 2026." A customer who cannot remember (or a couple where each partner acts separately) still doesn't know whether the quote stands accepted or declined. Say "accepted on 5 July 2026". Largely mitigated once C1 is fixed. Evidence: `j3-mobile-09-double-accept.png`.

### A1/A2 — Report finalise/publish feedback failures (platform, P2)
"Finalise Report" confirms via native `window.confirm()` (violates the app's no-native-dialog convention; the action silently no-ops if the dialog is dismissed — which is exactly what happened under automation, and what a popup-suppressing browser profile would do to a real user). "Publish Report" is clickable at Reviewed status but the failure ("Report must be finalised before publishing") goes only to the console — the office user sees nothing happen, twice, on the two buttons that gate the entire customer-facing pipeline. Evidence: `setup-08` through `setup-12` screenshots; console capture in audit transcript. Fix: replace confirm() with the app's modal pattern; disable Publish until finalised (mirroring the Approve & Send preflight) or toast the error.

### A3 — Public acceptance doesn't stamp won_at (platform, P2)
`api/q/[token]/respond/route.ts:477-480` updates `enquiries.status='won'` only; `lib/supabase-data.ts:705-707` (manual path) stamps `won_at`. Customer-accepted jobs therefore have `won_at IS NULL` and fall out of won-date reporting. Verified live: after the test acceptance, enquiry was `won` with `won_at` null. Fix: stamp `won_at` in the route (or route the transition through `updateEnquiryStatus`).

## Journey logs

### Journey 1 — Pay the survey fee (mobile 390×844, then desktop 1440×900)
Cold open of `/pay/<token>` in 0.7 s. No consent banner (none needed — no marketing cookies on tokenized pages). Amount (£150.00), status chip (Awaiting Payment), appointment date/time/property and link expiry all visible without scrolling on desktop, one scroll on mobile. Persona knows *how much* immediately. "How to Pay" explains the manual process ("We will contact you… or you can reach us using the details below") — then the contact block is empty (C2), and the times show seconds (C9). Zero interactive elements on the page. Refresh: stable. Step count to goal-knowledge: 0 clicks (all information above the fold or one scroll) — but the *action* path is a dead end (C2).

### Journey 2 — Read my report (mobile, then desktop)
Cold open in 0.8 s. Strong document shape: company credentials → survey context → executive summary with a plain "Advisory — Low Risk" verdict → "How to Read This Report" (What We Found / What This Means / What We Propose) → findings → scope → methodology → payment terms → surveyor + full regional contact footer. **Measurement hiding verified: zero m²/area/joist/linear-metre values in 13k chars of text** (moisture % present, as allowed). **Photo tiers verified at DOM level: the 3 rendered images are exactly the 3 customer-tier photos; the technician moisture-meter photo's storage path is absent from the HTML.** Friction: the self-contradiction on ground levels (C3), raw dictation text (C4), WME/W/W (C5), "As instructed by client." (C8), UUID reference (C10). No next-step CTA at the end of the report (the quote link arrives in the same email, so not rated above P3 and folded into C10/C11 coherence).

### Journey 3 — Accept the quotation (mobile probes, desktop acceptance)
Mobile cold open 0.7 s. Price story is excellent: line items → subtotal exc. VAT → VAT → total inc. VAT → deposit (30%) → balance, all consistent; validity date; phone + email present. Decline probe: modal with empathetic copy, reason box, "Go Back" escape and "Changed your mind? Call us" — good; cancelled without submitting. Accept modal: financial recap, T&C, **14-day cooling-off rights under the Consumer Contracts Regulations 2013, optional early-start checkbox, three explicit consent checkboxes, typed e-signature**; the signing button stays disabled until everything required is complete and then relabels to "Accept as UX-AUDIT Test Customer" — hard to get wrong, easy to trust. Desktop acceptance: 6 interactions from page-load to signed (Accept → 3 checkboxes → name → sign), confirmation in ~3 s: green "Thank you — your acceptance has been recorded… Signed by UX-AUDIT Test Customer on 5 July 2026. We'll be in touch shortly" with a tel: link. Double-submit: the signing button disappears with the modal on first click; a forced second submission from a fresh session is rejected 409 with no data damage (C12 for the message copy). Revisit from a fresh session: stale respondable page (C1).

### Journey 4 — Cross-doc coherence (pages only)
Report ↔ quote: scope agrees at the section level (membrane system to Living Room front wall) but the quote's labels are too coarse to cross-reference item-by-item (C6); deposit 30% agrees; balance timing wording drifts (C11); three reference schemes across the two documents plus the survey number (C10). Office-side seam after acceptance: Kanban shows the card in Won (count 1) immediately (`j4-office-01-kanban-won.png`); deposit auto-created pending. The emails themselves (subjects, bodies, link presentation) could not be read — see Untested.

## Untested

| Item | Reason |
|---|---|
| Email subjects/bodies (combined report+quote email, payment email) and their link presentation | No access to the test Gmail inbox from this session; journey links were taken from the DB test records instead |
| Decline path end-to-end | Only one test quotation existed and it was consumed by the acceptance test; decline was probed to the confirmation step and cancelled |
| Post-payment "paid" view of /pay | Blocked by C1 — the page serves the stale pending render, so the paid-state UI could not be observed |
| PDF download & print output of the quote | Binary artefacts; not exercised this run |
| Expired states (payment link past expires_at, quote past valid-until) | Would require mutating dates on test records mid-run; deferred |
| Report page /report without ?token / with wrong token | Access-control probing was out of scope for a UX audit; not exercised |

## Mutation log (test records only)

Test enquiry cycled lost → survey_complete → sent → won → **restored to lost**; survey fee cycled paid → pending (for journey 1) → **restored to paid**; report finalised + published (permanent, intended); quotation sent → viewed → **accepted with e-signature** (permanent by design, manifest-allowed); auto-created £91.73 test deposit **cancelled** with reference note. View-tracking rows exist only for the test tokens.
