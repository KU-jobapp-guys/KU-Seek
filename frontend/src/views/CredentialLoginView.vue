<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ShieldUser, LockKeyhole, User } from 'lucide-vue-next'
import loginBg from '@/assets/backgrounds/loginBg.png'
import LoadingScreen from '@/components/layouts/LoadingScreen.vue'

const router = useRouter()

const credential = reactive({
  email: '',
  password: ''
})

const error = ref('')
const isLoading = ref(false)
const showPassword = ref(false)

async function handleLogin() {
  error.value = ''
  
  // Validation
  if (!credential.email.trim()) {
    error.value = 'Email is required'
    return
  }
  
  if (!credential.password) {
    error.value = 'Password is required'
    return
  }
  
  isLoading.value = true
  
  let csrf_token: string
  
  try {
    const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
    
    // Get CSRF token
    const csrf_res = await fetch(`${base}/api/v1/csrf-token`, {
      method: 'GET',
      credentials: 'include',
    })
    
    if (csrf_res.ok) {
      const csrf_json = await csrf_res.json()
      csrf_token = csrf_json.csrf_token
      localStorage.setItem('csrf_token', csrf_token)
    } else {
      throw new Error('Failed to get CSRF token')
    }
    
    // Create FormData
    const formData = new FormData()
    formData.append('email', credential.email)
    formData.append('password', credential.password)
    
    // Login request
    const res = await fetch(`${base}/api/v1/auth/credentials`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrf_token,
      },
      body: formData
    })
    
    if (res.ok) {
      const user_jwt = await res.json()
      
      localStorage.setItem('user_jwt', user_jwt.access_token)
      localStorage.setItem('userRole', user_jwt.type)
      localStorage.setItem('user_id', user_jwt.user_id)
      window.dispatchEvent(new Event('userRoleChanged'))
      
      // Redirect to admin dashboard
      router.replace({ name: `${user_jwt.type} dashboard` })
    } else {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData.message || 'Invalid email or password')
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred. Please try again.'
    console.error('Login error:', err)
  } finally {
    isLoading.value = false
  }
}

function handleKeyPress(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    handleLogin()
  }
}

function loginWithGoogle() {
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${import.meta.env.VITE_FRONTEND_URL}/login&prompt=consent&response_type=code&client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&scope=openid%20email%20profile&access_type=offline`
}
</script>

<template>
  <LoadingScreen v-if="isLoading" />
  
  <div 
    class="flex h-screen items-center justify-center p-4 bg-cover bg-center" 
    :style="{ backgroundImage: `url(${loginBg})` }"
  >
    <!-- Login Box -->
    <div class="w-full max-w-md rounded-2xl p-1 bg-blue-300 shadow-2xl relative z-10">
      <div class="bg-white rounded-2xl p-10">
        
        <!-- Icon -->
        <div class="flex justify-center mb-6">
          <div class="bg-blue-400 rounded-full p-4">
            <ShieldUser class="text-white w-12 h-12" :stroke-width="1.5"/>
          </div>
        </div>
        
        <!-- Header -->
        <div class="text-center mb-8 pb-6 border-b border-gray-200 leading-none">
          <h1 class="text-4xl font-bold text-gray-900">KU SEEK</h1>
          <p class="text-gray-600 text-sm mt-2">Please enter your credentials to continue</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <p class="text-red-800 text-sm">{{ error }}</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                v-model="credential.email"
                placeholder="Enter your email"
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                :disabled="isLoading"
                @keypress="handleKeyPress"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockKeyhole class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                v-model="credential.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                :disabled="isLoading"
                @keypress="handleKeyPress"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl mt-8"
          >
            <span v-if="!isLoading">Sign In</span>
            <span v-else>Signing in...</span>
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
            Sign in with Google OAuth
          </button>
        </form>

        <!-- Login button -->
        <div class="mt-4 text-sm text-gray-600 text-left">
          Does not have an account?
          <button
              @click="router.push('/registration')"
              class="text-blue-600 font-semibold hover:underline focus:outline-none ml-1"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  </div>
</template>