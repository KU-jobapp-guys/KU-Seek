<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/layouts/AppHeader.vue'
import { fetchUserAppliedJobs } from '@/services/applicationService'
import JobCard from '@/components/jobBoard/JobBox.vue'
import StatCarousel from '@/components/dashboards/StatCards/StatCarousel.vue'
import { statusOptions } from '@/configs/statusOption'
import EmptyFilter from '@/components/dashboards/EmptyFilter.vue'
import { fetchBookmarkId as fetchBookmarkService } from '@/services/bookmarkService'
import { fetchJob } from '@/services/jobService'
import type { Job } from '@/types/jobType'
import { StudentStats } from '@/configs/dashboardStatConfig'
import { BriefcaseBusiness, Bookmark, Eye } from 'lucide-vue-next'
import ToastContainer from '@/components/additions/ToastContainer.vue'
import SearchInput from '@/components/dashboards/SearchInput.vue'

type ApplicationStatus = 'pending' | 'accepted' | 'rejected'

const openSection = ref<string>('Total Jobs Applied')
const router = useRouter()

const appliedJobs = ref<Job[]>([])
const recentlyViewedJobs = ref<Job[]>([])
const selectedStatuses = ref<Set<ApplicationStatus>>(new Set(['pending', 'accepted', 'rejected']))
const bookmarkedJobs = ref<Job[]>([])
const bookmarkedId = ref<string[]>([])

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

const toggleStatus = (status: ApplicationStatus) => {
  if (selectedStatuses.value.has(status)) {
    selectedStatuses.value.delete(status)
  } else {
    selectedStatuses.value.add(status)
  }
  selectedStatuses.value = new Set(selectedStatuses.value)
}

function clearFilters() {
  selectedStatuses.value = new Set(['pending', 'accepted', 'rejected'])
  searchQuery.value = ''
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
    pending: appliedJobs.value.filter((j) => j.status === 'pending').length,
    accepted: appliedJobs.value.filter((j) => j.status === 'accepted').length,
    rejected: appliedJobs.value.filter((j) => j.status === 'rejected').length,
  }
})

const filteredAppliedJobs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return appliedJobs.value.filter((job) => {
    if (!selectedStatuses.value.has(job.status as ApplicationStatus)) return false
    if (!query) return true
    return (
      job.role.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
    )
  })
})

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

async function fetchJobs() {
  try {
    const applications = await fetchUserAppliedJobs()

    appliedJobs.value = applications


    recentlyViewedJobs.value = []
  } catch (error) {
    console.error('Failed to fetch jobs:', error)
    showError('Failed to fetch jobs')
  }
}

async function fetchBookmark() {
  try {
    bookmarkedId.value = await fetchBookmarkService()
    const jobs = await Promise.all(
      (bookmarkedId.value || []).map((jobId) => fetchJob(jobId))
    )
    bookmarkedJobs.value = jobs.filter((job): job is Job => job !== null)
  } catch {
    bookmarkedId.value = []
    bookmarkedJobs.value = []
  }
}

// const isBookmarked = (jobId: string) => bookmarkedId.value.includes(jobId.toString())
const isBookmarked = ((jobId: string) => {
  return Object.values(bookmarkedId.value).includes(jobId.toString())
})

function handleBookmark(payload: {jobId: string, bm: boolean}) {
  if (isBookmarked(payload.jobId) && !payload.bm) {
    bookmarkedId.value = bookmarkedId.value.filter(id => id !== payload.jobId)
    showSuccess('Bookmark removed!')
  } else if (!isBookmarked(payload.jobId) && payload.bm) {
    bookmarkedId.value.push(payload.jobId)
    showSuccess('Job bookmarked!')
  }
}

onMounted(() => {
  fetchJobs()
  fetchBookmark()
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
        :stats="StudentStats"
        :data="stats"
        :isClickable="true"
        @toggleSection="toggleSection"
      />
    </div>

    <div class="px-[8vw] md:px-[12vw] mt-24 rounded-xl flex flex-col gap-y-8">
      <div class="rounded-xl bg-gray-100 px-8 py-16 flex flex-col gap-y-8">
        <!-- Applied Section -->
        <section
          v-if="openSection === 'Total Jobs Applied'"
          class="bg-gray-100 transition-all flex flex-col gap-y-8"
        >
          <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 gap-y-8"
          >
            <div class="flex gap-x-4 items-center">
              <div
                class="shrink-0 flex items-center justify-center w-16 h-16 p-4 bg-blue-500 rounded-lg text-white"
              >
                <BriefcaseBusiness class="w-full h-full text-white" />
              </div>
              <h1 class="text-4xl font-bold">Jobs Applied</h1>
            </div>

            <!-- Status Filter Box -->
            <div class="flex w-full md:w-auto border border-gray-300 rounded-full overflow-hidden">
              <button
                v-for="status in statusOptions"
                :key="status.key"
                @click="toggleStatus(status.key as ApplicationStatus)"
                :class="[
                  'w-full md:w-auto px-4 py-2 text-sm font-medium transition-colors',
                  selectedStatuses.has(status.key as ApplicationStatus)
                    ? status.activeClass
                    : 'bg-white text-gray-400 hover:bg-gray-50',
                ]"
              >
                {{ status.label }} ({{ statusCounts[status.key as ApplicationStatus] }})
              </button>
            </div>
          </div>

          <SearchInput
            v-model="searchQuery"
            placeholder="Search jobs by title, company, or department..."
            @search="handleSearch"
          />

          <div class="min-h-[200px] max-h-[600px] overflow-y-auto pr-2">
            <div
              v-if="filteredAppliedJobs.length > 0"
              class="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8"
            >
              <JobCard
                v-for="job in filteredAppliedJobs"
                :key="job.jobId"
                :job="job"
                :bookmarked="isBookmarked(job.jobId)"
                @select="handleSelect"
                @bookmark="handleBookmark"
              />
            </div>

            <div v-else class="flex flex-col items-center justify-center py-16 text-center">
              <EmptyFilter :clearFilters="clearFilters" />
            </div>
          </div>
        </section>

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
                :bookmarked="isBookmarked(job.jobId)"
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
          
          <div class="max-h-[600px] overflow-y-auto pr-2">
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8">
              <JobCard
                v-for="job in filteredRecentlyViewedJobs"
                :key="job.jobId"
                :job="job"
                :bookmarked="isBookmarked(job.jobId)"
                @select="handleSelect"
                @bookmark="handleBookmark"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
    <ToastContainer ref="toastRef" />
  </div>
</template>