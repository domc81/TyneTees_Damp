# CF CSV Upload & Customer Summary Audit Report

**Date:** 2026-02-28
**Auditor:** Claude (automated workbook analysis via openpyxl)
**Workbooks Analysed:**
- Damp Costing v48 CF - 220126.xlsm
- Condensation PIV Costing v37 CF - 131125.xlsm
- Timber Costing v34 - CF - 220126.xlsm
- Woodworm Costing v26 - CF Version - 220126.xlsm

**Purpose:** Compare the workbook CF CSV Upload and Customer Summary sheets (the ground truth for customer-facing output) with our app's costing page to identify structural gaps, missing features, and pricing flow differences.

---

## 1. CF CSV UPLOAD — FULL STRUCTURE (Identical Across All 4 Workbooks)

### Column Layout

| Col | Header | Purpose |
|-----|--------|---------|
| A | Section | Customer-visible section name (from Customer Summary) |
| B | Section Description | (unused in most rows) |
| C | Item Name | Line item description |
| D | Quantity | From Costing sheet (formula ref) |
| E | Unit Cost | From Costing sheet (formula ref) — **raw cost, no markup** |
| F | Unit | Hours, Each, M², LM, Bags, Miles |
| G | Cost Code | e.g. "Damp Materials", "Damp Labour" |
| H | Markup | Percentage as integer (30 = 30%, 100 = 100%) |
| I | Markup Type | Always "%" |
| J | Item Type | **MTL**, **LBR**, or **Other** |
| K | Is Taxable | Always "Yes" |
| L | Is Optional | Yes/No — **drives customer quotation columns** |
| M | Assigned To | "Preservation Shop" if MTL, empty if LBR |
| **N** | **CF IGNORE - LINE VALUE** | **D × E** (raw qty × unit cost, BEFORE markup) |
| **O** | **CF IGNORE - Zero value Validation** | "DELETE" or "LEAVE" |
| **P** | **CF IGNORE - CUSTOMER SUMMARY PRICE** | **N × (1 + H/100)** — price AFTER markup |
| **Q** | **CF IGNORE - INCLUDE IN SUMMARY** | **Yes = customer sees it, No = hidden** |

Columns N–Q are labelled "CF IGNORE" — they are **not uploaded** to the CF system. They exist purely to feed the Customer Summary sheet.

### Row Counts Per Workbook

| Workbook | Rows | Cols |
|----------|------|------|
| DAMP | 188 | 17 |
| CONDENSATION | 97 | 17 |
| TIMBER | 173 | 20 |
| WOODWORM | 121 | 17 |

---

## 2. BUNDLING LOGIC — How Individual Lines Map to Customer-Visible Sections

Every section follows the **exact same pattern**:

```
Individual MTL lines (Q=No)   ← raw material items, hidden from customer
Individual LBR lines (Q=No)   ← matching labour items, hidden from customer
BUNDLE MTL row (Q=Yes)         ← N = SUM(individual MTL N values)
                                  P = SUM(individual MTL P values)
BUNDLE LBR row (Q=Yes)         ← N = SUM(individual LBR N values)
                                  P = SUM(individual LBR P values)
[blank separator row]
```

**The customer ONLY sees Q=Yes bundle rows.** Individual items are completely hidden.

For each section, the customer sees **two line items**:
- `"{Section Name} - Materials"` (type MTL, Q=Yes)
- `"{Section Name} - Labour"` (type LBR, Q=Yes)

### DAMP Sections (13 sections)

1. Stripping out of items as required to proceed with works
2. Walls (Install membrane system)
3. Cementitious tanking system
4. Floor - Liquid Resin floor Membranes
5. Plastering & finishing
6. Warmline Internal Wall Insulation
7. Floor Joists & Floor Decking
8. Airbricks
9. Spray treatments
10. Drains (**Optional**)
11. External Wall - Aquaban Water Repellent Treatments (**Optional**)
12. Asbestos Testing (**Optional**)
13. Project Specific Overheads

### CONDENSATION Sections (12 sections)

1. Condensation control: Supply and install Loft Dryaire system & required accessories
2. Condensation control: Supply and install Wall Mounted Dryaire system & required accessories
3. Condensation control: Supply and install Trickle & Boost Fan
4. Condensation control: Supply and install Dryaire Cpass Insulated Pullcord Passive Vent
5. Condensation control: Supply and install Dryaire CVent
6. Airbricks
7. Joinery: Supply and fit boxwork for ducting (**Optional**)
8. New hatch and ladder (**Optional**)
9. Loft opening: Enlarge existing loft opening (**Optional**)
10. Remedial treatments: Mould treatment
11. Asbestos Testing (**Optional**)
12. Project Specific Overheads

### TIMBER Sections (10 sections)

1. Stripping out of items as required to proceed with works
2. Walls (Install membrane system)
3. Cementitious tanking system
4. Floor - Liquid Resin floor Membranes
5. Plastering & finishing
6. Warmline Internal Wall Insulation
7. Floor Joists & Floor Decking
8. Timber Treatments
9. Airbricks
10. Project Specific Overheads

