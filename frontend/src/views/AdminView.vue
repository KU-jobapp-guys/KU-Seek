<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import UserApprovalTab from '@/components/admin/tabs/UserApprovalTab.vue'
import ManageUserTab from '@/components/admin/tabs/ManageUserTab.vue'
import ManageJobTab from '@/components/admin/tabs/ManageJobTab.vue'
import JobApprovalTab from '@/components/admin/tabs/JobApprovalTab.vue'
import AdminNavBar from '@/components/admin/AdminNavBar.vue'
import type { PendingJob, PendingUser } from '@/types/adminType'

const router = useRouter()
const isSideBarOpen = ref<boolean>(true)

// Mock Data
const mockUsers = ref<PendingUser[]>([
  { userId: '1', name: 'John Doe', reason: 'name not match', type: 'student', status: 'pending', document: '' },
  { userId: '2', name: 'Jane Smith', reason: 'document blur', type: 'professor', status: 'pending', document: 'transcript.pdf' },
  { userId: '3', name: 'TechCorp Inc', reason: 'contact@techcorp.com', type: 'company', status: 'suspended', document: ''},
  { userId: '4', name: 'Bob Wilson', reason: 'not the correct type of document', type: 'student', status: 'pending', document: '' },
  { userId: '5', name: 'Alice Johnson', reason: 'alice@example.com', type: 'professor', status: 'active', document: '' },
  { userId: '6', name: 'Mike Brown', reason: 'mike@example.com', type: 'student', status: 'active', document: 'enrollment.pdf' },
])

const mockJobPosts = ref<PendingJob[]>([
  { jobId: '1', title: 'Software Engineer', company: 'TechCorp', reason: '2024-10-01', status: 'approved' },
  { jobId: '2', title: 'Product Manager', company: 'StartupXYZ', reason: 'unclear job description', status: 'pending' },
  { jobId: '3', title: 'Data Scientist', company: 'DataCo', reason: '2024-10-20', status: 'rejected' },
  { jobId: '4', title: 'UI/UX Designer', company: 'DesignHub', reason: 'the date is invalid', status: 'pending' },
  { jobId: '5', title: 'Backend Developer', company: 'CodeFactory', reason: '2024-11-01', status: 'approved' },
  { jobId: '6', title: 'Frontend Developer', company: 'WebStudio', reason: 'company not update their profile', status: 'pending' },
])

const tabLists = ['Manage Users', 'User Approvals', 'Manage Job Posts', 'Job Approvals']
const currentTab = ref<string>('Manage Users')

const approvalUserSearch = ref('')
const approvalJobSearch = ref('')

const pendingUsers = computed(() => {
  return mockUsers.value.filter(user => user.status === 'pending').filter(user => {
    return user.name.toLowerCase().includes(approvalUserSearch.value.toLowerCase())
  })
})

const pendingJobPosts = computed(() => {
  return mockJobPosts.value.filter(job => job.status === 'pending').filter(job => {
    return job.title.toLowerCase().includes(approvalJobSearch.value.toLowerCase()) ||
           job.company.toLowerCase().includes(approvalJobSearch.value.toLowerCase())
  })
})

</script>

<template>
  <div class="flex w-full h-screen bg-orange-500">
    <!-- Sidebar -->
    <section v-if="isSideBarOpen" class="flex flex-col bg-gradient-to-b from-blue-50 to-blue-100 h-full w-[20vw] py-8 border-r border-blue-200">
      <div class="flex flex-col px-4 mb-4 gap-y-0 text-2xl font-bold leading-none py-4 border-b-2 border-blue-300">
        <h1>Admin</h1>
        <h1 class="text-gray-800">KU SEEK</h1>
      </div>

      <div class="flex flex-col gap-1">
        <button
          v-for="tab in tabLists"
          :key="tab"
          :class="[
            'text-left text-base px-8 py-3 transition-all duration-200 hover:bg-blue-200 relative',
            tab === currentTab ? 'bg-blue-200 border-l-4 border-blue-600 font-semibold text-blue-900' : 'text-gray-700'
          ]"
          @click="currentTab = tab"
        >
          {{ tab }}
          <span v-if="tab === 'User Approvals' && pendingUsers.length > 0" class="absolute right-4 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {{ pendingUsers.length }}
          </span>
          <span v-if="tab === 'Job Approvals' && pendingJobPosts.length > 0" class="absolute right-4 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {{ pendingJobPosts.length }}
          </span>
        </button>
      </div>
    </section>

    <!-- Main Content -->
    <div class="w-full h-full flex flex-col">
      <AdminNavBar @sideClick="isSideBarOpen = !isSideBarOpen" />      
      <section class="h-full w-full px-[2vw] md:px-[4vw] py-8 overflow-auto bg-gray-50">
        <ManageUserTab v-if="currentTab === 'Manage Users'" :data="mockUsers"/>
        <UserApprovalTab v-if="currentTab === 'User Approvals'" :data="pendingUsers"/>
        <ManageJobTab v-if="currentTab === 'Manage Job Posts'" :data="mockJobPosts"/>
        <JobApprovalTab v-if="currentTab === 'Job Approvals'" :data="pendingJobPosts"/>
      </section>
    </div>
    
  </div>
</template>