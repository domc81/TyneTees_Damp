// =============================================================================
// CF CSV Export — Generates Contractor Foreman CSV import file
//
// Replicates the VBA export logic from the Excel workbooks:
// - Only bundle rows are output (2 per section: Materials + Labour)
// - Detail rows are aggregated, not exported individually
// - Zero-cost sections are excluded
// - Column N = D × E (raw line value), P = N × (1 + H/100) (with markup)
// - Column Q = "Yes" on all bundle rows (the row-survival flag)
// - Column O = "LEAVE" (we pre-exclude zero-cost sections rather than DELETE)
//
// Section combining rules (workbook → our DB):
//   Damp/Timber/Woodworm: preparatory_work + strip_out → "Stripping out..."
//   Damp/Timber: dpc_traditional + dpc_digital + wall_membrane → "Walls..."
//   Damp/Timber: plastering (non-Warmline) → "Plastering & finishing"
//   Damp/Timber: plastering (Warmline IWI) → "Warmline Internal Wall Insulation"
//   All types: site_preparation.preparatory_work + strip_out_disposal → "Stripping out..."
//   All types: site_preparation.skip_hire → PSO Materials
//   All types: travel_overhead → PSO Materials (vehicle) + PSO Labour (travel)
// =============================================================================

import type { CalculationResult, CalculatedLine } from './pricing-data'
import type { TravelOverheadResult } from './travel-overhead'
import {
  CF_SURVEY_CONFIG,
  PSO_SECTION,
  SITE_PREP_STRIPPING_OUT_KEYS,
  SITE_PREP_PSO_KEYS,
  PRIMARY_TYPE_PRIORITY,
} from './cf-export-config'

// =============================================================================
// Constants
// =============================================================================

/**
 * Standard hourly labour rate — mirrors pricing_config.hourly_labour_rate.
 *
 * Used to derive the pre-markup labour cost from labourHours:
 *   rawLabour = labourHours × STANDARD_HOURLY_RATE
 *
 * This is correct even for templates with non-100% labour markup (e.g. PIV units
 * at 300–400%) because all templates use this base rate. The markup varies but
 * the base rate is constant.
 */
const STANDARD_HOURLY_RATE = 30.63

// =============================================================================
// Internal types
// =============================================================================

/** Aggregated pre/post-markup costs for one CF section */
interface SectionCosts {
  /** Sum of materialAdjustedCost (before markup), section-adj applied */
  materialRaw: number
  /** Sum of materialTotal (after markup), section-adj applied */
  materialTotal: number
  /** Sum of labourHours (hours don't scale with section adjustment) */
  labourHours: number
  /** Sum of raw labour cost = labourHours × STANDARD_HOURLY_RATE, section-adj applied */
  labourRaw: number
  /** Sum of labourTotal (after markup), section-adj applied */
  labourTotal: number
}

function emptySectionCosts(): SectionCosts {
  return {
    materialRaw: 0,
    materialTotal: 0,
    labourHours: 0,
    labourRaw: 0,
    labourTotal: 0,
  }
}

function addSectionCosts(a: SectionCosts, b: SectionCosts): SectionCosts {
  return {
    materialRaw: a.materialRaw + b.materialRaw,
    materialTotal: a.materialTotal + b.materialTotal,
    labourHours: a.labourHours + b.labourHours,
    labourRaw: a.labourRaw + b.labourRaw,
    labourTotal: a.labourTotal + b.labourTotal,
  }
}

// =============================================================================
// Aggregation helpers
// =============================================================================

/**
 * Aggregate costs from a subset of CalculatedLine items.
 *
 * @param lines - All lines from one survey type's CalculationResult
 * @param sectionKeys - Which sectionKeys to include
 * @param templateFilter - Optional filter on templateDescription (for Warmline split)
 * @param sectionAdjustments - Map of sectionKey → adjustment % (e.g. 10 = +10%)
 */
