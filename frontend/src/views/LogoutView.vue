<template></template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const emit = defineEmits(['update:role'])

async function logout() {
    try {
        const csrfToken = localStorage.getItem("csrf_token")
        if (!csrfToken) {
            backToPreviousPage()
            return
        }
        const res = await fetch("http://localhost:8000/api/v1/auth/logout", {
        method: "POST",
        credentials: 'include',
        headers: {
            'X-CSRFToken': csrfToken,
        },
        })
        if (res.ok) {
            localStorage.removeItem("csrf_token")
            localStorage.removeItem("access_token")
            localStorage.removeItem("userRole")
            emit('update:role', 'vistor')
            router.replace({path: '/'})
        } else {
            backToPreviousPage()
            return
        }
    } catch (error) {
    console.error('Error during logout:', error)
    backToPreviousPage()
  }
}

function backToPreviousPage(){
    console.log("Could not logout.")
    if (window.history.length > 1) {
        router.back();
    } else {
        router.replace({ path: '/' });
    }
}
logout()
</script>