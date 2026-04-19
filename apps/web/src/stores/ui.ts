import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  // State
  const isCreateProfileModalOpen = ref(false)
  const toastMessage = ref('')

  // Actions
  function openCreateProfileModal() {
    isCreateProfileModalOpen.value = true
  }

  function closeCreateProfileModal() {
    isCreateProfileModalOpen.value = false
  }

  function showToast(message: string) {
    toastMessage.value = message
  }

  function clearToast() {
    toastMessage.value = ''
  }

  return {
    isCreateProfileModalOpen,
    toastMessage,
    openCreateProfileModal,
    closeCreateProfileModal,
    showToast,
    clearToast,
  }
})
