import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Map from './pages/Map'
import Auth from './pages/Auth'

function AppNoAuth() {
  console.log('AppNoAuth rendering...')
  
  return (
    <div>
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        background: '#10b981', 
        color: 'white', 
        padding: '5px 10px',
        fontSize: '12px',
        zIndex: 9999 
      }}>
        No-Auth Test Mode Active
      </div>
      
      <Router>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  )
}

export default AppNoAuth