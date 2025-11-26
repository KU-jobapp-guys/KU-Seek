<script setup lang="ts">
import { ref } from 'vue'
import Toast from '@/components/additions/AppToast.vue'

interface ToastItem {
  id: number
  message: string
  type: 'success' | 'error'
  duration?: number
}

const toasts = ref<ToastItem[]>([])

let idCounter = 0

const addToast = (message: string, type: 'success' | 'error', duration = 3000) => {
  const id = idCounter++
  toasts.value.push({ id, message, type, duration })
  setTimeout(() => removeToast(id), duration)
}

const removeToast = (id: number) => {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

defineExpose({ addToast })
</script>

<template>
  <div class="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :message="toast.message"
      :type="toast.type"
      :duration="toast.duration"
      @close="removeToast(toast.id)"
    />
  </div>
</template>