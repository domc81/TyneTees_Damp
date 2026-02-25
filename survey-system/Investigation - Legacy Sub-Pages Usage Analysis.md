# Investigation: Legacy Sub-Pages Usage Analysis

**Date:** 2026-02-25
**Scope:** Three sub-pages under `src/app/projects/[projectId]/`
**Purpose:** Determine dependencies before deciding whether to remove or keep
**Action taken:** None — report only

---

## 1. `/projects/[projectId]/costing/page.tsx`

### Inbound References

| Source File | Line | Route Target | Trigger |
|-------------|------|-------------|---------|
| `src/components/structured-survey-form.tsx` | 672 | `/projects/${project.id}/costing` | `router.push()` after clicking "Complete Survey" |

**That's the only reference.** And critically, `structured-survey-form.tsx` is itself orphaned (see Section 3 below) — nothing navigates to the page that would trigger this redirect.

**Commonly confused references that do NOT point here:**
- Project detail page "Open Cost Calculator" button (line 458) → links to `/costing/${projectId}` (a **separate** top-level route at `src/app/costing/[projectId]/page.tsx`)
- Enquiries page "Costing" button (line 222) → links to `/enquiries/${enquiry.id}/costing` (different route)
- Modern wizard "Complete Survey" (line 224) → links to `/survey/${projectId}/costing` (modern route)

### What the Page Does

**Purpose:** A dark-themed costing calculator page with two tabs (Calculator and Summary) that wraps the legacy `PricingCalculator` component.

**Data sources:**
- Supabase via `getProject()` from `supabase-data.ts` — loads the project header
- `initializeSampleData()` — populates demo pricing data on mount
- `PricingCalculator` component — uses legacy static pricing data (not the Supabase-powered pricing engine)

**User actions:**
- Back button → navigates to `/projects/${project.id}`
- Tab switching between Calculator and Summary (local state only)
- Save button within PricingCalculator → calls `saveProjectCosting()`
- Sidebar nav links to global routes (Dashboard, Projects, Costing, Reports, Materials, Team, Settings)

### Modern Equivalent

**Yes — `src/app/survey/[projectId]/costing/page.tsx`**

| Aspect | Legacy (`/projects/.../costing`) | Modern (`/survey/.../costing`) |
|--------|----------------------------------|-------------------------------|
| Pricing method | Manual item selection via PricingCalculator | Auto-calculated from survey wizard room data |
| Data source | Static/sample pricing data | Supabase pricing engine (8 formula types) |
| Survey integration | None | Reads `survey_rooms` + `survey_data` JSONB |
| Forward navigation | Dead-end (back button only) | Links to wizard and report pages |

The modern version is functionally superior — it auto-calculates costs from actual survey data rather than requiring manual item selection.

### Dependency Check

- **No exports** — nothing imports from this file
- **Sole consumer** of `PricingCalculator` component (`src/components/pricing-calculator.tsx`) — if this page is removed, that component also becomes orphaned
- **No shared state** with the project detail page (both load project independently)

### Recommendation: **SAFE TO REMOVE**

The only inbound reference is from another orphaned legacy component. The modern costing page at `/survey/[projectId]/costing/` is the active replacement. Removing this page would also orphan `src/components/pricing-calculator.tsx`.

---

## 2. `/projects/[projectId]/materials/page.tsx`

### Inbound References

| Source File | Line | Route Target | Trigger |
|-------------|------|-------------|---------|
| `src/app/projects/[projectId]/page.tsx` | 642 | `/projects/${projectId}/materials` | "Full List" button in MaterialsTab |
| `src/app/projects/[projectId]/page.tsx` | 679 | `/projects/${projectId}/materials` | "View all N items" link (when >5 materials exist) |

**Two active references**, both from the MaterialsTab section of the project detail page.

### What the Page Does

**Purpose:** Full-page list of project materials grouped by work section, with summary cards showing totals.

**Data sources:**
- **localStorage via `store.ts`** — `getProject()`, `getProjectSections()`, `getProjectItems()` (filters to `category='materials'`)
- **`cost-calculator.ts`** — `formatCurrency()`, `calculateLineItemTotal()`
- Does **not** use Supabase for materials data

**User actions:**
- Back arrow → returns to `/projects/${projectId}`
- Print button → non-functional (defined but no handler)
- Export button → non-functional (defined but no handler)
- "Create Order" button → non-functional (no click handler or href)
- Empty state shows link to `/costing/${projectId}` (the top-level legacy costing page)

### Modern Equivalent

**No direct standalone equivalent.** However:

- The modern costing page (`/survey/[projectId]/costing/`) displays materials as part of line items within costing sections — material costs are included in the auto-calculated breakdown
- The global materials catalogue (`/materials/page.tsx`) shows the Supabase-backed `materials_catalog` reference table
- Neither replaces the per-project material list view exactly, but the modern costing flow makes a separate materials page unnecessary — materials are part of the costing output

### Dependency Check

- **No exports** — nothing imports from this file
- **Shares `store.ts` data functions** with the project detail page's MaterialsTab — both read from the same localStorage-backed store
- **Other files using `store.ts`:** project detail page, dashboard, reports/quotation page, projects list
- **Other files using `cost-calculator.ts`:** project detail page, reports/quotation page, top-level costing page

