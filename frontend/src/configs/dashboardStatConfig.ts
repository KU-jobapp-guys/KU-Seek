import { BriefcaseBusiness, User, Eye } from 'lucide-vue-next'
import type { FunctionalComponent } from 'vue'

export interface StatCardConfig {
  title: string
  field: string
  icon: FunctionalComponent
  cardClass: string
  iconClass: string
}

export const CompanyStats: StatCardConfig[] = [
  {
    title: 'Total Job Posts',
    field: 'totalJobs',
    icon: BriefcaseBusiness,
    cardClass: 'border-4 bg-white border-blue-500 text-blue-700',
    iconClass: 'w-16 h-16 p-4 bg-blue-500/60 rounded-lg text-white',
  },
  {
    title: 'Total Applicants',
    field: 'totalApplicants',
    icon: User,
    cardClass: 'border-4 bg-white border-red-500 text-red-500',
    iconClass: 'w-16 h-16 p-4 bg-red-500/60 rounded-lg text-white',
  },
  {
    title: 'Applicants to review',
    field: 'pendingReview',
    icon: Eye,
    cardClass: 'border-4 bg-white border-yellow-500 text-yellow-500',
    iconClass: 'w-16 h-16 p-4 bg-yellow-500/60 rounded-lg text-white',
  },
]
