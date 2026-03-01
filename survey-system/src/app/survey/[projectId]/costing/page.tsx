'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, AlertCircle, DollarSign, Truck, Wrench, Package, FileText, HardHat, ListChecks, Receipt } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { loadWizardData } from '@/lib/survey-wizard-data'
import { generateCostingFromSurvey } from '@/lib/survey-mapping'
import {
  loadPricingConfig,
  loadSectionAdjustments,
  loadSectionInclusions,
  loadSectionOptionalFlags,
  saveSectionAdjustment,
  saveSectionInclusion,
  type CalculationResult,
  type CalculatedLine,
} from '@/lib/pricing-data'
import { calculateTravelOverhead, type TravelOverheadResult } from '@/lib/travel-overhead'
import { getSupabase } from '@/lib/supabase-client'
import type { PricingConfig } from '@/lib/pricing-engine'

// Survey type display names (excludes site_preparation — that's job-level)
const SURVEY_TYPE_NAMES: Record<string, string> = {
  damp: 'Damp Survey',
  condensation: 'Condensation Survey',
  timber: 'Timber Survey',
  woodworm: 'Woodworm Survey',
}

// Survey type colours for tabs
const SURVEY_TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  damp: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-400/30' },
  condensation: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-400/30' },
  timber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-400/30' },
  woodworm: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-400/30' },
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatSectionName(sectionKey: string): string {
  return sectionKey
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// ─────────────────────────────────────────────────
// Toggle switch — inline, no extra dependency
// ─────────────────────────────────────────────────
function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 group"
      aria-pressed={checked}
      aria-label={label}
    >
      <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
        {checked ? 'Included' : 'Excluded'}
      </span>
      {/* Track */}
      <span
        className={`relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors duration-200 ${
          checked ? 'bg-emerald-500/70' : 'bg-white/20'
        }`}
      >
        {/* Thumb */}
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? 'translate-x-[18px]' : 'translate-x-[3px]'
          }`}
        />
      </span>
    </button>
  )
}

// ─────────────────────────────────────────────────
// SectionCard — renders a costing section with line items table
// ─────────────────────────────────────────────────
function SectionCard({
  sectionKey,
  lines,
  sectionTotal,
  adjPct,
  onAdjustmentChange,
  isOptional,
  isIncluded,
  onInclusionToggle,
}: {
  sectionKey: string
  lines: CalculatedLine[]
  sectionTotal: { materialTotal: number; labourTotal: number; sectionTotal: number } | undefined
  adjPct: number
  onAdjustmentChange: (value: number) => void
  isOptional: boolean
  isIncluded: boolean
  onInclusionToggle?: (included: boolean) => void
}) {
  const baseTotal = sectionTotal?.sectionTotal || 0
  const adjustedDisplayTotal = baseTotal * (1 + adjPct / 100)
  // Dim content (not header) when this optional section is excluded
  const dimContent = isOptional && !isIncluded

  return (
    <Card className="glass border-white/10 overflow-hidden">
      {/* Section Header — always full opacity, carries the toggle */}
      <div className="px-6 py-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center justify-between gap-4">
          {/* Left: name + optional badge */}
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-lg font-semibold text-white truncate">
              {formatSectionName(sectionKey)}
            </h2>
            {isOptional && (
              <span className="flex-shrink-0 text-xs text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-400/20 font-medium">
                Optional
              </span>
            )}
          </div>

          {/* Right: include/exclude toggle (optional sections only) */}
          {isOptional && onInclusionToggle && (
            <ToggleSwitch
              checked={isIncluded}
              onChange={onInclusionToggle}
              label={`${isIncluded ? 'Exclude' : 'Include'} ${formatSectionName(sectionKey)}`}
            />
          )}
        </div>
      </div>

      {/* Line Items Table — dims when excluded */}
      <div className={`transition-opacity duration-200 ${dimContent ? 'opacity-40' : 'opacity-100'}`}>
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
  // is_optional flag per section_key (from costing_sections)
  const [sectionOptionalFlags, setSectionOptionalFlags] = useState<Record<string, boolean>>({})
  // is_included per section_key (from costing_section_adjustments.is_included)
  // absent key → default true (included)
  const [sectionInclusions, setSectionInclusions] = useState<Record<string, boolean>>({})
  // Pricing config (stored for deposit % lookup)
  const [pricingConfig, setPricingConfig] = useState<PricingConfig>({})
  // Existing quotation (latest version for this survey, if any)
  const [existingQuotation, setExistingQuotation] = useState<{
    version: number; created_at: string; quotation_number: string
  } | null>(null)
  // Generate button loading state
  const [isGenerating, setIsGenerating] = useState(false)

  const debounceTimersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  // Load wizard data and generate costing on mount
  useEffect(() => {
    async function loadAndCalculate() {
      setIsLoading(true)
      setError(null)

      try {
        const { wizardData, rooms } = await loadWizardData(projectId)
        const results = await generateCostingFromSurvey(projectId, wizardData, rooms)

        if (Object.keys(results).length === 0) {
          throw new Error('No survey data found to generate costs. Please complete the survey wizard first.')
        }

        setCostingResults(results)

        // Load saved adjustments, inclusions, and optional flags in parallel
        const allSurveyTypes = Object.keys(results)
        const [savedAdjustments, savedInclusions, optionalFlags] = await Promise.all([
          loadSectionAdjustments(projectId),
          loadSectionInclusions(projectId),
          loadSectionOptionalFlags(allSurveyTypes),
        ])

        setSectionAdjustments(savedAdjustments)
        setSectionInclusions(savedInclusions)
        setSectionOptionalFlags(optionalFlags)

        // Calculate travel overhead from combined labour hours across ALL types
        const loadedConfig = await loadPricingConfig()
        setPricingConfig(loadedConfig)
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
          hourlyLabourRate: loadedConfig['hourly_labour_rate'] ?? 30.63,
          vehicleCostPerMile: loadedConfig['vehicle_cost_per_mile'] ?? 0.50,
        })
        setTravelOverhead(overhead)

        // Load existing quotation (latest version) if any
        const supabase = getSupabase()
        if (supabase) {
          const { data: existingQ } = await supabase
            .from('quotations')
            .select('version, created_at, quotation_number')
            .eq('survey_id', projectId)
            .order('version', { ascending: false })
            .limit(1)
          if (existingQ && existingQ.length > 0) {
            setExistingQuotation(existingQ[0])
          }
        }

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

  // Handle include/exclude toggle — updates state immediately, persists to DB
  function handleInclusionToggle(sectionKey: string, surveyType: string, isIncluded: boolean) {
    setSectionInclusions(prev => ({ ...prev, [sectionKey]: isIncluded }))
    saveSectionInclusion(projectId, sectionKey, surveyType, isIncluded)
  }

  // Returns true if a section is effectively included in the job total
  function isSectionIncluded(sectionKey: string): boolean {
    if (!sectionOptionalFlags[sectionKey]) return true  // mandatory = always included
    // Optional: included unless explicitly set to false
    return sectionInclusions[sectionKey] !== false
  }

  // Adjusted total for a single section (applies adjustment %)
  function sectionAdjustedTotal(sectionKey: string, baseTotal: number): number {
    return baseTotal * (1 + (sectionAdjustments[sectionKey] || 0) / 100)
  }

  // Generate quotation — gathers all frozen data and POSTs to the API
  async function handleGenerateQuotation() {
    setIsGenerating(true)
    try {
      // Build section payloads from all costing results
      const sectionPayloads: Array<{
        surveyType: string; sectionKey: string; displayName: string;
        displayOrder: number; materialTotal: number; labourTotal: number;
        sectionTotal: number; isOptional: boolean; isIncluded: boolean;
      }> = []

      let displayOrder = 0

      // Site preparation sections
      if (sitePrepResult) {
        for (const [key, totals] of Object.entries(sitePrepResult.sectionTotals)) {
          const adjTotal = sectionAdjustedTotal(key, totals.sectionTotal)
          const adjFactor = 1 + (sectionAdjustments[key] || 0) / 100
          sectionPayloads.push({
            surveyType: 'site_preparation',
            sectionKey: key,
            displayName: formatSectionName(key),
            displayOrder: displayOrder++,
            materialTotal: totals.materialTotal * adjFactor,
            labourTotal: totals.labourTotal * adjFactor,
            sectionTotal: adjTotal,
            isOptional: sectionOptionalFlags[key] ?? false,
            isIncluded: isSectionIncluded(key),
          })
        }
      }

      // Per-type sections
      for (const [surveyType, result] of Object.entries(perTypeResults)) {
        for (const [key, totals] of Object.entries(result.sectionTotals)) {
          const adjTotal = sectionAdjustedTotal(key, totals.sectionTotal)
          const adjFactor = 1 + (sectionAdjustments[key] || 0) / 100
          sectionPayloads.push({
            surveyType,
            sectionKey: key,
            displayName: formatSectionName(key),
            displayOrder: displayOrder++,
            materialTotal: totals.materialTotal * adjFactor,
            labourTotal: totals.labourTotal * adjFactor,
            sectionTotal: adjTotal,
            isOptional: sectionOptionalFlags[key] ?? false,
            isIncluded: isSectionIncluded(key),
          })
        }
      }

      const res = await fetch(`/api/surveys/${projectId}/quotation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subtotalMandatory: mandatoryWorksTotal,
          subtotalOptional: optionalIncludedTotal,
          subtotalCombined: combinedWorksTotal,
          psoTotal: overheadAmount,
          vatRate: 0.20,
          vatAmount: jobVAT,
          totalInclVat: jobGrandTotalIncVAT,
          depositPercentage: depositPct,
          depositAmount,
          sections: sectionPayloads,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to generate quotation')
      }

      const data = await res.json()
      router.push(`/survey/${projectId}/quotation/${data.quotationId}`)
    } catch (err) {
      console.error('Failed to generate quotation:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate quotation')
    } finally {
      setIsGenerating(false)
    }
  }

  // ─── Derived data ───

  const sitePrepResult = costingResults['site_preparation'] || null
  const perTypeResults: Record<string, CalculationResult> = {}
  for (const [key, value] of Object.entries(costingResults)) {
    if (key !== 'site_preparation') {
      perTypeResults[key] = value
    }
  }

  const surveyTypes = Object.keys(perTypeResults)
  const activeResult = activeSurveyType ? perTypeResults[activeSurveyType] : null
  const activeLinesBySection = activeResult?.lines.reduce((acc, line) => {
    if (!acc[line.sectionKey]) acc[line.sectionKey] = []
    acc[line.sectionKey].push(line)
    return acc
  }, {} as Record<string, CalculatedLine[]>) || {}
  const activeSortedSections = Object.keys(activeLinesBySection).sort()

  const sitePrepLinesBySection = sitePrepResult?.lines.reduce((acc, line) => {
    if (!acc[line.sectionKey]) acc[line.sectionKey] = []
    acc[line.sectionKey].push(line)
    return acc
  }, {} as Record<string, CalculatedLine[]>) || {}
  const sitePrepSortedSections = Object.keys(sitePrepLinesBySection).sort()

  const overheadAmount = travelOverhead?.totalOverheadCost || 0

  // ─── Job totals — split into mandatory and optional-included ───

  // Mandatory: non-optional sections (all site_prep + mandatory per-type)
  // Optional included: optional sections where isSectionIncluded() is true
  let mandatoryWorksTotal = 0
  let optionalIncludedTotal = 0

  // Site preparation (all sections are non-optional)
  if (sitePrepResult) {
    for (const [key, totals] of Object.entries(sitePrepResult.sectionTotals)) {
      mandatoryWorksTotal += sectionAdjustedTotal(key, totals.sectionTotal)
    }
  }

  // Per-type sections
  for (const result of Object.values(perTypeResults)) {
    for (const [key, totals] of Object.entries(result.sectionTotals)) {
      const contribution = sectionAdjustedTotal(key, totals.sectionTotal)
      if (sectionOptionalFlags[key]) {
        // Optional section — only count if included
        if (isSectionIncluded(key)) {
          optionalIncludedTotal += contribution
        }
      } else {
        mandatoryWorksTotal += contribution
      }
    }
  }

  const combinedWorksTotal = mandatoryWorksTotal + optionalIncludedTotal
  const jobSubtotal = combinedWorksTotal + overheadAmount
  const jobVAT = jobSubtotal * 0.20
  const jobGrandTotalIncVAT = jobSubtotal + jobVAT

  // ─── Deposit calculation ───
  // Deposit % keys in pricing_config: damp_deposit_pct, condensation_deposit_pct, etc.
  // Use the HIGHEST deposit percentage among active survey types.
  const DEPOSIT_CONFIG_KEYS: Record<string, string> = {
    damp: 'damp_deposit_pct',
    condensation: 'condensation_deposit_pct',
    timber: 'timber_deposit_pct',
    woodworm: 'woodworm_deposit_pct',
  }

  let depositPct = 0
  for (const type of surveyTypes) {
    const configKey = DEPOSIT_CONFIG_KEYS[type]
    if (configKey && pricingConfig[configKey] != null) {
      depositPct = Math.max(depositPct, pricingConfig[configKey])
    }
  }
  // Deposit calculated from mandatory total only
  const depositAmount = mandatoryWorksTotal * depositPct

  // Does this job have any optional sections that actually have line items?
  const hasOptionalSections = Object.keys(sectionOptionalFlags).some(
    k => sectionOptionalFlags[k]
  )

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
            <Link
              href={`/surveys/${projectId}`}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Survey</span>
            </Link>

            <div className="text-center">
              <h1 className="text-xl font-semibold text-white">Survey Costing</h1>
              <p className="text-sm text-white/60">Project #{projectId.slice(0, 8)}</p>
            </div>

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
                    isOptional={sectionOptionalFlags[sectionKey] ?? false}
                    isIncluded={isSectionIncluded(sectionKey)}
                    onInclusionToggle={(included) =>
                      handleInclusionToggle(sectionKey, 'site_preparation', included)
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
                  {formatCurrency(
                    Object.entries(sitePrepResult.sectionTotals).reduce(
                      (sum, [key, totals]) => sum + sectionAdjustedTotal(key, totals.sectionTotal),
                      0
                    )
                  )}
                </span>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10" />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            PROJECT SPECIFIC OVERHEADS
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

            <div className="mt-6 border-t border-white/10" />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            PER-TYPE SURVEY SECTIONS — tabs for damp, timber, etc.
           ════════════════════════════════════════════════════════════ */}

        {/* Survey Type Tabs */}
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
                isOptional={sectionOptionalFlags[sectionKey] ?? false}
                isIncluded={isSectionIncluded(sectionKey)}
                onInclusionToggle={(included) =>
                  handleInclusionToggle(sectionKey, activeSurveyType, included)
                }
              />
            ))}

            {/* Per-type subtotal (informational, within tab context) */}
            {surveyTypes.length > 1 && (
              <div className="flex justify-end">
                <div className="text-sm text-white/70">
                  {SURVEY_TYPE_NAMES[activeSurveyType] || activeSurveyType} Subtotal:{' '}
                  <span className="text-white font-semibold">
                    {formatCurrency(
                      Object.entries(activeResult.sectionTotals)
                        .filter(([key]) => isSectionIncluded(key))
                        .reduce((sum, [key, totals]) => sum + sectionAdjustedTotal(key, totals.sectionTotal), 0)
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            COMBINED JOB GRAND TOTAL — sticky footer
           ════════════════════════════════════════════════════════════ */}
        <Card className="glass border-white/10 overflow-hidden sticky bottom-4">
          <div className="px-6 py-4 bg-gradient-to-br from-brand-500/20 to-brand-600/20">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Job Cost Summary
            </h2>

            <div className="space-y-3">
              {/* Mandatory works total */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-white/70">
                  <span>Mandatory Works</span>
                </div>
                <span className="text-white font-medium">
                  {formatCurrency(mandatoryWorksTotal)}
                </span>
              </div>

              {/* Optional included total — only shown when the job has optional sections */}
              {hasOptionalSections && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-white/70">
                    <ListChecks className="w-4 h-4 text-amber-400/70" />
                    <span>
                      Optional Works <span className="text-xs">(included)</span>
                    </span>
                  </div>
                  <span className={`font-medium ${optionalIncludedTotal > 0 ? 'text-white' : 'text-white/40'}`}>
                    {formatCurrency(optionalIncludedTotal)}
                  </span>
                </div>
              )}

              {/* Combined total */}
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-white/90 font-medium">
                  Combined Works
                </span>
                <span className="text-white font-semibold">
                  {formatCurrency(combinedWorksTotal)}
                </span>
              </div>

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

              {/* Deposit required */}
              {depositPct > 0 && (
                <div className="flex justify-between items-center pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2 text-white/70">
                    <Receipt className="w-4 h-4 text-brand-300/70" />
                    <span>Deposit required ({Math.round(depositPct * 100)}%)</span>
                  </div>
                  <span className="text-brand-300 font-semibold">
                    {formatCurrency(depositAmount)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          {/* Previous quotation version note */}
          {existingQuotation && (
            <div className="text-center text-sm text-white/50">
              v{existingQuotation.version} ({existingQuotation.quotation_number}) generated on{' '}
              {new Date(existingQuotation.created_at).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric',
              })}
            </div>
          )}

          <div className="flex gap-4 justify-center flex-wrap">
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
              onClick={handleGenerateQuotation}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Receipt className="w-4 h-4 mr-2" />
                  {existingQuotation ? 'Regenerate Quotation' : 'Generate Quotation'}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
