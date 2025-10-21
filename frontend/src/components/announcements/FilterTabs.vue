<script setup lang="ts">
const props = defineProps<{
  professors: string[]
  companies: string[]
}>()

const model = defineModel<string>()
</script>

<template>
  <div class="flex flex-col gap-4 mt-4">
    <!-- All button -->
    <div class="flex flex-wrap gap-2">
      <button
        @click="model = 'All'"
        class="px-4 py-1 rounded-full border transition"
        :class="
          model === 'All'
            ? 'bg-green-600 text-white border-green-600'
            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-green-50'
        "
      >
        All
      </button>
    </div>

    <!-- Professor filters -->
    <div>
      <h3 class="font-semibold text-gray-700 mb-1">Professors</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="p in props.professors"
          :key="p"
          @click="model = p"
          class="px-4 py-1 rounded-full border transition text-sm"
          :class="
            model === p
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-green-50'
          "
        >
          {{ p }}
        </button>
      </div>
    </div>

    <!-- Company filters -->
    <div>
      <h3 class="font-semibold text-gray-700 mb-1">Companies</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="c in props.companies"
          :key="c"
          @click="model = c"
          class="px-4 py-1 rounded-full border transition text-sm"
          :class="
            model === c
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-green-50'
          "
        >
          {{ c }}
        </button>
      </div>
    </div>
  </div>
</template>
