<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/layouts/NavBar.vue'
import Footer from './components/layouts/AppFooter.vue'
import { ref } from 'vue'

const userRole = ref('student')
</script>

<template>
  <NavBar v-model:role="userRole" />

  <div class="min-h-screen mt-16">
    <RouterView v-model:role="userRole"/>
  </div>

  <Footer />
</template>

