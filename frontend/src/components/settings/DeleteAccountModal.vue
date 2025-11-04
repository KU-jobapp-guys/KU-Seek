<script setup lang="ts">
import { X } from 'lucide-vue-next'

const { state } = defineProps<{
  state: 'delete account' | 'remove term of service'
}>()

const emits = defineEmits<{
  (e: 'close'): void
}>()

const content = {
  'delete account': {
    title: 'Delete Account',
    message:
      'Your account and all associated data will be permanently deleted. This action cannot be undone.',
  },
  'remove term of service': {
    title: 'Withdraw Term of Service Agreement',
    message:
    'By withdrawing your agreement to the Terms of Service, we will no longer be able to provide you with our services.\n\nAre you sure you want to delete your account?',
  },
} 


function deleteAccount() {
  // call API to delete account
  console.log('Delete account from the database')
  window.location.href = '/logout'
}


</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center z-50 p-4">
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      @click="emits('close')"
    ></div>

    <!-- Modal -->
    <div
      class="relative bg-white rounded-2xl shadow-2xl z-50 max-w-2xl w-full max-h-[90vh] flex flex-col"
    >
      <X
        @click="emits('close')"
        class="absolute top-4 right-4 w-5 h-5 rounded-full text-gray-500 hover:text-gray-400 z-10"
      />

      <!-- Header -->
      <div class="px-6 pt-6 pb-4 border-b border-gray-200 gap-y-4 flex flex-col">
        <h3 class="text-2xl font-bold text-gray-900 pr-8">
          {{ content[state].title }}
        </h3>
        <p class="text-gray-600 mt-1 whitespace-pre-line">
          {{ content[state].message }}
        </p>
      </div>
        
      <!-- Action Buttons -->
      <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
        <div class="flex gap-x-3 justify-end">
          <button
            class="w-full border border-red-300 rounded-lg bg-red-500/20 py-2 text-red-500 hover:bg-red-500/30"
            @click="deleteAccount"
          >
            Delete Account
          </button>

          <button
            class="w-full border border-gray-300 rounded-lg bg-gray-100/50 py-2 text-gray-700 hover:bg-gray-200/50"
            @click="$emit('close')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>