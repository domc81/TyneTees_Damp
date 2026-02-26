'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  PoundSterling,
  Search,
  ArrowLeft,
  Package,
} from 'lucide-react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import { getSupabase } from '@/lib/supabase-client'

interface CostingLineTemplate {
  id: string
  section_id: string
  line_key: string
  description: string
  uom: string
  base_unit_cost: number
  wastage_factor: number
  coverage_rate: number | null
  material_markup: number
  labour_rate_per_unit: number
  labour_markup: number
  cost_formula: string
  formula_params: Record<string, unknown>
  display_order: number
  is_active: boolean
}

interface CostingSection {
  id: string
  survey_type: string
  section_key: string
  section_name: string
  display_order: number
  is_optional: boolean
}

export default function PricingItemsPage() {
  const [templates, setTemplates] = useState<CostingLineTemplate[]>([])
  const [sections, setSections] = useState<CostingSection[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sectionFilter, setSectionFilter] = useState<string>('all')

  useEffect(() => {
    async function load() {
      try {
        const supabase = getSupabase()
        const [{ data: tplData }, { data: secData }] = await Promise.all([
          supabase.from('costing_line_templates').select('*').order('section_id'),
          supabase.from('costing_sections').select('*').order('display_order'),
        ])
        setTemplates(tplData || [])
        setSections(secData || [])
      } catch (err) {
        console.error('Failed to load pricing items:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = (t.description ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSection = sectionFilter === 'all' || t.section_id === sectionFilter
    return matchesSearch && matchesSection
  })

  const getSectionLabel = (sectionId: string) => {
    return sections.find(s => s.id === sectionId)?.section_name || sectionId
  }

  const formulaTypeColors: Record<string, string> = {
    standard: 'bg-blue-500/20 text-blue-300',
    ceiling_coverage: 'bg-cyan-500/20 text-cyan-300',
    dpc_injection: 'bg-green-500/20 text-green-300',
    compound_material: 'bg-purple-500/20 text-purple-300',
    fixed_price: 'bg-amber-500/20 text-amber-300',
    tiered_disposal: 'bg-red-500/20 text-red-300',
    bag_and_cart: 'bg-orange-500/20 text-orange-300',
    skip_hire: 'bg-emerald-500/20 text-emerald-300',
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
                <PoundSterling className="w-6 h-6 text-green-400" />
                Pricing Items
              </h2>
              <p className="text-sm text-white/60 mt-1">
                {templates.length} costing line templates across {sections.length} sections
              </p>
            </div>
          </div>

          {/* Info Banner */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-sm text-blue-300">
              These items are managed by the costing engine. Each template defines a formula type,
              default quantities, and parameters used to calculate material and labour costs automatically.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search pricing items..."
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
              {sections.map(s => (
                <option key={s.id} value={s.id}>{s.section_name}</option>
              ))}
            </select>
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="spinner mx-auto mb-4" />
                <p className="text-white/60">Loading pricing items...</p>
              </div>
            </div>
          ) : (
            <div className="section-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table-base">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Section</th>
                      <th>Formula</th>
                      <th>UoM</th>
                      <th className="text-right">Unit Cost</th>
                      <th className="text-right">Labour Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTemplates.map((template) => (
                      <tr key={template.id}>
                        <td>
                          <p className="font-medium text-white">{template.description || '-'}</p>
                        </td>
                        <td>
                          <span className="text-white/60">{getSectionLabel(template.section_id)}</span>
                        </td>
                        <td>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${(template.cost_formula && formulaTypeColors[template.cost_formula]) || 'bg-white/10 text-white/60'}`}>
                            {template.cost_formula || '-'}
                          </span>
                        </td>
                        <td className="text-white/60">{template.uom || '-'}</td>
                        <td className="text-right text-white/60">{template.base_unit_cost != null ? `£${Number(template.base_unit_cost).toFixed(2)}` : '-'}</td>
                        <td className="text-right text-white/60">{template.labour_rate_per_unit != null ? `£${Number(template.labour_rate_per_unit).toFixed(2)}` : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredTemplates.length === 0 && (
                <div className="p-12 text-center">
                  <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50">No pricing items found matching your criteria</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
