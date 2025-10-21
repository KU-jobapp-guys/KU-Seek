<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  salaryMin: string
  salaryMax: string
}>()

const emit = defineEmits<{
  (e: 'update:salaryMin', value: string): void
  (e: 'update:salaryMax', value: string): void
  (e: 'validity', isValid: boolean): void
}>()

const error = ref<string>('')

// Validate salaries
const validate = () => {
  const min = Number(props.salaryMin) || 0
  const max = Number(props.salaryMax) || 0

  if (min < 0 || max < 0) {
    error.value = 'Salary cannot be negative.'
    emit('validity', false)
  } else if (min === 0 || max === 0) {
    error.value = 'Salary cannot be zero.'
    emit('validity', false)
  } else if (min && max && max < min) {
    error.value = 'Maximum salary cannot be less than minimum salary.'
    emit('validity', false)
  } else {
    error.value = ''
    emit('validity', true)
  }
}

watch(() => [props.salaryMin, props.salaryMax], validate, { immediate: true })

// Sanitize input (digits only)
const sanitizeValue = (raw: string) => {
  return raw.replace(/[^\d]/g, '')
}

// Prevent invalid typing
const handleKeydown = (e: KeyboardEvent) => {
  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete']
  if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
    e.preventDefault()
  }
}

// Handle input + sanitize
const handleInput = (event: Event, field: 'min' | 'max') => {
  const input = event.target as HTMLInputElement
  let value = sanitizeValue(input.value)

  if (Number(value) < 0) value = '0'

  input.value = value
  if (field === 'min') {
    emit('update:salaryMin', value)
  } else {
    emit('update:salaryMax', value)
  }
}
</script>

<template>
  <div class="flex flex-col space-y-1">
    <label class="text-sm font-medium text-gray-700">Salary</label>
    <div class="flex items-center gap-3">
      <!-- Min -->
      <div class="relative flex-1">
        <input
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          :value="salaryMin"
          placeholder="e.g. 80000"
          @keydown="handleKeydown"
          @input="handleInput($event, 'min')"
          class="text-black w-full px-3 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-6"
        />
        <span class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
      </div>

      <span class="text-gray-600">-</span>

      <!-- Max -->
      <div class="relative flex-1">
        <input
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          :value="salaryMax"
          placeholder="e.g. 100000"
          @keydown="handleKeydown"
          @input="handleInput($event, 'max')"
          class="text-black w-full px-3 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-6"
        />
        <span class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
      </div>
    </div>

    <!-- Inline Error -->
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>
