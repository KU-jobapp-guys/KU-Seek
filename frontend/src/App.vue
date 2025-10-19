<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/layouts/NavBar.vue'
import Footer from './components/layouts/AppFooter.vue'
import { ref } from 'vue'

type UserRole = 'company' | 'student' | 'professor'

const userRole = ref('student')
</script>

<template>
  <NavBar v-model:role="userRole as UserRole" />

  <div class="min-h-screen mt-8 md:mt-16">
    <RouterView />
  </div>

  <Footer />
</template>
