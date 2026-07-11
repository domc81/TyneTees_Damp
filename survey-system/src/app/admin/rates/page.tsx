'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Clock,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Percent,
  Truck,
  Users,
  ArrowLeft,
  Hammer,
  Receipt,
  CreditCard,
} from 'lucide-react'
import { loadPricingConfig, updatePricingConfigBatch } from '@/lib/pricing-data'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import { useAuth } from '@/context/AuthContext'
import { NumberField } from '@/components/admin/NumberField'
import { PricingSaveConfirm, type DiffRow } from '@/components/admin/PricingSaveConfirm'
import { PricingSmokeCheck } from '@/components/admin/PricingSmokeCheck'
import { PricingChangeLog } from '@/components/admin/PricingChangeLog'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type ConfigMap = Record<string, number>

/**
 * Display metadata per config key — labels for the save-confirm diff and how
 * to render the stored value (stored space is what pricing_config holds:
 * decimals for %, factors for wastage/uplift).
 */
const KEY_META: Record<string, { label: string; format: (stored: number) => string }> = {
  hourly_labour_rate: { label: 'Base Hourly Rate', format: v => `£${v.toFixed(2)}/hr` },
  default_labour_markup: { label: 'Labour Markup', format: v => `${Math.round(v * 100)}%` },
  contractor_hourly_rate: { label: 'Contractor Hourly Rate (reserved)', format: v => `£${v.toFixed(2)}/hr` },
  vehicle_cost_per_mile: { label: 'Vehicle Cost', format: v => `£${v.toFixed(2)}/mile` },
  productive_hours_per_day: { label: 'Productive Hours per Day', format: v => `${v}h` },
  travel_speed_mph: { label: 'Travel Speed', format: v => `${v} mph` },
  contractor_mileage_rate: { label: 'Contractor Mileage (reserved)', format: v => `£${v.toFixed(2)}/mile` },
  contractor_material_uplift: { label: 'Contractor Material Uplift (reserved)', format: v => `${Math.round((v - 1) * 100)}%` },
  default_material_markup: { label: 'Material Markup', format: v => `${Math.round(v * 100)}%` },
  default_wastage_factor: { label: 'Wastage Factor', format: v => `${Math.round((v - 1) * 100)}%` },
  vat_rate: { label: 'VAT Rate', format: v => `${Math.round(v * 100)}%` },
  skip_hire_8yd_cost: { label: 'Skip Hire — 8yd', format: v => `£${v.toFixed(2)}` },
  damp_deposit_pct: { label: 'Damp Deposit', format: v => `${Math.round(v * 100)}%` },
  condensation_deposit_pct: { label: 'Condensation Deposit', format: v => `${Math.round(v * 100)}%` },
  timber_deposit_pct: { label: 'Timber Deposit', format: v => `${Math.round(v * 100)}%` },
  woodworm_deposit_pct: { label: 'Woodworm Deposit', format: v => `${Math.round(v * 100)}%` },
  survey_fee_amount: { label: 'Survey Fee', format: v => `£${v.toFixed(2)}` },
  survey_fee_expiry_days: { label: 'Payment Expiry', format: v => `${v} day${v === 1 ? '' : 's'}` },
}

/** Stored decimal (0.30) → display percent (30) */
const toPercent = (decimal: number) => Math.round(decimal * 100)

/** Display percent (30) → stored decimal (0.30) */
const toDecimal = (percent: number) => percent / 100

/** Stored wastage factor (1.10) → display percent (10) */
const wastageToPercent = (factor: number) => Math.round((factor - 1) * 100)

/** Display percent (10) → stored wastage factor (1.10) */
const wastageToFactor = (percent: number) => 1 + percent / 100

