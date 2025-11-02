<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Building2, Edit } from 'lucide-vue-next'
import LoadingScreen from '@/components/layouts/LoadingScreen.vue'
import { fetchUserProfile, updateUserProfile } from '@/services/profileServices'
import type { CompanyProfile, StudentProfile } from '@/types/profileType'
import { ProfileStyle } from '@/configs/profileStyleConfig'

const userType = ref<'student' | 'company' | 'professor'>('company')
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
  gpa: null as number | null,
  email: '',
})

const originalData = ref<typeof profileData | null>(null)
const errors = reactive<Record<string, string>>({})
const touched = reactive<Record<string, boolean>>({})

const loadUserData = async () => {
  console.log('Loading user data for type:', userType.value)
  try {
    const profile = await fetchUserProfile(userType.value)
    
    const transformedData = {
      firstName: profile.first_name || '',
      lastName: profile.last_name || '',
      age: profile.age || null,
      gender: profile.gender || '',
      contactEmail: profile.contact_email || profile.email || '',
      phoneNumber: profile.phone_number || '',
      location: profile.location || '',
      companyName: userType.value === 'company' ? (profile as CompanyProfile).name || '' : '',
      gpa: userType.value === 'student' ? (profile as StudentProfile).gpa || null : null,
      email: profile.email || '',
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

const validateField = (field: string, value: any) => {
  delete errors[field]

  switch (field) {
    case 'firstName':
      if (!value?.trim()) errors.firstName = 'First name is required'
      break
    case 'lastName':
      if (!value?.trim()) errors.lastName = 'Last name is required'
      break
    case 'contactEmail':
      if (!value?.trim()) {
        errors.contactEmail = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.contactEmail = 'Invalid email format'
      }
      break
    case 'phoneNumber':
      if (value && value.length !== 10) {
        errors.phoneNumber = 'Phone number must be 10 digits'
      }
      break
    case 'age':
      if (value && (value < 15 || value > 100)) {
        errors.age = 'Age must be between 15 and 100'
      }
      break
    case 'gpa':
      if (userType.value === 'student' && value !== null && value !== undefined && (value < 0 || value > 4)) {
        errors.gpa = 'GPA must be between 0.00 and 4.00'
      }
      break
    case 'companyName':
      if (userType.value === 'company' && !value?.trim()) {
        errors.companyName = 'Company name is required'
      }
      break
  }
}

const validateForm = (): boolean => {
  Object.keys(errors).forEach(key => delete errors[key])

  validateField('firstName', profileData.firstName)
  validateField('lastName', profileData.lastName)
  validateField('contactEmail', profileData.contactEmail)
  validateField('phoneNumber', profileData.phoneNumber)
  validateField('age', profileData.age)
  
  if (userType.value === 'student') {
    validateField('gpa', profileData.gpa)
  } else if (userType.value === 'company') {
    validateField('companyName', profileData.companyName)
  }

  return Object.keys(errors).length === 0
}

const handleFieldInput = (field: string, value: any) => {
  touched[field] = true
  validateField(field, value)
}

function onPhoneInput(event: Event) {
  const input = event.target as HTMLInputElement
  input.value = input.value.replace(/[^0-9]/g, '')
  if (input.value.length > 10) {
    input.value = input.value.slice(0, 10)
  }
  profileData.phoneNumber = input.value
  handleFieldInput('phoneNumber', input.value)
}

const handleEdit = () => {
  isEditing.value = true
  originalData.value = JSON.parse(JSON.stringify(profileData))
  Object.keys(touched).forEach(key => delete touched[key])
}

const handleCancel = () => {
  if (originalData.value) {
    Object.assign(profileData, originalData.value)
  }
  Object.keys(errors).forEach(key => delete errors[key])
  Object.keys(touched).forEach(key => delete touched[key])
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
    await updateUserProfile(profileData)
    originalData.value = JSON.parse(JSON.stringify(profileData))
    Object.keys(touched).forEach(key => delete touched[key])
    isEditing.value = false
    
  } catch (error) {
    console.error('Failed to save settings:', error)
  } finally {
    isSaving.value = false
  }
}

const inputClass = computed(() => (field: string) => {
  const hasError = !!errors[field]
  const showError = hasError && touched[field] && isEditing.value
  
  const baseClass = ProfileStyle.inputBox
  const editableClass = !isEditing.value ? 'bg-gray-50 cursor-not-allowed' : ''
  const errorClass = showError ? ProfileStyle.errorBox : ''
  
  return `${baseClass} ${editableClass} ${errorClass}`
})

onMounted(() => {
  loadUserData()
})
</script>

<template>
  <LoadingScreen v-if="isLoading" />

  <div v-else class="flex h-full gap-x-8 min-h-screen w-full py-16 px-[8vw] md:px-[12vw]">
    <!-- Left Sidebar -->
    <div :class="[`hidden lg:block bg-gradient-to-br from-blue-200 to-green-200 rounded-2xl w-[30%] p-8 py-16 border border-gray-200`, isEditing ? 'via-gray-300' : 'via-gray-200']">
      <div class="flex flex-col h-full">
        <!-- Profile Section -->
        <div class="text-center mb-8">
          <div class="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg">
            {{ profileData.firstName.charAt(0) }}{{ profileData.lastName.charAt(0) }}
          </div>
          <h3 class="text-black text-xl font-bold">{{ profileData.firstName }} {{ profileData.lastName }}</h3>
          <p class="text-gray-600 text-sm mt-1">{{ profileData.email }}</p>
          <div class="mt-4 inline-block px-4 py-1.5 bg-blue-500/20 text-blue-700 rounded-full text-sm font-semibold border border-blue-500/30 capitalize">
            {{ userType }}
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="w-full">
      <div :class="[`mx-auto border border-gray-200 rounded-2xl p-6 md:p-10`, isEditing ? 'bg-gray-200' : 'bg-gray-100']">
        <!-- Header -->
        <div class="flex justify-between items-end md:items-center bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Account Settings</h1>
            <p class="text-gray-600 mt-2">Manage your personal information</p>
          </div>

          <button v-if="!isEditing" @click="handleEdit" :class="ProfileStyle.actionButton + ' bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'">
            <Edit class="w-4 h-4" />Edit
          </button>
        </div>

        <!-- Settings Form -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <!-- Company-specific fields -->
          <div v-if="userType === 'company'" class="mb-8 pb-8 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 class="w-5 h-5 text-blue-600" />
              Company Information
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Company Name -->
              <div class="md:col-span-2" :class="{ 'error-form': errors.companyName && touched.companyName }">
                <label :class="ProfileStyle.formLabel">
                  Company Name 
                  <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="profileData.companyName"
                  @input="handleFieldInput('companyName', profileData.companyName)"
                  type="text"
                  :disabled="!isEditing"
                  :class="inputClass('companyName')"
                  placeholder="e.g., TechCorp Solutions"
                />
                <p v-if="errors.companyName && touched.companyName && isEditing" :class="ProfileStyle.errorText">
                  {{ errors.companyName }}
                </p>
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
              <div :class="{ 'error-form': errors.firstName && touched.firstName }">
                <label :class="ProfileStyle.formLabel">
                  First Name 
                  <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="profileData.firstName"
                  @input="handleFieldInput('firstName', profileData.firstName)"
                  type="text"
                  :disabled="!isEditing"
                  :class="inputClass('firstName')"
                  placeholder="Enter first name"
                />
                <p v-if="errors.firstName && touched.firstName && isEditing" :class="ProfileStyle.errorText">
                  {{ errors.firstName }}
                </p>
              </div>

              <!-- Last Name -->
              <div :class="{ 'error-form': errors.lastName && touched.lastName }">
                <label :class="ProfileStyle.formLabel">
                  Last Name 
                  <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="profileData.lastName"
                  @input="handleFieldInput('lastName', profileData.lastName)"
                  type="text"
                  :disabled="!isEditing"
                  :class="inputClass('lastName')"
                  placeholder="Enter last name"
                />
                <p v-if="errors.lastName && touched.lastName && isEditing" :class="ProfileStyle.errorText">
                  {{ errors.lastName }}
                </p>
              </div>

              <!-- Age -->
              <div>
                <label :class="ProfileStyle.formLabel">Age</label>
                <input
                  v-model.number="profileData.age"
                  @input="handleFieldInput('age', profileData.age)"
                  type="number"
                  :disabled="!isEditing"
                  :class="inputClass('age')"
                  placeholder="Enter age"
                  min="15"
                  max="100"
                />
                <p v-if="errors.age && touched.age && isEditing" :class="ProfileStyle.errorText">
                  {{ errors.age }}
                </p>
              </div>

              <!-- Gender -->
              <div>
                <label :class="ProfileStyle.formLabel">Gender</label>
                <select
                  v-model="profileData.gender"
                  :disabled="!isEditing"
                  :class="[inputClass('gender'), 'h-12']"
                >
                  <option value="">Prefer not to say</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
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
              <div :class="{ 'error-form': errors.contactEmail && touched.contactEmail }">
                <label :class="ProfileStyle.formLabel">
                  Contact Email 
                  <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="profileData.contactEmail"
                  @input="handleFieldInput('contactEmail', profileData.contactEmail)"
                  type="email"
                  :disabled="!isEditing"
                  :class="inputClass('contactEmail')"
                  placeholder="your.email@example.com"
                />
                <p v-if="errors.contactEmail && touched.contactEmail && isEditing" :class="ProfileStyle.errorText">
                  {{ errors.contactEmail }}
                </p>
              </div>

              <!-- Phone Number -->
              <div :class="{ 'error-form': errors.phoneNumber && touched.phoneNumber }">
                <label :class="ProfileStyle.formLabel + ' flex items-center gap-2'">
                  Phone Number
                </label>
                <input
                  v-model="profileData.phoneNumber"
                  @input="onPhoneInput"
                  type="tel"
                  :disabled="!isEditing"
                  :class="inputClass('phoneNumber')"
                  placeholder="0123456789"
                />
                <p v-if="errors.phoneNumber && touched.phoneNumber && isEditing" :class="ProfileStyle.errorText">
                  {{ errors.phoneNumber }}
                </p>
              </div>

              <!-- Location -->
              <div class="md:col-span-2">
                <label :class="ProfileStyle.formLabel + ' flex items-center gap-2'">
                  Location
                </label>
                <input
                  v-model="profileData.location"
                  type="text"
                  :disabled="!isEditing"
                  :class="inputClass('location')"
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
              <div :class="{ 'error-form': errors.gpa && touched.gpa }">
                <label :class="ProfileStyle.formLabel">GPA</label>
                <input
                  v-model.number="profileData.gpa"
                  @input="handleFieldInput('gpa', profileData.gpa)"
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  :disabled="!isEditing"
                  :class="inputClass('gpa')"
                  placeholder="0.00"
                />
                <p v-if="errors.gpa && touched.gpa && isEditing" :class="ProfileStyle.errorText">
                  {{ errors.gpa }}
                </p>
                <p class="text-gray-500 text-xs mt-1">Scale: 0.00 - 4.00</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div v-if="isEditing" class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button @click="handleSubmit" :class="ProfileStyle.actionButton + ' flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 font-semibold py-3.5 px-6 rounded-lg justify-center'">
              Save Changes
            </button>
            <button @click="handleCancel" :disabled="isSaving" class='flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-black font-semibold py-3.5 px-6 rounded-lg border-gray-300 justify-center border border-gray-300'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>