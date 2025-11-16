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
</script>


<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle class="w-6 h-6 text-red-600" />
        </div>
        <h3 class="text-xl font-bold text-gray-900">Confirm Action</h3>
      </div>
      
      <p class="text-gray-600 mb-6">
        Are you sure you want to {{ confirmModalData?.action }} this {{ confirmModalData?.type }}?
        <span v-if="confirmModalData?.item" class="font-semibold block mt-2">
          {{ confirmModalData.type === 'user' ? confirmModalData.item.name : confirmModalData.item.title }}
        </span>
      </p>
      
      <div class="flex gap-3">
        <button @click="showConfirmModal = false" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button @click="confirmAction" class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>