let cachedConfigPromise

export function getApiBase() {
  const meta = document.querySelector('meta[name="api-base"]')?.content?.trim()
  const runtime = window.__CFSM_CONFIG__?.apiBase
  const env = typeof __API_BASE__ !== 'undefined' ? __API_BASE__ : ''
  return (meta || runtime || env || window.location.origin).replace(/\/$/, '')
}

export function loadConfig(fetcher) {
  if (!cachedConfigPromise) cachedConfigPromise = fetcher()
  return cachedConfigPromise
}

export function resetConfigCache() { cachedConfigPromise = undefined }
