import { Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet'

interface User {
  id: string
  name: string
  avatar: string
  latitude: number
  longitude: number
  isOnline: boolean
  age: number
  bio: string
}

interface UserDotsProps {
  users: User[]
  onUserClick: (user: User) => void
}

// Create custom user dot icons
const createUserIcon = (avatar: string, isOnline: boolean) => {
  return L.divIcon({
    html: `
      <div style="
        position: relative;
        width: 40px;
        height: 40px;
        cursor: pointer;
      ">
        <img 
          src="${avatar}" 
          style="
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 3px solid ${isOnline ? '#10b981' : '#6b7280'};
            object-fit: cover;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          "
        />
        ${isOnline ? `
          <div style="
            position: absolute;
            bottom: 2px;
            right: 2px;
            width: 12px;
            height: 12px;
            background-color: #10b981;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          "></div>
        ` : ''}
      </div>
    `,
    className: 'user-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  })
}

export default function UserDots({ users, onUserClick }: UserDotsProps) {
  return (
    <>
      {users.map((user) => (
        <Marker
          key={user.id}
          position={[user.latitude, user.longitude]}
          icon={createUserIcon(user.avatar, user.isOnline)}
          eventHandlers={{
            click: () => onUserClick(user)
          }}
        >
          <Tooltip 
            direction="top" 
            offset={[0, -10]}
            opacity={1}
            permanent={false}
          >
            <div style={{
              padding: '12px',
              minWidth: '200px',
              maxWidth: '240px',
              textAlign: 'center',
              background: 'rgba(6, 12, 24, 0.98)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              color: 'rgba(255, 255, 255, 0.95)',
              fontFamily: 'system-ui',
              boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.02)'
            }}>
              {/* Avatar */}
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '8px' }}>
                <img 
                  src={user.avatar}
                  alt={user.name}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid rgba(255, 255, 255, 0.1)'
                  }}
                />
                {user.isOnline && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0px',
                    right: '0px',
                    width: '14px',
                    height: '14px',
                    backgroundColor: '#10b981',
                    borderRadius: '50%',
                    border: '2px solid rgba(6, 12, 24, 0.98)'
                  }} />
                )}
              </div>

              {/* Name */}
              <h3 style={{
                margin: '0 0 6px 0',
                fontSize: '15px',
                fontWeight: '500',
                color: 'rgba(255, 255, 255, 0.95)',
                letterSpacing: '0.01em'
              }}>
                {user.name}
              </h3>

              {/* Status badges */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '4px',
                marginBottom: '8px',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  padding: '2px 6px',
                  borderRadius: '6px',
                  fontSize: '9px',
                  fontWeight: '500',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  {user.age}
                </div>
                <div style={{
                  padding: '2px 6px',
                  borderRadius: '6px',
                  fontSize: '9px',
                  fontWeight: '500',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  Male
                </div>
                <div style={{
                  padding: '2px 6px',
                  borderRadius: '6px',
                  fontSize: '9px',
                  fontWeight: '500',
                  background: user.isOnline 
                    ? 'rgba(16, 185, 129, 0.2)' 
                    : 'rgba(255, 255, 255, 0.08)',
                  color: user.isOnline ? '#6ee7b7' : 'rgba(255, 255, 255, 0.6)'
                }}>
                  {user.isOnline ? 'Online' : 'Offline'}
                </div>
                <div style={{
                  padding: '2px 6px',
                  borderRadius: '6px',
                  fontSize: '9px',
                  fontWeight: '500',
                  background: 'rgba(251, 191, 36, 0.15)',
                  color: '#fbbf24'
                }}>
                  ✨
                </div>
              </div>

              {/* Bio */}
              <p style={{
                margin: '0',
                fontSize: '11px',
                fontStyle: 'italic',
                color: 'rgba(255, 255, 255, 0.5)',
                lineHeight: '1.3',
                fontWeight: '400'
              }}>
                "{user.bio}"
              </p>
            </div>
          </Tooltip>
        </Marker>
      ))}
    </>
  )
}