# Investigation: Remaining Legacy Dependencies

**Date:** 25 Feb 2026
**Scope:** Full codebase audit of legacy files, pages, types, and components remaining after the sub-page cleanup.

---

## 1. store.ts (localStorage-based store)

**File:** `src/lib/store.ts` (~1,300 lines)
**Purpose:** Client-side localStorage wrapper with CRUD operations, dropdown constants, product catalogue, and sample data initialisation.

### Consumers

| File | Imports | Purpose |
|------|---------|---------|
| `src/app/reports/[projectId]/quotation/page.tsx` | `getProject`, `getProjectSections`, `getProjectItems` | Loads survey, sections, and line items from localStorage to render a quotation document |

**Only 1 file imports from store.ts.** No other `.tsx` page or lib file references it.

### Can the dependency be removed?

| Function | Supabase equivalent? | Notes |
|----------|---------------------|-------|
| `getProject()` | Yes — `getSurvey()` in `supabase-data.ts` | Direct replacement available |
| `getProjectSections()` | Partial — `costing_sections` table exists but has different structure (template-based, not per-survey custom sections) | Need to map from `survey_costing_lines` joined with `costing_sections` |
| `getProjectItems()` | Partial — `survey_costing_lines` + `costing_line_templates` | Different data model: new engine uses formula-driven calculation, not pre-computed values |

### Other exports in store.ts (not imported by any .tsx file)

- `MOISTURE_THRESHOLDS`, `roomTypes`, `floorLevels`, `wallConstructionTypes` — dropdown constants
- `PRODUCT_CATALOG`, `getProductsByCategory()`, `searchProducts()` — static product data
- `validateRoomSurvey()`, `getMoistureStatus()` — validation helpers
- `initializeSampleData()` — localStorage sample data seeder (separate from the Supabase version in supabase-data.ts)
- All room/exterior/photo/enquiry localStorage CRUD functions

None of these are imported by any page. They are fully orphaned.

### Verdict: **SAFE TO REMOVE**

The single consumer (`quotation/page.tsx`) is itself a legacy page (see Section 3). If that page is removed, store.ts has zero active consumers and can be deleted entirely. If the quotation page is retained, it needs migration to Supabase before store.ts can go.

---

## 2. cost-calculator.ts

**File:** `src/lib/cost-calculator.ts` (243 lines)
**Purpose:** Basic material/labour cost calculation with hardcoded `DEFAULT_RATES`. Pure functions, no database access, no imports from store.ts.

### Consumers

| File | Imports | Purpose |
|------|---------|---------|
| `src/app/reports/[projectId]/quotation/page.tsx` | `formatCurrency`, `calculateLineItemTotal` | Format GBP amounts; calculate individual line item cost |
| `src/app/costing/[projectId]/page.tsx` | `formatCurrency`, `calculateLineItemTotal` | Format GBP amounts; calculate demo line item costs |

**Only 2 files import from cost-calculator.ts.** Both are legacy pages.

### Superseded by modern pricing engine?

| Feature | cost-calculator.ts | pricing-engine.ts |
|---------|-------------------|-------------------|
| Formula types | 1 (generic material+labour) | 8 (standard, ceiling_coverage, dpc_injection, compound_material, fixed_price, tiered_disposal, bag_and_cart, skip_hire) |
| Data source | Hardcoded `DEFAULT_RATES` | Supabase `pricing_config` table |
| Material lookup | None | `materials_catalog` table |
| Database integration | None | Full Supabase integration |

Every function in cost-calculator.ts is fully superseded. The only useful utility is `formatCurrency()`, which is trivial to inline or move to a shared utils file.

### Verdict: **SAFE TO REMOVE**

Both consumers are legacy pages (see Sections 3 and 7). Once those pages are removed, cost-calculator.ts has zero consumers.

---

## 3. Top-level costing pages

### `/costing` — `src/app/costing/page.tsx`

