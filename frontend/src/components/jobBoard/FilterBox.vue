<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { dropdownConfig, textConfig } from '@/assets/configs/jobFilterConfig'
import type { FilterKeys } from '@/assets/configs/jobFilterConfig'
import { ChevronDownIcon } from 'lucide-vue-next'

type Filters = Record<FilterKeys, string>

const filters = reactive<Filters>({
  role: '',
  tags: '',
  company: '',
  jobLevel: '',
  location: '',
  jobType: '',
})

const emit = defineEmits<{
  (e: 'applyFilter', filters: Partial<Filters>): void
}>()

const allFields = [...dropdownConfig, ...textConfig]

const initializeFilters = () => {
  allFields.forEach((field) => {
    const key = field.key as FilterKeys
    if (!(key in filters)) {
      filters[key] = ''
    }
  })
}

onMounted(() => {
  initializeFilters()
})

const applyFilters = () => {
  emit('applyFilter', filters)
}

const clearFilters = () => {
  ;(Object.keys(filters) as FilterKeys[]).forEach((key) => {
    filters[key] = ''
  })
  emit('applyFilter', filters)
}
</script>

<template>
  <div
    class="bg-gradient-to-br from-white via-gray-50 to-blue-50/70 backdrop-blur-sm shadow-2xl overflow-hidden"
  >
    <div class="h-4 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600"></div>

    <div class="p-8 flex flex-col gap-y-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        <!-- Dynamic Text Inputs -->
        <div v-for="textField in textConfig" :key="textField.key" class="group">
          <label class="block text-sm font-semibold text-gray-700 mb-1 ml-2">
            {{ textField.label }}
          </label>
          <div class="relative">
            <input
              v-model="filters[textField.key as FilterKeys]"
              type="text"
              :placeholder="textField.placeholder"
              class="w-full px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-sm hover:shadow-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-gray-700"
            />
          </div>
        </div>

        <!-- Dropdowns -->
        <div v-for="dropdown in dropdownConfig" :key="dropdown.key" class="group">
          <label class="block text-sm font-semibold text-gray-700 mb-1 ml-2">
            {{ dropdown.label }}
          </label>

          <div class="relative">
            <select
              v-model="filters[dropdown.key as FilterKeys]"
              class="w-full px-4 py-2 bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl shadow-sm hover:shadow-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 appearance-none cursor-pointer text-gray-700"
            >
              <option value="">{{ dropdown.placeholder }}</option>
              <option v-for="option in dropdown.options" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>

            <div class="absolute inset-y-0 right-0 flex items-center pr-4">
              <ChevronDownIcon class="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4">
        <button
          @click="applyFilters"
          class="flex-1 group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white font-bold py-2 px-8 rounded-2xl shadow-lg hover:shadow-xl"
        >
          Apply Filters
        </button>

        <button
          @click="clearFilters"
          class="sm:flex-none bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-semibold py-2 px-6 rounded-2xl border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md flex items-center justify-center"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>
