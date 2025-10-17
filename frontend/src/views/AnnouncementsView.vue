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
  category: 'Connections' | 'Meetings' | 'Events' | 'General'
  tags: string[]
}

const allAnnouncements = ref<Announcement[]>([
  {
    id: 1,
    professor: 'Asst. Prof. Somchai Prasert',
    company: 'Green Junimo Co., Ltd.',
    title: 'New Research Partnership with Tech Industry Leaders',
    description:
      'Kasetsart University announces a collaboration with Green Junimo to advance AI and sustainable agriculture research. This partnership will provide opportunities for student internships and academic exchange.',
    role: 'Associate Professor',
    department: 'Computer Engineering',
    category: 'Connections',
    tags: ['AI', 'Research', 'Industry', 'Partnership'],
  },
  {
    id: 2,
    professor: 'Assoc. Prof. Nattawut Meechai',
    company: 'EcoFarm Innovation Ltd.',
    title: 'Workshop: Smart Farming Technology 2025',
    description:
      'Join us for a practical session on integrating IoT and machine learning into smart farming. Open to all engineering and agriculture students.',
    role: 'Assistant Professor',
    department: 'Agricultural Engineering',
    category: 'Events',
    tags: ['IoT', 'Smart Farming', 'Workshop'],
  },
  {
    id: 3,
    professor: 'Asst. Prof. Waranya Limsakul',
    company: 'AgriTech Startups Network',
    title: 'Faculty Meeting: Q4 Research Funding and Proposals',
    description:
      'Department meeting to discuss the upcoming fiscal year’s research budget allocations, proposals, and grant opportunities.',
    role: 'Department Head',
    department: 'Biotechnology',
    category: 'Meetings',
    tags: ['Research', 'Funding', 'Faculty'],
  },
  {
    id: 4,
    professor: 'Prof. Dr. Preecha Thanapong',
    company: 'KU Innovation Office',
    title: 'Call for Papers: International Conference on Sustainable Tech',
    description:
      'Faculty members and postgraduate students are invited to submit papers for the upcoming international conference. Topics include sustainability, green computing, and renewable energy.',
    role: 'Professor',
    department: 'Environmental Science',
    category: 'General',
    tags: ['Conference', 'Sustainability', 'GreenTech'],
  },
  {
    id: 5,
    professor: 'Asst. Prof. Kanya Wattanakorn',
    company: 'BioSense Labs',
    title: 'Research Collaboration: Biosensor Development for Food Safety',
    description:
      'Announcing a new partnership with BioSense Labs focusing on low-cost biosensors for real-time food contamination detection.',
    role: 'Research Coordinator',
    department: 'Food Science',
    category: 'Connections',
    tags: ['Biosensor', 'Food Safety', 'Research'],
  },
  {
    id: 6,
    professor: 'Assoc. Prof. Rattana Phimchan',
    company: 'Kasetsart University',
    title: 'Annual Faculty Retreat 2025',
    description:
      'A two-day retreat focusing on curriculum development, research goals, and team building. Attendance is highly encouraged for all teaching staff.',
    role: 'Associate Professor',
    department: 'Humanities',
    category: 'Meetings',
    tags: ['Retreat', 'Planning', 'Teamwork'],
  },
  {
    id: 7,
    professor: 'Dr. Apichart Jirawan',
    company: 'TechGrow Solutions',
    title: 'Internship Opportunities for Summer 2025',
    description:
      'TechGrow Solutions invites Kasetsart University students to apply for summer internships in data science, robotics, and sustainable technology.',
    role: 'Lecturer',
    department: 'Computer Engineering',
    category: 'Connections',
    tags: ['Internship', 'Students', 'Industry'],
  },
  {
    id: 8,
    professor: 'Asst. Prof. Kanokwan Sriwan',
    company: 'Kasetsart University',
    title: 'Campus Sustainability Awareness Week',
    description:
      'Join the week-long event promoting campus sustainability initiatives, featuring talks, workshops, and student exhibitions.',
    role: 'Assistant Professor',
    department: 'Environmental Science',
    category: 'Events',
    tags: ['Sustainability', 'Students', 'Events'],
  },
  {
    id: 9,
    professor: 'Prof. Dr. Narongchai Kittipong',
    company: 'Kasetsart University Research Office',
    title: 'Research Grant Proposal Guidelines 2025',
    description:
      'The Research Office has released updated guidelines for proposal submissions. Please review carefully before submitting your Q2 research proposals.',
    role: 'Professor',
    department: 'Research Office',
    category: 'General',
    tags: ['Research', 'Funding', 'Guidelines'],
  },
])

const query = ref('')
const activeFilter = ref<'All' | 'Connections' | 'Meetings' | 'Events' | 'General'>('All')

const filteredAnnouncements = computed(() =>
  allAnnouncements.value.filter((a) => {
    const matchesFilter = activeFilter.value === 'All' || a.category === activeFilter.value
    const matchesQuery = a.title.toLowerCase().includes(query.value.toLowerCase())
    return matchesFilter && matchesQuery
  }),
)
</script>

<template>
  <div class="min-h-screen">
    <!-- Header -->
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

    <!-- Search and Filters -->
    <section class="max-w-4xl mx-auto mt-6 px-4">
      <SearchBar v-model="query" />
      <FilterTabs v-model="activeFilter" />
    </section>

    <!-- Scrollable Announcements -->
    <main class="max-w-4xl mx-auto mt-8 px-4">
      <h2 class="font-semibold text-lg mb-3">
        Recent Announcements
        <span class="text-gray-500 text-sm">({{ filteredAnnouncements.length }} found)</span>
      </h2>

      <!-- Scrollable box -->
      <div
        class="space-y-4 overflow-y-auto rounded-xl p-3 bg-white shadow-inner border border-gray-200"
        style="max-height: 550px; scroll-behavior: smooth"
      >
        <AnnouncementCard v-for="a in filteredAnnouncements" :key="a.id" :announcement="a" />
      </div>
    </main>
  </div>
</template>
