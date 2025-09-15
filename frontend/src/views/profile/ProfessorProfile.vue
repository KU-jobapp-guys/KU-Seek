<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ProfessorProfile } from '@/types/professorType'
import LoadingScreen from '@/components/layouts/LoadingScreen.vue'
import { mockProfessor } from '@/data/mockProfessor'
import ProfessorBanner from '@/components/profiles/banners/ProfessorBanner.vue'

const route = useRoute()
const router = useRouter()

const isLoading = ref(false)
const professorData = ref<ProfessorProfile | null>(null)

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

onMounted(() => {
  loadProfessor(route.params.id as string)
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
</script>

<template>
  <LoadingScreen v-if="isLoading" />

  <div v-if="professorData" class="px-[8vw] md:px-[12vw] py-16">
    <ProfessorBanner :professorData="professorData" @loaded="renderReady" />

    <!-- Content Part -->
    <section class="data mt-8">
      <div class="bg-gradient-to-b from-orange-800/10 to-white rounded-[20px] ring-1 ring-[#B1B1B1] ring-inset w-[100%] p-8">
        <!-- Switch Tab Button IS HEREEEEE -->
        <div class="flex">
          <button
            v-for="tab in tabList"
            :key="tab"
            @click="switchTab(tab)"
            :class="[
              'px-6 py-4 text-xl rounded-t-[20px] transition-colors duration-200',
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
            <div
              class="bg-white flex flex-col ring-1 ring-[#B1B1B1] ring-inset p-12 gap-y-4 rounded-xl shadow-md"
            >

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
