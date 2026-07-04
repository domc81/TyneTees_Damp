# CLAUDE.md — TyneTees Damp Proofing Survey System

@./AGENTS.md
@../CLAUDE.md

## Project Overview

Web platform for a Newcastle damp proofing contractor. Translating 4 Excel costing workbooks (Damp v48, Condensation v37, Timber v33, Woodworm v26) into a web application. MVP: Lead Gen + CRM + Survey System with automated pricing.

**Client:** TyneTees Damp Proofing (sole contractor)
**Developer:** Dominic / DC81 Ltd
**Repository:** https://github.com/domc81/TyneTees_Damp.git
**Live URL:** https://ttdp.dc81.io

## Tech Stack

- **Framework:** Next.js 14.2.35 (App Router, `src/` directory, standalone output)
- **Language:** TypeScript 5.3+
- **Styling:** Tailwind CSS 3.4 with custom brand theme
- **Database:** Supabase (PostgreSQL) — self-hosted Docker instance (container prefix `y04kk0w`)
- **Auth:** Supabase Auth with RLS policies + role-based access (admin, office, surveyor)
- **Email:** Resend (transactional emails — quotations, reports, booking confirmations)
- **Speech-to-text:** Deepgram (survey observation transcription)
- **LLM:** OpenRouter → `x-ai/grok-4.1-fast` (report narrative generation + observation polishing)
- **PDF:** @react-pdf/renderer (quotation PDF generation)
- **Drag-and-drop:** @dnd-kit (enquiry pipeline Kanban board)
- **Calendar:** FullCalendar (booking/availability management)
- **Animations:** framer-motion
- **Icons:** lucide-react
- **Forms:** react-hook-form + zod validation
- **Toasts:** sonner
- **Package manager:** npm
- **Node:** 22 (Alpine, for Docker build)

## Infrastructure & Deployment

- **Deployment:** Coolify (auto-deploy on push to `main`) → Traefik → Cloudflare
- **App container:** `es4ws4gosc4g84gkosk4c008` (Next.js standalone)
- **Supabase container prefix:** `y04kk0wwoswogw0oowcs04gw` (14 containers)
- **Supabase API:** `https://api.ttdp.dc81.io` (via Kong gateway)
- **Dockerfile:** Multi-stage build (node:22-alpine), standalone output mode, port 3000

### Credentials

All read from `/home/dominic/.credentials/` at runtime — **never hardcode or commit values**.

| File | Used for |
|---|---|
| `.ttdp-supabase-credentials` | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, Postgres password |
| `.resend-credentials` | `RESEND_API_KEY` for transactional emails |
| `.deepgram-credentials` | `DEEPGRAM_API_KEY` for speech-to-text |
| `.cloudflare-credentials` | Cloudflare API access |
| `coolify_api_token` | Coolify API bearer token |

The `.env.local` at `survey-system/.env.local` is owned by `root:dc81-secrets` and injected by Coolify at build time.

### Environment Variables

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase API base URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server | Admin Supabase access (API routes) |
| `OPENROUTER_API_KEY` | Server | LLM calls (report generation, observation polishing) |
| `DEEPGRAM_API_KEY` | Server | Speech-to-text transcription |
| `RESEND_API_KEY` | Server | Email sending (fallback — also loadable from platform_settings) |
| `CRON_SECRET` | Server | Authenticates cron-triggered API routes |
| `NEXT_PUBLIC_APP_URL` | Public | App base URL for email links |
| `NEXT_PUBLIC_SITE_URL` | Public | Site URL fallback for report/email links |

### Database Access

TTDP Postgres is **not** host-mapped — access via Kong API or `docker exec`:
```bash
docker exec -it supabase-db-y04kk0wwoswogw0oowcs04gw psql -U supabase_admin -d postgres
```

Migrations are applied manually:
```bash
docker exec -i supabase-db-y04kk0wwoswogw0oowcs04gw psql -U supabase_admin -d postgres < supabase/migrations/<filename>.sql
```

## Project Structure

