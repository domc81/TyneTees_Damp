import type { Metadata } from 'next'
import { cache } from 'react'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { CompanyProfileProvider } from '@/context/CompanyProfileContext'
import { getCompanyProfilePublic } from '@/lib/company-profile'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const getCachedProfile = cache(async () => {
  try {
    return await getCompanyProfilePublic()
  } catch {
    return null
  }
})

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getCachedProfile()
  const name = profile?.trading_name || profile?.name || 'Survey System'
  return {
    title: `${name} Survey System`,
    description: `Professional survey and costing system for ${profile?.name || 'damp proofing, timber, and condensation surveys'}`,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getCachedProfile()
  const company = {
    name: profile?.name || 'Survey System',
    trading_name: profile?.trading_name || null,
    logo_url: profile?.logo_url || null,
  }

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#0d1520] text-white antialiased">
        <AuthProvider>
          <CompanyProfileProvider company={company}>
            {children}
          </CompanyProfileProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
