// =============================================================================
// Contractor (operative/subcontractor) outputs — review pt 15, Phase 3.
//
// Reproduces the workbooks' Sub Contractor Costs columns (U/V on every
// costing sheet), verified against the parity oracle's extracted values:
//
//   U (contractor materials) = material cost after wastage, BEFORE customer
//                              markup × contractor_material_uplift (wb ×1.1)
//   V (contractor pay)       = labour hours × contractor_hourly_rate (wb £28)
//   contractor travel        = working days × round-trip miles ×
//                              contractor_mileage_rate (wb ×0.45)
//
// Contractor outputs are workbook row-level: customer section adjustment
// percentages and customer markups NEVER touch them. Hours are the same
// hours the customer engine computes (hours don't scale with adjustments).
//
// INTERNAL ONLY: these figures are for owner/admin/office. They must never
// appear on customer surfaces, and operative work instructions show pay rate
// and travel allowance — never customer prices or margins.
// =============================================================================

import type { CalculationResult, CalculatedLine } from './pricing-data'
import type { TravelOverheadResult } from './travel-overhead'
import type { PricingConfig } from './pricing-engine'

// Workbook fallbacks — live values come from pricing_config (admin-editable
// at /admin/rates; the keys were reserved for exactly this feature)
const DEFAULT_CONTRACTOR_RATE = 28.0
const DEFAULT_MATERIAL_UPLIFT = 1.1
const DEFAULT_MILEAGE_RATE = 0.45

export interface ContractorLine {
  templateId: string
  description: string
  sectionKey: string
  surveyType: string
  quantity: number
  hours: number
  /** Contractor materials — raw (post-wastage, pre-markup) cost × uplift */
  materials: number
  /** Contractor pay — hours × contractor rate */
  pay: number
  total: number
}

export interface ContractorSection {
  sectionKey: string
  surveyType: string
  hours: number
  materials: number
  pay: number
  total: number
}

export interface ContractorOutputs {
  lines: ContractorLine[]
  sections: ContractorSection[]
  /** Sum of line hours (before travel) */
  labourHours: number
  materialsTotal: number
  payTotal: number
  /** Working days × round-trip miles × contractor mileage rate */
  travel: number
  /** materials + pay + travel */
  grandTotal: number
  /** Working days (from the travel-overhead engine: ceil(hours / 6.5 / men)) */
  labourDays: number
  rates: {
    contractorHourlyRate: number
    materialUplift: number
    mileageRate: number
  }
}

const round2 = (n: number) => Math.round(n * 100) / 100

// Third-party rows: disposal via transfer agent and skip hire are invoiced by
// external companies, not paid to the operative crew — they carry no
// contractor materials or pay. (The damp/condensation/timber workbooks agree;
// the woodworm workbook's U column includes them — treated as a workbook
// defect and documented as a deliberate deviation, like its prep-hours
// subtotal defect.)
const THIRD_PARTY_FORMULAS = new Set(['tiered_disposal', 'skip_hire'])

export interface ContractorRates {
  contractorHourlyRate: number
  materialUplift: number
  mileageRate: number
}

export function contractorRatesFromConfig(config: PricingConfig): ContractorRates {
  return {
    contractorHourlyRate: config['contractor_hourly_rate'] ?? DEFAULT_CONTRACTOR_RATE,
    materialUplift: config['contractor_material_uplift'] ?? DEFAULT_MATERIAL_UPLIFT,
    mileageRate: config['contractor_mileage_rate'] ?? DEFAULT_MILEAGE_RATE,
  }
}

/**
 * Contractor values for one engine line — the workbook's U/V columns.
 * Returns null for third-party rows (external invoices, no operative work).
 */
export function contractorLineValues(
  line: CalculatedLine,
  rates: ContractorRates
): { hours: number; materials: number; pay: number } | null {
  if (line.costFormula && THIRD_PARTY_FORMULAS.has(line.costFormula)) return null
  const hours = line.result.labourHours
  const materials = line.result.materialAdjustedCost * rates.materialUplift
  const pay = hours * rates.contractorHourlyRate
  return { hours, materials, pay }
}

/**
 * Compute contractor outputs from the customer engine's calculation results.
 *
 * @param results          Per-survey-type calculation results (the same object
 *                         the costing page and parity runner hold)
 * @param travel           Travel overhead result (for labourDays) — null when
 *                         travel inputs are missing
 * @param distanceOneWayMiles One-way office→site distance (additional_works)
 * @param config           pricing_config map
 * @param isSectionIncluded Optional filter — excluded (optional, not included)
 *                         sections produce no operative work
 */
export function calculateContractorOutputs(
  results: Record<string, CalculationResult>,
  travel: TravelOverheadResult | null,
  distanceOneWayMiles: number,
  config: PricingConfig,
  isSectionIncluded?: (sectionKey: string) => boolean
): ContractorOutputs {
  const rates = contractorRatesFromConfig(config)

  const lines: ContractorLine[] = []
  const sectionMap = new Map<string, ContractorSection>()

  for (const [surveyType, result] of Object.entries(results)) {
    for (const line of result.lines) {
      if (isSectionIncluded && !isSectionIncluded(line.sectionKey)) continue
      const values = contractorLineValues(line, rates)
      if (!values) continue
      const { hours, materials, pay } = values
      if (hours === 0 && materials === 0) continue

      // The workbook's Sub Contractor Costs tab splits Warmline out of
      // Plastering into its own row (damp D16 = Costing!V79). Mirror that at
      // the section level; line values and totals are untouched.
      const displaySection = line.lineKey?.startsWith('warmline')
        ? 'warmline_iwi'
        : line.sectionKey

      lines.push({
        templateId: line.templateId,
        description: line.templateDescription,
        sectionKey: displaySection,
        surveyType,
        quantity: line.input.inputQuantity,
        hours,
        materials,
        pay,
        total: materials + pay,
      })

      const existing = sectionMap.get(displaySection) ?? {
        sectionKey: displaySection,
        surveyType,
        hours: 0,
        materials: 0,
        pay: 0,
        total: 0,
      }
      existing.hours += hours
      existing.materials += materials
      existing.pay += pay
      existing.total += materials + pay
      sectionMap.set(displaySection, existing)
    }
  }

  const labourHours = lines.reduce((sum, l) => sum + l.hours, 0)
  const materialsTotal = lines.reduce((sum, l) => sum + l.materials, 0)
  const payTotal = lines.reduce((sum, l) => sum + l.pay, 0)

  const labourDays = travel?.labourDays ?? 0
  const travelCost = labourDays * (distanceOneWayMiles * 2) * rates.mileageRate

  return {
    lines,
    sections: Array.from(sectionMap.values()),
    labourHours,
    materialsTotal,
    payTotal,
    travel: travelCost,
    grandTotal: materialsTotal + payTotal + travelCost,
    labourDays,
    rates,
  }
}

/** Round a ContractorOutputs' money fields for display/persistence. */
export function roundContractorOutputs(o: ContractorOutputs): ContractorOutputs {
  return {
    ...o,
    lines: o.lines.map((l) => ({ ...l, materials: round2(l.materials), pay: round2(l.pay), total: round2(l.total) })),
    sections: o.sections.map((s) => ({ ...s, materials: round2(s.materials), pay: round2(s.pay), total: round2(s.total) })),
    materialsTotal: round2(o.materialsTotal),
    payTotal: round2(o.payTotal),
    travel: round2(o.travel),
    grandTotal: round2(o.grandTotal),
  }
}
