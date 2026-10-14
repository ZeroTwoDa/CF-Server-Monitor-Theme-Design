import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [vue()],
    base: './',
    define: {
      __API_BASE__: JSON.stringify(env.API_BASE || ''),
      __TITLE__: JSON.stringify(env.TITLE || ''),
      __BACKGROUND_IMAGE__: JSON.stringify(env.BACKGROUND_IMAGE || ''),
      __CSP_API__: JSON.stringify(env.CSP_API || ''),
      __CSP_STATIC__: JSON.stringify(env.CSP_STATIC || '')
    },
    build: { assetsDir: 'assets', emptyOutDir: true }
  }
})
