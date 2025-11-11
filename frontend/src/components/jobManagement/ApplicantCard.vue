<script setup lang="ts">
import type { JobApplication } from '@/types/applicationType'
import {
  Mail,
  Phone,
  BriefcaseBusiness,
  Banknote,
  User,
  File,
  FileText,
  Check,
  MapPin,
  X,
} from 'lucide-vue-next'
import { computed } from 'vue'
import { getStatusColor } from '@/libs/getStatusStyle'
import { getFile } from '@/services/fileService'

const props = defineProps<{
  applicant: JobApplication
  pendingStatus?: 'pending' | 'accepted' | 'rejected'
}>()

const emit = defineEmits<{
  updateStatus: [id: number, status: 'pending' | 'accepted' | 'rejected']
}>()

const localStatus = computed(() => props.pendingStatus ?? props.applicant.status)

const canModify = computed(() => props.applicant.status === 'pending')

function handleStatusChange(newStatus: 'accepted' | 'rejected') {
  emit('updateStatus', props.applicant.id, newStatus)
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 shadow-lg">
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div>
          <span
            :class="getStatusColor(localStatus)"
            class="px-3 py-1 rounded-full text-sm font-medium border capitalize"
          >
            {{ localStatus }}
          </span>
          <div class="flex-1 mt-2">
            <h3 class="text-2xl font-semibold text-gray-900">
              {{ applicant.firstName }} {{ applicant.lastName }}
            </h3>
            <p class="text-gray-600 text-sm">Applied on {{ formatDate(applicant.appliedAt) }}</p>
          </div>
        </div>

        <div class="flex gap-x-2" v-if="canModify">
          <button
            @click="handleStatusChange('accepted')"
            :disabled="localStatus === 'accepted'"
            :class="[
              'p-2 shrink-0 px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2 font-medium',
              localStatus === 'accepted'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600',
            ]"
          >
            <Check class="w-5 h-5 md:w-full md:h-full" />
            <span class="hidden md:block">Accept</span>
          </button>

          <button
            @click="handleStatusChange('rejected')"
            :disabled="localStatus === 'rejected'"
            :class="[
              'p-2 shrink-0 px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2 font-medium',
              localStatus === 'rejected'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600',
            ]"
          >
            <X class="w-5 h-5" />
            <span class="hidden md:block">Reject</span>
          </button>
        </div>
      </div>

      <!-- Details Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
        <div class="flex items-center gap-2">
          <Mail class="w-5 h-5 text-gray-400" />
          <span class="text-gray-700">{{ applicant.contactEmail }}</span>
        </div>

        <div class="flex items-center gap-2">
          <Phone class="w-5 h-5 text-gray-400" />
          <span class="text-gray-700">{{ applicant.phoneNumber }}</span>
        </div>

        <div class="flex items-center gap-2">
          <BriefcaseBusiness class="w-5 h-5 text-gray-400" />
          <span class="text-gray-700">{{ applicant.yearsOfExperience }} years experience</span>
        </div>

        <div class="flex items-center gap-2">
          <Banknote class="w-5 h-5 text-gray-400" />
          <span class="text-gray-700">Expected: {{ applicant.expectedSalary }}</span>
        </div>

        <div class="flex items-center gap-2">
          <MapPin class="w-5 h-5 text-gray-400" />
          <span class="text-gray-700">Location: {{ applicant.location }}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col md:flex-row gap-3 pt-4 border-t text-base border-gray-200">
        <router-link
          :to="`/student/profile/${applicant.studentId}`"
          class="flex-1 sm:flex-none px-4 py-2 bg-[#6495ED] hover:bg-[#6495ED]/40 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <User class="w-5 h-5" />
          View Profile
        </router-link>

        <a
          v-if="applicant.resume"
          role="button"
          @click="getFile(applicant.resume)"
          class="px-4 py-2 bg-[#0F52BA] hover:bg-[#0F52BA]/40 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <File class="w-5 h-5" />
          Resume
        </a>

        <button
          v-if="applicant.letterOfApplication"
          role="button"
          @click="getFile(applicant.letterOfApplication)"
          class="px-4 py-2 bg-[#4682B4] hover:bg-[#4682B4]/40 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <FileText class="w-5 h-5" />
          Application Letter
        </button>
      </div>
    </div>
  </div>
</template>
