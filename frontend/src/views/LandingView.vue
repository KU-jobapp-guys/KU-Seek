<template>
  <div class="relative w-full overflow-hidden">
    <div class="flex flex-col md:flex-row relative z-10">
      <!-- Title Section -->
      <div class="bg-black text-white p-8 md:p-16 flex-1 pb-40">
        <div class="text-4xl font-bold w-full">
          KU Seek
        </div>
        <div class="mt-4 text-lg w-full">
          Your Gateway to Jobs & Internships in Computer Engineering
        </div>
        <div>
        <button @click="loginWithGoogle" class="px-4 py-2 mt-8 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Sign in with Google (Company)
        </button>
  </div>
      </div>

      <!-- Logo Section -->
      <div class="bg-orange-400 flex-1 flex justify-center items-center relative p-8 pb-40">
        <div
          class="w-72 h-72 bg-gray-200 rounded-md shadow-lg flex items-center justify-center text-black font-semibold"
        >
          Image Placeholder
        </div>
      </div>
    </div>

    <!-- header's footer -->
    <svg
      class="absolute bottom-0 left-0 w-full z-10"
      viewBox="0 0 1440 150"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,50 C480,150 960,-50 1440,50 L1440,150 L0,150 Z"
        fill="white"
      />
      <path
        d="M0,50 C480,150 960,-50 1440,50"
        fill="none"
        stroke="#007BFF"
        stroke-width="4"
      />
    </svg>
</div>
</template>

<script setup lang="ts">


function loginWithGoogle() {
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:5173/login&prompt=consent&response_type=code&client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&scope=openid%20email%20profile&access_type=offline`;
    }
</script>
