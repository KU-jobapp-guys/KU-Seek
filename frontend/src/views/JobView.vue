<script setup lang="ts">
import { useRoute } from 'vue-router'
import JobFull from '@/components/jobBoard/JobFull.vue'
import { onMounted, ref } from 'vue'
import JobEdit from '@/components/jobBoard/JobEdit.vue'

const route = useRoute()
const isEditing = ref(false)

const startEditing = () => {
  isEditing.value = true
}

const stopEditing = () => {
  isEditing.value = false
}

onMounted(() => {
  window.scrollTo({ top: 0 })
})
</script>

<template>
  <div class="px-[6vw] md:px-[12vw] mt-24">
    <JobFull v-if="!isEditing" :jobId="route.params.id as string" @edit="startEditing" />
    <JobEdit v-else :jobId="route.params.id as string" @close="stopEditing" />
  </div>
</template>
