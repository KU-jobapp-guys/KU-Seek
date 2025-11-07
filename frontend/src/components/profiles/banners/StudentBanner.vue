<script setup lang="ts">
import { ref, watch } from 'vue'
import { CircleCheck } from 'lucide-vue-next'
import type { StudentProfile } from '@/types/profileType'
import { isOwner } from '@/libs/userUtils'
import BaseBanner from './BaseBanner.vue'

const props = defineProps<{
  modelValue: StudentProfile
  studentData: StudentProfile
  isEditing: boolean
}>()
const { studentData, isEditing } = props
const editForm = ref<StudentProfile>({ ...props.modelValue })

const emits = defineEmits<{
  (e: 'edit'): void
  (e: 'update:modelValue', data: StudentProfile): void
}>()

watch(
  editForm,
  (newVal) => {
    emits('update:modelValue', newVal)
  },
  { deep: true },
)
</script>

<template>
  <BaseBanner
    :data="studentData"
    v-model="editForm"
    role="student"
    :isEditing
    @edit="emits('edit')"
  >
    <div class="flex flex-col w-full">
      <h1 class="font-bold text-4xl mr-2">
        {{ studentData.first_name + ' ' + studentData.last_name }}
      </h1>
      <div class="flex w-full justify-between items-end">
        <div class="flex flex-col w-full">
          <p class="font-semibold">({{ studentData.gender }}, {{ studentData.age }})</p>
          <p>{{ studentData.location }}</p>
        </div>

        <div class="flex items-center gap-2">
          <div
            v-if="studentData.is_verified"
            class="flex items-center gap-x-2 bg-green-600 text-white px-2 md:px-4 py-2 rounded-full"
          >
            <p class="hidden md:block">Verified</p>
            <CircleCheck />
          </div>

          <button
            v-if="isOwner(studentData.user_id) && !studentData.is_verified"
            class="text-base bg-red-600 text-white px-4 py-2 rounded-full whitespace-nowrap hover:bg-gray-600/60 hover:bg-red-500"
          >
            <span class="hidden md:block">Verify Your Account</span>
            <span class="block md:hidden">Verify</span>
          </button>
        </div>
      </div>
    </div>
  </BaseBanner>
</template>
