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

const props = defineProps<{
  initialData?: Job
}>()

const emit = defineEmits<{
  submit: [payload: Partial<Job>]
  cancel: []
}>()

const isEditMode = computed(() => !!props.initialData)

// Form state
const jobPost = ref({
  company: '',
  role: '',
  location: '',
  description: '',
  jobType: '',
  skills: [] as string[],
  tags: [] as string[],
  salary_min: '',
  salary_max: '',
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
      salary_min: props.initialData.salary_min.toString() || '',
      salary_max: props.initialData.salary_max.toString() || '',
      contacts: props.initialData.contacts || [],
    }
  }
}

const isSalaryValid = ref(true)

const isFormValid = computed(() => {

  return (
    jobPost.value.company.trim() !== '' &&
    jobPost.value.role.trim() !== '' &&
    jobPost.value.location.trim() !== '' &&
    jobPost.value.description.trim() !== '' &&
    jobPost.value.jobType.trim() !== '' &&
    jobPost.value.skills.length > 0 &&
    jobPost.value.salary_min.trim() !== '' &&
    jobPost.value.salary_max.trim() !== '' &&
    Number(jobPost.value.salary_min) > 0 &&
    Number(jobPost.value.salary_max) > 0 &&
    isSalaryValid.value
  )
})

const handleSubmit = (): void => {
  const min = Number(jobPost.value.salary_min)
  const max = Number(jobPost.value.salary_max)

  if (min <= 0 || max <= 0) {
    alert('Salary cannot be zero or negative.')
    return
  }

  if (!isFormValid.value) {
    alert('Please complete all fields before submitting.')
    return
  }

  const payload = {
    ...jobPost.value,
    salary_min: Number(jobPost.value.salary_min),
    salary_max: Number(jobPost.value.salary_max),
  }
  
  emit('submit', payload)
}

const handleCancel = (): void => {
  emit('cancel')
}

watch(
  () => props.initialData,
  () => {
    initializeForm()
  },
  { immediate: true, deep: true },
)

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
            v-model:salaryMin="jobPost.salary_min"
            v-model:salaryMax="jobPost.salary_max"
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
          v-model="jobPost.skills"
          :suggestions="[
            'React',
            'Vue',
            'Angular',
            'Node.js',
            'Python',
            'Django',
            'Machine Learning',
            'AWS',
            'SQL',
          ]"
          placeholder="Search or add a skill..."
        />
      </section>

      <!-- Tags -->
      <section class="bg-white shadow-lg rounded-2xl p-8 mx-4 md:mx-0">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Tags</h2>
        <TagInput v-model="jobPost.tags" placeholder="e.g. Urgent, Remote, Internship" />
      </section>

      <!-- Contacts -->
      <section class="bg-white shadow-lg rounded-2xl p-8 mx-4 md:mx-0">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Contacts</h2>
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