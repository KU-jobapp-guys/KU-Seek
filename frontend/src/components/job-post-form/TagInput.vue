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

const addTag = (): void => {
  const value = newTag.value.trim()
  if (value && !props.modelValue.includes(value)) {
    emit('update:modelValue', [...props.modelValue, value])
    newTag.value = ''
  }
}

const removeTag = (index: number): void => {
  const updated = [...props.modelValue]
  updated.splice(index, 1)
  emit('update:modelValue', updated)
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-2 p-2 border rounded-xl shadow-sm">
    <!-- Existing tags -->
    <div
      v-for="(tag, index) in modelValue"
      :key="index"
      class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center space-x-2"
    >
      <span>{{ tag }}</span>
      <button type="button" class="text-red-500 hover:text-red-700" @click="removeTag(index)">
        ✕
      </button>
    </div>

    <!-- Input and "+" button -->
    <div class="flex items-center flex-1 gap-2">
      <input
        v-model="newTag"
        :placeholder="placeholder || 'e.g. Urgent, Remote, Internship'"
        @keydown.enter.prevent
        class="flex-1 px-3 py-1 border-none outline-none text-black placeholder-gray-400"
      />

      <!-- Blue circular "+" button -->
      <button
        type="button"
        @click="addTag"
        class="flex items-center justify-center w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition"
        :disabled="!newTag.trim()"
        :class="{ 'opacity-50 cursor-not-allowed': !newTag.trim() }"
      >
        +
      </button>
    </div>
  </div>
</template>
