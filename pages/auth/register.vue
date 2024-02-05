<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  middleware: 'guest-only',
  auth: {
    authenticatedRedirectTo: '/settings',
  },
})
</script>

<template>
  <RegisterForm />
</template>
