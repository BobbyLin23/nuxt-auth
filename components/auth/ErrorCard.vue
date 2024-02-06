<script lang="ts" setup>
import { ExclamationTriangleIcon } from '@radix-icons/vue'
</script>

<template>
  <CardWrapper header-label="Something went wrong!" back-button-href="/auth/login" back-button-label="Back to login">
    <div class="w-full flex items-center justify-center">
      <ExclamationTriangleIcon class="text-destructive" />
    </div>
  </CardWrapper>
</template>
