'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Clock,
  Save,
  RefreshCw,
  AlertCircle,
  PoundSterling,
  Percent,
  Truck,
  Users,
  ArrowLeft,
} from 'lucide-react'
import { getBaseRates, getMarkupConfig } from '@/lib/supabase-data'
import type { BaseRate, MarkupConfig } from '@/types/database.types'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'

export default function RatesAdminPage() {
  const [laborRate, setLaborRate] = useState(0)
  const [laborMarkup, setLaborMarkup] = useState(0)
  const [contractorRate, setContractorRate] = useState(0)
  const [travelRate, setTravelRate] = useState(0)
  const [vehicleCost, setVehicleCost] = useState(0)
  const [materialMarkup, setMaterialMarkup] = useState(0)
  const [overheadMarkup, setOverheadMarkup] = useState(0)
  const [initialRates, setInitialRates] = useState<BaseRate[]>([])
  const [initialMarkups, setInitialMarkups] = useState<MarkupConfig[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [ratesData, markupData] = await Promise.all([
          getBaseRates(),
          getMarkupConfig()
        ])

        const labor = ratesData.find(r => r.category === 'labor')
        const contractor = ratesData.find(r => r.category === 'contractor')
        const travel = ratesData.find(r => r.category === 'travel')

        setLaborRate(labor?.rate_value || 0)
        setContractorRate(contractor?.rate_value || 0)
        setTravelRate(travel?.rate_value || 0)

        const material = markupData.find(m => m.item_type === 'MTL')
        const overhead = markupData.find(m => m.item_type === 'OVR')

        setMaterialMarkup(material?.percentage || 0)
        setOverheadMarkup(overhead?.percentage || 0)

        setInitialRates(ratesData)
        setInitialMarkups(markupData)
      } catch (err) {
        console.error('Failed to load rates:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log('Saving rates:', {
      labor: { base_hourly_rate: laborRate, markup_percentage: laborMarkup },
      contractor: { hourly_rate: contractorRate },
      travel: { hourly_rate: travelRate, vehicle_cost_per_mile: vehicleCost },
      markups: { materials: materialMarkup, overheads: overheadMarkup },
    })
    alert('Rates saved (demo mode - data not persisted)')
    setSaving(false)
    setHasChanges(false)
  }

  const handleReset = () => {
    const labor = initialRates.find(r => r.category === 'labor')
    const contractor = initialRates.find(r => r.category === 'contractor')
    const travel = initialRates.find(r => r.category === 'travel')
    const material = initialMarkups.find(m => m.item_type === 'MTL')
    const overhead = initialMarkups.find(m => m.item_type === 'OVR')

    setLaborRate(labor?.rate_value || 0)
    setContractorRate(contractor?.rate_value || 0)
    setTravelRate(travel?.rate_value || 0)
    setMaterialMarkup(material?.percentage || 0)
    setOverheadMarkup(overhead?.percentage || 0)
    setHasChanges(false)
  }

  const updateValue = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
    setter(value)
    setHasChanges(true)
  }

  const effectiveLaborRate = laborRate * (1 + laborMarkup / 100)
  const effectiveMaterialMarkup = 1 + materialMarkup / 100

  if (loading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="spinner mx-auto mb-4" />
              <p className="text-white/60">Loading rates...</p>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6 max-w-4xl">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </Link>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Clock className="w-6 h-6 text-purple-400" />
                Base Rates &amp; Markups
              </h2>
              <p className="text-sm text-white/60 mt-1">Configure core pricing parameters</p>
            </div>
            <div className="flex items-center gap-3">
              {hasChanges && (
                <button
                  onClick={handleReset}
                  className="btn-secondary flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={!hasChanges || saving}
                className="btn-primary flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Warning */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-300">Important</h3>
              <p className="text-sm text-amber-400/80 mt-1">
                Changing these rates will affect all new price calculations across the system.
                Existing quotes will not be updated.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Labor Rates */}
            <div className="section-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Users className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Labor Rates</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Base Hourly Rate (&pound;)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={laborRate}
                    onChange={(e) => updateValue(setLaborRate, parseFloat(e.target.value) || 0)}
                    className="input-field"
                  />
                  <p className="text-xs text-white/40 mt-1">Cost to company per hour</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Labor Markup (%)</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={laborMarkup}
                    onChange={(e) => updateValue(setLaborMarkup, parseInt(e.target.value) || 0)}
                    className="input-field"
                  />
                  <p className="text-xs text-white/40 mt-1">Applied to all labor costs</p>
                </div>

                <div className="p-3 bg-white/5 rounded-xl">
                  <p className="text-sm text-white/70">
                    <strong className="text-white/90">Effective Rate:</strong>
                    <span className="ml-2 text-lg font-bold text-brand-400">
                      &pound;{effectiveLaborRate.toFixed(2)}/hr
                    </span>
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    &pound;{laborRate.toFixed(2)} &times; {(1 + laborMarkup / 100).toFixed(2)} = &pound;{effectiveLaborRate.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Contractor Rates */}
            <div className="section-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Contractor Rates</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Subcontractor Hourly Rate (&pound;)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={contractorRate}
                    onChange={(e) => updateValue(setContractorRate, parseFloat(e.target.value) || 0)}
                    className="input-field"
                  />
                  <p className="text-xs text-white/40 mt-1">Paid to external contractors</p>
                </div>

                <div className="p-3 bg-white/5 rounded-xl">
                  <p className="text-sm text-white/60">
                    Subcontractor markup is set to <strong className="text-white/80">0%</strong> by default
                    (pass-through cost)
                  </p>
                </div>
              </div>
            </div>

            {/* Travel Costs */}
            <div className="section-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Truck className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Travel Costs</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Travel Time Rate (&pound;/hr)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={travelRate}
                    onChange={(e) => updateValue(setTravelRate, parseFloat(e.target.value) || 0)}
                    className="input-field"
                  />
                  <p className="text-xs text-white/40 mt-1">Billed for travel time</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Vehicle Cost (&pound;/mile)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={vehicleCost}
                    onChange={(e) => updateValue(setVehicleCost, parseFloat(e.target.value) || 0)}
                    className="input-field"
                  />
                  <p className="text-xs text-white/40 mt-1">Fuel and vehicle costs per mile</p>
                </div>
              </div>
            </div>

            {/* Markup Percentages */}
            <div className="section-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Percent className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Markup Percentages</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Materials Markup (%)</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={materialMarkup}
                    onChange={(e) => updateValue(setMaterialMarkup, parseInt(e.target.value) || 0)}
                    className="input-field"
                  />
                  <p className="text-xs text-white/40 mt-1">Applied to supplier material costs</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Overheads Markup (%)</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={overheadMarkup}
                    onChange={(e) => updateValue(setOverheadMarkup, parseInt(e.target.value) || 0)}
                    className="input-field"
                  />
                  <p className="text-xs text-white/40 mt-1">Applied to project overheads (skips, etc.)</p>
                </div>

                <div className="p-3 bg-white/5 rounded-xl">
                  <p className="text-sm text-white/70">
                    Material at &pound;10.00 &rarr;
                    <span className="ml-2 font-bold text-brand-400">
                      &pound;{(10 * effectiveMaterialMarkup).toFixed(2)}
                    </span>
                    <span className="text-white/40 ml-1">(+{materialMarkup}%)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="section-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <PoundSterling className="w-5 h-5 text-white/50" />
              Pricing Summary
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-amber-500/10 rounded-xl text-center">
                <p className="text-2xl font-bold text-amber-300">&pound;{effectiveLaborRate.toFixed(2)}</p>
                <p className="text-sm text-amber-400/80">Effective Labor Rate</p>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-xl text-center">
                <p className="text-2xl font-bold text-purple-300">&pound;{contractorRate.toFixed(2)}</p>
                <p className="text-sm text-purple-400/80">Contractor Rate</p>
              </div>
              <div className="p-4 bg-blue-500/10 rounded-xl text-center">
                <p className="text-2xl font-bold text-blue-300">{materialMarkup}%</p>
                <p className="text-sm text-blue-400/80">Material Markup</p>
              </div>
              <div className="p-4 bg-green-500/10 rounded-xl text-center">
                <p className="text-2xl font-bold text-green-300">&pound;{vehicleCost.toFixed(2)}/mi</p>
                <p className="text-sm text-green-400/80">Vehicle Cost</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
