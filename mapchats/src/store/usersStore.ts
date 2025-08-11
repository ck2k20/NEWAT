import { create } from 'zustand'
import type { User } from '../types'
import { supabase } from '../lib/supabase'

interface UsersStore {
  // State
  activeUsers: User[]
  selectedUser: User | null
  isLoadingUsers: boolean
  
  // Actions
  setActiveUsers: (users: User[]) => void
  setSelectedUser: (user: User | null) => void
  fetchActiveUsers: () => Promise<void>
  subscribeToUsers: () => () => void
}

export const useUsersStore = create<UsersStore>((set, get) => ({
  // Initial state
  activeUsers: [],
  selectedUser: null,
  isLoadingUsers: false,

  // Set active users list
  setActiveUsers: (users: User[]) => {
    set({ activeUsers: users })
  },

  // Set selected user for profile popup
  setSelectedUser: (user: User | null) => {
    set({ selectedUser: user })
  },

  // Fetch active users from Supabase
  fetchActiveUsers: async () => {
    set({ isLoadingUsers: true })
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_online', true)
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)

      if (error) {
        console.error('Error fetching active users:', error)
      } else {
        set({ activeUsers: data as User[] })
      }
    } catch (error) {
      console.error('Error in fetchActiveUsers:', error)
    } finally {
      set({ isLoadingUsers: false })
    }
  },

  // Subscribe to realtime updates for active users
  subscribeToUsers: () => {
    const channel = supabase
      .channel('active-users')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: 'is_online=eq.true'
        },
        (payload) => {
          const currentUsers = get().activeUsers
          
          switch (payload.eventType) {
            case 'INSERT':
            case 'UPDATE': {
              const updatedUser = payload.new as User
              // Only include users with location data
              if (updatedUser.latitude && updatedUser.longitude && updatedUser.is_online) {
                const existingIndex = currentUsers.findIndex(u => u.id === updatedUser.id)
                if (existingIndex >= 0) {
                  // Update existing user
                  const newUsers = [...currentUsers]
                  newUsers[existingIndex] = updatedUser
                  set({ activeUsers: newUsers })
                } else {
                  // Add new user
                  set({ activeUsers: [...currentUsers, updatedUser] })
                }
              } else {
                // Remove user if they went offline or lost location
                set({ activeUsers: currentUsers.filter(u => u.id !== updatedUser.id) })
              }
              break
            }
              
            case 'DELETE': {
              const deletedUser = payload.old as User
              set({ activeUsers: currentUsers.filter(u => u.id !== deletedUser.id) })
              break
            }
          }
        }
      )
      .subscribe()

    // Return unsubscribe function
    return () => {
      supabase.removeChannel(channel)
    }
  }
}))