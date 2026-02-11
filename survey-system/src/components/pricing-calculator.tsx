'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Trash2,
  Save,
  FileText,
  Check,
  AlertCircle,
  PoundSterling,
  Clock,
  Package,
  ChevronRight,
} from 'lucide-react'
import {
  PRICING_ITEMS,
  WORK_SECTIONS,
  MATERIALS_CATALOG,
  BASE_RATES,
  MARKUP_CONFIG,
  calculateItemCost,
  calculateSectionTotal,
  calculateTotalWithVAT,
  getItemsBySection,
  type PricingItem,
  type WorkSection,
} from '@/lib/pricing-database'

interface PricingCalculatorProps {
  projectId: string
  onSave?: (data: PricingCalculationData) => void
  initialData?: PricingCalculationData
}

export interface PricingCalculationData {
  selectedItems: Record<string, number>  // itemId -> quantity
  selectedOptionalItems: string[]
  travelMiles: number
  notes: string
}

export default function PricingCalculator({
  projectId,
  onSave,
  initialData,
}: PricingCalculatorProps) {
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>(
    initialData?.selectedItems || {}
  )
  const [selectedOptionalItems, setSelectedOptionalItems] = useState<string[]>(
    initialData?.selectedOptionalItems || []
  )
  const [travelMiles, setTravelMiles] = useState(initialData?.travelMiles || 0)
  const [notes, setNotes] = useState(initialData?.notes || '')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['preparatory']))
  const [isSaving, setIsSaving] = useState(false)

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  // Update item quantity
  const updateItemQuantity = (itemId: string, quantity: number, sectionId: string) => {
    const section = WORK_SECTIONS[sectionId as keyof typeof WORK_SECTIONS]
    const isOptional = section?.is_optional

    setSelectedItems(prev => {
      const updated = { ...prev }
      if (quantity > 0) {
        updated[itemId] = quantity
        // Auto-select optional section when item is added
        if (isOptional && !selectedOptionalItems.includes(sectionId)) {
          setSelectedOptionalItems(prev => [...prev, sectionId])
        }
      } else {
        delete updated[itemId]
      }
      return updated
    })
  }

  // Toggle optional section
  const toggleOptionalSection = (sectionId: string) => {
    setSelectedOptionalItems(prev => {
      if (prev.includes(sectionId)) {
        // Remove all items from this section
        setSelectedItems(currentItems => {
          const updated = { ...currentItems }
          const sectionItems = getItemsBySection(sectionId)
          sectionItems.forEach(item => {
            delete updated[item.id]
          })
          return updated
        })
        return prev.filter(id => id !== sectionId)
      } else {
        return [...prev, sectionId]
      }
    })
  }

  // Calculate all section totals
  const sectionTotals = useMemo(() => {
    const totals: Record<string, { material: number; labor: number; total: number; itemCount: number; isOptional: boolean }> = {}

    Object.values(WORK_SECTIONS).forEach(section => {
      const sectionItems = getItemsBySection(section.id)
      let material = 0
      let labor = 0
      let itemCount = 0

      sectionItems.forEach(item => {
        const quantity = selectedItems[item.id] || 0
        if (quantity > 0) {
          const costs = calculateItemCost(item.id, quantity)
          material += costs.material
          labor += costs.labor
          itemCount++
        }
      })

      totals[section.id] = {
        material,
        labor,
        total: material + labor,
        itemCount,
        isOptional: section.is_optional,
      }
    })

    return totals
  }, [selectedItems])

  // Calculate grand totals
  const totals = useMemo(() => {
    let materialSubtotal = 0
    let laborSubtotal = 0
    let optionalExtras = 0

    Object.entries(sectionTotals).forEach(([sectionId, data]) => {
      const section = WORK_SECTIONS[sectionId as keyof typeof WORK_SECTIONS]
      if (section?.is_optional) {
        if (selectedOptionalItems.includes(sectionId)) {
          optionalExtras += data.total
        }
      } else {
        materialSubtotal += data.material
        laborSubtotal += data.labor
      }
    })

    const subtotal = materialSubtotal + laborSubtotal
    const subtotalWithOptional = subtotal + optionalExtras
    const { vat, total } = calculateTotalWithVAT(subtotalWithOptional)
    const deposit = total * 0.30

    return {
      materialSubtotal,
      laborSubtotal,
      subtotal,
      optionalExtras,
      subtotalWithOptional,
      vat,
      total,
      deposit,
      travelCost: travelMiles * BASE_RATES.travel.vehicle_cost_per_mile,
    }
  }, [sectionTotals, selectedOptionalItems, travelMiles])

  // Handle save
  const [saveMessage, setSaveMessage] = useState<'saved' | 'error' | null>(null)

  const handleSave = async () => {
    console.log('handleSave called') // Debug log
    setIsSaving(true)
    try {
      const data: PricingCalculationData = {
        selectedItems,
        selectedOptionalItems,
        travelMiles,
        notes,
      }
      console.log('Calling onSave with data:', data) // Debug log
      onSave?.(data)
      // Show success message
      setSaveMessage('saved')
      setTimeout(() => setSaveMessage(null), 3000)
    } catch (error) {
      console.error('Save error:', error) // Debug log
      setSaveMessage('error')
      setTimeout(() => setSaveMessage(null), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-surface-900 flex items-center gap-3">
            <Calculator className="w-6 h-6 text-brand-600" />
            Pricing Calculator
          </h2>
          <p className="text-surface-500 mt-1">
            Calculate project costs based on survey findings
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveMessage === 'saved' && (
            <span className="text-green-600 flex items-center gap-2 text-sm font-medium">
              <Check className="w-4 h-4" />
              Saved successfully
            </span>
          )}
          {saveMessage === 'error' && (
            <span className="text-red-600 flex items-center gap-2 text-sm font-medium">
              <AlertCircle className="w-4 h-4" />
              Error saving
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Calculation'}
          </button>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <SummaryCard
          label="Materials"
          value={totals.materialSubtotal}
          icon={Package}
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
        <SummaryCard
          label="Labour"
          value={totals.laborSubtotal}
          icon={Clock}
          color="text-amber-600"
          bgColor="bg-amber-50"
        />
        <SummaryCard
          label="Subtotal"
          value={totals.subtotal}
          icon={PoundSterling}
          color="text-surface-900"
          bgColor="bg-surface-100"
        />
        <SummaryCard
          label="Total (inc VAT)"
          value={totals.total}
          icon={Check}
          color="text-green-600"
          bgColor="bg-green-50"
          highlight
        />
      </div>

      {/* Quick Add Presets */}
      <div className="section-card mb-6">
        <div className="p-4 border-b border-surface-100">
          <h3 className="font-semibold text-surface-900">Quick Add Presets</h3>
          <p className="text-sm text-surface-500">Common item combinations for damp proofing projects</p>
        </div>
        <div className="p-4 grid grid-cols-4 gap-3">
          <PresetButton
            label="Full DPC"
            items={[
              { itemId: 'dpc_traditional', quantity: 10 },
            ]}
            onAdd={(items) => setSelectedItems(prev => ({ ...prev, ...items }))}
          />
          <PresetButton
            label="Wall Membrane (10m²)"
            items={[
              { itemId: 'membrane_cm3_1mtr', quantity: 10 },
              { itemId: 'membrane_plugs', quantity: 10 },
              { itemId: 'fillet_joint', quantity: 10 },
            ]}
            onAdd={(items) => setSelectedItems(prev => ({ ...prev, ...items }))}
          />
          <PresetButton
            label="Tanking (10m²)"
            items={[
              { itemId: 'tanking_dubbing', quantity: 10 },
              { itemId: 'tanking_slurry', quantity: 10 },
              { itemId: 'tanking_fillet', quantity: 10 },
            ]}
            onAdd={(items) => setSelectedItems(prev => ({ ...prev, ...items }))}
          />
          <PresetButton
            label="Resin Floor (10m²)"
            items={[
              { itemId: 'resin_primer', quantity: 10 },
              { itemId: 'resin_topcoat', quantity: 10 },
              { itemId: 'resin_grip', quantity: 10 },
              { itemId: 'resin_fillet', quantity: 10 },
            ]}
            onAdd={(items) => setSelectedItems(prev => ({ ...prev, ...items }))}
          />
        </div>
      </div>

      {/* Travel Section */}
      <div className="section-card mb-6">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-surface-900">Travel Costs</h3>
              <p className="text-sm text-surface-500">
                Vehicle costs: £{BASE_RATES.travel.vehicle_cost_per_mile}/mile
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-surface-700">Miles:</label>
                <input
                  type="number"
                  value={travelMiles}
                  onChange={(e) => setTravelMiles(Number(e.target.value))}
                  className="input-field w-24"
                  min="0"
                />
              </div>
              <span className="font-semibold text-surface-900">
                £{totals.travelCost.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Work Sections */}
      <div className="space-y-4">
        {Object.values(WORK_SECTIONS)
          .sort((a, b) => a.display_order - b.display_order)
          .map((section) => {
            const sectionData = sectionTotals[section.id]
            const isExpanded = expandedSections.has(section.id)
            const sectionItems = getItemsBySection(section.id)
            const isOptional = section.is_optional
            const isIncluded = !isOptional || selectedOptionalItems.includes(section.id)

            return (
              <div
                key={section.id}
                className={`section-card ${isOptional && !isIncluded ? 'opacity-60' : ''}`}
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-surface-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {isOptional && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleOptionalSection(section.id)
                        }}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors
                          ${isIncluded
                            ? 'bg-brand-600 border-brand-600 text-white'
                            : 'border-surface-300 hover:border-brand-400'
                          }`}
                      >
                        {isIncluded && <Check className="w-4 h-4" />}
                      </button>
                    )}
                    <div>
                      <h3 className="font-semibold text-surface-900">
                        {section.name}
                        {isOptional && (
                          <span className="ml-2 text-xs font-normal text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                            Optional
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-surface-500">{section.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {sectionData.itemCount > 0 && (
                      <span className="text-sm text-surface-500">
                        {sectionData.itemCount} item{sectionData.itemCount !== 1 ? 's' : ''}
                      </span>
                    )}
                    <div className="text-right">
                      <p className="font-semibold text-surface-900">
                        £{sectionData.total.toFixed(2)}
                      </p>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-surface-400 ml-auto" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-surface-400 ml-auto" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Section Items */}
                {isExpanded && (
                  <div className="border-t border-surface-100 p-4 space-y-3">
                    {sectionItems.map((item) => {
                      const quantity = selectedItems[item.id] || 0
                      const costs = calculateItemCost(item.id, quantity)

                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-3 rounded-lg bg-surface-50"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-surface-900">{item.name}</p>
                            <p className="text-sm text-surface-500">
                              {item.unit} • {MARKUP_CONFIG[item.item_type as keyof typeof MARKUP_CONFIG]?.name || item.item_type}
                              {item.labor_hours > 0 && ` • ${item.labor_hours}h`}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateItemQuantity(item.id, Math.max(0, quantity - 1), section.id)}
                              className="p-1 rounded hover:bg-surface-200 transition-colors"
                            >
                              <Minus className="w-4 h-4 text-surface-600" />
                            </button>
                            <input
                              type="number"
                              value={quantity}
                              onChange={(e) => updateItemQuantity(item.id, Math.max(0, Number(e.target.value)), section.id)}
                              className="input-field w-16 text-center"
                              min="0"
                              step={item.unit === 'M2' || item.unit === 'LM' ? '0.5' : '1'}
                            />
                            <button
                              onClick={() => updateItemQuantity(item.id, quantity + 1, section.id)}
                              className="p-1 rounded hover:bg-surface-200 transition-colors"
                            >
                              <Plus className="w-4 h-4 text-surface-600" />
                            </button>
                          </div>
                          <div className="text-right min-w-24">
                            <p className="font-semibold text-surface-900">
                              £{costs.total.toFixed(2)}
                            </p>
                            {quantity > 0 && (
                              <p className="text-xs text-surface-500">
                                Mat: £{costs.material.toFixed(2)} • Lab: £{costs.labor.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
      </div>

      {/* Final Summary */}
      <div className="mt-6 section-card">
        <div className="p-6">
          <h3 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Price Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-surface-600">
              <span>Materials</span>
              <span>£{totals.materialSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-surface-600">
              <span>Labour</span>
              <span>£{totals.laborSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-surface-600">
              <span>Travel ({travelMiles} miles)</span>
              <span>£{totals.travelCost.toFixed(2)}</span>
            </div>
            {totals.optionalExtras > 0 && (
              <div className="flex justify-between text-amber-600">
                <span>Optional Extras</span>
                <span>£{totals.optionalExtras.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-surface-200 pt-3 flex justify-between font-semibold text-surface-900">
              <span>Subtotal</span>
              <span>£{totals.subtotalWithOptional.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-surface-600">
              <span>VAT (20%)</span>
              <span>£{totals.vat.toFixed(2)}</span>
            </div>
            <div className="border-t-2 border-brand-200 pt-3 flex justify-between font-bold text-xl text-surface-900">
              <span>Total Inc. VAT</span>
              <span className="text-brand-600">£{totals.total.toFixed(2)}</span>
            </div>
            <div className="bg-brand-50 rounded-lg p-4 mt-4">
              <div className="flex justify-between text-brand-800">
                <span>30% Deposit Required</span>
                <span className="font-semibold">£{totals.deposit.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-6 section-card">
        <div className="p-4">
          <label className="block font-medium text-surface-900 mb-2">
            Pricing Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-field resize-none"
            rows={3}
            placeholder="Add any notes about pricing decisions, discounts, or special arrangements..."
          />
        </div>
      </div>
    </div>
  )
}

// Summary Card Component
function SummaryCard({
  label,
  value,
  icon: Icon,
  color,
  bgColor,
  highlight = false,
}: {
  label: string
  value: number
  icon: typeof Calculator
  color: string
  bgColor: string
  highlight?: boolean
}) {
  return (
    <div className={`section-card p-4 ${highlight ? 'ring-2 ring-brand-200' : ''}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div>
          <p className="text-sm text-surface-500">{label}</p>
          <p className={`text-xl font-bold ${color}`}>
            £{value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  )
}

// Preset Button Component
function PresetButton({
  label,
  items,
  onAdd,
}: {
  label: string
  items: { itemId: string; quantity: number }[]
  onAdd: (items: Record<string, number>) => void
}) {
  return (
    <button
      onClick={() => {
        const itemMap: Record<string, number> = {}
        items.forEach(item => {
          itemMap[item.itemId] = item.quantity
        })
        onAdd(itemMap)
      }}
      className="px-4 py-2 rounded-lg border border-surface-200 hover:border-brand-300 hover:bg-brand-50 transition-colors text-sm font-medium text-surface-700"
    >
      + {label}
    </button>
  )
}
