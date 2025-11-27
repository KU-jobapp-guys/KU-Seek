import { getAuthHeader, fetchCsrfToken } from "./helperService"
import type { UserRequest, JobRequest } from "@/types/adminType"
import api from '@/plugins/axios.client'


export async function fetchUsers(): Promise<UserRequest[] | null> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/admin/users`)

  const res = await api.get(url.toString(), {
    headers: {
      ...getAuthHeader(),
    },
    withCredentials: true,
  })

  if (res.status != 200) {
    console.error('Failed to fetch users:', res.status)
    return []
  }

  const data = await res.data
  console.log("user data: ", data)
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

  const res = await api.post(url.toString(), {
    headers,
    body: JSON.stringify(form),
    withCredentials: true,
  })

  return res
}

export async function fetchJobs(): Promise<JobRequest[] | null> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/admin/jobs`)

  const res = await api.get(url.toString(), {
    headers: {
      ...getAuthHeader(),
    },
    withCredentials: true,
  })

  if (res.status != 200) {
    console.error('Failed to fetch jobs:', res.status)
    return []
  }

  const data = await res.data
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

  const res = await api.post(url.toString(), {
    headers,
    body: JSON.stringify(form),
    withCredentials: true,
  })

  return res
}

export async function getVerificationDocument(fileId: string) {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/file/${fileId}`)

  const res = await api.get(url.toString(), {
    headers: {
      ...getAuthHeader(),
    },
    withCredentials: true,
  })

  return res
}