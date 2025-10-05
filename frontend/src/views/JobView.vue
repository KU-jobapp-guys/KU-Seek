<script setup lang="ts">
import { useRoute } from 'vue-router'
import JobFull from '@/components/jobBoard/JobFull.vue'
import { onMounted } from 'vue'

const route = useRoute()

onMounted(() => {
  window.scrollTo({ top: 0 })
})
</script>

<template>
  <div class="px-[8vw] md:px-[12vw] mt-24">
    <JobFull :jobId="route.params.id as string" />
  </div>
</template>
