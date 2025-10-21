<script setup lang="ts">
import { ref, computed } from 'vue'
import SearchBar from '@/components/announcements/SearchBar.vue'
import FilterTabs from '@/components/announcements/FilterTabs.vue'
import AnnouncementCard from '@/components/announcements/AnnouncementCard.vue'

type Announcement = {
  id: number
  professor: string
  company: string
  title: string
  description: string
  role: string
  department: string
  tags: string[]
}

const allAnnouncements = ref<Announcement[]>([
  {
    id: 1,
    professor: 'Asst. Prof. Somchai Prasert',
    company: 'Green Junimo Co., Ltd.',
    title: 'New Research Partnership with Tech Industry Leaders',
    description:
      'Kasetsart University announces a collaboration with Green Junimo to advance AI and sustainable agriculture research.',
    role: 'Associate Professor',
    department: 'Computer Engineering',
    tags: ['AI', 'Research', 'Industry', 'Partnership'],
  },
  {
    id: 2,
    professor: 'Assoc. Prof. Nattawut Meechai',
    company: 'EcoFarm Innovation Ltd.',
    title: 'Workshop: Smart Farming Technology 2025',
    description:
      'Join us for a practical session on integrating IoT and machine learning into smart farming.',
    role: 'Assistant Professor',
    department: 'Agricultural Engineering',
    tags: ['IoT', 'Smart Farming', 'Workshop'],
  },
  // ... keep others (no category field needed)
])

// Extract unique lists
const professors = computed(() =>
  Array.from(new Set(allAnnouncements.value.map((a) => a.professor))),
)

const companies = computed(() => Array.from(new Set(allAnnouncements.value.map((a) => a.company))))

const query = ref('')
const activeFilter = ref('All')

const filteredAnnouncements = computed(() =>
  allAnnouncements.value.filter((a) => {
    const matchesFilter =
      activeFilter.value === 'All' ||
      a.professor === activeFilter.value ||
      a.company === activeFilter.value

    const matchesQuery =
      a.title.toLowerCase().includes(query.value.toLowerCase()) ||
      a.professor.toLowerCase().includes(query.value.toLowerCase()) ||
      a.company.toLowerCase().includes(query.value.toLowerCase())

    return matchesFilter && matchesQuery
  }),
)
</script>

<template>
  <div class="min-h-screen">
    <header class="bg-gradient-to-b from-green-700 to-green-400 text-white text-center py-16">
      <h1 class="text-5xl font-extrabold">KU Announcements</h1>
      <p class="mt-3 text-lg max-w-2xl mx-auto">
        Stay connected with the latest news and updates from Kasetsart University Staff and
        Instructors
      </p>
      <p class="mt-2 opacity-90 text-sm">
        Connecting our academic community through shared knowledge and collaboration
      </p>
    </header>

    <section class="max-w-4xl mx-auto mt-6 px-4">
      <SearchBar v-model="query" />
      <FilterTabs v-model="activeFilter" :professors="professors" :companies="companies" />
    </section>

    <main class="max-w-4xl mx-auto mt-8 px-4">
      <h2 class="font-semibold text-lg mb-3">
        Announcements
        <span class="text-gray-500 text-sm">({{ filteredAnnouncements.length }} found)</span>
      </h2>

      <div
        class="space-y-4 overflow-y-auto rounded-xl p-3 bg-white shadow-inner border border-gray-200"
        style="max-height: 550px; scroll-behavior: smooth"
      >
        <AnnouncementCard v-for="a in filteredAnnouncements" :key="a.id" :announcement="a" />
      </div>
    </main>
  </div>
</template>
