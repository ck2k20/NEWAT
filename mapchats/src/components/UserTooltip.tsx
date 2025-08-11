import { MessageCircle, Crown, Calendar, Users } from 'lucide-react'
import type { User } from '../types'

interface UserTooltipProps {
  user: User
}

/**
 * UserTooltip component shows a compact profile card on hover
 * Optimized for quick preview without overwhelming the map interface
 */
export default function UserTooltip({ user }: UserTooltipProps) {
  return (
    <div className="p-3 w-64 bg-slate-800 rounded-lg shadow-xl border border-slate-600">
      {/* Header with avatar and name */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="relative">
          <img
            src={user.avatar_url || '/api/placeholder/40/40'}
            alt={user.username}
            className="w-12 h-12 rounded-full border-2 border-slate-600 object-cover"
          />
          {user.is_online && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-800 rounded-full"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="text-white font-semibold text-sm truncate">
              {user.username}
            </h3>
            {user.is_premium && (
              <Crown className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            )}
          </div>
          
          {/* Quick stats */}
          <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
            {user.age && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{user.age}</span>
              </div>
            )}
            
            {user.gender && (
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span className="capitalize">{user.gender}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      {user.bio && (
        <p className="text-slate-300 text-xs mb-3 line-clamp-2 leading-relaxed">
          {user.bio}
        </p>
      )}

      {/* Action button */}
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-2 text-blue-400 text-xs font-medium bg-slate-700 px-3 py-2 rounded-full">
          <MessageCircle className="w-3 h-3" />
          <span>Click to chat</span>
        </div>
      </div>
    </div>
  )
}