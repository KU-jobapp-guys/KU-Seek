<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/layouts/NavBar.vue'
import Footer from './components/layouts/AppFooter.vue'
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from './stores/auth'

type AllUserRole = 'company' | 'student' | 'professor' | 'visitor' | 'staff' | 'admin'
type NormalUserRole = 'company' | 'student' | 'professor' | 'visitor' | 'staff' 

const userRole = ref<AllUserRole>('visitor')
const authStore = useAuthStore()

// Load role from localStorage on mount
onMounted(() => {
  const savedRole = authStore.role as NormalUserRole | null
  if (savedRole) {
    userRole.value = savedRole
  }
})

// Save role to localStorage whenever it changes
watch(userRole, (newRole) => {
  authStore.role = newRole
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header id="navbar">
      <NavBar v-if="!$route.meta.admin" v-model:role="userRole as NormalUserRole" />
    </header>

    <main class="flex-1" :class="!$route.meta.admin ? 'mt-4 md:mt-8' : ''">
      <RouterView />
    </main>

    <footer id="footer" v-if="!$route.meta.noFooter">
      <Footer />
    </footer>
  </div>
</template>
