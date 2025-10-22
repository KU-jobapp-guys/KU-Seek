<script setup lang="ts">
import { useRoute } from 'vue-router'
import { mockJobs } from '@/data/mockJobs'
import JobApplicationForm from '@/components/jobApplication/JobApplicationForm.vue'

const route = useRoute()
const job = mockJobs.find((j) => j.jobId === route.params.id)
</script>

<template>
  <div class="px-[8vw] md:px-[12vw] mt-24">
    <JobApplicationForm v-if="job" :job="job" />
    <p v-else>Job not found.</p>
  </div>
</template>
