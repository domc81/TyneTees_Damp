'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  HardHat,
  CheckCircle2,
  Save,
  AlertCircle,
  Circle,
} from 'lucide-react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import { useAuth } from '@/context/AuthContext'
import { getSupabase } from '@/lib/supabase-client'
import {
  getInstallerInfo,
  createInstallerInfo,
  updateInstallerInfo,
} from '@/lib/installer-info-data'
import { determineApplicableCategories } from '@/lib/installer-info-categories'
import InstallerPhotoUpload from '@/components/installer-info/InstallerPhotoUpload'
import type {
  InstallerInfoRow,
  InstallerInfoCategory,
  CategoryDefinition,
  FieldDefinition,
  InstallerPhoto,
} from '@/types/installer-info.types'
import { INSTALLER_INFO_CATEGORIES, CATEGORY_MAP } from '@/types/installer-info.types'
import type { SurveyWizardData, SurveyRoomRow } from '@/types/survey-wizard.types'

// =============================================================================
// Field Renderers
// =============================================================================

function FieldRenderer({
  field,
  value,
  onChange,
  disabled,
  categoryData,
}: {
  field: FieldDefinition
  value: unknown
  onChange: (val: unknown) => void
  disabled: boolean
  categoryData: Record<string, unknown>
}) {
  // Conditional visibility: skip if dependsOn field is falsy
  if (field.dependsOn) {
    const depVal = categoryData[field.dependsOn]
    // Show only if dependency is truthy (but not for 'unknown' on yes_no_unknown)
    if (!depVal || depVal === 'no' || depVal === 'unknown') return null
    // For select fields showing restriction details, also show when value isn't the "clear" option
    if (field.dependsOn === 'external_wall_access' && depVal === 'clear') return null
  }

  const colSpan = field.fullWidth ? 'md:col-span-2' : ''

  switch (field.type) {
    case 'text':
      return (
        <div className={colSpan}>
          <label className="block text-sm font-medium text-white/80 mb-2">{field.label}</label>
          <input
            type="text"
            value={(value as string) ?? ''}
            onChange={e => onChange(e.target.value)}
            placeholder={field.placeholder}
            disabled={disabled}
            className="input-field w-full"
          />
        </div>
      )

    case 'textarea':
      return (
        <div className={colSpan}>
          <label className="block text-sm font-medium text-white/80 mb-2">{field.label}</label>
          <textarea
            value={(value as string) ?? ''}
            onChange={e => onChange(e.target.value)}
            placeholder={field.placeholder}
            disabled={disabled}
            rows={3}
            className="input-field w-full resize-y"
          />
        </div>
      )

    case 'number':
      return (
        <div className={colSpan}>
          <label className="block text-sm font-medium text-white/80 mb-2">{field.label}</label>
          <div className="relative">
            <input
              type="number"
              value={(value as number) ?? ''}
              onChange={e => onChange(e.target.value === '' ? null : Number(e.target.value))}
              placeholder={field.placeholder}
              disabled={disabled}
              className="input-field w-full"
            />
            {field.unit && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white/40">
                {field.unit}
              </span>
            )}
          </div>
        </div>
      )

    case 'select':
      return (
        <div className={colSpan}>
          <label className="block text-sm font-medium text-white/80 mb-2">{field.label}</label>
          <select
            value={(value as string) ?? ''}
            onChange={e => onChange(e.target.value || null)}
            disabled={disabled}
            className="input-select w-full"
          >
            <option value="">— Select —</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )

    case 'yes_no':
      return (
        <div className={colSpan}>
          <label className="block text-sm font-medium text-white/80 mb-2">{field.label}</label>
          <div className="flex gap-3">
            {['yes', 'no'].map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => !disabled && onChange(opt)}
                disabled={disabled}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  value === opt
                    ? opt === 'yes'
                      ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300 border'
                      : 'bg-red-500/20 border-red-400/50 text-red-300 border'
                    : 'bg-white/5 border border-white/10 text-white/50 hover:bg-white/10'
                } disabled:opacity-50`}
              >
                {opt === 'yes' ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
      )

    case 'yes_no_unknown':
      return (
        <div className={colSpan}>
          <label className="block text-sm font-medium text-white/80 mb-2">{field.label}</label>
          <div className="flex gap-3">
            {[
              { val: 'yes', label: 'Yes', active: 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300' },
              { val: 'no', label: 'No', active: 'bg-red-500/20 border-red-400/50 text-red-300' },
              { val: 'unknown', label: 'Unknown', active: 'bg-amber-500/20 border-amber-400/50 text-amber-300' },
            ].map(opt => (
              <button
                key={opt.val}
                type="button"
                onClick={() => !disabled && onChange(opt.val)}
                disabled={disabled}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  value === opt.val
                    ? opt.active
                    : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                } disabled:opacity-50`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )

    case 'checkbox_group':
      const selected = Array.isArray(value) ? value as string[] : []
      return (
        <div className={`${colSpan} md:col-span-2`}>
          <label className="block text-sm font-medium text-white/80 mb-2">{field.label}</label>
          <div className="flex flex-wrap gap-3">
            {field.options?.map(opt => {
              const isChecked = selected.includes(opt.value)
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    if (disabled) return
                    const next = isChecked
                      ? selected.filter(v => v !== opt.value)
                      : [...selected, opt.value]
                    onChange(next)
                  }}
                  disabled={disabled}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                    isChecked
                      ? 'bg-brand-500/20 border-brand-400/50 text-brand-300'
                      : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                  } disabled:opacity-50`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      )

    default:
      return null
  }
}

// =============================================================================
// Category Section (collapsible)
// =============================================================================

function CategorySection({
  category,
  data,
  onFieldChange,
  disabled,
  surveyId,
  onPhotosChange,
}: {
  category: CategoryDefinition
  data: Record<string, unknown>
  onFieldChange: (categoryKey: string, fieldKey: string, value: unknown) => void
  disabled: boolean
  surveyId: string
  onPhotosChange: (categoryKey: string, photos: InstallerPhoto[]) => void
}) {
  const [isOpen, setIsOpen] = useState(true)

  // Count filled fields for completion indicator
  const filledCount = category.fields.filter(f => {
    const v = data[f.key]
    if (v === null || v === undefined || v === '') return false
    if (Array.isArray(v) && v.length === 0) return false
    return true
  }).length

  const totalFields = category.fields.length
  const photos = (data.photos as InstallerPhoto[]) || []

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between border-b border-white/10 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          {isOpen
            ? <ChevronDown className="w-5 h-5 text-white/50" />
            : <ChevronRight className="w-5 h-5 text-white/50" />
          }
          <div className="text-left">
            <h3 className="font-semibold text-white">{category.label}</h3>
            <p className="text-sm text-white/50">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {filledCount === totalFields ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : filledCount > 0 ? (
            <span className="text-xs text-white/40 bg-white/10 px-2.5 py-1 rounded-full">
              {filledCount}/{totalFields}
            </span>
          ) : (
            <Circle className="w-5 h-5 text-white/20" />
          )}
        </div>
      </button>

      {/* Body */}
      {isOpen && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {category.fields.map(field => (
              <FieldRenderer
                key={field.key}
                field={field}
                value={data[field.key]}
                onChange={val => onFieldChange(category.key, field.key, val)}
                disabled={disabled}
                categoryData={data}
              />
            ))}
          </div>

          {/* Photos */}
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-sm font-medium text-white/70 mb-3">
              Photos — {category.label}
            </h4>
            <InstallerPhotoUpload
              surveyId={surveyId}
              category={category.key}
              photos={photos}
              onPhotosChange={p => onPhotosChange(category.key, p)}
              disabled={disabled}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// =============================================================================
// Main Page
// =============================================================================

export default function InstallerInfoPage({ params }: { params: { projectId: string } }) {
  const surveyId = params.projectId
  const { isAdmin, isSurveyor, isOffice, isLoading: authLoading } = useAuth()

  // Can edit if admin or surveyor; office can only view
  const canEdit = isAdmin || isSurveyor

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [surveyType, setSurveyType] = useState<string>('damp')

  // The installer info row
  const [infoRow, setInfoRow] = useState<InstallerInfoRow | null>(null)

  // Local form state (site_info JSONB)
  const [siteInfo, setSiteInfo] = useState<Record<string, Record<string, unknown>>>({})
  const [notes, setNotes] = useState('')
  const [completed, setCompleted] = useState(false)

  // Applicable categories
  const [applicableCategories, setApplicableCategories] = useState<InstallerInfoCategory[]>([])

  // Save state
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null)
  const siteInfoRef = useRef(siteInfo)
  const notesRef = useRef(notes)
  const completedRef = useRef(completed)

  // Keep refs in sync
  useEffect(() => { siteInfoRef.current = siteInfo }, [siteInfo])
  useEffect(() => { notesRef.current = notes }, [notes])
  useEffect(() => { completedRef.current = completed }, [completed])

  // ── Load survey + installer info ──
  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true)
        const supabase = getSupabase()
        if (!supabase) throw new Error('Supabase not initialized')

        // Load survey (for type, wizard data, rooms)
        const { data: survey, error: surveyError } = await supabase
          .from('surveys')
          .select('id, survey_type, survey_data')
          .eq('id', surveyId)
          .single()

        if (surveyError || !survey) throw new Error('Survey not found')

        setSurveyType(survey.survey_type)

        // Load rooms
        const { data: rooms } = await supabase
          .from('survey_rooms')
          .select('*')
          .eq('survey_id', surveyId)

        const wizardData = survey.survey_data as SurveyWizardData | null
        const roomRows = (rooms || []) as SurveyRoomRow[]

        // Determine applicable categories
        const cats = determineApplicableCategories(survey.survey_type, wizardData, roomRows)
        setApplicableCategories(cats)

        // Load or create installer info
        let info = await getInstallerInfo(surveyId)
        if (!info) {
          info = await createInstallerInfo(surveyId, cats)
        }

        setInfoRow(info)
        setSiteInfo(info.site_info || {})
        setNotes(info.notes || '')
        setCompleted(info.completed)
      } catch (err: unknown) {
        console.error('Failed to load installer info:', err)
        setError(err instanceof Error ? err.message : 'Failed to load')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [surveyId])

  // ── Auto-save (2s debounce) ──
  const performSave = useCallback(async () => {
    if (!infoRow || isSaving) return
    setIsSaving(true)
    try {
      await updateInstallerInfo(infoRow.id, {
        site_info: siteInfoRef.current,
        notes: notesRef.current || null,
        completed: completedRef.current,
        categories_applicable: applicableCategories,
      })
      setLastSaved(new Date())
    } catch (err) {
      console.error('Auto-save failed:', err)
    } finally {
      setIsSaving(false)
    }
  }, [infoRow, isSaving, applicableCategories])

  const triggerSave = useCallback(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => performSave(), 2000)
  }, [performSave])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
  }, [])

  // ── Field change handler ──
  function handleFieldChange(categoryKey: string, fieldKey: string, value: unknown) {
    setSiteInfo(prev => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        [fieldKey]: value,
      },
    }))
    triggerSave()
  }

  // ── Photos change handler ──
  function handlePhotosChange(categoryKey: string, photos: InstallerPhoto[]) {
    setSiteInfo(prev => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        photos,
      },
    }))
    triggerSave()
  }

  // ── Notes change ──
  function handleNotesChange(value: string) {
    setNotes(value)
    triggerSave()
  }

  // ── Mark as complete ──
  async function handleToggleComplete() {
    const next = !completed
    setCompleted(next)
    // Save immediately (don't wait for debounce)
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    if (!infoRow) return
    setIsSaving(true)
    try {
      await updateInstallerInfo(infoRow.id, {
        site_info: siteInfoRef.current,
        notes: notesRef.current || null,
        completed: next,
        categories_applicable: applicableCategories,
      })
      setLastSaved(new Date())
    } catch (err) {
      console.error('Save failed:', err)
      setCompleted(!next) // revert
    } finally {
      setIsSaving(false)
    }
  }

  // ── Save before navigating away ──
  useEffect(() => {
    function handleBeforeUnload() {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current)
        // Fire a sync save attempt
        performSave()
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [performSave])

  // ── Filter category definitions to only applicable ones ──
  const visibleCategories = INSTALLER_INFO_CATEGORIES.filter(c =>
    applicableCategories.includes(c.key)
  )

  // ── Render ──
  if (isLoading || authLoading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <div className="spinner mx-auto mb-4" />
              <p className="text-white/60">Loading installer information...</p>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  if (error) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center py-32">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white">{error}</h2>
              <Link href={`/surveys/${surveyId}`} className="btn-primary mt-6 inline-block">
                Back to Survey
              </Link>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* ── Header ── */}
          <div>
            <Link
              href={`/surveys/${surveyId}`}
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Survey
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-orange-500/20 border border-orange-400/30">
                  <HardHat className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Installer Site Information</h1>
                  <p className="text-sm text-white/50">
                    Details the installation team needs before arriving on site
                  </p>
                </div>
              </div>

              {/* Save indicator */}
              <div className="flex items-center gap-3">
                {isSaving && (
                  <span className="flex items-center gap-2 text-sm text-white/40">
                    <div className="w-3 h-3 border-2 border-white/20 border-t-white/60 animate-spin rounded-full" />
                    Saving...
                  </span>
                )}
                {!isSaving && lastSaved && (
                  <span className="flex items-center gap-2 text-sm text-white/40">
                    <Save className="w-3.5 h-3.5" />
                    Saved {lastSaved.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
                {completed && (
                  <span className="badge bg-emerald-500/20 border-emerald-400/30 text-emerald-300 border">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    Complete
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Read-only notice for office staff */}
          {isOffice && !isAdmin && (
            <div className="glass-card px-6 py-4 flex items-center gap-3 border-l-4 border-amber-400/50">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <p className="text-sm text-amber-200/80">
                You have view-only access. Only admins and surveyors can edit installer information.
              </p>
            </div>
          )}

          {/* ── Category Sections ── */}
          {visibleCategories.map(category => (
            <CategorySection
              key={category.key}
              category={category}
              data={siteInfo[category.key] || {}}
              onFieldChange={handleFieldChange}
              disabled={!canEdit}
              surveyId={surveyId}
              onPhotosChange={handlePhotosChange}
            />
          ))}

          {/* ── General Notes ── */}
          <div className="glass-card">
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="font-semibold text-white">General Notes</h3>
              <p className="text-sm text-white/50">
                Any additional information for the installation team
              </p>
            </div>
            <div className="p-6">
              <textarea
                value={notes}
                onChange={e => handleNotesChange(e.target.value)}
                placeholder="General notes for the installer..."
                disabled={!canEdit}
                rows={4}
                className="input-field w-full resize-y"
              />
            </div>
          </div>

          {/* ── Mark Complete + Summary ── */}
          {canEdit && (
            <div className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white/60">
                  {applicableCategories.length} categories applicable for this survey.
                  {!completed && ' Mark as complete when all sections are filled in.'}
                </p>
              </div>
              <button
                onClick={handleToggleComplete}
                disabled={isSaving}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  completed
                    ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/30'
                    : 'btn-primary'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                {completed ? 'Marked Complete' : 'Mark as Complete'}
              </button>
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
