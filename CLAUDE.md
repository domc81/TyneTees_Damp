# CLAUDE.md — TyneTees Damp Proofing Survey System

## Project Overview

Web platform for a Newcastle damp proofing contractor. Translating 4 Excel costing workbooks (Damp v48, Condensation v37, Timber v33, Woodworm v26) into a web application. MVP: Lead Gen + CRM + Survey System with automated pricing.

**Client:** TyneTees Damp Proofing (sole contractor)
**Developer:** Dominic / DC81 Ltd
**Repository:** https://github.com/domc81/TyneTees_Damp.git

## Tech Stack

- **Framework:** Next.js 14.2.0 (App Router, `src/` directory)
- **Language:** TypeScript 5.3+
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL) — local Docker instance
- **Auth:** Supabase Auth with RLS policies
- **Package manager:** npm

## Project Structure

```
survey-system/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── materials/          # Materials catalogue
│   │   │   ├── pricing-items/      # LEGACY pricing UI
│   │   │   ├── pricing-test/       # ✅ Pricing engine test page
│   │   │   ├── rates/              # Rate management
│   │   │   └── work-sections/      # Work section management
│   │   ├── costing/                # Costing calculator pages
│   │   │   └── [projectId]/
│   │   ├── customers/              # Customer CRUD
│   │   │   ├── [customerId]/
│   │   │   └── new/
│   │   ├── enquiries/              # Enquiry management
│   │   │   └── new/
│   │   ├── projects/               # Survey list & detail (route still named "projects")
│   │   │   └── [projectId]/
│   │   │       ├── costing/
│   │   │       ├── materials/
│   │   │       └── survey/
│   │   ├── reports/                # Report generation
│   │   │   └── [projectId]/
│   │   │       └── quotation/
│   │   ├── survey/                 # Survey pages
│   │   │   ├── [projectId]/
│   │   │   │   ├── inspection/     # Survey inspection page
│   │   │   │   └── photos/         # Photo upload page
│   │   │   └── new/                # New survey creation
│   │   ├── team/                   # Surveyors management
│   │   │   └── surveyors/
│   │   │       ├── [id]/
│   │   │       └── new/
│   │   ├── login/
│   │   ├── forgot-password/
│   │   ├── update-password/
│   │   ├── settings/
│   │   ├── materials/
│   │   ├── photos/
│   │   ├── layout.tsx
│   │   └── page.tsx                # Dashboard
│   ├── components/
│   │   ├── layout.tsx              # App layout wrapper
│   │   ├── pricing-calculator.tsx  # LEGACY — uses static pricing data
│   │   ├── ProtectedRoute.tsx      # Auth guard
│   │   ├── structured-survey-form.tsx  # LEGACY survey form
│   │   └── ui/                     # UI component library
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── index.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   ├── pricing-engine.ts       # ✅ Calculation engine (8 formula types)
│   │   ├── pricing-data.ts         # ✅ Supabase data loading + orchestration
│   │   ├── supabase-client.ts      # Browser Supabase client
│   │   ├── supabase-server.ts      # Server-side Supabase client
│   │   ├── supabase-data.ts        # All Supabase queries (canonical data layer)
│   │   ├── store.ts                # Client-side state management
│   │   ├── survey-sections.ts      # Survey section definitions
│   │   ├── mock-data.ts            # Mock data for development
│   │   ├── cost-calculator.ts      # LEGACY — replaced by pricing-engine.ts
│   │   └── pricing-database.ts     # LEGACY — replaced by pricing-data.ts
│   └── types/
│       ├── database.types.ts       # Canonical DB TypeScript types
│       ├── survey-wizard.types.ts  # Wizard data model types
│       ├── survey-report.types.ts  # Report template & generated report types
│       └── survey-photo.types.ts   # Photo capture & storage types
├── supabase/
│   └── migrations/                 # 24 SQL migrations (see Database State)
└── docs/
    ├── SURVEY_PLATFORM_SPECIFICATION.md
    ├── DATABASE_MIGRATION_PLAN.md
    ├── ROO_CODE_TASK_PROMPTS.md
    └── workbook_analysis/
        ├── DAMP_WORKBOOK_ANALYSIS.md
        ├── CONDENSATION_WORKBOOK_ANALYSIS.md
        ├── TIMBER_WORKBOOK_ANALYSIS.md
        └── WOODWORM_WORKBOOK_ANALYSIS.md
```

## Database State

### Migrations (24 files, in order)

001_complete_schema.sql, 001_initial_schema.sql, then timestamped:
20260204000001 through 20260220000002 covering: initial schema, survey_data columns, photo storage, customer details, surveyors, RLS policies, rename projects→surveys, survey type extensions, new costing engine schema, survey outputs, seed data (costing sections, line templates ×4, pricing config, material catalogue), room-first wizard, report templates + seed default templates.

### Active Tables

**CRM:**
- `enquiries` — customer contact records
- `customers` — customer master data
- `surveyors` — surveyor profiles

**Surveys:**
- `surveys` (renamed from `projects`) — survey jobs with `survey_type`, `status`, `survey_data` JSONB
- `survey_rooms` — one row per room, has `name`, `room_type`, `floor_level`, `display_order`, `is_completed`. Will be extended with `issues_identified` and `room_data` JSONB for the wizard.

