<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, UserX, Trash2, CheckCircle, XCircle, AlertTriangle, Clock, FileText, ExternalLink } from 'lucide-vue-next'
import type { PendingUser } from '@/types/adminType'

const router = useRouter()

const { data } = defineProps<{ data: PendingUser[] }>()
const tabLists = ['Manage Users', 'User Approvals', 'Manage Job Posts', 'Job Approvals']
const currentTab = ref<string>('Manage Users')

// Filters
const userSearchTerm = ref('')
const userTypeFilter = ref('all')
const userStatusFilter = ref('all')

const approvalUserSearch = ref('')
const approvalJobSearch = ref('')

// Filtered Data
const filteredUsers = computed(() => {
  return data.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(userSearchTerm.value.toLowerCase())
    const matchesType = userTypeFilter.value === 'all' || user.type === userTypeFilter.value
    const matchesStatus = userStatusFilter.value === 'all' || user.status === userStatusFilter.value
    
    return matchesSearch && matchesType && matchesStatus
  })
})

const pendingUsers = computed(() => {
  return data.filter(user => {
    return user.name.toLowerCase().includes(approvalUserSearch.value.toLowerCase())
  })
})

// Modals
const showConfirmModal = ref(false)
const showDocumentModal = ref(false)
const selectedDocuments = ref<string[]>([])
const confirmModalData = ref<{ action: string, type: string, item: any } | null>(null)

// Navigation
const navigateToProfile = (userId: string, userType: string) => {
  router.push(`/${userType}/profile/${userId}`)
}

const navigateToJob = (jobId: string) => {
  router.push(`/job/${jobId}`)
}

// Actions

const deleteUser = (userId: string, event: Event) => {
  event.stopPropagation()
  confirmModalData.value = { 
    action: 'delete', 
    type: 'user', 
    item: data.find(u => u.userId === userId) 
  }
  showConfirmModal.value = true
}

const viewDocuments = (documents: string[], event: Event) => {
  event.stopPropagation()
  selectedDocuments.value = documents
  showDocumentModal.value = true
}

const verifyUser = (userId: string, approve: boolean, event: Event) => {
  event.stopPropagation()
  const user = data.find(u => u.userId === userId)
  if (user) {
    user.status = 'approved'
    console.log(`User ${userId} verification ${approve ? 'approved' : 'rejected'}`)
  }
}

const confirmAction = () => {
  if (!confirmModalData.value) return
  
  const { action, type, item } = confirmModalData.value
  
  if (type === 'user') {
    if (action === 'delete') {
      console.log(`Deleted user ${item.id}`)
    } else if (action === 'suspend') {
      const user = data.find(u => u.userId === item.id)
      if (user) {
        user.status = user.status === 'suspended' ? 'active' : 'suspended'
        console.log(`User ${item.id} status: ${user.status}`)
      }
    }
  }
  
  showConfirmModal.value = false
  confirmModalData.value = null
}

const getUserTypeColor = (type: string) => {
  const colors = {
    student: 'bg-blue-100 text-blue-700',
    professor: 'bg-purple-100 text-purple-700',
    company: 'bg-green-100 text-green-700'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700'
}
</script>

<template>
  <!-- User Approvals Tab -->
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
        User Approvals
        <span v-if="pendingUsers.length > 0" class="bg-red-500 text-white text-base font-bold rounded-full px-3 py-1">
          {{ pendingUsers.length }}
        </span>
      </h1>
      <p class="text-gray-600">Review verification documents and approve user registrations</p>
    </div>

    <!-- Search -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
      <div class="relative max-w-md">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          v-model="approvalUserSearch"
          type="text"
          placeholder="Search pending users..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- Pending Users Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
              <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in pendingUsers" :key="user.userId" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {{ user.name.charAt(0) }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-2 py-4 whitespace-nowrap">
                <span :class="['px-3 py-1 text-xs font-medium rounded-full capitalize', getUserTypeColor(user.type)]">
                  {{ user.type }}
                </span>
              </td>
              <td class="py-4 whitespace-nowrap text-sm">
                {{ user.reason }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button 
                  class="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <ExternalLink class="w-4 h-4" />
                  view document
                </button>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end gap-2">
                  <button @click="verifyUser(user.userId, false, $event)" class="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1.5 text-sm font-medium">
                    <XCircle class="w-4 h-4" />
                    Reject
                  </button>
                  <button @click="verifyUser(user.userId, true, $event)" class="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1.5 text-sm font-medium">
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

    <div v-if="pendingUsers.length === 0" class="text-center py-16 bg-white rounded-lg border border-gray-200 mt-6">
      <CheckCircle class="w-16 h-16 text-green-500 mx-auto mb-4" />
      <p class="text-lg font-medium text-gray-900">All caught up!</p>
      <p class="text-gray-500 mt-2">No pending user approvals</p>
    </div>
  </div>
</template>