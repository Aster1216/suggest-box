import React, { useEffect, useState } from 'react'
import { listBureaus, submitSuggestion } from '../services/api'

export default function SuggestionBox({ t, lang }) {
  const [bureaus, setBureaus] = useState([])
  const [form, setForm] = useState({
    bureau_key: '',
    message: '',
    email: '',
    isPublic: false,
    language: lang
  })
  const [status, setStatus] = useState('')

  useEffect(() => {
    listBureaus().then(setBureaus).catch(() => setBureaus([]))

    // handle ?loginAs param
    const params = new URLSearchParams(window.location.search)
    const loginAs = params.get('loginAs')
    if (loginAs) {
      listBureaus()
        .then(all => {
          const found = all.find(b => b.email === loginAs || b.key === loginAs)
          if (found) setForm(f => ({ ...f, bureau_key: found.key }))
        })
        .catch(() => {})
    }
  }, [])

  // 🔹 keep form.language updated if user toggles lang
  useEffect(() => {
    setForm(f => ({ ...f, language: lang }))
  }, [lang])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(t.submitting)
    try {
      await submitSuggestion(form)
      setStatus(t.submitSuccess)
      setForm({
        bureau_key: '',
        message: '',
        email: '',
        isPublic: false,
        language: lang
      })
    } catch (err) {
      setStatus(t.submitFail)
    }
  }

  return (
    <div className="container" style={{ padding: '28px 20px' }}>
      <div className="form">
        <h3 style={{ marginTop: 0 }}>{t.submitSuggestion}</h3>

        <form onSubmit={handleSubmit}>
          {/* Office Dropdown */}
          <label>{t.office}</label>
          <select
            value={form.bureau_key}
            onChange={e => setForm({ ...form, bureau_key: e.target.value })}
          >
            <option value="">{t.selectOffice}</option>
            {bureaus.map(b => (
              <option key={b.key} value={b.key}>
                {lang === 'en' ? b.name_en : b.name_am}
              </option>
            ))}
          </select>

          {/* Message */}
          <label>{t.message}</label>
          <textarea
            rows={6}
            placeholder={t.message} // 🔹 placeholder follows lang
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
          />

          {/* Email */}
          <label>{t.emailOptional}</label>
          <input
            type="email"
            placeholder={t.emailOptional} // 🔹 placeholder follows lang
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          {/* Public checkbox (after text) */}
          <label
            htmlFor="public"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '12px',
              cursor: 'pointer',
              color: '#0f2b44'
            }}
          >
            {t.makePublic}
            <input
              id="public"
              type="checkbox"
              checked={form.isPublic}
              onChange={e =>
                setForm({ ...form, isPublic: e.target.checked })
              }
              style={{ width: 16, height: 16, cursor: 'pointer' }}
            />
          </label>

          {/* Submit + status */}
          <div
            style={{
              marginTop: 14,
              display: 'flex',
              gap: 50,
              alignItems: 'center'
            }}
          >
            <button type="submit" className="btn-primary">
              {t.submitBtn}
            </button>
            <div style={{ color: '#2b4158' }}>{status}</div>
          </div>
        </form>
      </div>
    </div>
  )
}
