<script setup lang="ts">
import { ref, watch } from 'vue'
import { CircleCheck } from 'lucide-vue-next'
import type { ProfessorProfile } from '@/types/profileType'
import BaseBanner from './BaseBanner.vue'

const props = defineProps<{
  modelValue: ProfessorProfile
  professorData: ProfessorProfile
  isEditing: boolean
}>()
const { professorData, isEditing } = props
const editForm = ref<ProfessorProfile>({ ...props.modelValue })

const emits = defineEmits<{
  (e: 'edit'): void
  (e: 'update:modelValue', data: ProfessorProfile): void
}>()

watch(
  editForm,
  (newVal) => {
    emits('update:modelValue', newVal)
  },
  { deep: true },
)

const isOwner = professorData.id === '1'
</script>

<template>
  <BaseBanner
    :data="professorData"
    role="professor"
    v-model="editForm"
    :isEditing
    @edit="emits('edit')"
  >
    <div class="flex w-full justify-between items-end">
      <div class="flex flex-col w-full">
        <h1 class="flex flex-col md:flex-row md:items-end">
          <span class="font-bold text-4xl mr-2">{{
            professorData.first_name + ' ' + professorData.last_name
          }}</span>
        </h1>
        <p>{{ professorData.location }}</p>
      </div>

      <div class="flex items-center gap-2">
        <div
          v-if="professorData.is_verified"
          class="flex items-center gap-x-2 bg-green-600 text-white px-2 md:px-4 py-2 rounded-full"
        >
          <p class="hidden md:block">Verified</p>
          <CircleCheck />
        </div>

        <button
          v-if="isOwner && !professorData.is_verified"
          class="bg-gray-400 text-white px-4 py-2 rounded-full whitespace-nowrap hover:bg-gray-600/60"
        >
          Verify Account
        </button>
      </div>
    </div>
  </BaseBanner>
</template>
