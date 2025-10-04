<script setup lang="ts">
import { ref, computed } from 'vue'
import type { StudentProfile } from '@/types/studentType'
import { CircleUserRound, Wrench, GraduationCap, Star, Save, X } from 'lucide-vue-next'
import { techStackColors } from '@/configs/techStackConfig'

const props = defineProps<{ studentData: StudentProfile }>()
const { studentData } = props

const educationBaseConfig = [
  { key: 'curriculum_name', label: 'Curriculum Name', placeholder: 'e.g., Bachelor of Science' },
  { key: 'major', label: 'Major', placeholder: 'e.g., Computer Science' },
  { key: 'university', label: 'University', placeholder: 'e.g., University Name' }
]

type EducationFieldKey = 'curriculum_name' | 'major' | 'university'

const editForm = ref<StudentProfile>(studentData)
const skillSearchQuery = ref('')
const showSkillDropdown = ref(false)

const emit = defineEmits<{
  (e: 'save', data: StudentProfile): void
  (e: 'cancel'): void
}>()

// Get all available skills from techStackColors
const availableSkills = Object.keys(techStackColors).filter(skill => skill !== 'Default')

const filteredSkills = computed(() => {
  if (!skillSearchQuery.value) return availableSkills
  return availableSkills.filter(skill => 
    skill.toLowerCase().includes(skillSearchQuery.value.toLowerCase())
  )
})

const educationErrors = computed(() => {
  let educations = editForm.value.education
  for (let index = 0; index < educations.length; index++) {
    let edu = educations[index];
    if (
      !edu.curriculum_name?.trim() ||
      !edu.major?.trim() ||
      !edu.university?.trim() ||
      !edu.graduate_year ||
      !edu.year_of_study ||
      edu.graduate_year < edu.year_of_study
    ) return true
  }
  return false
})

const hasValidationErrors = computed(() => {
  // Check if all required field has been filled
  if (!editForm.value.about?.trim()) return true
  if (!editForm.value.interests?.trim()) return true
  if (educationErrors.value) return true
  return false
})

const profileStyle = {
  sectionBox:
    'bg-gradient-to-b from-gray-800/10 to-white py-8 px-8 md:px-12 rounded-xl w-full ring-1 ring-[#B1B1B1] ring-inset shadow-md',
  sectionIcon: 'w-12 h-12 p-2 flex items-center justify-center rounded-full text-white',
  contentBox: 'bg-white mt-4 px-4 py-6 w-full border border-gray-400 rounded-md shadow-md',
}

const cancelEdit = () => {
  skillSearchQuery.value = ''
  showSkillDropdown.value = false
  emit('cancel')
}

