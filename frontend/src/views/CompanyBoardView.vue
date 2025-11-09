<script setup lang="ts">
import Header from '@/components/layouts/AppHeader.vue'
import type { Company } from '@/types/companyType.ts'
import CompanyCard from '@/components/dashboards/CompanyCard.vue'
import { ref, onMounted, computed } from 'vue'
import CompanySearchBar from '@/components/dashboards/CompanySearchBar.vue'

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
    const res = await fetch(`${base}/api/v1/companies`, {
      method: 'GET',
      headers,
      credentials: 'include'
    })
    if (res.ok) {
      companies.value = await res.json()

      const mockCompanies = [
        {
          companyId: 9001,
          companyName: 'Acme Corporation',
          jobCount: 4,
          profilePhoto: '',
          companyIndustry: 'Manufacturing',
          name: 'Acme Corporation',
        },
        {
          companyId: 9002,
          companyName: 'Blue Ocean Tech',
          jobCount: 2,
          profilePhoto: '',
          companyIndustry: 'Software',
          name: 'Blue Ocean Tech',
        },
        {
          companyId: 9003,
          companyName: 'Green Fields Ltd.',
          jobCount: 1,
          profilePhoto: '',
          companyIndustry: 'Agriculture',
          name: 'Green Fields Ltd.',
        },
        {
          companyId: 9004,
          companyName: 'Urban Mobility',
          jobCount: 6,
          profilePhoto: '',
          companyIndustry: 'Transportation',
          name: 'Urban Mobility',
        },
      ]

      companies.value.push(...mockCompanies)
    } else {
      console.error('Failed to fetch companies', res.status, await res.text())
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
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-12">
          <!-- Company Card -->
          <CompanyCard
            v-for="company in filteredCompany"
            :key="company.companyId"
            :companyName="company.companyName"
            :jobCount="company.jobCount"
            :profilePhoto="company.profilePhoto"
          />
        </div>
      </main>
  </section>
</template>
