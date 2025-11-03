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

async function fetchCsrfToken(base: string): Promise<string> {
  try {
    const res = await fetch(`${base}/api/v1/csrf-token`, { credentials: 'include' })
    if (!res.ok) return ''
    const json = await res.json()
    return (json && (json.csrf_token || json.token || json.csrf)) ?? ''
  } catch {
    return ''
  }
}

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('user_jwt') ?? localStorage.getItem('access_token')
  return token ? { access_token: token } : {}
}

export async function fetchCompanyJobs(): Promise<Job[]> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/jobs/search`)
  try {
    const csrfToken = await fetchCsrfToken(base)
            
  const payload = { isOwner: true }
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'X-CSRFToken': String(csrfToken),
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const bodyText = await res.text().catch(() => '<no body>')
      console.error('Failed to fetch company jobs', {
        url: url.toString(),
        status: res.status,
        statusText: res.statusText,
        body: bodyText,
        payload,
      })
      return []
    }

    const data = await res.json()
    const list = (Array.isArray(data) ? data : []) as unknown[]
    return list.map((it) => {
      const obj = it as Record<string, unknown>
      if (obj.postTime && typeof obj.postTime === 'string') {
        try {
          obj.postTime = new Date(obj.postTime as string)
        } catch {
        }
      }
      return (obj as unknown) as Job
    })
  } catch (err) {
    console.error('Error fetching company jobs', err)
    return []
  }
}

