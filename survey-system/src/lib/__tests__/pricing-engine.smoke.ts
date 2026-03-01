/**
 * Pricing Engine Smoke Tests
 * Run with:  npx tsx src/lib/__tests__/pricing-engine.smoke.ts
 *
 * Verifies CRITICAL-A through D fixes produce the expected output.
 * No test framework required — exits with code 1 on any failure.
 */

import {
  calcTieredDisposal,
  calcDpcInjection,
  calcSkipHire,
  calcStandard,
  type LineInput,
  type LineTemplate,
  type PricingConfig,
  type MaterialLookup,
} from '../pricing-engine'

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

const CONFIG: PricingConfig = {
  hourly_labour_rate: 30.63,
  contractor_hourly_rate: 28.00,
  default_material_markup: 0.30,
  default_labour_markup: 1.00,
  default_wastage_factor: 1.10,
  vat_rate: 0.20,
  skip_hire_8yd_cost: 270.00,   // seeded value in pricing_config
}

const MATERIALS: MaterialLookup = {
  wykamol_ultracure_dpc_cream: 13.93,
  drill_plugs_12mm: 4.29,
}

// ---------------------------------------------------------------------------
// Test runner helpers
// ---------------------------------------------------------------------------

let passed = 0
let failed = 0

function expect(label: string, actual: number, expected: number, tolerance = 0.01): void {
  const diff = Math.abs(actual - expected)
  if (diff <= tolerance) {
    console.log(`  ✅  ${label}: £${actual.toFixed(2)} (expected £${expected.toFixed(2)})`)
    passed++
  } else {
    console.error(`  ❌  ${label}: got £${actual.toFixed(4)}, expected £${expected.toFixed(2)} (diff £${diff.toFixed(4)})`)
    failed++
  }
}

function section(name: string): void {
  console.log(`\n${name}`)
  console.log('─'.repeat(60))
}

// ---------------------------------------------------------------------------
// CRITICAL-A: tiered_disposal
// Formula: 0 bags→£0, ≤20 bags→flat £40+markup, >20 bags→qty×£2+markup
// ---------------------------------------------------------------------------

section('CRITICAL-A — tiered_disposal')

const tieredTemplate: LineTemplate = {
  id: 'test-tiered',
  cost_formula: 'tiered_disposal',
  formula_params: { threshold: 20, min_charge: 40, per_bag_over: 2 },
  material_markup: 0.30,
}

// 0 bags → £0
const tiered0 = calcTieredDisposal({ templateId: 'test-tiered', inputQuantity: 0 }, tieredTemplate, CONFIG, MATERIALS)
expect('0 bags — materialTotal', tiered0.materialTotal, 0.00)
expect('0 bags — labourTotal',   tiered0.labourTotal,   0.00)
expect('0 bags — lineTotal',     tiered0.lineTotal,     0.00)

// 10 bags → £40 × 1.30 = £52
const tiered10 = calcTieredDisposal({ templateId: 'test-tiered', inputQuantity: 10 }, tieredTemplate, CONFIG, MATERIALS)
expect('10 bags — materialTotal', tiered10.materialTotal, 52.00)
expect('10 bags — labourTotal',   tiered10.labourTotal,   0.00)

// 20 bags → still £40 × 1.30 = £52 (boundary: 20 ≤ threshold)
const tiered20 = calcTieredDisposal({ templateId: 'test-tiered', inputQuantity: 20 }, tieredTemplate, CONFIG, MATERIALS)
expect('20 bags — materialTotal', tiered20.materialTotal, 52.00)
expect('20 bags — labourTotal',   tiered20.labourTotal,   0.00)

// 30 bags → 30 × £2 × 1.30 = £78
const tiered30 = calcTieredDisposal({ templateId: 'test-tiered', inputQuantity: 30 }, tieredTemplate, CONFIG, MATERIALS)
expect('30 bags — materialTotal', tiered30.materialTotal, 78.00)
expect('30 bags — labourTotal',   tiered30.labourTotal,   0.00)

// ---------------------------------------------------------------------------
// CRITICAL-B: dpc_injection (depth=2.5, LM=10)
// Old (broken) value was ~£320. Fixed value is ~£801 material.
//
// Manual calculation:
//   creamCostPerLM = (13.93/1.15) + (6/2.5 × 4.29) = 12.113 + 10.296 = 22.409/LM
//   effectiveQty   = 2.5 × 10 = 25
//   adjCost        = 22.409 × 1.10 × 25 = 616.25
//   materialTotal  = 616.25 × 1.30      = 801.12
//   labourHours    = 10 × 2.5 × 0.35   = 8.75
//   labourTotal    = 8.75 × 30.63 × 2  = 536.03
// ---------------------------------------------------------------------------

section('CRITICAL-B — dpc_injection (depth=2.5, LM=10)')

