'use client'

import Link from 'next/link'
import { ArrowLeft, type LucideIcon } from 'lucide-react'
import { TableOfContents } from './TableOfContents'

interface Section {
  id: string
  label: string
}

interface TrainingArticleProps {
  title: string
  subtitle: string
  icon: LucideIcon
  iconColor: string
  iconBg: string
  roles: string[]
  sections: Section[]
  children: React.ReactNode
}

const roleBadgeColors: Record<string, string> = {
  admin: 'bg-amber-500/20 text-amber-300',
  office: 'bg-purple-500/20 text-purple-300',
  surveyor: 'bg-emerald-500/20 text-emerald-300',
}

const roleLabels: Record<string, string> = {
  admin: 'Admin',
  office: 'Office',
  surveyor: 'Surveyor',
}

export function TrainingArticle({
  title,
  subtitle,
  icon: Icon,
  iconColor,
  iconBg,
  roles,
  sections,
  children,
}: TrainingArticleProps) {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Back nav */}
      <Link
        href="/training"
        className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Training
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className={`${iconBg} rounded-xl p-3 flex-shrink-0`}>
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-white/50 mt-1">{subtitle}</p>
          <div className="flex gap-2 mt-2">
            {roles.map((role) => (
              <span
                key={role}
                className={`text-xs px-2 py-0.5 rounded-full ${roleBadgeColors[role] || 'bg-white/10 text-white/60'}`}
              >
                {roleLabels[role] || role}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-8">
        {/* Article body */}
        <div className="flex-1 min-w-0">
          {/* Mobile ToC */}
          <div className="lg:hidden">
            <TableOfContents sections={sections} />
          </div>

          <div className="training-prose">
            {children}
          </div>
        </div>

        {/* Desktop ToC sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <TableOfContents sections={sections} />
        </div>
      </div>
    </div>
  )
}
