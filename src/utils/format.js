export const n = (value, digits = 0) => {
  const number = Number(value)
  return Number.isFinite(number) ? number.toFixed(digits) : '—'
}

export function percent(value, digits = 0) {
  if (value === false || value === undefined) return '—'
  if (value === null) return 'Timeout'
  return `${n(value, digits)}%`
}

export function bytes(value) {
  const number = Number(value)
  if (!Number.isFinite(number)) return '—'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let index = 0; let current = number
  while (Math.abs(current) >= 1024 && index < units.length - 1) { current /= 1024; index += 1 }
  return `${current.toFixed(index ? 1 : 0)} ${units[index]}`
}

export function rate(value) { return `${bytes(value)}/s` }

export function uptime(value) {
  const seconds = Number(value)
  if (!Number.isFinite(seconds)) return '—'
  const d = Math.floor(seconds / 86400); const h = Math.floor(seconds / 3600) % 24; const m = Math.floor(seconds / 60) % 60
  return d ? `${d}d ${h}h` : h ? `${h}h ${m}m` : `${m}m`
}

export function parseGpu(value) {
  if (Array.isArray(value)) return value
  if (typeof value !== 'string') return []
  try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed : [] } catch { return [] }
}

export function online(server) {
  const raw = server?.last_updated ?? server?.lastUpdated ?? 0
  const numeric = Number(raw)
  const updated = Number.isFinite(numeric) && numeric > 0 ? (numeric < 1e12 ? numeric * 1000 : numeric) : Date.parse(raw) || 0
  return updated > 0 && Date.now() - updated < 5 * 60 * 1000
}

export function displayPing(value) {
  if (value === false || value === undefined) return null
  return value === null ? 'Timeout' : `${n(value, 0)} ms`
}
