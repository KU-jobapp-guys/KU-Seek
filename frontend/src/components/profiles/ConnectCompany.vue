<script setup lang="ts">
import type { CompanyProfile } from '@/types/profileType'

const props = defineProps<{ company: CompanyProfile }>()
const { company } = props
</script>

<template>
  <div
    class="relative bg-white rounded-xl border border-[#B1B1B1] w-full h-[160px] shadow-md overflow-hidden hover:bg-gray-100 hover:cursor-pointer"
  >
    <router-link :to="`/company/profile/${company.id}`">
      <!-- Background -->
      <div class="absolute inset-0">
        <div
          class="absolute right-0 top-0 h-full w-[40%] md:w-[80%]"
          style="clip-path: polygon(60% 0, 100% 0, 100% 100%, 40% 100%)"
        >
          <img
            :src="company.bannerPhoto"
            class="w-full h-full object-cover text-white"
            alt="banner"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Content -->
      <div class="relative px-8 md:px-12 h-full w-full flex justify-between items-center">
        <div class="flex flex-col">
          <span class="flex gap-x-4 items-start md:items-center">
            <h1 class="font-bold text-2xl mb-2">{{ company.name }}</h1>
            <p class="flex text-white px-2 bg-blue-500 gap-x-1 rounded-full">
              14 <span class="hidden md:block"> Jobs</span>
            </p>
          </span>
          <p>{{ company.type }}</p>
          <p class="text-gray-500">{{ company.location }}</p>
        </div>

        <img
          :src="company.profilePhoto"
          class="hidden md:block w-28 h-28 rounded-full border-[4px] border-gray-400 overflow-hidden bg-black"
          alt="Profile"
        />
      </div>
    </router-link>
  </div>
</template>
