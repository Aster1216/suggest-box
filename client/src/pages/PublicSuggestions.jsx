import React, { useEffect, useState } from 'react'
import { listPublicSuggestions } from '../services/api'

export default function PublicSuggestions({ t, lang }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    listPublicSuggestions().then(setItems).catch(() => setItems([]))
  }, [])

  return (
    <div className="container" style={{ padding: 28 }}>
      <h2 style={{ marginTop: 0 }}>{t.publicTitle}</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        {items.length === 0 && <div>{t.noPublic}</div>}
        {items.map(s => (
          <div key={s._id} className="card">
            <div style={{ fontWeight: 700 }}>
              {lang === 'en' ? s.bureau?.name_en : s.bureau?.name_am || s.bureau_key}
              <span style={{ fontWeight: 400, color: '#64748b' }}>
                — {new Date(s.createdAt).toLocaleString()}
              </span>
            </div>
            <div style={{ marginTop: 8 }}>{s.message}</div>
            {s.email && <div style={{ marginTop: 8, fontSize: 13, color: '#334155' }}>{t.contact}: {s.email}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
