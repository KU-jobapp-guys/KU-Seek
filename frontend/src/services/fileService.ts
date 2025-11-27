import api from '@/plugins/axios.client'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

function getAuthHeader(): string {
  const token = authStore.token
  return token ? token : ""
}


export async function getFile(fileld:string){
    const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
    const url = `${base}/api/v1/file/${fileld}`
    const res = await api.get(url, {
      withCredentials: true,
      responseType: 'blob',
      headers: {
        'access_token': getAuthHeader(),
      }
    })

    if (res.status == 200) {
    console.error('Failed to fetch file:', res.status)
    return null
    }
    
    const blob = res.data
    const blobUrl = URL.createObjectURL(blob)

    const win = window.open(blobUrl, '_blank')
    if (win) win.opener = null

    // revoke after a delay to allow the new tab to load
    setTimeout(() => URL.revokeObjectURL(blobUrl), 30000)
}