**What it does:** Placeholder page with a Calculator icon and text "Project-specific costing is available from the project detail page" with a link to `/surveys`.
**Data sources:** None — no imports from Supabase, store.ts, or cost-calculator.
**Linked from:** Dashboard sidebar (`navItems` array in `src/app/page.tsx`, line 40).
**Modern equivalent:** N/A (it's just a redirect placeholder).

**Verdict: SAFE TO REMOVE** — replace the sidebar link with `/surveys` or remove it entirely.

### `/costing/[projectId]` — `src/app/costing/[projectId]/page.tsx`

**What it does:** Full costing calculator UI with collapsible sections, line items, cost summary sidebar, and "Preview Quote" / "Save" buttons.
**Data sources:** 100% hardcoded sample data (`sampleSections`, `sampleLineItems` defined inline). Imports `formatCurrency` and `calculateLineItemTotal` from cost-calculator.ts. **No Supabase queries.**
**Linked from:** Nothing — no page or navigation in the codebase links to `/costing/[projectId]`. Only reachable by typing the URL manually.
**Buttons:** "Preview Quote" and "Save" have no `onClick` handlers — non-functional.
**Modern equivalent:** `/survey/[projectId]/costing` — the real costing review page powered by the pricing engine + survey-mapping.

**Verdict: SAFE TO REMOVE** — orphaned demo page, completely superseded.

---

## 4. Remaining legacy pages

### `/reports` — `src/app/reports/page.tsx`

**What it does:** Placeholder page — "Project reports are available from the project detail page" with link to `/surveys`.
**Data sources:** None.
**Linked from:** Dashboard sidebar (line 41).

**Verdict: SAFE TO REMOVE** — same treatment as `/costing` placeholder.

### `/reports/[projectId]` — `src/app/reports/[projectId]/page.tsx`

**What it does:** Survey report preview with tabs (Preview, Photos, Findings). Includes condition ratings, recommendations, photo gallery.
**Data sources:** 100% hardcoded sample data — `reportData` object defined inline (lines 26–66). "Mr. and Mrs. Smith", "TT-2026-0001". **No Supabase queries.**
**Buttons:** "Print" and "Export PDF" have no handlers — non-functional.
**Modern equivalent:** `/survey/[projectId]/report` — the working report editor with LLM narrative generation and PDF export.

**Verdict: SAFE TO REMOVE** — orphaned demo page, completely superseded.

### `/reports/[projectId]/quotation` — `src/app/reports/[projectId]/quotation/page.tsx`

**What it does:** Quotation document generation (customer-facing proposal).
**Data sources:** `store.ts` (localStorage) for project/sections/items; `cost-calculator.ts` for calculations and formatting.
**Buttons:** "Print" works (browser print). "PDF" and "Send to Customer" are placeholders (fake `setTimeout` logic).
**Modern equivalent:** No direct equivalent — the report system generates survey reports, not quotation documents. However, quotation generation could be rebuilt on top of the modern costing data.
**Linked from:** Nothing in the current UI navigates here.

**Verdict: NEEDS MIGRATION** — this is the only page with unique functionality (quotation generation) not replicated elsewhere. However, it currently reads from localStorage which has no data in the modern workflow. If quotation generation is needed, it must be rebuilt against Supabase. If not needed for MVP, it can be removed.

### `/photos` — `src/app/photos/page.tsx`

**What it does:** Placeholder page — "Project photos are available from the project detail page" with link to `/surveys`.
**Data sources:** None.
**Linked from:** Dashboard sidebar (line 42).

**Verdict: SAFE TO REMOVE** — placeholder only.

### `/materials` — `src/app/materials/page.tsx`

**What it does:** Materials catalogue with search, category filtering, and unit cost display.
**Data sources:** Supabase — uses `getMaterials()` from `supabase-data.ts`.
**Status:** Fully functional, modern implementation.

**Verdict: KEEP** — working page with real Supabase integration.

### `/admin/pricing-items` — `src/app/admin/pricing-items/page.tsx`

**What it does:** CRUD interface for the old `pricing_items` table (work sections, item types, costs).
**Data sources:** Supabase (`getPricingItems`, `getWorkSections`, `getMarkupConfig`, `getBaseRates` from `supabase-data.ts`), plus `calculateItemCost` from `pricing-database.ts`.
**Legacy dependency:** Imports from `pricing-database.ts` (legacy calculation module, separate from the modern `pricing-engine.ts`).
**Status:** Uses old schema (`pricing_items`, `work_sections`, `base_rates`, `markup_config`) that's been superseded by the new costing engine schema (`costing_sections`, `costing_line_templates`, `pricing_config`).

**Verdict: SAFE TO REMOVE** — legacy admin UI for a schema that is no longer the primary costing engine.

### `/admin/pricing-test` — `src/app/admin/pricing-test/page.tsx`

**What it does:** Test page for the modern pricing engine.
**Data sources:** Supabase via `pricing-data.ts`.
**Status:** Modern, working, uses new schema.

**Verdict: KEEP** — active test/development tool.

---

## 5. Additional legacy library files

### `src/lib/pricing-database.ts`

**Consumers:** Only `src/app/admin/pricing-items/page.tsx` (1 file).
**Purpose:** Calculation functions for the old pricing schema.
**Superseded by:** `pricing-engine.ts` + `pricing-data.ts`.

**Verdict: SAFE TO REMOVE** (once `/admin/pricing-items` page is removed).

### `src/lib/mock-data.ts`

**Consumers:** Zero files import from mock-data.ts.
**Purpose:** Mock/sample data for development. Imports the `Project` type alias from `database.types.ts`.

**Verdict: SAFE TO REMOVE** — completely orphaned.

---

## 6. Type aliases in database.types.ts

### Aliases defined

| Line | Alias | Points to | Status |
|------|-------|-----------|--------|
| 36 | `ProjectStatus` | `SurveyStatus` | `@deprecated` |
| 125 | `Project` | `Survey` | `@deprecated` |
| 283 | `ProjectCosting` | `SurveyCosting` | `@deprecated` |
| 412 | `ProjectInput` | `SurveyInput` | `@deprecated` |
| 414 | `ProjectUpdate` | `SurveyUpdate` | `@deprecated` |

### Usage counts

#### `Project` type alias (7 files still use old name)

| File | Imports `Project` from | Usage |
|------|----------------------|-------|
| `src/app/page.tsx` | `@/lib/supabase-data` | `useState<Project[]>()` |
| `src/app/surveys/page.tsx` | `@/lib/supabase-data` | `useState<Project[]>()` |
| `src/app/surveys/[surveyId]/page.tsx` | `@/types/database.types` | `useState<Project \| null>()` |
| `src/app/survey/new/page.tsx` | `@/types/database.types` | Type annotation for created survey |
| `src/app/reports/[projectId]/quotation/page.tsx` | `@/lib/store` (localStorage type) | Type annotation |
| `src/lib/mock-data.ts` | `@/types/database.types` | Sample data type |
| `src/lib/store.ts` | `@/types/database.types` | localStorage operations |

Files using the new `Survey` name directly: **1 file** — `src/lib/survey-wizard-data.ts`.

#### `ProjectCosting` type alias (1 file uses old name)

| File | Usage |
|------|-------|
| `src/lib/supabase-data.ts` | Re-exports it and uses in function signatures for `getSurveyCosting()` / `saveSurveyCosting()` |

Files using new `SurveyCosting` name: 4 files (`pricing-data.ts`, `survey-mapping.ts`, `pricing-test/page.tsx`, `database.types.ts`).

#### `ProjectStatus`, `ProjectInput`, `ProjectUpdate`

**Zero files** use any of these three aliases. Completely unused.

### Function aliases in supabase-data.ts (8 aliases)

| Old name | Points to | Used by |
|----------|-----------|---------|
| `getProjects` | `getSurveys` | `page.tsx` (dashboard), `surveys/page.tsx` |
| `getProject` | `getSurvey` | `surveys/[surveyId]/page.tsx` (as `getSupabaseProject`) |
| `createProject` | `createSurvey` | Not used by any .tsx |
| `createProjectFromForm` | `createSurveyFromForm` | Not used by any .tsx |
| `updateProject` | `updateSurvey` | Not used by any .tsx |
| `getProjectPhotos` | `getSurveyPhotos` | Not used by any .tsx |
| `getProjectCosting` | `getSurveyCosting` | Not used by any .tsx |
| `saveProjectCosting` | `saveSurveyCosting` | Not used by any .tsx |

Only `getProjects` (2 pages) and `getProject` (1 page) are actively used through the old alias names.

### Verdict: **NEEDS MIGRATION**

- 3 unused type aliases (`ProjectStatus`, `ProjectInput`, `ProjectUpdate`) → **SAFE TO REMOVE** now
- 5 unused function aliases (`createProject`, `createProjectFromForm`, `updateProject`, `getProjectPhotos`, `getProjectCosting`, `saveProjectCosting`) → **SAFE TO REMOVE** now
- `Project` type alias → needs 4–5 active files updated to use `Survey` first (the 2 legacy files — store.ts and mock-data.ts — would be deleted anyway)
- `ProjectCosting` type alias → needs `supabase-data.ts` updated
- `getProjects` function alias → needs dashboard + surveys list updated
- `getProject` function alias → needs survey hub page updated

---

## 7. Layout component

### `src/components/layout.tsx`

**What it provides:**
- Responsive sidebar navigation (collapsible on mobile, fixed on desktop)
- Mobile header with hamburger menu
- Glass-morphism styling (`glass-sidebar`, `glass` classes)
- Navigation items: Dashboard, Surveys, Costing, Reports, Materials, Team, Settings
- Active state highlighting based on `usePathname()`
- Logo, branding, and admin badge footer
- Main content wrapper with consistent padding

### Pages using the shared Layout component

| File | Uses `<Layout>` | Notes |
|------|-----------------|-------|
| `src/app/surveys/[surveyId]/page.tsx` | **Yes** | Survey hub — the only page using shared Layout |

**1 out of ~34 page files uses the shared Layout.**

### Pages with duplicated inline layout

| File | Has inline sidebar/navbar? | Reason |
|------|---------------------------|--------|
| `src/app/page.tsx` (Dashboard) | **Yes** — full sidebar + navbar duplicated inline | Predates the shared component |
| `src/app/surveys/page.tsx` (Surveys list) | **Yes** — full sidebar + navbar duplicated inline | Predates the shared component |

Both pages contain nearly identical code to `components/layout.tsx`: same `navItems` array, same `glass-sidebar` styling, same `sidebarOpen` state, same mobile overlay logic.

### Pages that intentionally don't use Layout

| Category | Pages | Reason |
|----------|-------|--------|
| Auth pages | `login`, `forgot-password`, `update-password` | Full-screen centered forms — no sidebar needed |
| Survey workflow | `survey/[id]/inspection`, `survey/[id]/photos`, `survey/[id]/costing`, `survey/[id]/report` | Sub-pages with back-button navigation, not main nav |
| Admin pages | `admin/*` | Lightweight header only, different layout pattern |
| Detail pages | `customers/[id]`, `team/surveyors/[id]` | Detail views with back navigation |

These pages correctly don't use the full sidebar layout — they're nested views where sidebar navigation would be inappropriate.

### Note on sidebar navigation items

The shared Layout and the inline dashboard/surveys copies all include nav links to `/costing`, `/reports`, and `/photos` — the three placeholder pages identified for removal. These links will need updating when those placeholders are removed.

### Verdict: **NEEDS MIGRATION**

The shared Layout component is well-designed and working. The Dashboard and Surveys List pages should be migrated to use it (removing ~80 lines of duplicated code each). The nav items in Layout need updating when placeholder pages are removed.

---

## Summary table

| Item | File(s) | Verdict |
|------|---------|---------|
| **store.ts** | `src/lib/store.ts` | SAFE TO REMOVE (single consumer is itself legacy) |
| **cost-calculator.ts** | `src/lib/cost-calculator.ts` | SAFE TO REMOVE (both consumers are legacy pages) |
| **pricing-database.ts** | `src/lib/pricing-database.ts` | SAFE TO REMOVE (single consumer is legacy admin page) |
| **mock-data.ts** | `src/lib/mock-data.ts` | SAFE TO REMOVE (zero consumers) |
| `/costing` page | `src/app/costing/page.tsx` | SAFE TO REMOVE (placeholder) |
| `/costing/[projectId]` page | `src/app/costing/[projectId]/page.tsx` | SAFE TO REMOVE (demo with hardcoded data) |
| `/reports` page | `src/app/reports/page.tsx` | SAFE TO REMOVE (placeholder) |
| `/reports/[projectId]` page | `src/app/reports/[projectId]/page.tsx` | SAFE TO REMOVE (demo with hardcoded data) |
| `/reports/[projectId]/quotation` page | `src/app/reports/[projectId]/quotation/page.tsx` | NEEDS MIGRATION (unique quotation functionality, but reads from empty localStorage) |
| `/photos` page | `src/app/photos/page.tsx` | SAFE TO REMOVE (placeholder) |
| `/admin/pricing-items` page | `src/app/admin/pricing-items/page.tsx` | SAFE TO REMOVE (legacy admin UI for superseded schema) |
| Type aliases (unused 3) | `ProjectStatus`, `ProjectInput`, `ProjectUpdate` | SAFE TO REMOVE |
| Type aliases (in use) | `Project`, `ProjectCosting` | NEEDS MIGRATION (4–5 files to update) |
| Function aliases (unused 5) | `createProject`, `createProjectFromForm`, `updateProject`, `getProjectPhotos`, `getProjectCosting/saveProjectCosting` | SAFE TO REMOVE |
| Function aliases (in use) | `getProjects`, `getProject` | NEEDS MIGRATION (3 files to update) |
| Layout component | `src/components/layout.tsx` | KEEP (well-designed; dashboard + surveys list need migration to use it) |
| Layout nav items | sidebar links to `/costing`, `/reports`, `/photos` | NEEDS MIGRATION (update when placeholders are removed) |
| `/materials` page | `src/app/materials/page.tsx` | KEEP (functional, modern) |
| `/admin/pricing-test` page | `src/app/admin/pricing-test/page.tsx` | KEEP (modern test tool) |

---

## Recommended cleanup order

1. **Delete orphaned files** (zero consumers): `mock-data.ts`
2. **Delete placeholder pages**: `/costing/page.tsx`, `/reports/page.tsx`, `/photos/page.tsx`
3. **Delete demo pages**: `/costing/[projectId]/page.tsx`, `/reports/[projectId]/page.tsx`
4. **Delete legacy admin**: `/admin/pricing-items/page.tsx` → then `pricing-database.ts`
5. **Decide on quotation page**: keep/rebuild against Supabase, or remove → then delete `cost-calculator.ts` → then delete `store.ts`
6. **Migrate type/function aliases**: update 4–5 files from `Project` → `Survey`, `getProjects` → `getSurveys`, etc. → then remove aliases from `database.types.ts` and `supabase-data.ts`
7. **Consolidate Layout**: migrate Dashboard and Surveys List to use shared `<Layout>` component; update nav items to remove dead links
8. **Remove unused type aliases**: delete `ProjectStatus`, `ProjectInput`, `ProjectUpdate`, and unused function aliases