```
TyneTees_Damp/
├── CLAUDE.md                       # This file
├── survey-system/                  # Next.js application root
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx            # Dashboard (stats, pipeline widget, activity feed)
│   │   │   ├── layout.tsx          # Root layout with AuthProvider + CompanyProfileProvider
│   │   │   ├── globals.css         # Global styles
│   │   │   ├── icon.tsx            # Dynamic favicon
│   │   │   ├── error.tsx           # Error boundary
│   │   │   ├── not-found.tsx       # Custom 404
│   │   │   ├── admin/
│   │   │   │   ├── layout.tsx      # RoleGuard: admin/office only (except availability + workload)
│   │   │   │   ├── page.tsx        # Admin landing page
│   │   │   │   ├── availability/   # Surveyor availability management
│   │   │   │   ├── costing/       # Costing line templates admin (formula params, pricing)
│   │   │   │   ├── materials/      # Materials catalogue admin (CRUD)
│   │   │   │   ├── rates/          # Pricing config (reads/writes pricing_config table)
│   │   │   │   ├── team/           # Team/surveyor management (profiles)
│   │   │   │   └── workload/       # Surveyor workload dashboard (capacity view)
│   │   │   ├── api/                # API routes (27 route files — see API Routes section)
│   │   │   ├── calendar/           # Booking calendar (FullCalendar)
│   │   │   ├── enquiries/          # Pipeline Kanban + new enquiry form (has layout.tsx)
│   │   │   ├── materials/          # Materials catalogue view
│   │   │   ├── pay/[token]/         # Public survey fee payment page (page.tsx + client.tsx)
│   │   │   ├── q/[token]/          # Public quotation page (page.tsx + client.tsx + CSS)
│   │   │   ├── report/[reportId]/  # Public report view (page.tsx + client.tsx + CSS)
│   │   │   ├── settings/           # Settings hub + company profile + notification prefs
│   │   │   ├── training/           # In-app training guides (hub + 4 role-based guide pages)
│   │   │   ├── survey/
│   │   │   │   ├── new/            # New survey creation
│   │   │   │   └── [projectId]/    # Note: param is [projectId] (historical) — refers to survey ID
│   │   │   │       ├── costing/    # Auto-calculated costing review
│   │   │   │       ├── handover/  # CF handover pack (downloads, summary, mark closed)
│   │   │   │       ├── installer-info/ # Installer information/photos
│   │   │   │       ├── quotation/[quotationId]/ # Quotation view + send
│   │   │   │       ├── report/     # Report editor (review, inline edit, status workflow)
│   │   │   │       └── wizard/     # 5-step room-first survey wizard
│   │   │   ├── surveys/            # Survey list + [surveyId] detail page
│   │   │   ├── login/
│   │   │   ├── forgot-password/
│   │   │   ├── change-password/
│   │   │   └── update-password/
│   │   ├── components/
│   │   │   ├── layout.tsx          # Sidebar nav with role-based items (Pipeline, Surveys, Calendar, etc.) + NotificationBell
│   │   │   ├── ProtectedRoute.tsx  # Auth guard (client-side route protection, optional allowedRoles)
│   │   │   ├── RoleGuard.tsx      # Layout-level role guard (wraps route groups)
│   │   │   ├── CompanyLogo.tsx     # Dynamic company logo
│   │   │   ├── EnquiryDrawer.tsx   # Enquiry detail drawer (tabs, inline edit, activity)
│   │   │   ├── NotificationBell.tsx # Realtime notification bell
│   │   │   ├── calendar/           # SlotPicker, SurveyorSelect
│   │   │   ├── installer-info/     # InstallerPhotoUpload
│   │   │   ├── report/             # 21 report section components (see Report Components)
│   │   │   ├── training/           # 5 shared training components (TrainingArticle, TableOfContents, TrainingImage, Tip, GuideCard)
│   │   │   ├── ui/                 # Primitives: button, card, input, index
│   │   │   └── wizard/             # 12 wizard components (see Wizard Components)
│   │   ├── context/
│   │   │   ├── AuthContext.tsx      # Auth state + profile + role-based flags
│   │   │   └── CompanyProfileContext.tsx # Company profile provider
│   │   ├── hooks/
│   │   │   └── useSmartBack.ts     # Smart back navigation
│   │   ├── middleware.ts           # Supabase SSR session management + token rotation
│   │   ├── lib/                    # 35 library files (see Lib Files section)
│   │   └── types/
│   │       ├── database.types.ts    # Canonical DB TypeScript types
│   │       ├── survey-wizard.types.ts # Wizard data model types
│   │       ├── survey-report.types.ts # Report template & generated report types
│   │       ├── survey-photo.types.ts  # Photo capture & storage types
│   │       └── installer-info.types.ts # Installer info types
│   ├── supabase/
│   │   ├── migrations/              # 39 SQL migrations
│   │   ├── functions/               # Edge functions (legacy — app uses API routes instead)
│   │   ├── config.toml
│   │   ├── seed.sql
│   │   └── setup-authentication.sql
│   ├── public/
│   │   └── images/woodworm/         # Beetle + treatment equipment reference images
│   ├── Dockerfile                   # Multi-stage Node 22 Alpine build
│   ├── docker-compose.yml           # Local dev Postgres (NOT used in production)
│   ├── package.json
│   ├── next.config.mjs              # standalone output, 10MB server actions, ignoreBuildErrors
│   ├── tailwind.config.ts           # Brand theme, custom animations, glass effects
│   ├── postcss.config.mjs
│   └── tsconfig.json                # strict mode, @/* path alias → ./src/*
├── supabase/
│   └── migrations/                  # 1 root-level migration (allow_published_status)
├── docs/
│   ├── training/                    # Staff training & onboarding guides
│   │   ├── 00-getting-started.md    # All roles: login, navigation, dashboard
│   │   ├── 01-office-staff-guide.md # Office/Admin: enquiries, customers, calendar, quotations
│   │   ├── 02-surveyor-guide.md     # Surveyors: schedule, wizard walkthrough, photos, voice
│   │   ├── 03-admin-guide.md        # Admin: team, materials, pricing, settings
│   │   └── screenshots/             # 35 live platform screenshots (captured via Steel Browser)
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   ├── PROJECT_STATE.md
│   ├── audits/                      # Role audit reports and trackers
│   ├── guides/
│   ├── plans/
│   ├── setup/
│   └── workbook-analysis/
├── workbook_extraction/             # Excel workbook analysis scripts
└── *.xlsm, *.xls, *.csv            # Original Excel workbooks & exports
```

