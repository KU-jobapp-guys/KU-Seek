import { getAuthHeader, fetchCsrfToken } from "./helperService"
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
    console.error('Failed to fetch users:', res.status)
    return []
  }

  const data = await res.json()
  return data as User[]
}

export async function reviewUser(approve: boolean, userId: string, toDelete: boolean = false) {
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

export async function fetchJobs(): Promise<Job[] | null> {
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

  // Assuming data is an array of job request objects
  const jobs: Job[] = data.map((item: any) => ({
    jobId: item.job.id,
    title: item.job.title,
    company: item.company.companyName,
    denialReason: item.denialReason,
    status: item.status,
    approvedAt: item.approvedAt,
    createdAt: item.createdAt,
    visibility: item.job.visibility,
  }))

  return jobs
}