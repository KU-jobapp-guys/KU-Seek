<script setup lang="ts">
defineProps<{
  title: string
  value: number | string
  description: string
  icon: any
  cardClass?: string
}>()
</script>

<template>
  <div :class="[cardClass, 'h-[240px] md:h-[260px] relative flex flex-col justify-center p-5']">
    <div>
      <div class="text-xl md:text-lg mb-2 font-semibold">{{ title }}</div>
      <div class="text-5xl md:text-4xl font-bold">{{ value }}</div>
      <div class="text-lg md:text-base mt-2">{{ description }}</div>
    </div>

    <img
      :src="icon"
      :alt="title"
      class="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24"
      style="z-index: 1"
    />
  </div>
</template>
