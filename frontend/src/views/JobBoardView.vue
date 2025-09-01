<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Header from '@/components/layouts/Header.vue';
import FilterBox from '@/components/jobBoard/FilterBox.vue';
import JobBox from '@/components/jobBoard/JobBox.vue';
import type { Job, FilterKeys } from '@/assets/type';
import { mockJobs } from '@/data/mockJobs';
import search from '@/assets/icons/search.svg'

const jobs = ref<Job[]>([]);

type Filters = Record<FilterKeys, string>;
const filters = ref<Partial<Filters>>({});

async function fetchJobs(newFilters: Partial<Filters> = {}) {
  filters.value = { ...filters.value, ...newFilters };

  console.log("Fetching new data with options:", filters.value);

  jobs.value = mockJobs.filter(job => {
    return Object.entries(filters.value).every(([key, value]) => {
      if (!value) return true;
      return (job as any)[key].toString().toLowerCase().includes(value.toLowerCase());
    });
  });
}

onMounted(() => {
  fetchJobs();
});
</script>

<template>
  <Header page="jobBoard" />

  <div class="relative -mt-24 md:-mt-40 px-[8vw] md:px-[12vw]">

    <FilterBox @applyFilter="fetchJobs" />

    <div class="mt-12">
      <div v-if="jobs.length > 0" class="w-full h-full flex gap-x-4">
        <div class="w-full pr-4 h-[800px] gap-y-4 overflow-y-auto">
          <div v-for="job in jobs" :key="job.company + job.role">
            <JobBox :job="job" />
          </div>
        </div>
        <div class="w-full bg-[#F9F9F9] p-2 rounded-md shadow-md hidden md:block">
          
        </div>
      </div>

      <div v-if="jobs.length === 0" class="mt-8 w-full flex flex-col items-center justify-center">
        <img :src="search" class="h-32 w-32" />
        <p class="text-xl font-bold my-4">No matching results found</p>
        <p>We couldn't find any results that match your search.</p>
        <p>Try adjusting your filters or checking for spelling errors.</p>
      </div>
    </div>
  </div>
</template>