const saveProfile = () => {
  if (hasValidationErrors.value) {
    // Scroll to first error
    setTimeout(() => {
      const firstError = document.querySelector('.error-form')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
    return
  }
  emit('save', editForm.value)
}

const addEducation = () => {
  editForm.value.education.push({
    curriculum_name: '',
    major: '',
    university: '',
    year_of_study: 1900,
    graduate_year: 1900,
  })
}

const removeEducation = (index: number) => {
  if (editForm.value.education.length > 1) {
    editForm.value.education.splice(index, 1)
  }
}

const addSkill = (skill: string) => {
  if (!editForm.value.skills.includes(skill)) {
    editForm.value.skills.push(skill)
  }
  skillSearchQuery.value = ''
  showSkillDropdown.value = false
}

const removeSkill = (index: number) => {
  editForm.value.skills.splice(index, 1)
}
</script>

<template>
  <div class="text-base">
    <!-- About Section -->
    <section :class="profileStyle.sectionBox" class="mt-8 mb-6">
      <div class="flex items-center gap-x-4">
        <div :class="profileStyle.sectionIcon" class="bg-orange-500">
          <CircleUserRound class="w-full h-full" :stroke-width="1.5" />
        </div>
        <p class="text-2xl font-bold">About</p>
        <p v-if="editForm.about.trim() === ''" class="error-form text-sm text-red-500">(This field is required)</p>
      </div>

      <div :class="profileStyle.contentBox">
        <textarea
          v-model="editForm.about"
          rows="4"
          :class="[
            'w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2',
            editForm.about.trim() === '' ? 'focus:ring-red-500 focus:border-0 border-red-500' : 'focus:ring-orange-500'
          ]"
          placeholder="Tell us about yourself..."
        ></textarea>
      </div>
    </section>

    <div class="flex flex-col md:flex-row gap-x-6 gap-y-6">
      <!-- Interest Section -->
      <section :class="profileStyle.sectionBox" class="md:w-[60%]">
        <div class="flex items-center gap-x-4">
          <div :class="profileStyle.sectionIcon" class="bg-pink-500">
            <Star class="w-full h-full" :stroke-width="1.5" />
          </div>
          <p class="text-2xl font-bold">Interest</p>
          <p v-if="editForm.interests.trim() === ''" class="text-sm text-red-500 error-form">(This field is required)</p>
        </div>

        <div :class="profileStyle.contentBox">
          <textarea
            v-model="editForm.interests"
            rows="4"
            :class="[
              'w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2',
              editForm.interests.trim() === '' ? 'focus:ring-red-500 focus:border-0 border-red-500' : 'focus:ring-pink-500'
            ]"
            placeholder="What are your interests?"
          ></textarea>
        </div>
      </section>

      <!-- Skill Section -->
      <section :class="profileStyle.sectionBox" class="flex flex-col md:w-[40%]">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-x-4">
            <div :class="profileStyle.sectionIcon" class="bg-purple-500">
              <Wrench class="w-full h-full" :stroke-width="1.5" />
            </div>
            <p class="text-2xl font-bold">Skills</p>
          </div>
          <p class="text-sm text-gray-500">(optional)</p>
        </div>

        <div :class="profileStyle.contentBox">
          <!-- Skill Dropdown -->
          <div class="relative mb-3">
            <input
              v-model="skillSearchQuery"
              @focus="showSkillDropdown = true"
              type="text"
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Search and add skills..."
            />
            <div
              v-if="showSkillDropdown && filteredSkills.length > 0"
              class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto"
            >
              <button
                v-for="skill in filteredSkills"
                :key="skill"
                @click="addSkill(skill)"
                class="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                :class="editForm.skills.includes(skill) ? 'bg-gray-50 text-gray-400' : ''"
                :disabled="editForm.skills.includes(skill)"
              >
                {{ skill }}
              </button>
            </div>
          </div>

          <!-- Selected Skills -->
          <div class="flex flex-wrap gap-2">
            <div
              v-for="(skill, index) in editForm.skills"
              :key="index"
              class="flex items-center gap-2 px-4 py-1 rounded-3xl"
              :class="`${techStackColors[skill] || techStackColors.Default}`"
            >
              <span>{{ skill }}</span>
              <button
                @click="removeSkill(index)"
                class="hover:bg-black/10 rounded-full p-0.5 transition-colors"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Education Section -->
    <section :class="profileStyle.sectionBox" class="mt-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-x-4">
          <div :class="profileStyle.sectionIcon" class="bg-blue-500">
            <GraduationCap class="w-full h-full" :stroke-width="1.5" />
          </div>
          <p class="text-2xl font-bold">Education</p>
        </div>
        <button
          @click="addEducation"
          class="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <span class="block md:hidden">+</span>
          <span class="hidden md:block">+ Add Education</span>
        </button>
      </div>

      <div
        v-for="(edu, eduIndex) in editForm.education"
        :key="eduIndex"
        :class="profileStyle.contentBox"
        class="relative"
      >
        <button
          v-if="editForm.education.length > 1"
          @click="removeEducation(eduIndex)"
          class="absolute top-4 right-4 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
        >
          <X class="w-4 h-4" />
        </button>

        <div class="space-y-3">
          <div
            v-for="field in educationBaseConfig"
            :key="field.key"
          >
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ field.label }}
              <span v-if="edu[field.key as EducationFieldKey].trim() === ''" class="error-form text-sm text-red-500">
                (This field is required)
              </span>
            </label>
            <input
              v-model="edu[field.key as EducationFieldKey]"
              type="text"
              :class="[
                'w-full p-2 border rounded-md focus:outline-none focus:ring-2',
                edu[field.key as EducationFieldKey].trim() === ''
                  ? 'focus:ring-red-500 focus:border-0 border-red-500' 
                  : 'focus:ring-blue-500 border-gray-300'
              ]"
              :placeholder="field.placeholder"
            />
          </div>

          <div class="flex flex-col md:flex-row gap-3">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Year of study
                <span v-if="!edu.year_of_study" class="error-form text-sm text-red-500">
                  (This field is required)
                </span>
              </label>
              <input
                v-model="edu.year_of_study"
                type="number"
                :class="[
                  'w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2',
                  !edu.year_of_study ? 'border-red-500 focus:ring-red-500 focus:border-0' : 'focus:ring-blue-500'
                ]"
              />
            </div>
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Graduate Year
                <span v-if="!edu.graduate_year || edu.graduate_year < edu.year_of_study" class="error-form text-sm text-red-500">
                  (Graduation year must be later than year of study)
                </span>
              </label>
              <input
                v-model="edu.graduate_year"
                type="number"
                :class="[
                  'w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2',
                  !edu.graduate_year || edu.graduate_year < edu.year_of_study ? 'border-red-500 focus:ring-red-500 focus:border-0' : 'focus:ring-blue-500'
                ]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Save/Cancel Buttons -->
    <div class="flex justify-end gap-3 my-8">
      <button
        @click="cancelEdit"
        class="flex items-center gap-2 px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-colors"
      >
        <X class="w-5 h-5" />
        Cancel
      </button>
      <button
        @click="saveProfile"
        class="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
      >
        <Save class="w-5 h-5" />
        Save
      </button>
    </div>
  </div>
</template>