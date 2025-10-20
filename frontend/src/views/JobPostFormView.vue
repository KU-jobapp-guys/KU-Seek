<script setup lang="ts">
import { ref } from 'vue'
import JobPostForm from '@/components/job-post-form/JobPostForm.vue'

// Form state
const jobPost = ref({
  company: '',
  role: '',
  location: '',
  postTime: '',
  description: '',
  jobType: '',
  skills: [] as string[],
  tags: [] as string[],
  salaryMin: '',
  salaryMax: '',
  contacts: [] as { type: string; link: string }[],
})

const handleSubmit = (): void => {
  const payload = {
    ...jobPost.value,
    salary: `${jobPost.value.salaryMin} - ${jobPost.value.salaryMax}`,
  }

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
</script>

<template>
  <JobPostForm @submit="handleSubmit"/>
</template>
