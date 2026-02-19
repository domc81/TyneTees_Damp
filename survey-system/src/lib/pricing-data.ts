// =============================================================================
// Tyne Tees Pricing Data Layer — Supabase Data-Fetching Module
// Loads pricing data from database and provides high-level calculation functions.
// =============================================================================

import { getSupabase } from './supabase-client'
import {
  PricingConfig,
  MaterialLookup,
  LineTemplate,
  LineInput,
  LineResult,
  calculateLine
} from './pricing-engine'

// =============================================================================
// Type Definitions
// =============================================================================

/**
 * Section with its associated line templates
 */
export interface SectionWithTemplates {
  id: string
  section_key: string
  section_name: string
  display_order: number
  templates: LineTemplate[]
}

/**
 * Extended LineTemplate with UI display fields from the database
 */
export interface LineTemplateWithDisplay extends LineTemplate {
  description?: string | null
  uom?: string | null
  display_order: number
}

/**
 * Calculated line item result with context
 */
export interface CalculatedLine {
  templateId: string
  input: LineInput
  result: LineResult
  templateDescription: string
  sectionKey: string
}

/**
 * Section totals aggregation
 */
export interface SectionTotal {
  materialTotal: number
  labourTotal: number
  sectionTotal: number
}

/**
 * Complete calculation result for a survey
 */
export interface CalculationResult {
  lines: CalculatedLine[]
  sectionTotals: Record<string, SectionTotal>
  grandTotal: {
    materialTotal: number
    labourTotal: number
    total: number
  }
}

// =============================================================================
// Data Loading Functions
// =============================================================================

/**
 * Load pricing configuration from the database
 *
 * Queries the pricing_config table and transforms it into a key-value map
 * where config_key maps to numeric config_value.
 *
 * Expected keys:
 * - hourly_labour_rate: 30.63
 * - contractor_hourly_rate: 28.00
 * - default_material_markup: 0.30
 * - default_labour_markup: 1.00
 * - default_wastage_factor: 1.10
 * - vat_rate: 0.20
 * - skip_hire_8yd: (cost for 8 yard skip)
 *
 * @returns PricingConfig map of config keys to numeric values
 */
export async function loadPricingConfig(): Promise<PricingConfig> {
  const supabase = getSupabase()
  if (!supabase) {
    console.error('Supabase client not available')
    return {}
  }

  const { data, error } = await supabase
    .from('pricing_config')
    .select('config_key, config_value')

  if (error) {
    console.error('Error loading pricing config:', error)
    return {}
  }

  if (!data) {
    return {}
  }

  // Transform array of rows into key-value map
  const config: PricingConfig = {}
  for (const row of data) {
    if (row.config_key && row.config_value !== null) {
      config[row.config_key] = parseFloat(row.config_value)
    }
  }

  return config
}

/**
 * Load material catalog lookup map from the database
 *
 * Queries the materials_catalog table and transforms it into a lookup map
 * where product_key maps to unit_cost (as number).
 *
 * Only includes active materials (is_active = true) and filters out rows
 * where product_key is null.
 *
 * @returns MaterialLookup map of product keys to unit costs
 */
export async function loadMaterialLookup(): Promise<MaterialLookup> {
  const supabase = getSupabase()
  if (!supabase) {
    console.error('Supabase client not available')
    return {}
  }

  const { data, error } = await supabase
    .from('materials_catalog')
    .select('product_key, unit_cost')
    .eq('is_active', true)

  if (error) {
    console.error('Error loading materials catalog:', error)
    return {}
  }

  if (!data) {
    return {}
  }

  // Transform array into lookup map, filtering out null product_keys
  const materials: MaterialLookup = {}
  for (const row of data) {
    if (row.product_key && row.unit_cost !== null) {
      materials[row.product_key] = row.unit_cost
    }
  }

  return materials
}

/**
 * Load costing sections and their line templates for a specific survey type
 *
 * Queries costing_sections and their associated costing_line_templates
 * for the given survey type (e.g., 'damp', 'timber', 'condensation', 'woodworm').
 *
 * Returns sections in display_order with their templates also ordered by display_order.
 *
 * @param surveyType - The survey type to load sections for
 * @returns Object containing array of sections with their templates
 */
