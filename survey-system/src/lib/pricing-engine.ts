// =============================================================================
// Tyne Tees Pricing Engine — Pure Calculation Module
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
  product_key?: string | null
  base_unit_cost?: number | null
  labour_rate?: number | null
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

  // Get base unit cost (from template or override)
  const baseUnitCost = input.overrides?.unit_cost
    ?? template.base_unit_cost
    ?? (template.product_key ? materials[template.product_key] : 0)
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

  // Calculate material cost
  const materialUnitCost = baseUnitCost
  const materialAdjustedCost = baseUnitCost * wastageFactor * quantity
  const materialTotal = applyMarkup(materialAdjustedCost, materialMarkup)

  // Get labour rate (from template or override or config default)
  const labourRate = input.overrides?.labour_rate
    ?? template.labour_rate
    ?? config['hourly_labour_rate']
    ?? 30.63

  // Get labour markup (from template or override or config default)
  const labourMarkup = input.overrides?.labour_markup
    ?? template.labour_markup
    ?? config['default_labour_markup']
    ?? 1.00

  // Calculate labour cost
  const labourHours = quantity * (template.labour_rate ?? 0)
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

  // Get coverage rate (must be in template)
  const coverageRate = template.coverage_rate ?? 1
  if (coverageRate === 0) {
    throw new Error('Coverage rate cannot be zero for ceiling_coverage formula')
  }

  // Calculate units needed (round UP)
  const unitsNeeded = Math.ceil(quantity / coverageRate)

  // Get base unit cost
  const baseUnitCost = input.overrides?.unit_cost
    ?? template.base_unit_cost
    ?? (template.product_key ? materials[template.product_key] : 0)
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
  const materialUnitCost = baseUnitCost
  const materialAdjustedCost = unitsNeeded * (baseUnitCost / coverageRate * wastageFactor)
  const materialTotal = applyMarkup(materialAdjustedCost, materialMarkup)

  // Get labour rate
  const labourRate = input.overrides?.labour_rate
    ?? template.labour_rate
    ?? config['hourly_labour_rate']
    ?? 30.63

  // Get labour markup
  const labourMarkup = input.overrides?.labour_markup
    ?? template.labour_markup
    ?? config['default_labour_markup']
    ?? 1.00

  // Calculate labour (based on actual area, not units)
  const labourHours = quantity * (template.labour_rate ?? 0)
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
 * Specialized for damp proof course injection:
 * - Cream cost per LM = (13.93/1.15) + (6/depth × 4.29)
 * - Labour hours per LM = depth × 0.35
 * - Coverage rate from template (typically holes per meter)
 * - Apply markups
 *
 * Requires inputDimension = wall depth in half-bricks
 *
 * Example: 10 LM of wall, 2.5 brick depth
 * - Cream cost = (13.93/1.15) + (6/2.5 × 4.29) = 12.11 + 10.30 = 22.41 per LM
 * - Labour = 2.5 × 0.35 = 0.875 hours per LM
 */
export function calcDpcInjection(
  input: LineInput,
  template: LineTemplate,
  config: PricingConfig,
  materials: MaterialLookup
): LineResult {
  const linearMeters = input.inputQuantity
  const wallDepth = input.inputDimension ?? 1 // Default to 1 brick if not provided

  // DPC injection formula constants
  const CREAM_BASE_COST = 13.93
  const CREAM_ADJUSTMENT_DIVISOR = 1.15
  const DRILL_PLUG_HOLES_PER_DEPTH = 6
  const DRILL_PLUG_COST = materials['drill_plug'] ?? 4.29
  const LABOUR_HOURS_PER_DEPTH = 0.35

  // Calculate cream cost per linear meter
  const creamCostPerLM = (CREAM_BASE_COST / CREAM_ADJUSTMENT_DIVISOR) +
                         ((DRILL_PLUG_HOLES_PER_DEPTH / wallDepth) * DRILL_PLUG_COST)

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
  const materialUnitCost = creamCostPerLM
  const materialAdjustedCost = creamCostPerLM * wastageFactor * linearMeters
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

  // Calculate labour (depth × 0.35 hours per LM)
  const labourHours = linearMeters * wallDepth * LABOUR_HOURS_PER_DEPTH
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

  // Get labour rate
  const labourRate = input.overrides?.labour_rate
    ?? template.labour_rate
    ?? config['hourly_labour_rate']
    ?? 30.63

  // Get labour markup
  const labourMarkup = input.overrides?.labour_markup
    ?? template.labour_markup
    ?? config['default_labour_markup']
    ?? 1.00

  // Calculate labour (from template labour_rate, which is hours per unit)
  const labourHours = quantity * (template.labour_rate ?? 0)
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
    ?? (template.product_key ? materials[template.product_key] : 0)
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
  const fixedLabourHours = template.labour_rate ?? 0

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
 * Conditional labour rate based on quantity threshold:
 * - If quantity <= 20: hours = 40 / quantity
 * - If quantity > 20: hours = 2 (fixed)
 * - Material = quantity × 0.01 (minimal bag cost)
 * - Apply markups
 *
 * Example: 10 bags = 40/10 = 4 hours, 30 bags = 2 hours
 */
export function calcTieredDisposal(
  input: LineInput,
  template: LineTemplate,
  config: PricingConfig,
  materials: MaterialLookup
): LineResult {
  const quantity = input.inputQuantity

  // Tiered disposal formula constants
  const THRESHOLD = 20
  const HOURS_DIVISOR = 40
  const FIXED_HOURS_ABOVE_THRESHOLD = 2
  const MATERIAL_COST_PER_BAG = 0.01

  // Calculate labour hours based on threshold
  const labourHours = quantity <= THRESHOLD
    ? HOURS_DIVISOR / quantity
    : FIXED_HOURS_ABOVE_THRESHOLD

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
 * 7. BAG AND CART FORMULA
 *
 * Per-bag debris removal:
 * - Hours = 1 per bag (quantity = number of bags)
 * - Material = quantity × 0.01 (minimal bag cost)
 * - Apply markups
 *
 * Example: 15 bags = 15 hours labour
 */
export function calcBagAndCart(
  input: LineInput,
  template: LineTemplate,
  config: PricingConfig,
  materials: MaterialLookup
): LineResult {
  const quantity = input.inputQuantity

  // Bag and cart formula constants
  const HOURS_PER_BAG = 1
  const MATERIAL_COST_PER_BAG = 0.01

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
 * - Material = config['skip_hire_8yd'] (flat rate)
 * - Labour = 0 (no labour for skip hire)
 * - Apply material markup only
 *
 * Quantity input is ignored
 */
export function calcSkipHire(
  input: LineInput,
  template: LineTemplate,
  config: PricingConfig,
  materials: MaterialLookup
): LineResult {
  // Get skip hire cost from config
  const skipCost = config['skip_hire_8yd'] ?? 0

  // Get material markup
  const materialMarkup = input.overrides?.material_markup
    ?? template.material_markup
    ?? config['default_material_markup']
    ?? 0.30

  // Calculate material cost (no wastage)
  const materialUnitCost = skipCost
  const materialAdjustedCost = skipCost
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

    default:
      throw new Error(`Unknown formula type: ${template.cost_formula}`)
  }
}
