<script setup lang="ts">
import { ref } from 'vue'
import type { Job } from '@/types/jobType';
import { techStackColors } from '@/configs/techStackConfig';
import { MapPin, Clock } from 'lucide-vue-next';
import { getPostTime } from '@/libs/getPostTime';

const props = defineProps<{ job: Job }>()
const { job } = props

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
  <div class="flex flex-col bg-white ring-1 ring-[#B1B1B1] ring-inset py-8 md:py-12 px-8 rounded-xl shadow-md h-full justify-between gap-y-4">
    <div class="flex flex-col">
      <!-- <h3 class="text-[#636363] text-sm">{{ job.company }}</h3> -->
      <h2 class="text-2xl font-bold">{{ job.role }}</h2>
      
      <div class="pl-2">
        <div class="flex items-center mt-2 gap-x-1 gap-x-1.5">
          <MapPin class="w-4 h-4"/>
          <span>{{ job.location }}</span>
        </div>

        <div class="flex items-center mb-2 gap-x-1 gap-x-1.5" >
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
            @click="toggleSkillsExpansion"
            class="rounded-full bg-gray-200 text-gray-600 py-1 px-3 text-xs hover:bg-gray-300 transition-colors duration-200 whitespace-nowrap"
          >
            {{ isExpandedSkill ? "Show less" : `+ ${job.skills.length - 3} more` }}
          </button>
        </div>

      </div>

      <router-link :to="`/job/${job.jobId}`" class="mt-8 bg-gradient-to-r from-blue-500 to-blue-600  text-white font-bold rounded-md self-end py-2 px-6 text-sm hover:bg-gray-500">
        View Details
      </router-link>
    </div>
  </div>
</template>