'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Package,
  Search,
  Droplets,
  Shield,
  Paintbrush,
  Thermometer,
  Wind,
  SprayCan,
  Hammer,
  ExternalLink,
} from 'lucide-react'
import { MATERIALS_CATALOG, type MaterialCatalogEntry } from '@/lib/pricing-database'

// Simple icon component wrapper
const Icon = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, typeof Package> = {
    Droplets,
    Shield,
    Paintbrush,
    Thermometer,
    Wind,
    SprayCan,
    Hammer,
    Package,
  }
  const IconComponent = icons[name] || Package
  return <IconComponent className={className} />
}

const categoryConfig: Record<string, { label: string; color: string; iconName: string }> = {
  prep: { label: 'Preparatory', color: 'text-surface-600', iconName: 'Hammer' },
  dpc: { label: 'DPC', color: 'text-blue-600', iconName: 'Shield' },
  membrane: { label: 'Membrane', color: 'text-cyan-600', iconName: 'Droplets' },
  tanking: { label: 'Tanking', color: 'text-indigo-600', iconName: 'Shield' },
  resin_floor: { label: 'Resin Floor', color: 'text-amber-600', iconName: 'Thermometer' },
  plastering: { label: 'Plastering', color: 'text-surface-500', iconName: 'Paintbrush' },
  insulation: { label: 'Insulation', color: 'text-orange-600', iconName: 'Thermometer' },
  ventilation: { label: 'Ventilation', color: 'text-teal-600', iconName: 'Wind' },
  treatment: { label: 'Treatment', color: 'text-green-600', iconName: 'SprayCan' },
  external: { label: 'External', color: 'text-emerald-600', iconName: 'Shield' },
}

export const dynamic = 'force-dynamic'

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  // Convert materials catalog to array and sort
  const materials = Object.values(MATERIALS_CATALOG).sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  // Filter materials
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || material.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Group by category
  const groupedMaterials = filteredMaterials.reduce((acc, material) => {
    if (!acc[material.category]) {
      acc[material.category] = []
    }
    acc[material.category].push(material)
    return acc
  }, {} as Record<string, MaterialCatalogEntry[]>)

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-surface-200 px-8 py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-lg hover:bg-surface-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-surface-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-surface-900 flex items-center gap-3">
              <Package className="w-6 h-6 text-brand-600" />
              Materials Catalog
            </h1>
            <p className="text-sm text-surface-500">{materials.length} materials available</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mt-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              placeholder="Search materials..."
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
            {Object.entries(categoryConfig).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="p-8">
        {filteredMaterials.length === 0 ? (
          <div className="empty-state">
            <Package className="empty-state-icon" />
            <p className="empty-state-title">No materials found</p>
            <p className="empty-state-description">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedMaterials).map(([category, categoryMaterials]) => {
              const config = categoryConfig[category] || { label: category, color: 'text-surface-600', iconName: 'Package' }

              return (
                <div key={category}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-surface-100 ${config.color}`}>
                      <Icon name={config.iconName} className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-semibold text-surface-900">{config.label}</h2>
                    <span className="text-sm text-surface-500">({categoryMaterials.length} items)</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {categoryMaterials.map((material) => (
                      <MaterialCard key={material.id} material={material} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function MaterialCard({ material }: { material: MaterialCatalogEntry }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="section-card hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-surface-900 pr-2">{material.name}</h3>
          <span className="text-lg font-bold text-brand-600 whitespace-nowrap">£{material.unit_cost.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-surface-500 mb-3 flex-wrap">
          <span className="px-2 py-0.5 bg-surface-100 rounded">{material.unit}</span>
          {material.supplier && (
            <span className="px-2 py-0.5 bg-brand-50 text-brand-700 rounded">
              {material.supplier}
            </span>
          )}
        </div>

        {showDetails && (
          <div className="text-sm text-surface-600 mb-3 pb-3 border-b border-surface-100">
            <p><strong>Coverage:</strong> {material.coverage}</p>
            {material.supplier_url && (
              <a
                href={material.supplier_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-brand-600 hover:text-brand-700 mt-2"
              >
                View on website <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-brand-600 hover:text-brand-700 font-medium"
        >
          {showDetails ? 'Hide details' : 'Show details'}
        </button>
      </div>
    </div>
  )
}
