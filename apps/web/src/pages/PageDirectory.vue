<script setup lang="ts"></script>

<template>
  <h1>This is the Directory Page</h1>
  <RouterLink :to="`/profile/${123}`">
    Go to Profile 123
  </RouterLink>
  <br>
  <RouterLink :to="`/profile/${456}`">
    Go to Profile 456
  </RouterLink>
</template>

<style scoped></style>
