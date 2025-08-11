import { useState } from 'react'
import { X, Save, User, Hash, FileText, Users } from 'lucide-react'

interface EditProfilePopupProps {
  isOpen: boolean
  onClose: () => void
  onSave: (profileData: {
    username: string
    age: number
    gender: string
    bio: string
    avatar: string
  }) => void
  onUpgradePremium?: () => void
  onSignOut: () => void
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
  isPremium?: boolean
}

export default function EditProfilePopup({ 
  isOpen, 
  onClose, 
  onSave,
  onUpgradePremium,
  onSignOut,
  currentUser,
  isPremium = false
}: EditProfilePopupProps) {
  const [username, setUsername] = useState(currentUser?.name || '')
  const [age, setAge] = useState(currentUser?.age || 25)
  const [gender, setGender] = useState(currentUser?.gender || 'Male')
  const [bio, setBio] = useState(currentUser?.bio || 'Living life one chat at a time ✨')
  const [avatar, setAvatar] = useState(currentUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.name || 'user'}`)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      username: username.trim(),
      age,
      gender,
      bio: bio.trim(),
      avatar
    })
    onClose()
  }

  const generateNewAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7)
    setAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`)
  }

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
        width: '420px',
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
              fontSize: '20px',
              fontWeight: '600',
              letterSpacing: '0.01em'
            }}>
              Edit Profile
            </h2>
            <p style={{
              margin: '4px 0 0 0',
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '13px',
              fontWeight: '400'
            }}>
              Update your profile information
            </p>
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

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          
          {/* Avatar Section */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img 
                src={avatar}
                alt="Profile Avatar"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid rgba(59, 130, 246, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }}
              />
              {isPremium && (
                <div style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '20px',
                  height: '20px',
                  background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: 'white',
                  fontWeight: 'bold',
                  border: '2px solid rgba(6, 12, 24, 0.98)'
                }}>
                  ✨
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={generateNewAvatar}
              style={{
                marginTop: '12px',
                padding: '8px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
              }}
            >
              Generate New Avatar
            </button>
          </div>

          {/* Username Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '13px',
              fontWeight: '500',
              marginBottom: '8px'
            }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User 
                size={18} 
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.3)'
                }} 
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
                required
                maxLength={20}
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 48px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.15s ease',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <p style={{
              margin: '6px 0 0 0',
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '11px'
            }}>
              {username.length}/20 characters
            </p>
          </div>

          {/* Age and Gender Row */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            {/* Age Field */}
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '13px',
                fontWeight: '500',
                marginBottom: '8px'
              }}>
                Age
              </label>
              <div style={{ position: 'relative' }}>
                <Hash 
                  size={18} 
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255, 255, 255, 0.3)'
                  }} 
                />
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 18)}
                  min={18}
                  max={99}
                  style={{
                    width: '100%',
                    padding: '14px 14px 14px 48px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.15s ease',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Gender Field */}
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '13px',
                fontWeight: '500',
                marginBottom: '8px'
              }}>
                Gender
              </label>
              <div style={{ position: 'relative' }}>
                <Users 
                  size={18} 
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(255, 255, 255, 0.3)',
                    zIndex: 1,
                    pointerEvents: 'none'
                  }} 
                />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 14px 14px 48px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.15s ease',
                    boxSizing: 'border-box',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Male" style={{ backgroundColor: 'rgba(6, 12, 24, 0.98)', color: 'white' }}>Male</option>
                  <option value="Female" style={{ backgroundColor: 'rgba(6, 12, 24, 0.98)', color: 'white' }}>Female</option>
                  <option value="Non-binary" style={{ backgroundColor: 'rgba(6, 12, 24, 0.98)', color: 'white' }}>Non-binary</option>
                  <option value="Other" style={{ backgroundColor: 'rgba(6, 12, 24, 0.98)', color: 'white' }}>Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bio Field */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '13px',
              fontWeight: '500',
              marginBottom: '8px'
            }}>
              Bio
            </label>
            <div style={{ position: 'relative' }}>
              <FileText 
                size={18} 
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '14px',
                  color: 'rgba(255, 255, 255, 0.3)'
                }} 
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell others about yourself..."
                maxLength={150}
                rows={3}
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 48px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.15s ease',
                  boxSizing: 'border-box',
                  resize: 'none',
                  fontFamily: 'inherit',
                  lineHeight: '1.4'
                }}
              />
            </div>
            <p style={{
              margin: '6px 0 0 0',
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '11px'
            }}>
              {bio.length}/150 characters
            </p>
          </div>

          {/* Save Changes Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: 'rgba(59, 130, 246, 0.9)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 1)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.9)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <Save size={16} />
            Save Profile
          </button>

          {/* Divider */}
          <div style={{
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            margin: '16px 0'
          }} />

          {/* Additional Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* Upgrade to Premium (only show if not premium and not mod) */}
            {!isPremium && !currentUser?.isMod && onUpgradePremium && (
              <button
                type="button"
                onClick={onUpgradePremium}
                style={{
                  width: '100%',
                  padding: '14px',
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
                👑 Upgrade to Premium
              </button>
            )}

            {/* Sign Out */}
            <button
              type="button"
              onClick={onSignOut}
              style={{
                width: '100%',
                padding: '14px',
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
                gap: '8px'
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
              🚪 Sign Out
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}