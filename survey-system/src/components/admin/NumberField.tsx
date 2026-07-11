'use client'

// =============================================================================
// NumberField — validated numeric input for the admin pricing pages.
//
// Replaces the `parseFloat(e.target.value) || 0` pattern, which silently
// committed £0 / 0% when a field was cleared or mistyped — a live-pricing
// hazard. Behaviour:
//   - keeps its own text state while focused, so typing is never clobbered
//   - commits ONLY values that parse and sit within [min, max]
//   - out-of-range / blank / unparsable input shows a red ring and is NEVER
//     committed; blur reverts the text to the last committed value
// =============================================================================

import { useEffect, useRef, useState } from 'react'

interface NumberFieldProps {
  /** Committed value, in display space (pages convert %↔decimal themselves) */
  value: number
  /** Called with every VALID new value as the user types */
  onCommit: (value: number) => void
  min?: number
  max?: number
  step?: string
  /** Reject non-integer input */
  integer?: boolean
  disabled?: boolean
  className?: string
  placeholder?: string
  'aria-label'?: string
}

export function NumberField({
  value,
  onCommit,
  min,
  max,
  step = '0.01',
  integer = false,
  disabled = false,
  className = 'input-field',
  placeholder,
  'aria-label': ariaLabel,
}: NumberFieldProps) {
  const [text, setText] = useState(String(value))
  const [invalid, setInvalid] = useState(false)
  const focusedRef = useRef(false)

  // Follow external value changes (reset, reload) while not being typed in
  useEffect(() => {
    if (!focusedRef.current) {
      setText(String(value))
      setInvalid(false)
    }
  }, [value])

  const validate = (raw: string): number | null => {
    if (raw.trim() === '') return null
    const parsed = Number(raw)
    if (!Number.isFinite(parsed)) return null
    if (integer && !Number.isInteger(parsed)) return null
    if (min !== undefined && parsed < min) return null
    if (max !== undefined && parsed > max) return null
    return parsed
  }

  const handleChange = (raw: string) => {
    setText(raw)
    const parsed = validate(raw)
    if (parsed === null) {
      setInvalid(true)
    } else {
      setInvalid(false)
      if (parsed !== value) onCommit(parsed)
    }
  }

  const handleBlur = () => {
    focusedRef.current = false
    if (validate(text) === null) {
      // Never let an invalid value linger: revert to the committed one
      setText(String(value))
      setInvalid(false)
    }
  }

  return (
    <input
      type="number"
      inputMode="decimal"
      step={step}
      min={min}
      max={max}
      value={text}
      disabled={disabled}
      placeholder={placeholder}
      aria-label={ariaLabel}
      aria-invalid={invalid || undefined}
      title={
        invalid
          ? `Enter a number${min !== undefined ? ` ≥ ${min}` : ''}${max !== undefined ? ` ≤ ${max}` : ''} — invalid input is not saved`
          : undefined
      }
      onFocus={() => {
        focusedRef.current = true
      }}
      onChange={e => handleChange(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={e => {
        if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
      }}
      className={`${className} ${invalid ? 'ring-2 ring-red-500/70 border-red-500/50' : ''}`}
    />
  )
}
