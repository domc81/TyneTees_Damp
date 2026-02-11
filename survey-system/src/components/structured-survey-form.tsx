'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Check,
  AlertCircle,
  Save,
  FileText,
  Camera,
  Thermometer,
  Home,
  Building,
  Mountain,
  Shield,
  Wind,
  Layers,
  TreeDeciduous,
  Droplets,
  AlertTriangle,
} from 'lucide-react'
import {
  surveySections,
  type SurveySection,
  type SurveyQuestion,
  isQuestionVisible,
  isSectionComplete,
} from '@/lib/survey-sections'
import type { Project } from '@/types/database.types'

// Section icons mapping
const sectionIcons: Record<string, typeof Home> = {
  header: Thermometer,
  property: Home,
  building_defects: Building,
  wall_ties: Shield,
  cracking_walls: AlertTriangle,
  ground_levels: Mountain,
  dpc: Layers,
  subfloor_vent: Wind,
  subfloor_timbers: TreeDeciduous,
  internal_floors: Layers,
  internal_walls: Droplets,
}

interface StructuredSurveyFormProps {
  project: Project
}

export default function StructuredSurveyForm({ project }: StructuredSurveyFormProps) {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [activeSection, setActiveSection] = useState<string>('header')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Load saved answers from localStorage on mount
  useEffect(() => {
    const savedAnswers = localStorage.getItem(`survey-answers-${project.id}`)
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
    }

    // Pre-populate header from project
    const initialAnswers: Record<string, any> = {
      client_name: project.client_name,
      site_address: `${project.site_address}${project.site_address_line2 ? `, ${project.site_address_line2}` : ''}${project.site_city ? `, ${project.site_city}` : ''}`,
      internal_reference: project.project_number,
      survey_date: new Date().toLocaleDateString('en-GB'),
      weather_conditions: project.weather_conditions || '',
    }
    setAnswers(prev => ({ ...prev, ...initialAnswers }))
  }, [project])

  // Save answers to localStorage
  const saveAnswers = () => {
    localStorage.setItem(`survey-answers-${project.id}`, JSON.stringify(answers))
    setLastSaved(new Date())
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1000)
  }

  // Handle answer change
  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => {
      const newAnswers = { ...prev, [questionId]: value }

      // Reset dependent answers when parent changes
      surveySections.forEach(section => {
        section.questions.forEach(q => {
          if (q.conditionalOn === questionId && q.conditionalValue !== value) {
            newAnswers[q.id] = undefined
          }
        })
      })

      return newAnswers
    })
  }

  // Handle checkbox group change
  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    setAnswers(prev => {
      const current = (prev[questionId] as string[]) || []
      if (checked) {
        return { ...prev, [questionId]: [...current, option] }
      } else {
        return { ...prev, [questionId]: current.filter(o => o !== option) }
      }
    })
  }

  // Progress calculation
  const getProgress = () => {
    let totalRequired = 0
    let answeredRequired = 0

    surveySections.forEach(section => {
      section.questions.forEach(q => {
        if (q.required) {
          totalRequired++
          if (answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== '') {
            answeredRequired++
          }
        }
      })
    })

    return Math.round((answeredRequired / totalRequired) * 100)
  }

  // Check overall completion
  const isSurveyComplete = () => {
    return surveySections.every(section => isSectionComplete(section, answers))
  }

  const progress = getProgress()

  return (
    <div className="min-h-screen bg-navy-1000">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-navy-950/80 backdrop-blur-xl border-b border-white/10 px-8 py-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/projects/${project.id}`} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
              <ArrowLeft className="w-6 h-6 text-white/60" />
            </Link>
            <div>
              <p className="text-xs font-mono text-white/50 tracking-wider uppercase">{project.project_number}</p>
              <h1 className="text-xl font-bold text-white mt-1">Structured Survey</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-medium text-white/50 uppercase tracking-wide">Progress</p>
              <p className="text-lg font-bold text-brand-400 mt-1">{progress}% Complete</p>
            </div>
            <button
              onClick={saveAnswers}
              disabled={isSaving}
              className="btn-secondary flex items-center gap-2"
            >
              <Save className={`w-5 h-5 ${isSaving ? 'animate-pulse' : ''}`} />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 h-2.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Navigation */}
          <div className="section-card mb-10">
            <div className="section-card-header">
              <h2 className="font-semibold text-white tracking-tight">Survey Sections</h2>
            </div>
            <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {surveySections.map(section => {
                const Icon = sectionIcons[section.id] || FileText
                const completed = isSectionComplete(section, answers)
                const isActive = activeSection === section.id

                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id)
                      setExpandedSection(expandedSection === section.id ? null : section.id)
                    }}
                    className={`p-4 rounded-lg border transition-all duration-200 flex items-center gap-2 text-left ${
                      isActive
                        ? 'border-brand-500 bg-brand-500/20 text-brand-300 ring-2 ring-brand-500/30'
                        : completed
                        ? 'border-green-500/50 bg-green-500/20 text-green-300'
                        : 'border-white/10 hover:border-white/30 hover:bg-white/10 text-white/80'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{section.title}</p>
                      {completed && (
                        <p className="text-xs text-green-400 font-medium flex items-center gap-1 mt-0.5">
                          <Check className="w-4 h-4" /> Complete
                        </p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Survey Form */}
          <div className="space-y-8">
            {surveySections.map(section => {
              const Icon = sectionIcons[section.id] || FileText
              const isExpanded = expandedSection === section.id || activeSection === section.id
              const completed = isSectionComplete(section, answers)

              return (
                <div
                  key={section.id}
                  className={`section-card transition-all ${
                    activeSection === section.id ? 'ring-2 ring-brand-500' : ''
                  }`}
                >
                  {/* Section Header */}
                  <button
                    onClick={() => {
                      setActiveSection(section.id)
                      setExpandedSection(isExpanded && expandedSection === section.id ? null : section.id)
                    }}
                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${
                        completed ? 'bg-green-500/20 text-green-400' : 'bg-brand-500/20 text-brand-400'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-white">{section.title}</h3>
                        {section.description && (
                          <p className="text-sm text-white/50 leading-relaxed">{section.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {completed && (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">Complete</span>
                      )}
                      <ChevronDown className={`w-6 h-6 text-white/40 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </button>

                  {/* Section Questions */}
                  {isExpanded && (
                    <div className="border-t border-white/5 p-8 space-y-8 bg-white/5">
                      {section.questions
                        .filter(q => isQuestionVisible(q, answers))
                        .map(question => (
                          <QuestionRenderer
                            key={question.id}
                            question={question}
                            value={answers[question.id]}
                            onChange={(value) => handleAnswerChange(question.id, value)}
                            onCheckboxChange={(option, checked) =>
                              handleCheckboxChange(question.id, option, checked)
                            }
                          />
                        ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Completion Actions */}
          {progress >= 50 && (
            <div className="mt-8 p-8 bg-brand-500/10 border border-brand-400/30 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-brand-300">
                    {isSurveyComplete() ? 'Survey Complete!' : 'Almost There!'}
                  </h3>
                  <p className="text-sm text-brand-200 mt-1">
                    {isSurveyComplete()
                      ? 'All required questions have been answered.'
                      : `Complete ${100 - progress}% more to finish the survey.`}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={saveAnswers}
                    className="btn-secondary px-6 py-2.5"
                  >
                    Save & Continue Later
                  </button>
                  {isSurveyComplete() && (
                    <Link
                      href={`/projects/${project.id}/costing`}
                      className="btn-primary flex items-center gap-2 px-6 py-2.5 font-semibold"
                    >
                      <FileText className="w-5 h-5" />
                      Proceed to Costing
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Last Saved Indicator */}
          {lastSaved && (
            <p className="text-center text-xs text-white/40 mt-6 font-medium">
              Last saved: {lastSaved.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// QUESTION RENDERER COMPONENT
// ============================================================================

interface QuestionRendererProps {
  question: SurveyQuestion
  value: any
  onChange: (value: any) => void
  onCheckboxChange: (option: string, checked: boolean) => void
}

function QuestionRenderer({ question, value, onChange, onCheckboxChange }: QuestionRendererProps) {
  const isChecked = (option: string) => {
    if (Array.isArray(value)) {
      return value.includes(option)
    }
    return false
  }

  return (
    <div className="space-y-3">
      <label className="block mb-3">
        <span className="text-sm font-semibold text-white">
          {question.label}
        </span>
        {question.subLabel && (
          <span className="text-sm text-white/60 ml-2">
            {question.subLabel}
          </span>
        )}
        {question.required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      {/* Yes/No Question */}
      {question.type === 'yes_no' && (
        <div className="flex gap-6">
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-all duration-150 border border-transparent hover:border-white/10">
            <input
              type="radio"
              name={question.id}
              checked={value === true}
              onChange={() => onChange(true)}
              className="w-4 h-4 text-brand-500 focus:ring-brand-500"
            />
            <span className="text-sm text-white/80">Yes</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-all duration-150 border border-transparent hover:border-white/10">
            <input
              type="radio"
              name={question.id}
              checked={value === false}
              onChange={() => onChange(false)}
              className="w-4 h-4 text-brand-500 focus:ring-brand-500"
            />
            <span className="text-sm text-white/80">No</span>
          </label>
        </div>
      )}

      {/* Text Input */}
      {question.type === 'text' && (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className="input-field text-base"
        />
      )}

      {/* Number Input */}
      {question.type === 'number' && (
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder={question.placeholder}
            min={question.validation?.min}
            max={question.validation?.max}
            className="input-field text-base w-32"
          />
          {question.subLabel && (
            <span className="text-sm text-white/60">{question.subLabel}</span>
          )}
        </div>
      )}

      {/* Select Dropdown */}
      {question.type === 'select' && (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="input-field text-base"
        >
          <option value="">Select...</option>
          {question.options?.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )}

      {/* Multi-Select (Checkboxes) */}
      {question.type === 'multi_select' && (
        <div className="space-y-3">
          {question.options?.map(option => (
            <label key={option} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-all duration-150 border border-transparent hover:border-white/10">
              <input
                type="checkbox"
                checked={isChecked(option)}
                onChange={(e) => onCheckboxChange(option, e.target.checked)}
                className="w-4 h-4 text-brand-500 rounded focus:ring-brand-500"
              />
              <span className="text-sm text-white/80">{option}</span>
            </label>
          ))}
        </div>
      )}

      {/* Rich Text / Textarea */}
      {question.type === 'rich_text' && (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          rows={3}
          className="input-field resize-none text-base min-h-[120px] focus:ring-2 focus:ring-brand-500/50"
        />
      )}

      {/* Help Text */}
      {question.helpText && (
        <p className="text-xs text-white/50 mt-2 leading-relaxed">{question.helpText}</p>
      )}
    </div>
  )
}
