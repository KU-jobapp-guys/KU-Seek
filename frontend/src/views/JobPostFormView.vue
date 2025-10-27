<script setup lang="ts">
import JobPostForm from '@/components/jobPostForm/JobPostForm.vue'

const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

/**
 * Submit handler for the job post form.
 * Maps the frontend payload into the backend `JobPost` schema and sends it.
 */
type FormPayload = {
  role?: string
  title?: string
  description?: string
  location?: string
  jobType?: string
  job_type?: string
  salaryMin?: number | string
  salaryMax?: number | string
  salary_min?: number | string
  salary_max?: number | string
  skill_names?: string[]
  skills?: string[]
  tag_names?: string[]
}

const handleSubmit = async (formPayload: FormPayload): Promise<void> => {
  console.log('Submitting Job Post:', formPayload)

  const defaults = {
    work_hours: '9:00 AM - 5:00 PM',
    job_level: 'Mid-level',
    capacity: 1,
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  }

  // Build backend payload using safe fallbacks
  const bodyPayload = {
    title: (formPayload.role || formPayload.title || '') as string,
    description: (formPayload.description || '') as string,
    location: (formPayload.location || '') as string,
    work_hours: defaults.work_hours,
    job_type: ((formPayload.jobType as string) || '').toLowerCase(),
    job_level: defaults.job_level,
    capacity: defaults.capacity,
    end_date: defaults.end_date,
    salary_min: Number(formPayload.salaryMin ?? formPayload.salary_min ?? 0),
    salary_max: Number(formPayload.salaryMax ?? formPayload.salary_max ?? 0),
    skill_names: Array.isArray(formPayload.skill_names)
      ? formPayload.skill_names
      : Array.isArray(formPayload.skills)
      ? formPayload.skills
      : [],
    tag_names: Array.isArray(formPayload.tag_names) ? formPayload.tag_names : [],
  }

  // Prepare headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // Try to fetch CSRF token if backend exposes it
  try {
    const csrfRes = await fetch(`${base}/api/v1/csrf-token`, { credentials: 'include' })
    if (csrfRes.ok) {
      const csrfJson = await csrfRes.json()
      const token = (csrfJson && (csrfJson.csrf_token || csrfJson.token || csrfJson.csrf)) ?? null
      if (token) headers['X-CSRFToken'] = String(token)
    }
  } catch {
    // Non-fatal: some backends don't expose a token endpoint
  }

  // Add JWT if present in localStorage (both custom header and Authorization for safety)
  try {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('user_jwt') || localStorage.getItem('access_token')
      if (accessToken) {
        headers['access_token'] = accessToken
        headers['Authorization'] = `Bearer ${accessToken}`
      }
    }
  } catch {
    // ignore localStorage errors
  }

  // Send request
  try {
    const res = await fetch(`${base}/api/v1/jobs`, {
      method: 'POST',
      headers,
      body: JSON.stringify(bodyPayload),
      credentials: 'include',
    })

    let data: unknown = null
    try {
      data = await res.json()
    } catch {
      // ignore JSON parse errors
    }

    if (!res.ok) {
      console.error('Job post failed:', res.status, data)
      const dataObj = (data && typeof data === 'object') ? (data as Record<string, unknown>) : null
      const msg = (dataObj && (String(dataObj.message ?? dataObj.detail ?? dataObj.error))) || `Failed to submit job post (status ${res.status})`
      alert(msg)
      return
    }

    console.log('Job post response:', data)
    alert('Job Post submitted successfully!')
  } catch (err) {
    console.error('Error submitting job post:', err)
    alert('Failed to submit job post.')
  }
}
</script>

<template>
  <JobPostForm @submit="handleSubmit" />
</template>
