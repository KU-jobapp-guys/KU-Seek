export async function fetchCsrfToken(base: string): Promise<string> {
  try {
    const res = await fetch(`${base}/api/v1/csrf-token`, { credentials: 'include' })
    if (!res.ok) return ''
    const json = await res.json()
    return (json && (json.csrf_token || json.token || json.csrf)) ?? ''
  } catch {
    return ''
  }
}