import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import JobPostFormView from '@/views/JobPostFormView.vue'
import CompanyProfile from '@/views/CompanyProfile.vue'
import JobBoardView from '@/views/JobBoardView.vue'
import CompanyBoardView from '@/views/CompanyBoardView.vue'
import StudentDashboardView from '@/views/StudentDashboardView.vue'
import CompanyDashboardView from '@/views/CompanyDashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

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
      path: '/company/job-post-form',
      name: 'jobPostForm',
      component: JobPostFormView,
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
