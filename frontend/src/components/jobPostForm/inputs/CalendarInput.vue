<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: string 
}>()

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const minDate = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
})

const localValue = computed({
  get: () => props.modelValue ?? '',
  set: (v: string) => emit('update:modelValue', v),
})
</script>

<template>
  <div class="flex flex-col">
    <label class="text-sm font-medium text-gray-700 mb-1">End Date</label>
    <input
      type="date"
      :min="minDate"
      v-model="localValue"
      class="px-3 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
    />
    <p class="text-xs text-gray-400 mt-1">Please select the date.</p>
  </div>
</template>

<style scoped>

</style>
