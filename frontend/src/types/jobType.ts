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
  status: string
  totalApplicants: number
  pendingApplicants: number
}

export type FilterKeys = 'role' | 'skills' | 'company' | 'jobLevel' | 'location' | 'jobType'
