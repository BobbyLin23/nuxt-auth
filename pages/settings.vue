<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  auth: {
    guestRedirectTo: '/auth/login',
  },
})

const { session, signOut } = useAuth()
</script>

<template>
  <ClientOnly>
    <div>
      {{ session }}
    </div>
    <Button @click="signOut">
      Sign Out
    </Button>
  </ClientOnly>
</template>
