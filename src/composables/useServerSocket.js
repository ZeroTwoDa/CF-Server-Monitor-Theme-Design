import { onBeforeUnmount, ref } from 'vue'
import { websocketUrl } from '../utils/http'

export function useServerSocket(scope, ids, onBatch, timeoutMinutes = 0) {
  const connected = ref(false); const stopped = ref(false)
  let socket; let retry = 0; let retryTimer; let timeoutTimer; let startedAt = 0

  const close = () => {
    clearTimeout(retryTimer); clearTimeout(timeoutTimer)
    if (socket) { socket.onclose = null; socket.close() }
    socket = undefined; connected.value = false
  }
  const schedule = () => {
    if (stopped.value || document.hidden || retry >= 7) return
    const delay = Math.min(30000, 1000 * (2 ** retry++))
    retryTimer = setTimeout(connect, delay)
  }
  const connect = () => {
    if (stopped.value || document.hidden) return
    close(); const payload = websocketUrl(scope, ids())
    socket = new WebSocket(payload.url)
    socket.onopen = () => {
      retry = 0; startedAt = Date.now(); connected.value = true
      socket.send(JSON.stringify({ type: 'subscribe', scope, ids: payload.ids }))
      if (timeoutMinutes > 0) timeoutTimer = setTimeout(() => {
        close()
        if (window.confirm('实时连接已达到设定时长，是否继续？')) { stopped.value = false; connect() } else stopped.value = true
      }, timeoutMinutes * 60 * 1000)
    }
    socket.onmessage = (event) => { try { const message = JSON.parse(event.data); if (message.type === 'batchUpdate' || message.updates) onBatch(message) } catch { /* malformed frame */ } }
    socket.onerror = () => socket?.close()
    socket.onclose = () => { connected.value = false; schedule() }
  }
  const start = () => { stopped.value = false; retry = 0; connect() }
  const stop = () => { stopped.value = true; close() }
  onBeforeUnmount(stop)
  return { connected, start, stop, reconnect: start }
}
