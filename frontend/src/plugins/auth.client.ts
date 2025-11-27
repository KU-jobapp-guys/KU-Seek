import type { App } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from './axios.client'
import router from '@/router'

interface DecodedToken {
  exp: number
  [key: string]: any
}

// Route whitelist configuration
const ROUTE_WHITELIST_CONFIG = {
  exact: ['/admin', '/login', '/', 'registration'],
  startsWith: ['/tos'],
}

/**
 * Check if a route is whitelisted (public)
 */
const isRouteWhitelisted = (path: string): boolean => {
  if (ROUTE_WHITELIST_CONFIG.exact.includes(path)) {
    return true
  }
  return ROUTE_WHITELIST_CONFIG.startsWith.some((prefix) => path.startsWith(prefix))
}

/**
 * Logout user and redirect appropriately
 */
const logout = (): void => {
  const authStore = useAuthStore()
  const isAdmin = authStore.isAdmin

  // Clear auth data
  authStore.logout()

  // Check if current route is whitelisted
  const currentPath = router.currentRoute.value.path
  if (isRouteWhitelisted(currentPath)) {
    return
  }

  // Redirect based on role
  if (isAdmin) {
    router.replace('/admin')
  } else {
    router.replace('/login')
  }
}

/**
 * Refresh user jwt tokens
 */
const refreshJwtTokens = async (): Promise<void> => {
  const authStore = useAuthStore()

  try {
    const response = await api.get('/refresh')

    if (response.data) {
      authStore.setAuthData({
        access_token: response.data.access_token,
        email: response.data.email,
        type: response.data.type,
        user_id: response.data.user_id,
      })

      // Redirect to appropriate dashboard
      const redirectPath = authStore.getRedirectPath()
      const currentPath = router.currentRoute.value.path

      // Only redirect if not already on a protected route
      if (currentPath === '/' || currentPath === '/login') {
        router.replace(redirectPath)
      }
    }
  } catch (error) {
    console.error('Authentication failed:', error)
    // Don't logout on initial auth failure - user might not be logged in
  }
}

/**
 * Initialize auth system
 */
const initializeAuth = async (): Promise<void> => {
  const authStore = useAuthStore()
}

// Export auth utilities
export const authClient = {
  logout,
  authenticateWithToken: refreshJwtTokens,
  initializeAuth,
  isRouteWhitelisted,
}

// Vue plugin
export default {
  install: (app: App) => {
    // Initialize auth on app mount
    initializeAuth()

    // Provide auth utilities globally
    app.config.globalProperties.$auth = authClient
  }
}