### Wizard Components (13 files)

`WizardStepper`, `SiteDetailsStep`, `ExternalInspectionStep`, `RoomInspectionStep`, `DampFields`, `CondensationFields`, `TimberFields`, `WoodwormFields`, `AdditionalWorksStep`, `ReviewStep`, `AudioRecorder`, `PhotoCapture`, `UrgencySelector`

### Report Components (21 files)

`CoverSection`, `ExecutiveSummarySection`, `ReportGuideSection`, `PropertySection`, `ExternalInspectionSection`, `RoomFindingsSection`, `ScopeOfWorksSection`, `TreatmentMethodologySection`, `WoodwormTreatmentSection`, `CondensationCausesSection`, `SurveyContextSection`, `SurveyorProfileSection`, `AboutUsSection`, `BoilerplateSection`, `ReportHeader`, `ReportFooter`, `PhotoGrid`, `PhotoLightbox`, `TextSection`, `TextContent`, `utils`

### Lib Files (35 files)

**Supabase:** `supabase-client.ts` (browser), `supabase-server.ts` (server), `supabase-data.ts` (canonical data layer — all Supabase queries, including customer queries)

**Pricing:** `pricing-engine.ts` (11 formula types), `pricing-data.ts` (data loading + orchestration), `survey-mapping.ts` (wizard data → pricing inputs), `travel-overhead.ts` (post-engine travel & vehicle overhead)

**Survey:** `survey-wizard-data.ts` (wizard persistence/auto-save), `survey-photo-service.ts` (photo upload/management), `survey-tags.ts` (survey type tagging)

**Reports:** `report-generator.ts` (boilerplate + LLM narrative + treatment methodology + woodworm images), `report-data.ts` (report CRUD + section photo updates), `report-publish.ts` (publish/share)

**PDF:** `quotation-pdf-renderer.tsx` (quotation PDF layout via @react-pdf/renderer)

**Email:** `email-service.ts` (Resend sending + communication_log), `email-templates.ts` (HTML templates — includes reportAndQuotationEmail, surveyCompletedEmail, quotationAcceptedThankYouEmail, onMyWayEmail), `email-config.ts` (config loading from platform_settings)

**Calendar:** `calendar-data.ts` (booking queries), `calendar-types.ts` (TypeScript types)

**Company:** `company-profile.ts` (company profile helpers)

**Installer Info:** `installer-info-categories.ts` (category definitions), `installer-info-data.ts` (queries)

**Notifications:** `notifications-server.ts` (server-side creation), `notification-preferences.ts` (preference helpers)

**Payments:** `payment-data.ts` (payment records, survey fee + deposit lifecycle)

**CSV Export:** `cf-csv-export.ts`, `cf-export-config.ts`

**Handover:** `handover-pack.ts` (CF handover data aggregation, customer CSV, job summary text, guarantee derivation)

**Concurrency:** `write-queue.ts` (per-survey serialized write queue — used by photo service + wizard auto-save + sketch upload)

**Proposals & Limitations:** `proposal-items.ts` (13 predefined proposal items + 12 limitation items for quick-select in ReviewStep)

**Validation:** `report-validation.ts` (report completeness checks — missing photos, urgency, proposals, limitations)

**Utilities:** `cron-auth.ts` (cron route authentication), `terms-hash.ts` (T&C hash generation)

**Tests:** `cf-csv-export.test.ts`, `__tests__/pricing-engine.smoke.ts`

## API Routes

