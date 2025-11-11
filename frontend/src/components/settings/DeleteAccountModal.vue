<script setup lang="ts">
import { X, TriangleAlert } from 'lucide-vue-next'

const { state } = defineProps<{
  state: 'delete account' | 'remove term of service'
}>()

const emits = defineEmits<{
  (e: 'close'): void
}>()

const content = {
  'delete account': {
    title: 'Delete Account',
    message: 'Your account and all associated data will be permanently deleted. This action cannot be undone.',
  },
  'remove term of service': {
    title: 'Withdraw Term of Service Agreement',
    message: 'By withdrawing your agreement to the Terms of Service, we will no longer be able to provide you with our services.\n\nAre you sure you want to delete your account?',
  },
}

function deleteAccount() {
  console.log('Delete account from the database')
  window.location.href = '/logout'
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center z-50 p-4">
    <!-- Overlay Background -->
    <div
      class="absolute inset-0 bg-black/40 backdrop-blur-md"
      @click="emits('close')"
    />

    <!-- Modal Content -->
    <div class="relative bg-white/95 backdrop-blur-xl rounded-lg shadow-2xl z-50 max-w-md w-full border border-gray-200/50 overflow-hidden">
      <button
        @click="emits('close')"
        class="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors duration-200 group"
      >
        <X class="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
      </button>
      
      <div class="px-8 pt-8 pb-6 relative">
        <div class="absolute top-0 left-0 right-0 h-2 bg-red-500"/>
            
        <div class="w-14 h-14 rounded-2xl bg-red-500 flex items-center justify-center mb-5 shadow-lg shadow-red-500/30">
          <TriangleAlert class="w-7 h-7 text-white" />
        </div>

        <h3 class="text-2xl font-bold text-gray-900 mb-3">
          {{ content[state].title }}
        </h3>

        <p class="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
          {{ content[state].message }}
        </p>
      </div>

      <div class="px-8 pb-8 pt-2">
        <div class="flex flex-col gap-3">
          <button
            class="w-full rounded-xl bg-red-500 py-3 px-4 text-white font-semibold hover:bg-red-600"
            @click="deleteAccount"
          >
            Delete Account
          </button>
          <button
            class="w-full rounded-xl border-2 border-gray-200 py-3 px-4 text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-300"
            @click="$emit('close')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

  </div>
</template>