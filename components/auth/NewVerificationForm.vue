<script lang="ts" setup>
// @ts-expect-error module doesn't have types
import { BeatLoader } from 'vue3-spinner'

const route = useRoute()

const token = computed(() => {
  if (route.query.token && typeof route.query.token === 'string')
    return route.query.token
  return null
})

const success = ref<string>()
const error = ref<string>()

async function onSubmit() {
  if (success.value || error.value)
    return

  if (!token.value) {
    error.value = 'Token does not exist'
    return
  }

  const { data } = await useFetch('/api/new-verification', {
    method: 'POST',
    body: { token: token.value },
  })

  if (data.value)
    console.log(data.value)
}

onSubmit()
</script>

<template>
  <ClientOnly>
    <CardWrapper
      header-label="Confirming your verification"
      back-button-href="/auth/login"
      back-button-label="Back to Login"
    >
      <div class="flex w-full justify-center items-center">
        <BeatLoader v-if="!success && !error" />
        <FormSuccess :message="success" />
        <FormError v-if="!success" :message="error" />
      </div>
    </CardWrapper>
  </ClientOnly>
</template>
