<script setup lang="ts">
import StudentBanner from '@/components/profiles/StudentBanner.vue';
import LoadingScreen from '@/components/layouts/LoadingScreen.vue';
import { mockStudents } from '@/data/mockStudent';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import type { StudentProfile } from '@/types/studentType';
import { CircleUserRound, Wrench, GraduationCap, Star } from 'lucide-vue-next';
import { techStackColors } from '@/configs/techStackConfig';


const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const studentData = ref<StudentProfile | null>(null)

const loadStudent = (id?: string) => {
  if (!id) {
    router.replace({ name: 'not found' })
    return
  }

  studentData.value = mockStudents.find((s) => s.user_id === id) || null

  if (!studentData.value) {
    router.replace({ name: 'not found' })
  }
}
  

const profileStyle = {
  "sectionBox": "bg-gradient-to-b from-green-800/10 to-white py-8 px-12 rounded-xl w-full ring-1 ring-[#B1B1B1] ring-inset shadow-md",
  "sectionIcon": "w-12 h-12 p-2 flex items-center justify-center rounded-full text-white",
  "contentBox": "bg-white mt-4 px-4 py-6 w-full border border-gray-400 rounded-md shadow-md"
}

const renderReady = () => {
  isLoading.value = false
}

onMounted(() => {
  loadStudent(route.params.id as string)
})
</script>

<template>
  <LoadingScreen v-if="isLoading" />

  <div v-if="studentData" class="px-[8vw] md:px-[12vw] py-16">

    <StudentBanner :studentData="studentData" @loaded="renderReady"/>

    <section :class="profileStyle.sectionBox" class="mt-8 mb-6">
      <div class="flex items-center gap-x-4">
        <div :class="profileStyle.sectionIcon" class="bg-orange-500">
          <CircleUserRound class="w-full h-full" :stroke-width="1.5" />
        </div>
        <p class="text-2xl font-bold">About</p>
      </div>
      
      <div :class="profileStyle.contentBox">
        <p>{{ studentData.about }}</p>
      </div>
    </section>

    <div class="flex flex-col md:flex-row gap-x-6 gap-y-6">
      <!-- Interest Section -->
      <section :class="profileStyle.sectionBox" class="md:w-[60%]">
        <div class="flex items-center gap-x-4">
          <div :class="profileStyle.sectionIcon" class="bg-pink-500">
            <Star class="w-full h-full" :stroke-width="1.5" />
          </div>
          <p class="text-2xl font-bold">Interest</p>
        </div>
        
        <div :class="profileStyle.contentBox">
          <p>{{ studentData.interests }}</p>
        </div>
      </section>

      <!-- Skill Section -->
      <section :class="profileStyle.sectionBox" class="flex flex-col md:w-[40%]">
        <div class="flex items-center gap-x-4">
          <div :class="profileStyle.sectionIcon" class="bg-purple-500">
            <Wrench class="w-full h-full" :stroke-width="1.5" />
          </div>
          <p class="text-2xl font-bold">Skills</p>
        </div>
        
        <div :class="profileStyle.contentBox" class="flex flex-wrap gap-2">
          <p
            v-for="skill in studentData.skills"
            :key="skill"
            class="px-4 py-1 rounded-3xl"
            :class="`${techStackColors[skill] || techStackColors.Default}`"
          >
            {{ skill }}
          </p>
        </div>
      </section>
    </div>

    <!-- Education Section -->
    <section :class="profileStyle.sectionBox" class="mt-6">
      <div class="flex items-center gap-x-4">
        <div :class="profileStyle.sectionIcon" class="bg-blue-500">
          <GraduationCap class="w-full h-full" :stroke-width="1.5" />
        </div>
        <p class="text-2xl font-bold">Education</p>
      </div>
      
      <div v-for="(edu, eduIndex) in studentData.education" :key="eduIndex" :class="profileStyle.contentBox">
        <p class="font-bold">{{ edu.type }} of {{ edu.major }} in {{ edu.curriculum_name }}</p>
        <p>{{ edu.university }}</p>
        <p class="text-sm">{{ edu.year_of_study.getFullYear() }} - {{ edu.graduate_year.getFullYear() }}</p>
      </div>
    </section>

  </div>
</template>