export async function loadSectionTemplates(
  surveyType: string
): Promise<{ sections: SectionWithTemplates[] }> {
  const supabase = getSupabase()
  if (!supabase) {
    console.error('Supabase client not available')
    return { sections: [] }
  }

  // Query sections with their templates in a single query
  const { data, error } = await supabase
    .from('costing_sections')
    .select(`
      id,
      section_key,
      section_name,
      display_order,
      costing_line_templates (
        id,
        cost_formula,
        product_key,
        base_unit_cost,
        labour_rate,
        coverage_rate,
        wastage_factor,
        material_markup,
        labour_markup,
        formula_params,
        description,
        uom,
        display_order
      )
    `)
    .eq('survey_type', surveyType)
    .order('display_order')

  if (error) {
    console.error('Error loading section templates:', error)
    return { sections: [] }
  }

  if (!data) {
    return { sections: [] }
  }

  // Transform the data into SectionWithTemplates format
  const sections: SectionWithTemplates[] = data.map((section: any) => {
    // Get templates and sort by display_order
    const templates: LineTemplate[] = (section.costing_line_templates || [])
      .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
      .map((template: any) => ({
        id: template.id,
        cost_formula: template.cost_formula,
        product_key: template.product_key,
        base_unit_cost: template.base_unit_cost,
        labour_rate: template.labour_rate,
        coverage_rate: template.coverage_rate,
        wastage_factor: template.wastage_factor,
        material_markup: template.material_markup,
        labour_markup: template.labour_markup,
        formula_params: template.formula_params,
        // Include display fields for UI
        description: template.description,
        uom: template.uom,
        display_order: template.display_order
      } as LineTemplate & { description?: string | null; uom?: string | null; display_order: number }))

    return {
      id: section.id,
      section_key: section.section_key,
      section_name: section.section_name,
      display_order: section.display_order,
      templates
    }
  })

  return { sections }
}

// =============================================================================
// High-Level Calculation Function
// =============================================================================

/**
 * Calculate complete survey costing from line inputs
 *
 * This is the main entry point for calculating costs. It:
 * 1. Loads pricing config, materials catalog, and section templates
 * 2. Calculates costs for each line input using the pricing engine
 * 3. Aggregates totals by section
 * 4. Calculates grand totals
 *
 * @param surveyType - The survey type (e.g., 'damp', 'timber', 'condensation', 'woodworm')
 * @param lineInputs - Array of line inputs to calculate
 * @returns Complete calculation result with line details, section totals, and grand total
 */
export async function calculateSurveyCosting(
  surveyType: string,
  lineInputs: LineInput[]
): Promise<CalculationResult> {
  // Load all required data in parallel
  const [config, materials, { sections }] = await Promise.all([
    loadPricingConfig(),
    loadMaterialLookup(),
    loadSectionTemplates(surveyType)
  ])

  // Build lookup maps for templates
  const templateMap = new Map<string, LineTemplate>()
  const templateToSectionMap = new Map<string, string>()
  const templateDescriptionMap = new Map<string, string>()

  for (const section of sections) {
    for (const template of section.templates) {
      templateMap.set(template.id, template)
      templateToSectionMap.set(template.id, section.section_key)

      // Extract description if available (from extended type)
      const extendedTemplate = template as LineTemplate & { description?: string | null }
      templateDescriptionMap.set(
        template.id,
        extendedTemplate.description || 'No description'
      )
    }
  }

  // Calculate costs for each line input
  const calculatedLines: CalculatedLine[] = []
  const sectionTotalsMap = new Map<string, SectionTotal>()

  for (const input of lineInputs) {
    const template = templateMap.get(input.templateId)
    if (!template) {
      console.warn(`Template not found for ID: ${input.templateId}`)
      continue
    }

    const sectionKey = templateToSectionMap.get(input.templateId) || 'unknown'
    const description = templateDescriptionMap.get(input.templateId) || 'No description'

    // Calculate the line using the pricing engine
    const result = calculateLine(input, template, config, materials)

    // Add to calculated lines
    calculatedLines.push({
      templateId: input.templateId,
      input,
      result,
      templateDescription: description,
      sectionKey
    })

    // Aggregate section totals
    const existing = sectionTotalsMap.get(sectionKey) || {
      materialTotal: 0,
      labourTotal: 0,
      sectionTotal: 0
    }

    existing.materialTotal += result.materialTotal
    existing.labourTotal += result.labourTotal
    existing.sectionTotal += result.lineTotal

    sectionTotalsMap.set(sectionKey, existing)
  }

  // Convert section totals map to object
  const sectionTotals: Record<string, SectionTotal> = {}
  sectionTotalsMap.forEach((total, sectionKey) => {
    sectionTotals[sectionKey] = total
  })

  // Calculate grand totals
  let grandMaterialTotal = 0
  let grandLabourTotal = 0
  let grandTotal = 0

  for (const total of sectionTotalsMap.values()) {
    grandMaterialTotal += total.materialTotal
    grandLabourTotal += total.labourTotal
    grandTotal += total.sectionTotal
  }

  return {
    lines: calculatedLines,
    sectionTotals,
    grandTotal: {
      materialTotal: grandMaterialTotal,
      labourTotal: grandLabourTotal,
      total: grandTotal
    }
  }
}
