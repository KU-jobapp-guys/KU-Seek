<script setup lang="ts">
import { LogOut } from 'lucide-vue-next';
import { Menu } from 'lucide-vue-next';

const emit = defineEmits<{
  (e: 'sideClick'): void
}>()
</script>

<template>
  <nav
    class="h-16 w-full bg-gradient-to-r from-[#03A96B] to-[#01432A] flex items-center justify-between px-[4vw] text-white z-[60]"
  >
    <div class="flex gap-x-4">
      <Menu class="w-8 h-8 cursor-pointer" @click="emit('sideClick')" />
      <router-link to="/admin" class="flex flex-col leading-none">
        <span class="font-bold text-sm">Admin</span>
        <span class="font-bold tracking-tight">KU SEEK</span>
      </router-link>
    </div>

    <div class="flex gap-x-4 md:gap-x-8 items-center">
      <ul class="flex items-center gap-8">
        <li>
          <LogOut class="w-6 h-6" :stroke-width="2" />
        </li>
      </ul>
    </div>
  </nav>
</template>
