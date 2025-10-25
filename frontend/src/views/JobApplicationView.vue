<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import JobApplicationForm from '@/components/jobApplication/JobApplicationForm.vue'
import { fetchJobs } from '@/services/jobService'

const route = useRoute()
import type { Job } from '@/types/jobType'

const job = ref<Job | null>(null)

onMounted(async () => {
  const list = await fetchJobs()
  job.value = list.find((j) => j.jobId === route.params.id) ?? null
})
</script>

<template>
  <div class="px-[8vw] md:px-[12vw] mt-24">
    <JobApplicationForm v-if="job" :job="job" />
    <p v-else>Job not found.</p>
  </div>
</template>
