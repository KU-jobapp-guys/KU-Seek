export interface JobApplication {
  id: number
  job_id: string
  student_id: number
  resume: string
  letter_of_application: string
  phone_number: string
  status: 'pending' | 'approved' | 'rejected'
  applied_at: Date
  first_name: string
  last_name: string
  contact_email: string
  years_of_experience: string
  expected_salary: string
}
