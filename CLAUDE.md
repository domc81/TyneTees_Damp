# CLAUDE.md — TyneTees Damp Proofing Survey System

## Project Overview

Web platform for a Newcastle damp proofing contractor. Translating 4 Excel costing workbooks (Damp v48, Condensation v37, Timber v33, Woodworm v26) into a web application. MVP: Lead Gen + CRM + Survey System with automated pricing.

**Client:** TyneTees Damp Proofing (sole contractor)
**Developer:** Dominic / DC81 Ltd
**Repository:** https://github.com/domc81/TyneTees_Damp.git
**Live URL:** https://ttdp.dc81.io

## Tech Stack

- **Framework:** Next.js 14.2.35 (App Router, `src/` directory, standalone output)
- **Language:** TypeScript 5.3+
- **Styling:** Tailwind CSS 3.4
- **Database:** Supabase (PostgreSQL) — self-hosted Docker instance (container prefix `y04kk0w`)
- **Auth:** Supabase Auth with RLS policies + role-based access (admin, office, surveyor)
- **Email:** Resend (transactional emails — quotations, reports, booking confirmations)
- **Speech-to-text:** Deepgram (survey observation transcription)
- **LLM:** OpenRouter (report narrative generation — Llama 3.1 70B)
- **PDF:** @react-pdf/renderer (quotation + report PDF generation)
- **Drag-and-drop:** @dnd-kit (enquiry pipeline Kanban board)
- **Calendar:** FullCalendar (booking/availability management)
- **Package manager:** npm
- **Node:** 22 (Alpine, for Docker build)

## Infrastructure & Deployment

- **Deployment:** Coolify (auto-deploy on push to `main`) → Traefik → Cloudflare
- **App container:** `es4ws4gosc4g84gkosk4c008` (Next.js standalone)
- **Supabase container prefix:** `y04kk0wwoswogw0oowcs04gw` (14 containers, all healthy)
- **Supabase API:** `https://api.ttdp.dc81.io` (via Kong gateway)
- **Dockerfile:** Multi-stage build (node:22-alpine), standalone output mode

### Credentials

All read from `/home/dominic/.credentials/` at runtime — **never hardcode or commit values**.

| File | Used for |
|---|---|
| `.ttdp-supabase-credentials` | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, Postgres password |
| `.resend-credentials` | `RESEND_API_KEY` for transactional emails |
| `.deepgram-credentials` | `DEEPGRAM_API_KEY` for speech-to-text |
| `.cloudflare-credentials` | Cloudflare API access |
| `coolify_api_token` | Coolify API bearer token |

