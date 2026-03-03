# Enquiry Pipeline Investigation Report

**Date:** 2026-03-03
**Purpose:** Document the current enquiry system and identify everything needed to design a CRM-style lead pipeline.

---

## 1. Full Enquiry Table Schema

### Columns

| Column | Type | Nullable | Default | Max Length |
|--------|------|----------|---------|------------|
| `id` | uuid | NO | `gen_random_uuid()` | — |
| `enquiry_number` | text | NO | — | — |
| `internal_reference` | text | YES | — | — |
| `client_name` | text | NO | — | — |
| `client_email` | text | YES | — | — |
| `client_phone` | text | YES | — | — |
| `site_address_1` | text | NO | — | — |
| `site_address_2` | text | YES | — | — |
| `site_city` | text | NO | — | — |
| `site_county` | text | YES | — | — |
| `site_postcode` | text | NO | — | — |
| `survey_type` | `survey_type` enum | NO | `'damp'` | — |
| `status` | `enquiry_status` enum | NO | `'new'` | — |
| `source` | text | YES | — | — |
| `enquiry_date` | date | NO | `CURRENT_DATE` | — |
| `proposed_survey_date` | date | YES | — | — |
| `notes` | text | YES | — | — |
| `created_at` | timestamptz | NO | `now()` | — |
| `updated_at` | timestamptz | NO | `now()` | — |
| `distance_miles` | numeric | YES | — | — |
| `reported_problem` | text | YES | — | — |

### Enum: `enquiry_status`

```
new → assigned → surveyed → quoted → accepted → declined → on_hold → completed
```

8 values total. These represent a reasonable pipeline but have **no pipeline stage ordering enforced** — status can be set to any value from any other value.

### Enum: `survey_type`

```
damp, timber, woodworm, condensation, structural, comprehensive, site_preparation
```

7 values in the DB. Note: `site_preparation` exists in the DB enum but is **not exposed** in the new enquiry form UI.

### CHECK Constraints

**None.** No CHECK constraints exist on the enquiries table.

### Indexes

| Index | Definition |
|-------|-----------|
| `enquiries_pkey` | UNIQUE on `id` |
| `enquiries_enquiry_number_key` | UNIQUE on `enquiry_number` |
| `idx_enquiries_created_at` | B-tree on `created_at DESC` |
| `idx_enquiries_status` | B-tree on `status` |
| `idx_enquiries_survey_type` | B-tree on `survey_type` |

Good indexing for list queries with status filtering and date sorting.

---

## 2. Current Data

### Status Distribution

| Status | Count |
|--------|-------|
| surveyed | 1 |
| **Total** | **1** |

Only 1 enquiry exists in the database.

### Sample Record

| Field | Value |
|-------|-------|
| id | `d153bce6-e156-4598-ad18-e8978217e1b5` |
| enquiry_number | `CF-DAMP-2026-0001` |
| internal_reference | `SMITH-123` |
| client_name | John Smith |
| client_email | john.smith@email.com |
| client_phone | 01234 567890 |
| site_address_1 | 12 Victoria Street |
| site_city | Newcastle upon Tyne |
| site_county | Tyne and Wear |
| site_postcode | NE1 4LP |
| survey_type | damp |
| status | surveyed |
| source | Website |
| enquiry_date | 2026-02-26 |
| proposed_survey_date | NULL |
| notes | Rising damp reported in ground floor |
| distance_miles | NULL |
| reported_problem | NULL |

**Observations:**
- `enquiry_number` format: `CF-DAMP-2026-0001` (prefix-type-year-sequence)
- `reported_problem` column exists but is NULL — the form doesn't populate it
- `distance_miles` exists but is NULL — no distance calculation logic found

---

## 3. RLS Policies

| Policy Name | Command | Qual | With Check |
|-------------|---------|------|------------|
| Authenticated users full access | ALL | `true` | `true` |
| Service role full access | ALL | `true` | `true` |

**RLS is enabled** (`relrowsecurity = true`) but policies are wide-open — any authenticated user can do anything. This is fine for the current single-company setup but would need tightening for role-based access (e.g., surveyors should only see their assigned enquiries).

---

## 4. Related Tables and Foreign Keys

### Foreign Keys ON enquiries

**None.** The enquiries table has zero foreign key constraints. No FK to customers, surveys, user_profiles, or any other table.

### Foreign Keys TO enquiries (from other tables)

The `surveys` table has:
```sql
FOREIGN KEY (enquiry_id) REFERENCES enquiries(id) ON DELETE SET NULL
```

So **surveys point to enquiries** (not the other way around). The `surveys.enquiry_id` column is nullable and exists in the schema but is **never populated by any current code path**.

