import { Marker, Tooltip } from 'react-leaflet'
import { Icon } from 'leaflet'
import UserTooltip from './UserTooltip'
import type { User } from '../types'

// Create custom user dot icon
const createUserDotIcon = (user: User) => {
  return new Icon({
    iconUrl: user.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
    className: `user-dot-icon ${user.is_premium ? 'premium' : ''}`
  })
}

interface UserDotProps {
  user: User
  onClick: (user: User) => void
}

/**
 * UserDot component renders a clickable marker on the map for each active user
 * Shows user's avatar as the marker icon with hover tooltip
 */
export default function UserDot({ user, onClick }: UserDotProps) {
  const handleClick = () => {
    onClick(user)
  }

  return (
    <Marker
      position={[user.latitude, user.longitude]}
      icon={createUserDotIcon(user)}
      eventHandlers={{
        click: handleClick
      }}
    >
      <Tooltip
        direction="top"
        offset={[0, -10]}
        permanent={false}
        className="user-profile-tooltip"
      >
        <UserTooltip user={user} />
      </Tooltip>
    </Marker>
  )
}