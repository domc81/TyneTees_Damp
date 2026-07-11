/**
 * Parity harness — ENGINE runner.
 *
 * Feeds a scenario's wizard data through the app's REAL costing pipeline:
 *   mapSurveyToLineInputs -> calculateLine (via generateCostingFromSurvey)
 *   -> calculateTravelOverhead -> summary math
 * with ZERO reimplementation of calculation logic, and emits actual results
 * JSON for comparison against the workbook oracle's expected results.
 *
 * The ONLY replicated (non-imported) logic is the summary block, which
 * currently lives inside the React costing page and is not importable:
 * see src/app/survey/[projectId]/costing/page.tsx ~606-660. It is copied
 * here VERBATIM in behaviour (including the hardcoded 0.20 VAT and the
 * deposit-off-mandatory-only rule). If the page changes, update this file —
 * or better, extract the page math into a lib both can import (Phase 2).
 *
 * Run from survey-system/:  npx tsx scripts/parity/run-engine.ts --all
 *                           npx tsx scripts/parity/run-engine.ts dpc-18lm-330mm
 *
 * DB: uses the live TTDP Supabase (templates/config/sections) via the Kong
 * API with the service-role key read from ~/.credentials — exactly the data
 * the production app computes with. Never logs credential values.
 */
import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@supabase/supabase-js'
import { setSupabaseOverride } from '../../src/lib/supabase-client'
import { generateCostingFromSurvey, consumeMissingTemplateWarnings } from '../../src/lib/survey-mapping'
import { calculateTravelOverhead } from '../../src/lib/travel-overhead'
import { loadPricingConfig } from '../../src/lib/pricing-data'
import type { CalculationResult } from '../../src/lib/pricing-data'

const REPO_ROOT = path.resolve(__dirname, '../../..')
const PARITY = path.join(REPO_ROOT, 'parity')
const CREDS_FILE = '/home/dominic/.credentials/.ttdp-supabase-credentials'

