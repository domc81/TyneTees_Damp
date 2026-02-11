'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  Download,
  Printer,
  FileText,
  ChevronRight,
  Check,
  Eye,
  Image as ImageIcon,
  Thermometer,
  Droplets,
  Wind,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Calendar,
  User,
} from 'lucide-react'

// Sample data
const reportData = {
  project_number: 'TT-2026-0001',
  client_name: 'Mr. and Mrs. Smith',
  site_address: '12 Victoria Street, Newcastle upon Tyne, NE1 4LP',
  survey_date: '2026-02-05',
  surveyor: 'John Doe',
  weather: 'Dry, Overcast',
  summary: 'Survey of rising damp to ground floor walls. Evidence of salt contamination to plaster. Recommend installation of Creamline 8 physical damp proof course and replastering using Renovating Plaster system.',
  findings: [
    {
      area: 'Living Room',
      issue: 'Rising Damp',
      severity: 'High',
      description: 'Visible damp staining to walls up to 1.2m height. Hygroscopic salt contamination present.',
      recommendation: 'Install DPC and replaster.',
      photos: ['damp_1', 'damp_2'],
    },
    {
      area: 'Hallway',
      issue: 'Rising Damp',
      severity: 'Medium',
      description: 'Minor damp staining to external walls. Early stage salt crystallisation.',
      recommendation: 'Install DPC to affected areas.',
      photos: ['damp_3'],
    },
  ],
  recommendations: [
    'Install physical damp proof course (Creamline 8)',
    'Remove affected plaster to 1.2m above DPC level',
    'Apply Renovating Plaster system',
    'Install airbricks for sub-floor ventilation',
    'Allow 2-3 weeks for drying before redecoration',
  ],
}

const conditionRatings = {
  damp: { label: 'Damp Conditions', value: 'Poor', color: 'red' },
  ventilation: { label: 'Ventilation', value: 'Inadequate', color: 'amber' },
  timber: { label: 'Timber Condition', value: 'Fair', color: 'yellow' },
  insulation: { label: 'Insulation', value: 'Adequate', color: 'green' },
}

