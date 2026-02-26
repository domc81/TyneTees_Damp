'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Shield } from 'lucide-react'

export default function ChangePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const { session, profile, isLoading: authLoading, refreshProfile } = useAuth()

  // If not authenticated, redirect to login
  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/login')
    }
  }, [authLoading, session, router])

  // If they don't need to change password, send them to dashboard
  useEffect(() => {
    if (!authLoading && profile && !profile.must_change_password) {
      router.push('/')
    }
  }, [authLoading, profile, router])

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      // Step 1: Update the password in Supabase Auth
      const { error: authError } = await supabase.auth.updateUser({
        password,
      })

      if (authError) {
        setError(authError.message)
        setIsLoading(false)
        return
      }

      // Step 2: Clear the must_change_password flag
      if (profile) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .update({ must_change_password: false })
          .eq('user_id', profile.user_id)

        if (profileError) {
          setError('Password changed but failed to update profile. Please contact your administrator.')
          setIsLoading(false)
          return
        }
      }

      // Step 3: Refresh the auth context so ProtectedRoute sees the updated flag
      await refreshProfile()

      // Step 4: Redirect to dashboard
      router.push('/')
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading while auth is checking
  if (authLoading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="w-full max-w-md">
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Shield className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Set Your Password</h1>
            <p className="text-white/60 mt-2">
              You&apos;re using a temporary password. Please set a new one to continue.
            </p>
          </div>

          <div className="mb-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <p className="text-xs text-amber-300">
              Choose a strong password with at least 8 characters. You won&apos;t be able to access the system until this is done.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-6">
            <div>
              <Input
                label="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>

            <div>
              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Set Password & Continue
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-white/30">
              Signed in as {profile?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
