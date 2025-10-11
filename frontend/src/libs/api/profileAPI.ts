import type { Profile } from "@/types/profileType"

export async function getProfileData(user_id: string) {
  try {
    const res = await fetch(`http://localhost:8000/api/v1/users/${user_id}/profile`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'access_token': localStorage.getItem('user_jwt') || ''
      },
    })
    return res
  }
  catch (error) {
    console.error('Fetching profile error:', error)
    return null
  }
}

export async function updateProfileData(plainData: Profile) {
  try {
    const { user_id, ...data } = plainData
    const res = await fetch(`http://localhost:8000/api/v1/users/profile`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'access_token': localStorage.getItem('user_jwt') || '',
        'X-CSRFToken': localStorage.getItem('csrf_token') || '',
      },
      body: JSON.stringify(data)
    })
    return res
  }
  catch (error) {
    console.error('Updating profile error:', error)
    return null
  }
}