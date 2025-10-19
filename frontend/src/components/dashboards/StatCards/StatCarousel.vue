<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { StatCardConfig } from '@/configs/dashboardStatConfig.ts'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import StatCard from './StatCard.vue'

interface StatData {
  [key: string]: number
}

const props = defineProps<{
  stats: StatCardConfig[]
  data: StatData
  isClickable?: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleSection', id: string): void
}>()

const currentBoxIndex = ref(props.stats[0]?.title || '')

function handleCardClick(section: string) {
  if (props.isClickable) {
    currentBoxIndex.value = section
    emit('toggleSection', section)
  }
}

const currentIndex = ref(0)
const windowWidth = ref(window.innerWidth)

const cardsPerView = computed(() => {
  if (windowWidth.value >= 1024) return Math.min(3, props.stats.length)
  if (windowWidth.value >= 768) return Math.min(2, props.stats.length)
  return 1
})

const maxIndex = computed(() => Math.max(0, props.stats.length - cardsPerView.value))

const visibleStats = computed(() => {
  const start = currentIndex.value
  const end = start + cardsPerView.value
  return props.stats.slice(start, end)
})

const showNavigation = computed(() => props.stats.length > cardsPerView.value)

const goToPrevious = () => {
  if (currentIndex.value === 0) {
    currentIndex.value = maxIndex.value
  } else {
    currentIndex.value--
  }
}

const goToNext = () => {
  if (currentIndex.value >= maxIndex.value) {
    currentIndex.value = 0
  } else {
    currentIndex.value++
  }
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
  if (currentIndex.value > maxIndex.value) {
    currentIndex.value = maxIndex.value
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="w-full">
    <div class="mx-auto">
      <!-- Cards and Navigation Container -->
      <div class="flex items-center gap-2">
        <!-- Left Button -->
        <button
          v-if="showNavigation"
          @click="goToPrevious"
          class="shadow-lg flex-shrink-0"
          aria-label="Previous"
        >
          <ChevronLeft class="w-8 h-8 text-gray-200 hover:text-white" />
        </button>

        <!-- Stat Cards Grid -->
        <div
          class="flex flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-300"
          :class="stats.length > 2 ? 'lg:grid-cols-3' : ''"
        >
          <div
            v-for="stat in visibleStats"
            :key="stat.field"
            @click="handleCardClick(stat.title)"
            class="transition-all rounded-lg"
            :class="[
              isClickable ? 'cursor-pointer' : '',
              isClickable && currentBoxIndex === stat.title ? 'ring-4 ring-white' : ''
            ]"
          >
            <StatCard
              :title="stat.title"
              :value="props.data[stat.field as keyof StatData]"
              :icon="stat.icon"
              :cardClass="stat.cardClass"
              :iconClass="stat.iconClass"
            />
          </div>
        </div>

        <!-- Right Button -->
        <button
          v-if="showNavigation"
          @click="goToNext"
          class="shadow-lg flex-shrink-0"
          aria-label="Next"
        >
          <ChevronRight class="w-8 h-8 text-gray-200 hover:text-white" />
        </button>
      </div>

      <!-- Indicators -->
      <div v-if="showNavigation" class="flex justify-center gap-2 mt-2">
        <button
          v-for="index in maxIndex + 1"
          :key="index - 1"
          @click="currentIndex = index - 1"
          :class="`w-2 h-2 rounded-full transition-all ${
            index - 1 === currentIndex ? 'bg-white w-6' : 'bg-gray-400 hover:bg-gray-300'
          }`"
          :aria-label="`Go to position ${index}`"
        />
      </div>
    </div>
  </div>
</template>