<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

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

// For image previews
const previews = ref<string[]>([])

watch(
  () => props.modelValue,
  (files) => {
    previews.value = files.map((file) => URL.createObjectURL(file))
  },
  { immediate: true },
)
</script>

<template>
  <!-- Upload Box -->
  <div class="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50">
    <input
      type="file"
      multiple
      accept="image/*"
      class="hidden"
      id="fileInput"
      @change="handleFiles(($event.target as HTMLInputElement).files)"
    />
    <label for="fileInput" class="cursor-pointer text-gray-500">Click to upload images</label>
  </div>

  <!-- Image Previews Outside -->
  <div class="mt-4 flex flex-wrap gap-4">
    <div v-for="(file, index) in modelValue" :key="index" class="relative">
      <!-- Thumbnail -->
      <img
        v-if="file.type.startsWith('image/')"
        :src="previews[index]"
        alt="Preview"
        class="w-24 h-24 object-cover rounded-lg border"
      />
      <!-- Filename with remove button -->
      <div class="mt-1 text-center text-sm flex justify-between items-center gap-1">
        <span class="text-black">{{ file.name }}</span>
        <button type="button" class="text-red-500 font-bold" @click="removeFile(index)">✕</button>
      </div>
    </div>
  </div>
</template>
