'use client'

// =============================================================================
// Operations — operative/subcontractor outputs for a survey (review pt 15).
//
// Internal, permission-controlled (admin + office): per-section contractor
// pay, projected hours/days, materials at contractor cost, travel and crew;
// office assigns work and adds notes; printable operative work instruction
// with scope, measurements, rate of pay and travel allowance — NEVER customer
// prices or margins.
//
// ONLINE-ONLY office surface — never route through the offline layer.
// Figures come from the same engine lines as customer pricing and are
// parity-gated against the workbooks' U/V columns (lib/contractor-costs.ts).
// =============================================================================

import { Fragment, useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import {
  ArrowLeft, Loader2, AlertCircle, HardHat, Truck, Package, Wrench,
  Printer, RefreshCw, Users, Clock,
} from 'lucide-react'
import Layout from '@/components/layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSmartBack } from '@/hooks/useSmartBack'
import { loadWizardData } from '@/lib/survey-wizard-data'
import { generateCostingFromSurvey } from '@/lib/survey-mapping'
import {
  loadPricingConfig,
  loadSectionInclusions,
  loadSectionOptionalFlags,
  type CalculationResult,
  type CalculatedLine,
} from '@/lib/pricing-data'
import { calculateTravelOverhead, type TravelOverheadResult } from '@/lib/travel-overhead'
import {
  calculateContractorOutputs,
  roundContractorOutputs,
  type ContractorOutputs,
} from '@/lib/contractor-costs'
import {
  syncSubcontractorRows,
  updateSubcontractorAssignment,
  type SubcontractorCostRow,
} from '@/lib/subcontractor-data'
import {
  buildDampPurchaseList,
  buildMeasurementList,
  dampPurchaseSourceLines,
  MATERIAL_LIST_CAVEAT,
  type MeasurementItem,
  type PurchaseItem,
} from '@/lib/material-purchase-list'
import { getSurvey } from '@/lib/supabase-data'
import type { Survey } from '@/types/database.types'

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency', currency: 'GBP', minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(value)
}

