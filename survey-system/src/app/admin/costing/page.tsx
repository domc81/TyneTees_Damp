'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Search,
  ChevronDown,
  ChevronRight,
  Layers,
  Package,
  X,
} from 'lucide-react'
import {
  loadAllCostingTemplatesAdmin,
  updateCostingLineTemplateBatch,
  loadMaterialNamesMap,
  type AdminSection,
  type AdminTemplate,
} from '@/lib/pricing-data'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SURVEY_TYPE_TABS = [
  { key: 'damp', label: 'Damp' },
  { key: 'condensation', label: 'Condensation' },
  { key: 'timber', label: 'Timber' },
  { key: 'woodworm', label: 'Woodworm' },
  { key: 'site_preparation', label: 'Site Prep' },
]

const FORMULA_BADGES: Record<string, { label: string; color: string }> = {
  standard: { label: 'Standard', color: 'bg-slate-500/20 text-slate-300' },
  ceiling_coverage: { label: 'Coverage', color: 'bg-blue-500/20 text-blue-300' },
  dpc_injection: { label: 'DPC', color: 'bg-amber-500/20 text-amber-300' },
  compound_material: { label: 'Compound', color: 'bg-purple-500/20 text-purple-300' },
  fixed_price: { label: 'Fixed', color: 'bg-green-500/20 text-green-300' },
  tiered_disposal: { label: 'Tiered', color: 'bg-red-500/20 text-red-300' },
  bag_and_cart: { label: 'Bag&Cart', color: 'bg-orange-500/20 text-orange-300' },
  skip_hire: { label: 'Skip', color: 'bg-teal-500/20 text-teal-300' },
}

