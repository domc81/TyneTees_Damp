// =============================================================================
// Pricing smoke check — "did my price edit do what I expected?"
//
// Recomputes a fixed set of reference jobs through the REAL costing pipeline
// (generateCostingFromSurvey → costing-summary lib, the same path the parity
// harness gates) and compares the totals against the last-accepted baselines
// in pricing_smoke_baselines. Run from the admin pricing pages after every
// save: an intended £2 material bump shows as a small expected delta; a
// fat-fingered £429-instead-of-£4.29 shows as a huge one.
//
// The reference scenarios are wizard-input snapshots of parity scenarios
// (src/lib/smoke/scenarios/, stripped of oracle expectations). They compare
// the platform against ITS OWN previous prices — not against the frozen
// workbooks, which admin edits are expected to diverge from post-go-live
// (parity/audit/ADMIN_AUDIT.md §4). The parity harness remains the gate for
// structural costing changes.
// =============================================================================

import { getSupabase } from './supabase-client'
import { generateCostingFromSurvey, consumeMissingTemplateWarnings } from './survey-mapping'
import { loadPricingConfig } from './pricing-data'
import {
  applyDefaultSectionAdjustments,
  summarizeCosting,
  type SectionMetaMap,
} from './costing-summary'

import fullCoverageDamp from './smoke/scenarios/full-coverage-damp.json'
import fullCoverageCondensation from './smoke/scenarios/full-coverage-condensation.json'
import fullCoverageTimber from './smoke/scenarios/full-coverage-timber.json'
import fullCoverageWoodworm from './smoke/scenarios/full-coverage-woodworm.json'
import dpcResinTravel from './smoke/scenarios/dpc-resin-travel-20mi-2men.json'

// ---------------------------------------------------------------------------
// Scenarios
// ---------------------------------------------------------------------------

interface SmokeScenarioRoom {
  name: string
  issues: string[]
  damp?: Record<string, unknown>
  condensation?: Record<string, unknown>
  timber_decay?: Record<string, unknown>
  woodworm?: Record<string, unknown>
}

interface SmokeScenario {
  id: string
  label: string
  wizard: {
    survey_types: string[]
    additional_works?: Record<string, unknown>
    rooms: SmokeScenarioRoom[]
  }
}

const SCENARIOS: SmokeScenario[] = [
  { id: fullCoverageDamp.id, label: 'Damp — full workbook job', wizard: fullCoverageDamp.wizard as SmokeScenario['wizard'] },
  { id: fullCoverageCondensation.id, label: 'Condensation — full workbook job', wizard: fullCoverageCondensation.wizard as SmokeScenario['wizard'] },
  { id: fullCoverageTimber.id, label: 'Timber — full workbook job', wizard: fullCoverageTimber.wizard as SmokeScenario['wizard'] },
  { id: fullCoverageWoodworm.id, label: 'Woodworm — full workbook job', wizard: fullCoverageWoodworm.wizard as SmokeScenario['wizard'] },
  { id: dpcResinTravel.id, label: 'Damp — DPC + resin, 20mi travel, 2 men', wizard: dpcResinTravel.wizard as SmokeScenario['wizard'] },
]

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SmokeTotals {
  subtotal_ex_vat: number
  total_inc_vat: number
  labour_hours: number
  line_count: number
}

export interface SmokeCheckResult {
  scenarioId: string
  label: string
  current: SmokeTotals
  currentSections: Record<string, number>
  baseline: SmokeTotals | null
  baselineSections: Record<string, number>
  baselineAcceptedAt: string | null
  /** subtotal_ex_vat: current − baseline (0 when no baseline) */
  delta: number
  /** null when no baseline or baseline is £0 */
  deltaPct: number | null
  /** sections whose total moved by more than a penny, biggest movement first */
  sectionDeltas: Array<{ sectionKey: string; before: number; after: number }>
  missingTemplates: string[]
}

export interface SmokeRun {
  results: SmokeCheckResult[]
  /** true when every scenario with a baseline is within a penny of it */
  allClean: boolean
  hasMissingBaselines: boolean
  ranAt: string
}

const round2 = (n: number) => Math.round(n * 100) / 100
const PENNY = 0.005

// ---------------------------------------------------------------------------
// Internals
// ---------------------------------------------------------------------------

function buildWizardData(s: SmokeScenario): any {
  return {
    survey_types: s.wizard.survey_types,
    site_details: {},
    external_inspection: {},
    additional_works: s.wizard.additional_works ?? {},
  }
}

function buildRooms(s: SmokeScenario): any[] {
  return s.wizard.rooms.map((r, i) => ({
    id: `smoke-room-${i + 1}`,
    survey_id: `smoke-${s.id}`,
    name: r.name,
    room_type: 'other',
    floor_level: 'ground',
    display_order: i,
    issues_identified: r.issues,
    room_data: {
      ...(r.damp ? { damp: r.damp } : {}),
      ...(r.condensation ? { condensation: r.condensation } : {}),
      ...(r.timber_decay ? { timber_decay: r.timber_decay } : {}),
      ...(r.woodworm ? { woodworm: r.woodworm } : {}),
    },
    is_completed: true,
  }))
}

