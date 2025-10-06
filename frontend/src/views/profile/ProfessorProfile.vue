<script setup lang="ts">
import { ref, onMounted, computed, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Save, X } from 'lucide-vue-next'
import type { ProfessorProfile } from '@/types/profileType'
import { useEditableProfile } from '@/libs/profileEditing'
import { mockProfessor } from '@/data/mockProfessor'
import { mockCompany } from '@/data/mockCompany'
import LoadingScreen from '@/components/layouts/LoadingScreen.vue'
import ProfessorBanner from '@/components/profiles/banners/ProfessorBanner.vue'
import ProfessorView from '@/components/profiles/views/ProfessorView.vue'
import ProfessorEdit from '@/components/profiles/edits/ProfessorEdit.vue'
import ConnectCompany from '@/components/profiles/ConnectCompany.vue'
import { ProfileStyle } from '@/configs/profileStyleConfig'

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const professorData = ref<ProfessorProfile | null>(null)
const { isEditing, editData, editProfile, cancelEdit, saveProfile } = useEditableProfile<ProfessorProfile>()

const loadProfessor = (id?: string) => {
  if (!id) {
    router.replace({ name: 'not found' })
    return
  }

  professorData.value = mockProfessor.find((c) => c.id === id) || null

  if (!professorData.value) {
    router.replace({ name: 'not found' })
  }
}

const renderReady = () => {
  isLoading.value = false
}

const hasValidationErrors = computed(() => {
  if (!editData.value) return true
  if (!editData.value.about?.trim()) return true
  if (!editData.value.department?.trim()) return true
  if (!editData.value.position?.trim()) return true
  if (!editData.value.office_location?.trim()) return true
  if (!editData.value.research_interest?.trim()) return true
  return false
})

const edit = () => {
  if (professorData.value) editProfile(professorData.value)
}

const cancel = () => {cancelEdit()}
const save = () => {saveProfile(professorData, hasValidationErrors.value)}

onMounted(() => {
  loadProfessor(route.params.id as string)
})

const tabList = ['Overview', 'Connection']
const activeTab = ref('Overview')

const switchTab = (tab: string) => {
  activeTab.value = tab
}
</script>

<template>
  <LoadingScreen v-if="isLoading" />

  <div v-if="professorData" class="px-[6vw] md:px-[12vw] py-16">
    <ProfessorBanner v-if="!isEditing" v-model="professorData" :professorData="professorData" @loaded="renderReady" @edit="edit" :isEditing />
    <ProfessorBanner v-else-if="editData" v-model="editData" :professorData="editData" @loaded="renderReady" :isEditing />

    <!-- Content Part -->
    <section class="data mt-8">
      <div
        :class="[
          'bg-gradient-to-b to-white rounded-xl ring-1 ring-[#B1B1B1] ring-inset w-[100%] p-8 md:p-12',
          isEditing ? 'from-gray-800/10' : 'from-orange-800/10' 
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
        <div class="py-8">
          <!-- Overview Tab Content -->
          <div v-if="activeTab === 'Overview'" class="space-y-6">
            <ProfessorView v-if="!isEditing" :professorData="professorData" />
            <ProfessorEdit v-else-if="editData" v-model="editData" />
          </div>

          <!-- Connection Tab -->
          <div v-if="activeTab === 'Connection'" class="space-y-4">
            <div v-for="c in mockCompany" v-bind:key="c.id">
              <ConnectCompany :company="c" />
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
