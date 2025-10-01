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
