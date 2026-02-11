'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  Settings,
  Database,
  Shield,
  Bell,
  Palette,
  Building2,
  ChevronRight,
} from 'lucide-react'

const settingsSections = [
  {
    id: 'admin',
    title: 'Database Admin',
    description: 'Manage materials, pricing items, work sections, and base rates',
    icon: Database,
    href: '/admin',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    badge: 'Admin Only',
  },
  {
    id: 'company',
    title: 'Company Profile',
    description: 'Update company name, logo, and contact details',
    icon: Building2,
    href: '/settings/company',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    badge: null,
  },
  {
    id: 'security',
    title: 'Security & Authentication',
    description: 'User management, permissions, and login settings',
    icon: Shield,
    href: '/settings/security',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    badge: 'Coming Soon',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Email alerts and notification preferences',
    icon: Bell,
    href: '/settings/notifications',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    badge: 'Coming Soon',
  },
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Theme, branding, and display preferences',
    icon: Palette,
    href: '/settings/appearance',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    badge: 'Coming Soon',
  },
]

export default function SettingsIndexPage() {
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
              <Settings className="w-6 h-6 text-brand-600" />
              Settings
            </h1>
            <p className="text-sm text-surface-500">System configuration and preferences</p>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-4xl mx-auto">
        {/* Settings Sections */}
        <div className="space-y-4">
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
                    <h3 className={`font-semibold text-surface-900 ${!isDisabled ? 'group-hover:text-brand-600' : ''} transition-colors`}>
                      {section.title}
                    </h3>
                    {section.badge && (
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        section.badge === 'Admin Only'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-surface-100 text-surface-500'
                      }`}>
                        {section.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-surface-500 mt-0.5">{section.description}</p>
                </div>
                {!isDisabled && (
                  <ChevronRight className="w-5 h-5 text-surface-400 group-hover:text-brand-500 transition-colors" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Info Note */}
        <div className="mt-8 p-4 rounded-lg bg-surface-100 border border-surface-200">
          <p className="text-sm text-surface-600">
            <strong>Note:</strong> Additional settings will be available when authentication
            and user roles are enabled. The Database Admin section is currently accessible
            to all users but will be restricted to administrators in production.
          </p>
        </div>
      </div>
    </div>
  )
}
