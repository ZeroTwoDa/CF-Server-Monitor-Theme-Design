import { reactive } from 'vue'
import { api } from '../utils/api'
import { loadConfig } from '../utils/config'

export const themeState = reactive({ config: null, loading: false, error: null })
export const themeOptions = reactive({ layout: 'table', accent: '#7c5cff', compact: false, showCharts: true })

export async function ensureTheme() {
  if (themeState.config) return themeState.config
  themeState.loading = true
  try {
    themeState.config = await loadConfig(api.config)
    Object.assign(themeOptions, themeState.config?.theme_options || {})
    return themeState.config
  } catch (error) { themeState.error = error; throw error } finally { themeState.loading = false }
}

export async function saveTheme() {
  await api.saveThemeOptions({ ...themeOptions })
}
