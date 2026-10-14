<script setup>
import { onMounted, ref } from 'vue'
const emit = defineEmits(['verified']); const failed = ref(false); const container = ref(null)
onMounted(() => {
  if (!window.turnstile) {
    const script = document.createElement('script'); script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; script.async = true; script.defer = true
    script.onload = render; script.onerror = () => { failed.value = true }; document.head.appendChild(script)
  } else render()
  function render() {
    const key = window.__CFSM_TURNSTILE_SITE_KEY__
    if (!key || !window.turnstile || !container.value) return
    window.turnstile.render(container.value, { sitekey: key, callback: (token) => { window.__CFSM_TURNSTILE_TOKEN__ = token; emit('verified') }, 'expired-callback': () => { window.__CFSM_TURNSTILE_TOKEN__ = '' } })
  }
})
</script>
<template><div class="turnstile-gate"><p>Complete the security check to view monitoring data.</p><div ref="container" class="cf-turnstile" /><p v-if="failed" class="gate-error">Turnstile could not be loaded.</p></div></template>
