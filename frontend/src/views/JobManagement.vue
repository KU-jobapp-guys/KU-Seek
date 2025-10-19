<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mockJobs } from '@/data/mockJobs'
import { mockJobApplications } from '@/data/mockApplicants'
import type { Job } from '@/types/jobType'
import type { JobApplication } from '@/types/applicationType'
import { MapPin, Clock, Banknote, BriefcaseBusiness, Users, CheckCircle, XCircle } from 'lucide-vue-next'
import DashboardStatCard from '@/components/dashboards/StatCards/StatCard.vue'

const route = useRoute()
const router = useRouter()

const jobDetail = ref<Job>()
const applicantsList = ref<JobApplication[]>([])

// Statistics computed properties
const stats = computed(() => {
  const total = applicantsList.value.length
  const pending = applicantsList.value.filter(a => a.status === 'pending').length
  const approved = applicantsList.value.filter(a => a.status === 'approved').length
  const rejected = applicantsList.value.filter(a => a.status === 'rejected').length
  
  return { total, pending, approved, rejected }
})

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
  const application = applicantsList.value.find(a => a.id === applicationId)
  if (application) {
    application.status = newStatus
    // Here you would typically make an API call to update the backend
    console.log(`Updated application ${applicationId} to ${newStatus}`)
  }
}

function viewProfile(studentId: number) {
  router.push(`/student/profile/${studentId}`)
}

function getStatusColor(status: string) {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    case 'approved':
      return 'bg-green-100 text-green-800 border-green-300'
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-300'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300'
  }
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  let jobId = route.params.id as string
  loadJob(jobId)
  loadApplicants(jobId)
  window.scrollTo({ top: 0 })
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Job Detail Section -->
    <section v-if="jobDetail" class="bg-white shadow-sm border-b px-[8vw] md:px-[12vw]">
      <div class="w-full mx-auto py-8">
        <div>
          <button 
            @click="router.back()" 
            class="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ jobDetail.role }}</h1>
          
          <div class="flex flex-wrap gap-4 text-sm text-gray-600">
            <div class="flex items-center gap-2">
              <MapPin class="h-5 w-h" />
              {{ jobDetail.location }}
            </div>
            <div class="flex items-center gap-2">
              <Banknote class="h-5 w-h" />
              {{ jobDetail.salary }}
            </div>
            <div class="flex items-center gap-2">
              <BriefcaseBusiness class="h-5 w-h" />
              {{ jobDetail.jobType }}
            </div>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <DashboardStatCard
            title="Total Applicants"
            :value="stats.total"
            description="Applicants"
            :icon="Users"
            cardClass="bg-blue-50 text-blue-600 text-sm border-0 shadow-md"
            iconClass="h-12 w-12 p-2 bg-blue-300/60 text-blue-600"
          />

          <DashboardStatCard
            title="Pending"
            :value="stats.pending"
            description="Applicants"
            :icon="Clock"
            cardClass="bg-yellow-50 text-yellow-600 text-sm border-0 shadow-md"
            iconClass="h-12 w-12 p-2 bg-yellow-300/60 text-yellow-600"
          />
          
          <DashboardStatCard
            title="Approved"
            :value="stats.approved"
            description="Applicants"
            :icon="CheckCircle"
            cardClass="bg-green-50 text-green-600 text-sm border-0 shadow-md"
            iconClass="h-12 w-12 p-2 bg-green-300/60 text-green-600"
          />
          
          <DashboardStatCard
            title="Rejected"
            :value="stats.approved"
            description="Applicants"
            :icon="XCircle"
            cardClass="bg-red-50 text-red-600 text-sm border-0 shadow-md"
            iconClass="h-12 w-12 p-2 bg-red-300/60 text-red-600"
          />
        </div>
      </div>
    </section>

    <!-- Applicants Section -->
    <section class="mx-auto px-[8vw] md:px-[12vw] py-8">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Applicants ({{ applicantsList.length }})</h2>
        <p class="text-gray-600 mt-1">Review and manage job applications</p>
      </div>

      <div v-if="applicantsList.length === 0" class="text-center py-12 bg-white rounded-lg shadow-sm">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p class="text-gray-500 text-lg">No applicants yet</p>
      </div>

      <div v-else class="grid gap-6">
        <div 
          v-for="applicant in applicantsList" 
          :key="applicant.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <!-- Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-xl font-semibold text-gray-900">
                    {{ applicant.first_name }} {{ applicant.last_name }}
                  </h3>
                  <span 
                    :class="getStatusColor(applicant.status)"
                    class="px-3 py-1 rounded-full text-xs font-medium border capitalize"
                  >
                    {{ applicant.status }}
                  </span>
                </div>
                <p class="text-gray-600 text-sm">Applied on {{ formatDate(applicant.applied_at) }}</p>
              </div>
            </div>

            <!-- Details Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div class="flex items-center gap-2 text-sm">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="text-gray-700">{{ applicant.contact_email }}</span>
              </div>

              <div class="flex items-center gap-2 text-sm">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="text-gray-700">{{ applicant.phone_number }}</span>
              </div>

              <div class="flex items-center gap-2 text-sm">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="text-gray-700">{{ applicant.years_of_experience }} years experience</span>
              </div>

              <div class="flex items-center gap-2 text-sm">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-gray-700">Expected: {{ applicant.expected_salary }}</span>
              </div>
            </div>

            <!-- Documents -->
            <div class="mb-4">
              <p class="text-sm font-medium text-gray-700 mb-2">Application Letter:</p>
              <p class="text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-200 line-clamp-3">
                {{ applicant.letter_of_application }}
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
              <button
                @click="viewProfile(applicant.student_id)"
                class="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                View Profile
              </button>

              <button
                v-if="applicant.status !== 'approved'"
                @click="updateStatus(applicant.id, 'approved')"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-medium"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Approve
              </button>

              <button
                v-if="applicant.status !== 'rejected'"
                @click="updateStatus(applicant.id, 'rejected')"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-medium"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Reject
              </button>

              <button
                v-if="applicant.status !== 'pending'"
                @click="updateStatus(applicant.id, 'pending')"
                class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 font-medium"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Set Pending
              </button>

              <a
                v-if="applicant.resume"
                :href="applicant.resume"
                target="_blank"
                class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 font-medium"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>