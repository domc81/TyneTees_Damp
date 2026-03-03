'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Droplets,
  Bug,
  Wind,
  Home,
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle,
  FileText,
  XCircle,
  PauseCircle,
  Filter,
} from 'lucide-react'
import Layout from '@/components/layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { getEnquiryList } from '@/lib/supabase-data'
import type { Enquiry, EnquiryStatus, SurveyType } from '@/types/database.types'

// ---------------------------------------------------------------------------
// Config maps
// ---------------------------------------------------------------------------

const surveyTypeConfig: Record<SurveyType, { icon: React.ElementType; label: string; color: string }> = {
  damp: { icon: Droplets, label: 'Damp', color: 'text-blue-400' },
  timber: { icon: Bug, label: 'Timber', color: 'text-amber-400' },
  woodworm: { icon: Bug, label: 'Woodworm', color: 'text-amber-500' },
  condensation: { icon: Wind, label: 'Condensation', color: 'text-cyan-400' },
  structural: { icon: Home, label: 'Structural', color: 'text-emerald-400' },
  comprehensive: { icon: ClipboardList, label: 'Comprehensive', color: 'text-purple-400' },
}

const statusConfig: Record<EnquiryStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  new: { label: 'New', color: 'text-red-400', bg: 'bg-red-500/10 border border-red-400/20', icon: AlertCircle },
  assigned: { label: 'Assigned', color: 'text-blue-400', bg: 'bg-blue-500/10 border border-blue-400/20', icon: Clock },
  surveyed: { label: 'Surveyed', color: 'text-amber-400', bg: 'bg-amber-500/10 border border-amber-400/20', icon: CheckCircle },
  quoted: { label: 'Quoted', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border border-emerald-400/20', icon: FileText },
  accepted: { label: 'Accepted', color: 'text-green-400', bg: 'bg-green-500/10 border border-green-400/20', icon: CheckCircle },
  declined: { label: 'Declined', color: 'text-slate-400', bg: 'bg-slate-500/10 border border-slate-400/20', icon: XCircle },
  on_hold: { label: 'On Hold', color: 'text-orange-400', bg: 'bg-orange-500/10 border border-orange-400/20', icon: PauseCircle },
  completed: { label: 'Completed', color: 'text-slate-500', bg: 'bg-slate-500/10 border border-slate-500/20', icon: CheckCircle },
}

const PAGE_SIZE = 25

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function StatusBadge({ status }: { status: EnquiryStatus }) {
  const cfg = statusConfig[status] ?? { label: status, color: 'text-white/60', bg: 'bg-white/5 border border-white/10', icon: AlertCircle }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.color}`}>
      {cfg.label}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)

  // Debounce search input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  // Reset to page 1 when filter changes
  useEffect(() => {
    setPage(1)
  }, [statusFilter])

  const load = useCallback(async () => {
    setIsLoading(true)
    const result = await getEnquiryList({
      search: debouncedSearch,
      status: statusFilter,
      page,
      pageSize: PAGE_SIZE,
    })
    setEnquiries(result.enquiries)
    setTotalCount(result.totalCount)
    setIsLoading(false)
  }, [debouncedSearch, statusFilter, page])

  useEffect(() => {
    load()
  }, [load])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  // Status counts for summary cards (from current filtered total)
  const statusCounts = enquiries.reduce<Record<string, number>>((acc, e) => {
    acc[e.status] = (acc[e.status] ?? 0) + 1
    return acc
  }, {})

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">Enquiries</h1>
              <p className="text-sm text-white/50 mt-1">
                {isLoading ? 'Loading...' : `${totalCount} enquir${totalCount === 1 ? 'y' : 'ies'}`}
              </p>
            </div>
            <Link href="/enquiries/new" className="btn-primary flex items-center gap-2 flex-shrink-0">
              <Plus className="w-4 h-4" />
              New Enquiry
            </Link>
          </div>

          {/* Search + filter row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search by name, email, phone or number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>
            <div className="relative flex items-center">
              <Filter className="absolute left-3 w-4 h-4 text-white/30 pointer-events-none" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field pl-10 pr-8 w-auto"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="assigned">Assigned</option>
                <option value="surveyed">Surveyed</option>
                <option value="quoted">Quoted</option>
                <option value="accepted">Accepted</option>
                <option value="declined">Declined</option>
                <option value="on_hold">On Hold</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="glass-card overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="text-center">
                  <div className="spinner mx-auto mb-4" />
                  <p className="text-white/50 text-sm">Loading enquiries...</p>
                </div>
              </div>
            ) : enquiries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <ClipboardList className="w-8 h-8 text-white/20" />
                </div>
                <p className="text-white/60 font-medium">No enquiries found</p>
                <p className="text-white/30 text-sm mt-1">
                  {debouncedSearch || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter'
                    : 'Create your first enquiry to get started'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-base">
                  <thead>
                    <tr>
                      <th>Reference</th>
                      <th>Client</th>
                      <th>Status</th>
                      <th>Type</th>
                      <th>Survey Date</th>
                      <th>Received</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((e) => {
                      const typeConf = surveyTypeConfig[e.survey_type]
                      const TypeIcon = typeConf?.icon ?? ClipboardList

                      return (
                        <tr key={e.id} className="cursor-default">
                          <td className="font-mono text-sm text-white/70">{e.enquiry_number}</td>
                          <td>
                            <div className="font-medium text-white">{e.client_name}</div>
                            {e.site_city && (
                              <div className="text-xs text-white/40 mt-0.5">{e.site_city}</div>
                            )}
                          </td>
                          <td>
                            <StatusBadge status={e.status} />
                          </td>
                          <td>
                            <div className={`flex items-center gap-1.5 text-sm ${typeConf?.color ?? 'text-white/60'}`}>
                              <TypeIcon className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>{typeConf?.label ?? e.survey_type}</span>
                            </div>
                          </td>
                          <td className="text-white/50 text-sm">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-white/20 flex-shrink-0" />
                              {formatDate(e.proposed_survey_date)}
                            </div>
                          </td>
                          <td className="text-white/50 text-sm">{formatDate(e.created_at)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/40">
                Page {page} of {totalPages} &mdash; {totalCount} total
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="btn-secondary flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="btn-secondary flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <SummaryCard title="New" count={statusCounts.new ?? 0} icon={AlertCircle} color="text-red-400" />
            <SummaryCard title="Assigned" count={statusCounts.assigned ?? 0} icon={Clock} color="text-blue-400" />
            <SummaryCard title="Awaiting Quote" count={statusCounts.surveyed ?? 0} icon={CheckCircle} color="text-amber-400" />
            <SummaryCard title="Quoted" count={statusCounts.quoted ?? 0} icon={FileText} color="text-emerald-400" />
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}

function SummaryCard({
  title,
  count,
  icon: Icon,
  color,
}: {
  title: string
  count: number
  icon: React.ElementType
  color: string
}) {
  return (
    <div className="glass-card p-5 flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-1">{title}</p>
        <p className="text-2xl font-bold text-white">{count}</p>
      </div>
      <div className={`p-3 rounded-xl bg-white/5 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  )
}
