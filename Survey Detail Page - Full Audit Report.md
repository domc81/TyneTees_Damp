# Survey Detail Page — Full Audit Report

---

## ROUTING

### File Structure

The `/projects/[id]` route lives under:

```
src/app/projects/
├── page.tsx                          (383 lines) — Survey list page
└── [projectId]/
    ├── page.tsx                      (691 lines) — Survey detail page ← THIS IS THE FOCUS
    ├── costing/page.tsx              (256 lines) — Legacy costing calculator
    ├── materials/page.tsx            (226 lines) — Materials list
    └── survey/page.tsx               (56 lines)  — Legacy structured survey form wrapper
```

### Every `/projects` Route Reference in the Codebase

**28 references across 15 files.** Grouped by type:

#### Navigation & Layout (sidebar/header menu items)

| File | Line | Reference |
|------|------|-----------|
| `src/app/page.tsx` | 39 | `{ icon: ClipboardList, label: 'Surveys', href: '/projects' }` |
| `src/components/layout.tsx` | 20 | `{ icon: ClipboardList, label: 'Surveys', href: '/projects' }` |
| `src/app/projects/[projectId]/costing/page.tsx` | 34 | `{ icon: ClipboardList, label: 'Projects', href: '/projects' }` |

#### Link components (navigating to list)

| File | Line | Reference |
|------|------|-----------|
| `src/app/page.tsx` | 283 | `<Link href="/projects">` — Dashboard "View all surveys" |
| `src/app/projects/[projectId]/page.tsx` | 126 | Error fallback link |
| `src/app/projects/[projectId]/page.tsx` | 139 | Error fallback link |
| `src/app/projects/[projectId]/page.tsx` | 168 | Back button |
| `src/app/projects/[projectId]/costing/page.tsx` | 79 | Error fallback link |
| `src/app/projects/[projectId]/materials/page.tsx` | 86 | Error fallback link |
| `src/app/projects/[projectId]/survey/page.tsx` | 46 | Error fallback — uses `<a>` not `<Link>` (anomaly) |
| `src/app/reports/page.tsx` | 21 | Placeholder CTA |
| `src/app/photos/page.tsx` | 21 | Placeholder CTA |
| `src/app/costing/page.tsx` | 21 | Placeholder CTA |
| `src/app/reports/[projectId]/quotation/page.tsx` | 87 | Error fallback |

#### Link components (navigating to detail/sub-pages)

| File | Line | Reference |
|------|------|-----------|
| `src/app/page.tsx` | 313 | `href={/projects/${project.id}}` — Dashboard project card |
| `src/app/projects/page.tsx` | 276 | Project card on list page |
| `src/app/projects/[projectId]/page.tsx` | 642 | Materials button |
| `src/app/projects/[projectId]/page.tsx` | 679 | Materials link |
| `src/app/projects/[projectId]/costing/page.tsx` | 174 | Back to detail |
| `src/app/projects/[projectId]/materials/page.tsx` | 100 | Back to detail |
| `src/app/reports/[projectId]/quotation/page.tsx` | 101 | Back to detail |
| `src/app/survey/[projectId]/wizard/page.tsx` | 348 | Back to detail |
| `src/components/structured-survey-form.tsx` | 320 | Back to detail |

#### router.push() calls

| File | Line | Reference |
|------|------|-----------|
| `src/app/survey/new/page.tsx` | 97 | After survey creation → detail page |
| `src/components/structured-survey-form.tsx` | 672 | After form save → costing page |
| `src/app/survey/[projectId]/costing/page.tsx` | 380 | Button click → back to detail |

#### Active route detection

| File | Line | Reference |
|------|------|-----------|
| `src/app/projects/page.tsx` | 123 | `item.href === '/projects'` |
| `src/app/projects/[projectId]/costing/page.tsx` | 127 | `item.href === '/projects'` |

**No API routes** exist under `/api/projects`. No middleware references `/projects`. No database fields store this path.

