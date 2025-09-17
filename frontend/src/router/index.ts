import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import StudentDashboardView from '@/views/StudentDashboardView.vue'
import CompanyDashboardView from '@/views/CompanyDashboardView.vue'
import StaffDashboardView from '@/views/StaffDashboardView.vue'
import JobBoardView from '@/views/JobBoardView.vue'
import CompanyBoardView from '@/views/CompanyBoardView.vue'
import CompanyProfile from '@/views/CompanyProfile.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import JobView from '@/views/JobView.vue'
import CompanyJobView from '@/views/CompanyJobView.vue'

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
    },
    
    {
      path: '/student/dashboard',
      name: 'StudentDashboard',
      component: StudentDashboardView,
    },
    {
      path: '/company/dashboard',
      name: 'CompanyDashboard',
      component: CompanyDashboardView,
    },
    {
      path: '/staff/dashboard',
      name: 'StaffDashboard',
      component: StaffDashboardView
    },
    {
      path: '/student/explore-job',
      name: 'job board',
      component: JobBoardView,
    },
    {
      path: '/student/explore-company',
      name: 'company board',
      component: CompanyBoardView,
    },
    {
      path: '/student/dashboard',
      name: 'student dashboard',
      component: StudentDashboardView,
    },
    {
      path: '/company/dashboard',
      name: 'company dashboard',
      component: CompanyDashboardView,
    },
    {
      path: '/job/:id',
      name: 'job view',
      component: JobView,
    },
    {
      path: '/company/job/:id',
      name: 'company job view',
      component: CompanyJobView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not found',
      component: NotFoundView,
    },
  ],
})

export default router
