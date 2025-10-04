<script setup lang="ts">
import StudentBanner from '@/components/profiles/banners/StudentBanner.vue'
import LoadingScreen from '@/components/layouts/LoadingScreen.vue'
import { mockStudents } from '@/data/mockStudent'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { StudentProfile } from '@/types/studentType'
import StudentEdit from '@/components/profiles/edits/StudentEdit.vue'
import StudentView from '@/components/profiles/views/StudentView.vue'

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const isEditing = ref(false)
const studentData = ref<StudentProfile | null>(null)
const editData = ref<StudentProfile | null>(null)

const loadStudent = (id?: string) => {
  if (!id) {
    router.replace({ name: 'not found' })
    return
  }

  studentData.value = mockStudents.find((s) => s.id === id) || null
  editData.value = studentData.value

  if (!studentData.value) {
    router.replace({ name: 'not found' })
  }
}

const renderReady = () => {
  isLoading.value = false
}

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

    <StudentView v-if="studentData && !isEditing" :studentData="studentData"/>
    <StudentEdit v-if="editData && isEditing" :studentData="editData" @cancel="cancelEdit" @save="saveProfile"/>
  </div>
</template>
