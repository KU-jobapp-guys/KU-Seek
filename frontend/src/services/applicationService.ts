import type { JobApplication } from '@/types/applicationType'

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
  const jobDetails = (obj.job_details ?? {}) as Record<string, unknown>

  const appliedAtRaw = obj.applied_at ?? obj.appliedAt
  let appliedAt: Date
  if (typeof appliedAtRaw === 'string') {
    appliedAt = new Date(appliedAtRaw)
  } else if (appliedAtRaw instanceof Date) {
    appliedAt = appliedAtRaw
  } else {
    appliedAt = new Date()
  }

  const id = toNumber(obj.id ?? 0)
  const studentId = toNumber(applicant.user_id ?? applicant.userId ?? obj.student_id ?? 0)

  const mapped: JobApplication = {
    id,
    job_id: String(jobDetails.job_id ?? jobDetails.jobId ?? obj.job_id ?? obj.jobId ?? ''),
    student_id: studentId,
    resume: String(obj.resume ?? ''),
    letter_of_application: String(obj.letter_of_application ?? obj.letterOfApplication ?? ''),
    phone_number: String(obj.phone_number ?? obj.phoneNumber ?? ''),
    status: (String(obj.status ?? 'pending') as 'pending' | 'approved' | 'rejected'),
    applied_at: appliedAt,
    location: String(applicant.location ?? obj.location ?? ''),
    first_name: String(applicant.first_name ?? applicant.firstName ?? ''),
    last_name: String(applicant.last_name ?? applicant.lastName ?? ''),
    contact_email: String(applicant.contact_email ?? applicant.contactEmail ?? ''),
    years_of_experience: String(obj.years_of_experience ?? obj.yearsOfExperience ?? ''),
    expected_salary: String(obj.expected_salary ?? obj.expectedSalary ?? ''),
  }

  return mapped
}

export function normalizeApplications(data: unknown): JobApplication[] {
  const list = Array.isArray(data) ? data : []
  return list.map(mapBackendApplication)
}

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('user_jwt') ?? localStorage.getItem('access_token')
  return token ? { Authorization: `Bearer ${token}`, access_token: token } : {}
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

export async function fetchUserApplications(): Promise<JobApplication[]> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/application`)
  try {
    const csrfToken = await fetchCsrfToken(base)

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        ...getAuthHeader(),
        'X-CSRFToken': String(csrfToken),
      },
      credentials: 'include',
    })
    if (!res.ok) {
      console.error('Failed to fetch user applications', res.status)
      return []
    }
    const data = await res.json()
    return normalizeApplications(data)
  } catch (err) {
    console.error('Error fetching user applications', err)
    return []
  }
}


export async function fetchApplicationsByJob(jobId: string): Promise<JobApplication[]> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/application/${encodeURIComponent(jobId)}`)
  try {
    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        ...getAuthHeader(),
      },
      credentials: 'include',
    })
    if (!res.ok) {
      console.error('Failed to fetch applications for job', jobId, res.status)
      return []
    }
    const data = await res.json()
    return normalizeApplications(data)
  } catch (err) {
    console.error('Error fetching applications by job', err)
    return []
  }
}

/**
 * Submit a new application (multipart/form-data) to /application/{job_id}.
 * If the server rejects multipart and expects JSON, we fall back to sending
 * a JSON payload with files encoded as base64.
 */
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

    const text = await res.text()
    let data: unknown = null
    try {
      data = text ? JSON.parse(text) : null
    } catch {
      data = text
    }

    if (!res.ok) {
      const msg = typeof data === 'object' && data !== null ? JSON.stringify(data) : String(data)
      console.error('Failed to submit application', res.status, msg)

      if (typeof msg === 'string' && msg.includes('Did not attempt to load JSON data')) {
        const jsonPayload: Record<string, unknown> = {}
        for (const [k, v] of form.entries()) {
          if (v instanceof File) {
            try {
              const arrayBuffer = await v.arrayBuffer()
              const bytes = new Uint8Array(arrayBuffer)
              let binary = ''
              const chunk = 0x8000
              for (let i = 0; i < bytes.length; i += chunk) {
                binary += String.fromCharCode.apply(null, Array.prototype.slice.call(bytes.subarray(i, i + chunk)))
              }
              const b64 = btoa(binary)
              jsonPayload[k] = { filename: v.name, content_base64: b64, content_type: v.type }
            } catch (e) {
              console.error('Failed to convert file to base64 for fallback', e)
            }
          } else {
            jsonPayload[k] = v
          }
        }

        const headersJson: Record<string, string> = {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        }
        const csrfToken2 = await fetchCsrfToken(base)
        if (csrfToken2) headersJson['X-CSRFToken'] = String(csrfToken2)

        const res2 = await fetch(url.toString(), {
          method: 'POST',
          headers: headersJson,
          body: JSON.stringify(jsonPayload),
          credentials: 'include',
        })

        const txt2 = await res2.text()
        let data2: unknown = null
        try {
          data2 = txt2 ? JSON.parse(txt2) : null
        } catch {
          data2 = txt2
        }
        if (!res2.ok) {
          const msg2 = typeof data2 === 'object' && data2 !== null ? JSON.stringify(data2) : String(data2)
          console.error('JSON fallback failed', res2.status, msg2)
          throw new Error(`Failed to submit application (json fallback): ${res2.status} ${msg2}`)
        }
        if (Array.isArray(data2)) return mapBackendApplication(data2[0] ?? null)
        return mapBackendApplication(data2)
      }

      throw new Error(`Failed to submit application: ${res.status} ${msg}`)
    }

    if (Array.isArray(data)) {
      return mapBackendApplication(data[0] ?? null)
    }
    return mapBackendApplication(data)
  } catch (err) {
    console.error('Error submitting application', err)
    throw err
  }
}

