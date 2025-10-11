<template>
  <div>Redirecting to the dashboard...</div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const emit = defineEmits(['update:role'])
const router = useRouter()
const route = useRoute()

async function handleURICallback() {
  let csrf_token: string

  try {
    const code = route.query.code
    if (!code) {
      throw new Error('No code found in callback URL')
    }

    const csrf_res = await fetch('http://localhost:8000/api/v1/csrf-token', {
      method: 'GET',
      credentials: 'include',
    })
    if (csrf_res.ok) {
      const csrf_json = await csrf_res.json()
      csrf_token = csrf_json.csrf_token
      localStorage.setItem('csrf_token', csrf_token)
    } else {
      throw new Error('Login request failed, please try again.')
    }

    const res = await fetch('http://localhost:8000/api/v1/auth/oauth', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf_token,
      },
      body: JSON.stringify({ code }),
    })

    if (res.ok) {
      const user_jwt = await res.json()
      console.log(user_jwt)
      localStorage.setItem('user_jwt', user_jwt.access_token)
      localStorage.setItem('user_id', '66fbb875-897a-4bec-8f44-403f0c468b7c')
      emit('update:role', 'company')
      router.replace({ name: 'company dashboard' })
    } else {
      throw new Error(`Login request failed, please try again.`)
    }
  } catch (error) {
    console.error('Authentication error:', error)
    router.replace({ name: 'landing' })
  }
}

handleURICallback()
</script>
