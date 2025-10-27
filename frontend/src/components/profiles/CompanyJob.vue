<script setup lang="ts">
import { ref } from 'vue'
import type { Job } from '@/types/jobType'
import { techStackColors } from '@/configs/techStackConfig'
import { MapPin, Clock } from 'lucide-vue-next'
import { getPostTime } from '@/libs/getPostTime'
import { isOwner } from '@/libs/userUtils'
import { getStatusIcon } from '@/libs/getStatusStyle'

const props = defineProps<{ job: Job }>()
const { job } = props
const isCompanyOwner = isOwner(job.company) || true
const displayedSkills = ref(job.skills.slice(0, 3))
const isExpandedSkill = ref(false)

const toggleSkillsExpansion = () => {
  isExpandedSkill.value = !isExpandedSkill.value
  if (isExpandedSkill.value) {
    displayedSkills.value = job.skills
  } else {
    displayedSkills.value = job.skills.slice(0, 3)
  }
}
</script>

<template>
  <component
    :is="!isOwner('1234') && job.status === 'approved' ? 'router-link' : 'div'"
    :to="!isOwner('1234') ? `/company/manage-job/${job.jobId}` : undefined"
    class="flex flex-col bg-white ring-1 ring-[#B1B1B1] ring-inset py-8 md:py-12 px-8 rounded-xl shadow-md h-full justify-between gap-y-4"
  >
    <div class="flex flex-col">
      <!-- <h3 class="text-[#636363] text-sm">{{ job.company }}</h3> -->
      <div v-if="job.status === 'approved'" class="flex justify-end mb-2">
        <div class="flex rounded-full overflow-hidden text-sm font-medium text-white py-0.5">
          <div class="bg-red-200 text-orange-600 px-4">
            <span class="font-bold text-red-500">{{ job.pendingApplicants }}</span> Pending
          </div>
        </div>
      </div>

      <h2 class="flex items-center gap-x-2">
        <component
          v-if="isCompanyOwner"
          :is="getStatusIcon(job.status)"
          class="w-6 h-6 p-1 rounded-full text-white flex-shrink-0"
          :class="{
            'bg-green-500': job.status === 'approved',
            'bg-gray-500': job.status === 'pending',
            'bg-red-500': job.status === 'rejected',
          }"
        />
        <span class="text-2xl font-bold">{{ job.role }}</span>
      </h2>

      <div class="pl-2 text-base">
        <div class="flex items-center mt-2 gap-x-1 gap-x-1.5">
          <MapPin class="w-4 h-4" />
          <span>{{ job.location }}</span>
        </div>

        <div class="flex items-center mb-2 gap-x-1 gap-x-1.5">
          <Clock class="w-4 h-4" />
          <span> {{ getPostTime(job.postTime) }} </span>
        </div>
      </div>

      <p class="mt-2 md:mt-4 line-clamp-3">{{ job.description }}</p>
    </div>

    <div class="flex flex-col gap-y-2">
      <p class="text-[#5696F6] font-bold">{{ job.jobType }}</p>

      <!-- Skills -->
      <div class="flex gap-1 flex-wrap">
        <div v-for="(skill, index) in displayedSkills" :key="index">
          <div
            class="rounded-full bg-[#5C56F6] text-white py-1 px-3 text-xs whitespace-nowrap"
            :class="`${techStackColors[skill] || techStackColors.Default}`"
          >
            {{ skill }}
          </div>
        </div>

        <!-- Skill Toggle Button -->
        <div v-if="job.skills.length > 3">
          <button
            @click.stop.prevent="toggleSkillsExpansion"
            class="rounded-full bg-gray-200 text-gray-600 py-1 px-3 text-xs hover:bg-gray-300 transition-colors duration-200 whitespace-nowrap"
          >
            {{ isExpandedSkill ? 'Show less' : `+ ${job.skills.length - 3} more` }}
          </button>
        </div>
      </div>

      <router-link
        :to="`/job/${job.jobId}`"
        class="mt-8 bg-gray-400 text-white font-bold rounded-md self-end py-2 px-6 text-sm hover:bg-gray-500"
      >
        View Details
      </router-link>
    </div>
  </component>
</template>
