<template>
  <div>Redirecting to the dashboard...</div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const emit = defineEmits(['update:role'])
const router = useRouter()
const route = useRoute()

async function handleURICallback() {
  let csrf_token:string

  try {
    const code = route.query.code
    const user_info = localStorage.getItem("userInfo")
    localStorage.removeItem("userInfo")
    if (!code) {
      throw new Error('No code found in callback URL')
    }

    const csrf_res = await fetch("http://localhost:8000/api/v1/csrf-token", {
      method: "GET",
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
      const user_data = JSON.parse(user_info);
      for (let key in user_data) {
        formData.append(key, user_data[key]);
      }
    }


    const res = await fetch("http://localhost:8000/api/v1/auth/oauth", {
      method: "POST",
      credentials: 'include',
      headers: { 
        "X-CSRFToken": csrf_token
      },
      body: formData
    })

    if (res.ok) {
      const user_jwt = await res.json()
      localStorage.setItem('user_jwt', user_jwt.access_token)
      console.log(user_jwt)
      emit('update:role', user_jwt["type"])
      router.replace({ name: `${user_jwt["type"]} dashboard` })
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