### WOODWORM Sections (6 sections)

1. Stripping out of items as required to proceed with works
2. Plastering & finishing
3. Floor Joists & Floor Decking
4. Timber Treatments
5. Airbricks
6. Project Specific Overheads

---

## 3. CUSTOMER SUMMARY SHEET STRUCTURE

### Layout (identical across all 4)

| Row | Col B | Col C | Col D | Col E | Col F |
|-----|-------|-------|-------|-------|-------|
| 2 | | Customer Pricing Summary | | | |
| 3 | # | Area of Works | Optional Item? | Price (excl optional) | Price (incl optional) |
| 4+ | 1,2,3... | Section names | Yes/No | Price or "Optional" | Price or "n/a" |
| | | **Sub Total** | | SUM(E4:Exx) | SUM(F4:Fxx) |
| | | **VAT at 20%** | | SubTotal x 0.2 | SubTotal x 0.2 |
| | | **Total** | | SubTotal + VAT | SubTotal + VAT |
| | | **Deposit at X%** | Ex. VAT | (Inc.VAT / 6) x 5 | |
| | | | Inc. VAT | Total x deposit% | |

### Key Formula for Section Totals

```
F column = SUMIFS('CF CSV Upload'!P:P,
                  'CF CSV Upload'!A:A, 'Customer Summary'!C<row>,
                  'CF CSV Upload'!Q:Q, "Yes")
```

**This means**: Sum all **column P** (customer prices WITH markup) from CF CSV Upload where the **section name matches** AND **Q = "Yes"**. This pulls both the Materials AND Labour bundle rows, giving a **combined total per section**.

### Deposit Rates

| Workbook | Deposit % |
|----------|-----------|
| DAMP | 30% |
| CONDENSATION | **50%** |
| TIMBER | 30% |
| WOODWORM | 30% |

---

## 4. COMPARISON WITH OUR COSTING PAGE

### What the Workbook Customer Summary Shows

- Section name only (no individual line items)
- Single combined price per section (materials + labour merged)
- Optional/mandatory toggle per section
- Two price columns: "Without optional items" vs "With optional items"
- Sub Total -> VAT (20%) -> Total -> Deposit

### What Our Costing Page Shows

- Individual line items within each section
- Per-line breakdown: Description, Quantity, Material cost, Labour cost, Total
- Section subtotals with material/labour split
- Section adjustment % slider
- Grand total: Materials Total + Labour Total + Adjustments + PSO + VAT

### Gap Analysis

| Feature | Workbook | Our App | Gap? |
|---------|----------|---------|------|
| Individual line items | Hidden from customer | Visible | Different purpose (our page is admin view) |
| Material/Labour split per section | **Combined into one price** | Shown separately | Our admin view is more detailed (appropriate) |
| Optional items per section | Yes/No toggle | **Not implemented** | **MISSING** |
| Deposit calculation | Shown (30% or 50%) | **Not shown** | **MISSING** |
| "Price With/Without Optionals" | Two columns | **Not implemented** | **MISSING** |
| Section adjustments | Not visible to customer | Visible to admin | Our feature, not in workbook |
| Skip hire in PSO | **Included with 30% markup** | **NOT included** | **GAP** |
| PSO as customer section | Single line in summary | Single line total | Matches |
| VAT calculation | SubTotal x 0.20 | SubTotal x 0.20 | Matches |

### Verdict

Our costing page serves as an **internal admin/surveyor review tool**, not a customer-facing quotation. The workbook's Customer Summary is a **customer quotation**. These serve different purposes, which is correct. However, we are missing the customer-facing quotation view entirely, and we are missing some features that would be needed for it.

---

## 5. PROJECT SPECIFIC OVERHEADS (PSO)

### Structure (identical across all 4 workbooks)

The PSO section has **3 sub-items** (all Q=No, hidden from customer):

| # | Item | Type | Qty Formula | Unit Cost | Markup |
|---|------|------|-------------|-----------|--------|
| 1 | **Skips** | Other | From Costing (skip count) | £270.00 | **30%** |
| 2 | **Vehicle Costs (Fuel)** | Other | `days x distance x 2` (round trip miles) | £0.50/mile | **0%** |
| 3 | **Travel Costs for Tradesmen** | LBR | Travel hours from Costing | £30.63/hr | **0%** |

Bundled into **2 customer-visible lines** (Q=Yes):
- **PSO - Materials**: `N = SUM(Skips + Vehicle)`, `P = SUM(Skips_marked_up + Vehicle_at_cost)`
- **PSO - Labour**: `N = Travel hours x rate`, `P = same (0% markup)`

### Vehicle Cost Formula (from Costing sheet)

```
D (miles) = days_on_site x distance_one_way x 2
E (rate)  = £0.50/mile (from pricing_config)
```

### Travel Labour Formula (from Costing sheet)

```
D (hours) = days_on_site x (distance x 2 / 30mph) x num_men
E (rate)  = £30.63/hr (hourly_labour_rate)
```

