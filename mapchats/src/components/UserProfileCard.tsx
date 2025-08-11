import { X, MessageCircle, Calendar, Users, Crown } from 'lucide-react'
import type { User, UserDotClickPosition } from '../types'

interface UserProfileCardProps {
  user: User
  position: UserDotClickPosition
  onClose: () => void
  onStartChat: (user: User) => void
}

/**
 * UserProfileCard displays user information in a popup near the clicked marker
 * Features dark theme styling consistent with the app design
 * Includes a "Start Chat" button to initiate conversations
 */
export default function UserProfileCard({ 
  user, 
  position, 
  onClose, 
  onStartChat 
}: UserProfileCardProps) {
  
  const handleStartChat = () => {
    onStartChat(user)
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={handleBackdropClick}
      />
      
      {/* Profile Card */}
      <div 
        className="fixed z-50 bg-slate-800 rounded-lg shadow-2xl border border-slate-600 p-4 w-64"
        style={{
          left: Math.min(position.x - 128, window.innerWidth - 280), // Center card on click position
          top: Math.max(position.y - 200, 20), // Position above click, with margin
          transform: position.y > 250 ? 'translateY(-100%)' : 'translateY(20px)'
        }}
      >
        {/* Header with close button */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <img
                src={user.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face'}
                alt={user.username}
                className="w-12 h-12 rounded-full border-2 border-slate-600"
              />
              {user.is_online && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-800 rounded-full"></div>
              )}
            </div>
            <div>
              <h3 className="text-white font-semibold flex items-center space-x-2">
                <span>{user.username}</span>
                {user.is_premium && <Crown className="w-4 h-4 text-yellow-400" />}
              </h3>
              <p className="text-slate-400 text-sm">
                {user.is_online ? 'Online' : 'Last seen recently'}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Bio */}
        {user.bio && (
          <div className="mb-3">
            <p className="text-slate-300 text-sm leading-relaxed">
              "{user.bio}"
            </p>
          </div>
        )}

        {/* User Details */}
        <div className="space-y-2 mb-4">
          {(user.age || user.gender) && (
            <div className="flex items-center space-x-4 text-xs text-slate-400">
              {user.age && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{user.age} years old</span>
                </div>
              )}
              {user.gender && (
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span className="capitalize">{user.gender}</span>
                </div>
              )}
            </div>
          )}
          
          <div className="text-xs text-slate-500">
            Member since {new Date(user.created_at).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric'
            })}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStartChat}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Start Chat</span>
        </button>
      </div>
    </>
  )
}