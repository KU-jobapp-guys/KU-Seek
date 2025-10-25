<script setup lang="ts">
import { computed } from 'vue'
import { Save, X } from 'lucide-vue-next'

const { changes, applicants } = defineProps<{
  changes: Map<number, 'pending' | 'approved' | 'rejected'>
  applicants: Map<number, { name: string }> // Add applicants map with id -> name
}>()

const groupedChanges = computed(() => {
  const approved: Array<{ id: number; name: string }> = []
  const rejected: Array<{ id: number; name: string }> = []

  Array.from(changes.entries()).forEach(([id, status]) => {
    const applicant = applicants.get(id)
    if (applicant) {
      if (status === 'approved') {
        approved.push({ id, name: applicant.name })
      } else if (status === 'rejected') {
        rejected.push({ id, name: applicant.name })
      }
    }
  })

  return { approved, rejected }
})

const emit = defineEmits<{
  (e: 'handleModalClick', status: 'save' | 'cancel'): void
}>()
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="relative bg-white rounded-lg overflow-y-auto shadow-lg z-50 max-w-2xl w-full mx-4">
      <X
        class="absolute text-gray-500 top-4 right-4 cursor-pointer hover:text-gray-600"
        @click="emit('handleModalClick', 'cancel')"
      />

      <!-- Modal Header -->
      <div class="flex flex-col items-center p-4 border-b gap-y-4 mt-8">
        <div class="h-24 w-24 shrink-0 bg-gray-400 rounded-full p-4">
          <Save stroke-width="1.5" class="inline-block w-full h-full text-white" />
        </div>
        <h3 class="text-2xl font-semibold">Are you sure you want to save these changes?</h3>
      </div>

      <!-- Modal Content -->
      <div class="p-4 max-h-96 overflow-y-auto max-h-[30vh]">
        <!-- Approved Applicants -->
        <div v-if="groupedChanges.approved.length > 0" class="mb-4">
          <h4 class="font-medium mb-2 gap-x-2 flex items-center text-green-700">
            Approved ({{ groupedChanges.approved.length }})
          </h4>
          <ul class="space-y-1">
            <li
              v-for="applicant in groupedChanges.approved"
              :key="applicant.id"
              class="text-sm border-2 border-green-500 rounded-md px-3 py-2"
            >
              {{ applicant.name }}
            </li>
          </ul>
        </div>

        <!-- Rejected Applicants -->
        <div v-if="groupedChanges.rejected.length > 0" class="mb-4">
          <h4 class="font-medium mb-2 text-red-700">
            Rejected ({{ groupedChanges.rejected.length }})
          </h4>
          <ul class="space-y-1">
            <li
              v-for="applicant in groupedChanges.rejected"
              :key="applicant.id"
              class="text-sm border-2 border-red-300 rounded-md px-3 py-2"
            >
              {{ applicant.name }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="p-4 border-t flex justify-center gap-2">
        <button
          class="bg-gray-400 rounded-lg px-4 py-2 text-white hover:cursor-pointer hover:bg-gray-500"
          @click="emit('handleModalClick', 'cancel')"
        >
          Cancel
        </button>
        <button
          class="bg-blue-500 rounded-lg px-4 py-2 text-white hover:cursor-pointer hover:bg-blue-600"
          @click="emit('handleModalClick', 'save')"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>