27 route.ts files. CRUD operations for surveys, enquiries, bookings, notifications, and quotations are handled via direct Supabase client SDK calls from the frontend — API routes are only used for server-side operations requiring secrets.

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
| `/api/settings/company/logo` | Logo upload |
| `/api/settings/notifications` | Notification preference CRUD |
| `/api/settings/notifications/test-email` | Test email delivery |
| `/api/surveys/[id]/photos-zip` | Download survey photos + sketches as ZIP (handover) |
| `/api/surveys/[id]/approve-and-send` | Combined approve report + send report & quote email |
| `/api/surveys/[id]/quotation` | Generate quotation from survey |
| `/api/transcribe` | Deepgram speech-to-text |

**Public routes** (excluded from auth middleware): `/api/q/*`, `/api/report/*`, `/api/pay/*`

## Middleware

`src/middleware.ts` — Supabase SSR session management. Runs on all routes except `_next/static`, `_next/image`, `favicon.ico`, `api/q/` (public quotation), `api/report/` (public report), and `api/pay/` (public payment). Handles JWT refresh via `getUser()`. Route protection is handled client-side by `ProtectedRoute.tsx` (session + optional role check) and `RoleGuard.tsx` (layout-level role guard for entire route groups), not middleware.

## Database

### Migrations

42 total: 41 in `survey-system/supabase/migrations/` + 1 in root `supabase/migrations/`.

Range: `00000000000000_initial_schema.sql` through `20260704000001_handover_pack_guarantee_cleanup.sql`. Applied manually via `docker exec`.

### Active Tables (43 tables)

**CRM & Pipeline:**
- `enquiries` — pipeline records (status: new/awaiting_payment/booked/survey_complete/sent/won/closed/lost/on_hold, priority, sla, follow_up_date, on_hold_reason, decline_reason, won_at, cf_exported_at)
- `enquiry_activity` — activity/timeline log
- `on_hold_message_templates` — predefined on-hold message templates
- `customers` — customer master data
- `communication_log` — communication records (channels: email, sms, in_app, phone, whatsapp, in_person; statuses: sent, failed, pending, delivered, bounced, logged)

**User & Team:**
- `user_profiles` — user accounts with roles (admin, office, surveyor)
- `platform_settings` — per-user settings (Resend API key override, etc.)
- `notification_preferences` — per-event notification settings (in-app/email toggles)

**Surveys:**
- `surveys` — survey jobs with `survey_type`, `status`, `survey_data` JSONB, `tags` TEXT[]
- `survey_rooms` — one row per room with `issues_identified` TEXT[] and `room_data` JSONB
- `survey_images` — survey photos (wizard-managed)
- `photos` — survey photos (with room/question linkage)
- `survey_installer_info` — installer site info per survey (JSONB + categories)

**Survey Type Extensions (provisioned but unused — wizard stores everything in JSONB):**
- `survey_damp_report`, `survey_damp_wall_readings`
- `survey_condensation_report`, `survey_condensation_rooms`
- `survey_timber_report`, `survey_timber_rooms`
- `survey_woodworm_report`

**Costing Engine:**
- `costing_sections` — 44 sections across 5 survey types (incl. site_preparation)
- `costing_line_templates` — 220 line item templates with formula types and params
- `pricing_config` — 14 config entries (hourly rates, markups, VAT, deposit %, etc.)
- `materials_catalog` — 34 products with costs, coverage rates
- `survey_costing_lines` — per-survey calculated costs
- `costing_section_adjustments` — per-section price adjustment %
- `survey_customer_summary` — per-section customer-facing cost summary
- `survey_overheads` — per-survey overhead costs (travel, skip, etc.)
- `survey_subcontractor_costs` — subcontractor cost breakdown per section
- `survey_caf1` — Customer Acceptance Form (deposit, signature, cooling-off waiver)

**Payments:**
- `payments` — payment records (survey_fee or deposit type, token-based public access, linked to enquiry/survey/quotation)

**Quotations:**
- `quotations` — status workflow: draft → sent → viewed → accepted/declined
- `quotation_sections` — quotation line items with optional/included flags
- `quotation_acceptances` — e-signature consent records (immutable audit trail)
- `quotation_views` — quotation view tracking (IP, user agent, duration)

**Reports:**
- `report_templates` — 4 default templates (one per survey type)
- `survey_reports` — status workflow: draft → generated → reviewed → finalised → published
- `report_views` — report view tracking (IP, user agent, duration)

**Calendar & Bookings:**
- `survey_bookings` — survey booking slots (date, time, surveyor, customer, status: provisional/scheduled/completed/cancelled/no_show). State machine enforced in `calendar-data.ts`
- `surveyor_availability` — weekly availability patterns
- `availability_blocks` — surveyor leave/absence date blocks (annual_leave, sickness, training, other)

**Notifications:**
- `notifications` — in-app notifications with realtime subscriptions

