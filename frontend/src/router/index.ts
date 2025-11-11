import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import JobPostFormView from '@/views/JobPostFormView.vue'
import StudentDashboardView from '@/views/dashboard/StudentDashboardView.vue'
import CompanyDashboardView from '@/views/dashboard/CompanyDashboardView.vue'
import StaffDashboardView from '@/views/dashboard/StaffDashboardView.vue'
import JobBoardView from '@/views/JobBoardView.vue'
import CompanyBoardView from '@/views/CompanyBoardView.vue'
import CompanyProfile from '@/views/profile/CompanyProfile.vue'
import JobApplicationView from '@/views/JobApplicationView.vue'
import LoginView from '@/views/LoginView.vue'
import LogoutView from '@/views/LogoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import JobView from '@/views/JobView.vue'
import StudentProfile from '@/views/profile/StudentProfile.vue'
import ProfessorProfile from '@/views/profile/ProfessorProfile.vue'
import AnnouncementsView from '@/views/AnnouncementsView.vue'
import Registration from '@/views/RegistrationView.vue'
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
      path: '/registration',
      name: 'registration',
      component: Registration,
      meta: {noFooter: true}
    },
    {
      path: '/student/profile/:id',
      name: 'studentProfile',
      component: StudentProfile,
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
      name: 'student dashboard',
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
      path: '/announcements',
      name: 'announcements',
      component: AnnouncementsView,
    },
    {
      path: '/job/:id',
      name: 'job view',
      component: JobView,
    },
    {
      path: '/company/manage-job/:id',
      name: 'job management',
      component: JobManagement,
    },
    {
      path: '/job/:id/apply',
      name: 'job application',
      component: JobApplicationView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not found',
      component: NotFoundView,
    },
  ],
})

export default router
