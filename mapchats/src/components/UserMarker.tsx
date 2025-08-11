import { Marker } from 'react-leaflet'
import { Icon } from 'leaflet'
import type { User } from '../types'

/**
 * Creates a custom icon for user markers on the map
 * Uses the user's avatar image with proper styling
 */
const createUserIcon = (user: User): Icon => {
  const iconHtml = `
    <div class="user-marker-container">
      <img 
        src="${user.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}"
        alt="${user.username}"
        class="user-marker-avatar ${user.is_premium ? 'premium' : ''}"
      />
      ${user.is_premium ? '<div class="premium-badge">★</div>' : ''}
      <div class="online-indicator"></div>
    </div>
  `
  
  return new Icon({
    iconUrl: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">${iconHtml}</div>
        </foreignObject>
      </svg>
    `)}`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    className: 'user-marker-icon'
  })
}

interface UserMarkerProps {
  user: User
  onClick: (user: User, event: L.LeafletMouseEvent) => void
}

/**
 * UserMarker component renders a clickable marker for each user on the map
 * Displays user avatar with premium badge and online indicator
 * Handles click events to show profile cards
 */
export default function UserMarker({ user, onClick }: UserMarkerProps) {
  const handleClick = (event: L.LeafletMouseEvent) => {
    onClick(user, event)
  }

  return (
    <Marker
      position={[user.latitude, user.longitude]}
      icon={createUserIcon(user)}
      eventHandlers={{
        click: handleClick
      }}
    />
  )
}