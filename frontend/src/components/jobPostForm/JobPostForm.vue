<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Job } from '@/types/jobType'

// Import components
import BaseInput from './inputs/BaseInput.vue'
import BaseTextarea from './inputs/BaseTextarea.vue'
import TagInput from './inputs/TagInput.vue'
import ContactField from './inputs/ContactField.vue'
import SalaryInput from './inputs/SalaryInput.vue'
import SearchableTagInput from './inputs/SearchableTagInput.vue'
import CalendarInput from './inputs/CalendarInput.vue'
import TimeInput from './inputs/TimeInput.vue'

const props = defineProps<{
  initialData?: Job
}>()

const emit = defineEmits<{
  submit: [payload: Partial<Job>]
  cancel: []
}>()

const isEditMode = computed(() => !!props.initialData)

// If we fetch the authenticated user's company, lock the company input
const companyLocked = ref(false)

// Form state
const jobPost = ref({
  company: '',
  role: '',
  location: '',
  description: '',
  jobType: '',
  skills: [] as string[],
  tags: [] as string[],
  capacity: '',
  salaryMin: '',
  salaryMax: '',
  jobLevel: '',
  endDate: '',
  workHours: '',
  contacts: [] as { type: string; link: string }[],
})

// Initialize form with initialData if provided
const initializeForm = () => {
  if (props.initialData) {
    jobPost.value = {
      company: props.initialData.company || '',
      role: props.initialData.role || '',
      location: props.initialData.location || '',
      description: props.initialData.description || '',
      jobType: props.initialData.jobType || '',
      skills: props.initialData.skills || [],
      tags: props.initialData.tags || [],
      salaryMin: props.initialData.salaryMin.toString() || '',
      salaryMax: props.initialData.salaryMax.toString() || '',
      contacts: props.initialData.contacts || [],
      capacity: props.initialData.capacity ? String(props.initialData.capacity) : '',
      jobLevel: props.initialData.jobLevel || '',
      endDate: props.initialData.endDate ? String(props.initialData.endDate) : '',
      workHours: props.initialData.workHours || '',
    }
  }
}

const isSalaryValid = ref(true)

// Inline field errors (shown like SalaryInput's error)
const endDateError = ref('')
const workHoursError = ref('')

