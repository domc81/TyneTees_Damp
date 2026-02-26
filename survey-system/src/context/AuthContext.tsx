'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
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
  const supabase = createClient()

  const fetchProfile = useCallback(async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error || !data) return null
    return data as UserProfile
  }, [supabase])

  const handleSession = useCallback(async (newSession: Session | null) => {
    setSession(newSession)
    setUser(newSession?.user ?? null)

    if (!newSession?.user) {
      setProfile(null)
      setProfileError(null)
      setIsLoading(false)
      return
    }

    // Load user profile from user_profiles table
    const userProfile = await fetchProfile(newSession.user.id)

    if (!userProfile) {
      // No profile exists — sign them out
      setProfile(null)
      setProfileError('No user profile found. Contact your administrator.')
      await supabase.auth.signOut()
      setSession(null)
      setUser(null)
      setIsLoading(false)
      return
    }

    if (!userProfile.is_active) {
      // Profile exists but deactivated — sign them out
      setProfile(null)
      setProfileError('Your account has been deactivated. Contact your administrator.')
      await supabase.auth.signOut()
      setSession(null)
      setUser(null)
      setIsLoading(false)
      return
    }

    // Valid, active profile
    setProfile(userProfile)
    setProfileError(null)
    setIsLoading(false)
  }, [fetchProfile, supabase])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        await handleSession(session)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [handleSession])

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
