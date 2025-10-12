<template>
  <div class="min-h-screen flex items-center justify-center py-20 px-20">
    <div class="max-w-3xl w-full mx-auto p-6 shadow-md rounded-lg border border-gray-200">
      <!-- Title -->
      <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">Job Applying</h1>

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
        <!-- Step 1: Applicant Info -->
        <div v-if="step === 1" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">First Name</label>
              <input
                v-model="form.first_name"
                type="text"
                required
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                v-model="form.last_name"
                type="text"
                required
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Location</label>
              <input
                v-model="form.address"
                type="text"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Phone</label>
              <input
                v-model="form.phone"
                type="tel"
                inputmode="numeric"
                pattern="[0-9]*"
                maxlength="15"
                @input="onPhoneInput"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
                :class="{ 'border-red-500': !isPhoneValid && form.phone }"
              />
              <p v-if="!isPhoneValid && form.phone" class="text-red-500 text-sm mt-1">
                Please enter a valid phone number (digits only).
              </p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
              :class="{ 'border-red-500': !isEmailValid && form.email }"
              @input="validateEmail"
            />
            <p v-if="!isEmailValid && form.email" class="text-red-500 text-sm mt-1">
              Please enter a valid email address.
            </p>
          </div>
        </div>

        <!-- Step 2: Resume + Application Letter -->
        <div v-if="step === 2" class="space-y-8">
          <!-- Resume -->
          <div class="p-6 border rounded-lg shadow-sm bg-white">
            <h2 class="font-semibold text-lg mb-4">Your Resume</h2>

            <div class="space-y-2 mb-4">
              <label class="flex items-center space-x-2">
                <input
                  type="radio"
                  v-model="resumeOption"
                  value="profile"
                  class="text-blue-600 focus:ring-blue-500"
                />
                <span>Use the resume from your profile</span>
              </label>
              <label class="flex items-center space-x-2">
                <input
                  type="radio"
                  v-model="resumeOption"
                  value="upload"
                  class="text-blue-600 focus:ring-blue-500"
                />
                <span>Use a new resume</span>
              </label>
            </div>

            <div
              v-show="resumeOption === 'upload'"
              class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition"
              @drop.prevent="onDrop($event, 'resume')"
              @dragover.prevent
            >
              <svg
                class="w-10 h-10 text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 4h2a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h2m6 0V4m0 0l-4 4m4-4l4 4"
                />
              </svg>
              <p class="text-gray-600">Choose a file or drag & drop it here</p>
              <p class="text-xs text-gray-400 mb-3">PDF, DOC, DOCX up to 50MB</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                class="hidden"
                ref="resumeInput"
                @change="onFileChange($event, 'resume')"
              />
              <button
                type="button"
                class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                @click="$refs.resumeInput.click()"
              >
                Browse File
              </button>
              <p v-if="form.resume" class="mt-2 text-sm text-gray-700">
                Selected: {{ form.resume.name }}
              </p>
            </div>
          </div>

          <!-- Application Letter -->
          <div class="p-6 border rounded-lg shadow-sm bg-white">
            <h2 class="font-semibold text-lg mb-4">Your Application Letter</h2>

            <div
              class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition"
              @drop.prevent="onDrop($event, 'application_letter')"
              @dragover.prevent
            >
              <svg
                class="w-10 h-10 text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 4h2a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h2m6 0V4m0 0l-4 4m4-4l4 4"
                />
              </svg>
              <p class="text-gray-600">Choose a file or drag & drop it here</p>
              <p class="text-xs text-gray-400 mb-3">PDF, DOC, DOCX up to 50MB</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                class="hidden"
                ref="letterInput"
                @change="onFileChange($event, 'application_letter')"
              />
              <button
                type="button"
                class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                @click="$refs.letterInput.click()"
              >
                Browse File
              </button>
              <p v-if="form.application_letter" class="mt-2 text-sm text-gray-700">
                Selected: {{ form.application_letter.name }}
              </p>
            </div>
          </div>
        </div>

        <!-- Step 3: General Questions -->
        <div v-if="step === 3" class="space-y-6">
          <div class="p-6 border rounded-lg shadow-sm bg-white">
            <h2 class="font-semibold text-lg mb-6">General Questions</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p class="font-medium text-gray-700 mb-3">Years of experience</p>
                <div class="space-y-2">
                  <label
                    v-for="option in experienceOptions"
                    :key="option.value"
                    class="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      v-model="form.experience"
                      :value="option.value"
                      class="text-blue-600 focus:ring-blue-500"
                    />
                    <span>{{ option.label }}</span>
                  </label>
                </div>
              </div>

              <div>
                <p class="font-medium text-gray-700 mb-3">Expected Salary</p>
                <div class="space-y-2">
                  <label
                    v-for="salary in salaryOptions"
                    :key="salary.value"
                    class="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      v-model="form.expected_salary"
                      :value="salary.value"
                      class="text-blue-600 focus:ring-blue-500"
                    />
                    <span>{{ salary.label }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <input
              type="checkbox"
              v-model="form.confirm"
              class="text-blue-600 focus:ring-blue-500 rounded"
            />
            <span>I confirm the information is correct.</span>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-between pt-4">
          <button
            type="button"
            v-if="step > 1"
            @click="step--"
            class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Back
          </button>

          <button
            type="button"
            v-if="step < 3"
            @click="nextStep"
            class="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Next
          </button>

          <button
            type="submit"
            v-if="step === 3"
            :disabled="!isFormValid"
            class="ml-auto px-4 py-2 rounded-lg text-white transition bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const jobId = route.params.job_id

const step = ref(1)
const resumeOption = ref('upload')

const form = ref({
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

const isEmailValid = ref(true)
const isPhoneValid = ref(true)

// Email validation
function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  isEmailValid.value = emailPattern.test(form.value.email)
}

// Phone validation (digits only)
function onPhoneInput(event: Event) {
  const input = event.target as HTMLInputElement
  input.value = input.value.replace(/\D/g, '')
  form.value.phone = input.value
  isPhoneValid.value = /^[0-9]{7,15}$/.test(form.value.phone)
}

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

const resumeInput = ref<HTMLInputElement | null>(null)
const letterInput = ref<HTMLInputElement | null>(null)

function onFileChange(event: Event, field: string) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    if (field === 'resume') form.value.resume = file
    if (field === 'application_letter') form.value.application_letter = file
  }
}

