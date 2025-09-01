<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  salaryMin: string
  salaryMax: string
}>()

const emit = defineEmits<{
  (e: 'update:salaryMin', value: string): void
  (e: 'update:salaryMax', value: string): void
}>()
</script>

<template>
  <div class="flex flex-col space-y-1">
    <label class="text-sm font-medium text-gray-700">Salary</label>
    <div class="flex items-center gap-3">
      <!-- Min -->
      <div class="relative flex-1">
        <input
          type="number"
          :value="salaryMin"
          placeholder="e.g. 80000"
          @input="emit('update:salaryMin', ($event.target as HTMLInputElement).value)"
          class="text-black w-full px-3 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-6"
        />
        <span class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
      </div>

      <span class="text-gray-600">-</span>

      <!-- Max -->
      <div class="relative flex-1">
        <input
          type="number"
          :value="salaryMax"
          placeholder="e.g. 100000"
          @input="emit('update:salaryMax', ($event.target as HTMLInputElement).value)"
          class="text-black w-full px-3 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-6"
        />
        <span class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
      </div>
    </div>
  </div>
</template>
