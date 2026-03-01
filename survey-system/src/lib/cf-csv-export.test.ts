// =============================================================================
// CF CSV Export Verification — Damp Survey with Known Values
//
// Run with: npx tsx src/lib/cf-csv-export.test.ts
//
// Constructs a mock damp survey matching the scenario:
//   - 2 rooms with wall membrane treatment (20m² and 15m²)
//   - DPC traditional (10 LM, depth 2.5)
//   - Strip out: 35m² plaster removal
//   - 4 Antinox boards
//   - 1 skip hire
//   - 10 bags disposal
//   - Travel: 30 miles, 2 men
//   - NO tanking, floor resin, drains, aquaban, asbestos
//
// Verifies every column of the output CSV against the workbook specification.
// =============================================================================

import { generateCFCSV } from './cf-csv-export'
import type { CalculationResult, CalculatedLine } from './pricing-data'
import type { TravelOverheadResult } from './travel-overhead'
import type { LineInput, LineResult } from './pricing-engine'

// =============================================================================
// Test infrastructure
// =============================================================================

let passCount = 0
let failCount = 0
const failures: string[] = []

function assert(condition: boolean, label: string, detail?: string): void {
  if (condition) {
    passCount++
    console.log(`  ✓ ${label}`)
  } else {
    failCount++
    const msg = detail ? `${label}: ${detail}` : label
    failures.push(msg)
    console.log(`  ✗ ${label}${detail ? ` — ${detail}` : ''}`)
  }
}

