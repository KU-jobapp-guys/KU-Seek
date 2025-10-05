<script setup lang="ts">
import Tag from '@/components/dashboards/JobTag.vue'

defineProps<{
  company: string
  job: string
  place: string
  days: string
  description: string
  type: string
  cardClass?: string
  tags: Array<{ label: string; color: string; bg: string }>
}>()
</script>

<template>
  <div
    :class="[
      'group',
      'bg-white',
      'rounded-2xl',
      'shadow',
      'border-4',
      'p-6',
      'relative',
      'transition',
      'hover:shadow-xl',
      cardClass,
    ]"
  >
    <div class="text-gray-600 font-bold text-2xl mb-1 group-hover:text-white">
      {{ company }}
    </div>
    <div class="text-black font-bold text-4xl mb-2 group-hover:text-white">
      {{ job }}
    </div>

    <div class="flex items-center text-gray-600 text-lg mb-2 space-x-2 group-hover:text-white">
      <svg
        class="w-4 h-4 inline-block"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
      <span>{{ place }}</span>

      <svg
        class="w-4 h-4 inline-block ml-2"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3" />
      </svg>
      <span>{{ days }}</span>
    </div>

    <div class="text-gray-700 text-2xl mb-2 group-hover:text-white">
      {{ description }}
    </div>
    <div class="text-blue-500 font-semibold text-xl mb-2 group-hover:text-white">
      {{ type }}
    </div>

    <div class="flex flex-wrap gap-2 mb-4">
      <Tag
        v-for="tag in tags"
        :key="tag.label"
        :label="tag.label"
        :color="tag.color"
        :bg="tag.bg"
      />
    </div>

    <div class="mt-auto flex justify-end">
      <button
        class="bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 hover:scale-105 transition transform duration-200"
      >
        View Details
      </button>
    </div>
  </div>
</template>