async function loadSectionMeta(): Promise<SectionMetaMap> {
  const supabase = getSupabase()
  if (!supabase) return {}
  const { data, error } = await supabase
    .from('costing_sections')
    .select('section_key, is_optional, default_adjustment_pct')
  if (error || !data) {
    console.error('Smoke check: costing_sections load failed', error)
    return {}
  }
  const meta: SectionMetaMap = {}
  for (const row of data) {
    meta[row.section_key] = {
      optional: !!row.is_optional,
      pct: Number(row.default_adjustment_pct ?? 0),
    }
  }
  return meta
}

interface BaselineRow {
  scenario_id: string
  totals: SmokeTotals
  sections: Record<string, number>
  accepted_at: string
}

async function loadBaselines(): Promise<Record<string, BaselineRow>> {
  const supabase = getSupabase()
  if (!supabase) return {}
  const { data, error } = await supabase
    .from('pricing_smoke_baselines')
    .select('scenario_id, totals, sections, accepted_at')
  if (error || !data) {
    if (error) console.error('Smoke check: baselines load failed', error)
    return {}
  }
  const map: Record<string, BaselineRow> = {}
  for (const row of data) map[row.scenario_id] = row as BaselineRow
  return map
}

async function computeScenario(
  scenario: SmokeScenario,
  sectionMeta: SectionMetaMap,
  config: Record<string, number>
): Promise<{ totals: SmokeTotals; sections: Record<string, number>; missing: string[] }> {
  const results = await generateCostingFromSurvey(
    `smoke-${scenario.id}`,
    buildWizardData(scenario),
    buildRooms(scenario)
  )
  const missing = consumeMissingTemplateWarnings()

  applyDefaultSectionAdjustments(results, sectionMeta)
  const summary = summarizeCosting(
    results,
    sectionMeta,
    config,
    (scenario.wizard.additional_works ?? {}) as Record<string, unknown>
  )

  let lineCount = 0
  for (const result of Object.values(results)) lineCount += result.lines.length

  const sections: Record<string, number> = {}
  for (const [key, s] of Object.entries(summary.sections)) {
    sections[key] = round2(s.total)
  }

  return {
    totals: {
      subtotal_ex_vat: round2(summary.totals.subtotal_ex_vat),
      total_inc_vat: round2(summary.totals.total_inc_vat),
      labour_hours: round2(summary.totals.labour_hours_subtotal),
      line_count: lineCount,
    },
    sections,
    missing,
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Recompute all reference scenarios with the CURRENT live pricing data and
 * diff against the stored baselines. Read-only — never writes anything.
 */
export async function runPricingSmoke(): Promise<SmokeRun> {
  const [sectionMeta, config, baselines] = await Promise.all([
    loadSectionMeta(),
    loadPricingConfig(),
    loadBaselines(),
  ])

  const results: SmokeCheckResult[] = []
  // Sequential on purpose: each scenario issues its own set of Supabase
  // queries; parallelising 5 of them from a browser tab gains little and
  // spikes PostgREST.
  for (const scenario of SCENARIOS) {
    const { totals, sections, missing } = await computeScenario(scenario, sectionMeta, config)
    const baseline = baselines[scenario.id] ?? null

    const delta = baseline ? round2(totals.subtotal_ex_vat - baseline.totals.subtotal_ex_vat) : 0
    const deltaPct =
      baseline && Math.abs(baseline.totals.subtotal_ex_vat) > PENNY
        ? (delta / baseline.totals.subtotal_ex_vat) * 100
        : null

    const sectionDeltas: SmokeCheckResult['sectionDeltas'] = []
    if (baseline) {
      const keys = new Set([...Object.keys(sections), ...Object.keys(baseline.sections ?? {})])
      for (const key of Array.from(keys)) {
        const before = baseline.sections?.[key] ?? 0
        const after = sections[key] ?? 0
        if (Math.abs(after - before) > PENNY) {
          sectionDeltas.push({ sectionKey: key, before, after })
        }
      }
      sectionDeltas.sort(
        (a, b) => Math.abs(b.after - b.before) - Math.abs(a.after - a.before)
      )
    }

    results.push({
      scenarioId: scenario.id,
      label: scenario.label,
      current: totals,
      currentSections: sections,
      baseline: baseline ? baseline.totals : null,
      baselineSections: baseline?.sections ?? {},
      baselineAcceptedAt: baseline?.accepted_at ?? null,
      delta,
      deltaPct,
      sectionDeltas,
      missingTemplates: missing,
    })
  }

  const allClean = results.every(
    r => r.baseline !== null && Math.abs(r.delta) <= PENNY && r.current.line_count === r.baseline.line_count
  )
  const hasMissingBaselines = results.some(r => r.baseline === null)

  return { results, allClean, hasMissingBaselines, ranAt: new Date().toISOString() }
}

/**
 * Store the given run's CURRENT totals as the new baselines (upsert).
 * Called by an admin after confirming a price change is intentional.
 * `acceptedByProfileId` must be user_profiles.id (NOT the auth user id).
 */
export async function acceptSmokeBaselines(
  run: SmokeRun,
  acceptedByProfileId: string | null
): Promise<boolean> {
  const supabase = getSupabase()
  if (!supabase) return false

  const rows = run.results.map(r => ({
    scenario_id: r.scenarioId,
    label: r.label,
    totals: r.current,
    sections: r.currentSections,
    accepted_at: new Date().toISOString(),
    accepted_by: acceptedByProfileId,
  }))

  const { error } = await supabase
    .from('pricing_smoke_baselines')
    .upsert(rows, { onConflict: 'scenario_id' })

  if (error) {
    console.error('Smoke check: baseline accept failed', error)
    return false
  }
  return true
}
