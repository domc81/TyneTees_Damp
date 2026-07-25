'use client'

import {
  WoodwormRoomData,
  WoodwormSpecies,
  InfestationStatus,
  InfestationSeverity,
  FlooringType,
  JoistEntry,
  FindingUrgency,
} from '@/types/survey-wizard.types'
import { Bug, AlertTriangle, Layers, Clock, Hammer, Package, Wrench, PaintBucket, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import UrgencySelector from './UrgencySelector'

interface WoodwormFieldsProps {
  data: Partial<WoodwormRoomData>
  onChange: (data: Partial<WoodwormRoomData>) => void
}

const JOIST_SIZES: { key: string; label: string }[] = [
  { key: '4x2', label: '4x2" (100×50mm)' },
  { key: '5x2', label: '5x2" (125×50mm)' },
  { key: '6x2', label: '6x2" (150×50mm)' },
  { key: '7x2', label: '7x2" (175×50mm)' },
  { key: '8x2', label: '8x2" (200×50mm)' },
  { key: '9x2', label: '9x2" (225×50mm)' },
]

export default function WoodwormFields({ data, onChange }: WoodwormFieldsProps) {
  const handleChange = (field: keyof WoodwormRoomData, value: any) => {
    onChange({ ...data, [field]: value })
  }

  // Joist entries management
  const addJoistEntry = () => {
    const entries = data.joist_entries || []
    const newEntry: JoistEntry = {
      size: '4x2',
      quantity: 0,
      length: 0,
    }
    handleChange('joist_entries', [...entries, newEntry])
  }

  const updateJoistEntry = (index: number, updates: Partial<JoistEntry>) => {
    const entries = [...(data.joist_entries || [])]
    entries[index] = { ...entries[index], ...updates }
    handleChange('joist_entries', entries)
  }

  const removeJoistEntry = (index: number) => {
    const entries = [...(data.joist_entries || [])]
    entries.splice(index, 1)
    handleChange('joist_entries', entries)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/20">
            <Bug className="w-5 h-5 text-red-300" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Woodworm Assessment</h4>
            <p className="text-sm text-white/60">Infestation identification and treatment</p>
          </div>
        </div>
      </div>

      {/* Finding Urgency */}
      <UrgencySelector
        value={data.urgency}
        onChange={(v: FindingUrgency) => handleChange('urgency', v)}
      />

      {/* Infestation Details */}
      <div className="glass-card p-4 space-y-4">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-300" />
          Infestation Details
        </h5>

        {/* Species Identified */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Species Identified
          </label>
          <select
            value={data.species_identified || ''}
            onChange={(e) => handleChange('species_identified', e.target.value as WoodwormSpecies)}
            className="input-field"
          >
            <option value="">Select species...</option>
            <option value="common_furniture_beetle">Common Furniture Beetle</option>
            <option value="deathwatch_beetle">Deathwatch Beetle</option>
            <option value="house_longhorn">House Longhorn Beetle</option>
            <option value="powderpost_beetle">Powderpost Beetle</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        {/* Infestation Status */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Infestation Status
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['active', 'historic', 'uncertain'] as InfestationStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => handleChange('infestation_status', status)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize
                  ${
                    data.infestation_status === status
                      ? 'bg-red-500/30 border border-red-400 text-white'
                      : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                  }
                `}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Severity */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Severity
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['light', 'moderate', 'severe'] as InfestationSeverity[]).map((severity) => (
              <button
                key={severity}
                onClick={() => handleChange('severity', severity)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize
                  ${
                    data.severity === severity
                      ? 'bg-red-500/30 border border-red-400 text-white'
                      : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                  }
                `}
              >
                {severity}
              </button>
            ))}
          </div>
        </div>

        {/* Structural Damage */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
          <div>
            <label className="text-sm font-medium text-white">Structural Damage</label>
            <p className="text-xs text-white/50">Evidence of load-bearing timber damage</p>
          </div>
          <button
            onClick={() => handleChange('structural_damage', !data.structural_damage)}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full
              transition-colors duration-300
              ${data.structural_damage ? 'bg-brand-500' : 'bg-white/20'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-[#fff] shadow-lg
                transition-transform duration-300
                ${data.structural_damage ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>
      </div>

      {/* Treatment Areas */}
      <div className="glass-card p-4 space-y-4">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-red-300" />
          Treatment Areas
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Spray Floor Area (m²)
            </label>
            <input
              type="number"
              value={data.spray_floor_area || ''}
              onChange={(e) => handleChange('spray_floor_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="Floor area"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Spray Timber Area (m²)
            </label>
            <input
              type="number"
              value={data.spray_timber_area || ''}
              onChange={(e) => handleChange('spray_timber_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="Exposed timber"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Paste Treatment Area (m²)
            </label>
            <input
              type="number"
              value={data.paste_treatment_area || ''}
              onChange={(e) => handleChange('paste_treatment_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="Paste required"
            />
          </div>
        </div>

        <p className="text-xs text-white/50">
          Enter the area requiring treatment for each method
        </p>
      </div>

      {/* Preparatory Work — woodworm workbook rows 21-24 */}
      <div className="glass-card p-4 space-y-3">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-red-300" />
          Preparatory Work
        </h5>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Radiators
            </label>
            <input
              type="number"
              value={data.radiator_count || ''}
              onChange={(e) => handleChange('radiator_count', parseInt(e.target.value) || undefined)}
              className="input-field"
              min="0"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Sockets
            </label>
            <input
              type="number"
              value={data.socket_count || ''}
              onChange={(e) => handleChange('socket_count', parseInt(e.target.value) || undefined)}
              className="input-field"
              min="0"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Skirting (LM)
            </label>
            <input
              type="number"
              value={data.skirting_length || ''}
              onChange={(e) => handleChange('skirting_length', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Strip Wallpaper (m²)
            </label>
            <input
              type="number"
              value={data.wallpaper_area || ''}
              onChange={(e) => handleChange('wallpaper_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Strip-Out — woodworm workbook rows 29-33 */}
      <div className="glass-card p-4 space-y-3">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Hammer className="w-4 h-4 text-red-300" />
          Strip-Out
        </h5>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Remove Wall Plaster (m²)
            </label>
            <input
              type="number"
              value={data.wall_plaster_removal_area || ''}
              onChange={(e) => handleChange('wall_plaster_removal_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Remove Stud Walls (m²)
            </label>
            <input
              type="number"
              value={data.stud_walls_removal_area || ''}
              onChange={(e) => handleChange('stud_walls_removal_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Plaster &amp; Lath Ceilings (m²)
            </label>
            <input
              type="number"
              value={data.lath_ceilings_area || ''}
              onChange={(e) => handleChange('lath_ceilings_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Strip Timber Floor (m²)
            </label>
            <input
              type="number"
              value={data.timber_floor_strip_area || ''}
              onChange={(e) => handleChange('timber_floor_strip_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Scrape Sub Floors (m²)
            </label>
            <input
              type="number"
              value={data.scrape_subfloor_area || ''}
              onChange={(e) => handleChange('scrape_subfloor_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Plastering — woodworm workbook rows 39-41 */}
      <div className="glass-card p-4 space-y-3">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <PaintBucket className="w-4 h-4 text-red-300" />
          Plastering
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Construct Stud Wall (m²)
            </label>
            <input
              type="number"
              value={data.stud_wall_area || ''}
              onChange={(e) => handleChange('stud_wall_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Plasterboarding (m²)
            </label>
            <input
              type="number"
              value={data.plasterboard_area || ''}
              onChange={(e) => handleChange('plasterboard_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Skimming (m²)
            </label>
            <input
              type="number"
              value={data.skim_area || ''}
              onChange={(e) => handleChange('skim_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Joists & Timbers — woodworm workbook rows 50-67 */}
      <div className="glass-card p-4 space-y-3">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Hammer className="w-4 h-4 text-red-300" />
          Joists &amp; Timbers
        </h5>

        {(data.joist_entries || []).map((entry, index) => (
          <div key={index} className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="grid grid-cols-3 gap-3 mb-2">
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1">
                  Size
                </label>
                <select
                  value={entry.size}
                  onChange={(e) => updateJoistEntry(index, { size: e.target.value })}
                  className="input-field text-sm"
                >
                  {JOIST_SIZES.map(({ key, label }) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/60 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={entry.quantity || ''}
                  onChange={(e) => updateJoistEntry(index, { quantity: parseInt(e.target.value) || 0 })}
                  className="input-field text-sm"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/60 mb-1">
                  Length (m)
                </label>
                <input
                  type="number"
                  value={entry.length || ''}
                  onChange={(e) => updateJoistEntry(index, { length: parseFloat(e.target.value) || 0 })}
                  className="input-field text-sm"
                  step="0.1"
                  min="0"
                />
              </div>
            </div>

            <button
              onClick={() => removeJoistEntry(index)}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Remove
            </button>
          </div>
        ))}

        <Button
          onClick={addJoistEntry}
          variant="secondary"
          size="sm"
          className="w-full flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Joist Entry
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Treat &amp; Endwrap (LM)
            </label>
            <input
              type="number"
              value={data.endwrap_joists_lm || ''}
              onChange={(e) => handleChange('endwrap_joists_lm', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Wall Plate 100x25 (LM)
            </label>
            <input
              type="number"
              value={data.wall_plate_lm || ''}
              onChange={(e) => handleChange('wall_plate_lm', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Bower Beams (pairs)
            </label>
            <input
              type="number"
              value={data.bower_beams_count || ''}
              onChange={(e) => handleChange('bower_beams_count', parseInt(e.target.value) || undefined)}
              className="input-field"
              min="0"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Flitch Plates (pairs)
            </label>
            <input
              type="number"
              value={data.flitch_plates_count || ''}
              onChange={(e) => handleChange('flitch_plates_count', parseInt(e.target.value) || undefined)}
              className="input-field"
              min="0"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Flooring — woodworm workbook rows 62-67 */}
      <div className="glass-card p-4 space-y-3">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-red-300" />
          Flooring
        </h5>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Flooring Type
            </label>
            <select
              value={data.flooring_type || ''}
              onChange={(e) => handleChange('flooring_type', (e.target.value || undefined) as FlooringType | undefined)}
              className="input-field"
            >
              <option value="">No replacement</option>
              <option value="weyrock_18mm">Weyrock 18mm</option>
              <option value="weyrock_22mm">Weyrock 22mm</option>
              <option value="std_tg_floorboards">Std T&amp;G Floorboards</option>
              <option value="victorian_tg_floorboards">Victorian T&amp;G</option>
              <option value="engineered_flooring_sheet">Engineered Sheet</option>
              <option value="structural_engineered_flooring_sheet">Structural Engineered (onto joists)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Flooring Area (m²)
            </label>
            <input
              type="number"
              value={data.flooring_area || ''}
              onChange={(e) => handleChange('flooring_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="0"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Suspended Floor Insulation (m²)
          </label>
          <input
            type="number"
            value={data.suspended_floor_insulation_area || ''}
            onChange={(e) => handleChange('suspended_floor_insulation_area', parseFloat(e.target.value) || undefined)}
            className="input-field"
            step="0.1"
            min="0"
            placeholder="0"
          />
        </div>
      </div>

      {/* Treatment Extras — woodworm workbook rows 72-73 */}
      <div className="glass-card p-4 space-y-3">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Package className="w-4 h-4 text-red-300" />
          Treatment Extras
        </h5>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Clear Sub-Floor Debris (m²)
            </label>
            <input
              type="number"
              value={data.clear_sub_floor_debris_area || ''}
              onChange={(e) => handleChange('clear_sub_floor_debris_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Protective Treatment to New Timbers (m²)
            </label>
            <input
              type="number"
              value={data.protective_treatment_area || ''}
              onChange={(e) => handleChange('protective_treatment_area', parseFloat(e.target.value) || undefined)}
              className="input-field"
              step="0.1"
              min="0"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Loft Insulation */}
      <div className="glass-card p-4 space-y-3">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Package className="w-4 h-4 text-red-300" />
          Fogging Loft Area
        </h5>
        <p className="text-xs text-white/50">
          Enter loft floor area to fog. Optionally include lifting and/or relaying insulation.
        </p>
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Fogging Loft Area (m²)
          </label>
          <input
            type="number"
            value={data.loft_insulation_area || ''}
            onChange={(e) => handleChange('loft_insulation_area', parseFloat(e.target.value) || undefined)}
            className="input-field"
            step="0.1"
            min="0"
            placeholder="Loft floor area to fog"
          />
        </div>

        {/* Lifting / Relaying toggles — only shown when fogging area > 0 */}
        {(data.loft_insulation_area || 0) > 0 && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <label className="text-sm font-medium text-white">Include Lifting Loft Insulation</label>
              <button
                onClick={() => handleChange('include_lifting_loft_insulation', !data.include_lifting_loft_insulation)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full
                  transition-colors duration-300
                  ${data.include_lifting_loft_insulation ? 'bg-red-500' : 'bg-white/20'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-[#fff] shadow-lg
                    transition-transform duration-300
                    ${data.include_lifting_loft_insulation ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {data.include_lifting_loft_insulation && (
              <div className="pl-4">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Lifting Area (m²)
                </label>
                <input
                  type="number"
                  value={data.lifting_area ?? ''}
                  onChange={(e) => handleChange('lifting_area', e.target.value === '' ? undefined : parseFloat(e.target.value) || 0)}
                  className="input-field"
                  step="0.1"
                  min="0"
                  placeholder={String(data.loft_insulation_area || 0)}
                />
                <p className="mt-1 text-xs text-white/50">Blank = fogged loft area</p>
              </div>
            )}

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <label className="text-sm font-medium text-white">Include Relaying Loft Insulation</label>
              <button
                onClick={() => handleChange('include_relaying_loft_insulation', !data.include_relaying_loft_insulation)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full
                  transition-colors duration-300
                  ${data.include_relaying_loft_insulation ? 'bg-red-500' : 'bg-white/20'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-[#fff] shadow-lg
                    transition-transform duration-300
                    ${data.include_relaying_loft_insulation ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {data.include_relaying_loft_insulation && (
              <div className="pl-4">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Relaying Area (m²)
                </label>
                <input
                  type="number"
                  value={data.relaying_area ?? ''}
                  onChange={(e) => handleChange('relaying_area', e.target.value === '' ? undefined : parseFloat(e.target.value) || 0)}
                  className="input-field"
                  step="0.1"
                  min="0"
                  placeholder={String(data.loft_insulation_area || 0)}
                />
                <p className="mt-1 text-xs text-white/50">Blank = fogged loft area</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Staircase Fogging */}
      <div className="glass-card p-4 space-y-3">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Hammer className="w-4 h-4 text-red-300" />
          Staircase Fogging
        </h5>
        <p className="text-xs text-white/50">Enter step counts only where staircase fogging is required</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Open Rear Treads (steps)
            </label>
            <input
              type="number"
              value={data.staircase_open_rear_steps || ''}
              onChange={(e) => handleChange('staircase_open_rear_steps', parseInt(e.target.value) || undefined)}
              className="input-field"
              min="0"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Closed Rear Treads — Drill &amp; Plug (steps)
            </label>
            <input
              type="number"
              value={data.staircase_closed_rear_steps || ''}
              onChange={(e) => handleChange('staircase_closed_rear_steps', parseInt(e.target.value) || undefined)}
              className="input-field"
              min="0"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Difficulty Hours */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="w-5 h-5 text-red-300" />
          <label className="text-sm font-semibold text-white">
            Difficulty Hours (Extra Labour)
          </label>
        </div>
        <input
          type="number"
          value={data.difficulty_hours || ''}
          onChange={(e) => handleChange('difficulty_hours', parseFloat(e.target.value) || undefined)}
          className="input-field"
          step="0.5"
          min="0"
          placeholder="Hours for difficult access/complexity"
        />
      </div>
    </div>
  )
}
