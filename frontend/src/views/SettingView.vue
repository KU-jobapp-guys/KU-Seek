<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Save, User, Mail, Phone, MapPin, Calendar, GraduationCap, X } from 'lucide-vue-next'

interface FormData {
  firstName: string
  lastName: string
  contactEmail: string
  phoneNumber: string
  location: string
  age: number | null
  gender: string
  gpa: number | null
}

interface Errors {
  firstName?: string
  lastName?: string
  contactEmail?: string
  phoneNumber?: string
  age?: string
  gpa?: string
}

const formData = reactive<FormData>({
  firstName: 'John',
  lastName: 'Doe',
  contactEmail: 'john.doe@student.edu',
  phoneNumber: '+66 12 345 6789',
  location: 'Bangkok, Thailand',
  age: 21,
  gender: 'M',
  gpa: 3.75
})

const errors = reactive<Errors>({})
const isSaving = ref(false)
const successMessage = ref('')

const validateForm = (): boolean => {
  Object.keys(errors).forEach(key => delete errors[key as keyof Errors])

  if (!formData.firstName?.trim()) {
    errors.firstName = 'First name is required'
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = 'Last name is required'
  }

  if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
    errors.contactEmail = 'Invalid email format'
  }

  if (formData.phoneNumber && !/^[\d\s\+\-\(\)]+$/.test(formData.phoneNumber)) {
    errors.phoneNumber = 'Invalid phone number format'
  }

  if (formData.age && (formData.age < 15 || formData.age > 100)) {
    errors.age = 'Age must be between 15 and 100'
  }

  if (formData.gpa && (formData.gpa < 0 || formData.gpa > 4)) {
    errors.gpa = 'GPA must be between 0.00 and 4.00'
  }

  return Object.keys(errors).length === 0
}

const clearError = (field: keyof Errors) => {
  if (errors[field]) {
    delete errors[field]
  }
  if (successMessage.value) {
    successMessage.value = ''
  }
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSaving.value = true

  try {
    // TODO: Replace with actual API call
    // await updateStudentSettings(formData)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    successMessage.value = 'Settings saved successfully!'
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error) {
    console.error('Failed to save settings:', error)
  } finally {
    isSaving.value = false
  }
}

const handleReset = () => {
  Object.assign(formData, {
    firstName: 'John',
    lastName: 'Doe',
    contactEmail: 'john.doe@student.edu',
    phoneNumber: '+66 12 345 6789',
    location: 'Bangkok, Thailand',
    age: 21,
    gender: 'M',
    gpa: 3.75
  })
  Object.keys(errors).forEach(key => delete errors[key as keyof Errors])
  successMessage.value = ''
}
</script>

<template>
  <div class="min-h-screen py-16 px-[8vw] md:px-[12vw]">
    <div class="mx-auto bg-gray-100 rounded-2xl p-6 md:p-10">
      <!-- Header -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p class="text-gray-600 mt-2">Manage your personal information</p>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p class="text-green-800 font-medium">{{ successMessage }}</p>
        </div>
        <button @click="successMessage = ''" class="text-green-600 hover:text-green-800">
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Settings Form -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <!-- Personal Information Section -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User class="w-5 h-5 text-blue-600" />
            Personal Information
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- First Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                First Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.firstName"
                @input="clearError('firstName')"
                type="text"
                :class="[
                  'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                ]"
                placeholder="Enter first name"
              />
              <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">{{ errors.firstName }}</p>
            </div>

            <!-- Last Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.lastName"
                @input="clearError('lastName')"
                type="text"
                :class="[
                  'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                ]"
                placeholder="Enter last name"
              />
              <p v-if="errors.lastName" class="text-red-500 text-sm mt-1">{{ errors.lastName }}</p>
            </div>

            <!-- Age -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Calendar class="w-4 h-4" />
                Age
              </label>
              <input
                v-model.number="formData.age"
                @input="clearError('age')"
                type="number"
                :class="[
                  'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                  errors.age ? 'border-red-500' : 'border-gray-300'
                ]"
                placeholder="Enter age"
                min="15"
                max="100"
              />
              <p v-if="errors.age" class="text-red-500 text-sm mt-1">{{ errors.age }}</p>
            </div>

            <!-- Gender -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                v-model="formData.gender"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Prefer not to say</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Contact Information Section -->
        <div class="mb-8 pt-8 border-t border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Mail class="w-5 h-5 text-blue-600" />
            Contact Information
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Contact Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <input
                v-model="formData.contactEmail"
                @input="clearError('contactEmail')"
                type="email"
                :class="[
                  'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                  errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                ]"
                placeholder="your.email@example.com"
              />
              <p v-if="errors.contactEmail" class="text-red-500 text-sm mt-1">
                {{ errors.contactEmail }}
              </p>
            </div>

            <!-- Phone Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Phone class="w-4 h-4" />
                Phone Number
              </label>
              <input
                v-model="formData.phoneNumber"
                @input="clearError('phoneNumber')"
                type="tel"
                :class="[
                  'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                ]"
                placeholder="+66 12 345 6789"
              />
              <p v-if="errors.phoneNumber" class="text-red-500 text-sm mt-1">
                {{ errors.phoneNumber }}
              </p>
            </div>

            <!-- Location -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MapPin class="w-4 h-4" />
                Location
              </label>
              <input
                v-model="formData.location"
                type="text"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City, Country"
              />
            </div>
          </div>
        </div>

        <!-- Academic Information Section -->
        <div class="mb-8 pt-8 border-t border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <GraduationCap class="w-5 h-5 text-blue-600" />
            Academic Information
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- GPA -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">GPA</label>
              <input
                v-model.number="formData.gpa"
                @input="clearError('gpa')"
                type="number"
                step="0.01"
                min="0"
                max="4"
                :class="[
                  'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
                  errors.gpa ? 'border-red-500' : 'border-gray-300'
                ]"
                placeholder="0.00"
              />
              <p v-if="errors.gpa" class="text-red-500 text-sm mt-1">{{ errors.gpa }}</p>
              <p class="text-gray-500 text-xs mt-1">Scale: 0.00 - 4.00</p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
          <button
            @click="handleSubmit"
            :disabled="isSaving"
            class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Save class="w-5 h-5" />
            {{ isSaving ? 'Saving...' : 'Save Changes' }}
          </button>

          <button
            @click="handleReset"
            class="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
</template>