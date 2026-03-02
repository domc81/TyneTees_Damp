'use client'

// =============================================================================
// Public Quotation — Client Components
//
// QuotationViewTracker: fires analytics beacon on page load (fire-and-forget)
// QuotationActions:     Download PDF + Print buttons
// QuotationResponseSection: Accept/Decline with legal compliance
//
// These are the only interactive parts of the otherwise server-rendered page.
// =============================================================================

import { useEffect, useState, useCallback } from 'react'
import {
  Download,
  Printer,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  X,
  ChevronDown,
  Shield,
  FileSignature,
} from 'lucide-react'

// ─── View Tracker ─────────────────────────────────────────────────────────────
// Fires a POST to the analytics endpoint on mount. Non-blocking — page renders
// immediately and this runs in the background. Errors are swallowed silently.

export function QuotationViewTracker({ token }: { token: string }) {
  useEffect(() => {
    fetch(`/api/q/${token}/view`, {
      method: 'POST',
      keepalive: true, // survives page navigation if user immediately scrolls away
    }).catch(() => {
      // Analytics are non-critical — never surface errors to the customer
    })
  }, [token])

  return null
}

// ─── Action Buttons ───────────────────────────────────────────────────────────
// Download PDF triggers the /api/q/[token]/pdf route.
// Print uses window.print() — CSS @media print in quotation-public.css handles layout.

