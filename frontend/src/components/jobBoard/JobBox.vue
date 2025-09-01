<script setup lang="ts">
import type { Job } from '@/assets/type';

const props = defineProps<{ job: Job }>();
const { job } = props;

</script>


<template>
  <div class="h-full bg-[#F9F9F9] px-12 py-8 w-full mb-4 rounded-md shadow-md">
    <div class="flex justify-between items-center mb-4">
      <div>
        <p class="text-xl font-bold">{{ job.role }}</p>
        <p>{{ job.company }}</p>
      </div>
      <div class="bg-gray-300 w-20 h-20 rounded-full" />
    </div>
    <p>{{ job.location }}</p>
    <p>{{ job.salary }}</p>
    <ul class="list-disc list-inside mt-2">
      <li v-for="value in job.highlights">
        {{ value }}
      </li>
    </ul>
  </div>
</template>