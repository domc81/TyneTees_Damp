'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BarChart3, Calendar, Clock, CheckCircle, XCircle, User } from 'lucide-react'
import { getSurveyorWorkloadStats, type SurveyorWorkloadStats } from '@/lib/calendar-data'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'

function CapacityBar({ available, booked }: { available: number; booked: number }) {
  if (available === 0) {
    return <span className="text-xs text-white/30">No availability set</span>
  }
  const pct = Math.min(100, Math.round((booked / available) * 100))
  const color = pct < 60 ? 'bg-emerald-500' : pct < 85 ? 'bg-amber-500' : 'bg-red-500'
  const textColor = pct < 60 ? 'text-emerald-400' : pct < 85 ? 'text-amber-400' : 'text-red-400'

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className={textColor}>{pct}% utilised</span>
        <span className="text-white/30">
          {Math.round(booked / 60)}h / {Math.round(available / 60)}h
        </span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function WorkloadDashboardPage() {
  const [stats, setStats] = useState<SurveyorWorkloadStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const data = await getSurveyorWorkloadStats()
      setStats(data)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6 max-w-6xl">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </Link>

          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              Surveyor Workload
            </h2>
            <p className="text-sm text-white/60 mt-1">
              Capacity and booking overview for all active surveyors
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="text-center">
                <div className="spinner mx-auto mb-4" />
                <p className="text-white/60">Loading workload data...</p>
              </div>
            </div>
          ) : stats.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <User className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/50">No active surveyors found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {stats.map(surveyor => (
                <div key={surveyor.id} className="glass-card p-5 space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{surveyor.displayName}</h3>
                      <p className="text-xs text-white/40">{surveyor.email}</p>
                    </div>
                  </div>

                  {/* Booking counts */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-2 rounded-lg bg-white/5">
                      <p className="text-xl font-bold text-white">{surveyor.todayBookings.length}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">Today</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-white/5">
                      <p className="text-xl font-bold text-white">{surveyor.thisWeekCount}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">This Week</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-white/5">
                      <p className="text-xl font-bold text-white">{surveyor.nextWeekCount}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">Next Week</p>
                    </div>
                  </div>

                  {/* Capacity bar (next 7 days) */}
                  <div>
                    <p className="text-xs text-white/40 mb-1.5">Next 7 Days Capacity</p>
                    <CapacityBar
                      available={surveyor.next7DaysAvailableMinutes}
                      booked={surveyor.next7DaysBookedMinutes}
                    />
                  </div>

                  {/* 30-day stats */}
                  <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs text-white/50">{surveyor.last30Completed} completed</span>
                    </div>
                    {surveyor.last30CancelledNoShow > 0 && (
                      <div className="flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-xs text-white/50">{surveyor.last30CancelledNoShow} cancelled</span>
                      </div>
                    )}
                  </div>

                  {/* Today's bookings */}
                  {surveyor.todayBookings.length > 0 && (
                    <div className="pt-2 border-t border-white/5">
                      <p className="text-xs text-white/40 mb-2">Today&apos;s Schedule</p>
                      <div className="space-y-1.5">
                        {surveyor.todayBookings.map(b => (
                          <div key={b.id} className="flex items-center gap-2 text-xs">
                            <Clock className="w-3 h-3 text-white/30 shrink-0" />
                            <span className="text-white/60">{b.start_time}</span>
                            <span className="text-white/80 truncate">{b.customer_name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Link to calendar */}
                  <Link
                    href={`/calendar?surveyor=${surveyor.id}`}
                    className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors pt-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    View in Calendar
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
