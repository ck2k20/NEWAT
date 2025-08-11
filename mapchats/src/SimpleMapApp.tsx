import { useState } from 'react'

function SimpleMapApp() {
  const [loaded, setLoaded] = useState(false)
  
  // Simulate loading delay
  setTimeout(() => setLoaded(true), 500)
  
  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-white text-lg">Loading MapChats...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">🗺️ MapChats</h1>
      
      <div className="bg-slate-800 p-6 rounded-lg">
        <h2 className="text-2xl mb-4">✅ App Loaded Successfully!</h2>
        <p className="mb-4">This proves the React app is working correctly.</p>
        
        <div className="space-y-2">
          <p>🔄 State management: Working</p>
          <p>🎨 Tailwind CSS: Working</p>
          <p>⚛️ React hooks: Working</p>
          <p>📱 Component rendering: Working</p>
        </div>
        
        <button 
          onClick={() => alert('Button clicked!')}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Test Interaction
        </button>
      </div>
    </div>
  )
}

export default SimpleMapApp