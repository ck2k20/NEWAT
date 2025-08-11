import { create } from 'zustand'
import type { Chat, Message } from '../types'

interface ChatStore {
  // State
  activeChats: Chat[]
  selectedChat: Chat | null
  messages: Record<string, Message[]>
  isTyping: Record<string, boolean>
  unreadCount: Record<string, number>
  
  // Actions
  setActiveChats: (chats: Chat[]) => void
  setSelectedChat: (chat: Chat | null) => void
  addMessage: (chatId: string, message: Message) => void
  markAsRead: (chatId: string) => void
  deleteChat: (chatId: string) => void
  blockUser: (userId: string) => void
  setTyping: (chatId: string, isTyping: boolean) => void
  createChat: (participantId: string) => Chat
}

/**
 * Chat store manages all chat-related state including active chats,
 * messages, typing indicators, and unread counts
 */
export const useChatStore = create<ChatStore>((set, get) => ({
  // Initial state with mock data for testing
  activeChats: [],
  selectedChat: null,
  messages: mockMessages,
  isTyping: {},
  unreadCount: {},

  // Set list of active chats
  setActiveChats: (chats: Chat[]) => {
    set({ activeChats: chats })
  },

  // Set currently selected/open chat
  setSelectedChat: (chat: Chat | null) => {
    if (chat) {
      // Mark as read when selecting a chat
      get().markAsRead(chat.id)
    }
    set({ selectedChat: chat })
  },

  // Add new message to a chat
  addMessage: (chatId: string, message: Message) => {
    const currentMessages = get().messages
    const chatMessages = currentMessages[chatId] || []
    
    set({
      messages: {
        ...currentMessages,
        [chatId]: [...chatMessages, message]
      }
    })
    
    // Increment unread count if chat is not selected
    const selectedChat = get().selectedChat
    if (!selectedChat || selectedChat.id !== chatId) {
      const currentUnread = get().unreadCount
      set({
        unreadCount: {
          ...currentUnread,
          [chatId]: (currentUnread[chatId] || 0) + 1
        }
      })
    }
  },

  // Mark chat as read (clear unread count)
  markAsRead: (chatId: string) => {
    const currentUnread = get().unreadCount
    set({
      unreadCount: {
        ...currentUnread,
        [chatId]: 0
      }
    })
  },

  // Delete a chat and its messages
  deleteChat: (chatId: string) => {
    const currentChats = get().activeChats
    const currentMessages = get().messages
    const currentUnread = get().unreadCount
    const currentTyping = get().isTyping
    const selectedChat = get().selectedChat
    
    // Remove from active chats
    const updatedChats = currentChats.filter(chat => chat.id !== chatId)
    
    // Remove messages and other data for this chat
    const remainingMessages = Object.fromEntries(
      Object.entries(currentMessages).filter(([key]) => key !== chatId)
    )
    const remainingUnread = Object.fromEntries(
      Object.entries(currentUnread).filter(([key]) => key !== chatId)
    )
    const remainingTyping = Object.fromEntries(
      Object.entries(currentTyping).filter(([key]) => key !== chatId)
    )
    
    set({
      activeChats: updatedChats,
      messages: remainingMessages,
      unreadCount: remainingUnread,
      isTyping: remainingTyping,
      selectedChat: selectedChat?.id === chatId ? null : selectedChat
    })
  },

  // Block a user (remove all chats with them)
  blockUser: (userId: string) => {
    const currentChats = get().activeChats
    const chatIdsToDelete = currentChats
      .filter(chat => chat.participants.includes(userId))
      .map(chat => chat.id)
    
    // Delete all chats with this user
    chatIdsToDelete.forEach(chatId => {
      get().deleteChat(chatId)
    })
  },

  // Set typing indicator for a chat
  setTyping: (chatId: string, isTyping: boolean) => {
    const currentTyping = get().isTyping
    set({
      isTyping: {
        ...currentTyping,
        [chatId]: isTyping
      }
    })
  },

  // Create a new chat with a user
  createChat: (participantId: string) => {
    const newChat: Chat = {
      id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      participants: ['current_user_id', participantId], // TODO: Get actual current user ID
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    const currentChats = get().activeChats
    set({
      activeChats: [...currentChats, newChat]
    })
    
    return newChat
  }
}))

// Mock messages for testing
export const mockMessages: Record<string, Message[]> = {
  'test_chat_1': [
    {
      id: 'msg_1',
      chat_id: 'test_chat_1',
      sender_id: 'user_1',
      content: 'Hey! How are you doing?',
      type: 'text',
      created_at: new Date(Date.now() - 300000).toISOString()
    },
    {
      id: 'msg_2',
      chat_id: 'test_chat_1',
      sender_id: 'current_user_id',
      content: 'I\'m good! Just exploring the city. How about you?',
      type: 'text',
      created_at: new Date(Date.now() - 240000).toISOString()
    },
    {
      id: 'msg_3',
      chat_id: 'test_chat_1',
      sender_id: 'user_1',
      content: 'Same here! Want to grab coffee sometime?',
      type: 'text',
      created_at: new Date(Date.now() - 180000).toISOString()
    },
    {
      id: 'msg_4',
      chat_id: 'test_chat_1',
      sender_id: 'current_user_id',
      content: 'That sounds great! ☕',
      type: 'text',
      created_at: new Date(Date.now() - 60000).toISOString()
    }
  ]
}