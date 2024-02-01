<script lang="ts" setup>
withDefaults(defineProps<{
  asChild?: boolean
  mode?: 'modal' | 'redirect'
}>(), {
  mode: 'redirect',
})

const router = useRouter()
</script>

<template>
  <span class="cursor-pointer" @click="router.push('/auth/login')">
    <slot />
  </span>
</template>
