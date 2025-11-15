<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Annoucement } from '@/types/annoucementType'
import FilterTabs from '@/components/announcements/FilterTabs.vue'
import AnnouncementCard from '@/components/announcements/AnnouncementCard.vue'
import Header from '@/components/layouts/AppHeader.vue'

const announcements = ref<Annoucement[]>([])
const selectedProf = ref('')
const selectedCompany = ref('')

onMounted( async () => {
  try {
    const base = import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:8000'
    const res = await fetch (`${base}/api/v1/annoucements`, {
      method: 'GET',
      credentials: 'include'
    })
    if (res.ok) {
      announcements.value = await res.json()
    } else {
      console.error('Failed to fetch annoucements', res.status, await res.text())

    }
  }

  catch (err) {
    console.error('Error fetching annoucements', err)

  }
}

)
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
