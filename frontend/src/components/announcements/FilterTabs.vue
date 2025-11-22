<script setup lang="ts">
import { ref, watch } from 'vue'
import { SearchIcon } from 'lucide-vue-next'
import ToastContainer from '@/components/additions/ToastContainer.vue'

const toastRef = ref<InstanceType<typeof ToastContainer> | null>(null)
const showSuccess = (msg: string) => toastRef.value?.addToast(msg, 'success')

const props = defineProps<{
  selectedProf: string
  selectedCompany: string
}>()

const emits = defineEmits(['update:selectedProf', 'update:selectedCompany'])

const localProf = ref(props.selectedProf)
const localCompany = ref(props.selectedCompany)

watch(
  () => props.selectedProf,
  (v) => (localProf.value = v),
)
watch(
  () => props.selectedCompany,
  (v) => (localCompany.value = v),
)

function clearFilters() {
  localProf.value = ''
  localCompany.value = ''
  emits('update:selectedProf', '')
  emits('update:selectedCompany', '')
  showSuccess('Reset filters successfully!')
}
</script>

<template>
  <!-- Container -->
  <div
    class="relative mx-auto -mt-24 md:-mt-36 z-20 bg-gradient-to-br from-white via-gray-50 to-blue-50/70 backdrop-blur-sm shadow-2xl overflow-hidden"
  >
    <!-- Top gradient bar -->
    <div class="h-4 w-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600"></div>

    <!-- Inner content -->
    <div class="p-6 md:p-8 flex flex-col gap-6">
      <!-- Professor Search -->
      <div class="flex-1">
        <label class="block text-sm font-semibold text-gray-700 mb-1 ml-2">
          Search Professor
        </label>
        <div class="relative">
          <input
            v-model="localProf"
            type="text"
            placeholder="Type professor name..."
            @input="$emit('update:selectedProf', localProf)"
            class="w-full px-4 py-2 bg-white/90 border-2 border-gray-200 rounded-2xl shadow-sm hover:shadow-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-gray-700"
          />
          <SearchIcon
            class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          />
        </div>
      </div>

      <!-- Company Search -->
      <div class="flex-1">
        <label class="block text-sm font-semibold text-gray-700 mb-1 ml-2"> Search Company </label>
        <div class="relative">
          <input
            v-model="localCompany"
            type="text"
            placeholder="Type company name..."
            @input="$emit('update:selectedCompany', localCompany)"
            class="w-full px-4 py-2 bg-white/90 border-2 border-gray-200 rounded-2xl shadow-sm hover:shadow-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-gray-700"
          />
          <SearchIcon
            class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          />
        </div>
      </div>

      <!-- Reset Button -->
      <div class="flex justify-end items-end">
        <button
          @click="clearFilters"
          class="bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-semibold py-2 px-6 rounded-2xl border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
  <ToastContainer ref="toastRef" />
</template>
