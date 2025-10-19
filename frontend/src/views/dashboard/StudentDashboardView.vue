<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/layouts/AppHeader.vue'
import JobCard from '@/components/jobBoard/JobBox.vue'
import StatCard from '@/components/dashboards/StatCards/StatCard.vue'

import { BriefcaseBusiness, Bookmark, Eye } from 'lucide-vue-next'
import appliedIcon from '@/assets/applied-icon.svg'
import bigBookmarkIcon from '@/assets/big-bookmark-icon.svg'
import searchIcon from '@/assets/search-icon.svg'

import type { Job } from '@/types/jobType'

type Section = 'applied' | 'bookmarked' | 'recentlyViewed'

const openSection = ref<Section>('applied')
const router = useRouter()

const appliedJobs = ref<Job[]>([])
const bookmarkedJobs = ref<Job[]>([])
const recentlyViewedJobs = ref<Job[]>([])

const toggleSection = (section: Section) => {
  openSection.value = section
}

const handleSelect = (id: string) => {
  router.push(`/job/${id}`)
}

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
    <div
      class="relative -mt-16 md:-mt-24 px-[6vw] md:px-[10vw] grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-10"
    >
      <div class="cursor-pointer" @click="toggleSection('applied')">
        <StatCard
          title="Applied"
          :value="appliedJobs.length"
          description="Applied Jobs"
          :icon="BriefcaseBusiness"
          :cardClass="openSection === 'applied' ? 'bg-red-600 text-white' : 'bg-red-400 text-white'"
        />
      </div>

      <div class="cursor-pointer" @click="toggleSection('bookmarked')">
        <StatCard
          title="Bookmarked"
          :value="bookmarkedJobs.length"
          description="Saved Jobs"
          :icon="Bookmark"
          :cardClass="
            openSection === 'bookmarked' ? 'bg-blue-600 text-white' : 'bg-blue-400 text-white'
          "
        />
      </div>

      <div class="cursor-pointer" @click="toggleSection('recentlyViewed')">
        <StatCard
          title="Viewed"
          :value="recentlyViewedJobs.length"
          description="Viewed Jobs"
          :icon="Eye"
          :cardClass="
            openSection === 'recentlyViewed'
              ? 'bg-yellow-600 text-white'
              : 'bg-yellow-400 text-white'
          "
        />
      </div>
    </div>

    <!-- Applied Section -->
    <section
      v-if="openSection === 'applied'"
      class="px-[8vw] md:px-[12vw] pt-16 pb-10 bg-white transition-all"
    >
      <div class="flex items-center mb-4">
        <img :src="appliedIcon" alt="Applied" class="w-12 h-12 mr-2" />
        <h2 class="text-black text-3xl md:text-4xl font-bold">Applied Jobs</h2>
      </div>

      <div class="max-h-[600px] overflow-y-auto pr-2">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <JobCard
            v-for="job in appliedJobs"
            :key="job.jobId"
            :job="job"
            :bookmarked="bookmarkedJobs.some((j) => j.jobId === job.jobId)"
            @select="handleSelect"
            @bookmark="handleBookmark"
          />
        </div>
      </div>
    </section>

    <!-- Bookmarked Section -->
    <section
      v-if="openSection === 'bookmarked'"
      class="px-[8vw] md:px-[12vw] pt-16 pb-10 bg-white transition-all"
    >
      <div class="flex items-center mb-4">
        <img :src="bigBookmarkIcon" alt="Bookmarked" class="w-12 h-12 mr-2" />
        <h2 class="text-black text-3xl md:text-4xl font-bold">Bookmarked Jobs</h2>
      </div>

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

    <!-- Recently Viewed Section -->
    <section
      v-if="openSection === 'recentlyViewed'"
      class="px-[8vw] md:px-[12vw] pt-16 pb-10 bg-white transition-all"
    >
      <div class="flex items-center mb-4">
        <img :src="searchIcon" alt="Viewed" class="w-12 h-12 mr-2" />
        <h2 class="text-black text-3xl md:text-4xl font-bold">Recently Viewed Jobs</h2>
      </div>

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