function aggregateSectionCosts(
  lines: CalculatedLine[],
  sectionKeys: readonly string[],
  templateFilter: ((desc: string) => boolean) | undefined,
  sectionAdjustments: Record<string, number>
): SectionCosts {
  const costs = emptySectionCosts()

  for (const line of lines) {
    if (!sectionKeys.includes(line.sectionKey)) continue
    if (templateFilter && !templateFilter(line.templateDescription)) continue

    const adj = sectionAdjustments[line.sectionKey] || 0
    const adjFactor = 1 + adj / 100

    // Material costs: both raw and total scale by adjFactor
    costs.materialRaw += line.result.materialAdjustedCost * adjFactor
    costs.materialTotal += line.result.materialTotal * adjFactor

    // Labour: hours stay the same, costs scale by adjFactor
    costs.labourHours += line.result.labourHours
    costs.labourRaw += line.result.labourHours * STANDARD_HOURLY_RATE * adjFactor
    costs.labourTotal += line.result.labourTotal * adjFactor
  }

  return costs
}

// =============================================================================
// CSV formatting helpers
// =============================================================================

/** Standard CSV escaping — wraps values containing comma, quote, or newline */
function csvEscape(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r')) {
    return '"' + value.replace(/"/g, '""') + '"'
  }
  return value
}

/** Format a number to exactly 2 decimal places */
function fmt2(n: number): string {
  return n.toFixed(2)
}

/**
 * Format a markup percentage as a number, removing trailing zeros after the decimal.
 * e.g. 30.00 → "30", 15.40 → "15.4", 0.00 → "0"
 */
function fmtMarkup(pct: number): string {
  // Round to 2dp then strip trailing zeros
  return parseFloat(pct.toFixed(2)).toString()
}

/**
 * Compute the effective blended markup percentage from raw and total costs.
 * Returns 0 if raw is zero (avoids division by zero).
 */
function blendedMarkupPct(raw: number, total: number): number {
  if (raw <= 0) return 0
  return ((total - raw) / raw) * 100
}

// =============================================================================
// Main export function
// =============================================================================

/**
 * Generate a Contractor Foreman CSV import file from costing results.
 *
 * Replicates the VBA export from the workbooks:
 * - Aggregates line items into per-section bundle rows (Materials + Labour)
 * - Bakes in section adjustments
 * - Combines multi-type sections (e.g. damp + timber "Stripping out" merged)
 * - Routes site_preparation costs to "Stripping out" and PSO
 * - Routes travel overhead to PSO (vehicle → Materials, travel labour → Labour)
 * - Excludes zero-cost sections
 * - Produces correctly formatted CSV with all 17 columns (A–Q)
 *
 * @param costingResults - Output from generateCostingFromSurvey (keyed by survey type)
 * @param travelOverhead - Travel/vehicle overhead calculated from total labour hours
 * @param sectionAdjustments - Per-section adjustment percentages (e.g. 10 = +10%)
 * @param surveyTypes - Active survey types present in this job (excludes 'site_preparation')
 * @param surveyRef - Survey reference (used for filename context)
 */
