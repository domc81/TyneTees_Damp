'use client'

import { useState, useRef } from 'react'
import {
  Camera,
  Upload,
  X,
  Check,
  ChevronLeft,
  Image as ImageIcon,
  Droplets,
  Bug,
  Wind,
  Thermometer,
  Home,
  Grid,
  List,
  Trash2,
  Download,
} from 'lucide-react'
import { uploadPhoto, deletePhoto, getPhotoUrl } from '@/lib/supabase-data'

// Photo categories with icons
const photoCategories = [
  { id: 'general', label: 'General', icon: ImageIcon },
  { id: 'damp_evidence', label: 'Damp Evidence', icon: Droplets },
  { id: 'timber_damage', label: 'Timber Damage', icon: Bug },
  { id: 'ventilation', label: 'Ventilation', icon: Wind },
  { id: 'thermal', label: 'Thermal/Insulation', icon: Thermometer },
  { id: 'property_exterior', label: 'Property Exterior', icon: Home },
]

// Sample photos
const samplePhotos = [
  { id: '1', file_name: 'IMG_001.jpg', photo_category: 'damp_evidence', description: 'Rising damp on living room wall', created_at: '2026-02-04T10:30:00Z', storage_path: 'projects/a0000000-0000-0000-0000-000000000001/IMG_001.jpg' },
  { id: '2', file_name: 'IMG_002.jpg', photo_category: 'timber_damage', description: 'Joist damage in basement', created_at: '2026-02-04T10:35:00Z', storage_path: 'projects/a0000000-0000-0000-0000-000000000001/IMG_002.jpg' },
  { id: '3', file_name: 'IMG_003.jpg', photo_category: 'general', description: 'Full room view', created_at: '2026-02-04T10:40:00Z', storage_path: 'projects/a0000000-0000-0000-0000-000000000001/IMG_003.jpg' },
  { id: '4', file_name: 'IMG_004.jpg', photo_category: 'damp_evidence', description: 'Salt crystallisation detail', created_at: '2026-02-04T11:00:00Z', storage_path: 'projects/a0000000-0000-0000-0000-000000000001/IMG_004.jpg' },
]

