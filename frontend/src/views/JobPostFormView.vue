<script setup lang="ts">
import { ref } from 'vue'

// Import components
import BaseInput from '@/components/job-post-form/BaseInput.vue'
import BaseTextarea from '@/components/job-post-form/BaseTextarea.vue'
import FileUpload from '@/components/job-post-form/FileUpload.vue'
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
  salaryMin: string
  salaryMax: string
  images: File[]
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
  salaryMin: '',
  salaryMax: '',
  images: [],
  contacts: [],
})

const handleSubmit = (): void => {
  const payload = {
    ...jobPost.value,
    salary: `${jobPost.value.salaryMin} - ${jobPost.value.salaryMax}`, // Combine salary
  }
  console.log('Submitting Job Post:', payload)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="text-center py-10 bg-gradient-to-b from-green-200 to-white">
      <h1 class="text-4xl font-bold text-gray-800">Create Your Job Post</h1>
      <p class="text-gray-600">Post your job opportunity and connect with talented professionals</p>
    </div>

    <!-- Form -->
    <form
      @submit.prevent="handleSubmit"
      class="max-w-4xl mx-auto space-y-6 p-6 bg-white shadow rounded-2xl"
    >
      <!-- Basic Information -->
      <section>
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Basic Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <SalaryInput
            v-model:salaryMin="jobPost.salaryMin"
            v-model:salaryMax="jobPost.salaryMax"
          />
        </div>
      </section>

      <!-- Job Description -->
      <section>
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Job Description</h2>
        <BaseTextarea
          v-model="jobPost.description"
          placeholder="Describe the role, responsibilities, requirements, and benefits..."
        />
      </section>

      <!-- Work Fields -->
      <section>
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Work Fields</h2>
        <TagInput
          v-model="jobPost.workFields"
          placeholder="e.g. React, Node.js, Machine Learning"
        />
      </section>

      <!-- Images -->
      <section>
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Images</h2>
        <FileUpload v-model="jobPost.images" />
      </section>

      <!-- Contacts -->
      <section>
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Contacts</h2>
        <ContactField v-model="jobPost.contacts" />
      </section>

      <!-- Submit -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700"
        >
          Post Job
        </button>
      </div>
    </form>
  </div>
</template>
