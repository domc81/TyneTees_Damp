// =============================================================================
// Pricing Engine — Pure Calculation Module
// No Supabase calls, no React. Just types and calculation functions.
// Implements 8 formula types for automated pricing calculations.
// =============================================================================

/**
 * Pricing configuration map (from pricing_config table)
 * Maps config_key string to numeric value
 *
 * Expected keys:
 * - hourly_labour_rate: 30.63
 * - contractor_hourly_rate: 28.00
 * - default_material_markup: 0.30 (30%)
 * - default_labour_markup: 1.00 (100%)
 * - default_wastage_factor: 1.10 (10%)
 * - vat_rate: 0.20 (20%)
 * - skip_hire_8yd: cost for 8 yard skip hire
 */
export interface PricingConfig {
  [config_key: string]: number
}

/**
 * Material lookup map (from materials_catalog table)
 * Maps product_key to unit_cost number
 *
 * Example: { 'cream_dpc': 13.93, 'drill_plug': 4.29, ... }
 */
export interface MaterialLookup {
  [product_key: string]: number
}

/**
 * Input for a single line item calculation
 */
export interface LineInput {
  /** ID of the template from costing_line_templates */
  templateId: string

  /** Primary quantity input (e.g., linear meters, square meters, bags) */
  inputQuantity: number

  /** Optional dimension (e.g., wall depth for DPC injection) */
  inputDimension?: number

  /** Optional overrides for template values */
  overrides?: {
    material_markup?: number
    labour_markup?: number
    wastage_factor?: number
    unit_cost?: number
    labour_rate?: number
  }
}

/**
 * Result of a single line item calculation
 */
export interface LineResult {
  /** Material unit cost (before wastage/markup) */
  materialUnitCost: number

  /** Material cost after wastage adjustment (before markup) */
  materialAdjustedCost: number

  /** Final material cost (after wastage and markup) */
  materialTotal: number

  /** Labour hours required */
  labourHours: number

  /** Final labour cost (hours × rate × markup) */
  labourTotal: number

  /** Combined material + labour total */
  lineTotal: number

  /** Calculated area (for formulas that compute area from dimensions) */
  calculatedArea?: number
}

/**
 * Template structure (from costing_line_templates table)
 * Minimal interface for what the calculation functions need
 */
