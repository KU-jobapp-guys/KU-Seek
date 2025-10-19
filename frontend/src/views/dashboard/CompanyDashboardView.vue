<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { mockJobs } from '@/data/mockJobs'
import CompanyJob from '@/components/profiles/CompanyJob.vue'
import Header from '@/components/layouts/AppHeader.vue'
import StatCarousel from '@/components/dashboards/StatCards/StatCarousel.vue'
import { Search, Filter, ChevronDown } from 'lucide-vue-next'
import { CompanyStats } from '@/configs/dashboardStatConfig.ts'
import type { Job } from '@/types/jobType'

const jobLists = ref<Job[]>([])
const searchQuery = ref('')
const statusFilter = ref<'all' | 'approved' | 'pending' | 'rejected'>('all')
const sortBy = ref<'default' | 'pendingApplicants'>('pendingApplicants')

async function loadJob() {
  jobLists.value = mockJobs
}

const filteredJobs = computed(() => {
  let filtered = jobLists.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (job) =>
        job.role?.toLowerCase().includes(query) ||
        job.company?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query),
    )
  }

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter((job) => job.status === statusFilter.value)
  }

  if (sortBy.value === 'pendingApplicants') {
    filtered = [...filtered].sort((a, b) => {
      const aPending = a.pendingApplicants || 0
      const bPending = b.pendingApplicants || 0
      return bPending - aPending
    })
  }
  console.log(filtered)

  return filtered
})

function clearFilters() {
  searchQuery.value = ''
  statusFilter.value = 'all'
}

const stats = computed(() => {
  const totalJobs = jobLists.value.length
  const totalApplicants = jobLists.value.reduce((sum, j) => sum + (j.totalApplicants || 0), 0)
  const pendingReview = jobLists.value.reduce((sum, j) => sum + (j.pendingApplicants || 0), 0)

  return { totalJobs, totalApplicants, pendingReview }
})

onMounted(() => {
  loadJob()
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Main Dashboard Section -->
    <Header page="companyDashboard" />

    <div class="relative -mt-44 px-[8vw] md:px-[12vw]">
      <StatCarousel :stats="CompanyStats" :data="stats" />
    </div>

    <!-- Total Job Posts Section -->
    <section class="relative px-[8vw] md:px-[12vw] mt-24 pb-10 bg-white flex flex-col gap-y-8">
      <div class="rounded-xl bg-gray-100 px-8 py-16 flex flex-col gap-y-8">
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-black text-4xl font-bold">Total Job Posts</h2>
          <p class="px-4 py-1 bg-blue-500 rounded-full text-white">
            {{ filteredJobs.length }} Jobs
          </p>
        </div>

        <!-- Filter Section -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div class="flex gap-4">
            <!-- Search Input -->
            <div class="w-full space-y-2">
              <label class="text-sm font-semibold text-gray-700">Search Jobs</label>
              <div class="relative">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search by job title, location..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div class="w-full flex gap-4">
              <!-- Status Filter -->
              <div class="w-full space-y-2">
                <label class="text-sm font-semibold text-gray-700">Job Status</label>
                <div class="relative">
                  <Filter class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    v-model="statusFilter"
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:cursor-pointer appearance-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown class="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <!-- Sort By -->
              <div class="w-full space-y-2 hover:cursor-pointer">
                <label class="text-sm font-semibold text-gray-700">Sort By</label>
                <div class="relative">
                  <select
                    v-model="sortBy"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:cursor-pointer appearance-none bg-white"
                  >
                    <option value="pendingApplicants">Most Pending Reviews</option>
                    <option value="postTime">Recently posted</option>
                  </select>
                  <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown class="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Jobs Grid -->
        <div
          v-if="filteredJobs.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-h-[520px] overflow-y-auto pr-2"
        >
          <CompanyJob v-for="j in filteredJobs" :key="j.jobId" :job="j" />
        </div>

        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-16 text-center">
          <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <Search class="h-8 w-8 text-gray-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
          <p class="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
          <button
            @click="clearFilters"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
