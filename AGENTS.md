# TyneTees Damp Proofing Survey System

Web platform for a Newcastle damp proofing contractor (Tyne Tees Damp Proofing). Translates 4 Excel costing workbooks (Damp v48, Condensation v37, Timber v33, Woodworm v26) into a survey management application covering enquiry pipeline, on-site wizard assessment, automated costing, quotation generation, AI report writing, and calendar/booking. Production: https://ttdp.dc81.io

## Stack

- Framework: Next.js 14.2.35 (App Router, `src/` directory, `output: 'standalone'`)
- Runtime: Node 22 (Alpine, for Docker build)
- Language: TypeScript 5.3+ (strict mode, `@/*` path alias to `./src/*`)
- Database: Supabase (self-hosted PostgreSQL) — container prefix `y04kk0w`, API via Kong at `https://api.ttdp.dc81.io`
- Auth: Supabase Auth with RLS + role-based access (admin, office, surveyor)
- Styling: Tailwind CSS 3.4 with custom brand theme
- Email: Resend (transactional emails)
- Speech-to-text: Deepgram Nova-3 (survey observation transcription)
- LLM: OpenRouter / `anthropic/claude-sonnet-5` (report narratives, observation polishing)
- PDF: @react-pdf/renderer (quotation PDFs)
- Drag-and-drop: @dnd-kit (Kanban board)
- Calendar: FullCalendar 6.x (booking management)
- Deploy target: Coolify + Traefik on Hetzner EX44, auto-deploy on push to `main`

## How to work locally

All commands run from `survey-system/` directory:

- Install: `npm ci`
- Build: `npm run build` (production build; validates routes compile)
- Lint: `npm run lint` (ESLint)
- Dev: `npm run dev` — **DO NOT USE**. Commit and push; Coolify handles deployment.
- Type-check: not a separate script; `ignoreBuildErrors: true` in next.config.mjs means the build does not fail on type errors
- DB types: `npm run db:generate` (generates `types/database.types.ts` from Supabase)
- Parity suite (MANDATORY before any costing push): `python3 parity/oracle/run_oracle.py --all` → `cd survey-system && npx tsx scripts/parity/run-engine.ts --all` → `python3 parity/compare.py --all` (15/15 must PASS)
- DB migrations: applied manually via `docker exec -i supabase-db-y04kk0wwoswogw0oowcs04gw psql -U supabase_admin -d postgres < supabase/migrations/<filename>.sql`

## Ground truth

- Code of record: `survey-system/src/`
- Data model: `survey-system/supabase/migrations/` (applied manually via docker exec; see How to work locally)
- Pricing logic source of truth: original Excel workbooks at project root (`*.xlsm`, `*.xls`) — all 220 costing line templates must match these
- Architecture: `docs/ARCHITECTURE.md`
- Deploy/rollback: `docs/DEPLOYMENT.md`
- Current focus and open threads: `docs/PROJECT_STATE.md`
- Workbook analysis: `docs/workbook-analysis/`
- Training guides: `docs/training/` (role-based onboarding docs with live screenshots)

## Conventions