function formatSectionName(sectionKey: string): string {
  // The workbook's Sub Contractor Costs tab lists Warmline as its own row
  if (sectionKey === 'warmline_iwi') return 'Warmline Internal Wall Insulation'
  return sectionKey.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

/** Job quantity for display: strip float noise, no forced decimals */
function formatQty(q: number): string {
  return String(Number(q.toFixed(2)))
}

export default function OperationsPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const goBack = useSmartBack(`/surveys/${projectId}`)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [survey, setSurvey] = useState<Survey | null>(null)
  const [contractor, setContractor] = useState<ContractorOutputs | null>(null)
  const [purchase, setPurchase] = useState<PurchaseItem[]>([])
  const [measurements, setMeasurements] = useState<MeasurementItem[]>([])
  const [printMeasurements, setPrintMeasurements] = useState<MeasurementItem[]>([])
  const [rows, setRows] = useState<SubcontractorCostRow[]>([])
  const [travel, setTravel] = useState<TravelOverheadResult | null>(null)
  const [crew, setCrew] = useState(1)
  const [distance, setDistance] = useState(0)
  const [savingRowId, setSavingRowId] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const load = useCallback(async () => {
    try {
      const [surveyRow, { wizardData, rooms }, config, inclusions] =
        await Promise.all([
          getSurvey(projectId),
          loadWizardData(projectId),
          loadPricingConfig(),
          loadSectionInclusions(projectId),
        ])
      if (!surveyRow) throw new Error('Survey not found')
      setSurvey(surveyRow)

      const surveyTypes: string[] = (wizardData as any).survey_types ?? []
      const optionalFlags = await loadSectionOptionalFlags(surveyTypes)

      const results: Record<string, CalculationResult> = await generateCostingFromSurvey(
        projectId, wizardData, rooms
      )

      // A section is in the job unless it is optional and explicitly excluded
      const isSectionIncluded = (key: string) =>
        !(optionalFlags[key] ?? false) || (inclusions[key] ?? true)

      const aw: any = (wizardData as any).additional_works ?? {}
      const distanceMiles = Number(aw.distance_from_office ?? 0)
      const men = Number(aw.num_men_travelling ?? 1)
      setDistance(distanceMiles)
      setCrew(men)

      // Days-on-site basis: same combined labour hours the costing page uses
      let combinedHours = 0
      for (const r of Object.values(results)) {
        combinedHours += r.lines.reduce(
          (sum: number, l: CalculatedLine) => sum + l.result.labourHours, 0
        )
      }
      const travelResult = calculateTravelOverhead({
        totalLabourHours: combinedHours,
        distanceFromOffice: distanceMiles,
        numMenTravelling: men,
        hourlyLabourRate: config['hourly_labour_rate'] ?? 30.63,
        vehicleCostPerMile: config['vehicle_cost_per_mile'] ?? 0.5,
        productiveHoursPerDay: config['productive_hours_per_day'] ?? 6.5,
        travelSpeedMph: config['travel_speed_mph'] ?? 30,
      })
      setTravel(travelResult)

      const outputs = roundContractorOutputs(
        calculateContractorOutputs(results, travelResult, distanceMiles, config, isSectionIncluded)
      )
      setContractor(outputs)

      // Material list — quantities before the job starts (review test 31).
      // Damp jobs get the workbook `Material-List` purchase quantities
      // (parity-gated, lib/material-purchase-list.ts); survey types without
      // workbook purchase rules surface as job measurements instead.
      const included = (line: CalculatedLine) => isSectionIncluded(line.sectionKey)
      setPurchase(buildDampPurchaseList(dampPurchaseSourceLines(results).filter(included)))

      const hasDamp = !!results['damp']
      const measurementLines: CalculatedLine[] = []
      const allLines: CalculatedLine[] = []
      for (const [surveyType, r] of Object.entries(results)) {
        allLines.push(...r.lines.filter(included))
        if (hasDamp && (surveyType === 'damp' || surveyType === 'site_preparation')) continue
        measurementLines.push(...r.lines.filter(included))
      }
      setMeasurements(buildMeasurementList(measurementLines))
      // Work instruction: job measurements for every survey type
      setPrintMeasurements(buildMeasurementList(allLines))

      // Persist the computed figures, keeping office assignments/notes
      const sectionNames: Record<string, string> = {}
      for (const s of outputs.sections) sectionNames[s.sectionKey] = formatSectionName(s.sectionKey)
      const synced = await syncSubcontractorRows(projectId, outputs, sectionNames)
      setRows(synced)
      setError(null)
    } catch (err) {
      console.error('Operations load failed:', err)
      setError(err instanceof Error ? err.message : 'Failed to load operations data')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [projectId])

  useEffect(() => { load() }, [load])

  async function saveAssignment(row: SubcontractorCostRow, patch: { assigned_to?: string | null; notes?: string | null }) {
    setSavingRowId(row.id)
    try {
      await updateSubcontractorAssignment(row.id, patch)
      setRows(prev => prev.map(r => (r.id === row.id ? { ...r, ...patch } : r)))
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save assignment')
    } finally {
      setSavingRowId(null)
    }
  }

  const rowByKey = new Map(rows.map(r => [r.section_key, r]))

  if (isLoading) {
    return (
      <ProtectedRoute allowedRoles={['admin', 'office']}>
        <Layout>
          <div className="flex items-center justify-center min-h-[40vh] gap-3 text-white/60">
            <Loader2 className="w-5 h-5 animate-spin" /> Calculating operative outputs…
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute allowedRoles={['admin', 'office']}>
      <Layout>
        {/* Print: the page chrome and screen UI disappear; only the work
            instruction block below renders (never customer prices/margins) */}
        <style>{`@media print {
          aside, nav, header { display: none !important; }
          body, main { background: white !important; padding: 0 !important; margin: 0 !important; }
        }`}</style>
        <div className="space-y-6 print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <h2 className="text-2xl font-bold text-white mt-2 flex items-center gap-2.5">
                <HardHat className="w-6 h-6 text-emerald-400" /> Operations
              </h2>
              <p className="text-sm text-white/60">
                {survey?.project_number} — operative outputs, assignment &amp; work instruction
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm" onClick={() => { setIsRefreshing(true); load() }} disabled={isRefreshing}>
                {isRefreshing ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-1.5" />}
                Recalculate
              </Button>
              <Button variant="primary" size="sm" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-1.5" /> Print work instruction
              </Button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-400/30">
              <AlertCircle className="w-4 h-4 text-red-300" />
              <span className="text-sm text-red-300">{error}</span>
            </div>
          )}

          {contractor && (
            <>
              {/* ── Job summary ── */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="glass border-white/10 p-4">
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />Hours</p>
                  <p className="text-xl font-bold text-white">{contractor.labourHours.toFixed(1)}h</p>
                  <p className="text-xs text-white/40">{contractor.labourDays} day{contractor.labourDays === 1 ? '' : 's'} on site</p>
                </Card>
                <Card className="glass border-white/10 p-4">
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />Crew</p>
                  <p className="text-xl font-bold text-white">{crew} {crew === 1 ? 'man' : 'men'}</p>
                  <p className="text-xs text-white/40">{distance} mi from office</p>
                </Card>
                <Card className="glass border-white/10 p-4">
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Wrench className="w-3.5 h-3.5" />Pay</p>
                  <p className="text-xl font-bold text-white">{formatCurrency(contractor.payTotal)}</p>
                  <p className="text-xs text-white/40">@ {formatCurrency(contractor.rates.contractorHourlyRate)}/h</p>
                </Card>
                <Card className="glass border-white/10 p-4">
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Package className="w-3.5 h-3.5" />Materials</p>
                  <p className="text-xl font-bold text-white">{formatCurrency(contractor.materialsTotal)}</p>
                  <p className="text-xs text-white/40">at contractor cost ×{contractor.rates.materialUplift.toFixed(2)}</p>
                </Card>
                <Card className="glass border-white/10 p-4">
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" />Travel</p>
                  <p className="text-xl font-bold text-white">{formatCurrency(contractor.travel)}</p>
                  <p className="text-xs text-white/40">@ {formatCurrency(contractor.rates.mileageRate)}/mi round trip</p>
                </Card>
              </div>

              {/* ── Per-section outputs + assignment ── */}
              <Card className="glass border-white/10 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10">
                  <h3 className="font-semibold text-white">Work sections — pay, hours &amp; assignment</h3>
                  <p className="text-xs text-white/50 mt-0.5">Assignments and notes are saved per section; figures refresh from the live costing.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10 text-xs font-medium text-white/60 uppercase tracking-wider">
                        <th className="px-5 py-3 text-left">Section</th>
                        <th className="px-5 py-3 text-right">Hours</th>
                        <th className="px-5 py-3 text-right">Materials</th>
                        <th className="px-5 py-3 text-right">Pay</th>
                        <th className="px-5 py-3 text-right">Total</th>
                        <th className="px-5 py-3 text-left">Assigned to</th>
                        <th className="px-5 py-3 text-left">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {contractor.sections.map((s) => {
                        const row = rowByKey.get(s.sectionKey)
                        return (
                          <tr key={s.sectionKey} className="hover:bg-white/5">
                            <td className="px-5 py-3 text-sm text-white/90">{formatSectionName(s.sectionKey)}</td>
                            <td className="px-5 py-3 text-sm text-white/70 text-right">{s.hours.toFixed(1)}h</td>
                            <td className="px-5 py-3 text-sm text-white/70 text-right">{formatCurrency(s.materials)}</td>
                            <td className="px-5 py-3 text-sm text-white/70 text-right">{formatCurrency(s.pay)}</td>
                            <td className="px-5 py-3 text-sm font-medium text-white text-right">{formatCurrency(s.total)}</td>
                            <td className="px-5 py-3">
                              <input
                                type="text"
                                defaultValue={row?.assigned_to ?? ''}
                                onBlur={(e) => row && e.target.value !== (row.assigned_to ?? '') && saveAssignment(row, { assigned_to: e.target.value.trim() || null })}
                                placeholder="Operative / subcontractor"
                                className="input-field text-sm w-40"
                                disabled={!row || savingRowId === row?.id}
                              />
                            </td>
                            <td className="px-5 py-3">
                              <input
                                type="text"
                                defaultValue={row?.notes ?? ''}
                                onBlur={(e) => row && e.target.value !== (row.notes ?? '') && saveAssignment(row, { notes: e.target.value.trim() || null })}
                                placeholder="Notes"
                                className="input-field text-sm w-48"
                                disabled={!row || savingRowId === row?.id}
                              />
                            </td>
                          </tr>
                        )
                      })}
                      <tr className="bg-white/5 font-semibold">
                        <td className="px-5 py-3 text-sm text-white">Totals (before travel)</td>
                        <td className="px-5 py-3 text-sm text-white text-right">{contractor.labourHours.toFixed(1)}h</td>
                        <td className="px-5 py-3 text-sm text-white text-right">{formatCurrency(contractor.materialsTotal)}</td>
                        <td className="px-5 py-3 text-sm text-white text-right">{formatCurrency(contractor.payTotal)}</td>
                        <td className="px-5 py-3 text-sm text-white text-right">{formatCurrency(contractor.materialsTotal + contractor.payTotal)}</td>
                        <td className="px-5 py-3" colSpan={2}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* ── Material list — the damp workbook's Material-List sheet:
                  purchasable units with the sheet's own pack rounding ── */}
              {purchase.length > 0 && (
                <Card className="glass border-white/10 overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/10">
                    <h3 className="font-semibold text-white flex items-center gap-2"><Package className="w-4 h-4" /> Material list</h3>
                    <p className="text-xs text-white/50 mt-0.5">Purchase quantities per the costing workbook&apos;s Material-List sheet.</p>
                    <p className="text-xs text-amber-400/80 mt-1">{MATERIAL_LIST_CAVEAT} — these are bought per job.</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10 text-xs font-medium text-white/60 uppercase tracking-wider">
                          <th className="px-5 py-3 text-left">Item</th>
                          <th className="px-5 py-3 text-right">Qty</th>
                          <th className="px-5 py-3 text-left">Unit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {Array.from(new Set(purchase.map((p) => p.group))).map((group) => (
                          <Fragment key={group}>
                            <tr className="bg-white/5">
                              <td colSpan={3} className="px-5 py-2 text-xs font-semibold text-white/70 uppercase tracking-wider">{group}</td>
                            </tr>
                            {purchase.filter((p) => p.group === group).map((p) => (
                              <tr key={p.sku} className="hover:bg-white/5">
                                <td className="px-5 py-2.5 text-sm text-white/90">
                                  {p.productUrl ? (
                                    <a href={p.productUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-300 hover:underline">{p.product}</a>
                                  ) : (
                                    p.product
                                  )}
                                  {p.usageNote && <p className="text-xs text-white/40 mt-0.5">{p.usageNote}</p>}
                                </td>
                                <td className="px-5 py-2.5 text-sm font-medium text-white text-right align-top">{p.quantity.toFixed(p.precision)}</td>
                                <td className="px-5 py-2.5 text-sm text-white/60 align-top">{p.uom}</td>
                              </tr>
                            ))}
                          </Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}

              {/* ── Job measurements — survey types without workbook purchase
                  rules (timber/woodworm "Sub Contractor Mats" is TBC) ── */}
              {measurements.length > 0 && (
                <Card className="glass border-white/10 overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/10">
                    <h3 className="font-semibold text-white flex items-center gap-2"><Package className="w-4 h-4" /> Job measurements</h3>
                    <p className="text-xs text-white/50 mt-0.5">
                      The workbooks define purchase quantities for damp works only — these lines show surveyed job quantities, not pack counts.
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10 text-xs font-medium text-white/60 uppercase tracking-wider">
                          <th className="px-5 py-3 text-left">Item</th>
                          <th className="px-5 py-3 text-left">Section</th>
                          <th className="px-5 py-3 text-right">Measurement</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {measurements.map((m, i) => (
                          <tr key={i} className="hover:bg-white/5">
                            <td className="px-5 py-2.5 text-sm text-white/90">{m.description}</td>
                            <td className="px-5 py-2.5 text-sm text-white/50">{formatSectionName(m.sectionKey)}</td>
                            <td className="px-5 py-2.5 text-sm text-white/70 text-right">
                              {formatQty(m.quantity)}{m.uom ? ` ${m.uom}` : ''}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </>
          )}
        </div>

        {/* ══ PRINT-ONLY: operative work instruction — scope, measurements,
            pay rate and travel allowance. NO customer prices or margins. ══ */}
        {contractor && survey && (
          <div className="hidden print:block text-black bg-white p-2 text-[13px] leading-relaxed">
            <h1 className="text-xl font-bold mb-1">Work Instruction — {survey.project_number}</h1>
            <p className="mb-4 text-sm">Tyne Tees Damp Proofing — operative/subcontractor copy</p>

            <table className="w-full mb-4 text-sm">
              <tbody>
                <tr><td className="font-semibold pr-4 py-0.5 align-top">Customer</td><td>{survey.client_name || '—'}</td></tr>
                <tr><td className="font-semibold pr-4 py-0.5 align-top">Site address</td><td>{[survey.site_address, survey.site_address_line2, survey.site_city, survey.site_postcode].filter(Boolean).join(', ')}</td></tr>
                <tr><td className="font-semibold pr-4 py-0.5 align-top">Days on site</td><td>{contractor.labourDays} day{contractor.labourDays === 1 ? '' : 's'} · crew of {crew} · {contractor.labourHours.toFixed(1)} labour hours</td></tr>
                <tr><td className="font-semibold pr-4 py-0.5 align-top">Rate of pay</td><td>{formatCurrency(contractor.rates.contractorHourlyRate)} per hour</td></tr>
                <tr><td className="font-semibold pr-4 py-0.5 align-top">Travel allowance</td><td>{formatCurrency(contractor.travel)} ({distance} miles from office, round trip × {contractor.labourDays} day{contractor.labourDays === 1 ? '' : 's'} @ {formatCurrency(contractor.rates.mileageRate)}/mile)</td></tr>
              </tbody>
            </table>

            <h2 className="text-base font-bold mt-4 mb-2 border-b border-black pb-1">Scope of works &amp; measurements</h2>
            {contractor.sections.map((s) => {
              const row = rowByKey.get(s.sectionKey)
              const sectionMeasurements = printMeasurements.filter((m) => m.sectionKey === s.sectionKey)
              return (
                <div key={s.sectionKey} className="mb-3" style={{ breakInside: 'avoid' }}>
                  <p className="font-semibold">
                    {formatSectionName(s.sectionKey)} — {s.hours.toFixed(1)}h, pay {formatCurrency(s.pay)}
                    {row?.assigned_to ? ` — assigned: ${row.assigned_to}` : ''}
                  </p>
                  <ul className="list-disc ml-5">
                    {sectionMeasurements.map((m, i) => (
                      <li key={i}>{m.description}: {formatQty(m.quantity)}{m.uom ? ` ${m.uom}` : ''}</li>
                    ))}
                  </ul>
                  {row?.notes && <p className="italic ml-5">Note: {row.notes}</p>}
                </div>
              )
            })}

            <h2 className="text-base font-bold mt-4 mb-2 border-b border-black pb-1">Pay summary</h2>
            <p>
              Labour: {contractor.labourHours.toFixed(1)}h × {formatCurrency(contractor.rates.contractorHourlyRate)} = {formatCurrency(contractor.payTotal)}<br />
              Travel allowance: {formatCurrency(contractor.travel)}<br />
              <strong>Total pay (excl. materials): {formatCurrency(contractor.payTotal + contractor.travel)}</strong>
            </p>
            <p className="mt-4 text-xs">
              Materials are supplied/reimbursed per the material list held by the office.
              Contact the office before deviating from this scope.
            </p>
          </div>
        )}
      </Layout>
    </ProtectedRoute>
  )
}
