import { useState } from 'react'
import SimpleMap from './components/SimpleMap'
import ChatPopupUI from './components/ChatPopupUI'
import ActiveChatsPopup from './components/ActiveChatsPopup'
import SignInPopup from './components/SignInPopup'
import EditProfilePopup from './components/EditProfilePopup'
import { type User } from './data/mockUserDots'

function App() {
  const [showChat, setShowChat] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showActiveChats, setShowActiveChats] = useState(false)
  const [activeChats, setActiveChats] = useState<any[]>([])
  const [showSignIn, setShowSignIn] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [currentUser, setCurrentUser] = useState<null | {
    id: string
    name: string
    email: string
    isMod: boolean
    isPremium: boolean
    avatar?: string
    age?: number
    gender?: string
    bio?: string
  }>(null)
  
  const handleUserClick = (user: User) => {
    if (!isSignedIn) {
      setShowSignIn(true)
      return
    }

    // Add user to active chats if not already there
    setActiveChats(prevChats => {
      const existingChat = prevChats.find(chat => chat.user.id === user.id)
      if (!existingChat) {
        const newChat = {
          id: user.id,
          user: {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            isOnline: user.isOnline
          },
          lastMessage: {
            text: 'Chat started',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isUnread: false
          },
          unreadCount: 0
        }
        return [...prevChats, newChat]
      }
      return prevChats
    })
    
    // Show both popups and select the user
    setSelectedUser(user)
    setShowChat(true)
    setShowActiveChats(true) // Show active chats popup
  }

  const handleChatSelect = (chatId: string, user: any) => {
    setSelectedUser(user)
    setShowChat(true)
    setShowActiveChats(false)
  }

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message)
    // Here you would integrate with your chat backend
  }

  const handleVoiceCall = () => {
    console.log('Starting voice call...')
    // Here you would integrate voice call functionality
  }

  const handleVideoCall = () => {
    console.log('Starting video call...')
    // Here you would integrate video call functionality
  }

  const handleSignIn = (email: string, password: string) => {
    console.log('Signing in with:', email)
    
    // Check for mod superaccount
    if (email === 'mod@mapchats.dev' && password === 'modtest123') {
      const modUser = {
        id: 'mod-001',
        name: 'MapChats Mod',
        email: 'mod@mapchats.dev',
        isMod: true,
        isPremium: true,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=ModUser`,
        age: 28,
        gender: 'Male',
        bio: 'MapChats Moderator 🔧'
      }
      setCurrentUser(modUser)
      setIsSignedIn(true)
      setIsPremium(true)
      setShowSignIn(false)
      console.log('🔧 MOD ACCOUNT ACTIVATED:', modUser)
      return
    }

    // Check for premium test account
    if (email === 'premium@test.com' && password === 'premium123') {
      const premiumUser = {
        id: 'premium-001',
        name: 'Alex Premium',
        email: 'premium@test.com',
        isMod: false,
        isPremium: true,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=AlexPremium`,
        age: 26,
        gender: 'Non-binary',
        bio: 'Premium user exploring the world ✨'
      }
      setCurrentUser(premiumUser)
      setIsSignedIn(true)
      setIsPremium(true)
      setShowSignIn(false)
      console.log('💎 PREMIUM ACCOUNT ACTIVATED:', premiumUser)
      return
    }

    // Check for free user test account
    if (email === 'free@test.com' && password === 'free123') {
      const freeUser = {
        id: 'free-001',
        name: 'Jamie Free',
        email: 'free@test.com',
        isMod: false,
        isPremium: false,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=JamieFree`,
        age: 23,
        gender: 'Female',
        bio: 'New to MapChats, excited to explore!'
      }
      setCurrentUser(freeUser)
      setIsSignedIn(true)
      setIsPremium(false)
      setShowSignIn(false)
      console.log('👤 FREE ACCOUNT ACTIVATED:', freeUser)
      return
    }

    // Regular user account
    const username = email.split('@')[0]
    const regularUser = {
      id: 'user-' + Date.now(),
      name: username,
      email: email,
      isMod: false,
      isPremium: false,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      age: 25,
      gender: 'Male',
      bio: 'MapChats explorer 🌍'
    }
    setCurrentUser(regularUser)
    setIsSignedIn(true)
    setIsPremium(false)
    setShowSignIn(false)
    console.log('👤 REGULAR ACCOUNT ACTIVATED:', regularUser)
  }

  const handleSignUp = (email: string, password: string, name: string) => {
    console.log('Signing up with:', email, name)
    
    // Create new regular user account
    const newUser = {
      id: 'user-' + Date.now(),
      name: name,
      email: email,
      isMod: false,
      isPremium: false,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      age: 25,
      gender: 'Male',
      bio: 'Just joined MapChats! 👋'
    }
    setCurrentUser(newUser)
    setIsSignedIn(true)
    setIsPremium(false)
    setShowSignIn(false)
    console.log('✨ NEW ACCOUNT CREATED:', newUser)
  }

  const handleSignOut = () => {
    console.log('🚪 USER SIGNED OUT:', currentUser?.name)
    setCurrentUser(null)
    setIsSignedIn(false)
    setIsPremium(false)
    setShowActiveChats(false)
    setShowChat(false)
    setShowEditProfile(false)
    setSelectedUser(null)
    setActiveChats([])
  }

  const handleUpgradePremium = () => {
    console.log('Upgrading to premium...')
    // Here you would integrate with payment system
    setIsPremium(true)
    if (currentUser) {
      setCurrentUser({...currentUser, isPremium: true})
    }
    setShowEditProfile(false)
  }

  const handleProfileSave = (profileData: {
    username: string
    age: number
    gender: string
    bio: string
    avatar: string
  }) => {
    console.log('💾 PROFILE UPDATED:', profileData)
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        name: profileData.username,
        avatar: profileData.avatar,
        age: profileData.age,
        gender: profileData.gender,
        bio: profileData.bio
      })
    }
    // Here you would save to backend/database and update the user's map dot
    console.log('🗺️ MAP DOT AVATAR UPDATED:', profileData.avatar)
  }

  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      fontFamily: 'system-ui'
    }}>
      {/* Map Background */}
      <SimpleMap 
        center={[40.7589, -73.9851]} 
        zoom={12}
        onUserClick={handleUserClick}
        currentUser={currentUser}
      />
      
      {/* UI Controls Overlay - Symbolic UI */}
      {/* Debug Info Overlay - Only in development */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          padding: '8px 12px',
          backgroundColor: 'rgba(6, 12, 24, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '6px',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '10px',
          fontFamily: 'monospace',
          zIndex: 1000,
          maxWidth: '200px'
        }}>
          <div>Status: {isSignedIn ? '🟢 Signed In' : '🔴 Signed Out'}</div>
          {currentUser && (
            <>
              <div>User: {currentUser.name}</div>
              <div>Type: {currentUser.isMod ? '🔧 Mod' : currentUser.isPremium ? '💎 Premium' : '👤 Regular'}</div>
            </>
          )}
          <div style={{ marginTop: '4px', fontSize: '9px', opacity: 0.7 }}>
            Test Accounts:<br/>
            🔧 mod@mapchats.dev / modtest123<br/>
            💎 premium@test.com / premium123<br/>
            👤 free@test.com / free123
          </div>
        </div>
      )}

      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        {!isSignedIn ? (
          // Sign In Button (only button when signed out)
          <button
            onClick={() => setShowSignIn(true)}
            style={{
              padding: '12px',
              backgroundColor: 'rgba(6, 12, 24, 0.98)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              transition: 'all 0.15s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
            }}
            title="Sign In"
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(6, 12, 24, 0.98)'
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            👤
          </button>
        ) : (
          // Settings Button (only button when signed in)
          <button
            onClick={() => setShowEditProfile(true)}
            style={{
              padding: '12px',
              backgroundColor: 'rgba(6, 12, 24, 0.98)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              transition: 'all 0.15s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
            }}
            title="Settings"
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(6, 12, 24, 0.98)'
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ⚙️
          </button>
        )}
      </div>

      {/* Active Chats Button */}
      {isSignedIn && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 1000
        }}>
          <button
            onClick={() => setShowActiveChats(!showActiveChats)}
            style={{
              padding: '10px',
              backgroundColor: 'rgba(6, 12, 24, 0.98)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              transition: 'all 0.15s ease',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
            }}
            title="Active Chats"
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(6, 12, 24, 0.98)'
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            💬
          </button>
        </div>
      )}

      {/* Active Chats Popup */}
      <ActiveChatsPopup
        isOpen={showActiveChats}
        onClose={() => setShowActiveChats(false)}
        onChatSelect={handleChatSelect}
        activeChats={activeChats}
      />

      {/* Chat Popup */}
      {showChat && selectedUser && isSignedIn && (
        <ChatPopupUI
          user={{
            id: selectedUser.id,
            name: selectedUser.name,
            avatar: selectedUser.avatar,
            isOnline: selectedUser.isOnline
          }}
          onClose={() => {
            setShowChat(false)
            setSelectedUser(null)
          }}
          onSendMessage={handleSendMessage}
          onVoiceCall={handleVoiceCall}
          onVideoCall={handleVideoCall}
        />
      )}

      {/* Sign In Popup */}
      <SignInPopup
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />

      {/* Edit Profile Popup */}
      <EditProfilePopup
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={handleProfileSave}
        onUpgradePremium={handleUpgradePremium}
        onSignOut={handleSignOut}
        currentUser={currentUser}
        isPremium={isPremium}
      />
    </div>
  )
}

export default App
