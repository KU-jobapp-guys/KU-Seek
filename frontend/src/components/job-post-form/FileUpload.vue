<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: File[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: File[]): void
}>()

const handleFiles = (files: FileList | null): void => {
  if (files) {
    emit('update:modelValue', [...props.modelValue, ...Array.from(files)])
  }
}

const removeFile = (index: number): void => {
  const updated = [...props.modelValue]
  updated.splice(index, 1)
  emit('update:modelValue', updated)
}
</script>

<template>
  <div class="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50">
    <input
      type="file"
      multiple
      class="hidden"
      id="fileInput"
      @change="handleFiles(($event.target as HTMLInputElement).files)"
    />
    <label for="fileInput" class="cursor-pointer text-gray-500">
      Click to upload images or drag and drop
    </label>

    <div class="mt-4 flex flex-wrap gap-2">
      <div
        v-for="(file, index) in modelValue"
        :key="index"
        class="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg"
      >
        <span class="text-sm">{{ file.name }}</span>
        <button type="button" class="text-red-500" @click="removeFile(index)">✕</button>
      </div>
    </div>
  </div>
</template>
