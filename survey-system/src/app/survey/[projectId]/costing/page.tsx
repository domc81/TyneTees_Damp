'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, AlertCircle, DollarSign, Truck, Wrench, Package, FileText, HardHat } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { loadWizardData } from '@/lib/survey-wizard-data'
import { generateCostingFromSurvey } from '@/lib/survey-mapping'
import { loadPricingConfig, loadSectionAdjustments, saveSectionAdjustment, type CalculationResult, type CalculatedLine } from '@/lib/pricing-data'
import { calculateTravelOverhead, type TravelOverheadResult } from '@/lib/travel-overhead'

// Survey type display names (excludes site_preparation — that's job-level)
const SURVEY_TYPE_NAMES: Record<string, string> = {
  damp: 'Damp Survey',
  condensation: 'Condensation Survey',
  timber: 'Timber Survey',
  woodworm: 'Woodworm Survey',
}

// Survey type colors for tabs
const SURVEY_TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  damp: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-400/30' },
  condensation: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-400/30' },
  timber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-400/30' },
  woodworm: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-400/30' },
}

// Format currency helper
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

// Section name formatter (convert section_key to display name)
function formatSectionName(sectionKey: string): string {
  return sectionKey
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// ─────────────────────────────────────────────────
// Reusable section card — renders a costing section with line items table
// ─────────────────────────────────────────────────
function SectionCard({
  sectionKey,
  lines,
  sectionTotal,
  adjPct,
  onAdjustmentChange,
}: {
  sectionKey: string
  lines: CalculatedLine[]
  sectionTotal: { materialTotal: number; labourTotal: number; sectionTotal: number } | undefined
  adjPct: number
  onAdjustmentChange: (value: number) => void
}) {
  const baseTotal = sectionTotal?.sectionTotal || 0
  const adjustedDisplayTotal = baseTotal * (1 + adjPct / 100)

  return (
    <Card className="glass border-white/10 overflow-hidden">
      {/* Section Header */}
      <div className="px-6 py-4 border-b border-white/10 bg-white/5">
        <h2 className="text-lg font-semibold text-white">
          {formatSectionName(sectionKey)}
        </h2>
      </div>

      {/* Line Items Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-white/60 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-white/60 uppercase tracking-wider">
                <div className="flex items-center justify-end gap-1">
                  <Package className="w-3 h-3" />
                  Material
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-white/60 uppercase tracking-wider">
                <div className="flex items-center justify-end gap-1">
                  <Wrench className="w-3 h-3" />
                  Labour
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-white/60 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {lines.map((line, index) => (
              <tr key={index} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-white/90">
                  {line.templateDescription}
                </td>
                <td className="px-6 py-4 text-sm text-white/70 text-right">
                  {line.input.inputQuantity.toFixed(2)}
                  {line.input.inputDimension && (
                    <span className="text-white/50 ml-1">
                      × {line.input.inputDimension}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-white/70 text-right">
                  {formatCurrency(line.result.materialTotal)}
                </td>
                <td className="px-6 py-4 text-sm text-white/70 text-right">
                  {formatCurrency(line.result.labourTotal)}
                  {line.result.labourHours > 0 && (
                    <span className="text-white/50 text-xs ml-1">
                      ({line.result.labourHours.toFixed(1)}h)
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-white text-right">
                  {formatCurrency(line.result.lineTotal)}
                </td>
              </tr>
            ))}

            {/* Section Subtotal Row */}
            <tr className="bg-white/5 font-semibold">
              <td className="px-6 py-4 text-sm text-white" colSpan={2}>
                Section Subtotal
              </td>
              <td className="px-6 py-4 text-sm text-white text-right">
                {formatCurrency(sectionTotal?.materialTotal || 0)}
              </td>
              <td className="px-6 py-4 text-sm text-white text-right">
                {formatCurrency(sectionTotal?.labourTotal || 0)}
              </td>
              <td className="px-6 py-4 text-sm text-white text-right">
                {formatCurrency(baseTotal)}
              </td>
            </tr>

            {/* Section Adjustment Row */}
            <tr className="border-t border-white/5">
              <td className="px-6 py-3" colSpan={4}>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-white/50 whitespace-nowrap">
                    Section Adjustment %
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={adjPct}
                    onChange={(e) => onAdjustmentChange(parseFloat(e.target.value) || 0)}
                    className="w-24 px-2 py-1 text-sm bg-white/10 border border-white/20 rounded text-white text-right focus:outline-none focus:border-brand-300/50 focus:ring-1 focus:ring-brand-300/20"
                  />
                </div>
              </td>
              <td className="px-6 py-3 text-sm text-right">
                {adjPct !== 0 && (
                  <span
                    className={`font-semibold ${
                      adjPct > 0 ? 'text-green-400' : 'text-amber-400'
                    }`}
                  >
                    {formatCurrency(adjustedDisplayTotal)}
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default function CostingReviewPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.projectId as string

  // State
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [costingResults, setCostingResults] = useState<Record<string, CalculationResult>>({})
  const [activeSurveyType, setActiveSurveyType] = useState<string>('')
  const [travelOverhead, setTravelOverhead] = useState<TravelOverheadResult | null>(null)
  const [sectionAdjustments, setSectionAdjustments] = useState<Record<string, number>>({})
  const debounceTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  // Load wizard data and generate costing on mount
  useEffect(() => {
    async function loadAndCalculate() {
      setIsLoading(true)
      setError(null)

      try {
        // Load wizard data
        const { wizardData, rooms } = await loadWizardData(projectId)

        // Generate costing
        const results = await generateCostingFromSurvey(projectId, wizardData, rooms)

        if (Object.keys(results).length === 0) {
          throw new Error('No survey data found to generate costs. Please complete the survey wizard first.')
        }

        setCostingResults(results)

        // Load saved section adjustments
        const savedAdjustments = await loadSectionAdjustments(projectId)
        setSectionAdjustments(savedAdjustments)

        // Calculate travel overhead ONCE from combined labour hours across ALL types
        const pricingConfig = await loadPricingConfig()
        const additionalWorks = wizardData.additional_works || {}
        const distanceFromOffice = additionalWorks.distance_from_office || 0
        const numMenTravelling = additionalWorks.num_men_travelling || 0

        let combinedLabourHours = 0
        for (const result of Object.values(results)) {
          combinedLabourHours += result.lines.reduce(
            (sum: number, line: CalculatedLine) => sum + line.result.labourHours, 0
          )
        }

        const overhead = calculateTravelOverhead({
          totalLabourHours: combinedLabourHours,
          distanceFromOffice,
          numMenTravelling,
          hourlyLabourRate: pricingConfig['hourly_labour_rate'] ?? 30.63,
          vehicleCostPerMile: pricingConfig['vehicle_cost_per_mile'] ?? 0.50,
        })
        setTravelOverhead(overhead)

        // Set the first non-site_preparation survey type as active tab
        const typeKeys = Object.keys(results).filter(k => k !== 'site_preparation')
        if (typeKeys.length > 0) {
          setActiveSurveyType(typeKeys[0])
        }
      } catch (err) {
        console.error('Failed to generate costing:', err)
        setError(err instanceof Error ? err.message : 'Failed to generate costing. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadAndCalculate()
  }, [projectId])

  // Handle section adjustment change — updates state immediately, debounces DB write
  function handleAdjustmentChange(sectionKey: string, surveyType: string, value: number) {
    setSectionAdjustments(prev => ({ ...prev, [sectionKey]: value }))
    if (debounceTimersRef.current[sectionKey]) {
      clearTimeout(debounceTimersRef.current[sectionKey])
    }
    debounceTimersRef.current[sectionKey] = setTimeout(() => {
      saveSectionAdjustment(projectId, sectionKey, surveyType, value)
    }, 750)
  }

  // ─── Derived data ───

  // Separate site_preparation from per-type results
  const sitePrepResult = costingResults['site_preparation'] || null
  const perTypeResults: Record<string, CalculationResult> = {}
  for (const [key, value] of Object.entries(costingResults)) {
    if (key !== 'site_preparation') {
      perTypeResults[key] = value
    }
  }

  // Survey type tab keys (excludes site_preparation)
  const surveyTypes = Object.keys(perTypeResults)

  // Active type result and its section breakdown
  const activeResult = activeSurveyType ? perTypeResults[activeSurveyType] : null
  const activeLinesBySection = activeResult?.lines.reduce((acc, line) => {
    if (!acc[line.sectionKey]) acc[line.sectionKey] = []
    acc[line.sectionKey].push(line)
    return acc
  }, {} as Record<string, CalculatedLine[]>) || {}
  const activeSortedSections = Object.keys(activeLinesBySection).sort()

  // Site preparation section breakdown
  const sitePrepLinesBySection = sitePrepResult?.lines.reduce((acc, line) => {
    if (!acc[line.sectionKey]) acc[line.sectionKey] = []
    acc[line.sectionKey].push(line)
    return acc
  }, {} as Record<string, CalculatedLine[]>) || {}
  const sitePrepSortedSections = Object.keys(sitePrepLinesBySection).sort()

  // Single travel overhead
  const overheadAmount = travelOverhead?.totalOverheadCost || 0

  // ─── Combined job totals ───
  // Sum adjusted totals across ALL types + site_preparation
  function getAdjustedTotal(result: CalculationResult | null): { adjusted: number; base: number; material: number; labour: number } {
    if (!result) return { adjusted: 0, base: 0, material: 0, labour: 0 }
    const sectionKeys = Object.keys(result.sectionTotals)
    let adjusted = 0
    for (const key of sectionKeys) {
      const base = result.sectionTotals[key]?.sectionTotal || 0
      const adjPct = sectionAdjustments[key] || 0
      adjusted += base * (1 + adjPct / 100)
    }
    return {
      adjusted,
      base: result.grandTotal.total,
      material: result.grandTotal.materialTotal,
      labour: result.grandTotal.labourTotal,
    }
  }

  // Combine across all types + site prep
  let jobMaterialTotal = 0
  let jobLabourTotal = 0
  let jobAdjustedTotal = 0
  let jobBaseTotal = 0

  // Site preparation
  const sitePrepTotals = getAdjustedTotal(sitePrepResult)
  jobMaterialTotal += sitePrepTotals.material
  jobLabourTotal += sitePrepTotals.labour
  jobAdjustedTotal += sitePrepTotals.adjusted
  jobBaseTotal += sitePrepTotals.base

  // Per-type totals
  for (const result of Object.values(perTypeResults)) {
    const totals = getAdjustedTotal(result)
    jobMaterialTotal += totals.material
    jobLabourTotal += totals.labour
    jobAdjustedTotal += totals.adjusted
    jobBaseTotal += totals.base
  }

  const jobNetAdjustment = jobAdjustedTotal - jobBaseTotal
  const jobSubtotal = jobAdjustedTotal + overheadAmount
  const jobVAT = jobSubtotal * 0.20
  const jobGrandTotalIncVAT = jobSubtotal + jobVAT

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-brand-300 animate-spin mx-auto mb-4" />
          <p className="text-white/70">Calculating costs...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 text-center glass border-red-400/30">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Error Generating Costing</h2>
          <p className="text-white/70 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="ghost"
              onClick={() => router.push(`/surveys/${projectId}`)}
            >
              Back to Survey
            </Button>
            <Button
              variant="primary"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <header className="sticky top-0 z-20 glass border-b border-white/10 px-4 lg:px-8 py-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Back button */}
            <Link
              href={`/surveys/${projectId}`}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Survey</span>
            </Link>

            {/* Title */}
            <div className="text-center">
              <h1 className="text-xl font-semibold text-white">Survey Costing</h1>
              <p className="text-sm text-white/60">Project #{projectId.slice(0, 8)}</p>
            </div>

            {/* Spacer for alignment */}
            <div className="w-[120px]" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* ════════════════════════════════════════════════════════════
            SITE PREPARATION & LOGISTICS — job-level, above tabs
           ════════════════════════════════════════════════════════════ */}
        {sitePrepResult && sitePrepSortedSections.length > 0 && (
          <div className="mb-8">
            {/* Section heading with visual distinction */}
            <div className="flex items-center gap-3 mb-4">
              <HardHat className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-semibold text-white">Site Preparation & Logistics</h2>
              <span className="text-xs text-emerald-400/70 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                Whole job
              </span>
            </div>

            <div className="space-y-6 pl-0 border-l-2 border-emerald-400/30 rounded-sm">
              {sitePrepSortedSections.map((sectionKey) => (
                <div key={sectionKey} className="ml-4">
                  <SectionCard
                    sectionKey={sectionKey}
                    lines={sitePrepLinesBySection[sectionKey]}
                    sectionTotal={sitePrepResult.sectionTotals[sectionKey]}
                    adjPct={sectionAdjustments[sectionKey] || 0}
                    onAdjustmentChange={(value) =>
                      handleAdjustmentChange(sectionKey, 'site_preparation', value)
                    }
                  />
                </div>
              ))}
            </div>

            {/* Site prep subtotal */}
            <div className="mt-4 ml-4 flex justify-end">
              <div className="text-sm text-white/70">
                Site Preparation Subtotal:{' '}
                <span className="text-white font-semibold">
                  {formatCurrency(sitePrepTotals.adjusted)}
                </span>
              </div>
            </div>

            {/* Visual separator between job-level and per-type sections */}
            <div className="mt-6 border-t border-white/10" />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            PROJECT SPECIFIC OVERHEADS — job-level, single calculation
           ════════════════════════════════════════════════════════════ */}
        {overheadAmount > 0 && (
          <div className="mb-8">
            <Card className="glass border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-sky-400" />
                  <h2 className="text-lg font-semibold text-white">Project Specific Overheads</h2>
                  <span className="text-xs text-sky-400/70 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-400/20">
                    Whole job
                  </span>
                </div>
              </div>
              <div className="px-6 py-4 space-y-2">
                {travelOverhead && travelOverhead.labourDays > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">
                      Working days: {travelOverhead.labourDays} &middot; Travel hours: {travelOverhead.travelHours.toFixed(1)}h
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Travel labour</span>
                  <span className="text-white">{formatCurrency(travelOverhead?.travelLabourCost || 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Vehicle mileage</span>
                  <span className="text-white">{formatCurrency(travelOverhead?.vehicleMileageCost || 0)}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-white/10 font-semibold">
                  <span className="text-white">Overhead Total</span>
                  <span className="text-white">{formatCurrency(overheadAmount)}</span>
                </div>
              </div>
            </Card>

            {/* Visual separator */}
            <div className="mt-6 border-t border-white/10" />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            PER-TYPE SURVEY SECTIONS — tabs for damp, timber, etc.
           ════════════════════════════════════════════════════════════ */}

        {/* Survey Type Tabs (if multiple survey types) */}
        {surveyTypes.length > 1 && (
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {surveyTypes.map((surveyType) => {
                const colors = SURVEY_TYPE_COLORS[surveyType]
                const isActive = surveyType === activeSurveyType

                return (
                  <button
                    key={surveyType}
                    onClick={() => setActiveSurveyType(surveyType)}
                    className={`
                      px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all
                      ${isActive
                        ? `${colors.bg} ${colors.text} border ${colors.border}`
                        : 'bg-white/5 text-white/60 hover:bg-white/10 border border-transparent'
                      }
                    `}
                  >
                    {SURVEY_TYPE_NAMES[surveyType] || surveyType}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Active type section breakdown */}
        {activeResult && (
          <div className="space-y-6 mb-8">
            {activeSortedSections.map((sectionKey) => (
              <SectionCard
                key={sectionKey}
                sectionKey={sectionKey}
                lines={activeLinesBySection[sectionKey]}
                sectionTotal={activeResult.sectionTotals[sectionKey]}
                adjPct={sectionAdjustments[sectionKey] || 0}
                onAdjustmentChange={(value) =>
                  handleAdjustmentChange(sectionKey, activeSurveyType, value)
                }
              />
            ))}

            {/* Per-type subtotal (informational, within tab context) */}
            {surveyTypes.length > 1 && (
              <div className="flex justify-end">
                <div className="text-sm text-white/70">
                  {SURVEY_TYPE_NAMES[activeSurveyType] || activeSurveyType} Subtotal:{' '}
                  <span className="text-white font-semibold">
                    {formatCurrency(getAdjustedTotal(activeResult).adjusted)}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            COMBINED JOB GRAND TOTAL
           ════════════════════════════════════════════════════════════ */}
        <Card className="glass border-white/10 overflow-hidden sticky bottom-4">
          <div className="px-6 py-4 bg-gradient-to-br from-brand-500/20 to-brand-600/20">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Job Cost Summary
            </h2>

            <div className="space-y-3">
              {/* Materials Total */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-white/70">
                  <Package className="w-4 h-4" />
                  <span>Total Materials</span>
                </div>
                <span className="text-white font-medium">
                  {formatCurrency(jobMaterialTotal)}
                </span>
              </div>

              {/* Labour Total */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-white/70">
                  <Wrench className="w-4 h-4" />
                  <span>Total Labour</span>
                </div>
                <span className="text-white font-medium">
                  {formatCurrency(jobLabourTotal)}
                </span>
              </div>

              {/* Net Section Adjustments */}
              {jobNetAdjustment !== 0 && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-white/70">
                    <span>Section Adjustments</span>
                  </div>
                  <span
                    className={`font-medium ${
                      jobNetAdjustment > 0 ? 'text-green-400' : 'text-amber-400'
                    }`}
                  >
                    {jobNetAdjustment > 0 ? `+${formatCurrency(jobNetAdjustment)}` : formatCurrency(jobNetAdjustment)}
                  </span>
                </div>
              )}

              {/* Project Specific Overheads */}
              {overheadAmount > 0 && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-white/70">
                    <Truck className="w-4 h-4" />
                    <span>Project Specific Overheads</span>
                  </div>
                  <span className="text-white font-medium">
                    {formatCurrency(overheadAmount)}
                  </span>
                </div>
              )}

              {/* Subtotal (ex VAT) */}
              <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <span className="text-white/90 font-medium">Subtotal (ex VAT)</span>
                <span className="text-white font-semibold text-lg">
                  {formatCurrency(jobSubtotal)}
                </span>
              </div>

              {/* VAT */}
              <div className="flex justify-between items-center">
                <span className="text-white/70">VAT (20%)</span>
                <span className="text-white/90">
                  {formatCurrency(jobVAT)}
                </span>
              </div>

              {/* Grand Total (inc VAT) */}
              <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <span className="text-white font-bold text-lg">Grand Total (inc VAT)</span>
                <span className="text-brand-300 font-bold text-2xl">
                  {formatCurrency(jobGrandTotalIncVAT)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <Button
            variant="ghost"
            onClick={() => router.push(`/surveys/${projectId}`)}
          >
            Back to Survey
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push(`/survey/${projectId}/report`)}
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button
            variant="primary"
            onClick={() => router.push(`/surveys/${projectId}`)}
          >
            Complete & Return to Survey
          </Button>
        </div>
      </div>
    </div>
  )
}
