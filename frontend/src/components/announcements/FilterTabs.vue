<script setup lang="ts">
const filters = ['All', 'Connections', 'Meetings', 'Events', 'General']
const model = defineModel<'All' | 'Connections' | 'Meetings' | 'Events' | 'General'>()
</script>

<template>
  <div class="flex flex-wrap gap-2 mt-4">
    <button
      v-for="f in filters"
      :key="f"
      @click="model = f"
      class="px-4 py-1 rounded-full border transition"
      :class="
        model === f
          ? 'bg-green-600 text-white border-green-600'
          : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-green-50'
      "
    >
      {{ f }}
    </button>
  </div>
</template>
