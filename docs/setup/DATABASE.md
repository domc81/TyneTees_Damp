# Tyne Tees Damp Proofing - Survey System Database Documentation

## Overview

The Tyne Tees Damp Proofing Survey System uses **Supabase** (PostgreSQL 15) as its database backend. The database manages the complete workflow from initial enquiry through survey, costing, materials procurement, and quotation generation.

**Tech Stack:**
- PostgreSQL 15
- Supabase (Auth, Storage, Edge Functions, Realtime)
- Row Level Security (RLS) for data access control

---

## Table of Contents

1. [ENUM Types](#enum-types)
2. [Core Tables](#core-tables)
3. [Survey Data Tables](#survey-data-tables)
4. [Costing Engine Tables](#costing-engine-tables)
5. [Materials & Products](#materials--products)
6. [Subcontractor Management](#subcontractor-management)
7. [Photos & Media](#photos--media)
8. [Quotations & Reports](#quotations--reports)
9. [Email Templates](#email-templates)
10. [Configuration Tables](#configuration-tables)
11. [Functions & Triggers](#functions--triggers)
12. [Indexes](#indexes)
13. [Row Level Security](#row-level-security)
14. [Supabase Extensions](#supabase-extensions)
15. [API Integration](#api-integration)

---

## ENUM Types

### `enquiry_status`
Workflow status for enquiries.

| Value | Description |
|-------|-------------|
| `new` | Just received |
| `assigned` | Assigned to surveyor |
| `surveyed` | Survey completed |
| `quoted` | Quotation sent |
| `accepted` | Customer accepted |
| `declined` | Customer declined |
| `on_hold` | Temporarily paused |
| `completed` | Work completed |

### `survey_type`
Type of damp/timber survey to conduct.

| Value | Description |
|-------|-------------|
| `damp` | Rising/penetrating damp survey |
| `timber` | Timber condition assessment |
| `woodworm` | Woodworm infestation survey |
| `condensation` | Condensation/moisture analysis |
| `structural` | Structural assessment |
| `comprehensive` | Full property survey |

### `defect_type`
Types of defects that can be identified during survey.

| Value | Description |
|-------|-------------|
| `rising_damp` | Ground moisture rising through walls |
| `penetrating_damp` | External water ingress |
| `wet_rot` | Wet rot timber decay |
| `dry_rot` | Dry rot timber decay |
| `woodworm` | Wood-boring insect infestation |
| `condensation` | Internal moisture/condensation |
| `mould` | Mould growth |
| `wall_tie_failure` | Corroded wall ties |
| `asbestos_suspected` | Potential asbestos materials |
| `structural_movement` | Cracks/structural issues |
| `other` | Miscellaneous defects |

### `work_type`
Categories of remedial work.

| Value | Description |
|-------|-------------|
| `damp_proofing` | Damp proof course installation |
| `timber_treatment` | Woodworm/dry-rot treatment |
| `structural_repair` | Structural repairs |
| `ventilation_install` | PIV/extract ventilation |
| `asbestos_survey` | Asbestos testing |
| `general_inspection` | General observation |

### `room_type`
Room classifications for inspection notes.

| Value | Description |
|-------|-------------|
| `living_room` | Main living area |
| `bedroom` | Any bedroom |
| `kitchen` | Kitchen |
| `bathroom` | Bathroom/WC |
| `dining_room` | Dining room |
| `hallway` | Hallway/landing |
| `staircase` | Stairs |
| `basement` | Basement |
| `garage` | Garage |
| `utility` | Utility room |
| `loft` | Loft/attic |
| `external` | External areas |
| `other` | Other rooms |

### `floor_level`
Floor level designations.

| Value | Description |
|-------|-------------|
| `ground` | Ground floor |
| `first` | First floor |
| `second` | Second floor |
| `basement` | Basement level |
| `lower_ground` | Lower ground |
| `loft` | Loft level |

---

## Core Tables

### `enquiries`

**Purpose:** Initial contact entries from potential customers.

**Entry Point:** Office staff enter enquiry details here before a survey is scheduled.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `enquiry_number` | TEXT | UNIQUE, NOT NULL | Human-readable ID (e.g., `CF-Damp-2026-0001`) |
| `internal_reference` | TEXT | UNIQUE | Internal reference (e.g., `SMITH-001`) |
| `client_name` | TEXT | NOT NULL | Customer name |
| `client_email` | TEXT | - | Customer email |
| `client_phone` | TEXT | - | Customer phone |
| `site_address_1` | TEXT | NOT NULL | Site address line 1 |
| `site_address_2` | TEXT | - | Site address line 2 |
| `site_address_3` | TEXT | - | Site address line 3 |
| `site_city` | TEXT | - | City |
| `site_county` | TEXT | - | County |
| `site_postcode` | TEXT | NOT NULL | **Required** - Postcode |
| `surveyor_id` | UUID | REFERENCES `auth_users(id)` | Assigned surveyor |
| `enquiry_date` | DATE | DEFAULT CURRENT_DATE | Date enquiry received |
| `proposed_survey_date` | DATE | - | Scheduled survey date |
| `actual_survey_date` | DATE | - | Actual survey date |
| `status` | `enquiry_status` | DEFAULT 'new' | Current status |
| `source` | TEXT | - | Lead source (Website, Phone, Email) |
| `notes` | TEXT | - | Internal notes |
| `follow_up_date` | DATE | - | Next follow-up date |
| `created_by` | UUID | REFERENCES `auth_users(id)` | Created by user |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last update |

**Relationships:**
- `enquiry_id` → `projects.enquiry_id` (one-to-many)

**Triggers:**
- `generate_enquiry_number()` - Auto-generates enquiry number
- `generate_internal_reference()` - Auto-generates internal reference

---

### `projects`

**Purpose:** Links enquiry to survey data and costing. Central hub for a property job.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `enquiry_id` | UUID | REFERENCES `enquiries(id)` ON DELETE CASCADE | Parent enquiry |
| `project_number` | TEXT | UNIQUE, NOT NULL | Project ID (e.g., `TT-2026-0001`) |
| `survey_type` | `survey_type` | NOT NULL | Type of survey |
| `weather_conditions` | TEXT | - | Survey day weather |
| `property_type` | TEXT | - | House, Flat, Terrace, etc. |
| `property_age` | TEXT | - | Victorian, 1930s, Modern |
| `construction_type` | TEXT | - | Solid Wall, Cavity Wall |
| `access_instructions` | TEXT | - | Entry instructions |
| `parking_available` | BOOLEAN | - | Parking available? |
| `parking_notes` | TEXT | - | Parking details |
| `status` | TEXT | DEFAULT 'draft' | project status |
| `survey_completed_at` | TIMESTAMPTZ | - | Survey completion time |
| `surveyor_id` | UUID | REFERENCES `auth_users(id)` | Surveyor |
| `total_cost` | DECIMAL(12,2) | - | Final cost |
| `deposit_amount` | DECIMAL(12,2) | - | Required deposit |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last update |

**Project Status Values:**
| Value | Description |
|-------|-------------|
| `draft` | Initial creation |
| `in_progress` | Survey/quoting in progress |
| `pending_review` | Awaiting internal review |
| `completed` | Finalized |

---

## Survey Data Tables

### `room_inspections`

**Purpose:** Records inspection findings for each room in a property.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `project_id` | UUID | REFERENCES `projects(id)` ON DELETE CASCADE | Parent project |
| `room_name` | TEXT | NOT NULL | Room name/number |
| `room_type` | `room_type` | NOT NULL | Room classification |
| `floor_level` | `floor_level` | NOT NULL | Floor level |
| `order_num` | INTEGER | DEFAULT 0 | Display order |
| `length` | DECIMAL(6,2) | - | Room length (meters) |
| `width` | DECIMAL(6,2) | - | Room width (meters) |
| `height` | DECIMAL(6,2) | - | Ceiling height (meters) |
| `defects` | JSONB | - | Defect array (see below) |
| `moisture_readings` | JSONB | - | Moisture readings array |
| `timber_condition` | TEXT | - | Timber assessment |
| `decay_type` | TEXT | - | wet_rot, dry_rot, none |
| `severity_rating` | INTEGER | - | 1-5 severity scale |
| `recommendations` | TEXT | - | General recommendations |
| `recommended_works` | TEXT | - | Specific works needed |
| `photo_ids` | UUID[] | - | Related photo IDs |
| `needs_asbestos_assessment` | BOOLEAN | DEFAULT FALSE | Flag for asbestos |
| `needs_structural_assessment` | BOOLEAN | DEFAULT FALSE | Flag for structural |
| `timber_at_risk` | BOOLEAN | DEFAULT FALSE | Timber risk flag |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last update |

**JSON Structure Examples:**

```json
// defects JSONB example
{
  "defects": [
    {
      "type": "rising_damp",
      "severity": 3,
      "description": "Rising damp to external wall",
      "location": "North wall, lower 1.5m"
    }
  ]
}

// moisture_readings JSONB example
{
  "moisture_readings": [
    {
      "location": "North wall plaster",
      "reading_percent": 18.5,
      "notes": "High reading"
    }
  ]
}
```

---

### `defect_templates`

**Purpose:** Pre-defined defect types with recommended treatments and linked materials.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `survey_type` | `survey_type` | NOT NULL | Applies to survey type |
| `defect_type` | `defect_type` | NOT NULL | Type of defect |
| `name` | TEXT | NOT NULL | Display name |
| `description` | TEXT | - | Detailed description |
| `severity_default` | INTEGER | DEFAULT 2 | Default severity |
| `triggers_work_section` | TEXT | - | Links to cost section |
| `triggers_material_ids` | UUID[] | - | Suggested materials |
| `requires_asbestos_check` | BOOLEAN | DEFAULT FALSE | Asbestos flag |
| `requires_timber_assessment` | BOOLEAN | DEFAULT FALSE | Timber flag |
| `recommended_works_template` | TEXT | - | Template text |

---

## Costing Engine Tables

### `cost_sections`

**Purpose:** Main work categories for costing (e.g., "Walls - Install Membrane").

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `project_id` | UUID | REFERENCES `projects(id)` ON DELETE CASCADE | Parent project |
| `section_name` | TEXT | NOT NULL | Section name |
| `display_order` | INTEGER | DEFAULT 0 | Sort order |
| `markup_percentage` | DECIMAL(5,2) | DEFAULT 0 | Section markup |
| `is_optional` | BOOLEAN | DEFAULT FALSE | Optional item |
| `is_active` | BOOLEAN | DEFAULT TRUE | Active section |
| `materials_total` | DECIMAL(12,2) | DEFAULT 0 | **Cached** materials sum |
| `labor_total` | DECIMAL(12,2) | DEFAULT 0 | **Cached** labor sum |
| `subcontractor_total` | DECIMAL(12,2) | DEFAULT 0 | **Cached** subcontractor sum |
| `section_total` | DECIMAL(12,2) | DEFAULT 0 | **Cached** section total |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

---

### `line_items`

**Purpose:** Individual cost items within a section. Can be manual entry or calculated from dimensions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `section_id` | UUID | REFERENCES `cost_sections(id)` ON DELETE CASCADE | Parent section |
| `project_id` | UUID | REFERENCES `projects(id)` ON DELETE CASCADE | Parent project |
| `item_name` | TEXT | NOT NULL | Item description |
| `description` | TEXT | - | Extended description |
| `category` | TEXT | NOT NULL | EQUIP, LBR, MTL, Other, SUB |
| `length` | DECIMAL(8,2) | - | Length for calculation |
| `width` | DECIMAL(8,2) | - | Width for calculation |
| `height` | DECIMAL(8,2) | - | Height for calculation |
| `quantity` | DECIMAL(10,2) | - | Manual quantity |
| `uom` | TEXT | NOT NULL | Unit of measure |
| `unit_rate` | DECIMAL(10,2) | DEFAULT 0 | Base rate |
| `waste_factor` | DECIMAL(5,3) | DEFAULT 0.10 | Waste allowance |
| `hours_per_unit` | DECIMAL(8,4) | - | Labor hours |
| `hourly_rate` | DECIMAL(8,2) | DEFAULT 30.63 | Labor rate |
| `markup_percentage` | DECIMAL(5,2) | DEFAULT 35 | Material markup |
| `labor_markup_percentage` | DECIMAL(5,2) | DEFAULT 100 | Labor markup |
| `material_cost` | DECIMAL(12,2) | DEFAULT 0 | **Calculated** material |
| `labor_cost` | DECIMAL(12,2) | DEFAULT 0 | **Calculated** labor |
| `line_total` | DECIMAL(12,2) | DEFAULT 0 | **Calculated** total |
| `is_optional` | BOOLEAN | DEFAULT FALSE | Optional item |
| `is_active` | BOOLEAN | DEFAULT TRUE | Active item |
| `display_order` | INTEGER | DEFAULT 0 | Sort order |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last update |

**Categories:**
| Value | Description |
|-------|-------------|
| `EQUIP` | Equipment rental |
| `LBR` | Labor costs |
| `MTL` | Materials |
| `Other` | Miscellaneous |
| `SUB` | Subcontractor |

**Calculation Formula:**
```
material_cost = quantity × unit_rate × (1 + waste_factor) × (1 + markup_percentage/100)
labor_cost = quantity × hours_per_unit × hourly_rate × (1 + labor_markup_percentage/100)
line_total = material_cost + labor_cost
```

---

### `section_adjustments`

**Purpose:** Percentage or fixed adjustments applied at section level.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `project_id` | UUID | REFERENCES `projects(id)` ON DELETE CASCADE | Parent project |
| `section_id` | UUID | REFERENCES `cost_sections(id)` ON DELETE CASCADE | Parent section |
| `adjustment_name` | TEXT | NOT NULL | Adjustment name |
| `adjustment_percentage` | DECIMAL(5,2) | - | Amount |
| `is_percentage` | BOOLEAN | DEFAULT TRUE | % or fixed amount |
| `applies_to` | TEXT | - | materials, labor, both, subcontractor |

---

## Materials & Products

### `materials`

**Purpose:** Master catalog of products/prices available for costing.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `product_code` | TEXT | UNIQUE, NOT NULL | SKU (e.g., `MTL-001`) |
| `name` | TEXT | NOT NULL | Product name |
| `description` | TEXT | - | Product details |
| `category` | TEXT | - | Product category |
| `unit_cost` | DECIMAL(10,2) | NOT NULL | Base cost |
| `unit_of_measure` | TEXT | NOT NULL | Each, M2, LM, etc. |
| `coverage_per_unit` | DECIMAL(8,2) | - | Coverage rate |
| `coverage_unit` | TEXT | - | Coverage unit |
| `supplier_name` | TEXT | - | Supplier |
| `supplier_url` | TEXT | - | Product URL |
| `default_waste_factor` | DECIMAL(5,3) | DEFAULT 0.10 | Default waste |
| `default_markup` | DECIMAL(5,2) | DEFAULT 35 | Default markup % |
| `is_active` | BOOLEAN | DEFAULT TRUE | Active product |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

---

### `materials_list`

**Purpose:** Project-specific procurement list (what to order).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `project_id` | UUID | REFERENCES `projects(id)` ON DELETE CASCADE | Parent project |
| `material_id` | UUID | REFERENCES `materials(id)` | Catalog item |
| `quantity_required` | DECIMAL(10,2) | NOT NULL | Order quantity |
| `uom` | TEXT | NOT NULL | Unit of measure |
| `unit_cost` | DECIMAL(10,2) | NOT NULL | Unit cost at order |
| `total_cost` | DECIMAL(12,2) | NOT NULL | Line total |
| `ordered` | BOOLEAN | DEFAULT FALSE | Ordered flag |
| `ordered_date` | DATE | - | Order date |
| `delivery_date` | DATE | - | Expected delivery |
| `notes` | TEXT | - | Procurement notes |

---

## Subcontractor Management

### `subcontractors`

**Purpose:** Subcontractor/tradesperson registry.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `name` | TEXT | NOT NULL | Business name |
| `trade` | TEXT | NOT NULL | Trade specialty |
| `contact_name` | TEXT | - | Contact person |
| `phone` | TEXT | - | Phone number |
| `email` | TEXT | - | Email address |
| `hourly_rate` | DECIMAL(8,2) | - | Hourly rate |
| `day_rate` | DECIMAL(8,2) | - | Daily rate |
| `notes` | TEXT | - | Notes |
| `is_active` | BOOLEAN | DEFAULT TRUE | Active subcontractor |

---

### `subcontractor_costs`

**Purpose:** Subcontractor line items on projects.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `project_id` | UUID | REFERENCES `projects(id)` ON DELETE CASCADE | Parent project |
| `subcontractor_id` | UUID | REFERENCES `subcontractors(id)` | Subcontractor |
| `work_description` | TEXT | NOT NULL | Work details |
| `quantity` | DECIMAL(10,2) | - | Quantity |
| `uom` | TEXT | - | Unit |
| `unit_cost` | DECIMAL(10,2) | - | Unit cost |
| `total_cost` | DECIMAL(12,2) | - | Line total |
| `projected_hours` | DECIMAL(8,2) | - | Estimated hours |
| `notes` | TEXT | - | Notes |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

---

## Photos & Media

### `photos`

**Purpose:** Project photos stored in Supabase Storage with metadata.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `project_id` | UUID | REFERENCES `projects(id)` ON DELETE CASCADE | Parent project |
| `room_inspection_id` | UUID | REFERENCES `room_inspections(id)` ON DELETE SET NULL | Related room |
| `storage_path` | TEXT | NOT NULL | Supabase Storage path |
| `file_name` | TEXT | NOT NULL | Original filename |
| `file_size` | BIGINT | - | File size in bytes |
| `mime_type` | TEXT | - | MIME type |
| `category` | TEXT | NOT NULL | Photo category |
| `description` | TEXT | - | Photo description |
| `latitude` | DECIMAL(10,8) | - | GPS latitude |
| `longitude` | DECIMAL(10,8) | - | GPS longitude |
| `taken_at` | TIMESTAMPTZ | - | Photo timestamp |
| `uploaded_by` | UUID | REFERENCES `auth_users(id)` | Uploader |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Upload timestamp |

**Photo Categories:**
- `damp_evidence` - Damp staining/mould
- `timber_damage` - Rot/infestation
- `general` - General property photos
- `defect` - Specific defect photos
- `progress` - Work in progress
- `completion` - After completion

---

## Quotations & Reports

### `quotations`

**Purpose:** Customer quotations with pricing and acceptance tracking.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `project_id` | UUID | REFERENCES `projects(id)` ON DELETE CASCADE | Parent project |
| `quotation_number` | TEXT | UNIQUE, NOT NULL | Reference (e.g., `Q-TT-2026-0001`) |
| `subtotal` | DECIMAL(12,2) | NOT NULL | Net amount |
| `vat_rate` | DECIMAL(5,2) | DEFAULT 20 | VAT percentage |
| `vat_amount` | DECIMAL(12,2) NOT NULL | VAT amount |
| `total` | DECIMAL(12,2) | NOT NULL | Gross amount |
| `deposit_percentage` | DECIMAL(5,2) | DEFAULT 30 | Deposit % |
| `deposit_amount` | DECIMAL(12,2) | - | Deposit value |
| `validity_days` | INTEGER | DEFAULT 30 | Quote validity |
| `valid_until` | DATE | - | Expiry date |
| `status` | TEXT | DEFAULT 'draft' | Quote status |
| `sent_at` | TIMESTAMPTZ | - | Send timestamp |
| `viewed_at` | TIMESTAMPTZ | - | Customer viewed |
| `accepted_at` | TIMESTAMPTZ | - | Acceptance time |
| `customer_signature` | JSONB | - | {name, date, ip_address} |
| `notes` | TEXT | - | Internal notes |
| `terms_conditions` | TEXT | - | T&C text |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last update |

**Quotation Status:**
| Value | Description |
|-------|-------------|
| `draft` | Being prepared |
| `sent` | Sent to customer |
| `viewed` | Customer opened |
| `accepted` | Customer accepted |
| `rejected` | Customer declined |

---

### `reports`

**Purpose:** Generated PDF reports (survey reports, quotations).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `project_id` | UUID | REFERENCES `projects(id)` ON DELETE CASCADE | Parent project |
| `report_type` | TEXT | NOT NULL | survey, quotation, combined |
| `version` | INTEGER | DEFAULT 1 | Report version |
| `content` | JSONB | NOT NULL | Report content |
| `pdf_path` | TEXT | - | Storage path to PDF |
| `pdf_generated_at` | TIMESTAMPTZ | - | Generation time |
| `generated_by` | UUID | REFERENCES `auth_users(id)` | Generator |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

---

## Email Templates

### `email_templates`

**Purpose:** Pre-defined email templates with variable substitution.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `template_name` | TEXT | UNIQUE, NOT NULL | Template name |
| `template_type` | TEXT | NOT NULL | Template category |
| `subject_template` | TEXT | NOT NULL | Email subject |
| `body_template` | TEXT | NOT NULL | Email body (HTML/text) |
| `variables` | JSONB | - | Available variables |
| `is_active` | BOOLEAN | DEFAULT TRUE | Active template |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

**Variable Substitution:**
Use `{{variable_name}}` syntax in templates. Available variables:
- `{{client_name}}` - Customer name
- `{{site_address}}` - Full site address
- `{{enquiry_number}}` - Enquiry reference
- `{{project_number}}` - Project reference
- `{{survey_date}}` - Survey date
- `{{total_cost}}` - Quoted amount
- etc.

---

### `sent_emails`

**Purpose:** Audit log of sent emails.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `template_id` | UUID | REFERENCES `email_templates(id)` | Template used |
| `project_id` | UUID | REFERENCES `projects(id)` ON DELETE CASCADE | Related project |
| `recipient_email` | TEXT | NOT NULL | To address |
| `recipient_name` | TEXT | - | Recipient name |
| `subject` | TEXT | NOT NULL | Sent subject |
| `body` | TEXT | NOT NULL | Sent body |
| `sent_at` | TIMESTAMPTZ | DEFAULT NOW() | Send time |
| `status` | TEXT | DEFAULT 'sent' | Delivery status |
| `opened_at` | TIMESTAMPTZ | - | Open timestamp |

**Email Status:**
| Value | Description |
|-------|-------------|
| `sent` | Successfully sent |
| `delivered` | Delivered to inbox |
| `opened` | Opened by recipient |
| `bounced` | Delivery failed |

---

## Configuration Tables

### `rates`

**Purpose:** Base rates for calculations (labor, travel, etc.).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `rate_name` | TEXT | UNIQUE, NOT NULL | Rate name |
| `rate_type` | TEXT | NOT NULL | hourly, km, percentage |
| `value` | DECIMAL(10,2) | NOT NULL | Rate value |
| `unit` | TEXT | - | Unit description |
| `description` | TEXT | - | Rate description |
| `effective_from` | DATE | - | Start date |
| `effective_to` | DATE | - | End date |
| `is_active` | BOOLEAN | DEFAULT TRUE | Active rate |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last update |

**Default Rates:**
| rate_name | rate_type | value | unit |
|-----------|-----------|-------|------|
| Hourly Rate | hourly | 30.63 | GBP/hr |
| Travel Rate | km | 0.50 | GBP/km |
| Contractor Hourly | hourly | 28.00 | GBP/hr |
| Material Markup Default | percentage | 35.00 | % |
| Labor Markup Default | percentage | 100.00 | % |
| VAT Rate | percentage | 20.00 | % |

---

## Functions & Triggers

### `generate_enquiry_number()`

**Trigger:** `BEFORE INSERT ON enquiries`

**Purpose:** Auto-generates unique enquiry number.

**Format:** `{PREFIX}-{SURVEY_TYPE}-{YEAR}-{SEQ:04}`

**Example:** `CF-Damp-2026-0001`

**Logic:**
```sql
prefix := 'CF-' || UPPER(NEW.survey_type::TEXT) || '-' || year_num || '-';
count_num := COUNT(*) + 1 WHERE enquiry_number LIKE prefix || '%';
NEW.enquiry_number := prefix || LPAD(count_num, 4, '0');
```

---

### `generate_internal_reference()`

**Trigger:** `BEFORE INSERT ON enquiries`

**Purpose:** Generates short internal reference from client surname.

**Format:** `{SURNAME:5}-{SEQ:03}`

**Example:** `SMITH-001`

---

### `calculate_line_item_total()`

**Trigger:** `BEFORE INSERT OR UPDATE ON line_items`

**Purpose:** Auto-calculates material_cost, labor_cost, and line_total.

**Calculations:**
```
quantity = quantity OR (length × width)

material_cost = quantity × unit_rate × (1 + waste_factor) × (1 + markup_percentage/100)

labor_cost = quantity × hours_per_unit × hourly_rate × (1 + labor_markup_percentage/100)

line_total = material_cost + labor_cost
```

---

### `update_updated_at()`

**Trigger:** `BEFORE UPDATE` on tables with `updated_at` column.

**Purpose:** Auto-updates `updated_at` timestamp on row modification.

---

## Indexes

### Performance Indexes

| Table | Index | Columns | Purpose |
|-------|-------|---------|---------|
| `enquiries` | `idx_enquiries_status` | `status` | Filter by status |
| `enquiries` | `idx_enquiries_postcode` | `site_postcode` | Postcode lookup |
| `projects` | `idx_projects_surveyor` | `surveyor_id` | Filter by surveyor |
| `projects` | `idx_projects_status` | `status` | Filter by status |
| `room_inspections` | `idx_room_inspections_project` | `project_id` | Project lookups |
| `line_items` | `idx_line_items_project` | `project_id` | Project costing |
| `line_items` | `idx_line_items_section` | `section_id` | Section items |
| `photos` | `idx_photos_project` | `project_id` | Project photos |
| `defects` | `idx_defects_room` | `room_id` | Room defects |
| `moisture_readings` | `idx_moisture_readings_room` | `room_id` | Room readings |

---

## Row Level Security

### Current RLS Policies

All tables have RLS enabled with "Allow all" policies for local development:

```sql
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
-- ... other tables

CREATE POLICY "Allow all" ON enquiries FOR ALL USING (true);
CREATE POLICY "Allow all" ON projects FOR ALL USING (true);
-- ... similar for all tables
```

### Production RLS Requirements

For production deployment, implement role-based access:

```sql
-- Example: Admin full access, office view/edit, surveyor limited
CREATE POLICY "Admin can do everything" ON enquiries
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Office can manage enquiries" ON enquiries
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'office'))
  );

CREATE POLICY "Team can view enquiries" ON enquiries
  FOR SELECT USING (auth.role() = 'authenticated');
```

---

## Supabase Extensions

The database includes these Supabase extensions:

| Extension | Schema | Purpose |
|-----------|--------|---------|
| `pgcrypto` | extensions | Cryptographic functions |
| `pgjwt` | vault | JWT handling |
| `pg_graphql` | graphql | GraphQL API |
| `pg_stat_statements` | extensions | Query performance |
| `pgsodium` | - | Sodium cryptography |
| `supabase_vault` | vault | Secret storage |
| `uuid-ossp` | extensions | UUID generation |
| `pg_net` | extensions | HTTP networking |

---

## API Integration

### Supabase Client

**Frontend:** Uses `@supabase/supabase-js` configured in `src/lib/supabase-client.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### Database URL Format

**Local Development:**
```
postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

**Environment Variables:**
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anonymous API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role (server-side) |

---

## Workflow Sequence

```
1. ENTRY
   Office creates enquiry → enquiry_number auto-generated

2. ASSIGNMENT
   Assign surveyor → status = 'assigned'

3. SURVEY
   Create project → room_inspections recorded
   Upload photos → photos table
   Record defects → room_inspections.defects JSONB

4. COSTING
   Create cost_sections → line_items added
   Line totals auto-calculated
   Materials ordered → materials_list

5. QUOTATION
   Generate quotation → quotes table
   Send to customer → status progression
   Customer accepts → accepted_at recorded

6. COMPLETION
   Generate report → reports table (PDF)
   Mark complete → status = 'completed'
```

---

## Local Development

### Start Database
```bash
cd survey-system
supabase start
```

### Access Points
| Service | URL | Port |
|---------|-----|------|
| API | http://127.0.0.1 | 54321 |
| Studio | http://127.0.0.1 | 54323 |
| Database | postgresql://127.0.0.1 | 54322 |

### Stop Database
```bash
supabase stop
```

### Reset Database
```bash
supabase db reset
```

---

## Seed Data

The following data is seeded on fresh installation:

**Rates:**
- Hourly Rate: £30.63/hr
- Travel Rate: £0.50/km
- Contractor Hourly: £28.00/hr
- Material Markup Default: 35%
- Labor Markup Default: 100%
- VAT Rate: 20%

**Email Templates:**
- Access Permission Request

**Materials:**
- MTL-001: Antinox HD Floor Protection (£4.16/Each)
- MTL-002: Wykamol CM3 Mesh Membrane (£18.35/M2)
- MTL-003: Creamline 8 DPC (£13.93/LM)
- MTL-004: EP40 2 Pack Resin Top Coat (£25.00/M2)
- MTL-005: Renovating Plaster 25kg (£22.50/Bags)
- MTL-006: Plastering Stop Bead 3m (£3.20/Each)
- MTL-007: Airbrick (110mm) (£8.50/Each)

**Cost Sections:**
1. Stripping out of items as required
2. Walls (Install membrane system)
3. Cementitious tanking system
4. Floor - Liquid Resin Floor Membranes
5. Plastering & finishing
6. Warmline Internal Wall Insulation
7. Floor Joists & Floor Decking
8. Airbricks
9. Spray treatments
10. Drains
11. External Wall - Aquaban Water Repellant Treatments
12. Asbestos Testing

---

*Document generated: 2026-02-11*
*For Tyne Tees Damp Proofing Survey System*
