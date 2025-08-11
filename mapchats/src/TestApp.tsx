import { useState } from 'react'

function TestApp() {
  const [count, setCount] = useState(0)
  
  console.log('TestApp rendering, count:', count)
  
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#0a0a0a',
      color: '#00ff00',
      fontFamily: 'monospace',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>
        🚀 MapChats Debug App
      </h1>
      
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>✅ React Status: Working!</h2>
        <p>Component rendered at: {new Date().toLocaleString()}</p>
        <p>Counter: {count}</p>
        
        <button 
          onClick={() => setCount(c => c + 1)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Click me! ({count})
        </button>
      </div>
      
      <div style={{ fontSize: '12px', opacity: 0.7 }}>
        <p>✓ React hooks working</p>
        <p>✓ Event handlers working</p>
        <p>✓ CSS-in-JS working</p>
        <p>✓ Component state working</p>
      </div>
    </div>
  )
}

export default TestApp