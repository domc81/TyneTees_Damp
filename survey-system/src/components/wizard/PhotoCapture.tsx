'use client'

import { useState, useRef } from 'react'
import { Camera, Upload, X, Trash2, MapPin, Calendar, Loader2, Check } from 'lucide-react'
import type { SurveyPhoto, PhotoCapture as PhotoCaptureType, PhotoVisibility } from '@/types/survey-photo.types'
import { PHOTO_VISIBILITY_OPTIONS } from '@/types/survey-photo.types'
import {
  uploadSurveyPhoto,
  deleteSurveyPhoto,
  updateSurveyPhotoMeta,
  getPhotoUrl,
} from '@/lib/survey-photo-service'

// Tier badge styling — always visible on thumbnails so a mis-tiered photo
// (e.g. a technician shot heading for the customer report) is spottable at a glance
const VISIBILITY_BADGE: Record<PhotoVisibility, { label: string; className: string }> = {
  customer: { label: 'Customer', className: 'bg-emerald-500/85 text-white' },
  technician: { label: 'Technician', className: 'bg-amber-500/85 text-black' },
  office: { label: 'Office', className: 'bg-slate-500/85 text-white' },
}

interface PhotoCaptureProps {
  surveyId: string
  step: 'site_details' | 'external_inspection' | 'room_inspection'
  roomId?: string
  category: string
  label: string
  required?: boolean
  maxPhotos?: number
  existingPhotos: SurveyPhoto[]
  onPhotosChange: (photos: SurveyPhoto[]) => void
  autoDescription?: string  // If set, skip the description modal and use this string automatically
}

