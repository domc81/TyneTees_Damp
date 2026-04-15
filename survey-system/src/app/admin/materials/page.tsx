'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
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
  AlertCircle,
  Loader2,
  Link2,
} from 'lucide-react'
import {
  getMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  isProductKeyUnique,
  getTemplatesReferencingMaterial,
} from '@/lib/supabase-data'
import type { MaterialsCatalogItem } from '@/types/database.types'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import { useAuth } from '@/context/AuthContext'

// ---------------------------------------------------------------------------
// Category config — matches actual DB values
// ---------------------------------------------------------------------------

const categoryOptions = [
  'Airbricks',
  'Aquaban',
  'Cementitious Tanking',
  'DPC',
  'Floor Resin',
  'Plastering',
  'Preparatory Work',
  'Spray Treatments',
  'Timber Treatments',
  'Wall Membrane',
]

const categoryColors: Record<string, string> = {
  'Airbricks': 'bg-rose-500/20 text-rose-300',
  'Aquaban': 'bg-sky-500/20 text-sky-300',
  'Cementitious Tanking': 'bg-indigo-500/20 text-indigo-300',
  'DPC': 'bg-blue-500/20 text-blue-300',
  'Floor Resin': 'bg-amber-500/20 text-amber-300',
  'Plastering': 'bg-gray-500/20 text-gray-300',
  'Preparatory Work': 'bg-slate-500/20 text-slate-300',
  'Spray Treatments': 'bg-green-500/20 text-green-300',
  'Timber Treatments': 'bg-emerald-500/20 text-emerald-300',
  'Wall Membrane': 'bg-cyan-500/20 text-cyan-300',
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function MaterialsAdminPage() {
  const { isAdmin } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [editingMaterial, setEditingMaterial] = useState<MaterialsCatalogItem | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [sortField, setSortField] = useState<'name' | 'unit_cost' | 'category'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [materialsData, setMaterialsData] = useState<MaterialsCatalogItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteConfirm, setDeleteConfirm] = useState<MaterialsCatalogItem | null>(null)
  const [deleteRefs, setDeleteRefs] = useState<Array<{ description: string; survey_type: string }>>([])
  const [deleting, setDeleting] = useState(false)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getMaterials()
      setMaterialsData(data)
    } catch (err) {
      console.error('Failed to load materials:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadData() }, [loadData])

  const materials = useMemo(() => {
    let items = materialsData

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      items = items.filter(m =>
        (m.name ?? '').toLowerCase().includes(query) ||
        m.supplier?.toLowerCase().includes(query) ||
        m.product_key?.toLowerCase().includes(query)
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
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('asc') }
  }

  const SortIcon = ({ field }: { field: typeof sortField }) => {
    if (sortField !== field) return null
    return sortDir === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
  }

  // --- Add handler ---
  const handleAdd = async (formData: MaterialFormData) => {
    const created = await createMaterial({
      name: formData.name,
      category: formData.category,
      unit: formData.unit,
      unit_cost: formData.unit_cost,
      supplier: formData.supplier || null,
      supplier_url: formData.supplier_url || null,
      coverage: formData.coverage || null,
      default_quantity: formData.default_quantity,
      product_key: formData.product_key || null,
      coverage_m2: formData.coverage_m2 || null,
      unit_size: formData.unit_size || null,
    })
    if (created) {
      toast.success(`"${created.name}" added to catalogue`)
      setShowAddForm(false)
      await loadData()
    } else {
      toast.error('Failed to create material')
    }
  }

  // --- Edit handler ---
  const handleEdit = async (formData: MaterialFormData) => {
    if (!editingMaterial) return
    const success = await updateMaterial(editingMaterial.id, {
      name: formData.name,
      category: formData.category,
      unit: formData.unit,
      unit_cost: formData.unit_cost,
      supplier: formData.supplier || null,
      supplier_url: formData.supplier_url || null,
      coverage: formData.coverage || null,
      default_quantity: formData.default_quantity,
      product_key: formData.product_key || null,
      coverage_m2: formData.coverage_m2 || null,
      unit_size: formData.unit_size || null,
    })
    if (success) {
      toast.success(`"${formData.name}" updated`)
      setEditingMaterial(null)
      await loadData()
    } else {
      toast.error('Failed to update material')
    }
  }

  // --- Delete flow ---
  const startDelete = async (material: MaterialsCatalogItem) => {
    setDeleteConfirm(material)
    if (material.product_key) {
      const refs = await getTemplatesReferencingMaterial(material.product_key)
      setDeleteRefs(refs)
    } else {
      setDeleteRefs([])
    }
  }

  const confirmDelete = async () => {
    if (!deleteConfirm) return
    setDeleting(true)
    const result = await deleteMaterial(deleteConfirm.id, deleteConfirm.product_key)
    if (result?.deleted) {
      toast.success(
        result.soft
          ? `"${deleteConfirm.name}" deactivated (referenced by templates)`
          : `"${deleteConfirm.name}" deleted`
      )
      setDeleteConfirm(null)
      setDeleteRefs([])
      await loadData()
    } else {
      toast.error('Failed to delete material')
    }
    setDeleting(false)
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
              <p className="text-sm text-white/60 mt-1">
                {materials.length} material{materials.length !== 1 ? 's' : ''} &bull; Supplier pricing database
              </p>
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search by name, supplier or product key..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="input-field w-auto"
            >
              <option value="all">All Categories</option>
              {categoryOptions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Add Modal */}
          {showAddForm && (
            <MaterialFormModal
              onClose={() => setShowAddForm(false)}
              onSave={handleAdd}
            />
          )}

          {/* Edit Modal */}
          {editingMaterial && (
            <MaterialFormModal
              material={editingMaterial}
              onClose={() => setEditingMaterial(null)}
              onSave={handleEdit}
            />
          )}

          {/* Delete Confirmation Modal */}
          {deleteConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="glass-card w-full max-w-md p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Delete &ldquo;{deleteConfirm.name}&rdquo;?
                </h3>
                {deleteRefs.length > 0 && (
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm text-amber-300 font-medium">
                          Referenced by {deleteRefs.length} costing template{deleteRefs.length !== 1 ? 's' : ''}
                        </p>
                        <p className="text-xs text-amber-400/70 mt-1">
                          This material will be deactivated instead of deleted to preserve pricing history.
                        </p>
                        <ul className="mt-2 space-y-1">
                          {deleteRefs.slice(0, 5).map((ref, i) => (
                            <li key={i} className="text-xs text-white/50">
                              &bull; {ref.description}
                              <span className="text-white/30 ml-1">({ref.survey_type})</span>
                            </li>
                          ))}
                          {deleteRefs.length > 5 && (
                            <li className="text-xs text-white/30">
                              ...and {deleteRefs.length - 5} more
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                {deleteRefs.length === 0 && (
                  <p className="text-sm text-white/60">
                    This material is not referenced by any costing templates and will be permanently deleted.
                  </p>
                )}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => { setDeleteConfirm(null); setDeleteRefs([]) }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={deleting}
                    className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30 transition-colors flex items-center gap-2"
                  >
                    {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    {deleteRefs.length > 0 ? 'Deactivate' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Loading */}
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
                      <th className="cursor-pointer hover:bg-white/10" onClick={() => toggleSort('name')}>
                        <div className="flex items-center gap-1">
                          Material Name <SortIcon field="name" />
                        </div>
                      </th>
                      <th className="cursor-pointer hover:bg-white/10" onClick={() => toggleSort('category')}>
                        <div className="flex items-center gap-1">
                          Category <SortIcon field="category" />
                        </div>
                      </th>
                      <th>Unit</th>
                      <th className="cursor-pointer hover:bg-white/10" onClick={() => toggleSort('unit_cost')}>
                        <div className="flex items-center justify-end gap-1">
                          Unit Cost <SortIcon field="unit_cost" />
                        </div>
                      </th>
                      <th>Supplier</th>
                      <th>Coverage</th>
                      <th>Key</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map(material => (
                      <tr key={material.id}>
                        <td>
                          <p className="font-medium text-white">{material.name}</p>
                        </td>
                        <td>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColors[material.category] || 'bg-white/10 text-white/60'}`}>
                            {material.category}
                          </span>
                        </td>
                        <td className="text-white/60">{material.unit}</td>
                        <td className="text-right">
                          <span className="font-semibold text-white">
                            &pound;{material.unit_cost.toFixed(2)}
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
                          <span className="text-xs font-mono text-white/30">{material.product_key || '-'}</span>
                        </td>
                        <td>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => setEditingMaterial(material)}
                              className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-brand-400 transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => startDelete(material)}
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
      </Layout>
    </ProtectedRoute>
  )
}

// ---------------------------------------------------------------------------
// Material Form Modal
// ---------------------------------------------------------------------------

interface MaterialFormData {
  name: string
  category: string
  unit: string
  unit_cost: number
  supplier: string
  supplier_url: string
  coverage: string
  default_quantity: number
  product_key: string
  coverage_m2: number | null
  unit_size: string
}

interface MaterialFormModalProps {
  material?: MaterialsCatalogItem
  onClose: () => void
  onSave: (data: MaterialFormData) => Promise<void>
}

function MaterialFormModal({ material, onClose, onSave }: MaterialFormModalProps) {
  const [formData, setFormData] = useState<MaterialFormData>({
    name: material?.name || '',
    category: material?.category || categoryOptions[0],
    unit: material?.unit || '',
    unit_cost: material?.unit_cost || 0,
    supplier: material?.supplier || '',
    supplier_url: material?.supplier_url || '',
    coverage: material?.coverage || '',
    default_quantity: material?.default_quantity || 0,
    product_key: material?.product_key || '',
    coverage_m2: material?.coverage_m2 ?? null,
    unit_size: material?.unit_size || '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [templateRefs, setTemplateRefs] = useState<Array<{ description: string; survey_type: string }>>([])
  const [loadingRefs, setLoadingRefs] = useState(false)

  // Load template references when editing
  useEffect(() => {
    if (material?.product_key) {
      setLoadingRefs(true)
      getTemplatesReferencingMaterial(material.product_key)
        .then(setTemplateRefs)
        .finally(() => setLoadingRefs(false))
    }
  }, [material?.product_key])

  const set = (field: keyof MaterialFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.name.trim()) { setError('Name is required'); return }
    if (!formData.category) { setError('Category is required'); return }
    if (formData.unit_cost <= 0) { setError('Unit cost must be greater than 0'); return }

    // product_key uniqueness
    if (formData.product_key.trim()) {
      const unique = await isProductKeyUnique(formData.product_key.trim(), material?.id)
      if (!unique) {
        setError(`Product key "${formData.product_key}" already exists`)
        return
      }
    }

    setSaving(true)
    await onSave(formData)
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {material ? 'Edit Material' : 'Add New Material'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-white/50">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Error banner */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Template impact indicator (edit mode only) */}
          {material && templateRefs.length > 0 && (
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-start gap-2">
                <Link2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-blue-300 font-medium">
                    Linked to {templateRefs.length} costing template{templateRefs.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-blue-400/70 mt-0.5">
                    Price changes will flow through to affected costings automatically.
                  </p>
                  <ul className="mt-1.5 space-y-0.5">
                    {templateRefs.slice(0, 5).map((ref, i) => (
                      <li key={i} className="text-xs text-white/50">
                        &bull; {ref.description}
                        <span className="text-white/30 ml-1">({ref.survey_type})</span>
                      </li>
                    ))}
                    {templateRefs.length > 5 && (
                      <li className="text-xs text-white/30">
                        ...and {templateRefs.length - 5} more
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
          {material && loadingRefs && (
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Loader2 className="w-3 h-3 animate-spin" /> Checking template links...
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-1.5">Material Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => set('name', e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Category *</label>
              <select
                value={formData.category}
                onChange={e => set('category', e.target.value)}
                className="input-field"
                required
              >
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Product Key</label>
              <input
                type="text"
                value={formData.product_key}
                onChange={e => set('product_key', e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                className="input-field font-mono text-sm"
                placeholder="e.g., sbr_latex_5ltr"
              />
              <p className="text-xs text-white/30 mt-1">Unique key for pricing engine lookups</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Unit *</label>
              <input
                type="text"
                value={formData.unit}
                onChange={e => set('unit', e.target.value)}
                className="input-field"
                placeholder="e.g., Per roll, Each, Per bag"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Unit Cost (&pound;) *</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={formData.unit_cost}
                onChange={e => set('unit_cost', parseFloat(e.target.value) || 0)}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Coverage (m&sup2;)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.coverage_m2 ?? ''}
                onChange={e => set('coverage_m2', e.target.value ? parseFloat(e.target.value) : null)}
                className="input-field"
                placeholder="e.g., 5.00"
              />
              <p className="text-xs text-white/30 mt-1">Area per purchase unit (for coverage formulas)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Unit Size</label>
              <input
                type="text"
                value={formData.unit_size}
                onChange={e => set('unit_size', e.target.value)}
                className="input-field"
                placeholder="e.g., 5ltr Container, 25kg Bag"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Supplier</label>
              <input
                type="text"
                value={formData.supplier}
                onChange={e => set('supplier', e.target.value)}
                className="input-field"
                placeholder="e.g., Preservation Shop"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-1.5">Supplier URL</label>
              <input
                type="url"
                value={formData.supplier_url}
                onChange={e => set('supplier_url', e.target.value)}
                className="input-field"
                placeholder="https://..."
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-1.5">Coverage / Notes</label>
              <input
                type="text"
                value={formData.coverage}
                onChange={e => set('coverage', e.target.value)}
                className="input-field"
                placeholder="e.g., 10 M2 per container"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {material ? 'Update Material' : 'Add Material'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
