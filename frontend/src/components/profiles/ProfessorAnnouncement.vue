<script setup lang="ts">
import type { Announcement } from '@/types/professorType'
import { getPostTime } from '@/libs/getPostTime'

const props = defineProps<{ announcement: Announcement }>()
const { announcement } = props

const colors = [
  'bg-red-300',
  'bg-blue-300',
  'bg-green-300',
  'bg-yellow-300',
  'bg-purple-300',
  'bg-pink-300',
]

const getBgClass = () => {
  const firstLetter = announcement.title.charCodeAt(0)
  return colors[firstLetter % colors.length]
}
</script>

<template>
  <div class="flex flex-col gap-y-6 w-full px-12 py-8 bg-white border border-[#B1B1B1] rounded-xl">
    <span class="w-full flex justify-between">
      <h1 class="font-bold text-xl rounded-full px-4 py-1" :class="getBgClass()">
        {{ announcement.title }}
      </h1>
      <p class="text-gray-500 text-sm">{{ getPostTime(announcement.created_at) }}</p>
    </span>
    <p class="px-4">{{ announcement.content }}</p>
  </div>
</template>
