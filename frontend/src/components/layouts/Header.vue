<script setup lang="ts">
import { computed } from 'vue'

import briefcase from '@/assets/icons/briefcase.svg'
import jobBoardBg from '@/assets/backgrounds/jobBoardBg.png'
import jobBoardDeco from '@/assets/images/jobBoardDeco.png'

const props = defineProps({page: String});

interface HeaderConfig {
  title: string;
  detail: string;
  background: string;
  icon: string;
  deco: string;
}

const headerConfigs: Record<string, HeaderConfig> = {
  jobBoard: {
    title: "Explore Job & Internship",
    detail: "Search for opportunities and take the next step in your career.",
    background: jobBoardBg,
    icon: briefcase,
    deco: jobBoardDeco,
  },
  // add more page with their component here
};

const config = computed(() => headerConfigs[props.page || "dashBoard"]);
</script>

<template>
  <header class="relative h-[360px] w-full bg-black text-white overflow-hidden"> 
    <img :src="config.background" class="absolute bottom-0 w-full" />
    <div class="absolute inset-0 px-[12vw] pt-16 flex flex-col">
      <div class="w-full flex gap-x-8">
        <div class="flex-shrink-0 rounded-full bg-[#F9219B] h-20 w-20 p-4">
          <img :src="config.icon" class="w-full h-full" />
        </div>
        <div class="flex flex-col gap-y-2">
          <h1 class="text-4xl font-bold">{{ config.title }}</h1>
          <p>{{ config.detail }}</p>
        </div>
      </div>
    </div>
    <img :src="config.deco" class="absolute bottom-0 right-8 h-[280px] hidden lg:block" />
  </header>
</template>