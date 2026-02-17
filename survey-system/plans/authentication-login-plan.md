# Authentication Login Page Implementation Plan

## Overview
This document outlines the detailed plan for implementing the authentication login page for the Tyne Tees Damp Proofing Survey System using Supabase Auth with the existing platform's design system.

## Requirements
- Use Supabase Auth UI template as base
- Follow existing platform design and styling
- Email/password authentication only (no social logins)
- Admin creates user accounts and sends email invites
- Users set password via email invite link
- Password reset functionality

## Implementation Plan

### 1. Setup Authentication Infrastructure

#### 1.1 Install Required Dependencies
```bash
npm install @supabase/auth-ui @supabase/ssr
```

#### 1.2 Configure Supabase Client for Auth
Update `src/lib/supabase-client.ts` to include auth configuration:

```typescript
import { createBrowserClient } from '@supabase/ssr'

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (supabaseInstance) return supabaseInstance

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn('Supabase URL or key not configured')
    return null as unknown as ReturnType<typeof createBrowserClient>
  }

  supabaseInstance = createBrowserClient(url, key, {
    auth: {
      persistSession: true,
      detectSessionInUrl: true
    }
  })
  return supabaseInstance
}
```

### 2. Create Login Page Component

#### 2.1 Create Login Page Structure
Create `src/app/login/page.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        setError(error.message)
      } else {
        router.push('/')
      }
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
            <img
              src="/logo.svg"
              alt="Tyne Tees Damp Proofing"
              className="h-12 w-auto mx-auto mb-4"
            />
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
```

### 3. Create Forgot Password Page

#### 3.1 Create Forgot Password Page
Create `src/app/forgot-password/page.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage('Password reset email sent! Check your inbox.')
      }
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
            <img
              src="/logo.svg"
              alt="Tyne Tees Damp Proofing"
              className="h-12 w-auto mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-white">Reset Password</h1>
            <p className="text-white/60 mt-2">Enter your email to receive a reset link</p>
          </div>

          {message && (
            <div className="mb-4 p-3 bg-green-500/20 text-green-300 rounded-lg text-sm">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-6">
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

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Send Reset Link
            </Button>

            <div className="text-center">
              <Link href="/login" className="text-sm text-white/60 hover:text-white">
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
```

### 4. Create Update Password Page

#### 4.1 Create Update Password Page
Create `src/app/update-password/page.tsx`:

```typescript
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check if this is a valid password reset session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      }
    }
    checkSession()
  }, [])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage('Password updated successfully! Redirecting to login...')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
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
            <img
              src="/logo.svg"
              alt="Tyne Tees Damp Proofing"
              className="h-12 w-auto mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-white">Update Password</h1>
            <p className="text-white/60 mt-2">Set your new password</p>
          </div>

          {message && (
            <div className="mb-4 p-3 bg-green-500/20 text-green-300 rounded-lg text-sm">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-6">
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
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
```

### 5. Implement Authentication State Management

#### 5.1 Create Auth Context
Create `src/context/AuthContext.tsx`:

```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import type { Session } from '@supabase/supabase-js'

type AuthContextType = {
  session: Session | null
  user: any
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setIsLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ session, user, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

#### 5.2 Update Root Layout
Update `src/app/layout.tsx` to include AuthProvider:

```typescript
import { AuthProvider } from '@/context/AuthContext'

// ... existing imports

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

### 6. Protect Routes with Authentication

#### 6.1 Create Protected Route Wrapper
Create `src/components/ProtectedRoute.tsx`:

```typescript
'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !session) {
      router.push('/login')
    }
  }, [session, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}
```

#### 6.2 Update Dashboard Page
Update `src/app/page.tsx` to use ProtectedRoute:

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute'

// ... existing imports

export default function Dashboard() {
  // ... existing code

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {/* ... existing dashboard content */}
      </div>
    </ProtectedRoute>
  )
}
```

### 7. Add Logout Functionality

#### 7.1 Update User Menu in Layout
Update the user menu in `src/app/page.tsx` to include logout:

```typescript
import { useAuth } from '@/context/AuthContext'

// ... existing code

function UserMenu() {
  const { user, signOut } = useAuth()
  
  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <div className="p-4 border-t border-white/10">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-bold">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{user?.email}</p>
          <p className="text-xs text-white/50">Surveyor</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-white/50 hover:text-white transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
```

### 8. Update Environment Variables

Ensure `.env.local` has the required Supabase variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 9. Testing Plan

#### 9.1 Test Cases
1. **Login Flow**: Test email/password login with valid and invalid credentials
2. **Password Reset**: Test password reset email sending and password update
3. **Protected Routes**: Verify that unauthenticated users are redirected to login
4. **Session Persistence**: Test that session persists after page refresh
5. **Logout**: Verify logout functionality and redirect to login page

#### 9.2 Admin Testing
1. Create test user accounts in Supabase admin panel
2. Send email invites to test users
3. Verify users can set passwords and login successfully

### 10. Deployment Checklist

- [ ] Install all required dependencies
- [ ] Configure Supabase client with auth settings
- [ ] Create login, forgot-password, and update-password pages
- [ ] Implement AuthContext for session management
- [ ] Protect all routes with ProtectedRoute wrapper
- [ ] Add logout functionality to user menu
- [ ] Configure environment variables
- [ ] Test all authentication flows
- [ ] Verify admin user creation and email invite process

## Timeline

- **Day 1**: Setup infrastructure and create login pages
- **Day 2**: Implement authentication state management and route protection
- **Day 3**: Add logout functionality and test all flows
- **Day 4**: Admin testing and final adjustments
- **Day 5**: Deployment and monitoring

## Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Auth UI](https://supabase.com/docs/guides/auth/auth-ui)
- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [Project Design System](src/app/page.tsx)
- [Existing UI Components](src/components/ui/)