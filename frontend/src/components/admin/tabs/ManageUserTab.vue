<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, UserX, Trash2, CheckCircle, XCircle, AlertTriangle, Clock, FileText, ExternalLink } from 'lucide-vue-next'

const router = useRouter()

// Mock Data
const mockUsers = ref([
  { id: '1', name: 'John Doe', email: 'john@example.com', type: 'student', status: 'active', verified: true, joinDate: '2024-01-15', documents: [] },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', type: 'professor', status: 'active', verified: false, joinDate: '2024-02-20', documents: ['transcript.pdf', 'id_card.pdf'] },
  { id: '3', name: 'TechCorp Inc', email: 'contact@techcorp.com', type: 'company', status: 'suspended', verified: true, joinDate: '2024-03-10', documents: [] },
  { id: '4', name: 'Bob Wilson', email: 'bob@example.com', type: 'student', status: 'active', verified: false, joinDate: '2024-04-05', documents: ['student_id.pdf'] },
  { id: '5', name: 'Alice Johnson', email: 'alice@example.com', type: 'professor', status: 'active', verified: true, joinDate: '2024-05-12', documents: [] },
  { id: '6', name: 'Mike Brown', email: 'mike@example.com', type: 'student', status: 'active', verified: false, joinDate: '2024-06-01', documents: ['enrollment.pdf', 'transcript.pdf'] },
])

const mockJobPosts = ref([
  { id: '1', title: 'Software Engineer', company: 'TechCorp', postedDate: '2024-10-01', status: 'approved', applicants: 25 },
  { id: '2', title: 'Product Manager', company: 'StartupXYZ', postedDate: '2024-10-15', status: 'pending', applicants: 12 },
  { id: '3', title: 'Data Scientist', company: 'DataCo', postedDate: '2024-10-20', status: 'rejected', applicants: 8 },
  { id: '4', title: 'UI/UX Designer', company: 'DesignHub', postedDate: '2024-10-25', status: 'pending', applicants: 15 },
  { id: '5', title: 'Backend Developer', company: 'CodeFactory', postedDate: '2024-11-01', status: 'approved', applicants: 30 },
  { id: '6', title: 'Frontend Developer', company: 'WebStudio', postedDate: '2024-11-05', status: 'pending', applicants: 18 },
])

const tabLists = ['Manage Users', 'User Approvals', 'Manage Job Posts', 'Job Approvals']
const currentTab = ref<string>('Manage Users')

// Filters
const userSearchTerm = ref('')
const userTypeFilter = ref('all')
const userStatusFilter = ref('all')

const jobSearchTerm = ref('')
const jobStatusFilter = ref('all')

const approvalUserSearch = ref('')
const approvalJobSearch = ref('')

// Filtered Data
const filteredUsers = computed(() => {
  return mockUsers.value.filter(user => user.verified).filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(userSearchTerm.value.toLowerCase()) ||
                         user.email.toLowerCase().includes(userSearchTerm.value.toLowerCase())
    const matchesType = userTypeFilter.value === 'all' || user.type === userTypeFilter.value
    const matchesStatus = userStatusFilter.value === 'all' || user.status === userStatusFilter.value
    
    return matchesSearch && matchesType && matchesStatus
  })
})

