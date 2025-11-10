<template>
  <TOSModal v-model="showModal" @closetos="closeTOS" @agreetos="handleSubmit" />
  <button @click="showTOS">Show TOS</button>
  <div class="relative w-full min-h-screen mt-16 overflow-hidden bg-white flex justify-center items-center">
    <!-- Background -->
    <div class="absolute inset-0 flex">
      <!-- Left side background -->
      <div class="relative w-full md:w-1/2 bg-[#2b2b2b]">
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
      <div class="hidden md:block relative w-1/2 bg-white">
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

    <!-- Link back to landing page-->
    <RouterLink
    to="/"
    class="absolute top-6 left-6 z-20 text-white font-semibold hover:underline transition"
  >
    <span class="text-lg">← </span>
    <span>Back to Landing Page</span>
  </RouterLink>

    <!-- Foreground Content -->
    <div class="relative z-10 flex w-full h-full px-8 justify-center items-end">
      <!-- Join Us Box -->
      <div class="relative hidden md:flex bg-[#0068FF]/90 text-white p-10 rounded-l-xl shadow-xl flex-col gap-y-4 justify-between items-start w-[37.5%] h-[60vh]">
        <div>
          <h1 class="text-5xl font-bold mb-2">Join Us</h1>
          <p class="text-lg text-blue-100">{{ joinUsSubtitle }}</p>
        </div>

        <!-- Image container -->
        <div class="w-full flex justify-center items-end bg-white/10 rounded-lg overflow-hidden">
          <img
            src="@/assets/icons/checklist.svg"
            alt="checklist"
            class="w-auto h-full object-contain"
          />
        </div>
      </div>

      <!-- Register Box with Tabs -->
      <div class="w-full md:w-[37.5%] flex flex-col items-center">
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
          <div class="flex-1 overflow-y-auto space-y-4 px-2">
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
                    type="string"
                    v-model="form.kuId"
                    class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your KU ID ex: 6610541234"
                    maxlength="10"
                  />
                  <p v-if="form.kuId && !isKuIdValid" class="text-xs text-red-500 mt-1">
                    Invalid KU ID. Must contain only numbers and have a length of 10 digits.
                  </p>
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
                  <label class="block text-gray-600 text-sm mb-1">Company Size</label>
                  <select
                    v-model="form.companySize"
                    class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="" disabled selected>Select company size</option>
                    <option v-for="size in companySizeOptions" :key="size" :value="size">
                      {{ size }}
                    </option>
                  </select>
                </div>
              </template>

              <!-- Shared File Upload Field -->
              <div>
                <label class="block text-gray-600 text-sm mb-1">
                  {{ fileUploadLabel }}
                </label>
                <input
                  type="file"
                  @change="handleFileUpload"
                  accept="image/*,.pdf,.doc,.docx"
                  class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p v-if="form.fileName" class="text-xs text-gray-500 mt-1">
                  Selected: {{ form.fileName }}
                </p>
              </div>
            </form>
          </div>

          <!-- Submit Button -->
          <button
            type="button"
            @click="showTOS"
            :disabled="!isFormValid"
            class="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            Register with Google Oauth
          </button>

        <!-- Login button -->
          <div class="mt-4 text-sm text-gray-600 text-left">
            Already have an account?
            <button
              @click="loginWithGoogle()"
              class="text-blue-600 font-semibold hover:underline focus:outline-none ml-1"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'
import TOSModal from '@/components/tos/tosModal.vue'

const form_role = ref<'staff' | 'company'>('staff')
const showModal = ref<boolean>(false)
const checkedTOS = ref<boolean>(false)

const staffFileText = ref('Upload one of the following: Physical/Digital KU ID, Transcript')
const companyFileText = ref('Upload a business license or equivalent document')

const companySizeOptions = [
  'less than 100',
  '101 - 1,000',
  '1,001 - 10,000',
  'more than 10,000'
]

const form = reactive({
  type: form_role,
  kuId: '',
  firstName: '',
  lastName: '',
  companyName: '',
  companySize: '',
  file: null as File | null,
  fileName: '',
})

const regex = /^\d{10}$/ // checks if string is all numeric

const isKuIdValid = computed(() => {
  // If empty, it's valid (not required)
  if (!form.kuId) return true
  // If has value, must match regex
  return regex.test(form.kuId)
})

const fileUploadLabel = computed(() => {
  return form_role.value === 'staff' ? staffFileText.value : companyFileText.value
})

const joinUsSubtitle = computed(() => {
  return form_role.value === 'staff' ? 'Find the right job for you' : 'Find the right Nisit for you'
})

const isFormValid = computed(() => {
  // File is mandatory
  if (!form.file) return false
  if (!form.firstName || !form.lastName) return false
  if (form_role.value === 'staff') {
    // Block submission if KU ID is entered but invalid
    if (form.kuId && !regex.test(form.kuId)) return false
    return true
  }
  return form.companyName && form.companySize
})

// Clear role specific fields when changing tabs
watch(form_role, (newRole) => {
  form.file = null
  form.fileName = ''

  if (newRole === 'staff') {
    form.companyName = ''
    form.companySize = ''
  } else {
    form.kuId = ''
  }
})

function loginWithGoogle() {
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${import.meta.env.VITE_FRONTEND_URL}/login&prompt=consent&response_type=code&client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&scope=openid%20email%20profile&access_type=offline`
}

function showTOS() {
  showModal.value = true
}

function closeTOS() {
  showModal.value = false
}

async function handleSubmit() {
  // Store file separately as base64
  if (form.file) {
    const reader = new FileReader()
    reader.onload = async (e) => {
      const fileData = {
        name: form.fileName,
        type: form.file!.type,
        data: e.target!.result as string // base64 string
      }
      localStorage.setItem("userFile", JSON.stringify(fileData))
      
      // Store other form data without file
      const {...userDataWithoutFile } = form
      const user_data = JSON.stringify(userDataWithoutFile)
      localStorage.setItem("userInfo", user_data)
      
      loginWithGoogle()
    }
    reader.readAsDataURL(form.file)
  }
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    form.file = target.files[0]
    form.fileName = target.files[0].name
  }
}
</script>
