<script setup lang="ts">
defineProps<{
  label: string
  color: string
  bg: string
}>()
</script>

<template>
  <span :class="`px-3 my-1 py-2 rounded-full text-xs font-semibold mr-2 ${bg} ${color}`">
    {{ label }}
  </span>
</template>
