<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Building2, Edit } from 'lucide-vue-next'
import LoadingScreen from '@/components/layouts/LoadingScreen.vue'
import { fetchUserProfile, updateUserProfile } from '@/services/profileServices'
import type { CompanyProfile, StudentProfile } from '@/types/profileType'

const userType = ref<'student' | 'company' | 'professor'>('professor')
const isEditing = ref(false)
const isSaving = ref(false)
const isLoading = ref(true)

const profileData = reactive({
  firstName: '',
  lastName: '',
  age: null as number | null,
  gender: '',
  contactEmail: '',
  phoneNumber: '',
  location: '',
  companyName: '',
  gpa: null as number | null
})

const originalData = ref<typeof profileData | null>(null)
const errors = reactive<Record<string, string>>({})

const loadUserData = async () => {
  console.log('Loading user data for type:', userType.value)
  try {
    const profile = await fetchUserProfile(userType.value)
    
    // Transform API response to match profileData structure
    const transformedData = {
      firstName: profile.first_name || '',
      lastName: profile.last_name || '',
      age: profile.age || null,
      gender: profile.gender || '',
      contactEmail: profile.contact_email || profile.email || '',
      phoneNumber: profile.phone_number || '',
      location: profile.location || '',
      companyName: userType.value === 'company' ? (profile as CompanyProfile).name || '' : '',
      gpa: userType.value === 'student' ? (profile as StudentProfile).gpa || null : null
    }
    
    Object.assign(profileData, transformedData)
    originalData.value = JSON.parse(JSON.stringify(profileData))
    console.log('Loaded data:', originalData.value)
  } catch (error) {
    console.error('Failed to load user data:', error)
  } finally {
    isLoading.value = false
  } 
}

// Validation
const validateForm = (): boolean => {
  Object.keys(errors).forEach(key => delete errors[key])

  if (!profileData.firstName?.trim()) {
    errors.firstName = 'First name is required'
  }
  if (!profileData.lastName?.trim()) {
    errors.lastName = 'Last name is required'
  }
  if (!profileData.contactEmail?.trim()) {
    errors.contactEmail = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.contactEmail)) {
    errors.contactEmail = 'Invalid email format'
  }
  if (profileData.phoneNumber && !/^[\d\s\+\-\(\)]+$/.test(profileData.phoneNumber)) {
    errors.phoneNumber = 'Invalid phone number format'
  }
  if (profileData.age && (profileData.age < 15 || profileData.age > 100)) {
    errors.age = 'Age must be between 15 and 100'
  }
  if (userType.value === 'student') {
    if (profileData.gpa !== null && profileData.gpa !== undefined && (profileData.gpa < 0 || profileData.gpa > 4)) {
      errors.gpa = 'GPA must be between 0.00 and 4.00'
    }
  } else if (userType.value === 'company') {
    if (!profileData.companyName?.trim()) {
      errors.companyName = 'Company name is required'
    }
  }

  return Object.keys(errors).length === 0
}

const clearError = (field: string) => {
  if (errors[field]) {
    delete errors[field]
  }
}

const handleEdit = () => {
  isEditing.value = true
  originalData.value = JSON.parse(JSON.stringify(profileData))
}

const handleCancel = () => {
  if (originalData.value) {
    Object.assign(profileData, originalData.value)
  }
  Object.keys(errors).forEach(key => delete errors[key])
  isEditing.value = false
}

