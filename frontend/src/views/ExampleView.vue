<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <button
      @click="showSuccess"
      class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg m-2"
    >
      Show Success Toast
    </button>

    <button
      @click="showError"
      class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg m-2"
    >
      Show Error Toast
    </button>

    <ToastContainer ref="toastRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ToastContainer from '@/components/additions/ToastContainer.vue'

const toastRef = ref<InstanceType<typeof ToastContainer> | null>(null)

const showSuccess = () => {
  toastRef.value?.addToast('Action completed successfully!', 'success')
}

const showError = () => {
  toastRef.value?.addToast('An error occurred, please try again.', 'error')
}
</script>
