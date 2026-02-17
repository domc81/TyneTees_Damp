'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Home,
  ClipboardList,
  Camera,
  FileText,
  Calculator,
  Users,
  Settings,
  Plus,
  ChevronRight,
  TrendingUp,
  Clock,
  MapPin,
  Droplets,
  Bug,
  Wind,
  Menu,
  LogOut,
} from 'lucide-react'
import { getProjects, initializeSampleData } from '@/lib/supabase-data'
import type { Project } from '@/lib/supabase-data'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const surveyTypeConfig: Record<string, { icon: typeof Droplets; color: string; label: string; gradient: string; border: string }> = {
  damp: { icon: Droplets, color: 'text-blue-600', label: 'Damp Survey', gradient: 'from-blue-50 to-cyan-50', border: 'border-blue-200' },
  timber: { icon: Bug, color: 'text-amber-600', label: 'Timber Survey', gradient: 'from-amber-50 to-orange-50', border: 'border-amber-200' },
  woodworm: { icon: Bug, color: 'text-amber-700', label: 'Woodworm Survey', gradient: 'from-amber-100 to-yellow-50', border: 'border-amber-300' },
  condensation: { icon: Wind, color: 'text-cyan-600', label: 'Condensation Survey', gradient: 'from-cyan-50 to-sky-50', border: 'border-cyan-200' },
}

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: ClipboardList, label: 'Projects', href: '/projects' },
  { icon: Calculator, label: 'Costing', href: '/costing' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: Camera, label: 'Photos', href: '/photos' },
  { icon: Users, label: 'Customers', href: '/customers' },
  { icon: Users, label: 'Team', href: '/team' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      // Set a timeout to prevent hanging
      const timeoutId = setTimeout(() => {
        console.warn('Data loading timed out, using mock data')
        setProjects([
          {
            id: 'demo-1',
            enquiry_id: null,
            project_number: 'TT-DEMO-0001',
            survey_type: 'damp',
            status: 'draft',
            survey_date: null,
            weather_conditions: null,
            client_name: 'Demo Client',
            site_address: 'Demo Address',
            site_postcode: 'NE1 1AA',
            notes: 'Demo project',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        setIsLoading(false)
      }, 5000) // 5 second timeout

      try {
        await initializeSampleData()
        const data = await getProjects()
        clearTimeout(timeoutId)
        setProjects(data)
      } catch (err) {
        console.error('Error loading data:', err)
        clearTimeout(timeoutId)
        // Set a demo project so the UI isn't empty
        setProjects([{
          id: 'demo-error-1',
          enquiry_id: null,
          project_number: 'TT-ERR-0001',
          survey_type: 'damp',
          status: 'draft',
          survey_date: null,
          weather_conditions: null,
          client_name: 'Demo (Error Fallback)',
          site_address: 'Address',
          site_postcode: 'NE1 1AA',
          notes: 'Error fallback',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }])
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const recentProjects = projects.slice(0, 5)
  const stats = {
    active: projects.filter(p => p.status === 'in_progress').length,
    pending: projects.filter(p => p.status === 'pending_review').length,
    draft: projects.filter(p => p.status === 'draft').length,
    total: projects.length,
  }

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="spinner mx-auto mb-4" />
            <p className="text-white/60">Loading dashboard...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`glass-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="Tyne Tees Damp Proofing"
              className="h-10 w-auto"
            />
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = item.href === '/'
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`nav-item ${isActive ? 'data-[active=true]:glow-blue' : ''}`}
                data-active={isActive || undefined}
              >
                <div className={`p-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-500/20 text-brand-300'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-brand-400" />
                )}
              </Link>
            )
          })}
        </nav>

        <UserMenu />
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-20 glass border-b border-white/10 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                <p className="text-sm text-white/60">Welcome back, John</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/survey/new" className="btn-primary flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Survey
              </Link>
              <Link href="/customers/new" className="btn-secondary flex items-center gap-2">
                <Users className="w-4 h-4" />
                Create Customer
              </Link>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 space-y-6 lg:space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <StatCard
              label="Active Surveys"
              value={stats.active.toString()}
              change="In progress"
              icon={ClipboardList}
              color="blue"
            />
            <StatCard
              label="Pending Review"
              value={stats.pending.toString()}
              change="Awaiting action"
              icon={Clock}
              color="amber"
            />
            <StatCard
              label="Drafts"
              value={stats.draft.toString()}
              change="Not started"
              icon={FileText}
              color="white"
            />
            <StatCard
              label="Total Projects"
              value={stats.total.toString()}
              change="All time"
              icon={TrendingUp}
              color="brand"
            />
          </div>

          {/* Quick Survey Type Selection */}
          <div className="glass-card">
            <div className="px-6 py-5 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Start New Survey</h3>
              <p className="text-sm text-white/50 mt-1">Choose a survey type to begin</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(surveyTypeConfig).map(([key, config]) => {
                  const Icon = config.icon
                  return (
                    <Link
                      key={key}
                      href={`/survey/new?type=${key}`}
                      className="group relative p-6 rounded-xl bg-gradient-to-br border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                    >
                      {/* Gradient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                      <div className="relative flex flex-col items-center text-center gap-3">
                        <div className={`p-4 rounded-xl bg-white shadow-sm ${config.color} group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <div>
                          <p className={`font-semibold text-white transition-colors duration-300 group-hover:text-slate-900`}>{config.label}</p>
                          <p className="text-xs text-white/50 group-hover:text-slate-700 mt-1 transition-colors duration-300">Create new survey</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="glass-card">
            <div className="px-6 py-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Recent Projects</h3>
                <p className="text-sm text-white/50 mt-1">Your latest surveys and quotations</p>
              </div>
              <Link href="/projects" className="btn-ghost flex items-center gap-1 text-sm w-fit">
                View all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {recentProjects.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <ClipboardList className="w-8 h-8 text-white/30" />
                </div>
                <p className="text-white/60">No projects yet. Create your first survey!</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {recentProjects.map((project) => {
                  const config = surveyTypeConfig[project.survey_type]
                  const Icon = config.icon

                  const statusConfig: Record<string, { color: string; bg: string }> = {
                    draft: { color: 'text-amber-300', bg: 'bg-amber-500/20 border-amber-400/30' },
                    in_progress: { color: 'text-blue-300', bg: 'bg-blue-500/20 border-blue-400/30' },
                    pending_review: { color: 'text-emerald-300', bg: 'bg-emerald-500/20 border-emerald-400/30' },
                    completed: { color: 'text-white/70', bg: 'bg-white/10 border-white/20' },
                  }
                  const status = statusConfig[project.status] || statusConfig.draft

                  return (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}`}
                      className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient}`}>
                        <Icon className={`w-5 h-5 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono text-white/50">{project.project_number}</span>
                          <span className={`badge ${status.bg} ${status.color}`}>
                            {project.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="font-medium text-white mt-1">{project.client_name || 'Unknown Client'}</p>
                        <div className="flex items-center gap-1 text-sm text-white/50 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-white/30" />
                          <span className="truncate">{project.site_address}</span>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-sm text-white/60">
                          {project.survey_date ? new Date(project.survey_date).toLocaleDateString('en-GB') : '-'}
                        </p>
                        <p className="text-xs text-white/40 capitalize mt-0.5">{project.survey_type}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/30 ml-auto" />
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  )
}

function StatCard({ label, value, change, icon: Icon, color }: {
  label: string
  value: string
  change: string
  icon: typeof TrendingUp
  color: 'blue' | 'amber' | 'white' | 'brand'
}) {
  const colorBg: Record<string, string> = {
    blue: 'bg-blue-500/20',
    amber: 'bg-amber-500/20',
    white: 'bg-white/10',
    brand: 'bg-brand-500/20',
  }
  const colorIcon: Record<string, string> = {
    blue: 'text-blue-400',
    amber: 'text-amber-400',
    white: 'text-white/70',
    brand: 'text-brand-400',
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/60">{label}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
          <p className="text-sm text-white/40 mt-1">{change}</p>
        </div>
        <div className={`p-3 rounded-xl ${colorBg[color]}`}>
          <Icon className={`w-6 h-6 ${colorIcon[color]}`} />
        </div>
      </div>
    </div>
  )
}

function UserMenu() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  
  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <div className="p-4 border-t border-white/10">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-bold">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{user?.email}</p>
          <p className="text-xs text-white/50">Surveyor</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-white/50 hover:text-white transition-colors"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
