import { getAuthHeader } from './helperService'
import type { Job } from '@/types/jobType'
import type { JobApplication } from '@/types/applicationType'
import api from '@/plugins/axios.client'


type updateStatusType = Map<number, 'pending' | 'accepted' | 'rejected'>


function toNumber(v: unknown, fallback = 0): number {
  if (typeof v === 'number') return v
  if (typeof v === 'string') {
    const n = Number(v)
    return Number.isNaN(n) ? fallback : n
  }
  return fallback
}

export function mapBackendApplication(b: unknown): JobApplication {
  const obj = (b ?? {}) as Record<string, unknown>

  const applicant = (obj.applicant ?? {}) as Record<string, unknown>
  const jobDetails = (obj.job_details ?? obj.jobDetails ?? {}) as Record<string, unknown>

  const appliedAtRaw = obj.applied_at ?? obj.appliedAt ?? applicant.applied_at ?? applicant.appliedAt
  let appliedAt: Date
  if (typeof appliedAtRaw === 'string') {
    appliedAt = new Date(appliedAtRaw)
  } else if (appliedAtRaw instanceof Date) {
    appliedAt = appliedAtRaw
  } else {
    appliedAt = new Date()
  }

  const id = toNumber(obj.id ?? 0)
  const studentId = toNumber(applicant.user_id ?? applicant.userId ?? obj.student_id ?? obj.studentId ?? 0)

  const mapped: JobApplication = {
    id,
    jobId: String(jobDetails.job_id ?? jobDetails.jobId ?? obj.job_id ?? obj.jobId ?? ''),
    studentId,
    resume: String(obj.resume ?? ''),
    letterOfApplication: String(obj.letter_of_application ?? obj.letterOfApplication ?? obj.letterOfApplication ?? ''),
    phoneNumber: String(obj.phone_number ?? obj.phoneNumber ?? applicant.phone_number ?? applicant.phoneNumber ?? ''),
    status: (String(obj.status ?? 'pending') as 'pending' | 'accepted' | 'rejected'),
    appliedAt,
    location: String(applicant.location ?? obj.location ?? ''),
    firstName: String(applicant.first_name ?? applicant.firstName ?? ''),
    lastName: String(applicant.last_name ?? applicant.lastName ?? ''),
    contactEmail: String(applicant.contact_email ?? applicant.contactEmail ?? ''),
    yearsOfExperience: String(obj.years_of_experience ?? obj.yearsOfExperience ?? ''),
    expectedSalary: String(obj.expected_salary ?? obj.expectedSalary ?? ''),
  }

  return mapped
}

export function normalizeApplications(data: unknown): JobApplication[] {
  const list = Array.isArray(data) ? data : []
  return list.map(mapBackendApplication)
}

async function fetchCsrfToken(base: string): Promise<string> {
  try {
    const res = await api.get(`${base}/api/v1/csrf-token`, { withCredentials: true })
    if (res.status == 200) return ''
    const json = res.data
    return (json && (json.csrf_token || json.token || json.csrf)) ?? ''
  } catch {
    return ''
  }
}


