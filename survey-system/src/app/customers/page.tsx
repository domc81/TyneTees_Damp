'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Users,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  Edit,
  Trash2,
  User,
} from 'lucide-react'
import { getCustomers, getCustomer } from '@/lib/supabase-data'
import type { Customer } from '@/lib/supabase-data'

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCustomers() {
      try {
        setIsLoading(true)
        setError(null)
        const customerList = await getCustomers()
        setCustomers(customerList)
      } catch (err) {
        console.error('Error loading customers:', err)
        setError('Failed to load customers. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadCustomers()
  }, [])

  const filteredCustomers = customers.filter(customer => {
    const fullName = `${customer.first_name ?? ''} ${customer.last_name ?? ''}`.toLowerCase()
    const email = (customer.email ?? '').toLowerCase()
    const phone = (customer.phone ?? '').toLowerCase()
    const address = `${customer.address_line1 ?? ''} ${customer.city ?? ''} ${customer.postcode ?? ''}`.toLowerCase()
    const query = searchQuery.toLowerCase()

    return fullName.includes(query) || 
           email.includes(query) || 
           phone.includes(query) || 
           address.includes(query)
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-white/60">Loading customers...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Error Loading Customers</h3>
          <p className="text-white/60 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Retry
          </button>
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
            <Link href="/" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-white/70" />
            </Link>
            <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Users className="w-6 h-6 text-white/40" />
              Customers
            </h2>
            <p className="text-sm text-white/60">Manage your customer records</p>
            </div>
          </div>
          <Link href="/customers/new" className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Customer
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-8">
        {/* Search and Stats */}
        <div className="glass-card mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
            <div className="flex-1 min-w-0">
              <label className="sr-only">Search customers</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search customers by name, email, phone, or address..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/50 focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">{filteredCustomers.length}</p>
                <p className="text-sm text-white/50">Filtered</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{customers.length}</p>
                <p className="text-sm text-white/50">Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customers List */}
        {filteredCustomers.length === 0 ? (
          <div className="glass-card text-center py-16">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No customers found</h3>
            <p className="text-white/60 mb-6">
              {searchQuery ? 'Your search did not match any customers' : 'You haven\'t added any customers yet'}
            </p>
            <Link
              href="/customers/new"
              className="btn-primary flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Add First Customer
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="glass-card hover:bg-white/5 transition-colors">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm">
                          {(customer.first_name ?? '?')[0]}{(customer.last_name ?? '?')[0]}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            {customer.first_name} {customer.last_name}
                          </h3>
                          <p className="text-sm text-white/60">{customer.email}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm text-white/80">
                          <Phone className="w-4 h-4 text-white/40" />
                          <span>{customer.phone}</span>
                          {customer.mobile && (
                            <span className="text-white/50">/ {customer.mobile}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/80">
                          <Mail className="w-4 h-4 text-white/40" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/80 col-span-1 md:col-span-2">
                          <MapPin className="w-4 h-4 text-white/40" />
                          <span>{customer.address_line1}, {customer.city}, {customer.postcode}</span>
                        </div>
                      </div>

                      {customer.notes && (
                        <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
                          <p className="text-sm text-white/70">{customer.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link
                        href={`/customers/${customer.id}`}
                        className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        title="View customer details"
                      >
                        <User className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/customers/${customer.id}`}
                        className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        title="Edit customer"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-red-500/20 transition-colors"
                        title="Delete customer"
                        onClick={() => alert('Delete functionality to be implemented')}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}