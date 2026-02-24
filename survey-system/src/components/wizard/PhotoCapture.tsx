'use client'

import { useState, useRef } from 'react'
import { Camera, Upload, X, Trash2, MapPin, Calendar } from 'lucide-react'
import type { SurveyPhoto, PhotoCapture as PhotoCaptureType } from '@/types/survey-photo.types'
import {
  uploadSurveyPhoto,
  deleteSurveyPhoto,
  getPhotoUrl,
} from '@/lib/survey-photo-service'

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

  const cameraInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const canAddMore = existingPhotos.length < maxPhotos

  const performUpload = async (file: File, desc: string) => {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      const capture: PhotoCaptureType = {
        file,
        category,
        description: desc || `${label} photo`,
        step,
        room_id: roomId,
      }

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
    } catch (err) {
      console.error('Upload failed:', err)
      setError(err instanceof Error ? err.message : 'Upload failed')
      setIsUploading(false)
      setUploadProgress(0)
    }
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
      performUpload(file, autoDescription)
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
    await performUpload(pendingFile, description)
  }

  const handleDeletePhoto = async (photo: SurveyPhoto) => {
    if (!confirm('Delete this photo? This cannot be undone.')) {
      return
    }

    try {
      await deleteSurveyPhoto(surveyId, photo)
      onPhotosChange(existingPhotos.filter((p) => p.id !== photo.id))
    } catch (err) {
      console.error('Delete failed:', err)
      setError(err instanceof Error ? err.message : 'Delete failed')
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
            className="group relative aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/10"
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

            {/* Delete button */}
            <button
              onClick={() => handleDeletePhoto(photo)}
              className="absolute top-2 right-2 p-2 rounded-lg bg-red-500/90 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
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
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">
              {uploadProgress < 100 ? 'Uploading...' : 'Complete!'}
            </span>
            <span className="text-white/70">{uploadProgress}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-brand-500 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
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
    </div>
  )
}
