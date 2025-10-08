<template>
  <div class="relative w-full min-h-screen overflow-hidden bg-white flex justify-center items-center">
    <div class="absolute inset-0 flex">
      <!-- Left side background -->
      <div class="relative w-1/2 bg-[#2b2b2b]">
        <svg
          viewBox="0 0 960 480"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <!-- Middle yellow wave -->
          <path
            d="M0 260 C150 220 280 220 400 260 C520 300 600 380 760 340 C860 310 920 260 960 280 L960 480 L0 480 Z"
            fill="#F4E172"
          />
          <!-- Bottom orange wave -->
          <path
            d="M0 300 C150 260 280 260 400 300 C520 340 600 420 760 380 C860 350 920 300 960 320 L960 480 L0 480 Z"
            fill="#FFA40C"
          />
        </svg>
      </div>

      <!-- Right side background -->
      <div class="relative w-1/2 bg-white">
        <svg
          viewBox="0 0 960 480"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <!-- Yellow scribble -->
          <path
            d="M80 120 
              C180 20, 320 60, 420 180
              C520 300, 600 40, 720 120
              C840 200, 880 280, 940 260"
            stroke="#F4E172"
            stroke-width="5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <!-- Orange scribble -->
          <path
            d="M60 340 
              C200 260, 340 400, 460 320
              C580 240, 640 440, 760 360
              C880 280, 940 400, 960 380"
            stroke="#FFA40C"
            stroke-width="6"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <!-- Foreground Content -->
    <div class="relative z-10 flex w-full h-full justify-center items-stretch">
      <!-- Join Us Box -->
      <div class="bg-[#0068FF]/90 text-white p-10 rounded-l-xl shadow-xl flex flex-col justify-between w-[37.5%]">
        <div>
          <h1 class="text-4xl font-bold mb-2">Join Us</h1>
          <p class="text-lg text-blue-100">Find the right job for you</p>
        </div>
        <div
          class="flex-1 mt-6 bg-white/10 rounded-lg flex items-center justify-center text-center text-sm font-medium text-blue-100"
        >
          [ Illustration Image Here ]
        </div>
      </div>

      <!-- Register Box -->
      <div
        class="bg-white rounded-r-xl shadow-xl p-8 h-full w-[37.5%] border-l border-gray-200"
      >
        <!-- Tabs -->
        <div class="flex justify-center mb-6 space-x-4">
          <button
            @click="$emit('update:role', 'staff')"
            :class="[ 
              'px-4 py-2 rounded-full font-semibold transition', 
              props.role === 'staff' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
            ]"
          >
            Staff
          </button>
          <button
            @click="$emit('update:role', 'company')"
            :class="[ 
              'px-4 py-2 rounded-full font-semibold transition', 
              props.role === 'company' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
            ]"
          >
            Company
          </button>
        </div>

        <h2 class="text-2xl font-bold text-center mb-6">Register</h2>

        <!-- Registration Form -->
        <form class="space-y-4">
          <!-- Shared Fields -->
          <div>
            <label class="block text-gray-600 text-sm mb-1">KU ID</label>
            <input
              type="text"
              class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your KU ID"
            />
          </div>

          <div>
            <label class="block text-gray-600 text-sm mb-1">First Name</label>
            <input
              type="text"
              class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label class="block text-gray-600 text-sm mb-1">Last Name</label>
            <input
              type="text"
              class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your last name"
            />
          </div>

          <!-- Role-specific Fields -->
          <template v-if="props.role === 'company'">
            <div>
              <label class="block text-gray-600 text-sm mb-1">Company Name</label>
              <input
                type="text"
                class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your company name"
              />
            </div>
            <div>
              <label class="block text-gray-600 text-sm mb-1">Business Email</label>
              <input
                type="email"
                class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your company email"
              />
            </div>
          </template>

          <button
            type="submit"
            class="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-md hover:opacity-90 transition"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  role: String,
})

const emit = defineEmits(['update:role'])
</script>
