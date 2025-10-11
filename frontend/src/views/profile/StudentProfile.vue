<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Save, X } from 'lucide-vue-next'
import type { StudentProfile } from '@/types/profileType'
import { useEditableProfile } from '@/libs/profileEditing'
import { isOwner } from '@/libs/userUtil'
import { ProfileStyle } from '@/configs/profileStyleConfig'
import { mockStudents } from '@/data/mockStudent'
import LoadingScreen from '@/components/layouts/LoadingScreen.vue'
import StudentBanner from '@/components/profiles/banners/StudentBanner.vue'
import StudentEdit from '@/components/profiles/edits/StudentEdit.vue'
import StudentView from '@/components/profiles/views/StudentView.vue'
import NoProfile from '@/components/profiles/NoProfile.vue'
import LoadingScreen from '@/components/layouts/LoadingScreen.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { StudentProfile } from '@/types/studentType'
import { CircleUserRound, Wrench, GraduationCap, Star } from 'lucide-vue-next'
import { techStackColors } from '@/configs/techStackConfig'

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const studentData = ref<StudentProfile | null>(null)
const { isEditing, editData, editProfile, cancelEdit, saveProfile } =
  useEditableProfile<StudentProfile>()

// Load student from mock data (replace with API in production)
const loadStudent = (id?: string) => {
async function getProfileData(user_id: string) {
  try {
    const res = await fetch(`http://localhost:8000/api/v1/users/${user_id}/profile`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'access_token': localStorage.getItem('user_jwt') || ''
      },
    })
    return res
  }
  catch (error) {
    console.error('Fetching profile error:', error)
    return null
  }
}

async function loadStudent(id?: string) {
  if (!id) {
    router.replace({ name: 'not found' })
    return
  }
  
  const res = await getProfileData(id)
  
  if (res && res.ok) {   
    const data = await res.json() 
    studentData.value = data
  } else {
    console.error('Failed to load profile:', res?.status)
    router.replace({ name: 'not found' })
    return
  }
  
  if (!studentData.value) {
    router.replace({ name: 'not found' })
  }
}

const renderReady = () => {
  isLoading.value = false
}

// Check if profile has not been set up yet
const isNewProfile = computed(() => {
  const hasNoBasicInfo =
    studentData.value && !studentData.value.about?.trim() && !studentData.value.interests?.trim()
  return hasNoBasicInfo
})

const edit = () => {
  if (studentData.value) editProfile(studentData.value)
}

const cancel = () => {
  cancelEdit()
}
const save = () => {
  saveProfile(studentData)
}

onMounted(() => {
  loadStudent(route.params.id as string)
  console.log(route.params.id)
})
</script>

<template>
  <LoadingScreen v-if="isLoading" />

  <div v-if="studentData" class="px-[6vw] md:px-[12vw] py-16">
    <!-- Banner -->
    <StudentBanner
      v-if="!isEditing"
      v-model="studentData"
      :studentData="studentData"
      :isEditing="isEditing"
      @loaded="renderReady"
      @edit="edit"
    />
    <StudentBanner
      v-else-if="editData"
      v-model="editData"
      :studentData="editData"
      :isEditing="isEditing"
      @loaded="renderReady"
    />

    <!-- No Profile Data -->
    <NoProfile
      v-if="isNewProfile && !isEditing"
      :isEditing="isEditing"
      :isOwner="isOwner(studentData.id)"
      @edit="edit"
    />

    <!-- Profile view/edit -->
    <section v-else>
      <StudentView v-if="studentData && !isEditing" :studentData="studentData" />
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
