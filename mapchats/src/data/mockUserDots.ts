export interface User {
  id: string
  name: string
  avatar: string
  latitude: number
  longitude: number
  isOnline: boolean
  age: number
  bio: string
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex NYC',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexNYC&backgroundColor=b6e3f4',
    latitude: 40.7589,
    longitude: -73.9851,
    isOnline: true,
    age: 28,
    bio: 'Love exploring the city and meeting new people! ✨'
  },
  {
    id: '2', 
    name: 'Sarah Brooklyn',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahBrooklyn&backgroundColor=fecaca',
    latitude: 40.6782,
    longitude: -73.9442,
    isOnline: true,
    age: 24,
    bio: 'Artist and coffee enthusiast ☕🎨'
  },
  {
    id: '3',
    name: 'Mike Manhattan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MikeManhattan&backgroundColor=d1fae5',
    latitude: 40.7505,
    longitude: -73.9934,
    isOnline: false,
    age: 32,
    bio: 'Tech entrepreneur, always looking for the next big thing'
  },
  {
    id: '4',
    name: 'Emma Queens',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaQueens&backgroundColor=fde68a',
    latitude: 40.7282,
    longitude: -73.7949,
    isOnline: true,
    age: 26,
    bio: 'Foodie exploring NYC one restaurant at a time 🍕'
  },
  {
    id: '5',
    name: 'David Bronx',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidBronx&backgroundColor=ddd6fe',
    latitude: 40.8448,
    longitude: -73.8648,
    isOnline: true,
    age: 29,
    bio: 'Musician and photographer 📸🎵'
  },
  {
    id: '6',
    name: 'Lisa Staten',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LisaStaten&backgroundColor=fed7d7',
    latitude: 40.5795,
    longitude: -74.1502,
    isOnline: false,
    age: 31,
    bio: 'Nature lover escaping to the parks whenever possible 🌳'
  }
]