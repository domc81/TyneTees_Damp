'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  Users,
  Search,
  Plus,
  Edit2,
  Save,
  X,
  ArrowLeft,
  UserCheck,
  UserX,
  Shield,
  Copy,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'
import { createClient } from '@/lib/supabase-client'
import { useAuth } from '@/context/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Layout from '@/components/layout'
import type { UserProfile, UserRole } from '@/types/database.types'

const roleOptions: { value: UserRole; label: string }[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'office', label: 'Office' },
  { value: 'surveyor', label: 'Surveyor' },
]

const roleColors: Record<UserRole, string> = {
  admin: 'bg-amber-500/20 text-amber-300',
  office: 'bg-blue-500/20 text-blue-300',
  surveyor: 'bg-green-500/20 text-green-300',
}

export default function AdminTeamPage() {
  const { isAdmin, isLoading: authLoading, profile: currentProfile } = useAuth()
  const [members, setMembers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingMember, setEditingMember] = useState<UserProfile | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const supabase = createClient()

  // Load all team member profiles
  const loadMembers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setMembers(data || [])
    } catch (err) {
      console.error('Failed to load team members:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading) loadMembers()
  }, [authLoading])

  // Filter and search
  const filteredMembers = useMemo(() => {
    let items = members
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      items = items.filter(
        (m) =>
          m.display_name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          (m.phone || '').toLowerCase().includes(q)
      )
    }
    if (roleFilter !== 'all') {
      items = items.filter((m) => m.role === roleFilter)
    }
    return items
  }, [members, searchQuery, roleFilter])

  const activeCount = members.filter((m) => m.is_active).length

  // Toggle active/deactivate
  const toggleActive = async (member: UserProfile) => {
    const newStatus = !member.is_active
    const action = newStatus ? 'reactivate' : 'deactivate'

    // Prevent self-deactivation
    if (!newStatus && member.user_id === currentProfile?.user_id) {
      setActionError('You cannot deactivate your own account.')
      setTimeout(() => setActionError(null), 4000)
      return
    }

    if (!confirm(`Are you sure you want to ${action} ${member.display_name}?`)) return

    try {
      const res = await fetch('/api/admin/team', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId: member.id, isActive: newStatus }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      await loadMembers()
    } catch (err: any) {
      setActionError(err.message || `Failed to ${action} team member`)
      setTimeout(() => setActionError(null), 4000)
    }
  }

  // Access guard — show message if not admin
  if (!authLoading && !isAdmin) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Shield className="w-16 h-16 text-amber-400/50 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Admin Access Required</h2>
              <p className="text-white/50">You need administrator privileges to manage team members.</p>
              <Link href="/" className="btn-primary inline-flex items-center gap-2 mt-6">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Admin
          </Link>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-400" />
                Team Management
              </h2>
              <p className="text-sm text-white/60 mt-1">
                {members.length} member{members.length !== 1 ? 's' : ''} &bull; {activeCount} active
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Team Member
            </button>
          </div>

          {/* Error Banner */}
          {actionError && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-sm text-red-300">{actionError}</p>
            </div>
          )}

          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="input-field w-auto"
            >
              <option value="all">All Roles</option>
              {roleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="spinner mx-auto mb-4" />
                <p className="text-white/60">Loading team members...</p>
              </div>
            </div>
          ) : (
            /* Table */
            <div className="section-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table-base">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th className="text-center">Status</th>
                      <th>Created</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((member) => (
                      <tr key={member.id} className={!member.is_active ? 'opacity-50' : ''}>
                        <td>
                          <p className="font-medium text-white">{member.display_name}</p>
                        </td>
                        <td className="text-white/60 text-sm">{member.email}</td>
                        <td className="text-white/60 text-sm">{member.phone || '-'}</td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${roleColors[member.role]}`}
                          >
                            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                          </span>
                        </td>
                        <td className="text-center">
                          {member.is_active ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-300">
                              <UserCheck className="w-3 h-3" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-300">
                              <UserX className="w-3 h-3" />
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="text-white/40 text-sm">
                          {new Date(member.created_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td>
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => setEditingMember(member)}
                              className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-brand-400 transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toggleActive(member)}
                              className={`p-1.5 rounded transition-colors ${
                                member.is_active
                                  ? 'hover:bg-red-500/10 text-white/50 hover:text-red-400'
                                  : 'hover:bg-green-500/10 text-white/50 hover:text-green-400'
                              }`}
                              title={member.is_active ? 'Deactivate' : 'Reactivate'}
                            >
                              {member.is_active ? (
                                <UserX className="w-4 h-4" />
                              ) : (
                                <UserCheck className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredMembers.length === 0 && (
                <div className="p-12 text-center">
                  <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50">
                    {searchQuery || roleFilter !== 'all'
                      ? 'No team members match your search'
                      : 'No team members yet'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <AddMemberModal
            onClose={() => setShowAddModal(false)}
            onCreated={() => {
              setShowAddModal(false)
              loadMembers()
            }}
          />
        )}

        {/* Edit Modal */}
        {editingMember && (
          <EditMemberModal
            member={editingMember}
            currentUserId={currentProfile?.user_id}
            onClose={() => setEditingMember(null)}
            onSaved={() => {
              setEditingMember(null)
              loadMembers()
            }}
          />
        )}
      </Layout>
    </ProtectedRoute>
  )
}

// =============================================================================
// Add Member Modal — creates auth account + profile via API
// =============================================================================

function AddMemberModal({
  onClose,
  onCreated,
}: {
  onClose: () => void
  onCreated: () => void
}) {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phone: '',
    role: 'surveyor' as UserRole,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ tempPassword: string; email: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      setResult({ tempPassword: data.tempPassword, email: formData.email })
    } catch (err: any) {
      setError(err.message || 'Failed to create team member')
    } finally {
      setSubmitting(false)
    }
  }

  const copyCredentials = () => {
    if (!result) return
    const text = `Email: ${result.email}\nTemporary Password: ${result.tempPassword}\n\nPlease change your password after first login via Settings > Change Password.`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  // Success state — show credentials
  if (result) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="glass-card w-full max-w-lg">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              Team Member Created
            </h2>
          </div>

          <div className="p-6 space-y-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-amber-300">Share these credentials securely</p>
                  <p className="text-xs text-amber-400/80 mt-1">
                    This is the only time the temporary password will be shown. Instruct the new
                    team member to change it immediately after first login.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 font-mono text-sm">
              <div>
                <span className="text-white/50">Email:</span>{' '}
                <span className="text-white">{result.email}</span>
              </div>
              <div>
                <span className="text-white/50">Temporary Password:</span>{' '}
                <span className="text-green-300 font-bold">{result.tempPassword}</span>
              </div>
            </div>

            <button
              onClick={copyCredentials}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-green-300">Copied to clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Credentials
                </>
              )}
            </button>
          </div>

          <div className="p-6 pt-0">
            <button onClick={onCreated} className="btn-primary w-full">
              Done
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Form state
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Add Team Member</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-white/50">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/20 text-red-300 rounded-lg text-sm">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Display Name *
            </label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="input-field"
              placeholder="e.g. John Smith"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
              placeholder="john@tynetees.co.uk"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-field"
              placeholder="07700 900000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Role *</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              className="input-field"
              required
            >
              {roleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-white/40 mt-1.5">
              Admin = full access &bull; Office = CRM & reports &bull; Surveyor = field work only
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="spinner w-4 h-4" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Create Team Member
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// =============================================================================
// Edit Member Modal — update display name, phone, role
// =============================================================================

function EditMemberModal({
  member,
  currentUserId,
  onClose,
  onSaved,
}: {
  member: UserProfile
  currentUserId?: string
  onClose: () => void
  onSaved: () => void
}) {
  const [formData, setFormData] = useState({
    displayName: member.display_name,
    phone: member.phone || '',
    role: member.role as UserRole,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isSelf = member.user_id === currentUserId

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/team', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: member.id,
          displayName: formData.displayName,
          phone: formData.phone,
          role: formData.role,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      onSaved()
    } catch (err: any) {
      setError(err.message || 'Failed to update team member')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Edit Team Member</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-white/50">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/20 text-red-300 rounded-lg text-sm">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">
              Display Name *
            </label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Email</label>
            <input
              type="email"
              value={member.email}
              className="input-field opacity-50 cursor-not-allowed"
              disabled
            />
            <p className="text-xs text-white/40 mt-1">Email cannot be changed after creation</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-field"
              placeholder="07700 900000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Role *</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              className="input-field"
              disabled={isSelf}
              required
            >
              {roleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {isSelf && (
              <p className="text-xs text-amber-400/80 mt-1.5">You cannot change your own role</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="spinner w-4 h-4" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
