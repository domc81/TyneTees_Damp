# Pricing System — Admin Support Guide

Reference guide for the TTDP automated pricing system. Covers the three admin pages (Pricing Configuration, Materials Catalogue, Costing Templates), how the pricing engine calculates costs, and how data flows from survey through to quotation.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Admin Pages](#admin-pages)
   - [Pricing Configuration (/admin/rates)](#pricing-configuration)
   - [Materials Catalogue (/admin/materials)](#materials-catalogue)
   - [Costing Templates (/admin/costing)](#costing-templates)
3. [The Pricing Engine](#the-pricing-engine)
   - [Formula Types](#formula-types)
   - [Override Chain](#override-chain)
4. [Survey-to-Costing Data Flow](#survey-to-costing-data-flow)
   - [Mapping Layer](#mapping-layer)
   - [Multi-Type Surveys](#multi-type-surveys)
   - [Site Preparation](#site-preparation)
5. [Costing Review Page](#costing-review-page)
   - [Section Adjustments](#section-adjustments)
   - [Optional Sections](#optional-sections)
   - [Project Specific Overheads](#project-specific-overheads)
   - [Grand Total Calculation](#grand-total-calculation)
6. [Quotation Generation](#quotation-generation)
7. [CF CSV Export](#cf-csv-export)
8. [Database Tables](#database-tables)
9. [Common Tasks](#common-tasks)
10. [Important Rules and Edge Cases](#important-rules-and-edge-cases)

---

## System Overview

The pricing system translates survey measurements into itemised costs. It replaces the four original Excel workbooks (Damp v48, Condensation v37, Timber v33, Woodworm v26) with an automated pipeline:

```
Survey wizard data (rooms, areas, measurements)
        |
        v
  Mapping layer  ---- aggregates all rooms by issue type
        |
        v
  Pricing engine ---- applies 11 formula types using templates + config + materials
        |
        v
  Costing review ---- admin/surveyor adjusts sections, toggles optional work
        |
        v
  Quotation      ---- freezes a snapshot of all costs (never changes retroactively)
        |
        v
  PDF / Email    ---- renders the frozen quotation for the customer
```

Three admin pages control the inputs that feed this pipeline:

| Page | URL | What it controls |
|------|-----|------------------|
| Pricing Configuration | `/admin/rates` | Labour rates, markups, wastage, VAT, fixed costs, deposit percentages |
| Materials Catalogue | `/admin/materials` | Supplier products with unit costs and coverage rates |
| Costing Templates | `/admin/costing` | 220 line item templates across 4 survey types + site preparation |

All three are admin-only (requires the `admin` role).

---

## Admin Pages

### Pricing Configuration

**URL:** `/admin/rates`

Controls the global numeric parameters that feed into every pricing calculation. Organised into six cards.

#### Labour Rates

| Field | Config Key | Stored As | Default | Notes |
|-------|-----------|-----------|---------|-------|
| Base Hourly Rate (GBP) | `hourly_labour_rate` | Decimal | 30.63 | Cost to company per hour |
| Labour Markup (%) | `default_labour_markup` | Decimal (0.30 = 30%) | 1.00 (100%) | Displayed as percentage, stored as decimal |

The page shows the **Effective Labour Rate** in real time: Base Rate x (1 + Markup). At defaults: 30.63 x 2.00 = 61.26/hr.

#### Contractor and Travel

| Field | Config Key | Default | Notes |
|-------|-----------|---------|-------|
| Contractor Hourly Rate (GBP) | `contractor_hourly_rate` | 28.00 | Paid to subcontractors. No markup applied |
| Vehicle Cost (GBP/mile) | `vehicle_cost_per_mile` | (set in DB) | Used in Project Specific Overheads calculation |

#### Markups and Wastage

| Field | Config Key | Stored As | Default | Notes |
|-------|-----------|-----------|---------|-------|
| Material Markup (%) | `default_material_markup` | Decimal (0.30 = 30%) | 0.30 | Applied to supplier material costs |
| Wastage Factor (%) | `default_wastage_factor` | Factor (1.10 = 10%) | 1.10 | Extra material ordered to cover waste |
| VAT Rate (%) | `vat_rate` | Decimal (0.20 = 20%) | 0.20 | Standard VAT rate |

**Storage conversions:** Markups are stored as decimals (30% = 0.30). Wastage is stored as a multiplier factor (10% waste = 1.10). The admin page handles the conversion automatically.

#### Fixed Costs

| Field | Config Key | Notes |
|-------|-----------|-------|
| Skip Hire — 8yd (GBP) | `skip_hire_8yd_cost` | Base cost per skip |
| Asbestos Testing (GBP/sample) | `asbestos_testing_cost` | Per-sample lab cost |
| Digital DPC Unit (GBP) | `digital_dpc_base_cost` | Mursec Eco digital DPC base cost |

#### Deposit Percentages

Four fields, one per survey type. Each stored as a decimal (0.30 = 30%).

| Field | Config Key |
|-------|-----------|
| Damp (%) | `damp_deposit_pct` |
| Condensation (%) | `condensation_deposit_pct` |
| Timber (%) | `timber_deposit_pct` |
| Woodworm (%) | `woodworm_deposit_pct` |

When a survey spans multiple types, the **highest** deposit percentage among active types is used.

#### Saving

- The **Save Changes** button is only enabled when values differ from what was loaded.
- Only changed values are sent to the database (batch update).
- A **Reset** button reverts all fields to the last-saved state.
- Warning banner: *"Changing these values will affect all new price calculations. Existing quotes are not updated."*

#### All Config Keys

The complete set of `pricing_config` rows:

| Config Key | Typical Value | Used By |
|------------|--------------|---------|
| `hourly_labour_rate` | 30.63 | All formula types (labour cost base) |
| `contractor_hourly_rate` | 28.00 | Tiered disposal, subcontractor lines |
| `default_material_markup` | 0.30 | Fallback material markup |
| `default_labour_markup` | 1.00 | Fallback labour markup |
| `default_wastage_factor` | 1.10 | Fallback wastage multiplier |
| `vat_rate` | 0.20 | Grand total calculation |
| `skip_hire_8yd_cost` | (set in DB) | Skip hire formula |
| `asbestos_testing_cost` | (set in DB) | Asbestos testing line items |
| `digital_dpc_base_cost` | (set in DB) | Digital DPC formula |
| `vehicle_cost_per_mile` | (set in DB) | Travel overhead calculation |
| `damp_deposit_pct` | (set in DB) | Quotation deposit amount |
| `condensation_deposit_pct` | (set in DB) | Quotation deposit amount |
| `timber_deposit_pct` | (set in DB) | Quotation deposit amount |
| `woodworm_deposit_pct` | (set in DB) | Quotation deposit amount |

---

### Materials Catalogue

**URL:** `/admin/materials`

Manages the supplier product database. Materials are referenced by costing templates via their `product_key` — when a material's unit cost changes here, all future costings that reference it pick up the new price automatically.

#### Material Fields

| Field | Required | Notes |
|-------|----------|-------|
| Material Name | Yes | Display name (e.g. "Wykamol Ultracure DPC Cream") |
| Category | Yes | One of 10 fixed categories (see below) |
| Product Key | No | Unique machine-readable key (e.g. `wykamol_ultracure_dpc_cream`). Auto-lowercased. Links to costing templates |
| Unit | Yes | Unit of measure (e.g. "Per roll", "Each", "Per bag") |
| Unit Cost (GBP) | Yes | Supplier cost (must be > 0) |
| Coverage (m2) | No | Coverage area per unit, used by coverage-based formulas |
| Unit Size | No | Pack/container size (e.g. "5ltr Container") |
| Supplier | No | Supplier name |
| Supplier URL | No | Link to supplier product page |
| Coverage / Notes | No | Free text notes |

#### Categories

Airbricks, Aquaban, Cementitious Tanking, DPC, Floor Resin, Plastering, Preparatory Work, Spray Treatments, Timber Treatments, Wall Membrane.

Each category has a colour-coded badge in the table for quick visual identification.

#### Search and Filter

- **Text search** across name, supplier, and product key.
- **Category dropdown** to filter by one category.
- **Sortable columns:** Name, Unit Cost, Category (ascending/descending toggle).

#### Adding a Material

1. Click **Add Material**.
2. Fill in the form fields.
3. If a product key is provided, it must be unique across all materials.
4. Click **Add Material** to save.

The new material is immediately available for reference by costing templates.

#### Editing a Material

1. Click the edit icon on any row.
2. The modal shows all editable fields, pre-filled.
3. If the material is referenced by costing templates, a banner shows: *"Linked to N costing templates"* with a list of affected templates and survey types.
4. Help text: *"Price changes will flow through to affected costings automatically."*
5. Save to update.

#### Deleting a Material

The system protects pricing history:

- **Not referenced by any template:** Hard delete (permanent removal).
- **Referenced by one or more templates:** Soft delete (sets `is_active = false`). The material disappears from the active catalogue but its pricing data is preserved for historical costings. The confirmation dialog changes to say *"Deactivate"* and lists the affected templates.

#### How Materials Connect to Pricing

Templates reference materials through `product_key` in their `formula_params`. For example, a DPC injection template might have `formula_params.product_key = 'wykamol_ultracure_dpc_cream'`. When the pricing engine runs, it looks up the current `unit_cost` from the materials catalogue using that key. This means:

- Updating a material's unit cost here automatically affects all future costings.
- Existing quotations are not affected (they contain frozen costs).
- A material with no product key cannot be dynamically referenced by templates.

---

### Costing Templates

**URL:** `/admin/costing`

Manages the 220 line item templates that define how each type of work is priced. Templates are grouped into sections, and sections belong to survey types.

#### Navigation

Five tabs across the top: **Damp**, **Condensation**, **Timber**, **Woodworm**, **Site Prep**. Each tab shows the template count. The active tab is highlighted.

Within each tab, templates are grouped into collapsible sections. Each section header shows:
- Section name
- Template count badge
- Modified count badge (amber) if any templates in that section have unsaved changes
- Section key (monospace, right-aligned)

**Expand All / Collapse All** buttons help navigate large template sets.

#### Search and Filter

- **Text search** across template descriptions.
- **Formula type dropdown** to filter by formula (Standard, Coverage, DPC, Compound, Fixed, Tiered, Bag&Cart, Skip).

#### Template Table Columns

Each expanded section shows a table with these columns:

| Column | Editable | Notes |
|--------|----------|-------|
| Description | No | What the work item is (e.g. "Remove radiators") |
| UOM | No | Unit of measurement (m2, LM, each, etc.) |
| Formula | No | Colour-coded badge showing the formula type |
| Unit Cost (GBP) | Yes | Base material cost per unit |
| Labour hrs | Yes | Labour hours per unit of work |
| Wastage (%) | Yes | Displayed as percentage, stored as factor (10% = 1.10) |
| Mat % | Yes | Material markup percentage |
| Lab % | Yes | Labour markup percentage |
| Coverage (m2) | Yes | Coverage per unit (for coverage-based formulas) |
| Active | Yes | Checkbox — inactive templates are skipped during calculation |

Every column header has a help icon (?) with a tooltip explaining what the field does.

#### Formula-Specific Parameters

Some formula types have additional editable parameters that appear in the template row:

**DPC Injection:**

| Parameter | Label | Default |
|-----------|-------|---------|
| `base_cream_cost` | DPC Cream Cost (GBP) | 13.93 |
| `cream_divisor` | Cream Divisor | 1.15 |
| `holes_per_meter` | Holes Per Meter | 6 |
| `drill_cost` | Drill Plug Cost (GBP) | 4.29 |
| `labour_hours_per_depth` | Labour Hrs / Depth | 0.35 |

**Tiered Disposal:**

| Parameter | Label | Default |
|-----------|-------|---------|
| `threshold` | Bag Threshold | 20 |
| `min_charge` | Min Charge (GBP) | 40 |
| `per_bag_over` | Per Bag Over (GBP) | 2 |

**Bag and Cart:**

| Parameter | Label | Default |
|-----------|-------|---------|
| `hours_per_bag` | Hours Per Bag | 0.01 |
| `material_cost_per_bag` | Cost Per Bag (GBP) | 1.00 |

#### Saving

- The **Save Changes** button shows the count of modified templates.
- Only changed fields are sent (batch update).
- **Reset** reverts all unsaved changes.
- Warning: *"Changes affect all FUTURE costings and quotations. Existing quotations are not affected."*

#### How Pricing Works (built-in explainer)

The page includes a collapsible *"How Pricing Works"* section explaining the calculation flow for reference.

---

## The Pricing Engine

The engine is a pure calculation module with no database access. It receives templates, config, and material lookups as input and returns calculated costs.

### Formula Types

#### 1. Standard

The most common formula. Linear cost scaling.

```
Material = base_unit_cost x wastage_factor x quantity
Labour   = labour_rate_per_unit x quantity
```

Both material and labour totals have their respective markups applied. Supports a `minimum_quantity` parameter (e.g., ducting has a 2.4m minimum charge).

**Used for:** Linear meter items, per-bag items, basic quantity-based work.

#### 2. Ceiling Coverage

For materials that cover an area (paint, primer, mesh, plaster).

```
Units needed = CEIL(quantity / coverage_rate)       -- rounds UP to whole units
Material     = units x (unit_cost / coverage_rate x wastage_factor)
Labour       = based on actual area, NOT rounded units
```

**Special features:**
- `labour_block_size`: Labour calculated in blocks (e.g., skimming at 4 hours per 15m2 block).
- `minimum_labour_hours`: Floor on labour (e.g., Aquaban minimum 2.7 hours).
- Dynamic CPCU: If a `product_key` is set in `formula_params`, the cost-per-coverage-unit is derived from the materials catalogue at runtime rather than being hardcoded.

**Fallback chain for unit cost:** Override > Dynamic CPCU from materials catalogue > `cost_per_coverage_unit` in formula_params > `base_unit_cost` on template.

**Used for:** Wall membrane, tanking slurry, renovating plaster, primer, topcoat, Aquaban treatments.

#### 3. DPC Injection

Specialist formula for damp-proof course injection. Cost varies with both wall length and wall depth (number of brick courses).

```
creamCostPerLM = (cream_base / cream_divisor) + ((holes_per_depth / wall_depth) x drill_plug_cost)
effectiveQty   = wall_depth x linear_meters
Material       = creamCostPerLM x effectiveQty x wastage x markup
Labour hours   = wall_depth x labour_hours_per_depth
```

The cream base cost and drill plug cost can be sourced from the materials catalogue (via product keys `wykamol_ultracure_dpc_cream` and `drill_plugs_12mm`) or from formula_params, with hardcoded fallbacks of 13.93 and 4.29 respectively.

**Example:** 10 LM wall, 2.5 brick depth:
- Cream cost/LM = (13.93 / 1.15) + ((6 / 2.5) x 4.29) = 22.41
- Labour = 2.5 x 0.35 = 0.875 hours

#### 4. Compound Material

Multi-material mixes where several products combine into one application.

```
Units needed  = CEIL(quantity / coverage_unit)
Cost per unit = SUM(material_catalogue[product_key] x qty_per_coverage) for each component
Material      = units x cost_per_unit x wastage
Labour        = quantity x labour_rate_per_unit
```

Each component is defined in `formula_params.components` as `{ product_key, qty_per_coverage }`.

**Used for:** Dubbing coat (SBR + sand + cement), other multi-material treatments.

#### 5. Fixed Price

Flat-rate items where quantity does not scale the cost.

```
Material = unit_cost (flat, quantity ignored)
Labour   = fixed hours from template (quantity ignored)
```

Both get standard markups applied.

**Used for:** PIV units, loft hatches, other fixed-price installations.

#### 6. Tiered Disposal

Subcontractor disposal with tiered pricing and zero labour.

```
If quantity = 0: cost = 0
If quantity <= threshold (default 20): cost = min_charge (default 40)
If quantity > threshold: cost = per_bag_rate (default 2) x quantity
```

Labour is always zero. Material markup is applied to the cost.

**Example:** 10 bags = 40 x 1.30 markup = 52. 30 bags = 30 x 2 x 1.30 = 78.

**Used for:** Licensed waste disposal.

#### 7. Bag and Cart

Per-bag debris removal with both material and labour components.

```
Material = quantity x material_cost_per_bag (default 1.00)
Labour   = quantity x hours_per_bag (default 0.01, approx 36 seconds)
```

Standard markups applied to both.

**Used for:** Debris bagging and carting.

#### 8. Skip Hire

Reads the skip cost from pricing config rather than from the template.

```
Material = pricing_config['skip_hire_8yd_cost'] x quantity
Labour   = 0
```

Material markup applied. No labour component.

**Used for:** 8-yard skip hire.

### Override Chain

Every calculation follows a cascading fallback for its parameters:

```
Line input overrides  -->  Template field value  -->  Pricing config default  -->  Hardcoded fallback
```

For example, the wastage factor for a line is determined by:
1. `input.overrides.wastage_factor` (if provided)
2. `template.wastage_factor` (if set on the template)
3. `config['default_wastage_factor']` (from pricing config)
4. `1.10` (hardcoded fallback)

This means individual templates can have their own wastage/markup values that differ from the global defaults, and per-line overrides can further customise on a case-by-case basis.

---

## Survey-to-Costing Data Flow

### Mapping Layer

The mapping layer transforms room-by-room survey data into arrays of `LineInput` objects that the pricing engine can calculate. This is where the system aggregates measurements across all rooms.

**How it works:**

1. The mapper identifies which survey types are present (a single survey can contain damp rooms, condensation rooms, timber rooms, and woodworm rooms).
2. For each survey type, it iterates through all rooms with that issue and aggregates quantities.
3. It maps aggregated quantities to specific costing templates using a lookup of `section_key:line_key` to `template_id`.
4. Only items with positive quantities are emitted.

**Damp mapping aggregates:**
- Radiator, socket, skirting removal counts
- Wallpaper stripping, plaster strip-out, stud wall removal areas
- DPC injection length and wall depth (depth taken from first room with DPC)
- Wall membrane area by height variant (1m, 1.2m, 2m)
- Cementitious tanking area (dubbing coat + slurry + renovating plaster)
- Floor resin area (primer + topcoat + grip grit)
- Plastering area (stud walls, plasterboard, skim, Warmline IWI)
- Difficulty hours, fillet joints

**Condensation mapping aggregates:**
- PIV unit type and count (loft heated/unheated, wall mounted)
- Loft hatch (new or enlarge — mutually exclusive)
- Extraction fans, passive vents, C-vents, core holes per room
- Ducting components (flexible, rigid, elbows, connectors, grilles, adaptors, bends)
- Mould treatment area (estimated by severity: light 3m2, moderate 6m2, severe 12m2)

**Timber mapping aggregates:**
- Fungal treatment area
- Flooring area by type (different template per flooring material)
- Masonry preparation (grinding, wire scrub, sterilant, protective treatment)
- Joist counts by size (4x2, 5x2, 6x2, etc. mapped to specific line keys)
- Accessories (endwrap, wall plates, bower beams, flitch plates)
- Sub-floor clearance, staircase steps

**Woodworm mapping:** Similar pattern to timber, with woodworm-specific treatment items.

### Multi-Type Surveys

A single survey can span multiple issue types. The mapping layer handles this by:

1. Processing each survey type independently.
2. Appending type-specific additional works (e.g., condensation PIV settings, timber joist entries).
3. Appending shared additional works (airbricks, asbestos testing, plastering extras) to the primary survey type only (not duplicated).
4. Generating site preparation items once for the whole job.

### Site Preparation

Site preparation items are job-level (emitted once, not per room or per survey type):

| Item | Logic |
|------|-------|
| Skip hire | From `additional_works.skip_count` |
| Antinox floor protection | Only if damp, timber, or woodworm present (NOT condensation-only) |
| Bag and cart debris | Combined bags from ALL survey types |
| Licensed disposal | Only if NO skip hired AND bags > 0 (mutually exclusive with skip) |

**Debris bag calculation:** `CEIL(strip_out_area x 2 bags/m2)` for damp; `CEIL(flooring_area x 2)` for timber.

---

## Costing Review Page

**URL:** `/survey/{projectId}/costing`

This is where the surveyor or admin reviews the auto-calculated costs after completing the survey wizard.

### What the Page Shows

1. **Site Preparation and Logistics** — job-level items (skip hire, floor protection, debris removal).
2. **Survey Type Tabs** — if the survey spans multiple types (e.g., Damp + Condensation), each type gets its own tab.
3. **Section Cards** — within each tab, one card per costing section containing:
   - Line item table: Description, Quantity, Material cost, Labour cost (with hours), Line total.
   - Section subtotal row.
   - Section adjustment input (percentage).
   - Optional badge and include/exclude toggle (for optional sections).
4. **Project Specific Overheads** — travel labour and vehicle mileage costs.
5. **Job Cost Summary** — sticky footer always visible while scrolling.

### Section Adjustments

Each section has a percentage adjustment input. Positive values increase the section total; negative values decrease it.

- The adjustment is percentage-based and additive (e.g., +10% on a 1000 section = 1100).
- Changes are **debounced** (750ms delay) before saving to the database, but the UI updates immediately.
- Adjustments are stored in `costing_section_adjustments` keyed by section_key.

### Optional Sections

Some sections are marked as optional in the database (`costing_sections.is_optional = true`). These show:

- An amber **Optional** badge on the section header.
- A toggle switch: **Included** / **Excluded**.
- When excluded, the section content dims to 40% opacity and the cost is removed from the optional works total.
- The inclusion state is saved immediately to the database (no debounce).
- Default state for a section with no saved record is **included**.

### Project Specific Overheads

Travel and vehicle costs calculated after the pricing engine runs, using total labour hours from all survey types combined.

**Constants:**
- Productive hours per day: 6.5
- Average travel speed: 30 mph

**Calculation:**

```
Labour days      = ROUNDUP(total_labour_hours / 6.5 / num_men)
Round trip miles  = distance_from_office x 2
Travel hours     = labour_days x (round_trip_miles / 30) x num_men
Travel labour    = travel_hours x hourly_labour_rate
Vehicle mileage  = labour_days x round_trip_miles x vehicle_cost_per_mile
Overhead total   = travel_labour + vehicle_mileage
```

One vehicle is always assumed regardless of crew size. Travel hours scale with crew size (each person travels). If distance is zero or num_men is zero, overheads are zero.

### Grand Total Calculation

The sticky footer shows the full cost breakdown:

```
Mandatory Works     = SUM of all non-optional section totals (with adjustments applied)
Optional Works      = SUM of included optional section totals (with adjustments applied)
Combined Works      = Mandatory + Optional (included)
PSO                 = Travel labour + Vehicle mileage
Subtotal (exc VAT)  = Combined Works + PSO
VAT                 = Subtotal x vat_rate (from pricing_config)
Total (inc VAT)     = Subtotal + VAT
Deposit Required    = Total inc VAT x highest deposit % among active survey types
Balance Due         = Total inc VAT - Deposit
```

---

## Quotation Generation

Clicking **Generate Quotation** on the costing review page creates a frozen snapshot of all calculated costs. This is a one-way operation that captures the current state.

**What happens:**

1. All cost totals (mandatory, optional, PSO, VAT, grand total, deposit) are posted to the API.
2. Each section's material total, labour total, and section total are posted (with adjustments already baked in).
3. The API creates a `quotations` row with:
   - Auto-generated quotation number (DB trigger)
   - Auto-calculated valid-until date
   - Customer name, address, site address (denormalised snapshot)
   - Surveyor name and qualifications
   - Company details and terms
   - Status: `draft`
4. One `quotation_sections` row per section with frozen costs.
5. A notification is sent to admin/office users.
6. The linked enquiry status auto-transitions to `quoted`.

**Versioning:** If quotations already exist for a survey, a new version is created (version N+1). Previous versions are preserved.

**Quotation status workflow:** `draft` > `sent` > `viewed` > `accepted` / `declined`

**Key principle:** Quotations contain frozen costs. Changing pricing config, material costs, or templates after a quotation is generated does NOT retroactively update existing quotations. Only new quotations (or new versions) pick up updated pricing.

---

## CF CSV Export

The costing review page includes a **Download CF CSV** button that exports the costing data in a format compatible with Contractor Foreman's CSV upload feature.

**How it works:**

- Internal section keys are mapped to the exact CF section names from the original Excel workbooks.
- Each section produces two bundle rows: one for Materials and one for Labour.
- Cost codes match the workbook convention (e.g., "Damp Materials" / "Damp Labour").
- Sections with zero cost are excluded.
- Optional sections carry an `Is Optional = Yes` flag.
- Project Specific Overheads are appended as the last section.
- The file includes a UTF-8 BOM for Excel compatibility.

**Multi-type survey handling:** A priority order (damp > timber > woodworm > condensation) determines the primary type, which sets the cost code prefix and section ordering.

**Section mapping highlights:**
- Damp has 13 CF sections (3 optional: Drains, Aquaban, Asbestos Testing).
- Condensation has 11 CF sections (4 optional: Joinery Ducting, Loft Hatch New, Loft Hatch Enlarge, Asbestos Testing).
- Timber has 9 CF sections (all mandatory).
- Woodworm has 5 CF sections (all mandatory).
- The plastering section is split into "Plastering & finishing" (non-Warmline items) and "Warmline Internal Wall Insulation" (Warmline items) for damp and timber types.
- Site preparation items route into either the survey type's stripping-out section or into PSO (skip hire).

---

## Database Tables

### pricing_config

Global pricing parameters. 14 rows, each with `config_key` (text), `config_value` (numeric), `updated_at` (timestamp).

### materials_catalog

Supplier product database. Key fields: `id`, `name`, `category`, `product_key` (unique, nullable), `unit_cost`, `unit`, `coverage_m2`, `unit_size`, `supplier`, `supplier_url`, `is_active`, `created_at`, `updated_at`.

Active materials (34 products) are loaded into a lookup map by the pricing engine. Deactivated materials (`is_active = false`) are preserved for historical reference but excluded from new calculations.

### costing_sections

44 sections across 5 survey types (damp, condensation, timber, woodworm, site_preparation). Key fields: `id`, `survey_type`, `section_key`, `section_name`, `display_order`, `is_optional`.

### costing_line_templates

220 line item templates. Key fields: `id`, `section_id` (FK to costing_sections), `line_key`, `description`, `uom`, `cost_formula` (one of 11 types), `base_unit_cost`, `labour_rate_per_unit`, `coverage_rate`, `wastage_factor`, `material_markup`, `labour_markup`, `formula_params` (JSONB), `is_active`, `display_order`.

### costing_section_adjustments

Per-survey section adjustments and inclusion overrides. Key fields: `survey_id`, `section_key`, `survey_type`, `adjustment_pct` (numeric), `is_included` (boolean). Upsert on conflict by (survey_id, section_key, survey_type).

### quotations

Frozen quotation snapshots. Contains all cost totals, customer/surveyor/company details, status, engagement tracking (view count, sent/accepted/declined timestamps), share token for public access, validity period.

### quotation_sections

One row per section in a quotation. Contains frozen material_total, labour_total, section_total, is_optional, is_included flags.

---

## Common Tasks

### Updating the labour rate

1. Go to `/admin/rates`.
2. Change the **Base Hourly Rate** field.
3. The effective rate recalculates in real time.
4. Click **Save Changes**.
5. All future costings use the new rate. Existing quotations are unaffected.

### Updating a material price

1. Go to `/admin/materials`.
2. Find the material (search or filter by category).
3. Click the edit icon.
4. Change the **Unit Cost** field.
5. Save. The banner shows which templates will pick up the new price.
6. All future costings referencing this material via its product_key use the updated cost.

### Adding a new material

1. Go to `/admin/materials` and click **Add Material**.
2. Fill in name, category, unit, and unit cost (required).
3. Set a **product key** if this material needs to be referenced by costing templates (e.g., `sbr_latex_5ltr`).
4. Save.
5. To use the material, update the relevant costing template's `formula_params.product_key` on the Costing Templates page.

### Changing a template's pricing

1. Go to `/admin/costing`.
2. Select the survey type tab.
3. Expand the relevant section.
4. Edit the template fields inline (unit cost, labour hours, wastage, markups, coverage).
5. For DPC/tiered/bag-and-cart formulas, edit the formula-specific parameters.
6. Click **Save Changes** (button shows count of modified templates).

### Deactivating a template

1. Go to `/admin/costing`.
2. Find the template.
3. Uncheck the **Active** checkbox.
4. Save. The template will be skipped in all future calculations.

### Adjusting a specific survey's section cost

1. Go to the survey's costing page (`/survey/{id}/costing`).
2. Find the section.
3. Enter a percentage in the **Section Adjustment %** field (e.g., `-10` for a 10% discount, `15` for a 15% uplift).
4. The adjustment saves automatically after 750ms. The total updates immediately.

### Excluding an optional section from a quotation

1. Go to the survey's costing page.
2. Find the section with the amber **Optional** badge.
3. Click the toggle to **Excluded**.
4. The section dims and its cost is removed from the totals.
5. Generate the quotation — the excluded section will appear but be marked as excluded.

### Re-generating a quotation with updated prices

1. Update pricing config, materials, or templates as needed.
2. Go to the survey's costing page — costs recalculate from current data.
3. Click **Generate Quotation**. A new version is created (previous versions preserved).

---

## Important Rules and Edge Cases

1. **Existing quotations are never retroactively updated.** Changing pricing config, material costs, or templates only affects future calculations. To apply new prices to an existing survey, re-generate the quotation (creates a new version).

2. **Wastage is applied before markup.** Material cost is inflated by wastage first, then markup is applied on top. For example: 100 base x 1.10 wastage x 1.30 markup = 143.

3. **Coverage formulas round UP.** `CEIL(area / coverage_rate)` means 7m2 at 5m2 coverage = 2 units, not 1.4. This ensures enough material is ordered.

4. **DPC injection uses wall depth from the first room only.** If multiple rooms have DPC work, the wall depth (brick count) is taken from whichever room is processed first. Length is accumulated across all rooms.

5. **Skip hire and licensed disposal are mutually exclusive.** If the survey has any skips (`skip_count > 0`), licensed disposal is not emitted even if there are debris bags.

6. **Loft hatch new and enlarge are mutually exclusive.** Only one can be selected per survey.

7. **Condensation-only surveys skip site preparation.** Antinox floor protection is not emitted for surveys that only have condensation issues (no damp, timber, or woodworm).

8. **Shared additional works are appended to the primary survey type only.** Items like airbricks and asbestos testing appear once, not duplicated across types.

9. **Deposit uses the highest percentage.** For a damp + condensation survey, if damp deposit is 30% and condensation is 20%, the quotation uses 30%.

10. **Compound materials fail silently on missing components.** If a component's product_key is not found in the materials catalogue, it contributes 0 to the cost (no error raised).

11. **Soft-deleted materials preserve pricing history.** Deactivated materials remain in the database for historical accuracy but are excluded from the active material lookup used in new calculations.

12. **Section adjustment percentages are additive, not multiplicative.** A -10% adjustment on a 1000 section = 900, not 1000 x 0.9.

13. **One vehicle for travel overhead.** Regardless of crew size, only one vehicle's mileage is costed. Travel labour hours do scale with crew size.

14. **Productive hours per day = 6.5.** This is used to convert total labour hours into working days for the travel overhead calculation.

15. **The `minimum_quantity` parameter** on standard formula templates sets a floor on the billed quantity (e.g., ducting minimum 2.4m even if only 1m is needed).

16. **The `minimum_labour_hours` parameter** on coverage formula templates sets a floor on labour (e.g., Aquaban minimum 2.7 hours regardless of area).
