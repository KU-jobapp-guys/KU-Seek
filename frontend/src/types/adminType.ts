export interface PendingUser {
  userId: string
  name: string
  type: string
  document: string
  reason: string
  status: string
}

export interface PendingJob {
  jobId: string
  title: string
  company: string
  status: string
  reason: string  
}