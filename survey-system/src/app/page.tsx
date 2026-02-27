'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ClipboardList,
  FileText,
  Plus,
  ChevronRight,
  TrendingUp,
  Clock,
  MapPin,
  Droplets,
  Bug,
  Wind,
  Users,
} from 'lucide-react'
import { getSurveys } from '@/lib/supabase-data'
import type { Survey } from '@/types/database.types'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'

const surveyTypeConfig: Record<string, { icon: typeof Droplets; color: string; label: string; gradient: string; border: string }> = {
  damp: { icon: Droplets, color: 'text-blue-600', label: 'Damp Survey', gradient: 'from-blue-50 to-cyan-50', border: 'border-blue-200' },
  timber: { icon: Bug, color: 'text-amber-600', label: 'Timber Survey', gradient: 'from-amber-50 to-orange-50', border: 'border-amber-200' },
  woodworm: { icon: Bug, color: 'text-amber-700', label: 'Woodworm Survey', gradient: 'from-amber-100 to-yellow-50', border: 'border-amber-300' },
  condensation: { icon: Wind, color: 'text-cyan-600', label: 'Condensation Survey', gradient: 'from-cyan-50 to-sky-50', border: 'border-cyan-200' },
}

export default function Dashboard() {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getSurveys()
        setSurveys(data)
      } catch (err) {
        console.error('Error loading data:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const recentSurveys = surveys.slice(0, 5)
  const stats = {
    active: surveys.filter(p => p.status === 'in_progress').length,
    pending: surveys.filter(p => p.status === 'pending_review').length,
    draft: surveys.filter(p => p.status === 'draft').length,
    total: surveys.length,
  }

  return (
    <ProtectedRoute>
      <Layout>
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="spinner mx-auto mb-4" />
              <p className="text-white/60">Loading dashboard...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 lg:space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                <p className="text-sm text-white/60">Welcome back, John</p>
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
                <Link href="/surveys" className="btn-ghost flex items-center gap-1 text-sm w-fit">
                  View all
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {recentSurveys.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <ClipboardList className="w-8 h-8 text-white/30" />
                  </div>
                  <p className="text-white/60">No projects yet. Create your first survey!</p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {recentSurveys.map((survey) => {
                    const config = surveyTypeConfig[survey.survey_type]
                    const Icon = config.icon

                    const statusConfig: Record<string, { color: string; bg: string }> = {
                      draft: { color: 'text-amber-300', bg: 'bg-amber-500/20 border-amber-400/30' },
                      in_progress: { color: 'text-blue-300', bg: 'bg-blue-500/20 border-blue-400/30' },
                      pending_review: { color: 'text-emerald-300', bg: 'bg-emerald-500/20 border-emerald-400/30' },
                      completed: { color: 'text-white/70', bg: 'bg-white/10 border-white/20' },
                    }
                    const status = statusConfig[survey.status] || statusConfig.draft

                    return (
                      <Link
                        key={survey.id}
                        href={`/surveys/${survey.id}`}
                        className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
                      >
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient}`}>
                          <Icon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-mono text-white/50">{survey.project_number}</span>
                            <span className={`badge ${status.bg} ${status.color}`}>
                              {survey.status.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="font-medium text-white mt-1">{survey.client_name || 'Unknown Client'}</p>
                          <div className="flex items-center gap-1 text-sm text-white/50 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-white/30" />
                            <span className="truncate">{survey.site_address}</span>
                          </div>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="text-sm text-white/60">
                            {survey.survey_date ? new Date(survey.survey_date).toLocaleDateString('en-GB') : '-'}
                          </p>
                          <p className="text-xs text-white/40 capitalize mt-0.5">{survey.survey_type}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/30 ml-auto" />
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </Layout>
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
