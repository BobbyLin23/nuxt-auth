<script lang="ts" setup>
import { MoonIcon, SunIcon } from '@radix-icons/vue'

const isDark = useDark()

const toggleDark = useToggle(isDark)
</script>

<template>
  <Button variant="outline" size="icon" @click="toggleDark()">
    <SunIcon v-if="isDark" class="h-5 w-5" />
    <MoonIcon v-else class="h-5 w-5" />
  </Button>
</template>

<style>

</style>
