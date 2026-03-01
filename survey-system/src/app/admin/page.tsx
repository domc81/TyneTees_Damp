'use client'

import Link from 'next/link'
import {
  Database,
  Package,
  Clock,
  Wrench,
  Settings,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'

const adminSections = [
  {
    id: 'materials',
    title: 'Materials Catalog',
    description: 'Manage supplier materials, pricing, and coverage details',
    icon: Package,
    href: '/admin/materials',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    count: '35+ items',
  },
  {
    id: 'work-sections',
    title: 'Work Sections',
    description: 'Define work categories and optional sections',
    icon: Wrench,
    href: '/admin/work-sections',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    count: '14 sections',
  },
  {
    id: 'base-rates',
    title: 'Base Rates & Markups',
    description: 'Configure labor rates, contractor rates, and markup percentages',
    icon: Clock,
    href: '/admin/rates',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    count: 'Core settings',
  },
]

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6 max-w-5xl">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Database className="w-6 h-6 text-brand-400" />
                Database Admin
              </h2>
              <p className="text-sm text-white/60 mt-1">Manage pricing databases and system configurations</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-300">Admin Only</span>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-300">Admin Access Required</h3>
                <p className="text-sm text-amber-400/80 mt-1">
                  Changes made here affect all pricing calculations across the system.
                  When authentication is enabled, only admin users will have access to this section.
                </p>
              </div>
            </div>
          </div>

          {/* Admin Sections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                        <h3 className="font-semibold text-white group-hover:text-brand-300 transition-colors">
                          {section.title}
                        </h3>
                        <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-brand-400 transition-colors" />
                      </div>
                      <p className="text-sm text-white/50 mt-1">{section.description}</p>
                      <span className="inline-block mt-3 text-xs font-medium text-white/40 bg-white/5 px-2 py-1 rounded">
                        {section.count}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Quick Stats */}
          <div className="section-card p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-white/50" />
              System Overview
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-2xl font-bold text-white">35+</p>
                <p className="text-sm text-white/50">Materials</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-2xl font-bold text-white">14</p>
                <p className="text-sm text-white/50">Work Sections</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-2xl font-bold text-white">£30.63</p>
                <p className="text-sm text-white/50">Base Labor Rate</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
