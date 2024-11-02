import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Homepage } from './pages/homepage'
import { LoginPage } from './pages/login'
import { ProtectedRoute } from './app/router/protected-route'

function App() {

  return (
    <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route path="/homepage" element={<ProtectedRoute element={<Homepage />} />} />

      {/* Redirect any unknown routes to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
  )
}

export default App