**Company:**
- `company_profile` — company details, logo, T&C text

### Key Pricing Config Values (16 entries)

| Key | Value | Description |
|-----|-------|-------------|
| hourly_labour_rate | 30.63 | Base hourly labour rate (£) |
| contractor_hourly_rate | 28.00 | Rate paid to contractor per hour (£) |
| default_material_markup | 0.30 (30%) | Default material markup |
| default_labour_markup | 1.00 (100%) | Default labour markup |
| default_wastage_factor | 1.10 (10%) | Default wastage factor |
| vat_rate | 0.20 (20%) | VAT rate |
| vehicle_cost_per_mile | 0.50 | Vehicle running cost per mile (£) |
| skip_hire_8yd_cost | 270.00 | Skip hire 8 yard base cost (£) |
| digital_dpc_base_cost | 650.00 | Mursec Eco digital DPC unit base cost (£) |
| asbestos_testing_cost | 30.00 | Asbestos testing per sample cost (£) |
| damp_deposit_pct | 0.30 (30%) | Damp survey deposit percentage |
| condensation_deposit_pct | 0.50 (50%) | Condensation survey deposit percentage |
| timber_deposit_pct | 0.30 (30%) | Timber survey deposit percentage |
| woodworm_deposit_pct | 0.30 (30%) | Woodworm survey deposit percentage |
| survey_fee_amount | (configurable) | Survey fee charged upfront (£) |
| survey_fee_expiry_days | (configurable) | Days before unpaid provisional booking is auto-released |

### Formula Types in costing_line_templates (11 types)

- `standard` — material = unit_cost x quantity, labour = rate x quantity
- `ceiling_coverage` — CEIL(quantity / coverage) x (unit_cost / coverage x wastage)
- `dpc_injection` — cream cost + drill plug cost based on wall depth
- `digital_dpc` — digital DPC unit cost (reads base cost from pricing_config)
- `compound_material` — multi-material mix (e.g. dubbing coat = SBR + sand + cement)
- `fixed_price` — flat rate item (e.g. PIV units)
- `per_room_fixed` — fixed cost applied per room
- `ancillary_refit` — ancillary refit items
- `tiered_disposal` — conditional rate based on quantity threshold
- `bag_and_cart` — per-bag debris removal
- `skip_hire` — reads cost from pricing_config

## Architecture: Room-First Survey Wizard

The survey follows how a surveyor physically works: room by room. In each room, they select what issues they find (Damp, Condensation, Timber Decay, Woodworm — multi-select). Only relevant measurement fields appear for selected issues. A single room can have multiple issue types or none.

**Wizard flow:**
1. Site & Property Details (once)
2. External Inspection (once)
3. Room-by-Room Inspection (repeats per room)
4. Whole-Property Additional Works
5. Review & Generate Costing

**Data storage:**
- `surveys.survey_data` JSONB — property-level data (site details, external inspection, additional works, wizard state)
- `survey_rooms` — one row per room with `issues_identified` TEXT[] and `room_data` JSONB keyed by issue type

**Costing flow:**
Survey wizard → survey_data + room_data → Mapping engine aggregates all rooms → LineInput[] → Pricing engine calculates costs → Costing result

## Enquiry Pipeline

Kanban board with drag-and-drop columns: New → Awaiting Payment → Booked → Survey Complete → Sent → Won → Closed / Lost / On Hold. Features:
- Detail drawer with tabs (details, activity, notes) — customer management integrated into drawer
- Inline field editing
- SLA traffic lights and follow-up indicators
- Auto-status transitions on survey completion, report/quotation sending, and payment
- On-hold customer email notifications with template messages
- Convert-and-book flow (enquiry → customer + survey + provisional booking + survey fee payment)
- Quick actions (contact shortcuts, follow-up picker)
- Dashboard widget with pipeline stats and recent activity
- Full lifecycle tracking: `won_at` timestamp set when deposit marked paid, `cf_exported_at` set on CF CSV export

## TypeScript Conventions

- **Canonical DB types** in `src/types/database.types.ts`
- **Data functions** in `src/lib/supabase-data.ts` — primary data layer for all Supabase queries
- **Wizard types** in `src/types/survey-wizard.types.ts`
- **Report types** in `src/types/survey-report.types.ts`
- **Path alias:** `@/*` maps to `./src/*`
- **Auth context** exports: `session`, `user`, `profile`, `role`, `isAdmin`, `isOffice`, `isSurveyor`, `mustChangePassword`

## Important Notes

