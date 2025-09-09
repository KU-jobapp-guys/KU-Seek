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

const addContact = (): void => {
  if (newContact.value.type && newContact.value.link) {
    emit('update:modelValue', [...props.modelValue, { ...newContact.value }])
    newContact.value = { type: '', link: '' }
  }
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
        placeholder="Contact Link"
        class="flex-1 px-3 py-2 border rounded-xl text-black"
      />
      <button type="button" class="px-4 py-2 bg-blue-600 text-white rounded-xl" @click="addContact">
        +
      </button>
    </div>
  </div>
</template>
