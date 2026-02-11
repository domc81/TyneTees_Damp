'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Clock,
  Save,
  RefreshCw,
  AlertCircle,
  PoundSterling,
  Percent,
  Truck,
  Users,
} from 'lucide-react'
import { BASE_RATES, MARKUP_CONFIG } from '@/lib/pricing-database'

export default function RatesAdminPage() {
  const [laborRate, setLaborRate] = useState(BASE_RATES.labor.base_hourly_rate)
  const [laborMarkup, setLaborMarkup] = useState(BASE_RATES.labor.markup_percentage)
  const [contractorRate, setContractorRate] = useState(BASE_RATES.contractor.hourly_rate)
  const [travelRate, setTravelRate] = useState(BASE_RATES.travel.hourly_rate)
  const [vehicleCost, setVehicleCost] = useState(BASE_RATES.travel.vehicle_cost_per_mile)

  const [materialMarkup, setMaterialMarkup] = useState(MARKUP_CONFIG.MTL.percentage)
  const [overheadMarkup, setOverheadMarkup] = useState(MARKUP_CONFIG.OVR.percentage)

  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // In production, this would save to Supabase
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
    setLaborRate(BASE_RATES.labor.base_hourly_rate)
    setLaborMarkup(BASE_RATES.labor.markup_percentage)
    setContractorRate(BASE_RATES.contractor.hourly_rate)
    setTravelRate(BASE_RATES.travel.hourly_rate)
    setVehicleCost(BASE_RATES.travel.vehicle_cost_per_mile)
    setMaterialMarkup(MARKUP_CONFIG.MTL.percentage)
    setOverheadMarkup(MARKUP_CONFIG.OVR.percentage)
    setHasChanges(false)
  }

  const updateValue = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
    setter(value)
    setHasChanges(true)
  }

  // Calculate effective rates
  const effectiveLaborRate = laborRate * (1 + laborMarkup / 100)
  const effectiveMaterialMarkup = 1 + materialMarkup / 100

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
              <Clock className="w-6 h-6 text-purple-600" />
              Base Rates & Markups
            </h1>
            <p className="text-sm text-surface-500">Configure core pricing parameters</p>
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
      </header>

      <div className="p-8 max-w-4xl mx-auto">
        {/* Warning */}
        <div className="mb-8 p-4 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800">Important</h3>
            <p className="text-sm text-amber-700 mt-1">
              Changing these rates will affect all new price calculations across the system.
              Existing quotes will not be updated.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Labor Rates */}
          <div className="section-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-amber-50">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-lg font-semibold text-surface-900">Labor Rates</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="input-label">Base Hourly Rate (£)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={laborRate}
                  onChange={(e) => updateValue(setLaborRate, parseFloat(e.target.value) || 0)}
                  className="input-field"
                />
                <p className="text-xs text-surface-400 mt-1">Cost to company per hour</p>
              </div>

              <div>
                <label className="input-label">Labor Markup (%)</label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={laborMarkup}
                  onChange={(e) => updateValue(setLaborMarkup, parseInt(e.target.value) || 0)}
                  className="input-field"
                />
                <p className="text-xs text-surface-400 mt-1">Applied to all labor costs</p>
              </div>

              <div className="p-3 bg-surface-50 rounded-lg">
                <p className="text-sm text-surface-600">
                  <strong>Effective Rate:</strong>
                  <span className="ml-2 text-lg font-bold text-brand-600">
                    £{effectiveLaborRate.toFixed(2)}/hr
                  </span>
                </p>
                <p className="text-xs text-surface-400 mt-1">
                  £{laborRate.toFixed(2)} × {(1 + laborMarkup / 100).toFixed(2)} = £{effectiveLaborRate.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Contractor Rates */}
          <div className="section-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-50">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold text-surface-900">Contractor Rates</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="input-label">Subcontractor Hourly Rate (£)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={contractorRate}
                  onChange={(e) => updateValue(setContractorRate, parseFloat(e.target.value) || 0)}
                  className="input-field"
                />
                <p className="text-xs text-surface-400 mt-1">Paid to external contractors</p>
              </div>

              <div className="p-3 bg-surface-50 rounded-lg">
                <p className="text-sm text-surface-500">
                  Subcontractor markup is set to <strong>0%</strong> by default
                  (pass-through cost)
                </p>
              </div>
            </div>
          </div>

          {/* Travel Costs */}
          <div className="section-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-50">
                <Truck className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-surface-900">Travel Costs</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="input-label">Travel Time Rate (£/hr)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={travelRate}
                  onChange={(e) => updateValue(setTravelRate, parseFloat(e.target.value) || 0)}
                  className="input-field"
                />
                <p className="text-xs text-surface-400 mt-1">Billed for travel time</p>
              </div>

              <div>
                <label className="input-label">Vehicle Cost (£/mile)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={vehicleCost}
                  onChange={(e) => updateValue(setVehicleCost, parseFloat(e.target.value) || 0)}
                  className="input-field"
                />
                <p className="text-xs text-surface-400 mt-1">Fuel and vehicle costs per mile</p>
              </div>
            </div>
          </div>

          {/* Markup Percentages */}
          <div className="section-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-50">
                <Percent className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-surface-900">Markup Percentages</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="input-label">Materials Markup (%)</label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={materialMarkup}
                  onChange={(e) => updateValue(setMaterialMarkup, parseInt(e.target.value) || 0)}
                  className="input-field"
                />
                <p className="text-xs text-surface-400 mt-1">Applied to supplier material costs</p>
              </div>

              <div>
                <label className="input-label">Overheads Markup (%)</label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={overheadMarkup}
                  onChange={(e) => updateValue(setOverheadMarkup, parseInt(e.target.value) || 0)}
                  className="input-field"
                />
                <p className="text-xs text-surface-400 mt-1">Applied to project overheads (skips, etc.)</p>
              </div>

              <div className="p-3 bg-surface-50 rounded-lg">
                <p className="text-sm text-surface-600">
                  Material at £10.00 →
                  <span className="ml-2 font-bold text-brand-600">
                    £{(10 * effectiveMaterialMarkup).toFixed(2)}
                  </span>
                  <span className="text-surface-400 ml-1">(+{materialMarkup}%)</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="mt-6 section-card p-6">
          <h3 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
            <PoundSterling className="w-5 h-5 text-surface-500" />
            Pricing Summary
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-amber-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-amber-700">£{effectiveLaborRate.toFixed(2)}</p>
              <p className="text-sm text-amber-600">Effective Labor Rate</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-purple-700">£{contractorRate.toFixed(2)}</p>
              <p className="text-sm text-purple-600">Contractor Rate</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-700">{materialMarkup}%</p>
              <p className="text-sm text-blue-600">Material Markup</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-700">£{vehicleCost.toFixed(2)}/mi</p>
              <p className="text-sm text-green-600">Vehicle Cost</p>
            </div>
          </div>
        </div>

        {/* Data Source Note */}
        <div className="mt-6 p-4 rounded-lg bg-surface-100 border border-surface-200">
          <p className="text-sm text-surface-600">
            <strong>Data Source:</strong> Default rates from Excel workbook (Damp Costing v48 CF).
            Values here override the system defaults when connected to Supabase.
          </p>
        </div>
      </div>
    </div>
  )
}
