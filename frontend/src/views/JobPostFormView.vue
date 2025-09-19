<script setup lang="ts">
import { ref, computed } from 'vue'

// Import components
import BaseInput from '@/components/job-post-form/BaseInput.vue'
import BaseTextarea from '@/components/job-post-form/BaseTextarea.vue'
import TagInput from '@/components/job-post-form/TagInput.vue'
import ContactField from '@/components/job-post-form/ContactField.vue'
import SalaryInput from '@/components/job-post-form/SalaryInput.vue'

// Types
interface Contact {
  type: string
  link: string
}

interface JobPost {
  company: string
  role: string
  location: string
  postTime: string
  description: string
  jobType: string
  workFields: string[]
  tags: string[]
  salaryMin: string
  salaryMax: string
  contacts: Contact[]
}

const jobPost = ref<JobPost>({
  company: '',
  role: '',
  location: '',
  postTime: '',
  description: '',
  jobType: '',
  workFields: [],
  tags: [],
  salaryMin: '',
  salaryMax: '',
  contacts: [],
})

// Track validity from SalaryInput
const isSalaryValid = ref(true)

// Check if form is valid
const isFormValid = computed(() => {
  return (
    jobPost.value.company.trim() !== '' &&
    jobPost.value.role.trim() !== '' &&
    jobPost.value.location.trim() !== '' &&
    jobPost.value.description.trim() !== '' &&
    jobPost.value.jobType.trim() !== '' &&
    jobPost.value.workFields.length > 0 &&
    jobPost.value.salaryMin.trim() !== '' &&
    jobPost.value.salaryMax.trim() !== '' &&
    isSalaryValid.value
  )
})

const handleSubmit = (): void => {
  if (!isFormValid.value) {
    alert('Please complete all fields before submitting.')
    return
  }

  const payload = {
    ...jobPost.value,
    salary: `${jobPost.value.salaryMin} - ${jobPost.value.salaryMax}`,
  }
  console.log('Submitting Job Post:', payload)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 pb-10">
    <!-- Header -->
    <header class="text-center py-14 bg-gradient-to-r from-green-500 to-indigo-600">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">Create Your Job Post</h1>
      <p class="text-lg text-indigo-100">
        Post your opportunity and connect with talented professionals
      </p>
    </header>

    <div class="max-w-5xl mx-auto -mt-10 space-y-6">
      <!-- Basic Information -->
      <section class="bg-white shadow-lg rounded-2xl p-8">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Basic Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseInput
            v-model="jobPost.company"
            label="Company Name"
            placeholder="e.g. Techhahaha Inc."
          />
          <BaseInput v-model="jobPost.role" label="Role" placeholder="e.g. Frontend Developer" />
          <BaseInput
            v-model="jobPost.location"
            label="Location"
            placeholder="e.g. Bangkok, Thailand"
          />
          <div class="flex flex-col">
            <label class="text-sm font-medium text-gray-800 mb-1">Job Type</label>
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
      <section class="bg-white shadow-lg rounded-2xl p-8">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Job Description</h2>
        <BaseTextarea
          v-model="jobPost.description"
          placeholder="Describe the role, responsibilities, requirements, and benefits..."
        />
      </section>

      <!-- Work Fields -->
      <section class="bg-white shadow-lg rounded-2xl p-8">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Work Fields</h2>
        <TagInput
          v-model="jobPost.workFields"
          placeholder="e.g. React, Node.js, Machine Learning"
        />
      </section>

      <!-- Tags -->
      <section class="bg-white shadow-lg rounded-2xl p-8">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Tags</h2>
        <TagInput v-model="jobPost.tags" placeholder="e.g. Urgent, Remote, Internship" />
      </section>

      <!-- Contacts -->
      <section class="bg-white shadow-lg rounded-2xl p-8">
        <h2 class="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Contacts</h2>
        <ContactField v-model="jobPost.contacts" />
      </section>

      <!-- Submit -->
      <div class="flex justify-end">
        <button
          type="submit"
          @click.prevent="handleSubmit"
          :disabled="!isFormValid"
          class="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post Job
        </button>
      </div>
    </div>
  </div>
</template>
