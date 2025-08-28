<template>
  <div class="dashboard-bg min-h-screen">
    <!-- Header Section -->
    <header
      class="bg-gradient-to-r from-green-400 to-green-700 flex items-center justify-between px-8 py-4"
    >
      <div class="font-bold text-white text-xl">KU SEEK</div>
      <nav class="flex space-x-8 text-white">
        <router-link to="/announcements">Announcements</router-link>
        <router-link to="/explore-job">Explore Job</router-link>
        <router-link to="/explore-company">Explore Company</router-link>
        <router-link to="/board">Board</router-link>
        <router-link to="/dashboard" class="font-bold underline">Dashboard</router-link>
        <router-link to="/profile">Profile</router-link>
      </nav>
    </header>

    <!-- Main Dashboard Section -->
    <section class="bg-black text-white px-12 py-10 relative">
      <h1 class="text-5xl font-bold mb-2">My Dashboard</h1>
      <p class="text-xl mb-8">Welcome back!</p>
      <img
        src="@/assets/dashboard-illustration.png"
        alt="Dashboard Illustration"
        class="absolute top-8 right-16 w-64 h-auto"
      />
      <!-- Decorative line (SVG or CSS) can be added here -->
      <div class="flex space-x-8 mt-16">
        <div class="bg-blue-700 rounded-xl p-8 flex-1 relative text-white">
          <div class="text-lg mb-2">Bookmarked Jobs</div>
          <div class="text-5xl font-bold">6</div>
          <div class="mt-2">Jobs saved for later</div>
          <img
            src="@/assets/star-icon.svg"
            alt="Star"
            class="absolute bottom-4 right-4 w-16 h-16 opacity-30"
          />
        </div>
        <div class="bg-white border-4 border-yellow-400 rounded-xl p-8 flex-1 text-black relative">
          <div class="text-lg mb-2">Recently Viewed Jobs</div>
          <div class="text-5xl font-bold">7</div>
          <div class="mt-2">Jobs you've explored today</div>
          <img
            src="@/assets/search-icon.svg"
            alt="Search"
            class="absolute bottom-4 right-4 w-16 h-16 opacity-30"
          />
        </div>
      </div>
    </section>

    <!-- Bookmarked Jobs Section -->
    <section class="px-12 py-10">
      <div class="flex items-center mb-4">
        <img src="@/assets/star-icon.svg" alt="Star" class="w-8 h-8 mr-2" />
        <h2 class="text-3xl font-bold">Bookmarked Jobs</h2>
      </div>
      <input type="text" placeholder="Search here.." class="w-full p-3 rounded-lg border mb-8" />
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <JobCard v-for="n in 3" :key="n" />
      </div>
      <div class="text-right mt-4 text-green-700 font-semibold cursor-pointer">View More +</div>
    </section>

    <!-- Decorative bottom wave -->
    <div class="w-full h-16 bg-gradient-to-r from-green-400 to-green-700 rounded-t-3xl mt-12"></div>
  </div>
</template>

<script setup>
import JobCard from '@/components/JobCard.vue'
</script>

<style scoped>
.dashboard-bg {
  background: #f5f6fa;
  min-height: 100vh;
  position: relative;
}
</style>
