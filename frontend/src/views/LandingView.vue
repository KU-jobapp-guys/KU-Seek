<template>
  <div>
  <h1 class="p-12 font-bold text-6xl">Landing Page</h1>
    <button @click="loginWithGoogle" class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
      Sign in with Google
    </button>
  </div>
</template>

<script setup lang="ts">


function loginWithGoogle() {
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:5173/login&prompt=consent&response_type=code&client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&scope=openid%20email%20profile&access_type=offline`;
    }
</script>