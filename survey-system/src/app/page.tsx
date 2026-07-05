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
  AlertTriangle,
  CheckCircle2,
  Activity,
  ArrowRightLeft,
  UserCheck,
  StickyNote,
  Phone,
  Mail,
  ClipboardCheck,
  Send,
  Bell,
  CalendarClock,
  Flag,
  PauseCircle,
  Info,
} from 'lucide-react'
import { getSurveys, getEnquiryPipelineStats, getRecentEnquiryActivity } from '@/lib/supabase-data'
import type {
  Survey,
  EnquiryActivityType,
  EnquiryPipelineStats,
  RecentActivityItem,
} from '@/lib/supabase-data'
import { primarySurveyTypeFromTags } from '@/lib/survey-tags'
import { humanizeActivityTitle } from '@/lib/status-labels'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import { useAuth } from '@/context/AuthContext'
import { getSupabase } from '@/lib/supabase-client'

// Quotation status badge config (matches the quotation page colour scheme)
type QuotationStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined'
const QUOT_STATUS_CONFIG: Record<QuotationStatus, { bg: string; color: string; label: string }> = {
  draft:    { bg: 'bg-gray-500/10 border border-gray-400/30',    color: 'text-gray-400',    label: 'Quote: Draft' },
  sent:     { bg: 'bg-blue-500/10 border border-blue-400/30',    color: 'text-blue-400',    label: 'Quote: Sent' },
  viewed:   { bg: 'bg-purple-500/10 border border-purple-400/30',  color: 'text-purple-400',  label: 'Quote: Viewed' },
  accepted: { bg: 'bg-emerald-500/10 border border-emerald-400/30', color: 'text-emerald-400', label: 'Quote: Accepted' },
  declined: { bg: 'bg-red-500/10 border border-red-400/30',      color: 'text-red-400',     label: 'Quote: Declined' },
}

const surveyTypeConfig: Record<string, { icon: typeof Droplets; color: string; label: string; gradient: string; border: string }> = {
  damp: { icon: Droplets, color: 'text-blue-600', label: 'Damp Survey', gradient: 'from-blue-50 to-cyan-50', border: 'border-blue-200' },
  timber: { icon: Bug, color: 'text-amber-600', label: 'Timber Survey', gradient: 'from-amber-50 to-orange-50', border: 'border-amber-200' },
  woodworm: { icon: Bug, color: 'text-amber-700', label: 'Woodworm Survey', gradient: 'from-amber-100 to-yellow-50', border: 'border-amber-300' },
  condensation: { icon: Wind, color: 'text-cyan-600', label: 'Condensation Survey', gradient: 'from-cyan-50 to-sky-50', border: 'border-cyan-200' },
}

// Pipeline bar config — matches COLUMNS in enquiries/page.tsx
const PIPELINE_STATUSES = [
  { status: 'new',              label: 'New',              color: '#3B82F6' },
  { status: 'awaiting_payment', label: 'Awaiting Payment', color: '#F59E0B' },
  { status: 'booked',           label: 'Booked',           color: '#8B5CF6' },
  { status: 'survey_complete',  label: 'Survey Complete',  color: '#14B8A6' },
  { status: 'sent',             label: 'Sent',             color: '#F97316' },
  { status: 'won',              label: 'Won',              color: '#22C55E' },
] as const

// Activity icons — mirrors ACTIVITY_ICONS in EnquiryDrawer.tsx
const ACTIVITY_ICONS: Record<EnquiryActivityType, React.ComponentType<{ className?: string }>> = {
  status_change:        ArrowRightLeft,
  assignment_change:    UserCheck,
  note_added:           StickyNote,
  call_logged:          Phone,
  email_sent:           Mail,
  survey_created:       ClipboardCheck,
  quotation_generated:  FileText,
  quotation_sent:       Send,
  customer_notified:    Bell,
  follow_up_set:        CalendarClock,
  priority_changed:     Flag,
  on_hold_reason_set:   PauseCircle,
  created:              Plus,
}

