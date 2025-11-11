<script setup lang="ts">
import { useRoute } from 'vue-router'
import JobFull from '@/components/jobBoard/JobFull.vue'
import { onMounted, ref } from 'vue'
import JobPostForm from '@/components/jobPostForm/JobPostForm.vue'
import type { Job } from '@/types/jobType'
import { mockJobs } from '@/data/mockJobs'
import { fetchBookmarkId as fetchBookmarkService } from '@/services/bookmarkService'

const route = useRoute()
const isEditing = ref(false)
const initialData = ref<Job | null>()
const bookmarked = ref<boolean>(false)

const startEditing = () => {
  isEditing.value = true
  initialData.value = mockJobs.find((j) => j.jobId === route.params.id) || null
}

const cancelEditing = () => {
  isEditing.value = false
}

const updateEditing = (payload: Partial<Job>) => {
  
  if (initialData.value) {
    initialData.value = {
      ...initialData.value,
      ...(payload as Partial<Job>),
    } as Job
  } else if (payload && Object.keys(payload).length > 0) {
   
    initialData.value = payload as Job
  }

  isEditing.value = false
}

async function loadBookmark() {
  const list = await fetchBookmarkService()
  bookmarked.value = list.includes(route.params.id.toString())
}

onMounted(() => {
  window.scrollTo({ top: 0 })
  loadBookmark()
})
</script>

<template>
  <div v-if="!isEditing" class="px-[6vw] md:px-[12vw] mt-24">
    <JobFull :jobId="route.params.id as string" :bookmarked="bookmarked" @edit="startEditing" />
  </div>

  <JobPostForm
    v-else-if="initialData"
    :initialData="initialData"
    @submit="updateEditing"
    @cancel="cancelEditing"
  />
</template>
