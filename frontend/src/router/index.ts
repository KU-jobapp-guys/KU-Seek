import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import JobPostFormView from '@/views/JobPostFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/company/job-post-form',
      name: 'jobPostForm',
      component: JobPostFormView,
    }
  ],
})

export default router
