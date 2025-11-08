<script setup lang="ts">
import { Mail } from 'lucide-vue-next'

const { newEmail } = defineProps<{ newEmail: string }>()

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'click', confirmChange: boolean): void
}>()
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

      <div class="px-8 pt-8 pb-6 relative">
        <div class="absolute top-0 left-0 right-0 h-2 bg-blue-500"/>
        
        <div class="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/30">
          <Mail class="w-7 h-7 text-white" />
        </div>

        <h3 class="text-2xl font-bold text-gray-900 mb-3">
          Confirm Email Change
        </h3>

        <div class="space-y-3">
          <p class="text-gray-600">
            You are about to change your contact email to:
          </p>
          
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p class="font-semibold text-blue-900">{{ newEmail }}</p>
          </div>

          <p class="text-gray-600 leading-relaxed text-sm">
            A verification link will be sent to this email address. You'll need to verify it before enable the new contact email.
          </p>
        </div>
      </div>

      <div class="px-8 pb-8 pt-2">
        <div class="flex flex-col gap-3">
          <button
            class="w-full rounded-xl bg-blue-500 hover:bg-blue-600 py-3 px-4 text-white font-medium transition-colors"
            @click="emits('click', true)"
          >
            Confirm Change
          </button>
          
          <button
            class="w-full rounded-xl border-2 border-gray-200 py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
            @click="emits('click', false)"
          >
            Keep Current Email
          </button>
        </div>
      </div>
    </div>
  </div>
</template>