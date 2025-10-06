<script setup lang="ts">
import customizeProfile from '@/assets/images/customizeProfile.png'

const props = defineProps<{
  isOwner: boolean
}>()

const { isOwner } = props

const emit = defineEmits<{
  (e: 'edit'): void
}>()
</script>

<template>
  <section class="w-full mt-24">
    <div v-if="isOwner" class="flex flex-col items-center justify-center gap-y-2">
      <img :src="customizeProfile" class="w-32 h-32" />
      <p class="text-2xl font-bold">Your profile isn’t set up yet</p>
      <button 
        @click="emit('edit')"
        class="text-white px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
      >
        Create your profile
      </button>
    </div>
    <div v-else class="flex flex-col items-center justify-center gap-y-2">
      <p class="text-2xl font-bold text-gray-500">This account hasn’t set up their profile yet.</p>
    </div>
  </section>
</template>
