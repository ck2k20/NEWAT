export interface User {
  id: string
  username: string
  email: string
  avatar_url?: string
  bio?: string
  age?: number
  gender?: string
  latitude: number
  longitude: number
  is_online: boolean
  last_seen: string
  created_at: string
  is_premium: boolean
}

export interface Chat {
  id: string
  participants: string[]
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  chat_id: string
  sender_id: string
  content: string
  type: 'text' | 'voice' | 'emoji'
  created_at: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface ChatState {
  activeChats: Chat[]
  selectedChat: Chat | null
  messages: Record<string, Message[]>
}

export interface MapState {
  center: [number, number]
  zoom: number
  selectedUser: User | null
}

export interface UserDotClickPosition {
  x: number
  y: number
}

export interface ProfileCardState {
  user: User | null
  position?: UserDotClickPosition
  isVisible: boolean
}