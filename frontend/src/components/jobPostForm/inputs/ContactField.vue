<script setup lang="ts">
import { ref, computed, watch } from 'vue'

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

// Validators
const validatePhone = (v: string) => /^[0-9]{9,10}$/.test(v)
const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const validateURL = (url: string) => {
  try {
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url
    return new URL(url).hostname.includes('.')
  } catch {
    return false
  }
}

const validateFacebook = (url: string) => {
  try {
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url
    const host = new URL(url).hostname
    return host.includes('facebook.com') || host.endsWith('fb.com')
  } catch {
    return false
  }
}

const validateLinkedIn = (url: string) => {
  try {
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url
    return new URL(url).hostname.includes('linkedin.com')
  } catch {
    return false
  }
}

// Format phone input
watch(
  () => newContact.value.link,
  (val) => {
    if (newContact.value.type === 'Phone') {
      const digits = val.replace(/\D/g, '').slice(0, 10)
      newContact.value.link = digits
    }
  }
)

// LIVE validation (this is the fix)
const validationError = computed(() => {
  const { type, link } = newContact.value

  if (!type || !link.trim()) return ''
  if (type === 'Phone' && !validatePhone(link)) return 'Phone must be 9–10 digits.'
  if (type === 'Email' && !validateEmail(link)) return 'Invalid email address.'
  if (type === 'Facebook' && !validateFacebook(link)) return 'Invalid Facebook link.'
  if (type === 'LinkedIn' && !validateLinkedIn(link)) return 'Invalid LinkedIn link.'
  if (type === 'Website' && !validateURL(link)) return 'Invalid website URL.'

  return ''
})

// Disable add button only when invalid
const canAdd = computed(() => validationError.value === '' && newContact.value.type && newContact.value.link)

// Add contact
const addContact = () => {
  if (!canAdd.value) return

  emit('update:modelValue', [...props.modelValue, { ...newContact.value }])
  newContact.value = { type: '', link: '' }
}
  
const removeContact = (index: number) => {
  const updated = [...props.modelValue]
  updated.splice(index, 1)
  emit('update:modelValue', updated)
}
</script>

<template>
  <div class="space-y-3">
    <!-- Existing contacts -->
    <div
      v-for="(contact, index) in modelValue"
      :key="index"
      class="flex items-center gap-2 text-black"
    >
      <span class="px-3 py-1 bg-gray-200 rounded-lg text-sm">
        {{ contact.type }}: {{ contact.link }}
      </span>
      <button class="text-red-500" @click="removeContact(index)">✕</button>
    </div>

    <!-- Input row -->
    <div class="flex gap-2">
      <select v-model="newContact.type" class="flex-1 px-3 py-2 border rounded-xl text-black">
        <option value="">Select type</option>
        <option v-for="type in contactTypes" :key="type" :value="type">
          {{ type }}
        </option>
      </select>

      <input
        v-model="newContact.link"
        :type="newContact.type === 'Phone' ? 'tel' : 'text'"
        :inputmode="newContact.type === 'Phone' ? 'numeric' : 'text'"
        class="flex-1 px-3 py-2 border rounded-xl text-black"
        placeholder="Enter value"
      />

      <button
        @click="addContact"
        :disabled="!canAdd"
        class="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>

    <!-- Live error message -->
    <p v-if="validationError" class="text-red-500 text-sm">
      {{ validationError }}
    </p>
  </div>
</template>
