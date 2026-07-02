'use client'

import Link from 'next/link'
import { ChevronRight, Star, type LucideIcon } from 'lucide-react'

interface GuideCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  iconColor: string
  iconBg: string
  roles: string[]
  isRecommended?: boolean
}

const roleBadgeColors: Record<string, string> = {
  'All Roles': 'bg-blue-500/20 text-blue-300',
  'Office & Admin': 'bg-purple-500/20 text-purple-300',
  'Surveyors': 'bg-emerald-500/20 text-emerald-300',
  'Admin Only': 'bg-amber-500/20 text-amber-300',
}

export function GuideCard({
  title,
  description,
  href,
  icon: Icon,
  iconColor,
  iconBg,
  roles,
  isRecommended,
}: GuideCardProps) {
  const roleLabel = roles.length === 3 ? 'All Roles'
    : roles.includes('admin') && roles.includes('office') ? 'Office & Admin'
    : roles.includes('surveyor') ? 'Surveyors'
    : 'Admin Only'

  return (
    <Link
      href={href}
      className={`section-card group p-5 flex items-start gap-4 hover:border-white/20 transition-all ${
        isRecommended ? 'border-blue-400/30 ring-1 ring-blue-400/10' : ''
      }`}
    >
      <div className={`${iconBg} rounded-xl p-3 flex-shrink-0`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-white font-semibold group-hover:text-blue-300 transition-colors">
            {title}
          </h3>
          {isRecommended && (
            <span className="flex items-center gap-1 text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3" />
              Recommended
            </span>
          )}
        </div>
        <p className="text-white/50 text-sm mb-2">{description}</p>
        <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${roleBadgeColors[roleLabel] || 'bg-white/10 text-white/60'}`}>
          {roleLabel}
        </span>
      </div>
      <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors mt-1 flex-shrink-0" />
    </Link>
  )
}
