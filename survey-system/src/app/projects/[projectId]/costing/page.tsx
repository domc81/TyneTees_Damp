'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Calculator,
  ClipboardList,
  FileText,
  Package,
  Users,
  Settings,
  Home,
  ChevronRight,
  Droplets,
  Bug,
  Wind,
  AlertCircle,
  LayoutDashboard,
} from 'lucide-react'
import { getProject, initializeSampleData, saveProjectCosting } from '@/lib/supabase-data'
import type { Project } from '@/lib/supabase-data'
import PricingCalculator, { type PricingCalculationData } from '@/components/pricing-calculator'

const surveyTypeConfig: Record<string, { icon: typeof Droplets; color: string; bgColor: string; label: string; gradient: string }> = {
  damp: { icon: Droplets, color: 'text-blue-400', bgColor: 'bg-blue-500/20', label: 'Damp Survey', gradient: 'from-blue-500/20 to-cyan-500/10' },
  timber: { icon: Bug, color: 'text-amber-400', bgColor: 'bg-amber-500/20', label: 'Timber Survey', gradient: 'from-amber-500/20 to-orange-500/10' },
  woodworm: { icon: Bug, color: 'text-amber-300', bgColor: 'bg-amber-600/20', label: 'Woodworm Survey', gradient: 'from-amber-600/20 to-yellow-500/10' },
  condensation: { icon: Wind, color: 'text-cyan-400', bgColor: 'bg-cyan-500/20', label: 'Condensation Survey', gradient: 'from-cyan-500/20 to-sky-500/10' },
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: ClipboardList, label: 'Projects', href: '/projects' },
  { icon: Calculator, label: 'Costing', href: '/costing' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: Package, label: 'Materials', href: '/materials' },
  { icon: Users, label: 'Team', href: '/team' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export default function CostingPage({ params }: { params: Promise<{ projectId: string }> }) {
  const resolvedParams = use(params)
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'calculator' | 'summary'>('calculator')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    async function loadProject() {
      await initializeSampleData()
      const foundProject = await getProject(resolvedParams.projectId)
      setProject(foundProject)
      setIsLoading(false)
    }
    loadProject()
  }, [resolvedParams.projectId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-white/60">Loading project...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Project Not Found</h2>
          <p className="text-white/60 mb-4">The project you're looking for doesn't exist.</p>
          <Link href="/projects" className="btn-primary inline-flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

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
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-brand-400/50 blur-lg -z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white leading-tight">Tyne Tees</span>
              <span className="text-xs text-white/60">Damp Proofing</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const NavIcon = item.icon
            const isActive = item.href === '/projects'
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
                  <NavIcon className="w-5 h-5" />
                </div>
                <span className="flex-1">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-bold">
              TD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Tyne Tees</p>
              <p className="text-xs text-white/50">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-20 glass border-b border-white/10 px-4 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Home className="w-5 h-5" />
            </button>
            <Link
              href={`/projects/${project.id}`}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              title="Back to Project"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${config.bgColor}`}>
                <Icon className={`w-5 h-5 ${config.color}`} />
              </div>
              <div>
                <h1 className="text-lg lg:text-xl font-bold text-white">{project.project_number}</h1>
                <p className="text-sm text-white/60">{project.client_name}</p>
              </div>
            </div>
            <span className={`badge ml-2 lg:ml-4 ${status.bg} ${status.color}`}>
              {project.status.replace('_', ' ')}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-4 ml-0 lg:ml-16">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                activeTab === 'calculator'
                  ? 'border-brand-400 text-brand-300'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">Pricing Calculator</span>
              <span className="sm:hidden">Calculator</span>
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                activeTab === 'summary'
                  ? 'border-brand-400 text-brand-300'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Preview Quote</span>
              <span className="sm:hidden">Quote</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">
          {activeTab === 'calculator' && (
            <PricingCalculator
              projectId={project.id}
              onSave={async (data: PricingCalculationData) => {
                console.log('Saving pricing data:', data)
                await saveProjectCosting(project.id, {
                  selectedItems: data.selectedItems,
                  selectedOptionalItems: data.selectedOptionalItems,
                  travelMiles: data.travelMiles,
                  notes: data.notes,
                  materialSubtotal: 0,
                  laborSubtotal: 0,
                  optionalExtras: 0,
                  travelCost: 0,
                  subtotal: 0,
                  vatAmount: 0,
                  totalIncVat: 0,
                  depositAmount: 0,
                })
                setActiveTab('summary')
              }}
            />
          )}

          {activeTab === 'summary' && (
            <PriceSummaryTab project={project} onBack={() => setActiveTab('calculator')} />
          )}
        </div>
      </main>
    </div>
  )
}

function PriceSummaryTab({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="btn-secondary flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Calculator
        </button>
      </div>

      <div className="glass-card">
        <div className="px-6 py-5 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Customer Price Summary</h2>
          <p className="text-white/50 mt-1">Review and generate customer-facing quote</p>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-600/10 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-brand-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Complete the Pricing Calculator
            </h3>
            <p className="text-white/50 max-w-md mx-auto">
              Use the Pricing Calculator tab to select items and calculate costs.
              The price summary will be generated automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
