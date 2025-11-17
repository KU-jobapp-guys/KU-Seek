import type { Profile } from "@/types/profileType"
import { getAuthHeader } from "./helperServices"
import type { Company } from "@/types/companyType"

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
    const data = await res.json() as Profile
    return data

  }
  catch (error) {
    console.error('Fetching profile error:', error)
    return null
  }
}

export async function updateProfileData(plainData: Profile): Promise<Profile | null>  {
  try {
    // Replace all null values with ''
    const cleanedData = Object.fromEntries(
        Object.entries(plainData).map(([key, value]) => [key, value === null ? '' : value])
    );

    delete cleanedData.id
    if (cleanedData.gender === '') delete cleanedData.gender
    if (cleanedData.age === '') delete cleanedData.age

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
    const companyIds = data.map((item: any) => String(item.company_id));

    return companyIds;
  } catch (error) {
    console.error("Error fetching connections", error);
    return null;
  }
}
