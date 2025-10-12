<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/layouts/NavBar.vue'
import Footer from './components/layouts/AppFooter.vue'
import { ref } from 'vue'

const userRole = ref('visitor')
</script>

<template>
  <NavBar v-model:role="userRole" />

  <div class="min-h-screen mt-16">
    <RouterView v-model:role="userRole" />
  </div>

  <div id="footer">
    <div v-if="$route.meta.noFooter" class="hidden"></div>
    <Footer v-else></Footer>
  </div>
</template>
