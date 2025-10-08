export interface CompanyProfile {
  id: string
  name: string
  type: string
  website: string
  industry: string
  workFields: string[]
  location: string
  fullLocation: string
  size: string
  contacts: string
  about: string
  bannerPhoto: string
  profilePhoto: string
}

export interface StudentProfile {
  id: string
  first_name: string
  last_name: string
  about: string
  location: string
  contact_email: string
  gender: string
  age: number
  user_type: 'student'
  profilePhoto: string
  bannerPhoto: string
  phone_number: string
  is_verified: boolean
  nisit_id: string
  gpa: number
  skills: string[]
  interests: string
  education: {
    curriculum_name: string
    university: string
    major: string
    year_of_study: number
    graduate_year: number
  }[]
}

export interface ProfessorProfile {
  id: string
  first_name: string
  last_name: string
  about: string
  location: string
  contact_email: string
  gender: string
  age: number
  profilePhoto: string
  bannerPhoto: string
  phone_number: string
  is_verified: boolean
  skills: string[]
  department: string
  position: string
  office_location: string
  research_interest: string
  description: string
  announcements: Announcement[]
}

export interface Announcement {
  title: string
  content: string
  created_at: Date
}

export type Profile = CompanyProfile | StudentProfile | ProfessorProfile
