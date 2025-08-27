import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import CompanyProfile from '@/views/CompanyProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },

    {
      path: '/company/profile',
      name: 'companyProfile',
      component: CompanyProfile,
    }
  ],
})

export default router
