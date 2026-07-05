# UX Audit Map — TyneTees_Damp

Manifest for the `ux-audit-customer` / `ux-audit-platform` skills. Spec: `app-dc81/docs/UX_AUDIT_STANDARD.md`.

## Project

Survey/CRM/costing/quotation/report platform for Tyne Tees Damp Proofing at **https://ttdp.dc81.io** — one Next.js app serving both the staff platform (auth) and the customer's tokenized pages (no auth). There is no public marketing site: customers only ever arrive via **email links** (quote, report, payment). App code lives in `survey-system/`.

## Surfaces

| Surface | Audience | Entry URL | Auth | How a real user arrives |
|---|---|---|---|---|
| Quotation view + accept/decline | customer | /q/[token] | share token | Resend email after quote sent |
| Published report | customer | /report/[reportId]?token=… | publish token | Resend email (often combined with quote) |
| Survey-fee payment page | customer | /pay/[token] | payment token | Resend email at booking (manual payment — instructions only) |
| Staff platform | platform | / (dashboard), /enquiries, /surveys, /survey/[projectId]/{wizard,costing,quotation,report,handover}, /calendar, /admin/*, /settings | Supabase Auth — roles admin / office / surveyor | daily driver; wizard used on-site on a phone/tablet |

## Journeys

⚠️ **Loading a real customer's /q/[token] link writes a view-tracking record that staff read as customer engagement. Customer journeys run ONLY on the audit-created test enquiry's tokens — never on real customers' links.**

Customer (mobile-first — these arrive by email on a phone; homeowners, often older, zero patience for jargon):
1. **Pay the survey fee** — open the test /pay/[token] link cold. Done when: persona knows how much, how to pay, and what happens next.
2. **Read my report** — test /report/... link; persona: worried homeowner. Done when: they understand what's wrong with their house and what TTDP proposes, with zero trade jargon leakage ("hygroscopic salts" etc. unexplained = P1).
3. **Accept the quotation** — test /q/[token]: understand the price and scope, then accept with e-signature. Done when: accepted and the persona understands what they just committed to. Also probe decline path on a second test quote if available.
4. **Cross-doc coherence** — do the combined report+quote emails' promises match what the links show?

Platform:
5. **New enquiry → booked** (office role) — create the **UX-AUDIT test enquiry** (customer email = designated test inbox), convert to customer + survey + provisional booking. Click-count it.
6. **Run the survey wizard** (surveyor role) — the 5-step wizard on the test survey, **mobile viewport** (it's used on-site): rooms, photos with visibility tiers, voice transcription + observation polish (allowed on test survey — consumes small Deepgram/OpenRouter credits). Done when: survey complete. Wrong-visibility-tier ease is a P1 check (customer must never see technician photos).
7. **Costing → quotation → report → approve & send** (office/admin) — generate costing, quotation PDF, LLM report, publish, then Approve & Send **to the test inbox only**. This produces the tokens for journeys 1–4.
8. **Pipeline triage** — Kanban: "what needs my attention today?"; are the stage names unambiguous?

## Test data & credentials

- Audit accounts exist (office + surveyor roles): credentials in `~/.credentials/.ux-audit-credentials` (`UX_TTDP_*` keys). Password-reset email is known-unconfigured (SMTP) — resets silently fail; that itself is a standing finding.
- **Test enquiry/customer**: created in journey 5, name-prefixed `UX-AUDIT`, customer email = the plus-addressed test inbox (customer-side pattern in the header of `~/.credentials/.ux-audit-credentials`). All email sends in journey 7 go only to it. Delete/mark-Lost the test enquiry after the audit.
- No seed/demo data exists — treat every pre-existing record as a real customer.

## Safe actions

- Full lifecycle (journeys 5–8) on the `UX-AUDIT` test enquiry, including Resend sends to the test inbox and modest LLM/Deepgram usage on the test survey.
- Customer journeys 1–4 on the test tokens; decline/accept on test quotes.

## Forbidden actions

- Opening real customers' /q/, /report/, /pay/ links (view tracking pollutes engagement data).
- Accept/decline on any real quotation (immutable e-signature, auto-creates deposit, auto-transitions to Won/Lost).
- Sending any email to a real customer address; mark-paid on real payments; CF handover export on real projects; editing pricing config (`/admin/rates`, `/admin/costing`) — read-only there.
- Cron endpoints.

## Seams

- **Journey 7 → 1/2/3 is one continuous seam**: what office approves vs what the homeowner's links actually show (especially: measurements hidden, technician photos filtered on the public report).
- **Acceptance → pipeline**: after test accept, does the Kanban/deposit state tell office what happened without digging?
