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
│   │   │   │   ├── page.tsx        # Admin landing page
│   │   │   │   ├── availability/   # Surveyor availability management
│   │   │   │   ├── materials/      # Materials catalogue admin
│   │   │   │   ├── rates/          # Pricing config (reads/writes pricing_config table)
│   │   │   │   └── team/           # Team/surveyor management (profiles)
│   │   │   ├── api/                # API routes (21 route files — see API Routes section)
│   │   │   ├── calendar/           # Booking calendar (FullCalendar)
│   │   │   ├── customers/          # Customer CRUD (list, [customerId] detail, new)
│   │   │   ├── enquiries/          # Enquiry pipeline Kanban + new enquiry form (has layout.tsx)
│   │   │   ├── materials/          # Materials catalogue view
│   │   │   ├── q/[token]/          # Public quotation page (page.tsx + client.tsx + CSS)
│   │   │   ├── report/[reportId]/  # Public report view (page.tsx + client.tsx + CSS)
│   │   │   ├── settings/           # Settings hub + company profile + notification prefs
│   │   │   ├── survey/
│   │   │   │   ├── new/            # New survey creation
│   │   │   │   └── [projectId]/    # Note: param is [projectId] (historical) — refers to survey ID
│   │   │   │       ├── costing/    # Auto-calculated costing review
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
│   │   │   ├── layout.tsx          # Sidebar nav with role-based items + NotificationBell
│   │   │   ├── ProtectedRoute.tsx  # Auth guard (client-side route protection)
│   │   │   ├── CompanyLogo.tsx     # Dynamic company logo
│   │   │   ├── EnquiryDrawer.tsx   # Enquiry detail drawer (tabs, inline edit, activity)
│   │   │   ├── NotificationBell.tsx # Realtime notification bell
│   │   │   ├── calendar/           # SlotPicker, SurveyorSelect
│   │   │   ├── installer-info/     # InstallerPhotoUpload
│   │   │   ├── report/             # 19 report section components (see Report Components)
│   │   │   ├── ui/                 # Primitives: button, card, input, index
│   │   │   └── wizard/             # 12 wizard components (see Wizard Components)
│   │   ├── context/
│   │   │   ├── AuthContext.tsx      # Auth state + profile + role-based flags
│   │   │   └── CompanyProfileContext.tsx # Company profile provider
│   │   ├── hooks/
│   │   │   └── useSmartBack.ts     # Smart back navigation
│   │   ├── middleware.ts           # Supabase SSR session management + token rotation
│   │   ├── lib/                    # 31 library files (see Lib Files section)
│   │   └── types/
│   │       ├── database.types.ts    # Canonical DB TypeScript types
│   │       ├── survey-wizard.types.ts # Wizard data model types
│   │       ├── survey-report.types.ts # Report template & generated report types
│   │       ├── survey-photo.types.ts  # Photo capture & storage types
│   │       └── installer-info.types.ts # Installer info types
│   ├── supabase/
│   │   ├── migrations/              # 34 SQL migrations
│   │   ├── functions/               # Edge functions (legacy — app uses API routes instead)
│   │   ├── config.toml
│   │   ├── seed.sql
│   │   └── setup-authentication.sql
│   ├── public/                      # Static assets
│   ├── Dockerfile                   # Multi-stage Node 22 Alpine build
│   ├── docker-compose.yml           # Local dev Postgres (NOT used in production)
│   ├── package.json
│   ├── next.config.mjs              # standalone output, 10MB server actions, ignoreBuildErrors
│   ├── tailwind.config.ts           # Brand theme, custom animations, glass effects
│   ├── postcss.config.mjs
│   └── tsconfig.json                # strict mode, @/* path alias → ./src/*
├── supabase/
│   └── migrations/                  # 1 root-level migration (allow_published_status)
├── workbook_extraction/             # Excel workbook analysis scripts
└── *.xlsm, *.xls, *.csv            # Original Excel workbooks & exports
```

### Wizard Components (12 files)

`WizardStepper`, `SiteDetailsStep`, `ExternalInspectionStep`, `RoomInspectionStep`, `DampFields`, `CondensationFields`, `TimberFields`, `WoodwormFields`, `AdditionalWorksStep`, `ReviewStep`, `AudioRecorder`, `PhotoCapture`

### Report Components (19 files)

`CoverSection`, `ExecutiveSummarySection`, `PropertySection`, `ExternalInspectionSection`, `RoomFindingsSection`, `ScopeOfWorksSection`, `TreatmentMethodologySection`, `CondensationCausesSection`, `SurveyContextSection`, `SurveyorProfileSection`, `AboutUsSection`, `BoilerplateSection`, `ReportHeader`, `ReportFooter`, `PhotoGrid`, `PhotoLightbox`, `TextSection`, `TextContent`, `utils`

### Lib Files (31 files)

**Supabase:** `supabase-client.ts` (browser), `supabase-server.ts` (server), `supabase-data.ts` (canonical data layer — all Supabase queries)

**Pricing:** `pricing-engine.ts` (8 formula types), `pricing-data.ts` (data loading + orchestration), `survey-mapping.ts` (wizard data → pricing inputs), `travel-overhead.ts` (post-engine travel & vehicle overhead)

**Survey:** `survey-wizard-data.ts` (wizard persistence/auto-save), `survey-photo-service.ts` (photo upload/management), `survey-tags.ts` (survey type tagging)

**Reports:** `report-generator.ts` (boilerplate + LLM narrative), `report-data.ts` (report CRUD), `report-publish.ts` (publish/share)

**PDF:** `quotation-pdf-renderer.tsx` (quotation PDF layout via @react-pdf/renderer)

**Email:** `email-service.ts` (Resend sending + communication_log), `email-templates.ts` (HTML templates), `email-config.ts` (config loading from platform_settings)

**Calendar:** `calendar-data.ts` (booking queries), `calendar-types.ts` (TypeScript types)

**Customer:** `customer-data.ts` (customer-specific queries)

**Company:** `company-profile.ts` (company profile helpers)

**Installer Info:** `installer-info-categories.ts` (category definitions), `installer-info-data.ts` (queries)

**Notifications:** `notifications-server.ts` (server-side creation), `notification-preferences.ts` (preference helpers)

**CSV Export:** `cf-csv-export.ts`, `cf-export-config.ts`

**Utilities:** `cron-auth.ts` (cron route authentication), `terms-hash.ts` (T&C hash generation)

**Tests:** `cf-csv-export.test.ts`, `__tests__/pricing-engine.smoke.ts`

## API Routes

21 route.ts files. CRUD operations for surveys, enquiries, bookings, notifications, and quotations are handled via direct Supabase client SDK calls from the frontend — API routes are only used for server-side operations requiring secrets.

| Route | Purpose |
|---|---|
| `/api/admin/team` | Team member CRUD (service role) |
| `/api/bookings/notify` | Booking notification emails |
| `/api/cron/booking-reminders` | Daily booking reminder (cron, requires CRON_SECRET) |
| `/api/enquiries/[id]/notify-on-hold` | On-hold customer email notification |
| `/api/generate-report` | LLM report narrative generation (OpenRouter) |
| `/api/notifications/trigger` | Programmatic in-app notification creation |
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
| `/api/surveys/[id]/quotation` | Generate quotation from survey |
| `/api/transcribe` | Deepgram speech-to-text |

**Public routes** (excluded from auth middleware): `/api/q/*`, `/api/report/*`

## Middleware

`src/middleware.ts` — Supabase SSR session management. Runs on all routes except `_next/static`, `_next/image`, `favicon.ico`, `api/q/` (public quotation), and `api/report/` (public report). Handles JWT refresh via `getUser()`. Route protection is handled client-side by `ProtectedRoute.tsx`, not middleware.

## Database

### Migrations

35 total: 34 in `survey-system/supabase/migrations/` + 1 in root `supabase/migrations/`.

Range: `00000000000000_initial_schema.sql` through `20260303000002_fix_notifications_replica_identity.sql`. Applied manually via `docker exec`.

### Active Tables

**CRM & Pipeline:**
- `enquiries` — pipeline records (status, priority, sla, follow_up_date, on_hold_reason, decline_reason)
- `enquiry_activity` — activity/timeline log
- `on_hold_templates` — predefined on-hold message templates
- `customers` — customer master data
- `communication_log` — email/call communication records

**User & Team:**
- `user_profiles` — user accounts with roles (admin, office, surveyor)
- `platform_settings` — per-user settings (notification preferences, Resend API key override)

**Surveys:**
- `surveys` — survey jobs with `survey_type`, `status`, `survey_data` JSONB, `tags` TEXT[]
- `survey_rooms` — one row per room with `issues_identified` TEXT[] and `room_data` JSONB
- `survey_images` — survey photos

**Survey Type Extensions:**
- `survey_damp_report`, `survey_damp_wall_readings`
- `survey_condensation_report`, `survey_condensation_rooms`
- `survey_timber_report`, `survey_timber_rooms`
- `survey_woodworm_report`

**Costing Engine:**
- `costing_sections` — 44 sections across 4 survey types
- `costing_line_templates` — 227 line item templates with formula types and params
- `pricing_config` — 14 config entries (hourly rates, markups, VAT, etc.)
- `materials_catalog` — 30 products with costs, coverage rates
- `survey_costing_lines` — per-survey calculated costs
- `costing_section_adjustments` — per-section price adjustment %

**Quotations:**
- `quotations` — status workflow: draft → sent → viewed → accepted/declined
- `quotation_sections` — quotation line items with optional/included flags
- `quotation_acceptances` — e-signature consent records (immutable audit trail)

**Reports:**
- `report_templates` — 4 default templates (one per survey type)
- `survey_reports` — status workflow: draft → generated → reviewed → finalised → published
- `report_view_events` — report view tracking

**Calendar & Bookings:**
- `bookings` — survey booking slots
- `surveyor_availability` — weekly availability patterns
- `booking_reminders_sent` — dedup table for reminder emails

**Notifications:**
- `notifications` — in-app notifications with realtime subscriptions

**Company:**
- `company_profile` — company details, logo, T&C text
- `section_inclusions` — per-survey-type section inclusion settings

### Key Pricing Config Values

| Key | Value |
|-----|-------|
| hourly_labour_rate | 30.63 |
| contractor_hourly_rate | 28.00 |
| default_material_markup | 0.30 (30%) |
| default_labour_markup | 1.00 (100%) |
| default_wastage_factor | 1.10 (10%) |
| vat_rate | 0.20 (20%) |

### Formula Types in costing_line_templates

- `standard` — material = unit_cost x quantity, labour = rate x quantity
- `ceiling_coverage` — CEIL(quantity / coverage) x (unit_cost / coverage x wastage)
- `dpc_injection` — cream cost + drill plug cost based on wall depth
- `compound_material` — multi-material mix (e.g. dubbing coat = SBR + sand + cement)
- `fixed_price` — flat rate item (e.g. PIV units)
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

Kanban board with drag-and-drop columns: New → Contacted → Booked → Surveyed → Quoted → Won / On Hold / Declined. Features:
- Detail drawer with tabs (details, activity, notes)
- Inline field editing
- SLA traffic lights and follow-up indicators
- Auto-status transitions on survey completion and quotation generation
- On-hold customer email notifications with template messages
- Convert-and-book flow (enquiry → customer + survey + booking)
- Quick actions (contact shortcuts, follow-up picker)
- Dashboard widget with pipeline stats and recent activity

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

## Build & Dev Commands

All commands run from `survey-system/` directory:
```bash
npm run build        # Production build (also validates routes compile)
npm run lint         # Run ESLint
npm run dev          # Start dev server (DO NOT use — commit and push instead)
```

## What's Built & Working

- **Auth:** Login, forgot/change/update password, ProtectedRoute, role-based UI (admin/office/surveyor)
- **Dashboard:** Survey stats, enquiry pipeline widget, recent activity feed
- **Enquiry Pipeline:** Kanban board, drag-drop, detail drawer, inline edit, SLA indicators, auto-transitions, on-hold emails, convert-and-book
- **Customer Management:** List, create, edit, detail with history and communication log
- **Survey System:** Creation, list, detail, 5-step room-first wizard with auto-save, voice recording + transcription, photo capture
- **Pricing Engine:** 8 formula types, Supabase data loading, travel overhead calculator
- **Costing:** Auto-calculated from wizard data, section-by-section breakdown, multi-type tabs
- **Quotations:** Generation from survey, PDF rendering, email sending, public accept/decline page, e-signature
- **Reports:** LLM narrative generation (OpenRouter / Grok 4.1 Fast), section editor, status workflow, email sending, public view
- **Calendar:** Booking management with FullCalendar, surveyor availability, booking notifications, daily reminders
- **Notifications:** In-app realtime notifications via Supabase Realtime, preference management
- **Settings:** Company profile, logo upload, notification preferences, email testing
- **Materials:** Catalogue view and admin
- **Team:** Surveyor/user profile management
- **Installer Info:** Per-survey installer information and photos
- **CF CSV Export:** Export logic with test coverage
- **Transcription:** Deepgram speech-to-text for survey observations
- **Observation Polishing:** LLM cleanup of voice-transcribed notes

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
