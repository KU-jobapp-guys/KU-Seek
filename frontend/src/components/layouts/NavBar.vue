<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import type { Profile } from '@/types/profileType'
import { mockCompany } from '@/data/mockCompany'
import { mockStudents } from '@/data/mockStudent'
import { mockProfessor } from '@/data/mockProfessor'

type UserRole = 'company' | 'student' | 'professor'

const props = defineProps<{
  role: UserRole
}>()

const userId = '1'
const userData = ref<Profile | null>(null)

const companyList = ['Dashboard']
const kuList = ['Explore Job', 'Explore Company', 'Announcement', 'Dashboard']
const profileList = ['Profile', 'Setting', 'Logout']

const openMenu = ref<'page' | 'profile' | null>(null)

const pageList = computed(() => {
  if (props.role === 'company') return companyList
  if (props.role && ['student', 'professor'].includes(props.role)) return kuList
  return []
})

const mockData = {
  company: mockCompany,
  student: mockStudents,
  professor: mockProfessor,
}

function makeLink(page: string) {
  const role = props.role
  if (page === 'Profile') {
    return `/${role}/profile/${userId}`
  }
  if (page === 'Dashboard') {
    return `/${role}/dashboard`
  }
  return `/${page.toLowerCase().replace(/\s+/g, '-')}`
}

onMounted(() => {
  const role = props.role
  if (role) {
    userData.value = mockData[role].find((u) => u.id === userId) || null
    console.log('data: ', userData)
  }
})
</script>

<template>
  <nav
    class="fixed top-0 left-0 h-16 w-full bg-gradient-to-r from-[#03A96B] to-[#01432A] flex items-center justify-between px-[4vw] text-white z-[60]"
  >
    <a class="font-bold" href="/">KU SEEK</a>

    <div class="flex gap-x-4 md:gap-x-8 items-center">
      <!-- Desktop Menu List -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="page in pageList" :key="page" class="text-base hover:text-green-300">
          <a :href="makeLink(page)">{{ page }}</a>
        </li>
      </ul>

      <!-- Mobile Dropdown -->
      <Menu v-if="props.role" as="div" class="relative inline-block md:hidden">
        <MenuButton
          class="flex w-full items-center justify-center"
          @click="openMenu = openMenu === 'page' ? null : 'page'"
        >
          <Bars3Icon v-if="openMenu !== 'page'" class="size-6 text-white" aria-hidden="true" />
          <XMarkIcon v-if="openMenu === 'page'" class="size-6 text-white" aria-hidden="true" />
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
            <div
              v-if="openMenu === 'page'"
              class="fixed inset-0 bg-black bg-opacity-60 z-[40]"
              @click="openMenu = null"
            ></div>
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
            <MenuItems
              v-if="openMenu === 'page'"
              static
              class="fixed right-0 top-16 z-[50] py-6 w-[54vw] h-screen bg-gray-200 shadow-lg"
            >
              <div v-for="page in pageList" :key="page">
                <MenuItem v-slot="{ active }">
                  <a
                    :href="makeLink(page)"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-8 py-3 text-lg focus:outline-none hover:bg-gray-50',
                    ]"
                  >
                    {{ page }}
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Teleport>
      </Menu>

      <!-- Profile Dropdown -->
      <Menu v-if="userData" as="div" class="relative inline-block">
        <MenuButton
          class="flex items-center justify-center"
          @click="openMenu = openMenu === 'profile' ? null : 'profile'"
        >
          <img
            :src="userData.profilePhoto"
            class="rounded-full w-11 h-11 object-cover ring-2 ring-white/20 hover:ring-white/40 transition-all"
          />
        </MenuButton>

        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            v-if="openMenu === 'profile'"
            static
            class="absolute right-0 mt-4 w-48 origin-top-right rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-1">
              <div v-for="page in profileList" :key="page">
                <MenuItem v-slot="{ active }">
                  <a
                    :href="makeLink(page)"
                    :class="[
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-lg md:text-base hover:bg-gray-50',
                      page === 'Logout' ? 'text-red-600 hover:bg-red-50 hover:text-red-700' : '',
                    ]"
                  >
                    {{ page }}
                  </a>
                </MenuItem>
              </div>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </nav>
</template>
