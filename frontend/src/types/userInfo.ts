interface BaseUserInfo {
  firstName: string
  lastName: string
  email?: string
  google_uid?: string
  user_type: 'staff' | 'company'
}

interface StaffUserInfo extends BaseUserInfo {
  user_type: 'staff'
  kuId?: string
}

interface CompanyUserInfo extends BaseUserInfo {
  user_type: 'company'
  companyName?: string
  companySize?: string
}

export type UserInfo = StaffUserInfo | CompanyUserInfo