const fmt = (v: number) => `£${v.toFixed(2)}`

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function RatesAdminPage() {
  const { isAdmin } = useAuth()
  const [config, setConfig] = useState<ConfigMap>({})
  const [initialConfig, setInitialConfig] = useState<ConfigMap>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [smokeToken, setSmokeToken] = useState(0)

  // Load all pricing config on mount
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const data = await loadPricingConfig()
      setConfig(data)
      setInitialConfig(data)
      setLoading(false)
    }
    load()
  }, [])

  // Auto-dismiss success messages after 4s
  useEffect(() => {
    if (message?.type === 'success') {
      const t = setTimeout(() => setMessage(null), 4000)
      return () => clearTimeout(t)
    }
  }, [message])

  const get = (key: string) => config[key] ?? 0

  const set = (key: string, value: number) => {
    setConfig(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
    setMessage(null)
  }

  const changedKeys = Object.keys(config).filter(key => config[key] !== initialConfig[key])

  // Old→new diff rows for the confirmation modal; big moves flagged
  const diffRows: DiffRow[] = changedKeys.map(key => {
    const meta = KEY_META[key]
    const oldStored = initialConfig[key] ?? 0
    const newStored = config[key]
    const deltaPct = oldStored !== 0 ? ((newStored - oldStored) / Math.abs(oldStored)) * 100 : null
    const warn = deltaPct !== null && Math.abs(deltaPct) > 50
    return {
      label: meta?.label ?? key,
      oldValue: meta ? meta.format(oldStored) : String(oldStored),
      newValue: meta ? meta.format(newStored) : String(newStored),
      deltaPct,
      warn,
      note: warn ? 'Large move — double-check this is intended.' : undefined,
    }
  })

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    const updates = changedKeys.map(config_key => ({
      config_key,
      config_value: config[config_key],
    }))

    if (updates.length === 0) {
      setSaving(false)
      setConfirmOpen(false)
      return
    }

    const success = await updatePricingConfigBatch(updates)

    if (success) {
      setInitialConfig({ ...config })
      setHasChanges(false)
      setMessage({
        type: 'success',
        text: `${updates.length} setting${updates.length > 1 ? 's' : ''} saved successfully`,
      })
      setSmokeToken(t => t + 1)
    } else {
      setMessage({ type: 'error', text: 'Failed to save changes. Please try again.' })
    }

    setSaving(false)
    setConfirmOpen(false)
  }

  const handleReset = () => {
    setConfig({ ...initialConfig })
    setHasChanges(false)
    setMessage(null)
  }

  // Derived values
  const effectiveLabourRate =
    get('hourly_labour_rate') * (1 + get('default_labour_markup'))

  if (loading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="spinner mx-auto mb-4" />
              <p className="text-white/60">Loading pricing config...</p>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  if (!isAdmin) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Admin Access Required</h2>
              <p className="text-white/60 mb-4">Only administrators can modify pricing configuration.</p>
              <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
                Back to Dashboard
              </Link>
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
                Pricing Configuration
              </h2>
              <p className="text-sm text-white/60 mt-1">
                All values feed directly into the pricing engine
              </p>
            </div>
            <div className="flex items-center gap-3">
              {hasChanges && (
                <button onClick={handleReset} className="btn-secondary flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              )}
              <button
                onClick={() => setConfirmOpen(true)}
                disabled={!hasChanges || saving}
                className="btn-primary flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          <PricingSaveConfirm
            open={confirmOpen}
            title="Confirm pricing configuration changes"
            rows={diffRows}
            busy={saving}
            onConfirm={handleSave}
            onCancel={() => setConfirmOpen(false)}
          />

          {/* Warning */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-300">Important</h3>
              <p className="text-sm text-amber-400/80 mt-1">
                Changing these values will affect all new price calculations.
                Existing quotes are not updated.
              </p>
            </div>
          </div>

          {/* Save feedback */}
          {message && (
            <div
              className={`p-4 rounded-xl flex items-start gap-3 ${
                message.type === 'success'
                  ? 'bg-green-500/10 border border-green-500/20'
                  : 'bg-red-500/10 border border-red-500/20'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
              )}
              <p
                className={`text-sm ${
                  message.type === 'success' ? 'text-green-300' : 'text-red-300'
                }`}
              >
                {message.text}
              </p>
            </div>
          )}

          {/* ── Cards ────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Labour Rates */}
            <div className="section-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Users className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Labour Rates</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Base Hourly Rate (&pound;)
                  </label>
                  <NumberField
                    step="0.01"
                    min={5}
                    max={200}
                    value={get('hourly_labour_rate')}
                    onCommit={v => set('hourly_labour_rate', v)}
                    aria-label="Base hourly rate"
                  />
                  <p className="text-xs text-white/40 mt-1">Cost to company per hour (£5–£200)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Labour Markup (%)
                  </label>
                  <NumberField
                    step="1"
                    min={0}
                    max={500}
                    integer
                    value={toPercent(get('default_labour_markup'))}
                    onCommit={v => set('default_labour_markup', toDecimal(v))}
                    aria-label="Labour markup percent"
                  />
                  <p className="text-xs text-white/40 mt-1">Applied to all labour costs (0–500%)</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl">
                  <p className="text-sm text-white/70">
                    <strong className="text-white/90">Effective Rate:</strong>
                    <span className="ml-2 text-lg font-bold text-brand-400">
                      {fmt(effectiveLabourRate)}/hr
                    </span>
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    {fmt(get('hourly_labour_rate'))} &times;{' '}
                    {(1 + get('default_labour_markup')).toFixed(2)} ={' '}
                    {fmt(effectiveLabourRate)}
                  </p>
                </div>
              </div>
            </div>

            {/* Contractor & Travel */}
            <div className="section-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Truck className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Contractor &amp; Travel</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Contractor Hourly Rate (&pound;)
                  </label>
                  <NumberField
                    step="0.01"
                    min={0}
                    max={200}
                    value={get('contractor_hourly_rate')}
                    onCommit={v => set('contractor_hourly_rate', v)}
                    aria-label="Contractor hourly rate"
                  />
                  <p className="text-xs text-white/40 mt-1">Rate paid to subcontractors (workbook E155) — feeds the operative outputs, not customer prices</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Vehicle Cost (&pound;/mile)
                  </label>
                  <NumberField
                    step="0.01"
                    min={0}
                    max={5}
                    value={get('vehicle_cost_per_mile')}
                    onCommit={v => set('vehicle_cost_per_mile', v)}
                    aria-label="Vehicle cost per mile"
                  />
                  <p className="text-xs text-white/40 mt-1">
                    Used in Project Specific Overheads calculation
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Productive Hours per Day
                  </label>
                  <NumberField
                    step="0.5"
                    min={1}
                    max={24}
                    value={get('productive_hours_per_day')}
                    onCommit={v => set('productive_hours_per_day', v)}
                    aria-label="Productive hours per day"
                  />
                  <p className="text-xs text-white/40 mt-1">
                    Working hours per man per day — drives days-on-site (workbook 6.5)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Travel Speed (mph)
                  </label>
                  <NumberField
                    step="1"
                    min={5}
                    max={120}
                    value={get('travel_speed_mph')}
                    onCommit={v => set('travel_speed_mph', v)}
                    aria-label="Travel speed mph"
                  />
                  <p className="text-xs text-white/40 mt-1">
                    Average driving speed converting miles to travel hours (workbook 30)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Contractor Mileage (&pound;/mile)
                  </label>
                  <NumberField
                    step="0.01"
                    min={0}
                    max={5}
                    value={get('contractor_mileage_rate')}
                    onCommit={v => set('contractor_mileage_rate', v)}
                    aria-label="Contractor mileage rate"
                  />
                  <p className="text-xs text-white/40 mt-1">
                    RESERVED — subcontractor mileage (workbook &times;0.45); feeds the operative outputs feature, not customer prices
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Contractor Material Uplift (%)
                  </label>
                  <NumberField
                    step="1"
                    min={0}
                    max={100}
                    integer
                    value={wastageToPercent(get('contractor_material_uplift') || 1)}
                    onCommit={v => set('contractor_material_uplift', wastageToFactor(v))}
                    aria-label="Contractor material uplift percent"
                  />
                  <p className="text-xs text-white/40 mt-1">
                    RESERVED — subcontractor materials uplift (workbook &times;1.1); feeds the operative outputs feature, not customer prices
                  </p>
                </div>
              </div>
            </div>

            {/* Markups & Wastage */}
            <div className="section-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Percent className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Markups &amp; Wastage</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Material Markup (%)
                  </label>
                  <NumberField
                    step="1"
                    min={0}
                    max={500}
                    integer
                    value={toPercent(get('default_material_markup'))}
                    onCommit={v => set('default_material_markup', toDecimal(v))}
                    aria-label="Material markup percent"
                  />
                  <p className="text-xs text-white/40 mt-1">Applied to supplier material costs</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Wastage Factor (%)
                  </label>
                  <NumberField
                    step="1"
                    min={0}
                    max={100}
                    integer
                    value={wastageToPercent(get('default_wastage_factor'))}
                    onCommit={v => set('default_wastage_factor', wastageToFactor(v))}
                    aria-label="Wastage factor percent"
                  />
                  <p className="text-xs text-white/40 mt-1">
                    Extra material ordered to cover waste (e.g. 10%)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    VAT Rate (%)
                  </label>
                  <NumberField
                    step="1"
                    min={0}
                    max={100}
                    integer
                    value={toPercent(get('vat_rate'))}
                    onCommit={v => set('vat_rate', toDecimal(v))}
                    aria-label="VAT rate percent"
                  />
                  <p className="text-xs text-white/40 mt-1">Standard VAT rate</p>
                </div>
              </div>
            </div>

            {/* Fixed Costs */}
            <div className="section-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Hammer className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Fixed Costs</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    Skip Hire — 8yd (&pound;)
                  </label>
                  <NumberField
                    step="1"
                    min={0}
                    max={2000}
                    value={get('skip_hire_8yd_cost')}
                    onCommit={v => set('skip_hire_8yd_cost', v)}
                    aria-label="Skip hire cost"
                  />
                  <p className="text-xs text-white/40 mt-1">Base cost per skip</p>
                </div>
                {/* Asbestos + digital-DPC prices live in their costing
                    templates (workbook values) — the old config inputs here
                    were dead controls and were removed (ADMIN_AUDIT.md). */}
              </div>
            </div>
          </div>

          {/* Deposit Percentages */}
          <div className="section-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-teal-500/10">
                <Receipt className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Deposit Percentages</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { key: 'damp_deposit_pct', label: 'Damp' },
                { key: 'condensation_deposit_pct', label: 'Condensation' },
                { key: 'timber_deposit_pct', label: 'Timber' },
                { key: 'woodworm_deposit_pct', label: 'Woodworm' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">
                    {label} (%)
                  </label>
                  <NumberField
                    step="1"
                    min={0}
                    max={100}
                    integer
                    value={toPercent(get(key))}
                    onCommit={v => set(key, toDecimal(v))}
                    aria-label={`${label} deposit percent`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Survey Fees */}
          <div className="section-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <CreditCard className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Survey Fees</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">
                  Survey Fee Amount (&pound;)
                </label>
                <NumberField
                  step="1"
                  min={0}
                  max={1000}
                  value={get('survey_fee_amount')}
                  onCommit={v => set('survey_fee_amount', v)}
                  aria-label="Survey fee amount"
                />
                <p className="text-xs text-white/40 mt-1">
                  Fee charged to customer before survey booking is confirmed
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">
                  Payment Expiry (days)
                </label>
                <NumberField
                  step="1"
                  min={1}
                  max={30}
                  integer
                  value={get('survey_fee_expiry_days')}
                  onCommit={v => set('survey_fee_expiry_days', v)}
                  aria-label="Payment expiry days"
                />
                <p className="text-xs text-white/40 mt-1">
                  Provisional booking released if unpaid after this many days
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="section-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-white/50" />
              Pricing Summary
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-amber-500/10 rounded-xl text-center">
                <p className="text-2xl font-bold text-amber-300">{fmt(effectiveLabourRate)}</p>
                <p className="text-sm text-amber-400/80">Effective Labour Rate</p>
              </div>
              <div className="p-4 bg-green-500/10 rounded-xl text-center">
                <p className="text-2xl font-bold text-green-300">
                  {fmt(get('contractor_hourly_rate'))}
                </p>
                <p className="text-sm text-green-400/80">Contractor Rate</p>
              </div>
              <div className="p-4 bg-blue-500/10 rounded-xl text-center">
                <p className="text-2xl font-bold text-blue-300">
                  {toPercent(get('default_material_markup'))}%
                </p>
                <p className="text-sm text-blue-400/80">Material Markup</p>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-xl text-center">
                <p className="text-2xl font-bold text-purple-300">
                  {fmt(get('vehicle_cost_per_mile'))}/mi
                </p>
                <p className="text-sm text-purple-400/80">Vehicle Cost</p>
              </div>
            </div>
          </div>

          {/* Post-save smoke check + audit trail */}
          <PricingSmokeCheck runToken={smokeToken} />
          <PricingChangeLog tables={['pricing_config']} />
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
