import { create } from 'zustand'
import type { AuthState, User } from '../types'
import { supabase } from '../lib/supabase'

interface AuthStore extends AuthState {
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  setUser: (user: User | null) => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    if (data.user) {
      await get().checkAuth()
    }
  },

  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
    if (data.user) {
      await get().checkAuth()
    }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    set({ user: null, isAuthenticated: false })
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user, isLoading: false })
  },

  checkAuth: async () => {
    try {
      // For demo purposes, simulate auth check without real Supabase connection
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Set as unauthenticated for demo - user can still see the map
      set({ user: null, isAuthenticated: false, isLoading: false })
    } catch (error) {
      console.error('Auth check failed:', error)
      set({ user: null, isAuthenticated: false, isLoading: false })
    }
  },
}))