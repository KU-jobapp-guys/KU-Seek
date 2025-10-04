<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
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
    <form
      action="/api/job-applications"
      method="POST"
      enctype="multipart/form-data"
      @submit.prevent="handleSubmit"
      class="space-y-6"
    >
      <!-- Step 1: Applicant Info -->
      <div v-if="step === 1" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              v-model="form.first_name"
              type="text"
              name="first_name"
              required
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              v-model="form.last_name"
              type="text"
              name="last_name"
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
              name="address"
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Phone</label>
            <input
              v-model="form.phone"
              type="tel"
              name="phone"
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            name="email"
            required
            class="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
          />
        </div>
      </div>

      <!-- Step 2: Resume + Application Letter -->
      <div v-if="step === 2" class="space-y-8">
        <!-- Resume -->
        <div class="p-6 border rounded-lg shadow-sm bg-white">
          <h2 class="font-semibold text-lg mb-4">Your Resume</h2>

          <!-- Select option -->
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
              <span>Use the new resume</span>
            </label>
          </div>

          <!-- Drag & Drop Upload -->
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
              name="resume"
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
            <p v-if="form.resumeName" class="mt-2 text-sm text-gray-700">
              Selected: {{ form.resumeName }}
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
              name="application_letter"
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
            <p v-if="form.letterName" class="mt-2 text-sm text-gray-700">
              Selected: {{ form.letterName }}
            </p>
          </div>
        </div>
      </div>

      <!-- Step 3: General Questions -->
      <div v-if="step === 3" class="space-y-6">
        <div class="p-6 border rounded-lg shadow-sm bg-white">
          <h2 class="font-semibold text-lg mb-6">General Questions</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Years of Experience -->
            <div>
              <p class="font-medium text-gray-700 mb-3">Years of experience in (X) role</p>
              <div class="space-y-2">
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    v-model="form.experience"
                    value="no experience"
                    class="text-blue-600 focus:ring-blue-500"
                  />
                  <span>no experience</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    v-model="form.experience"
                    value="<1 year"
                    class="text-blue-600 focus:ring-blue-500"
                  />
                  <span>&lt;1 year</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    v-model="form.experience"
                    value="1-2 years"
                    class="text-blue-600 focus:ring-blue-500"
                  />
                  <span>1–2 years</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    v-model="form.experience"
                    value="3-5 years"
                    class="text-blue-600 focus:ring-blue-500"
                  />
                  <span>3–5 years</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    v-model="form.experience"
                    value=">5 years"
                    class="text-blue-600 focus:ring-blue-500"
                  />
                  <span>&gt;5 years</span>
                </label>
              </div>
            </div>

            <!-- Expected Salary -->
            <div>
              <p class="font-medium text-gray-700 mb-3">Expected Salary</p>
              <div class="space-y-2">
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    v-model="form.expected_salary"
                    value="<20000"
                    class="text-blue-600 focus:ring-blue-500"
                  />
                  <span>&lt;20,000 ฿</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    v-model="form.expected_salary"
                    value="20000-40000"
                    class="text-blue-600 focus:ring-blue-500"
                  />
                  <span>20,000–40,000 ฿</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    v-model="form.expected_salary"
                    value="40000-60000"
                    class="text-blue-600 focus:ring-blue-500"
                  />
                  <span>40,000–60,000 ฿</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    v-model="form.expected_salary"
                    value="60000-80000"
                    class="text-blue-600 focus:ring-blue-500"
                  />
                  <span>60,000–80,000 ฿</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    v-model="form.expected_salary"
                    value=">80000"
                    class="text-blue-600 focus:ring-blue-500"
                  />
                  <span>&gt;80,000 ฿</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Confirmation -->
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
          @click="step++"
          class="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Next
        </button>

        <button
          type="submit"
          v-if="step === 3"
          class="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const step = ref(1)
const resumeOption = ref('upload')

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
  graduation_year: '',
  expected_salary: '',
  linkedin: '',
  website: '',
  resumeName: '',
  letterName: '',
})

const resumeInput = ref<HTMLInputElement | null>(null)
const letterInput = ref<HTMLInputElement | null>(null)

function onFileChange(event: Event, field: string) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    if (field === 'resume') form.value.resumeName = file.name
    if (field === 'application_letter') form.value.letterName = file.name
  }
}

function onDrop(event: DragEvent, field: string) {
  const file = event.dataTransfer?.files[0]
  if (file) {
    if (field === 'resume') form.value.resumeName = file.name
    if (field === 'application_letter') form.value.letterName = file.name
  }
}

function handleSubmit(e: Event) {
  const target = e.target as HTMLFormElement
  target.submit() // native form submit
}
</script>
