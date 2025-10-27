import type { Job } from '@/types/jobType'


export async function fetchJobs(filters?: Record<string, string>): Promise<Job[]> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/jobs`)
  if (filters) {
    Object.entries(filters).forEach(([k, v]) => {
      if (v) url.searchParams.append(k, v)
    })
  }

  const res = await fetch(url.toString())
  if (!res.ok) {
    console.error('Failed to fetch jobs:', res.status)
    return []
  }

  const data = await res.json()
  const list = (Array.isArray(data) ? data : []) as unknown[]
  return list.map((it) => {
    const obj = it as Record<string, unknown>
    if (obj.postTime && typeof obj.postTime === 'string') {
      obj.postTime = new Date(obj.postTime)
     
    }
    return (obj as unknown) as Job
  })
}

export async function fetchJob(jobId: string | number): Promise<Job | null> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/jobs`)
  url.searchParams.append('job_id', String(jobId))

  const res = await fetch(url.toString())
  if (!res.ok) {
    console.error('Failed to fetch job:', res.status)
    return null
  }

  const data = await res.json()
  if (Array.isArray(data)) {
    const first = data[0] ?? null
    if (!first) return null
    const obj = first as Record<string, unknown>
    if (obj.postTime && typeof obj.postTime === 'string') {
      try {
        obj.postTime = new Date(obj.postTime)
      } catch {
        // ignore
      }
    }
    return (obj as unknown) as Job
  }

  if (data && typeof data === 'object') {
    const obj = data as Record<string, unknown>
    if (obj.postTime && typeof obj.postTime === 'string') {
      try {
        obj.postTime = new Date(obj.postTime)
      } catch {
        // ignore
      }
    }
    return (obj as unknown) as Job
  }

  return null
}
