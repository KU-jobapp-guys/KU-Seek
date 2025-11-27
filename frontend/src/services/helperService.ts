import api from '@/plugins/axios.client'
import { useAuthStore } from '@/stores/auth'


export async function fetchCsrfToken(base: string): Promise<string> {
  try {
    const authStore = useAuthStore()
    const res = await api.get(`${base}/api/v1/csrf-token`, { withCredentials: true })
    if (res.status != 200) return ''
    const json = res.data
    return (json && (json.csrf_token || json.token || json.csrf)) ?? ''
  } catch {
    return ''
  }
}

export function getAuthHeader(): Record<string, string>
 {
  const authStore = useAuthStore()
  const token = authStore.token
  return token ? { access_token: token } : {}
}