export interface Company {
  user_id: string
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
  profile_img: string
  banner_img: string
}
