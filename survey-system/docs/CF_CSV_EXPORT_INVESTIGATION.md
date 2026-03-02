# CF CSV Export Investigation Report — Damp Costing v48

**Date:** 2026-03-01
**Source:** `Damp Costing v48 CF - 220126.xlsm`
**Purpose:** Understand EXACTLY what gets exported to Contractor Foreman so we can replicate it.

---

## 1. VBA/MACRO CODE — Complete Export Mechanism

### 1.1 The Export Button (Sheet1 = Costing sheet)

The CSV export is triggered by `CommandButton1_Click()` on the Costing sheet (Sheet1). Here is the full code:

```vba
Private Sub CommandButton1_Click()

Application.DisplayAlerts = True

' ###################################################
' Set Password (for removing from the datalist sheet)
Dim xPsw As String
    xPsw = "window"

'Remove Password on Data Lists tab
ThisWorkbook.Sheets("Data Lists").Unprotect xPsw
'Set new time to give a specific file name
ThisWorkbook.Sheets("Data Lists").Range("B68").Value = Format(Now(), "dd-mm-yy-hh-mm-ss")
'Re-apply Password on Data Lists tab
ThisWorkbook.Sheets("Data Lists").Protect xPsw

' ###################################################

'Set file name
Dim file_name As String
file_name = ThisWorkbook.Sheets("Data Lists").Range("b69")

'Get current folder
Dim current_folder As String
current_folder = ThisWorkbook.Path

'Get full file name
Dim filename_plus_path As String
filename_plus_path = current_folder & "/" & file_name

'Get Validation Status
Dim validation_status As String
validation_status = ThisWorkbook.Sheets("Costing").Range("E1")

If validation_status = "SHEET COMPLETE" Then

    ' Save file
    ThisWorkbook.Sheets("CF CSV Upload").Copy
    ActiveWorkbook.SaveAs Filename:=(filename_plus_path), _
    FileFormat:=xlCSVUTF8, _
    CreateBackup:=False

    'DELETE SECTIONS WITH ZERO VALUE
    'Unprotect sheet for deleting rows
    ActiveSheet.Unprotect xPsw

    'Remove formulas and replace with values to prevent errors when deleting rows
    ActiveSheet.UsedRange.Value = ActiveSheet.UsedRange.Value

    Dim rng As Range
    Set rng = ActiveSheet.Range("O1:O500")
    For i = rng.Cells.Count To 1 Step -1
        If rng.Item(i).Value = "DELETE" Then
            rng.Item(i).EntireRow.Delete
        End If
    Next i

    'Re-protect sheet for deleting rows
    ActiveSheet.Protect xPsw

    ActiveWorkbook.Save
    ActiveWorkbook.Close
    Application.DisplayAlerts = True

Else
    MsgBox "CANNOT CREATE CSV IMPORT - PLEASE COMPLETE THE SHEET FULLY"
End If

End Sub
```

### 1.2 Step-by-Step Export Process

1. **Timestamp Generation:** Writes current datetime as `dd-mm-yy-hh-mm-ss` to `Data Lists!B68`
2. **Filename Construction:** `Data Lists!B69` = `CONCATENATE("CF-Damp-", B68)` → e.g. `CF-Damp-02-10-25-08-38-34`
3. **Validation Check:** Reads `Costing!E1` — must be `"SHEET COMPLETE"` or export is blocked
4. **Copy Entire Sheet:** `ThisWorkbook.Sheets("CF CSV Upload").Copy` — copies to a NEW workbook
5. **Save as CSV UTF-8:** `FileFormat:=xlCSVUTF8` — saves to same folder as workbook
6. **Flatten Formulas:** `ActiveSheet.UsedRange.Value = ActiveSheet.UsedRange.Value` — replaces all formulas with their calculated values
7. **Delete Zero-Value Rows:** Iterates column O (rows 1-500) bottom-up, deleting any row where O = `"DELETE"`
8. **Save & Close:** Saves the modified CSV and closes it

### 1.3 Key Export Behaviours

| Behaviour | Detail |
|-----------|--------|
| **File format** | CSV UTF-8 (`xlCSVUTF8`) |
| **Delimiter** | Comma (standard CSV from Excel) |
| **Filename pattern** | `CF-Damp-DD-MM-YY-HH-MM-SS` (no `.csv` extension in code — Excel adds it) |
| **Save location** | Same folder as the workbook |
| **Header row** | Yes — Row 1 is exported (column headers) |
| **Formula handling** | All formulas replaced with calculated values before row deletion |
| **Row filtering** | Column O: rows with `"DELETE"` are deleted; rows with `"LEAVE"` are kept |
| **Column filtering** | **NONE** — ALL 17 columns (A-Q) are exported, including the "CF IGNORE" columns N-Q |
| **Text quoting** | Standard Excel CSV quoting (commas in values get quoted) |
| **Validation gate** | Must have `Costing!E1 = "SHEET COMPLETE"` |

### 1.4 Critical Insight: CF IGNORE Columns ARE Exported

Despite the "CF IGNORE" label in column headers, **columns N-Q ARE included in the CSV file**. The label is a human instruction to Contractor Foreman to ignore those columns during import, NOT a programmatic exclusion. When CF imports the CSV, it presumably maps only columns A-M and ignores the rest.

