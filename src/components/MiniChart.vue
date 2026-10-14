<script setup>
import { computed } from 'vue'
const props = defineProps({ values: { type: Array, default: () => [] }, color: { type: String, default: '#7c5cff' } })
const points = computed(() => { const nums = props.values.filter((x) => x !== false && x !== undefined).map((x) => x === null ? null : Number(x)).filter((x) => x === null || Number.isFinite(x)); if (!nums.length) return ''; const finite = nums.filter((x) => x !== null); const max = Math.max(1, ...finite); const min = Math.min(0, ...finite); const range = max - min || 1; return nums.map((x, i) => `${(i / Math.max(nums.length - 1, 1)) * 100},${x === null ? 30 : 42 - ((x - min) / range) * 34}`).join(' ') })
</script>
<template><svg v-if="points" class="mini-chart" viewBox="0 0 100 45" preserveAspectRatio="none"><polyline :points="points" fill="none" :stroke="color" stroke-width="2" vector-effect="non-scaling-stroke" /></svg></template>
