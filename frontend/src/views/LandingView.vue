<template>
  <!-- Header Section -->
  <section class="relative w-full overflow-hidden">
    <div class="flex relative z-10 md:h-[560px] min-h-[400px]">
      <!-- Title Section -->
      <div class="bg-black text-white px-[8vw] md:px-[12vw] pt-20 pb-40">
        <div class="text-6xl font-bold w-full">KU Seek</div>
        <div class="mt-4 text-lg w-full">
          Your Gateway to Jobs & Internships in Computer Engineering
        </div>
        <div class="mt-8 gap-x-4 flex flex-wrap max-w-[300px]">
          <router-link to="/registration"
            class="px-6 py-2.5 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            Join Our Network Now
          </router-link>
        </div>
      </div>

      <!-- Logo Section -->
      <div class="bg-[#FFAC13] flex-1 relative p-8 pb-48">
        <img 
          src="@/assets/icons/computerWithMug.png" 
          alt="Computer with mug" 
          class="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 h-full object-contain" 
        />
      </div>
    </div>

    <!-- header's footer -->
    <svg
      class="absolute left-0 w-full z-10 block"
      style="bottom: -2px"
      viewBox="0 0 1440 200"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0,80 C360,200 1080,-70 1440,80 L1440,250 L0,250 Z"
        fill="white"
      />
    </svg>
  </section>

  <!-- Banner Section -->
  <section class="relative h-[280px] flex items-center justify-center mt-16 md:mt-8">
    <img
      src="@/assets/icons/landingLine.svg"
      alt="decorative lines"
      class="absolute -translate-y-1/5 -mt-16 left-0 h-[40vw] max-h-[500px] w-auto object-left object-cover z-20"
    />
    
    <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center px-[8vw] md:px-[12vw]">
      <div class="relative z-50 flex flex-col md:flex-row items-start -mt-24 md:mt-0 md:items-center justify-between gap-4 w-full">
        <img
          src="@/assets/icons/landingBanner.svg"
          alt="Connect Students with Careers"
          class="-ml-16 h-[160px] md:h-[24vw] flex-shrink-0 object-contain"
        />
        <div class="text-white">
          <h1 class="text-4xl font-bold">Connect Students with Careers,</h1>
          <p class="text-2xl mt-2">From Campus to Industry</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <FeatureCarousel />
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import FeatureCarousel from '@/components/landing/FeatureCarousel.vue';
</script>
