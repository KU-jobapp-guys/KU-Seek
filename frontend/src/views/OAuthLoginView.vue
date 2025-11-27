<template>
  <LoadingScreen />
</template>

<script setup lang="ts">
import LoadingScreen from '@/components/layouts/LoadingScreen.vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const route = useRoute()
const toast = useToast()

async function handleURICallback() {
  let csrf_token: string

  try {
    const code = route.query.code
    const user_info = localStorage.getItem("userInfo")
    const user_file = localStorage.getItem("userFile")
    
    localStorage.removeItem("userInfo")
    localStorage.removeItem("userFile")
    
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

    const formData = new FormData();
    formData.append("code", code.toString())
    
    if (user_info) {
      formData.append('user_info', user_info)
    }

    if (user_file) {
      const fileData = JSON.parse(user_file)
      // Convert base64 back to File object
      const base64Response = await fetch(fileData.data)
      const blob = await base64Response.blob()
      const file = new File([blob], fileData.name, { type: fileData.type })
      formData.append('id_doc', file)
    }

    const res = await fetch("http://localhost:8000/api/v1/auth/oauth", {
      method: "POST",
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrf_token,
      },
      body: formData
    })

    if (res.ok) {
      const user_jwt = await res.json()
      localStorage.setItem('user_jwt', user_jwt.access_token)
      localStorage.setItem('userRole', user_jwt.type)
      localStorage.setItem('user_id', user_jwt.user_id)
      window.dispatchEvent(new Event('userRoleChanged'))
      router.replace({ name: `${user_jwt.type} dashboard` })
    } else {
      const error = await res.json()
      toast.error(error.message)
      router.replace({ name: 'landing' })
    }
  } catch (error) {
    console.error('Authentication error:', error)
    router.replace({ name: 'landing' })
  }
}

handleURICallback()
</script>
