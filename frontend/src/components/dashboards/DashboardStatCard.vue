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
  <div :class="cardClass + ' h-[300px] relative flex flex-col justify-center'">
    <div>
      <div class="text-4xl mb-2">{{ title }}</div>
      <div class="text-8xl font-bold">{{ value }}</div>
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
