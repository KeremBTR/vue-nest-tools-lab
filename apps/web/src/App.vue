<script setup lang="ts"></script>

<template>
  <h1>Welcome to Vue Nest Labs Project!</h1>
  <nav>
    <RouterLink :to="{ name: 'home' }">
      Go to Home
    </RouterLink>
    <RouterLink :to="{ name: 'login' }">
      Go to Login
    </RouterLink>
    <RouterLink :to="{ name: 'profile', params: { id: 123 } }">
      Go to Profile
    </RouterLink>
    <RouterLink :to="{ name: 'directory' }">
      Go to Directory
    </RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