- Route param is `[projectId]` in `/survey/` routes (historical) — refers to survey ID
- Survey list lives at `/surveys` (newer route) and `/survey/` for sub-pages (wizard, costing, etc.)
- `client_name` can be null — always use `(project.client_name || '')`
- `survey-wizard.types.ts` is the canonical type file for wizard data
- **Pricing config** editable via `/admin/rates`
- **Travel overhead** (`src/lib/travel-overhead.ts`) runs after the pricing engine
- **TypeScript build errors are ignored** (`ignoreBuildErrors: true` in next.config.mjs) — use `npm run lint` for checks
- Toast notifications use `sonner` — never use `alert()` calls
- **Enquiry source values** are stored in Title Case
- **Server actions** body size limit is 10MB (for photo uploads)
- **Edge functions** in `supabase/functions/` are legacy — all LLM/email operations use Next.js API routes
- **Customer-facing reports hide measurements** — all m², area, volume, joist size/quantity removed from public report view. Internal editor and costing page still show all data. Quotation PDF was already measurement-free.
- **Treatment methodology constants** are hardcoded in `report-generator.ts` — not in the database. Membrane (8 steps), tanking (7), DPC injection (4), wet rot (11), dry rot (13), woodworm (7 steps).
- **Guarantee paragraph** is hardcoded in `report-generator.ts` `buildGuaranteeParagraph()` — does not read from company profile fields. 25-year company guarantees on rising damp, dry rot, and woodworm; 7-year warranty on mould. Insurance-backed guarantees via generic Protected Guarantee scheme (Westminster ceased trading). Also appears in `company_profile.about_us_text`.
- **Woodworm reports** include static reference images from `public/images/woodworm/` (beetle photo CC BY 3.0 CSIRO, 3 Pexels equipment photos). These are always included in generated woodworm reports.
- **Customer reinstatement responsibility note** appears on all damp survey reports (membrane, injection, tanking) — amber callout in scope of works, same pattern as electrical standards and asbestos notes.
- **Provisional bookings** are created by Convert & Book with status `provisional` (awaiting survey fee payment). They auto-confirm when payment is marked paid (via API or calendar modal). Expired provisional bookings are cancelled by the `/api/cron/release-unpaid-bookings` cron route.
- **Booking status state machine** is enforced in `calendar-data.ts` via `validateStatusTransition()`. Valid transitions: provisional → scheduled/cancelled, scheduled → completed/no_show/cancelled. Completed, no_show, and cancelled are terminal. The calendar UI only shows buttons for valid transitions.
- **Communication log channels** include system-generated (`email`, `sms`, `in_app`) and manually logged (`phone`, `whatsapp`, `in_person`). Manual entries use status `logged` and are created from the pipeline drawer. The log is append-only (no UPDATE/DELETE).
- **Payment lifecycle:** two payment types — `survey_fee` (created at convert-and-book, customer pays via `/pay/[token]`) and `deposit` (auto-created when quotation is accepted, office marks paid to move enquiry to won). The `payments` table links to enquiry, survey, and optionally quotation.
- **Enquiry lifecycle columns:** `won_at` is set when deposit is marked paid; `cf_exported_at` is set when CF CSV export is downloaded (from handover or costing page). `closed` is the terminal status (job exported to Contractor Foreman). Transition: won → closed (handover complete).
- **CF Handover Pack** at `/survey/[projectId]/handover/` is the one-stop page for exporting won jobs to Contractor Foreman. Restricted to admin/office roles. Contains 4 download cards (customer CSV, CF estimate CSV, photos ZIP, job summary text), report link with copy button, guarantee summary, and "Mark as Closed" button. Quick action "Open Handover Pack" button appears in EnquiryDrawer won workflow section.
- **Guarantee type is derived from survey type** — 25-year for damp/timber/woodworm, 7-year for condensation/mould. No per-survey guarantee field; `deriveGuaranteeType()` in `handover-pack.ts` checks survey_type and survey_tags.
- **Installer info "Special Instructions for Workmen"** field (renamed from "General Notes") is the `notes` column on `survey_installer_info`. Used in the handover pack job summary text.
- **Route protection layers:** `RoleGuard` in `admin/layout.tsx` blocks surveyors from all `/admin/*` routes except `/admin/availability` and `/admin/workload`. `RoleGuard` in `enquiries/layout.tsx` blocks surveyors from the pipeline (`/enquiries/*`). `ProtectedRoute` accepts `allowedRoles` prop for page-level checks. API routes check `user_profiles.role` via service-role client for payment, quotation, and admin endpoints.
- **Per-survey write queue** (`src/lib/write-queue.ts`) serializes all writes to `surveys.survey_data` JSONB. Both `survey-photo-service.ts` and `survey-wizard-data.ts` use `serializeWrite(surveyId, fn)` to prevent concurrent read-modify-write races. Photo compression and storage upload still run in parallel — only the metadata append is queued.
- **Deepgram transcription** retries up to 2 times on 429/503 with exponential backoff (2s, 4s). LLM polish-observation has a 30-second `AbortController` timeout.
- **Wizard room validation:** Room Inspection step (step 2) requires at least 1 room before the surveyor can proceed. Back navigation and step clicks trigger auto-save (matching forward navigation).
- **Wake Lock API** is used during voice recording (`AudioRecorder.tsx`) to prevent phone sleep. Released on stop.
- **NotificationBell reconnection:** the Supabase realtime channel auto-reconnects after 5 seconds on `CHANNEL_ERROR` or `TIMED_OUT`. Uses a `reconnectKey` state counter that increments on disconnect, forcing the useEffect to re-run and create a fresh subscription.
- **Sketch plan upload** in report editor stores files in the `survey-photos` bucket under `{surveyId}/sketch/{timestamp}-{randomId}.{ext}`. Photo metadata is saved to `survey_data.photos` via `serializeWrite()`. Photo IDs are stored in the sketch_plan report section's `photos` array via `updateReportSectionPhotos()`. Supports JPEG, PNG, and PDF (up to 10MB). On the public report, images render full-width with lightbox; PDFs use `<object>` embed with download fallback.
- **Password fields** on all auth pages (login, change-password, update-password) include a show/hide toggle (Eye/EyeOff icons) built into the shared `Input` component. Activates automatically when `type="password"` is passed.
- **Supabase Auth SMTP is not configured** on the TTDP instance — `GOTRUE_SMTP_HOST` and related vars are blank. `resetPasswordForEmail()` silently fails. To reset a user's password, use the Supabase Admin API (`PUT /auth/v1/admin/users/{id}` with service role key) and set `must_change_password = true` on their `user_profiles` row.
- **Traffic light urgency** (`FindingUrgency` type: `'green' | 'amber' | 'red'`) is stored per-issue per-room in `room_data.{issue_type}.urgency`. Also on `ExternalInspection.urgency`. The report generator calculates overall urgency (highest severity wins) and stores it in the `executive_summary` section's `data.overall_urgency` + `data.urgency_counts`. Room sub-sections get `data.urgency` from the room's highest issue urgency. UrgencySelector component is shared across all 4 wizard field components + external inspection.
- **Photo visibility** (`PhotoVisibility` type: `'customer' | 'technician' | 'office'`) defaults to `'customer'` if not set (backwards compatible). The public report page filters out photos where `visibility !== 'customer'` and `visibility !== undefined`. The PhotoCapture modal shows a visibility dropdown. Photos without the field (pre-existing) are treated as customer-visible.
- **Proposal quick-select** stores selected item IDs in `surveys.survey_data.proposal_items` (string array). 13 predefined items defined in `src/lib/proposal-items.ts` with id, label, full text, and category. Free-text additions via `survey_data.proposal_comments`.
- **Limitations quick-select** stores selected item IDs in `surveys.survey_data.limitations` (string array). 12 predefined limitation items in `src/lib/proposal-items.ts`. Used for company protection — records what areas could not be inspected.
- **Report completeness validation** (`src/lib/report-validation.ts`) checks: front elevation photo, rear elevation photo, sketch plan, rooms with issues, urgency set per finding, room photos, external inspection, proposal items, limitations. The report editor page shows an inline validation panel (amber/red warnings) when report status is not `published`.
- **Report branding** uses navy gradient (`#09283f` → `#103a58` → `#125a71`) with Tyne Bridge SVG watermark on cover. Header shows all 4 regional numbers. Footer is dark navy three-column layout with registered office (Company No. 09747364), regional contacts, and report reference. Print CSS preserves background colours via `print-color-adjust: exact`.