function onDrop(event: DragEvent, field: string) {
  const file = event.dataTransfer?.files[0]
  if (file) {
    if (field === 'resume') form.value.resume = file
    if (field === 'application_letter') form.value.application_letter = file
  }
}

// Prevent moving to next step with invalid input
function nextStep() {
  if (step.value === 1) {
    validateEmail()
    if (!isEmailValid.value) {
      alert('Please enter a valid email address.')
      return
    }
    if (!isPhoneValid.value) {
      alert('Please enter a valid phone number.')
      return
    }
  }
  step.value++
}

const isFormValid = computed(() => {
  const hasPersonalInfo =
    form.value.first_name.trim() &&
    form.value.last_name.trim() &&
    form.value.email.trim() &&
    form.value.phone.trim() &&
    form.value.address.trim() &&
    isEmailValid.value &&
    isPhoneValid.value

  const hasResume =
    resumeOption.value === 'profile' || (resumeOption.value === 'upload' && form.value.resume)
  const hasLetter = !!form.value.application_letter
  const hasExperience = !!form.value.experience
  const hasExpectedSalary = !!form.value.expected_salary
  const confirmed = form.value.confirm

  return (
    hasPersonalInfo && hasResume && hasLetter && hasExperience && hasExpectedSalary && confirmed
  )
})

async function handleSubmit(e: Event) {
  e.preventDefault()

  validateEmail()
  if (!isEmailValid.value || !isPhoneValid.value) {
    alert('Please correct invalid email or phone number.')
    return
  }

  if (!isFormValid.value) {
    alert('Please complete all required sections before submitting.')
    return
  }

  const formData = new FormData()
  formData.append('first_name', form.value.first_name)
  formData.append('last_name', form.value.last_name)
  formData.append('email', form.value.email)
  formData.append('phone', form.value.phone)
  formData.append('address', form.value.address)
  formData.append('experience', form.value.experience)
  formData.append('expected_salary', form.value.expected_salary)
  formData.append('confirm', form.value.confirm ? 'true' : 'false')
  formData.append('resume_option', resumeOption.value)

  if (form.value.resume) formData.append('resume', form.value.resume)
  if (form.value.application_letter)
    formData.append('application_letter', form.value.application_letter)

  try {
    const response = await fetch(`http://localhost:8000/jobs/${jobId}/apply/`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const result = await response.json()
    alert('Application submitted successfully!')
    console.log(result)
  } catch (error) {
    console.error('Submission failed:', error)
    alert('Failed to submit the form. Please try again.')
  }
}
</script>
