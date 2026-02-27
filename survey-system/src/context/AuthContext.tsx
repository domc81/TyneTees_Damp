'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { createClient } from '@/lib/supabase-client'
import type { Session, User } from '@supabase/supabase-js'
import type { UserProfile, UserRole } from '@/types/database.types'

type AuthContextType = {
  session: Session | null
  user: User | null
  profile: UserProfile | null
  role: UserRole | null
  isAdmin: boolean
  isOffice: boolean
  isSurveyor: boolean
  mustChangePassword: boolean
  isLoading: boolean
  profileError: string | null
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AUTH_TIMEOUT_MS = 8000
const PROFILE_FETCH_TIMEOUT_MS = 5000

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [profileError, setProfileError] = useState<string | null>(null)
  const initializedRef = useRef(false)
  const supabase = createClient()

  const fetchProfile = useCallback(async (userId: string): Promise<UserProfile | null> => {
    console.log('[Auth] Fetching profile for user:', userId)
    try {
      const profileQuery = supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      const timeoutPromise = new Promise<null>((resolve) => {
        setTimeout(() => {
          console.error('[Auth] Profile fetch timed out after', PROFILE_FETCH_TIMEOUT_MS, 'ms')
          resolve(null)
        }, PROFILE_FETCH_TIMEOUT_MS)
      })

      const result = await Promise.race([profileQuery, timeoutPromise])

      // Timeout resolved with null
      if (!result) return null

      // Query resolved — extract data/error
      const { data, error } = result as { data: UserProfile | null; error: { message: string } | null }

      if (error) {
        console.error('[Auth] Profile fetch error:', error.message)
        return null
      }
      if (!data) {
        console.warn('[Auth] Profile fetch returned no data')
        return null
      }
      console.log('[Auth] Profile loaded:', data.role, 'active:', data.is_active)
      return data
    } catch (err: unknown) {
      console.error('[Auth] Profile fetch unexpected error:', err)
      return null
    }
  }, [supabase])

  const handleSession = useCallback(async (newSession: Session | null) => {
    console.log('[Auth] handleSession called, has session:', !!newSession, 'user:', newSession?.user?.email)
    setSession(newSession)
    setUser(newSession?.user ?? null)

    if (!newSession?.user) {
      console.log('[Auth] No session/user — clearing state, finishing load')
      setProfile(null)
      setProfileError(null)
      setIsLoading(false)
      return
    }

    const userProfile = await fetchProfile(newSession.user.id)

    if (!userProfile) {
      console.warn('[Auth] No profile found or fetch failed — allowing login without profile')
      setProfile(null)
      setProfileError(null)
      setIsLoading(false)
      return
    }

    if (!userProfile.is_active) {
      console.warn('[Auth] Profile is deactivated — signing out')
      setProfile(null)
      setProfileError('Your account has been deactivated. Contact your administrator.')
      await supabase.auth.signOut()
      setSession(null)
      setUser(null)
      setIsLoading(false)
      return
    }

    console.log('[Auth] Valid active profile loaded, role:', userProfile.role)
    setProfile(userProfile)
    setProfileError(null)
    setIsLoading(false)
  }, [fetchProfile, supabase])

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    console.log('[Auth] Initializing auth...')

    // Safety timeout — if auth hasn't resolved in 8s, stop loading
    const safetyTimeout = setTimeout(() => {
      console.error('[Auth] Safety timeout reached after', AUTH_TIMEOUT_MS, 'ms — forcing isLoading=false')
      setIsLoading(false)
    }, AUTH_TIMEOUT_MS)

    // Listen for auth state changes (fires INITIAL_SESSION on subscribe)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[Auth] onAuthStateChange event:', event)
        clearTimeout(safetyTimeout)
        await handleSession(session)
      }
    )

    // Fallback: explicitly get session in case onAuthStateChange doesn't fire
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('[Auth] getSession error:', error.message)
        clearTimeout(safetyTimeout)
        setIsLoading(false)
        return
      }
      console.log('[Auth] getSession result: has session =', !!session)
      // Only use this if onAuthStateChange hasn't already handled it
      // (onAuthStateChange fires first in most cases, this is a safety net)
    })

    return () => {
      clearTimeout(safetyTimeout)
      subscription.unsubscribe()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
    setProfile(null)
    setProfileError(null)
  }

  const refreshProfile = async () => {
    if (!user) return
    const userProfile = await fetchProfile(user.id)
    if (userProfile && userProfile.is_active) {
      setProfile(userProfile)
    }
  }

  const role = profile?.role ?? null

  return (
    <AuthContext.Provider value={{
      session,
      user,
      profile,
      role,
      isAdmin: role === 'admin',
      isOffice: role === 'office',
      isSurveyor: role === 'surveyor',
      mustChangePassword: profile?.must_change_password ?? false,
      isLoading,
      profileError,
      signOut,
      refreshProfile,
    }}>
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
