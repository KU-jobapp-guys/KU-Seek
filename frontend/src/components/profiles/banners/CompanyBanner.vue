<script setup lang="ts">
import type { CompanyProfile } from '@/types/companyType'
import { useRouter } from 'vue-router'
import BaseBanner from './BaseBanner.vue'

const router = useRouter()
const props = defineProps<{ 
  modelValue: CompanyProfile
  companyData: CompanyProfile
  isEditing: boolean
}>()
const { companyData, isEditing } = props

const emit = defineEmits<{
  (e: 'edit'): void
}>()

const goToJobBoard = () => {
  router.push({
    name: 'job board',
    query: { company: companyData.name },
  })
}
</script>

<template>
  <BaseBanner :data="companyData" role="company" v-model="props.modelValue" :isEditing @edit="emit('edit')">
    <div class="flex flex-col gap-y-4 md:flex-row md:justify-between md:items-end w-full">
      <div>
        <h1 class="font-semibold text-4xl">{{ companyData.name }}</h1>
        <p class="font-medium">{{ companyData.type }}</p>
        <p>{{ companyData.location }}</p>
      </div>

      <button
        class="bg-gray-400 text-white px-4 py-2 rounded-full whitespace-nowrap hover:bg-gray-600/60"
        @click="goToJobBoard"
      >
        See Jobs
      </button>
    </div>
  </BaseBanner>
</template>
