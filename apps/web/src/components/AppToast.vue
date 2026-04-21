<script setup lang="ts">
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
</script>

<template>
  <p v-if="uiStore.toastMessage" class="toast">
    {{ uiStore.toastMessage }}
    <button type="button" @click="uiStore.clearToast">
      Dismiss
    </button>
  </p>
</template>

<style scoped></style>
