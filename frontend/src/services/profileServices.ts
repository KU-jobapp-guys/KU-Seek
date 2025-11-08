import type { Profile } from "@/types/profileType"

export async function getProfileData(user_id: string): Promise<Profile | null> {
  try {
    const res = await fetch(`http://localhost:8000/api/v1/users/${user_id}/profile`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'access_token': localStorage.getItem('user_jwt') || ''
      },
    })
    if (!res.ok) {
      console.error('Fetching profile failed with status:', res.status)
      return null
    }
    return res.json() as Promise<Profile>

  }
  catch (error) {
    console.error('Fetching profile error:', error)
    return null
  }
}

export async function updateProfileData(plainData: Partial<Profile>): Promise<Profile | null>  {
  try {
    // Replace all null values with ''
    const cleanedData = Object.fromEntries(
        Object.entries(plainData).map(([key, value]) => [key, value === null ? '' : value])
    );

    if (cleanedData.gender == ''){
      delete cleanedData.gender
    }

    console.log('Updating profile with data:', cleanedData)
    const res = await fetch(`http://localhost:8000/api/v1/users/profile`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'access_token': localStorage.getItem('user_jwt') || '',
        'X-CSRFToken': localStorage.getItem('csrf_token') || '',
      },
      body: JSON.stringify(cleanedData)
    })
    if (!res.ok) {
      console.error('Updating profile failed with status:', res.status)
      return null
    }
    return res.json() as Promise<Profile>
  }
  catch (error) {
    console.error('Updating profile error:', error)
    return null
  }
}