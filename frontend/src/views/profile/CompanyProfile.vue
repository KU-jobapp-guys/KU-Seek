<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Save, X } from 'lucide-vue-next'
import type { Job } from '@/types/jobType'
import type { CompanyProfile } from '@/types/profileType'
import { useEditableProfile } from '@/libs/profileEditing'
import { getProfileData, updateProfileData } from '@/services/profileServices'
import { isOwner } from '@/libs/userUtils'
import { ProfileStyle } from '@/configs/profileStyleConfig'
import { mockJobs } from '@/data/mockJobs'
import LoadingScreen from '@/components/layouts/LoadingScreen.vue'
import CompanyEdit from '@/components/profiles/edits/CompanyEdit.vue'
import CompanyView from '@/components/profiles/views/CompanyView.vue'
import CompanyBanner from '@/components/profiles/banners/CompanyBanner.vue'
import CompanyJob from '@/components/profiles/CompanyJob.vue'
import NoProfile from '@/components/profiles/NoProfile.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const isLoading = ref(true)
const companyData = ref<CompanyProfile | null>(null)
const companyJobs = ref<Job[]>([])

const { isEditing, editData, editProfile, cancelEdit, checkProfile, saveProfile } =
  useEditableProfile<CompanyProfile>()

async function loadCompany(id?: string) {
  if (!id) {
    router.replace({ name: 'not found' })
    return
  }

  const data = await getProfileData(id)
  
  if (data) {   
    companyData.value = data as CompanyProfile
  } else {
    router.replace({ name: 'not found' })
    return
  }
  companyJobs.value = mockJobs.filter((j) => j.company === companyData.value?.name)
}

const isNewProfile = computed(() => {
  const hasNoBasicInfo = companyData.value && !companyData.value.about?.trim()
  return hasNoBasicInfo
})

const edit = () => {
  if (companyData.value) editProfile(companyData.value)
}

const cancel = () => {
  cancelEdit()
}

const save = async () => {
  if (!checkProfile()) return

  const data = editData.value

  if (!data) return

  const plainData: CompanyProfile = {
    ...data,
    profilePhoto: data.profilePhoto || '',
    bannerPhoto: data.bannerPhoto || '',
  }

  const resData = await updateProfileData(plainData)
  
  if (resData) {
    saveProfile(resData)
    toast.success('Profile updated successfully')
  } else {
    toast.error('Failed to update profile. Please try again.')
  }
}

const renderReady = () => {
  isLoading.value = false
}

onMounted(() => {
  loadCompany(route.params.id as string)
  window.scrollTo({ top: 0 })
})

const tabList = ['Overview', 'Job']
const activeTab = ref('Overview')
const showAllJobs = ref(false)

const switchTab = (tab: string) => {
  activeTab.value = tab
  if (tab === 'Overview') {
    showAllJobs.value = false
  }
}

const toggleJobsView = () => {
  showAllJobs.value = !showAllJobs.value
}

const displayedJobs = computed(() => {
  if (showAllJobs.value) {
    return companyJobs.value
  }
  return companyJobs.value.slice(0, 3)
})
</script>

<template>
  <LoadingScreen v-if="isLoading" />

  <div v-if="companyData" class="px-[6vw] md:px-[12vw] py-16">
    <CompanyBanner
      v-if="!isEditing"
      v-model="companyData"
      :companyData="companyData"
      @loaded="renderReady"
      @edit="edit"
      :isEditing
    />
    <CompanyBanner
      v-else-if="editData"
      v-model="editData"
      :companyData="editData"
      @loaded="renderReady"
      :isEditing
    />

    <!-- No Profile Data -->
    <NoProfile
      v-if="isNewProfile && !isEditing"
      :isEditing="isEditing"
      :isOwner="isOwner(companyData.id)"
      @edit="edit"
    />

    <!-- Content Part -->
    <section v-else class="data mt-8">
      <div
        :class="[
          'bg-gradient-to-b from-blue-800/10 to-white rounded-xl ring-1 ring-[#B1B1B1] ring-inset w-[100%] p-8 md:p-12',
          isEditing ? 'from-gray-800/10' : 'from-blue-800/10',
        ]"
      >
        <!-- Switch Tab Button IS HEREEEEE -->
        <div class="p-2 py-4 md:pl-8 flex w-full max-w-[500px] items-center gap-x-8">
          <button
            v-for="tab in tabList"
            :key="tab"
            @click="switchTab(tab)"
            :class="[
              'text-base md:text-lg max-sm:block sm:inline-block transition-colors duration-200',
              activeTab === tab ? 'text-black font-black' : 'text-gray-600 hover:text-gray-900',
            ]"
          >
            {{ tab }}
          </button>
        </div>

        <div class="w-full h-1 bg-gray-400"></div>

        <!-- Tab Content -->
        <div class="py-4 md:py-8">
          <!-- Overview Tab Content -->
          <div v-if="activeTab === 'Overview'" class="space-y-6">
            <CompanyView v-if="!isEditing" :companyData="companyData" />
            <CompanyEdit v-else-if="editData" v-model="editData" />
          </div>

          <!-- Jobs Tab Content -->
          <div v-else-if="activeTab === 'Job'" class="relative text-base">
            <div v-if="displayedJobs.length > 0">
              <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                <CompanyJob v-for="job in displayedJobs" :key="job.jobId" :job="job" />
              </div>

              <!-- Expand Job Toggle -->
              <div v-if="companyJobs.length > 3" class="flex justify-between items-center mt-6">
                <div class="inline-flex overflow-hidden rounded-full text-white">
                  <div class="px-6 py-2 bg-red-500">{{ companyJobs.length }} Jobs</div>
                </div>

                <button
                  @click="toggleJobsView"
                  class="text-[#686868] font-medium hover:text-[#8e8e8e] transition-colors duration-200 flex items-center gap-1"
                >
                  {{ showAllJobs ? 'View Less -' : `View More +` }}
                </button>
              </div>
            </div>

            <div
              v-else
              class="flex flex-col w-full h-[320px] items-center justify-center bg-white ring-1 ring-[#B1B1B1] ring-inset p-12 rounded-xl shadow-md"
            >
              <img src="@/assets/images/zeroJob.png" class="h-24 w-24" />
              <p class="font-bold mt-4">No positions are open at the moment.</p>
              <p>Stay tuned for future opportunities!</p>
            </div>
          </div>
        </div>
      </div>
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
