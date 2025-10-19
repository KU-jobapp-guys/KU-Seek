<script setup lang="ts">
defineProps<{
  title: string
  value: number | string
  description: string
  icon: string
  cardClass?: string
  iconClass?: string
}>()
</script>

<template>
  <div :class="cardClass + ' border border-4 bg-white rounded-lg ring-8 ring-white/10 p-8 flex-1 relative overflow-hidden h-[140px] relative flex justify-between items-center'">
    <div class="flex flex-col">
      <div class="text-1xl">{{ title }}</div>
      <div class="text-4xl font-bold">{{ value }}</div>
      <!-- <div class="text-xl mt-2">{{ description }}</div> -->
    </div>

    <div :class="iconClass + ' shrink-0 rounded-full w-16 h-16 flex items-center justify-center p-4 text-white'">
      <component
        :is="icon"
        :alt="title"
        class="w-full h-full object-contain text-white"
        style="z-index: 1"
      />
    </div>
  </div>
</template>
