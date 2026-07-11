'use client'

// =============================================================================
// PricingSmokeCheck — reference-job delta panel for the admin pricing pages.
//
// Recomputes five reference jobs through the live costing pipeline
// (src/lib/pricing-smoke.ts) and diffs them against the last-accepted
// baselines. Auto-runs after every pricing save (parent bumps `runToken`);
// can also be run manually. When a change is intentional, the admin accepts
// the new figures as baselines so the next edit diffs against them.
// =============================================================================

import { Fragment, useCallback, useEffect, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Loader2,
  RefreshCw,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  runPricingSmoke,
  acceptSmokeBaselines,
  type SmokeRun,
  type SmokeCheckResult,
} from '@/lib/pricing-smoke'
import { useAuth } from '@/context/AuthContext'

const gbp = (n: number) =>
  `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function rowStatus(r: SmokeCheckResult): 'clean' | 'changed' | 'no-baseline' {
  if (r.baseline === null) return 'no-baseline'
  if (Math.abs(r.delta) <= 0.005 && r.current.line_count === r.baseline.line_count) return 'clean'
  return 'changed'
}

export function PricingSmokeCheck({ runToken }: { runToken: number }) {
  const { profile } = useAuth()
  const [run, setRun] = useState<SmokeRun | null>(null)
  const [running, setRunning] = useState(false)
  const [accepting, setAccepting] = useState(false)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const doRun = useCallback(async () => {
    setRunning(true)
    try {
      const result = await runPricingSmoke()
      setRun(result)
    } catch (err) {
      console.error('Smoke check failed:', err)
      toast.error('Price check failed to run — see console')
    } finally {
      setRunning(false)
    }
  }, [])

  // Auto-run after every save (parent increments runToken)
  useEffect(() => {
    if (runToken > 0) doRun()
  }, [runToken, doRun])

  const handleAccept = async () => {
    if (!run) return
    setAccepting(true)
    const ok = await acceptSmokeBaselines(run, profile?.id ?? null)
    if (ok) {
      toast.success('New price baselines accepted')
      await doRun()
    } else {
      toast.error('Failed to save baselines')
    }
    setAccepting(false)
  }

  const toggle = (id: string) =>
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const changedCount = run?.results.filter(r => rowStatus(r) === 'changed').length ?? 0
  const missingTemplates = run?.results.flatMap(r => r.missingTemplates) ?? []

  return (
    <div className="section-card overflow-hidden">
      <div className="p-4 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-brand-500/10">
            <Activity className="w-5 h-5 text-brand-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Price check — reference jobs</h3>
            <p className="text-xs text-white/50">
              Recalculates 5 fixed reference jobs with live prices and compares against the last
              accepted figures — runs automatically after every save
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {run && !running && (
            <span
              className={`text-xs px-2 py-1 rounded inline-flex items-center gap-1 ${
                run.allClean
                  ? 'bg-green-500/15 text-green-300'
                  : 'bg-amber-500/15 text-amber-300'
              }`}
            >
              {run.allClean ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" /> All reference jobs unchanged
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {run.hasMissingBaselines && changedCount === 0
                    ? 'Baselines not set yet'
                    : `${changedCount} job${changedCount !== 1 ? 's' : ''} changed`}
                </>
              )}
            </span>
          )}
          <button
            onClick={doRun}
            disabled={running}
            className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"
          >
            {running ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
            {running ? 'Checking...' : run ? 'Re-run check' : 'Run check'}
          </button>
        </div>
      </div>

      {missingTemplates.length > 0 && (
        <div className="mx-4 mb-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300">
          <AlertTriangle className="w-3.5 h-3.5 inline mr-1" />
          Missing templates during recalculation: {Array.from(new Set(missingTemplates)).join(', ')}
        </div>
      )}

      {run && !running && (
        <div className="border-t border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-white/40 text-xs uppercase tracking-wider">
                <th className="px-4 py-2">Reference job</th>
                <th className="px-2 py-2 text-right">Baseline (ex VAT)</th>
                <th className="px-2 py-2 text-right">Now (ex VAT)</th>
                <th className="px-2 py-2 text-right">Change</th>
                <th className="px-4 py-2 text-right">Lines</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {run.results.map(r => {
                const status = rowStatus(r)
                const lineCountChanged =
                  r.baseline !== null && r.current.line_count !== r.baseline.line_count
                const isOpen = expanded.has(r.scenarioId)
                return (
                  <Fragment key={r.scenarioId}>
                    <tr
                      className={`${status === 'changed' ? 'bg-amber-500/5' : ''} ${
                        r.sectionDeltas.length > 0 ? 'cursor-pointer hover:bg-white/[0.03]' : ''
                      }`}
                      onClick={() => r.sectionDeltas.length > 0 && toggle(r.scenarioId)}
                    >
                      <td className="px-4 py-2 text-white/80">
                        <span className="inline-flex items-center gap-1.5">
                          {r.sectionDeltas.length > 0 &&
                            (isOpen ? (
                              <ChevronDown className="w-3.5 h-3.5 text-white/40" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                            ))}
                          {r.label}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-right text-white/60">
                        {r.baseline ? gbp(r.baseline.subtotal_ex_vat) : '—'}
                      </td>
                      <td className="px-2 py-2 text-right text-white/90 font-medium">
                        {gbp(r.current.subtotal_ex_vat)}
                      </td>
                      <td className="px-2 py-2 text-right">
                        {status === 'no-baseline' ? (
                          <span className="text-xs text-white/40">no baseline</span>
                        ) : status === 'clean' ? (
                          <span className="text-green-300 inline-flex items-center gap-1 text-xs">
                            <CheckCircle className="w-3.5 h-3.5" /> unchanged
                          </span>
                        ) : (
                          <span className="text-amber-300 text-xs font-medium">
                            {r.delta > 0 ? '+' : ''}
                            {gbp(r.delta).replace('£-', '−£')}
                            {r.deltaPct != null && (
                              <span className="text-amber-300/70">
                                {' '}
                                ({r.deltaPct > 0 ? '+' : ''}
                                {r.deltaPct.toFixed(1)}%)
                              </span>
                            )}
                          </span>
                        )}
                      </td>
                      <td
                        className={`px-4 py-2 text-right text-xs ${
                          lineCountChanged ? 'text-red-300 font-semibold' : 'text-white/40'
                        }`}
                      >
                        {r.current.line_count}
                        {lineCountChanged && r.baseline && (
                          <span title="Line count changed — a template may have been deactivated">
                            {' '}
                            (was {r.baseline.line_count})
                          </span>
                        )}
                      </td>
                    </tr>
                    {isOpen &&
                      r.sectionDeltas.map(sd => (
                        <tr key={`${r.scenarioId}-${sd.sectionKey}`} className="bg-white/[0.02]">
                          <td className="px-4 py-1.5 pl-12 text-xs text-white/50">
                            {sd.sectionKey}
                          </td>
                          <td className="px-2 py-1.5 text-right text-xs text-white/40">
                            {gbp(sd.before)}
                          </td>
                          <td className="px-2 py-1.5 text-right text-xs text-white/70">
                            {gbp(sd.after)}
                          </td>
                          <td className="px-2 py-1.5 text-right text-xs text-amber-300/80">
                            {sd.after - sd.before > 0 ? '+' : ''}
                            {gbp(sd.after - sd.before).replace('£-', '−£')}
                          </td>
                          <td />
                        </tr>
                      ))}
                  </Fragment>
                )
              })}
            </tbody>
          </table>

          {(!run.allClean || run.hasMissingBaselines) && (
            <div className="p-4 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
              <p className="text-xs text-white/50 max-w-lg">
                If these movements match what you intended to change, accept them as the new
                baselines — future checks will compare against them. If not, review your edit
                before customers are quoted these prices.
              </p>
              <button
                onClick={handleAccept}
                disabled={accepting}
                className="btn-primary text-xs px-4 py-2 flex items-center gap-2"
              >
                {accepting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <CheckCircle className="w-3.5 h-3.5" />
                )}
                Accept as new baselines
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
