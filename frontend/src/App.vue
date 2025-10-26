<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/layouts/NavBar.vue'
import Footer from './components/layouts/AppFooter.vue'
import { ref, onMounted, watch } from 'vue'

type UserRole = 'company' | 'student' | 'professor' | 'visitor' | 'staff'

const userRole = ref<UserRole>('visitor')

// Load role from localStorage on mount
onMounted(() => {
  const savedRole = localStorage.getItem('userRole') as UserRole | null
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
  <NavBar v-model:role="userRole as UserRole" />

  <div class="min-h-screen mt-8 md:mt-16">
    <RouterView v-model:role="userRole"/>
  </div>

  <div id="footer">
    <div v-if="$route.meta.noFooter" class="hidden"></div>
    <Footer v-else></Footer>
  </div>
</template>
