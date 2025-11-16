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
  status: string
  denialReason: string
  visibility: boolean
  createdAt: string
  approvedAt: string
}