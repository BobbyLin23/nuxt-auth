<script lang="ts" setup>
import { CheckCircledIcon } from '@radix-icons/vue'

defineProps<{
  message?: string
}>()
</script>

<template>
  <div v-if="message" class="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
    <CheckCircledIcon class="h-4 w-4" />
    <p>{{ message }}</p>
  </div>
</template>
