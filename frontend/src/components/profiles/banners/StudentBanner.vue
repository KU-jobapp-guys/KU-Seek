<script setup lang="ts">
import { CircleCheck } from 'lucide-vue-next'
import type { StudentProfile } from '@/types/studentType'
import BaseBanner from './BaseBanner.vue'

const props = defineProps<{ 
  studentData: StudentProfile 
  isEditing: boolean
}>()
const { studentData, isEditing } = props

const emit = defineEmits<{
  (e: 'edit'): void
}>()

const isOwner = studentData.id === '1'
</script>

<template>
  <BaseBanner :data="studentData" role="student" :isEditing="isEditing" @edit="emit('edit')">
    <div class="flex flex-col w-full">
      <h1 class="font-bold text-4xl mr-2">{{
        studentData.first_name + ' ' + studentData.last_name
      }}</h1>
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
            v-if="isOwner && !studentData.is_verified"
            class="text-base bg-gray-400 text-white px-4 py-2 rounded-full whitespace-nowrap hover:bg-gray-600/60"
          >
            <span class="hidden md:block">Verify Account</span>
            <span class="block md:hidden">Verify</span>
          </button>
        </div>
      </div>
    </div>
  </BaseBanner>
</template>
