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
  firstName: string
  lastName: string
  about: string
  location: string
  contactEmail: string
  gender: string
  age: number
  userType: 'student'
  profilePhoto: string
  bannerPhoto: string
  phoneNumber: string
  isVerified: boolean
  nisitId: string
  gpa: number
  skills: string[]
  interests: string
  education: {
    curriculum_name: string
    university: string
    major: string
    yearOfStudy: number
    graduateYear: number
  }[]
}

export interface ProfessorProfile {
  id: string
  firstName: string
  lastName: string
  about: string
  location: string
  contactEmail: string
  gender: string
  age: number
  profilePhoto: string
  bannerPhoto: string
  phoneNumber: string
  isVerified: boolean
  skills: string[]
  department: string
  position: string
  officeLocation: string
  researchInterest: string
  description: string
  announcements: Announcement[]
}

export interface Announcement {
  title: string
  content: string
  createdAt: Date
}

export type Profile = CompanyProfile | StudentProfile | ProfessorProfile