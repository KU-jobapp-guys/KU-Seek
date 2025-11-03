<script setup lang="ts">
import JobPostForm from '@/components/jobPostForm/JobPostForm.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

const router = useRouter()


type FormPayload = {
  title?: string
  description?: string
  location?: string
  jobType?: string
  salaryMin?: number | string
  salaryMax?: number | string
  skillNames?: string[]
  skills?: string[]
  tagNames?: string[]
}

const handleSubmit = async (formPayload: FormPayload): Promise<void> => {

    const defaults = {
      workHours: '9:00 AM - 5:00 PM',
      jobLevel: 'Mid-level',
      capacity: 1,
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }

    const anyPayload = formPayload as Record<string, unknown>
    const bodyPayload = {
      title: String(anyPayload.role ?? anyPayload.title ?? ''),
      description: String(anyPayload.description ?? ''),
      location: String(anyPayload.location ?? ''),
      workHours: String(anyPayload.workHours ?? anyPayload.work_hours ?? defaults.workHours),
      jobType: String((anyPayload.jobType ?? anyPayload.job_type ?? '')).toLowerCase(),
      jobLevel: String(anyPayload.jobLevel ?? anyPayload.job_level ?? defaults.jobLevel),
      capacity: Number(anyPayload.capacity ?? defaults.capacity),
      endDate: String(anyPayload.endDate ?? anyPayload.end_date ?? defaults.endDate),
      salaryMin: Number(anyPayload.salaryMin ?? anyPayload.salary_min ?? 0),
      salaryMax: Number(anyPayload.salaryMax ?? anyPayload.salary_max ?? 0),
      skillNames: Array.isArray(anyPayload.skillNames)
        ? (anyPayload.skillNames as string[])
        : Array.isArray(anyPayload.skills)
        ? (anyPayload.skills as string[])
        : [],
      tagNames: Array.isArray(anyPayload.tagNames)
        ? (anyPayload.tagNames as string[])
        : Array.isArray(anyPayload.tag_names)
        ? (anyPayload.tag_names as string[])
        : [],
    }

  // Prepare headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  try {
    const csrfRes = await fetch(`${base}/api/v1/csrf-token`, { credentials: 'include' })
    if (csrfRes.ok) {
      const csrfJson = await csrfRes.json()
      const token = (csrfJson && (csrfJson.csrf_token || csrfJson.token || csrfJson.csrf)) ?? null
      if (token) headers['X-CSRFToken'] = String(token)
    }
  } catch {
  }

  try {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('user_jwt') || localStorage.getItem('access_token')
      if (accessToken) {
        headers['access_token'] = accessToken
      }
    }
  } catch {
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

    alert('Job Post submitted successfully!')
    router.replace("/company/dashboard")

  } catch (err) {
    console.error('Error submitting job post:', err)
    alert('Failed to submit job post.')
  }
}

onMounted(() => {
  scrollTo(0, 0)
})
</script>

<template>
  <JobPostForm @submit="handleSubmit" />
</template>
