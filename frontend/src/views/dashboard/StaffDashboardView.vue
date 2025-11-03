<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/layouts/AppHeader.vue'
import JobCard from '@/components/jobBoard/JobBox.vue'
import StatCarousel from '@/components/dashboards/StatCards/StatCarousel.vue'
import type { Job } from '@/types/jobType'
import { ProfessorStats } from '@/configs/dashboardStatConfig'
import { Bookmark, Eye } from 'lucide-vue-next'
import ToastContainer from '@/components/additions/ToastContainer.vue'
import SearchInput from '@/components/dashboards/SearchInput.vue'

const openSection = ref<string>('Bookmarked')
const router = useRouter()

const bookmarkedJobs = ref<Job[]>([])
const recentlyViewedJobs = ref<Job[]>([])

const toastRef = ref<InstanceType<typeof ToastContainer> | null>(null)
const searchQuery = ref('')

const showSuccess = (msg = 'Action completed successfully!') =>
  toastRef.value?.addToast(msg, 'success')
const showError = (msg = 'An error occurred, please try again.') =>
  toastRef.value?.addToast(msg, 'error')

const toggleSection = (section: string) => {
  openSection.value = section
  searchQuery.value = ''
}

const handleSelect = (id: string) => {
  router.push(`/job/${id}`)
}

const stats = computed(() => {
  const bookmarkedJobsCount = bookmarkedJobs.value.length
  const recentlyViewedJobsCount = recentlyViewedJobs.value.length
  
  return { bookmarkedJobsCount, recentlyViewedJobsCount }
})

async function fetchJobs() {
  try {
    import('@/data/mockJobs').then(({ mockJobs }) => {
      bookmarkedJobs.value = mockJobs.slice(0, 6)
      recentlyViewedJobs.value = mockJobs.slice(6, 10)

      const saved = JSON.parse(localStorage.getItem('bookmarkedJobs') || '[]')
      bookmarkedJobs.value = mockJobs.filter((job) => saved.includes(job.jobId))
    })
  } catch (error) {
    console.error('Failed to fetch jobs:', error)
    showError('Failed to fetch jobs')
  }
}

function handleBookmark(payload: { id: string; bookmarked: boolean }) {
  const { id, bookmarked } = payload
  const job =
    recentlyViewedJobs.value.find((j) => j.jobId === id) ||
    bookmarkedJobs.value.find((j) => j.jobId === id)

  if (!job) return

  if (bookmarked) {
    if (!bookmarkedJobs.value.some((j) => j.jobId === id)) {
      bookmarkedJobs.value.push(job)
      showSuccess('Job bookmarked!')
    }
  } else {
    bookmarkedJobs.value = bookmarkedJobs.value.filter((j) => j.jobId !== id)
    showSuccess('Bookmark removed!')
  }

  localStorage.setItem(
    'bookmarkedJobs',
    JSON.stringify(bookmarkedJobs.value.map((j) => j.jobId))
  )
}

const filteredBookmarkedJobs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return bookmarkedJobs.value
  return bookmarkedJobs.value.filter(
    (job) =>
      job.role.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
  )
})

const filteredRecentlyViewedJobs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return recentlyViewedJobs.value
  return recentlyViewedJobs.value.filter(
    (job) =>
      job.role.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
  )
})

onMounted(() => {
  fetchJobs()
})

function handleSearch(value: string) {
  searchQuery.value = value
}
</script>

<template>
  <div class="dashboard-bg min-h-screen pb-0">
    <Header page="studentDashboard" />

    <!-- Stat Cards -->
    <div class="relative -mt-44 px-[8vw] md:px-[12vw]">
      <StatCarousel
        :stats="ProfessorStats"
        :data="stats"
        :isClickable="true"
        @toggleSection="toggleSection"
      />
    </div>

    <div class="px-[8vw] md:px-[12vw] mt-24 rounded-xl flex flex-col gap-y-8">
      <div class="rounded-xl bg-gray-100 px-8 py-16 flex flex-col gap-y-8">

        <!-- Bookmarked Section -->
        <section
          v-if="openSection === 'Bookmarked'"
          class="bg-gray-100 transition-all flex flex-col gap-y-8"
        >
          <div class="flex gap-x-4 items-center">
            <div
              class="shrink-0 flex items-center justify-center w-16 h-16 p-4 bg-red-500 rounded-lg text-white"
            >
              <Bookmark class="w-full h-full text-white" />
            </div>
            <h1 class="text-4xl font-bold">Bookmarked Jobs</h1>
          </div>

        <SearchInput
          v-model="searchQuery"
          placeholder="Search jobs by title, company, or department..."
          @search="handleSearch"
        />

          <div v-if="filteredBookmarkedJobs.length > 0" class="max-h-[600px] overflow-y-auto pr-2">
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8">
              <JobCard
                v-for="job in filteredBookmarkedJobs"
                :key="job.jobId"
                :job="job"
                :bookmarked="true"
                @select="handleSelect"
                @bookmark="handleBookmark"
              />
            </div>
          </div>
          <p v-else class="text-gray-500 text-center py-12 text-lg">No matching bookmarked jobs.</p>
        </section>

        <!-- Recently Viewed Section -->
        <section
          v-if="openSection === 'Recently Viewed'"
          class="bg-gray-100 transition-all flex flex-col gap-y-8"
        >
          <div class="flex gap-x-4 items-center">
            <div
              class="shrink-0 flex items-center justify-center w-16 h-16 p-4 bg-yellow-500 rounded-lg text-white"
            >
              <Eye class="w-full h-full text-white" />
            </div>
            <h1 class="text-4xl font-bold">Recently Viewed Jobs</h1>
          </div>

          <SearchInput
          v-model="searchQuery"
          placeholder="Search jobs by title, company, or department..."
          @search="handleSearch"
          />

          <div v-if="filteredRecentlyViewedJobs.length > 0" class="max-h-[600px] overflow-y-auto pr-2">
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8">
              <JobCard
                v-for="job in filteredRecentlyViewedJobs"
                :key="job.jobId"
                :job="job"
                :bookmarked="bookmarkedJobs.some((j) => j.jobId === job.jobId)"
                @select="handleSelect"
                @bookmark="handleBookmark"
              />
            </div>
          </div>
          <p v-else class="text-gray-500 text-center py-12 text-lg">No matching recently viewed jobs.</p>
        </section>
      </div>
    </div>

    <ToastContainer ref="toastRef" />
  </div>
</template>
