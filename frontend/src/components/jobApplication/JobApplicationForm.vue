<script setup lang="ts">
import type { Job } from '@/types/jobType'
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { submitApplication } from '@/services/applicationService'
import ToastContainer from '@/components/additions/ToastContainer.vue'

const toastRef = ref<InstanceType<typeof ToastContainer> | null>(null)
const showSuccess = (msg: string) => toastRef.value?.addToast(msg, 'success')
const showError = (msg: string) => toastRef.value?.addToast(msg, 'error')

// Props
const props = defineProps<{ job?: Job }>()
const job = props.job
const route = useRoute()
const router = useRouter()

// Step control
const step = ref(1)
const resumeOption = ref('upload')

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  experience: '',
  expectedSalary: '',
  confirm: false,
  resume: null as File | null,
  applicationLetter: null as File | null,
})

// Validation errors
const errors = reactive({ phone: '', email: '' })

const validatePhone = (phone: string) => /^[0-9]{9,10}$/.test(phone)
const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

function validatePersonalInfo() {
  errors.phone = ''
  errors.email = ''

  if (form.phone.trim() && !validatePhone(form.phone)) {
    // Customized message for 9–10 digits only
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
  if (field === 'applicationLetter') form.applicationLetter = file
}

function onDrop(event: DragEvent, field: string) {
  const file = event.dataTransfer?.files[0]
  if (!file) return
  if (field === 'resume') form.resume = file
  if (field === 'applicationLetter') form.applicationLetter = file
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
    form.firstName.trim() &&
    form.lastName.trim() &&
    hasValidEmail &&
    hasValidPhone &&
    form.address.trim()

  const hasResume =
    resumeOption.value === 'profile' || (resumeOption.value === 'upload' && form.resume)
  const hasLetter = !!form.applicationLetter
  const hasExperience = !!form.experience
  const hasExpectedSalary = !!form.expectedSalary
  const confirmed = form.confirm

  return (
    hasPersonalInfo && hasResume && hasLetter && hasExperience && hasExpectedSalary && confirmed
  )
})

// Helper to collect missing fields
function getMissingFields() {
  const missing: string[] = []

  if (!form.firstName.trim()) missing.push('First Name')
  if (!form.lastName.trim()) missing.push('Last Name')
  if (!form.address.trim()) missing.push('Location')
  if (!form.phone.trim()) missing.push('Phone')
  else if (errors.phone) missing.push(`Phone (${errors.phone})`)
  if (!form.email.trim()) missing.push('Email')
  else if (errors.email) missing.push(`Email (${errors.email})`)
  if (resumeOption.value === 'upload' && !form.resume)
    missing.push('Resume file (or select "Use resume from profile")')
  if (!form.applicationLetter) missing.push('Application Letter')
  if (!form.experience) missing.push('Years of Experience')
  if (!form.expectedSalary) missing.push('Expected Salary')
  if (!form.confirm) missing.push('Confirmation checkbox')

  return missing
}

// Submit handler
async function handleSubmit(e: Event) {
  e.preventDefault()
  validatePersonalInfo()

  if (!isFormValid.value) {
    const missing = getMissingFields()
    showError(`Please fix the following before submitting:\n\n- ${missing.join('\n- ')}`)
    return
  }

  const jobId = job?.jobId ?? (route.params.id as string | undefined)
  if (!jobId) {
    showError('Cannot determine job id for this application.')
    return
  }

  // Build FormData using camelCase keys
  const formData = new FormData()
  formData.append('firstName', form.firstName)
  formData.append('lastName', form.lastName)
  formData.append('email', form.email)
  formData.append('phoneNumber', form.phone)
  formData.append('yearsOfExperience', form.experience)
  formData.append('expectedSalary', form.expectedSalary)

  // Files
  if (form.resume) formData.append('resume', form.resume)
  if (form.applicationLetter) formData.append('applicationLetter', form.applicationLetter)

  try {
    const result = await submitApplication(jobId, formData)
    if (!result) {
      showError('Application submitted but server returned no data. Please check the server logs.')
      return
    }
    showSuccess('Application submitted successfully!')
    router.push(`/explore-job`)
  } catch (err) {
    console.error('Error submitting application', err)
    const msg = err instanceof Error ? err.message : String(err)
    showError(msg)
  }
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
                <span v-if="!form.firstName" class="text-red-500">*</span>
              </label>
              <input
                v-model="form.firstName"
                type="text"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Last Name
                <span v-if="!form.lastName" class="text-red-500">*</span>
              </label>
              <input
                v-model="form.lastName"
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
              <span v-if="resumeOption === 'upload' && !form.resume" class="text-red-500">*</span>
            </h2>

            <div class="space-y-2 mb-4">
              <label class="flex items-center space-x-2">
                <input type="radio" v-model="resumeOption" value="profile" />
                <span>Use resume from profile</span>
              </label>
              <label class="flex items-center space-x-2">
                <input type="radio" v-model="resumeOption" value="upload" />
                <span>Upload new resume</span>
              </label>
            </div>

              <div
              v-if="resumeOption === 'upload'"
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
              <span v-if="!form.applicationLetter" class="text-red-500">*</span>
            </h2>
            <div
              class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition"
              @drop.prevent="onDrop($event, 'applicationLetter')"
              @dragover.prevent
              @click="letterInput?.click()"
            >
              <p>Drag & drop your application letter or click to browse</p>
              <input
                type="file"
                class="hidden"
                ref="letterInput"
                @change="onFileChange($event, 'applicationLetter')"
              />
              <p v-if="form.applicationLetter" class="mt-2 text-gray-700 font-medium">
                Selected: {{ form.applicationLetter.name }}
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
                  <span v-if="!form.expectedSalary" class="text-red-500">*</span>
                </p>
                <div v-for="option in salaryOptions" :key="option.value">
                  <label class="flex items-center space-x-2">
                    <input type="radio" v-model="form.expectedSalary" :value="option.value" />
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
    <ToastContainer ref="toastRef" />
  </div>
</template>
