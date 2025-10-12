export interface Job {
  jobId: string
  company: string
  role: string
  location: string
  postTime: Date
  description: string
  highlights: string[]
  jobType: string
  jobLevel: string
  skills: string[]
  salary?: string
  status: string
  totalApplicants: number
  pendingApplicants: number
}

export type FilterKeys = 'role' | 'skills' | 'company' | 'jobLevel' | 'location' | 'jobType'
