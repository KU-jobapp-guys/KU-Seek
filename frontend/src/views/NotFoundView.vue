<script setup lang="ts">
import error404 from '@/assets/icons/error404.svg'
</script>
<template>
  <div class="w-full h-[90vh] flex items-center justify-center">
    <div class="flex flex-col gap-y-4 items-center justify-center text-center py-8 px-12">
      <p class="text-2xl font-bold text-blue-900">ERROR</p>
      <img :src="error404" class="h-[20vh]" />
      <p class="text-2xl font-bold text-blue-900">This page is outside of the universe</p>
      <p class="mt-4 text-blue-800">
        The page you are trying to access doesn't exist or has been moved.<br />Try going back to
        our homepage
      </p>
      <a href="/" class="bg-blue-600 text-white px-4 py-2">Go to homepage</a>
    </div>
  </div>
</template>
