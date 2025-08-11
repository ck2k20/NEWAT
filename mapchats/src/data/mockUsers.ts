import type { User } from '../types'

/**
 * Mock user data for testing user dots on the map
 * Distributed across NYC with realistic profiles
 */
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'alex_nyc',
    email: 'alex@example.com',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    bio: 'Love exploring the city and meeting new people! ✨',
    age: 28,
    gender: 'male',
    latitude: 40.7589,
    longitude: -73.9851, // Times Square area
    is_online: true,
    last_seen: new Date().toISOString(),
    created_at: '2023-06-15T10:30:00Z',
    is_premium: false
  },
  {
    id: '2',
    username: 'sarah_creative',
    email: 'sarah@example.com',
    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c8?w=100&h=100&fit=crop&crop=face',
    bio: 'Artist and coffee enthusiast. Always up for deep conversations ☕',
    age: 25,
    gender: 'female',
    latitude: 40.7505,
    longitude: -73.9934, // SoHo area
    is_online: true,
    last_seen: new Date().toISOString(),
    created_at: '2023-08-22T14:20:00Z',
    is_premium: true
  },
  {
    id: '3',
    username: 'mike_tech',
    email: 'mike@example.com',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    bio: 'Software developer by day, foodie by night 🍕',
    age: 32,
    gender: 'male',
    latitude: 40.7282,
    longitude: -74.0776, // Financial District
    is_online: true,
    last_seen: new Date().toISOString(),
    created_at: '2023-04-10T09:15:00Z',
    is_premium: false
  },
  {
    id: '4',
    username: 'emma_wanderer',
    email: 'emma@example.com',
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    bio: 'Travel blogger exploring NYC neighborhoods 🗽',
    age: 29,
    gender: 'female',
    latitude: 40.7614,
    longitude: -73.9776, // Central Park area
    is_online: true,
    last_seen: new Date().toISOString(),
    created_at: '2023-07-03T16:45:00Z',
    is_premium: true
  },
  {
    id: '5',
    username: 'david_music',
    email: 'david@example.com',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    bio: 'Musician and producer. Let\'s jam! 🎵',
    age: 26,
    gender: 'male',
    latitude: 40.7282,
    longitude: -73.9942, // Greenwich Village
    is_online: true,
    last_seen: new Date().toISOString(),
    created_at: '2023-05-18T11:30:00Z',
    is_premium: false
  },
  {
    id: '6',
    username: 'luna_fitness',
    email: 'luna@example.com',
    avatar_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
    bio: 'Fitness instructor & wellness coach. Stay healthy! 💪',
    age: 24,
    gender: 'female',
    latitude: 40.7505,
    longitude: -73.9731, // East Village
    is_online: true,
    last_seen: new Date().toISOString(),
    created_at: '2023-09-05T08:20:00Z',
    is_premium: true
  }
]

/**
 * Simulates fetching active users from Supabase
 * Returns a promise to mimic async behavior
 */
export const fetchActiveUsers = async (): Promise<User[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Return only online users with location data
  return mockUsers.filter(user => user.is_online && user.latitude && user.longitude)
}

/**
 * Simulates Supabase realtime subscription for user updates
 * Returns mock subscription object with unsubscribe function
 */
export const subscribeToUserUpdates = (callback: (users: User[]) => void) => {
  // Initially call with current data
  callback(mockUsers.filter(user => user.is_online && user.latitude && user.longitude))
  
  // Simulate periodic updates (user going online/offline)
  const interval = setInterval(() => {
    // Randomly update user online status for demo
    const updatedUsers = mockUsers.map(user => ({
      ...user,
      is_online: Math.random() > 0.1, // 90% chance to be online
      last_seen: new Date().toISOString()
    }))
    
    callback(updatedUsers.filter(user => user.is_online && user.latitude && user.longitude))
  }, 10000) // Update every 10 seconds
  
  // Return unsubscribe function
  return {
    unsubscribe: () => clearInterval(interval)
  }
}