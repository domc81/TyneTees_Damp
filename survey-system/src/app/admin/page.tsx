'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  Database,
  Package,
  Clock,
  PoundSterling,
  Wrench,
  Settings,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'

const adminSections = [
  {
    id: 'materials',
    title: 'Materials Catalog',
    description: 'Manage supplier materials, pricing, and coverage details',
    icon: Package,
    href: '/admin/materials',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    count: '35+ items',
  },
  {
    id: 'pricing-items',
    title: 'Pricing Items',
    description: 'Work items with material costs and labor hours',
    icon: PoundSterling,
    href: '/admin/pricing-items',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    count: '80+ items',
  },
  {
    id: 'work-sections',
    title: 'Work Sections',
    description: 'Define work categories and optional sections',
    icon: Wrench,
    href: '/admin/work-sections',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    count: '14 sections',
  },
  {
    id: 'base-rates',
    title: 'Base Rates & Markups',
    description: 'Configure labor rates, contractor rates, and markup percentages',
    icon: Clock,
    href: '/admin/rates',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    count: 'Core settings',
  },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-surface-200 px-8 py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-lg hover:bg-surface-100 transition-colors" title="Back to Dashboard">
            <ArrowLeft className="w-5 h-5 text-surface-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-surface-900 flex items-center gap-3">
              <Database className="w-6 h-6 text-brand-600" />
              Database Admin
            </h1>
            <p className="text-sm text-surface-500">Manage pricing databases and system configurations</p>
          </div>
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">Admin Only</span>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-5xl mx-auto">
        {/* Warning Banner */}
        <div className="mb-8 p-4 rounded-lg bg-amber-50 border border-amber-200">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800">Admin Access Required</h3>
              <p className="text-sm text-amber-700 mt-1">
                Changes made here affect all pricing calculations across the system.
                When authentication is enabled, only admin users will have access to this section.
              </p>
            </div>
          </div>
        </div>

        {/* Admin Sections Grid */}
        <div className="grid grid-cols-2 gap-6">
          {adminSections.map((section) => {
            const Icon = section.icon
            return (
              <Link
                key={section.id}
                href={section.href}
                className="section-card p-6 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${section.bgColor}`}>
                    <Icon className={`w-6 h-6 ${section.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-surface-900 group-hover:text-brand-600 transition-colors">
                        {section.title}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-surface-400 group-hover:text-brand-500 transition-colors" />
                    </div>
                    <p className="text-sm text-surface-500 mt-1">{section.description}</p>
                    <span className="inline-block mt-3 text-xs font-medium text-surface-400 bg-surface-100 px-2 py-1 rounded">
                      {section.count}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 section-card p-6">
          <h3 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-surface-500" />
            System Overview
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-surface-50 rounded-lg">
              <p className="text-2xl font-bold text-surface-900">35+</p>
              <p className="text-sm text-surface-500">Materials</p>
            </div>
            <div className="p-4 bg-surface-50 rounded-lg">
              <p className="text-2xl font-bold text-surface-900">80+</p>
              <p className="text-sm text-surface-500">Pricing Items</p>
            </div>
            <div className="p-4 bg-surface-50 rounded-lg">
              <p className="text-2xl font-bold text-surface-900">14</p>
              <p className="text-sm text-surface-500">Work Sections</p>
            </div>
            <div className="p-4 bg-surface-50 rounded-lg">
              <p className="text-2xl font-bold text-surface-900">£30.63</p>
              <p className="text-sm text-surface-500">Base Labor Rate</p>
            </div>
          </div>
        </div>

        {/* Data Source Note */}
        <div className="mt-6 p-4 rounded-lg bg-surface-100 border border-surface-200">
          <p className="text-sm text-surface-600">
            <strong>Data Source:</strong> All pricing data originates from your Excel workbook
            (Damp Costing v48 CF). The database is designed for migration to Supabase PostgreSQL
            when you're ready for live deployment.
          </p>
        </div>
      </div>
    </div>
  )
}