export default function PhotoCapture({
  surveyId,
  step,
  roomId,
  category,
  label,
  required = false,
  maxPhotos = 5,
  existingPhotos,
  onPhotosChange,
  autoDescription,
}: PhotoCaptureProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [showDescriptionModal, setShowDescriptionModal] = useState(false)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [description, setDescription] = useState('')
  const [visibility, setVisibility] = useState<PhotoVisibility>('customer')
  const [editingPhoto, setEditingPhoto] = useState<SurveyPhoto | null>(null)
  const [editDescription, setEditDescription] = useState('')
  const [editVisibility, setEditVisibility] = useState<PhotoVisibility>('customer')
  const [savingEdit, setSavingEdit] = useState(false)

  const cameraInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const canAddMore = existingPhotos.length < maxPhotos

  const MAX_RETRIES = 2

  const performUpload = async (file: File, desc: string, vis?: PhotoVisibility) => {
    setIsUploading(true)
    setUploadProgress(0)

    const capture: PhotoCaptureType = {
      file,
      category,
      description: desc || `${label} photo`,
      step,
      room_id: roomId,
      visibility: vis || 'customer',
    }

    let lastError: unknown = null

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => Math.min(prev + 10, 90))
        }, 200)

        const newPhoto = await uploadSurveyPhoto(surveyId, capture)

        clearInterval(progressInterval)
        setUploadProgress(100)

        onPhotosChange([...existingPhotos, newPhoto])

        setTimeout(() => {
          setIsUploading(false)
          setUploadProgress(0)
          setPendingFile(null)
          setDescription('')
        }, 500)
        return // success
      } catch (err) {
        lastError = err
        console.warn(`Upload attempt ${attempt + 1}/${MAX_RETRIES + 1} failed:`, err)
        if (attempt < MAX_RETRIES) {
          setUploadProgress(0)
          // Brief pause before retry
          await new Promise(r => setTimeout(r, 1000))
        }
      }
    }

    console.error('Upload failed after retries:', lastError)
    setError(lastError instanceof Error ? lastError.message : 'Upload failed after retries')
    setIsUploading(false)
    setUploadProgress(0)
  }

  const handleFileSelect = (file: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setError('Please select a JPG, PNG, or WebP image')
      return
    }

    // Validate file size (15MB limit before compression)
    if (file.size > 15 * 1024 * 1024) {
      setError('File size exceeds 15MB limit')
      return
    }

    if (autoDescription !== undefined) {
      // Skip description modal — upload immediately with the auto-generated description
      setError(null)
      performUpload(file, autoDescription, 'customer')
    } else {
      // Show description modal
      setPendingFile(file)
      setDescription('')
      setShowDescriptionModal(true)
      setError(null)
    }
  }

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
    // Reset input
    if (cameraInputRef.current) {
      cameraInputRef.current.value = ''
    }
  }

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
    // Reset input
    if (galleryInputRef.current) {
      galleryInputRef.current.value = ''
    }
  }

  const handleUploadWithDescription = async () => {
    if (!pendingFile) return
    setShowDescriptionModal(false)
    await performUpload(pendingFile, description, visibility)
  }

  const handleDeletePhoto = async (photo: SurveyPhoto) => {
    if (!confirm('Delete this photo? This cannot be undone.')) {
      return
    }

    try {
      await deleteSurveyPhoto(surveyId, photo)
      onPhotosChange(existingPhotos.filter((p) => p.id !== photo.id))
      setEditingPhoto(null)
    } catch (err) {
      console.error('Delete failed:', err)
      setError(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  const openEditModal = (photo: SurveyPhoto) => {
    setEditingPhoto(photo)
    setEditDescription(photo.description || '')
    setEditVisibility(photo.visibility || 'customer')
  }

  const handleSaveEdit = async () => {
    if (!editingPhoto) return
    setSavingEdit(true)
    try {
      const updated = await updateSurveyPhotoMeta(surveyId, editingPhoto.id, {
        description: editDescription,
        visibility: editVisibility,
      })
      onPhotosChange(existingPhotos.map((p) => (p.id === updated.id ? updated : p)))
      setEditingPhoto(null)
    } catch (err) {
      console.error('Photo update failed:', err)
      setError(err instanceof Error ? err.message : 'Failed to update photo')
    } finally {
      setSavingEdit(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-white/90">{label}</label>
          {required && existingPhotos.length === 0 && (
            <span className="text-red-400 text-sm">*Required</span>
          )}
        </div>
        <span className="text-sm text-white/60">
          {existingPhotos.length}/{maxPhotos} photos
        </span>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm flex items-start gap-2">
          <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div className="flex-1">{error}</div>
          <button
            onClick={() => setError(null)}
            className="text-red-300 hover:text-red-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {existingPhotos.map((photo) => (
          <div
            key={photo.id}
            className="group relative aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/10 cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => openEditModal(photo)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') openEditModal(photo)
            }}
          >
            {/* Photo */}
            <img
              src={getPhotoUrl(photo.storage_path)}
              alt={photo.description}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-photo.jpg'
              }}
            />

            {/* Visibility tier badge — always visible */}
            <span
              className={`absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-semibold leading-none ${
                VISIBILITY_BADGE[photo.visibility || 'customer'].className
              }`}
            >
              {VISIBILITY_BADGE[photo.visibility || 'customer'].label}
            </span>

            {/* Overlay with info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1">
                <p className="text-white text-xs font-medium truncate">
                  {photo.description}
                </p>
                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <Calendar className="w-3 h-3" />
                  {new Date(photo.taken_at).toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                {photo.latitude && photo.longitude && (
                  <div className="flex items-center gap-2 text-white/70 text-xs">
                    <MapPin className="w-3 h-3" />
                    Location recorded
                  </div>
                )}
              </div>
            </div>

            {/* Delete button — always visible on touch, hover-reveal on desktop */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDeletePhoto(photo)
              }}
              className="absolute top-2 right-2 p-2 rounded-lg bg-red-500/90 hover:bg-red-600 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Add Photo Buttons */}
        {canAddMore && (
          <>
            {/* Camera Capture */}
            <button
              onClick={() => cameraInputRef.current?.click()}
              disabled={isUploading}
              className="aspect-square rounded-lg border-2 border-dashed border-white/20 hover:border-brand-400/50 hover:bg-brand-500/10 transition-all flex flex-col items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Camera className="w-8 h-8 text-white/60" />
              <span className="text-sm text-white/60">Take Photo</span>
            </button>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleCameraCapture}
              className="hidden"
            />

            {/* Gallery Upload */}
            <button
              onClick={() => galleryInputRef.current?.click()}
              disabled={isUploading}
              className="aspect-square rounded-lg border-2 border-dashed border-white/20 hover:border-brand-400/50 hover:bg-brand-500/10 transition-all flex flex-col items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="w-8 h-8 text-white/60" />
              <span className="text-sm text-white/60">Upload</span>
            </button>
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              onChange={handleGalleryUpload}
              className="hidden"
            />
          </>
        )}
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
          {uploadProgress >= 100 ? (
            <>
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-sm text-green-300">Upload complete</span>
            </>
          ) : (
            <>
              <Loader2 className="w-5 h-5 text-brand-400 animate-spin" />
              <span className="text-sm text-white/70">Uploading photo...</span>
            </>
          )}
        </div>
      )}

      {/* Description Modal */}
      {showDescriptionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative glass-card w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Add Photo Description</h3>
              <button
                onClick={() => {
                  setShowDescriptionModal(false)
                  setPendingFile(null)
                }}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-sm text-white/70 mb-2 block">
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`e.g., "North wall showing damp staining"`}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 resize-none focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20"
                rows={3}
                autoFocus
              />
            </div>

            <div>
              <label className="text-sm text-white/70 mb-2 block">
                Visibility
              </label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as PhotoVisibility)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20"
              >
                {PHOTO_VISIBILITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-navy-900 text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDescriptionModal(false)
                  setPendingFile(null)
                }}
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadWithDescription}
                className="flex-1 px-4 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium transition-colors"
              >
                Upload Photo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Photo Modal — change description/visibility or delete after upload */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative glass-card w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Edit Photo</h3>
              <button
                onClick={() => setEditingPhoto(null)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-lg overflow-hidden border border-white/10">
              <img
                src={getPhotoUrl(editingPhoto.storage_path)}
                alt={editingPhoto.description}
                className="w-full max-h-56 object-contain bg-black/40"
              />
              <span
                className={`absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-semibold leading-none ${
                  VISIBILITY_BADGE[editVisibility].className
                }`}
              >
                {VISIBILITY_BADGE[editVisibility].label}
              </span>
            </div>

            <div>
              <label className="text-sm text-white/70 mb-2 block">Description</label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 resize-none focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20"
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm text-white/70 mb-2 block">Visibility</label>
              <select
                value={editVisibility}
                onChange={(e) => setEditVisibility(e.target.value as PhotoVisibility)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20"
              >
                {PHOTO_VISIBILITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-navy-900 text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleDeletePhoto(editingPhoto)}
                disabled={savingEdit}
                className="px-4 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/35 border border-red-500/30 text-red-200 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <div className="flex-1" />
              <button
                onClick={() => setEditingPhoto(null)}
                disabled={savingEdit}
                className="px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={savingEdit}
                className="px-4 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {savingEdit && <Loader2 className="w-4 h-4 animate-spin" />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
