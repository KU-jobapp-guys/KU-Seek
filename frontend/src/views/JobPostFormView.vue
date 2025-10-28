<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Job } from '@/types/jobType'
import JobPostForm from '@/components/jobPostForm/JobPostForm.vue'
import ToastContainer from '@/components/additions/ToastContainer.vue'

const toastRef = ref<InstanceType<typeof ToastContainer> | null>(null)

const showSuccess = (msg = 'Action completed successfully!') =>
  toastRef.value?.addToast(msg, 'success')

const showError = (msg = 'An error occurred, please try again.') =>
  toastRef.value?.addToast(msg, 'error')

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
      showSuccess('Job Post submitted successfully!')
    })
    .catch((err) => {
      console.error('Error submitting job post:', err)
      showError('Failed to submit job post.')
    })
}

onMounted(() => {
  scrollTo(0, 0)
})
</script>

<template>
  <div>
    <JobPostForm @submit="handleSubmit" />
    <ToastContainer ref="toastRef" />
  </div>
</template>