The `.env.local` at `survey-system/.env.local` is owned by `root:dc81-secrets` and injected by Coolify at build time. The `.env.local.example` shows the shape.

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
│   │   ├── app/                    # App Router pages
│   │   │   ├── page.tsx            # Dashboard (stats, pipeline widget, activity feed)
│   │   │   ├── layout.tsx          # Root layout with AuthProvider + CompanyProfileProvider
│   │   │   ├── error.tsx           # Error boundary
│   │   │   ├── not-found.tsx       # Custom 404
│   │   │   ├── admin/
│   │   │   │   ├── availability/   # Surveyor availability management
│   │   │   │   ├── materials/      # Materials catalogue admin
│   │   │   │   ├── rates/          # Pricing config (reads/writes pricing_config table)
│   │   │   │   └── team/           # Team/surveyor management (profiles)
│   │   │   ├── api/                # API routes (see API Routes section)
│   │   │   ├── calendar/           # Booking calendar (FullCalendar)
│   │   │   ├── customers/          # Customer CRUD (list, [customerId] detail, new)
│   │   │   ├── enquiries/          # Enquiry pipeline Kanban + new enquiry form
│   │   │   ├── materials/          # Materials catalogue view
│   │   │   ├── q/[token]/          # Public quotation accept/decline page
│   │   │   ├── report/[reportId]/  # Public report view page
│   │   │   ├── settings/           # Settings hub + company profile + notification prefs
│   │   │   ├── survey/
│   │   │   │   ├── new/            # New survey creation
│   │   │   │   └── [projectId]/
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
│   │   │   ├── ProtectedRoute.tsx  # Auth guard
│   │   │   ├── CompanyLogo.tsx     # Dynamic company logo
│   │   │   ├── EnquiryDrawer.tsx   # Enquiry detail drawer (tabs, inline edit, activity)
│   │   │   ├── NotificationBell.tsx # Realtime notification bell
│   │   │   ├── calendar/           # Calendar components
│   │   │   ├── installer-info/     # Installer info components
│   │   │   ├── report/             # Report editor components
│   │   │   ├── ui/                 # UI primitives (button, card, input, etc.)
│   │   │   └── wizard/             # Survey wizard step components
│   │   │       ├── WizardStepper.tsx
│   │   │       ├── SiteDetailsStep.tsx
│   │   │       ├── ExternalInspectionStep.tsx
│   │   │       ├── RoomInspectionStep.tsx
│   │   │       ├── DampFields.tsx, CondensationFields.tsx, TimberFields.tsx, WoodwormFields.tsx
│   │   │       ├── AdditionalWorksStep.tsx
│   │   │       └── ReviewStep.tsx
│   │   ├── context/
│   │   │   ├── AuthContext.tsx      # Auth state + profile + role-based flags
│   │   │   └── CompanyProfileContext.tsx # Company profile provider
│   │   ├── lib/
│   │   │   ├── supabase-client.ts   # Browser Supabase client
│   │   │   ├── supabase-server.ts   # Server-side Supabase client
│   │   │   ├── supabase-data.ts     # Canonical data layer (all Supabase queries)
│   │   │   ├── pricing-engine.ts    # Calculation engine (8 formula types)
│   │   │   ├── pricing-data.ts      # Pricing data loading + orchestration
│   │   │   ├── survey-mapping.ts    # Wizard data → pricing inputs (room aggregation)
│   │   │   ├── survey-wizard-data.ts # Wizard persistence (load/save/auto-save)
│   │   │   ├── survey-photo-service.ts # Photo upload/management
│   │   │   ├── survey-tags.ts       # Survey type tagging
│   │   │   ├── travel-overhead.ts   # Post-engine travel & vehicle overhead
│   │   │   ├── report-generator.ts  # Report generation (boilerplate + LLM narrative)
│   │   │   ├── report-data.ts       # Report CRUD operations
│   │   │   ├── report-publish.ts    # Report publish/share
│   │   │   ├── quotation-pdf-renderer.tsx # Quotation PDF layout
│   │   │   ├── cf-csv-export.ts     # CF CSV export logic
│   │   │   ├── cf-export-config.ts  # CF export configuration
│   │   │   ├── calendar-data.ts     # Calendar/booking queries
│   │   │   ├── calendar-types.ts    # Calendar TypeScript types
│   │   │   ├── customer-data.ts     # Customer-specific queries
│   │   │   ├── email-service.ts     # Resend email sending
│   │   │   ├── email-templates.ts   # HTML email templates
│   │   │   ├── email-config.ts      # Email configuration
│   │   │   ├── company-profile.ts   # Company profile helpers
│   │   │   ├── installer-info-categories.ts # Installer info category definitions
│   │   │   ├── installer-info-data.ts # Installer info queries
│   │   │   ├── notifications-server.ts # Server-side notification creation
│   │   │   ├── notification-preferences.ts # Notification pref helpers
│   │   │   ├── cron-auth.ts         # Cron route authentication
│   │   │   ├── terms-hash.ts        # T&C hash generation
│   │   │   └── __tests__/           # Test files (cf-csv-export.test.ts)
│   │   └── types/
│   │       ├── database.types.ts    # Canonical DB TypeScript types
│   │       ├── survey-wizard.types.ts # Wizard data model types
│   │       ├── survey-report.types.ts # Report template & generated report types
│   │       ├── survey-photo.types.ts  # Photo capture & storage types
│   │       └── installer-info.types.ts # Installer info types
│   ├── supabase/
│   │   ├── migrations/              # 35 SQL migrations (see Database State)
│   │   ├── functions/               # Edge functions (generate-report, send-quotation)
│   │   ├── config.toml
│   │   ├── seed.sql
│   │   └── setup-authentication.sql
│   ├── public/                      # Static assets
│   ├── Dockerfile                   # Multi-stage Node 22 Alpine build
│   ├── docker-compose.yml           # Local dev Postgres (NOT used in production)
│   ├── package.json
│   ├── next.config.mjs              # standalone output, 10MB server actions
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── supabase/
│   └── migrations/                  # Legacy migration location
├── workbook_extraction/             # Excel workbook analysis scripts
├── docs/                            # Specification docs (in survey-system/docs/)
└── *.xlsm, *.xls, *.csv            # Original Excel workbooks & exports
```

## API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/admin/team` | GET/POST | Team member CRUD |
| `/api/bookings` | GET/POST | Booking management |
| `/api/bookings/notify` | POST | Booking notification emails |
| `/api/cron/booking-reminders` | GET | Daily booking reminder (cron) |
| `/api/enquiries` | GET/POST | Enquiry CRUD |
| `/api/enquiries/[id]` | GET/PATCH | Single enquiry operations |
| `/api/enquiries/[id]/notify-on-hold` | POST | On-hold customer notification |
| `/api/generate-report` | POST | LLM report narrative generation |
| `/api/notifications` | GET/POST | In-app notification management |
| `/api/notifications/trigger` | POST | Programmatic notification creation |
| `/api/polish-observation` | POST | LLM polish survey observations |
| `/api/q/[token]` | GET | Public quotation view |
| `/api/q/[token]/pdf` | GET | Public quotation PDF download |
| `/api/q/[token]/respond` | POST | Quotation accept/decline |
| `/api/q/[token]/view` | POST | Track quotation view |
| `/api/quotation-pdf/[quotationId]` | GET | Internal quotation PDF |
| `/api/quotations` | POST | Create quotation |
| `/api/quotations/[id]` | GET/PATCH | Quotation CRUD |
| `/api/quotations/[id]/send` | POST | Send quotation email |
| `/api/report/[reportId]` | GET | Report data |
| `/api/report/[reportId]/view` | POST | Track report view |
| `/api/reports/[id]` | GET/PATCH | Report CRUD |
| `/api/reports/[id]/send` | POST | Send report email |
| `/api/settings/company` | GET/POST | Company profile |
| `/api/settings/company/logo` | POST | Logo upload |
| `/api/settings/notifications` | GET/POST | Notification preferences |
| `/api/settings/notifications/test-email` | POST | Test email delivery |
| `/api/surveys` | GET/POST | Survey CRUD |
| `/api/surveys/[id]` | GET/PATCH | Single survey operations |
| `/api/surveys/[id]/quotation` | POST | Generate quotation from survey |
| `/api/transcribe` | POST | Deepgram speech-to-text |