export function QuotationActions({
  token,
  quotationNumber,
  className,
}: {
  token: string
  quotationNumber: string
  className?: string
}) {
  const [isDownloading, setIsDownloading] = useState(false)

  async function handleDownload() {
    setIsDownloading(true)
    try {
      const res = await fetch(`/api/q/${token}/pdf`)
      if (!res.ok) throw new Error(`PDF generation failed (${res.status})`)

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${quotationNumber}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      alert('Could not generate the PDF. Please use the Print option, or contact us directly.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className={`flex items-center gap-3 ${className ?? ''}`}>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] text-white text-sm font-semibold rounded-lg hover:bg-[#2A4F7F] active:bg-[#163050] transition-colors disabled:opacity-50 disabled:cursor-not-allowed select-none"
      >
        {isDownloading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Generating…</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </>
        )}
      </button>

      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-[#374151] text-sm font-semibold rounded-lg border border-[#D1D5DB] hover:bg-[#F9FAFB] active:bg-[#F3F4F6] transition-colors select-none"
      >
        <Printer className="w-4 h-4" />
        <span>Print</span>
      </button>
    </div>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ─── Quotation Response Section ──────────────────────────────────────────────

interface QuotationResponseProps {
  token: string
  status: string
  isExpired: boolean
  isRespondable: boolean
  isAccepted: boolean
  isDeclined: boolean
  acceptanceSignatoryName: string | null
  acceptedAt: string | null
  declinedAt: string | null
  validUntil: string
  termsText: string
  termsHash: string
  totalInclVat: number
  vatAmount: number
  vatRate: number
  depositAmount: number
  depositPercentage: number
  quotationSnapshot: Record<string, unknown>
  companyPhone: string
  companyEmail: string
  companyName: string
  quotationNumber: string
}

export function QuotationResponseSection(props: QuotationResponseProps) {
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showDeclineModal, setShowDeclineModal] = useState(false)

  // After a successful response, we show a confirmation banner
  const [confirmedResponse, setConfirmedResponse] = useState<{
    type: 'accepted' | 'declined'
    signatoryName?: string
    respondedAt?: string
  } | null>(null)

  // If we have a confirmed response (just submitted), show that
  if (confirmedResponse) {
    if (confirmedResponse.type === 'accepted') {
      return (
        <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6 mb-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-800 text-base">
                Thank you — your acceptance has been recorded
              </p>
              <p className="text-sm text-green-700 mt-2 leading-relaxed">
                Signed by {confirmedResponse.signatoryName} on{' '}
                {confirmedResponse.respondedAt ? formatDate(confirmedResponse.respondedAt) : 'today'}.
                We&apos;ll be in touch shortly to arrange next steps.
              </p>
              <p className="text-sm text-green-700 mt-2">
                If you have any questions, call us on{' '}
                <a href={`tel:${props.companyPhone}`} className="font-semibold underline">
                  {props.companyPhone}
                </a>
              </p>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-6 mb-4">
        <div className="flex items-start gap-3">
          <XCircle className="w-6 h-6 text-[#9CA3AF] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-[#374151] text-base">
              Thank you for letting us know
            </p>
            <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
              If you change your mind or would like to discuss the quotation, please contact us on{' '}
              <a href={`tel:${props.companyPhone}`} className="text-[#1E3A5F] font-semibold underline">
                {props.companyPhone}
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Already accepted — show green banner
  if (props.isAccepted) {
    return (
      <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6 mb-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-800 text-base">
              This quotation was accepted
              {props.acceptanceSignatoryName ? ` by ${props.acceptanceSignatoryName}` : ''}
              {props.acceptedAt ? ` on ${formatDate(props.acceptedAt)}` : ''}
            </p>
            <p className="text-sm text-green-700 mt-1">
              If you have any questions, contact us on{' '}
              <a href={`tel:${props.companyPhone}`} className="font-semibold underline">
                {props.companyPhone}
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Already declined — neutral banner
  if (props.isDeclined) {
    return (
      <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-6 mb-4">
        <div className="flex items-start gap-3">
          <XCircle className="w-6 h-6 text-[#9CA3AF] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-[#374151] text-base">
              This quotation was declined
              {props.declinedAt ? ` on ${formatDate(props.declinedAt)}` : ''}
            </p>
            <p className="text-sm text-[#6B7280] mt-1">
              If you&apos;ve changed your mind, please contact us on{' '}
              <a href={`tel:${props.companyPhone}`} className="text-[#1E3A5F] font-semibold underline">
                {props.companyPhone}
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Expired — amber banner (already shown at top, but also here for clarity)
  if (props.isExpired) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 mb-4">
        <div className="flex items-start gap-3">
          <Clock className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-base">
              This quotation expired on {formatDate(props.validUntil)}
            </p>
            <p className="text-sm text-amber-700 mt-1">
              Please contact us on{' '}
              <a href={`tel:${props.companyPhone}`} className="font-semibold underline">
                {props.companyPhone}
              </a>{' '}
              for an updated quote.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Draft — no response section
  if (props.status === 'draft') {
    return null
  }

  // Respondable — show Accept / Decline buttons
  if (!props.isRespondable) return null

  return (
    <>
      <div className="rounded-xl border-2 border-[#1E3A5F] bg-white p-6 mb-4">
        <p className="text-sm font-semibold text-[#374151] mb-4">
          Ready to proceed?
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowAcceptModal(true)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors select-none"
          >
            <CheckCircle2 className="w-5 h-5" />
            Accept Quotation
          </button>
          <button
            onClick={() => setShowDeclineModal(true)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#6B7280] text-sm font-semibold rounded-lg border border-[#D1D5DB] hover:bg-[#F9FAFB] active:bg-[#F3F4F6] transition-colors select-none"
          >
            <XCircle className="w-5 h-5" />
            Decline Quotation
          </button>
        </div>
      </div>

      {showAcceptModal && (
        <AcceptanceModal
          {...props}
          onClose={() => setShowAcceptModal(false)}
          onSuccess={(signatoryName, respondedAt) => {
            setShowAcceptModal(false)
            setConfirmedResponse({ type: 'accepted', signatoryName, respondedAt })
          }}
        />
      )}

      {showDeclineModal && (
        <DeclineModal
          token={props.token}
          quotationSnapshot={props.quotationSnapshot}
          companyPhone={props.companyPhone}
          onClose={() => setShowDeclineModal(false)}
          onSuccess={() => {
            setShowDeclineModal(false)
            setConfirmedResponse({ type: 'declined' })
          }}
        />
      )}
    </>
  )
}

// ─── Acceptance Modal ────────────────────────────────────────────────────────

function AcceptanceModal({
  token,
  termsText,
  termsHash,
  totalInclVat,
  vatAmount,
  vatRate,
  depositAmount,
  depositPercentage,
  quotationSnapshot,
  companyName,
  quotationNumber,
  onClose,
  onSuccess,
}: QuotationResponseProps & {
  onClose: () => void
  onSuccess: (signatoryName: string, respondedAt: string) => void
}) {
  const [signatoryName, setSignatoryName] = useState('')
  const [consentTerms, setConsentTerms] = useState(false)
  const [consentCoolingOff, setConsentCoolingOff] = useState(false)
  const [consentSpecialOrders, setConsentSpecialOrders] = useState(false)
  const [waiveCoolingOff, setWaiveCoolingOff] = useState(false)
  const [customerNotes, setCustomerNotes] = useState('')
  const [showNotes, setShowNotes] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const balanceDue = totalInclVat - depositAmount
  const allConsentsChecked = consentTerms && consentCoolingOff && consentSpecialOrders
  const signatureValid = signatoryName.trim().length >= 2
  const canSubmit = allConsentsChecked && signatureValid && !isSubmitting

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && !isSubmitting) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSubmitting, onClose])

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) return

    setIsSubmitting(true)
    setError(null)

    try {
      const screenResolution = `${window.screen.width}x${window.screen.height}`

      const res = await fetch(`/api/q/${token}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          response: 'accepted',
          signatoryName: signatoryName.trim(),
          signatoryTypedAt: new Date().toISOString(),
          consentTermsAccepted: true,
          consentCoolingOffAcknowledged: true,
          waiveCoolingOff,
          consentSpecialOrders: true,
          customerNotes: customerNotes.trim() || undefined,
          termsContentHash: termsHash,
          quotationSnapshot,
          screenResolution,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setIsSubmitting(false)
        return
      }

      onSuccess(signatoryName.trim(), data.respondedAt)
    } catch {
      setError('A network error occurred. Please check your connection and try again.')
      setIsSubmitting(false)
    }
  }, [canSubmit, token, signatoryName, waiveCoolingOff, customerNotes, termsHash, quotationSnapshot, onSuccess])

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed inset-0 overflow-y-auto">
        <div className="min-h-full flex items-start justify-center p-4 sm:p-6">
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl"
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
          >

            {/* ── Modal header ─────────────────────────────────────────────── */}
            <div className="sticky top-0 z-10 bg-white rounded-t-2xl border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FileSignature className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#111827]">Accept Quotation</h2>
                  <p className="text-xs text-[#9CA3AF]">{quotationNumber} — {companyName}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="p-2 rounded-lg hover:bg-[#F3F4F6] transition-colors disabled:opacity-50"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>

            {/* ── Modal body (scrollable) ──────────────────────────────────── */}
            <div className="px-6 py-6 space-y-8">

              {/* Section 1 — Financial Summary */}
              <section>
                <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
                  Financial Summary
                </h3>
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#374151] font-semibold">Works total (inc. VAT at {Math.round(vatRate * 100)}%)</span>
                    <span className="text-[#1E3A5F] font-bold text-base tabular-nums">{formatCurrency(totalInclVat)}</span>
                  </div>
                  {depositAmount > 0 && (
                    <>
                      <div className="border-t border-[#E5E7EB] pt-3 flex justify-between text-sm">
                        <span className="text-[#6B7280]">Deposit required ({Math.round(depositPercentage * 100)}%)</span>
                        <span className="text-[#1E3A5F] font-semibold tabular-nums">{formatCurrency(depositAmount)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6B7280]">Balance due on completion</span>
                        <span className="text-[#374151] font-medium tabular-nums">{formatCurrency(balanceDue)}</span>
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* Section 2 — Terms and Conditions */}
              <section>
                <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
                  Terms &amp; Conditions
                </h3>
                <div className="rounded-xl border border-[#E5E7EB] bg-white max-h-64 overflow-y-auto p-5">
                  <div className="text-sm text-[#374151] leading-relaxed whitespace-pre-line">
                    {termsText || 'No terms and conditions available.'}
                  </div>
                </div>
              </section>

              {/* Section 3 — Your Rights */}
              <section>
                <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Your Rights
                </h3>

                {/* Cooling-off period */}
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 mb-4">
                  <p className="text-sm font-semibold text-blue-800 mb-2">14-Day Cooling-Off Period</p>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    Under the Consumer Contracts Regulations 2013, you have the right to cancel this contract
                    within 14 days of acceptance without giving any reason.
                  </p>
                  <p className="text-sm text-blue-700 leading-relaxed mt-2">
                    To cancel, you must inform us by a clear statement (e.g. letter, email, or phone call)
                    within 14 days.
                  </p>
                </div>

                {/* Special orders */}
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 mb-4">
                  <p className="text-sm font-semibold text-amber-800 mb-2">Special-Order Materials</p>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    Please note: if the works include special-order materials or bespoke items, you may not
                    be entitled to a full refund for these items once ordered. This is in accordance with the
                    Consumer Rights Act 2015.
                  </p>
                </div>

                {/* Optional cooling-off waiver */}
                <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={waiveCoolingOff}
                      onChange={(e) => setWaiveCoolingOff(e.target.checked)}
                      className="mt-0.5 w-5 h-5 rounded border-gray-300 text-[#1E3A5F] focus:ring-[#1E3A5F] cursor-pointer"
                    />
                    <div>
                      <span className="text-sm font-semibold text-[#374151]">
                        I would like the work to start within the cooling-off period
                      </span>
                      <span className="text-xs text-[#9CA3AF] block mt-0.5">(Optional)</span>
                    </div>
                  </label>
                  {waiveCoolingOff && (
                    <div className="mt-3 ml-8 rounded-lg bg-amber-50 border border-amber-200 p-3">
                      <p className="text-xs text-amber-800 leading-relaxed">
                        I understand that by requesting work to start before the cooling-off period ends,
                        I may be liable for reasonable costs of any work already carried out if I later
                        choose to cancel.
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Section 4 — Consent Checkboxes */}
              <section>
                <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">
                  Consent
                </h3>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border border-[#E5E7EB] hover:border-[#1E3A5F] transition-colors">
                    <input
                      type="checkbox"
                      checked={consentTerms}
                      onChange={(e) => setConsentTerms(e.target.checked)}
                      className="mt-0.5 w-5 h-5 rounded border-gray-300 text-[#1E3A5F] focus:ring-[#1E3A5F] cursor-pointer"
                    />
                    <span className="text-sm text-[#374151] leading-relaxed">
                      I have read and agree to the terms and conditions
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border border-[#E5E7EB] hover:border-[#1E3A5F] transition-colors">
                    <input
                      type="checkbox"
                      checked={consentCoolingOff}
                      onChange={(e) => setConsentCoolingOff(e.target.checked)}
                      className="mt-0.5 w-5 h-5 rounded border-gray-300 text-[#1E3A5F] focus:ring-[#1E3A5F] cursor-pointer"
                    />
                    <span className="text-sm text-[#374151] leading-relaxed">
                      I understand my right to a 14-day cooling-off period as described above
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border border-[#E5E7EB] hover:border-[#1E3A5F] transition-colors">
                    <input
                      type="checkbox"
                      checked={consentSpecialOrders}
                      onChange={(e) => setConsentSpecialOrders(e.target.checked)}
                      className="mt-0.5 w-5 h-5 rounded border-gray-300 text-[#1E3A5F] focus:ring-[#1E3A5F] cursor-pointer"
                    />
                    <span className="text-sm text-[#374151] leading-relaxed">
                      I understand that special-order materials may be non-refundable once ordered
                    </span>
                  </label>
                </div>
              </section>

              {/* Section 5 — Electronic Signature */}
              <section>
                <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FileSignature className="w-4 h-4" />
                  Electronic Signature
                </h3>
                <div className="rounded-xl border-2 border-[#1E3A5F] bg-white p-5">
                  <label className="block text-sm font-semibold text-[#374151] mb-3">
                    Please type your full name to sign this acceptance
                  </label>
                  <input
                    type="text"
                    value={signatoryName}
                    onChange={(e) => setSignatoryName(e.target.value)}
                    placeholder="e.g. John Smith"
                    className="w-full px-4 py-3.5 text-lg border-2 border-[#E5E7EB] rounded-lg focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-colors text-[#111827] placeholder:text-[#D1D5DB]"
                    style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                    autoComplete="name"
                  />
                  <p className="text-xs text-[#6B7280] mt-3 leading-relaxed">
                    By typing your name above, you are providing your electronic signature and entering
                    into a legally binding contract for the works described in this quotation.
                  </p>
                </div>
              </section>

              {/* Optional notes */}
              <section>
                <button
                  type="button"
                  onClick={() => setShowNotes(!showNotes)}
                  className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#374151] transition-colors"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${showNotes ? 'rotate-180' : ''}`} />
                  Any notes or special requests?
                </button>
                {showNotes && (
                  <textarea
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="Optional — any additional notes for our team..."
                    rows={3}
                    className="mt-3 w-full px-4 py-3 text-sm border border-[#E5E7EB] rounded-lg focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-colors resize-none"
                  />
                )}
              </section>

              {/* Error message */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Section 6 — Submit button */}
              <section className="pb-2">
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="w-full py-4 px-6 rounded-xl text-white font-bold text-base transition-all select-none disabled:opacity-40 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:bg-green-600"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Recording your acceptance…
                    </span>
                  ) : signatureValid ? (
                    `Accept as ${signatoryName.trim()}`
                  ) : (
                    'Accept Quotation & Sign'
                  )}
                </button>
                {!allConsentsChecked && (
                  <p className="text-xs text-[#9CA3AF] text-center mt-2">
                    Please tick all three consent checkboxes above to continue
                  </p>
                )}
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Decline Modal ───────────────────────────────────────────────────────────

function DeclineModal({
  token,
  quotationSnapshot,
  companyPhone,
  onClose,
  onSuccess,
}: {
  token: string
  quotationSnapshot: Record<string, unknown>
  companyPhone: string
  onClose: () => void
  onSuccess: () => void
}) {
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && !isSubmitting) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSubmitting, onClose])

  async function handleDecline() {
    setIsSubmitting(true)
    setError(null)

    try {
      const screenResolution = `${window.screen.width}x${window.screen.height}`

      const res = await fetch(`/api/q/${token}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          response: 'declined',
          customerNotes: notes.trim() || undefined,
          quotationSnapshot,
          screenResolution,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setIsSubmitting(false)
        return
      }

      onSuccess()
    } catch {
      setError('A network error occurred. Please check your connection and try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6"
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
      >
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#F3F4F6] transition-colors disabled:opacity-50"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-[#6B7280]" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center">
            <XCircle className="w-5 h-5 text-[#6B7280]" />
          </div>
          <h2 className="text-lg font-bold text-[#111827]">Decline Quotation</h2>
        </div>

        <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
          We&apos;re sorry to hear you&apos;d like to decline. Could you let us know why?
          Your feedback helps us improve.
        </p>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional — your feedback is appreciated..."
          rows={4}
          className="w-full px-4 py-3 text-sm border border-[#E5E7EB] rounded-lg focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-colors resize-none mb-4"
        />

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 mb-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 text-sm font-semibold rounded-lg border border-[#D1D5DB] text-[#374151] hover:bg-[#F9FAFB] transition-colors disabled:opacity-50"
          >
            Go Back
          </button>
          <button
            onClick={handleDecline}
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 text-sm font-semibold rounded-lg bg-[#374151] text-white hover:bg-[#1F2937] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2 justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting…
              </span>
            ) : (
              'Confirm Decline'
            )}
          </button>
        </div>

        <p className="text-xs text-[#9CA3AF] text-center mt-4">
          Changed your mind? Call us on{' '}
          <a href={`tel:${companyPhone}`} className="text-[#1E3A5F] font-medium">{companyPhone}</a>
        </p>
      </div>
    </div>
  )
}
