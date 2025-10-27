<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { PenBoxIcon, Camera } from 'lucide-vue-next'
import type { Profile } from '@/types/profileType'
import { isOwner } from '@/libs/userUtils'
import { profileConfig } from '@/configs/profileRoleConfig'
import defaultProfile from '@/assets/images/defaultProfile.png'
import defaultBanner from '@/assets/images/defaultBanner.png'

const emits = defineEmits<{
  (e: 'loaded'): void
  (e: 'edit'): void
  (e: 'update:modelValue', data: Profile): void
}>()

const props = defineProps<{
  modelValue: Profile
  data: Profile
  role: 'company' | 'student' | 'professor'
  isEditing: boolean
}>()

const { data, role } = props
const editForm = ref<Profile>({ ...props.modelValue })

const bannerLoaded = ref(false)
const profileLoaded = ref(false)
const isFullyLoaded = computed(() => bannerLoaded.value && profileLoaded.value)
const profileClass = computed(() => profileConfig[role])

const bannerPreview = ref<string | null>(null)
const profilePreview = ref<string | null>(null)

watch(isFullyLoaded, (newValue) => {
  if (newValue) emits('loaded')
})

watch(
  editForm,
  (newVal) => {
    emits('update:modelValue', newVal)
  },
  { deep: true },
)

const handleImageChange = (e: Event, field: 'bannerPhoto' | 'profilePhoto') => {
  if (!editForm.value) return

  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  const previewUrl = URL.createObjectURL(file)
  if (field === 'bannerPhoto') {
    bannerPreview.value = previewUrl
    editForm.value.bannerPhoto = previewUrl
  } else {
    profilePreview.value = previewUrl
    editForm.value.profilePhoto = previewUrl
  }

  emits('update:modelValue', { ...editForm.value })
}
</script>

<template>
  <section class="profile rounded-xl overflow-hidden shadow-xl">
    <!-- Banner Image -->
    <div class="h-[32vh] relative bg-gray-500 w-full overflow-hidden group">
      <div
        class="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-black/0 z-10"
      ></div>
      <img
        :src="bannerPreview || data.bannerPhoto || defaultBanner"
        class="absolute z-0 w-full h-full object-cover"
        alt="Banner"
        loading="lazy"
        @load="bannerLoaded = true"
        @error="bannerLoaded = true"
      />

      <!-- Upload banner overlay -->
      <label
        v-if="isOwner(data.id) && isEditing"
        class="absolute top-3 right-3 z-20 bg-black/50 text-white p-2 rounded-lg transition cursor-pointer flex items-center gap-1"
      >
        <Camera class="w-4 h-4" /> Change banner
        <input
          type="file"
          accept="image/*"
          class="hidden"
          @change="(e) => handleImageChange(e, 'bannerPhoto')"
        />
      </label>
    </div>

    <div
      class="relative ring-1 ring-[#B1B1B1] ring-inset px-8 md:px-12 py-8"
      :class="props.isEditing ? 'bg-gradient-to-b from-gray-800/20 to-white' : profileClass.base"
    >
      <!-- Profile Image -->
      <div
        class="absolute z-20 -top-20 w-[10vw] h-[10vw] p-3 min-w-[160px] min-h-[160px] rounded-full shadow-md group"
        :class="
          props.isEditing ? 'bg-gradient-to-b from-gray-400 to-gray-300' : profileClass.border
        "
      >
        <img
          :src="profilePreview || data.profilePhoto || defaultProfile"
          class="rounded-full w-full h-full object-cover bg-black"
          alt="Profile"
          @load="profileLoaded = true"
          @error="profileLoaded = true"
        />

        <!-- Upload profile overlay -->
        <label
          v-if="isOwner(data.id) && isEditing"
          class="absolute inset-0 bg-black/40 text-white flex items-center justify-center rounded-full transition cursor-pointer"
        >
          <Camera class="w-6 h-6" />
          <input
            type="file"
            accept="image/*"
            class="hidden"
            @change="(e) => handleImageChange(e, 'profilePhoto')"
          />
        </label>
      </div>

      <!-- Edit icon -->
      <div class="w-full h-8 flex justify-end">
        <PenBoxIcon
          v-if="isOwner(data.id)"
          :class="[
            'h-8 w-8',
            isEditing ? 'text-gray-500' : 'hover:text-gray-500 hover:cursor-pointer',
          ]"
          :stroke-width="1.5"
          @click="emits('edit')"
        />
      </div>

      <!-- Slot for extra content -->
      <div
        class="flex flex-col gap-y-4 md:flex-row md:justify-between md:items-end w-full mt-12 xl:mt-20"
      >
        <slot />
      </div>
    </div>

    <div
      class="w-full h-4"
      :class="
        props.isEditing
          ? 'bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500'
          : profileClass.bar
      "
    ></div>
  </section>
</template>
