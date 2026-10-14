import { getApiBase } from './config'

function tokenHeaders() {
  const jwt = localStorage.getItem('jwt_token')
  const verified = localStorage.getItem('cfsm_turnstile_verified')
  const headers = { Accept: 'application/json' }
  if (jwt) headers.Authorization = `Bearer ${jwt}`
  if (verified) headers['X-Turnstile-Verified'] = verified
  return headers
}

export async function request(path, options = {}) {
  const headers = { ...tokenHeaders(), ...(options.headers || {}) }
  const response = await fetch(`${getApiBase()}${path}`, { ...options, headers })
  if (response.status === 401) {
    localStorage.removeItem('jwt_token')
    window.location.assign('/admin#/admin')
    throw new Error('Authentication required')
  }
  if (response.status === 403) {
    localStorage.removeItem('cfsm_turnstile_verified')
    window.dispatchEvent(new CustomEvent('cfsm:turnstile-required'))
    throw new Error('Verification required')
  }
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
  const data = await response.json()
  if (data?.turnstile_verified) localStorage.setItem('cfsm_turnstile_verified', String(data.turnstile_verified))
  return data
}

export async function get(path) { return request(path) }

export async function post(path, body) {
  const headers = { 'Content-Type': 'application/json' }
  const turnstile = window.__CFSM_TURNSTILE_TOKEN__
  if (turnstile) headers['X-Turnstile-Token'] = turnstile
  return request(path, { method: 'POST', headers, body: JSON.stringify(body) })
}

export function websocketUrl(scope, ids = []) {
  const base = new URL(getApiBase(), window.location.href)
  base.protocol = base.protocol === 'https:' ? 'wss:' : 'ws:'
  base.pathname = `${base.pathname.replace(/\/$/, '')}/api/ws`
  base.search = new URLSearchParams({ subscribe: scope }).toString()
  if (base.origin !== window.location.origin) {
    const jwt = localStorage.getItem('jwt_token')
    if (jwt) base.searchParams.set('token', jwt)
  }
  return { url: base.toString(), ids }
}
