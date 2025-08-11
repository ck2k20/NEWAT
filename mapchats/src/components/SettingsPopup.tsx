import { X, Crown, LogOut, User, Edit } from 'lucide-react'

interface SettingsPopupProps {
  isOpen: boolean
  onClose: () => void
  onSignOut: () => void
  onUpgradePremium?: () => void
  onEditProfile?: () => void
  isPremium?: boolean
  currentUser?: {
    id: string
    name: string
    email: string
    isMod: boolean
    isPremium: boolean
  } | null
}

export default function SettingsPopup({ 
  isOpen, 
  onClose, 
  onSignOut,
  onUpgradePremium,
  onEditProfile,
  isPremium = false,
  currentUser
}: SettingsPopupProps) {

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    }}>
      <div style={{
        width: '320px',
        maxWidth: '90vw',
        backgroundColor: 'rgba(6, 12, 24, 0.98)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0, 0, 0, 0.3)'
        }}>
          <div>
            <h2 style={{
              margin: 0,
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: '18px',
              fontWeight: '600',
              letterSpacing: '0.01em'
            }}>
              Settings
            </h2>
            {currentUser && (
              <p style={{
                margin: '4px 0 0 0',
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '11px',
                fontWeight: '400'
              }}>
                {currentUser.isMod ? '🔧 ' : ''}{currentUser.name}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Settings Options */}
        <div style={{ padding: '20px' }}>
          
          {/* User Status */}
          {currentUser?.isMod ? (
            <div style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              borderRadius: '8px',
              color: '#a855f7',
              fontSize: '13px',
              fontWeight: '500',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              🔧 Moderator Account
            </div>
          ) : !isPremium ? (
            <button
              onClick={onUpgradePremium}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: 'rgba(251, 191, 36, 0.15)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '8px',
                color: '#fbbf24',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(251, 191, 36, 0.2)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(251, 191, 36, 0.15)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Crown size={18} />
              Upgrade to Premium
            </button>
          ) : (
            <div style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              borderRadius: '8px',
              color: '#fbbf24',
              fontSize: '13px',
              fontWeight: '500',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <Crown size={16} />
              Premium Active
            </div>
          )}

          {/* Settings Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            {/* Edit Profile */}
            <button
              onClick={onEditProfile}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '8px',
                color: 'rgba(59, 130, 246, 0.9)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.15)'
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.color = 'rgba(59, 130, 246, 1)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.color = 'rgba(59, 130, 246, 0.9)'
              }}
            >
              <Edit size={18} />
              Edit Profile
            </button>

            {/* Upgrade to Premium (only show if not premium and not mod) */}
            {!isPremium && !currentUser?.isMod && (
              <button
                onClick={onUpgradePremium}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: 'rgba(251, 191, 36, 0.15)',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  borderRadius: '8px',
                  color: '#fbbf24',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(251, 191, 36, 0.2)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(251, 191, 36, 0.15)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <Crown size={18} />
                Upgrade to Premium
              </button>
            )}

            {/* Divider */}
            <div style={{
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              margin: '8px 0'
            }} />

            {/* Sign Out */}
            <button
              onClick={onSignOut}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: 'transparent',
                border: '1px solid rgba(248, 113, 113, 0.3)',
                borderRadius: '8px',
                color: 'rgba(248, 113, 113, 0.9)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(248, 113, 113, 0.1)'
                e.currentTarget.style.color = 'rgba(248, 113, 113, 1)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'rgba(248, 113, 113, 0.9)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}