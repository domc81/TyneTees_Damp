# TyneTees Damp — Architecture

## System overview

```
Customer ──→ Enquiry Pipeline ──→ Survey Wizard ──→ Costing Engine ──→ Quotation ──→ Report
                  │                     │                │                  │            │
              Kanban board       Room-by-room        9 formula         PDF + email   LLM narrative
              (drag-drop)        inspection          types             public page   public page
                  │                     │                │
              Calendar/          Voice recording     Mapping engine
              Bookings           + AI polish         (aggregates rooms)
```

The Next.js app (`survey-system/src/`) serves both the internal staff UI and public-facing pages (quotation acceptance, report viewing). All authenticated pages are client-rendered; public pages use Server Components.

## Repository layout

```
TyneTees_Damp/
├── CLAUDE.md / AGENTS.md / README.md
├── survey-system/                   # Next.js application root — ALL npm commands run from here
│   ├── src/
│   │   ├── app/                     # App Router pages
│   │   │   ├── page.tsx             # Dashboard (stats, pipeline widget, activity feed)
│   │   │   ├── admin/               # RoleGuard admin/office: availability, costing, materials, rates, team, workload
│   │   │   ├── api/                 # 29 API routes (table below)
│   │   │   ├── calendar/            # Booking calendar (FullCalendar)
│   │   │   ├── enquiries/           # Pipeline Kanban + new enquiry form (RoleGuard layout)
│   │   │   ├── materials/           # Materials catalogue view
│   │   │   ├── pay/[token]/         # Public survey fee payment page
│   │   │   ├── q/[token]/           # Public quotation page
│   │   │   ├── report/[reportId]/   # Public report view
│   │   │   ├── settings/            # Settings hub + company profile + notification prefs
│   │   │   ├── training/            # In-app training hub + 4 role-based guides
│   │   │   ├── survey/[projectId]/  # costing/ handover/ installer-info/ operations/ quotation/ report/ wizard/
│   │   │   ├── surveys/             # Survey list + [surveyId] detail
│   │   │   └── login/ forgot-password/ change-password/ update-password/
│   │   ├── components/              # layout, ProtectedRoute, RoleGuard, EnquiryDrawer, NotificationBell,
│   │   │                            # calendar/, installer-info/, report/ (21), training/ (5), ui/, wizard/ (13)
│   │   ├── context/                 # AuthContext, CompanyProfileContext
│   │   ├── hooks/                   # useSmartBack
│   │   ├── middleware.ts            # Supabase SSR session management + token rotation
│   │   ├── lib/                     # 41 library files (index below)
│   │   └── types/                   # database / survey-wizard / survey-report / survey-photo / installer-info types
│   ├── supabase/migrations/         # 56 SQL migrations (applied manually via docker exec)
│   ├── supabase/functions/          # Legacy edge functions — dead code
│   ├── public/images/woodworm/      # Beetle + treatment equipment reference images
│   ├── Dockerfile                   # Multi-stage node:22-alpine, standalone output, port 3000
│   ├── next.config.mjs              # standalone output, 10MB server actions, ignoreBuildErrors
│   └── tailwind.config.ts           # Brand theme, custom animations, glass effects
├── supabase/migrations/             # 1 root-level migration (allow_published_status)
├── docs/                            # ARCHITECTURE, DEPLOYMENT, PROJECT_STATE, specs/, audits/, plans/,
│   │                                # guides/, setup/, training/ (+ 35 screenshots), workbook-analysis/
├── workbook_extraction/             # Excel workbook analysis scripts (reference only)
└── *.xlsm, *.xls, *.csv             # Original Excel workbooks & exports (pricing source of truth)
```

## Components

### Frontend (Next.js 14, App Router)

