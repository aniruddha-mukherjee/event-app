import React, { useState } from 'react'

export default function RegisterForm({ apiBase, onSuccess, onError }) {
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    onError?.(null)
    try {
      const res = await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(`Server ${res.status}: ${txt}`)
      }
      const created = await res.json()
      setName('')
      onSuccess?.(created)
    } catch (err) {
      onError?.(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="card">
      <h2>Register</h2>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Register'}</button>
    </form>
  )
}
