'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Filter,
  ChevronRight,
  Calendar,
  User,
  MapPin,
  Phone,
  Mail,
  ClipboardList,
  FileText,
  Calculator,
  CheckCircle,
  Clock,
  AlertCircle,
  Droplets,
  Bug,
  Wind,
  Home,
} from 'lucide-react'

// Sample enquiry data
const sampleEnquiries = [
  {
    id: '1',
    enquiry_number: 'CF-DAMP-2026-0001',
    internal_reference: 'SMITH-001',
    client_name: 'John Smith',
    client_email: 'smith@email.com',
    client_phone: '01234 567890',
    site_address: '12 Victoria Street',
    site_city: 'Newcastle',
    site_postcode: 'NE1 4LP',
    survey_type: 'damp',
    status: 'new',
    enquiry_date: '2026-02-04',
    proposed_survey_date: '2026-02-10',
    source: 'Website',
  },
  {
    id: '2',
    enquiry_number: 'CF-TIMB-2026-0002',
    internal_reference: 'JOHNSON-001',
    client_name: 'Sarah Johnson',
    client_email: 'johnson@email.com',
    site_address: '45 Riverside Drive',
    site_city: 'Sunderland',
    site_postcode: 'SR1 1AB',
    survey_type: 'timber',
    status: 'assigned',
    enquiry_date: '2026-02-03',
    proposed_survey_date: '2026-02-08',
    source: 'Phone',
  },
  {
    id: '3',
    enquiry_number: 'CF-COND-2026-0003',
    internal_reference: 'WILL-001',
    client_name: 'Tom Williams',
    site_address: 'Flat 3, 88 High Street',
    site_city: 'Middlesbrough',
    site_postcode: 'TS1 1XX',
    survey_type: 'condensation',
    status: 'surveyed',
    enquiry_date: '2026-02-01',
    proposed_survey_date: '2026-02-05',
    source: 'Referral',
  },
  {
    id: '4',
    enquiry_number: 'CF-DAMP-2026-0004',
    internal_reference: 'BROWN-001',
    client_name: 'Emma Brown',
    client_email: 'emma@email.com',
    site_address: '22 Church Lane',
    site_city: 'Durham',
    site_postcode: 'DH1 3AB',
    survey_type: 'damp',
    status: 'quoted',
    enquiry_date: '2026-01-28',
    proposed_survey_date: '2026-02-01',
    source: 'Repeat',
  },
]

const surveyTypeConfig: Record<string, { icon: typeof Droplets; color: string; bgColor: string }> = {
  damp: { icon: Droplets, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  timber: { icon: Bug, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  woodworm: { icon: Bug, color: 'text-amber-700', bgColor: 'bg-amber-50' },
  condensation: { icon: Wind, color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
  structural: { icon: Home, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  comprehensive: { icon: ClipboardList, color: 'text-purple-600', bgColor: 'bg-purple-50' },
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  new: { label: 'New', color: 'bg-red-100 text-red-700', icon: AlertCircle },
  assigned: { label: 'Assigned', color: 'bg-blue-100 text-blue-700', icon: Clock },
  surveyed: { label: 'Surveyed', color: 'bg-amber-100 text-amber-700', icon: CheckCircle },
  quoted: { label: 'Quoted', color: 'bg-emerald-100 text-emerald-700', icon: FileText },
  accepted: { label: 'Accepted', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  declined: { label: 'Declined', color: 'bg-gray-100 text-gray-700', icon: AlertCircle },
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState(sampleEnquiries)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      (enquiry.client_name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (enquiry.site_address ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (enquiry.enquiry_number ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-surface-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-900">Enquiries</h1>
            <p className="text-sm text-surface-500">{filteredEnquiries.length} enquiries</p>
          </div>
          <Link href="/enquiries/new" className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Enquiry
          </Link>
        </div>
      </header>

      <div className="p-8">
        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              placeholder="Search by client, address, or enquiry number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field w-auto"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="assigned">Assigned</option>
            <option value="surveyed">Surveyed</option>
            <option value="quoted">Quoted</option>
            <option value="accepted">Accepted</option>
          </select>
        </div>

        {/* Enquiries List */}
        {filteredEnquiries.length === 0 ? (
          <div className="empty-state">
            <ClipboardList className="empty-state-icon" />
            <p className="empty-state-title">No enquiries found</p>
            <p className="empty-state-description">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-surface-200 divide-y divide-surface-100">
            {filteredEnquiries.map((enquiry) => {
              const typeConfig = surveyTypeConfig[enquiry.survey_type] || surveyTypeConfig.damp
              const statusConf = statusConfig[enquiry.status] || statusConfig.new
              const StatusIcon = statusConf.icon

              return (
                <Link
                  key={enquiry.id}
                  href={`/enquiries/${enquiry.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-surface-50 transition-colors"
                >
                  {/* Survey Type Badge */}
                  <div className={`p-3 rounded-lg ${typeConfig.bgColor}`}>
                    <typeConfig.icon className={`w-5 h-5 ${typeConfig.color}`} />
                  </div>

                  {/* Main Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-surface-500">{enquiry.enquiry_number}</span>
                      <span className={`badge ${statusConf.color}`}>{statusConf.label}</span>
                    </div>
                    <h3 className="font-semibold text-surface-900">{enquiry.client_name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-surface-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {enquiry.site_address}, {enquiry.site_city}
                      </span>
                      <span>{enquiry.site_postcode}</span>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-surface-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {enquiry.proposed_survey_date || 'TBD'}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-surface-400">
                      <span>{enquiry.source}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {enquiry.status === 'surveyed' && (
                      <Link
                        href={`/enquiries/${enquiry.id}/costing`}
                        className="btn-secondary flex items-center gap-2 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Calculator className="w-4 h-4" />
                        Costing
                      </Link>
                    )}
                    {enquiry.status === 'quoted' && (
                      <Link
                        href={`/enquiries/${enquiry.id}/report`}
                        className="btn-primary flex items-center gap-2 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FileText className="w-4 h-4" />
                        View Quote
                      </Link>
                    )}
                    <ChevronRight className="w-5 h-5 text-surface-300" />
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* Workflow Summary */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <WorkflowCard title="New Enquiries" count={enquiries.filter(e => e.status === 'new').length} icon={AlertCircle} color="text-red-600" />
          <WorkflowCard title="Assigned" count={enquiries.filter(e => e.status === 'assigned').length} icon={Clock} color="text-blue-600" />
          <WorkflowCard title="Awaiting Quote" count={enquiries.filter(e => e.status === 'surveyed').length} icon={Calculator} color="text-amber-600" />
          <WorkflowCard title="Quoted" count={enquiries.filter(e => e.status === 'quoted').length} icon={FileText} color="text-emerald-600" />
        </div>
      </div>
    </div>
  )
}

function WorkflowCard({ title, count, icon: Icon, color }: { title: string; count: number; icon: any; color: string }) {
  return (
    <div className="section-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-surface-500">{title}</p>
          <p className="text-3xl font-bold text-surface-900 mt-1">{count}</p>
        </div>
        <div className={`p-3 rounded-xl bg-surface-50 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}
