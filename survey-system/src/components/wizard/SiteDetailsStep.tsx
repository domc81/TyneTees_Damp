'use client'

import { Input } from '@/components/ui/input'
import {
  SiteDetails,
  WEATHER_OPTIONS,
  PROPERTY_TYPES,
  CONSTRUCTION_TYPES,
} from '@/types/survey-wizard.types'
import { Calendar, Cloud, Thermometer, Home, Hammer, Clock, Camera } from 'lucide-react'
import PhotoCapture from './PhotoCapture'
import { filterPhotos } from '@/lib/survey-photo-service'
import type { SurveyPhoto } from '@/types/survey-photo.types'

interface SiteDetailsStepProps {
  data: Partial<SiteDetails>
  onChange: (data: Partial<SiteDetails>) => void
  surveyId: string
  photos: SurveyPhoto[]
  onPhotosChange: () => void
}

export default function SiteDetailsStep({ data, onChange, surveyId, photos, onPhotosChange }: SiteDetailsStepProps) {
  const handleChange = (field: keyof SiteDetails, value: any) => {
    onChange({ ...data, [field]: value })
  }

  // Filter photos for this step
  const sitePhotos = filterPhotos(photos, { step: 'site_details' })

  return (
    <div className="space-y-6">
      {/* Property Photo */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-brand-500/20">
            <Camera className="w-5 h-5 text-brand-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Property Photo</h3>
            <p className="text-sm text-white/60">Front elevation of the property from the street</p>
          </div>
        </div>

        <PhotoCapture
          surveyId={surveyId}
          step="site_details"
          category="street_view"
          label="Street View"
          required={true}
          maxPhotos={1}
          existingPhotos={filterPhotos(sitePhotos, { category: 'street_view' })}
          onPhotosChange={onPhotosChange}
          autoDescription="Front elevation — street view"
        />
      </div>

      {/* Inspection Information */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-brand-500/20">
            <Calendar className="w-5 h-5 text-brand-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Inspection Information</h3>
            <p className="text-sm text-white/60">Date, weather, and conditions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Inspection Date *
              </span>
            </label>
            <input
              type="date"
              value={data.inspection_date || ''}
              onChange={(e) => handleChange('inspection_date', e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              <span className="flex items-center gap-2">
                <Cloud className="w-4 h-4" />
                Weather Conditions *
              </span>
            </label>
            <select
              value={data.weather_conditions || ''}
              onChange={(e) => handleChange('weather_conditions', e.target.value)}
              className="input-field"
              required
            >
              <option value="">Select weather...</option>
              {WEATHER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              <span className="flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                Temperature (°C) *
              </span>
            </label>
            <input
              type="number"
              value={data.temperature_c || ''}
              onChange={(e) => handleChange('temperature_c', parseFloat(e.target.value))}
              className="input-field"
              placeholder="e.g., 15"
              step="0.1"
              required
            />
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-brand-500/20">
            <Home className="w-5 h-5 text-brand-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Property Details</h3>
            <p className="text-sm text-white/60">Type, construction, and age</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              <span className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Property Type *
              </span>
            </label>
            <select
              value={data.property_type || ''}
              onChange={(e) => handleChange('property_type', e.target.value)}
              className="input-field"
              required
            >
              <option value="">Select property type...</option>
              {PROPERTY_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              <span className="flex items-center gap-2">
                <Hammer className="w-4 h-4" />
                Construction Type *
              </span>
            </label>
            <select
              value={data.construction_type || ''}
              onChange={(e) => handleChange('construction_type', e.target.value)}
              className="input-field"
              required
            >
              <option value="">Select construction type...</option>
              {CONSTRUCTION_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white/80 mb-2">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Approximate Build Year
              </span>
            </label>
            <input
              type="text"
              value={data.approx_build_year || ''}
              onChange={(e) => handleChange('approx_build_year', e.target.value)}
              className="input-field"
              placeholder="e.g., 1930s, 1950-1960, 2000+"
            />
            <p className="mt-1.5 text-sm text-white/50">
              Enter an approximate era or range (e.g., "1920s", "1950-1960", "Pre-1900")
            </p>
          </div>
        </div>
      </div>

      {/* Required fields note */}
      <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-brand-500/10 border border-brand-400/30">
        <div className="text-brand-300 mt-0.5">*</div>
        <p className="text-sm text-white/80">
          Required fields must be completed before proceeding to the next step
        </p>
      </div>
    </div>
  )
}
