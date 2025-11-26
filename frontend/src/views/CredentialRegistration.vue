<template>
  <div class="relative w-full min-h-screen mt-8 overflow-hidden bg-white flex justify-center items-center">
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
            d="M80 120 C180 20, 320 60, 420 180 C520 300, 600 40, 720 120 C840 200, 880 280, 940 260"
            stroke="#F4E172"
            stroke-width="5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M60 340 C200 260, 340 400, 460 320 C580 240, 640 440, 760 360 C880 280, 940 400, 960 380"
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
      <!-- Validation Checklist Box -->
      <div class="relative hidden md:flex bg-[#0068FF]/90 text-white p-10 rounded-l-xl shadow-xl flex-col gap-y-4 justify-between items-start w-[37.5%] h-[60vh]">
        <div>
          <h1 class="text-5xl font-bold mb-2">Create Account</h1>
          <p class="text-lg text-blue-100">Complete registration with email and password</p>
        </div>

        <!-- Validation Checklist -->
        <div class="w-full space-y-4 flex-1 flex flex-col justify-center">
          <h3 class="text-xl font-semibold mb-2">Password Requirements:</h3>
          
          <!-- Email Valid -->
          <div class="flex items-center gap-3">
            <div :class="[
              'w-6 h-6 rounded-full flex items-center justify-center transition-all',
              isEmailValid ? 'bg-green-500' : 'bg-white/20'
            ]">
              <svg v-if="isEmailValid" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <span :class="isEmailValid ? 'font-semibold' : 'text-blue-100'">Valid email address</span>
          </div>

          <!-- At least 8 characters -->
          <div class="flex items-center gap-3">
            <div :class="[
              'w-6 h-6 rounded-full flex items-center justify-center transition-all',
              hasMinLength ? 'bg-green-500' : 'bg-white/20'
            ]">
              <svg v-if="hasMinLength" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <span :class="hasMinLength ? 'font-semibold' : 'text-blue-100'">At least 8 characters</span>
          </div>

          <!-- Has uppercase -->
          <div class="flex items-center gap-3">
            <div :class="[
              'w-6 h-6 rounded-full flex items-center justify-center transition-all',
              hasUppercase ? 'bg-green-500' : 'bg-white/20'
            ]">
              <svg v-if="hasUppercase" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <span :class="hasUppercase ? 'font-semibold' : 'text-blue-100'">Contains uppercase letter</span>
          </div>

          <!-- Has lowercase -->
          <div class="flex items-center gap-3">
            <div :class="[
              'w-6 h-6 rounded-full flex items-center justify-center transition-all',
              hasLowercase ? 'bg-green-500' : 'bg-white/20'
            ]">
              <svg v-if="hasLowercase" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <span :class="hasLowercase ? 'font-semibold' : 'text-blue-100'">Contains lowercase letter</span>
          </div>

          <!-- Has number -->
          <div class="flex items-center gap-3">
            <div :class="[
              'w-6 h-6 rounded-full flex items-center justify-center transition-all',
              hasNumber ? 'bg-green-500' : 'bg-white/20'
            ]">
              <svg v-if="hasNumber" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <span :class="hasNumber ? 'font-semibold' : 'text-blue-100'">Contains number</span>
          </div>

          <!-- Passwords match -->
          <div class="flex items-center gap-3">
            <div :class="[
              'w-6 h-6 rounded-full flex items-center justify-center transition-all',
              passwordsMatch ? 'bg-green-500' : 'bg-white/20'
            ]">
              <svg v-if="passwordsMatch" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <span :class="passwordsMatch ? 'font-semibold' : 'text-blue-100'">Passwords match</span>
          </div>
        </div>
      </div>

      <!-- Credentials Form -->
      <div class="w-full md:w-[37.5%] flex flex-col items-center">
        <!-- Register Card -->
        <div
          class="bg-white rounded-br-lg shadow-xl p-8 mb-2 w-full flex flex-col h-[60vh] overflow-hidden"
        >
          <h2 class="text-3xl font-bold text-center mb-6 flex-shrink-0">Complete Registration</h2>

          <!-- Scrollable Fields -->
          <div class="flex-1 overflow-y-auto space-y-4 px-2">
            <!-- Email Field -->
            <div>
              <label class="block text-gray-600 text-sm mb-1">Email Address</label>
              <input
                type="email"
                v-model="email"
                class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
            </div>

            <!-- Password Field -->
            <div>
              <label class="block text-gray-600 text-sm mb-1">Password</label>
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  class="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <Eye v-if="showPassword" class="w-5 h-5"/>
                  <EyeOff v-else class="w-5 h-5" />
                </button>
              </div>
              <p v-if="errors.password" class="text-xs text-red-500 mt-1">{{ errors.password }}</p>
              <p class="text-xs text-gray-500 mt-1">
                Must be at least 8 characters with uppercase, lowercase, and number
              </p>
            </div>

            <!-- Confirm Password Field -->
            <div>
              <label class="block text-gray-600 text-sm mb-1">Confirm Password</label>
              <div class="relative">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  v-model="confirmPassword"
                  class="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <Eye v-if="showConfirmPassword" class="w-5 h-5"/>
                  <EyeOff v-else class="w-5 h-5" />
                </button>
              </div>
              <p v-if="errors.confirmPassword" class="text-xs text-red-500 mt-1">{{ errors.confirmPassword }}</p>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="button"
            @click="handleSubmit"
            :disabled="!isFormValid"
            class="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            Complete Registration
          </button>

          <!-- Divider -->
          <div class="relative my-4 flex-shrink-0">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <!-- Back to OAuth option -->
          <button
            type="button"
            @click="loginWithGoogle"
            class="w-full bg-white border-2 border-blue-500 text-blue-600 font-semibold py-2 rounded-md hover:bg-blue-50 transition flex-shrink-0"
          >
            Register with Google OAuth Instead
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { Eye, EyeOff } from 'lucide-vue-next'

