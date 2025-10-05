export interface CompanyProfile {
  id: string
  name: string
  type: string
  website: { name: string; url: string }
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
