<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Save, X } from 'lucide-vue-next'
import type { StudentProfile } from '@/types/profileType'
import { useEditableProfile } from '@/libs/profileEditing'
import { getProfileData, updateUserData, updateProfileImages } from '@/services/profileServices'
import { isOwner } from '@/libs/userUtils'
import { ProfileStyle } from '@/configs/profileStyleConfig'
import LoadingScreen from '@/components/layouts/LoadingScreen.vue'
import StudentBanner from '@/components/profiles/banners/StudentBanner.vue'
import StudentEdit from '@/components/profiles/edits/StudentEdit.vue'
import StudentView from '@/components/profiles/views/StudentView.vue'
import NoProfile from '@/components/profiles/NoProfile.vue'


const route = useRoute()
const router = useRouter()
const toast = useToast()

const isLoading = ref(true)
const isSaveDisabled = ref(false)
const studentData = ref<StudentProfile | null>(null)
const uploadImages = ref<{ profile: File | null; banner: File | null }>({
  profile: null,
  banner: null
})
const { isEditing, editData, editProfile, cancelEdit, checkProfile, saveProfile } = useEditableProfile<StudentProfile>()

async function loadStudent(id?: string) {
  if (!id) {
    router.replace({ name: 'not found' })
    return
  }
  
  const data = await getProfileData(id)
  if (data) {   
    studentData.value = data as StudentProfile
  } else {
    router.replace({ name: 'not found' })
    return
  }
  isLoading.value = false
}

const renderReady = () => {
  isLoading.value = false
}

// Check if profile has not been set up yet
const isNewProfile = computed(() => {
  const hasNoBasicInfo =
    studentData.value && !studentData.value.about?.trim()
  return hasNoBasicInfo
})

const edit = () => {
  if (studentData.value) editProfile(studentData.value)
}

const cancel = () => {
  cancelEdit()
}

const save = async () => {
  if (!checkProfile()) return

  if (uploadImages.value.profile || uploadImages.value.banner) {
    await updateProfileImages(uploadImages.value.profile, uploadImages.value.banner)
  }

  const data = editData.value

  if (!data) return

  const plainData: StudentProfile = {
    ...data,
    profilePhoto: data.profilePhoto || '',
    bannerPhoto: data.bannerPhoto || '',
    phoneNumber: data.phoneNumber || '',
    gpa: data.gpa ?? 0,
    skills: [...(data.skills || [])],
    educations: (data.educations || []).map(edu => ({ ...edu })),
  }

  const res = await updateUserData(plainData)
  
  if (res && res.ok ) {
    const resData = (await res.json()) as StudentProfile
    saveProfile(resData)

    studentData.value = { ...resData }
    toast.success('Profile updated successfully')
  } else {
    toast.error('Failed to update profile. Please try again.')
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
      v-model="studentData"
      :studentData="studentData"
      :isEditing="isEditing"
      @loaded="renderReady"
      @edit="edit"
    />
    <StudentBanner
      v-else-if="editData"
      v-model="editData"
      v-model:images="uploadImages"
      :studentData="editData"
      :isEditing="isEditing"
      @loaded="renderReady"
    />

    <!-- Content Part -->
    <template v-if="!isEditing">
      <!-- No Profile Data -->
      <NoProfile
        v-if="isNewProfile"
        :isOwner="isOwner(studentData.id)"
        @edit="edit"
      />
      <!-- Profile View -->
      <StudentView v-else :studentData="studentData" />
    </template>

    <!-- Edit Mode -->
    <StudentEdit v-else-if="editData" v-model="editData" />

    <!-- Save/Cancel Buttons -->
    <div v-if="isEditing" class="flex justify-end gap-3 my-8">
      <button @click="cancel" :class="['bg-gray-400 hover:bg-gray-500', ProfileStyle.actionButton]">
        <X class="w-5 h-5" /> Cancel
      </button>
      <button @click="save" :disabled="isSaveDisabled" :class="['bg-green-600 hover:bg-green-700', ProfileStyle.actionButton]">
        <Save class="w-5 h-5" /> Save
      </button>
    </div>
  </div>
</template>
