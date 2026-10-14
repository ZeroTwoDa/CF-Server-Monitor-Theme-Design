<script setup>
defineProps({ label: String, value: [String, Number], detail: String, tone: { type: String, default: 'purple' } })
</script>
<template><div class="stat-bar"><div class="stat-label">{{ label }}</div><div class="stat-value" :class="`tone-${tone}`">{{ value }}</div><div class="stat-detail">{{ detail }}</div></div></template>
