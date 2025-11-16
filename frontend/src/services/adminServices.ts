import { getAuthHeader, fetchCsrfToken } from "./helperService"
import type { UserRequest, JobRequest } from "@/types/adminType"

export async function fetchUsers(): Promise<UserRequest[] | null> {
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
    console.error('Failed to fetch users:', res.status)
    return []
  }

  const data = await res.json()
  return data as UserRequest[]
}

export async function updateUserStatus(approve: boolean, userId: string, toDelete: boolean = false) {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/admin/users`)

  const csrfToken = await fetchCsrfToken(base)
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
  }
  if (csrfToken) headers['X-CSRFToken'] = String(csrfToken)

  const form = [{
    "user_id": userId,
    "is_accepted": approve,
    "delete": toDelete
  }]

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers,
    body: JSON.stringify(form),
    credentials: 'include',
  })

  return res
}

export async function fetchJobs(): Promise<JobRequest[] | null> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/admin/jobs`)

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
  console.log("data: ", data)

  return data as JobRequest[]
}

export async function updateJobStatus(approve: boolean, jobId: string, toDelete: boolean = false) {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/admin/jobs`)

  const csrfToken = await fetchCsrfToken(base)
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
  }
  if (csrfToken) headers['X-CSRFToken'] = String(csrfToken)

  const form = [{
    "job_id": jobId,
    "is_accepted": approve,
    "delete": toDelete
  }]

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers,
    body: JSON.stringify(form),
    credentials: 'include',
  })

  return res
}