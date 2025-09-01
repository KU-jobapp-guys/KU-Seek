<script setup lang="ts">
import Header from '@/components/layouts/Header.vue'
import FilterBox from '@/components/jobBoard/FilterBox.vue';
import JobBox from '@/components/jobBoard/JobBox.vue';
</script>

<template>
  <Header page="jobBoard" />

  <div class="relative -mt-24 md:-mt-40 px-[8vw] md:px-[12vw]">

    <FilterBox />

    <div class="mt-12 flex h-full gap-x-4">
      <div class="w-full pr-4 h-[800px] gap-y-4 overflow-y-auto">
        <div v-for="value in [1,2,3,4,5,6]">
          <JobBox />
        </div>   
      </div>
      <div class="w-full bg-[#F9F9F9] p-2 rounded-md shadow-md hidden md:block">

      </div>
    </div>
  </div>

</template>