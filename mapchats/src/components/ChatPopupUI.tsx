import { useState, useRef, useEffect } from 'react'
import { Send, Phone, Video, X, Smile, Paperclip } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender_id: string
  sender_name: string
  timestamp: string
  isOwnMessage: boolean
}

interface ChatUser {
  id: string
  name: string
  avatar: string
  isOnline: boolean
}

interface ChatPopupUIProps {
  user: ChatUser
  onClose: () => void
  onSendMessage?: (message: string) => void
  onVoiceCall?: () => void
  onVideoCall?: () => void
}

export default function ChatPopupUI({ 
  user, 
  onClose, 
  onSendMessage, 
  onVoiceCall, 
  onVideoCall 
}: ChatPopupUIProps) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! How are you?',
      sender_id: user.id,
      sender_name: user.name,
      timestamp: '2:30 PM',
      isOwnMessage: false
    },
    {
      id: '2', 
      text: 'Good! Just exploring the city. You?',
      sender_id: 'me',
      sender_name: 'You',
      timestamp: '2:31 PM',
      isOwnMessage: true
    },
    {
      id: '3',
      text: 'Same here! Want to grab coffee?',
      sender_id: user.id,
      sender_name: user.name,
      timestamp: '2:32 PM',
      isOwnMessage: false
    }
  ])
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      sender_id: 'me',
      sender_name: 'You',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwnMessage: true
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')
    onSendMessage?.(newMessage.text)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '320px',
      height: '460px',
      backgroundColor: 'rgba(6, 12, 24, 0.98)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
      zIndex: 1000,
      overflow: 'hidden'
    }}>
      {/* Chat Header */}
      <div style={{
        padding: '10px 12px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '8px 8px 0 0',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative' }}>
            <img 
              src={user.avatar}
              alt={user.name}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            />
            {user.isOnline && (
              <div style={{
                position: 'absolute',
                bottom: '-1px',
                right: '-1px',
                width: '8px',
                height: '8px',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                border: '2px solid rgba(6, 12, 24, 0.98)'
              }} />
            )}
          </div>
          <div>
            <h3 style={{ 
              color: 'rgba(255, 255, 255, 0.95)', 
              margin: 0, 
              fontSize: '13px', 
              fontWeight: '500',
              letterSpacing: '0.01em'
            }}>
              {user.name}
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.4)', 
              margin: 0, 
              fontSize: '10px',
              fontWeight: '400'
            }}>
              {user.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={onVoiceCall}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '4px',
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
            <Phone size={14} />
          </button>
          
          <button
            onClick={onVideoCall}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '4px',
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
            <Video size={14} />
          </button>
          
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '4px',
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
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.isOwnMessage ? 'flex-end' : 'flex-start'
            }}
          >
            <div style={{
              maxWidth: '85%',
              padding: '10px 12px',
              borderRadius: '12px',
              background: msg.isOwnMessage 
                ? 'rgba(59, 130, 246, 0.9)'
                : 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(8px)',
              border: msg.isOwnMessage 
                ? 'none'
                : '1px solid rgba(255, 255, 255, 0.08)',
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: '13px',
              lineHeight: '1.4',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
            }}>
              <div>{msg.text}</div>
              <div style={{
                fontSize: '10px',
                color: msg.isOwnMessage ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.4)',
                marginTop: '3px',
                textAlign: 'right',
                fontWeight: '400'
              }}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div style={{
        padding: '10px 12px',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-end',
        background: 'rgba(0, 0, 0, 0.3)',
        flexShrink: 0
      }}>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.3)',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Paperclip size={16} />
        </button>
        
        <div style={{ flex: 1 }}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            style={{
              width: '100%',
              minHeight: '36px',
              maxHeight: '100px',
              padding: '10px 12px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              color: 'rgba(255, 255, 255, 0.95)',
              fontSize: '13px',
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'all 0.15s ease'
            }}
            rows={1}
          />
        </div>
        
        <button
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.3)',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Smile size={16} />
        </button>
        
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          style={{
            background: message.trim() 
              ? 'rgba(59, 130, 246, 0.9)'
              : 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: message.trim() ? 'white' : 'rgba(255, 255, 255, 0.3)',
            cursor: message.trim() ? 'pointer' : 'not-allowed',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease',
            boxShadow: message.trim() ? '0 4px 12px rgba(59, 130, 246, 0.4)' : 'none'
          }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}