## Database State

### Migrations (35 files)

`00000000000000_initial_schema.sql` through `20260303000002_fix_notifications_replica_identity.sql`. Covers: complete schema, seed data, user profiles, password management, storage buckets, installer info, costing corrections (multiple), formula fixes, quotation schema, section inclusions, company profile, survey tags, surveyor identity, calendar/bookings/availability, notifications, communication log, report/quotation view tracking, quotation acceptances, enquiry pipeline, and realtime fixes.

### Active Tables

**CRM & Pipeline:**
- `enquiries` — enquiry records with pipeline columns (status, priority, sla, follow_up_date, on_hold_reason, decline_reason)
- `enquiry_activity` — enquiry activity/timeline log
- `on_hold_templates` — predefined on-hold message templates
- `customers` — customer master data
- `communication_log` — customer communication records

**User & Team:**
- `user_profiles` — user accounts with roles (admin, office, surveyor)
- `platform_settings` — per-user settings (notification preferences)

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
- `quotations` — generated quotations with status workflow (draft → sent → viewed → accepted/declined)
- `quotation_sections` — quotation line items
- `quotation_acceptances` — e-signature consent records (immutable audit trail)

**Reports:**
- `report_templates` — 4 default templates (one per survey type)
- `survey_reports` — generated report instances (draft → generated → reviewed → finalised)
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

**Survey Outputs (schema exists, not yet populated):**
- `survey_customer_summary`, `survey_overheads`, `survey_caf1`, `survey_subcontractor_costs`

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

- `standard` — material = unit_cost × quantity, labour = rate × quantity
- `ceiling_coverage` — CEIL(quantity / coverage) × (unit_cost / coverage × wastage)
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
- **Survey System:** Creation, list, detail, 5-step room-first wizard with auto-save
- **Pricing Engine:** 8 formula types, Supabase data loading, travel overhead calculator
- **Costing:** Auto-calculated from wizard data, section-by-section breakdown, multi-type tabs
- **Quotations:** Generation from survey, PDF rendering, email sending, public accept/decline page, e-signature
- **Reports:** LLM narrative generation (OpenRouter), section editor, status workflow, email sending, public view
- **Calendar:** Booking management with FullCalendar, surveyor availability, booking notifications, daily reminders
- **Notifications:** In-app realtime notifications via Supabase Realtime, preference management
- **Settings:** Company profile, logo upload, notification preferences, email testing
- **Materials:** Catalogue view and admin
- **Team:** Surveyor/user profile management
- **Installer Info:** Per-survey installer information and photos
- **CF CSV Export:** Export logic with test coverage
- **Transcription:** Deepgram speech-to-text for survey observations

## External API Access Available

- **Cloudflare** — DNS, CDN (credentials at `.cloudflare-credentials`)
- **Coolify** — Deployment management (API token at `coolify_api_token`)
- **Resend** — Transactional email (credentials at `.resend-credentials`)
- **Deepgram** — Speech-to-text (credentials at `.deepgram-credentials`)
- **OpenRouter** — LLM API access (key in `.env.local`)

## Reference Documents

- `survey-system/PROJECT_STATE.md` — build progress tracker (stale — last updated Feb 2026)
- `survey-system/DATABASE.md` — database documentation
- `survey-system/DEVELOPMENT.md` — development setup guide
- `survey-system/AUTHENTICATION.md` — auth setup docs
- `survey-system/SUPER_ADMIN_SETUP.md` — admin account setup
- `workbook_extraction/output/` — workbook analysis (damp, condensation, timber, woodworm)
