import { get, post } from './http'

const hoursAllowed = new Set(['0.167', '0.5', '1', '6', '12', '24', '48', '96', '168'])
export const DEFAULT_HOURS = '0.167'

export const api = {
  config: () => get('/api/config'),
  servers: () => get('/api/servers'),
  server: (id) => get(`/api/server?id=${encodeURIComponent(id)}`),
  history: (id, hours = DEFAULT_HOURS) => {
    const safeHours = hoursAllowed.has(String(hours)) ? String(hours) : DEFAULT_HOURS
    return get(`/api/history/all?id=${encodeURIComponent(id)}&hours=${safeHours}`)
  },
  saveThemeOptions: (theme_options) => post('/api/theme_options', { theme_options })
}