---

## 2. CF CSV Upload Sheet — Complete Column Definitions

### 2.1 Exported Columns (A-M) — What CF Receives

| Col | Header | Description | Data Type | Example |
|-----|--------|-------------|-----------|---------|
| **A** | Section | Customer-visible section name | Text | `Walls (Install membrane system)` |
| **B** | Section Description | Only populated for PSO bundle rows | Text | `(May cover any or all of the following: Covers Health & Safety...)` |
| **C** | Item Name | Line item name | Text | `Wall membrane CM3 - 1mtr` |
| **D** | Quantity | Quantity (from Costing sheet formulas) | Number | `15` or `0` |
| **E** | Unit Cost | Base unit cost (from Costing sheet) | Number | `7.00`, `30.63` |
| **F** | Unit | Unit of measure | Text | `Each`, `M2`, `LM`, `Hours`, `Bags`, `Pairs`, `Miles`, `EACH` |
| **G** | Cost Code | CF cost category code | Text | `Damp Materials`, `Damp Labour`, `Travel Costs`, `Waste Removal` |
| **H** | Markup | Markup percentage (×100, so 30% = `30`) | Number | `30`, `100`, `15.4`, `0` |
| **I** | Markup Type | Always `%` | Text | `%` |
| **J** | Item Type | `MTL` (material), `LBR` (labour), or `Other` | Text | `MTL`, `LBR`, `Other` |
| **K** | Is Taxable | Always `Yes` | Text | `Yes` |
| **L** | Is Optional | `Yes` or `No` — only `Yes` on certain bundle rows | Text | `No` (mostly) |
| **M** | Assigned To | `Preservation Shop` if MTL, blank if LBR/Other | Text | `Preservation Shop` or blank |

### 2.2 Internal Columns (N-Q) — Exported But Ignored by CF

| Col | Header | Purpose |
|-----|--------|---------|
| **N** | CF IGNORE - LINE VALUE | `=D×E` (line value at cost) — used for bundle aggregation |
| **O** | CF IGNORE - Zero value Section Validation | `"DELETE"` or `"LEAVE"` — controls row deletion during export |
| **P** | CF IGNORE - LINE VALUE FOR CUSTOMER SUMMARY | `=N*(1+(H/100))` (line value with markup) — used for customer pricing |
| **Q** | CF IGNORE - INCLUDE PRICE IN CUSTOMER SUMMARY | `Yes` only on bundle rows, `No` on detail rows |

---

## 3. Row Structure and Filtering Logic

### 3.1 Three Row Types

The sheet has exactly **187 data rows** (rows 2-188) structured as:

| Row Type | Count | Description |
|----------|-------|-------------|
| **DETAIL** | 149 | Individual line items (MTL or LBR) — the actual work items |
| **BUNDLE** | 26 | Summary/aggregation rows (13 Materials + 13 Labour) — one pair per section |
| **SEPARATOR** | 12 | Blank rows between sections (only have O="DELETE") |

### 3.2 Section Pattern — How Each Section is Structured

Every section follows this exact pattern:

```
[DETAIL MTL rows]     — Material cost for each item (Qty from Costing, Unit Cost from Costing)
[DETAIL LBR rows]     — Labour cost for each item (Qty=hours, Unit Cost=hourly rate)
[BUNDLE MTL row]      — "Section Name - Materials" (Q=Yes, aggregates N column)
[BUNDLE LBR row]      — "Section Name - Labour" (Q=Yes, aggregates N column)
[SEPARATOR row]       — Blank row with O=DELETE
```

### 3.3 The DELETE/LEAVE Rule

**For DETAIL rows (Q=No):**
- Column O is a **static value**: always `"DELETE"`
- This means: if the detail row has zero quantity, it gets `"DELETE"` and will be removed from the CSV
- Wait — actually, looking more carefully, ALL detail rows have O="DELETE" as a static literal value, not a formula. This means **ALL detail rows are ALWAYS deleted from the export**.

**For BUNDLE rows (Q=Yes):**
- Column O is a **formula**: `=IF(N{row}=0,"DELETE","LEAVE")`
- This means: if the total cost for that section is zero, the bundle row is deleted. If the section has any cost, the bundle row is kept.

**For SEPARATOR rows:**
- Column O = `"DELETE"` (static)
- Always deleted.

### 3.4 Critical Finding: ONLY Bundle Rows Survive in the CSV

The export logic deletes ALL rows where O = "DELETE". Since:
- All 149 DETAIL rows have O = "DELETE" (static)
- All 12 SEPARATOR rows have O = "DELETE" (static)
- Only BUNDLE rows have O = formula (`=IF(N=0,"DELETE","LEAVE")`)

**Therefore: Contractor Foreman only ever receives the BUNDLE/SUMMARY rows — never the individual line items.**

The CSV that CF imports will contain AT MOST:
- 1 header row
- Up to 26 data rows (13 sections × 2 bundles each: Materials + Labour)

### 3.5 What a Bundle Row Contains

