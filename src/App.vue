<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { ensureTheme, themeState } from './composables/useTheme'
import TurnstileGate from './components/TurnstileGate.vue'
const route = useRoute()
const ready = computed(() => !!themeState.config)
const verified = ref(false)
const requireTurnstile = () => { verified.value = false }
onMounted(async () => {
  window.addEventListener('cfsm:turnstile-required', requireTurnstile)
  try {
    const config = await ensureTheme()
    document.title = config?.site_name || config?.title || 'CF-Server-Monitor'
    if (config?.preferred_theme === 'dark' || config?.preferred_theme === 'light') document.documentElement.dataset.theme = config.preferred_theme
    if (config?.background_image) document.body.style.backgroundImage = `url(${config.background_image})`
    window.__CFSM_TURNSTILE_SITE_KEY__ = config?.turnstile_site_key
    verified.value = config?.turnstile_enabled !== true || !!localStorage.getItem('cfsm_turnstile_verified')
  } catch { /* the template exposes the error */ }
})
onBeforeUnmount(() => window.removeEventListener('cfsm:turnstile-required', requireTurnstile))
</script>
<template>
  <div class="app-shell">
    <header class="topbar"><a class="brand" href="#/"><span class="brand-mark">⌁</span><span>{{ themeState.config?.site_name || themeState.config?.title || 'Monitor' }}</span></a><nav><a :class="{ active: route.path === '/' }" href="#/">Overview</a><a href="/admin#/admin">Admin</a></nav></header>
    <main v-if="ready && verified"><RouterView /></main>
    <TurnstileGate v-else-if="ready && themeState.config?.turnstile_enabled" @verified="verified = true" />
    <div v-else-if="themeState.loading" class="loading-state"><span class="spinner" /> Loading configuration…</div>
    <div v-else class="error-state"><h2>Unable to load configuration</h2><p>{{ themeState.error?.message }}</p><a href="/admin#/admin">Open admin</a></div>
    <footer>Powered by <a href="https://github.com/huilang-me/CF-Server-Monitor/" target="_blank" rel="noreferrer">CF-Server-Monitor</a><span v-if="themeState.config?.version"> · v{{ themeState.config.version }}</span></footer>
  </div>
</template>
