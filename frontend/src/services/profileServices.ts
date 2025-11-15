import type { Profile } from "@/types/profileType"
import { fetchCsrfToken } from "./utills"

export async function getProfileData(user_id: string): Promise<Profile | null> {
  try {
    const res = await fetch(`http://localhost:8000/api/v1/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "access_token": localStorage.getItem("user_jwt") || "",
      },
    })
    if (!res.ok) {
      console.error("Fetching profile failed with status:", res.status)
      return null
    }
    const data = await res.json() as Profile
    return data

  } catch (error) {
    console.error("Fetching profile error:", error)
    return null
  }
}

export async function updateProfileData(plainData: Profile): Promise<Profile | null> {
  try {
    // Replace all null values with ''
    const cleanedData = Object.fromEntries(
      Object.entries(plainData).map(([key, value]) => [key, value === null ? "" : value])
    );

    delete cleanedData.id
    if (cleanedData.gender === "") delete cleanedData.gender
    if (cleanedData.age === "") delete cleanedData.age

    const base = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000"
    const csrfToken = await fetchCsrfToken(base)

    console.log("Updating profile with data:", cleanedData)
    const res = await fetch(`http://localhost:8000/api/v1/users/profile`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "access_token": localStorage.getItem("user_jwt") || "",
        "X-CSRFToken": String(csrfToken),
      },
      body: JSON.stringify(cleanedData),
    })
    if (!res.ok) {
      console.error("Updating profile failed with status:", res.status)
      return null
    }
    return res.json() as Promise<Profile>
  } catch (error) {
    console.error("Updating profile error:", error)
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