<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Save, X } from 'lucide-vue-next'
import customizeProfile from '@/assets/images/customizeProfile.png'
import type { StudentProfile } from '@/types/profileType'
import { useEditableProfile } from '@/libs/profileEditing'
import { ProfileStyle } from '@/configs/profileStyleConfig'
import { mockStudents } from '@/data/mockStudent'
import LoadingScreen from '@/components/layouts/LoadingScreen.vue'
import StudentBanner from '@/components/profiles/banners/StudentBanner.vue'
import StudentEdit from '@/components/profiles/edits/StudentEdit.vue'
import StudentView from '@/components/profiles/views/StudentView.vue'

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const isOwner = ref(false)
const studentData = ref<StudentProfile | null>(null)
const { isEditing, editData, editProfile, cancelEdit, saveProfile } = useEditableProfile<StudentProfile>()

// Load student from mock data (replace with API in production)
const loadStudent = (id?: string) => {
  if (!id) {
    router.replace({ name: 'not found' })
    return
  }

  studentData.value = mockStudents.find((s) => s.id === id) || null
  isOwner.value = studentData.value?.id === '1'

  if (!studentData.value) {
    router.replace({ name: 'not found' })
  }
}

// Called when all child components are loaded
const renderReady = () => {
  isLoading.value = false
}

// Check if profile has not been set up yet
const isNewProfile = computed(() => {
  const hasNoBasicInfo = studentData.value &&
                         !studentData.value.about?.trim() &&
                         !studentData.value.interests?.trim()
  return hasNoBasicInfo
})

const educationErrors = computed(() => {
  if (!editData.value) return true
  const educations = editData.value.education
  for (let index = 0; index < educations.length; index++) {
    const edu = educations[index];
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
  if (!editData.value) return true
  if (!editData.value.about?.trim()) return true
  if (!editData.value.interests?.trim()) return true
  if (educationErrors.value) return true
  return false
})

const edit = () => {
  if (studentData.value) editProfile(studentData.value)
}

const cancel = () => {cancelEdit()}
const save = () => {saveProfile(studentData, hasValidationErrors.value)}


onMounted(() => {
  loadStudent(route.params.id as string)
})
</script>

<template>
  <LoadingScreen v-if="isLoading" />


  <div v-if="studentData" class="px-[6vw] md:px-[12vw] py-16">

    <!-- Banner -->
    <StudentBanner v-if="!isEditing" v-model="studentData" :studentData="studentData" :isEditing="isEditing" @loaded="renderReady" @edit="edit" />
    <StudentBanner v-else-if="editData" v-model="editData" :studentData="editData" :isEditing="isEditing" @loaded="renderReady" />

    <!-- New profile setup -->
    <section v-if="isNewProfile && !isEditing" class="w-full mt-24">
      <div v-if="isOwner" class="flex flex-col items-center justify-center gap-y-2">
        <img :src="customizeProfile" class="w-32 h-32" />
        <p class="text-2xl font-bold">Your profile isn’t set up yet</p>
        <button 
          @click="edit"
          class="text-white px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
        >
          Create your profile
        </button>
      </div>
      <div v-else class="flex flex-col items-center justify-center gap-y-2">
        <p class="text-2xl font-bold text-gray-500">This user hasn’t set up their profile yet.</p>
      </div>
    </section>

    <!-- Profile view/edit -->
    <section v-else>
      <StudentView v-if="studentData && !isEditing" :studentData="studentData"/>
      <StudentEdit
        v-if="editData && isEditing"
        v-model="editData"
        @cancel="cancelEdit"
        @save="saveProfile"
      />
    </section>

    <!-- Save/Cancel Buttons -->
    <div v-if="isEditing" class="flex justify-end gap-3 my-8">
      <button @click="cancel" :class="['bg-gray-400 hover:bg-gray-500', ProfileStyle.actionButton]">
        <X class="w-5 h-5" /> Cancel
      </button>
      <button @click="save" :class="['bg-green-600 hover:bg-green-700', ProfileStyle.actionButton]">
        <Save class="w-5 h-5" /> Save
      </button>
    </div>
  </div>
</template>