const dpcTemplate: LineTemplate = {
  id: 'test-dpc',
  cost_formula: 'dpc_injection',
  wastage_factor: 1.10,
  material_markup: 0.30,
  labour_markup: 1.00,
  formula_params: {
    base_cream_cost: 13.93,
    cream_divisor: 1.15,
    holes_per_meter: 6,
    drill_cost: 4.29,
    labour_hours_per_depth: 0.35,
  },
}

const dpcResult = calcDpcInjection(
  { templateId: 'test-dpc', inputQuantity: 10, inputDimension: 2.5 },
  dpcTemplate,
  CONFIG,
  MATERIALS,
)

// Exact expected values (computed analytically above, ±£0.01 tolerance)
const EXPECTED_DPC_MATERIAL = 801.12
const EXPECTED_DPC_LABOUR   = 536.03

expect('dpc_injection — materialTotal', dpcResult.materialTotal, EXPECTED_DPC_MATERIAL)
expect('dpc_injection — labourTotal',   dpcResult.labourTotal,   EXPECTED_DPC_LABOUR)
expect('dpc_injection — labourHours',   dpcResult.labourHours,   8.75)

// Confirm it is significantly higher than the old broken ~£320
if (dpcResult.materialTotal > 400) {
  console.log(`  ✅  Old vs new: £${dpcResult.materialTotal.toFixed(2)} > £400 (old broken value was ~£320)`)
  passed++
} else {
  console.error(`  ❌  DPC material £${dpcResult.materialTotal.toFixed(2)} is not significantly above old ~£320`)
  failed++
}

// ---------------------------------------------------------------------------
// CRITICAL-D: skip_hire (quantity scaling)
// Formula: skipCost × qty × (1 + markup) — no labour
// skip_hire_8yd_cost = £270, markup = 30% → £351 per skip
// ---------------------------------------------------------------------------

section('CRITICAL-D — skip_hire (quantity scaling)')

const skipTemplate: LineTemplate = {
  id: 'test-skip',
  cost_formula: 'skip_hire',
  material_markup: 0.30,
}

// 0 skips → £0
const skip0 = calcSkipHire({ templateId: 'test-skip', inputQuantity: 0 }, skipTemplate, CONFIG, MATERIALS)
expect('0 skips — materialTotal', skip0.materialTotal, 0.00)
expect('0 skips — labourTotal',   skip0.labourTotal,   0.00)

// 1 skip → 270 × 1.30 = £351
const skip1 = calcSkipHire({ templateId: 'test-skip', inputQuantity: 1 }, skipTemplate, CONFIG, MATERIALS)
expect('1 skip  — materialTotal', skip1.materialTotal, 351.00)
expect('1 skip  — labourTotal',   skip1.labourTotal,   0.00)

// 2 skips → 270 × 2 × 1.30 = £702
const skip2 = calcSkipHire({ templateId: 'test-skip', inputQuantity: 2 }, skipTemplate, CONFIG, MATERIALS)
expect('2 skips — materialTotal', skip2.materialTotal, 702.00)
expect('2 skips — labourTotal',   skip2.labourTotal,   0.00)

// ---------------------------------------------------------------------------
// CRITICAL-C: digital_dpc (after migration — now uses 'standard' formula)
// base_unit_cost = £650, wastage_factor = 1.0, material_markup = 15.4%,
// labour_rate_per_unit = 1 hr, labour_markup = 100%
//
// materialTotal = 650 × 1.0 × 1 × 1.154 = £750.10
// labourTotal   = 1 × 30.63 × 2.0       = £61.26
// ---------------------------------------------------------------------------

section('CRITICAL-C — digital_dpc (via standard formula, post-migration)')

const digitalDpcTemplate: LineTemplate = {
  id: 'test-digital-dpc',
  cost_formula: 'standard',           // was 'digital_dpc'; fixed by migration
  base_unit_cost: 650.00,
  wastage_factor: 1.0,                // migration set this from 1.1 → 1.0
  material_markup: 0.154,
  labour_rate_per_unit: 1.0,          // 1 hour labour per unit
  labour_markup: 1.00,
  formula_params: {},                 // migration cleared formula_params
}

const digitalResult = calcStandard(
  { templateId: 'test-digital-dpc', inputQuantity: 1 },
  digitalDpcTemplate,
  CONFIG,
  MATERIALS,
)

expect('digital_dpc — materialTotal (£750.10)', digitalResult.materialTotal, 750.10)
expect('digital_dpc — labourHours  (1 hr)',     digitalResult.labourHours,   1.00)
expect('digital_dpc — labourTotal  (£61.26)',   digitalResult.labourTotal,   61.26)

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

console.log(`\n${'═'.repeat(60)}`)
console.log(`Results: ${passed} passed, ${failed} failed`)
console.log('═'.repeat(60))

if (failed > 0) {
  console.error('\nSome tests FAILED. See details above.\n')
  process.exit(1)
} else {
  console.log('\nAll tests PASSED.\n')
  process.exit(0)
}
