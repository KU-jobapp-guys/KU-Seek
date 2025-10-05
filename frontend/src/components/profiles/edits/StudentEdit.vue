<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { EducationBaseFields } from '@/configs/EditProfileConfig'
import type { EducationFieldKey } from '@/configs/EditProfileConfig'
import type { StudentProfile } from '@/types/studentType'
import { CircleUserRound, Wrench, GraduationCap, Star, X } from 'lucide-vue-next'
import { techStackColors } from '@/configs/techStackConfig'
import { ProfileStyle } from '@/configs/profileStyleConfig'

const props = defineProps<{ modelValue: StudentProfile }>()
const emit = defineEmits<{
  (e: 'update:modelValue', data: StudentProfile): void
}>()

const editForm = ref<StudentProfile>(props.modelValue)
const skillSearchQuery = ref('')
const showSkillDropdown = ref(false)

// Get all available skills from techStackColors
const availableSkills = Object.keys(techStackColors).filter(skill => skill !== 'Default')

const filteredSkills = computed(() => {
  if (!skillSearchQuery.value) return availableSkills
  return availableSkills.filter(skill => 
    skill.toLowerCase().includes(skillSearchQuery.value.toLowerCase())
  )
})

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

onMounted(() => {
  if (!editForm.value.education || editForm.value.education.length === 0) {
    addEducation()
  }
})
</script>

<template>
  <div class="text-base">

    <!-- About Section -->
    <section :class="ProfileStyle.sectionBox" class="mt-8 mb-6">
      <div class="flex items-center gap-x-4">
        <div :class="ProfileStyle.sectionIcon" class="bg-orange-500">
          <CircleUserRound class="w-full h-full" :stroke-width="1.5" />
        </div>
        <p class="text-2xl font-bold">About</p>
        <p v-if="editForm.about.trim() === ''" :class="ProfileStyle.errorText">(This field is required)</p>
      </div>

      <div :class="ProfileStyle.contentBox">
        <textarea
          v-model="editForm.about"
          rows="4"
          :class="[
            ProfileStyle.textBox,
            editForm.about.trim() === '' ? ProfileStyle.errorBox : 'focus:ring-orange-500'
          ]"
          placeholder="Tell us about yourself..."
        ></textarea>
      </div>
    </section>

    <div class="flex flex-col md:flex-row gap-x-6 gap-y-6">
      <!-- Interest Section -->
      <section :class="ProfileStyle.sectionBox" class="md:w-[60%]">
        <div class="flex items-center gap-x-4">
          <div :class="ProfileStyle.sectionIcon" class="bg-pink-500">
            <Star class="w-full h-full" :stroke-width="1.5" />
          </div>
          <p class="text-2xl font-bold">Interest</p>
          <p v-if="editForm.interests.trim() === ''" :class="ProfileStyle.errorText">(This field is required)</p>
        </div>

        <div :class="ProfileStyle.contentBox">
          <textarea
            v-model="editForm.interests"
            rows="4"
            :class="[
              ProfileStyle.textBox,
              editForm.interests.trim() === '' ? ProfileStyle.errorBox : 'focus:ring-pink-500'
            ]"
            placeholder="What are your interests?"
          ></textarea>
        </div>
      </section>

      <!-- Skill Section -->
      <section :class="ProfileStyle.sectionBox" class="flex flex-col md:w-[40%]">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-x-4">
            <div :class="ProfileStyle.sectionIcon" class="bg-purple-500">
              <Wrench class="w-full h-full" :stroke-width="1.5" />
            </div>
            <p class="text-2xl font-bold">Skills</p>
          </div>
          <p class="text-sm text-gray-500">(optional)</p>
        </div>

        <div :class="ProfileStyle.contentBox">
          <!-- Skill Dropdown -->
          <div class="relative mb-3">
            <input
              v-model="skillSearchQuery"
              @focus="showSkillDropdown = true"
              type="text"
              :class="ProfileStyle.inputBox"
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
    <section :class="ProfileStyle.sectionBox" class="mt-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-x-4">
          <div :class="ProfileStyle.sectionIcon" class="bg-blue-500">
            <GraduationCap class="w-full h-full" :stroke-width="1.5" />
          </div>
          <p class="text-2xl font-bold">Education</p>
        </div>
        <button
          @click="addEducation"
          :class="['gap-2 bg-blue-500 hover:bg-blue-600', ProfileStyle.actionButton]"
        >
          <span class="block md:hidden">+</span>
          <span class="hidden md:block">+ Add Education</span>
        </button>
      </div>

      <div
        v-for="(edu, eduIndex) in editForm.education"
        :key="eduIndex"
        :class="['relative', ProfileStyle.contentBox]"
      >
        <button
          v-if="editForm.education.length > 1" @click="removeEducation(eduIndex)"
          class="absolute top-4 right-4 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
        >
          <X class="w-4 h-4" />
        </button>

        <div class="space-y-3">
          <div v-for="field in EducationBaseFields" :key="field.key">
            <label class="text-sm font-medium text-gray-700 mb-1">
              {{ field.label }}
              <span v-if="edu[field.key as EducationFieldKey].trim() === ''" :class="ProfileStyle.errorText">
                (This field is required)
              </span>
            </label>
            <input
              v-model="edu[field.key as EducationFieldKey]" type="text"
              :class="[
                ProfileStyle.inputBox,
                edu[field.key as EducationFieldKey].trim() === '' ? ProfileStyle.errorBox : 'focus:ring-blue-500 border-gray-300'
              ]"
              :placeholder="field.placeholder"
            />
          </div>

          <div class="flex flex-col md:flex-row gap-3">
            <div class="flex-1">
              <label :class="ProfileStyle.formLabel">
                Year of study
                <span v-if="!edu.year_of_study" :class="ProfileStyle.errorText">
                  (This field is required)
                </span>
              </label>
              <input
                v-model="edu.year_of_study" type="number"
                :class="[
                  ProfileStyle.inputBox, !edu.year_of_study ? ProfileStyle.errorBox : 'focus:ring-blue-500'
                ]"
              />
            </div>
            <div class="flex-1">
              <label :class="ProfileStyle.formLabel">
                Graduate Year
                <span v-if="!edu.graduate_year || edu.graduate_year < edu.year_of_study" :class="ProfileStyle.errorText">
                  (Graduation year must be later than year of study)
                </span>
              </label>
              <input
                v-model="edu.graduate_year" type="number"
                :class="[
                  ProfileStyle.inputBox, 'focus:ring-blue-500',
                  !edu.graduate_year || edu.graduate_year < edu.year_of_study ? ProfileStyle.errorBox : ''
                ]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>