### Comparison with Our travel-overhead.ts

Our implementation matches the **travel + vehicle** logic correctly:
- `labourDays = ROUNDUP(total_hours / 6.5 / num_men)` — **matches**
- `travelHours = days x (roundTrip / 30) x numMen` — **matches**
- `vehicleMileageCost = days x roundTrip x costPerMile` — **matches**

**HOWEVER, our PSO is MISSING:**
- **Skip hire** is not included in our PSO calculation
- In the workbook, skip hire (Qty x £270 x 1.30 markup) is part of PSO
- Skip hire and Vehicle Costs are both treated as "Materials" in the PSO bundle
- Travel is treated as "Labour" in the PSO bundle

### Skip Hire Markup Note

Skip hire has **30% markup** in the CF CSV Upload, but vehicle and travel have **0% markup**. Our `calcSkipHire` function applies the default material markup (30%), which matches. But skip hire results are not routed into the PSO section — they would appear as a separate costing section.

---

## 6. MARKUP / PRICING FLOW

### Flow Diagram

```
COSTING SHEET
  |-- Material: base_unit_cost (some with wastage in cell formula)
  |-- Material markup (col J): typically 0.30 (30%)
  |-- Labour hours (col O): per formula type
  |-- Labour rate (col P/Q): hourly_labour_rate
  |-- Labour markup (col R): typically 1.00 (100%)
       |
       v
CF CSV UPLOAD
  |-- D = Quantity (from Costing)
  |-- E = Unit Cost (from Costing — RAW, no markup)
  |-- H = Markup % (from Costing, x100 for display)
  |-- N = D x E  <-- LINE VALUE (before markup)
  |-- P = N x (1 + H/100)  <-- CUSTOMER PRICE (after markup)
  |-- Q = Yes/No  <-- include in customer summary
       |
       v
CUSTOMER SUMMARY
  |-- Per section: SUMIFS(P where A=section AND Q=Yes)
  |-- Sub Total = SUM(all sections)
  |-- VAT = SubTotal x 0.20
  |-- Total = SubTotal + VAT
  |-- Deposit = Total x rate (30% or 50%)
```

### Key Finding: Markup Applied at CF CSV Upload Level

- The Costing sheet stores **raw costs** and **markup percentages separately**
- Markup is applied at the **CF CSV Upload** level via `P = N x (1 + H/100)`
- This happens **per individual line item**, not per section
- Bundle rows then SUM the already-marked-up P values
- There are **NO additional markups** in the CF CSV Upload beyond column H
- **Section adjustment %** (our feature) does NOT exist in the workbook at all

### CRITICAL: Condensation Has Different Markups

| Item | Material Markup | Labour Markup | Labour Rate |
|------|----------------|---------------|-------------|
| Loft Dryaire unit | **40%** | **400%** | **£29.10** (not £30.63) |
| Wall Mounted Dryaire | **40%** | **300%** | £30.63 |
| Trickle & Boost Fan | 30% | 100% | £30.63 |
| Dryaire Cpass | 30% | 100% | £30.63 |
| Dryaire CVent | 30% | 100% | £30.63 |
| Airbricks | 30% | 100% | £30.63 |
| Mould treatment | 30% | 100% | £30.63 |
| Joinery/boxwork | 30% | 100% | £30.63 |

This is a significant difference from all other workbooks where markups are uniform. Our `costing_line_templates` would need per-template markup overrides for these condensation items.

---

## 7. SUMMARY OF GAPS

### Must-Have for Customer-Facing Output

| # | Gap | Severity | Notes |
|---|-----|----------|-------|
| 1 | **Optional items** — sections can be marked Yes/No for customer inclusion | HIGH | Drives two-column pricing on customer quotation |
| 2 | **Deposit calculation** — 30% or 50% depending on survey type | HIGH | Required on quotation output |
| 3 | **Customer quotation view** — section-level totals only (not line items) | HIGH | Separate view from admin costing page |
| 4 | **Skip hire in PSO** — currently excluded from our overhead calculation | MEDIUM | Skip hire calculated by pricing engine but not routed to PSO |
| 5 | **Two price columns** — "With optionals" vs "Without optionals" | MEDIUM | Needed for customer quotation |

### Pricing Accuracy Issues

| # | Gap | Severity | Notes |
|---|-----|----------|-------|
| 6 | **Condensation markup anomalies** — PIV units need 40% material / 300-400% labour markups | HIGH | Different hourly rate too (£29.10 for loft units) |
| 7 | **PSO markup handling** — skip hire 30%, vehicle/travel 0% | LOW | Need to verify our implementation matches |

### Structural Differences (Acceptable)

| # | Difference | Assessment |
|---|-----------|------------|
| 8 | Our costing page is an admin review tool, not a customer quotation | Correct — different purpose |
| 9 | Section adjustments are our feature, not in the workbook | Value-add for admin flexibility |
| 10 | Workbook CF CSV Upload is a data-feed format, not a UI | Our UI does not need to replicate it |
