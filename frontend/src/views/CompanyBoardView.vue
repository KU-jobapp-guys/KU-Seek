<script setup lang="ts">
import Header from '@/components/layouts/AppHeader.vue'
import type { Company } from '@/types/companyType.ts'
import CompanyCard from '@/components/dashboards/CompanyCard.vue'
import { ref, onMounted, computed } from 'vue'
import CompanySearchBar from '@/components/dashboards/CompanySearchBar.vue'
import search from '@/assets/icons/search.svg'
import api from '@/plugins/axios.client'

const companies = ref<Company[]>([])
const selectedCompany = ref('')

const token = localStorage.getItem('user_jwt') ?? localStorage.getItem('access_token')

const headers: Record<string, string> = {}

if (token) {
  headers['access_token'] = token
}


onMounted(async () => {
  try {
    const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
    const res = await api.get(`${base}/api/v1/companies`, {
      headers,
      withCredentials: true
    })
    if (res.status == 200) {
      companies.value = res.data

    } else {
      console.error('Failed to fetch companies', res.status)
    }
  } catch (err) {
    console.error('Error fetching companies', err)
  }
})

const filteredCompany = computed(() =>
  companies.value.filter((c) => {
    const name = (c.companyName || '').toString().toLowerCase()
    return name.includes(selectedCompany.value.toLowerCase())
  }),
)
</script>

<template>
  <Header page="companyBoard" />

  <section class="relative -mt-24 md:-mt-40 px-[8vw] md:px-[12vw]">
      <CompanySearchBar v-model:selectedCompany="selectedCompany" />

      <main class="mt-8">
        <div v-if="filteredCompany.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-12">
          <!-- Company Card -->
          <CompanyCard
            v-for="company in filteredCompany"
            :key="company.companyId"
            :companyName="company.companyName"
            :jobCount="company.jobCount"
            :profilePhoto="company.profilePhoto"
          />
        </div>

        <div v-if="filteredCompany.length == 0" class="mt-24 w-full flex flex-col items-center justify-center">
          <img :src="search" class="h-32 w-32" />
          <p class="text-xl font-bold my-4">No matching results found</p>
          <p>We couldn't find any results that match your search.</p>
          <p>Try adjusting your filters or checking for spelling errors.</p>
        </div>
      </main>
  </section>
</template>
