<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  modelValue: string[]
  suggestions: string[]
  placeholder?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const input = ref('')
const inputEl = ref<HTMLInputElement | null>(null) // 👈 input reference
const isOpen = ref(false)
const activeIndex = ref(-1)
const listBoxId = `searchable-suggestions-${Math.random().toString(36).slice(2, 8)}`

const normalize = (s: string) => s.trim().toLowerCase()

// Filter suggestions: match query + exclude already selected
const filtered = computed(() => {
  const q = input.value.trim().toLowerCase()
  return props.suggestions.filter((s) => {
    const match = !q || s.toLowerCase().includes(q)
    const notSelected = !props.modelValue.some((v) => normalize(v) === normalize(s))
    return match && notSelected
  })
})

function addSuggestion(s: string) {
  const already = props.modelValue.some((v) => normalize(v) === normalize(s))
  if (!already) {
    emit('update:modelValue', [...props.modelValue, s])
  }
  input.value = ''
  isOpen.value = false
  activeIndex.value = -1
  inputEl.value?.blur() // 👈 auto blur after selecting
}

function removeTag(idx: number) {
  const next = props.modelValue.slice()
  next.splice(idx, 1)
  emit('update:modelValue', next)
}

function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
    isOpen.value = true
  }

  if (!isOpen.value) {
    if (e.key === 'Enter') e.preventDefault()
    return
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % filtered.value.length
    return
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value - 1 + filtered.value.length) % filtered.value.length
    return
  }
  if (e.key === 'Enter') {
    e.preventDefault()
    if (activeIndex.value >= 0 && activeIndex.value < filtered.value.length) {
      addSuggestion(filtered.value[activeIndex.value])
    }
    return
  }
  if (e.key === 'Escape') {
    isOpen.value = false
    activeIndex.value = -1
    return
  }
}

function onFocus() {
  isOpen.value = true
}

function onBlur() {
  setTimeout(() => {
    isOpen.value = false
    activeIndex.value = -1
  }, 150)
}

watch(filtered, (f) => {
  if (!f.length) activeIndex.value = -1
  else if (activeIndex.value >= f.length) activeIndex.value = 0
})
</script>

<template>
  <div class="w-full">
    <!-- Selected tags -->
    <div class="flex flex-wrap gap-2 mb-2">
      <span
        v-for="(tag, idx) in props.modelValue"
        :key="idx"
        class="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
      >
        {{ tag }}
        <button
          type="button"
          class="ml-2 text-blue-500 hover:text-blue-700"
          @click="removeTag(idx)"
        >
          ✕
        </button>
      </span>
    </div>

    <!-- Input -->
    <div class="relative">
      <input
        ref="inputEl"
        v-model="input"
        type="text"
        :placeholder="props.placeholder || 'Add a skill...'"
        class="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
        :aria-expanded="isOpen"
        :aria-controls="listBoxId"
      />

      <!-- Dropdown suggestions -->
      <ul
        v-if="isOpen && filtered.length > 0"
        :id="listBoxId"
        role="listbox"
        class="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
      >
        <li
          v-for="(s, idx) in filtered"
          :key="s"
          role="option"
          :aria-selected="activeIndex === idx"
          class="px-3 py-2 cursor-pointer hover:bg-blue-100"
          :class="{ 'bg-blue-200': activeIndex === idx }"
          @mousedown.prevent="addSuggestion(s)"
        >
          {{ s }}
        </li>
      </ul>
    </div>
  </div>
</template>
