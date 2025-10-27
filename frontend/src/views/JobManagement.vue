<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mockJobs } from '@/data/mockJobs'
import { mockJobApplications } from '@/data/mockApplicants'
import type { Job } from '@/types/jobType'
import type { JobApplication } from '@/types/applicationType'
import {
  MapPin,
  Banknote,
  BriefcaseBusiness,
  Users,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-vue-next'
import DashboardStatCard from '@/components/dashboards/StatCards/StatCard.vue'
import ApplicantCard from '@/components/dashboards/ApplicantCard.vue'

const route = useRoute()
const router = useRouter()

const jobDetail = ref<Job>()
const applicantsList = ref<JobApplication[]>([])
const statusFilter = ref<'all' | 'pending' | 'approved' | 'rejected'>('all')
const pendingChanges = ref<Map<number, 'pending' | 'approved' | 'rejected'>>(new Map())

// Statistics computed properties
const stats = computed(() => {
  const total = applicantsList.value.length
  const pending = applicantsList.value.filter((a) => {
    const currentStatus = pendingChanges.value.get(a.id) || a.status
    return currentStatus === 'pending'
  }).length
  const approved = applicantsList.value.filter((a) => {
    const currentStatus = pendingChanges.value.get(a.id) || a.status
    return currentStatus === 'approved'
  }).length
  const rejected = applicantsList.value.filter((a) => {
    const currentStatus = pendingChanges.value.get(a.id) || a.status
    return currentStatus === 'rejected'
  }).length

  return { total, pending, approved, rejected }
})

const filteredApplicants = computed(() => {
  if (statusFilter.value === 'all') {
    return applicantsList.value
  }
  return applicantsList.value.filter((a) => {
    const currentStatus = pendingChanges.value.get(a.id) || a.status
    return currentStatus === statusFilter.value
  })
})

const hasChanges = computed(() => pendingChanges.value.size > 0)

async function loadJob(id?: string) {
  if (!id) {
    router.replace({ name: 'not found' })
    return
  }
  jobDetail.value = mockJobs.find((j) => j.jobId === id)
  applicantsList.value = mockJobApplications.filter((a) => a.job_id === id)
  if (!jobDetail.value) {
    router.replace({ name: 'not found' })
  }
}

async function loadApplicants(id?: string) {
  if (!id) {
    router.replace({ name: 'not found' })
    return
  }
  applicantsList.value = mockJobApplications.filter((a) => a.job_id === id)
}

function updateStatus(applicationId: number, newStatus: 'pending' | 'approved' | 'rejected') {
  pendingChanges.value.set(applicationId, newStatus)
}

function setStatusFilter(status: 'all' | 'pending' | 'approved' | 'rejected') {
  statusFilter.value = status
}

async function saveChanges() {
  for (const [id, status] of pendingChanges.value.entries()) {
    const application = applicantsList.value.find((a) => a.id === id)
    if (application) {
      application.status = status
      console.log(`Saved application ${id} with status ${status}`)
    }
  }

  pendingChanges.value.clear()
}

function cancelChanges() {
  pendingChanges.value.clear()
}

function viewProfile(studentId: number) {
  router.push(`/student/profile/${studentId}`)
}

function viewLetter(applicationId: number) {
  const application = applicantsList.value.find((a) => a.id === applicationId)
  if (application?.letter_of_application) {
    // You can implement a modal or navigate to a separate page
    alert(application.letter_of_application)
  }
}

onMounted(() => {
  const jobId = route.params.id as string
  loadJob(jobId)
  loadApplicants(jobId)
  window.scrollTo({ top: 0 })
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Job Detail Section -->
    <section v-if="jobDetail" class="bg-gray-100 shadow-sm border-b px-[8vw] md:px-[12vw]">
      <div class="w-full mx-auto py-8">
        <div>
          <button
            @click="router.back()"
            class="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ jobDetail.role }}</h1>

          <div class="flex flex-wrap gap-4 text-sm text-gray-600">
            <div class="flex items-center gap-2">
              <MapPin class="h-5 w-5" />
              {{ jobDetail.location }}
            </div>
            <div class="flex items-center gap-2">
              <Banknote class="h-5 w-5" />
              {{ jobDetail.salary_min }} - {{ jobDetail.salary_max }} THB/month
            </div>
            <div class="flex items-center gap-2">
              <BriefcaseBusiness class="h-5 w-5" />
              {{ jobDetail.jobType }}
            </div>
          </div>
        </div>

        <!-- Statistics Cards with Click to Filter -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div @click="setStatusFilter('all')" class="cursor-pointer">
            <DashboardStatCard
              title="Total Applicants"
              :value="stats.total"
              description="Applicants"
              :icon="Users"
              :cardClass="`h-[100px] md:h-[140px] bg-blue-50 text-blue-600 text-sm border-0 shadow-md transition-transform hover:scale-105 ${statusFilter === 'all' ? 'border-2 border-blue-500' : ''}`"
              iconClass="h-12 w-12 p-2 bg-blue-300/60 text-blue-600"
            />
          </div>

          <div @click="setStatusFilter('pending')" class="cursor-pointer">
            <DashboardStatCard
              title="Pending"
              :value="stats.pending"
              description="Applicants"
              :icon="Clock"
              :cardClass="`h-[100px] md:h-[140px] bg-yellow-50 text-yellow-600 text-sm border-0 shadow-md transition-transform hover:scale-105 ${statusFilter === 'pending' ? 'border-2 border-yellow-500' : ''}`"
              iconClass="h-12 w-12 p-2 bg-yellow-300/60 text-yellow-600"
            />
          </div>

          <div @click="setStatusFilter('approved')" class="cursor-pointer">
            <DashboardStatCard
              title="Approved"
              :value="stats.approved"
              description="Applicants"
              :icon="CheckCircle"
              :cardClass="`h-[100px] md:h-[140px] bg-green-50 text-green-600 text-sm border-0 shadow-md transition-transform hover:scale-105 ${statusFilter === 'approved' ? 'border-2 border-green-500' : ''}`"
              iconClass="h-12 w-12 p-2 bg-green-300/60 text-green-600"
            />
          </div>

          <div @click="setStatusFilter('rejected')" class="cursor-pointer">
            <DashboardStatCard
              title="Rejected"
              :value="stats.rejected"
              description="Applicants"
              :icon="XCircle"
              :cardClass="`h-[100px] md:h-[140px] bg-red-50 text-red-600 text-sm border-0 shadow-md transition-transform hover:scale-105 ${statusFilter === 'rejected' ? 'border-2 border-red-500' : ''}`"
              iconClass="h-12 w-12 p-2 bg-red-300/60 text-red-600"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Applicants Section -->
    <section class="mx-auto px-[8vw] md:px-[12vw] py-8">
      <div
        class="mb-6 flex flex-col gap-y-4 md:flex-row items-start md:items-center justify-between text-sm md:text-base"
      >
        <div>
          <h2 class="text-2xl font-bold text-gray-900">
            {{
              statusFilter === 'all'
                ? 'All Applicants'
                : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Applicants`
            }}
            ({{ filteredApplicants.length }})
          </h2>
          <p class="text-gray-600 mt-1">Review and manage job applications</p>
        </div>

        <!-- Save/Cancel Buttons -->
        <div v-if="hasChanges" class="flex flex-wrap gap-3">
          <button
            @click="cancelChanges"
            class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Cancel Changes
          </button>
          <button
            @click="saveChanges"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            Save Changes ({{ pendingChanges.size }})
          </button>
        </div>
      </div>

      <div
        v-if="filteredApplicants.length === 0"
        class="text-center py-12 bg-white rounded-lg shadow-sm"
      >
        <svg
          class="w-16 h-16 mx-auto text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <p class="text-gray-500 text-lg">No applicants in this category</p>
      </div>

      <div v-else class="grid gap-6">
        <ApplicantCard
          v-for="applicant in filteredApplicants"
          :key="applicant.id"
          :applicant="{
            ...applicant,
            status: pendingChanges.get(applicant.id) || applicant.status,
          }"
          @update-status="updateStatus"
          @view-profile="viewProfile"
          @view-letter="viewLetter"
        />
      </div>
    </section>
  </div>
</template>
