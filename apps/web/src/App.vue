<script setup lang="ts"></script>

<template>
  <h1>Hello App!</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
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
