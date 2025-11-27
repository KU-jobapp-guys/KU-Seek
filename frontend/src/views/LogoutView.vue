<template>
    <div class="flex flex-col items-center justify-center w-full h-screen">
    <h1 class="text-3xl font-bold mb-6">Logging you out</h1>
    <!-- Spinning Loading Icon -->
    <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-solid border-opacity-50"></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
const router = useRouter()
const authStore = useAuthStore()

async function logout() {

    const returnPath = localStorage.getItem("userRole") === 'admin' ? '/admin' : '/'
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
            authStore.logout()
            //to be removed
            localStorage.removeItem("csrf_token")
            localStorage.removeItem("access_token")
            localStorage.removeItem("userRole")
            localStorage.removeItem("user_jwt")
            window.dispatchEvent(new Event('userRoleChanged'))
            router.replace({path: returnPath})
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