---

## STYLING

### Layout Chain Comparison

There is only **one layout file** in the entire app: the root layout at `src/app/layout.tsx`.

```
Root Layout (src/app/layout.tsx)
  ├─ Dashboard (src/app/page.tsx)           ← builds own sidebar + header
  └─ Survey Detail (src/app/projects/[projectId]/page.tsx)  ← builds minimal header only
```

There are **no intermediate layout files** — no `src/app/projects/layout.tsx`, nothing.

### Root Layout provides

- Fonts: Inter + JetBrains Mono as CSS variables
- Body classes: `min-h-screen bg-[#0d1520] text-white antialiased` (dark theme)
- `AuthProvider` context wrapper
- `globals.css` import (Tailwind + custom classes)

### Key Differences

| Aspect | Dashboard | Survey Detail |
|--------|-----------|---------------|
| **Auth protection** | `<ProtectedRoute>` wrapper | **NONE — not protected** |
| **Sidebar** | Full `glass-sidebar` with nav | **None** |
| **Header** | Dark glass, `z-20`, `border-white/10` | White bg, `z-10`, `border-surface-200` |
| **Background** | Dark `bg-[#0d1520]` (inherits root) | **Overrides to light** `bg-surface-50` |
| **Text color** | White (inherits root) | **Overrides to dark** `text-surface-900` |
| **Main wrapper** | `<main>` with `lg:ml-64` | Plain `<div>` |
| **Mobile handling** | Toggleable sidebar + overlay | No mobile adjustments |
| **CSS system** | `.glass-card`, `.glass-sidebar` (dark) | `.section-card` (light) |

There is a reusable `Layout` component at `src/components/layout.tsx` that provides sidebar + header + main wrapper, but **neither page uses it**. Both pages build their own layout inline.

---

## TAB STRUCTURE

The detail page has **5 tabs** defined at `src/app/projects/[projectId]/page.tsx` lines 45-51.

---

### Tab 1: "Details" (icon: User)

**Component:** `DetailsTab` — inline component (lines 360-423)
**Status:** Fully functional, read-only display

**Content:**
- Survey type badge with icon
- Client info card (name, email, phone — from joined customer record)
- Site address card (address, city, county, postcode)
- Survey details card (date, weather, reference)
- Notes card (displays `project.notes`)

**Data:** Uses `project` state loaded at page level. No additional queries.
**Actions:** None (read-only). An "Edit" button exists in the page header but has no handler.

---

### Tab 2: "Overview" (icon: ClipboardList)

**Component:** Inline JSX (lines 237-336)
**Status:** Functional — serves as the navigation hub to the modern survey workflow

**Content:**
- Survey status card: "Survey Complete" or "Survey Not Started"
- Completion badge when wizard is done
- Three action buttons (conditional):
  - **"Start Survey Wizard" / "Edit Survey"** → `/survey/{id}/wizard`
  - **"View Costing"** → `/survey/{id}/costing` (only if wizard complete)
  - **"View/Generate Report"** → `/survey/{id}/report` (only if wizard complete)
- Survey info cards (client, address, type, date, report status)

**Data:** Reads `project.wizard_completed` and queries `survey_reports` table for status.
**Actions:** Navigation links to the modern survey workflow pages.

---

### Tab 3: "Costing" (icon: Calculator)

**Component:** `CostingTab` — inline component (lines 440-526)
**Status:** Uses **legacy store data** (localStorage), not the new pricing engine

**Content:**
- Summary cards: Materials total, Labor total, Grand total
- Section-by-section breakdown with line items
- "Open Cost Calculator" button → `/costing/{id}` (legacy page)

**Data:** Reads from `store.ts` via `getProjectSections()` and `getProjectItems()`. These use **localStorage**, not Supabase. Calculates with legacy `calculateLineItemTotal()`.
**Actions:** Link to legacy cost calculator.

---

### Tab 4: "Materials" (icon: Package)

