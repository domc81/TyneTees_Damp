# CLAUDE.md — TyneTees Damp Proofing Survey System

## Project Overview

Web platform for a Newcastle damp proofing contractor. MVP scope: Lead Generation + CRM + Survey System with automated pricing engine.

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
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/              # Admin pages (materials, pricing, rates, work-sections)
│   │   ├── costing/            # Costing calculator pages
│   │   ├── customers/          # Customer CRUD
│   │   ├── enquiries/          # Enquiry management
│   │   ├── projects/           # Survey list & detail (route still named "projects")
│   │   ├── reports/            # Report generation
│   │   ├── survey/             # Survey wizard (new, inspection, photos)
│   │   ├── team/               # Surveyors management
│   │   ├── login/              # Auth pages
│   │   └── page.tsx            # Dashboard
│   ├── components/             # Shared UI components
│   ├── context/                # AuthContext
│   ├── lib/                    # Data layer & utilities
│   │   ├── supabase-client.ts  # Browser Supabase client
│   │   ├── supabase-server.ts  # Server-side Supabase client
│   │   ├── supabase-data.ts    # All Supabase queries (canonical data layer)
│   │   ├── cost-calculator.ts  # Static pricing logic (to be replaced)
│   │   └── pricing-database.ts # Static pricing data (to be replaced)
│   └── types/
│       └── database.types.ts   # Canonical TypeScript types (single source of truth)
├── supabase/
│   └── migrations/             # All SQL migrations (applied to local Supabase)
└── docs/
    ├── SURVEY_PLATFORM_SPECIFICATION.md   # Full architecture spec
    ├── DATABASE_MIGRATION_PLAN.md         # Migration strategy doc
    └── workbook_analysis/                 # Forensic extraction of 4 Excel workbooks
        ├── DAMP_WORKBOOK_ANALYSIS.md      # 603K, 11,710 lines
        ├── CONDENSATION_WORKBOOK_ANALYSIS.md  # 343K, 7,022 lines
        ├── TIMBER_WORKBOOK_ANALYSIS.md    # 865K, 17,137 lines
        └── WOODWORM_WORKBOOK_ANALYSIS.md  # 311K, 6,306 lines
```

## Database State (as of 19 Feb 2026)

### Recent Migration: `projects` table renamed to `surveys`

The main table was renamed from `projects` to `surveys`. All Supabase queries in `supabase-data.ts` use `.from('surveys')`. TypeScript types use `Survey` as primary with `Project = Survey` backward-compat alias.

### Active Tables

**CRM (working in frontend):**
- `enquiries` — customer contact records, enquiry tracking
- `customers` — customer master data
- `surveyors` — surveyor profiles

**Surveys (renamed from projects):**
- `surveys` — survey jobs (was `projects`). Has `project_number`, `survey_type`, `status`, `reported_problem`, `completion_pct`, etc.

**Survey Type Extensions (schema created, not yet used by frontend):**
- `survey_damp_report` — 1:1 with surveys where type=damp
- `survey_damp_wall_readings` — per-wall moisture readings
- `survey_condensation_report` — 1:1 condensation
- `survey_condensation_rooms` — per-room condensation findings
- `survey_timber_report` — 1:1 timber
- `survey_timber_rooms` — per-room timber findings (up to 9)
- `survey_woodworm_report` — 1:1 woodworm
- `survey_images` — photos linked to surveys

**NEW Costing Engine (seeded, not yet used by frontend):**
- `costing_sections` — 44 section definitions across 4 survey types
- `costing_line_templates` — 227 line item templates with formula types and params
- `pricing_config` — 14 key-value config entries (hourly rates, markups, VAT, etc.)
- `materials_catalog` — 30 products with costs, coverage rates, supplier URLs
- `survey_costing_lines` — per-survey calculated costs (empty, populated at calc time)
- `costing_section_adjustments` — per-section price adjustment %

**Survey Outputs (schema created, not yet used):**
- `survey_customer_summary` — aggregated section totals for quotes
- `survey_overheads` — travel, scaffolding, skip costs
- `survey_caf1` — on-site acceptance form
- `survey_subcontractor_costs` — per-section contractor allocation

**Legacy/Deprecated (still in DB, not actively used):**
- `work_sections`, `pricing_items`, `base_rates`, `markup_config`, `project_costing`
- `survey_rooms`, `moisture_readings`, `defects`, `photos`

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

Each line template has a `cost_formula` field indicating how to calculate:
- `standard` — simple: material = unit_cost × quantity, labour = rate × quantity
- `ceiling_coverage` — CEIL(quantity / coverage) × (unit_cost / coverage × wastage)
- `dpc_injection` — DPC-specific: cream cost + drill plug cost based on wall depth
- `compound_material` — multi-material mix (e.g. dubbing coat = SBR + sand + cement)
- `fixed_price` — flat rate item (e.g. PIV units, loft hatches)
- `tiered_disposal` — conditional rate based on quantity threshold
- `bag_and_cart` — per-bag debris removal
- `skip_hire` — reads cost from pricing_config

## TypeScript Conventions

- **Canonical types** are in `src/types/database.types.ts` — always import from there
- **Primary types:** `Survey`, `SurveyStatus`, `SurveyCosting`, `SurveyInput`
- **Backward-compat aliases:** `Project = Survey`, `ProjectStatus = SurveyStatus`, etc.
- **Data functions** are in `src/lib/supabase-data.ts` — primary names are `getSurveys()`, `getSurvey()`, `createSurvey()`, etc. Old names (`getProjects`, etc.) exist as aliases.

## Important Notes

- Route folder `src/app/projects/` has NOT been renamed to `surveys/` yet — URL is still `/projects`
- `client_name` can be null from the database — always use `(project.client_name || '')` for string operations
- The pricing calculator at `src/components/pricing-calculator.tsx` and `src/app/admin/pricing-items/page.tsx` still use STATIC pricing data from `lib/pricing-database.ts` — these need refactoring to use the new `costing_line_templates` table
- Local Supabase runs on Docker — connection details are in `.env.local`

## Build & Dev Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run ESLint
```

## What's Been Built

- Login/auth flow with ProtectedRoute
- Dashboard with survey stats
- Enquiry management (list, create)
- Customer management (list, create, edit)
- Surveyor management (list, create, edit, back button)
- Materials catalogue page (reads from Supabase)
- Basic survey creation flow
- Photo upload to Supabase Storage

## What's Next (in order)

1. **Pricing Engine** — TypeScript calculation module that reads costing_line_templates + pricing_config from Supabase, implements all formula types, returns calculated costs
2. **Survey Wizard UI** — Step-by-step on-site data capture (shared base + type-specific steps)
3. **Costing UI** — Frontend that sends surveyor inputs to pricing engine, displays costs
4. **Customer Summary / Quote generation**
5. **PDF report generation**
6. **CF CSV export**

## Reference Documents

For detailed architecture, formula specifications, and workbook data:
- `docs/SURVEY_PLATFORM_SPECIFICATION.md` — full schema + pricing engine spec + formula reference
- `docs/DATABASE_MIGRATION_PLAN.md` — migration strategy and table mappings
- `docs/workbook_analysis/DAMP_WORKBOOK_ANALYSIS.md` — source data for damp formulas
- `docs/workbook_analysis/CONDENSATION_WORKBOOK_ANALYSIS.md` — condensation formulas
- `docs/workbook_analysis/TIMBER_WORKBOOK_ANALYSIS.md` — timber formulas
- `docs/workbook_analysis/WOODWORM_WORKBOOK_ANALYSIS.md` — woodworm formulas