- Commits: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`), commit directly to `main` per server policy
- PRs: not used on this repo (server-wide rule)
- What is committed: `survey-system/src/`, `survey-system/supabase/migrations/`, docs, config files, Dockerfile
- What is ignored: `node_modules/`, `.next/`, `.env`, `.env.local`, `build/`, `dist/`, `.claude/`
- Toast notifications use `sonner` — never use `alert()` calls; confirmations use `ConfirmDialog` (`src/components/ui/confirm-dialog.tsx`), never native `window.confirm()` (invisible under automation, blockable, and silently no-ops — the report Finalise button shipped broken this way). Two legacy `window.confirm` calls remain in `EnquiryDrawer.tsx`
- Enquiry source values stored in Title Case
- Display terminology (frozen 2026-07-05): the pipeline object is a **"Lead"** in all UI text (DB tables/types stay `enquiries`/`Enquiry`); booking status `scheduled` displays as **"Booked"** everywhere. `enquiry_activity` titles store raw status slugs — render via `humanizeActivityTitle()` from `src/lib/status-labels.ts`; never write display labels into activity rows
- Server actions body size limit is 10MB (photo uploads)
- Route param `[projectId]` in `/survey/` routes is historical — it refers to survey ID
- **Surveys are created only through the pipeline** (New Lead → Convert & Book → `createSurveyFromEnquiry()`, the sole creation path since 2026-07-05). Never re-add a direct survey-creation form — surveys without `enquiry_id` are invisible to fees, bookings, and pipeline tracking. Repeat customers (landlords/agents) link via the New Lead existing-customer search (`enquiries.customer_id`); free revisits use Convert & Book's "No survey fee" option (booking created `scheduled`, lead goes straight to `booked`, no payment record). Every survey now has an enquiry: the 22 pre-pipeline orphans were backfilled 2026-07-06 (migration `20260706000001`) — backfilled enquiries carry `source = 'Historical Import'` and `internal_reference` = the survey's project number
- Survey list lives at `/surveys`; per-survey sub-pages (wizard, costing, report, handover, installer-info) live under `/survey/[projectId]/`
- `client_name` can be null — always use `(project.client_name || '')`

## Gotchas

- **Public tokenized pages (`/q/[token]`, `/pay/[token]`, `/report/[reportId]`) must export `dynamic = 'force-dynamic'`.** Next 14 caches server-component Supabase fetches by default — /q served "Accept/Decline" after acceptance and /pay served "Awaiting Payment" after payment until this was added. Any new public page that reads mutable state needs the same export.
- **`company_profile` has no `phone`/`email`/`company_name` columns.** Real names: `name`, `trading_name`, `phone_primary`, `email_primary`, `registered_address_*`. A select with guessed column names fails and the data arrives as `null` with no visible error (the /pay contact block vanished this way) — alias in the select if a page wants different field names.
- **Moisture readings display as `% WME`** (Wood Moisture Equivalent) everywhere — table renders, LLM prompts, and the report abbreviations key. Never reintroduce `W/W`.
- **Two different user UUIDs exist — always use `profile.id`, never `user.id`.** `useAuth()` exposes `user.id` (Supabase Auth UUID from `auth.users`) and `profile.id` (`user_profiles` UUID). All FK columns (`enquiry_activity.user_id`, `enquiries.assigned_to`, `payments.recorded_by`, `survey_bookings.created_by`, `notifications.user_id`) reference `user_profiles.id`. Passing `user.id` causes FK violations.
- `typescript.ignoreBuildErrors: true` in next.config.mjs — type errors do not fail the build. Run `npm run lint` to catch issues before push.
- TTDP Postgres is not host-mapped. Access only via Kong API gateway or `docker exec -it supabase-db-y04kk0wwoswogw0oowcs04gw psql -U supabase_admin -d postgres`.
- Edge functions in `supabase/functions/` are legacy dead code — all LLM/email operations use Next.js API routes under `src/app/api/`.
- `survey_type` enum includes `structural`, `comprehensive`, and `site_preparation` — `site_preparation` has 3 costing sections but no wizard steps or report templates; the other two have nothing — selecting them creates dead-end surveys.
- The 13 survey-type extension tables (`survey_damp_report`, etc.) are provisioned but unused — the wizard stores everything in `survey_rooms.room_data` JSONB.
- `public/images/woodworm/` contains static reference images (beetle photo + 3 treatment equipment photos) used by the report generator. The beetle image is CC BY 3.0 (CSIRO attribution required).
- Customer-facing reports intentionally hide all m², area, volume, and joist size/quantity data. The internal editor still shows these. Do not re-add measurements to `RoomFindingsSection.tsx` or `ScopeOfWorksSection.tsx`. The LLM narrative is guarded too: the system prompt in `api/generate-report/route.ts` and both executive-summary prompts in `report-generator.ts` forbid quoting measurements (moisture % WME allowed) — don't weaken those instructions.
- The TTDP OpenRouter key (own account, £10/week limit, key in `.env.local`) only reaches models enabled in that account's privacy settings — currently `anthropic/claude-sonnet-5`. A "No endpoints available matching your guardrail restrictions and data policy" 404 means the account setting, not the code. When an LLM feature breaks, curl OpenRouter directly with the container's key before debugging code (grok-4.1-fast died this way — deprecated upstream, surfaced as silent UI failures).
- Client-side code must call internal API routes with **relative URLs**. `NEXT_PUBLIC_SITE_URL` is not set in the Coolify build, and `NEXT_PUBLIC_*` is inlined into client bundles at build time — an absolute-URL fallback sent report generation to `localhost:3000` from users' browsers.
- Treatment methodology step counts: membrane 8, tanking 7, DPC injection 4, wet rot 11, dry rot 13, woodworm 7. These are hardcoded constants in `report-generator.ts`, not in the database.
- Guarantee paragraph in `report-generator.ts` is hardcoded — does not read `guarantee_years`/`guarantee_scheme_name` from company profile. Covers: 25-year on rising damp/dry rot/woodworm, 7-year on mould, Protected Guarantee scheme. For handover pack, guarantee type is derived from survey type via `deriveGuaranteeType()` in `handover-pack.ts`.
- `survey_bookings` has a `status` column: `provisional`, `scheduled`, `completed`, `cancelled`, `no_show`. Status transitions are enforced by `validateStatusTransition()` in `calendar-types.ts` (provisional → scheduled/cancelled, scheduled → completed/no_show/cancelled, terminal statuses have no outgoing transitions). Provisional bookings are created by Convert & Book (awaiting survey fee payment), can be confirmed/paid from the calendar modal, and auto-released by cron if payment expires.
- `communication_log.channel` supports: `email`, `sms`, `in_app` (system-generated), `phone`, `whatsapp`, `in_person` (manually logged). Manual entries use status `logged`.
- `payments` table tracks survey fees and deposits with token-based public access. Two types: `survey_fee` (paid via `/pay/[token]`) and `deposit` (auto-created on quotation acceptance, office marks paid).
- `enquiries` has `won_at` (set when deposit marked paid) and `cf_exported_at` (set on CF CSV download) columns. Pipeline status flow: new → awaiting_payment → booked → survey_complete → sent → won → closed. Side lanes: on_hold, lost. Handover pack page at `/survey/[projectId]/handover/` provides all CF exports.
- The Next.js app lives in `survey-system/` subdirectory, not project root. All npm commands must run from there.
- `RoleGuard` in `admin/layout.tsx` blocks surveyors from `/admin/*` routes except `/admin/availability` and `/admin/workload`. `enquiries/layout.tsx` blocks surveyors from `/enquiries/*`. API routes for payments, quotations, and admin endpoints check `user_profiles.role` and return 403 for unauthorised roles.
- All writes to `surveys.survey_data` JSONB must go through `serializeWrite()` from `src/lib/write-queue.ts` to prevent race conditions between wizard auto-save, photo uploads, and sketch uploads.
- Sketch plan uploads in the report editor store files in `survey-photos` bucket under `{surveyId}/sketch/` and link to the `sketch_plan` report section's `photos` array via `updateReportSectionPhotos()`. Supports JPEG, PNG, and PDF.
- Supabase Auth SMTP is not configured on the TTDP instance (`GOTRUE_SMTP_HOST` is blank). Password reset emails silently fail. To reset a user's password: Admin API PUT + `must_change_password` flag on `user_profiles`.
- The shared `Input` component (`src/components/ui/input.tsx`) auto-shows a password visibility toggle (Eye/EyeOff) for any `type="password"` field.
- Pricing config values live in the `pricing_config` table and are editable at `/admin/rates` — never hardcode rates in code (the last hardcode, `cf-csv-export.ts`'s £30.63/hr, was fixed 2026-07-11: `generateCFCSV` takes the rate as a parameter — keep passing it from `pricing_config`; travel's 6.5 h/day and 30 mph are config keys now too).
- **Material price precedence (2026-07-11, map: `docs/workbook-analysis/PRICING_CONTROL_MAP.md`):** templates with a `product_key` price from `materials_catalog` FIRST (ceiling_coverage, whole_pack, compound components, dpc_injection's cream + drill-plug pack); `params.pack_cost`/`base_cream_cost`/`drill_cost` are fallback snapshots for deactivated materials — never move them back ahead of the catalog. `standard`/`fixed_price` lines price from `base_unit_cost` (the workbook's per-line architecture). `drill_plugs_12mm` is a PACK-of-100 price (£4.29) — never restate it per-plug.
- **Pricing tables are DB-hardened (migration `20260711000007`):** writes to `pricing_config`/`materials_catalog`/`costing_line_templates`/`costing_sections` require an active **admin** profile (RLS via `is_pricing_admin()` — office and surveyor writes return 0 rows even via raw PostgREST). Every change is trigger-audited into `pricing_change_log` (SECURITY DEFINER trigger is the ONLY writer; never insert into it from app code). Admin pricing inputs must use `NumberField` (`components/admin/`) — never `parseFloat(x) || 0`, which silently committed £0 on cleared fields; saves go through the `PricingSaveConfirm` diff modal.
- **Smoke baselines vs parity:** the admin smoke check (`src/lib/pricing-smoke.ts`) compares 5 reference jobs against `pricing_smoke_baselines` — the platform vs its own last-accepted prices, NOT vs the workbooks. After a deliberate structural costing change passes parity, refresh baselines with `npx tsx scripts/smoke/seed-baselines.ts` (`--check` = read-only diff). Summary math (section adj/travel/VAT/deposit) lives in `src/lib/costing-summary.ts`, imported by the parity runner (so parity gates it); the costing page still carries its own copy of that math — change them together.
- **The Excel workbooks are the costing golden master; the parity harness (`parity/`, README there) is the release gate.** No costing change (engine, mapping, templates, pricing_config, materials_catalog) is complete until `run_oracle.py` → `run-engine.ts` → `compare.py` passes for ALL scenarios. Never edit an oracle cellmap to make a test pass. Full damp parity achieved 2026-07-11 (batches 1-3).
- **DPC thickness is `dpc_wall_thickness_m` in METRES** (workbook E40 free-numeric semantics, e.g. 0.33 = 330mm). `dpc_wall_depth` (brick courses) is deprecated: mapping falls back to `courses × 0.215m` and the wizard shows a re-enter prompt — never reintroduce a courses control. DPC labour is flat 0.35h/LM; thickness affects material volume only (review point 6).
- **Floor-resin components are independent quantities** (`resin_topcoat_area`/`resin_primer_area`/`resin_grip_grit_area`, workbook rows 69-72) — priced only when > 0, never fanned out from one area (review 14A). Legacy surveys with only `floor_area` map to TOP-COAT-ONLY. `floor_treatment: 'none'` must price nothing.
- The customer reinstatement responsibility note appears on all damp survey reports (membrane, injection, tanking) — amber callout in scope of works, same pattern as the electrical standards and asbestos notes. Do not remove it.
- **The offline layer (`src/lib/offline/`) is wizard-only.** It mirrors surveys + photos + audio for the survey wizard and the /surveys list only. NEVER route office surfaces (costing, reports, quotations, Kanban, calendar, admin) through it — they stay online. The wizard reads/writes via `local-data.ts`/`photos-offline.ts`, never the raw `survey-wizard-data.ts`/`survey-photo-service.ts` directly; the sync engine is the only caller of those (and only when online). Their RMW merge on `survey_data` is load-bearing — don't reimplement it. The /surveys list works offline via a kv write-through cache (`surveysListCache` in `local-data.ts`, written on page load + each prefetch cycle) — needed because `getSurveys()` swallows network errors and returns `[]`, which offline is indistinguishable from an empty DB.
- **Offline photo uploads use deterministic paths** `${surveyId}/${step}/${photo.id}.jpg` with `upsert:true` (NOT the legacy `${timestamp}-${random}.jpg`) so a retry-after-timeout can't duplicate the storage object; `appendPhotoMetadata` dedupes by photo id so replay can't double-record. Don't reintroduce random filenames in the offline path.
- **`AuthContext` caches the `user_profiles` row in Dexie `kv`** so `role`/`profile.id` survive offline (session hydrates from cookies but the profile fetch is a network call). Cleared on `SIGNED_OUT` and on confirmed logout (which wipes the whole `ttdp-offline` DB — no cross-user residue). Always use `profile.id` for FK writes as before.
- **The service worker (`src/app/sw.ts`, Serwist) must never cache** PostgREST (`/rest/v1/`), auth (`/auth/v1/`), `/api/*`, non-GET, or the public tokenized pages (`/q`, `/pay`, `/report` — they're `force-dynamic` and must stay fresh); those are NetworkOnly. Pages are NetworkFirst(3s) into `ttdp-pages`, survey photos CacheFirst. Generated `public/sw.js` is gitignored (rebuilt each Coolify deploy). Offline-reload/cold-launch depends on the SW; test cold navigations with Playwright `wait_until='commit'` (offline realtime WebSocket never settles `domcontentloaded`).
- **The SW seeds the shell pages (`/`, `/login`, `/surveys`) on activate** — don't remove that handler. The session's first navigation happens before the SW controls the page and App Router soft navigations never hit the `navigate` matcher, so without activate-seeding, `start_url` (`/`) never enters `ttdp-pages` and a cold offline launch of the installed app fails. Also: iOS home-screen apps have their own storage container, fully separate from Safari — SW registration/caches from a Safari session do not carry over, so the installed app's **first launch must be online** (documented in the surveyor guide install steps).
- **Offline, taps into a survey must be document (hard) navigations.** The `/surveys/<id>` hub is online-only and dead-ends without network, so the /surveys list swaps card links to plain `<a href="/survey/<id>/wizard">` when the connectivity monitor reports offline, and the hub hard-redirects to the wizard when its load fails and a local mirror exists (`hasLocalMirror()`). Prefetch seeds both hub and wizard HTML per mirrored survey, and posts SEED_URLS via `serviceWorker.ready` → `registration.active` — never gate seeding on `navigator.serviceWorker.controller`, which is null for the entire first session after install and silently skips seeding on a freshly installed app. Surveys outside the today+tomorrow booking prefetch window are covered by the manual Download button on /surveys (`downloadSurveyOffline()` in `prefetch.ts`).
- **Resend SDK options are camelCase** (`replyTo`, `attachments`) — snake_case `reply_to` is silently dropped by the SDK (Reply-To was never set until 2026-07-12). All sends go through `sendEmail()` in `lib/email-service.ts`.
- **Service clients that read company/customer-facing data must pass a no-store fetch** (`global: { fetch: (i, init) => fetch(i, {...init, cache: 'no-store'}) }`). Fetches made during `generateMetadata` do NOT inherit the page's force-dynamic no-store default — the Next Data Cache served a stale company profile on /report this way. Every existing service client already does this; copy the pattern for new ones.
- **Customer quotation rendering goes through `buildCustomerQuotationView()`** (`lib/quotation-presentation.ts`) — /q, the quotation PDF, and the internal Customer Preview all consume the same view model (that preview once lied about per-item prices). Never derive customer figures directly in a renderer. Its reconciliation guard logs (never throws) when displayed lines drift from stored totals; legacy snapshots carry ~3p float noise.
- **Customer document sends must pass the duplicate-send guard** (`lib/customer-send-guard.ts`): all three send routes (approve-and-send, quotation resend, report resend) 409 on a prior successful send; the UI requires typing RESEND; first sends claim `sent_at` atomically (double-click safe, claim released on failure). Never add a send path that bypasses this.
- **Custom external defect photos link by stable id** — `photo.category = custom_defect_<defect.id>`; the caption is the title at capture time. Never link custom-defect photos by title/label (editable, non-unique). Preset defects still use label-matching (`description === defect.label`) — legacy, don't extend it.
- **Company addresses, regional numbers and service-area towns come from the `company_locations` table** (managed at /settings/company, seeded from Steven's approved list) — never hardcode them in footers or customer documents. `service_area` rows render as town names only, never as postal offices.
- **The wizard header's job context is `surveyContext` on the offline mirror** (`LocalSurvey.surveyContext`, populated by `fetchFromServer` in `lib/offline/local-data.ts`) — read-only display data stored ALONGSIDE `survey_data`, never inside it, and never synced back. Booking/admin notes shown there are structurally excluded from customer reports (report-generator reads only survey_data).

- **Warmline DC is a first-class Wall Treatment input (review pt 4):** damp `warmline_insulation_area` lives ungated in the wizard's Wall Treatment section — never re-gate it behind membrane/tanking or move it back into Plastering (that burial made Steven abandon a live survey). It stays an independent area input, NOT a `WallTreatment` union member: the workbook prices it alongside membrane/tanking (row 79, own customer-summary section, shares the plastering section adjustment) via the existing `plastering:warmline_iwi` + `warmline_iwi_adhesive` templates. Timber's wall field is `warmline_wall_area` (R73) — distinct from timber's suspended-floor `warmline_insulation_area`. Report side: `METHODOLOGY_WARMLINE` + scope items trigger on the areas, independent of `wall_treatment`.

- **Contractor/operative outputs come from `lib/contractor-costs.ts` and are parity-gated** (workbook U/V columns, per-line + totals, 15/15). Rules: materials = `materialAdjustedCost` × `contractor_material_uplift`, pay = hours × `contractor_hourly_rate`, travel = labourDays × round-trip miles × `contractor_mileage_rate`; `tiered_disposal`/`skip_hire` rows are third-party invoices — never operative pay. Customer section adjustments and markups NEVER touch contractor figures. These are internal (admin/office): never render them on customer surfaces or operative work instructions beyond pay rate + travel allowance. Assignments live in `survey_subcontractor_costs` (unique per survey+section; computed fields refresh, office fields survive).

## Do not touch

- `workbook_extraction/` — analysis scripts for the original Excel workbooks; reference only
- `*.xlsm`, `*.xls`, `*.csv` at project root — original Excel workbooks and exports
- `survey-system/node_modules/`, `survey-system/.next/`, `survey-system/dist/` — build artefacts
- `survey-system/supabase/functions/` — legacy edge functions, not in active use
- Anything listed in `.gitignore`
