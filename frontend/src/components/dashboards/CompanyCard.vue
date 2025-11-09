<script setup lang="ts">
import { withDefaults } from 'vue'
import { useRouter } from 'vue-router'
import defaultCompany from '@/assets/images/defaultCompany.png'

const props = withDefaults(defineProps<{
  companyName?: string
  jobCount?: number
  profilePhoto?: string
}>(), {
  companyName: 'Unknown Company',
  jobCount: 0,
  profilePhoto: ''
})

const router = useRouter()

const viewJob = () => {
  const name = props.companyName ?? ''
  router.push({ path: '/explore-job', query: { company: String(name) } })
}
</script>

<template>
  <article @click="viewJob"
    class="w-full bg-[#F4F4F4] border point cursor-pointer border-gray-200 shadow-sm rounded-2xl p-5 hover:shadow-md transition-all duration-200 flex items-center gap-4 flex-col"
  >
    <img
      :src="props.profilePhoto || defaultCompany"
      alt="company"
      class="w-[6rem] h-[6rem] rounded-full object-cover"
    />

    <div class="flex flex-col items-center">
      <p class="font-medium text-center line-clamp-1 hover:line-clamp-none transition-all">{{ props.companyName }}</p>
      <p class="mt-2 rounded-[10px] px-4 py-1 bg-[#88BFFF] text-white text-sm">{{ props.jobCount }} job<span v-if="props.jobCount !== 1">s</span></p>
    </div>

  </article>
</template>