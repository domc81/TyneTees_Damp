'use client'

import { useState, useEffect } from 'react'
import {
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
import { getMaterials } from '@/lib/supabase-data'
import type { MaterialsCatalogItem } from '@/types/database.types'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'

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
  prep: { label: 'Preparatory', color: 'text-white/70', iconName: 'Hammer' },
  dpc: { label: 'DPC', color: 'text-blue-400', iconName: 'Shield' },
  membrane: { label: 'Membrane', color: 'text-cyan-400', iconName: 'Droplets' },
  tanking: { label: 'Tanking', color: 'text-indigo-400', iconName: 'Shield' },
  resin_floor: { label: 'Resin Floor', color: 'text-amber-400', iconName: 'Thermometer' },
  plastering: { label: 'Plastering', color: 'text-white/60', iconName: 'Paintbrush' },
  insulation: { label: 'Insulation', color: 'text-orange-400', iconName: 'Thermometer' },
  ventilation: { label: 'Ventilation', color: 'text-teal-400', iconName: 'Wind' },
  treatment: { label: 'Treatment', color: 'text-green-400', iconName: 'SprayCan' },
  external: { label: 'External', color: 'text-emerald-400', iconName: 'Shield' },
}

export const dynamic = 'force-dynamic'

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<MaterialsCatalogItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  useEffect(() => {
    async function load() {
      try {
        const data = await getMaterials()
        setMaterials(data)
      } catch (err) {
        console.error('Error loading materials:', err)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = (material.name ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || material.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const groupedMaterials = filteredMaterials.reduce((acc, material) => {
    if (!acc[material.category]) {
      acc[material.category] = []
    }
    acc[material.category].push(material)
    return acc
  }, {} as Record<string, MaterialsCatalogItem[]>)

  return (
    <ProtectedRoute>
      <Layout>
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="spinner mx-auto mb-4" />
              <p className="text-white/60">Loading materials...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Package className="w-6 h-6 text-brand-400" />
                Materials Catalog
              </h2>
              <p className="text-sm text-white/60 mt-1">{materials.length} materials available</p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
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

            {filteredMaterials.length === 0 ? (
              <div className="empty-state">
                <Package className="empty-state-icon" />
                <p className="empty-state-title">No materials found</p>
                <p className="empty-state-description">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedMaterials).map(([category, categoryMaterials]) => {
                  const config = categoryConfig[category] || { label: category, color: 'text-white/60', iconName: 'Package' }

                  return (
                    <div key={category}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg bg-white/5 ${config.color}`}>
                          <Icon name={config.iconName} className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">{config.label}</h3>
                        <span className="text-sm text-white/50">({categoryMaterials.length} items)</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        )}
      </Layout>
    </ProtectedRoute>
  )
}

function MaterialCard({ material }: { material: MaterialsCatalogItem }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="section-card hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-white pr-2">{material.name}</h3>
          <span className="text-lg font-bold text-brand-400 whitespace-nowrap">£{material.unit_cost.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-white/50 mb-3 flex-wrap">
          <span className="px-2 py-0.5 bg-white/5 rounded">{material.unit}</span>
          {material.supplier && (
            <span className="px-2 py-0.5 bg-brand-500/10 text-brand-300 rounded">
              {material.supplier}
            </span>
          )}
        </div>

        {showDetails && (
          <div className="text-sm text-white/60 mb-3 pb-3 border-b border-white/10">
            <p><strong className="text-white/80">Coverage:</strong> {material.coverage}</p>
            {material.supplier_url && (
              <a
                href={material.supplier_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-brand-400 hover:text-brand-300 mt-2"
              >
                View on website <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-brand-400 hover:text-brand-300 font-medium"
        >
          {showDetails ? 'Hide details' : 'Show details'}
        </button>
      </div>
    </div>
  )
}
