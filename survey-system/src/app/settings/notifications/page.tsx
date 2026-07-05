'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Bell,
  Mail,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Info,
  Shield,
  ExternalLink,
} from 'lucide-react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import { useAuth } from '@/context/AuthContext'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NotificationPreference {
  id: string
  event_type: string
  in_app_enabled: boolean
  email_enabled: boolean
  email_recipient_type: string
  description: string | null
}

interface EmailConfig {
  mode: 'platform' | 'custom'
  platformFromEmail: string
  customFromEmail: string
  customFromName: string
  platformResendKeyConfigured: boolean
  customResendKeyConfigured: boolean
}

interface SettingsState {
  emailConfig: EmailConfig
  notificationPreferences: NotificationPreference[]
}

// ---------------------------------------------------------------------------
// Event type grouping
// ---------------------------------------------------------------------------

const EVENT_GROUPS: { label: string; events: string[] }[] = [
  {
    label: 'Bookings',
    events: ['booking_created', 'booking_updated', 'booking_cancelled', 'booking_reminder'],
  },
  {
    label: 'Surveys',
    events: ['survey_created', 'survey_assigned', 'survey_completed', 'survey_status_changed'],
  },
  {
    label: 'Quotations',
    events: ['quotation_generated', 'quotation_sent', 'quotation_viewed', 'quotation_accepted', 'quotation_declined'],
  },
  {
    label: 'Reports',
    events: ['report_generated', 'report_published'],
  },
  {
    label: 'Leads & System',
    events: ['enquiry_created', 'system_alert'],
  },
]

const RECIPIENT_LABELS: Record<string, string> = {
  internal: 'Internal',
  customer: 'Customer',
  both: 'Both',
}

