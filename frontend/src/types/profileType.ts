export interface BaseProfile {
  id: string
  firstName: string
  lastName: string
  about: string
  location: string
  email: string
  contactEmail: string
  gender: string
  age: number | null
  bannerPhoto: string
  profilePhoto: string
  phoneNumber: string
  contactEmailVerified: boolean
  termOfServiceAccepted: boolean
  isVerified: boolean
}

export interface CompanyProfile extends BaseProfile {
  name: string
  type: string
  website: string
  industry: string
  workFields: string[]
  fullLocation: string
  size: string
}

export interface StudentProfile extends BaseProfile{
  nisitId: string
  gpa?: number | null
  skills: string[]
  interests: string
  educations: {
    curriculumName: string
    university: string
    major: string
    yearOfStudy: number
    graduateYear: number
  }[]
}

export interface ProfessorProfile extends BaseProfile{
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