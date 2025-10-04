<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ProfessorProfile } from '@/types/professorType'
import LoadingScreen from '@/components/layouts/LoadingScreen.vue'
import { mockProfessor } from '@/data/mockProfessor'
import ProfessorBanner from '@/components/profiles/banners/ProfessorBanner.vue'
import { mockCompany } from '@/data/mockCompany'
import ConnectCompany from '@/components/profiles/ConnectCompany.vue'
import { Building2Icon } from 'lucide-vue-next'

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

const tabList = ['Overview', 'Connection']
const activeTab = ref('Overview')

const switchTab = (tab: string) => {
  activeTab.value = tab
}
</script>

<template>
  <LoadingScreen v-if="isLoading" />

  <div v-if="professorData" class="px-[6vw] md:px-[12vw] py-16">
    <ProfessorBanner :professorData="professorData" @loaded="renderReady" />

    <!-- Content Part -->
    <section class="data mt-8">
      <div
        class="bg-gradient-to-b from-orange-800/10 to-white rounded-xl ring-1 ring-[#B1B1B1] ring-inset w-[100%] p-8 md:p-12"
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
            <div
              class="bg-white flex flex-col ring-1 ring-[#B1B1B1] ring-inset p-8 md:p-12  gap-y-4 rounded-xl shadow-md"
            >
              <div class="flex items-center gap-x-2">
                <div
                  class="w-12 h-12 flex items-center justify-center bg-green-600 rounded-full text-white"
                >
                  <Building2Icon />
                </div>
                <h2 class="font-bold text-2xl">Overview</h2>
              </div>

              <div class="flex flex-col md:pl-4 gap-y-1">
                <p><span class="font-medium block md:inline">Department: </span> {{ professorData.department }}</p>
                <p>
                  <span class="font-medium block md:inline">Academic Position: </span> {{ professorData.position }}
                </p>
                <p>
                  <span class="font-medium block md:inline">Office Location:</span>
                  {{ professorData.office_location }}
                </p>
                <p>
                  <span class="font-medium block md:inline">Research Interest:</span>
                  {{ professorData.research_interest }}
                </p>
              </div>

              <p>{{ professorData.about }}</p>
            </div>
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
  </div>
</template>
