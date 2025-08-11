import { MapContainer, TileLayer } from 'react-leaflet'
import { useState, useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import '../lib/leafletConfig' // Fix leaflet icons
import { fetchActiveUsers, subscribeToUserUpdates } from '../data/mockUsers'
import UserMarker from './UserMarker'
import UserProfileCard from './UserProfileCard'
import type { User, UserDotClickPosition } from '../types'

interface MapViewProps {
  center: [number, number]
  zoom: number
  onMapClick?: (lat: number, lng: number) => void
  onStartChat?: (user: User) => void
}

/**
 * MapView component renders the interactive Leaflet map with user markers
 * Features real-time user updates and profile card popups
 * Integrates with mock data source (can be replaced with Supabase later)
 */
export default function MapView({ center, zoom, onStartChat }: MapViewProps) {
  const [activeUsers, setActiveUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [clickPosition, setClickPosition] = useState<UserDotClickPosition | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch initial users and set up real-time subscription
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true)
        const users = await fetchActiveUsers()
        setActiveUsers(users)
      } catch (error) {
        console.error('Failed to load users:', error)
      } finally {
        setIsLoading(false)
      }
    }

    // Load initial data
    loadUsers()

    // Set up real-time subscription
    const subscription = subscribeToUserUpdates((users) => {
      setActiveUsers(users)
    })

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Handle user marker click - show profile card
  const handleUserClick = (user: User, event: L.LeafletMouseEvent) => {
    const clickPos = {
      x: event.containerPoint.x,
      y: event.containerPoint.y
    }
    
    setSelectedUser(user)
    setClickPosition(clickPos)
  }

  // Handle profile card close
  const handleProfileClose = () => {
    setSelectedUser(null)
    setClickPosition(null)
  }

  // Handle start chat action
  const handleStartChat = (user: User) => {
    if (onStartChat) {
      onStartChat(user)
    }
  }

  return (
    <>
      <MapContainer
        center={center}
        zoom={zoom}
        minZoom={8}
        maxZoom={18}
        className="w-full h-full dark-map"
        zoomControl={false}
        attributionControl={true}
        maxBounds={[
          [40.4774, -74.2591], // Southwest bounds (NYC area)
          [40.9176, -73.7004]  // Northeast bounds (NYC area)
        ]}
        maxBoundsViscosity={0.7}
      >
        {/* Dark theme tile layer */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
        />
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900 bg-opacity-50 z-10">
            <div className="text-white text-sm">Loading users...</div>
          </div>
        )}
        
        {/* Render user markers for all active users */}
        {activeUsers.map((user) => (
          <UserMarker
            key={user.id}
            user={user}
            onClick={handleUserClick}
          />
        ))}
      </MapContainer>

      {/* Profile card popup */}
      {selectedUser && clickPosition && (
        <UserProfileCard
          user={selectedUser}
          position={clickPosition}
          onClose={handleProfileClose}
          onStartChat={handleStartChat}
        />
      )}
    </>
  )
}