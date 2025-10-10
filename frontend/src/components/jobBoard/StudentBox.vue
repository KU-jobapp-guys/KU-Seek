<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

type Student = {
  id: string
  name: string
  gender: string
  age: number
  role: string
  location: string
  avatar: string
}

const props = defineProps<{ student: Student }>()
const emit = defineEmits<{ (e: 'select', id: string): void }>()

function handleStudentSelected() {
  emit('select', props.student.id)
}
</script>

<template>
  <div
    class="h-full bg-white px-8 py-6 w-full mb-4 rounded-md shadow-md cursor-pointer flex flex-col items-center"
    @click="handleStudentSelected"
  >
    <!-- Avatar -->
    <div class="relative">
      <img
        :src="student.avatar"
        alt="Student Avatar"
        class="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
      />
    </div>

    <!-- Info -->
    <div class="text-center mt-4">
      <p class="text-lg font-bold">
        {{ student.name }}
        <span class="font-normal text-gray-600">({{ student.gender }}, {{ student.age }}y)</span>
      </p>
      <p class="text-gray-700">{{ student.role }}</p>
      <p class="text-gray-500">{{ student.location }}</p>
    </div>

    <!-- Button -->
    <button class="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
      View Details
    </button>
  </div>
</template>
