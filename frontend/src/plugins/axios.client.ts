import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth'

// Extended config interface for retry flag
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

// Queue for requests during token refresh
interface QueueItem {
  resolve: (value: AxiosResponse) => void
  reject: (error: AxiosError) => void
}

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1/',
  timeout: 10000,
  withCredentials: true, // Important for refresh cookie
})

// Global state for refresh mechanism
let failedQueue: QueueItem[] = []
let isRefreshing = false

// Simple global loading state
let activeRequests = 0

/**
 * Process queued requests after token refresh
 */
function processQueue(error: AxiosError | null = null): void {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error)
    } else {
      // Simply resolve - the promise handler will retry the request
      promise.resolve({} as AxiosResponse)
    }
  })
  failedQueue = []
}

/**
 * Request interceptor - Add auth token to headers
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const auth = useAuthStore()

    activeRequests++

    // Add token to headers if available
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`
    }

    return config
  },
  (error: AxiosError) => {
    activeRequests--
    return Promise.reject(error)
  }
)

/**
 * Response interceptor - Handle token refresh on 401
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    activeRequests--
    return response
  },

  async (error: AxiosError) => {
    activeRequests--

    const auth = useAuthStore()
    const originalRequest = error.config as ExtendedAxiosRequestConfig

    // Check if error is 401 and we haven't retried yet
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true

      // If not already refreshing, start refresh process
      if (!isRefreshing) {
        isRefreshing = true

        try {
          // Use store's refresh method
          await auth.refreshToken()

          // Update original request with new token
          originalRequest.headers.Authorization = `Bearer ${auth.token}`

          // Process queued requests
          isRefreshing = false
          processQueue()

          // Retry original request
          return api(originalRequest)

        } catch (refreshError) {
          // Refresh failed - clear queue and logout
          isRefreshing = false
          processQueue(refreshError as AxiosError)
          
          // Dynamically import to avoid circular dependency
          const { authClient } = await import('./auth.client')
          authClient.logout()
          
          return Promise.reject(refreshError)
        }
      }

      // If already refreshing, queue this request
      return new Promise<AxiosResponse>((resolve, reject) => {
        failedQueue.push({
          resolve: () => {
            originalRequest.headers.Authorization = `Bearer ${auth.token}`
            api(originalRequest).then(resolve).catch(reject)
          },
          reject: (err: AxiosError) => {
            reject(err)
          },
        })
      })
    }

    // For other errors, reject immediately
    return Promise.reject(error)
  }
)

export default api
