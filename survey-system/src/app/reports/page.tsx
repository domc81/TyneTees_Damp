'use client'

import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'

export default function ReportsIndexPage() {
  return (
    <div className="min-h-screen bg-surface-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-surface-600 hover:text-surface-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="section-card p-8 text-center">
          <FileText className="w-16 h-16 text-brand-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-surface-900 mb-2">Reports</h1>
          <p className="text-surface-500 mb-6">
            Project reports are available from the project detail page.
          </p>
          <Link href="/surveys" className="btn-primary inline-flex items-center gap-2">
            View Surveys
          </Link>
        </div>
      </div>
    </div>
  )
}
