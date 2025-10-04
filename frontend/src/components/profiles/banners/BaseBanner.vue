<script setup lang="ts">
import { PenBoxIcon } from 'lucide-vue-next'
import type { Company } from '@/types/companyType'
import type { StudentProfile } from '@/types/studentType'
import type { ProfessorProfile } from '@/types/professorType'
import { ref, computed, watch } from 'vue'
import { profileConfig } from '@/configs/profileRoleConfig'

const emits = defineEmits<{ (e: 'loaded'): void }>()
const props = defineProps<{
  data: Company | StudentProfile | ProfessorProfile
  role: 'company' | 'student' | 'professor'
}>()
const { data, role } = props

const isOwner = data.id === '1'
const bannerLoaded = ref(false)
const profileLoaded = ref(false)
const isFullyLoaded = computed(() => bannerLoaded.value && profileLoaded.value)

const profileClass = computed(() => profileConfig[role])

watch(isFullyLoaded, (newValue) => {
  console.log('status: ', isFullyLoaded)
  if (newValue) {
    emits('loaded')
  }
})
</script>

<template>
  <section class="profile rounded-xl overflow-hidden shadow-xl">
    <!-- Banner Image -->
    <div class="h-[32vh] relative bg-gray-500 w-full object-cover overflow-hidden">
      <div
        class="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-black/0 z-10"
      ></div>
      <img
        :src="data.bannerPhoto"
        class="absolute z-0 w-full h-full object-cover"
        alt="Banner"
        loading="lazy"
        @load="bannerLoaded = true"
        @error="bannerLoaded = true"
      />
    </div>

    <div
      class="relative ring-1 ring-[#B1B1B1] ring-inset px-8 md:px-12 py-8"
      :class="profileClass.base"
    >
      <!-- Profile Image -->
      <div
        class="absolute z-20 -top-20 w-[10vw] h-[10vw] p-3 min-w-[160px] min-h-[160px] rounded-full shadow-md"
        :class="profileClass.border"
      >
        <img
          :src="data.profilePhoto"
          class="rounded-full w-full h-full bg-black"
          alt="Profile"
          @load="profileLoaded = true"
          @error="profileLoaded = true"
        />
      </div>

      <!-- Edit icon -->
      <div class="w-full h-8 flex justify-end">
        <PenBoxIcon
          v-if="isOwner"
          class="h-8 w-8 hover:text-gray-500 hover:cursor-pointer"
          :stroke-width="1.5"
        />
      </div>

      <!-- Slot for extra content -->
      <div
        class="flex flex-col gap-y-4 md:flex-row md:justify-between md:items-end w-full mt-12 xl:mt-20"
      >
        <slot />
      </div>
    </div>

    <div class="w-full h-4" :class="profileClass.bar"></div>
  </section>
</template>
