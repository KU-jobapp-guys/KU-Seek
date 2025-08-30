<script setup lang="ts">
import Header from '@/components/layouts/Header.vue'
import FilterBox from '@/components/jobBoard/FilterBox.vue';
</script>

<template>
  <Header page="jobBoard" />

  <FilterBox />

  <div class="px-[12vw] p-2 mt-12 flex h-[600px] gap-x-4">
    <div class="w-full pr-4 h-[600px] gap-y-4 overflow-y-auto">
      <div v-for="value in [1,2,3,4,5,6]">
        <div class="h-full bg-[#F9F9F9] px-12 py-8 w-full mb-4 rounded-md shadow-md">
          <div class="flex justify-between items-center mb-4">
            <div>
              <p class="text-xl font-bold">Software Developer #{{ value }}</p>
              <p>Urban Mobility Tech</p>
            </div>
            <div class="bg-gray-300 w-20 h-20 rounded-full" />
          </div>
          <p>Bangkok (Remote)</p>
          <p>- เขียนและพัฒนาโปรแกรมเพื่อให้ทำงานได้ตรงตาม Requirement</p>
          <p>- เขียนและพัฒนาโปรแกรมเพื่อให้ทำงานได้ตรงตาม Requirement</p>
        </div>
      </div>   
    </div>
    <div class="w-full bg-[#F9F9F9] p-2 rounded-md shadow-md hidden md:block">

    </div>
  </div>

</template>