function formatCurrency(value: number): string {
  return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

function relativeTime(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diffMs / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

export default function Dashboard() {
  const { profile, user, isAdmin, isOffice } = useAuth()
  const isAdminOrOffice = isAdmin || isOffice
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [pipelineStats, setPipelineStats] = useState<EnquiryPipelineStats | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [quotationMap, setQuotationMap] = useState<Record<string, { id: string; status: QuotationStatus }>>({})

  useEffect(() => {
    async function loadData() {
      try {
        const [data, stats, activity] = await Promise.all([
          getSurveys(),
          getEnquiryPipelineStats(),
          getRecentEnquiryActivity(5),
        ])
        setSurveys(data)
        setPipelineStats(stats)
        setRecentActivity(activity)

        // Fetch the latest quotation for each of the 5 most recent surveys
        const recentIds = data.slice(0, 5).map(s => s.id)
        if (recentIds.length > 0) {
          const supabase = getSupabase()
          if (supabase) {
            const { data: qs } = await supabase
              .from('quotations')
              .select('id, survey_id, status')
              .in('survey_id', recentIds)
              .order('created_at', { ascending: false })

            if (qs) {
              const map: Record<string, { id: string; status: QuotationStatus }> = {}
              for (const q of qs) {
                if (!map[q.survey_id]) {
                  map[q.survey_id] = { id: q.id, status: q.status as QuotationStatus }
                }
              }
              setQuotationMap(map)
            }
          }
        }
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
    active: surveys.filter(p => p.status === 'draft').length,
    completed: surveys.filter(p => ['completed', 'archived'].includes(p.status)).length,
    wonThisMonth: pipelineStats?.totals.wonThisMonth ?? 0,
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
                <p className="text-sm text-white/60">
                  {profile?.display_name
                    ? `Welcome back, ${profile.display_name}`
                    : user?.email
                      ? `Welcome back, ${user.email}`
                      : 'Welcome back'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/survey/new" className="btn-primary flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Survey
                </Link>
              </div>
            </div>

            {/* Pipeline Summary Widget (admin/office only) */}
            {isAdminOrOffice && pipelineStats && (
              <PipelineWidget stats={pipelineStats} />
            )}

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
                label="Completed"
                value={stats.completed.toString()}
                change="Surveys done"
                icon={CheckCircle2}
                color="green"
              />
              <StatCard
                label="Won This Month"
                value={stats.wonThisMonth.toString()}
                change={pipelineStats?.totals.wonThisMonthValue ? formatCurrency(pipelineStats.totals.wonThisMonthValue) : '£0'}
                icon={TrendingUp}
                color="brand"
              />
              <StatCard
                label="Total Projects"
                value={stats.total.toString()}
                change="All time"
                icon={FileText}
                color="white"
              />
            </div>

            {/* Activity Feed + Recent Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
              {/* Recent Activity Feed (admin/office only) */}
              {isAdminOrOffice && (
              <div className="lg:col-span-2">
                <RecentActivityFeed items={recentActivity} />
              </div>
              )}

              {/* Recent Projects */}
              <div className={`${isAdminOrOffice ? 'lg:col-span-3' : 'lg:col-span-5'} glass-card`}>
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
                      const config = surveyTypeConfig[primarySurveyTypeFromTags(survey.survey_tags)]
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
                              {quotationMap[survey.id] && (() => {
                                const qCfg = QUOT_STATUS_CONFIG[quotationMap[survey.id]?.status] ?? QUOT_STATUS_CONFIG.draft
                                return (
                                  <span className={`badge text-xs ${qCfg.bg} ${qCfg.color}`}>
                                    {qCfg.label}
                                  </span>
                                )
                              })()}
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
                            <p className="text-xs text-white/40 capitalize mt-0.5">{primarySurveyTypeFromTags(survey.survey_tags)}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-white/30 ml-auto" />
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Layout>
    </ProtectedRoute>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Pipeline Summary Widget
// ─────────────────────────────────────────────────────────────────────────────

function PipelineWidget({ stats }: { stats: EnquiryPipelineStats }) {
  const { statusCounts, totals } = stats
  const totalBarUnits = PIPELINE_STATUSES.reduce(
    (sum, s) => sum + Math.max(statusCounts[s.status] ?? 0, 0.05),
    0,
  )

  const hasAnyActive = totals.active > 0 || (statusCounts['won'] ?? 0) > 0

  const conversionRate = (() => {
    const decided = totals.won + totals.lost
    if (decided === 0) return null
    return Math.round((totals.won / decided) * 100)
  })()

  return (
    <div className="glass-card p-5 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Lead Pipeline</h3>
          <p className="text-sm text-white/50 mt-0.5">Live overview of active leads</p>
        </div>
        <Link
          href="/enquiries"
          className="btn-ghost text-sm flex items-center gap-1"
        >
          View Pipeline
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {!hasAnyActive ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-6 text-center">
          {/* Thin equal-weight empty bar */}
          <div className="flex w-full rounded-full overflow-hidden mb-5 h-3 gap-px">
            {PIPELINE_STATUSES.map((s) => (
              <div
                key={s.status}
                className="flex-1 opacity-15"
                style={{ backgroundColor: s.color }}
              />
            ))}
          </div>
          <p className="text-white/40 text-sm">No active leads</p>
          <Link href="/enquiries" className="mt-3 btn-secondary text-sm">
            Open Pipeline
          </Link>
        </div>
      ) : (
        <>
          {/* Proportional pipeline bar */}
          <div className="flex w-full rounded-full overflow-hidden h-4 gap-px mb-4">
            {PIPELINE_STATUSES.map((s) => {
              const count = statusCounts[s.status] ?? 0
              const flex = Math.max(count, 0.05) / totalBarUnits
              return (
                <div
                  key={s.status}
                  className="relative group h-full cursor-default transition-opacity hover:opacity-90"
                  style={{ flex, backgroundColor: s.color }}
                  title={`${count} ${s.label}`}
                >
                  {/* Custom tooltip */}
                  {count > 0 && (
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1
                                 bg-gray-900/95 border border-white/10 text-white text-xs rounded-md
                                 opacity-0 group-hover:opacity-100 pointer-events-none
                                 whitespace-nowrap transition-opacity z-10 shadow-lg"
                    >
                      {count} {s.label}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Status legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5">
            {PIPELINE_STATUSES.map((s) => (
              <div key={s.status} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-xs text-white/50">{s.label}</span>
                <span className="text-xs font-semibold" style={{ color: s.color }}>
                  {statusCounts[s.status] ?? 0}
                </span>
              </div>
            ))}
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <MetricTile
              label="Active"
              value={totals.active.toString()}
              sub="New · Assigned · Surveyed · Quoted"
            />
            <MetricTile
              label="Pipeline Value"
              value={formatCurrency(totals.pipelineValue)}
              sub="Estimated across active"
            />
            <MetricTile
              label="Attention Needed"
              value={totals.redTotal > 0 ? totals.redTotal.toString() : 'All on track'}
              valueColor={totals.redTotal > 0 ? 'text-red-400' : 'text-emerald-400'}
              icon={totals.redTotal > 0 ? AlertTriangle : CheckCircle2}
              iconColor={totals.redTotal > 0 ? 'text-red-400' : 'text-emerald-400'}
              sub="Overdue SLA"
            />
            <MetricTile
              label="Conversion"
              value={conversionRate !== null ? `${conversionRate}%` : '—'}
              sub="Accepted of decided"
            />
          </div>
        </>
      )}
    </div>
  )
}

function MetricTile({
  label,
  value,
  sub,
  valueColor = 'text-white',
  icon: Icon,
  iconColor,
}: {
  label: string
  value: string
  sub: string
  valueColor?: string
  icon?: React.ComponentType<{ className?: string }>
  iconColor?: string
}) {
  return (
    <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-3">
      <p className="text-[11px] text-white/45 mb-1 leading-tight">{label}</p>
      <div className="flex items-center gap-1.5">
        {Icon && <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${iconColor ?? 'text-white/50'}`} />}
        <p className={`text-sm font-bold leading-tight ${valueColor}`}>{value}</p>
      </div>
      <p className="text-[10px] text-white/30 mt-1 leading-tight">{sub}</p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Recent Activity Feed
// ─────────────────────────────────────────────────────────────────────────────

function RecentActivityFeed({ items }: { items: RecentActivityItem[] }) {
  return (
    <div className="glass-card h-full">
      <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <p className="text-sm text-white/50 mt-0.5">Across all leads</p>
        </div>
        <Activity className="w-4 h-4 text-white/30" />
      </div>

      {items.length === 0 ? (
        <div className="p-8 text-center">
          <Info className="w-8 h-8 text-white/20 mx-auto mb-3" />
          <p className="text-sm text-white/40">No activity yet</p>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.06]">
          {items.map((item) => {
            const Icon = ACTIVITY_ICONS[item.activity_type] ?? Info
            return (
              <Link
                key={item.id}
                href={`/enquiries?highlight=${item.enquiry_id}`}
                className="flex items-start gap-3 p-4 hover:bg-white/[0.03] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-3.5 h-3.5 text-white/50" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/70 leading-snug">{humanizeActivityTitle(item.title)}</p>
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    {item.client_name && (
                      <span className="text-xs text-white/50 truncate">{item.client_name}</span>
                    )}
                    {item.enquiry_number && (
                      <span className="text-[10px] font-mono text-white/30">
                        {item.enquiry_number}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-white/30 flex-shrink-0 mt-0.5 whitespace-nowrap">
                  {relativeTime(item.created_at)}
                </span>
              </Link>
            )
          })}
        </div>
      )}

      <div className="px-5 py-3 border-t border-white/[0.06]">
        <Link href="/enquiries" className="text-xs text-white/40 hover:text-white/60 transition-colors flex items-center gap-1">
          View full pipeline
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Stat Card (existing)
// ─────────────────────────────────────────────────────────────────────────────

function StatCard({ label, value, change, icon: Icon, color }: {
  label: string
  value: string
  change: string
  icon: typeof TrendingUp
  color: 'blue' | 'amber' | 'white' | 'brand' | 'green'
}) {
  const colorBg: Record<string, string> = {
    blue: 'bg-blue-500/20',
    amber: 'bg-amber-500/20',
    white: 'bg-white/10',
    brand: 'bg-brand-500/20',
    green: 'bg-emerald-500/20',
  }
  const colorIcon: Record<string, string> = {
    blue: 'text-blue-400',
    amber: 'text-amber-400',
    white: 'text-white/70',
    brand: 'text-brand-400',
    green: 'text-emerald-400',
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
