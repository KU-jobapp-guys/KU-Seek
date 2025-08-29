import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import StudentDashboardView from '@/views/StudentDashboardView.vue'
import CompanyDashboardView from '@/views/CompanyDashboardView.vue'
import StaffDashboardView from '@/views/StaffDashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/student/dashboard',
      name: 'StudentDashboard',
      component: StudentDashboardView
    },
    {
      path: '/company/dashboard',
      name: 'CompanyDashboard',
      component: CompanyDashboardView
    },
    {
      path: '/staff/dashboard',
      name: 'StaffDashboard',
      component: StaffDashboardView
    },
  ],
})

export default router
