<script setup lang="ts">
import type { ProfessorProfile } from '@/types/profileType'
import { Building2Icon } from 'lucide-vue-next'

const props = defineProps<{ professorData: ProfessorProfile }>()
const { professorData } = props
</script>

<template>
  <div
    class="bg-white flex flex-col ring-1 ring-[#B1B1B1] ring-inset p-8 md:p-12 gap-y-4 rounded-xl shadow-md"
  >
    <div class="flex items-center gap-x-2">
      <div class="w-12 h-12 flex items-center justify-center bg-green-600 rounded-full text-white">
        <Building2Icon />
      </div>
      <h2 class="font-bold text-2xl">Overview</h2>
    </div>

    <div class="flex flex-col md:pl-4 gap-y-1">
      <p>
        <span class="font-medium block md:inline">Department: </span>
        {{ professorData.department }}
      </p>
      <p>
        <span class="font-medium block md:inline">Academic Position: </span>
        {{ professorData.position }}
      </p>
      <p>
        <span class="font-medium block md:inline">Office Location:</span>
        {{ professorData.office_location }}
      </p>
      <p>
        <span class="font-medium block md:inline">Research Interest:</span>
        {{ professorData.research_interest }}
      </p>
    </div>

    <p>{{ professorData.about }}</p>
  </div>
</template>
