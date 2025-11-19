import type { Profile } from "@/types/profileType"
import { fetchCsrfToken, getAuthHeader } from "./utills"
import type { Company } from "@/types/companyType"

interface ConnectionResponse {
  company_id: number
  created_at: string
  id: number
  professor_id: number
}

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

export async function getSettingData(): Promise<Profile | null> {
  try {
    const res = await fetch(`http://localhost:8000/api/v1/settings`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'access_token': localStorage.getItem('user_jwt') || ''
      },
    })
    if (!res.ok) {
      console.error('Fetching settings failed with status:', res.status)
      return null
    }
    return res.json() as Promise<Profile>
  }
  catch (error) {
    console.error('Fetching profile error:', error)
    return null
  }
}

export async function updateUserData(plainData: Partial<Profile>)  {
  try {
    // Replace all null values with ''
    const cleanedData = Object.fromEntries(
        Object.entries(plainData).map(([key, value]) => [key, value === null ? '' : value])
    );

    if (cleanedData.gender == '') delete cleanedData.gender
    if (cleanedData.age == '') delete cleanedData.age
    if (cleanedData.gpa == '') delete cleanedData.gpa

    delete cleanedData.id

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
    return res
  }
  catch (error) {
    console.error('Updating profile error:', error)
    return null
  }
}

export async function updateProfileImages(
  profile_image: File | null,
  banner_image: File | null
): Promise<{ profile_url?: string; banner_url?: string } | null> {
  try {
    const formData = new FormData()

    if (profile_image) {
      formData.append("profile_img", profile_image)
    }

    if (banner_image) {
      formData.append("banner_img", banner_image)
    }

    const base = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000"
    const csrfToken = await fetchCsrfToken(base)

    const res = await fetch(`${base}/api/v1/users/images`, {
      method: "POST",
      credentials: "include",
      headers: {
        "access_token": localStorage.getItem("user_jwt") || "",
        "X-CSRFToken": String(csrfToken),
      },
      body: formData,
    })

    if (!res.ok) {
      console.error("Updating profile images failed with status:", res.status)
      return null
    }

    return await res.json()
  } catch (error) {
    console.error("Updating profile images error:", error)
    return null
  }
}

export async function fetchAllCompanies(): Promise<Company[] | null> {
  try {
    const base = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

    const response = await fetch(`${base}/api/v1/companies`, {
      method: "GET",
      headers: getAuthHeader(),
      credentials: "include",
    });

    if (!response.ok) {
      console.error(
        "Failed to fetch companies",
        response.status,
        await response.text()
      );
      return null;
    }

    const data: Company[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching companies", error);
    return null;
  }
}

export async function fetchConnections(): Promise<string[] | null> {
  try {
    const base = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

    const response = await fetch(`${base}/api/v1/connections`, {
      method: "GET",
      headers: getAuthHeader(),
      credentials: "include",
    });

    if (!response.ok) {
      console.error(
        "Failed to fetch connections",
        response.status,
        await response.text()
      );
      return null;
    }

    const data = await response.json();

    // Extract only company_id
    const companyIds = data.map((item: ConnectionResponse) => String(item.company_id));

    return companyIds;
  } catch (error) {
    console.error("Error fetching connections", error);
    return null;
  }
}