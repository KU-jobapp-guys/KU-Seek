import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import StudentDashboardView from '@/views/dashboard/StudentDashboardView.vue'
import CompanyDashboardView from '@/views/dashboard/CompanyDashboardView.vue'
import StaffDashboardView from '@/views/dashboard/StaffDashboardView.vue'
import JobBoardView from '@/views/JobBoardView.vue'
import CompanyBoardView from '@/views/CompanyBoardView.vue'
import CompanyProfile from '@/views/profile/CompanyProfile.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import JobView from '@/views/JobView.vue'
import StudentProfile from '@/views/profile/StudentProfile.vue'
import ProfessorProfile from '@/views/profile/ProfessorProfile.vue'
import JobManagement from '@/views/JobManagement.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/student/profile/:id',
      name: 'studentProfile',
      component: StudentProfile,
    },
    {
      path: '/company/profile/:id',
      name: 'companyProfile',
      component: CompanyProfile,
    },
    {
      path: '/professor/profile/:id',
      name: 'professorProfile',
      component: ProfessorProfile,
    },
    {
      path: '/student/dashboard',
      name: 'StudentDashboard',
      component: StudentDashboardView,
    },
    {
      path: '/company/dashboard',
      name: 'company dashboard',
      component: CompanyDashboardView,
    },
    {
      path: '/staff/dashboard',
      name: 'staff dashboard',
      component: StaffDashboardView,
    },
    {
      path: '/professor/dashboard',
      name: 'professor dashboard',
      component: StaffDashboardView,
    },
    {
      path: '/explore-job',
      name: 'job board',
      component: JobBoardView,
    },
    {
      path: '/explore-company',
      name: 'company board',
      component: CompanyBoardView,
    },
    {
      path: '/job/:id',
      name: 'job view',
      component: JobView,
    },
    {
      path: '/company/manage-job/:id',
      name: 'job management',
      component: JobManagement
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
