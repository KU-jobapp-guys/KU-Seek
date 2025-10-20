<script setup lang="ts">
import { useRoute } from 'vue-router'
import JobFull from '@/components/jobBoard/JobFull.vue'
import { onMounted, ref } from 'vue'
import JobPostForm from '@/components/job-post-form/JobPostForm.vue'
import type { Job } from '@/types/jobType'
import { mockJobs } from '@/data/mockJobs'


const route = useRoute()
const isEditing = ref(false)
const initialData = ref<Job | null>()

const startEditing = () => {
  isEditing.value = true
  initialData.value = mockJobs.find((j) => j.jobId === route.params.id) || null
}

const cancelEditing = () => {
  isEditing.value = false
}

const updateEditing = (payload: Partial<Job>) => {
  isEditing.value = false
  console.log("update job posting with data: ", payload)
}

onMounted(() => {
  window.scrollTo({ top: 0 })
})
</script>

<template>
  <div v-if="!isEditing" class="px-[6vw] md:px-[12vw] mt-24">
    <JobFull :jobId="route.params.id as string" @edit="startEditing" />
  </div>

  <JobPostForm v-else-if="initialData" :initialData="initialData" @submit="updateEditing" @cancel="cancelEditing"/>
</template>
