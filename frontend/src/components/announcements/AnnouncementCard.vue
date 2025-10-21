<script setup lang="ts">
defineProps<{
  professor: string
  professorPosition: string
  department: string
  company: string
  companyIndustry: string
  tags: string[]
}>()
</script>

<template>
  <div
    class="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all duration-200"
  >
    <div class="space-y-2">
      <h2 class="text-lg font-semibold text-gray-800">{{ professor }} &amp; {{ company }}</h2>

      <p class="text-sm text-gray-600">
        {{ professorPosition }} ({{ department }}) · {{ companyIndustry }}
      </p>

      <div class="flex flex-wrap gap-2 mt-2">
        <span
          v-for="tag in tags"
          :key="tag"
          class="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
