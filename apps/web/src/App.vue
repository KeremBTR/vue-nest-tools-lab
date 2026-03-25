<script setup lang="ts"></script>

<template>
  <h1>Welcome to Vue Nest Labs Project!</h1>
  <nav>
    <RouterLink :to="{ name: 'home' }" style="margin-right: 10px;">
      Go to Home
    </RouterLink>
    <RouterLink :to="{ name: 'login' }" style="margin-right: 10px;">
      Go to Login
    </RouterLink>
    <RouterLink :to="{ name: 'directory' }" style="margin-right: 10px;">
      Go to Directory
    </RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
