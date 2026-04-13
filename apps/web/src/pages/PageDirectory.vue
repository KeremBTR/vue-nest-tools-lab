<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import { createProfile, getProfiles } from '@/services/profiles'

const queryClient = useQueryClient()

const name = ref('')
const bio = ref('')

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
  },
})

function submitProfile() {
  mutate({
    name: name.value,
    bio: bio.value,
  })
}
</script>

<template>
  <h1>This is the Directory Page</h1>

  <h2>Create new profile</h2>
  <form @submit.prevent="submitProfile">
    <div>
      <label for="name">Name </label>
      <input id="name" v-model="name" type="text">
    </div>
    <div>
      <label for="bio">Bio </label>
      <input id="bio" v-model="bio" type="text">
    </div>
    <button type="submit" :disabled="isCreating">
      {{ isCreating ? 'Creating...' : 'Create profile' }}
    </button>
    <p v-if="isCreateError && createError" :style="{ color: 'red' }">
      {{ createError.message }}
    </p>
  </form>

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
