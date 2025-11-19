<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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

const token = localStorage.getItem('user_jwt') ?? localStorage.getItem('access_token')

const headers: Record<string, string> = {}

const profileRealImg = ref<string | null>(null)
let objectUrl: string | null = null
if (token) {
  headers['access_token'] = token
}

onMounted(async () => {
  try {
    const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
    const res = await fetch(`${base}/api/v1/file/${props.profilePhoto}`, {
      method: 'GET',
      headers,
      credentials: 'include'
    })
    if (res.ok) {
      const contentType = res.headers.get('content-type') ?? ''
      // hope this work
      if (contentType.startsWith('image/')) { 
        const blob = await res.blob()
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl)
          objectUrl = null
        }
        objectUrl = URL.createObjectURL(blob)
        profileRealImg.value = objectUrl
      } else if (contentType.includes('application/json')) {
        const data = await res.json()
        profileRealImg.value = (data.url ?? data.fileUrl ?? null) as string | null
      } else {
        const text = await res.text()
        profileRealImg.value = text && (text.startsWith('http') || text.startsWith('data:')) ? text : null
      }
    } else {
      console.error('Failed to fetch companies', res.status, await res.text())
    }
  } catch (err) {
    console.error('Error fetching companies', err)
  }
})

onUnmounted(() => {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl)
    objectUrl = null
  }
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
      :src="profileRealImg || defaultCompany"
      alt="company"
      class="w-[6rem] h-[6rem] rounded-full object-cover"
    />

    <div class="flex flex-col items-center">
      <p class="font-medium text-center line-clamp-1 hover:line-clamp-none transition-all">{{ props.companyName }}</p>
      <p class="mt-2 rounded-[10px] px-4 py-1 bg-[#88BFFF] text-white text-sm">{{ props.jobCount }} job<span v-if="props.jobCount !== 1">s</span></p>
    </div>

  </article>
</template>