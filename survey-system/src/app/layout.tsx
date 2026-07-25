import type { Metadata } from 'next'
import { cache } from 'react'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { CompanyProfileProvider } from '@/context/CompanyProfileContext'
import { getCompanyProfilePublic } from '@/lib/company-profile'
import OfflineBootstrap from '@/components/offline/OfflineBootstrap'

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
    // PWA — iOS home-screen install (Android uses the web manifest).
    appleWebApp: { capable: true, title: 'TTDP', statusBarStyle: 'black-translucent' },
    icons: {
      icon: '/icons/icon-192.png',
      apple: '/icons/apple-touch-icon.png',
    },
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
    // suppressHydrationWarning: the inline script below may add
    // data-theme="light" to <html> before React hydrates.
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-white antialiased">
        {/* Apply the saved theme before first paint to avoid a flash of the
            wrong theme. Dark is the default and needs no attribute. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('ttdp-theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}",
          }}
        />
        <ThemeProvider>
          <AuthProvider>
            <CompanyProfileProvider company={company}>
              {children}
            </CompanyProfileProvider>
            <OfflineBootstrap />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
