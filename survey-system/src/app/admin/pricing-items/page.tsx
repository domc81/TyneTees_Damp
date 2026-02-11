'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  PoundSterling,
  Search,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  Clock,
  Package,
} from 'lucide-react'
import {
  PRICING_ITEMS,
  WORK_SECTIONS,
  MARKUP_CONFIG,
  BASE_RATES,
  calculateItemCost,
} from '@/lib/pricing-database'

type PricingItem = (typeof PRICING_ITEMS)[keyof typeof PRICING_ITEMS]

const itemTypeOptions = [
  { value: 'MTL', label: 'Materials', color: 'bg-blue-100 text-blue-700' },
  { value: 'LBR', label: 'Labour', color: 'bg-amber-100 text-amber-700' },
  { value: 'SUB', label: 'Subcontractor', color: 'bg-purple-100 text-purple-700' },
  { value: 'OVR', label: 'Overheads', color: 'bg-gray-100 text-gray-700' },
  { value: 'TRA', label: 'Travel', color: 'bg-green-100 text-green-700' },
]

export default function PricingItemsAdminPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sectionFilter, setSectionFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [sortField, setSortField] = useState<'name' | 'section_id' | 'material_cost'>('section_id')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  // Convert to array and filter
  const items = useMemo(() => {
    let list = Object.values(PRICING_ITEMS) as PricingItem[]

    // Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      list = list.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)
      )
    }
    if (sectionFilter !== 'all') {
      list = list.filter(item => item.section_id === sectionFilter)
    }
    if (typeFilter !== 'all') {
      list = list.filter(item => item.item_type === typeFilter)
    }

    // Sort
    list.sort((a, b) => {
      let cmp = 0
      if (sortField === 'name') cmp = a.name.localeCompare(b.name)
      else if (sortField === 'section_id') {
        const sectionA = WORK_SECTIONS[a.section_id as keyof typeof WORK_SECTIONS]
        const sectionB = WORK_SECTIONS[b.section_id as keyof typeof WORK_SECTIONS]
        cmp = (sectionA?.display_order || 0) - (sectionB?.display_order || 0)
      }
      else if (sortField === 'material_cost') cmp = a.material_cost - b.material_cost
      return sortDir === 'asc' ? cmp : -cmp
    })

    return list
  }, [searchQuery, sectionFilter, typeFilter, sortField, sortDir])

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const SortIcon = ({ field }: { field: typeof sortField }) => {
    if (sortField !== field) return null
    return sortDir === 'asc'
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />
  }

  // Get section name
  const getSectionName = (sectionId: string) => {
    const section = WORK_SECTIONS[sectionId as keyof typeof WORK_SECTIONS]
    return section?.name || sectionId
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
              <PoundSterling className="w-6 h-6 text-green-600" />
              Pricing Items
            </h1>
            <p className="text-sm text-surface-500">{items.length} items • Work items with costs and labor hours</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mt-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            className="input-field w-auto"
          >
            <option value="all">All Sections</option>
            {Object.values(WORK_SECTIONS)
              .sort((a, b) => a.display_order - b.display_order)
              .map(section => (
                <option key={section.id} value={section.id}>{section.name}</option>
              ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input-field w-auto"
          >
            <option value="all">All Types</option>
            {itemTypeOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="p-8">
        {/* Add Form Modal */}
        {showAddForm && (
          <PricingItemFormModal
            onClose={() => setShowAddForm(false)}
            onSave={(data) => {
              console.log('Adding item:', data)
              alert('Item saved (demo mode - data not persisted)')
              setShowAddForm(false)
            }}
          />
        )}

        {/* Quick Reference */}
        <div className="mb-6 section-card p-4">
          <h3 className="font-semibold text-surface-900 mb-3">Quick Reference - Base Rates</h3>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-surface-500">Labor Rate:</span>
              <span className="ml-2 font-semibold">£{BASE_RATES.labor.base_hourly_rate}/hr</span>
              <span className="ml-1 text-surface-400">(+{BASE_RATES.labor.markup_percentage}% markup)</span>
            </div>
            <div>
              <span className="text-surface-500">Materials Markup:</span>
              <span className="ml-2 font-semibold">+{MARKUP_CONFIG.MTL.percentage}%</span>
            </div>
            <div>
              <span className="text-surface-500">Labor Markup:</span>
              <span className="ml-2 font-semibold">+{MARKUP_CONFIG.LBR.percentage}%</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="section-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-50 border-b border-surface-200">
                <tr>
                  <th
                    className="text-left px-4 py-3 text-sm font-semibold text-surface-700 cursor-pointer hover:bg-surface-100"
                    onClick={() => toggleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Item Name
                      <SortIcon field="name" />
                    </div>
                  </th>
                  <th
                    className="text-left px-4 py-3 text-sm font-semibold text-surface-700 cursor-pointer hover:bg-surface-100"
                    onClick={() => toggleSort('section_id')}
                  >
                    <div className="flex items-center gap-1">
                      Section
                      <SortIcon field="section_id" />
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-surface-700">
                    Type
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-surface-700">
                    Unit
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-surface-700">
                    <div className="flex items-center justify-end gap-1">
                      <Package className="w-4 h-4" />
                      Material
                    </div>
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-surface-700">
                    <div className="flex items-center justify-end gap-1">
                      <Clock className="w-4 h-4" />
                      Labor Hrs
                    </div>
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-surface-700">
                    Total @1
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-surface-700 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {items.map((item) => {
                  const costs = calculateItemCost(item.id, 1)
                  const typeConfig = itemTypeOptions.find(t => t.value === item.item_type)

                  return (
                    <tr key={item.id} className="hover:bg-surface-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-surface-900">{item.name}</p>
                        <p className="text-xs text-surface-400">{item.id}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-surface-600 max-w-48 truncate">
                        {getSectionName(item.section_id)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${typeConfig?.color || 'bg-surface-100 text-surface-700'}`}>
                          {typeConfig?.label || item.item_type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-surface-600">
                        {item.unit}
                      </td>
                      <td className="px-4 py-3 text-right text-sm">
                        {item.material_cost > 0 ? (
                          <span className="text-blue-600">£{item.material_cost.toFixed(2)}</span>
                        ) : (
                          <span className="text-surface-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right text-sm">
                        {item.labor_hours > 0 ? (
                          <span className="text-amber-600">{item.labor_hours.toFixed(2)}h</span>
                        ) : (
                          <span className="text-surface-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="font-semibold text-surface-900">
                          £{costs.total.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setEditingId(item.id)}
                            className="p-1.5 rounded hover:bg-surface-100 text-surface-500 hover:text-brand-600 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${item.name}"?`)) {
                                console.log('Deleting:', item.id)
                                alert('Deleted (demo mode)')
                              }
                            }}
                            className="p-1.5 rounded hover:bg-red-50 text-surface-500 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {items.length === 0 && (
            <div className="p-12 text-center">
              <PoundSterling className="w-12 h-12 text-surface-300 mx-auto mb-4" />
              <p className="text-surface-500">No items found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingId && (
        <PricingItemFormModal
          item={PRICING_ITEMS[editingId as keyof typeof PRICING_ITEMS]}
          onClose={() => setEditingId(null)}
          onSave={(data) => {
            console.log('Updating item:', editingId, data)
            alert('Item updated (demo mode - data not persisted)')
            setEditingId(null)
          }}
        />
      )}
    </div>
  )
}

interface PricingItemFormModalProps {
  item?: PricingItem
  onClose: () => void
  onSave: (data: Partial<PricingItem>) => void
}

function PricingItemFormModal({ item, onClose, onSave }: PricingItemFormModalProps) {
  const [formData, setFormData] = useState({
    id: item?.id || '',
    name: item?.name || '',
    section_id: item?.section_id || 'preparatory',
    unit: item?.unit || 'Each',
    material_cost: item?.material_cost || 0,
    labor_hours: item?.labor_hours || 0,
    item_type: item?.item_type || 'MTL',
    is_mandatory: item?.is_mandatory || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-surface-100 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-surface-900">
            {item ? 'Edit Pricing Item' : 'Add New Pricing Item'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-100 text-surface-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="input-label">Item Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="input-label">Work Section *</label>
              <select
                value={formData.section_id}
                onChange={(e) => setFormData({ ...formData, section_id: e.target.value })}
                className="input-field"
                required
              >
                {Object.values(WORK_SECTIONS)
                  .sort((a, b) => a.display_order - b.display_order)
                  .map(section => (
                    <option key={section.id} value={section.id}>{section.name}</option>
                  ))}
              </select>
            </div>

            <div>
              <label className="input-label">Item Type *</label>
              <select
                value={formData.item_type}
                onChange={(e) => setFormData({ ...formData, item_type: e.target.value })}
                className="input-field"
                required
              >
                {itemTypeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="input-label">Unit *</label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="input-field"
                placeholder="Each, M2, LM, Hours, Bags"
                required
              />
            </div>

            <div>
              <label className="input-label">Material Cost (£)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.material_cost}
                onChange={(e) => setFormData({ ...formData, material_cost: parseFloat(e.target.value) || 0 })}
                className="input-field"
              />
            </div>

            <div>
              <label className="input-label">Labor Hours</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.labor_hours}
                onChange={(e) => setFormData({ ...formData, labor_hours: parseFloat(e.target.value) || 0 })}
                className="input-field"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_mandatory"
                checked={formData.is_mandatory}
                onChange={(e) => setFormData({ ...formData, is_mandatory: e.target.checked })}
                className="w-4 h-4 text-brand-600 rounded border-surface-300"
              />
              <label htmlFor="is_mandatory" className="text-sm text-surface-700">
                Mandatory item (always included)
              </label>
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 bg-surface-50 rounded-lg">
            <h4 className="text-sm font-semibold text-surface-700 mb-2">Cost Preview (qty = 1)</h4>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-surface-500">Material:</span>
                <span className="ml-2 font-semibold">
                  £{(formData.material_cost * 1.3).toFixed(2)}
                </span>
                <span className="text-surface-400 text-xs ml-1">(+30%)</span>
              </div>
              <div>
                <span className="text-surface-500">Labor:</span>
                <span className="ml-2 font-semibold">
                  £{(formData.labor_hours * BASE_RATES.labor.base_hourly_rate * 2).toFixed(2)}
                </span>
                <span className="text-surface-400 text-xs ml-1">(+100%)</span>
              </div>
              <div>
                <span className="text-surface-500">Total:</span>
                <span className="ml-2 font-semibold text-brand-600">
                  £{((formData.material_cost * 1.3) + (formData.labor_hours * BASE_RATES.labor.base_hourly_rate * 2)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-surface-100">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center gap-2">
              <Save className="w-4 h-4" />
              {item ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