function assertEq<T>(actual: T, expected: T, label: string): void {
  const pass = actual === expected
  assert(pass, label, pass ? undefined : `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
}

function assertClose(actual: number, expected: number, label: string, tol = 0.005): void {
  const pass = Math.abs(actual - expected) < tol
  assert(pass, label, pass ? undefined : `expected ~${expected}, got ${actual} (diff ${Math.abs(actual - expected).toFixed(4)})`)
}

/** Parse a CSV line, handling quoted fields correctly */
function parseCSVLine(line: string): string[] {
  const fields: string[] = []
  let i = 0
  while (i <= line.length) {
    if (i === line.length) {
      fields.push('')
      break
    }
    if (line[i] === '"') {
      // Quoted field
      let value = ''
      i++ // skip opening quote
      while (i < line.length) {
        if (line[i] === '"') {
          if (i + 1 < line.length && line[i + 1] === '"') {
            value += '"'
            i += 2
          } else {
            i++ // skip closing quote
            break
          }
        } else {
          value += line[i]
          i++
        }
      }
      fields.push(value)
      if (i < line.length && line[i] === ',') i++ // skip delimiter
    } else {
      // Unquoted field
      const nextComma = line.indexOf(',', i)
      if (nextComma === -1) {
        fields.push(line.substring(i))
        break
      } else {
        fields.push(line.substring(i, nextComma))
        i = nextComma + 1
      }
    }
  }
  return fields
}

// =============================================================================
// Mock data construction
// =============================================================================

const HOURLY_RATE = 30.63
const MAT_MARKUP = 0.30   // 30%
const LBR_MARKUP = 1.00   // 100%

function makeLine(
  sectionKey: string,
  desc: string,
  matAdj: number,
  matMarkupPct: number,
  lbrHours: number,
  lbrMarkupPct: number,
): CalculatedLine {
  const matTotal = matAdj * (1 + matMarkupPct)
  const lbrTotal = lbrHours * HOURLY_RATE * (1 + lbrMarkupPct)

  const input: LineInput = {
    templateId: `mock-${sectionKey}`,
    inputQuantity: 1,
  }
  const result: LineResult = {
    materialUnitCost: matAdj,
    materialAdjustedCost: matAdj,
    materialTotal: matTotal,
    labourHours: lbrHours,
    labourTotal: lbrTotal,
    lineTotal: matTotal + lbrTotal,
  }

  return {
    templateId: `mock-${sectionKey}-${desc.replace(/\s/g, '_')}`,
    input,
    result,
    templateDescription: desc,
    sectionKey,
  }
}

// ── Damp costing result lines ────────────────────────────────────────────────

const dampLines: CalculatedLine[] = [
  // preparatory_work — 4 Antinox boards
  makeLine('preparatory_work', 'Antinox HD Floor Protection Boards', 40, MAT_MARKUP, 2, LBR_MARKUP),
  // strip_out — 35m² plaster removal (labour-only item: material cost = 0)
  makeLine('strip_out', 'Remove plaster/render (Walls)', 0, MAT_MARKUP, 10, LBR_MARKUP),
  // dpc_traditional — 10 LM
  makeLine('dpc_traditional', 'DPC Installation - Traditional', 80, MAT_MARKUP, 5, LBR_MARKUP),
  // wall_membrane — Room 1 (20m²)
  makeLine('wall_membrane', 'Wall membrane CM3 - 1mtr', 140, MAT_MARKUP, 8, LBR_MARKUP),
  // wall_membrane — Room 2 (15m²)
  makeLine('wall_membrane', 'Wall membrane CM3 - 1.2mtr', 105, MAT_MARKUP, 6, LBR_MARKUP),
]

const dampResult: CalculationResult = {
  lines: dampLines,
  sectionTotals: {},
  grandTotal: { materialTotal: 0, labourTotal: 0, total: 0 },
}

// ── Site preparation costing result lines ────────────────────────────────────

const sitePrepLines: CalculatedLine[] = [
  // strip_out_disposal — 10 bags
  makeLine('strip_out_disposal', 'Bag up debris & cart outside', 50, MAT_MARKUP, 3, LBR_MARKUP),
  // skip_hire — 1 skip (material only, no labour)
  makeLine('skip_hire', 'Skip hire', 270, MAT_MARKUP, 0, LBR_MARKUP),
]

const sitePrepResult: CalculationResult = {
  lines: sitePrepLines,
  sectionTotals: {},
  grandTotal: { materialTotal: 0, labourTotal: 0, total: 0 },
}

// ── Travel overhead ──────────────────────────────────────────────────────────
// Total labour hours: 2 + 10 + 5 + 8 + 6 + 3 = 34 hours
// labourDays = CEIL(34 / 6.5 / 2) = CEIL(2.6154) = 3
// roundTripMiles = 30 × 2 = 60
// travelHours = 3 × (60/30) × 2 = 12
// travelLabourCost = 12 × 30.63 = 367.56
// vehicleMileageCost = 3 × 60 × 0.50 = 90.00

const travelOverhead: TravelOverheadResult = {
  labourDays: 3,
  travelHours: 12,
  travelLabourCost: 367.56,
  vehicleMileageCost: 90,
  totalOverheadCost: 457.56,
}

// ── Pre-computed expected values ─────────────────────────────────────────────

// Stripping out = damp.preparatory_work + damp.strip_out + site_prep.strip_out_disposal
const expectedStrip = {
  matRaw: 40 + 0 + 50,         // = 90
  matTotal: 52 + 0 + 65,       // = 117
  lbrHours: 2 + 10 + 3,        // = 15
  lbrRaw: 15 * HOURLY_RATE,    // = 459.45
  lbrTotal: 122.52 + 612.60 + 183.78,  // = 918.90
}

// Walls = damp.dpc_traditional + damp.wall_membrane (×2 rooms)
const expectedWalls = {
  matRaw: 80 + 140 + 105,      // = 325
  matTotal: 104 + 182 + 136.50, // = 422.50
  lbrHours: 5 + 8 + 6,         // = 19
  lbrRaw: 19 * HOURLY_RATE,    // = 581.97
  lbrTotal: 306.30 + 490.08 + 367.56,  // = 1163.94
}

// PSO = skip_hire (materials) + vehicle (materials) + travel (labour)
const expectedPSO = {
  matRaw: 270 + 90,            // = 360 (skip + vehicle)
  matTotal: 351 + 90,          // = 441 (skip 30% markup + vehicle 0% markup)
  lbrHours: 12,
  lbrRaw: 367.56,
  lbrTotal: 367.56,            // 0% markup
}

// =============================================================================
// Run the export
// =============================================================================

const costingResults: Record<string, CalculationResult> = {
  damp: dampResult,
  site_preparation: sitePrepResult,
}

const { csv, filename } = generateCFCSV(
  costingResults,
  travelOverhead,
  {},            // no section adjustments
  ['damp'],      // single-type survey
  'TEST-001',
)

// Parse CSV
const csvLines = csv.split('\n')
const rows = csvLines.map(parseCSVLine)

// =============================================================================
// Column index constants (A=0 through Q=16)
// =============================================================================
const COL = {
  Section: 0,          // A
  SectionDesc: 1,      // B
  ItemName: 2,         // C
  Qty: 3,              // D
  UnitCost: 4,         // E
  Unit: 5,             // F
  CostCode: 6,         // G
  Markup: 7,           // H
  MarkupType: 8,       // I
  ItemType: 9,         // J
  IsTaxable: 10,       // K
  IsOptional: 11,      // L
  AssignedTo: 12,      // M
  LineValue: 13,       // N — CF IGNORE
  Validation: 14,      // O — CF IGNORE
  CustomerValue: 15,   // P — CF IGNORE
  IncludeInSummary: 16, // Q — CF IGNORE
}

// =============================================================================
// VERIFICATION
// =============================================================================

console.log('\n═══════════════════════════════════════════════════════════════')
console.log('  CF CSV Export Verification — Damp Survey with Known Values')
console.log('═══════════════════════════════════════════════════════════════\n')

// ── 1. Row count ─────────────────────────────────────────────────────────────
console.log('1. Row Count')
// Header + 2 (stripping out) + 2 (walls) + 2 (PSO) = 7 rows
assertEq(rows.length, 7, 'Total rows = 7 (header + 6 data)')
console.log()

// ── 2. Header row ────────────────────────────────────────────────────────────
console.log('2. Header Row')
const header = rows[0]
assertEq(header.length, 17, 'Header has 17 columns (A-Q)')
assertEq(header[COL.Section], 'Section', 'Col A = "Section"')
assertEq(header[COL.SectionDesc], 'Section Description', 'Col B = "Section Description"')
assertEq(header[COL.ItemName], 'Item Name', 'Col C = "Item Name"')
assertEq(header[COL.Qty], 'Quantity', 'Col D = "Quantity"')
assertEq(header[COL.UnitCost], 'Unit Cost', 'Col E = "Unit Cost"')
assertEq(header[COL.Unit], 'Unit', 'Col F = "Unit"')
assertEq(header[COL.CostCode], 'Cost Code', 'Col G = "Cost Code"')
assertEq(header[COL.Markup], 'Markup', 'Col H = "Markup"')
assertEq(header[COL.MarkupType], 'Markup Type', 'Col I = "Markup Type"')
assertEq(header[COL.ItemType], 'Item Type', 'Col J = "Item Type"')
assertEq(header[COL.IsTaxable], 'Is Taxable', 'Col K = "Is Taxable"')
assertEq(header[COL.IsOptional], 'Is Optional', 'Col L = "Is Optional"')
assertEq(header[COL.AssignedTo], 'Assigned To', 'Col M = "Assigned To"')
assertEq(header[COL.LineValue], 'CF IGNORE - LINE VALUE', 'Col N header')
assertEq(header[COL.Validation], 'CF IGNORE - Zero value Section Validation', 'Col O header')
assertEq(header[COL.CustomerValue], 'CF IGNORE - LINE VALUE FOR CUSTOMER SUMMARY', 'Col P header')
assertEq(header[COL.IncludeInSummary], 'CF IGNORE - INCLUDE PRICE IN CUSTOMER SUMMARY', 'Col Q header')
console.log()

// ── 3. Data rows column count ────────────────────────────────────────────────
console.log('3. Column Counts')
for (let i = 1; i < rows.length; i++) {
  assertEq(rows[i].length, 17, `Row ${i + 1} has 17 columns`)
}
console.log()

// ── 4. Section ordering ──────────────────────────────────────────────────────
console.log('4. Section Ordering')
const STRIPPING_NAME = 'Stripping out of items as required to proceed with works'
const WALLS_NAME = 'Walls (Install membrane system)'
const PSO_NAME = 'Project Specific Overheads'

assertEq(rows[1][COL.Section], STRIPPING_NAME, 'Row 2: Stripping out section')
assertEq(rows[2][COL.Section], STRIPPING_NAME, 'Row 3: Stripping out section')
assertEq(rows[3][COL.Section], WALLS_NAME, 'Row 4: Walls section')
assertEq(rows[4][COL.Section], WALLS_NAME, 'Row 5: Walls section')
assertEq(rows[5][COL.Section], PSO_NAME, 'Row 6: PSO section')
assertEq(rows[6][COL.Section], PSO_NAME, 'Row 7: PSO section')
console.log()

// ── 5. Verify zero-cost sections are excluded ────────────────────────────────
console.log('5. Zero-Cost Section Exclusion')
const allSectionNames = rows.slice(1).map(r => r[COL.Section])
const excludedSections = [
  'Cementitious tanking system',
  'Floor - Liquid Resin floor Membranes',
  'Plastering & finishing',
  'Warmline Internal Wall Insulation',
  'Floor Joists & Floor Decking',
  'Airbricks',
  'Spray treatments',
  'Drains',
  'External Wall - Aquaban Water Repellent Treatments',
  'Asbestos Testing',
]
for (const s of excludedSections) {
  assert(!allSectionNames.includes(s), `"${s}" excluded (zero cost)`)
}
console.log()

// ── 6. Stripping Out — Materials bundle (Row 2) ──────────────────────────────
console.log('6. Stripping Out — Materials Bundle (Row 2)')
const stripMat = rows[1]
assertEq(stripMat[COL.SectionDesc], '', 'Section Description empty (not PSO)')
assertEq(stripMat[COL.ItemName], `${STRIPPING_NAME} - Materials`, 'Item Name')
assertEq(stripMat[COL.Qty], '1', 'Qty = 1 (lump sum)')
assertClose(parseFloat(stripMat[COL.UnitCost]), expectedStrip.matRaw, 'Unit Cost = raw material cost')
assertEq(stripMat[COL.Unit], 'EACH', 'Unit = EACH')
assertEq(stripMat[COL.CostCode], 'Damp Materials', 'Cost Code')
assertEq(stripMat[COL.Markup], '30', 'Markup = 30 (blended 30%)')
assertEq(stripMat[COL.MarkupType], '%', 'Markup Type = %')
assertEq(stripMat[COL.ItemType], 'MTL', 'Item Type = MTL')
assertEq(stripMat[COL.IsTaxable], 'Yes', 'Is Taxable = Yes')
assertEq(stripMat[COL.IsOptional], 'No', 'Is Optional = No')
assertEq(stripMat[COL.AssignedTo], 'Preservation Shop', 'Assigned To = Preservation Shop')
assertClose(parseFloat(stripMat[COL.LineValue]), expectedStrip.matRaw, 'Col N = raw material cost')
assertEq(stripMat[COL.Validation], 'LEAVE', 'Col O = LEAVE')
assertClose(parseFloat(stripMat[COL.CustomerValue]), expectedStrip.matTotal, 'Col P = material total with markup')
assertEq(stripMat[COL.IncludeInSummary], 'Yes', 'Col Q = Yes')
console.log()

// ── 7. Stripping Out — Labour bundle (Row 3) ────────────────────────────────
console.log('7. Stripping Out — Labour Bundle (Row 3)')
const stripLbr = rows[2]
assertEq(stripLbr[COL.SectionDesc], '', 'Section Description empty')
assertEq(stripLbr[COL.ItemName], `${STRIPPING_NAME} - Labour`, 'Item Name')
assertClose(parseFloat(stripLbr[COL.Qty]), expectedStrip.lbrHours, 'Qty = total labour hours')
assertClose(parseFloat(stripLbr[COL.UnitCost]), HOURLY_RATE, 'Unit Cost = blended hourly rate (30.63)')
assertEq(stripLbr[COL.Unit], 'Hours', 'Unit = Hours')
assertEq(stripLbr[COL.CostCode], 'Damp Labour', 'Cost Code')
assertEq(stripLbr[COL.Markup], '100', 'Markup = 100 (blended 100%)')
assertEq(stripLbr[COL.MarkupType], '%', 'Markup Type = %')
assertEq(stripLbr[COL.ItemType], 'LBR', 'Item Type = LBR')
assertEq(stripLbr[COL.IsTaxable], 'Yes', 'Is Taxable = Yes')
assertEq(stripLbr[COL.IsOptional], 'No', 'Is Optional = No')
assertEq(stripLbr[COL.AssignedTo], '', 'Assigned To = blank (labour)')
assertClose(parseFloat(stripLbr[COL.LineValue]), expectedStrip.lbrRaw, 'Col N = raw labour cost')
assertEq(stripLbr[COL.Validation], 'LEAVE', 'Col O = LEAVE')
assertClose(parseFloat(stripLbr[COL.CustomerValue]), expectedStrip.lbrTotal, 'Col P = labour total with markup')
assertEq(stripLbr[COL.IncludeInSummary], 'Yes', 'Col Q = Yes')
console.log()

// ── 8. Walls — Materials bundle (Row 4) ──────────────────────────────────────
console.log('8. Walls — Materials Bundle (Row 4)')
const wallsMat = rows[3]
assertEq(wallsMat[COL.ItemName], `${WALLS_NAME} - Materials`, 'Item Name')
assertEq(wallsMat[COL.Qty], '1', 'Qty = 1 (lump sum)')
assertClose(parseFloat(wallsMat[COL.UnitCost]), expectedWalls.matRaw, 'Unit Cost = 325.00')
assertEq(wallsMat[COL.Unit], 'EACH', 'Unit = EACH')
assertEq(wallsMat[COL.CostCode], 'Damp Materials', 'Cost Code')
assertEq(wallsMat[COL.Markup], '30', 'Markup = 30')
assertEq(wallsMat[COL.ItemType], 'MTL', 'Item Type = MTL')
assertEq(wallsMat[COL.IsOptional], 'No', 'Is Optional = No')
assertEq(wallsMat[COL.AssignedTo], 'Preservation Shop', 'Assigned To')
assertClose(parseFloat(wallsMat[COL.LineValue]), expectedWalls.matRaw, 'Col N')
assertClose(parseFloat(wallsMat[COL.CustomerValue]), expectedWalls.matTotal, 'Col P')
console.log()

// ── 9. Walls — Labour bundle (Row 5) ────────────────────────────────────────
console.log('9. Walls — Labour Bundle (Row 5)')
const wallsLbr = rows[4]
assertEq(wallsLbr[COL.ItemName], `${WALLS_NAME} - Labour`, 'Item Name')
assertClose(parseFloat(wallsLbr[COL.Qty]), expectedWalls.lbrHours, 'Qty = 19 hours')
assertClose(parseFloat(wallsLbr[COL.UnitCost]), HOURLY_RATE, 'Unit Cost = 30.63')
assertEq(wallsLbr[COL.Unit], 'Hours', 'Unit = Hours')
assertEq(wallsLbr[COL.CostCode], 'Damp Labour', 'Cost Code')
assertEq(wallsLbr[COL.Markup], '100', 'Markup = 100')
assertEq(wallsLbr[COL.ItemType], 'LBR', 'Item Type = LBR')
assertEq(wallsLbr[COL.AssignedTo], '', 'Assigned To = blank')
assertClose(parseFloat(wallsLbr[COL.LineValue]), expectedWalls.lbrRaw, 'Col N')
assertClose(parseFloat(wallsLbr[COL.CustomerValue]), expectedWalls.lbrTotal, 'Col P')
console.log()

// ── 10. PSO — Materials bundle (Row 6) ──────────────────────────────────────
console.log('10. PSO — Materials Bundle (Row 6)')
const psoMat = rows[5]
const PSO_DESC = '(May cover any or all of the following: Covers Health & Safety, Tooling Equipment, Access Equipment, Specialist Equipment, Waste Removal & Disposal, Project Management Administration etc.)'
assertEq(psoMat[COL.Section], PSO_NAME, 'Section name')
assertEq(psoMat[COL.SectionDesc], PSO_DESC, 'Section Description populated for PSO')
assertEq(psoMat[COL.ItemName], `${PSO_NAME} - Materials`, 'Item Name')
assertEq(psoMat[COL.Qty], '1', 'Qty = 1')
assertClose(parseFloat(psoMat[COL.UnitCost]), expectedPSO.matRaw, 'Unit Cost = 360.00 (skip + vehicle)')
assertEq(psoMat[COL.Unit], 'EACH', 'Unit = EACH')
assertEq(psoMat[COL.CostCode], 'Damp Materials', 'Cost Code (uses primary type)')
// Blended markup: skip=270 raw/351 total (30%), vehicle=90/90 (0%)
// Blended = ((441 - 360) / 360) × 100 = 22.5
assertEq(psoMat[COL.Markup], '22.5', 'Markup = 22.5 (blended skip 30% + vehicle 0%)')
assertEq(psoMat[COL.ItemType], 'MTL', 'Item Type = MTL')
assertEq(psoMat[COL.IsOptional], 'No', 'Is Optional = No')
assertEq(psoMat[COL.AssignedTo], 'Preservation Shop', 'Assigned To')
assertClose(parseFloat(psoMat[COL.LineValue]), expectedPSO.matRaw, 'Col N = 360.00')
assertEq(psoMat[COL.Validation], 'LEAVE', 'Col O = LEAVE')
assertClose(parseFloat(psoMat[COL.CustomerValue]), expectedPSO.matTotal, 'Col P = 441.00')
assertEq(psoMat[COL.IncludeInSummary], 'Yes', 'Col Q = Yes')
console.log()

// ── 11. PSO — Labour bundle (Row 7) ─────────────────────────────────────────
console.log('11. PSO — Labour Bundle (Row 7)')
const psoLbr = rows[6]
assertEq(psoLbr[COL.Section], PSO_NAME, 'Section name')
assertEq(psoLbr[COL.SectionDesc], PSO_DESC, 'Section Description populated for PSO')
assertEq(psoLbr[COL.ItemName], `${PSO_NAME} - Labour`, 'Item Name')
assertClose(parseFloat(psoLbr[COL.Qty]), expectedPSO.lbrHours, 'Qty = 12 hours')
assertClose(parseFloat(psoLbr[COL.UnitCost]), HOURLY_RATE, 'Unit Cost = 30.63')
assertEq(psoLbr[COL.Unit], 'Hours', 'Unit = Hours')
assertEq(psoLbr[COL.CostCode], 'Damp Labour', 'Cost Code (uses primary type)')
assertEq(psoLbr[COL.Markup], '0', 'Markup = 0 (travel has 0% markup)')
assertEq(psoLbr[COL.ItemType], 'LBR', 'Item Type = LBR')
assertEq(psoLbr[COL.IsOptional], 'No', 'Is Optional = No')
assertEq(psoLbr[COL.AssignedTo], '', 'Assigned To = blank')
assertClose(parseFloat(psoLbr[COL.LineValue]), expectedPSO.lbrRaw, 'Col N = 367.56')
assertEq(psoLbr[COL.Validation], 'LEAVE', 'Col O = LEAVE')
assertClose(parseFloat(psoLbr[COL.CustomerValue]), expectedPSO.lbrTotal, 'Col P = 367.56')
assertEq(psoLbr[COL.IncludeInSummary], 'Yes', 'Col Q = Yes')
console.log()

// ── 12. Filename format ─────────────────────────────────────────────────────
console.log('12. Filename Format')
assert(filename.startsWith('CF-Damp-'), 'Filename starts with CF-Damp-')
assert(filename.endsWith('.csv'), 'Filename ends with .csv')
// Pattern: CF-Damp-DD-MM-YY-HH-MM-SS.csv
const fnMatch = filename.match(/^CF-Damp-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})\.csv$/)
assert(fnMatch !== null, 'Filename matches pattern CF-Damp-DD-MM-YY-HH-MM-SS.csv')
console.log()

// ── 13. CSV format validity ─────────────────────────────────────────────────
console.log('13. CSV Format Validity')
assert(!csv.includes('\r'), 'No carriage returns (Unix line endings)')
// Check that PSO description (which contains commas) is properly quoted
const psoMatRawLine = csvLines[5]
assert(psoMatRawLine.includes('"'), 'PSO row contains quoted fields (commas in description)')
// Verify the raw CSV can be re-parsed correctly
const reParsed = csvLines.map(parseCSVLine)
assertEq(reParsed.length, rows.length, 'Re-parsed row count matches')
for (let i = 0; i < rows.length; i++) {
  assertEq(reParsed[i].length, rows[i].length, `Re-parsed row ${i} column count matches`)
}
console.log()

// ── 14. Cross-check: Col N = D × E and Col P = N × (1 + H/100) ─────────────
console.log('14. Cross-Check: N = D×E, P = N×(1+H/100)')
for (let i = 1; i < rows.length; i++) {
  const r = rows[i]
  const qty = parseFloat(r[COL.Qty])
  const unitCost = parseFloat(r[COL.UnitCost])
  const markup = parseFloat(r[COL.Markup])
  const lineValue = parseFloat(r[COL.LineValue])
  const customerValue = parseFloat(r[COL.CustomerValue])
  const label = `Row ${i + 1} (${r[COL.ItemName]})`

  // N = D × E
  assertClose(lineValue, qty * unitCost, `${label}: N = D×E`)
  // P = N × (1 + H/100)
  assertClose(customerValue, lineValue * (1 + markup / 100), `${label}: P = N×(1+H/100)`)
}
console.log()

// ── 15. Invariant: Materials always Qty=1, EACH, MTL; Labour always Hours, LBR
console.log('15. Row Type Invariants')
for (let i = 1; i < rows.length; i++) {
  const r = rows[i]
  const name = r[COL.ItemName]
  if (name.endsWith('- Materials')) {
    assertEq(r[COL.Qty], '1', `${name}: Qty = 1`)
    assertEq(r[COL.Unit], 'EACH', `${name}: Unit = EACH`)
    assertEq(r[COL.ItemType], 'MTL', `${name}: ItemType = MTL`)
    assertEq(r[COL.AssignedTo], 'Preservation Shop', `${name}: AssignedTo = Preservation Shop`)
  } else if (name.endsWith('- Labour')) {
    assertEq(r[COL.Unit], 'Hours', `${name}: Unit = Hours`)
    assertEq(r[COL.ItemType], 'LBR', `${name}: ItemType = LBR`)
    assertEq(r[COL.AssignedTo], '', `${name}: AssignedTo = blank`)
  }
  // Universal invariants
  assertEq(r[COL.MarkupType], '%', `${name}: MarkupType = %`)
  assertEq(r[COL.IsTaxable], 'Yes', `${name}: IsTaxable = Yes`)
  assertEq(r[COL.Validation], 'LEAVE', `${name}: Col O = LEAVE`)
  assertEq(r[COL.IncludeInSummary], 'Yes', `${name}: Col Q = Yes`)
}
console.log()

// =============================================================================
// Summary
// =============================================================================

console.log('═══════════════════════════════════════════════════════════════')
console.log(`  Results: ${passCount} passed, ${failCount} failed`)
console.log('═══════════════════════════════════════════════════════════════')

if (failCount > 0) {
  console.log('\nFailures:')
  for (const f of failures) {
    console.log(`  ✗ ${f}`)
  }
  console.log()
  process.exit(1)
} else {
  console.log('\n  All checks passed — CSV output matches workbook specification.\n')
  process.exit(0)
}
