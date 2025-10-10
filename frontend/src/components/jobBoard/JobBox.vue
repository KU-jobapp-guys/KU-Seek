<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { Job } from '@/assets/type'
import { Bookmark, BookmarkCheck } from 'lucide-vue-next'
import { getPostTime } from '@/libs/getPostTime'

const props = withDefaults(
  defineProps<{
    job: Job
    bookmarked?: boolean
    showBookmark?: boolean
  }>(),
  { showBookmark: true, bookmarked: false },
)

const emit = defineEmits<{
  (e: 'select', id: string): void
  (e: 'bookmark', payload: { id: string; bookmarked: boolean }): void
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

function toggleBookmark() {
  isBookmarked.value = !isBookmarked.value
  emit('bookmark', { id: props.job.jobId, bookmarked: isBookmarked.value })
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

      <component
        :is="isBookmarked ? BookmarkCheck : Bookmark"
        v-if="showBookmark"
        class="h-6 w-6 cursor-pointer text-blue-500 hover:scale-110 transition-transform"
        @click.stop="toggleBookmark"
      />
    </div>
  </div>
</template>
