<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { reactive, ref } from 'vue'
import { flattenError } from 'zod'
import AppToast from '@/components/AppToast.vue'
import { createProfileSchema } from '@/schemas/profile'
import { createProfile, getProfiles } from '@/services/profiles'
import { useUiStore } from '@/stores/ui'

const queryClient = useQueryClient()

const uiStore = useUiStore()

const name = ref('')
const bio = ref('')

const validationErr = reactive({
  name: '',
  bio: '',
})

function clearValidationErrors() {
  validationErr.name = ''
  validationErr.bio = ''
}

const { isPending, isError, data, error } = useQuery({
  queryKey: ['profiles'],
  queryFn: getProfiles,
  retry: false,
})

const { isPending: isCreating, isError: isCreateError, error: createError, mutate } = useMutation({
  mutationFn: createProfile,
  retry: false,
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ['profiles'] })
    name.value = ''
    bio.value = ''
    clearValidationErrors()
    uiStore.closeCreateProfileModal()
    uiStore.showToast('Profile created successfully.')
  },
})

function submitProfile() {
  clearValidationErrors()

  const result = createProfileSchema.safeParse({ name: name.value, bio: bio.value })

  if (!result.success) {
    const flatError = flattenError(result.error)

    validationErr.name = flatError.fieldErrors.name?.[0] ?? ''
    validationErr.bio = flatError.fieldErrors.bio?.[0] ?? ''
  }
  else {
    mutate(result.data)
  }
}

function handleCancelCreateProfileButton() {
  clearValidationErrors()
  name.value = ''
  bio.value = ''
  uiStore.closeCreateProfileModal()
}
</script>

<template>
  <h1>This is the Directory Page</h1>

  <button v-if="!uiStore.isCreateProfileModalOpen" type="button" @click="uiStore.openCreateProfileModal">
    Create new profile
  </button>

  <AppToast />

  <section v-if="uiStore.isCreateProfileModalOpen">
    <h2>Create new profile</h2>
    <form @submit.prevent="submitProfile">
      <div>
        <label for="name">Name </label>
        <input id="name" v-model="name" type="text">
        <span v-if="validationErr.name">{{ validationErr.name }}</span>
      </div>
      <div>
        <label for="bio">Bio </label>
        <input id="bio" v-model="bio" type="text">
        <span v-if="validationErr.bio">{{ validationErr.bio }}</span>
      </div>
      <button type="submit" :disabled="isCreating">
        {{ isCreating ? 'Creating...' : 'Create profile' }}
      </button>
      <p v-if="isCreateError && createError" :style="{ color: 'red' }">
        {{ createError.message }}
      </p>
      <button type="button" @click="handleCancelCreateProfileButton">
        Cancel
      </button>
    </form>
  </section>

  <br>
  <h2>Profiles List</h2>

  <span v-if="isPending">Loading...</span>
  <span v-else-if="isError && error">Error: {{ error.message }}</span>
  <ul v-else-if="data">
    <li v-for="profile in data" :key="profile.id">
      <RouterLink :to="`/profile/${profile.id}`">
        Go to Profile ID:{{ profile.id }}
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped></style>
