<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Job } from '@/types/jobType'
import { Banknote, Bookmark, BookmarkCheck, MapPin } from 'lucide-vue-next'
import { getPostTime } from '@/libs/getPostTime'
import { getStatusColor } from '@/libs/getStatusStyle'


const props = withDefaults(
  defineProps<{
    job: Job
    bookmarked: boolean
    showBookmark?: boolean
  }>(),
  { showBookmark: true },
)

const emit = defineEmits<{
  (e: 'select', id: string): void
  (e: 'bookmark', payload: { jobId: string, bm: boolean }): void
}>()

const isBookmarked = ref(props.bookmarked)

// Keep local state in sync with parent
watch(
  () => props.bookmarked,
  (newVal) => (isBookmarked.value = newVal),
)

function handleJobSelected() {
  emit('select', props.job.jobId)
}

async function toggleBookmark() {
  // isBookmarked.value = !isBookmarked.value
  emit('bookmark', { jobId: props.job.jobId, bm: !isBookmarked.value })
}
</script>

<template>
  <div
    class="h-full text-base bg-[#F9F9F9] px-6 md:px-12 py-8 w-full mb-4 rounded-md shadow-md cursor-pointer"
    @click="handleJobSelected"
  >
    

    <div class="flex justify-between items-start mb-2">
      <div>
        <p class="text-xl font-bold">{{ job.role }}</p>
        <p>{{ job.company }}</p>
      </div>
      <div class="shrink-0 bg-gray-300 h-12 w-12 md:w-20 md:h-20 rounded-full">
        <img :src="job.profilePhoto" />
      </div>
    </div>

    <div class="text-sm">
      <p class="flex gap-1">
        <span><MapPin class="inline-block h-4 w-4 text-gray-600" /></span>{{ job.location }}
      </p>
      <p class="flex gap-1">
        <span><Banknote class="inline-block h-4 w-4 text-gray-600" /></span>{{ job.salaryMin }} -
        {{ job.salaryMax }} THB/month
      </p>
    </div>

    <p class="mt-4 line-clamp-3">{{ job.description }}</p>

    <div class="w-full flex justify-between mt-4 text-sm text-gray-500">
      <p>{{ getPostTime(job.postTime) }}</p>

      <component
        :is="isBookmarked ? BookmarkCheck : Bookmark"
        v-if="showBookmark"
        class="h-6 w-6 cursor-pointer text-blue-500 hover:scale-110 transition-transform"
        @click.stop="toggleBookmark"
      />
    </div>
  </div>
</template>
