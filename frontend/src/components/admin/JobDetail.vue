<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { Job } from '@/types/jobType'
import { fetchJobs } from '@/services/jobService'
import { useRouter } from 'vue-router'
import { MapPin, Clock, Banknote, BriefcaseBusiness } from 'lucide-vue-next'
import { techStackColors } from '@/configs/techStackConfig'
import { getPostTime } from '@/libs/getPostTime'
import { IconMap } from '@/configs/contactConfig'

const props = defineProps<{ jobId: string }>()
const router = useRouter()
const job = ref<Job | null>(null)

const loadJob = async (id?: string) => {
  if (!id) {
    job.value = null
    return
  }

  const list = await fetchJobs()
  job.value = list.find((j) => j.jobId === String(id)) || null

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
  <div v-if="job" class="h-full w-full shadow-xl relative overflow-y-auto mb-16">
    <img
        :src="job.bannerPhoto"
        alt="Company"
        class="relative w-full h-[240px] bg-gray-600 rounded-t-md"
      />

    <div class="absolute left-8 -translate-y-1/2">
      <img
        :src="job.profilePhoto"
        alt="Company"
        class="w-40 h-40 bg-black rounded-full border-8 border-white"
      />
    </div>

    <div class="px-12 mt-24">
      <div class="flex justify-between items-center">
        <p
          :to="`/job/${job.jobId}`"
          class="text-2xl font-bold"
          >{{ job.role }}</p
        >
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
          <p>{{ job.salaryMin }} - {{ job.salaryMax }} THB/month</p>
        </div>
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
          <div v-for="(contact, i) in job.contacts" :key="i" class="flex gap-x-2 items-center">
            <component :is="IconMap[contact.type]" class="text-gray-500 w-4 h-4" />
            <p>{{ contact.link }}</p>
          </div>
        </div>
      </div>

      <p class="w-full text-sm text-gray-500 text-right py-8">{{ getPostTime(job.postTime) }}</p>
    </div>
  </div>
</template>
