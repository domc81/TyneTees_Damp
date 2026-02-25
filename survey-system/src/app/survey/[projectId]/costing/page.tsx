'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, AlertCircle, DollarSign, Wrench, Package, FileText } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { loadWizardData } from '@/lib/survey-wizard-data'
import { generateCostingFromSurvey } from '@/lib/survey-mapping'
import type { CalculationResult, CalculatedLine } from '@/lib/pricing-data'

// Survey type display names
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

export default function CostingReviewPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.projectId as string

  // State
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [costingResults, setCostingResults] = useState<Record<string, CalculationResult>>({})
  const [activeSurveyType, setActiveSurveyType] = useState<string>('')

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

        // Set the first survey type as active
        const firstSurveyType = Object.keys(results)[0]
        setActiveSurveyType(firstSurveyType)
      } catch (err) {
        console.error('Failed to generate costing:', err)
        setError(err instanceof Error ? err.message : 'Failed to generate costing. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadAndCalculate()
  }, [projectId])

  // Get active result
  const activeResult = activeSurveyType ? costingResults[activeSurveyType] : null

  // Group lines by section
  const linesBySection = activeResult?.lines.reduce((acc, line) => {
    if (!acc[line.sectionKey]) {
      acc[line.sectionKey] = []
    }
    acc[line.sectionKey].push(line)
    return acc
  }, {} as Record<string, CalculatedLine[]>) || {}

  // Sort sections by display order (alphabetically for now)
  const sortedSections = Object.keys(linesBySection).sort()

  // Calculate VAT (20%)
  const subtotal = activeResult?.grandTotal.total || 0
  const vatAmount = subtotal * 0.20
  const grandTotalIncVAT = subtotal + vatAmount

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

  const surveyTypes = Object.keys(costingResults)

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

        {/* Section Breakdown */}
        <div className="space-y-6 mb-8">
          {sortedSections.map((sectionKey) => {
            const lines = linesBySection[sectionKey]
            const sectionTotal = activeResult?.sectionTotals[sectionKey]

            return (
              <Card key={sectionKey} className="glass border-white/10 overflow-hidden">
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
                          {formatCurrency(sectionTotal?.sectionTotal || 0)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Grand Totals Card */}
        <Card className="glass border-white/10 overflow-hidden sticky bottom-4">
          <div className="px-6 py-4 bg-gradient-to-br from-brand-500/20 to-brand-600/20">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Cost Summary
            </h2>

            <div className="space-y-3">
              {/* Materials Total */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-white/70">
                  <Package className="w-4 h-4" />
                  <span>Total Materials</span>
                </div>
                <span className="text-white font-medium">
                  {formatCurrency(activeResult?.grandTotal.materialTotal || 0)}
                </span>
              </div>

              {/* Labour Total */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-white/70">
                  <Wrench className="w-4 h-4" />
                  <span>Total Labour</span>
                </div>
                <span className="text-white font-medium">
                  {formatCurrency(activeResult?.grandTotal.labourTotal || 0)}
                </span>
              </div>

              {/* Subtotal (ex VAT) */}
              <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <span className="text-white/90 font-medium">Subtotal (ex VAT)</span>
                <span className="text-white font-semibold text-lg">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              {/* VAT */}
              <div className="flex justify-between items-center">
                <span className="text-white/70">VAT (20%)</span>
                <span className="text-white/90">
                  {formatCurrency(vatAmount)}
                </span>
              </div>

              {/* Grand Total (inc VAT) */}
              <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <span className="text-white font-bold text-lg">Grand Total (inc VAT)</span>
                <span className="text-brand-300 font-bold text-2xl">
                  {formatCurrency(grandTotalIncVAT)}
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
