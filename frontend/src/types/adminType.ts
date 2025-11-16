export interface User {
  userId: string
  name: string
  requestedType: string
  document: string
  denialReason: string
  status: string
  createdAt: string
  approvedAt: string
}

export interface Job {
  jobId: string
  title: string
  company: string
  applicants: number
  status: string
  reason: string  
}