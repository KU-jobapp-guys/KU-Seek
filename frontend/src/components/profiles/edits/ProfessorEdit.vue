<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ProfessorProfile } from '@/types/profileType'
import type { OverviewFieldKey } from '@/configs/EditProfileConfig'
import { OverviewFields } from '@/configs/EditProfileConfig'
import { Building2Icon } from 'lucide-vue-next'
import { ProfileStyle } from '@/configs/profileStyleConfig'

const props = defineProps<{ modelValue: ProfessorProfile }>()
const emit = defineEmits<{
  (e: 'update:modelValue', data: ProfessorProfile): void
}>()

const editForm = ref<ProfessorProfile>(JSON.parse(JSON.stringify(props.modelValue)))

watch(
  editForm,
  (newVal) => {
    emit('update:modelValue', newVal)
  },
  { deep: true },
)
</script>

<template>
  <div class="text-base">
    <!-- Overview Section -->
    <section
      class="bg-white p-8 md:p-12 rounded-xl w-full ring-1 ring-[#B1B1B1] ring-inset shadow-md"
    >
      <div class="flex items-center gap-x-2">
        <div
          class="w-12 h-12 flex items-center justify-center bg-green-600 rounded-full text-white"
        >
          <Building2Icon />
        </div>
        <p class="text-2xl font-bold">Overview</p>
      </div>

      <div class="bg-white mt-4 px-4 py-6 w-full">
        <div class="space-y-4">
          <!-- Overview Fields -->
          <div v-for="field in OverviewFields" :key="field.key">
            <label :class="ProfileStyle.formLabel">
              {{ field.label }}
              <span
                v-if="editForm[field.key as OverviewFieldKey]?.trim() === ''"
                :class="ProfileStyle.errorText"
              >
                (This field is required)
              </span>
            </label>
            <input
              v-model="editForm[field.key as OverviewFieldKey]"
              type="text"
              :class="[
                ProfileStyle.inputBox,
                editForm[field.key as OverviewFieldKey]?.trim() === ''
                  ? ProfileStyle.errorBox
                  : 'focus:ring-blue-600 border-gray-300',
              ]"
              :placeholder="field.placeholder"
            />
          </div>

          <div>
            <label :class="ProfileStyle.formLabel">
              About
              <span v-if="editForm['about']?.trim() === ''" :class="ProfileStyle.errorText">
                (This field is required)
              </span>
            </label>
            <textarea
              v-model="editForm.about"
              rows="6"
              :class="[
                'w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2',
                editForm.about?.trim() === '' ? ProfileStyle.errorBox : 'focus:ring-blue-500',
              ]"
              placeholder="Tell us about yourself, your background, and your expertise..."
            ></textarea>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
