import { X, User as UserIcon, Calendar, Users } from 'lucide-react'
import type { User } from '../types'

interface ProfileCardProps {
  user: User
  onClose: () => void
}

/**
 * ProfileCard component displays a user's profile information in a popup
 * Shows avatar, username, bio, age, gender for quick preview
 */
export default function ProfileCard({ user, onClose }: ProfileCardProps) {

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-800 rounded-xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden border border-slate-700">
        {/* Header with close button */}
        <div className="relative p-6 pb-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Profile Picture */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src={user.avatar_url || '/api/placeholder/100/100'}
                alt={`${user.username}'s profile`}
                className="w-24 h-24 rounded-full border-4 border-slate-600 object-cover"
              />
              {user.is_online && (
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-slate-800 rounded-full"></div>
              )}
            </div>
          </div>
          
          {/* Username */}
          <h2 className="text-xl font-bold text-white text-center mb-1">
            {user.username}
          </h2>
          
          {/* Premium badge */}
          {user.is_premium && (
            <div className="flex justify-center mb-3">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
                Premium
              </span>
            </div>
          )}
        </div>

        {/* Profile Details */}
        <div className="px-6 py-4 space-y-3">
          {/* Bio */}
          {user.bio && (
            <div className="text-slate-300 text-sm text-center bg-slate-900 rounded-lg p-3">
              "{user.bio}"
            </div>
          )}
          
          {/* Age and Gender */}
          <div className="flex justify-center space-x-6 text-sm text-slate-400">
            {user.age && (
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{user.age} years old</span>
              </div>
            )}
            
            {user.gender && (
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span className="capitalize">{user.gender}</span>
              </div>
            )}
          </div>
          
          {/* Member since */}
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
            <UserIcon className="w-3 h-3" />
            <span>
              Member since {new Date(user.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Hint */}
        <div className="px-6 pb-6 text-center">
          <p className="text-slate-400 text-xs">
            Click user dot again to start chatting
          </p>
        </div>
      </div>
    </div>
  )
}