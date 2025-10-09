<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import JobApplicationForm from '@/components/JobApplication/JobApplicationForm.vue'

const route = useRoute()

onMounted(() => {
  window.scrollTo({ top: 0 })
})
</script>

<template>
  <div class="px-[8vw] md:px-[12vw] mt-24">
    <JobApplicationForm :jobId="route.params.id as string" />
  </div>
</template>
