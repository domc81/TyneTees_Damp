// =============================================================================
// Report Component Utilities — shared helpers for web report rendering
// =============================================================================

import type { ReportSection } from '@/types/survey-report.types'

/**
 * Returns true if a section has no meaningful content to render.
 * Mirrors the same logic used in the PDF renderer.
 */
export function isSectionEmpty(section: ReportSection): boolean {
  if (!section.content || section.content.trim() === '') return true

  const placeholders = [
    'Content not available.',
    'To be completed by surveyor during review.',
    '[LLM content to be generated]',
    'See findings below.',
  ]

  return placeholders.includes(section.content.trim())
}

/**
 * Format a date string as "24 February 2026"
 */
export function formatDate(dateStr: string | undefined | null): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

/**
 * Convert snake_case or underscore-separated values to Title Case words
 * e.g. "semi_detached_house" → "Semi Detached House"
 */
export function formatLabel(value: string | undefined | null): string {
  if (!value) return ''
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * Map urgency code to display colour (Tailwind bg class + hex)
 */
export const URGENCY_CONFIG: Record<
  string,
  { label: string; bgClass: string; textClass: string; dotColour: string }
> = {
  high: {
    label: 'Urgent',
    bgClass: 'bg-red-50',
    textClass: 'text-red-700',
    dotColour: '#DC2626',
  },
  medium: {
    label: 'Recommended',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-700',
    dotColour: '#D97706',
  },
  low: {
    label: 'Advisory',
    bgClass: 'bg-green-50',
    textClass: 'text-green-700',
    dotColour: '#059669',
  },
}
