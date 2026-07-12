'use client'

// =============================================================================
// CompanyLocationsSection — manage the central company_locations record
// (review pt 9) on /settings/company: registered office, regional offices,
// service areas, and regional contact numbers. Feeds the report footer.
// =============================================================================

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Loader2, MapPin, Plus, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react'
import type { CompanyLocation, CompanyLocationType } from '@/lib/company-locations'

const TYPE_LABELS: Record<CompanyLocationType, string> = {
  registered: 'Registered office',
  regional_office: 'Regional office',
  service_area: 'Service area (town only)',
  contact_number: 'Contact number',
}

const TYPE_ORDER: CompanyLocationType[] = [
  'registered',
  'regional_office',
  'service_area',
  'contact_number',
]

const hasAddress = (t: CompanyLocationType) => t === 'registered' || t === 'regional_office'

export function CompanyLocationsSection() {
  const [locations, setLocations] = useState<CompanyLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [newType, setNewType] = useState<CompanyLocationType>('regional_office')
  const [adding, setAdding] = useState(false)

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/settings/company/locations')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load locations')
      setLocations(data.locations)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to load locations')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  function patchLocal(id: string, patch: Partial<CompanyLocation>) {
    setLocations((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)))
  }

  async function persist(id: string, patch: Partial<CompanyLocation>, silent = false) {
    setSavingId(id)
    try {
      const res = await fetch('/api/settings/company/locations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...patch }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Save failed')
      patchLocal(id, data.location)
      if (!silent) toast.success('Location saved')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed')
      load() // re-sync after a failed write
    } finally {
      setSavingId(null)
    }
  }

  async function addLocation() {
    setAdding(true)
    try {
      const maxOrder = Math.max(0, ...locations.map((l) => l.display_order))
      const res = await fetch('/api/settings/company/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: 'New location',
          type: newType,
          display_order: maxOrder + 10,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to add location')
      setLocations((prev) => [...prev, data.location])
      toast.success('Location added — edit its details below')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to add location')
    } finally {
      setAdding(false)
    }
  }

  async function move(loc: CompanyLocation, dir: -1 | 1) {
    const group = locations
      .filter((l) => l.type === loc.type)
      .sort((a, b) => a.display_order - b.display_order)
    const idx = group.findIndex((l) => l.id === loc.id)
    const swap = group[idx + dir]
    if (!swap) return
    // Swap display_order values, persist both
    patchLocal(loc.id, { display_order: swap.display_order })
    patchLocal(swap.id, { display_order: loc.display_order })
    await persist(loc.id, { display_order: swap.display_order }, true)
    await persist(swap.id, { display_order: loc.display_order }, true)
  }

  if (loading) {
    return (
      <div className="glass-card p-6 flex items-center gap-3 text-white/60">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading locations…
      </div>
    )
  }

  return (
    <div className="glass-card">
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-white/50" />
          <h3 className="font-semibold text-white">Company Locations</h3>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as CompanyLocationType)}
            className="input-field text-sm py-1.5"
          >
            {TYPE_ORDER.map((t) => (
              <option key={t} value={t}>{TYPE_LABELS[t]}</option>
            ))}
          </select>
          <button
            onClick={addLocation}
            disabled={adding}
            className="btn-secondary flex items-center gap-1.5 text-sm py-1.5 px-3"
          >
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Add
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <p className="text-xs text-white/50">
          These feed the report footer (registered office, regional contact numbers,
          towns line) and other customer documents. Service areas render as town
          names only — never as postal offices. Deactivated rows disappear from
          customer documents but are kept here.
        </p>

        {TYPE_ORDER.map((type) => {
          const group = locations
            .filter((l) => l.type === type)
            .sort((a, b) => a.display_order - b.display_order)
          if (group.length === 0) return null
          return (
            <div key={type}>
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                {TYPE_LABELS[type]}
              </p>
              <div className="space-y-2">
                {group.map((loc) => (
                  <div
                    key={loc.id}
                    className={`p-3 rounded-xl border space-y-2 ${loc.is_active ? 'bg-white/5 border-white/10' : 'bg-white/[0.02] border-white/5 opacity-60'}`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={loc.label}
                        onChange={(e) => patchLocal(loc.id, { label: e.target.value })}
                        onBlur={(e) => persist(loc.id, { label: e.target.value }, true)}
                        className="input-field text-sm flex-1"
                        placeholder="Label (e.g. South Shields)"
                      />
                      {type === 'contact_number' && (
                        <input
                          type="text"
                          value={loc.phone ?? ''}
                          onChange={(e) => patchLocal(loc.id, { phone: e.target.value })}
                          onBlur={(e) => persist(loc.id, { phone: e.target.value }, true)}
                          className="input-field text-sm flex-1"
                          placeholder="Phone number"
                        />
                      )}
                      <button
                        onClick={() => move(loc, -1)}
                        className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10"
                        aria-label="Move up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => move(loc, 1)}
                        className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10"
                        aria-label="Move down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => persist(loc.id, { is_active: !loc.is_active })}
                        disabled={savingId === loc.id}
                        className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10"
                        title={loc.is_active ? 'Deactivate (hide from customer documents)' : 'Reactivate'}
                        aria-label={loc.is_active ? 'Deactivate' : 'Reactivate'}
                      >
                        {savingId === loc.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : loc.is_active ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {hasAddress(type) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={loc.address_line1 ?? ''}
                          onChange={(e) => patchLocal(loc.id, { address_line1: e.target.value })}
                          onBlur={(e) => persist(loc.id, { address_line1: e.target.value }, true)}
                          className="input-field text-sm"
                          placeholder="Address line 1"
                        />
                        <input
                          type="text"
                          value={loc.address_line2 ?? ''}
                          onChange={(e) => patchLocal(loc.id, { address_line2: e.target.value })}
                          onBlur={(e) => persist(loc.id, { address_line2: e.target.value }, true)}
                          className="input-field text-sm"
                          placeholder="Address line 2"
                        />
                        <input
                          type="text"
                          value={loc.city ?? ''}
                          onChange={(e) => patchLocal(loc.id, { city: e.target.value })}
                          onBlur={(e) => persist(loc.id, { city: e.target.value }, true)}
                          className="input-field text-sm"
                          placeholder="City"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={loc.county ?? ''}
                            onChange={(e) => patchLocal(loc.id, { county: e.target.value })}
                            onBlur={(e) => persist(loc.id, { county: e.target.value }, true)}
                            className="input-field text-sm"
                            placeholder="County"
                          />
                          <input
                            type="text"
                            value={loc.postcode ?? ''}
                            onChange={(e) => patchLocal(loc.id, { postcode: e.target.value })}
                            onBlur={(e) => persist(loc.id, { postcode: e.target.value }, true)}
                            className="input-field text-sm"
                            placeholder="Postcode"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
