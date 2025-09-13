<script setup lang="ts">
import { PenBoxIcon } from 'lucide-vue-next';
import type { Company } from '@/types/companyType';
import { useRouter } from 'vue-router';

const router = useRouter()
const props = defineProps<{ companyData: Company }>()
const { companyData } = props

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

    <div ref="containerRef" class="relative bg-gradient-to-b from-green-800/20 ring-1 ring-[#B1B1B1] ring-inset to-white px-12 py-8">
      <img
        ref="profileImageRef"
        :src="companyData.profilePhoto"
        class="absolute z-20 -top-20 ring-8 w-[10vw] h-[10vw] min-w-[160px] min-h-[160px] ring-gray-400 ring-offset-0 bg-black rounded-full shadow-md"
        alt="Company Profile"
      />

      <div class="w-full flex justify-end">
        <PenBoxIcon class="h-8 w-8" :stroke-width="1.5"/>
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

    <div class="w-full h-4 bg-gradient-to-r from-green-600 to-green-800"></div>
  </section>
</template>