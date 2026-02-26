'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import {
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
  ArrowLeft,
} from 'lucide-react'
import { getMaterials } from '@/lib/supabase-data'
import type { MaterialsCatalogItem } from '@/types/database.types'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'

type MaterialEntry = MaterialsCatalogItem

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
  prep: 'bg-slate-500/20 text-slate-300',
  dpc: 'bg-blue-500/20 text-blue-300',
  membrane: 'bg-cyan-500/20 text-cyan-300',
  tanking: 'bg-indigo-500/20 text-indigo-300',
  resin_floor: 'bg-amber-500/20 text-amber-300',
  plastering: 'bg-gray-500/20 text-gray-300',
  insulation: 'bg-orange-500/20 text-orange-300',
  ventilation: 'bg-teal-500/20 text-teal-300',
  treatment: 'bg-green-500/20 text-green-300',
  external: 'bg-emerald-500/20 text-emerald-300',
}

export default function MaterialsAdminPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [sortField, setSortField] = useState<'name' | 'unit_cost' | 'category'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [materialsData, setMaterialsData] = useState<MaterialEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        setLoading(true)
        const data = await getMaterials()
        setMaterialsData(data)
      } catch (err) {
        console.error('Failed to load materials:', err)
      } finally {
        setLoading(false)
      }
    }

    loadMaterials()
  }, [])

  const materials = useMemo(() => {
    let items = materialsData

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      items = items.filter(m =>
        (m.name ?? '').toLowerCase().includes(query) ||
        m.supplier?.toLowerCase().includes(query)
      )
    }
    if (categoryFilter !== 'all') {
      items = items.filter(m => m.category === categoryFilter)
    }

    items.sort((a, b) => {
      let cmp = 0
      if (sortField === 'name') cmp = (a.name ?? '').localeCompare(b.name ?? '')
      else if (sortField === 'unit_cost') cmp = (a.unit_cost ?? 0) - (b.unit_cost ?? 0)
      else if (sortField === 'category') cmp = (a.category ?? '').localeCompare(b.category ?? '')
      return sortDir === 'asc' ? cmp : -cmp
    })

    return items
  }, [materialsData, searchQuery, categoryFilter, sortField, sortDir])

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
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
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
                <Package className="w-6 h-6 text-blue-400" />
                Materials Catalog
              </h2>
              <p className="text-sm text-white/60 mt-1">{materials.length} materials &bull; Supplier pricing database</p>
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
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
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

          {/* Add Form Modal */}
          {showAddForm && (
            <MaterialFormModal
              onClose={() => setShowAddForm(false)}
              onSave={(data) => {
                console.log('Adding material:', data)
                alert('Material saved (demo mode - data not persisted)')
                setShowAddForm(false)
              }}
            />
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="spinner mx-auto mb-4" />
                <p className="text-white/60">Loading materials...</p>
              </div>
            </div>
          ) : (
            /* Table */
            <div className="section-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table-base">
                  <thead>
                    <tr>
                      <th
                        className="cursor-pointer hover:bg-white/10"
                        onClick={() => toggleSort('name')}
                      >
                        <div className="flex items-center gap-1">
                          Material Name
                          <SortIcon field="name" />
                        </div>
                      </th>
                      <th
                        className="cursor-pointer hover:bg-white/10"
                        onClick={() => toggleSort('category')}
                      >
                        <div className="flex items-center gap-1">
                          Category
                          <SortIcon field="category" />
                        </div>
                      </th>
                      <th>Unit</th>
                      <th
                        className="cursor-pointer hover:bg-white/10"
                        onClick={() => toggleSort('unit_cost')}
                      >
                        <div className="flex items-center justify-end gap-1">
                          Unit Cost
                          <SortIcon field="unit_cost" />
                        </div>
                      </th>
                      <th>Supplier</th>
                      <th>Coverage</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((material) => (
                      <tr key={material.id}>
                        <td>
                          <p className="font-medium text-white">{material.name}</p>
                        </td>
                        <td>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[material.category] || 'bg-white/10 text-white/60'}`}>
                            {categoryOptions.find(c => c.value === material.category)?.label || material.category}
                          </span>
                        </td>
                        <td className="text-white/60">{material.unit}</td>
                        <td className="text-right">
                          <span className="font-semibold text-white">
                            £{material.unit_cost.toFixed(2)}
                          </span>
                        </td>
                        <td>
                          {material.supplier_url ? (
                            <a
                              href={material.supplier_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1"
                            >
                              {material.supplier}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-sm text-white/60">{material.supplier || '-'}</span>
                          )}
                        </td>
                        <td className="text-white/50 max-w-48 truncate" title={material.coverage || ''}>
                          {material.coverage || '-'}
                        </td>
                        <td>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => setEditingId(material.id)}
                              className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-brand-400 transition-colors"
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
                              className="p-1.5 rounded hover:bg-red-500/10 text-white/50 hover:text-red-400 transition-colors"
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
                  <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50">No materials found matching your criteria</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingId && (
          <MaterialFormModal
            material={materialsData.find(m => m.id === editingId)}
            onClose={() => setEditingId(null)}
            onSave={(data) => {
              console.log('Updating material:', editingId, data)
              alert('Material updated (demo mode - data not persisted)')
              setEditingId(null)
            }}
          />
        )}
      </Layout>
    </ProtectedRoute>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {material ? 'Edit Material' : 'Add New Material'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-white/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-1.5">Material Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Category *</label>
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
              <label className="block text-sm font-medium text-white/70 mb-1.5">Unit *</label>
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
              <label className="block text-sm font-medium text-white/70 mb-1.5">Unit Cost (&pound;) *</label>
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
              <label className="block text-sm font-medium text-white/70 mb-1.5">Supplier</label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                className="input-field"
                placeholder="e.g., Preservation Shop"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-1.5">Supplier URL</label>
              <input
                type="url"
                value={formData.supplier_url}
                onChange={(e) => setFormData({ ...formData, supplier_url: e.target.value })}
                className="input-field"
                placeholder="https://..."
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-1.5">Coverage / Notes</label>
              <input
                type="text"
                value={formData.coverage}
                onChange={(e) => setFormData({ ...formData, coverage: e.target.value })}
                className="input-field"
                placeholder="e.g., 10 linear metres at 115mm thickness"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
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