export function generateCFCSV(
  costingResults: Record<string, CalculationResult>,
  travelOverhead: TravelOverheadResult,
  sectionAdjustments: Record<string, number>,
  surveyTypes: string[],
  surveyRef: string
): { csv: string; filename: string } {
  // ── Step 1: Determine primary survey type ────────────────────────────────
  // Priority: damp > timber > woodworm > condensation
  const primaryType =
    PRIMARY_TYPE_PRIORITY.find(t => surveyTypes.includes(t)) ?? surveyTypes[0]

  const primaryConfig = CF_SURVEY_CONFIG[primaryType]
  if (!primaryConfig) {
    throw new Error(`No CF export config found for survey type: ${primaryType}`)
  }

  const matCode = primaryConfig.materialsCostCode
  const lbrCode = primaryConfig.labourCostCode

  // ── Step 2: Build ordered map of CF sections → aggregated costs ──────────
  // Map preserves insertion order (primary type sets the section order).
  // Secondary types append any new sections they introduce.
  const cfSectionMap = new Map<
    string,
    { isOptional: boolean; costs: SectionCosts }
  >()

  function addToCFSection(
    cfSectionName: string,
    isOptional: boolean,
    newCosts: SectionCosts
  ): void {
    const existing = cfSectionMap.get(cfSectionName)
    if (existing) {
      existing.costs = addSectionCosts(existing.costs, newCosts)
    } else {
      cfSectionMap.set(cfSectionName, {
        isOptional,
        costs: { ...newCosts },
      })
    }
  }

  // Process survey types: primary first (establishes section order), then secondary
  const orderedTypes = [
    primaryType,
    ...surveyTypes.filter(t => t !== primaryType && t !== 'site_preparation'),
  ]

  for (const surveyType of orderedTypes) {
    const config = CF_SURVEY_CONFIG[surveyType]
    if (!config) continue

    const result = costingResults[surveyType]
    if (!result || result.lines.length === 0) continue

    for (const sectionDef of config.sections) {
      const costs = aggregateSectionCosts(
        result.lines,
        sectionDef.sectionKeys,
        sectionDef.templateFilter,
        sectionAdjustments
      )
      addToCFSection(sectionDef.cfSectionName, sectionDef.isOptional, costs)
    }
  }

  // ── Step 3: Route site_preparation into CF sections ─────────────────────
  const sitePrepResult = costingResults['site_preparation']

  // Find the "Stripping out..." section name from the primary type's config.
  // Condensation has no stripping-out section, so site_prep items are skipped.
  const strippingOutDef = primaryConfig.sections.find(s =>
    s.sectionKeys.includes('preparatory_work')
  )

  if (sitePrepResult && sitePrepResult.lines.length > 0) {
    if (strippingOutDef) {
      // Route preparatory_work + strip_out_disposal → "Stripping out..."
      const strippingCosts = aggregateSectionCosts(
        sitePrepResult.lines,
        SITE_PREP_STRIPPING_OUT_KEYS,
        undefined,
        sectionAdjustments
      )
      addToCFSection(strippingOutDef.cfSectionName, false, strippingCosts)
    }
    // Skip hire is handled below as part of PSO (not added to cfSectionMap)
  }

  // ── Step 4: Build CSV rows ───────────────────────────────────────────────
  const CSV_HEADER = [
    'Section',
    'Section Description',
    'Item Name',
    'Quantity',
    'Unit Cost',
    'Unit',
    'Cost Code',
    'Markup',
    'Markup Type',
    'Item Type',
    'Is Taxable',
    'Is Optional',
    'Assigned To',
    'CF IGNORE - LINE VALUE',
    'CF IGNORE - Zero value Section Validation',
    'CF IGNORE - LINE VALUE FOR CUSTOMER SUMMARY',
    'CF IGNORE - INCLUDE PRICE IN CUSTOMER SUMMARY',
  ]

  const rows: string[][] = [CSV_HEADER]

  // Emit bundle rows for each non-zero CF section
  for (const [cfSectionName, { isOptional, costs }] of cfSectionMap) {
    const optStr = isOptional ? 'Yes' : 'No'

    // Skip section entirely if both materials and labour are zero
    if (costs.materialTotal <= 0 && costs.labourTotal <= 0) continue

    // Materials bundle row (emit if raw material cost > 0)
    if (costs.materialRaw > 0) {
      const matMarkup = fmtMarkup(blendedMarkupPct(costs.materialRaw, costs.materialTotal))
      const matLineValue = fmt2(costs.materialRaw)          // Col N = D×E = 1 × raw
      const matLineCustomer = fmt2(costs.materialTotal)     // Col P = N × (1 + H/100)
      rows.push([
        cfSectionName,
        '',
        `${cfSectionName} - Materials`,
        '1',
        fmt2(costs.materialRaw),
        'EACH',
        matCode,
        matMarkup,
        '%',
        'MTL',
        'Yes',
        optStr,
        'Preservation Shop',
        matLineValue,
        'LEAVE',
        matLineCustomer,
        'Yes',
      ])
    }

    // Labour bundle row (emit if there are any labour hours)
    if (costs.labourHours > 0) {
      const lbrUnitCost = costs.labourRaw / costs.labourHours  // blended rate
      const lbrMarkup = fmtMarkup(blendedMarkupPct(costs.labourRaw, costs.labourTotal))
      const lbrLineValue = fmt2(costs.labourRaw)            // Col N = hours × blendedRate
      const lbrLineCustomer = fmt2(costs.labourTotal)       // Col P = N × (1 + H/100)
      rows.push([
        cfSectionName,
        '',
        `${cfSectionName} - Labour`,
        fmt2(costs.labourHours),
        fmt2(lbrUnitCost),
        'Hours',
        lbrCode,
        lbrMarkup,
        '%',
        'LBR',
        'Yes',
        optStr,
        '',
        lbrLineValue,
        'LEAVE',
        lbrLineCustomer,
        'Yes',
      ])
    }
  }

  // ── Step 5: PSO section ──────────────────────────────────────────────────
  // PSO Materials = skip hire (30% markup) + vehicle mileage (0% markup)
  // PSO Labour    = travel labour hours/cost (0% markup)
  // Column B is populated with the PSO description on both bundle rows.

  let psoMatSkipRaw = 0
  let psoMatSkipTotal = 0

  // Collect skip hire costs from site_preparation
  if (sitePrepResult && sitePrepResult.lines.length > 0) {
    const skipCosts = aggregateSectionCosts(
      sitePrepResult.lines,
      SITE_PREP_PSO_KEYS,
      undefined,
      sectionAdjustments
    )
    psoMatSkipRaw = skipCosts.materialRaw
    psoMatSkipTotal = skipCosts.materialTotal
    // Note: skip_hire formula produces no labour hours, so labourHours = 0
  }

  // Vehicle mileage: 0% markup (raw = total)
  const psoVehicleRaw = travelOverhead.vehicleMileageCost
  const psoVehicleTotal = travelOverhead.vehicleMileageCost  // 0% markup

  // Combined PSO Materials
  const psoMatRaw = psoMatSkipRaw + psoVehicleRaw
  const psoMatTotal = psoMatSkipTotal + psoVehicleTotal

  // Travel labour: 0% markup (raw = total)
  const psoLbrHours = travelOverhead.travelHours
  const psoLbrRaw = travelOverhead.travelLabourCost    // hours × hourly_rate, no markup
  const psoLbrTotal = travelOverhead.travelLabourCost  // 0% markup

  const psoHasContent = psoMatTotal > 0 || psoLbrTotal > 0

  if (psoHasContent) {
    const psoName = PSO_SECTION.cfSectionName
    const psoDesc = PSO_SECTION.description

    // PSO Materials bundle
    if (psoMatRaw > 0) {
      const psoMatMarkup = fmtMarkup(blendedMarkupPct(psoMatRaw, psoMatTotal))
      const psoMatLineValue = fmt2(psoMatRaw)
      const psoMatLineCustomer = fmt2(psoMatTotal)
      rows.push([
        psoName,
        psoDesc,
        `${psoName} - Materials`,
        '1',
        fmt2(psoMatRaw),
        'EACH',
        matCode,
        psoMatMarkup,
        '%',
        'MTL',
        'Yes',
        'No',
        'Preservation Shop',
        psoMatLineValue,
        'LEAVE',
        psoMatLineCustomer,
        'Yes',
      ])
    }

    // PSO Labour bundle (only if there are travel hours)
    if (psoLbrHours > 0) {
      const psoLbrUnitCost = psoLbrRaw / psoLbrHours  // = hourly_labour_rate
      const psoLbrMarkup = '0'                         // 0% markup for travel
      const psoLbrLineValue = fmt2(psoLbrRaw)
      const psoLbrLineCustomer = fmt2(psoLbrTotal)     // same as raw (0% markup)
      rows.push([
        psoName,
        psoDesc,
        `${psoName} - Labour`,
        fmt2(psoLbrHours),
        fmt2(psoLbrUnitCost),
        'Hours',
        lbrCode,
        psoLbrMarkup,
        '%',
        'LBR',
        'Yes',
        'No',
        '',
        psoLbrLineValue,
        'LEAVE',
        psoLbrLineCustomer,
        'Yes',
      ])
    }
  }

  // ── Step 6: Serialise to CSV ─────────────────────────────────────────────
  const csv = rows.map(row => row.map(csvEscape).join(',')).join('\n')

  // ── Step 7: Build filename ───────────────────────────────────────────────
  // Format: CF-{SurveyType}-{DD-MM-YY-HH-MM-SS}.csv
  // Mirrors the VBA: Format(Now(), "dd-mm-yy-hh-mm-ss")
  const now = new Date()
  const pad = (n: number): string => n.toString().padStart(2, '0')
  const timestamp = [
    pad(now.getDate()),
    pad(now.getMonth() + 1),
    now.getFullYear().toString().slice(-2),
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join('-')

  const typeLabel = primaryType.charAt(0).toUpperCase() + primaryType.slice(1)
  const filename = `CF-${typeLabel}-${timestamp}.csv`

  return { csv, filename }
}
