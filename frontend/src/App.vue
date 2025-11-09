<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/layouts/NavBar.vue'
import Footer from './components/layouts/AppFooter.vue'
import { ref, onMounted, watch } from 'vue'
import AdminNavBar from './components/layouts/AdminNavBar.vue'

type AllUserRole = 'company' | 'student' | 'professor' | 'visitor' | 'staff' | 'admin'
type NormalUserRole = 'company' | 'student' | 'professor' | 'visitor' | 'staff' 

const userRole = ref<AllUserRole>('visitor')

// Load role from localStorage on mount
onMounted(() => {
  const savedRole = localStorage.getItem('userRole') as NormalUserRole | null
  if (savedRole) {
    userRole.value = savedRole
  }
})

// Save role to localStorage whenever it changes
watch(userRole, (newRole) => {
  localStorage.setItem('userRole', newRole)
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header id="navbar">
      <NavBar v-if="userRole !== 'admin'" v-model:role="userRole as NormalUserRole" />
      <AdminNavBar v-else />
    </header>

    <main class="flex-1 mt-4 md:mt-8">
      <RouterView v-model:role="userRole" />
    </main>

    <footer id="footer" v-if="!$route.meta.noFooter">
      <Footer />
    </footer>
  </div>
</template>
