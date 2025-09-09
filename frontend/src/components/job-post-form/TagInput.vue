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
  if (newTag.value.trim() !== '') {
    emit('update:modelValue', [...props.modelValue, newTag.value.trim()])
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
  <div class="flex flex-wrap gap-2 p-2 border rounded-xl shadow-sm">
    <div
      v-for="(tag, index) in modelValue"
      :key="index"
      class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center space-x-2"
    >
      <span>{{ tag }}</span>
      <button type="button" class="text-red-500" @click="removeTag(index)">✕</button>
    </div>

    <input
      v-model="newTag"
      :placeholder="placeholder"
      @keyup.enter.prevent="addTag"
      class="flex-1 px-2 py-1 outline-none text-black"
    />
    <button type="button" class="text-blue-600 font-bold" @click="addTag">+</button>
  </div>
</template>
