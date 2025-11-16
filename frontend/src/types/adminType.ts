export interface UserRequest {
  userId: string
  name: string
  requestedType: string
  verificationDocument: string
  denialReason: string
  status: string
  createdAt: string
  approvedAt: string
}

export interface JobRequest {
  jobId: string
  title: string
  company: string
  status: string
  denialReason: string
  visibility: boolean
  createdAt: string
  approvedAt: string
}