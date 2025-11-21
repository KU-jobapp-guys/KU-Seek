<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, XCircle } from 'lucide-vue-next'
import type { JobRequest } from '@/types/adminType';
import { updateJobStatus } from '@/services/adminServices';
import { useToast } from 'vue-toastification';
import ConfirmationModal from '../ConfirmationModal.vue';

const { data } = defineProps<{ data: JobRequest[] }>()
const emit = defineEmits<{
  (e: 'viewJob', jobId: string): void
  (e: 'update', userId: string, status: string): void
}>()

const isModalOpen = ref(false)
const selectJobId = ref<string>()
const toast = useToast()

// Filters
const jobSearchTerm = ref('')
const jobStatusFilter = ref('all')


const filteredJobPosts = computed(() => {
  return data.filter(job => job.status !== 'pending').filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(jobSearchTerm.value.toLowerCase()) ||
                         job.company.toLowerCase().includes(jobSearchTerm.value.toLowerCase())
    const matchesStatus = jobStatusFilter.value === 'all' || job.status === jobStatusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

async function deleteJob() {
  isModalOpen.value = false

  if(!selectJobId.value) return

  const user = data.find(j => j.jobId === selectJobId.value)
  if (!user) return
  
  const res = await updateJobStatus(false, selectJobId.value, true)
  if (res.ok) {
    emit('update', selectJobId.value, 'delete')
    toast.success("The job post has been successfully deleted.")
  }
  else {
    toast.error("Failed to delete the job post. Please try again later.")
  }
}

</script>

<template>
  <ConfirmationModal v-if="isModalOpen" state="delete" @close="isModalOpen = false" @confirm="deleteJob"/>

  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Manage Job Posts</h1>
      <p class="text-gray-600">Click on a job row to view details</p>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
      <div class="grid grid-cols-1 gap-4">
        <div class="relative w-full">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            v-model="jobSearchTerm"
            type="text"
            placeholder="Search by title or company..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Job Posts Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visibility</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="job in filteredJobPosts" 
              :key="job.jobId" 
              @click="emit('viewJob', job.jobId)"
              class="hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ job.title }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-700">{{ job.company }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ new Date(job.approvedAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {{ job.visibility }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="(event: MouseEvent) => { event.stopPropagation(); isModalOpen = true; selectJobId = job.jobId }" class="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1.5 text-sm font-medium">
                  <XCircle class="w-4 h-4" />
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="filteredJobPosts.length === 0" class="text-center py-12 bg-white rounded-lg border border-gray-200 mt-6">
      <p class="text-gray-500">No job posts found</p>
    </div>
  </div>
</template>