### Recommendation: **SAFE TO REMOVE**

The page uses legacy localStorage data (not Supabase), has non-functional buttons (Print, Export, Create Order), and serves a view that's subsumed by the modern costing breakdown. The two inbound links from the project detail page's MaterialsTab would need to be removed or redirected — but the MaterialsTab itself also reads from `store.ts` (legacy) and may also be a cleanup candidate.

---

## 3. `/projects/[projectId]/survey/page.tsx`

### Inbound References

**Zero.** No file anywhere in the codebase links to, redirects to, or navigates to `/projects/[projectId]/survey`. This page is completely orphaned.

The project detail page's survey-related navigation all points to the modern wizard:
- Line 266: "Start Survey Wizard" → `/survey/${project.id}/wizard`
- Line 275: "View Costing" → `/survey/${project.id}/costing`
- Line 282: "Generate Report" → `/survey/${project.id}/report`

### What the Page Does

**Purpose:** A thin wrapper (56 lines) that loads a project from Supabase and renders the legacy `StructuredSurveyForm` component.

**Data sources:**
- Supabase via `getSupabaseProject()` — loads project header
- `StructuredSurveyForm` (700 lines) then loads from:
  - Supabase `surveys` table — `survey_data` JSONB (answers, skipped sections, photos)
  - localStorage fallback — `survey-answers-{id}`, `survey-skipped-{id}`, `survey-photos-{id}`

**User actions (within StructuredSurveyForm):**
- 10-section survey form with section navigation grid
- Question types: yes/no, text, number, select, multi-select, rich text
- Photo capture per question
- Auto-save (1-second debounce) to localStorage + Supabase
- "Complete Survey" → `router.push(/projects/${project.id}/costing)` — redirects to legacy costing page (also orphaned)

### Modern Equivalent

**Yes — `src/app/survey/[projectId]/wizard/page.tsx`**

| Aspect | Legacy (`/projects/.../survey`) | Modern (`/survey/.../wizard`) |
|--------|-------------------------------|-------------------------------|
| UX pattern | 10-section collapsible form | 5-step wizard stepper |
| Data model | Flat answers JSONB | Structured `SurveyWizardData` + `survey_rooms` table |
| Room handling | Not room-specific | Room-first: per-room issue multi-select |
| Photo handling | Base64 in answers JSONB | Dedicated `survey-photo-service.ts` |
| Persistence | localStorage + Supabase JSONB | `survey-wizard-data.ts` utilities → Supabase |
| Next step | Legacy costing page | Modern costing page |

The modern wizard is the complete replacement — it's architecturally superior (room-first, structured data, proper photo handling) and is what all navigation currently points to.

### Dependency Check

- **No exports** — nothing imports from this file
- **Sole consumer** of `StructuredSurveyForm` component (`src/components/structured-survey-form.tsx`, 700 lines) — removing this page orphans that component
- `StructuredSurveyForm` is the **sole consumer** of `src/lib/survey-sections.ts` — removing the form orphans that module too
- **No shared state** with the project detail page

### Recommendation: **SAFE TO REMOVE**

Completely orphaned — zero inbound references. The modern wizard at `/survey/[projectId]/wizard/` is the active replacement and is already wired into all navigation. Removing this page would also orphan two additional files:
- `src/components/structured-survey-form.tsx` (700 lines)
- `src/lib/survey-sections.ts`

---

## Summary

| Legacy Page | Inbound Refs | Data Layer | Modern Equivalent | Recommendation |
|------------|-------------|-----------|-------------------|----------------|
| `/projects/[projectId]/costing` | 1 (from orphaned component) | Supabase + legacy PricingCalculator | `/survey/[projectId]/costing` | **SAFE TO REMOVE** |
| `/projects/[projectId]/materials` | 2 (from project detail MaterialsTab) | localStorage via `store.ts` | Subsumed by modern costing | **SAFE TO REMOVE** |
| `/projects/[projectId]/survey` | 0 (completely orphaned) | Supabase + localStorage fallback | `/survey/[projectId]/wizard` | **SAFE TO REMOVE** |

### Additional Files That Would Become Orphaned on Removal

If all three legacy sub-pages are removed, the following files would also have no remaining consumers:

| File | Lines | Currently Used By |
|------|-------|-------------------|
| `src/components/pricing-calculator.tsx` | ~250 | Legacy costing page only |
| `src/components/structured-survey-form.tsx` | ~700 | Legacy survey page only |
| `src/lib/survey-sections.ts` | ~200 | `StructuredSurveyForm` only |

### Remaining Legacy Concerns (Out of Scope)

These items are not part of this investigation but were observed during analysis:

1. **`store.ts` usage** — Still imported by 4 other files (project detail page, dashboard, reports/quotation, projects list). Not safe to remove yet.
2. **`cost-calculator.ts` usage** — Still imported by 3 other files (project detail page, reports/quotation, top-level costing page). Not safe to remove yet.
3. **Top-level `/costing/[projectId]/page.tsx`** — Also uses legacy `cost-calculator.ts` with hardcoded sample data. Not covered in this investigation but appears to be another legacy page.
4. **Project detail page MaterialsTab** — References `store.ts` and links to the legacy materials page. Would need updating if the materials page is removed.
