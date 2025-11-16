<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import UserApprovalTab from '@/components/admin/tabs/UserApprovalTab.vue'
import ManageUserTab from '@/components/admin/tabs/ManageUserTab.vue'
import ManageJobTab from '@/components/admin/tabs/ManageJobTab.vue'
import JobApprovalTab from '@/components/admin/tabs/JobApprovalTab.vue'
import AdminNavBar from '@/components/admin/AdminNavBar.vue'
import type { User, Job } from '@/types/adminType'
import { fetchUsers, fetchJobs } from '@/services/adminServices'
import JobDetail from '@/components/admin/JobDetail.vue'

const isSideBarOpen = ref<boolean>(true)
const users = ref<User[] | null>(null)
const jobs = ref<Job[] | null>([])

async function loadUsers() {
  const data = await fetchUsers()
  if (data) {
    users.value = data
  }
  else {
    console.log('there is some error fetching user data')
  }
}

async function loadJobs() {
  const data = await fetchJobs()
  if (data) {
    jobs.value = data
  }
  else {
    console.log('there is some error fetching user data')
  }
}

function updateUserData(userId: string, status: string) {
  if (!users.value) return;

  const user = users.value.find(u => u.userId === userId);
  if (user) {
    user.status = status;
  }

  if (status !== 'approved') {
    users.value = users.value.filter(u => u.status !==  status)
  }
}

const tabLists = ['Manage Users', 'User Approvals', 'Manage Job Posts', 'Job Approvals']
const currentTab = ref<string>('Manage Users')

const approvalUserSearch = ref('')
const approvalJobSearch = ref('')

const pendingUsers = computed(() => {
  return users.value?.filter(user => user.status === 'pending').filter(user => {
    return user.name.toLowerCase().includes(approvalUserSearch.value.toLowerCase())
  }) || []
})

const normalUsers = computed(() => {
  return users.value?.filter(user => user.status !== 'pending').filter(user => {
    return user.name.toLowerCase().includes(approvalUserSearch.value.toLowerCase())
  }) || []
})

const pendingJobPosts = computed(() => {
  return jobs.value?.filter(job => job.status === 'pending').filter(job => {
    return job.title.toLowerCase().includes(approvalJobSearch.value.toLowerCase()) ||
           job.company.toLowerCase().includes(approvalJobSearch.value.toLowerCase())
  }) || []
})

onMounted(() => {
  loadUsers()
  loadJobs()
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
        <ManageUserTab v-if="currentTab === 'Manage Users'" :data="normalUsers" @update="updateUserData"/>
        <UserApprovalTab v-if="currentTab === 'User Approvals'" :data="pendingUsers" @update="updateUserData"/>
        <ManageJobTab v-if="currentTab === 'Manage Job Posts'" :data="jobs || []"/>
        <JobApprovalTab v-if="currentTab === 'Job Approvals'" :data="pendingJobPosts"/>
        <JobDetail jobId=""/>
      </section>
    </div>
    
  </div>
</template>