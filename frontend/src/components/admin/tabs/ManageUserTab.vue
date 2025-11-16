<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, XCircle } from 'lucide-vue-next'
import type { User } from '@/types/adminType'
import { reviewUser } from '@/services/adminServices'

const router = useRouter()

const { data } = defineProps<{ data: User[] }>()
const emit = defineEmits<{
  (e: 'update', userId: string, status: string): void
}>()

// Filters
const userSearchTerm = ref('')
const userTypeFilter = ref('all')

// Filtered Data
const filteredUsers = computed(() => {
  return data.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(userSearchTerm.value.toLowerCase())
    const matchesType = userTypeFilter.value === 'all' || user.requestedType === userTypeFilter.value    
    return matchesSearch && matchesType
  })
})

// Modals
const showConfirmModal = ref(false)
const confirmModalData = ref<{ action: string, type: string, item: any } | null>(null)

// Navigation
const navigateToProfile = (userId: string, userType: string) => {
  router.push(`/${userType}/profile/${userId}`)
}

async function deleteUser(userId: string, event: Event) {
  event.stopPropagation()
  const user = data.find(u => u.userId === userId)
  if (!user) return
  
  const res = await reviewUser(false, userId, true)
  if (res.ok) {
    emit('update', userId, 'delete')
  }
  else {
    console.log('there is an error, please try again.')
  }
}

const getUserTypeColor = (type: string) => {
  const colors = {
    Student: 'bg-blue-100 text-blue-700',
    Professor: 'bg-purple-100 text-purple-700',
    Company: 'bg-green-100 text-green-700'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700'
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Manage Users</h1>
      <p class="text-gray-600">Click on a user row to view their profile</p>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <option value="Student">Student</option>
          <option value="Professor">Professor</option>
          <option value="Company">Company</option>
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="user in filteredUsers" 
              :key="user.userId" 
              @click="navigateToProfile(user.userId, user.requestedType)"
              class="hover:bg-blue-50 cursor-pointer transition-colors"
            >
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
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['px-3 py-1 text-xs font-medium rounded-full capitalize', getUserTypeColor(user.requestedType)]">
                  {{ user.requestedType }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ new Date(user.approvedAt).toLocaleDateString() }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="deleteUser(user.userId, $event)" class="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1.5 text-sm font-medium">
                  <XCircle class="w-4 h-4" />
                  Delete
                </button>
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