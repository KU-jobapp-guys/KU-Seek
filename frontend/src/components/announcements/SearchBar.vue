<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <div class="bg-white p-3 rounded-xl shadow flex items-center space-x-3">
    <input
      v-model="model"
      type="text"
      placeholder="Search announcements..."
      class="w-full outline-none text-gray-700"
    />
  </div>
</template>
