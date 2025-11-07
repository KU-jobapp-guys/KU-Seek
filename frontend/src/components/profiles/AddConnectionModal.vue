<script setup lang="ts">
import { mockCompany } from '@/data/mockCompany'
import { X, Check } from 'lucide-vue-next'
import { onMounted, ref, computed } from 'vue'
import type { CompanyProfile } from '@/types/profileType'
import ConnectCompany from './ConnectCompany.vue'

const allCompanies = ref<CompanyProfile[]>([])
const searchTerm = ref('')
const selectedCompanyId = ref<string | null>(null)

const emit = defineEmits<{
  close: []
}>()

const filteredCompanies = computed(() => {
  if (!searchTerm.value.trim()) {
    return allCompanies.value
  }
  
  const lowercasedTerm = searchTerm.value.toLowerCase()
  return allCompanies.value.filter((company) =>
    company.name.toLowerCase().includes(lowercasedTerm)
  )
})

const selectCompany = (companyId: string) => {
  selectedCompanyId.value = companyId
}

const confirmConnection = () => {
  console.log('Confirmed connection with company ID:', selectedCompanyId.value)
  emit('close')
}

const loadAllCompanies = () => {
  // In real implementation, fetch from API
  allCompanies.value = mockCompany
}

onMounted(() => {
  loadAllCompanies()
})
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center z-50 p-4">
    <!-- Backdrop -->
    <div
      @click="emit('close')"
      class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
    ></div>

    <!-- Modal -->
    <div
      class="relative bg-white rounded-xl shadow-2xl z-50 max-w-2xl w-full flex flex-col overflow-hidden max-h-[90vh]"
    >
      <!-- Orange Accent Bar -->
      <div class="bg-orange-500 h-2 w-full" />

      <!-- Close Button -->
      <button
        @click="emit('close')"
        class="absolute top-6 right-6 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
      >
        <X class="w-5 h-5 text-gray-500 hover:text-gray-700" />
      </button>

      <!-- Header -->
      <div class="px-6 pt-6 pb-4 border-b border-gray-200">
        <h3 class="text-2xl font-bold text-gray-900 pr-8">Create New Connection</h3>
        <p class="text-gray-600 mt-1 text-sm">
          Select a company you have a connection with to add to your profile
        </p>

        <!-- Search Input -->
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search company by name..."
          class="mt-4 w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
        />
      </div>

      <!-- Company List -->
      <div class="px-6 py-4 bg-gray-50 flex-1 overflow-hidden">
        <div class="max-h-[50vh] overflow-y-auto space-y-3 px-2 py-2">
          <div
            v-if="filteredCompanies.length === 0"
            class="text-center py-12 text-gray-500"
          >
            <p class="text-lg font-medium">No companies found</p>
            <p class="text-sm mt-2">Try a different search term</p>
          </div>

          <div
            v-for="company in filteredCompanies"
            :key="company.id"
            @click="selectCompany(company.id)"
            :class="[
              'cursor-pointer rounded-xl overflow-hidden',
              selectedCompanyId === company.id
                ? 'ring-2 ring-orange-500 shadow-md'
                : 'hover:ring-2 hover:ring-gray-300'
            ]"
          >
            <div class="relative">
              <!-- Selected Indicator -->
              <div
                v-if="selectedCompanyId === company.id"
                class="absolute top-3 right-3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center z-10 shadow-lg"
              >
                <Check class="w-5 h-5 text-white" />
              </div>

              <ConnectCompany :company="company" />
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="px-6 py-4 bg-white border-t border-gray-200 flex justify-end gap-3">
        <button
          @click="emit('close')"
          class="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          @click="confirmConnection"
          :disabled="!selectedCompanyId"
          :class="[
            'px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2',
            selectedCompanyId
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          Confirm Connection
        </button>
      </div>
    </div>
  </div>
</template>