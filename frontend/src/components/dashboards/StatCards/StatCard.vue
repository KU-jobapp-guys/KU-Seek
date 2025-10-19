<script setup lang="ts">
import type { FunctionalComponent } from 'vue'

defineProps<{
  title: string
  value: number
  icon: FunctionalComponent
  cardClass?: string
  iconClass?: string
}>()
</script>

<template>
  <div :class="'border rounded-lg ring-8 ring-white/10 p-8 flex-1 relative overflow-hidden h-[140px] relative flex justify-between items-center ' + cardClass">
    <div class="flex flex-col">
      <div class="text-base">{{ title }}</div>
      <div class="text-4xl font-bold">{{ value }}</div>
      <!-- <div class="text-xl mt-2">{{ description }}</div> -->
    </div>

    <div :class="'shrink-0 rounded-full flex items-center justify-center text-white ' + iconClass">
      <component
        :is="icon"
        :alt="title"
        class="w-full h-full text-white"
      />
    </div>
  </div>
</template>
