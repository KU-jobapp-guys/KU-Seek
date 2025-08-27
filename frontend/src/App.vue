<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/layouts/NavBar.vue';
import Footer from './components/layouts/Footer.vue';

</script>

<template>
  <NavBar role="student"/>
  
  <div class="min-h-screen">
    <RouterView/>
  </div>
  
  <Footer />

</template>

