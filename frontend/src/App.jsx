import React, { useEffect, useState } from 'react'
import RegisterForm from './components/RegisterForm'
import UnregisterForm from './components/UnregisterForm'
import RegistrationList from './components/RegistrationList'

// base API URL (adjust if needed)
const API_BASE = 'http://localhost:8080/api/registrations'

export default function App() {
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
      <h1>Registrations</h1>

      <div className="forms">
        <RegisterForm apiBase={API_BASE} onSuccess={handleAdd} onError={setError} />
        <UnregisterForm apiBase={API_BASE} onSuccess={fetchList} onError={setError} />
      </div>

      {error && <div className="error">Error: {error}</div>}
      {loading ? <div>Loading…</div> : <RegistrationList items={registrations} onDelete={handleDelete} />}
    </div>
  )
}
