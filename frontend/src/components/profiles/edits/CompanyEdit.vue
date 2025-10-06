<script setup lang="ts">
import { ref, watch } from 'vue'
import type { CompanyProfile } from '@/types/profileType';
import { Building2Icon, X } from 'lucide-vue-next'
import { ProfileStyle } from '@/configs/profileStyleConfig';
import { industryOptions, companySizeOptions } from '@/configs/EditProfileConfig';

const props = defineProps<{ modelValue: CompanyProfile }>()
const emit = defineEmits<{
  (e: 'update:modelValue', data: CompanyProfile): void
}>()

const editForm = ref<CompanyProfile>(JSON.parse(JSON.stringify(props.modelValue)))
const workFieldInput = ref('')

// Work fields (specialties) handling
const addWorkField = () => {
  if (workFieldInput.value.trim() && !editForm.value.workFields.includes(workFieldInput.value.trim())) {
    editForm.value.workFields = [...editForm.value.workFields, workFieldInput.value.trim()]
  }
  workFieldInput.value = ''
}

const removeWorkField = (index: number) => {
  editForm.value.workFields = editForm.value.workFields.filter((_, i) => i !== index)
}

watch(
  editForm,
  (newVal) => {
    emit('update:modelValue', newVal)
  },
  { deep: true }
)

</script>

<template>
  <div class="text-base">
    <!-- Company Overview Section -->
    <section
      class="bg-white p-8 md:p-12 rounded-xl w-full ring-1 ring-[#B1B1B1] ring-inset shadow-md"
    >
      <div class="flex items-center gap-x-4">
        <div class="w-12 h-12 shrink-0 flex items-center justify-center bg-orange-500 rounded-full text-white">
          <Building2Icon />
        </div>
        <p class="text-2xl font-bold">Company Overview</p>
      </div>

      <div class="bg-white mt-4 py-6 w-full">
        <div class="space-y-4">
          
          <!-- Website URL -->
          <div>
            <label :class="ProfileStyle.formLabel">
              Website URL
              <span class="text-sm text-gray-500">
                (Optional)
              </span>
            </label>
            <input
              v-model="editForm.website"
              type="url"
              :class="ProfileStyle.inputBox"
              placeholder="https://example.com"
            />
          </div>

          <!-- Industry -->
          <div>
            <label :class="ProfileStyle.formLabel">
              Industry
              <span v-if="!editForm.industry?.trim()" :class="ProfileStyle.errorText">
                (This field is required)
              </span>
            </label>
            <select
              v-model="editForm.industry"
              :class="[
                ProfileStyle.inputBox,
                !editForm.industry?.trim()
                  ? ProfileStyle.errorBox
                  : 'focus:ring-blue-500'
              ]"
            >
              <option value="">Select an industry</option>
              <option class="px-3" v-for="option in industryOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>

          <!-- Company Size -->
          <div>
            <label :class="ProfileStyle.formLabel">
              Company Size
              <span v-if="!editForm.size?.trim()" :class="ProfileStyle.errorText">
                (This field is required)
              </span>
            </label>
            <select
              v-model="editForm.size"
              :class="[
                ProfileStyle.inputBox,
                !editForm.size?.trim()
                  ? ProfileStyle.errorBox
                  : 'focus:ring-blue-500'
              ]"
            >
              <option value="">Select company size</option>
              <option v-for="option in companySizeOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>

          <!-- Primary Location -->
          <div>
            <label :class="ProfileStyle.formLabel">
              Primary Location
              <span v-if="!editForm.fullLocation?.trim()" :class="ProfileStyle.errorText">
                (This field is required)
              </span>
            </label>
            <input
              v-model="editForm.fullLocation"
              type="text"
              :class="[
                ProfileStyle.inputBox,
                !editForm.fullLocation?.trim() ? ProfileStyle.errorBox : ''
              ]"
              placeholder="e.g., San Francisco, CA, USA"
            />
          </div>

          <!-- Specialties (Work Fields) -->
          <div>
            <label :class="ProfileStyle.formLabel">
              Specialties
              <span v-if="editForm.workFields.length === 0" :class="ProfileStyle.errorText">
                (At least one specialty is required)
              </span>
            </label>
            <div class="flex gap-2 mb-2">
              <input
                v-model="workFieldInput"
                @keyup.enter="addWorkField"
                type="text"
                :class="[
                  ProfileStyle.inputBox, editForm.workFields.length === 0 ? ProfileStyle.errorBox : ''
                ]"
                placeholder="Add a specialty (press Enter)"
              />
              <button
                @click="addWorkField"
                class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
              >
                Add
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="(field, index) in editForm.workFields"
                :key="index"
                class="flex items-center gap-1 px-4 py-1 bg-orange-100 text-orange-800 rounded-full"
              >
                <span class="text-sm">{{ field }}</span>
                <button
                  @click="removeWorkField(index)"
                  class="hover:bg-200 rounded-full transition-colors"
                >
                  <X class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
      
          <div>
            <label :class="ProfileStyle.formLabel">
              About
              <span v-if="!editForm.about?.trim()" :class="ProfileStyle.errorText">
                (This field is required)
              </span>
            </label>

            <textarea
              v-model="editForm.about"
              rows="6"
              :class="[
                ProfileStyle.inputBox,
                !editForm.about?.trim()
                  ? ProfileStyle.errorBox 
                  : 'focus:ring-blue-500'
              ]"
              placeholder="Tell us about your company, mission, and values..."
            ></textarea>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>