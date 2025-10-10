export interface StudentProfile {
  user_id: string
  first_name: string
  last_name: string
  about: string
  interests: string
  skills: string[]
  location: string
  education: Education[]
  email: string
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
  year_of_study: Date
  graduate_year: Date
}