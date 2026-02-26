'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Wrench,
  Edit2,
  Save,
  X,
  GripVertical,
  Plus,
  ArrowLeft,
} from 'lucide-react'
import { getWorkSections, getPricingItems } from '@/lib/supabase-data'
import type { WorkSection, PricingItem } from '@/types/database.types'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'

export default function WorkSectionsAdminPage() {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [sections, setSections] = useState<WorkSection[]>([])
  const [pricingItems, setPricingItems] = useState<PricingItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [sectionsData, itemsData] = await Promise.all([
          getWorkSections(),
          getPricingItems()
        ])
        setSections(sectionsData.sort((a, b) => a.display_order - b.display_order))
        setPricingItems(itemsData)
      } catch (err) {
        console.error('Failed to load data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

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
                <Wrench className="w-6 h-6 text-amber-400" />
                Work Sections
              </h2>
              <p className="text-sm text-white/60 mt-1">{sections.length} sections &bull; Configure work categories</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Section
            </button>
          </div>

          {/* Info Banner */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-sm text-blue-300">
              Work sections organize pricing items in the calculator. Optional sections can be toggled
              on/off by surveyors. The display order controls how they appear in quotes.
            </p>
          </div>

          {/* Add Form Modal */}
          {showAddForm && (
            <SectionFormModal
              onClose={() => setShowAddForm(false)}
              onSave={(data) => {
                console.log('Adding section:', data)
                alert('Section saved (demo mode - data not persisted)')
                setShowAddForm(false)
              }}
            />
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="spinner mx-auto mb-4" />
                <p className="text-white/60">Loading work sections...</p>
              </div>
            </div>
          ) : (
            /* Sections List */
            <div className="space-y-3">
              {sections.map((section) => {
                const itemCount = pricingItems.filter(item => item.section_id === section.id).length
                const isEditing = editingId === section.id

                return (
                  <div
                    key={section.id}
                    className={`section-card p-4 ${isEditing ? 'ring-2 ring-brand-500' : ''}`}
                  >
                    {isEditing ? (
                      <SectionEditForm
                        section={section}
                        onCancel={() => setEditingId(null)}
                        onSave={(data) => {
                          console.log('Updating section:', section.id, data)
                          alert('Section updated (demo mode)')
                          setEditingId(null)
                        }}
                      />
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 text-white/30 cursor-grab">
                          <GripVertical className="w-5 h-5" />
                          <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm font-medium text-white/60">
                            {section.display_order}
                          </span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-white">{section.name}</h3>
                            {section.is_optional && (
                              <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-500/20 text-amber-300">
                                Optional
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-white/50 mt-0.5">{section.description}</p>
                          <p className="text-xs text-white/30 mt-1">
                            {itemCount} pricing item{itemCount !== 1 ? 's' : ''}
                          </p>
                        </div>

                        <button
                          onClick={() => setEditingId(section.id)}
                          className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-brand-400 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingId && (
          <SectionFormModal
            section={sections.find(s => s.id === editingId)}
            onClose={() => setEditingId(null)}
            onSave={(data) => {
              console.log('Updating section:', editingId, data)
              alert('Section updated (demo mode)')
              setEditingId(null)
            }}
          />
        )}
      </Layout>
    </ProtectedRoute>
  )
}

interface SectionEditFormProps {
  section: WorkSection
  onCancel: () => void
  onSave: (data: Partial<WorkSection>) => void
}

function SectionEditForm({ section, onCancel, onSave }: SectionEditFormProps) {
  const [name, setName] = useState(section.name)
  const [description, setDescription] = useState(section.description || '')
  const [isOptional, setIsOptional] = useState(section.is_optional)
  const [displayOrder, setDisplayOrder] = useState(section.display_order)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-white/70 mb-1.5">Section Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-white/70 mb-1.5">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Display Order</label>
          <input
            type="number"
            min="1"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
            className="input-field w-24"
          />
        </div>
        <div className="flex items-end pb-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isOptional}
              onChange={(e) => setIsOptional(e.target.checked)}
              className="w-4 h-4 text-brand-600 rounded border-white/20"
            />
            <span className="text-sm text-white/70">Optional section</span>
          </label>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button
          onClick={() => onSave({ name, description, is_optional: isOptional, display_order: displayOrder })}
          className="btn-primary flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>
    </div>
  )
}

interface SectionFormModalProps {
  section?: WorkSection
  onClose: () => void
  onSave: (data: Partial<WorkSection>) => void
}

function SectionFormModal({ section, onClose, onSave }: SectionFormModalProps) {
  const [formData, setFormData] = useState({
    id: section?.id || '',
    name: section?.name || '',
    description: section?.description || '',
    is_optional: section?.is_optional || false,
    display_order: section?.display_order || 15,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass-card w-full max-w-lg">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {section ? 'Edit Work Section' : 'Add New Work Section'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-white/50">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!section && (
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Section ID *</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                className="input-field"
                placeholder="e.g., new_section"
                required
              />
              <p className="text-xs text-white/40 mt-1">Lowercase with underscores, no spaces</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Section Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Display Order</label>
              <input
                type="number"
                min="1"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                className="input-field"
              />
            </div>
            <div className="flex items-end pb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_optional}
                  onChange={(e) => setFormData({ ...formData, is_optional: e.target.checked })}
                  className="w-4 h-4 text-brand-600 rounded border-white/20"
                />
                <span className="text-sm text-white/70">Optional section</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center gap-2">
              <Save className="w-4 h-4" />
              {section ? 'Update Section' : 'Add Section'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
