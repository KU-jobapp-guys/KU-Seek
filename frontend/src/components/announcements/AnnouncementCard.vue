<script setup lang="ts">
import { Building2, GraduationCap } from 'lucide-vue-next'

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
  <article
    class="bg-white border border-gray-200 shadow-sm rounded-2xl p-5 hover:shadow-md transition-all duration-200"
  >
    <!-- Top section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <h2 class="text-lg font-semibold text-green-700">
        {{ professor }}
        <span class="text-gray-700 font-normal">&amp;&nbsp;</span>
        <span class="text-blue-700 font-semibold">{{ company }}</span>
      </h2>
    </div>

    <!-- Middle details -->
    <div class="mt-2 text-sm text-gray-700 flex flex-col gap-1">
      <p class="flex items-center gap-2">
        <GraduationCap class="w-4 h-4 text-green-600" />
        <span class="font-medium">{{ professorPosition }}</span>
        <span class="text-gray-500">({{ department }})</span>
      </p>

      <p class="flex items-center gap-2">
        <Building2 class="w-4 h-4 text-blue-600" />
        <span>{{ companyIndustry }}</span>
      </p>
    </div>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2 mt-3">
      <span
        v-for="tag in tags"
        :key="tag"
        class="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium"
      >
        {{ tag }}
      </span>
    </div>
  </article>
</template>
