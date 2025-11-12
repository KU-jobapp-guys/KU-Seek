<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, UserX, Trash2, CheckCircle, XCircle, AlertTriangle, Clock, FileText, ExternalLink } from 'lucide-vue-next'
import UserApprovalTab from '@/components/admin/tabs/UserApprovalTab.vue'

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

const filteredJobPosts = computed(() => {
  return mockJobPosts.value.filter(job => job.status !== 'pending').filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(jobSearchTerm.value.toLowerCase()) ||
                         job.company.toLowerCase().includes(jobSearchTerm.value.toLowerCase())
    const matchesStatus = jobStatusFilter.value === 'all' || job.status === jobStatusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

const pendingJobPosts = computed(() => {
  return mockJobPosts.value.filter(job => job.status === 'pending').filter(job => {
    return job.title.toLowerCase().includes(approvalJobSearch.value.toLowerCase()) ||
           job.company.toLowerCase().includes(approvalJobSearch.value.toLowerCase())
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
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Manage Job Posts</h1>
      <p class="text-gray-600">Click on a job row to view details</p>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="relative">
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="job in filteredJobPosts" 
              :key="job.id" 
              @click="navigateToJob(job.id)"
              class="hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ job.title }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-700">{{ job.company }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ new Date(job.postedDate).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {{ job.applicants }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end gap-2">
                  <button @click="suspendJobPost(job.id, $event)" class="p-2 rounded-lg text-orange-600 hover:bg-orange-50 transition-colors" title="Suspend">
                    <AlertTriangle class="w-4 h-4" />
                  </button>
                  <button @click="deleteJobPost(job.id, $event)" class="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors" title="Delete">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
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