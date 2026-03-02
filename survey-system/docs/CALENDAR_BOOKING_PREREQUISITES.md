# Calendar & Booking Feature — Prerequisites Report

> **Date:** 2026-03-01
> **Purpose:** Investigation of existing codebase state before implementing multi-surveyor calendar, booking, and availability system.
> **Status:** Research only — no changes made.

---

## Table of Contents

1. [Profiles & Roles](#1-profiles--roles)
2. [Survey Creation Flow](#2-survey-creation-flow)
3. [Layout & Navigation](#3-layout--navigation)
4. [Supabase Realtime](#4-supabase-realtime)
5. [Existing Date/Calendar UI & Libraries](#5-existing-datecalendar-ui--libraries)
6. [Full Database Schema](#6-full-database-schema)
7. [Survey Types](#7-survey-types)
8. [Summary & Key Findings for Calendar Design](#8-summary--key-findings-for-calendar-design)

---

## 1. Profiles & Roles

### `user_profiles` table (10 columns)

| Column | Type | Nullable | Notes |
|--------|------|----------|-------|
| `id` | UUID | NO | PK, auto-generated |
| `user_id` | UUID | NO | UNIQUE, FK → `auth.users(id)` ON DELETE CASCADE |
| `role` | `user_role` ENUM | NO | `'admin' \| 'office' \| 'surveyor'` (default: `'surveyor'`) |
| `display_name` | TEXT | NO | |
| `email` | TEXT | NO | UNIQUE |
| `phone` | TEXT | YES | |
| `is_active` | BOOLEAN | NO | Soft-delete flag (default: `true`) |
| `must_change_password` | BOOLEAN | NO | Force change on first login (default: `true`) |
| `created_at` | TIMESTAMPTZ | YES | |
| `updated_at` | TIMESTAMPTZ | YES | Auto-updated via trigger |

**Indexes:**
- `idx_user_profiles_user_id` on `user_id` (BTREE)
- `idx_user_profiles_role` on `role` (BTREE)

### `surveyors` table (legacy, 8 columns)

| Column | Type | Nullable | Notes |
|--------|------|----------|-------|
| `id` | UUID | NO | PK |
| `user_id` | UUID | YES | Optional link to `auth.users` (no FK constraint) |
| `full_name` | TEXT | NO | |
| `email` | TEXT | NO | |
| `phone` | TEXT | YES | |
| `qualifications` | TEXT | YES | |
| `availability` | BOOLEAN | YES | Simple on/off — NOT time-based |
| `created_at` / `updated_at` | TIMESTAMPTZ | YES | |

### How roles are stored and differentiated

- **PostgreSQL ENUM:** `CREATE TYPE user_role AS ENUM ('admin', 'office', 'surveyor')`
- **AuthContext** (`src/context/AuthContext.tsx`) loads the profile on login and exposes boolean flags: `isAdmin`, `isOffice`, `isSurveyor`
- **Frontend access control:** Conditional rendering with `useAuth()` hook (e.g. `if (!isAdmin) return <AccessDenied />`)
- **Server-side access control:** API routes call a `verifyAdmin()` function checking `profile.role === 'admin'`
- **RLS helper functions:** `get_user_role()` and `is_admin()` are defined as `SECURITY DEFINER` functions in the database

### RLS policies on `user_profiles`

| Policy Name | Action | Condition |
|------------|--------|-----------|
| Authenticated users can view profiles | SELECT | Always (`true`) |
| Users can update own profile | UPDATE | `user_id = auth.uid()` — cannot change own role |
| Admins can insert profiles | INSERT | Only when `role = 'admin'` |
| Admins can delete profiles | DELETE | Only when `role = 'admin'` |
| Service role full access | ALL | Always (bypasses RLS) |

### Dual user systems — important for calendar design

There are **two separate user/surveyor tables** that are NOT directly linked:

1. **`user_profiles`** — authentication & roles (linked to `auth.users`)
2. **`surveyors`** — CRM/assignment tracking (legacy, `surveys.surveyor_id` references this table)

The `surveyors` table has an optional `user_id` column but it's not enforced as a FK. A calendar system will need to decide which table represents "a surveyor who can be booked" — likely `user_profiles` where `role = 'surveyor'`, with the legacy `surveyors` table phased out or bridged.

### Role validation patterns

Roles are validated as string literals against a hardcoded array — no TypeScript enum or constants file:

```typescript
if (!['admin', 'office', 'surveyor'].includes(role)) {
  // reject
}
```

### New team member creation flow

1. Admin calls `POST /api/admin/team` with `{ displayName, email, phone, role }`
2. API uses `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS
3. Creates Supabase auth user with temporary password
4. Creates `user_profiles` row with same email, role, display_name
5. Sets `must_change_password = true`
6. Returns temporary password to admin for sharing

---

## 2. Survey Creation Flow

### Step-by-step process

1. **User navigates to** `/survey/new` (`src/app/survey/new/page.tsx`)
2. **Form collects:**
   - Customer (dropdown with "Create New" link → `/customers/new?returnTo=survey-new`)
   - Site address (line 1, line 2, city, county, postcode)
   - Reported defect (textarea)
   - Scheduling notes (textarea)
3. **On submit:** Calls `createSurveyFromForm()` with **hardcoded** `survey_type: 'damp'` and `status: 'draft'`
4. **Redirects to** `/surveys/{surveyId}` — the survey detail/dashboard page
5. **From the detail page**, user clicks "Start Survey" → `/survey/{surveyId}/wizard` (5-step room-first wizard)

### What is NOT collected at creation time

- **No surveyor assignment** — `surveyor_id` stays `null`
- **No scheduled date** — `survey_date` stays `null`
- **No survey type selection** — hardcoded to `'damp'`

### `surveys` table — complete schema (26 columns)

| Column | Type | Nullable | Notes |
|--------|------|----------|-------|
| `id` | UUID | NO | PK |
| `enquiry_id` | UUID | YES | FK → `enquiries` |
| `project_number` | TEXT | NO | UNIQUE, auto-generated `TT-{YYYY}-{NNNN}` |
| `survey_type` | ENUM | NO | See Section 7 for all values |
| `status` | ENUM | NO | `draft \| in_progress \| pending_review \| completed \| archived` |
| `survey_date` | DATE | YES | **Exists but not populated by creation form** |
| `weather_conditions` | TEXT | YES | |
| `surveyor_id` | UUID | YES | **FK → `surveyors(id)` — exists but not set at creation** |
| `customer_id` | UUID | YES | FK → `customers` |
| `client_name` | TEXT | YES | Denormalised from customer record |
| `site_address` | TEXT | NO | |
| `site_address_line2` | TEXT | YES | |
| `site_city` | VARCHAR(100) | YES | |
| `site_county` | VARCHAR(100) | YES | |
| `site_postcode` | TEXT | NO | |
| `notes` | TEXT | YES | General/scheduling notes |
| `reported_problem` | TEXT | YES | Customer's initial complaint |
| `reported_problem_override` | TEXT | YES | Office override |
| `survey_data` | JSONB | YES | Wizard answers (keyed by section) |
| `survey_skipped_sections` | TEXT[] | YES | |
| `survey_progress` | INTEGER | YES | 0–100% |
| `survey_completed` | BOOLEAN | YES | |
| `completion_pct` | INTEGER | YES | Legacy duplicate of `survey_progress` |
| `is_complete` | BOOLEAN | YES | Legacy duplicate of `survey_completed` |
| `submitted_at` | TIMESTAMPTZ | YES | When survey was marked complete |
| `office_notes` | TEXT | YES | Internal office notes |
| `created_at` | TIMESTAMPTZ | NO | |
| `updated_at` | TIMESTAMPTZ | NO | Auto-updated via trigger |

**Foreign Keys:**
- `customer_id` → `customers(id)` ON DELETE SET NULL
- `enquiry_id` → `enquiries(id)` ON DELETE SET NULL
- `surveyor_id` → `surveyors(id)` ON DELETE SET NULL

**Key observation:** `surveyor_id` and `survey_date` already exist on the surveys table. The calendar/booking feature does not need a schema change to assign a surveyor or set a date — it needs to **populate these fields** during a new booking step in the creation flow.

### Data layer functions

Located in `src/lib/supabase-data.ts`:
- `createSurveyFromForm()` — used by `/survey/new`
- `getSurveys()` — list with filtering
- `getSurvey(id)` — single survey detail
- `updateSurvey(id, data)` — partial update (could be used to set `surveyor_id` and `survey_date`)

### Survey detail page actions

From `/surveys/{surveyId}` (`src/app/surveys/[surveyId]/page.tsx`):
- "Start Survey" → `/survey/{surveyId}/wizard`
- "View Costing" → `/survey/{surveyId}/costing` (if complete)
- "Generate Report" → `/survey/{surveyId}/report` (if complete)
- "Installer Info" → `/survey/{surveyId}/installer-info` (if complete)

---

## 3. Layout & Navigation

### Sidebar component

**File:** `src/components/layout.tsx`

**Current navigation items (hardcoded array):**

| # | Label | Route | Icon (lucide-react) |
|---|-------|-------|---------------------|
| 1 | Dashboard | `/` | `LayoutDashboard` |
| 2 | Surveys | `/surveys` | `ClipboardList` |
| 3 | Materials | `/materials` | `Package` |
| 4 | Team | `/admin/team` | `Users` |
| 5 | Settings | `/settings` | `Settings` |

No "Calendar" or "Bookings" item yet — this would be a new nav entry.

### Layout structure

```
<div min-h-screen>
  ├── Sidebar (fixed left, w-64, glass morphism dark theme)
  │   ├── Company logo / initials (p-6, top)
  │   ├── Nav items (flex-1, space-y-1, middle)
  │   │   └── 5 nav links with lucide-react icons
  │   └── Footer (p-4, bottom)
  │       └── Company name + Sign out button
  │
  └── Main content wrapper (lg:ml-64)
      ├── Mobile header (lg:hidden, sticky top)
      │   └── Hamburger menu | CompanyLogo | [empty <div w-10 />]
      └── <main> (p-4 lg:p-8)
          └── Page content
```

### Space for notifications

- **Mobile:** The right side of the sticky header has an empty `<div className="w-10" />` — ready-made slot for a notification bell
- **Desktop:** No traditional header bar at desktop — the top-right corner of `<main>` is free for a notification dropdown
- **Settings page** already references a future `/settings/notifications` route with a Bell icon (page not yet built)

### Page wrapper pattern (every authenticated page)

```tsx
'use client'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'

export default function SomePage() {
  return (
    <ProtectedRoute>
      <Layout>
        {/* Page content */}
      </Layout>
    </ProtectedRoute>
  )
}
```

**ProtectedRoute** (`src/components/ProtectedRoute.tsx`):
- Redirects unauthenticated users to `/login`
- Redirects users who must change password to `/change-password`
- Shows spinner while checking auth state

Any changes to `Layout` automatically apply to all authenticated pages.

### Styling conventions

- `.glass-card`, `.section-card` — card containers
- `.btn-primary`, `.btn-secondary`, `.btn-ghost` — buttons
- `.input-field`, `.input-select` — form controls
- `.nav-item` — navigation link styling
- Active nav shows `bg-brand-500/20 text-brand-300`

---

## 4. Supabase Realtime

### Current status: NOT used anywhere

- No `.channel()`, `.on()`, `.subscribe()`, or `RealtimeChannel` patterns exist in the codebase
- All data fetching is standard request-response via Supabase `.from().select()`
- No existing subscription patterns or realtime channel setups to follow

### Supabase client setup

- **Browser client:** `src/lib/supabase-client.ts` — standard `createBrowserClient()` with auth
- **Server client:** `src/lib/supabase-server.ts` — uses cookies for server-side auth

### Implications

A calendar feature with live updates (e.g. "surveyor X just got booked") would be the **first** use of Realtime in this app. There are no constraints on approach — clean slate.

---

## 5. Existing Date/Calendar UI & Libraries

### Currently installed dependencies

| Library | Version | Status |
|---------|---------|--------|
| `date-fns` | ^3.6.0 | **Installed but zero imports** in the codebase |

### NOT installed

- `react-datepicker`
- `react-calendar`
- `@fullcalendar/react` / `fullcalendar`
- `react-big-calendar`
- `dayjs`
- `moment`

### Current date inputs in the app

Only two places use date inputs, both with native HTML `<input type="date" />`:

1. **New Enquiry form** (`src/app/enquiries/new/page.tsx`) — "Proposed Survey Date" field
2. **Wizard Site Details step** (`src/components/wizard/SiteDetailsStep.tsx`) — "Inspection Date" field

No custom calendar component, date picker library, or scheduling UI exists anywhere.

### Surveyor availability model

The `surveyors.availability` column is a simple `BOOLEAN` (available / unavailable). No time-slot, date-range, or calendar-based availability tracking exists. Displayed as a badge in `/team/surveyors/page.tsx`.

### All dependencies (package.json)

```json
{
  "dependencies": {
    "@hookform/resolvers": "^3.3.0",
    "@react-pdf/renderer": "^4.3.2",
    "@supabase/ssr": "^0.5.2",
    "@supabase/supabase-js": "^2.39.0",
    "date-fns": "^3.6.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.460.0",
    "next": "14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.51.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "supabase": "^1.145.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0"
  }
}
```

---

## 6. Full Database Schema

All **34 public tables**, queried directly from Supabase.

### CRM Tables

#### `customers` (14 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `first_name` | TEXT | NO |
| `last_name` | TEXT | NO |
| `email` | TEXT | NO |
| `phone` | TEXT | NO |
| `mobile` | TEXT | YES |
| `address_line1` | TEXT | NO |
| `address_line2` | TEXT | YES |
| `city` | TEXT | NO |
| `county` | TEXT | YES |
| `postcode` | TEXT | NO |
| `title` | VARCHAR | YES |
| `notes` | TEXT | YES |
| `created_at` | TIMESTAMPTZ | YES |
| `updated_at` | TIMESTAMPTZ | YES |

#### `enquiries` (19 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `enquiry_number` | TEXT | NO |
| `internal_reference` | TEXT | YES |
| `client_name` | TEXT | NO |
| `client_email` | TEXT | YES |
| `client_phone` | TEXT | YES |
| `site_address_1` | TEXT | NO |
| `site_address_2` | TEXT | YES |
| `site_city` | TEXT | NO |
| `site_county` | TEXT | YES |
| `site_postcode` | TEXT | NO |
| `survey_type` | ENUM (`survey_type`) | NO |
| `status` | ENUM (`enquiry_status`) | NO |
| `source` | TEXT | YES |
| `enquiry_date` | DATE | NO |
| `proposed_survey_date` | DATE | YES |
| `notes` | TEXT | YES |
| `reported_problem` | TEXT | YES |
| `distance_miles` | NUMERIC | YES |
| `created_at` | TIMESTAMPTZ | NO |
| `updated_at` | TIMESTAMPTZ | NO |

#### `surveyors` (8 columns)

See [Section 1](#surveyors-table-legacy-8-columns).

#### `user_profiles` (10 columns)

See [Section 1](#user_profiles-table-10-columns).

#### `company_profile` (21 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `is_singleton` | BOOLEAN | NO |
| `name` | TEXT | NO |
| `trading_name` | TEXT | YES |
| `established_year` | INTEGER | YES |
| `registered_address_line1` | TEXT | YES |
| `registered_address_line2` | TEXT | YES |
| `registered_address_city` | TEXT | YES |
| `registered_address_county` | TEXT | YES |
| `registered_address_postcode` | TEXT | YES |
| `phone_primary` | TEXT | YES |
| `phone_secondary` | TEXT | YES |
| `email_primary` | TEXT | YES |
| `email_secondary` | TEXT | YES |
| `website` | TEXT | YES |
| `logo_url` | TEXT | YES |
| `about_us_text` | TEXT | YES |
| `terms_and_conditions` | TEXT | YES |
| `default_deposit_note` | TEXT | YES |
| `guarantee_years` | INTEGER | YES |
| `guarantee_scheme_name` | TEXT | YES |
| `company_registration_number` | TEXT | YES |
| `vat_number` | TEXT | YES |
| `created_at` | TIMESTAMPTZ | NO |
| `updated_at` | TIMESTAMPTZ | NO |

### Survey Tables

#### `surveys` (26 columns)

See [Section 2](#surveys-table--complete-schema-26-columns).

#### `survey_rooms` (17 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `survey_id` | UUID | NO |
| `name` | TEXT | NO |
| `room_type` | TEXT | NO |
| `floor_level` | TEXT | NO |
| `display_order` | INTEGER | NO |
| `wall_type` | TEXT | YES |
| `plaster_type` | TEXT | YES |
| `floor_type` | TEXT | YES |
| `findings` | TEXT | YES |
| `recommendations` | TEXT | YES |
| `surveyor_notes` | TEXT | YES |
| `is_completed` | BOOLEAN | NO |
| `completed_at` | TIMESTAMPTZ | YES |
| `issues_identified` | TEXT[] | YES |
| `room_data` | JSONB | YES |
| `created_at` | TIMESTAMPTZ | NO |
| `updated_at` | TIMESTAMPTZ | NO |

### Survey Type Extension Tables

#### `survey_damp_report` (16 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `survey_id` | UUID | NO (PK) |
| `existing_dpc_found` | BOOLEAN | YES |
| `existing_dpc_type` | TEXT | YES |
| `ground_level_issue` | BOOLEAN | YES |
| `ground_level_details` | TEXT | YES |
| `internal_tanking_observed` | BOOLEAN | YES |
| `solid_floor_type` | TEXT | YES |
| `solid_floor_membrane_found` | BOOLEAN | YES |
| `wall_ties_issue` | BOOLEAN | YES |
| `wall_ties_details` | TEXT | YES |
| `drain_issue` | BOOLEAN | YES |
| `drain_details` | TEXT | YES |
| `external_aquaban_required` | BOOLEAN | YES |
| `digital_dpc_offered` | BOOLEAN | YES |
| `digital_dpc_type` | TEXT | YES |
| `digital_dpc_radius` | NUMERIC | YES |
| `created_at` | TIMESTAMPTZ | YES |
| `updated_at` | TIMESTAMPTZ | YES |

#### `survey_damp_wall_readings` (9 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `survey_id` | UUID | NO |
| `wall_location` | TEXT | NO |
| `room_name` | TEXT | YES |
| `reading_value` | NUMERIC | YES |
| `reading_unit` | TEXT | YES |
| `height_mm` | INTEGER | YES |
| `notes` | TEXT | YES |
| `display_order` | INTEGER | YES |
| `created_at` | TIMESTAMPTZ | YES |

#### `survey_condensation_report` (10 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `survey_id` | UUID | NO (PK) |
| `condensation_on_windows` | BOOLEAN | YES |
| `low_temp_dew_points` | BOOLEAN | YES |
| `black_spot_mould` | BOOLEAN | YES |
| `lack_of_ventilation` | BOOLEAN | YES |
| `piv_recommended` | BOOLEAN | YES |
| `piv_type` | TEXT | YES |
| `trickle_vents_adequate` | BOOLEAN | YES |
| `airbricks_adequate` | BOOLEAN | YES |
| `created_at` | TIMESTAMPTZ | YES |
| `updated_at` | TIMESTAMPTZ | YES |

#### `survey_condensation_rooms` (9 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `survey_id` | UUID | NO |
| `room_name` | TEXT | NO |
| `has_mould` | BOOLEAN | YES |
| `mould_severity` | TEXT | YES |
| `has_condensation` | BOOLEAN | YES |
| `ventilation_notes` | TEXT | YES |
| `detailed_findings` | JSONB | YES |
| `display_order` | INTEGER | YES |
| `created_at` | TIMESTAMPTZ | YES |

#### `survey_timber_report` (4 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `survey_id` | UUID | NO (PK) |
| `non_guaranteed_work_note` | BOOLEAN | YES |
| `party_wall_letter_required` | BOOLEAN | YES |
| `created_at` | TIMESTAMPTZ | YES |
| `updated_at` | TIMESTAMPTZ | YES |

#### `survey_timber_rooms` (21 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `survey_id` | UUID | NO |
| `room_number` | INTEGER | NO |
| `room_name` | TEXT | YES |
| `is_visible` | BOOLEAN | YES |
| `floor_type` | TEXT | YES |
| `floor_condition` | TEXT | YES |
| `joist_accessible` | BOOLEAN | YES |
| `joist_condition` | TEXT | YES |
| `joist_moisture_reading` | NUMERIC | YES |
| `fungal_attack_found` | BOOLEAN | YES |
| `fungal_type` | TEXT | YES |
| `fungal_details` | TEXT | YES |
| `insect_attack_found` | BOOLEAN | YES |
| `insect_type` | TEXT | YES |
| `insect_status` | TEXT | YES |
| `insect_details` | TEXT | YES |
| `treatment_required` | BOOLEAN | YES |
| `treatment_notes` | TEXT | YES |
| `detailed_findings` | JSONB | YES |
| `display_order` | INTEGER | YES |
| `created_at` | TIMESTAMPTZ | YES |
| `updated_at` | TIMESTAMPTZ | YES |

#### `survey_woodworm_report` (10 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `survey_id` | UUID | NO (PK) |
| `infestation_status` | TEXT | NO |
| `beetle_species` | TEXT | YES |
| `ground_floor_affected` | BOOLEAN | YES |
| `first_floor_affected` | BOOLEAN | YES |
| `loft_affected` | BOOLEAN | YES |
| `ground_floor_rooms` | TEXT | YES |
| `first_floor_rooms` | TEXT | YES |
| `loft_details` | TEXT | YES |
| `created_at` | TIMESTAMPTZ | YES |
| `updated_at` | TIMESTAMPTZ | YES |

#### `survey_images` (7 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `survey_id` | UUID | NO |
| `section_key` | TEXT | NO |
| `image_url` | TEXT | NO |
| `description` | TEXT | YES |
| `display_order` | INTEGER | YES |
| `created_at` | TIMESTAMPTZ | YES |

### Costing Engine Tables

#### `costing_sections` (6 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `survey_type` | ENUM | NO |
| `section_key` | TEXT | NO |
| `section_name` | TEXT | NO |
| `display_order` | INTEGER | NO |
| `is_optional` | BOOLEAN | YES |

#### `costing_line_templates` (16 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `section_id` | UUID | NO |
| `line_key` | TEXT | NO |
| `description` | TEXT | NO |
| `uom` | ENUM | NO |
| `base_unit_cost` | NUMERIC | YES |
| `wastage_factor` | NUMERIC | YES |
| `coverage_rate` | NUMERIC | YES |
| `material_markup` | NUMERIC | YES |
| `labour_rate_per_unit` | NUMERIC | YES |
| `labour_markup` | NUMERIC | YES |
| `cost_formula` | ENUM | NO |
| `formula_params` | JSONB | YES |
| `product_url` | TEXT | YES |
| `display_order` | INTEGER | NO |
| `is_active` | BOOLEAN | YES |

#### `pricing_config` (6 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `config_key` | TEXT | NO |
| `config_value` | NUMERIC | NO |
| `description` | TEXT | YES |
| `effective_from` | DATE | NO |
| `updated_at` | TIMESTAMPTZ | YES |

#### `materials_catalog` (13 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | TEXT | NO |
| `name` | TEXT | NO |
| `supplier` | TEXT | YES |
| `supplier_url` | TEXT | YES |
| `unit_cost` | NUMERIC | NO |
| `unit` | TEXT | YES |
| `coverage` | TEXT | YES |
| `category` | TEXT | NO |
| `default_quantity` | INTEGER | NO |
| `is_active` | BOOLEAN | NO |
| `product_key` | TEXT | YES |
| `coverage_m2` | NUMERIC | YES |
| `unit_size` | TEXT | YES |
| `created_at` | TIMESTAMPTZ | NO |
| `updated_at` | TIMESTAMPTZ | NO |

#### `survey_costing_lines` (16 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `survey_id` | UUID | NO |
| `template_id` | UUID | NO |
| `input_quantity` | NUMERIC | YES |
| `input_dimension` | NUMERIC | YES |
| `calculated_area` | NUMERIC | YES |
| `material_unit_cost` | NUMERIC | YES |
| `material_adjusted_cost` | NUMERIC | YES |
| `material_total` | NUMERIC | YES |
| `labour_hours` | NUMERIC | YES |
| `labour_total` | NUMERIC | YES |
| `line_total` | NUMERIC | YES |
| `contractor_mat_cost` | NUMERIC | YES |
| `contractor_lab_cost` | NUMERIC | YES |
| `material_markup_override` | NUMERIC | YES |
| `labour_markup_override` | NUMERIC | YES |
| `created_at` | TIMESTAMPTZ | YES |
| `updated_at` | TIMESTAMPTZ | YES |

#### `costing_section_adjustments` (5 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `survey_id` | UUID | NO |
| `section_id` | UUID | NO |
| `adjustment_pct` | NUMERIC | YES |
| `is_included` | BOOLEAN | NO |

### Survey Output Tables

#### `survey_customer_summary` (9 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `survey_id` | UUID | NO |
| `section_key` | TEXT | NO |
| `section_name` | TEXT | NO |
| `material_total` | NUMERIC | YES |
| `labour_total` | NUMERIC | YES |
| `section_total` | NUMERIC | YES |
| `is_optional` | BOOLEAN | YES |
| `display_order` | INTEGER | YES |

#### `survey_overheads` (8 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `survey_id` | UUID | NO |
| `overhead_type` | TEXT | NO |
| `description` | TEXT | YES |
| `quantity` | NUMERIC | YES |
| `unit_cost` | NUMERIC | YES |
| `total_cost` | NUMERIC | YES |
| `display_order` | INTEGER | YES |
| `created_at` | TIMESTAMPTZ | YES |

#### `survey_caf1` (14 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `survey_id` | UUID | NO |
| `subtotal_ex_vat` | NUMERIC | YES |
| `vat_amount` | NUMERIC | YES |
| `total_inc_vat` | NUMERIC | YES |
| `deposit_pct` | NUMERIC | YES |
| `deposit_ex_vat` | NUMERIC | YES |
| `deposit_inc_vat` | NUMERIC | YES |
| `payment_method` | TEXT | YES |
| `signed` | BOOLEAN | YES |
| `signed_at` | TIMESTAMPTZ | YES |
| `signatory_name` | TEXT | YES |
| `waive_cooling_off` | BOOLEAN | YES |
| `notes` | TEXT | YES |
| `created_at` | TIMESTAMPTZ | YES |
| `updated_at` | TIMESTAMPTZ | YES |

#### `survey_subcontractor_costs` (11 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `survey_id` | UUID | NO |
| `section_key` | TEXT | NO |
| `section_name` | TEXT | YES |
| `contractor_mat_cost` | NUMERIC | YES |
| `contractor_lab_cost` | NUMERIC | YES |
| `contractor_total` | NUMERIC | YES |
| `projected_hours` | NUMERIC | YES |
| `assigned_to` | TEXT | YES |
| `notes` | TEXT | YES |
| `display_order` | INTEGER | YES |
| `created_at` | TIMESTAMPTZ | YES |

#### `survey_installer_info` (7 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `survey_id` | UUID | NO |
| `site_info` | JSONB | NO |
| `categories_applicable` | TEXT[] | NO |
| `completed` | BOOLEAN | NO |
| `notes` | TEXT | YES |
| `created_at` | TIMESTAMPTZ | NO |
| `updated_at` | TIMESTAMPTZ | NO |

### Report & Quotation Tables

#### `report_templates` (9 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `name` | TEXT | NO |
| `survey_type` | TEXT | NO |
| `version` | INTEGER | YES |
| `sections` | JSONB | NO |
| `settings` | JSONB | NO |
| `is_default` | BOOLEAN | YES |
| `created_at` | TIMESTAMPTZ | YES |
| `updated_at` | TIMESTAMPTZ | YES |

#### `survey_reports` (11 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `survey_id` | UUID | NO |
| `template_id` | UUID | NO |
| `status` | TEXT | NO |
| `sections` | JSONB | NO |
| `generated_at` | TIMESTAMPTZ | YES |
| `reviewed_by` | TEXT | YES |
| `finalised_at` | TIMESTAMPTZ | YES |
| `publish_token` | TEXT | YES |
| `published_at` | TIMESTAMPTZ | YES |
| `created_at` | TIMESTAMPTZ | YES |
| `updated_at` | TIMESTAMPTZ | YES |

#### `quotations` (27 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `survey_id` | UUID | NO |
| `version` | INTEGER | NO |
| `quotation_number` | TEXT | NO |
| `share_token` | UUID | NO |
| `status` | TEXT | NO |
| `subtotal_mandatory` | NUMERIC | NO |
| `subtotal_optional` | NUMERIC | NO |
| `subtotal_combined` | NUMERIC | NO |
| `pso_total` | NUMERIC | NO |
| `vat_rate` | NUMERIC | NO |
| `vat_amount` | NUMERIC | NO |
| `total_incl_vat` | NUMERIC | NO |
| `deposit_percentage` | NUMERIC | NO |
| `deposit_amount` | NUMERIC | NO |
| `validity_days` | INTEGER | NO |
| `valid_until` | DATE | NO |
| `notes` | TEXT | YES |
| `terms` | TEXT | YES |
| `customer_name` | TEXT | YES |
| `customer_address` | TEXT | YES |
| `site_address` | TEXT | YES |
| `surveyor_name` | TEXT | YES |
| `surveyor_qualifications` | TEXT | YES |
| `company_name` | TEXT | YES |
| `company_phone` | TEXT | YES |
| `company_email` | TEXT | YES |
| `first_viewed_at` | TIMESTAMPTZ | YES |
| `last_viewed_at` | TIMESTAMPTZ | YES |
| `view_count` | INTEGER | NO |
| `sent_at` | TIMESTAMPTZ | YES |
| `accepted_at` | TIMESTAMPTZ | YES |
| `declined_at` | TIMESTAMPTZ | YES |
| `created_at` | TIMESTAMPTZ | NO |
| `updated_at` | TIMESTAMPTZ | NO |

#### `quotation_sections` (11 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `quotation_id` | UUID | NO |
| `survey_type` | TEXT | NO |
| `section_key` | TEXT | NO |
| `display_name` | TEXT | NO |
| `display_order` | INTEGER | NO |
| `material_total` | NUMERIC | NO |
| `labour_total` | NUMERIC | NO |
| `section_total` | NUMERIC | NO |
| `is_optional` | BOOLEAN | NO |
| `is_included` | BOOLEAN | NO |
| `created_at` | TIMESTAMPTZ | NO |

#### `quotation_views` (7 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `quotation_id` | UUID | NO |
| `viewed_at` | TIMESTAMPTZ | NO |
| `ip_address` | INET | YES |
| `user_agent` | TEXT | YES |
| `duration_seconds` | INTEGER | YES |
| `referrer` | TEXT | YES |

### Legacy Tables (still in DB, not actively used)

#### `base_rates` (7 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | TEXT | NO |
| `category` | TEXT | NO |
| `rate_name` | TEXT | NO |
| `rate_value` | NUMERIC | NO |
| `description` | TEXT | YES |
| `created_at` | TIMESTAMPTZ | NO |
| `updated_at` | TIMESTAMPTZ | NO |

#### `markup_config` (6 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | TEXT | NO |
| `item_type` | ENUM | NO |
| `percentage` | NUMERIC | NO |
| `name` | TEXT | NO |
| `created_at` | TIMESTAMPTZ | NO |
| `updated_at` | TIMESTAMPTZ | NO |

#### `pricing_items` (12 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | TEXT | NO |
| `section_id` | TEXT | NO |
| `name` | TEXT | NO |
| `unit` | TEXT | NO |
| `material_cost` | NUMERIC | NO |
| `labor_hours` | NUMERIC | NO |
| `item_type` | ENUM | NO |
| `is_mandatory` | BOOLEAN | NO |
| `markup_override` | NUMERIC | YES |
| `contractor_cost` | NUMERIC | YES |
| `created_at` | TIMESTAMPTZ | NO |
| `updated_at` | TIMESTAMPTZ | NO |

#### `work_sections` (7 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | TEXT | NO |
| `name` | TEXT | NO |
| `description` | TEXT | YES |
| `is_optional` | BOOLEAN | NO |
| `display_order` | INTEGER | NO |
| `created_at` | TIMESTAMPTZ | NO |
| `updated_at` | TIMESTAMPTZ | NO |

#### `project_costing` (16 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `project_id` | UUID | NO |
| `selected_items` | JSONB | NO |
| `selected_optional_items` | TEXT[] | NO |
| `travel_miles` | INTEGER | NO |
| `notes` | TEXT | YES |
| `material_subtotal` | NUMERIC | NO |
| `labor_subtotal` | NUMERIC | NO |
| `optional_extras` | NUMERIC | NO |
| `travel_cost` | NUMERIC | NO |
| `subtotal` | NUMERIC | NO |
| `vat_amount` | NUMERIC | NO |
| `total_inc_vat` | NUMERIC | NO |
| `deposit_amount` | NUMERIC | NO |
| `created_at` | TIMESTAMPTZ | NO |
| `updated_at` | TIMESTAMPTZ | NO |

#### `defects` (9 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `room_id` | UUID | NO |
| `defect_type` | TEXT | NO |
| `severity` | ENUM | NO |
| `location` | TEXT | NO |
| `description` | TEXT | YES |
| `photo_id` | UUID | YES |
| `recommendation` | TEXT | YES |
| `created_at` | TIMESTAMPTZ | NO |

#### `moisture_readings` (8 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `room_id` | UUID | NO |
| `location` | TEXT | NO |
| `reading` | NUMERIC | NO |
| `unit` | TEXT | NO |
| `material` | TEXT | YES |
| `notes` | TEXT | YES |
| `timestamp` | TIMESTAMPTZ | NO |

#### `photos` (12 columns)

| Column | Type | Nullable |
|--------|------|----------|
| `id` | UUID | NO |
| `project_id` | UUID | NO |
| `room_id` | UUID | YES |
| `file_path` | TEXT | YES |
| `file_name` | TEXT | NO |
| `category` | TEXT | NO |
| `description` | TEXT | YES |
| `question_id` | TEXT | YES |
| `storage_path` | TEXT | YES |
| `file_size` | INTEGER | YES |
| `mime_type` | TEXT | YES |
| `photo_category` | TEXT | YES |
| `taken_at` | TIMESTAMPTZ | YES |
| `uploaded_by` | TEXT | YES |
| `created_at` | TIMESTAMPTZ | NO |

---

## 7. Survey Types

### All defined types (7 total)

| Type | Status | Has Costing Sections | Has Report Template | UI Config (icon/color) |
|------|--------|---------------------|---------------------|------------------------|
| `damp` | Active | Yes | Yes | Droplets / blue |
| `timber` | Active | Yes | Yes | Bug / amber |
| `woodworm` | Active | Yes | Yes | Bug / amber-dark |
| `condensation` | Active | Yes | Yes | Wind / cyan |
| `structural` | Defined in ENUM | No | No | **Missing from UI** |
| `comprehensive` | Defined in ENUM | No | No | **Missing from UI** |
| `site_preparation` | Added later | Yes (mapping exists) | No | **Missing from UI** |

### PostgreSQL ENUM definition

```sql
CREATE TYPE public.survey_type AS ENUM (
    'damp', 'timber', 'woodworm', 'condensation', 'structural', 'comprehensive'
);
-- Later migration added:
ALTER TYPE survey_type ADD VALUE IF NOT EXISTS 'site_preparation';
```

### How types are handled in the creation flow

1. **Enquiry creation** (`/enquiries/new`): User selects from a dropdown of 6 types (excludes `site_preparation`)
2. **Survey creation** (`/survey/new`): **Hardcoded to `'damp'`** — no type selection UI
3. **Survey wizard:** Type determines which issue-specific fields appear in room inspection
4. **Costing:** Templates loaded per `survey_type` via `costing_sections.survey_type`
5. **Reports:** Template selected by `report_templates.survey_type`

### UI type configuration (dashboard & list)

```typescript
const surveyTypeConfig = {
  damp:         { icon: Droplets, color: 'text-blue-600',    label: 'Damp Survey' },
  timber:       { icon: Bug,      color: 'text-amber-600',   label: 'Timber Survey' },
  woodworm:     { icon: Bug,      color: 'text-amber-700',   label: 'Woodworm Survey' },
  condensation: { icon: Wind,     color: 'text-cyan-600',    label: 'Condensation Survey' },
  // structural, comprehensive, site_preparation — NOT configured
}
```

### Implication for calendar

Booking a survey slot should work **regardless of survey type** — the type affects what happens during the survey, not when it's scheduled. The calendar feature should also collect survey type during booking (unlike the current creation form which hardcodes it to `'damp'`).

---

## 8. Summary & Key Findings for Calendar Design

### Quick-reference decision table

| Question | Answer |
|----------|--------|
| Can we assign surveyors to surveys? | **Yes** — `surveys.surveyor_id` FK exists, just not populated by UI |
| Can we store a survey date? | **Yes** — `surveys.survey_date` DATE column exists, not populated by UI |
| Do we need new tables? | **Yes** — surveyor availability/time slots, possibly booking slots |
| Which table represents bookable surveyors? | Ambiguous — `surveyors` (legacy) vs `user_profiles` where `role='surveyor'` |
| Is Supabase Realtime available? | Available but **never used** — clean slate |
| Calendar library needed? | **Yes** — `date-fns` is installed but no calendar UI library exists |
| Where does booking fit in creation flow? | After customer/address selection, before redirect to detail page |
| Does survey type affect booking? | No — booking is type-agnostic, but the creation form should also collect type |
| Notification infrastructure? | None — mobile header has empty slot; settings page references future notifications route |

### Existing infrastructure we can build on

1. `surveys.surveyor_id` — already an FK to `surveyors`, just needs populating
2. `surveys.survey_date` — DATE column ready to use
3. `date-fns` — already in `package.json`, zero imports (ready to use)
4. `Layout` component — single point of change for sidebar nav + notification bell
5. `AuthContext` — `isSurveyor` flag for role-based calendar views
6. `ProtectedRoute` — auth guard pattern ready for calendar pages

### Gaps that need filling

1. **No time-based availability model** — `surveyors.availability` is boolean, not calendar-based
2. **No calendar UI library** — need to add one (e.g. `react-big-calendar`, `fullcalendar`, or custom with `date-fns`)
3. **No surveyor-to-user-profile bridge** — `surveyors` and `user_profiles` are separate, need unification or bridging
4. **Survey type not selectable at creation** — hardcoded to `'damp'`
5. **No realtime subscriptions** — needed for live calendar updates
6. **No notification system** — needed for booking confirmations and schedule changes

### Complete route structure reference

```
/                                   Dashboard
/login                              Login
/forgot-password                    Password reset
/change-password                    Change password
/update-password                    Update password
/surveys                            Survey list (filterable)
/surveys/[surveyId]                 Survey detail
/survey/new                         Book new survey
/survey/[projectId]/wizard          5-step survey wizard
/survey/[projectId]/costing         Costing review
/survey/[projectId]/installer-info  Installer info
/survey/[projectId]/report          Report editor
/survey/[projectId]/quotation/[id]  Quotation view
/survey/[projectId]/inspection      Legacy inspection
/survey/[projectId]/photos          Legacy photos
/enquiries                          Enquiry list
/enquiries/new                      New enquiry
/customers                          Customer list
/customers/new                      New customer
/customers/[customerId]             Edit customer
/team/surveyors                     Surveyor list
/team/surveyors/new                 New surveyor
/team/surveyors/[id]                Edit surveyor
/admin                              Admin dashboard
/admin/materials                    Materials catalogue
/admin/rates                        Rate management
/admin/team                         Team management
/admin/work-sections                Work sections (legacy)
/settings                           Settings
/settings/company                   Company profile
/report/[reportId]                  View report
/q/[token]                          Public quotation (unauthenticated)

API Routes:
POST /api/admin/team                Team management
POST /api/generate-report           LLM report generation
POST /api/polish-observation        Polish field notes
GET  /api/q/[token]/pdf             Public quotation PDF
GET  /api/q/[token]/view            Public quotation viewer
POST /api/quotation-pdf/[id]        Quotation PDF generation
GET  /api/report/[reportId]         Report data
POST /api/settings/company          Company profile update
POST /api/settings/company/logo     Logo upload
POST /api/surveys/[id]/quotation    Quotation generation
POST /api/transcribe                Audio transcription
```

---

*Generated: 2026-03-01 | Purpose: Calendar & booking feature design input*
