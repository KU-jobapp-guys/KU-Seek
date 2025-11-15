export interface User {
  userId: string
  firstName: string
  lastName: string
  userType: string
  document: string
  reason: string
  status: string
  createdAt: string
  approvedBy: string
}

export interface Job {
  jobId: string
  title: string
  company: string
  status: string
  reason: string  
}