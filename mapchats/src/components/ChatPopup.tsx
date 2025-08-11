import { useState, useRef, useEffect } from 'react'
import { 
  X, 
  Send, 
  Smile, 
  Mic, 
  Phone, 
  Video, 
  MoreVertical,
  Trash2,
  UserX
} from 'lucide-react'
import { useChatStore } from '../store/chatStore'
import type { User, Message } from '../types'

interface ChatPopupProps {
  user: User
  onClose: () => void
}

/**
 * ChatPopup component provides a complete chat interface including:
 * - Message history with timestamps
 * - Text input with emoji support
 * - Voice/video call buttons
 * - Chat controls (delete, block)
 */
export default function ChatPopup({ user, onClose }: ChatPopupProps) {
  const [messageText, setMessageText] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const {
    selectedChat,
    messages,
    addMessage,
    deleteChat,
    blockUser,
    createChat,
    setSelectedChat
  } = useChatStore()

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, selectedChat])

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Get or create chat for this user
  useEffect(() => {
    if (!selectedChat) {
      const newChat = createChat(user.id)
      setSelectedChat(newChat)
    }
  }, [selectedChat, user.id, createChat, setSelectedChat])

  // Get messages for current chat
  const chatMessages = selectedChat ? (messages[selectedChat.id] || []) : []

  // Send a text message
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedChat) return

    const newMessage: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      chat_id: selectedChat.id,
      sender_id: 'current_user_id', // TODO: Get actual current user ID
      content: messageText.trim(),
      type: 'text',
      created_at: new Date().toISOString()
    }

    addMessage(selectedChat.id, newMessage)
    setMessageText('')
  }

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle emoji insertion (simplified)
  const handleEmojiSelect = (emoji: string) => {
    setMessageText(prev => prev + emoji)
    setShowEmojiPicker(false)
    inputRef.current?.focus()
  }

  // Handle delete chat
  const handleDeleteChat = () => {
    if (selectedChat) {
      deleteChat(selectedChat.id)
      onClose()
    }
  }

  // Handle block user
  const handleBlockUser = () => {
    blockUser(user.id)
    onClose()
  }

  // Common emojis for quick access
  const commonEmojis = ['😀', '😍', '😂', '❤️', '👍', '👎', '🔥', '🎉', '☕', '🍕']

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-slate-800 rounded-lg shadow-2xl border border-slate-700 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar_url || '/api/placeholder/32/32'}
            alt={user.username}
            className="w-8 h-8 rounded-full border border-slate-600"
          />
          <div>
            <h3 className="text-white font-medium text-sm">{user.username}</h3>
            {user.is_online && (
              <p className="text-green-400 text-xs">Online</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Voice Call Button */}
          <button
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
            title="Voice Call"
          >
            <Phone className="w-4 h-4" />
          </button>
          
          {/* Video Call Button */}
          <button
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
            title="Video Call"
          >
            <Video className="w-4 h-4" />
          </button>
          
          {/* Menu Button */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 bg-slate-700 rounded-md shadow-lg border border-slate-600 py-1 min-w-36">
                <button
                  onClick={handleDeleteChat}
                  className="w-full px-3 py-2 text-left text-red-400 hover:bg-slate-600 flex items-center space-x-2 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Chat</span>
                </button>
                <button
                  onClick={handleBlockUser}
                  className="w-full px-3 py-2 text-left text-red-400 hover:bg-slate-600 flex items-center space-x-2 text-sm"
                >
                  <UserX className="w-4 h-4" />
                  <span>Block User</span>
                </button>
              </div>
            )}
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600">
        {chatMessages.length === 0 ? (
          <div className="text-center text-slate-400 text-sm py-8">
            Start a conversation with {user.username}
          </div>
        ) : (
          chatMessages.map((message) => {
            const isOwn = message.sender_id === 'current_user_id'
            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    isOwn
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-200'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isOwn ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {formatTime(message.created_at)}
                  </p>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="mx-4 mb-2 p-2 bg-slate-700 rounded-lg border border-slate-600">
          <div className="grid grid-cols-5 gap-2">
            {commonEmojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmojiSelect(emoji)}
                className="text-lg hover:bg-slate-600 rounded p-1 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-2">
          {/* Emoji Button */}
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
          >
            <Smile className="w-4 h-4" />
          </button>
          
          {/* Text Input */}
          <input
            ref={inputRef}
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-slate-700 text-white placeholder-slate-400 px-3 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none text-sm"
          />
          
          {/* Voice Note Button */}
          <button
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
            title="Voice Note"
          >
            <Mic className="w-4 h-4" />
          </button>
          
          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  )
}