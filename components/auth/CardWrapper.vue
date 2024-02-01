<script lang="ts" setup>
defineProps<{
  headerLabel: string
  showSocial: boolean
  backButtonLabel: string
  backButtonHref: string
}>()
</script>

<template>
  <Card class="w-[400px] shadow-md">
    <CardHeader>
      <Header :label="headerLabel" />
    </CardHeader>
    <CardContent>
      <slot />
    </CardContent>
    <CardFooter v-if="showSocial">
      <Social />
    </CardFooter>
    <CardFooter>
      <BackButton :label="backButtonLabel" :href="backButtonHref" />
    </CardFooter>
  </Card>
</template>
