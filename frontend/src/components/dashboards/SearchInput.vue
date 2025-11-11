<script setup lang="ts">
import { ref, watch } from 'vue'
import { Search } from 'lucide-vue-next'

// Props
const props = defineProps<{
  modelValue: string
  placeholder?: string
  label?: string
}>()

// Emit v-model update
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search', value: string): void
}>()

const searchValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => (searchValue.value = newVal),
)

watch(searchValue, (val) => emit('update:modelValue', val))

function handleSearch() {
  emit('search', searchValue.value.trim())
}
</script>

<template>
  <div class="flex flex-col w-full gap-2">
    <!-- Label -->
    <label v-if="label" class="text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <!-- Search Box -->
    <div
      class="relative flex items-center border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition"
    >
      <Search class="absolute left-3 h-5 w-5 text-gray-400" />

      <input
        v-model="searchValue"
        type="text"
        :placeholder="placeholder || 'Search by job title, company, or location...'"
        @keyup.enter="handleSearch"
        class="w-full py-2 pl-10 pr-4 text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
      />
    </div>
  </div>
</template>

