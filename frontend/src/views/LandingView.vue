<template>
  <div class="relative w-full overflow-hidden">
    <div class="flex flex-col md:flex-row relative z-10">
      <!-- Title Section -->
      <div class="bg-black text-white p-8 md:p-16 flex-1 pb-40">
        <div class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold w-full">KU Seek</div>
        <div class="mt-4 text-sm sm:text-base md:text-lg w-full">
          Your Gateway to Jobs & Internships in Computer Engineering
        </div>
        <div>
          <RouterLink to="/registration" custom v-slot="{ navigate }">
            <button
              @click="navigate"
              class="px-4 py-2 mt-8 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 text-sm sm:text-base"
            >
              Join Our Network Now
            </button>
          </RouterLink>
        </div>
      </div>

      <!-- Logo Section -->
      <div class="bg-[#FFAC13] flex-1 flex justify-center items-center relative p-8 pb-12">
          <img src="@/assets/icons/computerWithMug.svg" alt="Computer with mug" class="w-full h-full max-w-md object-contain" />
      </div>
    </div>

    <!-- header's footer -->
    <svg
      class="absolute bottom-0 left-0 w-full z-10"
      viewBox="0 0 1440 150"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0,50 C480,150 960,-50 1440,50 L1440,150 L0,150 Z" fill="white" />
      <path d="M0,50 C480,150 960,-50 1440,50" fill="none" stroke="#007BFF" stroke-width="4" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>
