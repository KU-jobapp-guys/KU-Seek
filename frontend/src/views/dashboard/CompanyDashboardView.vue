<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/layouts/AppHeader.vue'
import DashboardStatCard from '@/components/dashboards/DashboardStatCard.vue'
import JobCard from '@/components/jobBoard/JobBox.vue'

import jobPostIcon from '@/assets/job-post-icon.svg'
import appliedIcon from '@/assets/applied-icon.svg'

import type { Job } from '@/assets/type'
// import your API function instead of mockJobs
// import { getTotalJobs, getApplicationJobs, getProfileView} from '@/api/jobs'

type Section = 'total' | 'application'

const openSection = ref<Section>('total')
const router = useRouter()
const profileView = ref<number>(0)

const totalJobs = ref<Job[]>([])
const applicationJobs = ref<Job[]>([])

// Toggle section
const toggleSection = (section: Section) => {
  openSection.value = section
}

// Navigate to job details
const handleSelect = (id: string) => {
  router.push(`/company/job/${id}`)
}

// Fetch jobs from API
async function fetchJobs() {
  try {
    // Replace these with real API calls
    // totalJobs.value = await getTotalJobs()
    // applicationJobs.value = await getApplicationJobs()
    // profileView = await getProfileView()

    // For demo using mockJobs
    import('@/data/mockJobs').then(({ mockJobs }) => {
      totalJobs.value = mockJobs.slice(0, 5)
      applicationJobs.value = mockJobs.slice(5, 10)
    })
    profileView.value = 237
  } catch (error) {
    console.error('Failed to fetch jobs:', error)
  }
}

onMounted(() => {
  fetchJobs()
})
</script>

<template>
  <div class="dashboard-bg min-h-screen pb-0">
    <Header page="studentDashboard" />

    <!-- Dashboard Stat Cards -->
    <div
      class="relative -mt-16 md:-mt-24 px-[6vw] md:px-[10vw] grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-10"
    >
      <div class="cursor-pointer" @click="toggleSection('total')">
        <DashboardStatCard
          title="Total Job Posts"
          :value="totalJobs.length"
          description="Approved Job Posts"
          :icon="jobPostIcon"
          :cardClass="
            openSection === 'total'
              ? 'bg-red-600 rounded-md text-white shadow-md overflow-hidden'
              : 'bg-red-400 rounded-md text-white shadow-md overflow-hidden'
          "
        />
      </div>

      <div class="cursor-pointer" @click="toggleSection('application')">
        <DashboardStatCard
          title="Totel Job Applications"
          :value="applicationJobs.length"
          description="Applicants"
          :icon="appliedIcon"
          :cardClass="
            openSection === 'application'
              ? 'bg-blue-600 rounded-md text-white shadow-md overflow-hidden'
              : 'bg-blue-400 rounded-md text-white shadow-md overflow-hidden'
          "
        />
      </div>
    </div>

    <!-- Jobs Section -->
    <section
      v-if="openSection === 'total'"
      class="px-[8vw] md:px-[12vw] pt-16 pb-10 bg-white transition-all"
    >
      <div class="flex items-center mb-4">
        <img :src="jobPostIcon" alt="Totel" class="w-12 h-12 mr-2" />
        <h2 class="text-black text-3xl md:text-4xl font-bold">Total Job Posts</h2>
      </div>
      <input
        type="text"
        placeholder="Search here.."
        class="w-full p-2 md:p-3 rounded-lg border mb-4 md:mb-8 text-black"
      />

      <div class="max-h-[600px] overflow-y-auto pr-2">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <JobCard
            v-for="job in totalJobs"
            :key="job.jobId"
            :job="job"
            :showBookmark="false"
            @select="handleSelect"
          />
        </div>
      </div>
    </section>

    <section
      v-if="openSection === 'application'"
      class="px-[8vw] md:px-[12vw] pt-16 pb-10 bg-white transition-all"
    >
      <div class="flex items-center mb-4">
        <img :src="appliedIcon" alt="Application" class="w-12 h-12 mr-2" />
        <h2 class="text-black text-3xl md:text-4xl font-bold">Total Job Application</h2>
      </div>
      <input
        type="text"
        placeholder="Search here.."
        class="w-full p-2 md:p-3 rounded-lg border mb-4 md:mb-8 text-black"
      />

      <div class="max-h-[600px] overflow-y-auto pr-2">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <JobCard
            v-for="job in applicationJobs"
            :key="job.jobId"
            :job="job"
            :showBookmark="false"
            @select="handleSelect"
          />
        </div>
      </div>
    </section>
  </div>
</template>