**Component:** `MaterialsTab` — inline component (lines 625-690)
**Status:** Preview only — shows first 5 materials from legacy store

**Content:**
- Total material cost summary
- Up to 5 materials listed (name, quantity, cost)
- "Full List" button → `/projects/{id}/materials`

**Data:** Filters `allItems` by `category === 'materials'` from legacy store.
**Actions:** Link to full materials page.

---

### Tab 5: "Quote" (icon: FileText)

**Component:** `ReportTab` — inline component (lines 530-622)
**Status:** **Non-functional placeholder** — static preview only

**Content:**
- Mock report cover with branding
- Metadata cards (survey date, report date, ref)
- Placeholder executive summary text
- Quote summary box with totals
- Photo thumbnails (first 4)
- "Preview PDF" and "Download PDF" buttons

**Data:** Uses `project` data and `photos` array. Totals from costing calculation.
**Actions:** Two buttons exist but **both have empty onClick handlers** — they do nothing.

The real, functional report system lives at `/survey/{id}/report` (linked from the Overview tab).

---

## DATA MODEL

### Queries Made by the Detail Page

| Query | Table | Fields | Method |
|-------|-------|--------|--------|
| `getSupabaseProject(id)` | `surveys` + join `customers` | `*` + `customer(id, first_name, last_name, email, phone)` | Client-side Supabase |
| `getSupabaseProjectPhotos(id)` | `photos` | All columns | Client-side Supabase |
| Direct query (line 79-85) | `survey_reports` | `status` only | Client-side Supabase |
| `getProjectSections(id)` | **localStorage** (not DB) | Legacy sections | store.ts |
| `getProjectItems(id)` | **localStorage** (not DB) | Legacy line items | store.ts |

### Projects vs Surveys — Same Table

`projects` was **renamed** to `surveys` in migration `20260218000001_rename_projects_to_surveys.sql`. They are the **same table**. The codebase maintains backward compatibility via:

**Type aliases** in `src/types/database.types.ts`:
```typescript
export type Project = Survey
export type ProjectStatus = SurveyStatus
```

**Function aliases** in `src/lib/supabase-data.ts`:
```typescript
export const getProject = getSurvey
export const getProjects = getSurveys
export const getProjectPhotos = getSurveyPhotos
// ... etc
```

### Bug: `wizard_completed` Column Doesn't Exist

The detail page reads `data.wizard_completed` (line 75), but this column **does not exist** in the database schema. The actual column is `survey_completed` (boolean). The code falls back to `false` via `|| false`, meaning the Overview tab will **never** show the "Survey Complete" state or the costing/report buttons — even for completed surveys.

### Orphaned/Redundant Columns

Several columns exist in the `surveys` table but aren't used on the detail page:
- `reported_problem`, `reported_problem_override` — not displayed
- `completion_pct`, `is_complete` — not read (page uses non-existent `wizard_completed`)
- `office_notes`, `submitted_at` — not displayed
- `surveyor_id` — FK exists but surveyor info not shown

---

## Summary of Critical Issues Found

1. **No auth protection** — The survey detail page lacks `<ProtectedRoute>`, meaning anyone can access `/projects/[id]` without logging in
2. **Bug: wrong column name** — Page reads `wizard_completed` which doesn't exist in the DB; should be `survey_completed`
3. **Two parallel systems** — The Overview tab links to the modern workflow (`/survey/...`) while Costing and Materials tabs use the legacy localStorage-based system
4. **Non-functional Quote tab** — Both PDF buttons have empty handlers; real report is at `/survey/{id}/report`
5. **Visual inconsistency** — Detail page uses a light theme that clashes with the app-wide dark theme
6. **No sidebar navigation** — Unlike every other page, the detail page has no sidebar
7. **One anomalous `<a>` tag** — `src/app/projects/[projectId]/survey/page.tsx` line 46 uses plain HTML instead of Next.js `<Link>`
