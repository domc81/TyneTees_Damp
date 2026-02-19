'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, Database, Settings, Package, Calculator } from 'lucide-react'
import {
  loadPricingConfig,
  loadMaterialLookup,
  loadSectionTemplates,
  calculateSurveyCosting,
  type SectionWithTemplates,
  type CalculationResult
} from '@/lib/pricing-data'
import type { LineInput, PricingConfig, MaterialLookup } from '@/lib/pricing-engine'

export default function PricingTestPage() {
  const [selectedType, setSelectedType] = useState<string>('damp')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Data states
  const [sections, setSections] = useState<SectionWithTemplates[] | null>(null)
  const [config, setConfig] = useState<PricingConfig | null>(null)
  const [materials, setMaterials] = useState<MaterialLookup | null>(null)
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null)

  const surveyTypes = [
    { value: 'damp', label: 'Damp Survey' },
    { value: 'condensation', label: 'Condensation Survey' },
    { value: 'timber', label: 'Timber Survey' },
    { value: 'woodworm', label: 'Woodworm Survey' }
  ]

  // Handler: Load Sections
  const handleLoadSections = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await loadSectionTemplates(selectedType)
      setSections(result.sections)
    } catch (err) {
      setError(`Failed to load sections: ${err instanceof Error ? err.message : 'Unknown error'}`)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Handler: Load Config
  const handleLoadConfig = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await loadPricingConfig()
      setConfig(result)
    } catch (err) {
      setError(`Failed to load config: ${err instanceof Error ? err.message : 'Unknown error'}`)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Handler: Load Materials
  const handleLoadMaterials = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await loadMaterialLookup()
      setMaterials(result)
    } catch (err) {
      setError(`Failed to load materials: ${err instanceof Error ? err.message : 'Unknown error'}`)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Handler: Run Test Calculation
  const handleRunTestCalculation = async () => {
    if (!sections || sections.length === 0) {
      setError('Please load sections first')
      return
    }

    const firstSection = sections[0]
    if (!firstSection.templates || firstSection.templates.length === 0) {
      setError('No templates found in first section')
      return
    }

    const firstTemplate = firstSection.templates[0]

    setLoading(true)
    setError(null)
    try {
      const input: LineInput = {
        templateId: firstTemplate.id,
        inputQuantity: 10,
        inputDimension: 2 // For DPC injection tests
      }

      const result = await calculateSurveyCosting(selectedType, [input])
      setCalculationResult(result)
    } catch (err) {
      setError(`Calculation failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-surface-200 px-8 py-4">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-2 rounded-lg hover:bg-surface-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-surface-600" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-surface-900 flex items-center gap-3">
              <Calculator className="w-6 h-6 text-brand-600" />
              Pricing Engine Test
            </h1>
            <p className="text-sm text-surface-500">
              Debug page to verify pricing engine works end-to-end against live database
            </p>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-4xl mx-auto">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Survey Type Selection */}
        <div className="section-card p-6 mb-6">
          <label className="input-label">Select Survey Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="input-field max-w-xs"
            disabled={loading}
          >
            {surveyTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleLoadSections}
            disabled={loading}
            className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Database className="w-4 h-4" />
            {loading ? 'Loading...' : 'Load Sections'}
          </button>

          <button
            onClick={handleLoadConfig}
            disabled={loading}
            className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Settings className="w-4 h-4" />
            {loading ? 'Loading...' : 'Load Config'}
          </button>

          <button
            onClick={handleLoadMaterials}
            disabled={loading}
            className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Package className="w-4 h-4" />
            {loading ? 'Loading...' : 'Load Materials'}
          </button>

          <button
            onClick={handleRunTestCalculation}
            disabled={loading || !sections}
            className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            {loading ? 'Calculating...' : 'Run Test Calculation'}
          </button>
        </div>

        {/* Sections Display */}
        {sections && (
          <div className="section-card p-6 mb-6">
            <h2 className="text-lg font-semibold text-surface-900 mb-4">
              Loaded Sections ({sections.length})
            </h2>
            <div className="space-y-4">
              {sections.map((section) => (
                <div key={section.id} className="border-l-4 border-brand-500 pl-4">
                  <h3 className="font-semibold text-surface-900">{section.section_name}</h3>
                  <p className="text-sm text-surface-500 mb-2">
                    Section Key: {section.section_key} • {section.templates.length} templates
                  </p>
                  <div className="space-y-1">
                    {section.templates.map((template: any) => (
                      <div key={template.id} className="text-sm text-surface-700 flex gap-4">
                        <span className="flex-1">{template.description || 'No description'}</span>
                        <span className="text-brand-600 font-mono">{template.cost_formula}</span>
                        <span className="text-surface-500">{template.uom || 'N/A'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Config Display */}
        {config && (
          <div className="section-card p-6 mb-6">
            <h2 className="text-lg font-semibold text-surface-900 mb-4">
              Loaded Config ({Object.keys(config).length} entries)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-surface-50 border-b border-surface-200">
                  <tr>
                    <th className="text-left px-4 py-2 font-semibold text-surface-700">Config Key</th>
                    <th className="text-right px-4 py-2 font-semibold text-surface-700">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {Object.entries(config).map(([key, value]) => (
                    <tr key={key} className="hover:bg-surface-50">
                      <td className="px-4 py-2 text-surface-900 font-mono">{key}</td>
                      <td className="px-4 py-2 text-right text-brand-600 font-semibold">
                        {value.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Materials Display */}
        {materials && (
          <div className="section-card p-6 mb-6">
            <h2 className="text-lg font-semibold text-surface-900 mb-4">
              Loaded Materials ({Object.keys(materials).length} items)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-surface-50 border-b border-surface-200">
                  <tr>
                    <th className="text-left px-4 py-2 font-semibold text-surface-700">Product Key</th>
                    <th className="text-right px-4 py-2 font-semibold text-surface-700">Unit Cost (£)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {Object.entries(materials).map(([key, cost]) => (
                    <tr key={key} className="hover:bg-surface-50">
                      <td className="px-4 py-2 text-surface-900 font-mono">{key}</td>
                      <td className="px-4 py-2 text-right text-brand-600 font-semibold">
                        £{cost.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Calculation Result Display */}
        {calculationResult && (
          <div className="section-card p-6">
            <h2 className="text-lg font-semibold text-surface-900 mb-4">
              Calculation Result
            </h2>
            <div className="bg-surface-900 text-green-400 p-4 rounded-lg overflow-x-auto">
              <pre className="text-xs font-mono whitespace-pre-wrap">
                {JSON.stringify(calculationResult, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!sections && !config && !materials && !calculationResult && (
          <div className="section-card p-8 text-center">
            <Calculator className="w-12 h-12 text-surface-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-surface-900 mb-2">
              Ready to Test
            </h3>
            <p className="text-surface-600 mb-4">
              Click the buttons above to load data and test the pricing engine.
            </p>
            <div className="text-left max-w-md mx-auto space-y-2 text-sm text-surface-600">
              <p>1. Select a survey type (damp, condensation, timber, woodworm)</p>
              <p>2. Click "Load Sections" to fetch sections and templates</p>
              <p>3. Click "Load Config" to fetch pricing configuration</p>
              <p>4. Click "Load Materials" to fetch materials catalog</p>
              <p>5. Click "Run Test Calculation" to calculate costs for the first template</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