export default function PhotosPage({ params }: { params: { projectId: string } }) {
  const [photos, setPhotos] = useState(samplePhotos)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isCapturing, setIsCapturing] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [newPhotoDesc, setNewPhotoDesc] = useState('')
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredPhotos = selectedCategory
    ? photos.filter(p => p.photo_category === selectedCategory)
    : photos

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp']
      
      // Handle mobile device formats
      if (file.type === 'image/heic' || file.type === 'image/heif') {
        setUploadError('HEIC/HEIF format not supported. Please use JPG, PNG, or WebP.')
        return
      }
      
      if (!validTypes.includes(file.type)) {
        setUploadError('Please select a valid image file (JPEG, PNG, or WebP)')
        return
      }
      
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('File size exceeds 10MB limit')
        return
      }
      
      setSelectedFile(file)
      setShowUploadModal(true)
      setUploadError(null)
    }
  }

  const handleAddPhoto = () => {
    if (selectedCategory) {
      setIsCapturing(true)
    } else {
      setShowUploadModal(true)
    }
  }

  const handleDeletePhoto = async (photoId: string, storagePath: string) => {
    if (!confirm('Are you sure you want to delete this photo? This cannot be undone.')) {
      return
    }

    try {
      const success = await deletePhoto(photoId, storagePath)
      if (success) {
        setPhotos(prev => prev.filter(photo => photo.id !== photoId))
      } else {
        setUploadError('Failed to delete photo. Please try again.')
      }
    } catch (error) {
      console.error('Delete failed:', error)
      setUploadError(error instanceof Error ? error.message : 'Delete failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-surface-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-surface-100 transition-colors">
              <ChevronLeft className="w-5 h-5 text-surface-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-surface-900">Site Photos</h1>
              <p className="text-sm text-surface-500">TT-2026-0001 • Smith Residence</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-surface-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-surface-200'}`}
              >
                <Grid className="w-4 h-4 text-surface-600" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-surface-200'}`}
              >
                <List className="w-4 h-4 text-surface-600" />
              </button>
            </div>
            <button
              onClick={handleAddPhoto}
              className="btn-primary flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Add Photo
            </button>
          </div>
        </div>
      </header>

      {/* Error Display */}
      {uploadError && (
        <div className="p-4">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <X className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{uploadError}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={() => setUploadError(null)}
                    className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                  >
                    <span className="sr-only">Dismiss</span>
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

     <div className="p-8">
        {/* Category Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                         ${selectedCategory === null
                           ? 'bg-brand-100 text-brand-700'
                           : 'bg-white border border-surface-200 text-surface-600 hover:bg-surface-50'}`}
            >
              All Photos ({photos.length})
            </button>
            {photoCategories.map((cat) => {
              const count = photos.filter(p => p.photo_category === cat.id).length
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-colors
                             ${selectedCategory === cat.id
                               ? 'bg-brand-100 text-brand-700'
                               : 'bg-white border border-surface-200 text-surface-600 hover:bg-surface-50'}`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label} ({count})
                </button>
              )
            })}
          </div>
        </div>

        {/* Photo Grid/List */}
        {filteredPhotos.length === 0 ? (
          <div className="empty-state">
            <Camera className="empty-state-icon" />
            <p className="empty-state-title">No photos yet</p>
            <p className="empty-state-description">
              Start capturing photos to document the survey findings
            </p>
            <button onClick={handleAddPhoto} className="btn-primary mt-4">
              Add First Photo
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => {
              const category = photoCategories.find(c => c.id === photo.photo_category)
              const Icon = category?.icon || ImageIcon
              return (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-surface-100 cursor-pointer
                             hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Actual photo or placeholder */}
                  {photo.storage_path ? (
                    <img
                      src={getPhotoUrl({ storage_path: photo.storage_path })}
                      alt={photo.description || 'Survey photo'}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.onerror = null
                        e.currentTarget.src = `/placeholder-photo.jpg`
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-surface-200 to-surface-300">
                      <Icon className="w-12 h-12 text-surface-400" />
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-surface-700 flex items-center gap-1">
                      <Icon className="w-3 h-3" />
                      {category?.label}
                    </span>
                  </div>

                  {/* Description Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-sm font-medium truncate">{photo.description}</p>
                    <p className="text-white/70 text-xs">
                      {new Date(photo.created_at).toLocaleTimeString()}
                    </p>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeletePhoto(photo.id, photo.storage_path)
                      }}
                      className="p-2 rounded-lg bg-white/90 hover:bg-white shadow-sm transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )
            })}

            {/* Add Photo Card */}
            <button
              onClick={handleAddPhoto}
              className="aspect-square rounded-xl border-2 border-dashed border-surface-300
                         flex flex-col items-center justify-center gap-3
                         hover:border-brand-400 hover:bg-brand-50/50 transition-all"
            >
              <div className="p-4 rounded-full bg-surface-100">
                <Camera className="w-8 h-8 text-surface-400" />
              </div>
              <span className="text-surface-500 font-medium">Add Photo</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-surface-200 divide-y divide-surface-100">
            {filteredPhotos.map((photo) => {
              const category = photoCategories.find(c => c.id === photo.photo_category)
              const Icon = category?.icon || ImageIcon
              return (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="p-4 flex items-center gap-4 cursor-pointer hover:bg-surface-50 transition-colors"
                >
                  <div className="w-20 h-20 rounded-lg bg-surface-100 flex items-center justify-center overflow-hidden">
                    {photo.storage_path ? (
                      <img
                        src={getPhotoUrl({ storage_path: photo.storage_path })}
                        alt={photo.description || 'Survey photo'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = `/placeholder-photo.jpg`
                        }}
                      />
                    ) : (
                      <Icon className="w-8 h-8 text-surface-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-surface-900 truncate">{photo.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-surface-500">{photo.file_name}</span>
                      <span className="text-surface-300">•</span>
                      <span className="text-sm text-surface-500">{new Date(photo.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  <span className="badge badge-blue flex items-center gap-1">
                    <Icon className="w-3 h-3" />
                    {category?.label}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeletePhoto(photo.id, photo.storage_path)
                    }}
                    className="p-2 rounded-lg hover:bg-surface-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setSelectedPhoto(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex">
              {/* Photo Preview */}
              <div className="flex-1 bg-surface-900 flex items-center justify-center min-h-[400px]">
                {selectedPhoto.storage_path ? (
                  <img
                    src={getPhotoUrl({ storage_path: selectedPhoto.storage_path })}
                    alt={selectedPhoto.description || 'Survey photo'}
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = `/placeholder-photo.jpg`
                    }}
                  />
                ) : (
                  <div className="text-center text-surface-500">
                    <ImageIcon className="w-24 h-24 mx-auto mb-4" />
                    <p>Photo preview would display here</p>
                  </div>
                )}
              </div>

              {/* Photo Details */}
              <div className="w-80 p-6 overflow-auto">
                <h3 className="text-lg font-semibold text-surface-900 mb-4">Photo Details</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-surface-500">File Name</label>
                    <p className="font-medium text-surface-900">{selectedPhoto.file_name}</p>
                  </div>

                  <div>
                    <label className="text-sm text-surface-500">Category</label>
                    <p className="font-medium text-surface-900 capitalize">
                      {selectedPhoto.photo_category.replace('_', ' ')}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-surface-500">Description</label>
                    <p className="font-medium text-surface-900">{selectedPhoto.description}</p>
                  </div>

                  <div>
                    <label className="text-sm text-surface-500">Taken</label>
                    <p className="font-medium text-surface-900">
                      {new Date(selectedPhoto.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-surface-500">Location</label>
                    <p className="font-medium text-surface-900">GPS coordinates would show here</p>
                  </div>

                  <div className="pt-4 border-t border-surface-100 flex gap-2">
                    <button className="btn-secondary flex-1 flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button className="btn-ghost text-red-600 hover:bg-red-50 flex items-center justify-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for camera/upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload Modal */}
      {showUploadModal && selectedFile && (
        <UploadModal
          onClose={() => {
            setShowUploadModal(false)
            setSelectedFile(null)
            setUploadError(null)
          }}
          onUpload={async (desc, category) => {
            if (!selectedFile) return
            
            setIsUploading(true)
            setUploadError(null)
            
            try {
              const uploadedPhoto = await uploadPhoto(
                params.projectId,
                selectedFile,
                category,
                desc
              )
              
              if (uploadedPhoto) {
                setPhotos(prev => [...prev, {
                  id: uploadedPhoto.id,
                  file_name: uploadedPhoto.file_name,
                  photo_category: uploadedPhoto.photo_category || 'general',
                  description: uploadedPhoto.description || '',
                  created_at: uploadedPhoto.created_at,
                  storage_path: uploadedPhoto.file_path || ''
                }])
                
                // Reset state
                setShowUploadModal(false)
                setSelectedFile(null)
                setNewPhotoDesc('')
              }
            } catch (error) {
              console.error('Upload failed:', error)
              setUploadError(error instanceof Error ? error.message : 'Upload failed. Please try again.')
            } finally {
              setIsUploading(false)
            }
          }}
        />
      )}
    </div>
  )
}

// Upload Modal Component
function UploadModal({
  onClose,
  onUpload,
}: {
  onClose: () => void
  onUpload: (description: string, category: string) => void
}) {
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('general')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-surface-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-surface-900">Upload Photo</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-100 transition-colors">
            <X className="w-5 h-5 text-surface-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="border-2 border-dashed border-surface-300 rounded-xl p-8 text-center">
            <Upload className="w-12 h-12 text-surface-400 mx-auto mb-3" />
            <p className="text-surface-600 font-medium">Drop photo here or tap to browse</p>
            <p className="text-sm text-surface-500 mt-1">Supports JPG, PNG up to 10MB</p>
          </div>

          <div>
            <label className="input-label">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            >
              {photoCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="input-label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field resize-none"
              rows={3}
              placeholder="Describe what this photo shows..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button
              onClick={() => onUpload(description, category)}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
