'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { useAuth } from '@/context/AuthContext'
import { CompanyLogo } from '@/components/CompanyLogo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const { profileError } = useAuth()
  // Show profile-related errors (e.g. deactivated account on session restore)
  useEffect(() => {
    if (profileError) {
      setError(profileError)
    }
  }, [profileError])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (authError) {
        setError(authError.message)
        setIsLoading(false)
        return
      }

      // Auth succeeded — now check for an active profile
      const { data: profile, error: profileErr } = await supabase
        .from('user_profiles')
        .select('is_active, must_change_password')
        .eq('user_id', data.user.id)
        .single()

      if (profileErr || !profile) {
        await supabase.auth.signOut()
        setError('No user profile found. Contact your administrator.')
        setIsLoading(false)
        return
      }

      if (!profile.is_active) {
        await supabase.auth.signOut()
        setError('Your account has been deactivated. Contact your administrator.')
        setIsLoading(false)
        return
      }

      // If user must change password, send them there instead of dashboard
      if (profile.must_change_password) {
        router.push('/change-password')
        return
      }

      // Profile is active, password OK — proceed to dashboard
      router.push('/')
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="w-full max-w-md">
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CompanyLogo className="h-12" />
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-white/60 mt-2">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-white/60 hover:text-white">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-white/50">
              Don't have an account? Contact your administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}