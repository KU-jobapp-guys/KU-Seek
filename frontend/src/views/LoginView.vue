<template>
  <div>Redirecting to the dashboard...</div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '../plugins/axios.client'

const emit = defineEmits(['update:role'])
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

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

    try {
      const csrf_res = await api.get(
        'http://localhost:8000/api/v1/csrf-token',
        {
          withCredentials: true,
        }
      );

      csrf_token = csrf_res.data.csrf_token;
      localStorage.setItem('csrf_token', csrf_token);
    } catch (error) {
      throw new Error('Login request failed, please try again.');
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

    const res = await api.post(
      "http://localhost:8000/api/v1/auth/oauth",
      formData,
      {
        withCredentials: true,
        headers: {
          "X-CSRFToken": csrf_token,
        }
      }
    );

    if (res.status == 200) {
      const user_jwt = res.data
      authStore.setAuthData(user_jwt)
      console.log(authStore.token)
      // to be removed
      localStorage.setItem('user_jwt', user_jwt.access_token)
      localStorage.setItem('userRole', user_jwt.type)
      localStorage.setItem('user_id', user_jwt.user_id)
      window.dispatchEvent(new Event('userRoleChanged'))
      emit('update:role', user_jwt.type)
      router.replace({ name: `${user_jwt.type} dashboard` })
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