const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errors = ref<Record<string, string>>({})
const userInfo = ref<any>(null)

onMounted(() => {
  // Load user info from localStorage
  const storedInfo = localStorage.getItem('userInfo')
  if (storedInfo) {
    userInfo.value = JSON.parse(storedInfo)
  }
})

// Individual validation checks
const isEmailValid = computed(() => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return email.value && regex.test(email.value)
})

const hasMinLength = computed(() => password.value.length >= 8)
const hasUppercase = computed(() => /[A-Z]/.test(password.value))
const hasLowercase = computed(() => /[a-z]/.test(password.value))
const hasNumber = computed(() => /\d/.test(password.value))
const passwordsMatch = computed(() => {
  return password.value && confirmPassword.value && password.value === confirmPassword.value
})

const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

const validatePassword = (password: string) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return regex.test(password)
}

const validateForm = () => {
  const newErrors: Record<string, string> = {}

  if (!email.value) {
    newErrors.email = 'Email is required'
  } else if (!validateEmail(email.value)) {
    newErrors.email = 'Please enter a valid email address'
  }

  if (!password.value) {
    newErrors.password = 'Password is required'
  } else if (!validatePassword(password.value)) {
    newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number'
  }

  if (!confirmPassword.value) {
    newErrors.confirmPassword = 'Please confirm your password'
  } else if (password.value !== confirmPassword.value) {
    newErrors.confirmPassword = 'Passwords do not match'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const isFormValid = computed(() => {
  return email.value && 
         password.value && 
         confirmPassword.value && 
         validateEmail(email.value) && 
         validatePassword(password.value) && 
         password.value === confirmPassword.value
})

const handleSubmit = async () => {
  if (!validateForm()) return

  // Combine credentials with stored user info
  const registrationData = {
    ...userInfo.value,
    email: email.value,
    password: password.value
  }

  // Retrieve stored file
  const storedFile = localStorage.getItem('userFile')
  
  console.log('Registration Data:', registrationData)
  console.log('File:', storedFile ? JSON.parse(storedFile) : null)
  
  // Clear localStorage after successful registration
  localStorage.removeItem('userInfo')
  localStorage.removeItem('userFile')
  
  // Redirect to login or home
  router.push('/dashboard')
}

function loginWithGoogle() {
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${import.meta.env.VITE_FRONTEND_URL}/login&prompt=consent&response_type=code&client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&scope=openid%20email%20profile&access_type=offline`
}
</script>