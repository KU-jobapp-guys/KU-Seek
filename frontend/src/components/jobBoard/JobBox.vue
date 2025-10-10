<script setup lang="ts">
import type { Job } from '@/types/jobType'
import { Bookmark } from 'lucide-vue-next'
import { getPostTime } from '@/libs/getPostTime'

// Add optional prop showBookmark with default true
const props = withDefaults(
  defineProps<{
    job: Job
    showBookmark?: boolean
  }>(),
  { showBookmark: true }, // default value
)

const emit = defineEmits<{ (e: 'select', id: string): void }>()

function handleJobSelected() {
  emit('select', props.job.jobId)
}
</script>

<template>
  <div
    class="h-full bg-[#F9F9F9] px-12 py-8 w-full mb-4 rounded-md shadow-md cursor-pointer"
    @click="handleJobSelected"
  >
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
      <li v-for="(value, index) in job.highlights" :key="index">
        {{ value }}
      </li>
    </ul>

    <div class="w-full flex justify-between mt-4 text-sm text-gray-500">
      <p>{{ getPostTime(job.postTime) }}</p>
      <!-- Conditionally show Bookmark -->
      <Bookmark v-if="showBookmark" class="h-6 w-6 cursor-pointer" />
    </div>
  </div>
</template>
