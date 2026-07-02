'use client'

import { Lightbulb, Info, AlertCircle, AlertTriangle } from 'lucide-react'

interface TipProps {
  variant: 'tip' | 'note' | 'important' | 'warning'
  children: React.ReactNode
}

const config = {
  tip: {
    icon: Lightbulb,
    bg: 'bg-blue-500/10',
    border: 'border-blue-400/30',
    iconColor: 'text-blue-400',
    label: 'Tip',
  },
  note: {
    icon: Info,
    bg: 'bg-amber-500/10',
    border: 'border-amber-400/30',
    iconColor: 'text-amber-400',
    label: 'Note',
  },
  important: {
    icon: AlertCircle,
    bg: 'bg-red-500/10',
    border: 'border-red-400/30',
    iconColor: 'text-red-400',
    label: 'Important',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-500/10',
    border: 'border-amber-400/30',
    iconColor: 'text-amber-400',
    label: 'Warning',
  },
}

export function Tip({ variant, children }: TipProps) {
  const c = config[variant]
  const Icon = c.icon

  return (
    <div className={`${c.bg} ${c.border} border rounded-xl p-4 my-4 flex gap-3`}>
      <Icon className={`${c.iconColor} w-5 h-5 mt-0.5 flex-shrink-0`} />
      <div className="text-white/70 text-sm leading-relaxed">{children}</div>
    </div>
  )
}