- **Dashboard** — survey stats, enquiry pipeline widget, recent activity feed
- **Enquiry Pipeline** — Kanban board via @dnd-kit; stages New → Awaiting Payment → Booked → Survey Complete → Sent → Won → Closed (side lanes: On Hold, Lost); detail drawer with tabs, inline editing and integrated customer management (contact/site edits propagate to the linked survey, live bookings and customer record via `propagateEnquiryContactDetails()`); SLA traffic lights; auto-status transitions; on-hold email templates; convert-and-book flow (enquiry → customer + survey + provisional booking + survey fee payment)
- **Survey Wizard** — 5-step room-first workflow: Site Details → External Inspection → Room Inspection (repeats) → Additional Works → Review. Voice recording via Deepgram, photo capture with visibility tiers (customer/technician/office), auto-save with 2-second debounce. Per-finding urgency (green/amber/red) captured via UrgencySelector on all issue types. Review step includes proposal quick-select (13 predefined items) and limitations quick-select (12 access restrictions)
- **Costing Review** — auto-calculated from wizard data, section-by-section breakdown with adjustment controls, multi-survey-type tabs
- **Quotations** — PDF generation via @react-pdf/renderer, email delivery, public accept/decline page with e-signature; deposit payment auto-created on acceptance
- **Reports** — LLM-generated narrative (`anthropic/claude-sonnet-5` via OpenRouter), section editor with sketch plan upload (JPEG/PNG/PDF), status workflow, public branded web report with navy gradient hero cover + Tyne Bridge SVG watermark. Traffic light urgency system: per-finding green/amber/red indicators in wizard flow through to report — executive summary shows overall status badge with finding counts, room headers colour-coded by urgency. "How to Read This Report" 3-card guide renders after executive summary. Report editor includes completeness validation panel (missing photos, urgency, proposals). Sketch images render full-width with lightbox on public report; PDF sketches use embedded viewer with download fallback. Customer-facing view hides all measurements (m², joist sizes) and filters out non-customer-visibility photos. Woodworm reports include beetle reference image, treatment equipment photos, and loft insulation note. Damp reports include customer reinstatement responsibility disclaimer.
- **Calendar** — FullCalendar with booking management, surveyor availability, booking notifications, confirm/mark-as-paid for provisional bookings, reschedule with SlotPicker, booking status state machine (provisional → scheduled → completed/no_show/cancelled), confirmation dialogs on all status changes, daily reminders, auto-release of expired provisional bookings (cron)
- **Payments** — survey fee flow (public `/pay/[token]` page), deposit collection on quotation acceptance, office mark-as-paid, payment link emails
- **CF Handover** — handover pack page at `/survey/[projectId]/handover/` (admin/office only): customer CSV, CF estimate CSV, photos ZIP (server-side JSZip), job summary text with clipboard copy, report link, guarantee derivation, "Mark as Closed" action
- **Operations** — `/survey/[projectId]/operations/` (admin/office only): contractor pay/hours/days/travel/crew summary tiles; per-section pay + hours with persisted assignments and notes (`survey_subcontractor_costs`, Warmline split into its own row like the workbook's Sub Contractor Costs tab); material list = the damp workbook's Material-List purchase quantities (packs/rolls/bags + UOM, `lib/material-purchase-list.ts`) with a measurement table for survey types the workbooks left "TBC"; printable operative work instruction (scope, measurements with units, pay rate, travel allowance — never customer prices or margins)
- **Notifications** — in-app realtime notifications (Supabase Realtime) with per-event preference management
- **Settings** — company profile, logo upload, notification preferences, test email delivery
- **Training** — in-app training hub at `/training` with role-aware recommendations, 4 styled guides, 35 screenshots, sticky ToC, lightbox
- **Admin** — materials catalogue (CRUD), costing line templates (formula params, pricing), pricing rates, surveyor availability, team management, workload dashboard. All three pricing pages share the hardening components (`components/admin/`): validated `NumberField` inputs, old→new `PricingSaveConfirm` diff modal on every save, `PricingSmokeCheck` reference-job delta panel (auto-runs post-save), `PricingChangeLog` audit-trail viewer

### Backend (Next.js API routes + Supabase)

29 API routes handle server-side operations requiring secrets (LLM calls, email sending, PDF generation, cron triggers). All CRUD for surveys, enquiries, bookings, and notifications is done via direct Supabase client SDK calls from the frontend, not through API routes. The canonical data access layer is `src/lib/supabase-data.ts`.

| Route | Purpose |
|---|---|
| `/api/admin/team` | Team member CRUD (service role) |
| `/api/bookings/notify` | Booking notification emails |
| `/api/cron/booking-reminders` | Daily booking reminder (cron, requires CRON_SECRET) |
| `/api/cron/release-unpaid-bookings` | Cancel expired provisional bookings (cron, requires CRON_SECRET) |
| `/api/enquiries/[id]/notify-on-hold` | On-hold customer email notification |
| `/api/generate-report` | LLM report narrative generation (OpenRouter) |
| `/api/notifications/trigger` | Programmatic in-app notification creation |
| `/api/pay/[token]` | Process survey fee payment (public) |
| `/api/payments/[paymentId]/mark-paid` | Mark payment as paid (office action) |
| `/api/payments/send-link` | Send survey fee payment link email |
| `/api/polish-observation` | LLM polish voice-transcribed observations (OpenRouter) |
| `/api/q/[token]/pdf` | Public quotation PDF download |
| `/api/q/[token]/respond` | Public quotation accept/decline |
| `/api/q/[token]/view` | Track public quotation view |
| `/api/quotation-pdf/[quotationId]` | Internal quotation PDF generation |
| `/api/quotations/[id]/send` | Send quotation email |
| `/api/report/[reportId]` | Public report data fetch |
| `/api/report/[reportId]/view` | Track public report view |
| `/api/reports/[id]/send` | Send report email |
| `/api/settings/company` | Company profile CRUD |
| `/api/settings/company/locations` | Company locations CRUD (registered/regional/service areas/numbers) |
| `/api/settings/company/logo` | Logo upload |
| `/api/settings/notifications` | Notification preference CRUD |
| `/api/settings/notifications/test-email` | Test email delivery |
| `/api/surveys/[id]/photos-zip` | Download survey photos + sketches as ZIP (handover) |
| `/api/surveys/[id]/approve-and-send` | Combined approve report + send report & quote email |
| `/api/surveys/[id]/quotation` | Generate quotation from survey |
| `/api/transcribe` | Deepgram speech-to-text |
| `/api/client-error` | Browser error reports from public-page error boundaries (rate-limited, tokens hashed) |

**Public routes** (excluded from auth middleware): `/api/q/*`, `/api/report/*`, `/api/pay/*`, `/api/client-error`. Middleware (`src/middleware.ts`) handles Supabase SSR session management and JWT refresh; route protection is client-side (`ProtectedRoute`, `RoleGuard`), not middleware.

### Component & lib index

- **Wizard components (14):** `WizardStepper`, `SurveyContextHeader` (read-only job context header), `SiteDetailsStep`, `ExternalInspectionStep`, `RoomInspectionStep`, `DampFields`, `CondensationFields`, `TimberFields`, `WoodwormFields`, `AdditionalWorksStep`, `ReviewStep`, `AudioRecorder`, `PhotoCapture`, `UrgencySelector`
- **Report components (21):** `CoverSection`, `ExecutiveSummarySection`, `ReportGuideSection`, `PropertySection`, `ExternalInspectionSection`, `RoomFindingsSection`, `ScopeOfWorksSection`, `TreatmentMethodologySection`, `WoodwormTreatmentSection`, `CondensationCausesSection`, `SurveyContextSection`, `SurveyorProfileSection`, `AboutUsSection`, `BoilerplateSection`, `ReportHeader`, `ReportFooter`, `PhotoGrid`, `PhotoLightbox`, `TextSection`, `TextContent`, `utils`
- **Lib (41 files):**
  - Supabase: `supabase-client.ts` (browser), `supabase-server.ts` (server), `supabase-data.ts` (canonical data layer)
  - Pricing: `pricing-engine.ts` (9 formula types), `pricing-data.ts`, `survey-mapping.ts`, `travel-overhead.ts` (post-engine), `contractor-costs.ts` (operative outputs — workbook U/V, parity-gated) + `subcontractor-data.ts` (assignment rows), `material-purchase-list.ts` (damp workbook Material-List purchase quantities — parity-gated; measurement lists for non-damp types), `costing-summary.ts` (shared summary math — section adj/travel/VAT/deposit; imported by the parity runner, so golden-master-gated), `pricing-smoke.ts` (reference-job smoke check vs `pricing_smoke_baselines`; scenarios in `lib/smoke/scenarios/`), `pricing-audit.ts` (change-log reads)
  - Survey: `survey-wizard-data.ts` (persistence/auto-save), `survey-photo-service.ts`, `survey-tags.ts`
  - Reports: `report-generator.ts` (boilerplate + LLM narrative + methodology + woodworm images), `report-data.ts`, `report-publish.ts`, `report-validation.ts`
  - PDF: `quotation-pdf-renderer.tsx` · Quotation view: `quotation-presentation.ts` (single customer view model for /q + PDF + internal preview)
  - Email: `email-service.ts` (incl. attachments), `email-templates.ts`, `email-config.ts`, `customer-send-guard.ts` (duplicate-send 409 guard)
  - Calendar: `calendar-data.ts`, `calendar-types.ts` · Company: `company-profile.ts`, `company-locations.ts` (central addresses/numbers record)
  - Installer info: `installer-info-categories.ts`, `installer-info-data.ts`
  - Notifications: `notifications-server.ts`, `notification-preferences.ts` · Payments: `payment-data.ts`
  - CSV/handover: `cf-csv-export.ts`, `cf-export-config.ts`, `handover-pack.ts` (incl. `deriveGuaranteeType()`)
  - Concurrency: `write-queue.ts` (per-survey serialized writes) · Proposals: `proposal-items.ts`
  - Utilities: `cron-auth.ts`, `terms-hash.ts`, `status-labels.ts` (activity-title humanizer) · Tests: `cf-csv-export.test.ts`, `__tests__/pricing-engine.smoke.ts`
- **UI primitives (`components/ui/`):** `button`, `card`, `input` (auto password toggle), `confirm-dialog` (styled `window.confirm` replacement — required for all confirmations)
- **Settings (`components/settings/`):** `CompanyLocationsSection` (locations CRUD on /settings/company) · **Public error UI:** `components/PublicErrorFallback.tsx` + `error.tsx` boundaries on /q, /pay, /report · **CRM:** `CfReferencePrompt` (soft Save/Skip modal for `surveys.cf_project_reference` at win touchpoints; field also editable on the survey hub)
- **Admin shared (`components/admin/`):** `NumberField` (validated numeric input — mandatory for pricing fields), `PricingSaveConfirm`, `PricingSmokeCheck`, `PricingChangeLog`

### Database (Supabase / PostgreSQL)

Self-hosted Supabase stack (14 containers, prefix `y04kk0w`). 45 tables across these clusters:

- **CRM:** `enquiries` (incl. `won_at`, `cf_exported_at`, on-hold/decline reasons), `enquiry_activity`, `on_hold_message_templates`, `customers`, `communication_log`
- **User & Team:** `user_profiles`, `platform_settings`, `notification_preferences`
- **Surveys:** `surveys` (central table, `survey_data` JSONB, `tags` TEXT[], `cf_project_reference` — manual Contractor Foreman ID), `survey_rooms` (`issues_identified` TEXT[] + `room_data` JSONB), `survey_images`, `photos`, `survey_installer_info`
- **Survey-type extensions (provisioned but UNUSED — wizard stores everything in JSONB):** `survey_damp_report`, `survey_damp_wall_readings`, `survey_condensation_report`, `survey_condensation_rooms`, `survey_timber_report`, `survey_timber_rooms`, `survey_woodworm_report`
- **Costing:** `costing_sections` (44), `costing_line_templates` (220), `pricing_config` (18 values — table below), `materials_catalog` (34 products), `survey_costing_lines`, `costing_section_adjustments`, `survey_customer_summary`, `survey_overheads`, `survey_subcontractor_costs`, `survey_caf1`, `pricing_change_log` (trigger-written audit of the 4 pricing tables), `pricing_smoke_baselines` (accepted reference-job totals)
- **Payments:** `payments` — `survey_fee` or `deposit` type, token-based public access, linked to enquiry/survey/quotation
- **Quotations:** `quotations` (draft → sent → viewed → accepted/declined), `quotation_sections`, `quotation_acceptances` (immutable e-signature audit), `quotation_views`
- **Reports:** `report_templates` (4, one per survey type), `survey_reports` (draft → generated → reviewed → finalised → published), `report_views`
- **Calendar:** `survey_bookings` (status state machine), `surveyor_availability`, `availability_blocks` (leave/absence)
- **Notifications:** `notifications` (realtime subscriptions)
- **Company:** `company_profile`, `company_locations` (registered office / regional offices / service areas / contact numbers — feeds report footer)
- **Support:** `client_errors` (browser failures reported by public-page error boundaries)

57 migrations total (56 in `survey-system/supabase/migrations/` + 1 root-level), applied manually via `docker exec`.

### Pricing config values (`pricing_config`, editable at `/admin/rates`)

| Key | Value | Description |
|-----|-------|-------------|
| hourly_labour_rate | 30.63 | Base hourly labour rate (£) |
| contractor_hourly_rate | 28.00 | RESERVED — subcontractor pay (workbook E155) for operative outputs; not in customer pricing |
| default_material_markup | 0.30 (30%) | Default material markup |
| default_labour_markup | 1.00 (100%) | Default labour markup |
| default_wastage_factor | 1.10 (10%) | Default wastage factor |
| vat_rate | 0.20 (20%) | VAT rate |
| vehicle_cost_per_mile | 0.50 | Vehicle running cost per mile (£) |
| skip_hire_8yd_cost | 270.00 | Skip hire 8 yard base cost (£) |
| damp_deposit_pct | 0.30 (30%) | Damp survey deposit percentage |
| condensation_deposit_pct | 0.50 (50%) | Condensation survey deposit percentage |
| timber_deposit_pct | 0.30 (30%) | Timber survey deposit percentage |
| woodworm_deposit_pct | 0.30 (30%) | Woodworm survey deposit percentage |
| survey_fee_amount | (configurable) | Survey fee charged upfront (£) |
| survey_fee_expiry_days | (configurable) | Days before unpaid provisional booking is auto-released |
| productive_hours_per_day | 6.5 | Working hours per man per day — drives days-on-site (was hardcoded; workbook magic number) |
| travel_speed_mph | 30 | Average travel speed converting miles → travel hours (was hardcoded; workbook magic number) |
| contractor_mileage_rate | 0.45 | RESERVED — subcontractor mileage (workbook ×0.45) for operative outputs |
| contractor_material_uplift | 1.10 (10%) | RESERVED — subcontractor materials uplift (workbook col U ×1.1) for operative outputs |

### External services

| Service | Purpose | Credential file |
|---------|---------|----------------|
| Supabase (self-hosted) | Auth, database, storage, realtime | `.ttdp-supabase-credentials` |
| OpenRouter (Claude Sonnet 5) | Report narrative generation, observation polishing | `OPENROUTER_API_KEY` in `.env.local` |
| Deepgram (Nova-3) | Speech-to-text for survey observations | `.deepgram-credentials` |
| Resend | Transactional emails (quotations, reports, bookings) | `.resend-credentials` |
| Cloudflare | DNS + CDN proxy | `.cloudflare-credentials` |
| Coolify | Container deployment | `coolify_api_token` |

## Internal data flow

### Main use case: survey → quotation

1. Office creates enquiry (Kanban board), converts to customer + survey + booking
2. Surveyor completes 5-step wizard — data stored in `surveys.survey_data` JSONB (property-level) and `survey_rooms.room_data` JSONB (per-room)
3. Mapping engine (`survey-mapping.ts`) aggregates all rooms into `LineInput[]` per costing section
4. Pricing engine (`pricing-engine.ts`) calculates material + labour costs using 9 formula types against `costing_line_templates` and `pricing_config`
5. Travel overhead (`travel-overhead.ts`) adds vehicle costs post-engine
6. Results written to `survey_costing_lines`, displayed in costing review page
7. Generate quotation → snapshots costing into `quotation_sections`, creates PDF
8. Send to customer → email with public link → customer accepts/declines with e-signature
9. Generate report → LLM writes narrative sections from survey data → publish as branded web page

### Pricing formula types (9)

- `standard` — material = base × wastage × quantity, labour = rate/unit × quantity (supports minimum_quantity)
- `ceiling_coverage` — CEIL(quantity / coverage) × pack price spread per unit × wastage (block/minimum labour options)
- `dpc_injection` — workbook R40 exact: cream/1.15 + (6/LENGTH)×drill-plug pack per unit; qty = length × thickness (m); labour = length × 0.35 flat. Cream + drill pack priced catalog-first (`wykamol_ultracure_dpc_cream`, `drill_plugs_12mm` = pack of 100)
- `compound_material` — multi-material mix per pack (e.g. damp dubbing coat = SBR + sand + cement per 2 m²)
- `whole_pack` — ROUNDUP(quantity / pack_size) × full pack price × wastage (timber resin/sterilant/protective/gel rows). Pack price catalog-first via `product_key` (`params.pack_cost` is a fallback snapshot); EP40 rows carry the workbook's baked ×1.1 in `wastage_factor`
- `fixed_price` — flat rate item, ignores quantity (PIV units, hatches)
- `tiered_disposal` — min-charge/per-bag threshold rates (licensed disposal)
- `bag_and_cart` — per-bag hours + per-bag material
- `skip_hire` — reads `skip_hire_8yd_cost` from pricing_config

Section-level defaults: `costing_sections.default_adjustment_pct` seeds the costing-page adjustment dials from the workbook masters (condensation `piv_loft` = −5%); editable per section at `/admin/costing`. VAT reads `pricing_config.vat_rate`. Deactivating a template (`is_active` toggle) silently drops its line from new costings via the mapping lookup — the smoke panel's line-count column is the guard for accidental deactivation.

Pricing hardening (migration `20260711000007`): writes to `pricing_config`/`materials_catalog`/`costing_line_templates`/`costing_sections` require an active admin profile (RLS via SECURITY DEFINER `is_pricing_admin()`); every change is trigger-audited into `pricing_change_log` (actor, changed fields, full old/new rows); the smoke check recomputes 5 reference scenarios through the live pipeline after each admin save and diffs against `pricing_smoke_baselines` (seed/refresh: `scripts/smoke/seed-baselines.ts`, `--check` for read-only).

**Pricing control coverage:** every workbook pricing input → platform home → admin surface is mapped in `docs/workbook-analysis/PRICING_CONTROL_MAP.md` (incl. material-price precedence per formula type). The client edits all prices through `/admin/rates`, `/admin/materials`, `/admin/costing` — no code changes.

### Golden-master parity harness (`parity/`)

The Excel workbooks are the costing golden master; the harness is the release gate (see `parity/README.md`). Oracle (`run_oracle.py`) evaluates the real .xlsm per scenario; runner (`survey-system/scripts/parity/run-engine.ts`) runs the real pipeline against live Supabase; `compare.py` diffs to ±£0.005. 15 scenarios incl. 6 generated full-coverage scenarios (`build_full_coverage.py`) exercising **every priced workbook row**. Audits and closure records in `parity/audit/` (RATES_AUDIT, ADMIN_AUDIT, CAPTURE_GAPS, batch before/afters).

## Offline layer — survey wizard PWA (`src/lib/offline/`)

Local-first PWA for the surveyor field surface only (the wizard + /surveys). Office surfaces stay online. Every wizard read/write hits IndexedDB first; a durable outbox syncs to Supabase when online, **reusing the existing server-write functions** — the sync engine is their only online caller.

**Module map:**
- `db.ts` — Dexie `ttdp-offline` v1: stores `surveys` (mirror), `outbox` (`++id`, `[surveyId+type]`), `blobs`, `photos` (registry), `kv`. `clearOfflineDB()` for logout.
- `connectivity.ts` — online/offline via browser hints + active Supabase `/auth/v1/health` probe (navigator.onLine lies on flaky signal); `timeoutSignal()` fallback for <iOS16.
- `outbox.ts` — enqueue with coalescing (`wizard_data`/`rooms`/`tags` keep one op per survey, preserving id/queue position), pending counts, retryable/fatal/retry, `cancelPendingPhotoUpload`.
- `sync-engine.ts` — online-gated flush: per-survey ordered drain (rooms → wizard_data → photo_* → tags → audio → enquiry_transition → notify_complete), Web Locks single-flight, retry/backoff (5s→5min), conditional-delete (op coalesced mid-flush isn't lost), temp `room-` id → DB uuid remapping with `onRemoteIdsMapped` bus. Executors for photo/audio ops are registered by their modules.
- `local-data.ts` — `loadWizardDataLocalFirst` (mirror-when-ahead/offline, fresh fetch when online+clean, `NotAvailableOfflineError` on offline miss — never blank defaults), `saveWizardLocal` (mirror + coalesced ops in one tx), `enqueueCompletionOps`, `prefetchMirror`, `hasLocalMirror`, `writeSyncedPhotos`.
- `photos-offline.ts` — `capturePhotoLocal` (blob + pending registry + queued upload; QuotaError), `usePhotoUrl` (blob URL pending / public URL synced), `loadSurveyPhotosLocalFirst`, `deletePhotoLocal`, `updatePhotoMetaLocal`, upload executor (deterministic path + upsert).
- `audio-offline.ts` — `queueAudioNote` (WAV blob + op + placeholder), transcribe executor (POST `/api/transcribe`, replace unique placeholder across the mirror, enqueue coalesced op), `onAudioTranscribed` bus.
- `prefetch.ts` — `prefetchSurveyorSurveys` mirrors today+tomorrow bookings, warms photo cache, seeds hub+wizard HTML per survey via `SEED_URLS` (posted through `serviceWorker.ready`, never gated on `.controller`); `downloadSurveyOffline` — manual single-survey download behind the Download pill on /surveys.
- `profile-cache.ts` — caches the `user_profiles` row for offline `role`/`profile.id`.
- Hooks `useConnectivity`/`useSyncStatus`; components `SyncStatusPill`/`OfflineReadyBadge` (downloaded/unsynced state pill; doubles as the manual Download button when not yet mirrored)/`StaleSyncBanner`/`InstallHint`/`OfflineBootstrap` (mounted in root layout — registers SW + executors, starts monitor/engine, kicks prefetch).
- PWA shell: `src/app/sw.ts` (Serwist) + `src/app/manifest.ts` + `public/icons/`.

**Sync data flow (write):** wizard field edit → `saveWizardLocal` writes the Dexie mirror + coalesce-enqueues `wizard_data`/`rooms`/`tags` in one transaction → `requestFlush()`. When online, the sync engine drains per survey in dependency order, calling `saveAllRooms`/`saveWizardData`/`updateSurveyTags`; on the rooms flush it maps temp ids and rewrites the mirror + pending photo/audio payloads. Photos capture to a local blob + pending registry row + `photo_upload` op; the executor uploads to the deterministic path and appends metadata (dedupe-by-id). Completion enqueues `enquiry_transition` + `notify_complete`. **Read:** `loadWizardDataLocalFirst` returns the mirror when it's ahead of / offline from the server, else fetches fresh and refreshes the mirror.

## Environment variables

| Variable | Scope | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase API base URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server | Admin Supabase access (bypasses RLS) |
| `OPENROUTER_API_KEY` | Server | LLM calls via OpenRouter |
| `DEEPGRAM_API_KEY` | Server | Speech-to-text transcription |
| `RESEND_API_KEY` | Server | Email sending (fallback — also loadable from platform_settings) |
| `CRON_SECRET` | Server | Authenticates cron-triggered API routes |
| `NEXT_PUBLIC_APP_URL` | Public | App base URL for email links |
| `NEXT_PUBLIC_SITE_URL` | Public | Fallback site URL |

## Non-obvious design decisions

- **Room-first survey model:** The wizard follows how a surveyor physically works (room by room), not issue-type-first. A single room can have multiple issue types (damp + timber + condensation). The mapping engine aggregates across all rooms to produce costing inputs.
- **JSONB over normalised tables:** 13 survey-type extension tables were provisioned but the wizard stores everything in `survey_rooms.room_data` JSONB. Simpler, working, and the extension tables are candidates for removal.
- **Excel workbooks as pricing source of truth:** All 220 line templates and formula parameters must match the original XLSM workbooks. Deviations cause real business impact.
- **Client-side rendering for authenticated pages:** All authenticated pages fetch data client-side. No SSR/streaming. Causes flash-of-spinner but was the faster path to MVP.
- **Forward-only enquiry transitions:** `shouldAutoTransition()` enforces ordering to prevent status regression. Terminal statuses are never overwritten. Current auto-transitions: wizard completion → survey_complete, quotation accept → won, quotation decline → lost, payment confirmed → booked, payment expired → revert to new.
- **Booking status state machine:** `BOOKING_STATUS_TRANSITIONS` in `calendar-types.ts` defines valid transitions (provisional → scheduled/cancelled, scheduled → completed/no_show/cancelled, terminal statuses have no outgoing transitions). Enforced in `updateBooking()` and `cancelBooking()`, UI only shows valid action buttons.
- **Communication log channels:** `communication_log.channel` supports email, sms, in_app (system-generated), phone, whatsapp, in_person (manually logged by office staff). Manual entries use status `logged` to distinguish from system-sent entries. The log is append-only (no UPDATE/DELETE).
- **Role-based route protection:** Two layers — `RoleGuard` (layout-level, wraps entire route groups like `/admin/*` and `/enquiries/*`) and `ProtectedRoute` with `allowedRoles` prop (page-level). Both redirect unauthorised users to the dashboard. API routes check role via `user_profiles.role` query against the service-role client.
- **Per-survey write queue:** `write-queue.ts` exports `serializeWrite(surveyId, fn)` which queues async writes per survey. `survey-photo-service.ts` (photo metadata append/delete), `survey-wizard-data.ts` (auto-save), and sketch upload (report editor) all use this to prevent read-modify-write races on `surveys.survey_data` JSONB. Photo compression and storage upload still run in parallel — only the metadata append is queued.
- **Supabase SSR cookie API:** `supabase-server.ts` and `middleware.ts` both use the modern `getAll`/`setAll` cookie interface (not the deprecated `get`/`set`/`remove`). This ensures token rotation works correctly across Next.js server components and middleware.
- **Treatment methodology constants** are hardcoded in `report-generator.ts` — not in the database. Membrane (8 steps), tanking (7), DPC injection (4), wet rot (11), dry rot (13), woodworm (7).
- **NotificationBell realtime reconnection:** The Supabase Realtime subscription uses a `reconnectKey` state counter. On `CHANNEL_ERROR` or `TIMED_OUT`, the channel is removed and the counter increments after 5 seconds, forcing the useEffect to re-run and create a fresh subscription.
- **Sketch plan storage:** Sketch files uploaded in the report editor are stored in the `survey-photos` bucket under `{surveyId}/sketch/`. Photo metadata goes into `survey_data.photos` (same as survey wizard photos). The photo IDs are linked to the `sketch_plan` report section's `photos` array via `updateReportSectionPhotos()` in `report-data.ts`.
- **Supabase Auth SMTP gap:** The TTDP Supabase Auth container has no SMTP configured (`GOTRUE_SMTP_HOST` is blank). Password reset and invite emails silently fail. Workaround: reset passwords via Admin API and set `must_change_password` on the user profile.
- **Customer quote presentation (decided 2026-07-05):** the public quote page and its PDF (`quotation-pdf-renderer.tsx` — the two must stay in sync) list mandatory section *names only* under a single "Works subtotal" that folds in project overheads; optional works keep individual prices (an option without a price can't be chosen); a note points to the survey report for full scope. Internal costing keeps full itemisation — this is display-only.
- **Generation-time narrative polish:** `generateReport()` sends room findings and external notes through the LLM in the same batched `/api/generate-report` call as the executive summary (raw dictation shipped verbatim to customers before this). Raw text is the fallback on any LLM failure and is preserved in section `data.raw_notes`. Sections process sequentially (~4 s each), so multi-room reports take 15–30 s to generate.
- **Report ground-levels honesty rule:** the "External Ground Levels" subsection derives from the wizard's "High external ground levels" checklist item and/or specified drainage works, and is omitted entirely when neither exists. It must never assert "no issues" for something the surveyor didn't structurally record (a published report once contradicted its own narrative this way).
