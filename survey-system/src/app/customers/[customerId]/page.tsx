'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Save,
  Edit,
  Trash2,
  Check,
  X,
  ClipboardList
} from 'lucide-react'
import { getCustomer, updateCustomer } from '@/lib/supabase-data'
import type { Customer } from '@/lib/supabase-data'

export default function CustomerDetailPage({ params }: { params: { customerId: string } }) {
  const router = useRouter()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Customer>>({})

  useEffect(() => {
    async function loadCustomer() {
      try {
        setIsLoading(true)
        setError(null)
        const customerData = await getCustomer(params.customerId)
        
        if (!customerData) {
          setError('Customer not found')
          return
        }
        
        setCustomer(customerData)
        setFormData(customerData)
      } catch (err) {
        console.error('Error loading customer:', err)
        setError('Failed to load customer data')
      } finally {
        setIsLoading(false)
      }
    }

    loadCustomer()
  }, [params.customerId])

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSave = async () => {
    if (!customer) return
    
    setIsSaving(true)
    setError(null)
    
    try {
      const updatedCustomer = await updateCustomer(customer.id, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        mobile: formData.mobile,
        address_line1: formData.address_line1,
        address_line2: formData.address_line2,
        city: formData.city,
        county: formData.county,
        postcode: formData.postcode,
        notes: formData.notes
      })

      setCustomer(updatedCustomer)
      setIsEditing(false)
      setError(null)
    } catch (err) {
      console.error('Error saving customer:', err)
      setError(`Failed to save changes: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      return
    }
    
    try {
      // TODO: Implement actual delete functionality
      alert('Delete functionality to be implemented')
      router.push('/customers')
    } catch (err) {
      console.error('Error deleting customer:', err)
      setError('Failed to delete customer')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-white/60">Loading customer details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Error Loading Customer</h3>
          <p className="text-white/60 mb-4">{error}</p>
          <button
            onClick={() => router.push('/customers')}
            className="btn-secondary flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Customers
          </button>
        </div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white/30" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Customer Not Found</h3>
          <p className="text-white/60 mb-6">The requested customer does not exist.</p>
          <Link
            href="/customers"
            className="btn-primary flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Customers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 glass border-b border-white/10 px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/customers" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-white/70" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-3">
                <User className="w-6 h-6 text-white/40" />
                {customer.first_name} {customer.last_name}
              </h1>
              <p className="text-sm text-white/60">Customer Details</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-secondary flex items-center gap-2"
                disabled={isSaving}
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="btn-primary flex items-center gap-2"
                  disabled={isSaving}
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setFormData(customer)
                    setError(null)
                  }}
                  className="btn-ghost flex items-center gap-2"
                  disabled={isSaving}
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </>
            )}
            <button
              onClick={handleDelete}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-red-500/20 transition-colors"
              title="Delete customer"
              disabled={isSaving}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Personal Information Section */}
          <div className="glass-card">
            <div className="px-6 py-5 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-white/40" />
                Personal Information
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.first_name || ''}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-white">{customer.first_name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.last_name || ''}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-white">{customer.last_name}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="glass-card">
            <div className="px-6 py-5 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Phone className="w-5 h-5 text-white/40" />
                Contact Information
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  <p className="text-white">{customer.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  <p className="text-white">{customer.phone}</p>
                )}
              </div>

              {customer.mobile && (
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Mobile Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.mobile || ''}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-white">{customer.mobile}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Address Section */}
          <div className="glass-card">
            <div className="px-6 py-5 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white/40" />
                Address
              </h2>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Address Line 1</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address_line1 || ''}
                    onChange={(e) => handleInputChange('address_line1', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  <p className="text-white">{customer.address_line1}</p>
                )}
              </div>

              {customer.address_line2 && (
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Address Line 2</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.address_line2 || ''}
                      onChange={(e) => handleInputChange('address_line2', e.target.value)}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-white">{customer.address_line2}</p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.city || ''}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-white">{customer.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">County</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.county || ''}
                      onChange={(e) => handleInputChange('county', e.target.value)}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-white">{customer.county || '-'}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Postcode</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.postcode || ''}
                    onChange={(e) => handleInputChange('postcode', e.target.value)}
                    className="input-field"
                  />
                ) : (
                  <p className="text-white">{customer.postcode}</p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          {customer.notes && (
            <div className="glass-card">
              <div className="px-6 py-5 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Home className="w-5 h-5 text-white/40" />
                  Additional Notes
                </h2>
              </div>

              <div className="p-6">
                {isEditing ? (
                  <textarea
                    value={formData.notes || ''}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="input-field resize-none h-32"
                  />
                ) : (
                  <p className="text-white/80 whitespace-pre-wrap">{customer.notes}</p>
                )}
              </div>
            </div>
          )}

          {/* Related Projects Section */}
          <div className="glass-card">
            <div className="px-6 py-5 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-white/40" />
                Related Projects
              </h2>
            </div>

            <div className="p-6">
              <p className="text-white/60">
                Projects associated with this customer will appear here.
                <Link href={`/survey/new?customer=${customer.id}`} className="text-brand-400 hover:underline">
                  Create new survey for this customer
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}