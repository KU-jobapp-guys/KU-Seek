<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mockCompany } from '@/data/mockCompany'
import { mockJobs } from '@/data/mockJobs'
import { mockJobApplications } from '@/data/mockApplicants'
import type { Job } from '@/types/jobType'
import type { JobApplication } from '@/types/applicationType'

const route = useRoute()
const router = useRouter()

const jobDetail = ref<Job>()
const applicantsList = ref<JobApplication[]>()

async function loadJob(id?: string) {
  if (!id) {
    router.replace({ name: 'not found' })
    return
  }

  jobDetail.value = mockJobs.find((j) => j.jobId === id)
  applicantsList.value = mockJobApplications.filter((a) => a.job_id === id)

  if (!jobDetail.value) {
    router.replace({ name: 'not found' })
  }
}

async function loadApplicants(id?: string) {
  if (!id) {
    router.replace({ name: 'not found' })
    return
  }

  applicantsList.value = []
}


onMounted(() => {
  let jobId = route.params.id as string
  loadJob(jobId)
  loadApplicants(jobId)
  window.scrollTo({ top: 0 })
})

</script>

<template>
  <section>
    <!-- Job Detail Section -->
  </section>

  <section>
    <!-- Applicants Section -->
  </section>
</template>