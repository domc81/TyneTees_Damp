'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Users,
  Calendar,
  Settings,
  Menu,
  ChevronRight,
  LogOut,
  Inbox,
  BarChart3,
  BookOpen,
  Sun,
  Moon,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { useCompanyProfile } from '@/context/CompanyProfileContext'
import { CompanyLogo } from '@/components/CompanyLogo'
import { NotificationBell } from '@/components/NotificationBell'
import { StaleSyncBanner } from '@/components/offline/StaleSyncBanner'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { useSyncStatus } from '@/hooks/useSyncStatus'
import { clearOfflineDB } from '@/lib/offline/db'

// Ordered by frequency of use per role (roles filter rows out, so surveyors
// get Surveys/Calendar on top while office gets Pipeline first): daily work
// surfaces first, occasional reference mid, rare admin/onboarding last.
const navItems: { icon: typeof LayoutDashboard; label: string; href: string; roles?: string[] }[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Inbox, label: 'Pipeline', href: '/enquiries', roles: ['admin', 'office'] },
  { icon: ClipboardList, label: 'Surveys', href: '/surveys' },
  { icon: Calendar, label: 'Calendar', href: '/calendar' },
  { icon: BarChart3, label: 'Workload', href: '/admin/workload', roles: ['admin', 'office'] },
  { icon: Package, label: 'Materials', href: '/materials' },
  { icon: Users, label: 'Team', href: '/admin/team' },
  { icon: BookOpen, label: 'Training', href: '/training' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [confirmLogout, setConfirmLogout] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { signOut, isAdmin, isOffice, profile, role } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const companyProfile = useCompanyProfile()
  const sync = useSyncStatus()
  const pendingTotal = sync.pendingData + sync.pendingPhotos + sync.pendingAudio + sync.failed

  const roleLabel = role === 'admin' ? 'Admin' : role === 'office' ? 'Office' : role === 'surveyor' ? 'Surveyor' : ''
  const cardName = profile?.display_name || companyProfile.trading_name || companyProfile.name

  const performSignOut = async () => {
    setConfirmLogout(false)
    // Clear the per-device offline store so no cross-user residue remains.
    await clearOfflineDB()
    await signOut()
    router.push('/login')
  }

  const handleSignOut = async () => {
    // Warn if unsynced survey data would be lost on this device.
    if (pendingTotal > 0) {
      setConfirmLogout(true)
      return
    }
    await performSignOut()
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen">
      {/* Animated dark background — internal pages only (not on public /report, /q, /pay) */}
      <div className="app-background" aria-hidden="true" />

      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`glass-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <CompanyLogo className="h-10" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto overscroll-contain">
          {navItems.filter((item) => {
            if (!item.roles) return true
            const userRole = isAdmin ? 'admin' : isOffice ? 'office' : 'surveyor'
            return item.roles.includes(userRole)
          }).map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`nav-item ${active ? 'data-[active=true]:glow-blue' : ''}`}
                data-active={active || undefined}
              >
                <div className={`p-2 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-brand-500/20 text-brand-300'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="flex-1">{item.label}</span>
                {active && (
                  <ChevronRight className="w-4 h-4 text-brand-400" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 border border-white/10 transition-all duration-200 text-sm font-medium"
            aria-pressed={theme === 'light'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-brand-400" />
            )}
            <span className="flex-1 text-left">
              {theme === 'dark' ? 'Light theme' : 'Dark theme'}
            </span>
          </button>

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-bold">
              {cardName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{cardName}</p>
              {roleLabel && <p className="text-xs text-white/50">{roleLabel}</p>}
            </div>
            <button
              onClick={handleSignOut}
              title="Sign out"
              className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Single NotificationBell — fixed position, responsive placement for both mobile and desktop */}
      <div className="fixed top-3 right-4 lg:top-4 lg:right-6 z-30">
        <NotificationBell />
      </div>

      {/* Main content wrapper */}
      <div className="lg:ml-64">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-20 glass border-b border-white/10 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <CompanyLogo className="h-6" />
            {/* Spacer balances the 3-item flex layout (hamburger | logo | bell-sized gap) */}
            <div className="w-9 h-9" />
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8 lg:pr-20">
          <StaleSyncBanner />
          {children}
        </main>
      </div>

      <ConfirmDialog
        open={confirmLogout}
        title="Sign out with unsynced data?"
        message="Some survey work saved on this device hasn't reached the office yet. If you sign out here it will be lost — like losing paper notes. Connect to WiFi and let it sync first if you can."
        confirmLabel="Sign out anyway"
        cancelLabel="Stay signed in"
        danger
        onConfirm={performSignOut}
        onCancel={() => setConfirmLogout(false)}
      />
    </div>
  )
}
