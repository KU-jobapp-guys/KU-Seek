<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  selectedProf: string
  selectedCompany: string
}>()

const emits = defineEmits(['update:selectedProf', 'update:selectedCompany'])

const localProf = ref(props.selectedProf)
const localCompany = ref(props.selectedCompany)

// keep inputs in sync if parent resets them
watch(
  () => props.selectedProf,
  (v) => (localProf.value = v),
)
watch(
  () => props.selectedCompany,
  (v) => (localCompany.value = v),
)
</script>

<template>
  <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm flex flex-col gap-4">
    <!-- Professor search -->
    <div>
      <h3 class="text-sm font-semibold text-gray-700 mb-2">Search Professor</h3>
      <input
        type="text"
        placeholder="Type professor name..."
        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        v-model="localProf"
        @input="$emit('update:selectedProf', localProf)"
      />
    </div>

    <!-- Company search -->
    <div>
      <h3 class="text-sm font-semibold text-gray-700 mb-2">Search Company</h3>
      <input
        type="text"
        placeholder="Type company name..."
        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        v-model="localCompany"
        @input="$emit('update:selectedCompany', localCompany)"
      />
    </div>
  </div>
</template>
