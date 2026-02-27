'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Filter,
  Droplets,
  Bug,
  Wind,
  MapPin,
  Calendar,
  ChevronRight,
  Grid,
  List,
  X,
} from 'lucide-react'
import { getSurveys } from '@/lib/supabase-data'
import type { Survey } from '@/types/database.types'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'

const surveyTypeConfig: Record<string, { icon: typeof Droplets; color: string; label: string; gradient: string }> = {
  damp: { icon: Droplets, color: 'text-blue-600', label: 'Damp', gradient: 'from-blue-50 to-cyan-50' },
  timber: { icon: Bug, color: 'text-amber-600', label: 'Timber', gradient: 'from-amber-50 to-orange-50' },
  woodworm: { icon: Bug, color: 'text-amber-700', label: 'Woodworm', gradient: 'from-amber-100 to-yellow-50' },
  condensation: { icon: Wind, color: 'text-cyan-600', label: 'Condensation', gradient: 'from-cyan-50 to-sky-50' },
}

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  draft: { color: 'text-amber-600', bg: 'bg-amber-100 border-amber-200', label: 'Draft' },
  in_progress: { color: 'text-blue-600', bg: 'bg-blue-100 border-blue-200', label: 'In Progress' },
  pending_review: { color: 'text-emerald-600', bg: 'bg-emerald-100 border-emerald-200', label: 'Pending Review' },
  completed: { color: 'text-slate-600', bg: 'bg-slate-100 border-slate-200', label: 'Completed' },
  archived: { color: 'text-slate-400', bg: 'bg-slate-50 border-slate-200', label: 'Archived' },
}

export default function ProjectsPage() {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadSurveys() {
      try {
        const data = await getSurveys()
        setSurveys(data)
      } catch (err) {
        console.error('Error loading surveys:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadSurveys()
  }, [])

  const filteredSurveys = surveys.filter((survey) => {
    const matchesSearch =
      (survey.client_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (survey.site_address || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (survey.project_number || '').toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || survey.status === statusFilter
    const matchesType = typeFilter === 'all' || survey.survey_type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <ProtectedRoute>
      <Layout>
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="spinner mx-auto mb-4" />
              <p className="text-white/60">Loading projects...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">Projects</h1>
                <p className="text-white/60">{filteredSurveys.length} projects</p>
              </div>
              <Link
                href="/survey/new"
                className="btn-primary flex items-center gap-2 w-fit"
              >
                <Plus className="w-5 h-5" />
                New Survey
              </Link>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-12"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input-select flex-1 sm:w-40"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="in_progress">In Progress</option>
                  <option value="pending_review">Pending Review</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="input-select flex-1 sm:w-40"
                >
                  <option value="all">All Types</option>
                  <option value="damp">Damp</option>
                  <option value="timber">Timber</option>
                  <option value="woodworm">Woodworm</option>
                  <option value="condensation">Condensation</option>
                </select>

                <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/10">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'grid'
                        ? 'bg-brand-500/20 text-brand-300'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'list'
                        ? 'bg-brand-500/20 text-brand-300'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Projects Grid/List */}
            {filteredSurveys.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-white/30" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No projects found</h3>
                <p className="text-white/50 mb-4">Try adjusting your search or filters</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredSurveys.map((survey, index) => {
                  const config = surveyTypeConfig[survey.survey_type]
                  const status = statusConfig[survey.status]
                  const Icon = config.icon

                  return (
                    <Link
                      key={survey.id}
                      href={`/surveys/${survey.id}`}
                      className="glass-card card-hover-lift animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Card Header with gradient */}
                      <div className={`h-2 bg-gradient-to-r ${config.gradient}`} />

                      <div className="p-6">
                        {/* Top row */}
                        <div className="flex items-start justify-between mb-4">
                          <span className={`badge ${status.bg} ${status.color}`}>
                            {status.label}
                          </span>
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${config.gradient}`}>
                            <Icon className={`w-5 h-5 ${config.color}`} />
                          </div>
                        </div>

                        {/* Survey info */}
                        <h3 className="text-lg font-semibold text-white mb-1">{survey.client_name}</h3>
                        <p className="text-sm font-mono text-white/50 mb-4">{survey.project_number}</p>

                        {/* Details */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <MapPin className="w-4 h-4 text-white/30" />
                            <span className="truncate">{survey.site_address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <Calendar className="w-4 h-4 text-white/30" />
                            <span>
                              {survey.survey_date
                                ? new Date(survey.survey_date).toLocaleDateString('en-GB')
                                : 'No date'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card footer */}
                      <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-sm text-white/40">{config.label}</span>
                        <ChevronRight className="w-5 h-5 text-white/30" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="glass-card overflow-hidden">
                <table className="table-base">
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Client</th>
                      <th>Address</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSurveys.map((survey) => {
                      const config = surveyTypeConfig[survey.survey_type]
                      const status = statusConfig[survey.status]
                      const Icon = config.icon

                      return (
                        <tr key={survey.id}>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg bg-gradient-to-br ${config.gradient}`}>
                                <Icon className={`w-4 h-4 ${config.color}`} />
                              </div>
                              <span className="font-mono text-sm text-white/70">{survey.project_number}</span>
                            </div>
                          </td>
                          <td className="font-medium text-white">{survey.client_name}</td>
                          <td className="text-white/60 max-w-xs truncate">{survey.site_address}</td>
                          <td>
                            <span className="text-white/50">{config.label}</span>
                          </td>
                          <td>
                            <span className={`badge ${status.bg} ${status.color}`}>
                              {status.label}
                            </span>
                          </td>
                          <td className="text-white/60">
                            {survey.survey_date
                              ? new Date(survey.survey_date).toLocaleDateString('en-GB')
                              : '-'}
                          </td>
                          <td>
                            <ChevronRight className="w-5 h-5 text-white/30 ml-auto" />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </Layout>
    </ProtectedRoute>
  )
}
