<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Company } from '@/types/companyType'
import { mockCompany } from '@/data/mockCompany'
import CompanyBanner from '@/components/profiles/banners/CompanyBanner.vue'
import CompanyJob from '@/components/profiles/CompanyJob.vue'
import { mockJobs } from '@/data/mockJobs'
import type { Job } from '@/types/jobType'
import { Building2Icon } from 'lucide-vue-next'
import LoadingScreen from '@/components/layouts/LoadingScreen.vue'

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const companyData = ref<Company | null>(null)
const companyJobs = ref<Job[]>([])

const loadCompany = (id?: string) => {
  if (!id) {
    router.replace({ name: 'not found' })
    return
  }

  companyData.value = mockCompany.find((c) => c.id === id) || null

  if (!companyData.value) {
    router.replace({ name: 'not found' })
  }

  companyJobs.value = mockJobs.filter((j) => j.company === companyData.value?.name)
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

  <div v-if="companyData" class="px-[8vw] md:px-[12vw] py-16">
    <CompanyBanner :companyData="companyData" @loaded="renderReady" />

    <!-- Content Part -->
    <section class="data mt-8">
      <div
        class="bg-gradient-to-b from-blue-800/10 to-white rounded-xl ring-1 ring-[#B1B1B1] ring-inset w-[100%] p-8 md:p-12"
      >
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
        <div class="py-4 md:py-8">
          <!-- Overview Tab Content -->
          <div v-if="activeTab === 'Overview'" class="space-y-6">
            <div
              class="text-base bg-white flex flex-col ring-1 ring-[#B1B1B1] ring-inset p-8 md:p-12 gap-y-4 rounded-xl shadow-md"
            >
              <div class="flex items-center gap-x-2">
                <div
                  class="w-12 h-12 shrink-0 flex items-center justify-center bg-orange-500 rounded-full text-white"
                >
                  <Building2Icon />
                </div>
                <h2 class="font-bold text-2xl">Company Overview</h2>
              </div>

              <div class="flex flex-col md:pl-4 gap-y-1">
                <p>
                  <span class="font-medium block md:inline">Website: </span>
                  <a :href="companyData.website.url" class="underline">{{
                    companyData.website.name
                  }}</a>
                </p>
                <p><span class="font-medium block md:inline">Industry: </span> {{ companyData.industry }}</p>
                <p>
                  <span class="font-medium block md:inline">Specialities: </span>
                  {{ companyData.workFields.join(', ') }}
                </p>
                <p><span class="font-medium">Company Size:</span> {{ companyData.size }}</p>
                <p>
                  <span class="font-medium block md:inline">Primary Location:</span> {{ companyData.fullLocation }}
                </p>
              </div>

              <p>{{ companyData.about }}</p>
            </div>
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
  </div>
</template>
