import React, { useState } from 'react'

export default function UnregisterForm({ apiBase, onSuccess, onError }) {
  const [name, setName] = useState('')
  const [deleting, setDeleting] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setDeleting(true)
    onError?.(null)
    try {
      const res = await fetch(`${apiBase}/by-name/${encodeURIComponent(name)}`, { method: 'DELETE' })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(`Server ${res.status}: ${txt}`)
      }
      setName('')
      onSuccess?.()
    } catch (err) {
      onError?.(err.message)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <form onSubmit={submit} className="card">
      <h2>Unregister (by name)</h2>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name to delete"
        required
      />
      <button type="submit" disabled={deleting}>
        {deleting ? 'Deleting…' : 'Delete by name'}
      </button>
    </form>
  )
}
