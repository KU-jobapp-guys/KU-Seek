<template>
  <div class="relative w-full min-h-screen overflow-hidden bg-white flex justify-center items-center">
    <!-- Background -->
    <div class="absolute inset-0 flex">
      <!-- Left side background -->
      <div class="relative w-1/2 bg-[#2b2b2b]">
        <svg
          viewBox="0 0 960 480"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 260 C150 220 280 220 400 260 C520 300 600 380 760 340 C860 310 920 260 960 280 L960 480 L0 480 Z"
            fill="#F4E172"
          />
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

    <RouterLink
    to="/"
    class="absolute top-6 left-6 z-20 text-white font-semibold hover:underline transition"
  >
    <span class="text-lg">← </span>
    <span>Back to Landing Page</span>
  </RouterLink>

    <!-- Foreground Content -->
    <div class="relative z-10 flex w-full h-full justify-center items-end">
      <!-- Join Us Box -->
      <div class="bg-[#0068FF]/90 text-white p-10 rounded-l-xl shadow-xl flex flex-col justify-between w-[37.5%] h-[60vh]">
        <div>
          <h1 class="text-5xl font-bold mb-2">Join Us</h1>
          <p class="text-lg text-blue-100">Find the right job for you</p>
        </div>
        <div
          class="flex-1 mt-6 bg-white/10 rounded-lg flex items-center justify-center text-center text-sm font-medium text-blue-100"
        >
          [ Illustration Image Here ]
        </div>
      </div>

      <!-- Register Box with Tabs -->
      <div class="w-[37.5%] flex flex-col items-center">
        <!-- Tabs on top -->
        <div class="flex w-full justify-center mb-0 rounded-t-lg overflow-hidden shadow-md">
          <button
            @click="form_role = 'staff'"
            :class="[
              'w-1/2 py-3 font-semibold text-center transition border-b-2',
              form_role === 'staff'
                ? 'bg-white text-blue-600 border-blue-600'
                : 'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200'
            ]"
          >
            Staff
          </button>
          <button
            @click="form_role = 'company'"
            :class="[
              'w-1/2 py-3 font-semibold text-center transition border-b-2',
              form_role === 'company'
                ? 'bg-white text-blue-600 border-blue-600'
                : 'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200'
            ]"
          >
            Company
          </button>
        </div>

        <!-- Register Card -->
        <div
          class="bg-white rounded-br-lg shadow-xl p-8 mb-2 w-full border-t-0 border-gray-200 flex flex-col h-[60vh] overflow-hidden"
        >
          <h2 class="text-3xl font-bold text-center mb-6 flex-shrink-0">Register</h2>

          <!-- Scrollable Fields -->
          <div class="flex-1 overflow-y-auto space-y-4">
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Shared Fields -->
              <div>
                <label class="block text-gray-600 text-sm mb-1">First Name</label>
                <input
                  type="text"
                  v-model="form.firstName"
                  class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label class="block text-gray-600 text-sm mb-1">Last Name</label>
                <input
                  type="text"
                  v-model="form.lastName"
                  class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your last name"
                />
              </div>

              <!-- Role-specific Fields -->
              <template v-if="form_role === 'staff'">
                <div>
                  <label class="block text-gray-600 text-sm mb-1">KU ID</label>
                  <input
                    type="text"
                    v-model="form.kuId"
                    class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your KU ID"
                  />
                </div>
              </template>

              <template v-else-if="form_role === 'company'">
                <div>
                  <label class="block text-gray-600 text-sm mb-1">Company Name</label>
                  <input
                    type="text"
                    v-model="form.companyName"
                    class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your company name"
                  />
                </div>
                <div>
                  <label class="block text-gray-600 text-sm mb-1">Business Email</label>
                  <input
                    type="email"
                    v-model="form.businessEmail"
                    class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your company email"
                  />
                </div>
              </template>
            </form>
          </div>

          <!-- Submit Button -->
          <button
            type="button"
            @click="handleSubmit"
            :disabled="!isFormValid"
            class="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            Register with Google Oauth
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'

const form_role = ref<'staff' | 'company'>('staff')

const form = reactive({
  kuId: '',
  firstName: '',
  lastName: '',
  companyName: '',
  businessEmail: '',
})

const isFormValid = computed(() => {
  if (!form.firstName || !form.lastName) return false
  if (form_role.value === 'staff') {
    return !!form.kuId
  }
  return form.companyName && form.businessEmail
})

function loginWithGoogle() {
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:5173/login&prompt=consent&response_type=code&client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&scope=openid%20email%20profile&access_type=offline`
}

function handleSubmit() {
  alert(`Form submitted for ${form_role.value}: ` + JSON.stringify(form, null, 2))
  loginWithGoogle()
}
</script>
