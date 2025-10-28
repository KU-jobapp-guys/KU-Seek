<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number
  label?: string
  placeholder?: string
  type?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', props.type === 'number' ? Number(target.value) : target.value)
}
</script>

<template>
  <div class="flex flex-col space-y-1">
    <label v-if="label" class="text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :type="type || 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      @input="handleInput"
      class="px-3 py-2 border text-black rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
    />
  </div>
</template>
