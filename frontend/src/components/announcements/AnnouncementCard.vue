<script setup lang="ts">
type Announcement = {
  id: number
  professor: string
  company: string
  title: string
  description: string
  role: string
  department: string
  category: string
  tags: string[]
}

defineProps<{ announcement: Announcement }>()
</script>

<template>
  <article class="bg-white rounded-xl shadow p-5 border border-gray-200 hover:shadow-md transition">
    <div class="flex justify-between items-start">
      <div>
        <!-- Show professor and company distinctly -->
        <h3 class="font-bold text-green-700">
          {{ announcement.professor }}
          <span class="font-bold text-black"> & </span>
          <span class="font-bold text-blue-700">{{ announcement.company }}</span>
        </h3>
        <p class="text-sm text-gray-500">{{ announcement.role }} · {{ announcement.department }}</p>
      </div>
    </div>

    <h4 class="mt-3 font-semibold text-lg">{{ announcement.title }}</h4>
    <p class="text-gray-600 mt-1 text-sm">{{ announcement.description }}</p>

    <div class="flex gap-2 mt-3 flex-wrap">
      <span
        v-for="tag in announcement.tags"
        :key="tag"
        class="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-medium"
      >
        {{ tag }}
      </span>
    </div>
  </article>
</template>
