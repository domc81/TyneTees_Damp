'use client'

import { useCompanyProfile } from '@/context/CompanyProfileContext'
import { Building2 } from 'lucide-react'

interface CompanyLogoProps {
  /** Height class, e.g. "h-10", "h-12", "h-6" */
  className?: string
}

export function CompanyLogo({ className = 'h-10' }: CompanyLogoProps) {
  const { logo_url, trading_name, name } = useCompanyProfile()
  const displayName = trading_name || name

  if (logo_url) {
    return (
      <img
        src={logo_url}
        alt={displayName}
        className={`${className} w-auto`}
      />
    )
  }

  // Text fallback: company initials + name
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
        <Building2 className="w-4 h-4 text-brand-400" />
      </div>
      <span className="text-sm font-semibold text-white truncate max-w-[160px]">
        {displayName}
      </span>
    </div>
  )
}
