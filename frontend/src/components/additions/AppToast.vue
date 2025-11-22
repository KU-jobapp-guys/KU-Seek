<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { CheckCircle, AlertTriangle } from 'lucide-vue-next'

interface Props {
  message: string
  type: 'success' | 'error'
  duration?: number // ms
}

const props = defineProps<Props>()

const visible = ref(true)

const dismiss = () => {
  visible.value = false
}

const icon = computed(() => {
  return props.type === 'success' ? CheckCircle : AlertTriangle
})

const toastColor = computed(() => {
  return props.type === 'success'
    ? 'bg-green-600 border-l-4 border-green-400'
    : 'bg-red-600 border-l-4 border-red-400'
})

onMounted(() => {
  setTimeout(() => {
    dismiss()
  }, props.duration || 3000)
})
</script>

<template>
  <transition
    name="toast-fade"
    enter-active-class="transition-all duration-500 ease-out"
    leave-active-class="transition-all duration-500 ease-in"
    enter-from-class="opacity-0 translate-y-4"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div
      v-if="visible"
      :class="[
        'fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium',
        toastColor,
      ]"
      role="alert"
    >
      <component :is="icon" class="w-5 h-5" />
      <span>{{ message }}</span>
      <button @click="dismiss" class="ml-3 text-white/80 hover:text-white">✕</button>
    </div>
  </transition>
</template>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.4s ease;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