export async function fetchUserAppliedJobs(): Promise<Job[]> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/application`)
  try {
    const csrfToken = await fetchCsrfToken(base)

    const res = await api.get(url.toString(), {
      headers: {
        ...getAuthHeader(),
        'X-CSRFToken': String(csrfToken),
      },
      withCredentials: true,
    })

    if (res.status != 200) {
      console.error('Failed to fetch user applied jobs', res.status)
      return []
    }

    const data = res.data
    const list = Array.isArray(data) ? (data as unknown[]) : []
    return list.map((it) => {
      const raw = it as Record<string, unknown>
      const nestedJob = raw.job as Record<string, unknown> | undefined
      const jobObj = nestedJob && typeof nestedJob === 'object' ? { ...nestedJob } : { ...raw }

      if (raw.status) jobObj.status = raw.status
      if (raw.applied_at && !jobObj.applied_at) jobObj.postTime = raw.applied_at

          // normalize job id field to camelCase for frontend
          const jobRec = jobObj as Record<string, unknown>
          if (!('jobId' in jobRec) && 'job_id' in jobRec) {
            jobRec['jobId'] = String(jobRec['job_id'])
          }

      if (jobObj.postTime && typeof jobObj.postTime === 'string') {
        try {
          jobObj.postTime = new Date(jobObj.postTime as string)
        } catch {
          // ignore
        }
      }

      if (jobObj.salaryMin == null) jobObj.salaryMin = 0
      if (jobObj.salaryMax == null) jobObj.salaryMax = 0

      return (jobObj as unknown) as Job
    })
  } catch (err) {
    console.error('Error fetching user applied jobs', err)
    return []
  }
}


export async function fetchApplicationsByJob(jobId: string): Promise<JobApplication[]> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/application/${encodeURIComponent(jobId)}`)
  try {
    const res = await api.get(url.toString(), {
      headers: {
        ...getAuthHeader(),
      },
      withCredentials: true,
    })
    if (res.status != 200) {
      console.error('Failed to fetch applications for job', jobId, res.status)
      return []
    }
    const data = res.data
    return normalizeApplications(data)
  } catch (err) {
    console.error('Error fetching applications by job', err)
    return []
  }
}

export async function submitApplication(jobId: string, form: FormData): Promise<JobApplication | null> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/application/${encodeURIComponent(jobId)}`)
  try {
    const csrfToken = await fetchCsrfToken(base)
    const headers: Record<string, string> = {
      ...getAuthHeader(),
    }
    if (csrfToken) headers['X-CSRFToken'] = String(csrfToken)
        
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers,
      body: form,
      credentials: 'include',
    })

    const bodyText = await res.text().catch(() => '')
    let parsed: unknown = null
    try {
      parsed = bodyText ? JSON.parse(bodyText) : null
    } catch {
      parsed = null
    }

    if (!res.ok) {
      const parsedObj = parsed as Record<string, unknown> | null
      let msg = bodyText || `Request failed with status ${res.status}`
      if (parsedObj) {
        const m = parsedObj['message'] ?? parsedObj['detail'] ?? parsedObj['error']
        if (typeof m === 'string') msg = m
        else if (m != null) msg = String(m)
      }
      console.error('submitApplication failed', { url: url.toString(), status: res.status, statusText: res.statusText, body: bodyText })
      throw new Error(msg)
    }

    const data = parsed ?? (await (async () => {
      try {
        return await res.json()
      } catch {
        return null
      }
    })())

    if (!data) return null
    if (Array.isArray(data)) {
      return mapBackendApplication(data[0] ?? null)
    }
    return mapBackendApplication(data)
  } catch (err) {
    console.error('Error submitting application', err)
    throw err
  }
}


export async function updateApplicationStatus(jobId: string, pendingApplications: updateStatusType): Promise<JobApplication[]> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/application/update/${encodeURIComponent(jobId)}`)
  
  try {
    const csrfToken = await fetchCsrfToken(base)
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    }
    if (csrfToken) headers['X-CSRFToken'] = String(csrfToken)
    
    const updates = Array.from(pendingApplications).map(([application_id, status]) => ({
      applicationId: application_id,
      status,
    }))
    
    
    const res = await fetch(url.toString(), {
      method: 'PATCH',
      headers,
      body: JSON.stringify(updates),
      credentials: 'include',
    })
    
    if (!res.ok) {
      const errorText = await res.text()
      console.error('Backend error response:', errorText)
      throw new Error(`Failed to update applications: ${res.statusText} - ${errorText}`)
    }

  const data = await res.json().catch(() => [])
  return normalizeApplications(data)
    
  } catch (err) {
    console.error('Error submitting application', err)
    throw err
  }
}