<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface Feature {
  icon: string
  title: string
  description: string
  alt: string
}

const features: Feature[] = [
  {
    icon: '/src/assets/icons/jobSearch.png',
    title: 'Explore Verified Opportunities',
    description: 'Explore a wide range of job and internship opportunities tailored for computer engineering students.',
    alt: 'Job Search Icon'
  },
  {
    icon: '/src/assets/icons/robotic.png',
    title: 'Tailored for Computer Engineering Students',
    description: 'Find internships, part-time jobs, and career paths from trusted companies partnered with Kasetsart University.',
    alt: 'Networking Icon'
  },
  {
    icon: '/src/assets/icons/careerLadder.png',
    title: 'Build Your Career Early',
    description: 'Gain real-world experience, expand your professional network, and prepare for your future career while studying.',
    alt: 'Career Growth Icon'
  }
]

const currentIndex = ref(0)
const windowWidth = ref(window.innerWidth)

const cardsPerView = computed(() => {
  if (windowWidth.value >= 1024) return Math.min(3, features.length)
  if (windowWidth.value >= 768) return Math.min(2, features.length)
  return 1
})

const maxIndex = computed(() => Math.max(0, features.length - cardsPerView.value))

const visibleFeatures = computed(() => {
  const start = currentIndex.value
  const end = start + cardsPerView.value
  return features.slice(start, end)
})

const showNavigation = computed(() => features.length > cardsPerView.value)

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
  <!-- Features Section -->
  <section class="px-[8vw] md:px-[12vw] mt-24 md:mt-[10vw]">
    <div class="relative my-16">
      <!-- Navigation Buttons -->
      <button
        v-if="showNavigation"
        @click="goToPrevious"
        class="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-12 z-10"
        aria-label="Previous"
      >
        <ChevronLeft class="w-6 h-6 text-gray-500 hover:text-gray-700" />
      </button>

      <button
        v-if="showNavigation"
        @click="goToNext"
        class="absolute right-4 top-1/2 -translate-y-1/2 translate-x-12 z-10"
        aria-label="Next"
      >
        <ChevronRight class="w-6 h-6 text-gray-500 hover:text-gray-700" />
      </button>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="feature in visibleFeatures"
          :key="feature.title"
          class="bg-white rounded-lg p-12 h-full text-center flex flex-col items-center justify-start border-2 border-orange-400 transition-all duration-300"
        >
          <img
            :src="feature.icon"
            :alt="feature.alt"
            class="mx-auto h-24 mb-4"
          />
          <h3 class="text-xl font-semibold mb-2" v-html="feature.title"></h3>
          <p class="text-gray-600">
            {{ feature.description }}
          </p>
        </div>
      </div>

      <!-- Dots Indicator -->
      <div v-if="showNavigation" class="flex justify-center gap-2 mt-8">
        <button
          v-for="i in maxIndex + 1"
          :key="i"
          @click="currentIndex = i - 1"
          :class="[
            'w-3 h-3 rounded-full transition-colors',
            currentIndex === i - 1 ? 'bg-blue-600' : 'bg-gray-300'
          ]"
          :aria-label="`Go to slide ${i}`"
        />
      </div>
    </div>
  </section>
</template>