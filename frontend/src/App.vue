<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/layouts/NavBar.vue'
import Footer from './components/layouts/AppFooter.vue'
import { ref, provide } from 'vue'

const userRole = ref('student')

const csrfToken = ref<string | null>(null)

const fetchCSRFToken = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/csrf-token')
    const data = await response.json()
    csrfToken.value = data.token
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error)
  }
}


provide('csrfToken', csrfToken)
provide('fetchCSRFToken', fetchCSRFToken)


fetchCSRFToken()
</script>

<template>
  <NavBar v-model:role="userRole" />

  <div class="min-h-screen mt-16">
    <RouterView v-model:role="userRole"/>
  </div>

  <Footer />
</template>