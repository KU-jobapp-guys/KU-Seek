<script setup lang="ts">
import StudentBanner from '@/components/profiles/banners/StudentBanner.vue'
import LoadingScreen from '@/components/layouts/LoadingScreen.vue'
import { mockStudents } from '@/data/mockStudent'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import type { StudentProfile } from '@/types/studentType'
import customizeProfile from '@/assets/images/customizeProfile.png'
import StudentEdit from '@/components/profiles/edits/StudentEdit.vue'
import StudentView from '@/components/profiles/views/StudentView.vue'
import { ProfileStyle } from '@/configs/profileStyleConfig'

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const isEditing = ref(false)
const isOwner = ref(false)
const studentData = ref<StudentProfile | null>(null)
const editData = ref<StudentProfile | null>(null)

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

const renderReady = () => {
  isLoading.value = false
}

const isNewProfile = computed(() => {
  const hasNoBasicInfo = studentData.value &&
                         !studentData.value.about?.trim() && 
                         !studentData.value.interests?.trim()
  return hasNoBasicInfo
})

onMounted(() => {
  loadStudent(route.params.id as string)
})

const editProfile = () => {
  if (studentData.value) {
    editData.value = {
      ...studentData.value,
      education: studentData.value.education.map(edu => ({ ...edu })),
      skills: [...studentData.value.skills]
    }
  }
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  editData.value = null
}

const saveProfile = (data: StudentProfile) => {
  studentData.value = {
    ...data,
    education: data.education.map(edu => ({
      ...edu,
    })),
    skills: [...data.skills]
  }
  
  // Send the data to backend here
  console.log("Saving profile:", studentData.value)
  
  isEditing.value = false
  editData.value = null
}
</script>

<template>
  <LoadingScreen v-if="isLoading" />

  <div v-if="studentData" class="px-[6vw] md:px-[12vw] py-16">
    <StudentBanner :studentData="studentData" @loaded="renderReady" @edit="editProfile" />

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

    <section v-else>
      <StudentView v-if="studentData && !isEditing" :studentData="studentData"/>
      <StudentEdit v-if="editData && isEditing" :studentData="editData" @cancel="cancelEdit" @save="saveProfile"/>
    </section>
  </div>
</template>
