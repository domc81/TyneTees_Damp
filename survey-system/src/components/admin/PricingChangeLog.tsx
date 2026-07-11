'use client'

// =============================================================================
// PricingChangeLog — collapsible change-history panel for admin pricing pages.
//
// Reads pricing_change_log (trigger-written audit trail, admin-read-only via
// RLS). Lazy-loads on first expand. Shows who changed what, when, with
// per-field old→new values for updates.
// =============================================================================

import { useCallback, useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  History,
  Loader2,
  Plus,
  Pencil,
  RefreshCw,
  Trash2,
} from 'lucide-react'
import { getPricingChanges, type PricingChangeEntry } from '@/lib/pricing-audit'

const TABLE_LABELS: Record<string, string> = {
  pricing_config: 'Pricing config',
  materials_catalog: 'Material',
  costing_line_templates: 'Template',
  costing_sections: 'Section',
}

function formatValue(v: unknown): string {
  if (v === null || v === undefined) return '—'
  if (typeof v === 'number') return String(v)
  if (typeof v === 'boolean') return v ? 'yes' : 'no'
  if (typeof v === 'object') {
    const s = JSON.stringify(v)
    return s.length > 60 ? `${s.slice(0, 57)}...` : s
  }
  const s = String(v)
  return s.length > 60 ? `${s.slice(0, 57)}...` : s
}

function formatWhen(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const OP_META = {
  INSERT: { icon: Plus, cls: 'text-green-300', label: 'created' },
  UPDATE: { icon: Pencil, cls: 'text-blue-300', label: 'changed' },
  DELETE: { icon: Trash2, cls: 'text-red-300', label: 'deleted' },
} as const

export function PricingChangeLog({ tables }: { tables: string[] }) {
  const [open, setOpen] = useState(false)
  const [entries, setEntries] = useState<PricingChangeEntry[] | null>(null)
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setEntries(await getPricingChanges(tables, 50))
    setLoading(false)
  }, [tables])

  const toggle = () => {
    const next = !open
    setOpen(next)
    if (next && entries === null) load()
  }

  return (
    <div className="section-card overflow-hidden">
      <button
        onClick={toggle}
        className="w-full flex items-center gap-3 p-4 hover:bg-white/5 transition-colors text-left"
      >
        <History className="w-4 h-4 text-white/50 shrink-0" />
        <span className="text-sm font-medium text-white/80">Change history</span>
        <span className="text-xs text-white/40">who changed what, and when</span>
        {open ? (
          <ChevronDown className="w-4 h-4 text-white/40 ml-auto" />
        ) : (
          <ChevronRight className="w-4 h-4 text-white/40 ml-auto" />
        )}
      </button>

      {open && (
        <div className="border-t border-white/10">
          <div className="p-3 flex justify-end">
            <button
              onClick={load}
              disabled={loading}
              className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5" />
              )}
              Refresh
            </button>
          </div>

          {loading && entries === null ? (
            <div className="p-6 text-center text-white/40 text-sm">Loading history...</div>
          ) : entries && entries.length === 0 ? (
            <div className="p-6 text-center text-white/40 text-sm">
              No changes recorded yet — the log started on 11 July 2026.
            </div>
          ) : (
            <ul className="divide-y divide-white/5 max-h-96 overflow-y-auto">
              {(entries ?? []).map(entry => {
                const meta = OP_META[entry.operation]
                const Icon = meta.icon
                const fields = (entry.changed_fields ?? []).slice(0, 5)
                return (
                  <li key={entry.id} className="px-4 py-2.5">
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <Icon className={`w-3.5 h-3.5 ${meta.cls} shrink-0`} />
                      <span className="text-white/40">{formatWhen(entry.changed_at)}</span>
                      <span className="text-white/70 font-medium">
                        {entry.changed_by_name ?? 'System / migration'}
                      </span>
                      <span className="text-white/40">{meta.label}</span>
                      <span className="text-white/60">
                        {TABLE_LABELS[entry.table_name] ?? entry.table_name}
                      </span>
                      <span className="text-white/90 truncate max-w-[280px]">
                        {entry.row_label ?? entry.row_pk}
                      </span>
                    </div>
                    {entry.operation === 'UPDATE' && fields.length > 0 && (
                      <div className="mt-1 ml-6 flex flex-wrap gap-x-4 gap-y-0.5">
                        {fields.map(field => (
                          <span key={field} className="text-xs text-white/50">
                            <span className="text-white/40">{field}:</span>{' '}
                            <span className="line-through text-white/30">
                              {formatValue(entry.old_values?.[field])}
                            </span>{' '}
                            → <span className="text-white/70">{formatValue(entry.new_values?.[field])}</span>
                          </span>
                        ))}
                        {(entry.changed_fields?.length ?? 0) > 5 && (
                          <span className="text-xs text-white/30">
                            +{(entry.changed_fields?.length ?? 0) - 5} more fields
                          </span>
                        )}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