export default function ReportPage({ params }: { params: { projectId: string } }) {
  const [activeTab, setActiveTab] = useState<'preview' | 'photos' | 'findings'>('preview')
  const [selectedFinding, setSelectedFinding] = useState(0)

  const severityColors: Record<string, string> = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    Low: 'bg-green-100 text-green-700 border-green-200',
  }

  return (
    <div className="min-h-screen bg-surface-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-surface-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-surface-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-surface-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-surface-900">Survey Report</h1>
              <p className="text-sm text-surface-500">TT-2026-0001 • Smith Residence</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button className="btn-primary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-surface-200 px-8">
        <div className="tab-list">
          <button
            onClick={() => setActiveTab('preview')}
            data-state={activeTab === 'preview' ? 'active' : ''}
            className="tab"
          >
            Report Preview
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            data-state={activeTab === 'photos' ? 'active' : ''}
            className="tab"
          >
            Photos ({reportData.findings.reduce((sum, f) => sum + f.photos.length, 0)})
          </button>
          <button
            onClick={() => setActiveTab('findings')}
            data-state={activeTab === 'findings' ? 'active' : ''}
            className="tab"
          >
            Findings ({reportData.findings.length})
          </button>
        </div>
      </div>

      <div className="p-8">
        {activeTab === 'preview' ? (
          <div className="max-w-4xl mx-auto">
            {/* Report Document */}
            <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
              {/* Cover Page */}
              <div className="bg-gradient-to-br from-brand-600 to-brand-800 text-white p-12">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h1 className="text-4xl font-bold">TYNE TEES</h1>
                    <p className="text-brand-100">Damp Proofing Specialists</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-brand-200">Survey Report</div>
                    <div className="text-3xl font-light mt-1">DAMP SURVEY</div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mt-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-brand-200 text-sm mb-1">Property Address</p>
                      <p className="text-xl font-semibold">{reportData.client_name}</p>
                      <p className="mt-1">{reportData.site_address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-brand-200 text-sm mb-1">Report Reference</p>
                      <p className="text-xl font-mono">{reportData.project_number}</p>
                      <p className="mt-1">Survey Date: {new Date(reportData.survey_date).toLocaleDateString('en-GB')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Content */}
              <div className="p-8">
                {/* Survey Details */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-surface-50 rounded-lg">
                    <User className="w-5 h-5 text-brand-600" />
                    <div>
                      <p className="text-xs text-surface-500">Surveyor</p>
                      <p className="font-medium text-surface-900">{reportData.surveyor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-surface-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-brand-600" />
                    <div>
                      <p className="text-xs text-surface-500">Survey Date</p>
                      <p className="font-medium text-surface-900">{new Date(reportData.survey_date).toLocaleDateString('en-GB')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-surface-50 rounded-lg">
                    <Wind className="w-5 h-5 text-brand-600" />
                    <div>
                      <p className="text-xs text-surface-500">Weather</p>
                      <p className="font-medium text-surface-900">{reportData.weather}</p>
                    </div>
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-surface-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-600" />
                    Executive Summary
                  </h2>
                  <p className="text-surface-600 leading-relaxed">{reportData.summary}</p>
                </div>

                {/* Condition Summary */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-surface-900 mb-4 flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-brand-600" />
                    Property Condition Summary
                  </h2>
                  <div className="grid grid-cols-4 gap-4">
                    {Object.entries(conditionRatings).map(([key, { label, value, color }]) => (
                      <div key={key} className="p-4 bg-surface-50 rounded-lg text-center">
                        <p className="text-xs text-surface-500 mb-1">{label}</p>
                        <p className={`font-bold ${
                          color === 'red' ? 'text-red-600' :
                          color === 'amber' ? 'text-amber-600' :
                          color === 'yellow' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Findings */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-surface-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Survey Findings
                  </h2>
                  <div className="space-y-4">
                    {reportData.findings.map((finding, index) => (
                      <div
                        key={index}
                        className="p-6 border border-surface-200 rounded-xl hover:border-brand-300 transition-colors cursor-pointer"
                        onClick={() => setActiveTab('findings')}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-surface-900">{finding.area}</h3>
                            <p className="text-sm text-surface-500">{finding.issue}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${severityColors[finding.severity]}`}>
                            {finding.severity} Priority
                          </span>
                        </div>
                        <p className="text-surface-600 mb-3">{finding.description}</p>
                        <div className="flex items-center gap-2 text-brand-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">{finding.recommendation}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-surface-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Recommended Works
                  </h2>
                  <ol className="space-y-3">
                    {reportData.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-surface-700 pt-1">{rec}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Photo Gallery */}
                <div>
                  <h2 className="text-xl font-bold text-surface-900 mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-brand-600" />
                    Survey Photographs
                  </h2>
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className="aspect-square rounded-lg bg-surface-100 flex items-center justify-center
                                   hover:bg-surface-200 cursor-pointer transition-colors"
                      >
                        <ImageIcon className="w-8 h-8 text-surface-300" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-surface-200 text-center text-sm text-surface-500">
                  <p>This report is prepared by Tyne Tees Damp Proofing for the sole use of the named client.</p>
                  <p className="mt-1">Report generated: {new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'photos' ? (
          /* Photos Tab */
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div
                  key={n}
                  className="aspect-[4/3] rounded-xl bg-surface-100 flex items-center justify-center
                             cursor-pointer hover:shadow-lg transition-all"
                >
                  <ImageIcon className="w-12 h-12 text-surface-300" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Findings Tab */
          <div className="max-w-4xl mx-auto">
            <div className="section-card">
              <div className="section-card-header">
                <h3 className="text-lg font-semibold text-surface-900">Detailed Findings</h3>
              </div>
              <div className="divide-y divide-surface-100">
                {reportData.findings.map((finding, index) => (
                  <div key={index} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-surface-900">{finding.area}</h4>
                        <p className="text-surface-500">{finding.issue}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${severityColors[finding.severity]}`}>
                        {finding.severity}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-4">
                      <div>
                        <h5 className="text-sm font-medium text-surface-700 mb-2">Description</h5>
                        <p className="text-surface-600">{finding.description}</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-surface-700 mb-2">Recommendation</h5>
                        <p className="text-surface-600">{finding.recommendation}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-surface-700 mb-2">Associated Photos</h5>
                      <div className="flex gap-2">
                        {finding.photos.map((p) => (
                          <div
                            key={p}
                            className="w-20 h-20 rounded-lg bg-surface-100 flex items-center justify-center"
                          >
                            <ImageIcon className="w-8 h-8 text-surface-300" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
