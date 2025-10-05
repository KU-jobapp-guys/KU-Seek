<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ProfessorProfile } from '@/types/professorType'
import { Building2Icon } from 'lucide-vue-next'


const props = defineProps<{ modelValue: ProfessorProfile }>()
const emit = defineEmits<{
  (e: 'update:modelValue', data: ProfessorProfile): void
}>()


// Configuration for overview fields
const overviewFields = [
  { key: 'department', label: 'Department', placeholder: 'e.g., Computer Science', required: true },
  { key: 'position', label: 'Academic Position', placeholder: 'e.g., Associate Professor', required: true },
  { key: 'office_location', label: 'Office Location', placeholder: 'e.g., Building A, Room 301', required: true },
  { key: 'research_interest', label: 'Research Interest', placeholder: 'e.g., Machine Learning, AI', required: true }
]

type OverviewFieldKey = 'department' | 'position' | 'office_location' | 'research_interest'

const editForm = ref<ProfessorProfile>({ ...props.modelValue })

const updateData = <K extends keyof ProfessorProfile>(field: K, value: ProfessorProfile[K]) => {
  editForm.value[field] = value
  emit('update:modelValue', editForm.value)
}

// Create a dynamic computed model factory
const createFieldModel = <K extends keyof ProfessorProfile>(field: K) => {
  return computed({
    get: () => editForm.value[field],
    set: (value: ProfessorProfile[K]) => updateData(field, value)
  })
}

</script>

<template>
  <div class="text-base">
    <!-- Overview Section -->
    <section
      class="bg-white p-8 md:p-12 rounded-xl w-full ring-1 ring-[#B1B1B1] ring-inset shadow-md"
    >
      <div class="flex items-center gap-x-2">
        <div class="w-12 h-12 flex items-center justify-center bg-green-600 rounded-full text-white">
        <Building2Icon />
      </div>
        <p class="text-2xl font-bold">Overview</p>
      </div>

      <div class="bg-white mt-4 px-4 py-6 w-full">
        <div class="space-y-4">
          <!-- Overview Fields -->
          <div v-for="field in overviewFields" :key="field.key">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ field.label }}
              <span 
                v-if="field.required && editForm[field.key as OverviewFieldKey]?.trim() === ''" 
                class="error-form text-sm text-red-500"
              >
                (This field is required)
              </span>
            </label>
            <input
              v-model="createFieldModel(field.key as OverviewFieldKey).value"
              type="text"
              :class="[
                'w-full p-3 border rounded-md focus:outline-none focus:ring-2',
                field.required && editForm[field.key as OverviewFieldKey]?.trim() === ''
                  ? 'focus:ring-red-500 focus:border-0 border-red-500' 
                  : 'focus:ring-blue-600 border-gray-300'
              ]"
              :placeholder="field.placeholder"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              About
              <span 
                v-if="editForm['about']?.trim() === ''" 
                class="error-form text-sm text-red-500"
              >
                (This field is required)
              </span>
            </label>
            <textarea
              v-model="createFieldModel('about').value"
              rows="6"
              :class="[
                'w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2',
                editForm.about?.trim() === '' 
                  ? 'focus:ring-red-500 focus:border-0 border-red-500' 
                  : 'focus:ring-blue-500'
              ]"
              placeholder="Tell us about yourself, your background, and your expertise..."
            ></textarea>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>