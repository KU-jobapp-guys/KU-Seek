export interface Job {
  jobId: string
  company: string
  role: string
  location: string
  postTime: Date
  description: string
  jobType: string
  jobLevel: string
  skills: string[]
  workfields?: string[]
  contacts?: { type: string; link: string }[]
  tags?: string[]
  salaryMin: number
  salaryMax: number
  endDate?: string
  workHours?: string
  status: string
  totalApplicants: number
  pendingApplicants: number
  capacity: number
  bookmarked: boolean
  bannerPhoto?: string
  profilePhoto?: string
}

export type FilterKeys = 'role' | 'skills' | 'company' | 'jobLevel' | 'location' | 'jobType'