<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/layouts/NavBar.vue';

</script>

<template>
  <NavBar role="student"/>
  
  <div class="min-h-screen w-full">
    <RouterView/>
  </div>

</template>
