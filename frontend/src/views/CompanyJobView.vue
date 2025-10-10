<script setup lang="ts">
import { useRoute } from 'vue-router'
import JobFull from '@/components/jobBoard/JobFull.vue'
import StudentBox from '@/components/jobBoard/StudentBox.vue'
import { onMounted } from 'vue'

const route = useRoute()

onMounted(() => {
  window.scrollTo({ top: 0 })
})
</script>

<template>
  <div class="px-[8vw] md:px-[12vw] mt-24">
    <!-- Job details -->
    <JobFull :jobId="route.params.id as string" />

    <!-- Student section -->
    <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-h-[500px] overflow-y-auto pr-2">
      <StudentBox
        :student="{
          id: '1',
          name: 'PERRY the platypus',
          gender: 'Male',
          age: 21,
          role: 'Software Developer',
          location: 'Bangkok, Thailand',
        }"
        @select="(id) => console.log('Selected student:', id)"
      />
      <StudentBox
        :student="{
          id: '2',
          name: 'PERRY the platypus 2',
          gender: 'Male',
          age: 21,
          role: 'Software Developer',
          location: 'Bangkok, Thailand',
        }"
        @select="(id) => console.log('Selected student:', id)"
      />
      <StudentBox
        :student="{
          id: '3',
          name: 'PERRY the platypus 3',
          gender: 'Male',
          age: 21,
          role: 'Software Developer',
          location: 'Bangkok, Thailand',
        }"
        @select="(id) => console.log('Selected student:', id)"
      />
      <StudentBox
        :student="{
          id: '4',
          name: 'PERRY the platypus 3',
          gender: 'Male',
          age: 21,
          role: 'Software Developer',
          location: 'Bangkok, Thailand',
        }"
        @select="(id) => console.log('Selected student:', id)"
      />
      <StudentBox
        :student="{
          id: '5',
          name: 'PERRY the platypus 3',
          gender: 'Male',
          age: 21,
          role: 'Software Developer',
          location: 'Bangkok, Thailand',
        }"
        @select="(id) => console.log('Selected student:', id)"
      />
      <StudentBox
        :student="{
          id: '6',
          name: 'PERRY the platypus 3',
          gender: 'Male',
          age: 21,
          role: 'Software Developer',
          location: 'Bangkok, Thailand',
        }"
        @select="(id) => console.log('Selected student:', id)"
      />
    </div>
  </div>
</template>