/** Editable formula_params keys per formula type with labels */
const EDITABLE_PARAMS: Record<string, Array<{ key: string; label: string; step: string }>> = {
  dpc_injection: [
    { key: 'base_cream_cost', label: 'DPC Cream Cost (\u00a3)', step: '0.01' },
    { key: 'cream_divisor', label: 'Cream Divisor', step: '0.01' },
    { key: 'holes_per_meter', label: 'Holes Per Meter', step: '1' },
    { key: 'drill_cost', label: 'Drill Plug Cost (\u00a3)', step: '0.01' },
    { key: 'labour_hours_per_depth', label: 'Labour Hrs / Depth', step: '0.01' },
  ],
  tiered_disposal: [
    { key: 'threshold', label: 'Bag Threshold', step: '1' },
    { key: 'min_charge', label: 'Min Charge (\u00a3)', step: '1' },
    { key: 'per_bag_over', label: 'Per Bag Over (\u00a3)', step: '0.01' },
  ],
  bag_and_cart: [
    { key: 'hours_per_bag', label: 'Hours Per Bag', step: '0.001' },
    { key: 'material_cost_per_bag', label: 'Cost Per Bag (\u00a3)', step: '0.01' },
  ],
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Stored wastage factor (1.10) -> display percent (10) */
const wastageToPercent = (f: number) => Math.round((f - 1) * 100)
/** Display percent (10) -> stored wastage factor (1.10) */
const wastageToFactor = (p: number) => 1 + p / 100
/** Stored decimal (0.30) -> display percent (30) */
const toPercent = (d: number) => Math.round(d * 100)
/** Display percent (30) -> stored decimal (0.30) */
const toDecimal = (p: number) => p / 100

type MaterialMap = Record<string, { name: string; unit_cost: number }>
type ChangeMap = Record<string, Record<string, any>>

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CostingAdminPage() {
  const { isAdmin } = useAuth()

  // Data
  const [allSections, setAllSections] = useState<AdminSection[]>([])
  const [initialTemplates, setInitialTemplates] = useState<Record<string, AdminTemplate>>({})
  const [templates, setTemplates] = useState<Record<string, AdminTemplate>>({})
  const [materialMap, setMaterialMap] = useState<MaterialMap>({})
  const [loading, setLoading] = useState(true)

  // UI state
  const [activeTab, setActiveTab] = useState('damp')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [filterFormula, setFilterFormula] = useState<string>('')
  const [saving, setSaving] = useState(false)

  // Changes tracking: template_id -> { field: newValue }
  const [changes, setChanges] = useState<ChangeMap>({})

  // Load data
  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const [sections, matMap] = await Promise.all([
        loadAllCostingTemplatesAdmin(),
        loadMaterialNamesMap(),
      ])
      setAllSections(sections)
      setMaterialMap(matMap)

      // Build template lookup
      const tMap: Record<string, AdminTemplate> = {}
      for (const s of sections) {
        for (const t of s.templates) {
          tMap[t.id] = t
        }
      }
      setTemplates(tMap)
      setInitialTemplates(JSON.parse(JSON.stringify(tMap)))

      // Expand first section of default tab
      const firstSection = sections.find(s => s.survey_type === 'damp')
      if (firstSection) {
        setExpandedSections(new Set([firstSection.id]))
      }
      setLoading(false)
    }
    load()
  }, [])

  // Sections for the active tab
  const tabSections = useMemo(
    () => allSections
      .filter(s => s.survey_type === activeTab)
      .sort((a, b) => a.display_order - b.display_order),
    [allSections, activeTab]
  )

  // Count changes
  const changeCount = useMemo(() => Object.keys(changes).length, [changes])

  // Filtered templates (search + formula filter)
  const matchesFilter = useCallback(
    (t: AdminTemplate) => {
      if (filterFormula && t.cost_formula !== filterFormula) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          t.description.toLowerCase().includes(q) ||
          t.line_key.toLowerCase().includes(q)
        )
      }
      return true
    },
    [searchQuery, filterFormula]
  )

  // ---------------------------------------------------------------------------
  // Field change handler
  // ---------------------------------------------------------------------------

  const updateField = useCallback(
    (templateId: string, field: string, value: any) => {
      // Update live state
      setTemplates(prev => ({
        ...prev,
        [templateId]: { ...prev[templateId], [field]: value },
      }))

      // Track change (compare to initial)
      setChanges(prev => {
        const initial = initialTemplates[templateId]
        if (!initial) return prev

        const existing = prev[templateId] || {}
        const next = { ...existing, [field]: value }

        // If value reverted to initial, remove the field from changes
        if (initial[field as keyof AdminTemplate] === value) {
          delete next[field]
        }

        // If no fields changed for this template, remove entirely
        if (Object.keys(next).length === 0) {
          const { [templateId]: _, ...rest } = prev
          return rest
        }
        return { ...prev, [templateId]: next }
      })
    },
    [initialTemplates]
  )

  const updateFormulaParam = useCallback(
    (templateId: string, paramKey: string, value: number) => {
      const current = templates[templateId]
      if (!current) return
      const newParams = { ...current.formula_params, [paramKey]: value }
      updateField(templateId, 'formula_params', newParams)
    },
    [templates, updateField]
  )

  // ---------------------------------------------------------------------------
  // Save / Reset
  // ---------------------------------------------------------------------------

  const handleSave = async () => {
    if (changeCount === 0) return
    setSaving(true)

    const updates = Object.entries(changes).map(([id, ch]) => ({ id, changes: ch }))
    const success = await updateCostingLineTemplateBatch(updates)

    if (success) {
      // Snapshot current state as new initial
      setInitialTemplates(JSON.parse(JSON.stringify(templates)))
      setChanges({})
      toast.success(`${updates.length} template${updates.length > 1 ? 's' : ''} saved`)
    } else {
      toast.error('Failed to save changes. Please try again.')
    }
    setSaving(false)
  }

  const handleReset = () => {
    setTemplates(JSON.parse(JSON.stringify(initialTemplates)))
    setChanges({})
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(sectionId)) next.delete(sectionId)
      else next.add(sectionId)
      return next
    })
  }

  const expandAll = () => {
    setExpandedSections(new Set(tabSections.map(s => s.id)))
  }
  const collapseAll = () => {
    setExpandedSections(new Set())
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (loading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="spinner mx-auto mb-4" />
              <p className="text-white/60">Loading costing templates...</p>
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
            <p className="text-white/60">Admin access required.</p>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-5 max-w-[90rem]">
          {/* Back */}
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </Link>

          {/* Header + Save */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Layers className="w-6 h-6 text-brand-400" />
                Costing Templates
              </h2>
              <p className="text-sm text-white/60 mt-1">
                Manage pricing inputs for all survey types
              </p>
            </div>
            <div className="flex items-center gap-3">
              {changeCount > 0 && (
                <button onClick={handleReset} className="btn-secondary flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={changeCount === 0 || saving}
                className="btn-primary flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving
                  ? 'Saving...'
                  : changeCount > 0
                    ? `Save ${changeCount} change${changeCount > 1 ? 's' : ''}`
                    : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Warning banner */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-400/80">
              Changes affect all <strong className="text-amber-300">future</strong> costings and
              quotations. Existing quotations are not affected.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {SURVEY_TYPE_TABS.map(tab => {
              const count = allSections
                .filter(s => s.survey_type === tab.key)
                .reduce((n, s) => n + s.templates.length, 0)
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                      : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 text-xs opacity-60">{count}</span>
                </button>
              )
            })}
          </div>

          {/* Search & filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="input-field pl-10 w-full"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <select
              value={filterFormula}
              onChange={e => setFilterFormula(e.target.value)}
              className="input-field w-auto min-w-[160px]"
            >
              <option value="">All formula types</option>
              {Object.entries(FORMULA_BADGES).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button onClick={expandAll} className="btn-secondary text-xs px-3">
                Expand All
              </button>
              <button onClick={collapseAll} className="btn-secondary text-xs px-3">
                Collapse All
              </button>
            </div>
          </div>

          {/* Sections */}
          {tabSections.map(section => {
            const sectionTemplates = section.templates
              .filter(t => matchesFilter(templates[t.id] || t))
            if (sectionTemplates.length === 0 && (searchQuery || filterFormula)) return null
            const isExpanded = expandedSections.has(section.id)
            const changedInSection = sectionTemplates.filter(t => changes[t.id]).length

            return (
              <div key={section.id} className="section-card overflow-hidden">
                {/* Section header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-white/50" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-white/50" />
                    )}
                    <h3 className="font-semibold text-white">{section.section_name}</h3>
                    <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded">
                      {sectionTemplates.length} template{sectionTemplates.length !== 1 ? 's' : ''}
                    </span>
                    {changedInSection > 0 && (
                      <span className="text-xs text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded">
                        {changedInSection} modified
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-white/30 font-mono">{section.section_key}</span>
                </button>

                {/* Template table */}
                {isExpanded && (
                  <div className="overflow-x-auto border-t border-white/10">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-white/50 text-xs uppercase tracking-wider">
                          <th className="px-4 py-2 min-w-[220px]">Description</th>
                          <th className="px-2 py-2 w-16">UOM</th>
                          <th className="px-2 py-2 w-20">Formula</th>
                          <th className="px-2 py-2 w-24">Unit Cost</th>
                          <th className="px-2 py-2 w-24">Labour hrs</th>
                          <th className="px-2 py-2 w-20">Wastage</th>
                          <th className="px-2 py-2 w-20">Mat %</th>
                          <th className="px-2 py-2 w-20">Lab %</th>
                          <th className="px-2 py-2 w-24">Coverage</th>
                          <th className="px-2 py-2 w-16 text-center">Active</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {sectionTemplates.map(st => {
                          const t = templates[st.id] || st
                          const isChanged = !!changes[t.id]
                          const badge = FORMULA_BADGES[t.cost_formula] || FORMULA_BADGES.standard
                          const editableParams = EDITABLE_PARAMS[t.cost_formula]
                          const productKey = t.formula_params?.product_key
                          const mat = productKey ? materialMap[productKey] : null
                          const isCoverage = t.cost_formula === 'ceiling_coverage'
                          const isCompound = t.cost_formula === 'compound_material'

                          return (
                            <TemplateRow
                              key={t.id}
                              t={t}
                              isChanged={isChanged}
                              badge={badge}
                              isCoverage={isCoverage}
                              isCompound={isCompound}
                              mat={mat}
                              editableParams={editableParams}
                              updateField={updateField}
                              updateFormulaParam={updateFormulaParam}
                            />
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )
          })}

          {/* Empty state for filtered results */}
          {tabSections.every(
            s => s.templates.filter(t => matchesFilter(templates[t.id] || t)).length === 0
          ) &&
            (searchQuery || filterFormula) && (
              <div className="section-card p-8 text-center">
                <Search className="w-8 h-8 text-white/20 mx-auto mb-3" />
                <p className="text-white/50">No templates match your search.</p>
              </div>
            )}
        </div>
      </Layout>
    </ProtectedRoute>
  )
}

// ---------------------------------------------------------------------------
// Template Row Sub-component
// ---------------------------------------------------------------------------

interface TemplateRowProps {
  t: AdminTemplate
  isChanged: boolean
  badge: { label: string; color: string }
  isCoverage: boolean
  isCompound: boolean
  mat: { name: string; unit_cost: number } | null
  editableParams: Array<{ key: string; label: string; step: string }> | undefined
  updateField: (id: string, field: string, value: any) => void
  updateFormulaParam: (id: string, paramKey: string, value: number) => void
}

function TemplateRow({
  t,
  isChanged,
  badge,
  isCoverage,
  isCompound,
  mat,
  editableParams,
  updateField,
  updateFormulaParam,
}: TemplateRowProps) {
  // For coverage templates with a linked material, calculate the dynamic CPCU
  const dynamicCPCU =
    isCoverage && mat && t.coverage_rate
      ? mat.unit_cost / t.coverage_rate
      : null
  const hardcodedCPCU = t.formula_params?.cost_per_coverage_unit as number | undefined
  const cpcuMismatch =
    dynamicCPCU != null &&
    hardcodedCPCU != null &&
    Math.abs(dynamicCPCU - hardcodedCPCU) > 0.01

  return (
    <>
      <tr className={`${isChanged ? 'bg-amber-500/5' : 'hover:bg-white/[0.02]'} transition-colors`}>
        {/* Description */}
        <td className="px-4 py-2">
          <div className="text-white/90 truncate max-w-[300px]" title={t.description}>
            {t.description}
          </div>
        </td>

        {/* UOM */}
        <td className="px-2 py-2 text-white/50 text-xs">{t.uom}</td>

        {/* Formula badge */}
        <td className="px-2 py-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${badge.color}`}>{badge.label}</span>
        </td>

        {/* Base Unit Cost */}
        <td className="px-2 py-2">
          <input
            type="number"
            step="0.01"
            min="0"
            value={t.base_unit_cost}
            onChange={e => updateField(t.id, 'base_unit_cost', parseFloat(e.target.value) || 0)}
            className="input-field w-20 text-xs py-1 px-2"
          />
        </td>

        {/* Labour rate per unit */}
        <td className="px-2 py-2">
          <input
            type="number"
            step="0.01"
            min="0"
            value={t.labour_rate_per_unit}
            onChange={e =>
              updateField(t.id, 'labour_rate_per_unit', parseFloat(e.target.value) || 0)
            }
            className="input-field w-20 text-xs py-1 px-2"
          />
        </td>

        {/* Wastage (display as %) */}
        <td className="px-2 py-2">
          <div className="flex items-center gap-1">
            <input
              type="number"
              step="1"
              min="0"
              value={wastageToPercent(t.wastage_factor)}
              onChange={e =>
                updateField(t.id, 'wastage_factor', wastageToFactor(parseInt(e.target.value) || 0))
              }
              className="input-field w-14 text-xs py-1 px-2"
            />
            <span className="text-white/30 text-xs">%</span>
          </div>
        </td>

        {/* Material markup (display as %) */}
        <td className="px-2 py-2">
          <div className="flex items-center gap-1">
            <input
              type="number"
              step="1"
              min="0"
              value={toPercent(t.material_markup)}
              onChange={e =>
                updateField(t.id, 'material_markup', toDecimal(parseInt(e.target.value) || 0))
              }
              className="input-field w-14 text-xs py-1 px-2"
            />
            <span className="text-white/30 text-xs">%</span>
          </div>
        </td>

        {/* Labour markup (display as %) */}
        <td className="px-2 py-2">
          <div className="flex items-center gap-1">
            <input
              type="number"
              step="1"
              min="0"
              value={toPercent(t.labour_markup)}
              onChange={e =>
                updateField(t.id, 'labour_markup', toDecimal(parseInt(e.target.value) || 0))
              }
              className="input-field w-14 text-xs py-1 px-2"
            />
            <span className="text-white/30 text-xs">%</span>
          </div>
        </td>

        {/* Coverage rate */}
        <td className="px-2 py-2">
          {isCoverage && t.coverage_rate != null ? (
            <input
              type="number"
              step="0.01"
              min="0"
              value={t.coverage_rate}
              onChange={e =>
                updateField(t.id, 'coverage_rate', parseFloat(e.target.value) || 0)
              }
              className="input-field w-20 text-xs py-1 px-2"
            />
          ) : (
            <span className="text-white/20 text-xs">&mdash;</span>
          )}
        </td>

        {/* Active toggle */}
        <td className="px-2 py-2 text-center">
          <button
            onClick={() => updateField(t.id, 'is_active', !t.is_active)}
            className={`w-8 h-5 rounded-full transition-colors relative ${
              t.is_active ? 'bg-green-500/40' : 'bg-white/10'
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                t.is_active ? 'left-3.5 bg-green-400' : 'left-0.5 bg-white/40'
              }`}
            />
          </button>
        </td>
      </tr>

      {/* Material reference row for coverage templates */}
      {isCoverage && mat && (
        <tr className="bg-transparent">
          <td colSpan={10} className="px-4 py-1.5 pb-2">
            <div className="flex items-center gap-2 text-xs ml-2">
              <Package className="w-3 h-3 text-blue-400/60" />
              <span className="text-white/40">
                Material: <span className="text-blue-300/70">{mat.name}</span>
                {' '}({'\u00a3'}{mat.unit_cost.toFixed(2)})
                {' '}&rarr; CPCU {'\u00a3'}{dynamicCPCU?.toFixed(4)}/m\u00b2
              </span>
              {cpcuMismatch && (
                <span className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  <AlertCircle className="w-3 h-3" />
                  Mismatch: hardcoded {'\u00a3'}{hardcodedCPCU?.toFixed(4)}
                </span>
              )}
            </div>
          </td>
        </tr>
      )}

      {/* Compound material ingredient list */}
      {isCompound && t.formula_params?.components && (
        <tr className="bg-transparent">
          <td colSpan={10} className="px-4 py-1.5 pb-2">
            <div className="flex items-center gap-2 text-xs ml-2">
              <Package className="w-3 h-3 text-purple-400/60" />
              <span className="text-white/40">
                Ingredients:{' '}
                {(t.formula_params.components as any[]).map((c: any, i: number) => (
                  <span key={i}>
                    {i > 0 && ' + '}
                    <span className="text-purple-300/70">{c.product_key}</span>
                    {' '}({c.qty_per_coverage})
                  </span>
                ))}
              </span>
            </div>
          </td>
        </tr>
      )}

      {/* Formula params row for formula-driven templates */}
      {editableParams && editableParams.length > 0 && (
        <tr className={isChanged ? 'bg-amber-500/5' : ''}>
          <td colSpan={10} className="px-4 py-2 pb-3">
            <div className="flex flex-wrap gap-4 ml-2">
              {editableParams.map(param => (
                <div key={param.key} className="flex flex-col gap-1">
                  <label className="text-xs text-white/40">{param.label}</label>
                  <input
                    type="number"
                    step={param.step}
                    min="0"
                    value={t.formula_params?.[param.key] ?? ''}
                    onChange={e =>
                      updateFormulaParam(t.id, param.key, parseFloat(e.target.value) || 0)
                    }
                    className="input-field w-28 text-xs py-1 px-2"
                  />
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
