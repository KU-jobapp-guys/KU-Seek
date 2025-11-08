export interface JobApplication {
  id: number
  jobId: string
  studentId: number
  resume: string
  letterOfApplication: string
  phoneNumber: string
  status: 'pending' | 'accepted' | 'rejected'
  appliedAt: Date
  location: string
  firstName: string
  lastName: string
  contactEmail: string
  yearsOfExperience: string
  expectedSalary: string
}
