/**
 * Seed / refresh the pricing smoke-check baselines from the CURRENT live
 * pricing data. Run after deploying a deliberate structural pricing change
 * (which the parity harness has already gated), or once at feature rollout.
 *
 * Run from survey-system/:  npx tsx scripts/smoke/seed-baselines.ts
 *                           npx tsx scripts/smoke/seed-baselines.ts --check
 *
 * --check runs the comparison and prints deltas WITHOUT accepting new
 * baselines (exit 1 if any scenario moved) — the CLI twin of the admin
 * pages' smoke panel.
 *
 * Uses the TTDP service-role key from ~/.credentials (never logged), same
 * bootstrap as scripts/parity/run-engine.ts.
 */
import * as fs from 'fs'
import { createClient } from '@supabase/supabase-js'
import { setSupabaseOverride } from '../../src/lib/supabase-client'
import { runPricingSmoke, acceptSmokeBaselines } from '../../src/lib/pricing-smoke'

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

async function main() {
  const checkOnly = process.argv.includes('--check')

  const { url, serviceKey } = readCreds()
  const client = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  setSupabaseOverride(client as any)

  const run = await runPricingSmoke()

  for (const r of run.results) {
    const status =
      r.baseline === null
        ? 'NEW'
        : Math.abs(r.delta) <= 0.005
          ? 'unchanged'
          : `Δ £${r.delta.toFixed(2)}${r.deltaPct != null ? ` (${r.deltaPct > 0 ? '+' : ''}${r.deltaPct.toFixed(2)}%)` : ''}`
    console.log(
      `${r.scenarioId.padEnd(38)} ex-VAT £${r.current.subtotal_ex_vat.toFixed(2).padStart(10)}  lines ${String(r.current.line_count).padStart(3)}  [${status}]`
    )
    for (const sd of r.sectionDeltas) {
      console.log(`    ${sd.sectionKey}: £${sd.before.toFixed(2)} → £${sd.after.toFixed(2)}`)
    }
    if (r.missingTemplates.length) {
      console.error(`  MISSING TEMPLATES: ${r.missingTemplates.join(', ')}`)
      process.exitCode = 1
    }
  }

  if (checkOnly) {
    if (!run.allClean) {
      console.log('\nCHANGED — baselines NOT updated (run without --check to accept).')
      process.exit(1)
    }
    console.log('\nAll reference jobs unchanged.')
    return
  }

  const ok = await acceptSmokeBaselines(run, null)
  if (!ok) {
    console.error('Baseline upsert FAILED')
    process.exit(1)
  }
  console.log(`\n${run.results.length} baselines accepted.`)
}

main().catch(err => {
  console.error('seed-baselines failed:', err)
  process.exit(1)
})
