<script setup lang="ts">
import { ref, computed } from 'vue'
import FilterTabs from '@/components/announcements/FilterTabs.vue'
import AnnouncementCard from '@/components/announcements/AnnouncementCard.vue'

const announcements = ref([
  {
    id: 1,
    professor: 'Assoc. Prof. Nattawut Meechai',
    professorPosition: 'Assistant Professor',
    department: 'Agricultural Engineering',
    company: 'EcoFarm Innovation Ltd.',
    companyIndustry: 'IoT · Smart Farming',
    tags: ['IoT', 'Smart Farming', 'Workshop'],
  },
  {
    id: 2,
    professor: 'Dr. Supansa Thongdee',
    professorPosition: 'Lecturer',
    department: 'Food Science',
    company: 'GreenTaste Co., Ltd.',
    companyIndustry: 'AgroTech · Sustainable Food',
    tags: ['FoodTech', 'Sustainability', 'Workshop'],
  },
  {
    id: 3,
    professor: 'Prof. Dr. Preecha Thanapong',
    professorPosition: 'Professor',
    department: 'Environmental Science',
    company: 'EcoPower Co., Ltd.',
    companyIndustry: 'Renewable Energy',
    tags: ['Renewable', 'GreenTech', 'Conference'],
  },
])

const selectedProf = ref('')
const selectedCompany = ref('')

const filteredAnnouncements = computed(() =>
  announcements.value.filter((a) => {
    const profMatch = a.professor.toLowerCase().includes(selectedProf.value.toLowerCase())
    const companyMatch = a.company.toLowerCase().includes(selectedCompany.value.toLowerCase())
    return profMatch && companyMatch
  }),
)
</script>

<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="bg-gradient-to-b from-green-700 to-green-400 text-white text-center py-16">
      <h1 class="text-5xl font-extrabold">KU Announcements</h1>
      <p class="mt-3 text-lg max-w-2xl mx-auto">
        Stay connected with the latest collaborations between KU professors and industry leaders
      </p>
      <p class="mt-2 opacity-90 text-sm">
        Empowering innovation through academic and industrial synergy
      </p>
    </header>

    <!-- Filters -->
    <section class="max-w-4xl mx-auto mt-6 px-4">
      <FilterTabs v-model:selectedProf="selectedProf" v-model:selectedCompany="selectedCompany" />
    </section>

    <!-- Announcements -->
    <main class="max-w-4xl mx-auto mt-8 px-4">
      <h2 class="font-semibold text-lg mb-3">
        Recent Collaborations
        <span class="text-gray-500 text-sm">({{ filteredAnnouncements.length }} found)</span>
      </h2>

      <div
        class="space-y-4 overflow-y-auto rounded-xl p-3 bg-white shadow-inner border border-gray-200"
        style="max-height: 550px; scroll-behavior: smooth"
      >
        <AnnouncementCard
          v-for="a in filteredAnnouncements"
          :key="a.id"
          :professor="a.professor"
          :professorPosition="a.professorPosition"
          :department="a.department"
          :company="a.company"
          :companyIndustry="a.companyIndustry"
          :tags="a.tags"
        />
      </div>
    </main>
  </div>
</template>
