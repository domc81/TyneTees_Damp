'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Plus,
  Search,
  X,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Users,
  ClipboardList,
  Calendar,
} from 'lucide-react'
import {
  getCustomerList,
  type CustomerWithSurveyCount,
  type CustomerListOptions,
} from '@/lib/customer-data'
import Layout from '@/components/layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'

const PAGE_SIZE = 25

type SortColumn = 'first_name' | 'last_name' | 'email' | 'phone' | 'postcode' | 'created_at'

export default function CustomersPage() {
  const router = useRouter()
  const [customers, setCustomers] = useState<CustomerWithSurveyCount[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Search, sort, pagination state
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortColumn>('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
      setPage(1) // Reset to first page on new search
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch customers when filters change
  const fetchCustomers = useCallback(async () => {
    setIsLoading(true)
    const options: CustomerListOptions = {
      search: debouncedSearch || undefined,
      sortBy,
      sortOrder,
      page,
      pageSize: PAGE_SIZE,
    }

    const result = await getCustomerList(options)
    setCustomers(result.customers)
    setTotalCount(result.totalCount)
    setIsLoading(false)
  }, [debouncedSearch, sortBy, sortOrder, page])

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  // Sort handler
  const handleSort = (column: SortColumn) => {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
    setPage(1)
  }

  // Pagination
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)
  const rangeStart = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, totalCount)

  const SortIcon = ({ column }: { column: SortColumn }) => {
    if (sortBy !== column) return null
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline ml-1" />
    )
  }

  // Format last survey date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">Customers</h1>
              <p className="text-white/60">{totalCount} customer{totalCount !== 1 ? 's' : ''}</p>
            </div>
            <Link
              href="/customers/new"
              className="btn-primary flex items-center gap-2 w-fit"
            >
              <Plus className="w-5 h-5" />
              Add Customer
            </Link>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or postcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12 pr-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <div className="spinner mx-auto mb-4" />
                <p className="text-white/60">Loading customers...</p>
              </div>
            </div>
          ) : customers.length === 0 ? (
            /* Empty states */
            <div className="glass-card p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white/30" />
              </div>
              {debouncedSearch ? (
                <>
                  <h3 className="text-lg font-medium text-white mb-2">
                    No customers match &lsquo;{debouncedSearch}&rsquo;
                  </h3>
                  <p className="text-white/50 mb-4">Try a different search.</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear Search
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-white mb-2">
                    No customers yet
                  </h3>
                  <p className="text-white/50 mb-4">
                    Create your first customer to get started.
                  </p>
                  <Link
                    href="/customers/new"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Customer
                  </Link>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="table-base">
                    <thead>
                      <tr>
                        <th>
                          <button
                            onClick={() => handleSort('first_name')}
                            className="flex items-center gap-1 hover:text-white transition-colors"
                          >
                            Name <SortIcon column="first_name" />
                          </button>
                        </th>
                        <th>
                          <button
                            onClick={() => handleSort('email')}
                            className="flex items-center gap-1 hover:text-white transition-colors"
                          >
                            Email <SortIcon column="email" />
                          </button>
                        </th>
                        <th>
                          <button
                            onClick={() => handleSort('phone')}
                            className="flex items-center gap-1 hover:text-white transition-colors"
                          >
                            Phone <SortIcon column="phone" />
                          </button>
                        </th>
                        <th>
                          <button
                            onClick={() => handleSort('postcode')}
                            className="flex items-center gap-1 hover:text-white transition-colors"
                          >
                            Postcode <SortIcon column="postcode" />
                          </button>
                        </th>
                        <th>Surveys</th>
                        <th>
                          <button
                            onClick={() => handleSort('created_at')}
                            className="flex items-center gap-1 hover:text-white transition-colors"
                          >
                            Created <SortIcon column="created_at" />
                          </button>
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr
                          key={customer.id}
                          onClick={() => router.push(`/customers/${customer.id}`)}
                          className="cursor-pointer"
                        >
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {(customer.first_name?.[0] || '?')}
                                {(customer.last_name?.[0] || '?')}
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium text-white truncate">
                                  {customer.title ? `${customer.title} ` : ''}
                                  {customer.first_name} {customer.last_name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-white/60 truncate max-w-[200px]">
                            {customer.email}
                          </td>
                          <td className="text-white/60 whitespace-nowrap">
                            {customer.phone}
                          </td>
                          <td className="text-white/60 font-mono text-sm">
                            {customer.postcode}
                          </td>
                          <td>
                            <div className="flex items-center gap-1.5">
                              <ClipboardList className="w-4 h-4 text-white/30" />
                              <span className="text-white/60">
                                {customer.survey_count}
                              </span>
                            </div>
                          </td>
                          <td className="text-white/60 whitespace-nowrap">
                            {formatDate(customer.created_at)}
                          </td>
                          <td>
                            <ChevronRight className="w-5 h-5 text-white/30 ml-auto" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                  <p className="text-white/50">
                    Showing {rangeStart}–{rangeEnd} of {totalCount}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                            p === page
                              ? 'bg-brand-500/20 text-brand-300 border border-brand-400/30'
                              : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {p}
                        </button>
                      )
                    )}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-white/50">
                    Page {page} of {totalPages}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
