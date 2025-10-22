<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Import components
import BaseInput from '@/components/job-post-form/BaseInput.vue'
import BaseTextarea from '@/components/job-post-form/BaseTextarea.vue'
import TagInput from '@/components/job-post-form/TagInput.vue'
import ContactField from '@/components/job-post-form/ContactField.vue'
import SalaryInput from '@/components/job-post-form/SalaryInput.vue'
import SearchableTagInput from '@/components/job-post-form/SearchableTagInput.vue'

// Form state
const jobPost = ref({
  company: '',
  role: '',
  location: '',
  postTime: '',
  description: '',
  jobType: '',
  skill_names: [] as string[],
  tag_names: [] as string[],
  salaryMin: '',
  salaryMax: '',
  contacts: [] as { type: string; link: string }[],
})

const skillSuggestions = ref<string[]>([])

const isSalaryValid = ref(true)

const isFormValid = computed(() => {
  const min = Number(jobPost.value.salaryMin)
  const max = Number(jobPost.value.salaryMax)

  return (
    jobPost.value.company.trim() !== '' &&
    jobPost.value.role.trim() !== '' &&
    jobPost.value.location.trim() !== '' &&
    jobPost.value.description.trim() !== '' &&
    jobPost.value.jobType.trim() !== '' &&
    jobPost.value.skill_names.length > 0 &&
    jobPost.value.salaryMin.trim() !== '' &&
    jobPost.value.salaryMax.trim() !== '' &&
    min > 0 &&
    max > 0 &&
    isSalaryValid.value
  )
})

const handleSubmit = async (): Promise<void> => {
  const min = Number(jobPost.value.salaryMin)
  const max = Number(jobPost.value.salaryMax)

  if (min <= 0 || max <= 0) {
    alert('Salary cannot be zero or negative.')
    return
  }

  if (!isFormValid.value) {
    alert('Please complete all fields before submitting.')
    return
  }

  try {
    // Fetch CSRF token
    const csrfResponse = await fetch(
      `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'}/api/v1/csrf-token`,
      {
        credentials: 'include'  // <-- ADD THIS
      }
    )
    const csrfData = await csrfResponse.json()
    const csrf_token = csrfData.csrf_token

    // SET THE DEFAULT DELTA YOU NEED TO ADD THEEEEESEEE FIELD OKKKKK!??!?!?!?!?!?
    const defaults = {
      work_hours: '9:00 AM - 5:00 PM',
      job_level: 'Mid-level',
      capacity: 1,
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }

    const payload = {
      title: jobPost.value.role,
      description: jobPost.value.description,
      location: jobPost.value.location,
      work_hours: defaults.work_hours,
      job_type: (jobPost.value.jobType || '').toLowerCase(),
      job_level: defaults.job_level,
      capacity: defaults.capacity,
      end_date: defaults.end_date,
      salary_min: Number(jobPost.value.salaryMin) || 0,
      salary_max: Number(jobPost.value.salaryMax) || 0,
      skill_names: Array.isArray(jobPost.value.skill_names) ? jobPost.value.skill_names : [],
      tag_names: Array.isArray(jobPost.value.tag_names) ? jobPost.value.tag_names : [],
    }
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (csrf_token) headers['X-CSRFToken'] = csrf_token

    const accessToken =
      (typeof window !== 'undefined' && localStorage.getItem('user_jwt'))
    if (accessToken) {
      headers['access_token'] = accessToken
    }

    const bodyString = JSON.stringify(payload)
 
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'}/api/v1/jobs`, {
      method: 'POST',
      headers,
      body: bodyString,
      credentials: 'include' 
  })

    const data = await response.json()


    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit job post')
    }
    
    alert('Job Post submitted successfully!')
    
  } catch (err) {
    console.error('Error submitting job post:', err)
    alert('Failed to submit job post.')
  }
}

// Prevent accidental submit via Enter/Return
onMounted(() => {
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

  // Fetch skill/term suggestions from backend and replace defaults
  ;(async () => {
    const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
    try {
      const res = await fetch(`${base}/api/v1/terms`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) {
        console.warn('Failed to load terms suggestions:', res.status)
        return
      }
      const json = await res.json()

      if (Array.isArray(json)) {
        const mapped = json
          .map((it: unknown) => {
            if (it && typeof it === 'object') {
              const obj = it as Record<string, unknown>
              const name = obj.name ?? obj['name']
              return typeof name === 'string' ? name : String(name ?? '')
            }
            return ''
          })
          .filter((s: string) => s.trim() !== '')
        skillSuggestions.value = mapped
      }
    } catch (err) {
      console.error('Error fetching term suggestions:', err)
    }
  })()
})
</script>

<template>
  <div class="min-h-screen pb-10">
    <!-- Header -->
    <header class="text-center py-14 bg-gradient-to-r from-green-500 to-indigo-600">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">Create Your Job Post</h1>
      <p class="text-lg text-indigo-100">
        Post your opportunity and connect with talented professionals
      </p>
    </header>

    <!-- Form wrapper -->
    <form @submit.prevent="handleSubmit" class="max-w-5xl mx-auto -mt-10 space-y-6">
      <!-- Basic Information -->
      <section class="bg-white shadow-lg rounded-2xl p-8 mx-4 md:mx-0">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Basic Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseInput
            v-model="jobPost.company"
            label="Company Name"
            placeholder="e.g. Techhahaha Inc."
          />
          <BaseInput
            v-model="jobPost.role"
            label="Job Title"
            placeholder="e.g. Frontend Developer"
          />
          <BaseInput
            v-model="jobPost.location"
            label="Location"
            placeholder="e.g. Bangkok, Thailand"
          />
          <div class="flex flex-col">
            <label class="text-sm font-medium text-gray-700 mb-1">Job Type</label>
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

          <SalaryInput
            v-model:salaryMin="jobPost.salaryMin"
            v-model:salaryMax="jobPost.salaryMax"
            @validity="isSalaryValid = $event"
          />
        </div>
      </section>

      <!-- Job Description -->
      <section class="bg-white shadow-lg rounded-2xl p-8 mx-4 md:mx-0">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Job Description</h2>
        <BaseTextarea
          v-model="jobPost.description"
          placeholder="Describe the role, responsibilities, requirements, and benefits..."
        />
      </section>

      <!-- Work Fields -->
      <section class="bg-white shadow-lg rounded-2xl p-8 mx-4 md:mx-0">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Required Skills</h2>
        <SearchableTagInput
          v-model="jobPost.skill_names"
          :suggestions="skillSuggestions"
          placeholder="Search or add a skill..."
        />
      </section>

      <!-- Tags -->
      <section class="bg-white shadow-lg rounded-2xl p-8 mx-4 md:mx-0">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Tags</h2>
        <TagInput v-model="jobPost.tag_names" placeholder="e.g. Urgent, Remote, Internship" />
      </section>

      <!-- Contacts -->
      <section class="bg-white shadow-lg rounded-2xl p-8 mx-4 md:mx-0">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Contacts</h2>
        <ContactField v-model="jobPost.contacts" />
      </section>

      <!-- Submit -->
      <div class="flex justify-end mx-4 md:mx-0">
        <button
          type="submit"
          :disabled="!isFormValid"
          class="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post Job
        </button>
      </div>
    </form>
  </div>
</template>