const getTomorrowDateString = () => {
  const now = new Date()
  now.setDate(now.getDate() + 1)
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

// Live validity computed including inline errors
const capacityError = ref('')

const isFormValid = computed(() => {
  return (
    jobPost.value.company.trim() !== '' &&
    jobPost.value.role.trim() !== '' &&
    jobPost.value.location.trim() !== '' &&
    jobPost.value.description.trim() !== '' &&
    jobPost.value.jobType.trim() !== '' &&
    jobPost.value.salaryMin.trim() !== '' &&
    jobPost.value.salaryMax.trim() !== '' &&
    Number(jobPost.value.salaryMin) > 0 &&
    Number(jobPost.value.salaryMax) > 0 &&
    jobPost.value.jobLevel.trim() !== '' &&
    jobPost.value.capacity.trim() !== '' &&
    Number(jobPost.value.capacity) > 0 &&
    jobPost.value.endDate.trim() !== '' &&
    jobPost.value.workHours.trim() !== '' &&
    isSalaryValid.value &&
    !endDateError.value &&
    !workHoursError.value &&
    !capacityError.value
  )
})

watch(
  () => jobPost.value.endDate,
  (v) => {
    const minDate = getTomorrowDateString()
    if (v && v < minDate) {
      endDateError.value = 'End date cannot be in the past.'
    } else {
      endDateError.value = ''
    }
  },
  { immediate: true },
)

watch(
  () => jobPost.value.workHours,
  (v) => {
    if (!v) {
      workHoursError.value = ''
      return
    }
    const parts = v.split(' - ').map((p) => p.trim())
    if (parts.length !== 2) {
      workHoursError.value = 'Please provide working hours in the format "9:00 AM - 5:00 PM".'
      return
    }
      const parseTimeToMinutes = (s: string) => {
        const m12 = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
        if (m12) {
          let hh = Number(m12[1])
          const mm = Number(m12[2])
          const ampm = m12[3].toUpperCase()
          if (ampm === 'AM') {
            if (hh === 12) hh = 0
          } else {
            if (hh !== 12) hh += 12
          }
          return hh * 60 + mm
        }

        return NaN
      }

      const sMin = parseTimeToMinutes(parts[0])
      const eMin = parseTimeToMinutes(parts[1])
      if (isNaN(sMin) || isNaN(eMin)) {
        workHoursError.value = 'Invalid time format.'
      } else if (sMin >= eMin) {
        workHoursError.value = 'Start time must be earlier than end time.'
      } else {
        workHoursError.value = ''
      }
  },
  { immediate: true },
)

watch(
  () => jobPost.value.capacity,
  (v) => {
    if (!v || v.toString().trim() === '') {
      capacityError.value = 'Capacity is required.'
      return
    }
    // Only allow positive integers
    const trimmed = v.toString().trim()
    if (!/^\d+$/.test(trimmed)) {
      capacityError.value = 'Capacity must be a whole number.'
      return
    }
    const num = Number(trimmed)
    if (Number.isNaN(num) || num <= 0) {
      capacityError.value = 'Capacity must be greater than zero.'
      return
    }
    capacityError.value = ''
  },
  { immediate: true },
)

const handleSubmit = (): void => {
  const min = Number(jobPost.value.salaryMin)
  const max = Number(jobPost.value.salaryMax)

  if (min <= 0 || max <= 0 || !isSalaryValid.value) {
    return
  }

  if (!isFormValid.value) {
    return
  }

  if (endDateError.value || workHoursError.value || capacityError.value) return

  const payload = {
    ...jobPost.value,
    salaryMin: Number(jobPost.value.salaryMin),
    salaryMax: Number(jobPost.value.salaryMax),
    capacity: Number(jobPost.value.capacity),
  }

  emit('submit', payload)
}

const handleCancel = (): void => {
  emit('cancel')
}

const isEmpty = (value: any) => {
  if (Array.isArray(value)) return value.length === 0
  return !value || value.toString().trim() === ''
}

watch(
  () => props.initialData,
  () => {
    initializeForm()
  },
  { immediate: true, deep: true },
)

onMounted(() => {
  // Try to auto-fill company name for authenticated users when not editing
  ;(async () => {
    if (!isEditMode.value) {
      try {
        const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
        const token = localStorage.getItem('user_jwt') ?? localStorage.getItem('access_token')
        const headers: Record<string, string> = {}
        if (token) headers['access_token'] = token

        console.log(token)

        const res = await fetch(`${base}/api/v1/company`, { method: 'GET', headers, credentials: 'include' })
        console.log(res.json)
        if (res.ok) {
          const data = await res.json().catch(() => null)
          if (data && typeof data === 'object') {
            const name = (data.name || (data.profile && data.profile.firstName ? `${data.profile.firstName} ${data.profile.lastName}` : null) || data.companyName || data.company || '') as string
            if (name) {
              jobPost.value.company = name
              companyLocked.value = true
            }
          }
        }
      } catch {
        // ignore - leave company editable
      }
    }

    const form = document.querySelector('form')
    if (form) {
      form.addEventListener('keydown', (e) => {
        // Allow Enter in textareas only
        const target = e.target as HTMLElement
        const isTextarea = target.tagName === 'TEXTAREA'

        if (e.key === 'Enter' && !isTextarea) {
          e.preventDefault()
        }
      })
    }
  })()
})
</script>

<template>
  <div class="min-h-screen pb-10">
    <!-- Header -->
    <header class="text-center py-14 bg-gradient-to-r from-green-500 to-indigo-600">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">
        {{ isEditMode ? 'Edit Your Job Post' : 'Create Your Job Post' }}
      </h1>
      <p class="text-lg text-indigo-100">
        {{
          isEditMode
            ? 'Update your job posting details'
            : 'Post your opportunity and connect with talented professionals'
        }}
      </p>
    </header>

    <!-- Form wrapper -->
    <form @submit.prevent="handleSubmit" class="max-w-5xl mx-auto -mt-10 space-y-6">

      <!-- Basic Information -->
      <section class="bg-white shadow-lg rounded-2xl p-8 mx-4 md:mx-0">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
          Basic Information
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <!-- Company -->
          <div class="flex flex-col space-y-1">
            <label class="text-sm font-medium text-gray-700">
              Company Name
              <span v-if="isEmpty(jobPost.company)" class="text-red-500">*</span>
            </label>
            <input
              id="companyName"
              v-model="jobPost.company"
              type="text"
              :readonly="companyLocked"
              :class="['px-3 py-2 border text-black rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none', companyLocked ? 'bg-gray-100 cursor-not-allowed' : '']"
              :aria-readonly="companyLocked"
            />
          </div>

          <!-- Job Title -->
          <div class="flex flex-col">
            <label class="text-sm font-medium text-gray-700">
              Job Title
              <span v-if="isEmpty(jobPost.role)" class="text-red-500">*</span>
            </label>
            <BaseInput
              v-model="jobPost.role"
              placeholder="e.g. Frontend Developer"
            />
          </div>

          <!-- Location -->
          <div class="flex flex-col">
            <label class="text-sm font-medium text-gray-700">
              Location
              <span v-if="isEmpty(jobPost.location)" class="text-red-500">*</span>
            </label>
            <BaseInput
              v-model="jobPost.location"
              placeholder="e.g. Bangkok, Thailand"
            />
          </div>

          <!-- Job Type -->
          <div class="flex flex-col">
            <label class="text-sm font-medium text-gray-700 mb-1">
              Job Type
              <span v-if="isEmpty(jobPost.jobType)" class="text-red-500">*</span>
            </label>
            <select
              v-model="jobPost.jobType"
              class="px-3 py-2 border text-black rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option disabled value="" class="text-gray-400">Select job type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <!-- Job Level -->
          <div class="flex flex-col">
            <label class="text-sm font-medium text-gray-700 mb-1">
              Job Level
              <span v-if="isEmpty(jobPost.jobLevel)" class="text-red-500">*</span>
            </label>
            <select
              v-model="jobPost.jobLevel"
              class="px-3 py-2 border text-black rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option disabled value="" class="text-gray-400">Select job level</option>
              <option value="Junior">Junior</option>
              <option value="Mid-Level">Mid-Level</option>
              <option value="Senior-Level">Senior-Level</option>
            </select>
          </div>

          <!-- Capacity -->
          <div class="flex flex-col space-y-1">
            <label class="text-sm font-medium text-gray-700">
              Capacity
              <span v-if="isEmpty(jobPost.capacity)" class="text-red-500">*</span>
            </label>
            <BaseInput
              v-model="jobPost.capacity"
              placeholder="e.g. 4, 5, 6"
            />
            <p v-if="capacityError" class="text-red-500 text-sm mt-1">{{ capacityError }}</p>
          </div>

          <!-- Salary -->
          <div class="flex flex-col col-span-1 md:col-span-2">
            <label class="text-sm font-medium text-gray-700">
              Salary Range
              <span v-if="isEmpty(jobPost.salaryMin) || isEmpty(jobPost.salaryMax)" class="text-red-500">*</span>
            </label>
            <SalaryInput
              v-model:salaryMin="jobPost.salaryMin"
              v-model:salaryMax="jobPost.salaryMax"
              @validity="isSalaryValid = $event"
            />
          </div>

          <!-- End Date -->
          <div class="flex flex-col">
            <label class="text-sm font-medium text-gray-700">
              Application End Date
              <span v-if="isEmpty(jobPost.endDate)" class="text-red-500">*</span>
            </label>
            <CalendarInput v-model="jobPost.endDate" />
            <p v-if="endDateError" class="text-red-500 text-sm mt-1">{{ endDateError }}</p>
          </div>

          <!-- Work Hours -->
          <div class="flex flex-col">
            <label class="text-sm font-medium text-gray-700">
              Work Hours
              <span v-if="isEmpty(jobPost.workHours)" class="text-red-500">*</span>
            </label>
            <TimeInput v-model="jobPost.workHours" :emitCombined="true" />
            <p v-if="workHoursError" class="text-red-500 text-sm mt-1">{{ workHoursError }}</p>
          </div>

        </div>
      </section>

      <!-- Job Description -->
      <section class="bg-white shadow-lg rounded-2xl p-8 mx-4 md:mx-0">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
          Job Description
          <span v-if="isEmpty(jobPost.description)" class="text-red-500">*</span>
        </h2>
        <BaseTextarea
          v-model="jobPost.description"
          placeholder="Describe the role, responsibilities, requirements, and benefits..."
        />
      </section>

      <!-- Required Skills -->
      <section class="bg-white shadow-lg rounded-2xl p-8 mx-4 md:mx-0">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
          Required Skills
          <span v-if="isEmpty(jobPost.skills)" class="text-red-500">*</span>
        </h2>
        <SearchableTagInput
          v-model="jobPost.skills"
          :suggestions="[
            'React','Vue','Angular','Node.js','Python','Django',
            'Machine Learning','AWS','SQL'
          ]"
          placeholder="Search or add a skill..."
        />
      </section>

      <!-- Tags -->
      <section class="bg-white shadow-lg rounded-2xl p-8 mx-4 md:mx-0">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
          Tags
          <span v-if="isEmpty(jobPost.tags)" class="text-red-500">*</span>
        </h2>
        <TagInput v-model="jobPost.tags" placeholder="e.g. Urgent, Remote, Internship" />
      </section>

      <!-- Contacts -->
      <section class="bg-white shadow-lg rounded-2xl p-8 mx-4 md:mx-0">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
          Contacts
          <span v-if="isEmpty(jobPost.contacts)" class="text-red-500">*</span>
        </h2>
        <ContactField v-model="jobPost.contacts" />
      </section>

      <!-- Submit -->
      <div class="flex justify-end gap-3 mx-4 md:mx-0">
        <button
          v-if="isEditMode"
          type="button"
          @click="handleCancel"
          class="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold text-lg rounded-xl shadow-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          :disabled="!isFormValid"
          class="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isEditMode ? 'Update Job' : 'Post Job' }}
        </button>
      </div>

    </form>
  </div>
</template>