export interface LineTemplate {
  id: string
  cost_formula: 'standard' | 'ceiling_coverage' | 'dpc_injection' | 'compound_material' | 'fixed_price' | 'tiered_disposal' | 'bag_and_cart' | 'skip_hire'
  base_unit_cost?: number | null
  labour_rate_per_unit?: number | null
  coverage_rate?: number | null
  wastage_factor?: number | null
  material_markup?: number | null
  labour_markup?: number | null
  formula_params?: Record<string, any> | null
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Apply markup to a base cost
 * @param baseCost - The base cost before markup
 * @param markupPct - Markup percentage (e.g., 0.30 = 30%, 1.00 = 100%)
 * @returns Base cost multiplied by (1 + markup percentage)
 */
export function applyMarkup(baseCost: number, markupPct: number): number {
  return baseCost * (1 + markupPct)
}

// =============================================================================
// Formula Type Calculation Functions
// =============================================================================

/**
 * 1. STANDARD FORMULA
 *
 * Simple linear calculation:
 * - Material = base_unit_cost × wastage_factor × quantity
 * - Labour = labour_rate × quantity
 * - Apply markups to both
 *
 * Used for: Most basic items (e.g., linear meters of tanking, bags of plaster)
 */
export function calcStandard(
  input: LineInput,
  template: LineTemplate,
  config: PricingConfig,
  materials: MaterialLookup
): LineResult {
  const quantity = input.inputQuantity

  // Apply minimum quantity if set (e.g. ducting 2.4m minimum charge)
  const params = template.formula_params ?? {}
  const effectiveQuantity = params.minimum_quantity
    ? Math.max(quantity, params.minimum_quantity)
    : quantity

  // Get base unit cost (from template or override)
  const baseUnitCost = input.overrides?.unit_cost
    ?? template.base_unit_cost
    ?? (params.product_key ? materials[params.product_key] : 0)
    ?? 0

  // Get wastage factor (from template or override or config default)
  const wastageFactor = input.overrides?.wastage_factor
    ?? template.wastage_factor
    ?? config['default_wastage_factor']
    ?? 1.10

  // Get material markup (from template or override or config default)
  const materialMarkup = input.overrides?.material_markup
    ?? template.material_markup
    ?? config['default_material_markup']
    ?? 0.30

  // Calculate material cost (using effective quantity for minimum charge)
  const materialUnitCost = baseUnitCost
  const materialAdjustedCost = baseUnitCost * wastageFactor * effectiveQuantity
  const materialTotal = applyMarkup(materialAdjustedCost, materialMarkup)

  // Get labour rate (from override or config default)
  const labourRate = input.overrides?.labour_rate
    ?? config['hourly_labour_rate']
    ?? 30.63

  // Get labour markup (from template or override or config default)
  const labourMarkup = input.overrides?.labour_markup
    ?? template.labour_markup
    ?? config['default_labour_markup']
    ?? 1.00

  // Calculate labour cost (using effective quantity for minimum charge)
  const labourHours = effectiveQuantity * (template.labour_rate_per_unit ?? 0)
  const labourBase = labourHours * labourRate
  const labourTotal = applyMarkup(labourBase, labourMarkup)

  return {
    materialUnitCost,
    materialAdjustedCost,
    materialTotal,
    labourHours,
    labourTotal,
    lineTotal: materialTotal + labourTotal
  }
}

/**
 * 2. CEILING COVERAGE FORMULA
 *
 * Used for coverage-based materials (paint, primer, mesh):
 * - Units needed = CEIL(quantity / coverage_rate) — rounds UP to whole units
 * - Material = units × (unit_cost / coverage_rate × wastage_factor)
 * - Labour = quantity × labour_rate (based on actual area, not units)
 * - Apply markups
 *
 * Example: 7m² at 5m² coverage = 2 units (rounded up from 1.4)
 */
export function calcCeilingCoverage(
  input: LineInput,
  template: LineTemplate,
  config: PricingConfig,
  materials: MaterialLookup
): LineResult {
  const quantity = input.inputQuantity
  const params = template.formula_params ?? {}

  // Get coverage rate (must be in template)
  const coverageRate = template.coverage_rate ?? 1
  if (coverageRate === 0) {
    throw new Error('Coverage rate cannot be zero for ceiling_coverage formula')
  }

  // Calculate units needed (round UP)
  const unitsNeeded = Math.ceil(quantity / coverageRate)

  // Dynamic CPCU: when product_key is set, derive cost per m² from catalogue
  // unit_cost ÷ coverage_rate so material price changes flow through automatically.
  // Falls back to legacy cost_per_coverage_unit or base_unit_cost if material not found.
  const catalogPrice = params.product_key ? materials[params.product_key] : undefined
  const dynamicCPCU = catalogPrice != null ? catalogPrice / coverageRate : undefined

  const baseUnitCost = input.overrides?.unit_cost
    ?? dynamicCPCU
    ?? params.cost_per_coverage_unit
    ?? template.base_unit_cost
    ?? 0

  // Get wastage factor
  const wastageFactor = input.overrides?.wastage_factor
    ?? template.wastage_factor
    ?? config['default_wastage_factor']
    ?? 1.10

  // Get material markup
  const materialMarkup = input.overrides?.material_markup
    ?? template.material_markup
    ?? config['default_material_markup']
    ?? 0.30

  // Calculate material cost
  // roundedArea = area rounded UP to whole purchase-unit boundaries
  // e.g. 7m² at 5m² coverage → 2 units → 10m² rounded area
  const materialUnitCost = baseUnitCost
  const roundedArea = unitsNeeded * coverageRate
  const materialAdjustedCost = roundedArea * baseUnitCost * wastageFactor
  const materialTotal = applyMarkup(materialAdjustedCost, materialMarkup)

  // Get labour rate (from override or config default)
  const labourRate = input.overrides?.labour_rate
    ?? config['hourly_labour_rate']
    ?? 30.63

  // Get labour markup
  const labourMarkup = input.overrides?.labour_markup
    ?? template.labour_markup
    ?? config['default_labour_markup']
    ?? 1.00

  // Calculate labour (based on actual area, not units)
  let labourHours: number
  if (params.labour_block_size && params.labour_hours_per_block) {
    // Block-based rounding: e.g. skimming charges in 15m² blocks at 4 hrs/block
    labourHours = Math.ceil(quantity / params.labour_block_size) * params.labour_hours_per_block
  } else {
    labourHours = quantity * (template.labour_rate_per_unit ?? 0)
  }
  // Apply minimum labour hours if set (e.g. Aquaban 2.7 hrs minimum)
  if (params.minimum_labour_hours) {
    labourHours = Math.max(labourHours, params.minimum_labour_hours)
  }
  const labourBase = labourHours * labourRate
  const labourTotal = applyMarkup(labourBase, labourMarkup)

  return {
    materialUnitCost,
    materialAdjustedCost,
    materialTotal,
    labourHours,
    labourTotal,
    lineTotal: materialTotal + labourTotal
  }
}

/**
 * 3. DPC INJECTION FORMULA
 *
 * Exact translation of Damp Costing workbook row R40 (golden master):
 * - Quantity basis F40 = length × thickness            (LM × metres)
 * - Cream cost/unit H40 = (13.93/1.15) + (6/LENGTH × 4.29)
 *   (Material-List R16: "10 linear metres at a 115mm brick thickness
 *    = 1.15 volume per tube" — the fixed drill/plug element amortises
 *    over the run LENGTH, it does NOT scale with wall thickness)
 * - Labour hours O40 = LENGTH × 0.35   (flat per LM, thickness-independent;
 *   thickness affects material volume only)
 *
 * Requires inputDimension = wall THICKNESS IN METRES (workbook E40, free
 * numeric 3dp — e.g. 0.33 for a 330mm solid wall). Review point 6.
 *
 * Benchmark (review/Brad Brown): 18 LM × 0.33 m
 * - unit = 13.93/1.15 + (6/18 × 4.29) = 13.543; qty = 5.94
 * - materials = 5.94 × 13.543 × 1.3 = £104.58; labour 6.3 h → total £490.52
 */
export function calcDpcInjection(
  input: LineInput,
  template: LineTemplate,
  config: PricingConfig,
  materials: MaterialLookup
): LineResult {
  const linearMeters = input.inputQuantity
  const wallThickness = input.inputDimension ?? 0 // metres (workbook E40)

  // DPC injection formula parameters — read from template, then materials catalog, then hardcoded fallbacks
  const params = template.formula_params ?? {}
  const CREAM_BASE_COST = params.base_cream_cost
    ?? materials['wykamol_ultracure_dpc_cream']
    ?? 13.93
  const CREAM_ADJUSTMENT_DIVISOR = params.cream_divisor ?? 1.15
  const DRILL_PLUG_HOLES = params.holes_per_meter ?? 6
  const DRILL_PLUG_COST = params.drill_cost ?? materials['drill_plugs_12mm'] ?? 4.29
  const LABOUR_HOURS_PER_LM = params.labour_hours_per_lm ?? params.labour_hours_per_depth ?? 0.35

  // Cream cost per quantity unit — workbook H40: the 6×4.29 drill/plug element
  // divides by the run LENGTH (guarded like the workbook's D+E=0 check)
  const creamCostPerUnit = linearMeters > 0
    ? (CREAM_BASE_COST / CREAM_ADJUSTMENT_DIVISOR) + ((DRILL_PLUG_HOLES / linearMeters) * DRILL_PLUG_COST)
    : 0

  // Get wastage factor (template carries 1.0 — workbook applies none here)
  const wastageFactor = input.overrides?.wastage_factor
    ?? template.wastage_factor
    ?? config['default_wastage_factor']
    ?? 1.10

  // Get material markup
  const materialMarkup = input.overrides?.material_markup
    ?? template.material_markup
    ?? config['default_material_markup']
    ?? 0.30

  // Material cost — workbook K40 = (length × thickness) × H40 × (1 + markup)
  const effectiveQuantity = linearMeters * wallThickness
  const materialUnitCost = creamCostPerUnit
  const materialAdjustedCost = creamCostPerUnit * wastageFactor * effectiveQuantity
  const materialTotal = applyMarkup(materialAdjustedCost, materialMarkup)

  // Get labour rate
  const labourRate = input.overrides?.labour_rate
    ?? config['hourly_labour_rate']
    ?? 30.63

  // Get labour markup
  const labourMarkup = input.overrides?.labour_markup
    ?? template.labour_markup
    ?? config['default_labour_markup']
    ?? 1.00

  // Labour — workbook O40 = LENGTH × 0.35 (flat per LM; thickness-independent)
  const labourHours = linearMeters * LABOUR_HOURS_PER_LM
  const labourBase = labourHours * labourRate
  const labourTotal = applyMarkup(labourBase, labourMarkup)

  return {
    materialUnitCost,
    materialAdjustedCost,
    materialTotal,
    labourHours,
    labourTotal,
    lineTotal: materialTotal + labourTotal
  }
}

/**
 * 4. COMPOUND MATERIAL FORMULA
 *
 * For multi-material mixes (e.g., dubbing coat = SBR + sand + cement):
 * - Reads component product_keys from template.formula_params.components
 * - Each component has: { product_key, qty_per_coverage }
 * - Sum component costs per coverage unit
 * - Units needed = CEIL(quantity / coverage_unit)
 * - Material = units × sum × wastage_factor
 * - Labour from template
 * - Apply markups
 *
 * Example formula_params:
 * {
 *   "coverage_unit": 1,
 *   "components": [
 *     { "product_key": "sbr_primer", "qty_per_coverage": 0.5 },
 *     { "product_key": "sharp_sand", "qty_per_coverage": 25 },
 *     { "product_key": "cement", "qty_per_coverage": 12.5 }
 *   ]
 * }
 */
export function calcCompoundMaterial(
  input: LineInput,
  template: LineTemplate,
  config: PricingConfig,
  materials: MaterialLookup
): LineResult {
  const quantity = input.inputQuantity

  // Get formula params
  const params = template.formula_params ?? {}
  const coverageUnit = params.coverage_unit ?? 1
  const components = params.components ?? []

  if (coverageUnit === 0) {
    throw new Error('Coverage unit cannot be zero for compound_material formula')
  }

  // Calculate units needed (round UP)
  const unitsNeeded = Math.ceil(quantity / coverageUnit)

  // Sum component costs per coverage unit
  let costPerUnit = 0
  for (const component of components) {
    const productKey = component.product_key
    const qtyPerCoverage = component.qty_per_coverage ?? 0
    const unitCost = materials[productKey] ?? 0
    costPerUnit += unitCost * qtyPerCoverage
  }

  // Get wastage factor
  const wastageFactor = input.overrides?.wastage_factor
    ?? template.wastage_factor
    ?? config['default_wastage_factor']
    ?? 1.10

  // Get material markup
  const materialMarkup = input.overrides?.material_markup
    ?? template.material_markup
    ?? config['default_material_markup']
    ?? 0.30

  // Calculate material cost
  const materialUnitCost = costPerUnit
  const materialAdjustedCost = unitsNeeded * costPerUnit * wastageFactor
  const materialTotal = applyMarkup(materialAdjustedCost, materialMarkup)

  // Get labour rate (from override or config default)
  const labourRate = input.overrides?.labour_rate
    ?? config['hourly_labour_rate']
    ?? 30.63

  // Get labour markup
  const labourMarkup = input.overrides?.labour_markup
    ?? template.labour_markup
    ?? config['default_labour_markup']
    ?? 1.00

  // Calculate labour (from template labour_rate_per_unit, which is hours per unit)
  const labourHours = quantity * (template.labour_rate_per_unit ?? 0)
  const labourBase = labourHours * labourRate
  const labourTotal = applyMarkup(labourBase, labourMarkup)

  return {
    materialUnitCost,
    materialAdjustedCost,
    materialTotal,
    labourHours,
    labourTotal,
    lineTotal: materialTotal + labourTotal
  }
}

/**
 * 5. FIXED PRICE FORMULA
 *
 * Flat rate items (e.g., PIV units, loft hatches):
 * - Material = unit_cost (flat, no quantity scaling)
 * - Labour = fixed hours from template (no quantity scaling)
 * - Apply markups
 *
 * Quantity input is ignored for cost calculation (but may be used for display)
 */
export function calcFixedPrice(
  input: LineInput,
  template: LineTemplate,
  config: PricingConfig,
  materials: MaterialLookup
): LineResult {
  // Get base unit cost (flat)
  const baseUnitCost = input.overrides?.unit_cost
    ?? template.base_unit_cost
    ?? (template.formula_params?.product_key ? materials[template.formula_params.product_key] : 0)
    ?? 0

  // Get material markup
  const materialMarkup = input.overrides?.material_markup
    ?? template.material_markup
    ?? config['default_material_markup']
    ?? 0.30

  // Calculate material cost (no wastage, no quantity)
  const materialUnitCost = baseUnitCost
  const materialAdjustedCost = baseUnitCost
  const materialTotal = applyMarkup(materialAdjustedCost, materialMarkup)

  // Get labour hours (fixed from template)
  const fixedLabourHours = template.labour_rate_per_unit ?? 0

  // Get labour rate
  const labourRate = input.overrides?.labour_rate
    ?? config['hourly_labour_rate']
    ?? 30.63

  // Get labour markup
  const labourMarkup = input.overrides?.labour_markup
    ?? template.labour_markup
    ?? config['default_labour_markup']
    ?? 1.00

  // Calculate labour
  const labourHours = fixedLabourHours
  const labourBase = labourHours * labourRate
  const labourTotal = applyMarkup(labourBase, labourMarkup)

  return {
    materialUnitCost,
    materialAdjustedCost,
    materialTotal,
    labourHours,
    labourTotal,
    lineTotal: materialTotal + labourTotal
  }
}

/**
 * 6. TIERED DISPOSAL FORMULA
 *
 * Subcontractor material cost with ZERO labour:
 * - If quantity = 0: £0
 * - If quantity <= threshold (20): flat minimum charge (£40)
 * - If quantity > threshold: per-bag rate (£2) × quantity
 * - Apply material markup only
 * - Labour hours = 0, labour cost = 0
 *
 * Constants read from formula_params: { threshold, min_charge, per_bag_over }
 *
 * Example: 10 bags = £40 × 1.30 = £52, 30 bags = 30 × £2 × 1.30 = £78
 */
export function calcTieredDisposal(
  input: LineInput,
  template: LineTemplate,
  config: PricingConfig,
  materials: MaterialLookup
): LineResult {
  const quantity = input.inputQuantity

  // Read constants from formula_params (seeded in damp template), with defaults
  const params = template.formula_params ?? {}
  const THRESHOLD = params.threshold ?? 20
  const MIN_CHARGE = params.min_charge ?? 40
  const PER_BAG_RATE = params.per_bag_over ?? 2

  // Calculate base material cost based on tier
  let baseMaterialCost: number
  if (quantity === 0) {
    baseMaterialCost = 0
  } else if (quantity <= THRESHOLD) {
    baseMaterialCost = MIN_CHARGE
  } else {
    baseMaterialCost = quantity * PER_BAG_RATE
  }

  // Get material markup
  const materialMarkup = input.overrides?.material_markup
    ?? template.material_markup
    ?? config['default_material_markup']
    ?? 0.30

  // Material cost with markup (no wastage — subcontractor flat rate)
  const materialUnitCost = quantity <= THRESHOLD ? MIN_CHARGE : PER_BAG_RATE
  const materialAdjustedCost = baseMaterialCost
  const materialTotal = applyMarkup(baseMaterialCost, materialMarkup)

  // Zero labour — disposal is entirely a subcontractor cost
  const labourHours = 0
  const labourTotal = 0

  return {
    materialUnitCost,
    materialAdjustedCost,
    materialTotal,
    labourHours,
    labourTotal,
    lineTotal: materialTotal + labourTotal
  }
}

/**
 * 7. BAG AND CART FORMULA
 *
 * Per-bag debris removal:
 * - Hours = 0.01 per bag (~36 seconds — loading a bag onto a cart) [workbook col N]
 * - Material = quantity × 1.00 (£1 per bag) [workbook col H]
 * - Apply markups
 *
 * Example: 40 bags = 0.4 hours labour, £40 material cost
 */
export function calcBagAndCart(
  input: LineInput,
  template: LineTemplate,
  config: PricingConfig,
  materials: MaterialLookup
): LineResult {
  const quantity = input.inputQuantity

  // Bag and cart formula constants — read from formula_params, fallback to workbook values
  const params = template.formula_params ?? {}
  const HOURS_PER_BAG = params.hours_per_bag ?? 0.01           // workbook col N: ~36 seconds per bag
  const MATERIAL_COST_PER_BAG = params.material_cost_per_bag ?? 1.00  // workbook col H: £1 per bag

  // Calculate labour hours
  const labourHours = quantity * HOURS_PER_BAG

  // Get labour rate
  const labourRate = input.overrides?.labour_rate
    ?? config['hourly_labour_rate']
    ?? 30.63

  // Get labour markup
  const labourMarkup = input.overrides?.labour_markup
    ?? template.labour_markup
    ?? config['default_labour_markup']
    ?? 1.00

  // Calculate labour
  const labourBase = labourHours * labourRate
  const labourTotal = applyMarkup(labourBase, labourMarkup)

  // Calculate minimal material cost
  const materialUnitCost = MATERIAL_COST_PER_BAG
  const materialAdjustedCost = quantity * MATERIAL_COST_PER_BAG
  const materialMarkup = input.overrides?.material_markup
    ?? template.material_markup
    ?? config['default_material_markup']
    ?? 0.30
  const materialTotal = applyMarkup(materialAdjustedCost, materialMarkup)

  return {
    materialUnitCost,
    materialAdjustedCost,
    materialTotal,
    labourHours,
    labourTotal,
    lineTotal: materialTotal + labourTotal
  }
}

/**
 * 8. SKIP HIRE FORMULA
 *
 * Reads cost from pricing_config:
 * - Material = config['skip_hire_8yd'] × quantity
 * - Labour = 0 (no labour for skip hire)
 * - Apply material markup only
 */
/**
 * 9. WHOLE PACK FORMULA
 *
 * Timber workbook rows R65-67 (resin) and R105-107 (sterilant/protective/gel):
 * materials price by WHOLE PACKS, not per-unit spread —
 *   K = ROUNDUP(quantity / pack_size) × pack_cost_adjusted × (1 + markup)
 * (unlike ceiling_coverage, the rounded pack count multiplies the FULL pack
 * price; the workbook's H holds the pack cost, any ×1.1 already inside it).
 * Labour = quantity × labour_rate_per_unit (O = F × N).
 *
 * formula_params: { pack_size, pack_cost }
 */
export function calcWholePack(
  input: LineInput,
  template: LineTemplate,
  config: PricingConfig,
  materials: MaterialLookup
): LineResult {
  const quantity = input.inputQuantity
  const params = template.formula_params ?? {}
  const packSize = params.pack_size ?? template.coverage_rate ?? 1
  const packCost = input.overrides?.unit_cost
    ?? params.pack_cost
    ?? (params.product_key ? materials[params.product_key] : undefined)
    ?? template.base_unit_cost
    ?? 0

  const wastageFactor = input.overrides?.wastage_factor
    ?? template.wastage_factor
    ?? config['default_wastage_factor']
    ?? 1.10
  const materialMarkup = input.overrides?.material_markup
    ?? template.material_markup
    ?? config['default_material_markup']
    ?? 0.30

  const packsNeeded = quantity > 0 ? Math.ceil(quantity / packSize) : 0
  const materialUnitCost = packSize > 0 ? packCost / packSize : 0
  const materialAdjustedCost = packsNeeded * packCost * wastageFactor
  const materialTotal = applyMarkup(materialAdjustedCost, materialMarkup)

  const labourRate = input.overrides?.labour_rate
    ?? config['hourly_labour_rate']
    ?? 30.63
  const labourMarkup = input.overrides?.labour_markup
    ?? template.labour_markup
    ?? config['default_labour_markup']
    ?? 1.00
  const labourHours = quantity * (template.labour_rate_per_unit ?? 0)
  const labourTotal = applyMarkup(labourHours * labourRate, labourMarkup)

  return {
    materialUnitCost,
    materialAdjustedCost,
    materialTotal,
    labourHours,
    labourTotal,
    lineTotal: materialTotal + labourTotal
  }
}

export function calcSkipHire(
  input: LineInput,
  template: LineTemplate,
  config: PricingConfig,
  materials: MaterialLookup
): LineResult {
  const quantity = input.inputQuantity

  // Get skip hire cost from config
  const skipCost = config['skip_hire_8yd_cost'] ?? 0

  // Get material markup
  const materialMarkup = input.overrides?.material_markup
    ?? template.material_markup
    ?? config['default_material_markup']
    ?? 0.30

  // Calculate material cost (no wastage, scales with quantity)
  const materialUnitCost = skipCost
  const materialAdjustedCost = skipCost * quantity
  const materialTotal = applyMarkup(materialAdjustedCost, materialMarkup)

  // No labour for skip hire
  const labourHours = 0
  const labourTotal = 0

  return {
    materialUnitCost,
    materialAdjustedCost,
    materialTotal,
    labourHours,
    labourTotal,
    lineTotal: materialTotal + labourTotal
  }
}

// =============================================================================
// Main Calculation Function
// =============================================================================

/**
 * Calculate costs for a single line item
 *
 * Switches on template.cost_formula to call the appropriate calculation function
 *
 * @param input - Input parameters for the line item
 * @param template - Template from costing_line_templates table
 * @param config - Pricing configuration from pricing_config table
 * @param materials - Material costs from materials_catalog table
 * @returns Calculated costs for the line item
 * @throws Error if formula type is unknown
 */
export function calculateLine(
  input: LineInput,
  template: LineTemplate,
  config: PricingConfig,
  materials: MaterialLookup
): LineResult {
  switch (template.cost_formula) {
    case 'standard':
      return calcStandard(input, template, config, materials)

    case 'ceiling_coverage':
      return calcCeilingCoverage(input, template, config, materials)

    case 'dpc_injection':
      return calcDpcInjection(input, template, config, materials)

    case 'compound_material':
      return calcCompoundMaterial(input, template, config, materials)

    case 'fixed_price':
      return calcFixedPrice(input, template, config, materials)

    case 'tiered_disposal':
      return calcTieredDisposal(input, template, config, materials)

    case 'bag_and_cart':
      return calcBagAndCart(input, template, config, materials)

    case 'skip_hire':
      return calcSkipHire(input, template, config, materials)

    case 'whole_pack':
      return calcWholePack(input, template, config, materials)

    default:
      throw new Error(`Unknown formula type: ${template.cost_formula}`)
  }
}
