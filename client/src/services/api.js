import axios from 'axios'
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const API = axios.create({ baseURL: API_BASE })

export async function listBureaus() {
  const r = await API.get('/bureaus')
  return r.data
}

export async function submitSuggestion(payload) {
  const r = await API.post('/suggestions', payload)
  return r.data
}

export async function listPublicSuggestions() {
  const r = await API.get('/suggestions/public')
  return r.data
}

export async function loginOffice(email, password) {
  const r = await API.post('/auth/login', { email, password })
  return r.data
}

export async function getOfficeSuggestions(token) {
  const r = await API.get('/suggestions/bureau', { headers: { Authorization: 'Bearer ' + token } })
  return r.data
}
