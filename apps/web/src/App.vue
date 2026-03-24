<script setup lang="ts"></script>

<template>
  <h1>Hello App!</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink to="/">
      Go to Home
    </RouterLink>
    <RouterLink to="/login">
      Go to Login
    </RouterLink>
    <RouterLink to="/profile/123">
      Go to Profile
    </RouterLink>
    <RouterLink to="/directory">
      Go to Directory
    </RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
