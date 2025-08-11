import type { User } from '../types'

/**
 * Mock users data for testing user dots on the map
 * Includes diverse profiles with realistic data spread across NYC area
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
  },
  {
    id: '7',
    username: 'carlos_chef',
    email: 'carlos@example.com',
    avatar_url: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face',
    bio: 'Chef passionate about fusion cuisine 👨‍🍳',
    age: 35,
    gender: 'male',
    latitude: 40.7829,
    longitude: -73.9654, // Upper West Side
    is_online: true,
    last_seen: new Date().toISOString(),
    created_at: '2023-03-12T13:10:00Z',
    is_premium: false
  },
  {
    id: '8',
    username: 'zoe_books',
    email: 'zoe@example.com',
    avatar_url: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
    bio: 'Book lover and part-time writer. Let\'s discuss literature! 📚',
    age: 27,
    gender: 'female',
    latitude: 40.7061,
    longitude: -74.0087, // Brooklyn Heights
    is_online: true,
    last_seen: new Date().toISOString(),
    created_at: '2023-08-01T15:25:00Z',
    is_premium: false
  },
  {
    id: '9',
    username: 'ryan_photo',
    email: 'ryan@example.com',
    avatar_url: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face',
    bio: 'Photographer capturing city moments 📸',
    age: 30,
    gender: 'male',
    latitude: 40.8176,
    longitude: -73.9782, // Harlem
    is_online: true,
    last_seen: new Date().toISOString(),
    created_at: '2023-06-28T12:40:00Z',
    is_premium: true
  },
  {
    id: '10',
    username: 'maya_yoga',
    email: 'maya@example.com',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    bio: 'Yoga instructor spreading zen vibes 🧘‍♀️',
    age: 31,
    gender: 'female',
    latitude: 40.7505,
    longitude: -73.9442, // Lower East Side
    is_online: true,
    last_seen: new Date().toISOString(),
    created_at: '2023-04-25T10:15:00Z',
    is_premium: true
  }
]

/**
 * Get random mock users for testing
 * @param count Number of users to return (default: all)
 * @returns Array of mock User objects
 */
export const getMockUsers = (count?: number): User[] => {
  if (!count) return mockUsers
  return mockUsers.slice(0, Math.min(count, mockUsers.length))
}