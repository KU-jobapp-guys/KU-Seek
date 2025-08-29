<script setup lang="ts">
import { computed } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  role: String
})

const companyList = ["Dashboard", "Profile"]
const studentList = ["Explore Job", "Explore Company", "Announcement", "Dashboard", "Profile"]

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
  <nav class="fixed top-0 left-0 h-16 w-full bg-gradient-to-r from-[#03A96B] to-[#01432A] flex items-center justify-between px-[4vw] text-white z-[60]">
    <a class="font-bold" href="/">KU SEEK</a>
    
    <!-- Desktop Menu List -->
    <ul class="hidden md:flex gap-8">
      <li v-for="page in pageList" :key="page" class="hover:text-green-300">
        <a :href="makeLink(page)">{{ page }}</a>
      </li>
    </ul>
    
    <!-- Mobile Dropdown -->
    <Menu as="div" class="relative inline-block md:hidden" v-slot="{ open }">
      <MenuButton class="flex w-full">
        <Bars3Icon v-if="!open" class="size-6 text-white" aria-hidden="true" />
        <XMarkIcon v-if="open" class="size-6 text-white" aria-hidden="true" />
      </MenuButton>

      <Teleport to="body">
        <!-- Overlay -->
        <transition
          enter-active-class="transition-opacity ease-out duration-100"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity ease-in duration-75"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="open" class="fixed inset-0 bg-black bg-opacity-60 z-[40]"></div>
        </transition>

        <!-- Menu -->
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 translate-x-full"
          enter-to-class="transform opacity-100 translate-x-0"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 translate-x-0"
          leave-to-class="transform opacity-0 translate-x-full"
        >
          <MenuItems v-if="open" class="fixed right-0 top-16 z-[50] py-6 w-[50vw] h-screen bg-gray-200 shadow-lg">
            <div v-for="page in pageList" :key="page">
              <MenuItem v-slot="{ active }">
                <a :href="makeLink(page)" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','block px-8 py-3 text-sm focus:outline-none hover:bg-gray-50']">
                  {{ page }}
                </a>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Teleport>
    </Menu>

  </nav>
</template>
