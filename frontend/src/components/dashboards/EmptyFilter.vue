<script setup lang="ts">
import { Search } from 'lucide-vue-next'

interface Props {
  clearFilters: () => void
}
const { clearFilters } = defineProps<Props>()
</script>

<template>
  <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
    <Search class="h-8 w-8 text-gray-400" />
  </div>
  <h3 class="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
  <p class="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
  <button
    @click="clearFilters"
    class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
  >
    Clear Filters
  </button>
</template>
