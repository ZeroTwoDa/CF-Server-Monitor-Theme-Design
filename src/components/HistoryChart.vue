<script setup>
import { computed } from 'vue'
const props = defineProps({ rows: { type: Array, default: () => [] }, field: { type: String, default: 'cpu' }, color: { type: String, default: '#7c5cff' } })
const points = computed(() => { const vals = props.rows.map((r) => Number(r?.[props.field])).filter(Number.isFinite); if (!vals.length) return ''; const max = Math.max(1, ...vals); return vals.map((v, i) => `${(i / Math.max(vals.length - 1, 1)) * 100},${44 - (v / max) * 37}`).join(' ') })
</script>
<template><div class="history-chart"><svg v-if="points" viewBox="0 0 100 45" preserveAspectRatio="none"><polyline :points="points" fill="none" :stroke="color" stroke-width="2" vector-effect="non-scaling-stroke" /></svg><span v-else>No samples in this range</span></div></template>
