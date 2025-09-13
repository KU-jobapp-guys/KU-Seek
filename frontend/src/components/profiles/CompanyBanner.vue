<script setup lang="ts">
import { PenBoxIcon } from 'lucide-vue-next';
import type { Company } from '@/types/companyType';
import { useRouter } from 'vue-router';

const router = useRouter()
const props = defineProps<{ companyData: Company }>()
const { companyData } = props

const isOwner = companyData.id === '1'

const goToJobBoard = () => {
  router.push({
    name: 'job board',
    query: { company: companyData.name }
  })
}

</script>

<template>
  <section class="profile rounded-xl overflow-hidden shadow-xl">
    
    <div class="h-[32vh] relative bg-gray-500 w-full object-cover overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-black/0 z-10"></div>
      <img :src="companyData.bannerPhoto" class="absolute z-0 w-full h-full object-cover" alt="Company Banner" />
    </div>

    <div ref="containerRef" class="relative bg-gradient-to-b from-blue-800/20 ring-1 ring-[#B1B1B1] ring-inset to-white px-12 py-8">
      <div class="absolute z-20 -top-20 w-[10vw] h-[10vw] p-3 min-w-[160px] min-h-[160px] rounded-full bg-gradient-to-b from-blue-900 to-blue-500 shadow-md">
        <img
          ref="profileImageRef"
          :src="companyData.profilePhoto"
          class="rounded-full w-full h-full bg-black"
          alt="Company Profile"
        />
      </div>

      <div class="w-full h-8 flex justify-end">
        <PenBoxIcon v-if="isOwner" class="h-8 w-8" :stroke-width="1.5"/>
      </div>

      <div class="flex flex-col gap-y-4 md:flex-row md:justify-between md:items-end w-full mt-12 xl:mt-20">
        <div>
          <h1 class="font-semibold text-4xl">{{ companyData.name }}</h1>
          <p class="font-medium">{{ companyData.type }}</p>
          <p>{{ companyData.location }}</p>
        </div>

        <button
          class="bg-gray-400 hover:bg-gray-500 text-white px-8 py-1 rounded-md"
          @click="goToJobBoard"
        >
          See Jobs
        </button>
      </div>
    </div>

    <div class="w-full h-4 bg-gradient-to-r from-blue-600 via-blue-800 to-purple-500"></div>
  </section>
</template>