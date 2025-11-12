<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, CheckCircle, XCircle, Clock } from 'lucide-vue-next'
import type { PendingJob } from '@/types/adminType'

const router = useRouter()
const { data } = defineProps<{ data: PendingJob[] }>()

// Filters
const userSearchTerm = ref('')
const userTypeFilter = ref('all')
const userStatusFilter = ref('all')

const jobSearchTerm = ref('')
const jobStatusFilter = ref('all')

const approvalJobSearch = ref('')

const filteredJobPosts = computed(() => {
  return data.filter(job => job.status !== 'pending').filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(jobSearchTerm.value.toLowerCase()) ||
                         job.company.toLowerCase().includes(jobSearchTerm.value.toLowerCase())
    const matchesStatus = jobStatusFilter.value === 'all' || job.status === jobStatusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

const pendingJobPosts = computed(() => {
  return data.filter(job => job.status === 'pending').filter(job => {
    return job.title.toLowerCase().includes(approvalJobSearch.value.toLowerCase()) ||
           job.company.toLowerCase().includes(approvalJobSearch.value.toLowerCase())
  })
})

// Modals
const showConfirmModal = ref(false)
const showDocumentModal = ref(false)
const selectedDocuments = ref<string[]>([])
const confirmModalData = ref<{ action: string, type: string, item: any } | null>(null)

const navigateToJob = (jobId: string) => {
  router.push(`/job/${jobId}`)
}

// Actions
const deleteJobPost = (jobId: string, event: Event) => {
  event.stopPropagation()
  confirmModalData.value = { 
    action: 'delete', 
    type: 'job', 
    item: data.find(j => j.jobId === jobId) 
  }
  showConfirmModal.value = true
}

const approveJobPost = (jobId: string, approve: boolean, event: Event) => {
  event.stopPropagation()
  const job = data.find(j => j.jobId === jobId)
  if (job) {
    job.status = approve ? 'approved' : 'rejected'
    console.log(`Job ${jobId} ${approve ? 'approved' : 'rejected'}`)
  }
}

const confirmAction = () => {
  if (!confirmModalData.value) return
  
  const { action, type, item } = confirmModalData.value
  
  if (type === 'job') {
    if (action === 'delete') {
      console.log(`Deleted job post ${item.id}`)
    } else if (action === 'suspend') {
      const job = data.find(j => j.jobId === item.id)
      if (job) {
        job.status = 'suspended'
        console.log(`Job post ${item.id} suspended`)
      }
    }
  }
  
  showConfirmModal.value = false
  confirmModalData.value = null
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        Job Approvals
        <span v-if="pendingJobPosts.length > 0" class="bg-red-500 text-white text-base font-bold rounded-full px-3 py-1">
          {{ pendingJobPosts.length }}
        </span>
      </h1>
      <p class="text-gray-600">Review and approve pending job postings • Click row to view full details</p>
    </div>

    <!-- Search -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
      <div class="relative max-w-md">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          v-model="approvalJobSearch"
          type="text"
          placeholder="Search by job title, company name..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- Pending Jobs Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="job in pendingJobPosts" 
              :key="job.jobId"
              @click="navigateToJob(job.jobId)" 
              class="hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ job.title }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-700">{{ job.company }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-700">{{ job.reason }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                <div class="flex justify-start gap-2">
                  <button @click="approveJobPost(job.jobId, false, $event)" class="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1.5 text-sm font-medium">
                    <XCircle class="w-4 h-4" />
                    Reject
                  </button>
                  <button @click="approveJobPost(job.jobId, true, $event)" class="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1.5 text-sm font-medium">
                    <CheckCircle class="w-4 h-4" />
                    Approve
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="pendingJobPosts.length === 0" class="text-center py-16 bg-white rounded-lg border border-gray-200 mt-6">
      <CheckCircle class="w-16 h-16 text-green-500 mx-auto mb-4" />
      <p class="text-lg font-medium text-gray-900">All caught up!</p>
      <p class="text-gray-500 mt-2">No pending job approvals</p>
    </div>
  </div>
</template>