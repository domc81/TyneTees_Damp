// =============================================================================
// Costing summary math — section adjustments, travel, VAT, deposit.
//
// Single importable implementation of the summary block that was previously
// replicated verbatim in scripts/parity/run-engine.ts (from the costing page,
// src/app/survey/[projectId]/costing/page.tsx ~606-660). The parity harness
// runs THROUGH this module, so it is golden-master-verified: any behavioural
// drift here fails the 15-scenario suite. Used by the parity runner and the
// admin pricing smoke check (src/lib/pricing-smoke.ts).
// =============================================================================

import type { CalculationResult } from './pricing-data'
import {
  calculateTravelOverhead,
  type TravelOverheadResult,
} from './travel-overhead'

export interface SectionMeta {
  optional: boolean
  pct: number
}

export type SectionMetaMap = Record<string, SectionMeta>

export interface CostingSummaryTotals {
  materials_subtotal: number
  labour_subtotal: number
  labour_hours_subtotal: number
  travel_price: number
  travel_hours: number
  days: number
  mandatory_works: number
  optional_included: number
  subtotal_ex_vat: number
  vat: number
  total_inc_vat: number
  deposit_percentage: number
  deposit_amount: number
}

export interface CostingSummarySection {
  survey_type: string
  materials: number
  labour: number
  total: number
  is_optional: boolean
}

export interface CostingSummary {
  totals: CostingSummaryTotals
  sections: Record<string, CostingSummarySection>
  travel: TravelOverheadResult
}

/**
 * Apply the workbook-master default section adjustments
 * (costing_sections.default_adjustment_pct, e.g. PIV loft −5%) in place.
 *
 * The workbook applies the factor per line (adjusted cost column I), so line
 * money is scaled here — hours are unaffected (the rate is adjusted, not the
 * time). Section and grand totals are then re-aggregated from the adjusted
 * lines, exactly like the sheet. The costing page applies the same defaults
 * via its per-section dials.
 */
export function applyDefaultSectionAdjustments(
  results: Record<string, CalculationResult>,
  sectionMeta: SectionMetaMap
): void {
  for (const result of Object.values(results)) {
    for (const line of result.lines) {
      const pct = sectionMeta[line.sectionKey]?.pct ?? 0
      if (pct !== 0) {
        const f = 1 + pct / 100
        line.result.materialTotal *= f
        line.result.labourTotal *= f
        line.result.lineTotal = line.result.materialTotal + line.result.labourTotal
      }
    }
    for (const [sectionKey, totals] of Object.entries(result.sectionTotals)) {
      const pct = sectionMeta[sectionKey]?.pct ?? 0
      if (pct !== 0) {
        const f = 1 + pct / 100
        totals.materialTotal *= f
        totals.labourTotal *= f
        totals.sectionTotal = totals.materialTotal + totals.labourTotal
      }
    }
    result.grandTotal.materialTotal = result.lines.reduce(
      (s, l) => s + l.result.materialTotal,
      0
    )
    result.grandTotal.labourTotal = result.lines.reduce(
      (s, l) => s + l.result.labourTotal,
      0
    )
    result.grandTotal.total =
      result.grandTotal.materialTotal + result.grandTotal.labourTotal
  }
}

/**
 * Compute the job summary from (already section-adjusted) per-type results:
 * travel overhead, mandatory/optional split (optional sections start
 * included, matching the costing page default), VAT, and deposit
 * (off mandatory works only, at the highest applicable survey-type %).
 *
 * Returns raw (unrounded) numbers — callers round for display/serialisation.
 */
export function summarizeCosting(
  results: Record<string, CalculationResult>,
  sectionMeta: SectionMetaMap,
  config: Record<string, number>,
  additionalWorks: Record<string, unknown>
): CostingSummary {
  let totalLabourHours = 0
  for (const result of Object.values(results)) {
    for (const line of result.lines) totalLabourHours += line.result.labourHours
  }

  const travel = calculateTravelOverhead({
    totalLabourHours,
    distanceFromOffice: Number(additionalWorks.distance_from_office ?? 0),
    numMenTravelling: Number(additionalWorks.num_men_travelling ?? 1),
    hourlyLabourRate: config['hourly_labour_rate'] ?? 30.63,
    vehicleCostPerMile: config['vehicle_cost_per_mile'] ?? 0.5,
    productiveHoursPerDay: config['productive_hours_per_day'] ?? 6.5,
    travelSpeedMph: config['travel_speed_mph'] ?? 30,
  })

  let mandatoryWorksTotal = 0
  let optionalIncludedTotal = 0
  const sections: Record<string, CostingSummarySection> = {}
  for (const [surveyType, result] of Object.entries(results)) {
    for (const [sectionKey, totals] of Object.entries(result.sectionTotals)) {
      const isOptional = sectionMeta[sectionKey]?.optional ?? false
      if (isOptional) optionalIncludedTotal += totals.sectionTotal
      else mandatoryWorksTotal += totals.sectionTotal
      sections[sectionKey] = {
        survey_type: surveyType,
        materials: totals.materialTotal,
        labour: totals.labourTotal,
        total: totals.sectionTotal,
        is_optional: isOptional,
      }
    }
  }

  let materialsSubtotal = 0
  let labourSubtotal = 0
  for (const result of Object.values(results)) {
    materialsSubtotal += result.grandTotal.materialTotal
    labourSubtotal += result.grandTotal.labourTotal
  }

  const overheadAmount = travel.totalOverheadCost
  const combinedWorksTotal = mandatoryWorksTotal + optionalIncludedTotal
  const jobSubtotal = combinedWorksTotal + overheadAmount
  const jobVAT = jobSubtotal * (config['vat_rate'] ?? 0.2)
  const jobGrandTotal = jobSubtotal + jobVAT

  let depositPct = 0
  for (const surveyType of Object.keys(results)) {
    const pct = config[`${surveyType}_deposit_pct`]
    if (pct !== undefined && pct > depositPct) depositPct = pct
  }
  const depositAmount = mandatoryWorksTotal * depositPct

  return {
    totals: {
      materials_subtotal: materialsSubtotal,
      labour_subtotal: labourSubtotal,
      labour_hours_subtotal: totalLabourHours,
      travel_price: travel.totalOverheadCost,
      travel_hours: travel.travelHours,
      days: travel.labourDays,
      mandatory_works: mandatoryWorksTotal,
      optional_included: optionalIncludedTotal,
      subtotal_ex_vat: jobSubtotal,
      vat: jobVAT,
      total_inc_vat: jobGrandTotal,
      deposit_percentage: depositPct,
      deposit_amount: depositAmount,
    },
    sections,
    travel,
  }
}
