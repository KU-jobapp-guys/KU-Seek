import { getAuthHeader } from "./helperService"
import type { User, Job } from "@/types/adminType"

export async function fetchUsers(): Promise<User[] | null> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/admin/users`)

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      ...getAuthHeader(),
    },
    credentials: 'include',
  })

  if (!res.ok) {
    console.error('Failed to fetch jobs:', res.status)
    return []
  }

  const data = await res.json()
  console.log("fetch data: ", data)
  return data as User[]
}