### Surveys Table — Relevant FK Columns

| Column | FK Target |
|--------|-----------|
| `customer_id` | → `customers(id)` ON DELETE SET NULL |
| `enquiry_id` | → `enquiries(id)` ON DELETE SET NULL |
| `surveyor_id` | → `user_profiles(id)` ON DELETE SET NULL |

### Missing Relationships (Schema Gaps)

| Gap | Impact |
|-----|--------|
| **No `customer_id` on enquiries** | Enquiry stores customer details inline (`client_name`, `client_email`, etc.) — no FK to the `customers` table. Customer deduplication is impossible. |
| **No `assigned_to` / `surveyor_id` on enquiries** | Despite the "assigned" status existing, there's no column to record WHO the enquiry is assigned to. |
| **No `survey_id` on enquiries** | The reverse link (`surveys.enquiry_id`) exists but enquiries can't directly reference the survey they spawned. |
| **No `enquiry_id` on `communication_log`** | The communication_log tracks emails/SMS linked to customers, surveys, quotations, and bookings — but NOT to enquiries. |
| **`source` is free text** | Not an enum. The form offers 5 options (website, phone, email, referral, repeat) but the column accepts any string. |

---

## 5. New Enquiry Form Analysis

**File:** `src/app/enquiries/new/page.tsx`

### Fields Collected

| Field | Required | Input Type | DB Column |
|-------|----------|------------|-----------|
| Client Name | Yes (`*`) | text | `client_name` |
| Email | No | email | `client_email` |
| Phone Number | No | tel | `client_phone` |
| Address Line 1 | Yes (`*`) | text | `site_address_1` |
| Address Line 2 | No | text | `site_address_2` |
| Address Line 3 | No | text | **No matching column** |
| City | No | text | `site_city` |
| County | No | text | `site_county` |
| Postcode | Yes (`*`) | text (auto-uppercased) | `site_postcode` |
| Survey Type | Yes (default: damp) | select | `survey_type` |
| Proposed Survey Date | No | date | `proposed_survey_date` |
| Source | No | select | `source` |
| Notes | No | textarea | `notes` |

**Survey type options in the form:** damp, timber, woodworm, condensation, structural, comprehensive (6 options — excludes `site_preparation`).

**Source options in the form:** Website, Phone, Email, Referral, Repeat Customer.

### Validation

- HTML `required` attribute on: Client Name, Address Line 1, Postcode
- No programmatic validation beyond HTML5 form validation
- No email format validation, no phone format validation
- No postcode format validation
- No duplicate checking (name, email, phone, address)

