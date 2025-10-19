<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/layouts/AppHeader.vue'
import JobCard from '@/components/jobBoard/JobBox.vue'
import StatCarousel from '@/components/dashboards/StatCards/StatCarousel.vue'
import { statusOptions } from '@/configs/statusOption'

import type { Job } from '@/types/jobType'
import { StudentStats } from '@/configs/dashboardStatConfig'
import { BriefcaseBusiness, Bookmark, Eye } from 'lucide-vue-next'

type ApplicationStatus = 'pending' | 'approved' | 'rejected'

const openSection = ref<string>('Total Jobs Applied')
const router = useRouter()

const appliedJobs = ref<Job[]>([])
const bookmarkedJobs = ref<Job[]>([])
const recentlyViewedJobs = ref<Job[]>([])
const selectedStatuses = ref<Set<ApplicationStatus>>(new Set(['pending', 'approved', 'rejected']))

const toggleSection = (section: string) => {
  openSection.value = section
}

const toggleStatus = (status: ApplicationStatus) => {
  if (selectedStatuses.value.has(status)) {
    selectedStatuses.value.delete(status)
  } else {
    selectedStatuses.value.add(status)
  }
  // Trigger reactivity
  selectedStatuses.value = new Set(selectedStatuses.value)
}

const handleSelect = (id: string) => {
  router.push(`/job/${id}`)
}

const stats = computed(() => {
  const appliedJobsCount = appliedJobs.value.length
  const bookmarkedJobsCount = bookmarkedJobs.value.length
  const recentlyViewedJobsCount = recentlyViewedJobs.value.length

  return { appliedJobsCount, bookmarkedJobsCount, recentlyViewedJobsCount }
})

const statusCounts = computed(() => {
  return {
    pending: appliedJobs.value.filter(j => j.status === 'pending').length,
    approved: appliedJobs.value.filter(j => j.status === 'approved').length,
    rejected: appliedJobs.value.filter(j => j.status === 'rejected').length
  }
})

const filteredAppliedJobs = computed(() => {
  return appliedJobs.value.filter(job => 
    selectedStatuses.value.has(job.status as ApplicationStatus)
  )
})

async function fetchJobs() {
  try {
    import('@/data/mockJobs').then(({ mockJobs }) => {
      appliedJobs.value = mockJobs.slice(0, 5)
      recentlyViewedJobs.value = mockJobs.slice(7, 10)

      // Restore bookmarked jobs from localStorage
      const saved = JSON.parse(localStorage.getItem('bookmarkedJobs') || '[]')
      bookmarkedJobs.value = mockJobs.filter((job) => saved.includes(job.jobId))
    })
  } catch (error) {
    console.error('Failed to fetch jobs:', error)
  }
}

function handleBookmark(payload: { id: string; bookmarked: boolean }) {
  const { id, bookmarked } = payload
  const job =
    appliedJobs.value.find((j) => j.jobId === id) ||
    recentlyViewedJobs.value.find((j) => j.jobId === id) ||
    bookmarkedJobs.value.find((j) => j.jobId === id)

  if (!job) return

  if (bookmarked) {
    if (!bookmarkedJobs.value.some((j) => j.jobId === id)) {
      bookmarkedJobs.value.push(job)
    }
  } else {
    bookmarkedJobs.value = bookmarkedJobs.value.filter((j) => j.jobId !== id)
  }

  localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs.value.map((j) => j.jobId)))
}

onMounted(() => {
  fetchJobs()
})
</script>

