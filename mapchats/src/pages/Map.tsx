import { Settings, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useMapStore } from '../store/mapStore'
// import { useChatStore } from '../store/chatStore' // Available for future use
import MapView from '../components/MapView'
import ChatPopup from '../components/ChatPopup'
import type { User } from '../types'

export default function Map() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const { center, zoom } = useMapStore()
  // Chat store available for future use
  // const chatStore = useChatStore()
  const [chatUser, setChatUser] = useState<User | null>(null)

  // Handle settings/auth button click
  const handleSettingsClick = () => {
    if (!isAuthenticated) {
      navigate('/auth')
    } else {
      // TODO: Open settings modal/page
      console.log('Open settings')
    }
  }

  // Handle active chats button click
  const handleChatsClick = () => {
    // TODO: Open chats dropdown
    console.log('Open active chats')
  }

  // Handle start chat with user - opens chat popup
  const handleStartChat = (user: User) => {
    setChatUser(user)
  }

  // Handle close chat popup
  const handleCloseChatPopup = () => {
    setChatUser(null)
  }

  return (
    <div className="relative h-screen w-screen bg-slate-950">
      {/* Interactive Map with User Dots */}
      <div className="absolute inset-0">
        <MapView 
          center={center}
          zoom={zoom}
          onStartChat={handleStartChat}
        />
      </div>

      {/* Top Right - Auth/Settings Button */}
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={handleSettingsClick}
          className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full shadow-lg transition-colors"
          title={isAuthenticated ? 'Settings' : 'Sign In'}
        >
          <Settings className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Top Left - Active Chats */}
      {isAuthenticated && (
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={handleChatsClick}
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-full shadow-lg transition-colors"
            title="Active Chats"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </button>
        </div>
      )}

      {/* Chat Popup */}
      {chatUser && (
        <ChatPopup
          user={chatUser}
          onClose={handleCloseChatPopup}
        />
      )}

      {/* Welcome message overlay for unauthenticated users */}
      {!isAuthenticated && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20">
          <div className="text-center space-y-4 bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700">
            <h1 className="text-3xl font-bold text-white">Welcome to MapChats</h1>
            <p className="text-slate-300">Sign in to see active users and start chatting</p>
            <button
              onClick={handleSettingsClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
      )}
    </div>
  )
}