const handleSubmit = async () => {
  if (!validateForm()) {
    const firstError = document.querySelector('.error-form')
    if (firstError) {
      setTimeout(() => {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
    return
  }

  isSaving.value = true

  try {
    // Service handles the data transformation
    await updateUserProfile(profileData)
    
    originalData.value = JSON.parse(JSON.stringify(profileData))
    isEditing.value = false
    
  } catch (error) {
    console.error('Failed to save settings:', error)
  } finally {
    isSaving.value = false
  }
}

const inputClass = computed(() => (hasError: boolean) => {
  const baseClass = 'w-full px-4 py-2.5 rounded-lg transition-all duration-200'
  const editableClass = isEditing.value 
    ? 'border-2 focus:outline-none focus:ring-2 focus:ring-blue-500' 
    : 'border bg-gray-50 cursor-not-allowed'
  const errorClass = hasError && isEditing.value ? 'border-red-500 bg-red-50' : 'border-gray-300'
  
  return `${baseClass} ${editableClass} ${errorClass}`
})

// Load data on component mount
onMounted(() => {
  loadUserData()
})
</script>

<template>
  <LoadingScreen v-if="isLoading" />

  <div v-else class="flex h-full gap-x-8 min-h-screen w-full py-16 px-[8vw] md:px-[12vw]">
    <!-- Left Sidebar -->
    <div class="hidden lg:block bg-gradient-to-br from-blue-900 via-black to-green-900 rounded-2xl w-[30%] p-8 shadow-2xl border border-gray-700">
      <div class="flex flex-col h-full">
        <!-- Profile Section -->
        <div class="text-center mb-8">
          <div class="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg">
            {{ profileData.firstName.charAt(0) }}{{ profileData.lastName.charAt(0) }}
          </div>
          <h3 class="text-white text-xl font-bold">{{ profileData.firstName }} {{ profileData.lastName }}</h3>
          <p class="text-gray-400 text-sm mt-1">{{ profileData.contactEmail }}</p>
          <div class="mt-4 inline-block px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold border border-blue-500/30 capitalize">
            {{ userType }}
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="w-full">
      <div class="mx-auto bg-gray-100 rounded-2xl p-6 md:p-10">
        <!-- Header -->
        <div class="flex justify-between items-center bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Account Settings</h1>
            <p class="text-gray-600 mt-2">Manage your personal information</p>
          </div>

          <button 
            v-if="!isEditing"
            @click="handleEdit"
            class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2.5 font-semibold flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Edit class="w-4 h-4" />
            Edit
          </button>
        </div>

        <!-- Settings Form -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <!-- Company-specific fields -->
          <div v-if="userType === 'company'" class="mb-8 pt-4 pb-8 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 class="w-5 h-5 text-blue-600" />
              Company Information
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Company Name -->
              <div class="md:col-span-2" :class="{ 'error-form': errors.companyName }">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Company Name 
                  <span class="text-red-500">*</span>
                  <span v-if="errors.companyName && isEditing" class="text-red-600 text-sm font-medium ml-2">
                    {{ errors.companyName }}
                  </span>
                </label>
                <input
                  v-model="profileData.companyName"
                  @input="clearError('companyName')"
                  type="text"
                  :disabled="!isEditing"
                  :class="inputClass(!!errors.companyName)"
                  placeholder="e.g., TechCorp Solutions"
                />
              </div>              
            </div>
          </div>

          <!-- Personal Information Section -->
          <div class="mb-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User class="w-5 h-5 text-blue-600" />
              Personal Information
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- First Name -->
              <div :class="{ 'error-form': errors.firstName }">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  First Name 
                  <span class="text-red-500">*</span>
                  <span v-if="errors.firstName && isEditing" class="text-red-600 text-sm font-medium ml-2">
                    {{ errors.firstName }}
                  </span>
                </label>
                <input
                  v-model="profileData.firstName"
                  @input="clearError('firstName')"
                  type="text"
                  :disabled="!isEditing"
                  :class="inputClass(!!errors.firstName)"
                  placeholder="Enter first name"
                />
              </div>

              <!-- Last Name -->
              <div :class="{ 'error-form': errors.lastName }">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name 
                  <span class="text-red-500">*</span>
                  <span v-if="errors.lastName && isEditing" class="text-red-600 text-sm font-medium ml-2">
                    {{ errors.lastName }}
                  </span>
                </label>
                <input
                  v-model="profileData.lastName"
                  @input="clearError('lastName')"
                  type="text"
                  :disabled="!isEditing"
                  :class="inputClass(!!errors.lastName)"
                  placeholder="Enter last name"
                />
              </div>

              <!-- Age -->
              <div :class="{ 'error-form': errors.age }">
                <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar class="w-4 h-4" />
                  Age
                  <span v-if="errors.age && isEditing" class="text-red-600 text-sm font-medium ml-2">
                    {{ errors.age }}
                  </span>
                </label>
                <input
                  v-model.number="profileData.age"
                  @input="clearError('age')"
                  type="number"
                  :disabled="!isEditing"
                  :class="inputClass(!!errors.age)"
                  placeholder="Enter age"
                  min="15"
                  max="100"
                />
              </div>

              <!-- Gender -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                <select
                  v-model="profileData.gender"
                  :disabled="!isEditing"
                  :class="inputClass(false)"
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
              <div :class="{ 'error-form': errors.contactEmail }">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Email 
                  <span class="text-red-500">*</span>
                  <span v-if="errors.contactEmail && isEditing" class="text-red-600 text-sm font-medium ml-2">
                    {{ errors.contactEmail }}
                  </span>
                </label>
                <input
                  v-model="profileData.contactEmail"
                  @input="clearError('contactEmail')"
                  type="email"
                  :disabled="!isEditing"
                  :class="inputClass(!!errors.contactEmail)"
                  placeholder="your.email@example.com"
                />
              </div>

              <!-- Phone Number -->
              <div :class="{ 'error-form': errors.phoneNumber }">
                <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Phone class="w-4 h-4" />
                  Phone Number
                  <span v-if="errors.phoneNumber && isEditing" class="text-red-600 text-sm font-medium ml-2">
                    {{ errors.phoneNumber }}
                  </span>
                </label>
                <input
                  v-model="profileData.phoneNumber"
                  @input="clearError('phoneNumber')"
                  type="tel"
                  :disabled="!isEditing"
                  :class="inputClass(!!errors.phoneNumber)"
                  placeholder="+66 12 345 6789"
                />
              </div>

              <!-- Location -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin class="w-4 h-4" />
                  Location
                </label>
                <input
                  v-model="profileData.location"
                  type="text"
                  :disabled="!isEditing"
                  :class="inputClass(false)"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>

          <!-- Student-specific fields -->
          <div v-if="userType === 'student'" class="mb-8 pt-8 border-t border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <GraduationCap class="w-5 h-5 text-blue-600" />
              Academic Information
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- GPA -->
              <div :class="{ 'error-form': errors.gpa }">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  GPA
                  <span v-if="errors.gpa && isEditing" class="text-red-600 text-sm font-medium ml-2">
                    {{ errors.gpa }}
                  </span>
                </label>
                <input
                  v-model.number="profileData.gpa"
                  @input="clearError('gpa')"
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  :disabled="!isEditing"
                  :class="inputClass(!!errors.gpa)"
                  placeholder="0.00"
                />
                <p class="text-gray-500 text-xs mt-1">Scale: 0.00 - 4.00</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div v-if="isEditing" class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button @click="handleSubmit" class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
              Save Changes
            </button>
            <button @click="handleCancel" :disabled="isSaving" class="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700 font-semibold py-3.5 px-6 rounded-lg transition-all duration-200 border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center gap-2">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>