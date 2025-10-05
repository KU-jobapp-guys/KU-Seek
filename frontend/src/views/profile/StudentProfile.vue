<script setup lang="ts">
import StudentBanner from '@/components/profiles/banners/StudentBanner.vue'
import LoadingScreen from '@/components/layouts/LoadingScreen.vue'
import StudentEdit from '@/components/profiles/edits/StudentEdit.vue'
import StudentView from '@/components/profiles/views/StudentView.vue'
import { mockStudents } from '@/data/mockStudent'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import type { StudentProfile } from '@/types/studentType'
import customizeProfile from '@/assets/images/customizeProfile.png'
import { ProfileStyle } from '@/configs/profileStyleConfig'
import { Save, X } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const isEditing = ref(false)
const isOwner = ref(false)
const studentData = ref<StudentProfile | null>(null)
const editData = ref<StudentProfile | null>(null)

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

const editProfile = () => {
  if (!studentData.value) return

  editData.value = {
    ...studentData.value,
    education: studentData.value.education.map(edu => ({ ...edu })),
    skills: [...studentData.value.skills],
    bannerPhoto: studentData.value.bannerPhoto,
    profilePhoto: studentData.value.profilePhoto
  }

  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  editData.value = null
}

const educationErrors = computed(() => {
  if (!editData.value) return true
  let educations = editData.value.education
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
  if (!editData.value) return true
  if (!editData.value.about?.trim()) return true
  if (!editData.value.interests?.trim()) return true
  if (educationErrors.value) return true
  return false
})

const saveProfile = () => {
  if (!editData) return

  if (hasValidationErrors.value) {
    setTimeout(() => {
      const firstError = document.querySelector('.error-form')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
    return
  }

  studentData.value = editData.value

  // Send studentData.value to backend here
  console.log("Saving profile:", studentData.value)

  isEditing.value = false
  editData.value = null
}

const updateImage = (payload: { newFile: File, field: 'bannerPhoto' | 'profilePhoto' }) => {
  if (!editData.value) return
  
  const { newFile, field } = payload
  const previewUrl = URL.createObjectURL(newFile)
  
  editData.value = {
    ...editData.value,
    [field]: previewUrl
  }
}

onMounted(() => {
  loadStudent(route.params.id as string)
})
</script>

<template>
  <LoadingScreen v-if="isLoading" />

  <div v-if="studentData" class="px-[6vw] md:px-[12vw] py-16">
    <!-- Banner -->
    <StudentBanner
      v-if="!isEditing"
      :studentData="studentData"
      :isEditing
      @loaded="renderReady"
      @edit="editProfile"
    />

    <StudentBanner
      v-else-if="editData"
      :studentData="editData"
      :isEditing
      @loaded="renderReady"
      @edit="editProfile"
      @updateImage="updateImage"
    />

    <!-- New profile setup -->
    <section v-if="isNewProfile && !isEditing" class="w-full mt-24">
      <div v-if="isOwner" class="flex flex-col items-center justify-center gap-y-2">
        <img :src="customizeProfile" class="w-32 h-32" />
        <p class="text-2xl font-bold">Your profile isn’t set up yet</p>
        <button 
          @click="editProfile"
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
      <button @click="cancelEdit" :class="['bg-gray-400 hover:bg-gray-500', ProfileStyle.actionButton]">
        <X class="w-5 h-5" /> Cancel
      </button>
      <button @click="saveProfile" :class="['bg-green-600 hover:bg-green-700', ProfileStyle.actionButton]">
        <Save class="w-5 h-5" /> Save
      </button>
    </div>
  </div>
</template>
