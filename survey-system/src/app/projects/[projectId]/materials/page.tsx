'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Package,
  Printer,
  Download,
  Check,
  Truck,
  ShoppingCart,
} from 'lucide-react'
import { getProject, getProjectSections, getProjectItems } from '@/lib/store'
import { formatCurrency, calculateLineItemTotal } from '@/lib/cost-calculator'

interface MaterialItem {
  name: string
  category: string
  quantity: number
  uom: string
  unitRate: number
  totalCost: number
  section: string
  supplier?: string
}

export default function MaterialsListPage({ params }: { params: { projectId: string } }) {
  const [project, setProject] = useState<any>(null)
  const [materials, setMaterials] = useState<MaterialItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const projectData = getProject(params.projectId)
    if (projectData) {
      setProject(projectData)
      const sections = getProjectSections(params.projectId)
      const items = getProjectItems(params.projectId)

      // Extract and aggregate materials from line items
      const materialItems: MaterialItem[] = items
        .filter(item => item.is_active !== false && item.category === 'materials')
        .map(item => {
          const calc = calculateLineItemTotal(item)
          const section = sections.find(s => s.id === item.section_id)
          return {
            name: item.item_name,
            category: 'General',
            quantity: calc.quantity,
            uom: item.uom || 'Each',
            unitRate: item.unit_rate || 0,
            totalCost: calc.materialCost,
            section: section?.section_name || 'Other',
          }
        })

      setMaterials(materialItems)
    }
    setIsLoading(false)
  }, [params.projectId])

  const totalMaterialCost = materials.reduce((sum, item) => sum + item.totalCost, 0)

  // Group materials by section
  const materialsBySection = materials.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = []
    }
    acc[item.section].push(item)
    return acc
  }, {} as Record<string, MaterialItem[]>)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="spinner" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-surface-900">Project not found</h2>
          <Link href="/projects" className="btn-primary mt-4 inline-block">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-surface-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/projects/${params.projectId}`} className="p-2 rounded-lg hover:bg-surface-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-surface-600" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-surface-900">Materials List</h1>
              <p className="text-sm text-surface-500">{project.project_number} • {project.client_name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button className="btn-primary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="section-card p-6">
              <p className="text-sm text-surface-500">Total Items</p>
              <p className="text-2xl font-bold text-surface-900">{materials.length}</p>
            </div>
            <div className="section-card p-6">
              <p className="text-sm text-surface-500">Material Cost</p>
              <p className="text-2xl font-bold text-surface-900">{formatCurrency(totalMaterialCost)}</p>
            </div>
            <div className="section-card p-6">
              <p className="text-sm text-surface-500">Sections</p>
              <p className="text-2xl font-bold text-surface-900">{Object.keys(materialsBySection).length}</p>
            </div>
            <div className="section-card p-6 bg-brand-50 border-brand-200">
              <p className="text-sm text-brand-700">Procurement Status</p>
              <p className="text-2xl font-bold text-brand-600">Not Ordered</p>
            </div>
          </div>

          {/* Materials by Section */}
          {Object.keys(materialsBySection).length === 0 ? (
            <div className="section-card p-12 text-center">
              <Package className="w-12 h-12 text-surface-300 mx-auto mb-4" />
              <p className="text-lg font-semibold text-surface-900">No materials yet</p>
              <p className="text-surface-500 mt-1">Add materials in the Costing section to see them here</p>
              <Link href={`/costing/${params.projectId}`} className="btn-primary mt-4 inline-block">
                Go to Costing
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(materialsBySection).map(([section, items]) => (
                <div key={section} className="section-card">
                  <div className="section-card-header flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-brand-600" />
                      <h3 className="font-semibold text-surface-900">{section}</h3>
                    </div>
                    <span className="text-lg font-bold text-brand-600">
                      {formatCurrency(items.reduce((sum, item) => sum + item.totalCost, 0))}
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-t border-surface-100">
                          <th className="text-left py-3 px-6 text-sm font-medium text-surface-500">Item</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-surface-500">Quantity</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-surface-500">Unit Rate</th>
                          <th className="text-right py-3 px-6 text-sm font-medium text-surface-500">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-100">
                        {items.map((item, index) => (
                          <tr key={index}>
                            <td className="py-3 px-6">
                              <p className="font-medium text-surface-900">{item.name}</p>
                            </td>
                            <td className="py-3 px-4 text-right text-surface-600">
                              {item.quantity.toFixed(2)} {item.uom}
                            </td>
                            <td className="py-3 px-4 text-right text-surface-600">
                              {formatCurrency(item.unitRate)}
                            </td>
                            <td className="py-3 px-6 text-right font-medium text-surface-900">
                              {formatCurrency(item.totalCost)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Procurement Actions */}
          {materials.length > 0 && (
            <div className="mt-8 p-6 bg-brand-50 rounded-xl border border-brand-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-brand-100">
                    <ShoppingCart className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-900">Ready to Order</h3>
                    <p className="text-sm text-brand-700">Generate a procurement order for these materials</p>
                  </div>
                </div>
                <button className="btn-primary flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Create Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
