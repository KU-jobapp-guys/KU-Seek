<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/layouts/AppHeader.vue'
import DashboardStatCard from '@/components/dashboards/DashboardStatCard.vue'
import JobCard from '@/components/jobBoard/JobBox.vue'

import bigBookmarkIcon from '@/assets/big-bookmark-icon.svg'
import searchIcon from '@/assets/search-icon.svg'

import type { Job } from '@/assets/type'

type Section = 'bookmarked' | 'recentlyViewed'

const openSection = ref<Section>('bookmarked')
const router = useRouter()

const bookmarkedJobs = ref<Job[]>([])
const recentlyViewedJobs = ref<Job[]>([])

const toggleSection = (section: Section) => {
  openSection.value = section
}

// Navigate to job details
const handleSelect = (id: string) => {
  router.push(`/job/${id}`)
}

// Fetch jobs from API
async function fetchJobs() {
  try {
    // Replace these with real API calls
    // bookmarkedJobs.value = await getBookmarkedJobs()
    // recentlyViewedJobs.value = await getRecentlyViewedJobs()

    // For demo using mockJobs
    import('@/data/mockJobs').then(({ mockJobs }) => {
      bookmarkedJobs.value = mockJobs.slice(0, 6)
      recentlyViewedJobs.value = mockJobs.slice(6, 10)

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

    <!-- Dashboard Stat Cards -->
    <div
      class="relative -mt-16 md:-mt-24 px-[6vw] md:px-[10vw] grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-10"
    >
      <div class="cursor-pointer" @click="toggleSection('bookmarked')">
        <DashboardStatCard
          title="Bookmarked"
          :value="bookmarkedJobs.length"
          description="Saved Jobs"
          :icon="bigBookmarkIcon"
          :cardClass="
            openSection === 'bookmarked'
              ? 'bg-red-600 rounded-md text-white shadow-md overflow-hidden'
              : 'bg-red-400 rounded-md text-white shadow-md overflow-hidden'
          "
        />
      </div>

      <div class="cursor-pointer" @click="toggleSection('recentlyViewed')">
        <DashboardStatCard
          title="Viewed"
          :value="recentlyViewedJobs.length"
          description="Viewed Jobs"
          :icon="searchIcon"
          :cardClass="
            openSection === 'recentlyViewed'
              ? 'bg-blue-600 rounded-md text-white shadow-md overflow-hidden'
              : 'bg-blue-400 rounded-md text-white shadow-md overflow-hidden'
          "
        />
      </div>
    </div>

    <!-- Jobs Section -->

    <section
      v-if="openSection === 'bookmarked'"
      class="px-[8vw] md:px-[12vw] pt-16 pb-10 bg-white transition-all"
    >
      <div class="flex items-center mb-4">
        <img :src="bigBookmarkIcon" alt="Bookmarked" class="w-12 h-12 mr-2" />
        <h2 class="text-black text-3xl md:text-4xl font-bold">Bookmarked Jobs</h2>
      </div>
      <input
        type="text"
        placeholder="Search here.."
        class="w-full p-2 md:p-3 rounded-lg border mb-4 md:mb-8 text-black"
      />

      <div v-if="bookmarkedJobs.length > 0" class="max-h-[600px] overflow-y-auto pr-2">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
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
      <p v-else class="text-gray-500 text-center mt-8">No bookmarked jobs yet.</p>
    </section>

    <section
      v-if="openSection === 'recentlyViewed'"
      class="px-[8vw] md:px-[12vw] pt-16 pb-10 bg-white transition-all"
    >
      <div class="flex items-center mb-4">
        <img :src="searchIcon" alt="Viewed" class="w-12 h-12 mr-2" />
        <h2 class="text-black text-3xl md:text-4xl font-bold">Recently Viewed Jobs</h2>
      </div>
      <input
        type="text"
        placeholder="Search here.."
        class="w-full p-2 md:p-3 rounded-lg border mb-4 md:mb-8 text-black"
      />

      <div class="max-h-[600px] overflow-y-auto pr-2">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
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
</template>
