<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from '@/components/layouts/AppHeader.vue'
import FilterBox from '@/components/jobBoard/FilterBox.vue'
import JobBox from '@/components/jobBoard/JobBox.vue'
import type { Job, FilterKeys } from '@/types/jobType'
import { mockJobs } from '@/data/mockJobs'
import search from '@/assets/icons/search.svg'
import { ArrowLeftCircle } from 'lucide-vue-next'
import JobFull from '@/components/jobBoard/JobFull.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const jobs = ref<Job[]>([])
const selectedJobId = ref<string>('')

type Filters = Record<FilterKeys, string>
const filters = ref<Partial<Filters>>({})
const companyFilter = ref<string | undefined>(route.query.company as string) // optional query from url

async function fetchJobs(newFilters: Partial<Filters> = {}) {
  filters.value = { ...filters.value, ...newFilters }

  console.log('Fetching new data with options:', filters.value)

  jobs.value = mockJobs.filter((job) => {
    return Object.entries(filters.value).every(([key, value]) => {
      if (!value) return true
      return (job as Job)[key as FilterKeys].toString().toLowerCase().includes(value.toLowerCase())
    })
  })
}

function handleSelect(id: string) {
  selectedJobId.value = id
  if (window.innerWidth < 768) {
    router.push(`/job/${id}`)
  } 
}

onMounted(() => {
  fetchJobs()
  window.scrollTo({ top: 0 })
})

</script>

<template>
  <Header page="jobBoard" />

  <div class="relative -mt-24 md:-mt-40 px-[8vw] md:px-[12vw]">
    <FilterBox :initialFilters="{ company: companyFilter }" @applyFilter="fetchJobs" />

    <div class="mt-12">
      <div v-if="jobs.length > 0" class="w-full h-[800px] flex gap-x-4">
        <div class="w-full pr-4 h-full gap-y-4 overflow-y-auto">
          <div v-for="job in jobs" :key="job.jobId">
            <JobBox :job="job" @select="handleSelect" />
          </div>
        </div>
        <div class="w-full h-full bg-[#F9F9F9] rounded-md shadow-2xl hidden md:block">
          <JobFull v-if="selectedJobId" :jobId="selectedJobId as string" />

          <div v-if="!selectedJobId" class="h-full px-8 py-12">
            <div class="flex items-center gap-x-4">
              <ArrowLeftCircle class="w-12 h-12 text-gray-600" />
              <div>
                <p class="font-bold text-2xl">Select Job</p>
                <p>Show the detail here.</p>
              </div>
            </div>
            <div class="w-full h-full flex items-center justify-center">
              <img :src="search" class="h-44 w-44" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="jobs.length === 0" class="mt-24 w-full flex flex-col items-center justify-center">
        <img :src="search" class="h-32 w-32" />
        <p class="text-xl font-bold my-4">No matching results found</p>
        <p>We couldn't find any results that match your search.</p>
        <p>Try adjusting your filters or checking for spelling errors.</p>
      </div>
    </div>
  </div>
</template>
