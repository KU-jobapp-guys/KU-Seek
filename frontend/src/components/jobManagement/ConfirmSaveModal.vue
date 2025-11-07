<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle, XCircle, X } from 'lucide-vue-next'

const { changes, applicants } = defineProps<{
  changes: Map<number, 'pending' | 'approved' | 'rejected'>
  applicants: Map<number, { name: string }>
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

const totalChanges = computed(
  () => groupedChanges.value.approved.length + groupedChanges.value.rejected.length,
)

const emit = defineEmits<{
  (e: 'handleModalClick', status: 'save' | 'cancel'): void
}>()
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center z-50 p-4">
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      @click="emit('handleModalClick', 'cancel')"
    ></div>

    <!-- Modal Content -->
    <div class="relative bg-white/95 backdrop-blur-xl rounded-lg shadow-2xl z-50 max-w-xl w-full border border-gray-200/50 overflow-hidden">
      <button
        @click="emit('handleModalClick', 'cancel')"
        class="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors duration-200 group"
      >
        <X class="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
      </button>
      
      <div class="px-8 pt-8 pb-6 relative border-b border-gray-300">
        <div class="absolute top-0 left-0 right-0 h-2 bg-gray-300"/>

        <h3 class="text-2xl font-bold text-gray-900 mb-3">
          Update Applicants Status
        </h3>

        <p class="text-gray-600 text-sm">
          You're about to update the status of {{ totalChanges }} applicant<span v-if="totalChanges > 1">s</span>.
        </p>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        
        <!-- Approved Section -->
        <div v-if="groupedChanges.approved.length > 0">
          <div class="flex items-center gap-2 mb-3">
            <div class="p-1.5 bg-green-100 rounded-lg">
              <CheckCircle class="w-5 h-5 text-green-600" />
            </div>
            <h4 class="font-semibold text-gray-900">
              Approved
              <span class="text-sm font-normal text-gray-500 ml-1">
                ({{ groupedChanges.approved.length }})
              </span>
            </h4>
          </div>
          <div class="space-y-2 max-h-[20vh]">
            <div
              v-for="applicant in groupedChanges.approved"
              :key="applicant.id"
              class="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-gray-700"
            >
              {{ applicant.name }}
            </div>
          </div>
        </div>

        <!-- Rejected Section -->
        <div v-if="groupedChanges.rejected.length > 0">
          <div class="flex items-center gap-2 mb-3">
            <div class="p-1.5 bg-red-100 rounded-lg">
              <XCircle class="w-5 h-5 text-red-600" />
            </div>
            <h4 class="font-semibold text-gray-900">
              Rejected
              <span class="text-sm font-normal text-gray-500 ml-1">
                ({{ groupedChanges.rejected.length }})
              </span>
            </h4>
          </div>

          <div class="space-y-2 max-h-[20vh] overflow-y-auto">
            <div
              v-for="applicant in groupedChanges.rejected"
              :key="applicant.id"
              class="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-gray-700"
            >
              {{ applicant.name }}
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
        <div class="flex gap-3 justify-end">
          <button
            class="px-5 py-2.5 text-gray-700 font-medium rounded-lg bg-gray-200 hover:bg-gray-100 transition-colors"
            @click="emit('handleModalClick', 'cancel')"
          >
            Cancel
          </button>

          <button
            class="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            @click="emit('handleModalClick', 'save')"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
