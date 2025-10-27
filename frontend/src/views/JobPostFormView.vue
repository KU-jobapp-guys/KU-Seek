<script setup lang="ts">
import type { Job } from '@/types/jobType'
import JobPostForm from '@/components/jobPostForm/JobPostForm.vue'
import { onMounted } from 'vue'

const handleSubmit = (payload: Partial<Job>): void => {
  console.log('Submitting Job Post:', payload)

  fetch('http://localhost:5000/api/jobposts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Job Post submitted:', data)
      alert('Job Post submitted successfully!')
    })
    .catch((err) => {
      console.error('Error submitting job post:', err)
      alert('Failed to submit job post.')
    })
}

onMounted(() => {
  scrollTo(0, 0)
})
</script>

<template>
  <JobPostForm @submit="handleSubmit" />
</template>
