import { ref, type Ref } from 'vue'
import type { CompanyProfile } from '@/types/companyType'
import type { StudentProfile } from '@/types/studentType'
import type { ProfessorProfile } from '@/types/professorType'

type Profile = CompanyProfile | StudentProfile | ProfessorProfile

export type EditableProfile<T> = {
  isEditing: Ref<boolean>
  editData: Ref<T | null>
  originalData: Ref<T | null>
  editProfile: (data: T) => void
  cancelEdit: () => void
  saveProfile: (targetData: Ref<T | null>, isValidate: boolean) => void
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

  const saveProfile = (
    targetData: Ref<T | null>, 
    hasError: boolean
  ) => {
    if (!editData.value) return
    if (hasError) {
      setTimeout(() => {
        const firstError = document.querySelector('.error-form')
        firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
      return
    }

    targetData.value = editData.value
    console.log("Saved data: ", targetData.value)

    isEditing.value = false
    editData.value = null
    originalData.value = null
    
    return true
  }

  return {
    isEditing,
    editData,
    originalData,
    editProfile,
    cancelEdit,
    saveProfile,
    handleUpdate,
  }
}