'use client'

import { createContext, useContext } from 'react'

export interface CompanyInfo {
  name: string
  trading_name: string | null
  logo_url: string | null
}

const CompanyProfileContext = createContext<CompanyInfo>({
  name: 'Survey System',
  trading_name: null,
  logo_url: null,
})

export function CompanyProfileProvider({
  company,
  children,
}: {
  company: CompanyInfo
  children: React.ReactNode
}) {
  return (
    <CompanyProfileContext.Provider value={company}>
      {children}
    </CompanyProfileContext.Provider>
  )
}

export function useCompanyProfile() {
  return useContext(CompanyProfileContext)
}