<template>
  <div class="dashboard-bg min-h-screen pb-0">
    <Header page="studentDashboard" />

    <!-- Stat Cards -->
    <div class="relative -mt-44 px-[8vw] md:px-[12vw]">
      <StatCarousel :stats="StudentStats" :data="stats" :isClickable="true" @toggleSection="toggleSection"  />
    </div>

    <div class="px-[8vw] md:px-[12vw] mt-24 rounded-xl flex flex-col gap-y-8">
      <div class="rounded-xl bg-gray-100 px-8 py-16 flex flex-col gap-y-8">
        
        <!-- Applied Section -->
        <section
          v-if="openSection === 'Total Jobs Applied'"
          class="bg-gray-100 transition-all flex flex-col gap-y-8"
        >
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 gap-y-8">
            <div class="flex gap-x-4 items-center">
              <div class="shrink-0 flex items-center justify-center w-16 h-16 p-4 bg-blue-500 rounded-lg text-white">
                <BriefcaseBusiness class="w-full h-full text-white" />
              </div>
              <h1 class="text-4xl font-bold">Jobs Applied</h1>
            </div>

            <!-- Status Filter Box -->
            <div class="flex w-full md:w-auto border border-gray-300 rounded-full overflow-hidden">
              <button
                v-for="(status) in statusOptions"
                :key="status.key"
                @click="toggleStatus(status.key as ApplicationStatus)"
                :class="[
                  'w-full md:w-auto px-4 py-2 text-sm font-medium transition-colors',
                  selectedStatuses.has(status.key as ApplicationStatus)
                    ? status.activeClass
                    : 'bg-white text-gray-400 hover:bg-gray-50'
                ]"
              >
                {{ status.label }} ({{ statusCounts[status.key as ApplicationStatus] }})
              </button>
            </div>
          </div>

          <div class="min-h-[200px] max-h-[600px] overflow-y-auto pr-2">
            <div v-if="filteredAppliedJobs.length > 0" class="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8">
              <JobCard
                v-for="job in filteredAppliedJobs"
                :key="job.jobId"
                :job="job"
                :bookmarked="bookmarkedJobs.some((j) => j.jobId === job.jobId)"
                @select="handleSelect"
                @bookmark="handleBookmark"
              />
            </div>
            <div v-else class="text-center py-12 text-gray-500">
              <p class="text-lg">No jobs match the selected filters</p>
            </div>
          </div>
        </section>

        <!-- Bookmarked Section -->
        <section
          v-if="openSection === 'Bookmarked'"
          class="bg-gray-100 transition-all flex flex-col gap-y-8"
        >
          <div class="flex gap-x-4 items-center">
            <div class="shrink-0 flex items-center justify-center w-16 h-16 p-4 bg-red-500 rounded-lg text-white">
              <Bookmark class="w-full h-full text-white" />
            </div>
            <h1 class="text-4xl font-bold">Bookmarked Jobs</h1>
          </div>

          <div v-if="bookmarkedJobs.length > 0" class="max-h-[600px] overflow-y-auto pr-2">
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8">
              <JobCard
                v-for="job in bookmarkedJobs"
                :key="job.jobId"
                :job="job"
                :bookmarked="true"
                @select="handleSelect"
                @bookmark="handleBookmark"
              />
            </div>
          </div>
          <p v-else class="text-gray-500 text-center py-12 text-lg">No bookmarked jobs yet.</p>
        </section>

        <!-- Recently Viewed Section -->
        <section
          v-if="openSection === 'Recently Viewed'"
          class="bg-gray-100 transition-all flex flex-col gap-y-8"
        >
          <div class="flex gap-x-4 items-center">
            <div class="shrink-0 flex items-center justify-center w-16 h-16 p-4 bg-yellow-500 rounded-lg text-white">
              <Eye class="w-full h-full text-white" />
            </div>
            <h1 class="text-4xl font-bold">Recently Viewed Jobs</h1>
          </div>

          <div class="max-h-[600px] overflow-y-auto pr-2">
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8">
              <JobCard
                v-for="job in recentlyViewedJobs"
                :key="job.jobId"
                :job="job"
                :bookmarked="bookmarkedJobs.some((j) => j.jobId === job.jobId)"
                @select="handleSelect"
                @bookmark="handleBookmark"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>