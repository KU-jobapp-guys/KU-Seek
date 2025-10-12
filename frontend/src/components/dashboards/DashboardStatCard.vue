<script setup lang="ts">
defineProps<{
  title: string
  value: number | string
  description: string
  icon: string
  cardClass?: string
}>()
</script>

<template>
  <div :class="cardClass + ' rounded-lg ring-8 ring-white/10 p-8 flex-1 text-white relative overflow-hidden h-[240px] relative flex flex-col justify-center'">
    <div class="flex flex-col">
      <div class="text-2xl mb-6">{{ title }}</div>
      <div class="text-7xl font-bold">{{ value }}</div>
      <div class="text-xl mt-2">{{ description }}</div>
    </div>

    <img
      :src="icon"
      :alt="title"
      class="absolute right-6 top-1/2 -translate-y-1/2 w-20 h-20 opacity-100"
      style="z-index: 1"
    />
  </div>
</template>
