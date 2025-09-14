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
    year_of_study: Date
    graduate_year: Date
  }[]
}