function readCreds(): { url: string; serviceKey: string } {
  const raw = fs.readFileSync(CREDS_FILE, 'utf8')
  const get = (key: string) => {
    const m = raw.match(new RegExp(`^(?:export\\s+)?${key}=["']?([^"'\\n]+)["']?$`, 'm'))
    return m ? m[1].trim() : null
  }
  const url = get('TTDP_SUPABASE_URL')
  const serviceKey = get('TTDP_SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !serviceKey) throw new Error('TTDP Supabase credentials not found in credentials file')
  return { url, serviceKey }
}

interface ScenarioRoom {
  name: string
  issues: string[]
  damp?: Record<string, unknown>
  condensation?: Record<string, unknown>
  timber_decay?: Record<string, unknown>
  woodworm?: Record<string, unknown>
}
interface Scenario {
  id: string
  workbook: string
  wizard: {
    survey_types: string[]
    additional_works?: Record<string, unknown>
    rooms: ScenarioRoom[]
  }
}

function buildWizardData(s: Scenario): any {
  return {
    survey_types: s.wizard.survey_types,
    site_details: {},
    external_inspection: {},
    additional_works: s.wizard.additional_works ?? {},
  }
}

function buildRooms(s: Scenario): any[] {
  return s.wizard.rooms.map((r, i) => ({
    id: `parity-room-${i + 1}`,
    survey_id: 'parity-scenario',
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

interface SectionMeta { optional: boolean; pct: number }

async function loadSectionMeta(client: any): Promise<Record<string, SectionMeta>> {
  const { data, error } = await client
    .from('costing_sections')
    .select('section_key, is_optional, default_adjustment_pct')
  if (error) throw new Error(`costing_sections load failed: ${error.message}`)
  const meta: Record<string, SectionMeta> = {}
  for (const row of data ?? []) {
    meta[row.section_key] = { optional: !!row.is_optional, pct: Number(row.default_adjustment_pct ?? 0) }
  }
  return meta
}

function loadTemplateKeyMap(): Record<string, string> {
  const fixtures = JSON.parse(
    fs.readFileSync(path.join(PARITY, 'fixtures', 'costing_line_templates.json'), 'utf8')
  )
  const map: Record<string, string> = {}
  for (const t of fixtures) map[t.id] = t.line_key
  return map
}

async function runScenario(scenario: Scenario, config: Record<string, number>, sectionMeta: Record<string, SectionMeta>) {
  const wizardData = buildWizardData(scenario)
  const rooms = buildRooms(scenario)
  const templateKey = loadTemplateKeyMap()

  const results: Record<string, CalculationResult> = await generateCostingFromSurvey(
    'parity-scenario',
    wizardData,
    rooms
  )
  const missingTemplates = consumeMissingTemplateWarnings()

  // Workbook-master default section adjustments (costing_sections.
  // default_adjustment_pct, e.g. PIV loft -5%). The workbook applies the
  // factor per line (adjusted cost column I), so scale line money here —
  // hours are unaffected (the rate is adjusted, not the time). Section and
  // summary sums below then aggregate the adjusted lines, exactly like the
  // sheet. The costing page applies the same defaults via its dials.
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
    result.grandTotal.materialTotal = result.lines.reduce((s, l) => s + l.result.materialTotal, 0)
    result.grandTotal.labourTotal = result.lines.reduce((s, l) => s + l.result.labourTotal, 0)
    result.grandTotal.total = result.grandTotal.materialTotal + result.grandTotal.labourTotal
  }

  // ---- Replicated page wiring: costing/page.tsx ~356-372 ----
  let totalLabourHours = 0
  for (const result of Object.values(results)) {
    for (const line of result.lines) totalLabourHours += line.result.labourHours
  }
  const aw: any = wizardData.additional_works ?? {}
  const travel = calculateTravelOverhead({
    totalLabourHours,
    distanceFromOffice: Number(aw.distance_from_office ?? 0),
    numMenTravelling: Number(aw.num_men_travelling ?? 1),
    hourlyLabourRate: config['hourly_labour_rate'] ?? 30.63,
    vehicleCostPerMile: config['vehicle_cost_per_mile'] ?? 0.5,
    productiveHoursPerDay: config['productive_hours_per_day'] ?? 6.5,
    travelSpeedMph: config['travel_speed_mph'] ?? 30,
  })

  // ---- Replicated page summary math: costing/page.tsx ~606-660 ----
  let mandatoryWorksTotal = 0
  let optionalIncludedTotal = 0
  const sectionsOut: Record<string, any> = {}
  for (const [surveyType, result] of Object.entries(results)) {
    for (const [sectionKey, totals] of Object.entries(result.sectionTotals)) {
      const isOptional = sectionMeta[sectionKey]?.optional ?? false
      // Page default: optional sections start included
      if (isOptional) optionalIncludedTotal += totals.sectionTotal
      else mandatoryWorksTotal += totals.sectionTotal
      sectionsOut[sectionKey] = {
        survey_type: surveyType,
        materials: round2(totals.materialTotal),
        labour: round2(totals.labourTotal),
        total: round2(totals.sectionTotal),
        is_optional: isOptional,
      }
    }
  }
  const overheadAmount = travel.totalOverheadCost
  const combinedWorksTotal = mandatoryWorksTotal + optionalIncludedTotal
  const jobSubtotal = combinedWorksTotal + overheadAmount
  const jobVAT = jobSubtotal * (config['vat_rate'] ?? 0.2) // workbook K143 rate (page now reads config too)
  const jobGrandTotal = jobSubtotal + jobVAT
  let depositPct = 0
  for (const surveyType of Object.keys(results)) {
    const pct = config[`${surveyType}_deposit_pct`]
    if (pct !== undefined && pct > depositPct) depositPct = pct
  }
  const depositAmount = mandatoryWorksTotal * depositPct

  // ---- Per-line output keyed by line_key ----
  const linesOut: Record<string, any> = {}
  let materialsSubtotal = 0
  let labourSubtotal = 0
  for (const result of Object.values(results)) {
    materialsSubtotal += result.grandTotal.materialTotal
    labourSubtotal += result.grandTotal.labourTotal
    for (const line of result.lines) {
      const key = templateKey[line.templateId] ?? line.templateId
      const prev = linesOut[key] ?? { quantity: 0, materials: 0, hours: 0, labour: 0, total: 0, section: line.sectionKey }
      linesOut[key] = {
        quantity: prev.quantity + line.input.inputQuantity,
        materials: prev.materials + line.result.materialTotal,
        hours: prev.hours + line.result.labourHours,
        labour: prev.labour + line.result.labourTotal,
        total: prev.total + line.result.lineTotal,
        section: line.sectionKey,
        description: line.templateDescription,
      }
    }
  }

  return {
    scenario: scenario.id,
    engine: 'live pipeline: generateCostingFromSurvey + calculateTravelOverhead + replicated page summary',
    lines: linesOut,
    sections: sectionsOut,
    totals: {
      materials_subtotal: round6(materialsSubtotal),
      labour_subtotal: round6(labourSubtotal),
      labour_hours_subtotal: round6(totalLabourHours),
      travel_price: round6(travel.totalOverheadCost),
      travel_hours: round6(travel.travelHours),
      days: travel.labourDays,
      mandatory_works: round6(mandatoryWorksTotal),
      optional_included: round6(optionalIncludedTotal),
      subtotal_ex_vat: round6(jobSubtotal),
      vat: round6(jobVAT),
      total_inc_vat: round6(jobGrandTotal),
      deposit_percentage: depositPct,
      deposit_amount: round6(depositAmount),
    },
    diagnostics: {
      missing_templates: missingTemplates,
      travel_detail: travel,
      config_keys_used: {
        hourly_labour_rate: config['hourly_labour_rate'] ?? null,
        vehicle_cost_per_mile: config['vehicle_cost_per_mile'] ?? null,
      },
    },
  }
}

const round2 = (n: number) => Math.round(n * 100) / 100
const round6 = (n: number) => Math.round(n * 1e6) / 1e6

async function main() {
  const args = process.argv.slice(2)
  const all = args.includes('--all')
  const ids = args.filter((a) => a !== '--all')
  const scenariosDir = path.join(PARITY, 'scenarios')
  const files = all
    ? fs.readdirSync(scenariosDir).filter((f) => f.endsWith('.json')).sort()
    : ids.map((i) => `${i}.json`)
  if (files.length === 0) {
    console.error('usage: npx tsx scripts/parity/run-engine.ts [--all | scenario-id ...]')
    process.exit(2)
  }

  const { url, serviceKey } = readCreds()
  const client = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  setSupabaseOverride(client as any)

  const config = await loadPricingConfig()
  const sectionMeta = await loadSectionMeta(client)

  const outDir = path.join(PARITY, 'results', 'actual')
  fs.mkdirSync(outDir, { recursive: true })

  for (const file of files) {
    const scenario: Scenario = JSON.parse(fs.readFileSync(path.join(scenariosDir, file), 'utf8'))
    console.log(`engine: ${scenario.id}`)
    const result = await runScenario(scenario, config, sectionMeta)
    const outPath = path.join(outDir, `${scenario.id}.json`)
    fs.writeFileSync(outPath, JSON.stringify(result, null, 2))
    const t = result.totals
    console.log(
      `  subtotal ex VAT £${t.subtotal_ex_vat}, hours ${t.labour_hours_subtotal}, travel £${t.travel_price}` +
        (result.diagnostics.missing_templates.length
          ? `  [MISSING TEMPLATES: ${result.diagnostics.missing_templates.join(', ')}]`
          : '')
    )
  }
}

main().catch((err) => {
  console.error('run-engine failed:', err)
  process.exit(1)
})
