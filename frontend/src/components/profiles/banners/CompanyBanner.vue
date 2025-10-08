<script setup lang="ts">
import { ref, watch } from 'vue'
import type { CompanyProfile } from '@/types/profileType'
import { useRouter } from 'vue-router'
import BaseBanner from './BaseBanner.vue'

const router = useRouter()
const props = defineProps<{
  modelValue: CompanyProfile
  companyData: CompanyProfile
  isEditing: boolean
}>()

const emits = defineEmits<{
  (e: 'edit'): void
  (e: 'update:modelValue', data: CompanyProfile): void
}>()

const { companyData, isEditing } = props
const editForm = ref<CompanyProfile>({ ...props.modelValue })

watch(
  editForm,
  (newVal) => {
    emits('update:modelValue', newVal)
  },
  { deep: true },
)

const goToJobBoard = () => {
  router.push({
    name: 'job board',
    query: { company: companyData.name },
  })
}
</script>

<template>
  <BaseBanner
    :data="companyData"
    role="company"
    v-model="editForm"
    :isEditing
    @edit="emits('edit')"
  >
    <div class="flex flex-col gap-y-4 md:flex-row md:justify-between md:items-end w-full">
      <div>
        <h1 class="font-semibold text-4xl">{{ companyData.name }}</h1>
        <p class="font-medium">{{ companyData.type }}</p>
        <p>{{ companyData.location }}</p>
      </div>

      <button
        class="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 md:to-blue-700 text-white px-4 py-2 rounded-full whitespace-nowrap hover:md:to-blue-500 hover:to-blue-600 hover:via-blue-500"
        @click="goToJobBoard"
      >
        See Jobs
      </button>
    </div>
  </BaseBanner>
</template>