**Survey Type Extensions (schema exists, not yet used by frontend):**
- `survey_damp_report`, `survey_damp_wall_readings`
- `survey_condensation_report`, `survey_condensation_rooms`
- `survey_timber_report`, `survey_timber_rooms`
- `survey_woodworm_report`
- `survey_images`

**Costing Engine (seeded, pricing engine reads from these):**
- `costing_sections` — 44 sections across 4 survey types
- `costing_line_templates` — 227 line item templates with formula types and params
- `pricing_config` — 14 config entries (hourly rates, markups, VAT, etc.)
- `materials_catalog` — 30 products with costs, coverage rates
- `survey_costing_lines` — per-survey calculated costs (populated at calc time)
- `costing_section_adjustments` — per-section price adjustment %

**Report System:**
- `report_templates` — report template definitions (one default per survey type, sections + settings as JSONB)
- `survey_reports` — generated report instances (status: draft → generated → reviewed → finalised)

**Survey Outputs (schema exists, not yet used):**
- `survey_customer_summary`, `survey_overheads`, `survey_caf1`, `survey_subcontractor_costs`

**Legacy/Deprecated (still in DB):**
- `work_sections`, `pricing_items`, `base_rates`, `markup_config`, `project_costing`
- `moisture_readings`, `defects`, `photos`

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

## TypeScript Conventions

- **Canonical DB types** in `src/types/database.types.ts`
- **Primary types:** `Survey`, `SurveyStatus`, `SurveyCosting`, `SurveyInput`
- **Backward-compat aliases:** `Project = Survey`, `ProjectStatus = SurveyStatus`
- **Data functions** in `src/lib/supabase-data.ts` — primary names `getSurveys()`, `getSurvey()`, `createSurvey()`, etc.
- **Wizard types** will be in `src/types/survey-wizard.types.ts` (to be created)

## Important Notes

- Route folder `src/app/projects/` has NOT been renamed to `surveys/` yet — URL is still `/projects`
- `client_name` can be null — always use `(project.client_name || '')`
- `src/components/pricing-calculator.tsx` and `src/app/admin/pricing-items/page.tsx` use LEGACY static pricing data — do not extend these
- Local Supabase runs on Docker — connection details in `.env.local`
- `survey-wizard.types.ts` will be the canonical type file for wizard data — always import wizard types from there
- Database migrations are NOT auto-applied. After pulling new migration files, run: `PGPASSWORD=postgres psql -h 127.0.0.1 -p 54322 -U postgres -d postgres -f supabase/migrations/<filename>.sql` to apply them.

## Build & Dev Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run ESLint
```

## What's Built & Working

- Login/auth flow with ProtectedRoute
- Dashboard with survey stats
- Enquiry management (list, create)
- Customer management (list, create, edit)
- Surveyor management (list, create, edit)
- Materials catalogue page
- Basic survey creation flow
- Photo upload to Supabase Storage
- **Pricing engine** — `src/lib/pricing-engine.ts` (8 formula types, tested working)
- **Pricing data layer** — `src/lib/pricing-data.ts` (Supabase loading + orchestration)
- **Pricing test page** — `src/app/admin/pricing-test/page.tsx` (end-to-end verified)
- **Survey wizard** — complete 5-step room-first UI with Supabase persistence
- **Mapping engine** — `src/lib/survey-mapping.ts` (transforms wizard data into pricing inputs)
- **Costing review page** — `src/app/survey/[projectId]/costing/page.tsx` (auto-calculated costs)
- **Report data model** — `src/types/survey-report.types.ts` (template + generated report types)
- **Report templates** — 4 default templates seeded from workbook analysis (damp, condensation, timber, woodworm)
- **Report generation service** — `src/lib/report-generator.ts` (boilerplate selection, data population, LLM narrative via OpenRouter)
- **Report API** — `src/app/api/generate-report/route.ts` (LLM narrative generation with Llama 3.1 70B)
- **Report data layer** — `src/lib/report-data.ts` (CRUD operations for survey_reports table)
- **Report editor UI** — `src/app/survey/[projectId]/report/page.tsx` (section review, inline editing, status workflow)
- **PDF renderer** — `src/lib/report-pdf-renderer.tsx` + `src/app/api/report-pdf/route.ts` (professional PDF generation)

## What's Next (Build Order)

The survey platform MVP is now feature-complete. Remaining work: testing, refinement, and deployment preparation.

## Reference Documents

- `PROJECT_STATE.md` — living document tracking current state and build order
- `survey-system/DATABASE.md` — database documentation (may be stale)
- `survey-system/DEVELOPMENT.md` — development setup guide (may be stale)
- `survey-system/COMPLETE_DOCUMENTATION.md` — comprehensive docs (may be stale)
- `survey-system/AUTHENTICATION.md` — auth setup docs
- `workbook_extraction/output/DAMP_WORKBOOK_ANALYSIS.md` — damp workbook fields and formulas
- `workbook_extraction/output/CONDENSATION_WORKBOOK_ANALYSIS.md` — condensation
- `workbook_extraction/output/TIMBER_WORKBOOK_ANALYSIS.md` — timber
- `workbook_extraction/output/WOODWORM_WORKBOOK_ANALYSIS.md` — woodworm
