<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getProfiles } from '@/services/profiles'

const { isPending, isError, data, error } = useQuery({
  queryKey: ['profiles'],
  queryFn: getProfiles,
  retry: false,
})
</script>

<template>
  <h1>This is the Directory Page</h1>

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
