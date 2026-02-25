'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Download,
  Send,
  Printer,
  Check,
  MapPin,
  Mail,
  Building,
} from 'lucide-react'
import { formatCurrency } from '@/lib/cost-calculator'
import { getProject, getProjectSections, getProjectItems } from '@/lib/store'
import { calculateLineItemTotal } from '@/lib/cost-calculator'

interface QuotationLineItem {
  name: string
  price: number
  isOptional: boolean
  sectionName?: string
}

export default function QuotationPage({ params }: { params: { projectId: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<any>(null)
  const [lineItems, setLineItems] = useState<QuotationLineItem[]>([])
  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview')
  const [showSendModal, setShowSendModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [quotationData, setQuotationData] = useState({
    validDays: 30,
    depositPercentage: 30,
    notes: '',
    terms: 'Price valid for 30 days. 30% deposit required to commence works. Balance payable on completion.',
  })

  useEffect(() => {
    const projectData = getProject(params.projectId)
    if (projectData) {
      setProject(projectData)
      const sections = getProjectSections(params.projectId)
      const items = getProjectItems(params.projectId)

      // Transform items for quotation
      const quotationItems: QuotationLineItem[] = items
        .filter(item => item.is_active !== false)
        .map(item => {
          const calc = calculateLineItemTotal(item)
          const section = sections.find(s => s.id === item.section_id)
          return {
            name: `${section?.section_name || 'Item'}: ${item.item_name}`,
            price: calc.total,
            isOptional: item.is_optional || false,
            sectionName: section?.section_name,
          }
        })

      setLineItems(quotationItems)
    }
    setIsLoading(false)
  }, [params.projectId])

  const subtotal = lineItems.reduce((sum, item) => sum + item.price, 0)
  const optionalTotal = lineItems.filter(i => i.isOptional).reduce((sum, i) => sum + i.price, 0)
  const requiredTotal = subtotal - optionalTotal
  const vatAmount = subtotal * 0.20
  const total = subtotal + vatAmount
  const deposit = total * (quotationData.depositPercentage / 100)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-100 flex items-center justify-center">
        <div className="spinner" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-surface-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-surface-900">Project not found</h2>
          <Link href="/surveys" className="btn-primary mt-4 inline-block">
            Back to Surveys
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-surface-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/surveys/${params.projectId}`} className="p-2 rounded-lg hover:bg-surface-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-surface-600" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-surface-900">Customer Quotation</h1>
              <p className="text-sm text-surface-500">{project.project_number} • {project.client_name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <Download className="w-4 h-4" />
              PDF
            </button>
            <button
              onClick={() => setShowSendModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send to Customer
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
            Preview
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            data-state={activeTab === 'edit' ? 'active' : ''}
            className="tab"
          >
            Edit Details
          </button>
        </div>
      </div>

      <div className="p-8">
        {activeTab === 'preview' ? (
          <div className="max-w-4xl mx-auto">
            {/* A4 Document Preview */}
            <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
              {/* Document Header */}
              <div className="bg-brand-600 text-white p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">TYNE TEES</h1>
                    <p className="text-brand-100">Damp Proofing Specialists</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-light">QUOTATION</p>
                    <p className="text-brand-100 mt-2">Ref: {project.project_number}</p>
                  </div>
                </div>
              </div>

              {/* Document Body */}
              <div className="p-8">
                {/* Client & Site Details */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-3">Prepared For</h3>
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-surface-900">{project.client_name}</p>
                      <div className="flex items-center gap-2 text-surface-600">
                        <MapPin className="w-4 h-4" />
                        <span>{project.site_address}</span>
                      </div>
                      {project.site_city && (
                        <div className="flex items-center gap-2 text-surface-600">
                          <span>{project.site_city}</span>
                        </div>
                      )}
                      {project.site_postcode && (
                        <div className="flex items-center gap-2 text-surface-600">
                          <span>{project.site_postcode}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <h3 className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-3">Quotation Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-end gap-2 text-surface-600">
                        <span>Date:</span>
                        <span className="font-medium">
                          {project.survey_date ? new Date(project.survey_date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      <div className="flex items-center justify-end gap-2 text-surface-600">
                        <span>Valid Until:</span>
                        <span className="font-medium">
                          {new Date(Date.now() + quotationData.validDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      <div className="flex items-center justify-end gap-2 text-surface-600">
                        <span>Surveyor:</span>
                        <span className="font-medium">Tyne Tees Surveyor</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Survey Description */}
                <div className="mb-8 p-4 bg-surface-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-surface-700 mb-2">Survey Summary</h3>
                  <p className="text-surface-600">
                    Following our recent survey of the above property, we are pleased to provide this quotation
                    for the installation of a comprehensive damp proofing solution to address the issues identified.
                    The works detailed below will provide long-term protection against rising damp.
                  </p>
                </div>

                {/* Pricing Table */}
                <table className="w-full mb-8">
                  <thead>
                    <tr className="border-b-2 border-surface-200">
                      <th className="text-left py-3 text-sm font-semibold text-surface-500 uppercase">Description</th>
                      <th className="text-right py-3 text-sm font-semibold text-surface-500 uppercase">Qty</th>
                      <th className="text-right py-3 text-sm font-semibold text-surface-500 uppercase">Unit Price</th>
                      <th className="text-right py-3 text-sm font-semibold text-surface-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-100">
                    {lineItems.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-surface-500">
                          No costing items added yet. Add items in the Costing section.
                        </td>
                      </tr>
                    ) : (
                      lineItems.map((item, index) => (
                        <tr key={index} className={item.isOptional ? 'bg-amber-50/50' : ''}>
                          <td className="py-4">
                            <p className="font-medium text-surface-900">{item.name}</p>
                            {item.isOptional && (
                              <span className="text-xs text-amber-600">Optional - not included in base price</span>
                            )}
                          </td>
                          <td className="py-4 text-right text-surface-600">1</td>
                          <td className="py-4 text-right text-surface-600">{formatCurrency(item.price)}</td>
                          <td className="py-4 text-right font-medium text-surface-900">
                            {formatCurrency(item.price)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end mb-8">
                  <div className="w-64 space-y-3">
                    <div className="flex justify-between text-surface-600">
                      <span>Subtotal (Required Works)</span>
                      <span>{formatCurrency(requiredTotal)}</span>
                    </div>
                    <div className="flex justify-between text-surface-600">
                      <span>Optional Works</span>
                      <span>{formatCurrency(optionalTotal)}</span>
                    </div>
                    <div className="flex justify-between text-surface-600 pt-3 border-t border-surface-200">
                      <span>Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-surface-600">
                      <span>VAT (20%)</span>
                      <span>{formatCurrency(vatAmount)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-surface-900 pt-3 border-t-2 border-surface-200">
                      <span>Total (Inc. VAT)</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Terms */}
                <div className="p-4 bg-surface-50 rounded-lg mb-8">
                  <h3 className="text-sm font-semibold text-surface-700 mb-2">Payment Terms</h3>
                  <p className="text-sm text-surface-600">{quotationData.terms}</p>
                </div>

                {/* Deposit */}
                <div className="p-6 bg-brand-50 rounded-xl border border-brand-200 mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-brand-800 font-semibold">Deposit Required ({quotationData.depositPercentage}%)</p>
                      <p className="text-brand-600 text-sm mt-1">To commence works</p>
                    </div>
                    <p className="text-3xl font-bold text-brand-600">{formatCurrency(deposit)}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-surface-500 pt-8 border-t border-surface-200">
                  <p>Tyne Tees Damp Proofing • Registered in England & Wales</p>
                  <p className="mt-1">All works carry a 20-year guarantee subject to insurance-backed warranty</p>
                </div>
              </div>
            </div>

            {/* Acceptance Section */}
            <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-surface-900 mb-4">Customer Acceptance</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="border-b border-surface-200 pb-2">
                    <p className="text-sm text-surface-500">Customer Signature</p>
                  </div>
                  <div className="border-b border-surface-200 pb-2">
                    <p className="text-sm text-surface-500">Date</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-surface-200 pb-2">
                    <p className="text-sm text-surface-500">Print Name</p>
                  </div>
                  <div className="p-4 bg-surface-50 rounded-lg">
                    <p className="text-sm text-surface-600">
                      I accept this quotation and authorise Tyne Tees Damp Proofing to proceed with the works as detailed above.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="max-w-2xl mx-auto">
            <div className="section-card">
              <div className="section-card-header">
                <h3 className="text-lg font-semibold text-surface-900">Quotation Settings</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="input-label">Valid For (Days)</label>
                    <input
                      type="number"
                      value={quotationData.validDays}
                      onChange={(e) => setQuotationData({ ...quotationData, validDays: parseInt(e.target.value) })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="input-label">Deposit Percentage</label>
                    <input
                      type="number"
                      value={quotationData.depositPercentage}
                      onChange={(e) => setQuotationData({ ...quotationData, depositPercentage: parseInt(e.target.value) })}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="input-label">Notes</label>
                  <textarea
                    value={quotationData.notes}
                    onChange={(e) => setQuotationData({ ...quotationData, notes: e.target.value })}
                    className="input-field resize-none"
                    rows={4}
                    placeholder="Additional notes to include..."
                  />
                </div>

                <div>
                  <label className="input-label">Terms & Conditions</label>
                  <textarea
                    value={quotationData.terms}
                    onChange={(e) => setQuotationData({ ...quotationData, terms: e.target.value })}
                    className="input-field resize-none"
                    rows={4}
                  />
                </div>

                <button className="btn-primary w-full">Save Settings</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Send Modal */}
      {showSendModal && project && (
        <SendQuotationModal
          onClose={() => setShowSendModal(false)}
          email={project.client_email || ''}
          projectNumber={project.project_number}
        />
      )}
    </div>
  )
}

// Send Quotation Modal
function SendQuotationModal({
  onClose,
  email,
  projectNumber,
}: {
  onClose: () => void
  email: string
  projectNumber: string
}) {
  const [recipientEmail, setRecipientEmail] = useState(email)
  const [message, setMessage] = useState(
    `Please find attached our quotation ${projectNumber} for the damp proofing works at your property.\n\nWe look forward to hearing from you.`
  )
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSend = async () => {
    setIsSending(true)
    // Would call Edge Function to send email
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSending(false)
    setIsSent(true)
    setTimeout(() => {
      onClose()
      setIsSent(false)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-surface-100">
          <h3 className="text-lg font-semibold text-surface-900">Send Quotation</h3>
        </div>

        <div className="p-6 space-y-4">
          {isSent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-lg font-semibold text-surface-900">Quotation Sent!</p>
              <p className="text-surface-500 mt-1">The customer will receive it shortly.</p>
            </div>
          ) : (
            <>
              <div>
                <label className="input-label">To Email</label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="input-label">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-field resize-none"
                  rows={5}
                />
              </div>

              <div className="p-4 bg-surface-50 rounded-lg">
                <p className="text-sm text-surface-600">
                  The quotation PDF will be automatically attached to this email.
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={onClose} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  disabled={isSending}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <>
                      <div className="spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
