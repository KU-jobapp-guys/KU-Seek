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

  console.log( list.map(mapBackendApplication))
  return list.map(mapBackendApplication)
}

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('user_jwt') ?? localStorage.getItem('access_token')
  return token ? { 'access_token': token } : {}
}


export async function fetchUserApplications(): Promise<JobApplication[]> {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
  const url = new URL(`${base}/api/v1/application`)
  try {
    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        ...getAuthHeader(),
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