**Materials Bundle:**
- **A** (Section): Customer-visible section name
- **C** (Item Name): `"{Section Name} - Materials"`
- **D** (Quantity): Always `1` (it's a lump sum)
- **E** (Unit Cost): `=N{row}` — total raw material cost for the section (sum of all detail material costs)
- **F** (Unit): `EACH`
- **G** (Cost Code): `Damp Materials`
- **H** (Markup): Calculated from `((P-N)/N)*100` — effective blended markup percentage
- **J** (Item Type): `MTL`
- **L** (Is Optional): Pulled from Customer Summary D column (Yes/No per section)

**Labour Bundle:**
- **A** (Section): Customer-visible section name
- **C** (Item Name): `"{Section Name} - Labour"`
- **D** (Quantity): Sum of all detail labour hours for the section
- **E** (Unit Cost): `=N{row}/D{row}` — blended hourly rate (total cost ÷ total hours)
- **F** (Unit): `Hours`
- **G** (Cost Code): `Damp Labour`
- **H** (Markup): Calculated from `((P-N)/N)*100` — effective blended markup percentage
- **J** (Item Type): `LBR`
- **L** (Is Optional): Same as the Materials bundle for the section

---

## 4. Column Mapping — Exported Columns to CF Fields

When CF imports the CSV, it maps these columns:

| CF Import Field | Source Column | Notes |
|-----------------|---------------|-------|
| Section | A | Groups line items into sections |
| Section Description | B | Only on PSO rows |
| Item Name | C | The displayable item name |
| Quantity | D | 1 for materials (lump sum), hours for labour |
| Unit Cost | E | Raw cost before markup |
| Unit | F | EACH or Hours |
| Cost Code | G | CF's internal categorisation |
| Markup | H | Percentage (as whole number, e.g. 30 = 30%) |
| Markup Type | I | Always % |
| Item Type | J | MTL, LBR, or Other |
| Is Taxable | K | Always Yes |
| Is Optional | L | Yes/No |
| Assigned To | M | Preservation Shop or blank |

---

## 5. All Unique Cost Codes

| Cost Code | Row Count | Used On |
|-----------|-----------|---------|
| `Damp Materials` | 86 rows | All MTL detail + bundle rows |
| `Damp Labour` | 86 rows | All LBR detail + bundle rows |
| `Travel Costs` | 2 rows | Vehicle Costs (Other) + Travel Costs for Tradesmen (LBR) |
| `Waste Removal` | 1 row | Skips (Other) |

**Note:** In the final CSV export (bundle rows only), cost codes will be:
- `Damp Materials` — on all Materials bundle rows
- `Damp Labour` — on all Labour bundle rows (plus PSO Labour)
- `Travel Costs` — on PSO detail rows (if they survive — they don't, they're detail rows with O=DELETE)
- `Waste Removal` — on PSO Skip detail row (same — deleted)

**PSO is special:** The PSO bundle Materials row uses `Damp Materials` cost code, and the PSO bundle Labour row uses `Damp Labour` cost code. The Travel Costs and Waste Removal codes are only on detail rows that get deleted.

---

## 6. All Section Names (Column A — Customer-Visible)

| # | Section Name | Optional? | Detail Rows | Bundle Rows |
|---|--------------|-----------|-------------|-------------|
| 1 | Stripping out of items as required to proceed with works | No | 24 | 2 |
| 2 | Walls (Install membrane system) | No | 30 | 2 |
| 3 | Cementitious tanking system | No | 10 | 2 |
| 4 | Floor - Liquid Resin floor Membranes | No | 10 | 2 |
| 5 | Plastering & finishing | No | 14 | 2 |
| 6 | Warmline Internal Wall Insulation | No | 2 | 2 |
| 7 | Floor Joists & Floor Decking | No | 38 | 2 |
| 8 | Airbricks | No | 6 | 2 |
| 9 | Spray treatments | No | 4 | 2 |
| 10 | Drains | **Yes** | 4 | 2 |
| 11 | External Wall - Aquaban Water Repellent Treatments | **Yes** | 2 | 2 |
| 12 | Asbestos Testing | **Yes** | 2 | 2 |
| 13 | Project Specific Overheads | No | 3 | 2 |

---

## 7. Special Cases

### 7.1 Project Specific Overheads (PSO)

PSO is structurally different from other sections:

| Row | Item | Item Type | Cost Code | Special |
|-----|------|-----------|-----------|---------|
| 184 | Skips | Other | Waste Removal | Qty from Costing, unit cost = £270 |
| 185 | Vehicle Costs (Fuel) | Other | Travel Costs | Qty = distance × trips × 2 (return journey) |
| 186 | Travel Costs for Tradesmen | LBR | Travel Costs | Qty = travel hours, unit cost = £30.63 |
| 187 | **BUNDLE: PSO - Materials** | MTL | Damp Materials | Sums rows 184-185 (skips + fuel) |
| 188 | **BUNDLE: PSO - Labour** | LBR | Damp Labour | Mirrors row 186 (travel hours/rate) |

**Column B** is only populated on the PSO bundle rows (187-188) with:
`"(May cover any or all of the following: Covers Health & Safety, Tooling Equipment, Access Equipment, Specialist Equipment, Waste Removal & Disposal, Project Management Administration etc.)"`

### 7.2 Skip Hire

- Row 184: `Skips` — type `Other`, cost code `Waste Removal`, unit cost £270 per skip, markup 30%
- Gets aggregated into PSO bundle Materials row

### 7.3 Optional Items

Only 3 sections are marked optional (Is Optional = Yes on their bundle rows):
- **Drains** (both bundle rows)
- **External Wall - Aquaban Water Repellent Treatments** (both bundle rows)
- **Asbestos Testing** (both bundle rows)

The Optional flag is sourced from `Customer Summary!D{row}`.

### 7.4 "Stripping Out" Combines Two Workbook Sections

In the CF export, "Stripping out of items as required to proceed with works" combines what our database splits into:
- `preparatory_work` (rows 2-6, 14-18): radiators, sockets, skirting, wallpaper, antinox
- `strip_out` (rows 7-13, 19-25): plaster removal, stud walls, ceilings, timber floor, subfloors, bag debris, disposal

Both sections share the SAME section name in column A (from `Customer Summary!$C$4`).

### 7.5 Walls Section Combines Three Workbook Sub-Sections

In the CF export, "Walls (Install membrane system)" includes:
- DPC Traditional (row 29, 44)
- DPC Digital (row 30, 45)
- All membrane items (rows 31-43, 46-58)

Our database has these as 3 separate sections: `dpc_traditional`, `dpc_digital`, `wall_membrane`.

### 7.6 Floor Joists & Floor Decking Combines Two Sub-Sections

The CF section includes both joists (rows 110-131) and decking (rows 132-149).
Our database has these as one section `floor_joists_decking` which is correct.

### 7.7 Warmline Internal Wall Insulation

In the workbook, this is a separate CF section with its own bundle rows (107-108).
In our database, Warmline items (`warmline_iwi`, `warmline_iwi_adhesive`) are under the `plastering` section. **This is a mismatch.**

---

## 8. Cross-Reference: CF Sections → Our Database

### 8.1 Section Mapping

| CF Section Name (Col A) | Our section_key(s) | Match? |
|--------------------------|-------------------|--------|
| Stripping out of items as required to proceed with works | `preparatory_work` + `strip_out` | **MERGED** — CF bundles two of our sections into one |
| Walls (Install membrane system) | `dpc_traditional` + `dpc_digital` + `wall_membrane` | **MERGED** — CF bundles three of our sections into one |
| Cementitious tanking system | `cementitious_tanking` | ✅ Direct match |
| Floor - Liquid Resin floor Membranes | `floor_resin` | ✅ Direct match |
| Plastering & finishing | `plastering` | ⚠️ Match but our DB includes Warmline items that CF has as separate section |
| Warmline Internal Wall Insulation | Part of `plastering` in our DB | ⚠️ **Separate section in CF, merged in our DB** |
| Floor Joists & Floor Decking | `floor_joists_decking` | ✅ Direct match |
| Airbricks | `airbricks` | ✅ Direct match |
| Spray treatments | `spray_treatments` | ✅ Direct match |
| Drains | `drains` | ✅ Direct match |
| External Wall - Aquaban Water Repellent Treatments | `aquaban` | ✅ Direct match |
| Asbestos Testing | `asbestos_testing` | ✅ Direct match |
| Project Specific Overheads | `project_overheads` | ⚠️ Section exists but has **0 line templates** |

### 8.2 Items in CF Export Missing from Our Database

| CF Item | CF Section | Issue |
|---------|-----------|-------|
| Antinox HD Floor Protection Boards – 2.4m x 1.2m | Strip out | **Missing** — not in our `preparatory_work` or `strip_out` templates |
| Bag up debris & cart outside | Strip out | **Missing** — should have `bag_and_cart` formula |
| Disposal via licensed transfer agent | Strip out | **Missing** — should have `tiered_disposal` formula |
| Skips | Project Overheads | **Missing** — `project_overheads` section has 0 templates |
| Vehicle Costs (Fuel) | Project Overheads | **Missing** — not in any section |
| Travel Costs for Tradesmen | Project Overheads | **Missing** — not in any section |
| Warmline Internal Wall Insulation (as standalone) | Warmline IWI | **Misplaced** — exists in our DB under `plastering`, CF has it separate |

### 8.3 Items in Our Database Not Appearing in CF Export

None — all our 68 damp templates appear to have equivalents in the CF sheet.

### 8.4 Template Count Comparison

| Area | Our DB | CF Detail Rows | Notes |
|------|--------|---------------|-------|
| Preparatory Work | 4 items | 5 MTL + 5 LBR | CF has Antinox (we don't) |
| Strip Out | 5 items | 7 MTL + 7 LBR | CF has Bag & Cart, Disposal (we don't) |
| DPC Traditional | 1 item | 1 MTL + 1 LBR | Match |
| DPC Digital | 1 item | 1 MTL + 1 LBR | Match |
| Wall Membrane | 10 items | 13 MTL + 13 LBR | CF has 2m membrane split into #1/#2/#3 + subtotal rows |
| Tanking | 5 items | 5 MTL + 5 LBR | Match |
| Floor Resin | 5 items | 5 MTL + 5 LBR | Match |
| Plastering | 9 items (inc. Warmline) | 7 MTL + 7 LBR | CF has Warmline as separate section |
| Floor Joists/Decking | 19 items | 19 MTL + 19 LBR | Match |
| Airbricks | 3 items | 3 MTL + 3 LBR | Match |
| Spray Treatments | 2 items | 2 MTL + 2 LBR | Match |
| Drains | 2 items | 2 MTL + 2 LBR | Match |
| Aquaban | 1 item | 1 MTL + 1 LBR | Match |
| Asbestos | 1 item | 1 MTL + 1 LBR | Match |
| Project Overheads | 0 items | 3 detail rows | **Entirely missing from our DB templates** |

---

## 9. Other VBA Modules (Non-Export)

### 9.1 ThisWorkbook — Auto-Protect on Close

Protects all sheets with password "window" on close. Unprotects "Office Notes" sheet.

### 9.2 Sheet1 (Costing) — Section Zero Buttons

Each section has a button to zero out its quantities:
- `Preparation_Section_Zero_Click()` → zeros F21:F26
- `Stripout_Section_Zero_Click()` → zeros F29:F33,F36
- `Walls_Section_Zero_Click()` → zeros wall-related ranges + sets D42,E42 to "N/A"
- `Tanking_Section_Zero_Click()` → zeros F61:F66
- (etc. for all 14 sections)

### 9.3 Sheet5 (Report) — PDF Export + Spell Check

- `CommandButton1_Click()`: Exports Report sheet as PDF (validates via Report!J1 = "SHEET COMPLETE")
- Filename: `{CustomerName}-DAMP-REPORT-{timestamp}`
- `SpellCheck_Sheet_Click()`: Runs spell check on D16:Z912

### 9.4 Sheet6 (Access Email Template) — PDF Export

Similar to Report PDF export but for the Access Email Template sheet.

### 9.5 Module1 — Generic Spell Check

`ProtectSheetCheckSpellCheck()` — generic spell check on active sheet.

---

## 10. Implications for Our Export Feature

### 10.1 What We Need to Build

To replicate the CF CSV export, we need to:

1. **Generate bundle rows, not detail rows.** CF only receives 2 rows per section (Materials + Labour).

2. **Aggregate costs per section:**
   - Materials bundle: Qty=1, Unit Cost = total raw material cost for section
   - Labour bundle: Qty = total hours, Unit Cost = blended hourly rate (total labour cost ÷ total hours)

3. **Calculate blended markup:**
   - Materials: `((total_with_markup - total_raw) / total_raw) × 100`
   - Labour: same formula

4. **Map our section_keys to CF section names** (using the mapping in section 8.1 above — some of ours need to be combined).

5. **Handle the Optional flag** per section.

6. **Include PSO rows** — skips, vehicle costs, travel costs — currently missing from our templates.

### 10.2 Section Combining Rules

For the CF export, we need to combine:
- `preparatory_work` + `strip_out` → "Stripping out of items as required to proceed with works"
- `dpc_traditional` + `dpc_digital` + `wall_membrane` → "Walls (Install membrane system)"
- `plastering` (minus Warmline items) → "Plastering & finishing"
- Warmline items from `plastering` → "Warmline Internal Wall Insulation" (separate section)

### 10.3 Missing Data We Need

Before building the export:
1. Add Antinox, Bag & Cart, and Disposal templates to our DB
2. Add PSO templates (Skips, Vehicle Costs, Travel Costs) to our DB
3. Decide whether to split Warmline out of Plastering in our DB or handle it in the export mapping layer

### 10.4 CSV Format Specification

```
Section,Section Description,Item Name,Quantity,Unit Cost,Unit,Cost Code,Markup,Markup Type,Item Type,Is Taxable,Is Optional,Assigned To
Walls (Install membrane system),,Walls (Install membrane system) - Materials,1,245.50,EACH,Damp Materials,30,%,MTL,Yes,No,Preservation Shop
Walls (Install membrane system),,Walls (Install membrane system) - Labour,12.5,30.63,Hours,Damp Labour,100,%,LBR,Yes,No,
```

**Notes:**
- Column B (Section Description) is empty for all rows except PSO bundles
- Markup is a whole number (30 not 0.30)
- Unit for Materials bundles is always `EACH`
- Unit for Labour bundles is always `Hours`
- Assigned To = "Preservation Shop" for MTL rows, blank for LBR/Other

---

## Appendix A: All VBA Source Code

### ThisWorkbook.cls
```vba
Private Sub Workbook_BeforeClose(Cancel As Boolean)
    Dim xSheet As Worksheet
    Dim xPsw As String
    xPsw = "window"
    For Each xSheet In Worksheets
        xSheet.Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
    Next
    ThisWorkbook.Sheets("Office Notes").Unprotect xPsw
End Sub
```

### Sheet1.cls (Costing — CSV Export + Section Zero Buttons)
```vba
Private Sub CommandButton1_Click()
    Application.DisplayAlerts = True
    Dim xPsw As String
    xPsw = "window"
    ThisWorkbook.Sheets("Data Lists").Unprotect xPsw
    ThisWorkbook.Sheets("Data Lists").Range("B68").Value = Format(Now(), "dd-mm-yy-hh-mm-ss")
    ThisWorkbook.Sheets("Data Lists").Protect xPsw

    Dim file_name As String
    file_name = ThisWorkbook.Sheets("Data Lists").Range("b69")
    Dim current_folder As String
    current_folder = ThisWorkbook.Path
    Dim filename_plus_path As String
    filename_plus_path = current_folder & "/" & file_name

    Dim validation_status As String
    validation_status = ThisWorkbook.Sheets("Costing").Range("E1")

    If validation_status = "SHEET COMPLETE" Then
        ThisWorkbook.Sheets("CF CSV Upload").Copy
        ActiveWorkbook.SaveAs Filename:=(filename_plus_path), _
            FileFormat:=xlCSVUTF8, CreateBackup:=False
        ActiveSheet.Unprotect xPsw
        ActiveSheet.UsedRange.Value = ActiveSheet.UsedRange.Value

        Dim rng As Range
        Set rng = ActiveSheet.Range("O1:O500")
        For i = rng.Cells.Count To 1 Step -1
            If rng.Item(i).Value = "DELETE" Then
                rng.Item(i).EntireRow.Delete
            End If
        Next i

        ActiveSheet.Protect xPsw
        ActiveWorkbook.Save
        ActiveWorkbook.Close
        Application.DisplayAlerts = True
    Else
        MsgBox "CANNOT CREATE CSV IMPORT - PLEASE COMPLETE THE SHEET FULLY"
    End If
End Sub

Private Sub Preparation_Section_Zero_Click()
    ThisWorkbook.Sheets("Costing").Range("F21:F26").Value = 0
End Sub
Private Sub Stripout_Section_Zero_Click()
    ThisWorkbook.Sheets("Costing").Range("F29:F33,F36").Value = 0
End Sub
Private Sub Walls_Section_Zero_Click()
    ThisWorkbook.Sheets("Costing").Range("D40,E40,D44:D48,E46:E48,F53,D55:E55,F57:F58").Value = 0
    ThisWorkbook.Sheets("Costing").Range("D42,E42").Value = "N/A"
End Sub
Private Sub Tanking_Section_Zero_Click()
    ThisWorkbook.Sheets("Costing").Range("F61:F66").Value = 0
End Sub
Private Sub Floor_Resin_Section_Zero_Click()
    ThisWorkbook.Sheets("Costing").Range("F69:F74").Value = 0
End Sub
Private Sub Plastering_Section_Zero_Click()
    ThisWorkbook.Sheets("Costing").Range("F77:F85").Value = 0
End Sub
Private Sub Floor_Joists_Section_Zero_Click()
    ThisWorkbook.Sheets("Costing").Range("D89:D98,E89:E94,F99").Value = 0
End Sub
Private Sub Floor_Deck_Section_Zero_Click()
    ThisWorkbook.Sheets("Costing").Range("F101:F109").Value = 0
End Sub
Private Sub Airbricks_Section_Zero_Click()
    ThisWorkbook.Sheets("Costing").Range("F112:F115").Value = 0
End Sub
Private Sub Spray_Treatments_Section_Zero_Click()
    ThisWorkbook.Sheets("Costing").Range("F118:F120").Value = 0
End Sub
Private Sub Drains_Section_Zero_Click()
    ThisWorkbook.Sheets("Costing").Range("F123:F125").Value = 0
End Sub
Private Sub Aquaban_Section_Zero_Click()
    ThisWorkbook.Sheets("Costing").Range("F128:F129").Value = 0
End Sub
Private Sub Asbestos_Section_Zero_Click()
    ThisWorkbook.Sheets("Costing").Range("F132:F133").Value = 0
End Sub
Private Sub Skip_Hire_Section_Zero_Click()
    ThisWorkbook.Sheets("Costing").Range("F136").Value = 0
End Sub
```

### Sheet5.cls (Report — PDF Export + Spell Check)
```vba
Private Sub CommandButton1_Click()
    Dim xPsw As String
    xPsw = "window"
    ThisWorkbook.Sheets("Data Lists").Unprotect xPsw
    ThisWorkbook.Sheets("Data Lists").Range("B68").Value = Format(Now(), "dd-mm-yy-hh-mm-ss")
    ThisWorkbook.Sheets("Data Lists").Protect xPsw

    Dim file_name As String
    file_name = ThisWorkbook.Sheets("Data Lists").Range("b72")
    Dim current_folder As String
    current_folder = ThisWorkbook.Path
    Dim filename_plus_path As String
    filename_plus_path = current_folder & "/" & file_name

    Dim validation_status As String
    validation_status = ThisWorkbook.Sheets("Report").Range("J1")

    If validation_status = "SHEET COMPLETE" Then
        ActiveSheet.ExportAsFixedFormat Type:=xlTypePDF, _
            Filename:=filename_plus_path, IgnorePrintAreas:=False
    Else
        MsgBox "CANNOT CREATE REPORT - PLEASE COMPLETE THE SHEET FULLY"
    End If
End Sub

Sub SpellCheck_Sheet_Click()
    Dim xPsw As String
    xPsw = "window"
    With ActiveSheet
        .Unprotect xPsw
        .Range("D16:Z912").CheckSpelling
        .Protect xPsw, AllowFiltering:=True, DrawingObjects:=0, Contents:=True, AllowFormattingRows:=True
    End With
End Sub
```

### Sheet6.cls (Access Email Template — PDF Export)
```vba
Private Sub CommandButton1_Click()
    Dim xPsw As String
    xPsw = "window"
    ThisWorkbook.Sheets("Data Lists").Unprotect xPsw
    ThisWorkbook.Sheets("Data Lists").Range("B68").Value = Format(Now(), "dd-mm-yy-hh-mm-ss")
    ThisWorkbook.Sheets("Data Lists").Protect xPsw

    Dim file_name As String
    file_name = ThisWorkbook.Sheets("Data Lists").Range("b73")
    Dim current_folder As String
    current_folder = ThisWorkbook.Path
    Dim filename_plus_path As String
    filename_plus_path = current_folder & "/" & file_name

    Dim validation_status As String
    validation_status = ThisWorkbook.Sheets("Report").Range("J1")

    If validation_status = "SHEET COMPLETE" Then
        ActiveSheet.ExportAsFixedFormat Type:=xlTypePDF, _
            Filename:=filename_plus_path, IgnorePrintAreas:=False
    Else
        MsgBox "CANNOT CREATE EMAIL TEMPLATE - PLEASE COMPLETE THE REPORT FULLY"
    End If
End Sub
```

### Module1.bas (Generic Spell Check)
```vba
Sub ProtectSheetCheckSpellCheck()
    Dim xRg As Range
    On Error Resume Next
    Application.ScreenUpdating = False
    With ActiveSheet
        .Unprotect ("window")
        Set xRg = .UsedRange
        xRg.CheckSpelling
        .Protect ("window")
    End With
    Application.ScreenUpdating = True
End Sub
```

---

## Appendix B: Complete CF CSV Upload Row Map

### Section 1: Stripping out of items as required to proceed with works

| Row | Type | Item Name | Cost Code | Item Type |
|-----|------|-----------|-----------|-----------|
| 2 | Detail | Remove radiators & cap valves | Damp Materials | MTL |
| 3 | Detail | Remove socket fronts and isolate | Damp Materials | MTL |
| 4 | Detail | Skirting board removal & set aside | Damp Materials | MTL |
| 5 | Detail | Strip Wall Paper | Damp Materials | MTL |
| 6 | Detail | Antinox HD Floor Protection Boards – 2.4m x 1.2m | Damp Materials | MTL |
| 7 | Detail | Remove plaster/render (Walls) | Damp Materials | MTL |
| 8 | Detail | Removal of stud walls etc (Bag & cart away) | Damp Materials | MTL |
| 9 | Detail | Plaster & stud Removal (Ceilings) | Damp Materials | MTL |
| 10 | Detail | Strip out existing timber floor (GF) | Damp Materials | MTL |
| 11 | Detail | Scrape back/clear sub floors | Damp Materials | MTL |
| 12 | Detail | Bag up debris & cart outside | Damp Materials | MTL |
| 13 | Detail | Disposal via licensed transfer agent | Damp Materials | MTL |
| 14-25 | Detail | (Same 12 items repeated as labour) | Damp Labour | LBR |
| 26 | **BUNDLE** | Stripping out... - Materials | Damp Materials | MTL |
| 27 | **BUNDLE** | Stripping out... - Labour | Damp Labour | LBR |
| 28 | Separator | — | — | — |

### Section 2: Walls (Install membrane system)

| Row | Type | Item Name | Cost Code | Item Type |
|-----|------|-----------|-----------|-----------|
| 29 | Detail | DPC Installation - Traditional | Damp Materials | MTL |
| 30 | Detail | DPC Installation - Digital | Damp Materials | MTL |
| 31 | Detail | Wall membrane CM3 - 1mtr | Damp Materials | MTL |
| 32 | Detail | Wall membrane CM3 - 1.2mtr | Damp Materials | MTL |
| 33 | Detail | Wall membrane CM3 - 2mtr #1 | Damp Materials | MTL |
| 34 | Detail | Wall membrane CM3 - 2mtr #2 | Damp Materials | MTL |
| 35 | Detail | Wall membrane CM3 - 2mtr #3 | Damp Materials | MTL |
| 36 | Detail | Wall membrane CM3 - Subtotals for above 3 lines | Damp Materials | MTL |
| 37 | Detail | Membrane plugs for m2 listed | Damp Materials | MTL |
| 38 | Detail | Sealing Tape Lm | Damp Materials | MTL |
| 39 | Detail | Technoseal Lm | Damp Materials | MTL |
| 40 | Detail | Wall/floor fillet joint | Damp Materials | MTL |
| 41 | Detail | Overtape Lm | Damp Materials | MTL |
| 42 | Detail | Fixing Rope Lm | Damp Materials | MTL |
| 43 | Detail | Difficulty hours (additional hours if required) | Damp Materials | MTL |
| 44-58 | Detail | (Same 15 items repeated as labour) | Damp Labour | LBR |
| 59 | **BUNDLE** | Walls (Install membrane system) - Materials | Damp Materials | MTL |
| 60 | **BUNDLE** | Walls (Install membrane system) - Labour | Damp Labour | LBR |
| 61 | Separator | — | — | — |

### Section 3: Cementitious tanking system

| Row | Type | Item Name |
|-----|------|-----------|
| 62 | Detail | Dubbing out coat (sand/cement/SBR) — MTL |
| 63 | Detail | 2 coat tanking slurry — MTL |
| 64 | Detail | Renovating plaster — MTL |
| 65 | Detail | Wall/floor fillet joint — MTL |
| 66 | Detail | Difficulty hours — MTL |
| 67-71 | Detail | (Same 5 items as LBR) |
| 72 | **BUNDLE** | Materials |
| 73 | **BUNDLE** | Labour |
| 74 | Separator |

### Section 4: Floor - Liquid Resin floor Membranes

| Row | Type | Item Name |
|-----|------|-----------|
| 75 | Detail | EP40 2 Pack resin Primer — MTL |
| 76 | Detail | EP40 2 Pack resin top coat — MTL |
| 77 | Detail | Wall/floor fillet joint — MTL |
| 78 | Detail | Grip grit — MTL |
| 79 | Detail | Difficulty hours — MTL |
| 80-84 | Detail | (Same 5 items as LBR) |
| 85 | **BUNDLE** | Materials |
| 86 | **BUNDLE** | Labour |
| 87 | Separator |

### Section 5: Plastering & finishing

| Row | Type | Item Name |
|-----|------|-----------|
| 88 | Detail | Construct stud wall to perimeter — MTL |
| 89 | Detail | Plaster boarding (inc dab/screws) — MTL |
| 90 | Detail | Skimming walls (multi finish plaster) — MTL |
| 91 | Detail | Plastering Stop Bead - 3m length — MTL |
| 92 | Detail | Plastering Thin Coat Angle/Corner Bead - 2.4m length — MTL |
| 93 | Detail | Plastering Thin Coat Angle/Corner Bead - 3m length — MTL |
| 94 | Detail | Difficulty hours (fireplace, corners etc) — MTL |
| 95-101 | Detail | (Same 7 items as LBR) |
| 102 | **BUNDLE** | Materials |
| 103 | **BUNDLE** | Labour |
| 104 | Separator |

### Section 6: Warmline Internal Wall Insulation

| Row | Type | Item Name |
|-----|------|-----------|
| 105 | Detail | Warmline Internal Wall Insulation — MTL |
| 106 | Detail | Warmline Internal Wall Insulation — LBR |
| 107 | **BUNDLE** | Materials |
| 108 | **BUNDLE** | Labour |
| 109 | Separator |

### Section 7: Floor Joists & Floor Decking

| Row | Type | Item Name |
|-----|------|-----------|
| 110-120 | Detail | Joists (6 sizes) + Treat/endwrap + Wall plate + Bower beams + Flitch plates + Difficulty hours — MTL |
| 121-131 | Detail | (Same 11 items as LBR) |
| 132-139 | Detail | Floor decking (6 types) + Insulation + Difficulty hours — MTL |
| 140-147 | Detail | (Same 8 items as LBR) |
| 148 | **BUNDLE** | Materials |
| 149 | **BUNDLE** | Labour |
| 150 | Separator |

### Section 8: Airbricks

| Row | Type | Item Name |
|-----|------|-----------|
| 151-153 | Detail | Clean/Lift/Install airbricks — MTL |
| 154-156 | Detail | (Same 3 as LBR) |
| 157 | **BUNDLE** | Materials |
| 158 | **BUNDLE** | Labour |
| 159 | Separator |

### Section 9: Spray treatments

| Row | Type | Item Name |
|-----|------|-----------|
| 160-161 | Detail | Fog subfloor + Difficulty hours — MTL |
| 162-163 | Detail | (Same 2 as LBR) |
| 164 | **BUNDLE** | Materials |
| 165 | **BUNDLE** | Labour |
| 166 | Separator |

### Section 10: Drains (Optional)

| Row | Type | Item Name |
|-----|------|-----------|
| 167-168 | Detail | Aco Drain + French Drain — MTL |
| 169-170 | Detail | (Same 2 as LBR) |
| 171 | **BUNDLE** | Materials (Optional=Yes) |
| 172 | **BUNDLE** | Labour (Optional=Yes) |
| 173 | Separator |

### Section 11: External Wall - Aquaban Water Repellent Treatments (Optional)

| Row | Type | Item Name |
|-----|------|-----------|
| 174 | Detail | Aquaban water repellent system — MTL |
| 175 | Detail | (Same as LBR) |
| 176 | **BUNDLE** | Materials (Optional=Yes) |
| 177 | **BUNDLE** | Labour (Optional=Yes) |
| 178 | Separator |

### Section 12: Asbestos Testing (Optional)

| Row | Type | Item Name |
|-----|------|-----------|
| 179 | Detail | Asbestos Testing — MTL |
| 180 | Detail | (Same as LBR) |
| 181 | **BUNDLE** | Materials (Optional=Yes) |
| 182 | **BUNDLE** | Labour (Optional=Yes) |
| 183 | Separator |

### Section 13: Project Specific Overheads

| Row | Type | Item Name |
|-----|------|-----------|
| 184 | Detail | Skips — Other, Waste Removal |
| 185 | Detail | Vehicle Costs (Fuel) — Other, Travel Costs |
| 186 | Detail | Travel Costs for Tradesmen — LBR, Travel Costs |
| 187 | **BUNDLE** | PSO - Materials (with Section Description) |
| 188 | **BUNDLE** | PSO - Labour (with Section Description) |
