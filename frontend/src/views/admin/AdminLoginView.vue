<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ShieldUser, LockKeyhole, User } from 'lucide-vue-next'
import adminBg from '@/assets/backgrounds/adminBg.png'

const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)
const showPassword = ref(false)

async function handleLogin() {
  error.value = ''
  
  // Validation
  if (!username.value.trim()) {
    error.value = 'Username is required'
    return
  }
  
  if (!password.value) {
    error.value = 'Password is required'
    return
  }
  
  isLoading.value = true
  
  try {
    // Replace this with your actual API call
    // Example: const response = await loginAdmin(username.value, password.value)
    
    // Mock login - replace with actual authentication
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    
    // Mock validation
    if (username.value === 'admin' && password.value === 'admin123') {
      // Store auth token or session
      localStorage.setItem('adminToken', 'mock-token-12345')
      
      // Redirect to admin dashboard
      router.push('/admin/dashboard')
    } else {
      error.value = 'Invalid username or password'
    }
  } catch (err) {
    error.value = 'An error occurred. Please try again.'
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
</script>

<template>
  <div 
    class="flex h-screen items-center justify-center p-4 bg-cover bg-center" 
    :style="{ backgroundImage: `url(${adminBg})` }"
  >
    <!-- Login Box -->
    <div class="w-full max-w-md rounded-2xl p-2 bg-gradient-to-r from-green-200 via-blue-500 to-purple-300 shadow-2xl relative z-10">
      <div class="bg-white rounded-2xl p-10">
        
        <!-- Icon -->
        <div class="flex justify-center mb-6">
          <div class="bg-orange-400 rounded-full p-4">
            <ShieldUser class="text-white w-12 h-12" :stroke-width="1.5"/>
          </div>
        </div>
        
        <!-- Header -->
        <div class="text-center mb-8 pb-6 border-b border-gray-200 leading-none">
          <h1 class="text-4xl font-bold text-gray-900">KU SEEK</h1>
          <h2 class="text-2xl font-semibold text-green-600 mb-3">Admin</h2>
          <p class="text-gray-600 text-sm">Please enter your credentials to continue</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <svg class="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <p class="text-red-800 text-sm">{{ error }}</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Username Field -->
          <div>
            <label for="username" class="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                v-model="username"
                type="text"
                placeholder="Enter your username"
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
                v-model="password"
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
            <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="!isLoading">Sign In</span>
            <span v-else>Signing in...</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>