'use client'

import Link from 'next/link'
import {
  Settings,
  Database,
  Shield,
  Bell,
  Palette,
  Building2,
  ChevronRight,
} from 'lucide-react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'

const settingsSections = [
  {
    id: 'admin',
    title: 'Database Admin',
    description: 'Manage materials, pricing items, work sections, and base rates',
    icon: Database,
    href: '/admin',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    badge: 'Admin Only',
  },
  {
    id: 'company',
    title: 'Company Profile',
    description: 'Update company name, logo, and contact details',
    icon: Building2,
    href: '/settings/company',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    badge: null,
  },
  {
    id: 'security',
    title: 'Security & Authentication',
    description: 'User management, permissions, and login settings',
    icon: Shield,
    href: '/settings/security',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    badge: 'Coming Soon',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Email alerts and notification preferences',
    icon: Bell,
    href: '/settings/notifications',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    badge: 'Coming Soon',
  },
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Theme, branding, and display preferences',
    icon: Palette,
    href: '/settings/appearance',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    badge: 'Coming Soon',
  },
]

export default function SettingsIndexPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Settings className="w-6 h-6 text-brand-400" />
              Settings
            </h2>
            <p className="text-sm text-white/60 mt-1">System configuration and preferences</p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-3">
            {settingsSections.map((section) => {
              const Icon = section.icon
              const isDisabled = section.badge === 'Coming Soon'

              return (
                <Link
                  key={section.id}
                  href={isDisabled ? '#' : section.href}
                  className={`section-card p-5 flex items-center gap-4 transition-all duration-200 ${
                    isDisabled
                      ? 'opacity-60 cursor-not-allowed'
                      : 'hover:shadow-md group'
                  }`}
                  onClick={(e) => isDisabled && e.preventDefault()}
                >
                  <div className={`p-3 rounded-xl ${section.bgColor}`}>
                    <Icon className={`w-6 h-6 ${section.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className={`font-semibold text-white ${!isDisabled ? 'group-hover:text-brand-300' : ''} transition-colors`}>
                        {section.title}
                      </h3>
                      {section.badge && (
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          section.badge === 'Admin Only'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-white/10 text-white/50'
                        }`}>
                          {section.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/50 mt-0.5">{section.description}</p>
                  </div>
                  {!isDisabled && (
                    <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-brand-400 transition-colors" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Info Note */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-white/60">
              <strong className="text-white/80">Note:</strong> Additional settings will be available when authentication
              and user roles are enabled. The Database Admin section is currently accessible
              to all users but will be restricted to administrators in production.
            </p>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
