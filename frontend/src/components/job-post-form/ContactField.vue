<script setup lang="ts">
import { ref } from 'vue'

interface Contact {
  type: string
  link: string
}

const props = defineProps<{
  modelValue: Contact[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Contact[]): void
}>()

const contactTypes = ['Email', 'Phone', 'Facebook', 'LinkedIn', 'Website']

const newContact = ref<Contact>({ type: '', link: '' })
const error = ref('')

// --- Validation helpers ---
const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[0-9\s\-()]{7,15}$/
  return phoneRegex.test(phone)
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateURL = (url: string): boolean => {
  try {
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url
    const parsed = new URL(url)
    return parsed.hostname.includes('.')
  } catch {
    return false
  }
}

const validateFacebook = (url: string): boolean => {
  try {
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url
    const parsed = new URL(url)
    return parsed.hostname.includes('facebook.com') || parsed.hostname.endsWith('fb.com')
  } catch {
    return false
  }
}

const validateLinkedIn = (url: string): boolean => {
  try {
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url
    const parsed = new URL(url)
    return parsed.hostname.includes('linkedin.com')
  } catch {
    return false
  }
}

// --- Add Contact ---
const addContact = (): void => {
  error.value = ''

  if (!newContact.value.type || !newContact.value.link.trim()) {
    error.value = 'Please fill out all fields.'
    return
  }

  const { type, link } = newContact.value

  if (type === 'Phone' && !validatePhone(link)) {
    error.value = 'Invalid phone number format.'
    return
  }

  if (type === 'Email' && !validateEmail(link)) {
    error.value = 'Invalid email address.'
    return
  }

  if (type === 'Facebook' && !validateFacebook(link)) {
    error.value = 'Invalid Facebook profile/page link.'
    return
  }

  if (type === 'LinkedIn' && !validateLinkedIn(link)) {
    error.value = 'Invalid LinkedIn profile link.'
    return
  }

  if (type === 'Website' && !validateURL(link)) {
    error.value = 'Invalid website URL.'
    return
  }

  emit('update:modelValue', [...props.modelValue, { ...newContact.value }])
  newContact.value = { type: '', link: '' }
}

const removeContact = (index: number): void => {
  const updated = [...props.modelValue]
  updated.splice(index, 1)
  emit('update:modelValue', updated)
}
</script>

<template>
  <div class="space-y-3">
    <!-- Existing Contacts -->
    <div
      v-for="(contact, index) in modelValue"
      :key="index"
      class="flex items-center gap-2 text-black"
    >
      <span class="px-3 py-1 bg-gray-200 rounded-lg text-sm">
        {{ contact.type }}: {{ contact.link }}
      </span>
      <button type="button" class="text-red-500" @click="removeContact(index)">✕</button>
    </div>

    <!-- New Contact Input -->
    <div class="flex gap-2">
      <select v-model="newContact.type" class="flex-1 px-3 py-2 border rounded-xl text-black">
        <option value="">Select type</option>
        <option v-for="type in contactTypes" :key="type" :value="type">{{ type }}</option>
      </select>

      <input
        v-model="newContact.link"
        :placeholder="
          newContact.type === 'Phone'
            ? 'Enter phone number'
            : newContact.type === 'Email'
              ? 'Enter email address'
              : 'Enter link or username'
        "
        class="flex-1 px-3 py-2 border rounded-xl text-black"
      />

      <button
        type="button"
        class="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        @click="addContact"
      >
        +
      </button>
    </div>

    <!-- Error Message -->
    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
  </div>
</template>
