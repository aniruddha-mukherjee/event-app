import React from 'react'

export default function RegistrationList({ items = [], onDelete }) {
  if (items.length === 0) return <div>No registrations yet.</div>

  return (
    <ul className="list">
      {items.map(item => (
        <li key={item.id ?? item.name}>
          <span>{item.id ? `${item.id} — ` : ''}{item.name}</span>
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}