### Submission

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  console.log('Creating enquiry:', formData)
  // Fires notification (fire-and-forget)
  fetch('/api/notifications/trigger', { ... })
  // Redirects immediately
  router.push('/enquiries')
}
```

**CRITICAL FINDING: The form does NOT actually save to the database.** The `handleSubmit` function:
1. Logs form data to console
2. Fires a notification API call (fire-and-forget)
3. Redirects to `/enquiries`

There is **no Supabase insert call**. The only enquiry in the DB (`CF-DAMP-2026-0001`) was likely created via direct SQL or a different code path. The `createEnquiry()` function does **not exist** in `supabase-data.ts`.

### Post-Submission

- Redirects to `/enquiries` list
- No success/error feedback to user
- No confirmation page
- Notification fires to admin/office users with `enquiry_created` event (but sends no `enquiry_id` since no record is created)

### Buttons

- "Save Draft" button exists but has **no onClick handler** — it's purely decorative
- "Create Enquiry" button triggers form submit

---

## 6. Enquiry List Page Analysis

**File:** `src/app/enquiries/page.tsx`

### Columns Displayed

| Column | Source |
|--------|--------|
| Reference | `enquiry_number` |
| Client | `client_name` + `site_city` (sub-text) |
| Status | `status` (badge) |
| Type | `survey_type` (icon + label) |
| Survey Date | `proposed_survey_date` |
| Received | `created_at` |

### Status Filter Options

All 8 enum values are available in the dropdown: new, assigned, surveyed, quoted, accepted, declined, on_hold, completed.

### Actions Per Enquiry

**None.** Table rows have `cursor-default` (not clickable). There are no:
- View/detail links
- Edit buttons
- Status change actions
- "Convert to survey" actions
- Delete/archive actions

Enquiry rows are **read-only display only** — you can see them but can't interact with them.

### Search

Searches across: `client_name`, `client_email`, `client_phone`, `enquiry_number` using Supabase `.ilike` (case-insensitive partial match). Debounced at 300ms.

### Pagination

Server-side pagination with 25 items per page using Supabase `.range()`.

### Summary Cards

4 summary cards at the bottom: New, Assigned, Awaiting Quote (surveyed), Quoted. Counts are calculated from the **current page of results only** — not from total DB counts.

### Navigation Access

Enquiries link in sidebar is restricted to `admin` and `office` roles only — surveyors cannot see it.

---

## 7. Data Flow Gaps

### Files Referencing Enquiries (10 files)

| File | Usage |
|------|-------|
| `src/app/enquiries/page.tsx` | List page |
| `src/app/enquiries/new/page.tsx` | New form (non-functional) |
| `src/lib/supabase-data.ts` | `getEnquiries()`, `getEnquiryList()`, `getEnquiry()` — read-only functions |
| `src/types/database.types.ts` | `Enquiry` interface, `EnquiryStatus` type |
| `src/components/layout.tsx` | Sidebar nav link |
| `src/lib/notifications-server.ts` | `notifyEnquiryCreated()` |
| `src/app/api/notifications/trigger/route.ts` | Handles `enquiry_created` event |
| `src/app/settings/notifications/page.tsx` | Notification preference toggle |
| `src/components/NotificationBell.tsx` | Displays enquiry notifications |
| `src/lib/calendar-types.ts` | References `enquiry_id` in booking types |

### Enquiry → Survey Conversion

**Does NOT exist.** There is:
- No function to convert an enquiry into a survey
- No UI button or link to trigger conversion
- No code that populates `surveys.enquiry_id`
- No code that updates enquiry status when a survey is created from it
- The `surveys.enquiry_id` column exists and has a FK constraint but is **never written to**

The new survey form (`/survey/new`) is a completely separate flow that:
- Requires selecting a customer from the `customers` table (dropdown)
- Manually entering site address
- Has no awareness of enquiries at all
- Does not accept an `enquiryId` query parameter

### Assignment

**No assignment system exists.** Despite the `assigned` status value:
- No `assigned_to` or `surveyor_id` column on enquiries
- No UI to assign an enquiry to a team member
- No way to track who is responsible for an enquiry

### Activity / Notes / Comments

**No activity log on enquiries.** There is:
- A `communication_log` table but it has no `enquiry_id` column (only links to customers, surveys, quotations, bookings)
- A `notes` text field on the enquiry itself (single notes blob, not a timeline)
- No audit trail of status changes
- No comment thread or internal notes system

### Source Tracking

The `source` column exists as free text. The form offers 5 options (website, phone, email, referral, repeat) but:
- No validation enforces these values
- No analytics or reporting on source
- No campaign/referral tracking
- No UTM parameter capture

---

## 8. Customer Creation Flow

### Current Behaviour

When a new enquiry is created via the form:
- Customer details are stored **inline on the enquiry row** (`client_name`, `client_email`, `client_phone`)
- **No customer record** is created in the `customers` table
- **No deduplication** — no check for existing customers with the same name/email/phone
- **No `customer_id`** column exists on the enquiries table — there is no way to link an enquiry to a customer record

### Contrast with Survey Creation

The survey creation flow (`/survey/new`) requires:
- Selecting an existing customer from a dropdown (loads from `customers` table)
- Or creating a new customer first (redirects to `/customers/new?returnTo=survey-new`)
- The `customer_id` is stored on the survey record

This means **enquiries and customers are completely disconnected**. A customer could submit multiple enquiries and each would be a standalone record with no link between them.

---

## 9. Survey Creation Flow

**File:** `src/app/survey/new/page.tsx`

### Required Data

| Field | Required | Source |
|-------|----------|--------|
| Customer | Yes | Select from `customers` table or create new |
| Site Address | Yes | Manual entry |
| Postcode | Yes | Manual entry |
| Survey Type | Hardcoded | Always `'damp'` (!) |
| Reported Defect | No | Free text |
| Notes | No | Free text |
| Time Slot | Optional | SlotPicker calendar component |

**Important:** `survey_type` is hardcoded to `'damp'` — there's no survey type selector in the new survey form.

### Customer Selection

- Dropdown loads all customers from `getCustomers()`
- Has a "+ Create New Customer" option that redirects to `/customers/new?returnTo=survey-new`
- Supports pre-selection via `?customerId=xxx` query parameter
- Customer's name is looked up from the DB and denormalized into `surveys.client_name`

### Field Mapping: Enquiry → Survey

If we were to pre-populate a survey from an enquiry, here's the field mapping:

| Enquiry Field | Survey Field | Notes |
|---------------|-------------|-------|
| `client_name` | `client_name` | Direct copy (but survey expects a `customer_id` too) |
| `client_email` | — | Not stored on surveys — lives on customer record |
| `client_phone` | — | Not stored on surveys — lives on customer record |
| `site_address_1` | `site_address` | Slightly different column name |
| `site_address_2` | `site_address_line2` | Different column name |
| `site_city` | `site_city` | Direct copy |
| `site_county` | `site_county` | Direct copy |
| `site_postcode` | `site_postcode` | Direct copy |
| `survey_type` | `survey_type` | Direct copy (same enum) |
| `notes` | `notes` | Direct copy |
| `proposed_survey_date` | `survey_date` | Different column name |
| `reported_problem` | `reported_problem` | Direct copy (exists on both tables) |
| — | `enquiry_id` | FK exists on surveys but never populated |
| — | `customer_id` | Must be resolved — enquiry has no customer_id |

### Pre-Population Feasibility

The survey form accepts `?customerId=xxx` but NOT `?enquiryId=xxx`. To support enquiry-to-survey conversion, you would need to:
1. Either add `?enquiryId=xxx` support to the existing form
2. Or build a dedicated conversion function that creates the survey programmatically

The main friction point is **customer resolution** — enquiries store customer details inline, but surveys require a `customer_id` FK. A conversion would need to either:
- Find an existing customer by email/phone match
- Create a new customer record from the enquiry's inline data
- Or let the user manually select/create the customer

---

## 10. Schema Limitations Summary

### Must-Fix for Pipeline Feature

| Issue | Type | Description |
|-------|------|-------------|
| **Form doesn't save** | Bug | `handleSubmit` in `/enquiries/new` logs to console but never inserts into Supabase. No `createEnquiry()` function exists. |
| **No `customer_id` on enquiries** | Missing column | Can't link enquiries to customer records. Blocks deduplication and customer history. |
| **No `assigned_to` on enquiries** | Missing column | Can't track who's responsible for an enquiry. "Assigned" status is meaningless without it. |
| **No enquiry detail page** | Missing page | No `/enquiries/[id]` route exists. Rows aren't clickable. Can't view, edit, or take action on an enquiry. |
| **No enquiry-to-survey conversion** | Missing feature | `surveys.enquiry_id` exists but is never populated. No code path converts an enquiry into a survey. |
| **`source` is free text** | Data quality | Should be an enum or constrained values for reliable pipeline analytics. |
| **No `updated_at` trigger** | Missing trigger | `updated_at` column exists but there's no database trigger to auto-update it on row changes. |

### Should-Have for Pipeline

| Issue | Type | Description |
|-------|------|-------------|
| No activity log | Missing table | No way to track status changes, notes, calls, or emails on an enquiry over time. |
| No `enquiry_id` on `communication_log` | Missing column | Emails/SMS sent about an enquiry can't be tracked against it. |
| No priority/urgency field | Missing column | Can't prioritize enquiries in the pipeline. |
| No follow-up date | Missing column | Can't schedule next actions or reminders. |
| No value estimate | Missing column | Can't forecast revenue from the pipeline. |
| Summary card counts are page-local | Bug | Status counts in summary cards only reflect the current page of 25, not the full dataset. |
| Survey type hardcoded to "damp" | Bug | New survey form always creates damp surveys regardless of what the enquiry specified. |

### Nice-to-Have

| Issue | Type | Description |
|-------|------|-------------|
| No duplicate detection | Missing feature | Same person can appear as multiple enquiries with no warning. |
| No pipeline stage timestamps | Missing columns | Can't track how long an enquiry spent in each status. |
| No loss reason | Missing column | When an enquiry is declined, there's no way to record why. |
| No tags/labels | Missing column | Can't categorize or filter enquiries beyond status and type. |

---

## 11. Existing Data Functions (supabase-data.ts)

### Enquiry Functions Available

```typescript
getEnquiries()           // Returns all enquiries, ordered by created_at DESC
getEnquiryList(options)  // Paginated list with search + status filter
getEnquiry(id)           // Single enquiry by ID
```

### Missing Functions

```typescript
createEnquiry(data)          // Does NOT exist — form doesn't save
updateEnquiry(id, updates)   // Does NOT exist — can't change status or any field
deleteEnquiry(id)            // Does NOT exist
convertEnquiryToSurvey(id)   // Does NOT exist
assignEnquiry(id, userId)    // Does NOT exist
```

---

## 12. Notification System Integration

The enquiry notification infrastructure exists but is incomplete:
- `notifyEnquiryCreated()` function exists in `notifications-server.ts`
- It creates in-app notifications for admin/office users
- The trigger API route handles `enquiry_created` events
- **BUT:** Since the form doesn't actually create an enquiry, no real enquiry_id is passed — it sends the client name and email as fallback data

Missing notification events for a pipeline:
- `enquiry_assigned`
- `enquiry_status_changed`
- `enquiry_follow_up_due`
- `enquiry_converted_to_survey`
