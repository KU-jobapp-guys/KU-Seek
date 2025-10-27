import { defineStore } from 'pinia'
import { ref } from 'vue'

export function isOwner(userId: string) {
  const thisId = userId
  const storedUserId = localStorage.getItem('userId')
  return storedUserId === thisId
}

export function getUserId() {
  return localStorage.getItem('userId') || '1'
}

export function getUserRole() {
  return 'company'
}

export const useUserStore = defineStore('user', () => {
  const profileImage = ref<string | null>(null)
  const userName = ref<string>('')
  const userEmail = ref<string>('')
  
  function setUserData(data: { image?: string; name?: string; email?: string }) {
    if (data.image) profileImage.value = data.image
    if (data.name) userName.value = data.name
    if (data.email) userEmail.value = data.email
  }
  
  function clearUserData() {
    profileImage.value = null
    userName.value = ''
    userEmail.value = ''
  }
  
  return {
    profileImage,
    userName,
    userEmail,
    setUserData,
    clearUserData
  }
})