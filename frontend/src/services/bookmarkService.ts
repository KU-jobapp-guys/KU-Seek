import { fetchCsrfToken, getAuthHeader } from '@/services/jobService.ts'
import type { Job } from '@/types/jobType'


export async function fetchBookmarkId(): Promise<string[]> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/bookmarks`)
  try {            
    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      credentials: 'include',
    })

    if (!res.ok) {
      const bodyText = await res.text().catch(() => '<no body>')
      console.error('Failed to fetch bookmarks', {
        url: url.toString(),
        status: res.status,
        statusText: res.statusText,
        body: bodyText,
      })
      return []
    }

    const data = await res.json()
    const list = (Array.isArray(data) ? data : []) as unknown[]
    return list.map((it) => {
      const obj = it as Record<string, number>
      return obj.jobId.toString()
    })
  } catch (err) {
    console.error('Error fetching bookmarks', err)
    return []
  }
}


export async function fetchBookmarkJobs(): Promise<Job[]> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/bookmarks`)
  try {
    const csrfToken = await fetchCsrfToken(base)
            
  const payload = { isOwner: true }
    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-CSRFToken': String(csrfToken),
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      credentials: 'include',
    })

    if (!res.ok) {
      const bodyText = await res.text().catch(() => '<no body>')
      console.error('Failed to fetch bookmarks', {
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
        obj.postTime = new Date(obj.postTime)   
      }
      return (obj as unknown) as Job
    })
  } catch (err) {
    console.error('Error fetching bookmarks', err)
    return []
  }
}


export async function postBookmark(jobId: string): Promise<boolean> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/bookmarks`)
  try {
    const csrfToken = await fetchCsrfToken(base)
            
  const payload = { jobId: Number(jobId) }
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'X-CSRFToken': String(csrfToken),
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    })

    if (!res.ok) {
      const bodyText = await res.text().catch(() => '<no body>')
      console.error('Failed to post bookmarks', {
        url: url.toString(),
        status: res.status,
        statusText: res.statusText,
        body: bodyText,
        payload,
      })
      return false
    }
    return true

  } catch (err) {
    console.error('Error fetching bookmarks', err)
    return false
  }
}

export async function deleteBookmark(jobId: string): Promise<boolean> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/bookmarks`)
  try {
    const csrfToken = await fetchCsrfToken(base)
            
    const payload = `?job_id=${Number(jobId)}`
    const res = await fetch(url.toString().concat(payload), {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': String(csrfToken),
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    })

    if (!res.ok) {
      const bodyText = await res.text().catch(() => '<no body>')
      console.error('Failed to delete bookmarks', {
        url: url.toString(),
        status: res.status,
        statusText: res.statusText,
        body: bodyText,
        payload,
      })
      return false
    }
    return true

  } catch (err) {
    console.error('Error deleting bookmarks', err)
    return false
  }
}

