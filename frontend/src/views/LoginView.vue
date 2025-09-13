<template>
  <div>Redirecting to the dashboard...</div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  role: String,
})
const emit = defineEmits(['update:role']);
const router = useRouter()
const route = useRoute()


async function handleURICallback() {
  try {
    const code = route.query.code
    if (!code) {
      throw new Error("No code found in callback URL")
    }

    const res = await fetch("http://localhost:8000/api/v1/auth/oauth", {
      method: "POST",
      credentials: 'include',
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code })
    })

    if (res.ok) {
      const user_jwt = await res.json()
      localStorage.setItem('user_jwt', user_jwt.user_token)
      emit('update:role', 'company');
      router.replace({ name: "company dashboard" })
    } else {
      throw new Error("Login request failed, please try again.")
    }
  } catch (error) {
    console.error("Authentication error:", error)
    router.replace({ name: "landing" })
  }
}

handleURICallback()
</script>
