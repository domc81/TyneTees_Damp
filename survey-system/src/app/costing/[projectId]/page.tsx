'use client'

import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  Plus,
  Trash2,
  Calculator,
  ChevronDown,
  ChevronUp,
  Save,
  Eye,
  Truck,
  Clock,
  Package,
  Hammer,
  GripVertical,
  X,
} from 'lucide-react'
import type { LineItem, Section, CostSummary } from '@/types/database.types'
import { formatCurrency, calculateLineItemTotal } from '@/lib/cost-calculator'

// Sample data for demo
const sampleSections: Section[] = [
  { id: '1', project_id: '1', name: 'Preparatory Work', display_order: 1, markup_percentage: 0, created_at: '' },
  { id: '2', project_id: '1', name: 'DPC Installation', display_order: 2, markup_percentage: 0, created_at: '' },
  { id: '3', project_id: '1', name: 'Wall Membrane System', display_order: 3, markup_percentage: 0, created_at: '' },
  { id: '4', project_id: '1', name: 'Plastering & Finishing', display_order: 4, markup_percentage: 0, created_at: '' },
]

const sampleLineItems: LineItem[] = [
  { id: '1', section_id: '1', project_id: '1', item_name: 'Antinox HD Floor Protection', category: 'materials', length: 0, width: 0, height: 0, quantity: 25, uom: 'Each', unit_rate: 4.16, waste_factor: 0.1, hours_per_unit: 0, display_order: 1, created_at: '', updated_at: '' },
  { id: '2', section_id: '1', project_id: '1', item_name: 'Removal of stud walls etc', category: 'labor', length: 0, width: 0, height: 0, quantity: 32, uom: 'M2', unit_rate: 0, waste_factor: 0, hours_per_unit: 0.4, display_order: 2, created_at: '', updated_at: '' },
  { id: '3', section_id: '1', project_id: '1', item_name: 'Disposal via licensed transfer', category: 'materials', length: 0, width: 0, height: 0, quantity: 12, uom: 'Bags', unit_rate: 40, waste_factor: 0.1, hours_per_unit: 0, display_order: 3, created_at: '', updated_at: '' },
  { id: '4', section_id: '2', project_id: '1', item_name: 'DPC Installation - Traditional', category: 'materials', length: 8, width: 0.15, height: 0, quantity: 0, uom: 'LM', unit_rate: 13.93, waste_factor: 0.1, hours_per_unit: 0.35, display_order: 1, created_at: '', updated_at: '' },
  { id: '5', section_id: '3', project_id: '1', item_name: 'Wall membrane CM3 - 1.2m', category: 'materials', length: 6.5, width: 1.2, height: 0, quantity: 0, uom: 'M2', unit_rate: 18.35, waste_factor: 0.1, hours_per_unit: 0.3, display_order: 1, created_at: '', updated_at: '' },
  { id: '6', section_id: '4', project_id: '1', item_name: 'Skimming walls (multi finish)', category: 'labor', length: 6.5, width: 2.4, height: 0, quantity: 0, uom: 'M2', unit_rate: 0, waste_factor: 0.1, hours_per_unit: 0.267, display_order: 1, created_at: '', updated_at: '' },
]

const uomOptions = ['M2', 'LM', 'Each', 'Bags', 'm', 'Hours', 'Days', 'Per item']

