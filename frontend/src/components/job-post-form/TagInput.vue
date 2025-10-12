<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: string[]
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const newTag = ref('')
const error = ref('')

// --- Add Tag ---
const addTag = (): void => {
  const value = newTag.value.trim()
  error.value = ''

  if (!value) {
    error.value = 'Please fill out all fields.'
    return
  }

  if (props.modelValue.includes(value)) {
    error.value = 'This tag already exists.'
    return
  }

  emit('update:modelValue', [...props.modelValue, value])
  newTag.value = ''
}

// --- Remove Tag ---
const removeTag = (index: number): void => {
  const updated = [...props.modelValue]
  updated.splice(index, 1)
  emit('update:modelValue', updated)
}
</script>

<template>
  <div class="space-y-3">
    <!-- Existing Tags -->
    <div class="flex flex-wrap gap-2">
      <div
        v-for="(tag, index) in modelValue"
        :key="index"
        class="flex items-center gap-2 px-3 py-1 bg-gray-200 text-black rounded-lg text-sm"
      >
        <span>{{ tag }}</span>
        <button type="button" class="text-red-500 hover:text-red-700" @click="removeTag(index)">
          ✕
        </button>
      </div>
    </div>

    <!-- New Tag Input (matches Contact input layout) -->
    <div class="flex gap-2">
      <input
        v-model="newTag"
        :placeholder="placeholder || 'Enter tag (e.g. Urgent, Remote, Internship)'"
        class="flex-1 px-3 py-2 border rounded-xl text-black placeholder-gray-400"
        @keydown.enter.prevent
      />

      <button
        type="button"
        class="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        @click="addTag"
      >
        +
      </button>
    </div>

    <!-- Error Message -->
    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
  </div>
</template>
