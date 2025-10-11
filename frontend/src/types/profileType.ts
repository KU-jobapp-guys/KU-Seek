export interface CompanyProfile {
  user_id: string
  company_name: string
  company_type: string
  company_size: string
  company_website: string
  company_industry: string
  company_workFields: string[]
  location: string
  full_location: string
  contacts: string
  about: string
  profile_img: string
  banner_img: string
}

export interface ProfessorProfile {
  user_id: string
  first_name: string
  last_name: string
  about: string
  location: string
  contact_email: string
  gender: string
  age: number
  profile_img: string
  banner_img: string
  phone_number: string
  is_verified: boolean
  department: string
  position: string
  office_location: string
  research_interest: string
  description: string
}

export interface Announcement {
  title: string
  content: string
  created_at: Date
}

export interface StudentProfile {
  user_id: string
  first_name: string
  last_name: string
  about: string
  interests: string
  skills: string[]
  location: string
  education: Education[]
  contact_email: string
  gender: string
  age: number
  user_type: 'student'
  profile_img: string
  banner_img: string
  phone_number: string
  is_verified: boolean
}

export interface Education {
  curriculum_name: string
  university: string
  major: string
  year_of_study: number
  graduate_year: number
}

export type Profile = CompanyProfile | StudentProfile | ProfessorProfile