## Build & Dev Commands

All commands run from `survey-system/` directory:
```bash
npm run build        # Production build (also validates routes compile)
npm run lint         # Run ESLint
npm run dev          # Start dev server (DO NOT use — commit and push instead)
```

## What's Built & Working

- **Auth:** Login, forgot/change/update password (all with show/hide password toggle), ProtectedRoute (with optional `allowedRoles`), RoleGuard (layout-level), role-based UI and API enforcement (admin/office/surveyor). Note: Supabase Auth SMTP is not configured — password reset emails silently fail; admin must reset passwords via Admin API + `must_change_password` flag.
- **Dashboard:** Survey stats (Active Surveys, Completed, Won This Month), enquiry pipeline widget, recent activity feed
- **Pipeline:** Kanban board, drag-drop, detail drawer (with integrated customer management), inline edit, SLA indicators, auto-transitions, on-hold emails, convert-and-book with provisional bookings, full lifecycle (won/closed columns)
- **Survey System:** Creation, list, detail, 5-step room-first wizard with auto-save, voice recording + transcription, photo capture with visibility tiers (customer/technician/office), per-finding urgency selector (green/amber/red), proposal quick-select (13 items), limitations quick-select (12 items)
- **Pricing Engine:** 11 formula types, Supabase data loading, travel overhead calculator
- **Costing:** Auto-calculated from wizard data, section-by-section breakdown, multi-type tabs
- **Quotations:** Generation from survey, PDF rendering, email sending, public accept/decline page, e-signature, deposit auto-creation on acceptance
- **Reports:** LLM narrative generation (OpenRouter / Grok 4.1 Fast), section editor, status workflow, email sending, public view. Navy gradient hero cover with Tyne Bridge SVG watermark. Traffic light urgency system: per-finding green/amber/red from wizard → executive summary overall status badge + room headers colour-coded. "How to Read This Report" 3-card guide after executive summary. Report editor completeness validation panel (missing photos, urgency, proposals). Photo visibility filtering (public report excludes technician/office-only photos). Sketch plan upload (JPEG/PNG/PDF) in report editor with delete support — images display full-width with lightbox on public report, PDFs render as embedded viewers with download fallback. Customer-facing reports hide all m²/area/volume/joist measurements (internal editor retains them). Woodworm reports include beetle reference image, treatment equipment photos, and conditional loft insulation note. Damp reports include customer reinstatement responsibility disclaimer.
- **Payments:** Survey fee payment flow (public `/pay/[token]` page), deposit collection on quotation acceptance, office mark-as-paid, payment link emails
- **Calendar:** Booking management with FullCalendar, surveyor availability, provisional bookings (awaiting payment), confirm/mark-as-paid from calendar modal, reschedule with SlotPicker, booking status state machine (valid transitions enforced), confirmation dialogs on all status changes, booking notifications, daily reminders, auto-release of expired provisional bookings (cron)
- **Notifications:** In-app realtime notifications via Supabase Realtime, preference management
- **Settings:** Company profile, logo upload, notification preferences, email testing
- **Materials:** Catalogue view and admin
- **Team:** Surveyor/user profile management
- **Installer Info:** Per-survey installer information and photos
- **CF CSV Export:** Export logic with test coverage, sets `cf_exported_at` on enquiry
- **CF Handover Pack:** One-stop handover page at `/survey/[projectId]/handover/` — customer CSV, CF estimate CSV, photos ZIP (JSZip server-side), job summary text with clipboard copy, report link, guarantee derivation, "Mark as Closed" action. Quick action button in EnquiryDrawer. `closed` terminal status.
- **Workload Dashboard:** Surveyor capacity view at `/admin/workload`
- **Transcription:** Deepgram speech-to-text for survey observations
- **Observation Polishing:** LLM cleanup of voice-transcribed notes
- **Training Pages:** In-app training at `/training` — hub page with role-aware recommendations, 4 styled guide pages (Getting Started, Office Staff, Surveyor, Admin) with 35 screenshots, sticky ToC, image lightbox, tip/note/warning callouts. Source markdown also at `docs/training/`

