/**
 * Parity harness — ENGINE runner.
 *
 * Feeds a scenario's wizard data through the app's REAL costing pipeline:
 *   mapSurveyToLineInputs -> calculateLine (via generateCostingFromSurvey)
 *   -> calculateTravelOverhead -> summary math
 * with ZERO reimplementation of calculation logic, and emits actual results
 * JSON for comparison against the workbook oracle's expected results.
 *
 * The summary block (section adjustments, travel, VAT, deposit) is imported
 * from src/lib/costing-summary.ts — the shared implementation also used by
 * the admin pricing smoke check, so parity gates it. The costing page
 * (src/app/survey/[projectId]/costing/page.tsx ~606-660) still carries its
 * own copy of this math; if the page changes, costing-summary.ts must match.
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
import { loadPricingConfig } from '../../src/lib/pricing-data'
import type { CalculationResult } from '../../src/lib/pricing-data'
import {
  applyDefaultSectionAdjustments,
  summarizeCosting,
  type SectionMeta,
} from '../../src/lib/costing-summary'
import {
  calculateContractorOutputs,
  contractorLineValues,
  contractorRatesFromConfig,
} from '../../src/lib/contractor-costs'

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

  // Shared summary math (parity-gated lib, also used by the admin smoke check)
  applyDefaultSectionAdjustments(results, sectionMeta)
  const aw: any = wizardData.additional_works ?? {}
  const summary = summarizeCosting(results, sectionMeta, config, aw)
  const travel = summary.travel

  const sectionsOut: Record<string, any> = {}
  for (const [sectionKey, s] of Object.entries(summary.sections)) {
    sectionsOut[sectionKey] = {
      survey_type: s.survey_type,
      materials: round2(s.materials),
      labour: round2(s.labour),
      total: round2(s.total),
      is_optional: s.is_optional,
    }
  }

  // ---- Contractor outputs (review pt 15) — workbook U/V columns ----
  const contractorRates = contractorRatesFromConfig(config)
  const contractor = calculateContractorOutputs(
    results,
    travel,
    Number(aw.distance_from_office ?? 0),
    config
  )

  // ---- Per-line output keyed by line_key ----
  const linesOut: Record<string, any> = {}
  for (const result of Object.values(results)) {
    for (const line of result.lines) {
      const key = templateKey[line.templateId] ?? line.templateId
      const cv = contractorLineValues(line, contractorRates)
      const prev = linesOut[key] ?? {
        quantity: 0, materials: 0, hours: 0, labour: 0, total: 0,
        contractor_materials: 0, contractor_pay: 0, section: line.sectionKey,
      }
      linesOut[key] = {
        quantity: prev.quantity + line.input.inputQuantity,
        materials: prev.materials + line.result.materialTotal,
        hours: prev.hours + line.result.labourHours,
        labour: prev.labour + line.result.labourTotal,
        total: prev.total + line.result.lineTotal,
        contractor_materials: prev.contractor_materials + (cv?.materials ?? 0),
        contractor_pay: prev.contractor_pay + (cv?.pay ?? 0),
        section: line.sectionKey,
        description: line.templateDescription,
      }
    }
  }

  const t = summary.totals
  return {
    scenario: scenario.id,
    engine: 'live pipeline: generateCostingFromSurvey + costing-summary lib',
    lines: linesOut,
    sections: sectionsOut,
    totals: {
      materials_subtotal: round6(t.materials_subtotal),
      labour_subtotal: round6(t.labour_subtotal),
      labour_hours_subtotal: round6(t.labour_hours_subtotal),
      travel_price: round6(t.travel_price),
      travel_hours: round6(t.travel_hours),
      days: t.days,
      mandatory_works: round6(t.mandatory_works),
      optional_included: round6(t.optional_included),
      subtotal_ex_vat: round6(t.subtotal_ex_vat),
      vat: round6(t.vat),
      total_inc_vat: round6(t.total_inc_vat),
      deposit_percentage: t.deposit_percentage,
      deposit_amount: round6(t.deposit_amount),
      contractor_materials_total: round6(contractor.materialsTotal),
      contractor_pay_total: round6(contractor.payTotal),
      contractor_travel: round6(contractor.travel),
      contractor_total: round6(contractor.grandTotal),
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
