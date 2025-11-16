function getAuthHeader(): string {
  const token = localStorage.getItem('user_jwt')
  return token ? token : ""
}


export async function getFileInBrowser(fileld:string){
    const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
    const url = `${base}/api/v1/file/${fileld}`
    const res = await fetch(url, {
      method: "GET",
      credentials: 'include',
      headers: {
        'access_token': getAuthHeader(),
      }
    })

    if (!res.ok) {
    console.error('Failed to fetch file:', res.status)
    return null
    }
    
    const blob = await res.blob()
    const blobUrl = URL.createObjectURL(blob)

    const win = window.open(blobUrl, '_blank')
    if (win) win.opener = null

    // revoke after a delay to allow the new tab to load
    setTimeout(() => URL.revokeObjectURL(blobUrl), 30000)
}

export async function getFile(fileld:string){
    const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'
    const url = `${base}/api/v1/file/${fileld}`
    const res = await fetch(url, {
      method: "GET",
      credentials: 'include',
      headers: {
        'access_token': getAuthHeader(),
      }
    })

    if (!res.ok) {
    console.error('Failed to fetch file:', res.status)
    return null
    }
    
    const blob = await res.blob()
    const blobUrl = URL.createObjectURL(blob)
    return blobUrl
}