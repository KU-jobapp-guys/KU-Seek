<script setup lang="ts">
import Header from '@/components/layouts/AppHeader.vue'
import DashboardStatCard from '@/components/dashboards/StatCards/StatCard.vue'
import StudentJobCard from '@/components/dashboards/StudentJobCard.vue'
import { BriefcaseBusiness, Bookmark, Eye } from 'lucide-vue-next'
import appliedIcon from '@/assets/applied-icon.svg'
import bigBookmarkIcon from '@/assets/big-bookmark-icon.svg'
import searchIcon from '@/assets/search-icon.svg'
</script>

<template>
  <div class="dashboard-bg min-h-screen pb-0">
    <!-- Main Dashboard Section -->
    <Header page="studentDashboard" />
    <!-- 3 boxes: perfectly centered between black and white -->
    <div class="relative -mt-24 md:-mt-40 px-[8vw] md:px-[12vw] flex gap-x-16">
      <DashboardStatCard
        title="Applied Jobs"
        :value="6"
        description="Jobs you've applied"
        :icon="BriefcaseBusiness"
        cardClass="bg-red-400 rounded-xl p-8 flex-1 text-white relative shadow-lg overflow-hidden"
      />
      <DashboardStatCard
        title="Bookmarked Jobs"
        :value="6"
        description="Jobs saved for later"
        :icon="Bookmark"
        cardClass="bg-blue-400 rounded-xl p-8 flex-1 text-white relative shadow-lg overflow-hidden"
      />
      <DashboardStatCard
        title="Recently Viewed Jobs"
        :value="7"
        description="Jobs you've explored today"
        :icon="Eye"
        cardClass="bg-yellow-400 rounded-xl p-8 flex-1 text-white relative shadow-lg overflow-hidden"
      />
    </div>

    <!-- Applied Jobs Section -->
    <section class="px-[8vw] md:px-[12vw] pt-40 pb-10 bg-white">
      <div class="flex items-center mb-4">
        <img :src="appliedIcon" alt="Applied" class="w-12 h-12 mr-2" />
        <h2 class="text-black text-6xl font-bold">Applied Jobs</h2>
      </div>
      <input
        type="text"
        placeholder="Search here.."
        class="w-full p-3 rounded-lg border mb-8 text-black"
      />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StudentJobCard
          company="Techhahaha Inc."
          job="Frontend Developer"
          place="Nonthaburi, Thailand"
          days="3 days ago"
          description="Our company is so good!!! ..."
          type="Full-time"
          :applied="true"
          :bookmarked="true"
          cardClass="border-red-200 hover:bg-red-400 hover:border-red-400"
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
        <StudentJobCard
          company="Techhahaha Inc."
          job="Frontend Developer"
          place="Nonthaburi, Thailand"
          days="3 days ago"
          description="Our company is so good!!! ..."
          type="Full-time"
          :applied="true"
          :bookmarked="false"
          cardClass="border-red-200 hover:bg-red-400 hover:border-red-400"
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
        <StudentJobCard
          company="Techhahaha Inc."
          job="Frontend Developer"
          place="Nonthaburi, Thailand"
          days="3 days ago"
          description="Our company is so good!!! ..."
          type="Full-time"
          :applied="true"
          :bookmarked="false"
          cardClass="border-red-200 hover:bg-red-400 hover:border-red-400"
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

    <!-- Bookmarked Jobs Section -->
    <section class="px-[8vw] md:px-[12vw] py-10 bg-white">
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
        <StudentJobCard
          company="Techhahaha Inc."
          job="Frontend Developer"
          place="Nonthaburi, Thailand"
          days="3 days ago"
          description="Our company is so good!!! ..."
          type="Full-time"
          :applied="true"
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
        <StudentJobCard
          company="Techhahaha Inc."
          job="Frontend Developer"
          place="Nonthaburi, Thailand"
          days="3 days ago"
          description="Our company is so good!!! ..."
          type="Full-time"
          :applied="false"
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
        <StudentJobCard
          company="Techhahaha Inc."
          job="Frontend Developer"
          place="Nonthaburi, Thailand"
          days="3 days ago"
          description="Our company is so good!!! ..."
          type="Full-time"
          :applied="false"
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
    <section class="px-[8vw] md:px-[12vw] py-10 bg-white">
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
        <StudentJobCard
          company="Techhahaha Inc."
          job="Frontend Developer"
          place="Nonthaburi, Thailand"
          days="3 days ago"
          description="Our company is so good!!! ..."
          type="Full-time"
          :applied="false"
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
        <StudentJobCard
          company="Techhahaha Inc."
          job="Frontend Developer"
          place="Nonthaburi, Thailand"
          days="3 days ago"
          description="Our company is so good!!! ..."
          type="Full-time"
          :applied="true"
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
        <StudentJobCard
          company="Techhahaha Inc."
          job="Frontend Developer"
          place="Nonthaburi, Thailand"
          days="3 days ago"
          description="Our company is so good!!! ..."
          type="Full-time"
          :applied="true"
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
