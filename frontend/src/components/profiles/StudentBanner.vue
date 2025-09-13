<script setup lang="ts">
import { PenBoxIcon, CircleCheck } from 'lucide-vue-next'
import type { StudentProfile } from '@/types/studentType'
import { ref, computed, watch } from 'vue'

const props = defineProps<{ studentData: StudentProfile }>()
const { studentData } = props
const emits = defineEmits<{ (e: 'loaded'): void }>()

const isOwner = studentData.user_id === '2'

const bannerLoaded = ref(false)
const profileLoaded = ref(false)
const isFullyLoaded = computed(() => bannerLoaded.value && profileLoaded.value)

watch(isFullyLoaded, (newValue) => {
  console.log('status: ', isFullyLoaded)
  if (newValue) {
    emits('loaded')
  }
})
</script>

<template>
  <section class="profile rounded-xl overflow-hidden shadow-xl">
    <div class="h-[32vh] relative bg-gray-500 w-full object-cover overflow-hidden">
      <div
        class="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-black/0 z-10"
      ></div>
      <img
        :src="studentData.banner_img"
        class="absolute z-0 w-full h-full object-cover"
        alt="Student Banner"
        @load="bannerLoaded = true"
      />
    </div>

    <div
      ref="containerRef"
      class="relative bg-gradient-to-b from-green-800/20 ring-1 ring-[#B1B1B1] ring-inset to-white px-12 py-8"
    >
      <div
        class="absolute z-20 -top-20 w-[10vw] h-[10vw] p-3 min-w-[160px] min-h-[160px] rounded-full bg-gradient-to-b from-green-900 to-green-500 shadow-md"
      >
        <img
          ref="profileImageRef"
          :src="studentData.profile_img"
          @load="profileLoaded = true"
          class="rounded-full w-full h-full bg-black"
          alt="Student Profile"
        />
      </div>

      <div class="w-full h-8 flex justify-end">
        <PenBoxIcon
          v-if="isOwner"
          class="h-8 w-8 hover:text-gray-700 hover:cursor-pointer"
          :stroke-width="1.5"
        />
      </div>

      <div class="flex w-full justify-between items-end">
        <div class="flex flex-col w-full mt-12 xl:mt-20">
          <h1 class="flex flex-col md:flex-row md:items-end">
            <span class="font-bold text-4xl mr-2">{{
              studentData.first_name + ' ' + studentData.last_name
            }}</span>
            <p class="font-semibold">({{ studentData.gender }}, {{ studentData.age }})</p>
          </h1>
          <p>{{ studentData.location }}</p>
        </div>

        <div class="flex items-center gap-2">
          <div
            v-if="studentData.is_verified"
            class="flex items-center gap-x-2 bg-green-600 text-white px-2 md:px-4 py-2 rounded-full"
          >
            <p class="hidden md:block">Verified</p>
            <CircleCheck />
          </div>

          <button
            v-if="isOwner && !studentData.is_verified"
            class="bg-gray-400 text-white px-4 py-2 rounded-full whitespace-nowrap hover:bg-gray-600/60"
          >
            Verify Account
          </button>
        </div>
      </div>
    </div>

    <div class="w-full h-4 bg-gradient-to-r from-green-600 to-green-800"></div>
  </section>
</template>
