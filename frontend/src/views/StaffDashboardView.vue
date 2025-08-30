<script setup lang="ts">
import DashboardStatCard from '@/components/dashboards/DashboardStatCard.vue'
import StaffJobCard from '@/components/dashboards/StaffJobCard.vue'

import bigBookmarkIcon from '@/assets/big-bookmark-icon.svg'
import searchIcon from '@/assets/search-icon.svg'
</script>

<template>
  <div class="dashboard-bg min-h-screen pb-0">
    <!-- Main Dashboard Section -->
    <section
      class="bg-black text-white top-0 bottom-10 px-12 pt-10 pb-0 relative overflow-visible min-h-[500px]"
    >
      <img
        src="@/assets/dashboard-pic.png"
        alt="Dashboard Illustration"
        class="absolute top-8 right-16 w-[600px] h-auto object-cover z-0"
      />
      <img
        src="@/assets/dashboard-illustration.png"
        alt="Dashboard Line"
        class="absolute left-0 top-16 w-full h-auto object-cover z-20"
      />
      <h1 class="text-8xl font-bold mb-2 z-10 relative">My Dashboard</h1>
      <p class="text-3xl mb-8 z-10 relative">Welcome back!</p>
      <!-- 3 boxes: perfectly centered between black and white -->
      <div
        class="flex flex-row space-x-8 absolute left-1/2 -translate-x-1/2 bottom-[-90px] w-[80%] z-30"
      >
        <DashboardStatCard
          title="Bookmarked Jobs"
          :value="6"
          description="Jobs saved for later"
          :icon="bigBookmarkIcon"
          cardClass="bg-blue-400 rounded-xl p-8 flex-1 text-white relative shadow-lg overflow-hidden"
        />
        <DashboardStatCard
          title="Recently Viewed Jobs"
          :value="7"
          description="Jobs you've explored today"
          :icon="searchIcon"
          cardClass="bg-yellow-400 rounded-xl p-8 flex-1 text-white relative shadow-lg overflow-hidden"
        />
      </div>
    </section>

    <!-- Bookmarked Jobs Section -->
    <section class="px-12 pt-40 py-10 bg-white">
      <div class="flex items-center mb-4">
        <img :src="bigBookmarkIcon" alt="Bookmarked" class="w-12 h-12 mr-2" />
        <h2 class="text-black text-6xl font-bold">Bookmarked Jobs</h2>
      </div>
      <input
        type="text"
        placeholder="Search here.."
        class="w-full p-3 rounded-lg border mb-8 text-black"
      />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StaffJobCard
          company="Techhahaha Inc."
          job="Frontend Developer"
          place="Nonthaburi, Thailand"
          days="3 days ago"
          description="Our company is so good!!! ..."
          type="Full-time"
          :bookmarked="true"
          cardClass="border-blue-200 hover:bg-blue-400 hover:border-blue-400"
          :tags="[
            { label: 'React', color: 'text-blue-700', bg: 'bg-blue-100' },
            { label: 'CSS', color: 'text-orange-700', bg: 'bg-orange-100' },
            { label: 'TypeScript', color: 'text-yellow-700', bg: 'bg-yellow-100' },
            { label: 'Python', color: 'text-pink-700', bg: 'bg-pink-100' },
            { label: 'React', color: 'text-blue-700', bg: 'bg-blue-100' },
            { label: 'CSS', color: 'text-orange-700', bg: 'bg-orange-100' },
            { label: 'TypeScript', color: 'text-yellow-700', bg: 'bg-yellow-100' },
            { label: 'Python', color: 'text-pink-700', bg: 'bg-pink-100' },
            { label: '+7 more', color: 'text-blue-700', bg: 'bg-blue-200' },
          ]"
        />
        <StaffJobCard
          company="Techhahaha Inc."
          job="Frontend Developer"
          place="Nonthaburi, Thailand"
          days="3 days ago"
          description="Our company is so good!!! ..."
          type="Full-time"
          :bookmarked="true"
          cardClass="border-blue-200 hover:bg-blue-400 hover:border-blue-400"
          :tags="[
            { label: 'React', color: 'text-blue-700', bg: 'bg-blue-100' },
            { label: 'CSS', color: 'text-orange-700', bg: 'bg-orange-100' },
            { label: 'TypeScript', color: 'text-yellow-700', bg: 'bg-yellow-100' },
            { label: 'Python', color: 'text-pink-700', bg: 'bg-pink-100' },
            { label: 'React', color: 'text-blue-700', bg: 'bg-blue-100' },
            { label: 'CSS', color: 'text-orange-700', bg: 'bg-orange-100' },
            { label: 'TypeScript', color: 'text-yellow-700', bg: 'bg-yellow-100' },
            { label: 'Python', color: 'text-pink-700', bg: 'bg-pink-100' },
            { label: '+7 more', color: 'text-blue-700', bg: 'bg-blue-200' },
          ]"
        />
        <StaffJobCard
          company="Techhahaha Inc."
          job="Frontend Developer"
          place="Nonthaburi, Thailand"
          days="3 days ago"
          description="Our company is so good!!! ..."
          type="Full-time"
          :bookmarked="true"
          cardClass="border-blue-200 hover:bg-blue-400 hover:border-blue-400"
          :tags="[
            { label: 'React', color: 'text-blue-700', bg: 'bg-blue-100' },
            { label: 'CSS', color: 'text-orange-700', bg: 'bg-orange-100' },
            { label: 'TypeScript', color: 'text-yellow-700', bg: 'bg-yellow-100' },
            { label: 'Python', color: 'text-pink-700', bg: 'bg-pink-100' },
            { label: 'React', color: 'text-blue-700', bg: 'bg-blue-100' },
            { label: 'CSS', color: 'text-orange-700', bg: 'bg-orange-100' },
            { label: 'TypeScript', color: 'text-yellow-700', bg: 'bg-yellow-100' },
            { label: 'Python', color: 'text-pink-700', bg: 'bg-pink-100' },
            { label: '+7 more', color: 'text-blue-700', bg: 'bg-blue-200' },
          ]"
        />
      </div>
      <div
        class="text-right mt-4 text-green-600 font-semibold text-3xl cursor-pointer hover:text-green-800"
      >
        View More +
      </div>
    </section>

    <!-- Recently Viewed Jobs Section -->
    <section class="px-12 py-10 bg-white">
      <div class="flex items-center mb-4">
        <img :src="searchIcon" alt="Search" class="w-12 h-12 mr-2" />
        <h2 class="text-black text-6xl font-bold">Recently Viewed Jobs</h2>
      </div>
      <input
        type="text"
        placeholder="Search here.."
        class="w-full p-3 rounded-lg border mb-8 text-black"
      />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StaffJobCard
          company="Techhahaha Inc."
          job="Frontend Developer"
          place="Nonthaburi, Thailand"
          days="3 days ago"
          description="Our company is so good!!! ..."
          type="Full-time"
          :bookmarked="false"
          cardClass="border-yellow-200 hover:bg-yellow-400 hover:border-yellow-400"
          :tags="[
            { label: 'React', color: 'text-blue-700', bg: 'bg-blue-100' },
            { label: 'CSS', color: 'text-orange-700', bg: 'bg-orange-100' },
            { label: 'TypeScript', color: 'text-yellow-700', bg: 'bg-yellow-100' },
            { label: 'Python', color: 'text-pink-700', bg: 'bg-pink-100' },
            { label: 'React', color: 'text-blue-700', bg: 'bg-blue-100' },
            { label: 'CSS', color: 'text-orange-700', bg: 'bg-orange-100' },
            { label: 'TypeScript', color: 'text-yellow-700', bg: 'bg-yellow-100' },
            { label: 'Python', color: 'text-pink-700', bg: 'bg-pink-100' },
            { label: '+7 more', color: 'text-blue-700', bg: 'bg-blue-200' },
          ]"
        />
        <StaffJobCard
          company="Techhahaha Inc."
          job="Frontend Developer"
          place="Nonthaburi, Thailand"
          days="3 days ago"
          description="Our company is so good!!! ..."
          type="Full-time"
          :bookmarked="true"
          cardClass="border-yellow-200 hover:bg-yellow-400 hover:border-yellow-400"
          :tags="[
            { label: 'React', color: 'text-blue-700', bg: 'bg-blue-100' },
            { label: 'CSS', color: 'text-orange-700', bg: 'bg-orange-100' },
            { label: 'TypeScript', color: 'text-yellow-700', bg: 'bg-yellow-100' },
            { label: 'Python', color: 'text-pink-700', bg: 'bg-pink-100' },
            { label: 'React', color: 'text-blue-700', bg: 'bg-blue-100' },
            { label: 'CSS', color: 'text-orange-700', bg: 'bg-orange-100' },
            { label: 'TypeScript', color: 'text-yellow-700', bg: 'bg-yellow-100' },
            { label: 'Python', color: 'text-pink-700', bg: 'bg-pink-100' },
            { label: '+7 more', color: 'text-blue-700', bg: 'bg-blue-200' },
          ]"
        />
        <StaffJobCard
          company="Techhahaha Inc."
          job="Frontend Developer"
          place="Nonthaburi, Thailand"
          days="3 days ago"
          description="Our company is so good!!! ..."
          type="Full-time"
          :bookmarked="true"
          cardClass="border-yellow-200 hover:bg-yellow-400 hover:border-yellow-400"
          :tags="[
            { label: 'React', color: 'text-blue-700', bg: 'bg-blue-100' },
            { label: 'CSS', color: 'text-orange-700', bg: 'bg-orange-100' },
            { label: 'TypeScript', color: 'text-yellow-700', bg: 'bg-yellow-100' },
            { label: 'Python', color: 'text-pink-700', bg: 'bg-pink-100' },
            { label: 'React', color: 'text-blue-700', bg: 'bg-blue-100' },
            { label: 'CSS', color: 'text-orange-700', bg: 'bg-orange-100' },
            { label: 'TypeScript', color: 'text-yellow-700', bg: 'bg-yellow-100' },
            { label: 'Python', color: 'text-pink-700', bg: 'bg-pink-100' },
            { label: '+7 more', color: 'text-blue-700', bg: 'bg-blue-200' },
          ]"
        />
      </div>
      <div
        class="text-right mt-4 text-green-600 font-semibold text-3xl cursor-pointer hover:text-green-800"
      >
        View More +
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard-bg {
  background: #f5f6fa;
  min-height: 100vh;
  position: relative;
}
section.bg-black {
  position: relative;
  padding-bottom: 0;
}
</style>
