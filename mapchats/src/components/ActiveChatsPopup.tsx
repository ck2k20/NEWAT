import { X, Circle } from 'lucide-react'

interface ChatItem {
  id: string
  user: {
    id: string
    name: string
    avatar: string
    isOnline: boolean
  }
  lastMessage: {
    text: string
    timestamp: string
    isUnread: boolean
  }
  unreadCount: number
}

interface ActiveChatsPopupProps {
  isOpen: boolean
  onClose: () => void
  onChatSelect: (chatId: string, user: any) => void
  activeChats: ChatItem[]
}

export default function ActiveChatsPopup({ 
  isOpen, 
  onClose, 
  onChatSelect,
  activeChats 
}: ActiveChatsPopupProps) {

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: '60px',
      left: '20px',
      width: '280px',
      maxHeight: 'calc(100vh - 90px)',
      backgroundColor: 'rgba(6, 12, 24, 0.98)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '8px',
      boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
      zIndex: 1000,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '8px 12px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(0, 0, 0, 0.3)',
        flexShrink: 0
      }}>
        <h2 style={{
          margin: 0,
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '13px',
          fontWeight: '500',
          letterSpacing: '0.025em'
        }}>
          CHATS
        </h2>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.4)',
            cursor: 'pointer',
            padding: '4px',
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

      {/* Chat List */}
      <div style={{
        flex: 1,
        overflowY: 'auto'
      }}>
        {activeChats.length === 0 ? (
          <div style={{
            padding: '24px 16px',
            textAlign: 'center',
            color: '#64748b'
          }}>
            <p style={{ margin: 0, fontSize: '13px' }}>
              No active chats yet
            </p>
            <p style={{ margin: '6px 0 0 0', fontSize: '11px', opacity: 0.7 }}>
              Click on user dots to start chatting
            </p>
          </div>
        ) : (
          activeChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onChatSelect(chat.id, chat.user)}
              style={{
                padding: '10px 12px',
                borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              {/* Avatar */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img
                  src={chat.user.avatar}
                  alt={chat.user.name}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: chat.lastMessage.isUnread ? '2px solid #3b82f6' : '2px solid rgba(59, 130, 246, 0.3)'
                  }}
                />
                {chat.user.isOnline && (
                  <div style={{
                    position: 'absolute',
                    bottom: '0px',
                    right: '0px',
                    width: '10px',
                    height: '10px',
                    backgroundColor: '#10b981',
                    borderRadius: '50%',
                    border: '2px solid rgba(15, 23, 42, 0.95)'
                  }} />
                )}
              </div>

              {/* Chat Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '2px'
                }}>
                  <h3 style={{
                    margin: 0,
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: chat.lastMessage.isUnread ? '600' : '500',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {chat.user.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      color: '#64748b',
                      fontSize: '10px',
                      flexShrink: 0
                    }}>
                      {chat.lastMessage.timestamp}
                    </span>
                    {chat.unreadCount > 0 && (
                      <div style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        borderRadius: '50%',
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '9px',
                        fontWeight: '600'
                      }}>
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
                <p style={{
                  margin: 0,
                  color: chat.lastMessage.isUnread ? '#e2e8f0' : '#94a3b8',
                  fontSize: '11px',
                  fontWeight: chat.lastMessage.isUnread ? '500' : '400',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  lineHeight: '1.3'
                }}>
                  {chat.lastMessage.text}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}