import React, { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import Signup from './components/Signup'
import RegisterForm from './components/RegisterForm'
import UnregisterForm from './components/UnregisterForm'
import RegistrationList from './components/RegistrationList'

// base API URL (adjust if needed)
const API_BASE = 'http://localhost:8080/api/registrations'

function AuthenticatedApp() {
  const { user, logout } = useAuth()
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchList = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_BASE)
      if (!res.ok) throw new Error(`Failed to fetch (${res.status})`)
      const data = await res.json()
      setRegistrations(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchList() }, [])

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(`Delete failed (${res.status})`)
      setRegistrations(prev => prev.filter(r => r.id !== id))
    } catch (e) {
      setError(e.message)
    }
  }

  const handleAdd = (newItem) => {
    // if backend returns new item with id, add it to the list
    setRegistrations(prev => [...prev, newItem])
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Event Registrations</h1>
        <div className="user-info">
          Welcome, {user.username}! 
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="forms">
        <RegisterForm apiBase={API_BASE} onSuccess={handleAdd} onError={setError} />
        <UnregisterForm apiBase={API_BASE} onSuccess={fetchList} onError={setError} />
      </div>

      {error && <div className="error">Error: {error}</div>}
      {loading ? <div>Loading…</div> : <RegistrationList items={registrations} onDelete={handleDelete} />}
    </div>
  )
}

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="auth-page">
      {isLogin ? (
        <Login onToggle={() => setIsLogin(false)} />
      ) : (
        <Signup onToggle={() => setIsLogin(true)} />
      )}
    </div>
  )
}

function AppContent() {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <AuthenticatedApp /> : <AuthPage />
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
