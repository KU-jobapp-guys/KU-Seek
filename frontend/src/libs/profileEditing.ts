import { ref, type Ref } from 'vue'
import type { Profile } from '@/types/profileType'

export type EditableProfile<T> = {
  isEditing: Ref<boolean>
  editData: Ref<T | null>
  originalData: Ref<T | null>
  editProfile: (data: T) => void
  cancelEdit: () => void
  checkProfile: () => boolean
  saveProfile: () => void
  handleUpdate: (data: T) => void
}

export function useEditableProfile<T extends Profile>(): EditableProfile<T> {
  const isEditing = ref(false)
  const editData = ref<T | null>(null) as Ref<T | null>
  const originalData = ref<T | null>(null) as Ref<T | null>

  const editProfile = (data: T) => {
    originalData.value = JSON.parse(JSON.stringify(data)) as T
    editData.value = JSON.parse(JSON.stringify(data)) as T
    isEditing.value = true
  }

  const cancelEdit = () => {
    isEditing.value = false
    editData.value = null
    originalData.value = null
  }

  const handleUpdate = (data: T) => {
    editData.value = data
  }

  const checkProfile = () => {
    if (!editData.value) return false

    const firstError = document.querySelector('.error-form')
    if (firstError) {
      console.log('Found error element:', firstError)
      setTimeout(() => {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
      return false
    }
    
    return true
  }

  const saveProfile = () => {
    isEditing.value = false
    editData.value = null
  }

  return {
    isEditing,
    editData,
    originalData,
    editProfile,
    cancelEdit,
    checkProfile,
    saveProfile,
    handleUpdate,
  }
}
