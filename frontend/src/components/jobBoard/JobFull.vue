<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { Job } from '@/types/jobType'
import { mockJobs } from '@/data/mockJobs'
import { useRouter } from 'vue-router'
import { MapPin, Clock, Banknote, BriefcaseBusiness, PenBox } from 'lucide-vue-next'
import { techStackColors } from '@/configs/techStackConfig'
import { getPostTime } from '@/libs/getPostTime'
import { getUserRole, isOwner } from '@/libs/userUtils'
import { IconMap } from '@/configs/contactConfig'

const props = defineProps<{ jobId: string }>()
const router = useRouter()
const job = ref<Job | null>(null)
const userRole = getUserRole()

const emit = defineEmits<{
  (e: 'edit'): void
}>()

const loadJob = (id?: string) => {
  if (!id) {
    job.value = null
    return
  }

  job.value = mockJobs.find((j) => j.jobId === id) || null

  if (!job.value) {
    router.replace({ name: 'not found' })
  }
}

onMounted(() => {
  loadJob(props.jobId)
})

watch(
  () => props.jobId,
  (newId) => {
    loadJob(newId)
  },
)
</script>

<template>
  <div v-if="job" class="h-full w-full shadow-xl relative overflow-y-auto">
    <div class="relative w-full h-[240px] bg-gray-600 rounded-t-md"></div>

    <div class="absolute left-8 -translate-y-1/2">
      <img
        src="https://via.placeholder.com/120"
        alt="Company"
        class="w-40 h-40 bg-black rounded-full border-8 border-white"
      />
    </div>

    <div class="px-12 mt-24">
      <div class="flex justify-between items-center">
        <router-link :to="`/job/${job.jobId}`" class="text-2xl font-bold underline cursor-pointer">{{
          job.role
        }}</router-link>
        <PenBox stroke-width=1.5 class="inline-block w-8 h-8 text-gray-600 hover:text-gray-400 hover:cursor-pointer" @click="emit('edit')" v-if="(isOwner(job.company) || true) && job.status === 'rejected'" />
      </div>
      <p class="text-gray-600">{{ job.company }}</p>

      <div class="flex flex-col mt-4">
        <div class="flex gap-x-2 items-center text-gray-600">
          <MapPin class="w-4 h-4" />
          <p>{{ job.location }}</p>
        </div>

        <div class="flex gap-x-2 items-center text-gray-600">
          <Clock class="w-4 h-4" />
          <p>{{ job.jobType }}</p>
        </div>

        <div class="flex gap-x-2 items-center text-gray-600">
          <BriefcaseBusiness class="w-4 h-4" />
          <p>{{ job.jobLevel }}</p>
        </div>

        <div class="flex gap-x-2 items-center text-gray-600">
          <Banknote class="w-4 h-4" />
          <p>{{ job.salary_min }} - {{ job.salary_max }} THB/month</p>
        </div>
      </div>

      <div v-if="userRole === 'student'"class="mt-4 flex gap-x-2">
        <!-- Action Buttons -->
        <button
          class="bg-gradient-to-r from-green-600 to-green-700 hover:to-green-600 text-white px-8 py-1 rounded-md"
        >
          Apply
        </button>
        <button class="hover:bg-gray-200 border border-2 border-gray-600 px-8 py-1 rounded-md">
          Save
        </button>
      </div>

      <p class="mt-12">{{ job.description }}</p>

      <div class="mb-12">
        <p class="font-bold mt-12">Skills</p>
        <div class="flex flex-wrap gap-2 mt-2">
          <p
            v-for="(skill, i) in job.skills"
            :key="i"
            class="text-white px-4 py-1 rounded-3xl"
            :class="`${techStackColors[skill] || techStackColors.Default}`"
          >
            {{ skill }}
          </p>
        </div>
      </div>

      <div v-if="job.tags && job.tags.length > 0" class="mb-12">
        <p class="font-bold">Tags</p>
        <div class="flex flex-wrap gap-2 mt-2">
          <p
            v-for="(tag, i) in job.tags"
            :key="i"
            class="text-white px-4 py-1 rounded-3xl bg-blue-500"
          >
            {{ tag }}
          </p>
        </div>
      </div>

      <div v-if="job.contacts && job.contacts.length > 0" class="mb-20">
        <p class="font-bold">Contact Information</p>
        <div class="flex flex-col gap-y-2 mt-2">
          <div
            v-for="(contact, i) in job.contacts"
            :key="i"
            class="flex gap-x-2 items-center"
          >
            <component :is="IconMap[contact.type]" class="text-gray-500 w-4 h-4" />
            <p>{{ contact.link }}</p>
          </div>
        </div>
      </div>

      <p class="w-full text-sm text-gray-500 text-right py-8">{{ getPostTime(job.postTime) }}</p>
    </div>
  </div>
</template>
