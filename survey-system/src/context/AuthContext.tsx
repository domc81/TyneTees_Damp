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
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

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

  // Effect 1: Auth state listener — synchronous state updates only, no REST calls.
  // This avoids deadlocking on Supabase's internal initializePromise.
  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    console.log('[Auth] Initializing auth...')

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, eventSession) => {
        console.log('[Auth] onAuthStateChange event:', event)
        setSession(eventSession)
        setUser(eventSession?.user ?? null)

        if (!eventSession?.user) {
          setProfile(null)
          setProfileError(null)
          setIsLoading(false)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Effect 2: Profile fetch — fires when user.id changes.
  // Runs in a separate React render cycle, well after auth initialization
  // has completed, so supabase.from().select() won't deadlock.
  useEffect(() => {
    if (!user) return

    let cancelled = false

    fetchProfile(user.id).then(async (userProfile) => {
      if (cancelled) return

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
    })

    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

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
      isSurveyor: profile?.is_surveyor === true,
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
