<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue: string[]
  suggestions: string[]
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const input = ref('')
const showSuggestions = ref(false)

const filteredSuggestions = computed(() => {
  if (!input.value.trim()) return []
  return props.suggestions.filter(
    (s) => s.toLowerCase().includes(input.value.toLowerCase()) && !props.modelValue.includes(s),
  )
})

const addTag = (tag: string) => {
  if (tag && !props.modelValue.includes(tag)) {
    emit('update:modelValue', [...props.modelValue, tag])
  }
  input.value = ''
  showSuggestions.value = false
}

const removeTag = (tag: string) => {
  emit(
    'update:modelValue',
    props.modelValue.filter((t) => t !== tag),
  )
}
</script>

<template>
  <div class="w-full">
    <!-- Selected Tags -->
    <div class="flex flex-wrap gap-2 mb-2">
      <span
        v-for="tag in modelValue"
        :key="tag"
        class="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl text-sm flex items-center"
      >
        {{ tag }}
        <button type="button" @click="removeTag(tag)" class="ml-2 text-red-500 hover:text-red-700">
          ✕
        </button>
      </span>
    </div>

    <!-- Input -->
    <div class="relative">
      <input
        v-model="input"
        :placeholder="placeholder || 'Search or add a skill...'"
        @focus="showSuggestions = true"
        @blur="setTimeout(() => (showSuggestions = false), 200)"
        @keyup.enter.prevent="addTag(input)"
        class="w-full px-3 py-2 border text-black rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      />

      <!-- Suggestions -->
      <ul
        v-if="showSuggestions && filteredSuggestions.length"
        class="absolute left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg z-10 max-h-40 overflow-auto"
      >
        <li
          v-for="s in filteredSuggestions"
          :key="s"
          @click="addTag(s)"
          class="px-3 py-2 hover:bg-blue-50 cursor-pointer"
        >
          {{ s }}
        </li>
      </ul>
    </div>
  </div>
</template>
