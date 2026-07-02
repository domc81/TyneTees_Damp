'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import { GuideCard } from '@/components/training/GuideCard'
import { useAuth } from '@/context/AuthContext'
import { BookOpen, PlayCircle, Inbox, ClipboardList, Shield, Info } from 'lucide-react'

export default function TrainingPage() {
  const { role } = useAuth()

  const isRecommended = (guideRoles: string[]) => {
    if (!role) return false
    return guideRoles.includes(role)
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-500/10 rounded-xl p-3">
              <BookOpen className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Training Guides</h1>
              <p className="text-white/50">Learn how to use the survey system</p>
            </div>
          </div>

          {/* Guide cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <GuideCard
              title="Getting Started"
              description="Login, navigation, your dashboard, notifications, and understanding your role"
              href="/training/getting-started"
              icon={PlayCircle}
              iconColor="text-blue-400"
              iconBg="bg-blue-500/10"
              roles={['admin', 'office', 'surveyor']}
              isRecommended={isRecommended(['admin', 'office', 'surveyor'])}
            />
            <GuideCard
              title="Office Staff Guide"
              description="Enquiry pipeline, customers, calendar, quotations, reports, and payments"
              href="/training/office-staff"
              icon={Inbox}
              iconColor="text-purple-400"
              iconBg="bg-purple-500/10"
              roles={['admin', 'office']}
              isRecommended={isRecommended(['office'])}
            />
            <GuideCard
              title="Surveyor Guide"
              description="Daily schedule, survey wizard walkthrough, photos, voice recording, and completing surveys"
              href="/training/surveyor"
              icon={ClipboardList}
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10"
              roles={['surveyor']}
              isRecommended={isRecommended(['surveyor'])}
            />
            <GuideCard
              title="Administrator Guide"
              description="Team management, materials, pricing configuration, company settings, and notifications"
              href="/training/admin"
              icon={Shield}
              iconColor="text-amber-400"
              iconBg="bg-amber-500/10"
              roles={['admin']}
              isRecommended={isRecommended(['admin'])}
            />
          </div>

          {/* Info note */}
          <div className="section-card p-4 mt-8 flex items-start gap-3">
            <Info className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
            <p className="text-white/50 text-sm">
              Start with the <strong className="text-white/70">Getting Started</strong> guide to learn how to log in and find your way around, then read the guide for your role. Admins should also read the Office Staff Guide as they have all the same access plus more.
            </p>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
