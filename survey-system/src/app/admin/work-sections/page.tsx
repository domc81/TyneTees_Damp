'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Wrench,
  Edit2,
  Save,
  X,
  GripVertical,
  Check,
  Plus,
} from 'lucide-react'
import { getWorkSections, getPricingItems } from '@/lib/supabase-data'
import type { WorkSection, PricingItem } from '@/types/database.types'

export default function WorkSectionsAdminPage() {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [sections, setSections] = useState<WorkSection[]>([])
  const [pricingItems, setPricingItems] = useState<PricingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
        setError(null)
      } catch (err) {
        console.error('Failed to load data:', err)
        setError('Failed to load data. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

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
              <Wrench className="w-6 h-6 text-amber-600" />
              Work Sections
            </h1>
            <p className="text-sm text-surface-500">{sections.length} sections • Configure work categories</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Section
          </button>
        </div>
      </header>

      <div className="p-8 max-w-4xl mx-auto">
        {/* Info Banner */}
        <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-800">
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

        {/* Sections List */}
        <div className="space-y-3">
          {sections.map((section, index) => {
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
                    <div className="flex items-center gap-3 text-surface-400 cursor-grab">
                      <GripVertical className="w-5 h-5" />
                      <span className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center text-sm font-medium text-surface-600">
                        {section.display_order}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-surface-900">{section.name}</h3>
                        {section.is_optional && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700">
                            Optional
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-surface-500 mt-0.5">{section.description}</p>
                      <p className="text-xs text-surface-400 mt-1">
                        {itemCount} pricing item{itemCount !== 1 ? 's' : ''}
                      </p>
                    </div>

                    <button
                      onClick={() => setEditingId(section.id)}
                      className="p-2 rounded-lg hover:bg-surface-100 text-surface-500 hover:text-brand-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
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
    </div>
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
          <label className="input-label">Section Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="col-span-2">
          <label className="input-label">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="input-label">Display Order</label>
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
              className="w-4 h-4 text-brand-600 rounded border-surface-300"
            />
            <span className="text-sm text-surface-700">Optional section</span>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="p-6 border-b border-surface-100 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-surface-900">
            {section ? 'Edit Work Section' : 'Add New Work Section'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-100 text-surface-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!section && (
            <div>
              <label className="input-label">Section ID *</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                className="input-field"
                placeholder="e.g., new_section"
                required
              />
              <p className="text-xs text-surface-400 mt-1">Lowercase with underscores, no spaces</p>
            </div>
          )}

          <div>
            <label className="input-label">Section Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="input-label">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="input-label">Display Order</label>
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
                  className="w-4 h-4 text-brand-600 rounded border-surface-300"
                />
                <span className="text-sm text-surface-700">Optional section</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-surface-100">
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