// ---------------------------------------------------------------------------
// Small helper components
// ---------------------------------------------------------------------------

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean
  onChange: (val: boolean) => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-transparent ${
        checked ? 'bg-brand-500' : 'bg-white/15'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

function StatusBadge({ configured }: { configured: boolean }) {
  return configured ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 text-xs font-medium border border-emerald-500/20">
      <CheckCircle className="w-3.5 h-3.5" />
      Configured
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 text-xs font-medium border border-amber-500/20">
      <AlertCircle className="w-3.5 h-3.5" />
      Not configured
    </span>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function NotificationSettingsPage() {
  const { session, isLoading: authLoading, isAdmin } = useAuth()

  const [state, setState] = useState<SettingsState | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testEmailSending, setTestEmailSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Local editable state
  const [emailMode, setEmailMode] = useState<'platform' | 'custom'>('platform')
  const [platformFromEmail, setPlatformFromEmail] = useState('')
  const [customFromEmail, setCustomFromEmail] = useState('')
  const [customFromName, setCustomFromName] = useState('')
  // Sensitive fields — only sent if the user types something
  const [platformApiKey, setPlatformApiKey] = useState('')
  const [customApiKey, setCustomApiKey] = useState('')
  const [prefs, setPrefs] = useState<NotificationPreference[]>([])

  // ---------------------------------------------------------------------------
  // Load
  // ---------------------------------------------------------------------------

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/settings/notifications')
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to load notification settings')
      }
      const data: SettingsState = await res.json()
      setState(data)

      // Initialise local form state
      setEmailMode(data.emailConfig.mode)
      setPlatformFromEmail(data.emailConfig.platformFromEmail)
      setCustomFromEmail(data.emailConfig.customFromEmail)
      setCustomFromName(data.emailConfig.customFromName)
      setPrefs(data.notificationPreferences)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authLoading || !session) return
    load()
  }, [authLoading, session, load])

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(t)
  }, [toast])

  // ---------------------------------------------------------------------------
  // Pref toggle
  // ---------------------------------------------------------------------------

  const togglePref = useCallback((id: string, field: 'in_app_enabled' | 'email_enabled', value: boolean) => {
    setPrefs(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p))
  }, [])

  // ---------------------------------------------------------------------------
  // Save
  // ---------------------------------------------------------------------------

  const handleSave = async () => {
    setSaving(true)
    try {
      const body: Record<string, unknown> = {
        email_mode: emailMode,
        platform_from_email: platformFromEmail,
        custom_from_email: customFromEmail,
        custom_from_name: customFromName,
        notification_preferences: prefs.map(p => ({
          id: p.id,
          in_app_enabled: p.in_app_enabled,
          email_enabled: p.email_enabled,
        })),
      }

      // Only include API keys if user typed something
      if (platformApiKey.trim()) body.platform_resend_api_key = platformApiKey.trim()
      if (customApiKey.trim()) body.custom_resend_api_key = customApiKey.trim()

      const res = await fetch('/api/settings/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to save')
      }

      const updated: SettingsState = await res.json()
      setState(updated)
      // Clear sensitive inputs after save
      setPlatformApiKey('')
      setCustomApiKey('')
      setPrefs(updated.notificationPreferences)
      setToast({ type: 'success', message: 'Notification settings saved' })
    } catch (err) {
      setToast({ type: 'error', message: err instanceof Error ? err.message : 'Save failed' })
    } finally {
      setSaving(false)
    }
  }

  // ---------------------------------------------------------------------------
  // Test email
  // ---------------------------------------------------------------------------

  // Returns true if the current email mode has enough config to attempt sending
  const isEmailConfigured = (): boolean => {
    if (!state) return false
    if (emailMode === 'platform') {
      return state.emailConfig.platformResendKeyConfigured && !!state.emailConfig.platformFromEmail
    }
    return state.emailConfig.customResendKeyConfigured && !!state.emailConfig.customFromEmail
  }

  const handleTestEmail = async () => {
    setTestEmailSending(true)
    try {
      const res = await fetch('/api/settings/notifications/test-email', { method: 'POST' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send test email')
      }
      setToast({ type: 'success', message: `Test email sent to ${data.sentTo ?? 'your email'}. Check your inbox.` })
    } catch (err) {
      setToast({ type: 'error', message: err instanceof Error ? err.message : 'Failed to send test email' })
    } finally {
      setTestEmailSending(false)
    }
  }

  // ---------------------------------------------------------------------------
  // Render states
  // ---------------------------------------------------------------------------

  if (loading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  if (error || !state) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <AlertCircle className="w-12 h-12 text-red-400" />
            <p className="text-white/70">{error || 'Failed to load notification settings'}</p>
            <Link href="/settings" className="btn-secondary text-sm px-4 py-2">
              Back to Settings
            </Link>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  if (!isAdmin) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Shield className="w-12 h-12 text-amber-400" />
            <p className="text-white/70">Admin access required to view notification settings.</p>
            <Link href="/settings" className="btn-secondary text-sm px-4 py-2">
              Back to Settings
            </Link>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  // ---------------------------------------------------------------------------
  // Main render
  // ---------------------------------------------------------------------------

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6 max-w-4xl">

          {/* Toast */}
          {toast && (
            <div
              className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border transition-all duration-300 ${
                toast.type === 'success'
                  ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300'
                  : 'bg-red-500/20 border-red-400/30 text-red-300'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
          )}

          {/* Header */}
          <div>
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Settings
            </Link>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Bell className="w-6 h-6 text-amber-400" />
              Notifications
            </h2>
            <p className="text-sm text-white/60 mt-1">
              Configure email delivery and notification preferences for each event type
            </p>
          </div>

          {/* ================================================================
              Section 1 — Email Configuration
          ================================================================ */}
          <div className="section-card">
            <div className="section-card-header">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-semibold text-white">Email Configuration</h3>
              </div>
            </div>
            <div className="section-card-body space-y-6">

              {/* Mode selector */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-3">Email sending mode</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Platform mode */}
                  <button
                    type="button"
                    onClick={() => setEmailMode('platform')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      emailMode === 'platform'
                        ? 'border-brand-400/60 bg-brand-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white text-sm">Platform email</span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/20 text-emerald-300">
                        Recommended
                      </span>
                    </div>
                    <p className="text-xs text-white/50">
                      Uses the platform&apos;s Resend account. Zero technical setup required.
                    </p>
                  </button>

                  {/* Custom mode */}
                  <button
                    type="button"
                    onClick={() => setEmailMode('custom')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      emailMode === 'custom'
                        ? 'border-brand-400/60 bg-brand-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white text-sm">Custom provider</span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-white/50">
                        Advanced
                      </span>
                    </div>
                    <p className="text-xs text-white/50">
                      Bring your own Resend API key and verified sending domain.
                    </p>
                  </button>
                </div>
              </div>

              {/* Platform mode details */}
              {emailMode === 'platform' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Platform email service</span>
                      <StatusBadge configured={state.emailConfig.platformResendKeyConfigured} />
                    </div>
                    {state.emailConfig.platformFromEmail && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">Sending address</span>
                        <span className="text-sm font-mono text-white/80">{state.emailConfig.platformFromEmail}</span>
                      </div>
                    )}
                    <p className="text-xs text-white/40 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 flex-shrink-0" />
                      Emails appear &ldquo;from&rdquo; your company name with your company email as reply-to.
                      Update these in{' '}
                      <Link href="/settings/company" className="text-brand-400 hover:text-brand-300 inline-flex items-center gap-0.5">
                        Company Profile
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </p>
                  </div>

                  {/* Platform API key override (optional) */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      Platform sending address
                    </label>
                    <input
                      type="email"
                      className="input-field"
                      value={platformFromEmail}
                      onChange={e => setPlatformFromEmail(e.target.value)}
                      placeholder="e.g. notifications@mail.dc81.io"
                    />
                    <p className="mt-1 text-xs text-white/40">
                      The verified Resend domain address that emails are sent from.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      Resend API key
                      <span className="ml-2 px-1.5 py-0.5 rounded text-xs bg-white/10 text-white/40 font-normal">
                        sensitive
                      </span>
                    </label>
                    <input
                      type="password"
                      className="input-field font-mono"
                      value={platformApiKey}
                      onChange={e => setPlatformApiKey(e.target.value)}
                      placeholder={state.emailConfig.platformResendKeyConfigured ? '••••••••••••••••' : 'Enter Resend API key'}
                      autoComplete="new-password"
                    />
                    <p className="mt-1 text-xs text-white/40">
                      {state.emailConfig.platformResendKeyConfigured
                        ? 'A key is already saved. Leave blank to keep the existing key.'
                        : 'No key configured. Enter your Resend API key (re_...) to enable email sending.'}
                    </p>
                  </div>

                  {/* Test email */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">Test email delivery</p>
                      <p className="text-xs text-white/40 mt-0.5">
                        {isEmailConfigured()
                          ? 'Sends a test to your admin email address'
                          : 'Save a Resend API key and from address to enable'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleTestEmail}
                      disabled={!isEmailConfigured() || testEmailSending}
                      className={`btn-secondary text-sm px-4 py-2 flex items-center gap-2 ${
                        !isEmailConfigured() || testEmailSending ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {testEmailSending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : null}
                      {testEmailSending ? 'Sending...' : 'Send test email'}
                    </button>
                  </div>
                </div>
              )}

              {/* Custom mode details */}
              {emailMode === 'custom' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/20">
                    <p className="text-xs text-amber-300/80 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      You need a Resend account with a verified sending domain to use custom mode.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      Resend API key
                      <span className="ml-2 px-1.5 py-0.5 rounded text-xs bg-white/10 text-white/40 font-normal">
                        sensitive
                      </span>
                    </label>
                    <input
                      type="password"
                      className="input-field font-mono"
                      value={customApiKey}
                      onChange={e => setCustomApiKey(e.target.value)}
                      placeholder={state.emailConfig.customResendKeyConfigured ? '••••••••••••••••' : 'Enter your Resend API key'}
                      autoComplete="new-password"
                    />
                    <p className="mt-1 text-xs text-white/40">
                      {state.emailConfig.customResendKeyConfigured
                        ? 'A key is saved. Leave blank to keep it.'
                        : 'Your Resend API key (starts with re_)'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1.5">
                        From email address
                      </label>
                      <input
                        type="email"
                        className="input-field"
                        value={customFromEmail}
                        onChange={e => setCustomFromEmail(e.target.value)}
                        placeholder="e.g. quotes@yourdomain.co.uk"
                      />
                      <p className="mt-1 text-xs text-white/40">Must be verified in Resend</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1.5">
                        From display name
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        value={customFromName}
                        onChange={e => setCustomFromName(e.target.value)}
                        placeholder="e.g. TyneTees Damp Proofing"
                      />
                    </div>
                  </div>

                  {/* Test email */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">Test email delivery</p>
                      <p className="text-xs text-white/40 mt-0.5">
                        {isEmailConfigured()
                          ? 'Sends a test to your admin email address'
                          : 'Save a Resend API key and from address to enable'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleTestEmail}
                      disabled={!isEmailConfigured() || testEmailSending}
                      className={`btn-secondary text-sm px-4 py-2 flex items-center gap-2 ${
                        !isEmailConfigured() || testEmailSending ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {testEmailSending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : null}
                      {testEmailSending ? 'Sending...' : 'Send test email'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ================================================================
              Section 2 — Notification Preferences
          ================================================================ */}
          <div className="section-card">
            <div className="section-card-header">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
              </div>
              <p className="text-sm text-white/50 mt-1">
                Control which events trigger in-app notifications and emails
              </p>
            </div>
            <div className="section-card-body space-y-6">

              {EVENT_GROUPS.map(group => {
                const groupPrefs = prefs.filter(p => group.events.includes(p.event_type))
                if (groupPrefs.length === 0) return null

                return (
                  <div key={group.label}>
                    <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                      {group.label}
                    </h4>
                    <div className="rounded-xl border border-white/10 overflow-hidden">
                      {/* Table header */}
                      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2.5 bg-white/5 border-b border-white/10">
                        <span className="text-xs font-medium text-white/40">Event</span>
                        <span className="text-xs font-medium text-white/40 text-center w-16">In-app</span>
                        <span className="text-xs font-medium text-white/40 text-center w-16">Email</span>
                        <span className="text-xs font-medium text-white/40 text-center w-20">Recipient</span>
                      </div>

                      {/* Rows */}
                      {groupPrefs.map((pref, idx) => (
                        <div
                          key={pref.id}
                          className={`grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-3.5 items-center ${
                            idx < groupPrefs.length - 1 ? 'border-b border-white/5' : ''
                          }`}
                        >
                          <span className="text-sm text-white/80">
                            {pref.description || pref.event_type}
                          </span>

                          <div className="flex justify-center w-16">
                            <Toggle
                              checked={pref.in_app_enabled}
                              onChange={val => togglePref(pref.id, 'in_app_enabled', val)}
                            />
                          </div>

                          <div className="flex justify-center w-16">
                            <Toggle
                              checked={pref.email_enabled}
                              onChange={val => togglePref(pref.id, 'email_enabled', val)}
                            />
                          </div>

                          <div className="flex justify-center w-20">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              pref.email_recipient_type === 'customer'
                                ? 'bg-blue-500/15 text-blue-300'
                                : pref.email_recipient_type === 'both'
                                ? 'bg-purple-500/15 text-purple-300'
                                : 'bg-white/10 text-white/50'
                            }`}>
                              {RECIPIENT_LABELS[pref.email_recipient_type] ?? pref.email_recipient_type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}

              <p className="text-xs text-white/40 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 flex-shrink-0" />
                Email recipient type is system-defined. Internal = office and admin staff. Customer = the booking customer.
              </p>
            </div>
          </div>

          {/* Save */}
          <div className="flex items-center justify-end pt-2 pb-8">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center gap-2"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>

        </div>
      </Layout>
    </ProtectedRoute>
  )
}
