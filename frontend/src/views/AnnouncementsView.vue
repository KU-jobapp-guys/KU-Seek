<script setup lang="ts">
import { ref, computed } from 'vue'
import FilterTabs from '@/components/announcements/FilterTabs.vue'
import AnnouncementCard from '@/components/announcements/AnnouncementCard.vue'
import Header from '@/components/layouts/AppHeader.vue'

const announcements = ref([
  {
    id: 1,
    professor: 'Assoc. Prof. Nattawut Meechai',
    professorPosition: 'Assistant Professor',
    department: 'Agricultural Engineering',
    company: 'EcoFarm Innovation Ltd.',
    companyIndustry: 'IoT & Smart Farming',
    tags: ['IoT', 'Smart Farming', 'Workshop'],
  },
  {
    id: 2,
    professor: 'Dr. Supansa Thongdee',
    professorPosition: 'Lecturer',
    department: 'Food Science',
    company: 'GreenTaste Co., Ltd.',
    companyIndustry: 'AgroTech & Sustainable Food',
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
  {
    id: 4,
    professor: 'Asst. Prof. Kittipong Rattanawong',
    professorPosition: 'Assistant Professor',
    department: 'Computer Engineering',
    company: 'AIWorks Thailand',
    companyIndustry: 'AI & Software Development',
    tags: ['AI', 'Machine Learning', 'Hackathon'],
  },
  {
    id: 5,
    professor: 'Dr. Ratchanee Limsakul',
    professorPosition: 'Lecturer',
    department: 'Chemical Engineering',
    company: 'BioChem Lab Co., Ltd.',
    companyIndustry: 'Biotech & Research',
    tags: ['Biotech', 'Research', 'Seminar'],
  },
  {
    id: 6,
    professor: 'Assoc. Prof. Pongsathorn Chaiwong',
    professorPosition: 'Associate Professor',
    department: 'Mechanical Engineering',
    company: 'AutoNext Manufacturing',
    companyIndustry: 'Robotics',
    tags: ['Robotics', 'Automation', 'Internship'],
  },
  {
    id: 7,
    professor: 'Dr. Jirapat Wongchai',
    professorPosition: 'Lecturer',
    department: 'Civil Engineering',
    company: 'BuildSmart Co., Ltd.',
    companyIndustry: 'Construction & Structural Design',
    tags: ['BIM', 'Smart Construction', 'Workshop'],
  },
  {
    id: 8,
    professor: 'Prof. Dr. Chalida Boonmee',
    professorPosition: 'Professor',
    department: 'Information Technology',
    company: 'CyberSafe Solutions',
    companyIndustry: 'Cybersecurity & Cloud Services',
    tags: ['Cybersecurity', 'Cloud', 'Conference'],
  },
  {
    id: 9,
    professor: 'Dr. Thanawat Inthanon',
    professorPosition: 'Lecturer',
    department: 'Electrical Engineering',
    company: 'PowerGrid Tech',
    companyIndustry: 'Energy',
    tags: ['Smart Grid', 'Renewable', 'Research'],
  },
  {
    id: 10,
    professor: 'Assoc. Prof. Naruemon Chantarasri',
    professorPosition: 'Associate Professor',
    department: 'Architecture',
    company: 'UrbanFuture Design',
    companyIndustry: 'Architecture & Smart City',
    tags: ['Design', 'Urban Planning', 'Exhibition'],
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
    <Header page="announcements" />

    <!-- Filters + Announcements share the same width container -->
    <section class="relative -mt-24 md:-mt-40">
      <div class="max-w-5xl mx-auto px-4 md:px-6">
        <FilterTabs v-model:selectedProf="selectedProf" v-model:selectedCompany="selectedCompany" />

        <main class="mt-8">
          <h2 class="font-semibold text-lg mb-3">
            Collaborations
            <span class="text-gray-500 text-sm">({{ filteredAnnouncements.length }} found)</span>
          </h2>

          <!-- Scrollable box -->
          <div
            class="space-y-4 overflow-y-auto rounded-xl p-4 bg-white shadow-inner border border-gray-200"
            style="max-height: 600px; scroll-behavior: smooth"
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
    </section>
  </div>
</template>
