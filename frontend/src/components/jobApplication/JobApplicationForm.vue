<script setup lang="ts">
import type { Job } from '@/types/jobType'
import { ref, reactive, computed } from 'vue'

// Props
const props = defineProps<{ job: Job }>()

// Step control
const step = ref(1)

// Form data
const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
  experience: '',
  expected_salary: '',
  confirm: false,
  resume: null as File | null,
  application_letter: null as File | null,
})

// Validation errors
const errors = reactive({ phone: '', email: '' })

const validatePhone = (phone: string) => /^[0-9]{9,10}$/.test(phone)
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

function validatePersonalInfo() {
  errors.phone = ''
  errors.email = ''

  if (form.phone.trim() && !validatePhone(form.phone)) {
    errors.phone = 'Phone number must contain 9–10 number digits.'
  }

  if (form.email.trim() && !validateEmail(form.email)) {
    errors.email = 'Invalid email address.'
  }
}

function onPhoneInput(event: Event) {
  const input = event.target as HTMLInputElement
  input.value = input.value.replace(/[^0-9]/g, '')
  if (input.value.length > 10) {
    input.value = input.value.slice(0, 10)
  }
  form.phone = input.value
  validatePersonalInfo()
}

const resumeInput = ref<HTMLInputElement | null>(null)
const letterInput = ref<HTMLInputElement | null>(null)

function onFileChange(event: Event, field: string) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (field === 'resume') form.resume = file
  if (field === 'application_letter') form.application_letter = file
}

function onDrop(event: DragEvent, field: string) {
  const file = event.dataTransfer?.files[0]
  if (!file) return
  if (field === 'resume') form.resume = file
  if (field === 'application_letter') form.application_letter = file
}

// Options
const experienceOptions = [
  { label: 'no experience', value: 'no experience' },
  { label: '<1 year', value: '<1 year' },
  { label: '1–2 years', value: '1-2 years' },
  { label: '3–5 years', value: '3-5 years' },
  { label: '>5 years', value: '>5 years' },
]

const salaryOptions = [
  { label: '<20,000 ฿', value: '<20000' },
  { label: '20,000–40,000 ฿', value: '20000-40000' },
  { label: '40,000–60,000 ฿', value: '40000-60000' },
  { label: '60,000–80,000 ฿', value: '60000-80000' },
  { label: '>80,000 ฿', value: '>80000' },
]

// Validation checker
const isFormValid = computed(() => {
  validatePersonalInfo()
  const hasValidPhone = form.phone.trim() && !errors.phone
  const hasValidEmail = form.email.trim() && !errors.email
  const hasPersonalInfo =
    form.first_name.trim() &&
    form.last_name.trim() &&
    hasValidEmail &&
    hasValidPhone &&
    form.address.trim()

  const hasResume = !!form.resume
  const hasLetter = !!form.application_letter
  const hasExperience = !!form.experience
  const hasExpectedSalary = !!form.expected_salary
  const confirmed = form.confirm

  return (
    hasPersonalInfo && hasResume && hasLetter && hasExperience && hasExpectedSalary && confirmed
  )
})

// Helper to collect missing fields
function getMissingFields() {
  const missing: string[] = []

  if (!form.first_name.trim()) missing.push('First Name')
  if (!form.last_name.trim()) missing.push('Last Name')
  if (!form.address.trim()) missing.push('Location')
  if (!form.phone.trim()) missing.push('Phone')
  else if (errors.phone) missing.push(`Phone (${errors.phone})`)
  if (!form.email.trim()) missing.push('Email')
  else if (errors.email) missing.push(`Email (${errors.email})`)
  if (!form.resume) missing.push('Resume file')
  if (!form.application_letter) missing.push('Application Letter')
  if (!form.experience) missing.push('Years of Experience')
  if (!form.expected_salary) missing.push('Expected Salary')
  if (!form.confirm) missing.push('Confirmation checkbox')

  return missing
}

// Submit handler
function handleSubmit(e: Event) {
  e.preventDefault()
  validatePersonalInfo()

  if (!isFormValid.value) {
    const missing = getMissingFields()
    alert(`Please fix the following before submitting:\n\n- ${missing.join('\n- ')}`)
    return
  }

  // If valid
  const formData = new FormData()
  formData.append('first_name', form.first_name)
  formData.append('last_name', form.last_name)
  formData.append('email', form.email)
  formData.append('phone', form.phone)
  formData.append('address', form.address)
  formData.append('experience', form.experience)
  formData.append('expected_salary', form.expected_salary)
  formData.append('confirm', form.confirm ? 'true' : 'false')

  if (form.resume) formData.append('resume', form.resume)
  if (form.application_letter) formData.append('application_letter', form.application_letter)

  alert(`Form submitted for ${props.job.role}! (Replace this with your API call.)`)
}
</script>