export default function CostingPage({ params }: { params: { projectId: string } }) {
  const [sections, setSections] = useState<Section[]>(sampleSections)
  const [lineItems, setLineItems] = useState<LineItem[]>(sampleLineItems)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['1']))
  const [editingItem, setEditingItem] = useState<LineItem | null>(null)
  const [showAddModal, setShowAddModal] = useState<string | null>(null)
  const [summary, setSummary] = useState<CostSummary | null>(null)

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

  // Calculate summary
  useEffect(() => {
    const travelHours = 3
    const travelDistance = 45

    const matsTotal = lineItems.reduce((sum, item) => {
      if (!item.section_id) return sum
      const calc = calculateLineItemTotal(item)
      return sum + calc.materialCost
    }, 0)

    const laborTotal = lineItems.reduce((sum, item) => {
      if (!item.section_id) return sum
      const calc = calculateLineItemTotal(item)
      return sum + calc.laborCost
    }, 0)

    const travelCost = travelHours * 30.63 + travelDistance * 0.50
    const subtotal = matsTotal + laborTotal + travelCost
    const vatAmount = subtotal * 0.20

    setSummary({
      materials_total: matsTotal,
      labor_total: laborTotal,
      travel_cost: travelCost,
      subtotal,
      vat_amount: vatAmount,
      total: subtotal + vatAmount,
      deposit_30_percent: (subtotal + vatAmount) * 0.3,
    })
  }, [lineItems])

  // Get items for section
  const getSectionItems = (sectionId: string) => {
    return lineItems.filter(item => item.section_id === sectionId)
  }

  // Calculate section total
  const getSectionTotal = (sectionId: string) => {
    const items = getSectionItems(sectionId)
    return items.reduce((sum, item) => {
      const calc = calculateLineItemTotal(item)
      return sum + calc.total
    }, 0)
  }

  // Add new line item
  const handleAddItem = (sectionId: string, item: Partial<LineItem>) => {
    const newItem: LineItem = {
      id: `new-${Date.now()}`,
      section_id: sectionId,
      project_id: params.projectId,
      item_name: item.item_name || 'New Item',
      category: item.category || 'materials',
      length: item.length || 0,
      width: item.width || 0,
      height: item.height || 0,
      quantity: item.quantity || 0,
      uom: item.uom || 'M2',
      unit_rate: item.unit_rate || 0,
      waste_factor: item.waste_factor || 0.1,
      hours_per_unit: item.hours_per_unit || 0,
      is_optional: item.is_optional || false,
      is_active: true,
      display_order: getSectionItems(sectionId).length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    setLineItems([...lineItems, newItem])
    setShowAddModal(null)
  }

  // Delete line item
  const handleDeleteItem = (itemId: string) => {
    setLineItems(lineItems.filter(item => item.id !== itemId))
  }

  // Toggle item active status
  const toggleItemActive = (itemId: string) => {
    setLineItems(lineItems.map(item =>
      item.id === itemId ? { ...item, is_active: !item.is_active } : item
    ))
  }

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-surface-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-surface-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-surface-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-surface-900">Costing Calculator</h1>
              <p className="text-sm text-surface-500">TT-2026-0001 • Smith Residence</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="btn-secondary flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview Quote
            </button>
            <button className="btn-primary flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content - Sections */}
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto space-y-4">
            {sections.map((section) => (
              <div key={section.id} className="section-card">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-surface-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-5 h-5 text-surface-300 cursor-grab" />
                    <h3 className="text-lg font-semibold text-surface-900">{section.name}</h3>
                    <span className="badge badge-blue">{getSectionItems(section.id).length} items</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-brand-600">
                      {formatCurrency(getSectionTotal(section.id))}
                    </span>
                    {expandedSections.has(section.id) ? (
                      <ChevronUp className="w-5 h-5 text-surface-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-surface-400" />
                    )}
                  </div>
                </button>

                {/* Section Items */}
                {expandedSections.has(section.id) && (
                  <div className="border-t border-surface-100">
                    <div className="divide-y divide-surface-100">
                      {getSectionItems(section.id).map((item, index) => {
                        const calc = calculateLineItemTotal(item)
                        return (
                          <div
                            key={item.id}
                            className={`px-6 py-4 flex items-center gap-4 transition-opacity
                                       ${item.is_active === false ? 'opacity-50' : ''}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-full bg-surface-100 text-surface-500 text-xs flex items-center justify-center font-medium">
                                {index + 1}
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => toggleItemActive(item.id)}
                                  className={`w-8 h-8 rounded-lg border-2 transition-colors
                                             ${item.is_active !== false
                                               ? 'border-brand-500 bg-brand-50'
                                               : 'border-surface-300 bg-surface-50'}`}
                                >
                                  {item.is_active !== false && (
                                    <div className="w-4 h-4 mx-auto bg-brand-500 rounded-sm" />
                                  )}
                                </button>
                              </div>
                            </div>

                            <div className="flex-1 grid grid-cols-12 gap-4">
                              <div className="col-span-4">
                                <p className="font-medium text-surface-900">{item.item_name}</p>
                                <p className="text-sm text-surface-500 capitalize">{item.category}</p>
                              </div>
                              <div className="col-span-2 text-center">
                                <p className="text-sm text-surface-500">Qty</p>
                                <p className="font-medium">{calc.quantity.toFixed(2)}</p>
                              </div>
                              <div className="col-span-2 text-center">
                                <p className="text-sm text-surface-500">UOM</p>
                                <p className="font-medium">{item.uom}</p>
                              </div>
                              <div className="col-span-2 text-center">
                                <p className="text-sm text-surface-500">Rate</p>
                                <p className="font-medium">{formatCurrency(item.unit_rate || 0)}</p>
                              </div>
                              <div className="col-span-2 text-right">
                                <p className="text-sm text-surface-500">Total</p>
                                <p className="font-semibold text-brand-600">{formatCurrency(calc.total)}</p>
                              </div>
                            </div>

                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-2 rounded-lg hover:bg-red-50 text-surface-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )
                      })}
                    </div>

                    {/* Add Item Button */}
                    <div className="px-6 py-4 border-t border-surface-100">
                      <button
                        onClick={() => setShowAddModal(section.id)}
                        className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                        Add Item to {section.name}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Add Section Button */}
            <button className="w-full p-4 border-2 border-dashed border-surface-300 rounded-xl
                               text-surface-500 hover:border-brand-400 hover:text-brand-600
                               transition-colors flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Section
            </button>
          </div>
        </div>

        {/* Right Sidebar - Summary */}
        <div className="w-96 bg-white border-l border-surface-200 p-6">
          <h3 className="text-lg font-semibold text-surface-900 mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-surface-400" />
            Cost Summary
          </h3>

          {summary && (
            <div className="space-y-4">
              {/* Materials */}
              <div className="p-4 rounded-lg bg-surface-50">
                <div className="flex items-center gap-2 text-surface-600 mb-2">
                  <Package className="w-4 h-4" />
                  <span className="text-sm font-medium">Materials</span>
                </div>
                <p className="text-xl font-semibold text-surface-900">
                  {formatCurrency(summary.materials_total)}
                </p>
              </div>

              {/* Labor */}
              <div className="p-4 rounded-lg bg-surface-50">
                <div className="flex items-center gap-2 text-surface-600 mb-2">
                  <Hammer className="w-4 h-4" />
                  <span className="text-sm font-medium">Labor</span>
                </div>
                <p className="text-xl font-semibold text-surface-900">
                  {formatCurrency(summary.labor_total)}
                </p>
              </div>

              {/* Travel */}
              <div className="p-4 rounded-lg bg-surface-50">
                <div className="flex items-center gap-2 text-surface-600 mb-2">
                  <Truck className="w-4 h-4" />
                  <span className="text-sm font-medium">Travel</span>
                </div>
                <p className="text-xl font-semibold text-surface-900">
                  {formatCurrency(summary.travel_cost)}
                </p>
              </div>

              <div className="border-t border-surface-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-surface-600">Subtotal</span>
                  <span className="font-semibold">{formatCurrency(summary.subtotal)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-surface-600">VAT (20%)</span>
                  <span className="font-semibold">{formatCurrency(summary.vat_amount)}</span>
                </div>
                <div className="border-t border-surface-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-surface-900">Total</span>
                    <span className="text-2xl font-bold text-brand-600">
                      {formatCurrency(summary.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Deposit */}
              <div className="p-4 rounded-lg bg-brand-50 border border-brand-200 mt-6">
                <p className="text-sm text-brand-700 mb-1">30% Deposit Required</p>
                <p className="text-xl font-bold text-brand-600">
                  {formatCurrency(summary.deposit_30_percent)}
                </p>
              </div>

              {/* Rates Reference */}
              <div className="mt-8 p-4 rounded-lg bg-surface-100">
                <h4 className="text-sm font-medium text-surface-700 mb-3">Current Rates</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-surface-500">Hourly Rate</span>
                    <span className="font-medium">£30.63/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-500">Travel Rate</span>
                    <span className="font-medium">£0.50/km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-500">Default Markup</span>
                    <span className="font-medium">35%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <AddItemModal
          sectionId={showAddModal}
          onClose={() => setShowAddModal(null)}
          onAdd={handleAddItem}
        />
      )}
    </div>
  )
}

// Add Item Modal Component
function AddItemModal({
  sectionId,
  onClose,
  onAdd,
}: {
  sectionId: string
  onClose: () => void
  onAdd: (sectionId: string, item: Partial<LineItem>) => void
}) {
  const [formData, setFormData] = useState<Partial<LineItem>>({
    item_name: '',
    category: 'materials',
    quantity: 0,
    length: 0,
    width: 0,
    uom: 'M2',
    unit_rate: 0,
    waste_factor: 0.1,
    hours_per_unit: 0,
    is_optional: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Calculate quantity from dimensions if provided
    const quantity = formData.length && formData.width
      ? formData.length * formData.width
      : formData.quantity || 0

    onAdd(sectionId, { ...formData, quantity })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-surface-100 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-surface-900">Add Line Item</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-100 transition-colors"
          >
            <X className="w-5 h-5 text-surface-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="input-label">Item Name *</label>
            <input
              type="text"
              value={formData.item_name}
              onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
              className="input-field"
              placeholder="e.g., Damp proof course installation"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="input-label">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-field"
              >
                <option value="materials">Materials</option>
                <option value="labor">Labor</option>
                <option value="equipment">Equipment</option>
                <option value="subcontractor">Subcontractor</option>
              </select>
            </div>
            <div>
              <label className="input-label">Unit of Measure</label>
              <select
                value={formData.uom}
                onChange={(e) => setFormData({ ...formData, uom: e.target.value })}
                className="input-field"
              >
                {uomOptions.map((uom) => (
                  <option key={uom} value={uom}>{uom}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="input-label">Length (m)</label>
              <input
                type="number"
                step="0.01"
                value={formData.length || ''}
                onChange={(e) => setFormData({ ...formData, length: parseFloat(e.target.value) || 0 })}
                className="input-field"
                placeholder="0"
              />
            </div>
            <div>
              <label className="input-label">Width (m)</label>
              <input
                type="number"
                step="0.01"
                value={formData.width || ''}
                onChange={(e) => setFormData({ ...formData, width: parseFloat(e.target.value) || 0 })}
                className="input-field"
                placeholder="0"
              />
            </div>
            <div>
              <label className="input-label">Or Qty</label>
              <input
                type="number"
                step="0.01"
                value={formData.quantity || ''}
                onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 0 })}
                className="input-field"
                placeholder="Manual qty"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="input-label">Unit Rate (£)</label>
              <input
                type="number"
                step="0.01"
                value={formData.unit_rate || ''}
                onChange={(e) => setFormData({ ...formData, unit_rate: parseFloat(e.target.value) || 0 })}
                className="input-field"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="input-label">Hours/Unit</label>
              <input
                type="number"
                step="0.01"
                value={formData.hours_per_unit || ''}
                onChange={(e) => setFormData({ ...formData, hours_per_unit: parseFloat(e.target.value) || 0 })}
                className="input-field"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="input-label">Waste Factor</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={formData.waste_factor || ''}
                onChange={(e) => setFormData({ ...formData, waste_factor: parseFloat(e.target.value) || 0 })}
                className="input-field"
                placeholder="0.1"
              />
              <p className="text-xs text-surface-500 mt-1">10% = 0.1</p>
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_optional}
                  onChange={(e) => setFormData({ ...formData, is_optional: e.target.checked })}
                  className="w-5 h-5 rounded border-surface-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-surface-700">Optional item for customer</span>
              </label>
            </div>
          </div>

          {/* Calculated Preview */}
          <div className="p-4 rounded-lg bg-surface-50 mt-4">
            <p className="text-sm text-surface-500 mb-2">Calculated Quantity</p>
            <p className="text-lg font-semibold text-surface-900">
              {formData.length && formData.width
                ? `${(formData.length * formData.width).toFixed(2)} ${formData.uom}`
                : formData.quantity
                ? `${formData.quantity} ${formData.uom}`
                : 'Enter dimensions or quantity'}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
