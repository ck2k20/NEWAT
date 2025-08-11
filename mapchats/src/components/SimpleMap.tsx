import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import UserDots from './UserDots'
import { mockUsers, type User } from '../data/mockUserDots'

interface SimpleMapProps {
  center?: [number, number]
  zoom?: number
  onUserClick?: (user: User) => void
  currentUser?: {
    id: string
    name: string
    email: string
    isMod: boolean
    isPremium: boolean
    avatar?: string
    age?: number
    gender?: string
    bio?: string
  } | null
}

export default function SimpleMap({ 
  center = [40.7589, -73.9851], // NYC coordinates
  zoom = 12,
  onUserClick,
  currentUser
}: SimpleMapProps) {
  console.log('SimpleMap rendering...')
  
  // Create users array including current user if signed in
  const allUsers = [...mockUsers]
  if (currentUser && currentUser.avatar) {
    // Add current user as a dot (positioned slightly offset from center for demo)
    const currentUserDot: User = {
      id: currentUser.id,
      name: currentUser.name,
      avatar: currentUser.avatar,
      latitude: center[0] + 0.005, // Slightly offset from center
      longitude: center[1] + 0.005,
      isOnline: true,
      age: currentUser.age || 25,
      bio: currentUser.bio || 'MapChats User'
    }
    allUsers.unshift(currentUserDot) // Add at beginning so it renders on top
    console.log('🗺️ CURRENT USER DOT ADDED:', currentUserDot.avatar)
  }
  
  // Tighter world bounds to prevent dragging into empty space
  const worldBounds = L.latLngBounds(
    L.latLng(-80, -170), // Southwest - tighter limits
    L.latLng(80, 170)    // Northeast - tighter limits
  )
  
  try {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1
      }}>
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ 
            height: '100vh', 
            width: '100%',
            backgroundColor: '#0f172a'
          }}
          zoomControl={true}
          scrollWheelZoom={true}
          minZoom={3}
          maxZoom={18}
          maxBounds={worldBounds}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
            maxZoom={19}
          />
          
          {/* User Dots */}
          <UserDots 
            users={allUsers}
            onUserClick={onUserClick || (() => {})}
          />
        </MapContainer>
        
      </div>
    )
  } catch (error) {
    console.error('SimpleMap error:', error)
    return (
      <div style={{
        height: '100vh',
        width: '100%',
        backgroundColor: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '20px'
        }}>
          <h2>Map Loading Error</h2>
          <p>Could not load the map component.</p>
          <pre style={{ fontSize: '12px', opacity: 0.7 }}>
            {error?.toString()}
          </pre>
        </div>
      </div>
    )
  }
}