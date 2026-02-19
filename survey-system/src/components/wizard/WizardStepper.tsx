'use client'

import { Check } from 'lucide-react'

interface WizardStep {
  label: string
  description: string
}

interface WizardStepperProps {
  currentStep: number
  steps: WizardStep[]
  onStepClick?: (stepIndex: number) => void
}

export default function WizardStepper({ currentStep, steps, onStepClick }: WizardStepperProps) {
  return (
    <div className="w-full">
      {/* Desktop horizontal stepper */}
      <div className="hidden md:flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isClickable = onStepClick && (isCompleted || isCurrent)

          return (
            <div key={index} className="flex items-center flex-1">
              {/* Step indicator */}
              <button
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={`
                  group flex items-center gap-3 transition-all duration-300
                  ${isClickable ? 'cursor-pointer' : 'cursor-default'}
                `}
              >
                {/* Circle with number or check */}
                <div
                  className={`
                    relative flex items-center justify-center w-10 h-10 rounded-full
                    border-2 transition-all duration-300 font-semibold
                    ${
                      isCompleted
                        ? 'bg-brand-500/20 border-brand-400 text-brand-300'
                        : isCurrent
                        ? 'bg-brand-500/30 border-brand-400 text-brand-200 shadow-lg shadow-brand-500/20'
                        : 'bg-white/5 border-white/20 text-white/40'
                    }
                    ${isClickable ? 'group-hover:border-brand-400/80 group-hover:bg-brand-500/25' : ''}
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}

                  {/* Current step glow */}
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full bg-brand-400/20 animate-pulse" />
                  )}
                </div>

                {/* Step label */}
                <div className="text-left hidden lg:block">
                  <div
                    className={`
                      text-sm font-semibold transition-colors
                      ${isCurrent ? 'text-white' : isCompleted ? 'text-white/80' : 'text-white/50'}
                    `}
                  >
                    {step.label}
                  </div>
                  <div className="text-xs text-white/40">{step.description}</div>
                </div>
              </button>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-4 bg-white/10 relative overflow-hidden">
                  <div
                    className={`
                      absolute inset-0 bg-gradient-to-r from-brand-400 to-brand-500
                      transition-all duration-500 ease-out
                      ${isCompleted ? 'translate-x-0' : '-translate-x-full'}
                    `}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile vertical stepper */}
      <div className="md:hidden space-y-3">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isClickable = onStepClick && (isCompleted || isCurrent)

          return (
            <button
              key={index}
              onClick={() => isClickable && onStepClick(index)}
              disabled={!isClickable}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl
                transition-all duration-300
                ${isCurrent ? 'glass-card' : 'bg-white/5'}
                ${isClickable ? 'cursor-pointer hover:bg-white/10' : 'cursor-default'}
              `}
            >
              {/* Circle with number or check */}
              <div
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full shrink-0
                  border-2 transition-all duration-300 font-semibold text-sm
                  ${
                    isCompleted
                      ? 'bg-brand-500/20 border-brand-400 text-brand-300'
                      : isCurrent
                      ? 'bg-brand-500/30 border-brand-400 text-brand-200'
                      : 'bg-white/5 border-white/20 text-white/40'
                  }
                `}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : <span>{index + 1}</span>}
              </div>

              {/* Step label */}
              <div className="text-left flex-1">
                <div
                  className={`
                    text-sm font-semibold transition-colors
                    ${isCurrent ? 'text-white' : isCompleted ? 'text-white/80' : 'text-white/50'}
                  `}
                >
                  {step.label}
                </div>
                <div className="text-xs text-white/40">{step.description}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