const pendingUsers = computed(() => {
  return mockUsers.value.filter(user => !user.verified).filter(user => {
    return user.name.toLowerCase().includes(approvalUserSearch.value.toLowerCase()) ||
           user.email.toLowerCase().includes(approvalUserSearch.value.toLowerCase())
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
const suspendUser = (userId: string, event: Event) => {
  event.stopPropagation()
  confirmModalData.value = { 
    action: 'suspend', 
    type: 'user', 
    item: mockUsers.value.find(u => u.id === userId) 
  }
  showConfirmModal.value = true
}

const deleteUser = (userId: string, event: Event) => {
  event.stopPropagation()
  confirmModalData.value = { 
    action: 'delete', 
    type: 'user', 
    item: mockUsers.value.find(u => u.id === userId) 
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
  const user = mockUsers.value.find(u => u.id === userId)
  if (user) {
    user.verified = approve
    console.log(`User ${userId} verification ${approve ? 'approved' : 'rejected'}`)
  }
}

const deleteJobPost = (jobId: string, event: Event) => {
  event.stopPropagation()
  confirmModalData.value = { 
    action: 'delete', 
    type: 'job', 
    item: mockJobPosts.value.find(j => j.id === jobId) 
  }
  showConfirmModal.value = true
}

const suspendJobPost = (jobId: string, event: Event) => {
  event.stopPropagation()
  confirmModalData.value = { 
    action: 'suspend', 
    type: 'job', 
    item: mockJobPosts.value.find(j => j.id === jobId) 
  }
  showConfirmModal.value = true
}

const approveJobPost = (jobId: string, approve: boolean, event: Event) => {
  event.stopPropagation()
  const job = mockJobPosts.value.find(j => j.id === jobId)
  if (job) {
    job.status = approve ? 'approved' : 'rejected'
    console.log(`Job ${jobId} ${approve ? 'approved' : 'rejected'}`)
  }
}

const confirmAction = () => {
  if (!confirmModalData.value) return
  
  const { action, type, item } = confirmModalData.value
  
  if (type === 'user') {
    if (action === 'delete') {
      mockUsers.value = mockUsers.value.filter(u => u.id !== item.id)
      console.log(`Deleted user ${item.id}`)
    } else if (action === 'suspend') {
      const user = mockUsers.value.find(u => u.id === item.id)
      if (user) {
        user.status = user.status === 'suspended' ? 'active' : 'suspended'
        console.log(`User ${item.id} status: ${user.status}`)
      }
    }
  } else if (type === 'job') {
    if (action === 'delete') {
      mockJobPosts.value = mockJobPosts.value.filter(j => j.id !== item.id)
      console.log(`Deleted job post ${item.id}`)
    } else if (action === 'suspend') {
      const job = mockJobPosts.value.find(j => j.id === item.id)
      if (job) {
        job.status = 'suspended'
        console.log(`Job post ${item.id} suspended`)
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

const getStatusColor = (status: string) => {
  const colors = {
    active: 'bg-green-100 text-green-700',
    suspended: 'bg-red-100 text-red-700',
    approved: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    rejected: 'bg-red-100 text-red-700'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700'
}
</script>

<template>
  <div class="p-8">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Manage Users</h1>
      <p class="text-gray-600">Click on a user row to view their profile</p>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            v-model="userSearchTerm"
            type="text"
            placeholder="Search users..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select v-model="userTypeFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">All Types</option>
          <option value="student">Student</option>
          <option value="professor">Professor</option>
          <option value="company">Company</option>
        </select>

        <select v-model="userStatusFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="user in filteredUsers" 
              :key="user.id" 
              @click="navigateToProfile(user.id, user.type)"
              class="hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {{ user.name.charAt(0) }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['px-3 py-1 text-xs font-medium rounded-full capitalize', getUserTypeColor(user.type)]">
                  {{ user.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['px-3 py-1 text-xs font-medium rounded-full capitalize', getStatusColor(user.status)]">
                  {{ user.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end gap-2">
                  <button @click="suspendUser(user.id, $event)" :class="['p-2 rounded-lg transition-colors', user.status === 'suspended' ? 'text-green-600 hover:bg-green-50' : 'text-orange-600 hover:bg-orange-50']" :title="user.status === 'suspended' ? 'Activate' : 'Suspend'">
                    <UserX class="w-4 h-4" />
                  </button>
                  <button @click="deleteUser(user.id, $event)" class="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors" title="Delete">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="filteredUsers.length === 0" class="text-center py-12 bg-white rounded-lg border border-gray-200 mt-6">
      <p class="text-gray-500">No users found</p>
    </div>
  </div>
</template>