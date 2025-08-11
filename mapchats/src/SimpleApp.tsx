
function SimpleApp() {
  console.log('SimpleApp component rendering...')
  
  return (
    <div style={{
      padding: '20px',
      background: '#0f172a',
      color: 'white',
      minHeight: '100vh',
      fontFamily: 'system-ui'
    }}>
      <h1>🎉 MapChats Simple Test</h1>
      <p>If you can see this, React is working!</p>
      <p>Timestamp: {new Date().toLocaleString()}</p>
      
      <div style={{
        background: '#1f2937',
        padding: '15px',
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <h3>Component Status:</h3>
        <ul>
          <li>✅ React rendering</li>
          <li>✅ JSX compilation</li>
          <li>✅ CSS-in-JS styles</li>
          <li>✅ JavaScript execution</li>
        </ul>
      </div>
      
      <button 
        onClick={() => alert('Button works!')}
        style={{
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Test Interaction
      </button>
    </div>
  )
}

export default SimpleApp