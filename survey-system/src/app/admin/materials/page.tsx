'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Package,
  Search,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Save,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { MATERIALS_CATALOG, type MaterialsCatalogType } from '@/lib/pricing-database'

type MaterialEntry = MaterialsCatalogType[keyof MaterialsCatalogType]

const categoryOptions = [
  { value: 'prep', label: 'Preparatory' },
  { value: 'dpc', label: 'DPC' },
  { value: 'membrane', label: 'Membrane' },
  { value: 'tanking', label: 'Tanking' },
  { value: 'resin_floor', label: 'Resin Floor' },
  { value: 'plastering', label: 'Plastering' },
  { value: 'insulation', label: 'Insulation' },
  { value: 'ventilation', label: 'Ventilation' },
  { value: 'treatment', label: 'Treatment' },
  { value: 'external', label: 'External' },
]

const categoryColors: Record<string, string> = {
  prep: 'bg-slate-100 text-slate-700',
  dpc: 'bg-blue-100 text-blue-700',
  membrane: 'bg-cyan-100 text-cyan-700',
  tanking: 'bg-indigo-100 text-indigo-700',
  resin_floor: 'bg-amber-100 text-amber-700',
  plastering: 'bg-gray-100 text-gray-700',
  insulation: 'bg-orange-100 text-orange-700',
  ventilation: 'bg-teal-100 text-teal-700',
  treatment: 'bg-green-100 text-green-700',
  external: 'bg-emerald-100 text-emerald-700',
}

export default function MaterialsAdminPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [sortField, setSortField] = useState<'name' | 'unit_cost' | 'category'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  // Convert to array and filter
  const materials = useMemo(() => {
    let items = Object.values(MATERIALS_CATALOG) as MaterialEntry[]

    // Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      items = items.filter(m =>
        m.name.toLowerCase().includes(query) ||
        m.supplier?.toLowerCase().includes(query)
      )
    }
    if (categoryFilter !== 'all') {
      items = items.filter(m => m.category === categoryFilter)
    }

    // Sort
    items.sort((a, b) => {
      let cmp = 0
      if (sortField === 'name') cmp = a.name.localeCompare(b.name)
      else if (sortField === 'unit_cost') cmp = a.unit_cost - b.unit_cost
      else if (sortField === 'category') cmp = a.category.localeCompare(b.category)
      return sortDir === 'asc' ? cmp : -cmp
    })

    return items
  }, [searchQuery, categoryFilter, sortField, sortDir])

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
              <Package className="w-6 h-6 text-blue-600" />
              Materials Catalog
            </h1>
            <p className="text-sm text-surface-500">{materials.length} materials • Supplier pricing database</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Material
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mt-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              placeholder="Search by name or supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-field w-auto"
          >
            <option value="all">All Categories</option>
            {categoryOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="p-8">
        {/* Add Form Modal */}
        {showAddForm && (
          <MaterialFormModal
            onClose={() => setShowAddForm(false)}
            onSave={(data) => {
              console.log('Adding material:', data)
              // In production, this would save to Supabase
              alert('Material saved (demo mode - data not persisted)')
              setShowAddForm(false)
            }}
          />
        )}

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
                      Material Name
                      <SortIcon field="name" />
                    </div>
                  </th>
                  <th
                    className="text-left px-4 py-3 text-sm font-semibold text-surface-700 cursor-pointer hover:bg-surface-100"
                    onClick={() => toggleSort('category')}
                  >
                    <div className="flex items-center gap-1">
                      Category
                      <SortIcon field="category" />
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-surface-700">
                    Unit
                  </th>
                  <th
                    className="text-right px-4 py-3 text-sm font-semibold text-surface-700 cursor-pointer hover:bg-surface-100"
                    onClick={() => toggleSort('unit_cost')}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Unit Cost
                      <SortIcon field="unit_cost" />
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-surface-700">
                    Supplier
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-surface-700">
                    Coverage
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-surface-700 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {materials.map((material) => (
                  <tr
                    key={material.id}
                    className="hover:bg-surface-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-surface-900">{material.name}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[material.category] || 'bg-surface-100 text-surface-700'}`}>
                        {categoryOptions.find(c => c.value === material.category)?.label || material.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-surface-600">
                      {material.unit}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold text-surface-900">
                        £{material.unit_cost.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {material.supplier_url ? (
                        <a
                          href={material.supplier_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1"
                        >
                          {material.supplier}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-sm text-surface-600">{material.supplier || '-'}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-surface-500 max-w-48 truncate" title={material.coverage}>
                      {material.coverage}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setEditingId(material.id)}
                          className="p-1.5 rounded hover:bg-surface-100 text-surface-500 hover:text-brand-600 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete "${material.name}"?`)) {
                              console.log('Deleting:', material.id)
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
                ))}
              </tbody>
            </table>
          </div>

          {materials.length === 0 && (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-surface-300 mx-auto mb-4" />
              <p className="text-surface-500">No materials found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingId && (
        <MaterialFormModal
          material={MATERIALS_CATALOG[editingId as keyof typeof MATERIALS_CATALOG]}
          onClose={() => setEditingId(null)}
          onSave={(data) => {
            console.log('Updating material:', editingId, data)
            alert('Material updated (demo mode - data not persisted)')
            setEditingId(null)
          }}
        />
      )}
    </div>
  )
}

interface MaterialFormModalProps {
  material?: MaterialEntry
  onClose: () => void
  onSave: (data: Partial<MaterialEntry>) => void
}

function MaterialFormModal({ material, onClose, onSave }: MaterialFormModalProps) {
  const [formData, setFormData] = useState({
    id: material?.id || '',
    name: material?.name || '',
    supplier: material?.supplier || '',
    supplier_url: material?.supplier_url || '',
    unit_cost: material?.unit_cost || 0,
    unit: material?.unit || '',
    coverage: material?.coverage || '',
    category: material?.category || 'prep',
    default_quantity: material?.default_quantity || 0,
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
            {material ? 'Edit Material' : 'Add New Material'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-100 text-surface-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="input-label">Material Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="input-label">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-field"
                required
              >
                {categoryOptions.map(opt => (
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
                placeholder="e.g., M2, Each, LM, Bag"
                required
              />
            </div>

            <div>
              <label className="input-label">Unit Cost (£) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.unit_cost}
                onChange={(e) => setFormData({ ...formData, unit_cost: parseFloat(e.target.value) || 0 })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="input-label">Supplier</label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                className="input-field"
                placeholder="e.g., Preservation Shop"
              />
            </div>

            <div className="col-span-2">
              <label className="input-label">Supplier URL</label>
              <input
                type="url"
                value={formData.supplier_url}
                onChange={(e) => setFormData({ ...formData, supplier_url: e.target.value })}
                className="input-field"
                placeholder="https://..."
              />
            </div>

            <div className="col-span-2">
              <label className="input-label">Coverage / Notes</label>
              <input
                type="text"
                value={formData.coverage}
                onChange={(e) => setFormData({ ...formData, coverage: e.target.value })}
                className="input-field"
                placeholder="e.g., 10 linear metres at 115mm thickness"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-surface-100">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {material ? 'Update Material' : 'Add Material'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