<template>
  <div v-if="props.job" class="min-h-screen flex items-center justify-center py-20 px-20">
    <div class="max-w-3xl w-full mx-auto p-6 shadow-md rounded-lg border border-gray-200 bg-white">
      <!-- Title -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-extrabold text-gray-900">{{ job?.role }}</h1>
        <p class="text-xl text-gray-500 mt-1">{{ job?.company }}</p>
      </div>

      <!-- Step Indicator -->
      <div class="flex justify-center mb-8 space-x-4">
        <div
          v-for="n in 3"
          :key="n"
          class="flex-1 h-1 rounded-full"
          :class="step >= n ? 'bg-blue-600' : 'bg-gray-300'"
        ></div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Step 1 -->
        <div v-if="step === 1" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                First Name
                <span v-if="!form.first_name" class="text-red-500">*</span>
              </label>
              <input
                v-model="form.first_name"
                type="text"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Last Name
                <span v-if="!form.last_name" class="text-red-500">*</span>
              </label>
              <input
                v-model="form.last_name"
                type="text"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Location
                <span v-if="!form.address" class="text-red-500">*</span>
              </label>
              <input
                v-model="form.address"
                type="text"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Phone
                <span v-if="!form.phone" class="text-red-500">*</span>
              </label>
              <input
                v-model="form.phone"
                type="tel"
                inputmode="numeric"
                @input="onPhoneInput"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
              />
              <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Email
              <span v-if="!form.email" class="text-red-500">*</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              @input="validatePersonalInfo"
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>
        </div>

        <!-- Step 2 -->
        <div v-if="step === 2" class="space-y-8">
          <div class="p-6 border rounded-lg bg-white shadow-sm">
            <h2 class="font-semibold text-lg mb-4">
              Your Resume
              <span v-if="!form.resume" class="text-red-500">*</span>
            </h2>

            <div
              class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition"
              @drop.prevent="onDrop($event, 'resume')"
              @dragover.prevent
              @click="resumeInput?.click()"
            >
              <p>Drag & drop your resume or click to browse</p>
              <input
                type="file"
                class="hidden"
                ref="resumeInput"
                @change="onFileChange($event, 'resume')"
              />
              <p v-if="form.resume" class="mt-2 text-gray-700 font-medium">
                Selected: {{ form.resume.name }}
              </p>
            </div>
          </div>

          <div class="p-6 border rounded-lg bg-white shadow-sm">
            <h2 class="font-semibold text-lg mb-4">
              Application Letter
              <span v-if="!form.application_letter" class="text-red-500">*</span>
            </h2>
            <div
              class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition"
              @drop.prevent="onDrop($event, 'application_letter')"
              @dragover.prevent
              @click="letterInput?.click()"
            >
              <p>Drag & drop your application letter or click to browse</p>
              <input
                type="file"
                class="hidden"
                ref="letterInput"
                @change="onFileChange($event, 'application_letter')"
              />
              <p v-if="form.application_letter" class="mt-2 text-gray-700 font-medium">
                Selected: {{ form.application_letter.name }}
              </p>
            </div>
          </div>
        </div>

        <!-- Step 3 -->
        <div v-if="step === 3" class="space-y-6">
          <div class="p-6 border rounded-lg bg-white shadow-sm">
            <h2 class="font-semibold text-lg mb-6">General Questions</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p>
                  Years of experience
                  <span v-if="!form.experience" class="text-red-500">*</span>
                </p>
                <div v-for="option in experienceOptions" :key="option.value">
                  <label class="flex items-center space-x-2">
                    <input type="radio" v-model="form.experience" :value="option.value" />
                    <span>{{ option.label }}</span>
                  </label>
                </div>
              </div>

              <div>
                <p>
                  Expected Salary
                  <span v-if="!form.expected_salary" class="text-red-500">*</span>
                </p>
                <div v-for="option in salaryOptions" :key="option.value">
                  <label class="flex items-center space-x-2">
                    <input type="radio" v-model="form.expected_salary" :value="option.value" />
                    <span>{{ option.label }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <input type="checkbox" v-model="form.confirm" />
            <span>
              I confirm the information is correct
              <span v-if="!form.confirm" class="text-red-500">*</span>.
            </span>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-between pt-4">
          <button
            v-if="step > 1"
            type="button"
            @click="step--"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md transition"
          >
            Back
          </button>

          <button
            v-if="step < 3"
            type="button"
            @click="step++"
            class="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
          >
            Next
          </button>

          <button
            v-if="step === 3"
            type="submit"
            class="ml-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