## External API Access Available

- **Cloudflare** — DNS, CDN (credentials at `.cloudflare-credentials`)
- **Coolify** — Deployment management (API token at `coolify_api_token`)
- **Resend** — Transactional email (credentials at `.resend-credentials`)
- **Deepgram** — Speech-to-text (credentials at `.deepgram-credentials`)
- **OpenRouter** — LLM API access (key in `.env.local`, model: `x-ai/grok-4.1-fast`)

## Claude-specific policy

- Preferred tools: Edit/Grep/Glob over bash equivalents (per server CLAUDE.md)
- Run `npm run build` from `survey-system/` before any push to validate routes compile
- Run `npm run lint` to catch issues — the build ignores type errors (`ignoreBuildErrors: true`)
- Spawn the `Explore` subagent for codebase-wide searches of 3+ queries
- Never start dev servers or use Playwright against this app — commit and push, let Coolify deploy
- All LLM calls go through OpenRouter (model: `x-ai/grok-4.1-fast`) — never call Anthropic API directly
- Skills: none project-specific
- MCP servers: none project-specific

## References

- Server-wide context: `/root/CLAUDE.md` (imported via `@../CLAUDE.md`)
- Deployment playbook: `/home/dominic/app-dc81/docs/DEPLOYMENT_PLAYBOOK.md`
- This project's architecture: `docs/ARCHITECTURE.md`
- This project's deploy procedure: `docs/DEPLOYMENT.md`
- Current focus: `docs/PROJECT_STATE.md`
- Setup guides: `docs/setup/`
- Workbook analysis: `docs/workbook-analysis/`
- Audits archive: `docs/audits/`
- Training guides: `docs/training/` (4 role-based onboarding docs with live screenshots)
