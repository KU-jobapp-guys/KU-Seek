import type { Job } from '@/types/jobType'

const mapBackendToJob = (b: unknown): Job => {
  const obj = b as Record<string, unknown>

  const skills = Array.isArray(obj.skills)
    ? (obj.skills as unknown[]).map((s) => {
        if (typeof s === 'string') return s
        if (s && typeof s === 'object') {
          const so = s as Record<string, unknown>
          return typeof so.name === 'string' ? so.name : String(so.name ?? '')
        }
        return String(s)
      })
    : []

  const salaryStr = typeof obj.salary === 'string'
    ? (obj.salary as string)
    : obj.salary_min || obj.salary_max
    ? `${obj.salary_min ?? ''}${obj.salary_min && obj.salary_max ? ' - ' : ''}${obj.salary_max ?? ''}`
    : undefined

  const item: Job = {
    jobId: String(obj.id ?? obj.jobId ?? ''),
    company:
      obj.company && typeof obj.company === 'object'
        ? String((obj.company as Record<string, unknown>).company_name ?? '')
        : String(obj.company ?? ''),
    role: (obj.title ?? obj.role ?? '') as string,
    location: (obj.location ?? '') as string,
    postTime: obj.created_at ? new Date(String(obj.created_at)) : obj.postTime ? new Date(String(obj.postTime)) : new Date(),
    description: (obj.description ?? '') as string,
    highlights: Array.isArray(obj.highlights) ? (obj.highlights as string[]) : [],
    jobType: (obj.job_type ?? obj.jobType ?? '') as string,
    jobLevel: (obj.job_level ?? obj.jobLevel ?? '') as string,
    skills,
    salary: salaryStr as string | undefined,
  }

  return item
}

export async function fetchJobs(filters?: Record<string, string>): Promise<Job[]> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/jobs`)
  // append simple query filters
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

  const list = (await res.json()) as unknown[]
  return list.map(mapBackendToJob)
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
  let backendObj: unknown | null = null
  if (Array.isArray(data)) {
    backendObj = data[0] ?? null
  } else if (data && typeof data === 'object') {
    backendObj = data
  }

  if (!backendObj) return null

  return mapBackendToJob(backendObj)
}
