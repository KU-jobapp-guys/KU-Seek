<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  role: String
})

const companyList = ["Dashboard", "Profile"]
const studentList = ["Explore Job", "Explore Company", 'Dashboard', "Profile"]

const pageList = computed(() => {
  if (props.role === "company") return companyList
  if (props.role === "student") return studentList
  return []
})

const makeLink = (page: String) => {
  return props.role ? `/${props.role}/${page.toLowerCase().replace(/\s+/g, "-")}` : ''
}
</script>

<template>
  <nav class="h-16 w-full bg-gradient-to-r from-[#03A96B] to-[#01432A] flex items-center justify-between px-12 text-white">
    <a class="font-bold" href="/">KU SEEK</a>

    <ul class="flex gap-8">
      <li v-for="page in pageList" :key="page" class="hover:text-green-300">
        <a :href="makeLink(page)">{{ page }}</a>
      </li>
    </ul>
  </nav>
</template>